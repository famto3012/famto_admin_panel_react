import React, { useContext, useEffect, useRef, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { BellOutlined, SearchOutlined } from "@ant-design/icons";
import { ArrowBack, FilterAltOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";
import { Modal } from "antd";
import { FaCalendar } from "react-icons/fa6";
import GIFLoader from "../../../components/GIFLoader";
import { FaCalendarAlt } from "react-icons/fa";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const Commissionlog = () => {
  const [commissionlog, setCommissionlog] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [merchantFilter, setMerchantFilter] = useState("");
  const [merchant, setMerchants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const navigate = useNavigate();
  const dateInputRef = useRef(null);
  const [isTableLoading,setIsTableLoading] = useState(false)
  const { token, role } = useContext(UserContext);

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [commissionResponse, merchantResponse] = await Promise.all([
          axios.get(`${BASE_URL}/admin/commission/all-commission-log`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BASE_URL}/merchants/admin/all-merchants`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        if (commissionResponse.status === 200) {
          setCommissionlog(commissionResponse.data.data.commissionLogs);
          console.log(commissionResponse.data.data);
        }
        if (merchantResponse.status === 200) {
          setMerchants(merchantResponse.data.data);
          console.log(merchantResponse.data.data);
        }
      } catch (err) {
        console.error(`Error in fetching data: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, role, navigate]);

  // API function search 

  const onSearchChange = (e) => {
    const searchService = e.target.value;
    setSearchFilter(searchService);
    if (searchService !== "") {
      handleSearchChangeFilter(searchService);
    } else {
      setCommissionlog([]);
    }
  };

  const handleSearchChangeFilter = async (searchService) => {
    try {
      setIsTableLoading(true)
      console.log(token);
      const searchResponse = await axios.get(
        `${BASE_URL}/admin/commission/commission-log-name`,
        {
          params: { merchantName: searchService },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (searchResponse.status === 200) {
        setCommissionlog(searchResponse.data.data.commissionLogs);
      }
    } catch (err) {
      console.log(`Error in fetching data`, err);
      setCommissionlog([])
    } finally{
      setIsTableLoading(false)
    }
  };

  // API function for date change

  const onDateChange = (e) => {
    const searchDate = e.target.value;
    setDateFilter(searchDate);
    if (searchDate !== "") {
      handleDateChangeFilter(searchDate);
    } else {
      setCommissionlog([]);
    }
    console.log(searchDate);
  };

  const handleDateChangeFilter = async (searchDate) => {
    try {
      setIsTableLoading(true)
      console.log(token);
      const dateResponse = await axios.get(
        `${BASE_URL}/admin/commission/commission-log-date`,
        {
          params: { date: searchDate },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (dateResponse.status === 200){
        setCommissionlog(dateResponse.data.data) 
      }
       
      
    } catch (err) {
      console.log(`Error in fetching data`, err);
      setCommissionlog([]);
    } finally{
      setIsTableLoading(false)
    }
  };

  // Function to trigger the date input click
  const openDatePicker = () => {
    console.log("clicked");
    if (dateInputRef.current) {
      dateInputRef.current.showPicker(); 
    }
  };

 // API Function  for Merchant Filter 
 
  const onMerchantChange = (e) => {
    const searchMerchant = e.target.value;
    setMerchantFilter(searchMerchant);
    if (searchMerchant !== "") {
      handleMerchantChangeFilter(searchMerchant);
    } else {
      setCommissionlog([]);
    }
  };

  const handleMerchantChangeFilter = async (searchMerchant) => {
    try {
      setIsTableLoading(true)
      console.log(token);
      const response = await axios.get(
        `${BASE_URL}/admin/commission/commission-log/${searchMerchant}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setCommissionlog(response.data.data.commissionLogs);
      }
    } catch (err) {
      console.log(`Error in fetching data`, err);
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
        `${BASE_URL}/admin/commission/commission-log/${id}`,
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
        setCommissionlog((prev) =>
          prev.map((commission) =>
            commission._id === id
              ? { ...commissionlog, status: "Paid" }
              : commissionlog
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
      <div className="w-full h-screen pl-[290px] bg-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <ArrowBack className="ml-7" />{" "}
            <span className="text-lg font-semibold ml-3">Commission log</span>
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
        <div className="mx-11 rounded-lg mt-5 flex justify-between">
          <select
            name="type"
            defaultValue=""
            className="bg-cyan-100 px-4 outline-none rounded-lg focus:outline-none mr-6"
            onChange={onMerchantChange}
            value={merchantFilter}
          >
            <option hidden value="">
              All Merchants
            </option>
            {merchant.map((merchant) => (
              <option value={merchant._id} key={merchant._id}>
                {merchant._id}
              </option>
            ))}
          </select>
          <div className="flex items-center ">
             <input
                  type="date"
                  name="date"
                  ref={dateInputRef} // Attach the ref to the input
                  value={dateFilter}
                  onChange={onDateChange}
                  className="hidden top-80" // Keep the input hidden
                  style={{ right: "40px", top: "200px" }}
                />
                 <button
                  onClick={openDatePicker}
                  className="flex items-center justify-center"
                >
                  <FaCalendarAlt className="text-gray-400 text-xl" />
                </button>
            <FilterAltOutlined className="text-gray-400 mx-7" />
            <input
              type="search"
              name="search"
              placeholder="Search merchant name"
              className="bg-white h-10 px-5 pr-2 rounded-full  w-72 text-sm focus:outline-none"
              value={searchFilter}
              onChange={onSearchChange}
            />
            <button type="submit" className="absolute right-14 mt-2 ">
              <SearchOutlined className="text-xl text-gray-500 " />
            </button>
          </div>
        </div>
        <div className="overflow-auto mt-[40px] w-full pl-[10px]">
          <table className="text-start w-full mb-24 ">
            <thead>
              <tr>
                {[
                  "Order ID",
                  "Merchant Name",
                  "Payment Mode",
                  "Total Amount",
                  "Payable Amount to Merchants",
                  "Commission Payable to Famto",
                  "Status",
                ].map((header, index) => (
                  <th
                    key={index}
                    className="bg-teal-700 text-center text-white py-[15px] border-r-2 border-[#eee]/50"
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
                      Loading Data...
                    </td>
                  </tr>
                )}
              {!isTableLoading && commissionlog?.length === 0 && (
                <tr>
                  <td colSpan={7}>
                    <p className="flex items-center justify-center h-20">No data available</p>
                  </td>
                </tr>
              )}
              {!isTableLoading && commissionlog?.map((commissionlog) => (
                <tr
                  key={commissionlog._id}
                  className="align-middle border-b border-gray-300 text-center h-20"
                >

                  <td>
                    <Link
                      to="/home"
                      className="underline underline-offset-4 px-4"
                    >
                      {commissionlog._id}
                    </Link>
                  </td>
                  <td className="px-4">{commissionlog.merchantName}</td>
                  <td className="px-4">{commissionlog.paymentMode}</td>
                  <td className="px-4">{commissionlog.totalAmount}</td>
                  <td className="px-4">
                    {commissionlog.payableAmountToMerchant}
                  </td>
                  <td className="px-4">{commissionlog.payableAmountToFamto}</td>
                  <td className="flex items-center gap-6 px-[15px] py-4">
                    {commissionlog.status === "Unpaid" ? (
                      <button
                        className="bg-teal-700 text-white px-3 py-2 rounded-md text-sm flex items-center "
                        onClick={() => showModal(commissionlog._id)}
                      >
                        Set as paid
                      </button>
                    ) : (
                      <p>Paid</p>
                    )}

                    <Modal
                      onCancel={handleCancel}
                      footer={null}
                      open={isModalVisible && currentId === commissionlog._id}
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
                          onClick={() => handleChange(commissionlog._id)}
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
      
      </div>
    </>
    )}
    </div>
  );
};

export default Commissionlog;
