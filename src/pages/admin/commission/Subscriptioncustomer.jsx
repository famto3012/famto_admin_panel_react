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
const Subscriptioncustomer = () => {
  const [customerlog, setCustomerlog] = useState([]);
  const [merchantlog, setMerchantlog] = useState([]);
  const [isMerchant, setIsMerchant] = useState(false);
  const [isLoading,setIsLoading] = useState(false)
  const {token,role} = useContext(UserContext);
  const navigate= useNavigate();
  const [isSubscription, setIsSubscription] = useState(false);

  useEffect(() => {
    if (!token || role !== "Admin") {
      navigate("auth/login");
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);

        const [merchantResponse, customerResponse] =
          await Promise.all([
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
          setMerchantlog(merchantResponse.data.data);
        }
        if (customerResponse.status === 200) {
          setCustomerlog(customerResponse.data.data);
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
  const dateInputRef = useRef(null);
  const openDatePicker = () => {
    console.log("clicked");
    if (dateInputRef.current) {
      dateInputRef.current.showPicker(); // Open the date picker using showPicker()
    }
  };

  return (
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
            {isSubscription ? <CustomerSub /> : <MerchantSub />}
          </div>
        </div>
        {/* {isSubscription ? (
          <div className="overflow-auto mt-[40px]">
            <table className="text-start w-full ">
              <thead>
                <tr>
                  {[
                    "Customer Name",
                    "Subscription Plans",
                    "Total Amount",
                    "Payment Mode",
                    "Status",
                  ].map((header, index) => (
                    <th
                      key={index}
                      className="bg-teal-700 text-center text-white py-[15px]  border-r-2 border-[#eee]/50"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {customerlog.map((customerlog) => (
                  <tr
                    key={customerlog.id}
                    className="align-middle border-b border-gray-300 text-center "
                  >
                    <td className="p-3">{customerlog.customerName}</td>
                    <td>{customerlog.subsciptionPlans}</td>
                    <td>{customerlog.totalAmount}</td>
                    <td>{customerlog.paymentMode}</td>
                    <td className="px-[25px]">{customerlog.status}</td>
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
                      className="bg-teal-700 text-center text-white py-[15px] px-[10px] border-r-2 border-[#eee]/50"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {merchantlog.map((merchantlog) => (
                  <tr
                    key={merchantlog.id}
                    className="align-middle border-b border-gray-300 text-center"
                  >
                    <td>{merchantlog.merchantName}</td>
                    <td>{merchantlog.subsciptionPlans}</td>
                    <td>{merchantlog.totalAmount}</td>
                    <td>{merchantlog.paymentMode}</td>
                    <td>{merchantlog.date}</td>

                    <td className="flex items-center justify-center gap-6 px-[15px] py-4">
                      {merchantlog.status}
                      <button className="bg-teal-700 text-white px-3 py-2 rounded-md text-sm flex items-center ">
                        Set as paid
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )} */}
      </div>
    </>
  );
};

export default Subscriptioncustomer;
