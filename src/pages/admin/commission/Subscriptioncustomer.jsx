import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { BellOutlined, SearchOutlined } from "@ant-design/icons";
import { ArrowBack, FilterAltOutlined } from "@mui/icons-material";

const Subscriptioncustomer = () => {
  const [customerlog, setCustomerlog] = useState([]);
  const [merchantlog, setMerchantlog] = useState([]);
  const [isMerchant, setIsMerchant] = useState(false);

  useEffect(() => {
    const fetchMerchantlog = async () => {
      const dummyData = [
        {
          merchantName: "Nandhu",
          subsciptionPlans: "Online",
          totalAmount: "₹40.00",
          paymentMode: "Online",
          date: "18-06-2024",
          status: "Unpaid",
        },
        // Add more customers as needed
      ];

      setMerchantlog(dummyData);
    };

    fetchMerchantlog();
  }, []);

  useEffect(() => {
    const fetchCustomerlog = async () => {
      const dummyData1 = [
        {
          customerName: "Paru",
          subsciptionPlans: "Online",
          totalAmount: "₹40.00",
          paymentMode: "Online",
          status: "Unpaid",
        },
        // Add more customers as needed
      ];

      setCustomerlog(dummyData1);
    };

    fetchCustomerlog();
  }, []);

  const [isCommission, setIsCommission] = useState(false);

  const handleToggle = () => {
    setIsCommission(!isCommission);
  };

  return (
    <>
      <Sidebar />
      <div className="pl-[290px] bg-gray-100">
        <div className="flex justify-between items-center">
            <div className="flex items-center">
        <ArrowBack  className="ml-7"/> <span className="text-lg font-semibold ml-3">Subscription log</span>
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
          <div className="flex justify-around items-center gap-3 ml-2 ">
          <label
            htmlFor="Toggle3"
            className="inline-flex outline-none bg-gray-200 cursor-pointer "
          >
            <input
              id="Toggle3"
              type="checkbox"
              className="hidden peer "
              onChange={handleToggle}
            />

            <span
              className={`px-2 py-2 rounded-md dark:bg-gray-200 ${
                isCommission
                  ? "peer-checked:dark: bg-teal-700 text-white"
                  : "peer-checked:dark: bg-gray-200"
              }`}
            >
              Customer
            </span>
            <span
              className={`px-2 py-2 rounded-md dark:bg-teal-800 ${
                isCommission
                  ? "peer-checked:dark: bg-gray-200"
                  : "peer-checked:dark: bg-teal-800 text-white"
              }`}
            >
              Merchant
            </span>
          </label>

          <div className=" rounded-lg  flex items-center ">
            {isCommission ? (
              ""
            ) : (
              <select
                name="type"
                defaultValue=""
                className="bg-cyan-100 px-2 py-2 outline-none focus:outline-none "
              >
                <option hidden value="">
                  MerchantName
                </option>
                <option value="customer" className="bg-white">
                  option1
                </option>
                <option value="agent" className="bg-white">
                  option2
                </option>
                <option value="merchant" className="bg-white">
                  option3
                </option>
              </select>
            )}
            </div>
            <div className="flex items-center">
              <input
                type="date"
                // name="date"
                value={""}
                // onChange={handleChange}
                className="p-2 rounded"
              />
              </div>
              <div className="flex items-center">
              <FilterAltOutlined className="text-gray-400 " />
              </div>
              <div className="relative flex justify-end">
              <input
                type="search"
                name="search"
                placeholder="Search alert notification name"
                className="bg-white h-10 p-3 rounded-full w-60 text-sm focus:outline-none "
              />
              <button type="submit" className="absolute right-0 mt-2 mr-4 ">
                <SearchOutlined className="text-xl text-gray-500" />
              </button>
              </div>
        
          </div>
          </div>
          {isCommission ? (
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
          )}
        </div>
    
    </>
  );
};

export default Subscriptioncustomer;
