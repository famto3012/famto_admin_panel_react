import { BellOutlined, SearchOutlined } from "@ant-design/icons";
import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import GlobalSearch from "../../../components/GlobalSearch";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
import { formatDate, formatTime } from "../../../utils/formatter";
import TablePagination from '@mui/material/TablePagination';
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const Notificationlog = () => {
  const { token, role } = useContext(UserContext);
  const [tableData, setTableData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    if (role === "Admin") {
      getAdminNotificationLog(page, limit);
    } else if (role === "Merchant") {
      getMerchantNotificationLog(page, limit);
    }
  }, [page, limit]);

  const getAdminNotificationLog = async (page, limit) => {
    try {
      console.log(token);
      const response = await axios.get(
        `${BASE_URL}/admin/notification/get-admin-notification-log`,
        {
          params: { page, limit },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        // const {data} = response.data;
        setTableData(response.data.data);
        setPagination(response.data);
      }
    } catch (err) {
      console.log("Error in fetching agent: ", err);
    }
  };

  const getMerchantNotificationLog = async (page, limit) => {
    try {
      console.log(token);
      const response = await axios.get(
        `${BASE_URL}/admin/notification/get-merchant-notification-log`,
        {
          params: { page, limit },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        // const {data} = response.data;
        setTableData(response.data.data);
        setPagination(response.data);
        // console.log("response", response.data);
      }
    } catch (err) {
      console.log("Error in fetching agent: ", err);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

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
        <TablePagination
          // component="div"
          count={100}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={limit}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <div className="overflow-x-auto">
          <table className="overflow-x-auto p-4 w-full mt-7">
            <thead>
              <tr>
                {["Order ID / Image", "Notification", "Date & Time"].map(
                  (header) => (
                    <th
                      key={header}
                      className="bg-teal-800 text-white h-[70px] mt-10 px-5 text-center whitespace-nowrap border-r-2"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {tableData.map((table) => (
                <tr className="text-center bg-white h-20 " key={table._id}>
                  <td className="p-2 flex items-center justify-center">
                    {table.orderId ? (
                      table.orderId
                    ) : (
                      <img
                        className="w-[150px] h-[80px]"
                        src={table.imageUrl}
                      />
                    )}
                  </td>
                  <td className="mt-2">
                    <span className="font-bold block">{table.title}</span>
                    <span className="block">{table.description}</span>
                  </td>
                  <td>
                    {" "}
                    {`${formatDate(table.createdAt)} ${formatTime(
                      table.createdAt
                    )}`}
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

export default Notificationlog;
