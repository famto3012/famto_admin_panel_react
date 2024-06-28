import React, { useState } from "react";
import GlobalSearch from "../../../components/GlobalSearch";
import { DownloadOutlined, FunnelPlotOutlined } from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";
import Sidebar from "../../../components/Sidebar";
import { Switch } from "antd";

const AccountLogs = () => {
  const dummyData = [
    {
      id: "1",
      name: "Bank",
      accountType: "Savings",
      description: "The bank account",
      dateTime: "18/06/2003",
      status: "",
    },
    {
      id: "2",
      name: "Bakery",
      accountType: "Current",
      description: "Account",
      dateTime: "18/05/2003",
      status: "",
    },
  ];

  const handleChange = (event) => {
    e.preventDefault();

    console.log(Account);
  };

  return (
    <>
      <Sidebar />
      <div className="pl-[250px] bg-gray-100 h-screen w-full">
        <nav className="p-7">
          <GlobalSearch />
        </nav>
        <div className="flex justify-between mt-5 px-5">
          <h1 className="font-bold text-[20px]"> Account Logs</h1>
          <button className="bg-teal-800 rounded-md py-2 px-5 text-white">
            <DownloadOutlined />
            {""} CSV
          </button>
        </div>
        <div className="bg-white p-5 mx-5 mb-5 mt-5 rounded-lg flex justify-between">
          <div className="flex gap-10">
            <select
              name="AccountType"
              value={""}
              className="bg-blue-50 p-2 rounded-md"
              onChange={handleChange}
            >
              <option value="Option 1">Account Type</option>
              <option value="optioon 2">Option 2</option>
            </select>
            <select
              name="Status"
              value={""}
              className="bg-blue-50 p-2 rounded-md"
              onChange={handleChange}
            >
              <option value="block">Blocked</option>
              <option value="unblock">Unblocked</option>
            </select>
          </div>
          <div className="flex gap-4">
            <input
              type="date"
              name="date"
              value={""}
              onChange={handleChange}
              className="right-4"
            />
            <p className="mt-2">
              <FunnelPlotOutlined />
            </p>
            <input
              type="search"
              name="search"
              placeholder="search User id"
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
                "Unblock/Restore",
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
            {dummyData.map((dummyData) => (
              <tr className="text-center bg-white h-20" key={dummyData.id}>
                <td>{dummyData.id}</td>
                <td>{dummyData.name}</td>
                <td>{dummyData.accountType}</td>
                <td>{dummyData.description}</td>
                <td>{dummyData.dateTime}</td>
                <td>
                  <Switch />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AccountLogs;
