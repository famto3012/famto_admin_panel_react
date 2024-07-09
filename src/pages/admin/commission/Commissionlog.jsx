import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { BellOutlined, SearchOutlined } from "@ant-design/icons";
import { ArrowBack, FilterAltOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Commissionlog = () => {
  const [commissionlog, setCommissionlog] = useState([]);

  useEffect(() => {
    const fetchCommissionlog = async () => {
      const dummyData = [
        {
          orderId: "3",
          merchantName: "Nandhu",
          paymentMode: "Cash",
          totalAmount: "₹40.00",
          toMerchants: "₹36.00",
          famtoCommission: "₹4.00",
          status: "Unpaid",
        },
        // Add more customers as needed
      ];

      setCommissionlog(dummyData);
    };

    fetchCommissionlog();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="w-full h-screen pl-[290px] bg-gray-100">
      <div className="flex justify-between items-center">
            <div className="flex items-center">
        <ArrowBack  className="ml-7"/> <span className="text-lg font-semibold ml-3">Commission log</span>
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
        <div className="mx-11 rounded-lg mt-5 flex justify-between">
          <select
            name="type"
            defaultValue=""
            className="bg-cyan-100 px-4 outline-none focus:outline-none mr-6"
          >
            <option hidden value="">
              All Merchants
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
          <div className="flex items-center gap-4">
            <input
              type="date"
              name="date"
              value={""}
              // onChange={handleChange}
              className="right-4"
            />
            <FilterAltOutlined className="text-gray-400 mx-7" />
            <input
              type="search"
              name="search"
              placeholder="Search user ID"
              className="bg-white h-10 px-5 pr-2 rounded-full  w-72 text-sm focus:outline-none"
            />
            <button type="submit" className="absolute right-14 mt-2 ">
              <SearchOutlined className="text-xl text-gray-500 " />
            </button>
          </div>
        </div>
        <div className="overflow-auto mt-[40px] w-full pl-[10px]">
          <table className="text-start w-full ">
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
              {commissionlog.map((commissionlog) => (
                <tr
                  key={commissionlog.id}
                  className="align-middle border-b border-gray-300 text-center"
                >
                  <td>
                    <Link
                      to="/home"
                      className="underline underline-offset-4  "
                    >
                      {commissionlog.orderId}
                    </Link>
                  </td>
                  <td>{commissionlog.merchantName}</td>
                  <td>{commissionlog.paymentMode}</td>
                  <td>{commissionlog.totalAmount}</td>
                  <td>{commissionlog.toMerchants}</td>
                  <td>{commissionlog.famtoCommission}</td>
                  <td className="flex items-center gap-6 px-[15px] py-4">
                    {commissionlog.status}
                    <button className="bg-teal-700 text-white px-3 py-2 rounded-md text-sm flex items-center ">
                      Set as paid
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Commissionlog;
