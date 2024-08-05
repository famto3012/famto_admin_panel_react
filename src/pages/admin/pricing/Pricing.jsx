import { BellOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { Modal, Switch } from "antd";
import GlobalSearch from "../../../components/GlobalSearch";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
import AddAgentPricingModal from "../../../components/model/PricingModels/AddAgentPricingModal";
import AddAgentSurgeModal from "../../../components/model/PricingModels/AddAgentSurgeModal";
import AddMerchantPricingModal from "../../../components/model/PricingModels/AddMerchantPricingModal";
import AddMerchantSurgeModal from "../../../components/model/PricingModels/AddMerchantSurgeModal";
import AddCustomerSurgeModal from "../../../components/model/PricingModels/AddCustomerSurgeModal";
import EditAgentPricingModal from "../../../components/model/PricingModels/EditAgentPricingModal";
import EditAgentSurgeModal from "../../../components/model/PricingModels/EditAgentSurgeModal";
import EditMerchantSurgeModal from "../../../components/model/PricingModels/EditMerchantSurgeModal";
import EditCustomerSurgeModal from "../../../components/model/PricingModels/EditCustomerSurgeModal";
import EditMerchantPricingModal from "../../../components/model/PricingModels/EditMerchantPricingModal";
import DeleteAgentPricingModal from "../../../components/model/PricingModels/DeleteAgentPricingModal";
import DeleteAgentSurgeModal from "../../../components/model/PricingModels/DeleteAgentSurgeModal";
import DeleteMerchantPrcingModal from "../../../components/model/PricingModels/DeleteMerchantPricingModal";
import DeleteMerchantSurgeModal from "../../../components/model/PricingModels/DeleteMerchantSurgeModal";
import DeleteCustomerPricingModal from "../../../components/model/PricingModels/DeleteCustomerPricingModal";
import DeleteCustomerSurgeModal from "../../../components/model/PricingModels/DeleteCustomerSurgeModal";
import AddCustomerPricingModal from "../../../components/model/PricingModels/AddCustomerPricingModal";
import EditCustomerPricingModal from "../../../components/model/PricingModels/EditCustomerPricingModal";
import GIFLoader from "../../../components/GIFLoader";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const Pricing = () => {
  const [agentpricing, setAgentPricing] = useState([]);
  const [agentsurge, setAgentSurge] = useState([]);
  const [merchantpricing, setMerchantPricing] = useState([]);
  const [merchantsurge, setMerchantSurge] = useState([]);
  const [customerpricing, setCustomerPricing] = useState([]);
  const [customersurge, setCustomerSurge] = useState([]);
  const [isModalVisibleAr, setIsModalVisibleAr] = useState(false);
  const [isModalVisibleAs, setIsModalVisibleAs] = useState(false);
  const [isModalVisibleMr, setIsModalVisibleMr] = useState(false);
  const [isModalVisibleMs, setIsModalVisibleMs] = useState(false);
  const [isModalVisibleCr, setIsModalVisibleCr] = useState(false);
  const [isModalVisibleCs, setIsModalVisibleCs] = useState(false);
  const [isModalVisibleEditAr, setIsModalVisibleEditAr] = useState(false);
  const [currentEditAr, setCurrentEditAr] = useState(null);
  const [isModalVisibleEditAs, setIsModalVisibleEditAs] = useState(false);
  const [currentEditAs, setCurrentEditAs] = useState(null);
  const [isModalVisibleEditMr, setIsModalVisibleEditMr] = useState(false);
  const [currentEditMr, setCurrentEditMr] = useState(null);
  const [isModalVisibleEditMs, setIsModalVisibleEditMs] = useState(false);
  const [currentEditMs, setCurrentEditMs] = useState(null);
  const [isModalVisibleEditCr, setIsModalVisibleEditCr] = useState(false);
  const [currentEditCr, setCurrentEditCr] = useState(null);
  const [isModalVisibleEditCs, setIsModalVisibleEditCs] = useState(false);
  const [currentEditCs, setCurrentEditCs] = useState(null);
  const [deleteModalVisibleAr, setDeleteModalVisibleAr] = useState(false);
  const [currentDeleteAr, setCurrentDeleteAr] = useState(null);
  const [deleteModalVisibleAs, setDeleteModalVisibleAs] = useState(false);
  const [currentDeleteAs, setCurrentDeleteAs] = useState(null);
  const [deleteModalVisibleMr, setDeleteModalVisibleMr] = useState(false);
  const [currentDeleteMr, setCurrentDeleteMr] = useState(null);
  const [deleteModalVisibleMs, setDeleteModalVisibleMs] = useState(false);
  const [currentDeleteMs, setCurrentDeleteMs] = useState(null);
  const [deleteModalVisibleCr, setDeleteModalVisibleCr] = useState(false);
  const [currentDeleteCr, setCurrentDeleteCr] = useState(null);
  const [deleteModalVisibleCs, setDeleteModalVisibleCs] = useState(false);
  const [currentDeleteCs, setCurrentDeleteCs] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [geofence, setGeofence] = useState([]);
  const [business, setBusiness] = useState([]);
  const { token, role } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [
          agentPricingResponse,
          agentSurgeResponse,
          merchPricingResponse,
          merchSurgeResponse,
          custPricingResponse,
          custSurgeResponse,
          geofenceResponse,
          businessCategoryResponse,
        ] = await Promise.all([
          axios.get(`${BASE_URL}/admin/agent-pricing/get-all-agent-pricing`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BASE_URL}/admin/agent-surge/get-all-agent-surge`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(
            `${BASE_URL}/admin/merchant-pricing/all-merchant-pricings`,
            {
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
          axios.get(`${BASE_URL}/admin/merchant-surge/get-all-merchant-surge`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(
            `${BASE_URL}/admin/customer-pricing/get-all-customer-pricing`,
            {
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
          axios.get(`${BASE_URL}/admin/customer-surge/get-all-customer-surge`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BASE_URL}/admin/geofence/get-geofence`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(
            `${BASE_URL}/admin/business-categories/get-all-business-category`,
            {
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
        ]);

        if (agentPricingResponse.status === 200) {
          setAgentPricing(agentPricingResponse.data.data);
          console.log(agentPricingResponse.data.data);
        }
        if (agentSurgeResponse.status === 200) {
          setAgentSurge(agentSurgeResponse.data.data);
          console.log(agentSurgeResponse.data.data);
        }
        if (merchPricingResponse.status === 200) {
          setMerchantPricing(merchPricingResponse.data.data);
          console.log(merchPricingResponse.data.data);
        }
        if (merchSurgeResponse.status === 200) {
          setMerchantSurge(merchSurgeResponse.data.data);
          console.log(merchSurgeResponse.data.data);
        }
        if (custPricingResponse.status === 200) {
          setCustomerPricing(custPricingResponse.data.data);
          console.log(custPricingResponse.data.data);
        }
        if (custSurgeResponse.status === 200) {
          setCustomerSurge(custSurgeResponse.data.data);
          console.log(custSurgeResponse.data.data);
        }
        if (geofenceResponse.status === 200) {
          setGeofence(geofenceResponse.data.geofences);
        }
        if (businessCategoryResponse.status === 200) {
          setBusiness(businessCategoryResponse.data.data);
        }
      } catch (err) {
        console.error(`Error in fetching data: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, role, navigate]);

  // Modal function for Add rule in Agent Pricing

  const showModalAr = () => {
    setIsModalVisibleAr(true);
  };

  // Modal function for Add surge in Agent Surge

  const showModalAs = () => {
    setIsModalVisibleAs(true);
  };

  // Modal function for Add rule in Merchant Pricing

  const showModalMr = () => {
    setIsModalVisibleMr(true);
  };

  // Modal function for Add surge in Merchant Surge

  const showModalMs = () => {
    setIsModalVisibleMs(true);
  };

  // Modal function for Add rule in Customer Pricing

  const showModalCr = () => {
    setIsModalVisibleCr(true);
  };

  // Modal function for Add surge in Customer Surge

  const showModalCs = () => {
    setIsModalVisibleCs(true);
  };

  // Modal function for Edit rule in Agent Pricing

  const showModalEditAr = (agentPricingId) => {
    setCurrentEditAr(agentPricingId);
    setIsModalVisibleEditAr(true);
  };

  // Modal function for Edit surge in Agent Surge

  const showModalEditAs = (agentsurgeId) => {
    setCurrentEditAs(agentsurgeId);
    setIsModalVisibleEditAs(true);
  };

  // Modal function for Edit rule in Merchant Pricing

  const showModalEditMr = (merchantPricingId) => {
    setCurrentEditMr(merchantPricingId);
    setIsModalVisibleEditMr(true);
  };

  // Modal function for Edit surge in Merchant Surge

  const showModalEditMs = (merchantsurgeId) => {
    setCurrentEditMs(merchantsurgeId);
    setIsModalVisibleEditMs(true);
  };

  // Modal function for  Edit rule in Customer pricing

  const showModalEditCr = (customerpricingId) => {
    setCurrentEditCr(customerpricingId);
    setIsModalVisibleEditCr(true);
  };

  // Modal function for  Edit surge in agent Customer Surge

  const showModalEditCs = (customersurgeId) => {
    setCurrentEditCs(customersurgeId);
    setIsModalVisibleEditCs(true);
  };

  // Modal function for Delete rule in Agent Pricing

  const showModalDeleteAr = (agentPricingId) => {
    setCurrentDeleteAr(agentPricingId);
    setDeleteModalVisibleAr(true);
  };

  const removeAr = (agentPricingId) => {
    setAgentPricing(
      agentpricing.filter((agentpricing) => agentpricing._id !== agentPricingId)
    );
  };

  const handleConfirmDeleteAr = () => {
    setDeleteModalVisibleAr(false);
    setCurrentDeleteAr(null);
  };

  // Modal function for Delete surge in Agent Surge

  const showModalDeleteAs = (agentSurgeId) => {
    setCurrentDeleteAs(agentSurgeId);
    setDeleteModalVisibleAs(true);
  };

  const removeAs = (agentSurgeId) => {
    setAgentSurge(
      agentsurge.filter((agentsurge) => agentsurge._id !== agentSurgeId)
    );
  };

  const handleConfirmDeleteAs = () => {
    setDeleteModalVisibleAs(false);
    setCurrentDeleteAs(null);
  };

  // Modal function for Delete rule in Merchant Pricing

  const showModalDeleteMr = (merchantPricingId) => {
    setCurrentDeleteMr(merchantPricingId);
    setDeleteModalVisibleMr(true);
  };

  const removeMr = (merchantPricingId) => {
    setMerchantPricing(
      merchantpricing.filter(
        (merchantpricing) => merchantpricing._id !== merchantPricingId
      )
    );
  };

  const handleConfirmDeleteMr = () => {
    setDeleteModalVisibleMr(false);
    setCurrentDeleteMr(null);
  };

  // Modal function for Delete surge in Merchant Surge

  const showModalDeleteMs = (merchantsurgeId) => {
    setCurrentDeleteMs(merchantsurgeId);
    setDeleteModalVisibleMs(true);
  };

  const removeMs = (merchantsurgeId) => {
    setMerchantSurge(
      merchantsurge.filter(
        (merchantsurge) => merchantsurge._id !== merchantsurgeId
      )
    );
  };

  const handleConfirmDeleteMs = () => {
    setDeleteModalVisibleMs(false);
    setCurrentDeleteMs(null);
  };

  // Modal function for Delete rule in Customer Pricing

  const showModalDeleteCr = (customerpricingId) => {
    setCurrentDeleteCr(customerpricingId);
    setDeleteModalVisibleCr(true);
  };

  const removeCr = (customerpricingId) => {
    setCustomerPricing(
      customerpricing.filter(
        (customerpricing) => customerpricing._id !== customerpricingId
      )
    );
  };

  const handleConfirmDeleteCr = () => {
    setDeleteModalVisibleCr(false);
    setCurrentDeleteCr(null);
  };

  // Modal function for Delete surge in Customer Surge

  const showModalDeleteCs = (customersurgeId) => {
    setCurrentDeleteCs(customersurgeId);
    setDeleteModalVisibleCs(true);
  };

  const removeCs = (customersurgeId) => {
    setCustomerSurge(
      customersurge.filter(
        (customersurge) => customersurge._id !== customersurgeId
      )
    );
  };

  const handleConfirmDeleteCs = () => {
    setDeleteModalVisibleCs(false);
    setCurrentDeleteCs(null);
  };

  // Cancel function for all Modals

  const handleCancel = () => {
    setIsModalVisibleAr(false);
    setIsModalVisibleAs(false);
    setIsModalVisibleMr(false);
    setIsModalVisibleMs(false);
    setIsModalVisibleCr(false);
    setIsModalVisibleCs(false);
    setIsModalVisibleEditAr(false);
    setIsModalVisibleEditAs(false);
    setIsModalVisibleEditMr(false);
    setIsModalVisibleEditMs(false);
    setIsModalVisibleEditCr(false);
    setIsModalVisibleEditCs(false);
    setDeleteModalVisibleAr(false);
    setDeleteModalVisibleAs(false);
    setDeleteModalVisibleMr(false);
    setDeleteModalVisibleMs(false);
    setDeleteModalVisibleCr(false);
    setDeleteModalVisibleCs(false);
  };

  // Status Changing function for Add rule in Agent Pricing

  const handleToggleAr = async (agentPricingId) => {
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
      }
    } catch (err) {
      console.log(`Error in toggling status: ${err}`);
    }
  };

  // Status Changing function for Add surge in Agent Surge

  const handleToggleAs = async (agentsurgeId) => {
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
      }
    } catch (err) {
      console.log(`Error in toggling status: ${err}`);
    }
  };

  // Status Changing function for Add rule in Merchant Pricing

  const handleToggleMr = async (merchantPricingId) => {
    try {
      const merchantResponse = merchantpricing.find(
        (merchantResponse) => merchantResponse._id === merchantPricingId
      );
      if (merchantResponse) {
        const updatedStatus = !merchantResponse.status;
        await axios.post(
          `${BASE_URL}/admin/merchant-pricing/change-status/${merchantPricingId}`,
          {
            ...merchantResponse,
            status: updatedStatus,
          },
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMerchantPricing(
          merchantpricing.map((m) =>
            m._id === merchantPricingId ? { ...m, status: updatedStatus } : m
          )
        );
      }
    } catch (err) {
      console.log(`Error in toggling status: ${err}`);
    }
  };

  // Status Changing function for Add surge in Merchant Surge

  const handleToggleMs = async (merchantsurgeId) => {
    try {
      const merchantResponse = merchantsurge.find(
        (merchantResponse) => merchantResponse._id === merchantsurgeId
      );
      if (merchantResponse) {
        const updatedStatus = !merchantResponse.status;
        await axios.post(
          `${BASE_URL}/admin/merchant-surge/change-status/${merchantsurgeId}`,
          {
            ...merchantResponse,
            status: updatedStatus,
          },
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMerchantSurge(
          merchantsurge.map((m) =>
            m._id === merchantsurgeId ? { ...m, status: updatedStatus } : m
          )
        );
      }
    } catch (err) {
      console.log(`Error in toggling status: ${err}`);
    }
  };

  // Status Changing function for Add rule in Customer Pricing

  const handleToggleCr = async (customerpricingId) => {
    try {
      const customerResponse = customerpricing.find(
        (customerResponse) => customerResponse._id === customerpricingId
      );
      if (customerResponse) {
        const updatedStatus = !customerResponse.status;
        await axios.post(
          `${BASE_URL}/admin/customer-pricing/change-status/${customerpricingId}`,
          {
            ...customerResponse,
            status: updatedStatus,
          },
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCustomerPricing(
          customerpricing.map((c) =>
            c._id === customerpricingId ? { ...c, status: updatedStatus } : c
          )
        );
      }
    } catch (err) {
      console.log(`Error in toggling status: ${err}`);
    }
  };

  // Status Changing function for Add surge in Customer Surge

  const handleToggleCs = async (customersurgeId) => {
    try {
      const customerResponse = customersurge.find(
        (customerResponse) => customerResponse._id === customersurgeId
      );
      if (customerResponse) {
        const updatedStatus = !customerResponse.status;
        await axios.post(
          `${BASE_URL}/admin/customer-surge/change-status/${customersurgeId}`,
          {
            ...customerResponse,
            status: updatedStatus,
          },
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCustomerSurge(
          customersurge.map((c) =>
            c._id === customersurgeId ? { ...c, status: updatedStatus } : c
          )
        );
      }
    } catch (err) {
      console.log(`Error in toggling status: ${err}`);
    }
  };

  return (
    <div>
    {isLoading ? (
      <GIFLoader />
    ) : (
    <>
      <Sidebar />
      <div className="w-full h-screen pl-[300px] bg-gray-100">
        <nav className="p-5">
          <GlobalSearch />
        </nav>
        <h1 className="mx-9  text-xl font-bold">Pricing</h1>
        <h1 className="px-9 mt-5 font-bold p-3 bg-gray-300">Agent</h1>
        <div className="flex items-center justify-between mx-9 mt-5">
          <h1 className="text-md">Pricing</h1>
          <div>
            <button
              className="bg-teal-700 text-white rounded-md flex items-center space-x-1 p-2"
              onClick={showModalAr}
            >
              <PlusOutlined className="mr-3" /> Add rule
            </button>

            <AddAgentPricingModal
              isVisible={isModalVisibleAr}
              handleCancel={handleCancel}
              token={token}
              BASE_URL={BASE_URL}
              geofence={geofence}
            />
          </div>
        </div>

        <div className="overflow-auto w-full">
          <table className="w-full mt-[20px]">
            <thead>
              <tr>
                {[
                  "Rule Name",
                  "Base Fare",
                  "Base Distance Fare",
                  "Extra Fare per Day",
                  "Base Distance Fare per Km",
                  "Waiting Fare",
                  "Waiting Time",
                  "Purchase Fare per hour",
                  "Geofence",
                  "Status",
                ].map((header, index) => (
                  <th
                    key={index}
                    className="bg-teal-700 text-center text-white  px-2 py-4  border-r-2 border-[#eee]/50"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {agentpricing.map((agentpricing) => (
                <tr
                  key={agentpricing._id}
                  className="align-middle border-b border-gray-300 text-center p-4"
                >
                  <td className="p-4">{agentpricing.ruleName}</td>
                  <td className="p-4">{agentpricing.baseFare}</td>
                  <td className="p-4">{agentpricing.baseDistanceFare}</td>
                  <td className="p-4">{agentpricing.extraFarePerDay}</td>
                  <td className="p-4">{agentpricing.baseDistanceFarePerKM}</td>
                  <td className="p-4">{agentpricing.waitingFare}</td>
                  <td className="p-4 px-2">{agentpricing.waitingTime}</td>
                  <td className="p-4">{agentpricing.purchaseFarePerHour}</td>
                  <td className="p-4">{agentpricing.geofenceId.name}</td>
                  <td className="p-4">
                    <div className="flex justify-center items-center gap-3">
                      <div>
                        <Switch
                          checked={agentpricing.status}
                          onChange={() => handleToggleAr(agentpricing._id)}
                        />
                      </div>
                      <div className="flex items-center">
                        <button
                          onClick={() => showModalEditAr(agentpricing._id)}
                        >
                          <MdOutlineEdit className="bg-gray-200 rounded-lg p-2 outline-none focus:outline-none text-[35px]" />
                        </button>
                        <EditAgentPricingModal
                          isVisible={isModalVisibleEditAr}
                          handleCancel={handleCancel}
                          token={token}
                          currentEditAr={currentEditAr}
                          BASE_URL={BASE_URL}
                          geofence={geofence}
                        />
                      </div>
                      <button
                        onClick={() => showModalDeleteAr(agentpricing._id)}
                      >
                        <RiDeleteBinLine className="text-red-900 rounded-lg bg-red-100 p-2 text-[35px]" />
                      </button>
                      <DeleteAgentPricingModal
                        isVisible={deleteModalVisibleAr}
                        handleCancel={handleCancel}
                        handleConfirmDeleteAr={handleConfirmDeleteAr}
                        currentDeleteAr={currentDeleteAr}
                        token={token}
                        BASE_URL={BASE_URL}
                        removeAr={removeAr}
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
              onClick={showModalAs}
            >
              <PlusOutlined className="mr-3" /> Add Surge
            </button>
            <AddAgentSurgeModal
              isVisible={isModalVisibleAs}
              handleCancel={handleCancel}
              token={token}
              BASE_URL={BASE_URL}
              geofence={geofence}
            />
          </div>
        </div>

        <div className="overflow-auto w-full">
          <table className="w-full mt-[20px]">
            <thead>
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
              {agentsurge.map((agentsurge) => (
                <tr
                  key={agentsurge._id}
                  className="align-middle border-b border-gray-300 text-center "
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
                          onChange={() => handleToggleAs(agentsurge._id)}
                        />
                      </div>
                      <div className="flex items-center">
                        <button onClick={() => showModalEditAs(agentsurge._id)}>
                          <MdOutlineEdit className="bg-gray-200 rounded-lg p-2 text-[35px]" />
                        </button>
                        <EditAgentSurgeModal
                          isVisible={isModalVisibleEditAs}
                          handleCancel={handleCancel}
                          token={token}
                          currentEditAs={currentEditAs}
                          BASE_URL={BASE_URL}
                          geofence={geofence}
                        />
                      </div>
                      <button onClick={() => showModalDeleteAs(agentsurge._id)}>
                        <RiDeleteBinLine className="text-red-900 rounded-lg bg-red-100 p-2 text-[35px]" />
                      </button>
                      <DeleteAgentSurgeModal
                        isVisible={deleteModalVisibleAs}
                        handleCancel={handleCancel}
                        handleConfirmDeleteAs={handleConfirmDeleteAs}
                        currentDeleteAs={currentDeleteAs}
                        token={token}
                        BASE_URL={BASE_URL}
                        removeAs={removeAs}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h1 className="px-9 mt-5 font-bold p-3 bg-gray-300">Merchant</h1>
        <div className="flex items-center justify-between mx-9 mt-10">
          <h1 className="text-md">Pricing</h1>
          <div>
            <button
              className="bg-teal-700 text-white rounded-md flex items-center space-x-1 p-2"
              onClick={showModalMr}
            >
              <PlusOutlined className="mr-3" /> Add rule
            </button>
            <AddMerchantPricingModal
              isVisible={isModalVisibleMr}
              handleCancel={handleCancel}
              token={token}
              BASE_URL={BASE_URL}
              geofence={geofence}
            />
          </div>
        </div>

        <div className="overflow-auto w-full">
          <table className="w-full mt-[20px]">
            <thead>
              <tr>
                {[
                  "Rule Name",
                  "Base Fare",
                  "Base Distance",
                  "Fare After Base Distance",
                  "Base Weight Upto",
                  "Fare After Base Weight",
                  "Purchase Fare per hour",
                  "Waiting Fare",
                  "Waiting Time",
                  "Geofence",
                  "Status",
                ].map((header, index) => (
                  <th
                    key={index}
                    className="bg-teal-700 text-center text-white px-1 py-3  border-r-2 border-[#eee]/50"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {merchantpricing.map((merchantpricing) => (
                <tr
                  key={merchantpricing._id}
                  className="align-middle border-b border-gray-300 text-center "
                >
                  <td className="p-4">{merchantpricing.ruleName}</td>
                  <td className="p-4">{merchantpricing.baseFare}</td>
                  <td className="p-4">{merchantpricing.baseDistance}</td>
                  <td className="p-4">
                    {merchantpricing.fareAfterBaseDistance}
                  </td>
                  <td className="p-4">{merchantpricing.baseWeightUpTo}</td>
                  <td className="p-4">{merchantpricing.fareAfterBaseWeight}</td>
                  <td className="p-4">{merchantpricing.purchaseFarePerHour}</td>
                  <td className="p-4">{merchantpricing.waitingFare}</td>
                  <td className="p-4 px-2">{merchantpricing.waitingTime}</td>
                  <td className="p-4">{merchantpricing.geofenceId.name}</td>
                  <td className="p-4">
                    <div className="flex justify-center items-center gap-3">
                      <div>
                        <Switch
                          checked={merchantpricing.status}
                          onChange={() => handleToggleMr(merchantpricing._id)}
                        />
                      </div>
                      <div className="flex items-center">
                        <button
                          onClick={() => showModalEditMr(merchantpricing._id)}
                        >
                          <MdOutlineEdit className="bg-gray-200 rounded-lg p-2 text-[35px]" />
                        </button>
                        <EditMerchantPricingModal
                          isVisible={isModalVisibleEditMr}
                          handleCancel={handleCancel}
                          token={token}
                          currentEditMr={currentEditMr}
                          BASE_URL={BASE_URL}
                          geofence={geofence}
                        />
                      </div>
                      <button
                        onClick={() => showModalDeleteMr(merchantpricing._id)}
                      >
                        <RiDeleteBinLine className="text-red-900 rounded-lg bg-red-100 p-2 text-[35px]" />
                      </button>
                      <DeleteMerchantPrcingModal
                        isVisible={deleteModalVisibleMr}
                        handleCancel={handleCancel}
                        handleConfirmDeleteMr={handleConfirmDeleteMr}
                        currentDeleteMr={currentDeleteMr}
                        token={token}
                        BASE_URL={BASE_URL}
                        removeMr={removeMr}
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
              onClick={showModalMs}
            >
              <PlusOutlined className="mr-3" /> Add Surge
            </button>
            <AddMerchantSurgeModal
              isVisible={isModalVisibleMs}
              handleCancel={handleCancel}
              token={token}
              BASE_URL={BASE_URL}
              geofence={geofence}
            />
          </div>
        </div>

        <div className="overflow-auto w-full">
          <table className="w-full mt-[20px]">
            <thead>
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
              {merchantsurge.map((merchantsurge) => (
                <tr
                  key={merchantsurge._id}
                  className="align-middle border-b border-gray-300 text-center "
                >
                  <td>{merchantsurge.ruleName}</td>
                  <td>{merchantsurge.baseFare}</td>
                  <td>{merchantsurge.baseDistance}</td>
                  <td>{merchantsurge.waitingFare}</td>
                  <td>{merchantsurge.waitingTime}</td>
                  <td>{merchantsurge.geofenceId.name}</td>
                  <td className="py-3 ">
                    <div className="flex items-center gap-3 justify-end mx-4">
                      <div>
                        <Switch
                          checked={merchantsurge.status}
                          onChange={() => handleToggleMs(merchantsurge._id)}
                        />
                      </div>
                      <div className="flex item-center">
                        <button
                          onClick={() => showModalEditMs(merchantsurge._id)}
                        >
                          <MdOutlineEdit className="bg-gray-200 rounded-lg p-2 text-[35px]" />
                        </button>
                        <EditMerchantSurgeModal
                          isVisible={isModalVisibleEditMs}
                          handleCancel={handleCancel}
                          token={token}
                          currentEditMs={currentEditMs}
                          BASE_URL={BASE_URL}
                          geofence={geofence}
                        />
                      </div>
                      <button
                        onClick={() => showModalDeleteMs(merchantsurge._id)}
                      >
                        <RiDeleteBinLine className="text-red-900 rounded-lg bg-red-100 p-2 text-[35px]" />
                      </button>
                      <DeleteMerchantSurgeModal
                        isVisible={deleteModalVisibleMs}
                        handleCancel={handleCancel}
                        handleConfirmDeleteMs={handleConfirmDeleteMs}
                        currentDeleteMs={currentDeleteMs}
                        token={token}
                        BASE_URL={BASE_URL}
                        removeMs={removeMs}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h1 className="px-9 mt-5 font-bold p-3 bg-gray-300">Customer</h1>
        <div className="flex items-center justify-between mx-9 mt-10">
          <h1 className="text-md">Pricing</h1>
          <div>
            <button
              className="bg-teal-700 text-white rounded-md flex items-center space-x-1 p-2"
              onClick={showModalCr}
            >
              <PlusOutlined className="mr-3" /> Add rule
            </button>
            <AddCustomerPricingModal
              isVisible={isModalVisibleCr}
              handleCancel={handleCancel}
              token={token}
              BASE_URL={BASE_URL}
              geofence={geofence}
              business={business}
            />
          </div>
        </div>

        <div className="overflow-auto w-full">
          <table className="w-full mt-[20px]">
            <thead>
              <tr>
                {[
                  "Rule Name",
                  "Base Fare",
                  "Base Distance",
                  "Fare After Base Distance",
                  "Base Weight Upto",
                  "Fare After Base Weight",
                  "Purchase Fare per hour",
                  "Waiting Fare",
                  "Waiting Time",
                  "Geofence",
                  "Status",
                ].map((header, index) => (
                  <th
                    key={index}
                    className="bg-teal-700 text-center text-white  px-1 py-3  border-r-2 border-[#eee]/50"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customerpricing.map((customerpricing) => (
                <tr
                  key={customerpricing._id}
                  className="align-middle border-b border-gray-300 text-center p-4"
                >
                  <td className="p-4">{customerpricing.ruleName}</td>
                  <td className="p-4">{customerpricing.baseFare}</td>
                  <td className="p-4">{customerpricing.baseDistance}</td>
                  <td className="p-4">
                    {customerpricing.fareAfterBaseDistance}
                  </td>
                  <td className="p-4">{customerpricing.baseWeightUpto}</td>
                  <td className="p-4">{customerpricing.fareAfterBaseWeight}</td>
                  <td className="p-4">{customerpricing.purchaseFarePerHour}</td>
                  <td className="p-4">{customerpricing.waitingFare}</td>
                  <td className="p-4 px-2">{customerpricing.waitingTime}</td>
                  <td className="p-4">{customerpricing.geofenceId.name}</td>
                  <td className="p-4">
                    <div className="flex justify-center items-center gap-3">
                      <div>
                        <Switch
                          checked={customerpricing.status}
                          onChange={() => handleToggleCr(customerpricing._id)}
                        />
                      </div>
                      <div className="flex items-center">
                        <button
                          onClick={() => showModalEditCr(customerpricing._id)}
                        >
                          <MdOutlineEdit className="bg-gray-200 rounded-lg p-2 text-[35px]" />
                        </button>
                        <EditCustomerPricingModal
                          isVisible={isModalVisibleEditCr}
                          handleCancel={handleCancel}
                          token={token}
                          currentEditCr={currentEditCr}
                          BASE_URL={BASE_URL}
                          geofence={geofence}
                          business={business}
                        />
                      </div>
                      <button
                        onClick={() => showModalDeleteCr(customerpricing._id)}
                      >
                        <RiDeleteBinLine className="text-red-900 rounded-lg bg-red-100 p-2 text-[35px]" />
                      </button>
                      <DeleteCustomerPricingModal
                        isVisible={deleteModalVisibleCr}
                        handleCancel={handleCancel}
                        handleConfirmDeleteCr={handleConfirmDeleteCr}
                        currentDeleteCr={currentDeleteCr}
                        token={token}
                        BASE_URL={BASE_URL}
                        removeCr={removeCr}
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
              onClick={showModalCs}
            >
              <PlusOutlined className="mr-3" /> Add Surge
            </button>
            <AddCustomerSurgeModal
              isVisible={isModalVisibleCs}
              handleCancel={handleCancel}
              token={token}
              BASE_URL={BASE_URL}
              geofence={geofence}
            />
          </div>
        </div>

        <div className="overflow-auto w-full ">
          <table className="w-full mt-[20px] mb-28">
            <thead>
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
              {customersurge.map((customersurge) => (
                <tr
                  key={customersurge._id}
                  className="align-middle border-b border-gray-300 text-center "
                >
                  <td>{customersurge.ruleName}</td>
                  <td>{customersurge.baseFare}</td>
                  <td>{customersurge.baseDistance}</td>
                  <td>{customersurge.waitingFare}</td>
                  <td>{customersurge.waitingTime}</td>
                  <td>{customersurge.geofenceId.name}</td>
                  <td className="py-3 ">
                    <div className="flex items-center gap-3 justify-end mx-4">
                      <div>
                        <Switch
                          checked={customersurge.status}
                          onChange={() => handleToggleCs(customersurge._id)}
                        />
                      </div>
                      <div className="flex items-center">
                        <button
                          onClick={() => showModalEditCs(customersurge._id)}
                        >
                          <MdOutlineEdit className="bg-gray-200 rounded-lg p-2 text-[35px]" />
                        </button>
                        <EditCustomerSurgeModal
                          isVisible={isModalVisibleEditCs}
                          handleCancel={handleCancel}
                          token={token}
                          currentEditCs={currentEditCs}
                          BASE_URL={BASE_URL}
                          geofence={geofence}
                        />
                      </div>
                      <button
                        onClick={() => showModalDeleteCs(customersurge._id)}
                      >
                        <RiDeleteBinLine className="text-red-900 rounded-lg bg-red-100 p-2 text-[35px]" />
                      </button>
                      <DeleteCustomerSurgeModal
                        isVisible={deleteModalVisibleCs}
                        handleCancel={handleCancel}
                        handleConfirmDeleteCs={handleConfirmDeleteCs}
                        currentDeleteCs={currentDeleteCs}
                        token={token}
                        BASE_URL={BASE_URL}
                        removeCs={removeCs}
                      />
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

export default Pricing;
