import React, { useContext, useState } from "react";
import GlobalSearch from "../../../components/GlobalSearch";
import { FunnelPlotOutlined, PlusOutlined } from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";
import Sidebar from "../../../components/Sidebar";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const Managers = () => {
  // const [allManagers, setAllManagers] = useState([]);

  // const navigate = useNavigate();

  // const { isLoggedIn } = useContext(UserContext);

  // const token = isLoggedIn;

  // useEffect(() => {
  //   if (!token) {
  //     navigate("/login");
  //   }

  //   const getAllManagers = async () => {
  //     try {
  //       const response = await axios.get(`${BASE_URL}/admin/managers`, {
  //         withCredentials: true,
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });

  //       if (response.status === 200) {
  //         setAllManagers(response.data.data);
  //       }
  //     } catch (err) {
  //       console.log(`Error in getting all managers: ${err}`);
  //     }
  //   };

  //   getAllManagers();
  // }, [token]);

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
          <Link to="/add-manager">
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
           
              <tr className="text-center bg-white h-20">
                <td>Dummy Data</td>
                <td>Dummy Data</td>
                <td>Dummy Data</td>
                <td>Dummy Data</td>
                <td>Dummy Data</td>
                <td>Dummy Data</td>
                <td>
                  <button>
                    <EditOutlined className="bg-gray-200 p-3 mr-2 rounded-lg" />
                  </button>
                  <DeleteOutlined className="bg-gray-200 text-red-600 p-3 rounded-lg" />
                </td>
              </tr>
       
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Managers;



// {allManagers.map((manager) => (
//   <tr className="text-center bg-white h-20" key={manager._id}>
//     <td>{manager._id}</td>
//     <td>{manager.name}</td>
//     <td>{manager.email}</td>
//     <td>{manager.phoneNumber}</td>
//     <td>{manager.role}</td>
//     <td>{manager.geofenceId.name}</td>
//     <td>
//       <button>
//         <EditOutlined className="bg-gray-200 p-3 mr-2 rounded-lg" />
//       </button>
//       <DeleteOutlined className="bg-gray-200 text-red-600 p-3 rounded-lg" />
//     </td>
//   </tr>
// ))}