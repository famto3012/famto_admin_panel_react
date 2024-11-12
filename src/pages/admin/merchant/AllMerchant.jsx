import { useContext, useEffect, useState } from "react";
import {
  PlusOutlined,
  ArrowDownOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Switch } from "antd";
import GlobalSearch from "../../../components/GlobalSearch";
import { UserContext } from "../../../context/UserContext";
import GIFLoader from "../../../components/GIFLoader";
import axios from "axios";
import AddMerchant from "../../../components/model/Merchant/AddMerchant";
import { Spinner, useToast } from "@chakra-ui/react";
import { Pagination } from "@mui/material";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { TbArrowsSort } from "react-icons/tb";
import Select from "react-select";
import { serviceableOptions } from "../../../utils/DefaultData";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const Merchant = () => {
  const [allMerchants, setAllMerchants] = useState([]);
  const [allGeofences, setAllGeofences] = useState([]);
  const [allBusinessCategories, setAllBusinessCategories] = useState([]);

  const [serviceable, setServiceable] = useState("");
  const [geofence, setGeofence] = useState("");
  const [businessCategory, setBusinessCategory] = useState("");
  const [search, setSearch] = useState("");
  const [selectedMerchantId, setSelectedMerchantId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [approveLoading, setApproveLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [isCSVModalVisible, setIsCSVModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const [isModalReject, setIsModalReject] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [pagination, setPagination] = useState({});

  const [selectedCSVFile, setSelectedCSVFile] = useState(null);
  const [isUploadLoading, setIsUploadLoading] = useState(false);

  const { token, role } = useContext(UserContext);

  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || role !== "Admin") {
      navigate("/auth/login");
      return;
    }

    const fetchInitialData = async () => {
      try {
        setIsLoading(true);

        const [geofenceResponse, businessCategoryResponse] = await Promise.all([
          axios.get(`${BASE_URL}/admin/geofence/get-geofence`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }),

          axios.get(
            `${BASE_URL}/admin/business-categories/get-all-business-category`,
            {
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
        ]);

        if (geofenceResponse.status === 200) {
          setAllGeofences(geofenceResponse.data.geofences);
        }

        if (businessCategoryResponse.status === 200) {
          setAllBusinessCategories(businessCategoryResponse.data.data);
        }
      } catch (err) {
        toast({
          title: "Error",
          description: "An error occoured while getting the data",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
    fetchAllMerchants();
  }, [token, role, page, limit]);

  useEffect(() => {
    if (!serviceable && !geofence && !businessCategory) return;

    const filterHandler = async () => {
      try {
        setIsTableLoading(true);

        let endpoint = `${BASE_URL}/merchants/admin/filter`;

        const params = [];
        if (serviceable) params.push(`serviceable=${serviceable}`);
        if (geofence) params.push(`geofence=${geofence}`);
        if (businessCategory)
          params.push(`businessCategory=${businessCategory}`);

        if (params.length > 0) {
          endpoint += `?${params.join("&")}`;
        }

        const response = await axios.get(endpoint, {
          params: { page, limit },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setAllMerchants(response.data.data);
          setPagination(response.data.pagination);
        }
      } catch (err) {
        toast({
          title: "Error",
          description: `Error in filtering merchant`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsTableLoading(false);
      }
    };

    filterHandler();
  }, [serviceable, geofence, businessCategory, token, role, page, limit]);

  useEffect(() => {
    const handleSearchMerchant = async () => {
      try {
        if (search.trim() !== "") {
          setIsTableLoading(true);

          const response = await axios.get(
            `${BASE_URL}/merchants/admin/search`,
            {
              params: { query: search, page, limit },
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (response.status === 200) {
            setAllMerchants(response.data.data);
            setPagination(response.data.pagination);
          }
        } else {
          fetchAllMerchants();
        }
      } catch (err) {
        toast({
          title: "Error",
          description: `Error in searching merchant`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsTableLoading(false);
      }
    };

    const timeOut = setTimeout(() => {
      handleSearchMerchant();
    }, 500);

    return () => {
      clearTimeout(timeOut);
    };
  }, [search, token, role, page, limit]);

  const fetchAllMerchants = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/merchants/admin/all-merchants`,
        {
          params: { page, limit },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setAllMerchants(response.data.data);
        setPagination(response.data.pagination);
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An error occoured while getting all data",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const geofenceOptions = [
    { label: "All", value: "all" },
    ...allGeofences.map((geofence) => ({
      label: geofence.name,
      value: geofence._id,
    })),
  ];

  const businessCategoryOptions = [
    { label: "All", value: "all" },
    ...allBusinessCategories.map((category) => ({
      label: category.title,
      value: category._id,
    })),
  ];

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleToggle = async (id) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/merchants/admin/change-status/${id}`,
        {},
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setAllMerchants((prevMerchants) =>
          prevMerchants.map((merchant) =>
            merchant._id === id
              ? {
                  ...merchant,
                  isServiceableToday:
                    merchant.isServiceableToday === "open" ? "closed" : "open",
                  status: !merchant.status,
                }
              : merchant
          )
        );

        toast({
          title: "Success",
          description: response.data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        toast({
          title: "Error",
          description: err.response.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: `An error occoured, Please try again later`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const handleApprove = async (e, merchantId) => {
    e.preventDefault();
    try {
      setApproveLoading(true);
      const response = await axios.patch(
        `${BASE_URL}/merchants/admin/approve-merchant/${merchantId}`,
        {},
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setAllMerchants((prevMerchants) =>
          prevMerchants.map((merchant) =>
            merchant._id === merchantId
              ? { ...merchant, isApproved: "Approved" }
              : merchant
          )
        );
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
      toast({
        title: "Error",
        description: `Error in approving merchant`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setApproveLoading(false);
    }
  };

  const handleReject = async (e, merchantId) => {
    e.preventDefault();
    try {
      setRejectLoading(true);
      const response = await axios.patch(
        `${BASE_URL}/merchants/admin/reject-merchant/${merchantId}`,
        {},
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setAllMerchants(
          allMerchants.filter((merchant) => merchant._id !== merchantId)
        );
        handleCancel();
        toast({
          title: "Success",
          description: "Rejected Merchant Successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: `Error in rejecting merchant`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setRejectLoading(false);
    }
  };

  useEffect(() => {
    const filterHandler = async () => {
      try {
        if (!serviceable && !geofence && !businessCategory) return;
        setIsTableLoading(true);

        let endpoint = `${BASE_URL}/merchants/admin/filter`;

        const params = [];
        if (serviceable) params.push(`serviceable=${serviceable}`);
        if (geofence) params.push(`geofence=${geofence}`);
        if (businessCategory)
          params.push(`businessCategory=${businessCategory}`);

        if (params.length > 0) {
          endpoint += `?${params.join("&")}`;
        }

        const response = await axios.get(endpoint, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setAllMerchants(response.data.data);
        }
      } catch (err) {
        toast({
          title: "Error",
          description: `Error in filtering merchant`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsTableLoading(false);
      }
    };

    filterHandler();
  }, [serviceable, geofence, businessCategory, token, role]);

  const onSearch = (e) => {
    let text = e.target.value;
    setSearch(text);
  };

  useEffect(() => {
    const handleSearchMerchant = async () => {
      try {
        if (search.trim() !== "") {
          setIsTableLoading(true);

          const response = await axios.get(
            `${BASE_URL}/merchants/admin/search`,
            {
              params: { query: search },
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (response.status === 200) {
            setAllMerchants(response.data.data);
          }
        }
      } catch (err) {
        toast({
          title: "Error",
          description: `Error in searching merchants`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsTableLoading(false);
      }
    };

    const timeOut = setTimeout(() => {
      handleSearchMerchant();
    }, 500);

    return () => {
      clearTimeout(timeOut);
    };
  }, [search]);

  const toggleModal = () => setIsModalVisible(!isModalVisible);
  const handleApprovedModal = (merchantId) => {
    setSelectedMerchantId(merchantId);
    setIsConfirmModal(true);
  };
  const showModalReject = (merchantId) => {
    setSelectedMerchantId(merchantId);
    setIsModalReject(true);
  };
  const showCSVModal = () => setIsCSVModalVisible(true);

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsConfirmModal(false);
    setIsModalReject(false);
    setIsCSVModalVisible(false);
  };

  const downloadSampleCSV = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.get(
        `${BASE_URL}/merchants/admin/download-sample-merchant-csv`,
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
      link.setAttribute("download", "Merchant_Sample.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      toast({
        title: "Error",
        description: "An error occoured while downloading sample CSV",
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

  const handleUploadCSVFile = async (e) => {
    try {
      e.preventDefault();

      setIsUploadLoading(true);

      const csvToSend = new FormData();

      if (selectedCSVFile) {
        csvToSend.append("merchantCSV", selectedCSVFile);
      }

      const response = await axios.post(
        `${BASE_URL}/merchants/admin/upload-merchant-csv`,
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
        navigate(0);
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

  const handleDownloadMerchantCSV = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post(
        `${BASE_URL}/merchants/admin/download-csv`,
        {},
        {
          params: {
            serviceable,
            geofence,
            businessCategory,
            searchFilter: search,
          },
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
      link.setAttribute("download", "Merchant_Data.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      toast({
        title: "Error",
        description: "An error occoured while downloading CSV",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAddMerchant = (data) => {
    setAllMerchants((prev) => [data, ...prev]);
  };

  return (
    <div>
      {isLoading ? (
        <GIFLoader />
      ) : (
        <>
          <main className="pl-[300px] bg-gray-100 h-screen">
            <nav className="p-5">
              <GlobalSearch />
            </nav>

            <div className="flex justify-between items-center px-[30px]">
              <h1 className="text-[18px] font-semibold">Merchants</h1>
              <div className="flex space-x-3 justify-end ">
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
                              onClick={handleUploadCSVFile}
                              className="cursor-pointer  text-teal-600"
                            />
                          )}
                        </div>
                      )}
                    </div>

                    <div>
                      <button
                        onClick={handleDownloadMerchantCSV}
                        className="flex gap-2 p-3 bg-teal-800 rounded-xl px-5 border text-white"
                      >
                        <div className="flex gap-2">
                          <TbArrowsSort className="text-[22px]" />
                          Download
                        </div>
                      </button>
                    </div>
                  </div>
                </Modal>

                <Link
                  to={"/merchant/payout"}
                  className="bg-teal-800 text-white rounded-md px-4 py-2 font-semibold  flex items-center"
                >
                  <p>Merchant payout</p>
                </Link>

                <button
                  className="bg-teal-800 text-white rounded-md px-4 py-2 font-semibold  flex items-center space-x-1 "
                  onClick={toggleModal}
                >
                  <PlusOutlined /> <span>Add Merchant</span>
                </button>
                <AddMerchant
                  isVisible={isModalVisible}
                  onCancel={handleCancel}
                  BASE_URL={BASE_URL}
                  token={token}
                  onAddMerchant={handleAddMerchant}
                />
              </div>
            </div>

            <div className="flex items-center bg-white p-5 mx-5 rounded-lg justify-between mt-[20px] px-[30px]">
              <div className="flex items-center gap-[20px]">
                <Select
                  options={serviceableOptions}
                  value={serviceableOptions.find(
                    (option) => option.value === serviceable
                  )}
                  onChange={(option) => setServiceable(option.value)}
                  className=" bg-cyan-50 min-w-[10rem]"
                  placeholder="Status"
                  isSearchable={false}
                  isMulti={false}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      paddingRight: "",
                    }),
                    dropdownIndicator: (provided) => ({
                      ...provided,
                      padding: "10px",
                    }),
                  }}
                />

                <Select
                  options={geofenceOptions}
                  value={geofenceOptions.find(
                    (option) => option.value === geofence
                  )}
                  onChange={(option) => setGeofence(option.value)}
                  className=" bg-cyan-50 min-w-[10rem]"
                  placeholder="Geofence"
                  isSearchable={false}
                  isMulti={false}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      paddingRight: "",
                    }),
                    dropdownIndicator: (provided) => ({
                      ...provided,
                      padding: "10px",
                    }),
                  }}
                />

                <Select
                  options={businessCategoryOptions}
                  value={businessCategoryOptions.find(
                    (option) => option.value === businessCategory
                  )}
                  onChange={(option) => setBusinessCategory(option.value)}
                  className=" bg-cyan-50 min-w-[10rem]"
                  placeholder="Business category"
                  isSearchable={false}
                  isMulti={false}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      paddingRight: "",
                    }),
                    dropdownIndicator: (provided) => ({
                      ...provided,
                      padding: "10px",
                    }),
                  }}
                />
              </div>

              <div className="flex items-center gap-[30px]">
                {/* <div>
                  <FilterAltOutlinedIcon className="text-gray-400" />
                </div> */}
                <div className="w-full">
                  <div>
                    <input
                      type="search"
                      onChange={onSearch}
                      className="bg-gray-100 p-3 rounded-3xl focus:outline-none outline-none text-[14px] ps-[20px]"
                      placeholder="Search merchant"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-auto mt-[20px] w-full">
              <table className="text-start w-full bg-white">
                <thead>
                  <tr className="">
                    {[
                      "Merchant ID",
                      "Merchant Name",
                      "Phone",
                      "Rating",
                      "Subscription Status",
                      "Serviceable",
                      "Geofence",
                      "Status",
                      "Registration Approval",
                    ].map((header) => (
                      <th
                        key={header}
                        className="bg-teal-800 text-center text-white py-[20px] border-r-2 border-[#eee]/50"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {isTableLoading && (
                    <tr className="bg-gray-200">
                      <td
                        colSpan={9}
                        className="text-center py-[20px] bg-gray-50"
                      >
                        Loading data...
                      </td>
                    </tr>
                  )}

                  {!isTableLoading && allMerchants.length === 0 && (
                    <tr className="bg-gray-200">
                      <td
                        colSpan={9}
                        className="text-center py-[20px] bg-gray-50"
                      >
                        No data available
                      </td>
                    </tr>
                  )}

                  {!isTableLoading &&
                    allMerchants.map((data) => (
                      <tr
                        key={data._id}
                        className="align-middle text-center even:bg-gray-200 h-[70px]"
                      >
                        <td className="p-4 underline underline-offset-4">
                          <Link to={`/merchant-detail/${data._id}`}>
                            {data._id}
                          </Link>
                        </td>
                        <td className="p-4">{data.merchantName}</td>
                        <td className="p-4">{data.phoneNumber}</td>
                        <td className="p-4">{data.averageRating}</td>
                        <td className="p-4">{data.subscriptionStatus}</td>
                        <td className="p-4 capitalize">
                          {data.isServiceableToday}
                        </td>
                        <td className="p-4">{data.geofence}</td>

                        <td className="p-4">
                          <Switch
                            value={data?.status}
                            onChange={() => handleToggle(data._id)}
                          />
                        </td>
                        <td className="p-4">
                          <div className="flex space-x-2 justify-center">
                            <>
                              {data.isApproved === "Approved" && (
                                <p className="text-green-500">Approved</p>
                              )}

                              {data.isApproved === "Pending" && (
                                <>
                                  <CheckCircleOutlined
                                    className="text-2xl cursor-pointer text-green-500"
                                    onClick={() =>
                                      handleApprovedModal(data._id)
                                    }
                                    // onClick={() => handleApprove(data._id)}
                                  />

                                  <CloseCircleOutlined
                                    className="text-2xl cursor-pointer text-red-500"
                                    onClick={() => showModalReject(data._id)}
                                  />
                                </>
                              )}
                            </>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <Modal
              open={isConfirmModal}
              onCancel={handleCancel}
              centered
              footer={null}
            >
              <form onSubmit={(e) => handleApprove(e, selectedMerchantId)}>
                <p className="font-semibold text-[18px] p-2">
                  Are you sure want to Approve ?
                </p>
                <div className="flex justify-end mt-5 gap-6">
                  <button
                    type="button"
                    className="bg-cyan-100 px-5 py-1 rounded-md outline-none focus:outline-none font-semibold"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-teal-800 px-5 py-1 rounded-md outline-none focus:outline-none text-white"
                  >
                    {approveLoading ? "Approving..." : "Approve"}
                  </button>
                </div>
              </form>
            </Modal>

            <Modal
              title={<span className="font-bold text-[16px]">Reject?</span>}
              open={isModalReject}
              onCancel={handleCancel}
              centered
              footer={null}
            >
              <form onSubmit={(e) => handleReject(e, selectedMerchantId)}>
                <p className="text-[16px] py-2">Do you want to Reject ?</p>
                <div className="flex justify-end mt-5 gap-6">
                  <button
                    type="button"
                    className="bg-cyan-100 px-5 py-1 rounded-md outline-none focus:outline-none font-semibold"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-red-600 px-5 py-1 rounded-md outline-none focus:outline-none text-white"
                  >
                    {rejectLoading ? `Rejecting...` : `Reject`}
                  </button>
                </div>
              </form>
            </Modal>

            <div className="my-[30px] flex justify-center">
              <Pagination
                count={pagination.totalPages || 0}
                page={pagination.currentPage}
                onChange={handlePageChange}
                shape="rounded"
                siblingCount={0}
                hidePrevButton={!pagination.hasPrevPage}
                hideNextButton={!pagination.hasNextPage}
              />
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default Merchant;
