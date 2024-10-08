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
import AddAgentModal from "../../../components/model/AgentModels/AddAgentModal";
import GIFLoader from "../../../components/GIFLoader";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { Pagination } from "@mui/material";
import Select from "react-select";
import {
  agentStatusOptions,
  agentVehicleOptions,
} from "../../../utils/DefaultData";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const DeliveryAgent = () => {
  const [agent, setAgent] = useState([]);
  const [geofence, setGeofence] = useState([]);
  const [salary, setSalary] = useState([]);
  const [manager, setManager] = useState([]);

  const [geofenceFilter, setGeofenceFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState("");
  const [searchFilter, setSearchFilter] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [approveLoading, setApproveLoading] = useState(false);
  const [isRejectLoading, SetIsRejectLoading] = useState(false);
  const [CSVDownloadLoading, setCSVDownloadLoading] = useState(false);

  const [isModalApproval, setIsModalApproval] = useState(false);
  const [isModalReject, setIsModalReject] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [isCSVModalVisible, setIsCSVModalVisible] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const [pagination, setPagination] = useState({});

  const { token, role } = useContext(UserContext);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || role !== "Admin") {
      navigate("/auth/login");
      return;
    }

    const fetchInitialData = async () => {
      try {
        setIsLoading(true);

        const [geofenceResponse, salaryResponse, managerResponse] =
          await Promise.all([
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

        if (geofenceResponse.status === 200) {
          setGeofence(geofenceResponse.data.geofences);
        }
      } catch (err) {
        console.error(`Error in fetching data: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
    getAllAgents();
  }, [token, role, navigate, page, limit]);

  const getAllAgents = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/agents/all-agents`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setAgent(response.data.data);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error in getting all agents",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const geofenceOptions = [
    { label: "All", value: "all" },
    ...geofence.map((geofence) => ({
      label: geofence.name,
      value: geofence._id,
    })),
  ];

  useEffect(() => {
    const handleGeofenceFilter = async () => {
      try {
        setIsTableLoading(true);
        const response = await axios.get(`${BASE_URL}/admin/agents/filter`, {
          params: {
            geofence: geofenceFilter,
            status: statusFilter,
            vehicleType: vehicleTypeFilter,
          },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setAgent(response.data.data);
        }
      } catch (err) {
        console.log(`Error in fetching agent`, err);
      } finally {
        setIsTableLoading(false);
      }
    };

    handleGeofenceFilter();
  }, [geofenceFilter, statusFilter, vehicleTypeFilter]);

  // API function for search
  const onSearchChange = (e) => {
    const searchService = e.target.value;
    setSearchFilter(searchService);
    if (searchService !== "") {
      handleSearchChangeFilter(searchService);
    } else {
      getAllAgents();
    }
  };

  const handleSearchChangeFilter = async (searchService) => {
    try {
      setIsTableLoading(true);

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
  const handleApprove = async (e, id) => {
    e.preventDefault();
    try {
      setApproveLoading(true);
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
    } finally {
      setApproveLoading(false);
    }
  };

  // Function for Reject Agent
  const handleReject = async (e, id) => {
    e.preventDefault();
    try {
      SetIsRejectLoading(true);
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
        handleCancel();
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
    } finally {
      SetIsRejectLoading(false);
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
          {},
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
          description: "Staus Updated successfully",
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
  const showAddModal = () => setAddModalVisible(true);
  const handleModalApprove = () => setIsModalApproval(true);
  const handleModalReject = () => setIsModalReject(true);
  // const showCSVModal = () => setIsCSVModalVisible(true);

  const handleCancel = () => {
    setAddModalVisible(false);
    setIsModalApproval(false);
    setIsCSVModalVisible(false);
    setIsModalReject(false);
  };

  const handleAddAgent = (newAgent) => {
    setAgent((prevAgents) => [...prevAgents, newAgent]);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const getItemAriaLabel = (type, page, selected) => {
    switch (type) {
      case "page":
        return `${selected ? "" : "Go to "}page ${page}`;
      case "first":
        return "Go to first page";
      case "last":
        return "Go to last page";
      case "next":
        return "Go to next page";
      case "previous":
        return "Go to previous page";
      default:
        return "";
    }
  };

  const handleDownloadCSV = async (e) => {
    try {
      setCSVDownloadLoading(true);

      const response = await axios.get(
        `${BASE_URL}/admin/agents/download-agent-csv`,
        {
          params: {
            geofenceFilter,
            statusFilter,
            vehicleTypeFilter,
            searchFilter,
          },
          responseType: "blob",
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Create a URL for the file and trigger the download
        const url = window.URL.createObjectURL(new Blob([response.data]));

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Agent_Data.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An error occoured while downloading CSV file",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setCSVDownloadLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <GIFLoader />
      ) : (
        <>
          <Sidebar />
          <main className="pl-[300px] bg-gray-100 h-full">
            <nav className="p-5">
              <GlobalSearch />
            </nav>

            <div className="flex justify-between mt-5 items-center px-[30px]">
              <h1 className="text-[18px] font-semibold">Delivery Agent</h1>
              <div className="flex space-x-2 justify-end ">
                <button
                  className="bg-cyan-100 text-black rounded-md px-4 py-2 font-semibold flex items-center space-x-2"
                  onClick={handleDownloadCSV}
                >
                  <ArrowDownOutlined /> <span>CSV</span>
                </button>
                {/* <Modal
                  open={isCSVModalVisible}
                  footer={null}
                  width="30rem"
                  onCancel={handleCancel}
                  centered
                >
                  <div className="flex rounded-xl justify-between p-10">
                    <div className="grid">
                      <button className="flex gap-2 p-3 bg-cyan-200 px-5 font-[500] rounded-xl border">
                        <AiOutlineCloudUpload className="text-[22px]" />
                        Upload
                      </button>
                      <p className="text-blue-700 underline mx-2">
                        Download Sample CSV
                      </p>
                    </div>
                    <div>
                      <button className="flex gap-2 p-3 bg-teal-800 rounded-xl px-5 border text-white">
                        <CSVLink
                          data={agent}
                          headers={allAgentsCSVDataHeading}
                          filename={"All_DeliveryAgents_Data.csv"}
                        >
                          <div className="flex gap-2">
                            <TbArrowsSort className="text-[22px]" />
                            Download
                          </div>
                        </CSVLink>
                      </button>
                    </div>
                  </div>
                </Modal> */}
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
                <Select
                  options={agentStatusOptions}
                  value={agentStatusOptions.find(
                    (option) => option.value === statusFilter
                  )}
                  onChange={(option) => setStatusFilter(option.value)}
                  className="min-w-[10rem]"
                  placeholder="Status"
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

                <Select
                  options={agentVehicleOptions}
                  value={agentVehicleOptions.find(
                    (option) => option.value === vehicleTypeFilter
                  )}
                  onChange={(option) => setVehicleTypeFilter(option.value)}
                  className=" bg-cyan-50 min-w-[10rem]"
                  placeholder="Vehicle type"
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

            <div className="overflow-auto mt-[20px] w-full max-h-[30rem]">
              <table className="text-start w-full mb-24">
                <thead className=" sticky top-0 left-0">
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
                        className="align-middle even:bg-gray-200 text-center"
                      >
                        <td className="p-4 text-center">
                          <Link
                            to={`/agent-details/${agent._id}`}
                            className="underline underline-offset-2"
                          >
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
                                  onClick={handleModalApprove}
                                />
                                <Modal
                                  open={isModalApproval}
                                  onCancel={handleCancel}
                                  centered
                                  footer={null}
                                >
                                  <form
                                    onSubmit={(e) =>
                                      handleApprove(e, agent._id)
                                    }
                                  >
                                    <p className="font-semibold text-[18px] p-2">
                                      Are you sure want to Approve ?
                                    </p>
                                    <div className="flex justify-end mt-5 gap-6">
                                      <button
                                        type="button"
                                        className="bg-cyan-100 px-5 py-1 rounded-md outline-none focus:outline-none font-semibold"
                                        onClick={handleCancel}
                                      >
                                        Cancel
                                      </button>
                                      <button
                                        type="submit"
                                        className="bg-teal-800 px-5 py-1 rounded-md outline-none focus:outline-none text-white"
                                      >
                                        {approveLoading
                                          ? "Approving..."
                                          : "Approve"}
                                      </button>
                                    </div>
                                  </form>
                                </Modal>
                                <CloseCircleOutlined
                                  className="text-3xl  cursor-pointer text-red-500"
                                  onClick={handleModalReject}
                                />
                                <Modal
                                  open={isModalReject}
                                  onCancel={handleCancel}
                                  centered
                                  footer={null}
                                >
                                  <form
                                    onSubmit={(e) => handleReject(e, agent._id)}
                                  >
                                    <p className="font-semibold text-[18px] p-2">
                                      Are you sure want to Approve ?
                                    </p>
                                    <div className="flex justify-end mt-5 gap-6">
                                      <button
                                        type="button"
                                        className="bg-cyan-100 px-5 py-1 rounded-md outline-none focus:outline-none font-semibold"
                                        onClick={handleCancel}
                                      >
                                        Cancel
                                      </button>
                                      <button
                                        type="submit"
                                        className="bg-red-600 px-5 py-1 rounded-md outline-none focus:outline-none text-white"
                                      >
                                        {isRejectLoading
                                          ? "Rejecting..."
                                          : "Reject"}
                                      </button>
                                    </div>
                                  </form>
                                </Modal>
                              </div>
                            )}
                          </>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="my-[30px] flex justify-center">
              <Pagination
                count={pagination.totalPages || 0}
                page={pagination.currentPage || page}
                onChange={handlePageChange}
                shape="rounded"
                siblingCount={0}
                hidePrevButton={!pagination.hasPrevPage}
                hideNextButton={!pagination.hasNextPage}
                getItemAriaLabel={getItemAriaLabel}
              />
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default DeliveryAgent;
