import React, { useContext, useEffect, useState } from "react";
import {
  SearchOutlined,
  BellOutlined,
  PlusOutlined,
  ArrowDownOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Switch } from "antd";
import Sidebar from "../../../components/Sidebar";
import GlobalSearch from "../../../components/GlobalSearch";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { CSVLink } from "react-csv";
import AddAgentModal from "../../../components/model/AgentModels/AddAgentModal";
import GIFLoader from "../../../components/GIFLoader";
import { FaIndianRupeeSign } from "react-icons/fa6";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const DeliveryAgent = () => {
  const [agent, setAgent] = useState([]);
  const [geofence, setGeofence] = useState([]);
  const [salary, setSalary] = useState([]);
  const [manager, setManager] = useState([]);
  const [geofenceFilter, setGeofenceFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [vehicleTypeFilter, setFilterVehicleType] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const { token, role } = useContext(UserContext);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || role !== "Admin") {
      navigate("/auth/login");
      return;
    }

    const fetchAgent = async () => {
      try {
        setIsLoading(true);

        const [
          agentResponse,
          geofenceResponse,
          salaryResponse,
          managerResponse,
        ] = await Promise.all([
          axios.get(`${BASE_URL}/admin/agents/all-agents`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BASE_URL}/admin/geofence/get-geofence`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BASE_URL}/admin/agent-pricing/get-all-agent-pricing`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BASE_URL}/admin/managers`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        if (salaryResponse.status === 200) {
          setSalary(salaryResponse.data.data);
        }
        if (managerResponse.status === 200) {
          setManager(managerResponse.data.data);
        }
        if (agentResponse.status === 200) {
          setAgent(agentResponse.data.data);
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

    fetchAgent();
  }, [token, role, navigate]);

  // API function for Geofence filter

  const onGeofenceChange = (e) => {
    const selectedService = e.target.value;
    setGeofenceFilter(selectedService);
    if (selectedService !== "") {
      handleGeofenceFilter(selectedService);
    } else {
      setAgent([]);
    }
  };

  const handleGeofenceFilter = async (selectedService) => {
    try {
      console.log(token);
      setIsTableLoading(true);
      const serviceResponse = await axios.get(
        `${BASE_URL}/admin/agents/filter`,
        {
          params: { geofence: selectedService },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (serviceResponse.status === 200) {
        setAgent(serviceResponse.data.data);
      }
    } catch (err) {
      console.log(`Error in fetching agent`, err);
    } finally {
      setIsTableLoading(false);
    }
  };

  // API function for Status filter

  const onStatusChange = (e) => {
    const selectedService = e.target.value;
    setStatusFilter(selectedService);
    if (selectedService !== "") {
      handleStatusFilter(selectedService);
    } else {
      setAgent([]);
    }
  };

  const handleStatusFilter = async (selectedService) => {
    try {
      console.log(token);
      setIsTableLoading(true);
      const serviceResponse = await axios.get(
        `${BASE_URL}/admin/agents/filter`,
        {
          params: { status: selectedService },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (serviceResponse.status === 200) {
        setAgent(serviceResponse.data.data);
      }
    } catch (err) {
      console.log(`Error in fetching agent`, err);
    } finally {
      setIsTableLoading(false);
    }
  };

  // API function for vehicle type Filter

  const onVehicleTypeChange = (e) => {
    const selectedService = e.target.value;
    setFilterVehicleType(selectedService);
    if (selectedService !== "") {
      handleVehicleTypeFilter(selectedService);
    } else {
      setAgent([]);
    }
  };
  const handleVehicleTypeFilter = async (selectedService) => {
    try {
      console.log(token);
      setIsTableLoading(true);
      const serviceResponse = await axios.get(
        `${BASE_URL}/admin/agents/filter`,
        {
          params: { vehicleType: selectedService },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (serviceResponse.status === 200) {
        setAgent(serviceResponse.data.data);
      }
    } catch (err) {
      console.log(`Error in fetching agent`, err);
    } finally {
      setIsTableLoading(false);
    }
  };

  // API function for search

  const onSearchChange = (e) => {
    const searchService = e.target.value;
    setSearchFilter(searchService);
    if (searchService !== "") {
      handleSearchChangeFilter(searchService);
    } else {
      setAgent([]);
    }
  };

  const handleSearchChangeFilter = async (searchService) => {
    try {
      setIsTableLoading(true);
      console.log(token);
      const searchResponse = await axios.get(
        `${BASE_URL}/admin/agents/search`,
        {
          params: { query: searchService },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (searchResponse.status === 200) {
        setAgent(searchResponse.data.data);
      }
    } catch (err) {
      console.log(`Error in fetching data`, err);
    } finally {
      setIsTableLoading(false);
    }
  };

  // Function for Approved Agent

  const handleApprove = async (id) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/admin/agents/approve-registration/${id}`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setAgent((prevAgents) =>
          prevAgents.map((agent) =>
            agent._id === id ? { ...agent, isApproved: "Approved" } : agent
          )
        );
        toast({
          title: "Success",
          description: "Agent approved successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        console.log(`Unexpected response status: ${response.status}`);
      }
    } catch (err) {
      console.error(`Error in handleApprove: ${err.message}`);
      toast({
        title: "Error",
        description: err.response?.data?.message || err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Function for Reject Agent

  const handleReject = async (id) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/admin/agents/reject-registration/${id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setAgent((prevAgents) =>
          prevAgents.filter((agent) => agent._id !== id)
        );
        toast({
          title: "Success",
          description: "Agent Rejected successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(err.message);
      toast({
        title: "Error",
        description: err.response?.data?.message || err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Function for Status Change

  const handleToggle = async (agentId) => {
    try {
      const agentResponse = agent.find(
        (agentResponse) => agentResponse._id === agentId
      );
      if (agentResponse) {
        const updatedStatus = !agentResponse.status;
        await axios.patch(
          `${BASE_URL}/admin/agents/change-status/${agentId}`,
          {
            ...agentResponse,
            status: updatedStatus,
          },
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAgent(
          agent.map((a) =>
            a._id === agentId ? { ...a, status: updatedStatus } : a
          )
        );
        toast({
          title: "Success",
          description: "Staus Updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(`Error in toggling status: ${err}`);
      toast({
        title: "Error",
        description: "There was an error occured.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Function for Modal

  const showAddModal = () => {
    setAddModalVisible(true);
  };

  const handleCancel = () => {
    setAddModalVisible(false);
  };

  const handleAddAgent = (newAgent) => {
    setAgent((prevAgents) => [...prevAgents, newAgent]);
  };

  // CSV

  const csvData = [
    { label: "AgentID", key: "_id" },
    { label: "FullName", key: "fullName" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phoneNumber" },
    { label: "Manager", key: "manager" },
    { label: "Geofence", key: "geofence" },
    { label: "Online Status", key: "status" },
    // { label: 'Registration Approval', key: 'averageRating' },
  ];

  return (
    <div>
      {isLoading ? (
        <GIFLoader />
      ) : (
        <>
          <Sidebar />
          <main className="pl-[300px] bg-gray-100 h-screen">
            <nav className="p-5">
              <GlobalSearch />
            </nav>

            <div className="flex justify-between mt-5 items-center px-[30px]">
              <h1 className="text-[18px] font-semibold">Delivery Agent</h1>
              <div className="flex space-x-2 justify-end ">
                <button className="bg-cyan-100 text-black rounded-md px-4 py-2 font-semibold flex items-center space-x-2">
                  <CSVLink
                    data={agent}
                    headers={csvData}
                    filename={"All_Agents_Data.csv"}
                  >
                    <ArrowDownOutlined /> <span>CSV</span>
                  </CSVLink>
                </button>
                <Link to="/agent-payout">
                  <button className="bg-teal-800 text-white rounded-md px-4 py-2 font-semibold gap-1 flex items-center space-x-1 ">
                    <FaIndianRupeeSign /> Agent Payout
                  </button>
                </Link>
                <div>
                  <button
                    className="bg-teal-800 text-white rounded-md px-4 py-2 font-semibold  flex items-center space-x-1 "
                    onClick={showAddModal}
                  >
                    <PlusOutlined /> <span>Add Agent</span>
                  </button>
                  <AddAgentModal
                    isVisible={addModalVisible}
                    handleCancel={handleCancel}
                    token={token}
                    BASE_URL={BASE_URL}
                    geofence={geofence}
                    salary={salary}
                    manager={manager}
                    onAddAgent={handleAddAgent}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-10 px-[10px] bg-white  p-5 rounded-lg">
              <div className="flex items-center justify-evenly gap-3 bg-white  rounded-lg p-6">
                <select
                  id="status"
                  className="bg-blue-50  text-gray-900 text-sm rounded-lg focus:outline-none outline-none block w-full p-2.5 px-4"
                  value={statusFilter}
                  onChange={onStatusChange}
                >
                  <option hidden value="">
                    Status
                  </option>
                  <option value="open">True</option>
                  <option value="closed">False</option>
                </select>

                <select
                  id="vehicleType"
                  className="bg-blue-50 w-32 text-gray-900 text-sm rounded-lg focus:outline-none outline-none block p-2.5"
                  value={vehicleTypeFilter}
                  onChange={onVehicleTypeChange}
                >
                  <option hidden value="">
                    Vehicle Type
                  </option>
                  <option value="Scooter">Scooter</option>
                  <option value="Bike">Bike</option>
                </select>

                <select
                  name="type"
                  value={geofenceFilter}
                  className="bg-blue-50 p-2 outline-none rounded-lg focus:outline-none"
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

              <div className="flex items-center gap-[30px]">
                <div>
                  <FilterAltOutlinedIcon className="mt-2 text-gray-400" />
                </div>
                <input
                  type="search"
                  name="search"
                  placeholder="Search Agent Name"
                  className="bg-gray-100 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
                  value={searchFilter}
                  onChange={onSearchChange}
                />
                <button type="submit" className="absolute right-8 mt-1">
                  <SearchOutlined className="text-xl text-gray-600" />
                </button>
              </div>
            </div>

            <div className="overflow-auto mt-[20px] w-full">
              <table className="text-start w-full mb-24">
                <thead>
                  <tr className="">
                    {[
                      "Agent ID",
                      "Full Name",
                      "Email",
                      "Phone",
                      "Manager",
                      "Geofence",
                      "Online Status",
                      "Registration Approval",
                    ].map((header) => (
                      <th
                        key={header}
                        className="bg-teal-800 text-center text-white py-[20px] border-r-2 border-[#eee]/50"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {isTableLoading && (
                    <tr>
                      <td colSpan={8} className="text-center h-20">
                        Loading Data...
                      </td>
                    </tr>
                  )}
                  {!isTableLoading && agent?.length === 0 && (
                    <tr>
                      <td colSpan={8}>
                        <p className="flex items-center justify-center h-20">
                          No data available
                        </p>
                      </td>
                    </tr>
                  )}
                  {!isTableLoading &&
                    agent.map((agent) => (
                      <tr
                        key={agent._id}
                        className="align-middle border-b border-gray-300 text-center"
                      >
                        <td className="p-4 text-center">
                          <Link to={`/agent-details/${agent._id}`}>
                            {agent._id}
                          </Link>
                        </td>
                        <td className="p-4">{agent.fullName}</td>
                        <td className="p-4">{agent.email}</td>
                        <td className="p-4">{agent.phoneNumber}</td>
                        <td className="p-4">{agent.manager}</td>
                        <td className="p-4">{agent.geofence}</td>
                        <td className="p-4">
                          <Switch
                            checked={agent.status}
                            onChange={() => handleToggle(agent._id)}
                          />
                        </td>
                        <td className="p-4">
                          <>
                            {agent.isApproved === "Approved" && (
                              <p className="text-green-500">Approved</p>
                            )}
                            {agent.isApproved === "Rejected" && (
                              <p className="text-red-500">Rejected</p>
                            )}

                            {agent.isApproved === "Pending" && (
                              <div className="flex space-x-10 justify-center">
                                <CheckCircleOutlined
                                  className="text-3xl cursor-pointer text-green-500"
                                  onClick={() => handleApprove(agent._id)}
                                />
                                <CloseCircleOutlined
                                  className="text-3xl  cursor-pointer text-red-500"
                                  onClick={() => handleReject(agent._id)}
                                />
                              </div>
                            )}
                          </>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default DeliveryAgent;
