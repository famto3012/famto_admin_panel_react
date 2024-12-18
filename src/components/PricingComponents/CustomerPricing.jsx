import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AddCustomerPricingModal from "../model/PricingModels/AddCustomerPricingModal";
import { Switch } from "antd";
import { MdOutlineEdit } from "react-icons/md";
import EditCustomerPricingModal from "../model/PricingModels/EditCustomerPricingModal";
import { RiDeleteBinLine } from "react-icons/ri";
import DeleteCustomerPricingModal from "../model/PricingModels/DeleteCustomerPricingModal";
import AddCustomerSurgeModal from "../model/PricingModels/AddCustomerSurgeModal";
import EditCustomerSurgeModal from "../model/PricingModels/EditCustomerSurgeModal";
import DeleteCustomerSurgeModal from "../model/PricingModels/DeleteCustomerSurgeModal";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const CustomerPricing = () => {
  const [customerpricing, setCustomerPricing] = useState([]);
  const [customersurge, setCustomerSurge] = useState([]);
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
  const [business, setBusiness] = useState([]);
  const { token } = useContext(UserContext);
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
        const [custPricing, custSurge, geofence, businessCategory] =
          await Promise.all([
            axios.get(
              `${BASE_URL}/admin/customer-pricing/get-all-customer-pricing`,
              {
                withCredentials: true,
                headers: { Authorization: `Bearer ${token}` },
              }
            ),
            axios.get(
              `${BASE_URL}/admin/customer-surge/get-all-customer-surge`,
              {
                withCredentials: true,
                headers: { Authorization: `Bearer ${token}` },
              }
            ),
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

        // Set state independently
        setCustomerPricing(custPricing.data.data || []);
        setCustomerSurge(custSurge.data.data || []);
        setGeofence(geofence.data.geofences || []);
        setBusiness(businessCategory.data.data || []);
      } catch (err) {
        console.error(`Error in fetching data: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, navigate]);

  const showModalAddRule = () => setModalVisibleAddRule(true);
  const showModalAddSurge = () => setModalVisibleAddSurge(true);

  const showModalEditRule = (customerpricingId) => {
    setCurrentEditRule(customerpricingId);
    setModalVisibleEditRule(true);
  };

  const showModalEditSurge = (customersurgeId) => {
    setCurrentEditSurge(customersurgeId);
    setModalVisibleEditSurge(true);
  };

  const showModalDeleteRule = (customerpricingId) => {
    setCurrentDeleteRule(customerpricingId);
    setModalVisibleDeleteRule(true);
  };

  const handleConfirmDeleteRule = () => {
    setModalVisibleDeleteRule(false);
    setCurrentDeleteRule(null);
  };

  const showModalDeleteSurge = (customersurgeId) => {
    setCurrentDeleteSurge(customersurgeId);
    setModalVisibleDeleteSurge(true);
  };

  const handleAddRule = (newRule) => {
    setCustomerPricing((prevRules) => [...prevRules, newRule]);
    setModalVisibleAddRule(false);
  };

  const handleAddSurge = (newSurge) => {
    setCustomerSurge((prevSurge) => [...prevSurge, newSurge]);
    setModalVisibleAddSurge(false);
  };

  const handleEditRule = (updatedRule) => {
    setCustomerPricing((prevRules) =>
      prevRules.map((agentrule) =>
        agentrule._id === updatedRule._id ? updatedRule : agentrule
      )
    );
  };

  const handleEditSurge = (updatedSurge) => {
    setCustomerSurge((prevSurge) =>
      prevSurge.map((agentsurge) =>
        agentsurge._id === updatedSurge._id ? updatedSurge : agentsurge
      )
    );
  };

  const removeRule = (customerpricingId) => {
    setCustomerPricing(
      customerpricing.filter(
        (customerpricing) => customerpricing._id !== customerpricingId
      )
    );
  };

  const removeSurge = (customersurgeId) => {
    setCustomerSurge(
      customersurge.filter(
        (customersurge) => customersurge._id !== customersurgeId
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

  const handleToggleRule = async (customerpricingId) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/admin/customer-pricing/change-status/${customerpricingId}`,
        {},
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setCustomerPricing((prevPricing) =>
          prevPricing.map((pricing) =>
            pricing.id === customerpricingId
              ? { ...pricing, status: !pricing.status }
              : pricing
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
      toast({
        title: "Error",
        description: "Failed to update status.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleToggleSurge = async (customersurgeId) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/admin/customer-surge/change-status/${customersurgeId}`,
        {},
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setCustomerSurge((prevSurge) =>
          prevSurge.map((surge) =>
            surge.id === customersurgeId
              ? { ...surge, status: !surge.status }
              : surge
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
      <h1 className="px-9 mt-5 font-bold p-3 bg-gray-300">Customer</h1>
      <div className="flex items-center justify-between mx-9 mt-10">
        <h1 className="text-md">Pricing</h1>
        <div>
          <button
            className="bg-teal-700 text-white rounded-md flex items-center space-x-1 p-2 mb-[20px]"
            onClick={showModalAddRule}
          >
            <PlusOutlined className="mr-3" /> Add rule
          </button>
          <AddCustomerPricingModal
            isVisible={isModalVisibleAddRule}
            handleCancel={handleCancel}
            token={token}
            BASE_URL={BASE_URL}
            geofence={geofence}
            business={business}
            onAddRule={handleAddRule}
          />
        </div>
      </div>

      <div className="overflow-auto w-full max-h-[30rem]">
        <table className="w-full">
          <thead className="sticky top-0 left-0 z-10">
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
            {isLoading && (
              <tr>
                <td colSpan={11} className="text-center h-20">
                  Loading Data...
                </td>
              </tr>
            )}

            {!isLoading && customerpricing?.length === 0 && (
              <tr>
                <td colSpan={11}>
                  <p className="flex items-center justify-center h-20">
                    No data available
                  </p>
                </td>
              </tr>
            )}

            {!isLoading &&
              customerpricing.map((customerpricing) => (
                <tr
                  key={customerpricing._id}
                  className="align-middle even:bg-gray-200 last:border-2 text-center p-4"
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
                  <td className="p-4">{customerpricing.geofenceId?.name}</td>
                  <td className="p-4">
                    <div className="flex justify-center items-center gap-3">
                      <div>
                        <Switch
                          checked={customerpricing.status}
                          onChange={() => handleToggleRule(customerpricing._id)}
                        />
                      </div>
                      <div className="flex items-center">
                        <button
                          onClick={() => showModalEditRule(customerpricing._id)}
                        >
                          <MdOutlineEdit className="bg-gray-200 rounded-lg p-2 text-[35px]" />
                        </button>
                      </div>
                      <button
                        onClick={() => showModalDeleteRule(customerpricing._id)}
                      >
                        <RiDeleteBinLine className="text-red-900 rounded-lg bg-red-100 p-2 text-[35px]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <EditCustomerPricingModal
        isVisible={isModalVisibleEditRule}
        handleCancel={handleCancel}
        token={token}
        currentEdit={currentEditRule}
        BASE_URL={BASE_URL}
        geofence={geofence}
        business={business}
        onEditRule={handleEditRule}
      />

      <DeleteCustomerPricingModal
        isVisible={isModalVisibleDeleteRule}
        handleCancel={handleCancel}
        handleConfirmDelete={handleConfirmDeleteRule}
        currentDelete={currentDeleteRule}
        token={token}
        BASE_URL={BASE_URL}
        remove={removeRule}
      />

      <div className="flex items-center justify-between mx-9 mt-8">
        <h1 className="text-md">Surge</h1>
        <div>
          <button
            className="bg-teal-700 text-white rounded-md flex items-center space-x-1 p-2"
            onClick={showModalAddSurge}
          >
            <PlusOutlined className="mr-3" /> Add Surge
          </button>
          <AddCustomerSurgeModal
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
        <table className="w-full mt-[20px] mb-[50px]">
          <thead className="stick top-0 left-0">
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

            {!isLoading && customersurge?.length === 0 && (
              <tr>
                <td colSpan={7}>
                  <p className="flex items-center justify-center h-20">
                    No data available
                  </p>
                </td>
              </tr>
            )}

            {!isLoading &&
              customersurge.map((customersurge) => (
                <tr
                  key={customersurge._id}
                  className="align-middle even:bg-gray-200 last:border-2 text-center "
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
                          onChange={() => handleToggleSurge(customersurge._id)}
                        />
                      </div>
                      <div className="flex items-center">
                        <button
                          onClick={() => showModalEditSurge(customersurge._id)}
                        >
                          <MdOutlineEdit className="bg-gray-200 rounded-lg p-2 text-[35px]" />
                        </button>
                      </div>
                      <button
                        onClick={() => showModalDeleteSurge(customersurge._id)}
                      >
                        <RiDeleteBinLine className="text-red-900 rounded-lg bg-red-100 p-2 text-[35px]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <EditCustomerSurgeModal
        isVisible={isModalVisibleEditSurge}
        handleCancel={handleCancel}
        token={token}
        currentEdit={currentEditSurge}
        BASE_URL={BASE_URL}
        geofence={geofence}
        onEditSurge={handleEditSurge}
      />

      <DeleteCustomerSurgeModal
        isVisible={isModalVisibleDeleteSurge}
        handleCancel={handleCancel}
        handleConfirmDelete={handleConfirmDeleteSurge}
        currentDelete={currentDeleteSurge}
        token={token}
        BASE_URL={BASE_URL}
        remove={removeSurge}
      />
    </>
  );
};

export default CustomerPricing;
