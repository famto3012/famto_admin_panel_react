import { BellOutlined, SearchOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import GlobalSearch from "../../../components/GlobalSearch";

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
      <nav className="p-5">
          <GlobalSearch />
        </nav>
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
