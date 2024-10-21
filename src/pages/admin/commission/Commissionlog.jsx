import { useContext, useEffect, useRef, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { BellOutlined, SearchOutlined } from "@ant-design/icons";
import { ArrowBack } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";
import { Modal } from "antd";
import GIFLoader from "../../../components/GIFLoader";
import { FaCalendarAlt } from "react-icons/fa";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const Commissionlog = () => {
  const [commissionlog, setCommissionlog] = useState([]);
  const [allMerchants, setAllMerchants] = useState([]);
  const [selectedMerchant, setSelectedMerchant] = useState(null);

  const [search, setSearch] = useState("");

  const [selectedDate, setSelectedDate] = useState(null);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const [currentId, setCurrentId] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigate = useNavigate();
  const buttonRef = useRef(null);
  const { token, role, userId } = useContext(UserContext);

  useEffect(() => {
    if (role === "Admin") {
      getAllMerchants();
      getAllMerchantsLogs();
    }

    if (role === "Merchant") getSingleMerchantLogs();
  }, []);

  useEffect(() => {
    getSingleMerchantLogs();
  }, [selectedMerchant]);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (search !== "") {
        searchMerchantLogs();
      } else {
        getAllMerchantsLogs();
      }
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [search]);

  useEffect(() => {
    getLogsByDate();
  }, [selectedMerchant, selectedDate]);

  const getAllMerchants = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/merchants/admin/all-merchant-drop-down`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) setAllMerchants(response.data.data);
    } catch (err) {
      console.log(`Error in fetching all merchants : ${err}`);
    }
  };

  const getAllMerchantsLogs = async () => {
    try {
      setIsTableLoading(true);

      const response = await axios.get(
        `${BASE_URL}/admin/commission/all-commission-log`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200)
        setCommissionlog(response.data.data.commissionLogs);
    } catch (err) {
      console.log(`Error in fetching all merchants logs : ${err}`);
    } finally {
      setIsTableLoading(false);
    }
  };

  const getSingleMerchantLogs = async () => {
    try {
      setIsTableLoading(true);

      const merchantId = role === "Admin" ? selectedMerchant : userId;

      const response = await axios.get(
        `${BASE_URL}/admin/commission/commission-log/${merchantId}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200)
        setCommissionlog(response.data.data.commissionLogs);
    } catch (err) {
      console.log(`Error in fetching single merchants logs : ${err}`);
    } finally {
      setIsTableLoading(false);
    }
  };

  const searchMerchantLogs = async () => {
    try {
      setIsTableLoading(true);

      const response = await axios.get(
        `${BASE_URL}/admin/commission/commission-log-name?merchantName=${search}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200)
        setCommissionlog(response.data.data.commissionLogs);
    } catch (err) {
      console.log(`Error in searching merchant logs : ${err}`);
    } finally {
      setIsTableLoading(false);
    }
  };

  const getLogsByDate = async () => {
    try {
      setIsTableLoading(true);

      const merchantId = role === "Admin" ? selectedMerchant : userId;

      const response = await axios.get(
        `${BASE_URL}/admin/commission/commission-log-date`,
        {
          params: { date: selectedDate, merchantId },
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) setCommissionlog(response.data.data);
    } catch (err) {
      console.log(`Error in filtering by date : ${err}`);
    } finally {
      setIsTableLoading(false);
    }
  };

  const merchantOptions = allMerchants?.map((merchant) => ({
    label: merchant.merchantName,
    value: merchant._id,
  }));

  const showModal = (id) => {
    setCurrentId(id);
    setIsModalVisible(true);
  };

  const handleCancel = () => setIsModalVisible(false);

  const openDatePicker = () => setIsPickerOpen(true);

  const handleDateChange = (date) => {
    const formattedDate = date ? date.toLocaleDateString("en-CA") : null;

    setSelectedDate(formattedDate);
    setIsPickerOpen(false);
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
                <ArrowBack
                  className="ml-7 cursor-pointer"
                  onClick={() => navigate("/commission")}
                />
                <span className="text-lg font-semibold ml-3">
                  Commission log
                </span>
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
            <div
              className={`mx-11 rounded-lg mt-5 flex ${
                role === "Admin" ? "justify-between" : "justify-end"
              } `}
            >
              {role === "Admin" && (
                <Select
                  className="w-[200px] px-2 py-2 rounded-lg outline-none focus:outline-none "
                  value={merchantOptions.find(
                    (option) => option.value === selectedMerchant
                  )}
                  isMulti={false}
                  isSearchable={true}
                  onChange={(option) => setSelectedMerchant(option.value)}
                  options={merchantOptions}
                  placeholder="Select Merchant"
                  isClearable={false}
                />
              )}

              <div className="flex items-center ">
                <div className="relative flex items-center">
                  <button
                    ref={buttonRef}
                    onClick={openDatePicker}
                    className="flex items-center justify-center"
                  >
                    <FaCalendarAlt className="text-gray-400 text-xl" />
                  </button>

                  {isPickerOpen && (
                    <div
                      style={{
                        position: "absolute",
                        top: buttonRef.current?.offsetHeight + 5,
                        ...(role === "Merchant" ? { right: 0 } : { left: 0 }),
                        zIndex: 50,
                      }}
                    >
                      <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        inline
                        maxDate={new Date()}
                      />
                    </div>
                  )}
                </div>

                {role === "Admin" && (
                  <input
                    type="search"
                    name="search"
                    placeholder="Search merchant name"
                    className="bg-white p-3 rounded-3xl focus:outline-none outline-none text-[14px] ps-[20px] ms-3"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                )}
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
                        <p className="flex items-center justify-center h-20">
                          No data available
                        </p>
                      </td>
                    </tr>
                  )}
                  {!isTableLoading &&
                    commissionlog?.map((log) => (
                      <tr
                        key={log._id}
                        className="align-middle border-b border-gray-300 text-center h-20"
                      >
                        <td>
                          <Link
                            to={`/order-details/${log?.orderId}`}
                            className="underline underline-offset-4 px-4"
                          >
                            {log?.orderId}
                          </Link>
                        </td>
                        <td className="px-4">{log.merchantName}</td>
                        <td className="px-4">{log.paymentMode}</td>
                        <td className="px-4">{log.totalAmount}</td>
                        <td className="px-4">{log.payableAmountToMerchant}</td>
                        <td className="px-4">{log.payableAmountToFamto}</td>
                        <td className="flex items-center gap-6 px-[15px] py-4">
                          {log.status === "Unpaid" ? (
                            <button
                              className="bg-teal-700 text-white px-3 py-2 rounded-md text-sm flex items-center "
                              onClick={() => showModal(log._id)}
                            >
                              Set as paid
                            </button>
                          ) : (
                            <p>Paid</p>
                          )}

                          <Modal
                            onCancel={handleCancel}
                            footer={null}
                            open={
                              isModalVisible && currentId === commissionlog._id
                            }
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
                                onClick={() => {}}
                              >
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
