import React, { useContext, useEffect, useRef, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { BellOutlined, SearchOutlined } from "@ant-design/icons";
import { ArrowBack, FilterAltOutlined } from "@mui/icons-material";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal } from "antd";
import { FaCalendar } from "react-icons/fa6";
import GIFLoader from "../../../components/GIFLoader";
import { FaCalendarAlt } from "react-icons/fa";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const Subscriptioncustomer = () => {
  const [customerlog, setCustomerlog] = useState([]);
  const [merchantlog, setMerchantlog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [merchantFilter, setMerchantFilter] = useState("");
  const [merchant, setMerchants] = useState([]);
  const [searchMerchant, setSearchMerchant] = useState("");
  const [searchCustomer, setSearchCustomer ] = useState("");
  const [dateMerchantFilter, setDateMerchantFilter] = useState("");
  const [dateCustomerFilter, setDateCustomerFilter] = useState("");
  const { token, role } = useContext(UserContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const navigate = useNavigate();
  const [isSubscription, setIsSubscription] = useState(false);
  const dateMerchantInput = useRef(null);
  const dateCustomerInput = useRef(null);

  useEffect(() => {
    if (!token || role !== "Admin") {
      navigate("auth/login");
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);

        const [merchantResponse, customerResponse, allmerchantResponse] =
          await Promise.all([
            axios.get(
              `${BASE_URL}/admin/subscription-payment/merchant-subscription-log`,
              {
                withCredentials: true,
                headers: { Authorization: `Bearer ${token}` },
              }
            ),
            axios.get(
              `${BASE_URL}/admin/subscription-payment/customer-subscription-log`,
              {
                withCredentials: true,
                headers: { Authorization: `Bearer ${token}` },
              }
            ),
            axios.get(`${BASE_URL}/merchants/admin/all-merchants`, {
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);
        if (merchantResponse.status === 200) {
          setMerchantlog(merchantResponse.data.subscriptionLogs || []);
        }
        if (customerResponse.status === 200) {
          setCustomerlog(customerResponse.data.subscriptionLogs || []);
        }
        if (allmerchantResponse.status === 200) {
          setMerchants(allmerchantResponse.data.data);
        }
      } catch (err) {
        console.error(`Error in fetching data: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, role, navigate]);

  const handleToggle = () => {
    setIsSubscription(!isSubscription);
  };

  // API function for search in Customer Subscription log

  const onSearchCustomerChange = (e) => {
    const searchService = e.target.value;
    setSearchCustomer(searchService);
    if (searchService !== "") {
      handleSearchCustomerChangeFilter(searchService);
    } else {
      setCustomerlog([]);
    }
  };

  const handleSearchCustomerChangeFilter = async (searchService) => {
    try {
      setIsTableLoading(true)
      console.log(token);
      const searchResponse = await axios.get(
        `${BASE_URL}/admin/subscription-payment/customer-subscription-log-search`,
        {
          params: { name: searchService },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (searchResponse.status === 200) {
        setCustomerlog(searchResponse.data);
      }
    } catch (err) {
      console.log(`Error in fetching data`, err);
      setCustomerlog([]);
    } finally{
      setIsTableLoading(false)
    }
  };

  // API function for date change in Customer Subscriptionlog

  const onDateCustomerChange = (e) => {
    const searchDate = e.target.value;
    setDateCustomerFilter(searchDate);
    if (searchDate !== "") {
      handleCustomerDateChangeFilter(searchDate);
    } else {
      setCustomerlog([]);
    }
    console.log(searchDate)
  };

  const handleCustomerDateChangeFilter = async (searchDate) => {
    try {
      setIsTableLoading(true)
      console.log(token);
      const dateResponse = await axios.get(
        `${BASE_URL}/admin/subscription-payment/customer-subscription-log-date`,
        {
          params: { startDate: searchDate },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (dateResponse.status === 200) {
        setCustomerlog(dateResponse.data.data);
        console.log(dateResponse.data.message)
      }
    } catch (err) {
      console.log(`Error in fetching data`, err);
      setCustomerlog([]);
    } finally{
      setIsTableLoading(false)
    }
  };

   // Function to trigger the date input click
   const openCustomerDatePicker = () => {
    console.log("clicked");
    if (dateCustomerInput.current) {
      dateCustomerInput.current.showPicker(); 
    }
  };

  // API function for Merchant Filter in Merchant Subscription log

  const onMerchantChange = (e) => {
    const searchMerchant = e.target.value;
    setMerchantFilter(searchMerchant);
    if (searchMerchant !== "") {
      handleMerchantChangeFilter(searchMerchant);
    } else {
      setMerchantlog([]);
    }
  };

  const handleMerchantChangeFilter = async (searchMerchant) => {
    try {
      console.log(token);
      const response = await axios.get(
        `${BASE_URL}/admin/subscription-payment/merchant-subscription-log/${searchMerchant}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setMerchantlog(response.data.combinedData);
        console.log("fetched", response.data.subscriptionLogs);
      }
    } catch (err) {
      console.log(`Error in fetching data`, err);
      setMerchantlog([]);
    }
  };

  // API function for date in Merchant Subscription log

  const onDateMerchantChange = (e) => {
    const searchDate = e.target.value;
    setDateMerchantFilter(searchDate);
    if (searchDate !== "") {
      handleMerchantDateChangeFilter(searchDate);
    } else {
      setMerchantlog([]);
    }
    console.log(searchDate)
  };

  const handleMerchantDateChangeFilter = async (searchDate) => {
    try {
      console.log(token);
      const dateResponse = await axios.get(
        `${BASE_URL}/admin/subscription-payment/merchant-subscription-log-date`,
        {
          params: { startDate: searchDate },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (dateResponse.status === 200) {
        setMerchantlog(dateResponse.data);
        console.log(dateResponse.data.message)
      }
    } catch (err) {
      console.log(`Error in fetching data`, err);
      setMerchantlog([]);
    }
  };

   // Function to trigger the date input click
   const openMerchantDatePicker = () => {
    console.log("clicked");
    if (dateMerchantInput.current) {
      dateMerchantInput.current.showPicker(); // Open the date picker using showPicker()
    }
  };

  // API function for search in Merchant Subscription log

  const onSearchMerchantChange = (e) => {
    const searchService = e.target.value;
    setSearchMerchant(searchService);
    if (searchService !== "") {
      handleSearchMerchantChangeFilter(searchService);
    } else {
      setMerchantlog([]);
    }
  };

  const handleSearchMerchantChangeFilter = async (searchService) => {
    try {
     setIsTableLoading(true) 
      console.log(token);
      const searchResponse = await axios.get(
        `${BASE_URL}/admin/subscription-payment/merchant-subscription-log-search`,
        {
          params: { name: searchService },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (searchResponse.status === 200) {
        setMerchantlog(searchResponse.data || []);
        
      }
    } catch (err) {
      console.log(`Error in fetching data`, err);
      setMerchantlog([]);
    } finally{
      setIsTableLoading(false) 
    }
  };
  
  // Modal Function

  const showModal = (id) => {
    setCurrentId(id);
    console.log(id);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = async (id) => {
    console.log("id", id);
    try {
      const response = await axios.put(
        `${BASE_URL}/admin/subscription-payment/merchant-subscription-status-update/${id}`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        handleCancel();
        setMerchantlog((prev) =>
          prev.map((merchant) =>
            merchant._id === id
              ? { ...merchantlog, status: "Paid" }
              : merchantlog
          )
        );
        console.log(response.data.status);
      } else {
        console.log(`Unexpected response status: ${response.status}`);
      }
    } catch (err) {
      console.error(`Error in handleApprove: ${err.message}`);
    }
  };

  return (
    <div>
    {isLoading ? (
      <GIFLoader />
    ) : (
    <>
      <Sidebar />
      <div className="pl-[290px] bg-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <ArrowBack className="ml-7" />{" "}
            <span className="text-lg font-semibold ml-3">Subscription log</span>
          </div>
          <div className="flex justify-end p-4 gap-7">
            <BellOutlined className="text-2xl text-gray-500" />
            <div className="relative">
              <input
                type="search"
                name="search"
                placeholder="Search"
                className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none mr-6"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-2 mr-9"
              >
                <SearchOutlined className="text-xl text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        <div className="mx-3 mt-5">
          <div className="flex justify-between items-center gap-3 ml-2 ">
            <div>
              <label
                htmlFor="Toggle3"
                className="inline-flex outline-none gap-5 cursor-pointer "
              >
                <input
                  id="Toggle3"
                  type="checkbox"
                  className="hidden peer "
                  onChange={handleToggle}
                />

                <span
                  className={`px-4 py-2 rounded-lg dark:bg-gray-100 ${
                    isSubscription
                      ? "peer-checked:dark:bg-teal-800 text-white"
                      : "peer-checked:dark:bg-gray-100"
                  }`}
                >
                  Customer
                </span>
                <span
                  className={`px-4 py-2 rounded-lg dark:bg-teal-800 ${
                    isSubscription
                      ? "peer-checked:dark:bg-gray-100"
                      : "peer-checked:dark:bg-teal-800 text-white"
                  }`}
                >
                  Merchant
                </span>
              </label>
            </div>
            {isSubscription ? (
              <div className="flex gap-7">
                <div className="flex items-center">
                <input
                  type="date"
                  name="date"
                  ref={dateCustomerInput} // Attach the ref to the input
                  value={dateCustomerFilter}
                  onChange={onDateCustomerChange}
                  className="hidden top-80" // Keep the input hidden
                  style={{ right: "40px", top: "200px" }}
                />
                 <button
                  onClick={openCustomerDatePicker}
                  className="flex items-center justify-center"
                >
                  <FaCalendarAlt className="text-gray-400 text-xl" />
                </button>
                </div>
                <div className="flex items-center">
                  <FilterAltOutlined className="text-gray-400 " />
                </div>
                <div className="relative flex justify-end">
                  <input
                    type="search"
                    name="search"
                    placeholder="Search customer name"
                    className="bg-white h-10 p-3 rounded-full w-60 text-sm focus:outline-none "
                    value={searchCustomer}
                    onChange={onSearchCustomerChange}
                  />
                  <button type="submit" className="absolute right-0 mt-2 mr-4 ">
                    <SearchOutlined className="text-xl text-gray-500" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex gap-7">
                <select
                  name="type"
                  defaultValue=""
                  className="bg-cyan-100 px-2 py-2 rounded-lg outline-none focus:outline-none "
                  value={merchantFilter}
                  onChange={onMerchantChange}
                >
                  <option hidden value="">
                    MerchantName
                  </option>
                  {merchant.map((merchant) => (
                    <option value={merchant._id} key={merchant._id}>
                      {merchant._id}
                    </option>
                  ))}
                </select>
                <div className="flex items-center">
                  <input
                    type="date"
                    name="date"
                    ref={dateMerchantInput} // Attach the ref to the input
                    value={dateMerchantFilter}
                    onChange={onDateMerchantChange}
                    className="hidden top-80" // Keep the input hidden
                    style={{ right: "40px", top: "200px" }}
                  />
                  <button
                    onClick={openMerchantDatePicker}
                    className="flex items-center justify-center"
                  >
                    <FaCalendarAlt className="text-gray-400 text-xl" />
                  </button>
                </div>
                <div className="flex items-center">
                  <FilterAltOutlined className="text-gray-400 " />
                </div>
                <div className="relative flex justify-end">
                  <input
                    type="search"
                    name="search"
                    placeholder="Search merchant name"
                    className="bg-white h-10 p-3 rounded-full w-60 text-sm focus:outline-none "
                    value={searchMerchant}
                    onChange={onSearchMerchantChange}
                  />
                  <button type="submit" className="absolute right-0 mt-2 mr-4 ">
                    <SearchOutlined className="text-xl text-gray-500" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {isSubscription ? (
          <div className="overflow-auto mt-[40px]">
            <table className="text-start w-full ">
              <thead>
                <tr>
                  {[
                    "Customer Name",
                    "Customer Id",
                    "Subscription Plans",
                    "Total Amount",
                    "Payment Mode",
                    "Status",
                  ].map((header, index) => (
                    <th
                      key={index}
                      className="bg-teal-700 text-center text-white py-[15px]  border-r-2 border-[#eee]/50 h-20"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
              {isTableLoading && (
                  <tr>
                    <td colSpan={6} className="text-center h-20">
                      Loading Data...
                    </td>
                  </tr>
                )}
                 {!isTableLoading && customerlog?.length === 0 && (
                <tr>
                  <td colSpan={6}>
                    <p className="flex items-center justify-center h-20">No data available</p>
                  </td>
                </tr>
              )}
                {!isTableLoading && customerlog?.map((customerlog) => (
                  <tr
                    key={customerlog._id}
                    className="align-middle border-b border-gray-300 text-center h-2092.3
                    "
                  >
                    <td className="p-3">{customerlog.user}</td>
                    <td>{customerlog.userId}</td>
                    <td>{customerlog.planId}</td>
                    <td>{customerlog.amount}</td>
                    <td>{customerlog.paymentMode}</td>
                    <td className="px-[25px]">{customerlog.paymentStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-auto mt-[40px]  pl-[10px]">
            <table className="text-start w-full ">
              <thead>
                <tr>
                  {[
                    "Merchant Name",
                    "Subscription Plans",
                    "Total Amount",
                    "Payment Mode",
                    "Date",
                    "Status",
                  ].map((header, index) => (
                    <th
                      key={index}
                      className="bg-teal-700 text-center text-white py-[15px] px-[10px] border-r-2 border-[#eee]/50 h-20"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
              {isTableLoading && (
                  <tr>
                    <td colSpan={6} className="text-center h-20">
                      Loading Data...
                    </td>
                  </tr>
                )}
                  {!isTableLoading && merchantlog?.length === 0 && (
                <tr >
                  <td colSpan={6}>
                    <p className="flex items-center justify-center h-20">No data available</p>
                  </td>
                </tr>
              )}
                {!isTableLoading && merchantlog?.map((merchantlog) => (
                  <tr
                    key={merchantlog._id}
                    className="align-middle border-b border-gray-300 text-center h-20"
                  >
                    <td>{merchantlog.user}</td>
                    <td>{merchantlog.planId}</td>
                    <td>{merchantlog.amount}</td>
                    <td>{merchantlog.paymentMode}</td>
                    <td>{merchantlog.startDate}</td>
                    <td className="flex items-center gap-6 px-[15px] py-4">
                      {merchantlog.paymentStatus === "Unpaid" ? (
                        <button
                          className="bg-teal-700 text-white px-3 py-2 rounded-md text-sm flex items-center "
                          onClick={() => showModal(merchantlog._id)}
                        >
                          Set as paid
                        </button>
                      ) : (
                        <p>Paid</p>
                      )}

                      <Modal
                        onCancel={handleCancel}
                        footer={null}
                        open={isModalVisible && currentId === merchantlog._id}
                        centered
                      >
                        <p className="font-semibold text-[18px] mb-5">
                          Are you sure you want to confirm?
                        </p>
                        <div className="flex justify-end">
                          <button className="bg-cyan-100 px-5 py-1 rounded-md font-semibold">
                            NO
                          </button>
                          <button
                            className="bg-teal-900 px-5 py-1 rounded-md ml-3 text-white"
                            onClick={() => handleChange(merchantlog._id)}
                          >
                            {" "}
                            YES
                          </button>
                        </div>
                      </Modal>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
    )}
    </div>
  );
};

export default Subscriptioncustomer;
