import React, { useContext, useEffect, useRef, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { BellOutlined, SearchOutlined } from "@ant-design/icons";
import { ArrowBack, FilterAltOutlined } from "@mui/icons-material";
import MerchantSub from "../../../components/model/SubscriptionModels/MerchantSub";
import CustomerSub from "../../../components/model/SubscriptionModels/CustomerSub";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const SubscriptionCustomer = () => {
  const [customerLog, setCustomerLog] = useState([]);
  const [merchantLog, setMerchantLog] = useState([]);
  const [isSubscription, setIsSubscription] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { token, role } = useContext(UserContext);
  const navigate = useNavigate();
  const dateInputRef = useRef(null);

  useEffect(() => {
    if (!token || role !== "Admin") {
      navigate("/auth/login");
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [merchantResponse, customerResponse] = await Promise.all([
          axios.get(`${BASE_URL}/admin/subscription-payment/merchant-subscription-log`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BASE_URL}/admin/subscription-payment/customer-subscription-log`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (merchantResponse.status === 200) {
          setMerchantLog(merchantResponse.data.data);
        }
        if (customerResponse.status === 200) {
          setCustomerLog(customerResponse.data.data);
        }
      } catch (err) {
        console.error(`Error fetching data: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, role, navigate]);

  const handleToggle = () => {
    setIsSubscription(!isSubscription);
  };

  const openDatePicker = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker(); // Open the date picker
    }
  };

  return (
    <>
      <Sidebar />
      <div className="pl-[290px] bg-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <ArrowBack className="ml-7" />
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
              <button type="submit" className="absolute right-0 top-0 mt-2 mr-9">
                <SearchOutlined className="text-xl text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        <div className="mx-3 mt-5">
          <div className="flex justify-between items-center gap-3 ml-2">
            <div>
              <label htmlFor="Toggle3" className="inline-flex outline-none gap-5 cursor-pointer">
                <input
                  id="Toggle3"
                  type="checkbox"
                  className="hidden peer"
                  onChange={handleToggle}
                />
                <span
                  className={`px-4 py-2 rounded-lg ${
                    isSubscription ? "peer-checked:dark:bg-gray-100 text-white" : "peer-checked:dark:bg-teal-800"
                  }`}
                >
                  Subscription
                </span>
                <span
                  className={`px-4 py-2 rounded-lg ${
                    !isSubscription ? "peer-checked:dark:bg-gray-100 text-white" : "peer-checked:dark:bg-teal-800"
                  }`}
                >
                  Commission
                </span>
              </label>
            </div>
            <div className="flex gap-10">
              {!isSubscription && (
                <div className="rounded-lg flex items-center">
                  <select
                    name="type"
                    defaultValue=""
                    className="bg-cyan-100 px-2 py-2 rounded-lg outline-none focus:outline-none"
                  >
                    <option hidden value="">MerchantName</option>
                    <option value="customer">Option1</option>
                    <option value="agent">Option2</option>
                    <option value="merchant">Option3</option>
                  </select>
                </div>
              )}
              <div className="flex items-center">
                <input
                  type="date"
                  ref={dateInputRef}
                  onClick={openDatePicker}
                  className="p-2 rounded"
                />
              </div>
              <div className="flex items-center">
                <FilterAltOutlined className="text-gray-400" />
              </div>
              <div className="relative flex justify-end">
                <input
                  type="search"
                  name="search"
                  placeholder="Search merchant name"
                  className="bg-white h-10 p-3 rounded-full w-60 text-sm focus:outline-none"
                />
                <button type="submit" className="absolute right-0 mt-2 mr-4">
                  <SearchOutlined className="text-xl text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {isSubscription ? (
          <div className="overflow-auto mt-[40px]">
            <table className="text-start w-full">
              <thead>
                <tr>
                  {["Customer Name", "Subscription Plans", "Total Amount", "Payment Mode", "Status"].map((header, index) => (
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
                {customerLog.map((log) => (
                  <tr key={log.id} className="align-middle border-b border-gray-300 text-center">
                    <td className="p-3">{log.customerName}</td>
                    <td>{log.subscriptionPlans}</td>
                    <td>{log.totalAmount}</td>
                    <td>{log.paymentMode}</td>
                    <td className="px-[25px]">{log.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-auto mt-[40px] pl-[10px]">
            <table className="text-start w-full">
              <thead>
                <tr>
                  {["Merchant Name", "Subscription Plans", "Total Amount", "Payment Mode", "Date", "Status"].map((header, index) => (
                    <th
                      key={index}
                      className="bg-teal-700 text-center text-white py-[15px] px-[10px] border-r-2 border-[#eee]/50"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {merchantLog.map((log) => (
                  <tr key={log.id} className="align-middle border-b border-gray-300 text-center">
                    <td>{log.merchantName}</td>
                    <td>{log.subscriptionPlans}</td>
                    <td>{log.totalAmount}</td>
                    <td>{log.paymentMode}</td>
                    <td>{log.date}</td>
                    <td className="flex items-center justify-center gap-6 px-[15px] py-4">
                      {log.status}
                      <button className="bg-teal-700 text-white px-3 py-2 rounded-md text-sm flex items-center">
                        Set as paid
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default SubscriptionCustomer;
