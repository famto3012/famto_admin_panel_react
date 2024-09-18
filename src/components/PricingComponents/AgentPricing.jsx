import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AddAgentPricingModal from "../model/PricingModels/AddAgentPricingModal";
import { Switch } from "antd";
import { MdOutlineEdit } from "react-icons/md";
import EditAgentPricingModal from "../model/PricingModels/EditAgentPricingModal";
import { RiDeleteBinLine } from "react-icons/ri";
import DeleteAgentPricingModal from "../model/PricingModels/DeleteAgentPricingModal";
import AddAgentSurgeModal from "../model/PricingModels/AddAgentSurgeModal";
import EditAgentSurgeModal from "../model/PricingModels/EditAgentSurgeModal";
import DeleteAgentSurgeModal from "../model/PricingModels/DeleteAgentSurgeModal";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const AgentPricing = () => {
  const [agentpricing, setAgentPricing] = useState([]);
  const [agentsurge, setAgentSurge] = useState([]);
  const [isModalVisibleAddRule, setModalVisibleAddRule] = useState(false);
  const [isModalVisibleAddSurge, setModalVisibleAddSurge] = useState(false);
  const [isModalVisibleEditRule, setModalVisibleEditRule] = useState(false);
  const [currentEditRule, setCurrentEditRule] = useState(null);
  const [isModalVisibleEditSurge, setModalVisibleEditSurge] = useState(false);
  const [currentEditSurge, setCurrentEditSurge] = useState(null);
  const [isModalVisibleDeleteRule, setModalVisibleDeleteRule] = useState(false);
  const [currentDeleteRule, setCurrentDeleteRule] = useState(null);
  const [isModalVisibleDeleteSurge, setModalVisibleDeleteSurge] =
    useState(false);
  const [currentDeleteSurge, setCurrentDeleteSurge] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [geofence, setGeofence] = useState([]);
  const { token, role } = useContext(UserContext);
  const toast = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [agentPricingResponse, agentSurgeResponse, geofenceResponse] =
          await Promise.all([
            axios.get(`${BASE_URL}/admin/agent-pricing/get-all-agent-pricing`, {
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${BASE_URL}/admin/agent-surge/get-all-agent-surge`, {
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${BASE_URL}/admin/geofence/get-geofence`, {
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);

        if (agentPricingResponse.status === 200) {
          setAgentPricing(agentPricingResponse.data.data);
          console.log(agentPricingResponse.data.data);
        }
        if (agentSurgeResponse.status === 200) {
          setAgentSurge(agentSurgeResponse.data.data);
          console.log(agentSurgeResponse.data.data);
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

    fetchData();
  }, [token, role, navigate]);

  // Function to add the agent rule in the list

  const handleAddRule = (newRule) => {
    setAgentPricing((prevRules) => [...prevRules, newRule]);
    setModalVisibleAddRule(false);
  };

  // Function to add the agent rule in the list

  const handleAddSurge = (newSurge) => {
    setAgentSurge((prevSurge) => [...prevSurge, newSurge]);
    setModalVisibleAddSurge(false);
  };

  // Function to update the agent rule in the list

  const handleEditRule = (updatedRule) => {
    setAgentPricing((prevRules) =>
      prevRules.map((agentrule) =>
        agentrule._id === updatedRule._id ? updatedRule : agentrule
      )
    );
  };
  // Function to update the agent surge in the list

  const handleEditSurge = (updatedSurge) => {
    setAgentSurge((prevSurge) =>
      prevSurge.map((agentsurge) =>
        agentsurge._id === updatedSurge._id ? updatedSurge : agentsurge
      )
    );
  };

  // Modal function for Add rule in Agent Pricing

  const showModalAddRule = () => {
    setModalVisibleAddRule(true);
  };

  // Modal function for Add surge in Agent Surge

  const showModalAddSurge = () => {
    setModalVisibleAddSurge(true);
  };

  // Modal function for Edit rule in Agent Pricing

  const showModalEditRule = (agentPricingId) => {
    setCurrentEditRule(agentPricingId);
    setModalVisibleEditRule(true);
  };

  // Modal function for Edit surge in Agent Surge

  const showModalEditSurge = (agentsurgeId) => {
    setCurrentEditSurge(agentsurgeId);
    setModalVisibleEditSurge(true);
  };

  // Modal function for Delete rule in Agent Pricing

  const showModalDeleteRule = (agentPricingId) => {
    setCurrentDeleteRule(agentPricingId);
    setModalVisibleDeleteRule(true);
  };

  const removeRule = (agentPricingId) => {
    setAgentPricing(
      agentpricing.filter((agentpricing) => agentpricing._id !== agentPricingId)
    );
  };

  const handleConfirmDeleteRule = () => {
    setModalVisibleDeleteRule(false);
    setCurrentDeleteRule(null);
  };

  // Modal function for Delete surge in Agent Surge

  const showModalDeleteSurge = (agentSurgeId) => {
    setCurrentDeleteSurge(agentSurgeId);
    setModalVisibleDeleteSurge(true);
  };

  const removeSurge = (agentSurgeId) => {
    setAgentSurge(
      agentsurge.filter((agentsurge) => agentsurge._id !== agentSurgeId)
    );
  };

  const handleConfirmDeleteSurge = () => {
    setModalVisibleDeleteSurge(false);
    setCurrentDeleteSurge(null);
  };

  const handleCancel = () => {
    setModalVisibleAddRule(false);
    setModalVisibleEditRule(false);
    setModalVisibleDeleteRule(false);
    setModalVisibleAddSurge(false);
    setModalVisibleEditSurge(false);
    setModalVisibleDeleteSurge(false);
  };

  // Status Changing function for Add rule in Agent Pricing

  const handleToggleRule = async (agentPricingId) => {
    try {
      const agentResponse = agentpricing.find(
        (agentResponse) => agentResponse._id === agentPricingId
      );
      if (agentResponse) {
        const updatedStatus = !agentResponse.status;
        await axios.post(
          `${BASE_URL}/admin/agent-pricing/change-status/${agentPricingId}`,
          {
            ...agentResponse,
            status: updatedStatus,
          },
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAgentPricing(
          agentpricing.map((a) =>
            a._id === agentPricingId ? { ...a, status: updatedStatus } : a
          )
        );
        toast({
          title: "Success",
          description: "Status Updated Successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(`Error in toggling status: ${err}`);
      toast({
        title: "Error",
        description: "Failed to update status.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Status Changing function for Add surge in Agent Surge

  const handleToggleSurge = async (agentsurgeId) => {
    try {
      const agentResponse = agentsurge.find(
        (agentResponse) => agentResponse._id === agentsurgeId
      );
      if (agentResponse) {
        const updatedStatus = !agentResponse.status;
        await axios.post(
          `${BASE_URL}/admin/agent-surge/change-status/${agentsurgeId}`,
          {
            ...agentResponse,
            status: updatedStatus,
          },
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAgentSurge(
          agentsurge.map((a) =>
            a._id === agentsurgeId ? { ...a, status: updatedStatus } : a
          )
        );
        toast({
          title: "Success",
          description: "Status Updated Successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(`Error in toggling status: ${err}`);
      toast({
        title: "Error",
        description: "Failed to update  status.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <h1 className="px-9 mt-5 font-bold p-3 bg-gray-300">Agent</h1>
      <div className="flex items-center justify-between mx-9 mt-5">
        <h1 className="text-md">Pricing</h1>
        <div>
          <button
            className="bg-teal-700 text-white rounded-md flex items-center space-x-1 p-2"
            onClick={showModalAddRule}
          >
            <PlusOutlined className="mr-3" /> Add rule
          </button>

          <AddAgentPricingModal
            isVisible={isModalVisibleAddRule}
            handleCancel={handleCancel}
            token={token}
            BASE_URL={BASE_URL}
            geofence={geofence}
            onAddRule={handleAddRule}
          />
        </div>
      </div>

      <div className="overflow-auto w-full max-h-[30rem]">
        <table className="w-full mt-[20px] ">
          <thead className="sticky top-0 bg-teal-700 text-white">
            <tr>
              {[
                "Rule Name",
                "Base Fare",
                "Base Distance Fare per Km",
                "Waiting Fare",
                "Waiting Time",
                "Purchase Fare per hour",
                "Minimum login Hrs",
                "Minimum order number",
                "Fare after min login Hrs",
                "Fare after min order",
                "Geofence",
                "Status",
              ].map((header, index) => (
                <th
                  key={index}
                  className="text-center px-2 py-4 border-r-2 border-[#eee]/50 "
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={12} className="text-center h-20">
                  Loading Data...
                </td>
              </tr>
            )}

            {!isLoading && agentpricing?.length === 0 && (
              <tr>
                <td colSpan={12}>
                  <p className="text-center h-20">No data available</p>
                </td>
              </tr>
            )}

            {!isLoading &&
              agentpricing.map((agentpricing) => (
                <tr
                  key={agentpricing._id}
                  className="even:bg-gray-200 border-t border-[#eee]"
                >
                  <td className="text-center px-2 py-4">
                    {agentpricing.ruleName}
                  </td>
                  <td className="text-center px-2 py-4">
                    {agentpricing.baseFare}
                  </td>
                  <td className="text-center px-2 py-4">
                    {agentpricing.baseDistanceFarePerKM}
                  </td>
                  <td className="text-center px-2 py-4">
                    {agentpricing.waitingFare}
                  </td>
                  <td className="text-center px-2 py-4">
                    {agentpricing.waitingTime}
                  </td>
                  <td className="text-center px-2 py-4">
                    {agentpricing.purchaseFarePerHour}
                  </td>
                  <td className="text-center px-2 py-4">
                    {agentpricing.minLoginHours}
                  </td>
                  <td className="text-center px-2 py-4">
                    {agentpricing.minOrderNumber}
                  </td>
                  <td className="text-center px-2 py-4">
                    {agentpricing.fareAfterMinLoginHours}
                  </td>
                  <td className="text-center px-2 py-4">
                    {agentpricing.fareAfterMinOrderNumber}
                  </td>
                  <td className="text-center px-2 py-4">
                    {agentpricing?.geofenceId?.name}
                  </td>
                  <td className="p-4 w">
                    <div className="flex justify-center items-center gap-3">
                      <div>
                        <Switch
                          checked={agentpricing.status}
                          onChange={() => handleToggleRule(agentpricing._id)}
                        />
                      </div>
                      <div className="flex items-center">
                        <button
                          onClick={() => showModalEditRule(agentpricing._id)}
                        >
                          <MdOutlineEdit className="bg-gray-200 rounded-lg p-2 outline-none focus:outline-none text-[35px]" />
                        </button>
                        <EditAgentPricingModal
                          isVisible={isModalVisibleEditRule}
                          handleCancel={handleCancel}
                          token={token}
                          currentEdit={currentEditRule}
                          BASE_URL={BASE_URL}
                          geofence={geofence}
                          onEditRule={handleEditRule}
                        />
                      </div>
                      <button
                        onClick={() => showModalDeleteRule(agentpricing._id)}
                      >
                        <RiDeleteBinLine className="text-red-900 rounded-lg bg-red-100 p-2 text-[35px]" />
                      </button>
                      <DeleteAgentPricingModal
                        isVisible={isModalVisibleDeleteRule}
                        handleCancel={handleCancel}
                        handleConfirmDelete={handleConfirmDeleteRule}
                        currentDelete={currentDeleteRule}
                        token={token}
                        BASE_URL={BASE_URL}
                        remove={removeRule}
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mx-9 mt-8">
        <h1 className="text-md">Surge</h1>
        <div>
          <button
            className="bg-teal-700 text-white rounded-md flex items-center space-x-1 p-2"
            onClick={showModalAddSurge}
          >
            <PlusOutlined className="mr-3" /> Add Surge
          </button>
          <AddAgentSurgeModal
            isVisible={isModalVisibleAddSurge}
            handleCancel={handleCancel}
            token={token}
            BASE_URL={BASE_URL}
            geofence={geofence}
            onAddSurge={handleAddSurge}
          />
        </div>
      </div>

      <div className="overflow-auto w-full max-h-[30rem]">
        <table className="w-full mt-[20px]">
          <thead className="sticky top-0 left-0">
            <tr>
              {[
                "Rule Name",
                "Base Fare",
                "Base Distance Fare",
                "Waiting Fare",
                "Waiting Time",
                "Geofence",
                "Status",
              ].map((header, index) => (
                <th
                  key={index}
                  className="bg-teal-700 text-center text-white px-8 py-3 border-r-2 border-[#eee]/50"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={7} className="text-center h-20">
                  Loading Data...
                </td>
              </tr>
            )}

            {!isLoading && agentsurge?.length === 0 && (
              <tr>
                <td colSpan={7}>
                  <p className="flex items-center justify-center h-20">
                    No data available
                  </p>
                </td>
              </tr>
            )}

            {!isLoading &&
              agentsurge.map((agentsurge) => (
                <tr
                  key={agentsurge._id}
                  className="align-middle even:bg-gray-200 last:border-2 text-center "
                >
                  <td>{agentsurge.ruleName}</td>
                  <td>{agentsurge.baseFare}</td>
                  <td>{agentsurge.baseDistance}</td>
                  <td>{agentsurge.waitingFare}</td>
                  <td>{agentsurge.waitingTime}</td>
                  <td>{agentsurge.geofenceId.name}</td>
                  <td className="py-3 ">
                    <div className="flex items-center gap-3 justify-end mx-4">
                      <div>
                        <Switch
                          checked={agentsurge.status}
                          onChange={() => handleToggleSurge(agentsurge._id)}
                        />
                      </div>
                      <div className="flex items-center">
                        <button
                          onClick={() => showModalEditSurge(agentsurge._id)}
                        >
                          <MdOutlineEdit className="bg-gray-200 rounded-lg p-2 text-[35px]" />
                        </button>
                        <EditAgentSurgeModal
                          isVisible={isModalVisibleEditSurge}
                          handleCancel={handleCancel}
                          token={token}
                          currentEdit={currentEditSurge}
                          BASE_URL={BASE_URL}
                          geofence={geofence}
                          onEditSurge={handleEditSurge}
                        />
                      </div>
                      <button
                        onClick={() => showModalDeleteSurge(agentsurge._id)}
                      >
                        <RiDeleteBinLine className="text-red-900 rounded-lg bg-red-100 p-2 text-[35px]" />
                      </button>
                      <DeleteAgentSurgeModal
                        isVisible={isModalVisibleDeleteSurge}
                        handleCancel={handleCancel}
                        handleConfirmDelete={handleConfirmDeleteSurge}
                        currentDelete={currentDeleteSurge}
                        token={token}
                        BASE_URL={BASE_URL}
                        remove={removeSurge}
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AgentPricing;
