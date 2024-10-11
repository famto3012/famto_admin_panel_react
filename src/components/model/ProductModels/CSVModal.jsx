import { ArrowDownOutlined } from "@ant-design/icons";
import { Spinner, useToast } from "@chakra-ui/react";
import { Modal } from "antd";
import axios from "axios";
import { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";

const CSVModal = ({
  isVisible,
  handleCancel,
  BASE_URL,
  token,
  merchantId,
  onCSVDataAdd,
}) => {
  const [selectedCSVFile, setSelectedCSVFile] = useState(null);
  const [CSVUpLoading, setCSVUpLoading] = useState(false);
  const [CSVDownloadLoading, setCSVDownloadLoading] = useState(false);

  const toast = useToast();

  const handleSelectCSVFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setSelectedCSVFile(file);
  };

  const handlUploadCSVFile = async (e) => {
    try {
      e.preventDefault();

      setCSVUpLoading(true);

      const csvToSend = new FormData();

      if (selectedCSVFile) {
        csvToSend.append("CSVFile", selectedCSVFile);
        csvToSend.append("merchantId", merchantId);
      }

      const response = await axios.post(
        `${BASE_URL}/products/csv/upload-csv`,
        csvToSend,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        onCSVDataAdd(response.data.data);
        setSelectedCSVFile(null);
        handleCancel();
        toast({
          title: "Success",
          description: "CSV data added successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Erro while uploading the CSV file",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setCSVUpLoading(false);
    }
  };

  const downloadSampleCSV = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.get(`${BASE_URL}/products/csv/sample-csv`, {
        responseType: "blob",
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Create a URL for the file and trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Product_Sample.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      handleCancel();
    } catch (err) {
      toast({
        title: "Error",
        description: "Error while downloading the sample CSV file",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDownloadCSV = async (e) => {
    try {
      setCSVDownloadLoading(true);

      const response = await axios.post(
        `${BASE_URL}/products/csv/download-csv`,
        { merchantId },
        {
          responseType: "blob",
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Create a URL for the file and trigger the download
        const url = window.URL.createObjectURL(new Blob([response.data]));

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Combined_product.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        handleCancel();
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An error occoured while downloading CSV file",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setCSVDownloadLoading(false);
    }
  };

  return (
    <Modal
      title=" "
      onCancel={handleCancel}
      width="500px"
      open={isVisible}
      footer={null}
      centered
    >
      <div className="flex rounded-xl justify-between p-10">
        <div>
          <label
            htmlFor="uploadCSV"
            className="flex gap-2 p-3 w-fit bg-cyan-200 px-5 font-[500] rounded-xl border cursor-pointer"
          >
            <AiOutlineCloudUpload className="text-[22px]" />
            Upload
          </label>
          <input
            id="uploadCSV"
            type="file"
            className="hidden"
            onChange={handleSelectCSVFile}
          />
          <p
            onClick={downloadSampleCSV}
            className="text-gray-500 hover:underline mx-2 mt-2 underline-offset-2 cursor-pointer"
          >
            Download Sample CSV
          </p>

          {selectedCSVFile && (
            <p className="flex flex-row gap-4 mt-5">
              {selectedCSVFile.name}{" "}
              <span>
                {CSVUpLoading ? (
                  <Spinner size="sm" />
                ) : (
                  <AiOutlineCloudUpload
                    size={25}
                    onClick={handlUploadCSVFile}
                    className="cursor-pointer  text-teal-600"
                  />
                )}
              </span>
            </p>
          )}
        </div>

        <div>
          <button
            onClick={handleDownloadCSV}
            className="flex gap-2 p-3 bg-teal-800 rounded-xl px-5 border text-white cursor-pointer"
          >
            <div className="flex items-center gap-[10px]">
              {CSVDownloadLoading ? (
                <Spinner size="sm" />
              ) : (
                <ArrowDownOutlined size={10} />
              )}
              <span>Download CSV</span>
            </div>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CSVModal;
