import React, { useContext, useEffect, useState } from "react";
import GlobalSearch from "../../../components/GlobalSearch";
import { PlusOutlined } from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";
import Sidebar from "../../../components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";
import { RiDeleteBinLine } from "react-icons/ri";
import { Modal, Spin } from "antd";
import { MdOutlineEdit } from "react-icons/md";
import { FilterAltOutlined } from "@mui/icons-material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useToast } from "@chakra-ui/react";

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

  const [manager, setManager] = useState([]);
  const [currentManager, setCurrentManager] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [geofence, setGeofence] = useState([]);
  const [geofenceFilter, setGeofenceFilter] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { token, role } = useContext(UserContext);
  const toast = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token || role !== "Admin") {
      navigate("auth/login");
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);

        const [managerResponse, geofenceResponse] = await Promise.all([
          axios.get(`${BASE_URL}/admin/managers`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BASE_URL}/admin/geofence/get-geofence`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        if (managerResponse.status === 200) {
          setManager(managerResponse.data.data);
        }
        if (geofenceResponse.status === 200) {
          setGeofence(geofenceResponse.data.geofences);
          console.log(geofence);
        }
      } catch (err) {
        console.error(`Error in fetching data: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, role, navigate]);

  const onGeofenceChange = (e) => {
    const selectedService = e.target.value;
    setGeofenceFilter(selectedService);
    if (selectedService !== "") {
      handleGeofenceFilter(selectedService);
    } else {
      setManager([]);
    }
  };

  const handleGeofenceFilter = async (selectedService) => {
    try {
      console.log(token);
      const serviceResponse = await axios.get(
        `${BASE_URL}/admin/managers/filter`,
        {
          params: { query: selectedService },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (serviceResponse.status === 200) {
        setManager(serviceResponse.data.data);
      }
    } catch (err) {
      console.log(`Error in fetching manager`, err);
    }
  };
  const onSearchChange = (e) => {
    const searchService = e.target.value;
    setSearchFilter(searchService);
    if (searchService !== "") {
      handleSearchChangeFilter(searchService);
    } else {
      setManager([]);
    }
  };

  const handleSearchChangeFilter = async (searchService) => {
    try {
      console.log(token);
      const searchResponse = await axios.get(
        `${BASE_URL}/admin/managers/search`,
        {
          params: { query: searchService },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (searchResponse.status === 200) {
        setManager(searchResponse.data.data);
      }
    } catch (err) {
      console.log(`Error in fetching manager`, err);
    }
  };

  const handleChange = (event) => {
    e.preventDefault();

    console.log(Account);
  };

  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  const showModalDelete = (managerId) => {
    setCurrentManager(managerId);
    console.log(managerId);
    setIsShowModalDelete(true);
  };

  const removeBanner = (managerId) => {
    setManager(manager.filter((manager) => manager._id !== managerId));
  };

  // New function to handle confirm delete
  const handleConfirmDelete = () => {
    setIsShowModalDelete(false);
    setCurrentManager(null);
  };

  const handleCancel = () => {
    setIsShowModalDelete(false);
  };
  const handleDelete = async (currentManager) => {
    try {
      setConfirmLoading(true);

      const deleteResponse = await axios.delete(
        `${BASE_URL}/admin/managers/delete-manager/${currentManager}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (deleteResponse.status === 200) {
        removeBanner(currentManager);

        toast({
          title: "Manager Deleted",
          description: "Manager deleted successfully.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        handleConfirmDelete();
      }
    } catch (err) {
      console.error("Error in deleting banner:", err);
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="pl-[300px] bg-gray-100 h-screen w-screen">
        <nav className="p-7">
          <GlobalSearch />
        </nav>
        <div className="flex justify-between mt-5 px-5">
          <h1 className="font-bold text-[20px]"> Managers</h1>
          <Link to="/add-manager">
            {" "}
            <button className="bg-teal-800 rounded-md py-2 px-5 text-white">
              <PlusOutlined className="mr-2" />
              Add Manager
            </button>
          </Link>
        </div>
        <div className="bg-white p-5 mx-5 mb-5 mt-5 rounded-lg flex justify-between">
          <div className="flex gap-10">
            <select
              name="type"
              value={geofenceFilter}
              className="bg-blue-50 p-2 rounded-md outline-none focus:outline-none"
              onChange={onGeofenceChange}
            >
              <option hidden value="">
                Geofence
              </option>
              {geofence.map((geoFence) => (
                <option value={geoFence._id} key={geoFence._id}>
                  {geoFence.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-4">
            <p className="mt-2">
              <FilterAltOutlinedIcon className="text-gray-500" />
            </p>
            <input
              type="search"
              name="search"
              placeholder="Search Manager Name"
              className="bg-gray-100 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
              value={searchFilter}
              onChange={onSearchChange}
            />
            <button type="submit" className="absolute right-16 mt-2">
              <SearchOutlined className="text-xl text-gray-600" />
            </button>
          </div>
        </div>
        <div className="mb-24 overflow-auto">
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
              {manager.map((manager) => (
                <tr key={manager._id} className="text-center bg-white h-20">
                  <td>{manager._id}</td>
                  <td>{manager.name}</td>
                  <td>{manager.email}</td>
                  <td>{manager.phoneNumber}</td>
                  <td>{manager.role}</td>
                  <td>{manager.geofenceId.name}</td>
                  <td>
                    <div className="flex  justify-center gap-3">
                      <button>
                        <Link to={`/update-manager/${manager._id}`}>
                          <MdOutlineEdit className="bg-gray-200 rounded-lg p-2 text-[35px]" />
                        </Link>
                      </button>
                      <button
                        className="outline-none focus:outline-none"
                        onClick={() => showModalDelete(manager._id)}
                      >
                        <RiDeleteBinLine className="text-red-900 rounded-lg bg-red-100 p-2 text-[35px]" />
                      </button>
                      <Modal
                        onCancel={handleCancel}
                        footer={null}
                        open={isShowModalDelete}
                        centered
                      >
                        <p className="font-semibold text-[18px] mb-5">
                          <Spin spinning={confirmLoading}>
                            Are you sure want to delete?
                          </Spin>
                        </p>
                        <div className="flex justify-end">
                          <button
                            className="bg-cyan-100 px-5 py-1 rounded-md font-semibold"
                            onClick={handleCancel}
                          >
                            Cancel
                          </button>
                          <button
                            className="bg-red-100 px-5 py-1 rounded-md ml-3 text-red-700"
                            onClick={() => handleDelete(currentManager)}
                          >
                            Delete
                          </button>
                        </div>
                      </Modal>
                    </div>
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
