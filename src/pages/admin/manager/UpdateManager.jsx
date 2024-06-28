import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { BellOutlined, SearchOutlined } from "@ant-design/icons";
import { Switch } from "antd";

const UpdateManager = () => {
  const [managerData, setManagerData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    merchant: "",
    geofence: "",
    viewcustomes: "",
  });

  const inputChange = (e) => {
    setManagerData({ ...managerData, [e.target.name]: e.target.value });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    console.log(managerData);
  };

  return (
    <section className="flex font-poppins">
      <div className="w-64">
        <Sidebar />
      </div>
      <div className="w-full h-screen bg-gray-100">
        <div className="flex justify-end p-4 gap-3">
          <BellOutlined className="text-2xl text-gray-500" />
          <div className="relative">
            <input
              type="search"
              name="search"
              placeholder="Search"
              className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none mr-3"
            />
            <button type="submit" className="absolute right-0 top-0 mt-2 mr-4">
              <SearchOutlined className="text-xl text-gray-600" />
            </button>
          </div>
        </div>
        <div>
          <h1 className="text-xl font-semibold mt-7 mx-16">Update Manager</h1>
        </div>
        <div className="bg-white p-12 rounded-lg ml-[60px] mt-7 mr-[30px]">
          <form onSubmit={formSubmit}>
            <div className="flex flex-col gap-4">
              <div className="flex items-center">
                <label className="w-1/3 text-gray-500" htmlFor="name">
                  Name
                </label>
                <input
                  className="border-2 border-gray-300 rounded p-2 w-[45%]"
                  type="text"
                  placeholder="Name"
                  value={managerData.name}
                  id="name"
                  name="name"
                  onChange={inputChange}
                />
              </div>
              <div className="flex items-center">
                <label className="w-1/3 text-gray-500" htmlFor="email">
                  Email
                </label>
                <input
                  className="border-2 border-gray-300 rounded p-2 w-[45%]"
                  type="email"
                  placeholder="Email"
                  value={managerData.email}
                  id="email"
                  name="email"
                  onChange={inputChange}
                />
              </div>
              <div className="flex items-center">
                <label className="w-1/3 text-gray-500" htmlFor="phone">
                  Phone
                </label>
                <input
                  className="border-2 border-gray-300 rounded p-2 w-[45%]"
                  type="tel"
                  placeholder="Phone"
                  value={managerData.phone}
                  id="phone"
                  name="phone"
                  onChange={inputChange}
                />
              </div>
              <div className="flex items-center">
                <label className="w-1/3 text-gray-500" htmlFor="password">
                  Password
                </label>
                <input
                  className="border-2 border-gray-300 rounded p-2 w-[45%]"
                  type="password"
                  placeholder="Password"
                  value={managerData.password}
                  id="password"
                  name="password"
                  onChange={inputChange}
                />
              </div>
              <div className="flex items-center">
                <label className="w-1/3 text-gray-500" htmlFor="role">
                  Assign Role
                </label>
                <select
                  name="role"
                  value={managerData.role}
                  className="border-2 border-gray-300 rounded p-2 w-[45%]"
                  onChange={inputChange}
                >
                  <option value=""></option>
                  <option value="Option 1">Option 1</option>
                  <option value="Option 2">Option 2</option>
                </select>
              </div>
              <div className="flex items-center">
                <label className="w-1/3 text-gray-500" htmlFor="merchant">
                  Assign Merchant
                </label>
                <select
                  name="merchant"
                  value={managerData.merchant}
                  className="border-2 border-gray-300 rounded p-2 w-[45%]"
                  onChange={inputChange}
                >
                  <option value=""></option>
                  <option value="Option 1">Option 1</option>
                  <option value="Option 2">Option 2</option>
                </select>
              </div>
              <div className="flex items-center">
                <label className="w-1/3 text-gray-500" htmlFor="geofence">
                  Geofence
                </label>
                <select
                  name="geofence"
                  value={managerData.geofence}
                  className="border-2 border-gray-300 rounded p-2 w-[45%]"
                  onChange={inputChange}
                >
                  <option value=""></option>
                  <option value="Option 1">Option 1</option>
                  <option value="Option 2">Option 2</option>
                </select>
              </div>
              <div className="flex items-center">
                <label className="w-1/3 text-gray-500" htmlFor="viewcustomers">
                  View All Customers
                </label>

                <Switch />
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  className="bg-cyan-50 py-2 px-8 rounded-md"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="bg-teal-700 text-white py-2 px-10 rounded-md"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateManager;
