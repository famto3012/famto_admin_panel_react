import { BellOutlined, SearchOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";

const Notificationlog = () => {
  const [tableData, setTableData] = useState([
    {
      orderid: "3",
      notification: "alert",
      datetime: "18/06/2025",
    },
  ]);

  return (
    <>
      <Sidebar />
      <div className="w-full h-screen pl-[290px] bg-gray-100">
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
              <SearchOutlined className="text-xl text-gray-600" />
            </button>
          </div>
        </div>
        <div>
          <h1 className="text-lg font-bold mt-7 mx-11">Notification Log</h1>
        </div>
        <div className="overflow-x-auto">
          <table className="overflow-x-auto p-4 w-full mt-7">
            <thead>
              <tr>
                {["Order ID", "Notification", "Date & Time"].map((header) => (
                  <th
                    key={header}
                    className="bg-teal-800 text-white h-[70px] mt-10 px-5 text-center whitespace-nowrap border-r-2"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((dummyData) => (
                <tr className="text-center bg-white h-20 " key={dummyData.id}>
                  <td>{dummyData.orderid}</td>
                  <td>{dummyData.notification}</td>
                  <td>{dummyData.datetime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Notificationlog;
