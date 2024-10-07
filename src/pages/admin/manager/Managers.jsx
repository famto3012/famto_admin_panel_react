import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import GlobalSearch from "../../../components/GlobalSearch";
import Sidebar from "../../../components/Sidebar";
import { UserContext } from "../../../context/UserContext";
import { Modal, Spin } from "antd";
import { useToast } from "@chakra-ui/react";
import { PlusOutlined } from "@ant-design/icons";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import GIFLoader from "../../../components/GIFLoader";
import Select from "react-select";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const Managers = () => {
  const [allManagers, setAllManagers] = useState([]);
  const [geofence, setGeofence] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [currentManager, setCurrentManager] = useState(null);
  const [geofenceFilter, setGeofenceFilter] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const { token, role } = useContext(UserContext);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || role !== "Admin") {
      navigate("auth/login");
      return;
    }

    fetchData();
  }, [token, role, navigate]);

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
        setAllManagers(managerResponse.data.data);
      }
      if (geofenceResponse.status === 200) {
        setGeofence(geofenceResponse.data.geofences);
      }
    } catch (err) {
      console.error(`Error in fetching data: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const geofenceOptions = [
    { label: "All", value: "all" },
    ...geofence.map((geofence) => ({
      label: geofence.name,
      value: geofence._id,
    })),
  ];

  // API function for geofence
  const onGeofenceChange = (e) => {
    const selectedService = e.target.value;
    setGeofenceFilter(selectedService);
    if (selectedService !== "") {
      handleGeofenceFilter(selectedService);
    } else {
      fetchData();
    }
  };

  const handleGeofenceFilter = async (selectedService) => {
    try {
      setIsTableLoading(true);
      const serviceResponse = await axios.get(
        `${BASE_URL}/admin/managers/filter`,
        {
          params: { query: selectedService },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (serviceResponse.status === 200) {
        setAllManagers(serviceResponse.data.data);
      }
    } catch (err) {
      console.log(`Error in fetching manager`, err);
    } finally {
      setIsTableLoading(false);
    }
  };

  //API function for search
  const onSearchChange = (e) => {
    const searchService = e.target.value;
    setSearchFilter(searchService);
    if (searchService !== "") {
      handleSearchChangeFilter(searchService);
    } else {
      fetchData();
    }
  };

  const handleSearchChangeFilter = async (searchService) => {
    try {
      setIsTableLoading(true);
      const searchResponse = await axios.get(
        `${BASE_URL}/admin/managers/search`,
        {
          params: { query: searchService },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (searchResponse.status === 200) {
        setAllManagers(searchResponse.data.data);
      }
    } catch (err) {
      console.log(`Error in fetching manager`, err);
    } finally {
      setIsTableLoading(false);
    }
  };

  // Modal function for Delete
  const showModalDelete = (managerId) => {
    setCurrentManager(managerId);

    setIsShowModalDelete(true);
  };

  const removeBanner = (managerId) => {
    setAllManagers(allManagers.filter((manager) => manager._id !== managerId));
  };

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
          title: "Success",
          description: "Manager deleted successfully.",
          status: "success",
          duration: 3000,
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
    <div>
      {isLoading ? (
        <GIFLoader />
      ) : (
        <>
          <Sidebar />
          <div className="pl-[300px] bg-gray-100 h-screen w-screen">
            <nav className="p-7">
              <GlobalSearch />
            </nav>

            <div className="flex justify-between mt-5 px-5">
              <h1 className="font-bold text-[20px]"> Managers</h1>
              <Link to="/add-manager">
                <button className="bg-teal-800 rounded-md py-2 px-5 text-white">
                  <PlusOutlined className="mr-2" />
                  Add Manager
                </button>
              </Link>
            </div>

            <div className="bg-white p-5 mx-5 mb-5 mt-5 rounded-lg flex justify-between">
              <div className="flex gap-10">
                <Select
                  options={geofenceOptions}
                  value={geofenceOptions.find(
                    (option) => option.value === geofenceFilter
                  )}
                  onChange={(option) => setGeofenceFilter(option.value)}
                  className=" bg-cyan-50 min-w-[10rem]"
                  placeholder="Geofence"
                  isSearchable={false}
                  isMulti={false}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      paddingRight: "",
                    }),
                    dropdownIndicator: (provided) => ({
                      ...provided,
                      padding: "10px",
                    }),
                  }}
                />
              </div>

              <div className="flex gap-4">
                <p className="mt-2">
                  <FilterAltOutlinedIcon className="text-gray-500" />
                </p>
                <input
                  type="search"
                  name="search"
                  placeholder="Search Manager Name"
                  className="bg-gray-100 h-10 px-3 rounded-full text-sm outline-none focus:outline-none"
                  value={searchFilter}
                  onChange={onSearchChange}
                />
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
                      "Geofence",
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
                  {isTableLoading && (
                    <tr>
                      <td colSpan={7} className="text-center">
                        Loading Data...
                      </td>
                    </tr>
                  )}

                  {!isTableLoading && allManagers.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center py-[20px] bg-gray-200"
                      >
                        No Data Available...
                      </td>
                    </tr>
                  )}

                  {!isTableLoading &&
                    allManagers?.map((manager) => (
                      <tr
                        key={manager._id}
                        className="text-center bg-white h-20"
                      >
                        <td>{manager._id}</td>
                        <td>{manager.name}</td>
                        <td>{manager.email}</td>
                        <td>{manager.phoneNumber}</td>
                        <td>{manager.role}</td>
                        <td>{manager?.geofenceId?.name || "N/A"}</td>
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
      )}
    </div>
  );
};

export default Managers;
