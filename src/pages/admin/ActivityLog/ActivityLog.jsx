import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

import GlobalSearch from "../../../components/GlobalSearch";

import { UserContext } from "../../../context/UserContext";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const ActivityLog = () => {
  const [allLogs, setAllLogs] = useState([]);
  const [isTableLoading, setIsTableLoading] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();
  const { token, role } = useContext(UserContext);

  useEffect(() => {
    if (!token || role !== "Admin") navigate("/auth/login");

    const getActivityLogs = async () => {
      try {
        setIsTableLoading(true);

        const response = await axios.get(`${BASE_URL}/admin/activity-log`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setAllLogs(response.data);
          console.log(response.data);
        }
      } catch (err) {
        toast({
          title: "Error",
          description: "Error in getting all logs",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsTableLoading(false);
      }
    };

    getActivityLogs();
  }, []);

  return (
    <>

      <div className="pl-[300px] bg-gray-100 h-screen w-full">
        <nav className="p-7">
          <GlobalSearch />
        </nav>

        <div className="py-4 flex items-center">
          <p className="ps-4 text-[20px] font-[600]">
            Account Logs{" "}
            <span className="text-gray-400 text-[16px]">( Last 10 days )</span>
          </p>
        </div>

        <table className="w-full">
          <thead>
            <tr>
              {["Date and Time", "Description"].map((header) => (
                <th
                  key={header}
                  className="bg-teal-800 text-white h-[70px] text-center"
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

            {isTableLoading && allLogs.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center h-20">
                  No logs available
                </td>
              </tr>
            )}

            {!isTableLoading &&
              allLogs?.map((log, index) => (
                <tr
                  className="text-center bg-white even:bg-gray-100 h-12"
                  key={index}
                >
                  <td className="text-[16px]">
                    {log.date} at {log.time}
                  </td>
                  <td className="text-start text-[16px]">{log.description}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ActivityLog;
