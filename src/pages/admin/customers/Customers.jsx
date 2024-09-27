import { useContext, useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { ArrowDownOutlined, SearchOutlined } from "@ant-design/icons";
import { FilterAltOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import StarRating from "../../../components/model/StarRating";
import GlobalSearch from "../../../components/GlobalSearch";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
import GIFLoader from "../../../components/GIFLoader";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Pagination } from "@mui/material";
import { Modal } from "antd";
import { Spinner, useToast } from "@chakra-ui/react";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [allGeofence, setAllGeofence] = useState([]);
  const [search, setSearch] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [CSVDownloadLoading, setCSVDownloadLoading] = useState(false);

  const [geofenceFilter, setGeofenceFilter] = useState("");

  const [isCSVModalVisible, setIsCSVModalVisible] = useState(false);
  const [selectedCSVFile, setSelectedCSVFile] = useState(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [pagination, setPagination] = useState({});

  const { token, role } = useContext(UserContext);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
      return;
    }

    const getAllGeofence = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${BASE_URL}/admin/geofence/get-geofence`,
          {
            params: { page, limit },
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          setAllGeofence(response.data.geofences);
        }
      } catch (err) {
        console.error(`Error in fetching data: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    getAllCustomers();
    getAllGeofence();
  }, [token, role, navigate, page, limit]);

  const showCSVModal = () => setIsCSVModalVisible(true);
  const handleCancel = () => setIsCSVModalVisible(false);

  const getAllCustomers = async () => {
    try {
      setIsTableLoading(true);

      const endPoint =
        role === "Admin"
          ? `${BASE_URL}/admin/customers/get-all`
          : `${BASE_URL}/admin/customers/customer-of-merchant`;

      const customersResponse = await axios.get(endPoint, {
        params: { page, limit },
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (customersResponse.status === 200) {
        setCustomers(customersResponse.data.data);
        setPagination(customersResponse.data);
      }
    } catch (err) {
      console.error(`Error in fetching data: ${err}`);
    } finally {
      setIsTableLoading(false);
    }
  };

  // TODO: Complete filter and search for merchant
  useEffect(() => {
    const handleFilterChange = async (e) => {
      try {
        e.preventDefault();
        setIsTableLoading(true);

        const endPoint =
          role === "Admin"
            ? `${BASE_URL}/admin/customers`
            : `${BASE_URL}/admin/customers/filter-customer-of-merchant`;

        const response = await axios.get(endPoint, {
          params: { filter: geofenceFilter, page, limit },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setCustomers(response.data.data);
          setPagination(response.data.pagination);
        }
      } catch (err) {
        console.log(`Error in fetching customers: ${err}`);
      } finally {
        setIsTableLoading(false);
      }
    };

    handleFilterChange();
  }, [geofenceFilter]);

  useEffect(() => {
    const handleSearchCustomer = async () => {
      try {
        if (search.trim() !== "") {
          setIsTableLoading(true);

          const response = await axios.get(
            `${BASE_URL}/admin/customers/search`,
            {
              params: { query: search, page, limit },
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (response.status === 200) {
            setCustomers(response.data.data);
            setPagination(response.data.pagination);
          }
        } else {
          getAllCustomers();
        }
      } catch (err) {
        toast({
          title: "Error",
          description: `Error in searching customer, ${err}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsTableLoading(false);
      }
    };

    const timeOut = setTimeout(() => {
      handleSearchCustomer();
    }, 500);

    return () => {
      clearTimeout(timeOut);
    };
  }, [search, token, role, page, limit]);

  const onSearch = (e) => {
    let text = e.target.value;
    setSearch(text);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const getItemAriaLabel = (type, page, selected) => {
    switch (type) {
      case "page":
        return `${selected ? "" : "Go to "}page ${page}`;
      case "first":
        return "Go to first page";
      case "last":
        return "Go to last page";
      case "next":
        return "Go to next page";
      case "previous":
        return "Go to previous page";
      default:
        return "";
    }
  };

  const downloadSampleCSV = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.get(
        `${BASE_URL}/admin/customers/download-sample-customer-csv`,
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

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "customerSample.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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

  const handleSelectCSVFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setSelectedCSVFile(file);
  };

  const handlUploadCSVFile = async (e) => {
    try {
      e.preventDefault();

      const csvToSend = new FormData();

      if (selectedCSVFile) {
        csvToSend.append("customerCSV", selectedCSVFile);
      }

      const response = await axios.post(
        `${BASE_URL}/admin/customers/upload-customer-csv`,
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
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Erro while uploading the CSV file",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDownloadCSV = async (e) => {
    try {
      setCSVDownloadLoading(true);

      const response = await axios.get(
        `${BASE_URL}/admin/customers/download-customer-csv`,
        {
          params: { geofenceId: geofenceFilter },
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
        link.setAttribute("download", "Customer_Data.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
    <div>
      {isLoading ? (
        <GIFLoader />
      ) : (
        <>
          <Sidebar />
          <main className="w-full h-screen pl-[290px] bg-gray-100">
            <nav className="p-5">
              <GlobalSearch />
            </nav>

            <div className="flex items-center justify-between mx-8 mt-5">
              <h1 className="text-lg font-bold">Customers</h1>
              <button
                className="bg-cyan-100 text-black rounded-md px-4 py-2 font-semibold flex items-center space-x-2"
                onClick={showCSVModal}
              >
                <ArrowDownOutlined /> <span>CSV</span>
              </button>
              <Modal
                open={isCSVModalVisible}
                footer={null}
                width="30rem"
                onCancel={handleCancel}
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
                  </div>
                  <div>
                    <button
                      onClick={handleDownloadCSV}
                      className="flex gap-2 p-3 bg-teal-800 rounded-xl px-5 border text-white cursor-pointer"
                    >
                      {CSVDownloadLoading ? (
                        <Spinner size="sm" />
                      ) : (
                        <div className="flex items-center gap-[10px]">
                          <ArrowDownOutlined size={10} />
                          <span>Download CSV</span>
                        </div>
                      )}
                    </button>
                  </div>

                  {selectedCSVFile && (
                    <p onClick={handlUploadCSVFile}>Upload</p>
                  )}
                </div>
              </Modal>
            </div>
            <div className="mx-8 rounded-lg mt-5 flex p-6 bg-white justify-between">
              <select
                name="type"
                value={geofenceFilter}
                className="bg-blue-50 px-4 outline-none rounded-lg focus:outline-none"
                onChange={(e) => {
                  setGeofenceFilter(e.target.value);
                }}
              >
                <option defaultValue="all">All</option>
                {allGeofence.map((geoFence) => (
                  <option value={geoFence._id} key={geoFence._id}>
                    {geoFence.name}
                  </option>
                ))}
              </select>
              <div className="relative">
                <FilterAltOutlined className="text-gray-400" />
                <input
                  type="search"
                  placeholder="Search customer"
                  className="bg-gray-100 h-10 px-5 pr-2 rounded-full ml-4 w-72 text-sm focus:outline-none"
                  onChange={onSearch}
                />
                <button type="submit" className="absolute right-2 top-2">
                  <SearchOutlined className="text-xl text-gray-500" />
                </button>
              </div>
            </div>
            <div className="overflow-auto mt-[20px] w-full">
              <table className="text-start w-full">
                <thead className=" sticky top-0 left-0">
                  <tr>
                    {[
                      "ID",
                      "Name",
                      "Email",
                      "Phone",
                      "Last Platform Used",
                      "Registration Date",
                      "Rating",
                    ].map((header, index) => (
                      <th
                        key={index}
                        className="bg-teal-800 text-center text-white py-[20px] border-r-2 border-[#eee]/50"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {isTableLoading && (
                    <tr>
                      <td colSpan={7} className="text-center h-20">
                        Loading Data <Spinner size="sm" className="ms-2" />
                      </td>
                    </tr>
                  )}

                  {!isTableLoading && customers?.length === 0 && (
                    <tr>
                      <td colSpan={7}>
                        <p className="flex items-center justify-center h-20">
                          No data available
                        </p>
                      </td>
                    </tr>
                  )}

                  {!isTableLoading &&
                    customers.map((customer) => (
                      <tr
                        key={customer._id}
                        className="align-middle even:bg-gray-200 text-center"
                      >
                        <td className="p-4">
                          <Link
                            to={`/customer-detail/${customer._id}`}
                            className="underline underline-offset-4"
                          >
                            {customer._id}
                          </Link>
                        </td>
                        <td>{customer.fullName}</td>
                        <td>{customer.email}</td>
                        <td>{customer.phoneNumber}</td>
                        <td>{customer.lastPlatformUsed}</td>
                        <td>{customer.registrationDate}</td>
                        <td>
                          <StarRating rating={customer.rating} />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="my-[30px] flex justify-center">
              <Pagination
                count={pagination.totalPages || 0}
                page={pagination.currentPage || page}
                onChange={handlePageChange}
                shape="rounded"
                siblingCount={0}
                hidePrevButton={!pagination.hasPrevPage}
                hideNextButton={!pagination.hasNextPage}
                getItemAriaLabel={getItemAriaLabel}
              />
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default Customers;
