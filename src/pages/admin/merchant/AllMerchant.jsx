import { useContext, useEffect, useState } from "react";
import {
  PlusOutlined,
  ArrowDownOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Switch } from "antd";
import Sidebar from "../../../components/Sidebar";
import GlobalSearch from "../../../components/GlobalSearch";
import { UserContext } from "../../../context/UserContext";
import GIFLoader from "../../../components/GIFLoader";
import axios from "axios";
import { CSVLink } from "react-csv";
import AddMerchant from "../../../components/model/Merchant/AddMerchant";
import { useToast } from "@chakra-ui/react";
import { allMerchantCSVDataHeading } from "../../../utils/DefaultData";
import { Pagination } from "@mui/material";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const Merchant = () => {
  const [allMerchants, setAllMerchants] = useState([]);
  const [allGeofences, setAllGeofences] = useState([]);
  const [allBusinessCategories, setAllBusinessCategories] = useState([]);

  const [serviceable, setServiceable] = useState("");
  const [geofence, setGeofence] = useState("");
  const [businessCategory, setBusinessCategory] = useState("");
  const [search, setSearch] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [approveLoading, setApproveLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isConfirmModal, setIsConfirmModal] = useState(false); // Modal to approve merchant
  const [isModalReject, setIsModalReject] = useState(false); // Modal to Reject Merchant

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [pagination, setPagination] = useState({});

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
        console.error(`Error in fetching data: ${err}`);
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
        console.log(`Error in filtering merchant: ${err}`);

        toast({
          title: "Error",
          description: `Error in filtering merchant`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsTableLoading(false);
      }
    };

    filterHandler();
  }, [serviceable, geofence, businessCategory, token, role]);

  useEffect(() => {
    const handleSearchMerchant = async () => {
      try {
        setIsTableLoading(true);
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
        console.log(
          `Error in searching orders: ${err.response?.data || err.message}`
        );

        toast({
          title: "Error",
          description: `Error in searching merchant`,
          status: "error",
          duration: 5000,
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
      console.log(`Error in getting all merchants`);
    }
  };

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
      console.log(`Error in changing merchant status: ${err}`);
      toast({
        title: "Error",
        description: `Error in changing merchant status`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
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

        toast({
          title: "Success",
          description: response.data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(`Error in approving merchant: ${err}`);
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

        toast({
          title: "Success",
          description: "Rejected Merchant Successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(`Error in rejecting merchant: ${err}`);
      toast({
        title: "Error",
        description: `Error in rejecting merchant`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
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
        console.log(`Error in filtering merchant: ${err}`);

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
    console.log(search);
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
        console.log(
          `Error in searching orders: ${err.response?.data || err.message}`
        );

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
  }, [search]);

  const handleApprovedModal = () => {
    setIsConfirmModal(true);
  };

  const showModalReject = () => {
    setIsModalReject(true);
  };

  const handleCancel = () => {
    setIsConfirmModal(false);
    setIsModalReject(false);
  };

  return (
    <div>
      {isLoading ? (
        <GIFLoader />
      ) : (
        <>
          <Sidebar />
          <main className="pl-[300px] bg-gray-100 h-screen">
            <nav className="p-5">
              <GlobalSearch />
            </nav>

            <div className="flex justify-between items-center px-[30px]">
              <h1 className="text-[18px] font-semibold">Merchants</h1>
              <div className="flex space-x-2 justify-end ">
                <button className="bg-cyan-100 text-black rounded-md px-4 py-2 font-semibold flex items-center space-x-2">
                  <CSVLink
                    data={allMerchants}
                    headers={allMerchantCSVDataHeading}
                    filename={"All_Merchants.csv"}
                  >
                    <ArrowDownOutlined /> <span>CSV</span>
                  </CSVLink>
                </button>
                <div>
                  <button
                    className="bg-teal-800 text-white rounded-md px-4 py-2 font-semibold  flex items-center space-x-1 "
                    onClick={toggleModal}
                  >
                    <PlusOutlined /> <span>Add Merchant</span>
                  </button>
                  <AddMerchant
                    isVisible={isModalVisible}
                    toggleModal={toggleModal}
                    BASE_URL={BASE_URL}
                    token={token}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center bg-white p-5 mx-5 rounded-lg justify-between mt-[20px] px-[30px]">
              <div className="flex items-center gap-[20px]">
                <select
                  className="bg-blue-50 text-gray-900 text-sm rounded-lg focus:focus:outline-none outline-none block w-full p-2.5"
                  name="serviceable"
                  value={serviceable}
                  onChange={(e) => setServiceable(e.target.value)}
                >
                  <option defaultValue={"Serviceable"} hidden>
                    Serviceable
                  </option>
                  <option value="All">All</option>
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                </select>

                <select
                  className="bg-blue-50  text-gray-900 text-sm rounded-lg focus:focus:outline-none outline-none block w-full p-2.5"
                  name="geofence"
                  value={geofence}
                  onChange={(e) => setGeofence(e.target.value)}
                >
                  <option defaultValue={"Geofence"} hidden>
                    Geofence
                  </option>
                  <option value="All">All</option>
                  {allGeofences.map((geofence) => (
                    <option value={geofence._id} key={geofence._id}>
                      {geofence.name}
                    </option>
                  ))}
                </select>

                <select
                  className="bg-blue-50 w-full text-gray-900 text-sm rounded-lg focus:focus:outline-none outline-none block p-2.5"
                  name="businessCategory"
                  value={businessCategory}
                  onChange={(e) => setBusinessCategory(e.target.value)}
                >
                  <option defaultValue={"Business category"} hidden>
                    Business category
                  </option>
                  <option value="All">All</option>
                  {allBusinessCategories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-[30px]">
                <div>
                  <FilterAltOutlinedIcon className="text-gray-400" />
                </div>
                <div className="relative w-full">
                  <div>
                    <input
                      type="search"
                      onChange={onSearch}
                      className="bg-gray-100 relative p-2 w-64 rounded-2xl outline-none focus:outline-none cursor-pointer"
                      placeholder="Search merchant"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-auto mt-[20px] w-full">
              <table className="text-start w-full">
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
                    <tr>
                      <td
                        colSpan={9}
                        className="text-center py-[20px] bg-gray-50"
                      >
                        Loading data...
                      </td>
                    </tr>
                  )}

                  {!isTableLoading && allMerchants.length === 0 && (
                    <tr>
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
                        className="align-middle border-b border-gray-300"
                      >
                        <td className="p-4 underline underline-offset-4">
                          <Link to={`/merchant-detail/${data._id}`}>
                            {data._id}
                          </Link>
                        </td>
                        <td className="p-4">{data.merchantName}</td>
                        <td className="p-4">{data.phoneNumber}</td>
                        <td className="p-4">{data.averageRating}</td>
                        <td className="p-4">{data.isApproved}</td>
                        <td className="p-4 capitalize">
                          {data.isServiceableToday}
                        </td>
                        <td className="p-4">{data.geofence}</td>

                        <td className="p-4">
                          <Switch
                            value={
                              data?.isServiceableToday === "open" ? true : false
                            }
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
                                    onClick={handleApprovedModal}
                                    // onClick={() => handleApprove(data._id)}
                                  />
                                  <Modal
                                    open={isConfirmModal}
                                    onCancel={handleCancel}
                                    centered
                                    footer={null}
                                  >
                                    <form
                                      onSubmit={(e) =>
                                        handleApprove(e, data._id)
                                      }
                                    >
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
                                          {approveLoading
                                            ? "Approving..."
                                            : "Approve"}
                                        </button>
                                      </div>
                                    </form>
                                  </Modal>
                                  <CloseCircleOutlined
                                    className="text-2xl cursor-pointer text-red-500"
                                    onClick={showModalReject}
                                  />
                                  <Modal
                                    open={isModalReject}
                                    onCancel={handleCancel}
                                    centered
                                    footer={null}
                                  >
                                    <form
                                      onSubmit={(e) =>
                                        handleReject(e, data._id)
                                      }
                                    >
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
                                          className="bg-red-600 px-5 py-1 rounded-md outline-none focus:outline-none text-white"
                                        >
                                          Reject
                                        </button>
                                      </div>
                                    </form>
                                  </Modal>
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
