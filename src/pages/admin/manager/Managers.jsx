import React from "react";
import GlobalSearch from "../../../components/GlobalSearch";
import { FunnelPlotOutlined, PlusOutlined } from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";
import Sidebar from "../../../components/Sidebar";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Managers = () => {
  const dummyData = [
    {
      id: "1",
      name: "Adam",
      email: "adam@gmail.com",
      phone: "1234567",
      role: "Manager",
      geofence: "TVM",
      action: "",
    },
    {
      id: "2",
      name: "Famto",
      email: "famto@gmail.com",
      phone: "123456789",
      role: "Owner",
      geofence: "PMG",
      action: "",
    },
  ];

  const handleChange = (event) => {
    e.preventDefault();

    console.log(Account);
  };

  return (
    <>
      <Sidebar />
      <div className="pl-[300px] bg-gray-100 h-screen w-full">
        <nav className="p-7">
          <GlobalSearch />
        </nav>
        <div className="flex justify-between mt-5 px-5">
          <h1 className="font-bold text-[20px]"> Managers</h1>
          <Link to="/addmanager">
            {" "}
            <button className="bg-teal-800 rounded-md py-2 px-5 text-white">
              <PlusOutlined />
              {""}Add Manager
            </button>
          </Link>
        </div>
        <div className="bg-white p-5 mx-5 mb-5 mt-5 rounded-lg flex justify-between">
          <div className="flex gap-10">
            <select
              name="geofence"
              value={""}
              className="bg-blue-50 p-2 rounded-md"
              onChange={handleChange}
            >
              <option value="Option 1">Geofence</option>
              <option value="optioon 2">Tvm</option>
            </select>
          </div>
          <div className="flex gap-4">
            <p className="mt-2">
              <FunnelPlotOutlined />
            </p>
            <input
              type="search"
              name="search"
              placeholder="search Manager id"
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
                "Email",
                "Phone",
                "Role",
                "geoFence",
                "Action",
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
                <td>{dummyData.email}</td>
                <td>{dummyData.phone}</td>
                <td>{dummyData.role}</td>
                <td>{dummyData.geofence}</td>
                <td>
                  <button>
                    <EditOutlined className="bg-gray-200 p-3 mr-2 rounded-lg" />
                  </button>
                  <DeleteOutlined className="bg-gray-200 text-red-600 p-3 rounded-lg" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Managers;
