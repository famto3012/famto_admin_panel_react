import React, { useContext, useEffect, useState } from "react";
import SidebarDelivery from "../../../components/model/SidebarDelivery";
import GlobalSearch from "../../../components/GlobalSearch";
import { ArrowDownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { CheckCircleOutlined, FilterAltOutlined } from "@mui/icons-material";
import { Modal } from "antd";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";
import GIFLoader from "../../../components/GIFLoader";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const AgentPayout = () => {
  const [allPayout, setAllPayout] = useState([]);
  const [payment, setPayment] = useState("");
  const [allAgents, setAllAgents] = useState([]);
  const [allGeofence, setAllGeofence] = useState([]);
  const { token } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPayout, setSelectedPayout] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [response, geofenceResponse, agentResponse] = await Promise.all([
          axios.get(`${BASE_URL}/admin/agents/get-agent-payout`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get (
            `${BASE_URL}/admin/geofence/get-geofence`,{
              withCredentials:true,
              headers: {Authorization : `Bearer ${token}`}
            }
          ),
          axios.get (
            `${BASE_URL}/admin/agents/all-agents`,{
              withCredentials: true,
              headers: {Authorization : `Bearer ${token}`}
            }
          )
        ]);
        if (response.status === 200) {
          setAllPayout(response.data.data);
        }
        if (geofenceResponse.status === 200) {
          setAllGeofence(geofenceResponse.data.geofences)
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
  }, [token]);

  const showModalApprove = (payout) => {
    setSelectedPayout(payout);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedPayout(null);
  };

  console.log(allGeofence)

  const handleConfirm = async () => {
    if (!selectedPayout) return;

    try {
      const { _id: agentId, detailId } = selectedPayout;

      await axios.patch(
        `${BASE_URL}/admin/agents/approve-payout/${agentId}/${detailId}`,
        {},
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update the state to mark the selected payout as approved
      setAllPayout((prevPayouts) =>
        prevPayouts.map((payout) =>
          payout._id === selectedPayout._id
            ? { ...payout, paymentSettled: "true" }
            : payout
        )
      );

      handleCancel(); // Close the modal after confirmation
    } catch (err) {
      console.error(`Error in approving payout ${err}`);
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
              <button className="bg-cyan-100 text-black rounded-md px-4 py-2 font-semibold flex items-center space-x-2">
                <ArrowDownOutlined /> <span>CSV</span>
              </button>
            </div>
            <div className="flex items-center bg-white p-5 mx-5 rounded-lg justify-between mt-[20px] px-[30px]">
              <div className="flex items-center gap-[20px]">
                <select
                  className="bg-cyan-50 text-gray-900 text-sm rounded-lg focus:focus:outline-none outline-none block w-full p-2.5"
                  name="payment"
                  value={payment}
                  onChange={(e) => setPayment(e.target.value)}
                >
                  <option defaultValue="" hidden>
                    Payment Status
                  </option>
                  <option value="Cash">Cash</option>
                  <option value="Credit">Credit</option>
                </select>
                <select
                  className="bg-cyan-50 w-full text-gray-900 text-sm rounded-lg focus:focus:outline-none outline-none block p-2.5"
                  name="agents"
                  // value={allAgentsgents}
                  // onChange={(e) => setAgents(e.target.value)}
                >
                  <option defaultValue={"Business category"} hidden>
                    All agents
                  </option>
                 {allAgents?.map((agents) => (
                  <option value={agents._id} key={agents._id}>
                    {agents.fullName}
                  </option>
                 ))}
                </select>
                <select
                  className="bg-cyan-50  text-gray-900 text-sm rounded-lg focus:focus:outline-none outline-none block w-full p-2.5"
                  name="geofence"
                  value={allGeofence}
                  // onChange={(e) => setGeofence(e.target.value)}
                >
                  <option defaultValue="" hidden>
                    Geofence
                  </option>
                {allGeofence?.map((geofence) => (
                  <option key={geofence._id} value={geofence._id}>
                    {geofence.name}
                  </option>
                ))}
                </select>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <input type="date" name="date" className="right-4" />
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
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-auto mt-[20px] w-full">
              <table className=" w-full">
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
                  {allPayout.map((payout) => (
                    <tr
                      key={payout._id}
                      className="align-middle border-b border-gray-300 text-center h-20"
                    >
                      <td>
                        <Link
                          to={`/all-agents`}
                          className="underline underline-offset-4"
                        >
                          {payout._id}
                        </Link>
                      </td>
                      <td>{payout.fullName}</td>
                      <td>{payout.phoneNumber}</td>
                      <td>{payout.workedDate}</td>
                      <td>{payout.orders}</td>
                      <td>{payout.cancelledOrders}</td>
                      <td>{payout.totalDistance}</td>
                      <td>{payout.loginHours}</td>
                      <td>{payout.cashInHand}</td>
                      <td>{payout.totalEarnings}</td>
                      <td>
                        {payout.paymentSettled === "false" ? (
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
                Confirm
              </button>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

export default AgentPayout;
