import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import { Modal } from "antd";
import DatePicker from "react-datepicker";
import { useToast } from "@chakra-ui/react";

import { BellOutlined, SearchOutlined } from "@ant-design/icons";
import { ArrowBack } from "@mui/icons-material";
import { FaCalendarAlt } from "react-icons/fa";

import Sidebar from "../../../components/Sidebar";
import { UserContext } from "../../../context/UserContext";
import GIFLoader from "../../../components/GIFLoader";
import { formatDate } from "../../../utils/formatter";

import "react-datepicker/dist/react-datepicker.css";
import GlobalSearch from "../../../components/GlobalSearch";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const Subscriptioncustomer = () => {
  const [customerlog, setCustomerlog] = useState([]);
  const [merchantlog, setMerchantlog] = useState([]);
  const [merchant, setMerchants] = useState([]);

  const [searchMerchant, setSearchMerchant] = useState("");
  const [searchCustomer, setSearchCustomer] = useState("");

  const [merchantFilter, setMerchantFilter] = useState("");
  const [dateMerchantFilter, setDateMerchantFilter] = useState("");
  const [dateCustomerFilter, setDateCustomerFilter] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const [currentId, setCurrentId] = useState(null);

  const [selectedOption, setSelectedOption] = useState("Merchant");

  const [isTableLoading, setIsTableLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const customerButtonRef = useRef(null);
  const merchantButtonRef = useRef(null);

  const navigate = useNavigate();
  const toast = useToast();
  const { token, role, userId } = useContext(UserContext);

  useEffect(() => {
    if (role === "Admin") fetchAllMerchants();

    if (role === "Merchant") fetchSingleMerchantSubLogs();
  }, []);

  useEffect(() => {
    if (role === "Admin" && selectedOption === "Customer") {
      fetchCustomerSubLogs();
    } else if (role === "Admin" && selectedOption === "Merchant") {
      fetchMerchantSubLogs();
    }
  }, [selectedOption]);

  useEffect(() => {
    fetchMerchantSubLogByDate();
  }, [dateMerchantFilter]);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (searchMerchant !== "") {
        handleSearchMerchant();
      } else {
        fetchMerchantSubLogs();
      }
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [searchMerchant]);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (searchCustomer !== "") {
        handleSearchCustomer();
      } else {
        fetchCustomerSubLogs();
      }
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [searchCustomer]);

  const fetchAllMerchants = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/merchants/admin/all-merchant-drop-down`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setMerchants(response.data.data);
      }
    } catch (err) {
      console.error(`Error in fetching all merchants: ${err}`);
    }
  };

  const fetchMerchantSubLogs = async () => {
    try {
      setIsTableLoading(true);
      const response = await axios.get(
        `${BASE_URL}/admin/subscription-payment/merchant-subscription-log`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setMerchantlog(response.data.data);
      }
    } catch (err) {
      console.error(`Error in fetching all merchant logs: ${err}`);
    } finally {
      setIsTableLoading(false);
    }
  };

  const fetchCustomerSubLogs = async () => {
    try {
      setIsTableLoading(true);
      const response = await axios.get(
        `${BASE_URL}/admin/subscription-payment/customer-subscription-log`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setCustomerlog(response.data.data);
      }
    } catch (err) {
      console.error(`Error in fetching all customer logs: ${err}`);
    } finally {
      setIsTableLoading(false);
    }
  };

  const fetchSingleMerchantSubLogs = async () => {
    try {
      setIsTableLoading(true);

      const merchantId = role === "Admin" ? merchantFilter : userId;

      const response = await axios.get(
        `${BASE_URL}/admin/subscription-payment/merchant-subscription-log/${merchantId}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setMerchantlog(response.data.data);
        console.log(response.data.data);
      }
    } catch (err) {
      console.error(`Error in fetching single merchant logs: ${err}`);
    } finally {
      setIsTableLoading(false);
    }
  };

  const fetchMerchantSubLogByDate = async () => {
    try {
      setIsTableLoading(true);

      const merchantId = role === "Admin" ? merchantFilter : userId;

      const response = await axios.get(
        `${BASE_URL}/admin/subscription-payment/merchant-subscription-log-date`,
        {
          params: { startDate: dateMerchantFilter, merchantId },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setMerchantlog(response.data.data);
        console.log(response.data.data);
      }
    } catch (err) {
      console.error(`Error in fetching single merchant logs: ${err}`);
    } finally {
      setIsTableLoading(false);
    }
  };

  const handleMerchantFilter = async (option) => {
    try {
      setIsTableLoading(true);

      setMerchantFilter(option.value);

      const response = await axios.get(
        `${BASE_URL}/admin/subscription-payment/merchant-subscription-log/${option.value}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) setMerchantlog(response.data.data);
    } catch (err) {
      console.log(`Error in filtering merchants: ${err}`);
    } finally {
      setIsTableLoading(false);
    }
  };

  const handleMerchantDateFilter = async (date) => {
    try {
      setIsTableLoading(true);
      setIsPickerOpen(false);

      const formattedDate = date ? date.toLocaleDateString("en-CA") : null;

      const merchantId = role === "Admin" ? merchantFilter : userId;

      const response = await axios.get(
        `${BASE_URL}/admin/subscription-payment/merchant-subscription-log-date`,
        {
          params: { startDate: formattedDate, merchantId },
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) setMerchantlog(response.data.data);
    } catch (err) {
      console.log(`Error in merchant date filter: ${err}`);
    } finally {
      setIsTableLoading(false);
    }
  };

  const handleCustomerDateFilter = async (date) => {
    try {
      setIsTableLoading(true);
      setIsPickerOpen(false);

      const formattedDate = date ? date.toLocaleDateString("en-CA") : null;

      const response = await axios.get(
        `${BASE_URL}/admin/subscription-payment/customer-subscription-log-date`,
        {
          params: { startDate: formattedDate },
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) setCustomerlog(response.data.data);
    } catch (err) {
      console.log(`Error in customer date filter: ${err}`);
    } finally {
      setIsTableLoading(false);
    }
  };

  const handleSearchMerchant = async () => {
    try {
      setIsTableLoading(true);

      const response = await axios.get(
        `${BASE_URL}/admin/subscription-payment/merchant-subscription-log-search`,
        {
          params: { name: searchMerchant },
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data === 200) setMerchantlog(response.data.data);
    } catch (err) {
      console.log(`Error in searching merchant: ${err}`);
    } finally {
      setIsTableLoading(false);
    }
  };

  const handleSearchCustomer = async () => {
    try {
      setIsTableLoading(true);

      const response = await axios.get(
        `${BASE_URL}/admin/subscription-payment/customer-subscription-log-search`,
        {
          params: { name: searchCustomer },
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) setCustomerlog(response.data.data);
    } catch (err) {
      console.log(`Error in searching customer: ${err}`);
    } finally {
      setIsTableLoading(false);
    }
  };

  const merchantOptions = merchant?.map((merchant) => ({
    label: merchant.merchantName,
    value: merchant._id,
  }));

  const handleToggle = (value) => setSelectedOption(value);

  const openCustomerDatePicker = () => setIsPickerOpen(true);
  const openMerchantDatePicker = () => setIsPickerOpen(true);
  const handleCancel = () => setIsModalVisible(false);

  const showModal = (id) => {
    setCurrentId(id);
    setIsModalVisible(true);
  };

  return (
    <div>
      {isLoading ? (
        <GIFLoader />
      ) : (
        <>
          <Sidebar />
          <div className="pl-[290px] bg-gray-100">
            <div className="flex justify-between items-center pt-5 pe-4">
              <div className="flex items-center">
                <ArrowBack className="ml-7" onClick={() => navigate(-1)} />
                <span className="text-lg font-semibold ml-3">
                  Subscription log
                </span>
              </div>

              <GlobalSearch />
            </div>

            <div className="mx-3 mt-5">
              <div
                className={`flex items-center gap-3 ml-2  ${
                  role === "Admin" ? "justify-between" : "justify-end pe-4"
                }`}
              >
                {role === "Admin" && (
                  <label className="inline-flex outline-none cursor-pointer bg-transparent border-2 border-black p-1 rounded-full">
                    <span
                      onClick={() => handleToggle("Merchant")}
                      className={`px-4 py-2 transition-colors duration-300 rounded-full ${
                        selectedOption === "Merchant" &&
                        "bg-teal-700 text-white"
                      }`}
                    >
                      Merchant
                    </span>

                    <span
                      onClick={() => handleToggle("Customer")}
                      className={`px-4 py-2 transition-colors duration-300 rounded-full ${
                        selectedOption === "Customer" &&
                        "bg-teal-700 text-white"
                      }`}
                    >
                      Customer
                    </span>
                  </label>
                )}

                {selectedOption === "Customer" ? (
                  <div className="flex gap-7 items-center">
                    <div className="relative flex items-center">
                      <button
                        ref={customerButtonRef}
                        onClick={openCustomerDatePicker}
                        className="flex items-center justify-center"
                      >
                        <FaCalendarAlt className="text-gray-400 text-xl" />
                      </button>

                      {isPickerOpen && (
                        <div
                          style={{
                            position: "absolute",
                            top: customerButtonRef.current?.offsetHeight + 5,
                            left: 0,
                            zIndex: 50,
                          }}
                        >
                          <DatePicker
                            selected={dateCustomerFilter}
                            onChange={handleCustomerDateFilter}
                            inline
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end">
                      <input
                        type="search"
                        name="search"
                        placeholder="Search customer name"
                        className="bg-white h-10 p-3 rounded-full w-60 text-sm focus:outline-none "
                        value={searchCustomer}
                        onChange={(e) => setSearchCustomer(e.target.value)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-7 items-center">
                    {role === "Admin" && (
                      <Select
                        className="w-[200px] px-2 py-2 rounded-lg outline-none focus:outline-none "
                        value={merchantOptions.find(
                          (option) => option.value === merchantFilter
                        )}
                        isMulti={false}
                        isSearchable={true}
                        onChange={(option) => handleMerchantFilter(option)}
                        options={merchantOptions}
                        placeholder="Select Merchant"
                        isClearable={false}
                      />
                    )}

                    <div className="relative flex items-center">
                      <button
                        ref={merchantButtonRef}
                        onClick={openMerchantDatePicker}
                        className="flex items-center justify-center"
                      >
                        <FaCalendarAlt className="text-gray-400 text-xl" />
                      </button>

                      {isPickerOpen && (
                        <div
                          style={{
                            position: "absolute",
                            top: merchantButtonRef.current?.offsetHeight + 5,
                            ...(role === "Merchant"
                              ? { right: 0 }
                              : { left: 0 }),
                            zIndex: 50,
                          }}
                        >
                          <DatePicker
                            selected={dateMerchantFilter}
                            onChange={handleMerchantDateFilter}
                            inline
                          />
                        </div>
                      )}
                    </div>

                    {role === "Admin" && (
                      <div className="flex justify-end">
                        <input
                          type="search"
                          name="search"
                          placeholder="Search merchant name"
                          className="bg-white h-10 p-3 rounded-full w-60 text-sm focus:outline-none "
                          value={searchMerchant}
                          onChange={(e) => setSearchMerchant(e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {selectedOption === "Customer" ? (
              <div className="overflow-auto mt-[40px] max-h-[32rem]">
                <table className="text-start w-full ">
                  <thead className=" sticky top-0 left-0">
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
                          <p className="flex items-center justify-center h-20">
                            No data available
                          </p>
                        </td>
                      </tr>
                    )}

                    {!isTableLoading &&
                      customerlog?.map((customerlog) => (
                        <tr
                          key={customerlog._id}
                          className="align-middle border-b border-gray-300 text-center even:bg-white h-[70px]"
                        >
                          <td className="p-3">{customerlog.user}</td>
                          <td>{customerlog.userId}</td>
                          <td>{customerlog.plan}</td>
                          <td>{customerlog.amount}</td>
                          <td>{customerlog.paymentMode}</td>
                          <td className="px-[25px] text-green-400">
                            {customerlog.paymentStatus}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="overflow-auto mt-[40px] pl-[10px] max-h-[31rem]">
                <table className="text-start w-full ">
                  <thead className=" sticky top-0 left-0">
                    <tr>
                      {[
                        "Merchant Name",
                        "Subscription Plans",
                        "Total Amount",
                        "Payment Mode",
                        "Start Date",
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
                      <tr>
                        <td colSpan={6}>
                          <p className="flex items-center justify-center h-20">
                            No data available
                          </p>
                        </td>
                      </tr>
                    )}
                    {!isTableLoading &&
                      merchantlog?.map((merchantlog) => (
                        <tr
                          key={merchantlog._id}
                          className="align-middle border-b border-gray-300 text-center even:bg-white h-[70px]"
                        >
                          <td>{merchantlog.user}</td>
                          <td>{merchantlog.plan}</td>
                          <td>{merchantlog.amount}</td>
                          <td>{merchantlog.paymentMode}</td>
                          <td>{formatDate(merchantlog.startDate)}</td>
                          <td className="flex justify-center px-[15px] pt-5">
                            {merchantlog.paymentStatus === "Unpaid" ? (
                              <button
                                className="bg-teal-700 text-white px-3 py-2 rounded-md text-sm flex items-center "
                                onClick={() => showModal(merchantlog._id)}
                              >
                                Set as paid
                              </button>
                            ) : (
                              <p className="text-green-400">Paid</p>
                            )}

                            <Modal
                              title={
                                <span className="font-[500] text-[16px]">
                                  Confirm?
                                </span>
                              }
                              onCancel={handleCancel}
                              footer={null}
                              open={
                                isModalVisible && currentId === merchantlog._id
                              }
                              centered
                            >
                              <p className="text-[14px] my-3">
                                Do you want to confirm?
                              </p>
                              <div className="flex justify-end">
                                <button className="bg-cyan-100 px-5 py-1 rounded-md font-semibold">
                                  Cancel
                                </button>
                                <button
                                  className="bg-teal-900 px-5 py-1 rounded-md ml-3 text-white"
                                  onClick={() => handleChange(merchantlog._id)}
                                >
                                  {isConfirming ? `Confirming...` : `Confirm`}
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
