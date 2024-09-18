import React, { useContext, useEffect, useRef, useState } from "react";
import SidebarDelivery from "../../../components/model/SidebarDelivery";
import GlobalSearch from "../../../components/GlobalSearch";
import { ArrowDownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { CheckCircleOutlined, FilterAltOutlined } from "@mui/icons-material";
import { Modal } from "antd";
import axios from "axios";
import { FaCalendarAlt } from "react-icons/fa";
import { UserContext } from "../../../context/UserContext";
import GIFLoader from "../../../components/GIFLoader";
import { CSVLink } from "react-csv";
import { agentPayoutCSVDataHeading } from "../../../utils/DefaultData";
import { Pagination } from "@mui/material";
import { useToast } from "@chakra-ui/react";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const AgentPayout = () => {
  const [allPayout, setAllPayout] = useState([]);

  const [paymentStatus, setPaymentStatus] = useState("");
  const [selectedAgent, setSelectedAgent] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedGeofence, setSelectedGeofence] = useState("");

  const [selectedPayout, setSelectedPayout] = useState(null);

  const [allAgents, setAllAgents] = useState([]);
  const [allGeofence, setAllGeofence] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmLoading, setIsConfirmLoading] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [isCSVLoading, setIsCSVLoading] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [pagination, setPagination] = useState({});

  const dateInputRef = useRef(null);

  const { token } = useContext(UserContext);
  const toast = useToast();

  useEffect(() => {
    fetchFilteredData();
  }, [paymentStatus, selectedAgent, selectedDate, selectedGeofence]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [response, geofenceResponse, agentResponse] = await Promise.all([
          axios.get(`${BASE_URL}/admin/agents/get-agent-payout`, {
            params: { page, limit },
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }),

          axios.get(`${BASE_URL}/admin/geofence/get-geofence`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }),

          axios.get(`${BASE_URL}/admin/agents/all-agents`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (response.status === 200) {
          setAllPayout(response.data.data);
          setPagination(response.data.pagination);
        }
        if (geofenceResponse.status === 200) {
          setAllGeofence(geofenceResponse.data.geofences);
        }
        if (agentResponse.status === 200) {
          setAllAgents(agentResponse.data.data);
        }
      } catch (err) {
        console.error(`Error in fetching data ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, page, limit]);

  // Fetch filtered data based on selected filters
  const fetchFilteredData = async () => {
    try {
      setIsTableLoading(true);

      const response = await axios.get(
        `${BASE_URL}/admin/agents/filter-payment`,
        {
          params: {
            paymentStatus,
            agentId: selectedAgent,
            date: selectedDate,
            geofence: selectedGeofence,
          },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setAllPayout(response.data.data);
      }
    } catch (err) {
      console.error(`Error in fetching filtered data ${err}`);
    } finally {
      setIsTableLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (!selectedPayout) return;

    try {
      setIsConfirmLoading(true);

      const { _id: agentId, detailId } = selectedPayout;

      const response = await axios.patch(
        `${BASE_URL}/admin/agents/approve-payout/${agentId}/${detailId}`,
        {},
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        // Update the state to mark the selected payout as approved
        setAllPayout((prevPayouts) =>
          prevPayouts.map((payout) =>
            payout._id === selectedPayout._id
              ? { ...payout, paymentSettled: true }
              : payout
          )
        );
      }

      handleCancel(); // Close the modal after confirmation
    } catch (err) {
      console.error(`Error in approving payout ${err}`);
    } finally {
      setIsConfirmLoading(false);
    }
  };

  // API to search user using name
  const onSearchChange = (e) => {
    const searchService = e.target.value;
    setSearchFilter(searchService);
    if (searchService !== "") {
      handleSearchChangeFilter(searchService);
    } else {
      setAllPayout([]);
    }
  };

  const handleSearchChangeFilter = async (searchService) => {
    try {
      console.log(token);
      const searchResponse = await axios.get(
        `${BASE_URL}/admin/agents/search-payout`,
        {
          params: { agentId: searchService },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (searchResponse.status === 200) {
        setAllPayout(searchResponse.data.data);
      }
    } catch (err) {
      console.log(`Error in fetching data`, err);
    }
  };

  // Function to trigger the date input click
  const openDatePicker = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  // Handle changes to filter options
  const handlePaymentStatusChange = (e) => {
    setPaymentStatus(e.target.value);
  };

  const showModalApprove = (payout) => {
    setSelectedPayout(payout);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedPayout(null);
  };

  const handleAgentChange = (e) => {
    setSelectedAgent(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    console.log(e.target.value);
  };

  const handleGeofenceChange = (e) => {
    setSelectedGeofence(e.target.value);
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

  const handleDownloadPaymentCSV = async (e) => {
    try {
      e.preventDefault();

      setIsCSVLoading(true);

      const response = await axios.post(
        `${BASE_URL}/admin/agents/download-payment-csv`,
        {},
        {
          params: {
            paymentStatus,
            agent: selectedAgent,
            search: searchFilter,
            date: selectedDate,
            geofence: selectedGeofence,
          },
          responseType: "blob",
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Create a URL for the file and trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Agent_Payout_Data.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      toast({
        title: "Error",
        description: `An error occoured while downloading CSV ${err}`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsCSVLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <GIFLoader />
      ) : (
        <>
          <SidebarDelivery />
          <div className="w-full h-screen pl-[60px] bg-gray-100">
            <nav className="p-5">
              <GlobalSearch />
            </nav>
            <div className="flex items-center justify-between mx-8 mt-5">
              <h1 className="text-lg font-bold">Delivery Agents Payout</h1>

              <button
                onClick={handleDownloadPaymentCSV}
                className="bg-cyan-100 text-black rounded-md px-4 py-2 font-semibold flex items-center space-x-2"
              >
                <ArrowDownOutlined /> <span>CSV</span>
              </button>
            </div>
            <div className="flex items-center bg-white p-5 mx-5 rounded-lg justify-between mt-[20px] px-[30px]">
              <div className="flex items-center gap-[20px]">
                <select
                  className="bg-cyan-50 text-gray-900 text-sm rounded-lg focus:focus:outline-none outline-none block w-full p-2.5"
                  name="payment"
                  value={paymentStatus}
                  onChange={handlePaymentStatusChange}
                >
                  <option defaultValue="" hidden>
                    Payment Status
                  </option>
                  <option value="all">All</option>
                  <option value="true">Paid</option>
                  <option value="false">Unpaid</option>
                </select>
                <select
                  className="bg-cyan-50 w-full text-gray-900 text-sm rounded-lg focus:focus:outline-none outline-none block p-2.5"
                  name="agents"
                  value={selectedAgent}
                  onChange={handleAgentChange}
                >
                  <option defaultValue="All agents" hidden>
                    All agents
                  </option>
                  <option value="All">All</option>
                  {allAgents?.map((agents) => (
                    <option value={agents._id} key={agents._id}>
                      {agents.fullName}
                    </option>
                  ))}
                </select>
                <select
                  className="bg-cyan-50 text-gray-900 text-sm rounded-lg focus:focus:outline-none outline-none block w-full p-2.5"
                  name="geofence"
                  value={selectedGeofence}
                  onChange={handleGeofenceChange}
                >
                  <option value="Geofence" hidden>
                    Geofence
                  </option>
                  <option value="All">All</option>
                  {allGeofence?.map((geofence) => (
                    <option key={geofence._id} value={geofence._id}>
                      {geofence.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <input
                    type="date"
                    name="date"
                    ref={dateInputRef} // Attach the ref to the input
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="hidden top-80" // Keep the input hidden
                    style={{ right: "40px", top: "200px" }}
                  />
                  <button
                    onClick={openDatePicker}
                    className="flex items-center justify-center"
                  >
                    <FaCalendarAlt className="text-gray-400 text-xl" />
                  </button>
                </div>
                <div>
                  <FilterAltOutlined className="text-gray-400" />
                </div>
                <div className="relative w-full">
                  <div>
                    <input
                      type="search"
                      className="bg-gray-100 relative p-2 px-4 w-64 rounded-2xl outline-none focus:outline-none cursor-pointer"
                      placeholder="Search agent name"
                      value={searchFilter}
                      onChange={onSearchChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-auto mt-[20px] w-full">
              <table className="w-full">
                <thead>
                  <tr>
                    {[
                      "Agent ID",
                      "Name",
                      "Phone",
                      "Worked Date",
                      "Orders",
                      "Cancelled orders",
                      "Total distance",
                      "Login Hours",
                      "CIH",
                      "Total Earnings",
                      "Calculated Earning",
                      "Status Approval",
                    ].map((header, index) => (
                      <th
                        key={index}
                        className="bg-teal-800 text-center text-white py-[20px] px-5 border-r-2 border-[#eee]/50"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {isTableLoading && (
                    <tr>
                      <td colSpan={11} className="text-center h-20">
                        Loading Data...
                      </td>
                    </tr>
                  )}

                  {!isTableLoading && allPayout?.length === 0 && (
                    <tr>
                      <td colSpan={11}>
                        <p className="flex items-center justify-center h-20">
                          No data available
                        </p>
                      </td>
                    </tr>
                  )}

                  {!isTableLoading &&
                    allPayout.map((payout) => (
                      <tr
                        key={payout?._id}
                        className="align-middle even:bg-gray-200 text-center h-20"
                      >
                        <td>
                          <Link
                            to={`/all-agents`}
                            className="underline underline-offset-4"
                          >
                            {payout?._id}
                          </Link>
                        </td>
                        <td>{payout?.fullName}</td>
                        <td>{payout?.phoneNumber}</td>
                        <td>{payout?.workedDate}</td>
                        <td>{payout?.orders}</td>
                        <td>{payout?.cancelledOrders}</td>
                        <td>{payout?.totalDistance}</td>
                        <td>{payout?.loginHours}</td>
                        <td>{payout?.cashInHand}</td>
                        <td>{payout?.totalEarnings}</td>
                        <td>{payout?.calculatedPayment}</td>
                        <td>
                          {payout?.paymentSettled === true ? (
                            <span className="text-green-500">Approved</span>
                          ) : (
                            <button onClick={() => showModalApprove(payout)}>
                              <CheckCircleOutlined className="text-3xl cursor-pointer text-green-500" />
                            </button>
                          )}
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
          </div>

          {/* Modal */}
          <Modal
            footer={null}
            open={isModalVisible}
            onCancel={handleCancel}
            centered
          >
            <p className="font-semibold text-[18px] mb-5">
              Are you sure you want to Confirm?
            </p>
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-cyan-100 px-5 py-1 rounded-md font-semibold"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-teal-800 px-5 py-1 rounded-md ml-3 text-white"
                onClick={handleConfirm}
              >
                {isConfirmLoading ? `Confirming...` : `Confirm`}
              </button>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

export default AgentPayout;
