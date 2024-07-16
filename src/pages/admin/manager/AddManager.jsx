import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { BellOutlined, SearchOutlined } from "@ant-design/icons";
import { Switch } from "antd";
import GlobalSearch from "../../../components/GlobalSearch";

const AddManager = () => {
  const [managerData, setManagerData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    merchant: "",
    geofenceId: "",
    viewCustomers: null,
  });

  const inputChange = (e) => {
    setManagerData({ ...managerData, [e.target.name]: e.target.value });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    console.log(managerData);
  };

  const onChange = (name, checked) => {
    setManagerData({ ...managerData, [name]: checked });
  };

  return (
    <>
      <Sidebar />

      <div className="w-full h-screen pl-[300px] bg-gray-100">
      <nav className="p-5">
          <GlobalSearch />
        </nav>
        <div>
          <h1 className="text-xl font-semibold mt-7 mx-11">Add Manager</h1>
        </div>

        <div className="bg-white p-10 rounded-lg mx-11 mt-7">
          <form onSubmit={formSubmit}>
            <div className="flex flex-col gap-4">
              <div className="flex items-center">
                <label className="w-1/3 text-gray-500" htmlFor="name">
                  Name
                </label>
                <input
                  className="border-2 border-gray-300 rounded p-2 w-[45%] outline-none focus:outline-none"
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
                  className="border-2 border-gray-300 rounded p-2 w-[45%] outline-none focus:outline-none"
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
                  className="border-2 border-gray-300 rounded p-2 w-[45%] outline-none focus:outline-none"
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
                  className="border-2 border-gray-300 rounded p-2 w-[45%] outline-none focus:outline-none"
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
                  className="border-2 border-gray-300 rounded p-2 w-[45%] outline-none focus:outline-none"
                  onChange={inputChange}
                >
                  <option hidden selected>
                    Select
                  </option>
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
                  className="border-2 border-gray-300 rounded p-2 w-[45%] outline-none focus:outline-none"
                  onChange={inputChange}
                >
                  <option hidden selected>
                    Select
                  </option>
                  <option value="Option 1">Option 1</option>
                  <option value="Option 2">Option 2</option>
                </select>
              </div>
              <div className="flex items-center">
                <label className="w-1/3 text-gray-500" htmlFor="geofenceId">
                  Geofence
                </label>
                <select
                  name="geofenceId"
                  value={managerData.geofenceId}
                  className="border-2 border-gray-300 rounded p-2 w-[45%] outline-none focus:outline-none"
                  onChange={inputChange}
                >
                  <option hidden selected>
                    Select
                  </option>
                  <option value="Option 1">Option 1</option>
                  <option value="Option 2">Option 2</option>
                </select>
              </div>

              <div className="flex items-center mt-2">
                <label className="w-1/3 text-gray-500" htmlFor="viewCustomers">
                  View All Customers
                </label>

                <Switch
                  onChange={(checked) => onChange("viewCustomers", checked)}
                  name="viewCustomers"
                />
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
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddManager;
