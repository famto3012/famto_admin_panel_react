import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PlusOutlined } from '@ant-design/icons';
import AddMerchantPricingModal from '../model/PricingModels/AddMerchantPricingModal';
import { Switch } from 'antd';
import { MdOutlineEdit } from 'react-icons/md';
import EditMerchantPricingModal from '../model/PricingModels/EditMerchantPricingModal';
import { RiDeleteBinLine } from 'react-icons/ri';
import DeleteMerchantPrcingModal from '../model/PricingModels/DeleteMerchantPricingModal';
import AddMerchantSurgeModal from '../model/PricingModels/AddMerchantSurgeModal';
import EditMerchantSurgeModal from '../model/PricingModels/EditMerchantSurgeModal';
import DeleteMerchantSurgeModal from '../model/PricingModels/DeleteMerchantSurgeModal';
import { useToast } from '@chakra-ui/react';

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const MerchantPricing = () => {

  const [merchantpricing, setMerchantPricing] = useState([]);
  const [merchantsurge, setMerchantSurge] = useState([]);
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
        const [
          merchPricingResponse,
          merchSurgeResponse,
          geofenceResponse
        ] = await Promise.all([
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
       
          axios.get(`${BASE_URL}/admin/geofence/get-geofence`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }),
          
        ]);

       
        if (merchPricingResponse.status === 200) {
          setMerchantPricing(merchPricingResponse.data.data);
          console.log(merchPricingResponse.data.data);
        }
        if (merchSurgeResponse.status === 200) {
          setMerchantSurge(merchSurgeResponse.data.data);
          console.log(merchSurgeResponse.data.data);
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

  // Function to add the merchant rule in the list

  const handleAddRule = (newRule) => {
    setMerchantPricing((prevRules) => [...prevRules, newRule]);
    setModalVisibleAddRule(false);
  };

  // Function to add the merchant rule in the list

  const handleAddSurge = (newSurge) => {
    setMerchantSurge((prevSurge) => [...prevSurge, newSurge]);
    setModalVisibleAddSurge(false);
  };

 // Function to update the merchant rule in the list

 const handleEditRule = (updatedRule) => {
  setMerchantPricing((prevRules) =>
    prevRules.map((agentrule) =>
      agentrule._id === updatedRule._id ? updatedRule : agentrule
    )
  );
};

 // Function to update the merchant surge in the list

 const handleEditSurge = (updatedSurge) => {
  setMerchantSurge((prevSurge) =>
    prevSurge.map((agentsurge) =>
      agentsurge._id === updatedSurge._id ? updatedSurge : agentsurge
    )
  );
};

  // Modal function for Add rule in Merchant Pricing

  const showModalAddRule = () => {
    setModalVisibleAddRule(true);
  };

  // Modal function for Add surge in Merchant Surge

  const showModalAddSurge = () => {
    setModalVisibleAddSurge(true);
  };

  // Modal function for Edit rule in Merchant Pricing

  const showModalEditRule = (merchantPricingId) => {
    setCurrentEditRule(merchantPricingId);
    setModalVisibleEditRule(true);
  };

  // Modal function for Edit surge in Merchant Surge

  const showModalEditSurge = (merchantsurgeId) => {
    setCurrentEditSurge(merchantsurgeId);
    setModalVisibleEditSurge(true);
  };

   // Modal function for Delete rule in Merchant Pricing

   const showModalDeleteRule = (merchantPricingId) => {
    setCurrentDeleteRule(merchantPricingId);
    setModalVisibleDeleteRule(true);
  };

  const removeRule = (merchantPricingId) => {
    setMerchantPricing(
      merchantpricing.filter(
        (merchantpricing) => merchantpricing._id !== merchantPricingId
      )
    );
  };

  const handleConfirmDeleteRule = () => {
    setModalVisibleDeleteRule(false);
    setCurrentDeleteRule(null);
  };

  // Modal function for Delete surge in Merchant Surge

  const showModalDeleteSurge = (merchantsurgeId) => {
    setCurrentDeleteSurge(merchantsurgeId);
    setModalVisibleDeleteSurge(true);
  };

  const removeSurge = (merchantsurgeId) => {
    setMerchantSurge(
      merchantsurge.filter(
        (merchantsurge) => merchantsurge._id !== merchantsurgeId
      )
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

   // Status Changing function for Add rule in Merchant Pricing

   const handleToggleRule = async (merchantPricingId) => {
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
        toast({
          title: "Success",
          description: "Status Updated Successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        })
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

  // Status Changing function for Add surge in Merchant Surge

  const handleToggleSurge = async (merchantsurgeId) => {
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
        toast({
          title: "Success",
          description: "Status Updated Successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        })
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

  return (
    <>
     <h1 className="px-9 mt-5 font-bold p-3 bg-gray-300">Merchant</h1>
        <div className="flex items-center justify-between mx-9 mt-10">
          <h1 className="text-md">Pricing</h1>
          <div>
            <button
              className="bg-teal-700 text-white rounded-md flex items-center space-x-1 p-2"
              onClick={showModalAddRule}
            >
              <PlusOutlined className="mr-3" /> Add rule
            </button>
            <AddMerchantPricingModal
              isVisible={isModalVisibleAddRule}
              handleCancel={handleCancel}
              token={token}
              BASE_URL={BASE_URL}
              geofence={geofence}
              onAddRule={handleAddRule}
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
            {isLoading && (
                <tr>
                  <td colSpan={11} className="text-center h-20">
                    Loading Data...
                  </td>
                </tr>
              )}
              {!isLoading && merchantpricing?.length === 0 && (
                <tr>
                  <td colSpan={11}>
                    <p className="flex items-center justify-center h-20">
                      No data available
                    </p>
                  </td>
                </tr>
              )}
              {!isLoading && merchantpricing.map((merchantpricing) => (
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
                          onChange={() => handleToggleRule(merchantpricing._id)}
                        />
                      </div>
                      <div className="flex items-center">
                        <button
                          onClick={() => showModalEditRule(merchantpricing._id)}
                        >
                          <MdOutlineEdit className="bg-gray-200 rounded-lg p-2 text-[35px]" />
                        </button>
                        <EditMerchantPricingModal
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
                        onClick={() => showModalDeleteRule(merchantpricing._id)}
                      >
                        <RiDeleteBinLine className="text-red-900 rounded-lg bg-red-100 p-2 text-[35px]" />
                      </button>
                      <DeleteMerchantPrcingModal
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
            <AddMerchantSurgeModal
              isVisible={isModalVisibleAddSurge}
              handleCancel={handleCancel}
              token={token}
              BASE_URL={BASE_URL}
              geofence={geofence}
              onAddSurge={handleAddSurge}
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
            {isLoading && (
                <tr>
                  <td colSpan={7} className="text-center h-20">
                    Loading Data...
                  </td>
                </tr>
              )}
              {!isLoading && merchantsurge?.length === 0 && (
                <tr>
                  <td colSpan={7}>
                    <p className="flex items-center justify-center h-20">
                      No data available
                    </p>
                  </td>
                </tr>
              )}
              {!isLoading && merchantsurge.map((merchantsurge) => (
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
                          onChange={() => handleToggleSurge(merchantsurge._id)}
                        />
                      </div>
                      <div className="flex item-center">
                        <button
                          onClick={() => showModalEditSurge(merchantsurge._id)}
                        >
                          <MdOutlineEdit className="bg-gray-200 rounded-lg p-2 text-[35px]" />
                        </button>
                        <EditMerchantSurgeModal
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
                        onClick={() => showModalDeleteSurge(merchantsurge._id)}
                      >
                        <RiDeleteBinLine className="text-red-900 rounded-lg bg-red-100 p-2 text-[35px]" />
                      </button>
                      <DeleteMerchantSurgeModal
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
  )
}

export default MerchantPricing
