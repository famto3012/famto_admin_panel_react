import React, { useContext, useEffect, useRef, useState } from "react";
import GlobalSearch from "../../../components/GlobalSearch";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import Sidebar from "../../../components/Sidebar";
import { Switch } from "antd";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import { UserContext } from "../../../context/UserContext";
import { formatDate, formatTime } from "../../../utils/formatter";
import GIFLoader from "../../../components/GIFLoader";
import { CSVLink } from "react-csv";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const AccountLogs = () => {
  const [type, setType] = useState([]);
  const [roleFilter, setRoleFilter] = useState("Merchant");
  const [dateFilter, setDateFilter] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const { role, token } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const navigate = useNavigate();
  const dateInputRef = useRef(null); // Create a ref for the date input

  useEffect(() => {
    // Fetch merchant details on initial render
    handleRoleFilter("Merchant");
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setType((prevType) => ({ ...prevType, [e.target.name]: e.target.value }));
    console.log(type);
  };

  const onRoleChange = (e) => {
    const selectedType = e.target.value;
    setRoleFilter(selectedType);
    if (selectedType !== "") {
      handleRoleFilter(selectedType);
    } else {
      setType([]);
    }
  };

  const handleRoleFilter = async (selectedType) => {
    try {
      setIsTableLoading(true);

      console.log(token);
      const roleResponse = await axios.get(
        `${BASE_URL}/admin/account-log/search-role`,
        {
          params: { role: selectedType },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (roleResponse.status === 200) {
        setType(roleResponse.data.data);
      }
    } catch (err) {
      console.log(`Error in fetching notification`, err);
    } finally {
      setIsTableLoading(false);
    }
  };

  // API to search user using name
  const onSearchChange = (e) => {
    const searchService = e.target.value;
    setSearchFilter(searchService);
    if (searchService !== "") {
      handleSearchChangeFilter(searchService);
    } else {
      setType([]);
    }
  };

  const handleSearchChangeFilter = async (searchService) => {
    try {
      console.log(token);
      const searchResponse = await axios.get(
        `${BASE_URL}/admin/account-log/search`,
        {
          params: { name: searchService },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (searchResponse.status === 200) {
        setType(searchResponse.data.data);
      }
    } catch (err) {
      console.log(`Error in fetching data`, err);
    }
  };

  const handleToggleChange = async (userId, currentStatus) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/admin/account-log/unblock-user/${userId}`,
        {},
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        // Update the user status in the state
        setType((prevType) =>
          prevType.map((user) =>
            user._id === userId ? { ...user, blocked: !currentStatus } : user
          )
        );
        toast({
          tit,
        });
      }
    } catch (err) {
      console.error(`Error in toggling user status: ${err.message}`);
    }
  };

  // API for filter using date.
  const onDateChange = (e) => {
    const searchDate = e.target.value;
    setDateFilter(searchDate);
    if (searchDate !== "") {
      handleDateChangeFilter(searchDate);
    } else {
      setType([]);
    }
    console.log(searchDate);
  };

  const handleDateChangeFilter = async (searchDate) => {
    try {
      console.log(token);
      const dateResponse = await axios.get(
        `${BASE_URL}/admin/account-log/search-date`,
        {
          params: { date: searchDate },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (dateResponse.status === 200) {
        setType(dateResponse.data.data);
      }
    } catch (err) {
      console.log(`Error in fetching data`, err);
    }
  };

  // Function to trigger the date input click
  const openDatePicker = () => {

    console.log("clicked")
    if (dateInputRef.newDate) {
      dateInputRef.newDate.click();
    }
  };

  // CSV Data

  const csvData = [
    { label: "USERID", key: "userId" },
    { label: "USERNAME", key: "fullName" },
    { label: "Role", key: "role" },
    { label: "Description", key: "description" },
    { label: "Time", key: "createdAt" },
    { label: "Blocked", key: "blocked" },
  ];

  return (
    <div>
      {isLoading ? (
        <GIFLoader />
      ) : (
        <>
          <Sidebar />
          <div className="pl-[300px] bg-gray-100 h-screen w-full">
            <nav className="p-7">
              <GlobalSearch />
            </nav>
            <div className="flex justify-between mt-5 px-5">
              <h1 className="font-bold text-[20px]">Account Logs</h1>
              <button className="bg-teal-800 rounded-md py-2 px-5 text-white">
                <CSVLink
                  data={type}
                  headers={csvData}
                  filename="Account-log.csv"
                >
                  <DownloadOutlined />
                  {""} CSV
                </CSVLink>
              </button>
            </div>
            <div className="bg-white p-5 mx-5 mb-5 mt-5 rounded-lg flex justify-between">
              <div className="flex gap-10">
                <select
                  name="AccountType"
                  value={roleFilter}
                  className="bg-blue-50 p-2 rounded-md outline-none focus:outline-none"
                  onChange={onRoleChange}
                >
                  <option value="Admin">Admin</option>
                  <option defaultValue="Merchant">Merchant</option>
                  <option value="Customer">Customer</option>
                </select>
                <select
                  name="Status"
                  value={""}
                  className="bg-blue-50 p-2 rounded-md outline-none focus:outline-none"
                  onChange={handleChange}
                >
                  <option value="block">Blocked</option>
                </select>
              </div>
              <div className="flex gap-4">
                <input
                  type="date"
                  name="date"
                  ref={dateInputRef} // Attach the ref to the input
                  value={dateFilter}
                  onChange={onDateChange}
                  className="hidden" // Keep the input hidden
                />
                <button
                  onClick={openDatePicker}
                  className="flex items-center justify-center"
                >
                  <FaCalendarAlt className="text-gray-400 text-xl" />
                </button>
                <p className="mt-2">
                  <FilterAltOutlinedIcon className="text-gray-400" />
                </p>
                <input
                  type="search"
                  name="search"
                  placeholder="Search User ID"
                  value={searchFilter}
                  onChange={onSearchChange}
                  className="bg-gray-100 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
                />
                <button type="submit" className="absolute right-16 mt-2">
                  <SearchOutlined className="text-xl text-gray-600" />
                </button>
              </div>
            </div>
            <table className="w-full">
              <thead>
                <tr>
                  {[
                    "Id",
                    "Name",
                    "Account Type",
                    "Description",
                    "Date and Time",
                    "Status",
                  ].map((header) => (
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
                    <td colSpan={6} className="text-center">
                      Loading Data...
                    </td>
                  </tr>
                )}
                {!isTableLoading &&
                  type.map((data) => (
                    <tr className="text-center bg-white h-20" key={data._id}>
                      <td>{data.userId}</td>
                      <td>{data.fullName}</td>
                      <td>{data.role}</td>
                      <td>{data.description}</td>
                      <td>
                        {formatDate(data.createdAt)}
                        <br />
                        {formatTime(data.createdAt)}
                      </td>
                      <td>
                        <Switch
                          checked={!data.blocked}
                          onChange={() =>
                            handleToggleChange(data._id, data.blocked)
                          }
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default AccountLogs;
