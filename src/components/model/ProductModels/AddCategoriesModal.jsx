import { useContext, useEffect, useState } from "react";
import { Modal } from "antd";
import { MdCameraAlt } from "react-icons/md";
import axios from "axios";
import { Spinner, useToast } from "@chakra-ui/react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";

const AddCategoriesModal = ({
  isVisible,
  handleCancel,
  BASE_URL,
  token,
  role,
  merchantId,
  onAddCategory,
}) => {
  const [categoryData, setCategoryData] = useState({
    categoryName: "",
    description: "",
    type: "",
    businessCategoryId: "",
    merchantId: "",
  });

  const [allBusinessCategory, setAllBusinessCategory] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const [selectedCSVFile, setSelectedCSVFile] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isUploadLoading, setIsUploadLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();
  const { userId } = useContext(UserContext);

  useEffect(() => {
    const getAllBusinessCategories = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/admin/business-categories/get-all-business-category`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setAllBusinessCategory(response.data.data);
        }
      } catch (err) {
        console.log(`Error in getting all business categories: ${err}`);
      }
    };

    getAllBusinessCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleAdImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreviewURL(URL.createObjectURL(file));
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const dataToSend = new FormData();
      dataToSend.append("categoryName", categoryData.categoryName);
      dataToSend.append("description", categoryData.description);
      dataToSend.append("type", categoryData.type);
      dataToSend.append("businessCategoryId", categoryData.businessCategoryId);
      dataToSend.append("merchantId", merchantId);
      if (selectedFile) {
        dataToSend.append("categoryImage", selectedFile);
      }

      const endPoint =
        role === "Admin"
          ? `${BASE_URL}/categories/admin/add-category`
          : `${BASE_URL}/categories/add-category`;

      const response = await axios.post(endPoint, dataToSend, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        onAddCategory(response.data.data);
        setCategoryData({
          categoryName: "",
          description: "",
          type: "",
          businessCategoryId: "",
          merchantId: merchantId || "",
        });
        setSelectedFile(null);
        setPreviewURL(null);
        handleCancel();
        toast({
          title: "Success",
          description: response.data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(`Error in adding category: ${err}`);
      toast({
        title: "Error",
        description: `Error in adding new category`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadSampleCSV = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.get(
        `${BASE_URL}/categories/admin/download-sample-category-csv`,
        {
          responseType: "blob",
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Create a URL for the file and trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));

      console.log("url", url);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Category_sample.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.log(`Error in downloading sample CSV file: ${err.stack}`);
    }
  };

  const handleSelectCSVFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setSelectedCSVFile(file);
  };

  const handlUploadCSVFile = async (e) => {
    try {
      e.preventDefault();

      setIsUploadLoading(true);

      const userIdToSend = role === "Admin" ? merchantId : userId;

      const csvToSend = new FormData();

      if (selectedCSVFile) {
        csvToSend.append("categoryCSV", selectedCSVFile);
        csvToSend.append("merchantId", userIdToSend);
      }

      const response = await axios.post(
        `${BASE_URL}/categories/admin/upload-category-csv`,
        csvToSend,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setSelectedCSVFile(null);
        handleCancel();
        toast({
          title: "Success",
          description: "CSV data added successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        // navigate(0);
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Error in uploading CSV file",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsUploadLoading(false);
    }
  };

  return (
    <Modal
      title="Add Categories"
      onCancel={handleCancel}
      width="500px"
      open={isVisible}
      footer={null}
      centered
    >
      <form onSubmit={handleAddCategory}>
        <div className="flex flex-col gap-4 mt-5">
          <div className="flex mt-5 gap-4">
            <label className="w-1/2 text-gray-500" htmlFor="businessCategory">
              Business Category
            </label>
            <select
              name="businessCategoryId"
              value={categoryData.businessCategoryId}
              onChange={handleInputChange}
              className="border-2 border-gray-100 rounded p-2 focus:outline-none w-full"
            >
              <option defaultValue={"Select business category"} hidden>
                Select business category
              </option>
              {allBusinessCategory?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="categoryName">
              Category Name
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              value={categoryData.categoryName}
              id="categoryName"
              name="categoryName"
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="description">
              Description
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              value={categoryData.description}
              id="description"
              name="description"
              onChange={handleInputChange}
            ></input>
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-gray-500">Veg/Non-veg</label>
            <div>
              <input
                type="radio"
                name="type"
                value="Veg"
                checked={categoryData.type === "Veg"}
                onChange={handleInputChange}
                className="cursor-pointer border-2 border-gray-100 rounded p-2 mr-3 focus:outline-none"
              />
              <label className="cursor-pointer"> Veg</label>
            </div>

            <div>
              <input
                type="radio"
                name="type"
                value="Non-veg"
                checked={categoryData.type === "Non-veg"}
                onChange={handleInputChange}
                className="cursor-pointer border-2 border-gray-100 ml-5 rounded p-2 mr-3 focus:outline-none"
              />
              <label className="cursor-pointer">Non-Veg</label>
            </div>

            <input
              type="radio"
              name="type"
              value="Both"
              checked={categoryData.type === "Both"}
              onChange={handleInputChange}
              className="cursor-pointer border-2 border-gray-100 ml-5 rounded p-2 mr-3 focus:outline-none"
            />
            <label className="cursor-pointer"> Both</label>
          </div>

          <div className="flex items-center">
            <label className=" w-1/3">Photos</label>
            <div className="flex items-center gap-[30px]">
              {!previewURL && (
                <div className="bg-cyan-50 shadow-md mt-3 h-16 w-16 rounded-md" />
              )}
              {previewURL && (
                <figure className="mt-3 h-16 w-16 rounded-md relative">
                  <img
                    src={previewURL}
                    alt="profile"
                    className="w-full rounded h-full object-cover"
                  />
                </figure>
              )}
              <input
                type="file"
                name="adImage"
                id="adImage"
                className="hidden"
                onChange={handleAdImageChange}
              />
              <label htmlFor="adImage" className="cursor-pointer">
                <MdCameraAlt
                  className="bg-teal-800 text-[30px] text-white p-4 h-16 w-16 mt-3 rounded-md"
                  size={30}
                />
              </label>
            </div>
          </div>

          <div className="flex items-start justify-between gap-4 mt-5">
            <div className="flex flex-col">
              <label
                htmlFor="uploadCSV"
                className="flex items-center bg-teal-800 w-fit p-2 gap-2 text-white rounded-xl border cursor-pointer"
              >
                <AiOutlineCloudUpload size={20} />
                Upload CSV
                <input
                  type="file"
                  name="uploadCSV"
                  id="uploadCSV"
                  className="hidden"
                  onChange={handleSelectCSVFile}
                />
              </label>

              <p
                onClick={downloadSampleCSV}
                className="text-gray-500 underline underline-offset-2 cursor-pointer"
              >
                Download Sample CSV
              </p>

              {selectedCSVFile && (
                <div className="flex items-center gap-4 mt-[20px]">
                  <p>{selectedCSVFile.name}</p>
                  {isUploadLoading ? (
                    <Spinner size="sm" />
                  ) : (
                    <AiOutlineCloudUpload
                      size={25}
                      onClick={handlUploadCSVFile}
                      className="cursor-pointer  text-teal-600"
                    />
                  )}
                </div>
              )}
            </div>

            <div className="flex gap-4 w-fit h-fit">
              <button
                className="bg-cyan-50 py-2 px-4 rounded-md"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                className="bg-teal-800 text-white py-2 px-4 rounded-md focus:outline-none"
                type="submit"
              >
                {isLoading ? `Adding...` : `Add`}
              </button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddCategoriesModal;
