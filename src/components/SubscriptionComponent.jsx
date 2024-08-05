import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Switch, Modal } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import AddSubMerchantModal from "./model/SubscriptionModels/AddSubMerchantModal";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EditSubMerchantModal from "./model/SubscriptionModels/EditSubMerchantModal";
import DeleteSubMerchantModal from "./model/SubscriptionModels/DeleteSubMerchantModal";
import AddSubCustomerModal from "./model/SubscriptionModels/AddSubCustomerModal";
import EditSubCustomerModal from "./model/SubscriptionModels/EditSubCustomerModal";
import DeleteSubCustomerModal from "./model/SubscriptionModels/DeleteSubCustomerModal";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const SubscriptionComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { token, role } = useContext(UserContext);
  const [subscriptionMerchant, setSubscriptionMerchant] = useState([]);
  const [subscriptionCustomer, setSubscriptionCustomer] = useState([]);
  const [tax,setTax] = useState([])
  const [currentEditMerchant, setCurrentEditMerchant] = useState(null);
  const [currentEditCustomer, setCurrentEditCustomer] = useState(null);
  const [currentDeleteMerchant, setCurrentDeleteMerchant] = useState(null);
  const [currentDeleteCustomer, setCurrentDeleteCustomer] = useState(null);
  const [isModalVisibleMerchant, setIsModalVisibleMerchant] = useState(false);
  const [isModalVisibleMerchantEdit, setIsModalVisibleMerchantEdit] =
    useState(false);
  const [deleteModalMerchant, setIsModalMerchantDelete] = useState(false);
  const [isModalVisibleCustomer, setIsModalVisibleCustomer] = useState(false);
  const [isModalVisibleCustomerEdit, setIsModalVisibleCustomerEdit] =
    useState(false);
  const [deleteModalCustomer, setIsModalCustomerDelete] = useState(false);
  const navigate = useNavigate();
  const [merchant, setMerchant] = useState({
    planId: "",
    userId: "",
    paymentMode: "",
  });

  const [customer, setCustomer] = useState({
    planId: "",
    userId: "",
    paymentMode: "",
  });

  useEffect(() => {
    if (!token || role !== "Admin") {
      navigate("auth/login");
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);

        const [merchantResponse, customerResponse,taxResponse] = await Promise.all([
          axios.get(
            `${BASE_URL}/admin/subscription/get-merchant-subscription`,
            {
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
          axios.get(
            `${BASE_URL}/admin/subscription/get-customer-subscription`,
            {
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
          axios.get(
            `${BASE_URL}/admin/taxes/all-tax`,
            {
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
        ]);
        if (merchantResponse.status === 200) {
          setSubscriptionMerchant(merchantResponse.data.data);
          console.log(subscriptionMerchant);
        }
        if (customerResponse.status === 200) {
          setSubscriptionCustomer(customerResponse.data.data);
          console.log(subscriptionCustomer);
        }
        if (taxResponse.status === 200) {
          setTax(taxResponse.data.data);
          console.log(taxResponse);
        }
      } catch (err) {
        console.error(`Error in fetching data: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, role, navigate]);

  const handleCustomer = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const submitCustomer = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const addResponse = await axios.post(
        `${BASE_URL}/admin/subscription-payment/customer-subscription-payment`,
        customer,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (addResponse.status === 201) {
        console.log(addResponse.data.message);
      }
    } catch (err) {
      console.log(`Error in fetching data:${err}`);
    }
    console.log("Customer", customer);
  };

  const handleMerchant = (e) => {
    const { name, value } = e.target;
    setMerchant({ ...merchant, [name]: value });
  };

  const submitMerchant = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const addResponse = await axios.post(
        `${BASE_URL}/admin/subscription-payment/merchant-subscription-payment`,
        merchant,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (addResponse.status === 201) {
        console.log(addResponse.data.message);
      }
    } catch (err) {
      console.log(`Error in fetching data:${err}`);
    }
    console.log("Merchant", merchant);
  };

  // Modal for Add Merchant Subscription
  const showModalAddMerchant = () => {
    setIsModalVisibleMerchant(true);
  };

  // Modal for Edit Merchant Subscription
  const showModalEditMerchant = (id) => {
    setCurrentEditMerchant(id);
    setIsModalVisibleMerchantEdit(true);
  };

  // Modal for Delete Merchant Subscription
  const showModalDeleteMerchant = (id) => {
    setCurrentDeleteMerchant(id);
    setIsModalMerchantDelete(true);
  };

  const removeMerchant = (id) => {
    setSubscriptionMerchant(
      subscriptionMerchant.filter((subscriptions) => subscriptions._id !== id)
    );
  };

  const handleConfirmDeleteMerchant = () => {
    setIsModalMerchantDelete(false);
    setCurrentDeleteMerchant(null);
  };

  // Modal for Add Customer Subscription
  const showModalAddCustomer = () => {
    setIsModalVisibleCustomer(true);
  };

  // Modal for Edit Customer Subscription
  const showModalEditCustomer = (id) => {
    setCurrentEditCustomer(id);
    setIsModalVisibleCustomerEdit(true);
  };

  const showModalDeleteCustomer = (id) => {
    setCurrentDeleteCustomer(id);
    setIsModalCustomerDelete(true);
  };

  const removeCustomer = (id) => {
    setSubscriptionCustomer(
      subscriptionCustomer.filter((subscription) => subscription._id !== id)
    );
  };

  // New function to handle confirm delete
  const handleConfirmDeleteCustomer = () => {
    setIsModalCustomerDelete(false);
    setCurrentDeleteCustomer(null);
  };

  const handleCancel = () => {
    setIsModalVisibleMerchant(false);
    setIsModalVisibleMerchantEdit(false);
    setIsModalMerchantDelete(false);
    setIsModalVisibleCustomer(false);
    setIsModalVisibleCustomerEdit(false);
  };

  return (
    <>
      <div className="pl-[300px] bg-gray-100">
        <h1 className="mt-10 px-5 pt-5 pb-2 bg-red-100 font-semibold text-[18px]">
          Merchant
        </h1>
        <div className="bg-white mx-5 p-5 rounded-lg mt-5">
          <div className="flex w-2/3 justify-between mt-5">
            <p>
              Enable this toggle to transfer Subscription on the basis of
              delivery methods.
            </p>
            <Switch />
          </div>
          <div className="flex items-center mt-10">
            <label className="w-1/3">Merchant Subscription Setup</label>
            <button
              className="bg-zinc-200 p-2 rounded-lg w-1/3"
              onClick={showModalAddMerchant}
            >
              Add New Merchant Subscription Plan{" "}
              <PlusOutlined className="ml-10" />
            </button>
            <AddSubMerchantModal
              isVisible={isModalVisibleMerchant}
              handleCancel={handleCancel}
              token={token}
              tax={tax}
              BASE_URL={BASE_URL}
            />
          </div>
        </div>

        <div className="bg-white mx-5 p-5 pb-10 rounded-lg mt-5">
          <h1>Apply Subscription</h1>
          <div className="flex mt-10">
            <label className="w-1/3">Added Subscription Plans</label>
            <div className="w-fit ml-6 grid xl:grid-cols-2 grid-cols-1 gap-5">
              {subscriptionMerchant.map((subscriptions) => (
                <div className="bg-zinc-50 shadow rounded-lg flex">
                  <div>
                    <div className="flex justify-between m-3">
                      <p>{subscriptions.name}</p>
                      <p>{subscriptions.amount}</p>
                    </div>
                    <div className="flex justify-between mt-5 m-3">
                      <p>{subscriptions.duration}</p>
                      <p>{subscriptions.renewalReminder}</p>
                    </div>
                    <p className="m-3">{subscriptions.taxId}</p>
                    <p className="m-3">{subscriptions.description}</p>
                    <div className="mb-5 flex">
                      <button
                        className="bg-blue-50 flex items-center rounded-3xl p-3 px-10 mx-3 mt-5"
                        onClick={() => showModalEditMerchant(subscriptions._id)}
                      >
                        <BiEdit className="text-[22px] mr-1" /> Edit
                      </button>
                      <EditSubMerchantModal
                        isVisible={isModalVisibleMerchantEdit}
                        handleCancel={handleCancel}
                        currentEditMerchant={currentEditMerchant}
                        token={token}
                        tax={tax}
                        BASE_URL={BASE_URL}
                      />

                      <button
                        className="bg-teal-800 flex  rounded-3xl p-3 items-center text-white mx-3 px-8 mt-5"
                        onClick={() =>
                          showModalDeleteMerchant(subscriptions._id)
                        }
                      >
                        <RiDeleteBinLine className="text-[20px] mr-1" />
                        Delete
                      </button>
                      <DeleteSubMerchantModal
                        isVisible={deleteModalMerchant}
                        handleCancel={handleCancel}
                        handleConfirmDeleteMerchant={
                          handleConfirmDeleteMerchant
                        }
                        currentDeleteMerchant={currentDeleteMerchant}
                        token={token}
                        BASE_URL={BASE_URL}
                        removeMerchant={removeMerchant}
                      />
                    </div>
                  </div>
                  <div className="bg-white  shadow ml-auto rounded-lg w-14 flex items-center justify-center">
                    <input
                      type="radio"
                      name="planId"
                      value={subscriptions._id}
                      checked={merchant.planId === subscriptions._id}
                      className="size-5 bg-teal-800"
                      onChange={handleMerchant}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex mt-5 items-center">
            <label className="w-1/3 text-gray-800">Merchant Id</label>
            <input
              type="text"
              name="userId"
              value={merchant.userId}
              className="border-2 border-gray-100 rounded shadow-md p-2 w-1/3 focus:outline-none"
              onChange={handleMerchant}
            />
          </div>
          <div className="flex mt-5">
            <div className="w-1/3">
              <label className="flex items-center">Payment Mode</label>
            </div>
            <div className="w-2/3">
              <input
                type="radio"
                name="paymentMode"
                value="Online"
                className="mr-3"
                checked={merchant.paymentMode === "Online"}
                onChange={handleMerchant}
              />
              Online
              <input
                type="radio"
                name="paymentMode"
                value="Cash"
                className="mr-3 ml-8"
                checked={merchant.paymentMode === "Cash"}
                onChange={handleMerchant}
              />
              Cash
            </div>
          </div>
          <button
            className="bg-teal-800 w-1/3 p-2 text-white rounded-lg mt-5 ml-[33%]"
            onClick={submitMerchant}
          >
            Apply Subscription
          </button>
        </div>
      </div>

      <div className="pl-[300px] bg-gray-100">
        <h1 className="mt-10 px-5 pt-5 pb-2 bg-red-100 font-semibold text-[18px]">
          Customer
        </h1>
        <div className=" mx-5 p-5 rounded-lg mt-5">
          <div className="flex w-2/3 justify-between mt-5">
            <p>
              Enable this toggle to transfer Subscription on the basis of
              delivery methods.
            </p>
            <Switch />
          </div>
          <div className="flex item-center mt-10">
            <label className="w-1/3">Customer Subscription Setup</label>
            <button
              className="bg-zinc-200 p-2 rounded-lg w-1/3"
              onClick={showModalAddCustomer}
            >
              Add New Customer Subscription Plan{" "}
              <PlusOutlined className="ml-10" />
            </button>
            <AddSubCustomerModal
              isVisible={isModalVisibleCustomer}
              handleCancel={handleCancel}
              token={token}
              tax={tax}
              BASE_URL={BASE_URL}
            />
          </div>
        </div>

        <div className="bg-white mx-5 p-5 pb-10 rounded-lg mt-5">
          <h1>Apply Subscription</h1>
          <div className="flex mt-10">
            <label className="w-1/3">Added Subscription Plans</label>
            <div className="w-fit grid xl:grid-cols-2 grid-cols-1 gap-5">
              {subscriptionCustomer.map((subscription) => (
                <div className="bg-zinc-50 shadow-md rounded-lg flex">
                  <div>
                    <div className="flex justify-between m-3">
                      <p>{subscription.name}</p>
                      <p>{subscription.amount}</p>
                    </div>
                    <div className="flex justify-between mt-5 m-3">
                      <p>{subscription.duration}</p>
                      <p>{subscription.renewalReminder}</p>
                    </div>
                    <p className="m-3">{subscription.taxId}</p>
                    <p className="m-3">{subscription.noOfOrder}</p>
                    <p className="m-3">{subscription.description}</p>
                    <div className="mb-5 flex">
                      <button
                        className="bg-blue-50 flex items-center rounded-3xl p-3 px-10 ml-3 mt-5"
                        onClick={() => showModalEditCustomer(subscription._id)}
                      >
                        <BiEdit className="text-[22px] mr-1" /> Edit
                      </button>
                      <EditSubCustomerModal
                        isVisible={isModalVisibleCustomerEdit}
                        handleCancel={handleCancel}
                        currentEditCustomer={currentEditCustomer}
                        token={token}
                        tax={tax}
                        BASE_URL={BASE_URL}
                      />
                      <button
                        className="bg-teal-800 flex items-center rounded-3xl p-3 text-white ml-3 px-8 mt-5"
                        onClick={() =>
                          showModalDeleteCustomer(subscription._id)
                        }
                      >
                        <RiDeleteBinLine className="text-[20px] mr-1" />
                        Delete
                      </button>
                      <DeleteSubCustomerModal
                        isVisible={deleteModalCustomer}
                        handleCancel={handleCancel}
                        handleConfirmDeleteCustomer={
                          handleConfirmDeleteCustomer
                        }
                        currentDeleteCustomer={currentDeleteCustomer}
                        token={token}
                        BASE_URL={BASE_URL}
                        removeCustomer={removeCustomer}
                      />
                    </div>
                  </div>
                  <div className="bg-white shadow ml-auto rounded-lg w-14 flex items-center justify-center">
                    <input
                      type="radio"
                      name="planId"
                      value={subscription._id}
                      checked={customer.planId === subscription._id}
                      className="size-5 bg-teal-800"
                      onChange={handleCustomer}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex mt-5 items-center">
            <label className="w-1/3 text-gray-800">Customer Id</label>
            <input
              type="text"
              name="userId"
              value={customer.userId}
              className="border-2 border-gray-100 rounded shadow-md p-2 w-1/3 focus:outline-none"
              onChange={handleCustomer}
            />
          </div>
          <div className="flex mt-5">
            <div className="w-1/3">
              <label className="flex items-center">Payment Mode</label>
            </div>
            <div className="w-2/3">
              <input
                type="radio"
                name="paymentMode"
                value="Online"
                className="mr-3"
                checked={customer.paymentMode === "Online"}
                onChange={handleCustomer}
              />
              Online
              <input
                type="radio"
                name="paymentMode"
                value="Cash"
                className="mr-3 ml-8"
                checked={customer.paymentMode === "Cash"}
                onChange={handleCustomer}
              />
              Cash
            </div>
          </div>
          <button
            className="bg-teal-800 w-1/3 p-2 text-white rounded-lg mt-5 ml-[33%]"
            onClick={submitCustomer}
          >
            Apply Subscription
          </button>
        </div>
      </div>
    </>
  );
};

export default SubscriptionComponent;
