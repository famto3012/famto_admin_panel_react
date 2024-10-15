import { PlusOutlined } from "@ant-design/icons";
import { Switch } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import AddSubMerchantModal from "./model/SubscriptionModels/AddSubMerchantModal";
import { UserContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import EditSubMerchantModal from "./model/SubscriptionModels/EditSubMerchantModal";
import DeleteSubMerchantModal from "./model/SubscriptionModels/DeleteSubMerchantModal";
import AddSubCustomerModal from "./model/SubscriptionModels/AddSubCustomerModal";
import EditSubCustomerModal from "./model/SubscriptionModels/EditSubCustomerModal";
import DeleteSubCustomerModal from "./model/SubscriptionModels/DeleteSubCustomerModal";
import { useToast } from "@chakra-ui/react";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const SubscriptionComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptionMerchant, setSubscriptionMerchant] = useState([]);
  const [subscriptionCustomer, setSubscriptionCustomer] = useState([]);
  const [tax, setTax] = useState([]);
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

  const navigate = useNavigate();
  const { token, role } = useContext(UserContext);
  const toast = useToast();

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
      return;
    }

    const getAllMerchantSubsriptions = async () => {
      try {
        const merchantResponse = await axios.get(
          `${BASE_URL}/admin/subscription/get-merchant-subscription`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (merchantResponse.status === 200) {
          setSubscriptionMerchant(merchantResponse.data.data);
        }
      } catch (err) {
        console.log(`Error in getting all merchant subscriptions: ${err}`);
      }
    };

    const getAllCustomerSubsriptions = async () => {
      try {
        const customerResponse = await axios.get(
          `${BASE_URL}/admin/subscription/get-customer-subscription`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (customerResponse.status === 200) {
          setSubscriptionCustomer(customerResponse.data.data);
          console.log("Customer subscriptions", customerResponse.data.data);
        }
      } catch (err) {
        console.log(`Error in getting all customer subscriptions: ${err}`);
      }
    };

    const getAllTax = async () => {
      try {
        const taxResponse = await axios.get(`${BASE_URL}/admin/taxes/all-tax`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });

        if (taxResponse.status === 200) {
          setTax(taxResponse.data.data);
        }
      } catch (err) {
        console.log(`Error in getting all tax: ${err}`);
      }
    };

    const fetchData = async () => {
      try {
        setIsLoading(true);

        if (role === "Admin") {
          getAllMerchantSubsriptions();
          getAllCustomerSubsriptions();
          getAllTax();
        } else if (role === "Merchant") {
          getAllMerchantSubsriptions();
        }
      } catch (err) {
        console.error(`Error in fetching initial data: ${err}`);
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

  const handleMerchant = (e) => {
    const { name, value } = e.target;
    setMerchant({ ...merchant, [name]: value });
  };

  const handleApplyCustomerSubscription = async (e) => {
    e.preventDefault();

    try {
      if (!customer.planId || !customer.userId || !customer.paymentMode) {
        toast({
          title: "Error",
          description: "Please select Plan ID and Customer ID and Payment mode",
          duration: 3000,
          status: "error",
          isClosable: true,
        });

        return;
      }

      setIsLoading(true);

      console.log(customer);

      const response = await axios.post(
        `${BASE_URL}/admin/subscription-payment/customer-subscription-payment`,
        customer,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201) {
        const { orderId, amount, currentPlan, paymentMode, userId } =
          response.data;

        if (paymentMode === "Online") {
          openRazorpayCheckout(
            orderId,
            amount,
            currentPlan,
            paymentMode,
            userId
          );
        }
      }
    } catch (err) {
      console.log(`Error in fetching data:${err}`);
    }
  };

  const handleApplyMerchantSubscription = async (e) => {
    e.preventDefault();

    try {
      if (role === "Admin") {
        if (!merchant.planId || !merchant.userId || !merchant.paymentMode) {
          toast({
            title: "Error",
            description:
              "Please select Plan ID and Merchant ID and Payment mode",
            duration: 3000,
            status: "error",
            isClosable: true,
          });

          return;
        }
      }

      setIsLoading(true);

      let initiateEndpoint =
        role === "Admin"
          ? `${BASE_URL}/admin/subscription-payment/merchant-subscription-payment`
          : `${BASE_URL}/admin/subscription-payment/merchant-subscription-payment-user`;

      const response = await axios.post(initiateEndpoint, merchant, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 201) {
        const { orderId, amount, currentPlan, paymentMode, userId } =
          response.data;

        if (paymentMode === "Online") {
          openRazorpayCheckout(
            orderId,
            amount,
            currentPlan,
            paymentMode,
            userId
          );
        } else if (paymentMode === "Cash") {
          toast({
            title: "Success",
            description: response.data.message,
            duration: 3000,
            status: "success",
            isClosable: true,
          });
        }
      }
    } catch (err) {
      console.log(`Error in fetching data:${err}`);
    }
  };

  const openRazorpayCheckout = (
    orderId,
    amount,
    currentPlan,
    paymentMode,
    userId
  ) => {
    const options = {
      key: import.meta.env.VITE_APP_RAZORPAY_KEY,
      amount: amount * 100,
      currency: "INR",
      name: "Famto",
      description: "Subscription Payment",
      order_id: orderId,
      handler: async function (response) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response;
        try {
          let verifyEndpoint = `${BASE_URL}/admin/subscription-payment/merchant-subscription-payment-verification`;

          const verifyResponse = await axios.post(
            verifyEndpoint,
            {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
              currentPlan,
              paymentMode,
              userId,
            },
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (verifyResponse.status === 200) {
            setCustomer({
              planId: "",
              userId: "",
              paymentMode: "",
            });
            setMerchant({
              planId: "",
              userId: "",
              paymentMode: "",
            });
            toast({
              title: "Success",
              description: "Payment verified successfully",
              duration: 3000,
              status: "success",
              isClosable: true,
            });
          }
        } catch (err) {
          toast({
            title: "Error",
            description: "Error in verifying payment",
            duration: 3000,
            status: "error",
            isClosable: true,
          });
          // setIsPaymentLoading(false);
        }
      },
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      theme: {
        color: "#00CED1",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
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

  const handleUpdateSubscription = (data) => {
    setSubscriptionCustomer((prev) =>
      prev.map((subscription) =>
        subscription._id === data._id
          ? {
              ...subscription,
              description: data.description,
              duration: data.duration,
              name: data.name,
              noOfOrder: data.noOfOrder,
              renewalReminder: data.renewalReminder,
              taxId: data?.taxId || null,
              title: data?.title,
            }
          : subscription
      )
    );
  };

  return (
    <>
      <div
        className={`pl-[300px] bg-gray-100 ${
          role === "Admin" ? "" : "h-[78%]"
        }`}
      >
        <h1 className="my-5 p-5 bg-white font-semibold text-[18px]">
          Merchant
        </h1>
        {role === "Admin" && (
          <div className="bg-white mx-5 p-5 rounded-lg my-5">
            <div className="flex items-center ">
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
        )}

        <div className="bg-white mx-5 p-5 pb-10 rounded-lg mt-5">
          <div className="flex justify-between items-center">
            <h1>Apply Subscription</h1>
            <Link
              className="bg-teal-800 p-3 rounded-xl text-white w-[175px] text-center"
              to="http://famto.in/subscriptions"
            >
              Website preview
            </Link>
          </div>

          <div className="flex mt-10">
            <label className="w-1/3">Available Subscription Plans</label>
            <div className="w-fit grid xl:grid-cols-2 grid-cols-1 gap-5">
              {subscriptionMerchant.map((subscription) => (
                <div className="bg-zinc-50 rounded-lg flex border p-3 ">
                  <div className="flex flex-col gap-5 max-w-[300px]">
                    <div className="flex flex-col flex-1 gap-5">
                      <p>
                        Plan name:
                        <span className="font-[700] ms-2 max-w-[20ch] truncate whitespace-nowrap overflow-hidden">
                          {subscription.name}
                        </span>
                      </p>
                      <p>
                        Amount:
                        <span className="font-[700] ml-1">
                          {subscription.amount}
                        </span>
                      </p>

                      <p>
                        Duration:{" "}
                        <span className="font-[700]">
                          {subscription.duration}
                        </span>
                      </p>

                      {role === "Admin" && (
                        <>
                          <p>
                            Remainder:{" "}
                            <span className="font-[700]">
                              {subscription.renewalReminder}
                            </span>
                          </p>
                          <p>
                            Tax name:{" "}
                            <span className="font-[700]">
                              {subscription?.taxId?.taxName || "-"}
                            </span>
                          </p>
                        </>
                      )}

                      <p className="">{subscription.description}</p>
                    </div>

                    {role === "Admin" && (
                      <div className="flex mb-4">
                        <button
                          className="bg-blue-50 flex items-center rounded-3xl p-3 px-10 ml-3 mt-5"
                          onClick={() =>
                            showModalEditMerchant(subscription._id)
                          }
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
                          className="bg-teal-800 flex items-center rounded-3xl p-3 text-white ml-3 px-8 mt-5"
                          onClick={() =>
                            showModalDeleteMerchant(subscription._id)
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
                    )}
                  </div>
                  <div className=" ml-auto rounded-lg w-14 flex items-center justify-center">
                    <input
                      type="radio"
                      name="planId"
                      value={subscription._id}
                      checked={merchant.planId === subscription._id}
                      className="size-5 bg-teal-800"
                      onChange={handleMerchant}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {role === "Admin" && (
            <div className="flex mt-5 items-center">
              <label className="w-1/3 text-gray-800">Merchant Id</label>
              <input
                type="text"
                name="userId"
                value={merchant.userId}
                placeholder="Enter merchant ID"
                className="border-2 border-gray-200 rounded p-2 w-1/3 focus:outline-none"
                onChange={handleMerchant}
              />
            </div>
          )}

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
            onClick={handleApplyMerchantSubscription}
          >
            Apply Subscription
          </button>
        </div>
      </div>

      {role === "Admin" && (
        <div className="pl-[300px] bg-gray-100 ">
          <h1 className=" px-5 pt-5 pb-5 bg-white font-semibold text-[18px]">
            Customers
          </h1>
          <div className="p-5 rounded-lg">
            <div className="flex flex-row item-center bg-white p-5 rounded-md">
              <label className="w-1/3 flex items-center">
                Customer Subscription Setup
              </label>
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

          <div className="bg-white mx-5 p-5 pb-10 rounded-lg">
            <h1>Apply Subscription</h1>
            <div className="flex mt-10">
              <label className="w-1/3">Available Subscription Plans</label>
              <div className="w-fit grid xl:grid-cols-2 grid-cols-1 gap-5">
                {subscriptionCustomer.map((subscription) => (
                  <div className="bg-zinc-50 rounded-lg flex border p-3">
                    <div className="flex flex-col gap-5 max-w-[300px]">
                      <div className="flex flex-col flex-1 gap-5">
                        <p>
                          Plan name:
                          <span className="font-[700] ms-2">
                            {subscription.name}
                          </span>
                        </p>
                        <p>
                          Amount:
                          <span className="font-[700] ml-1">
                            {subscription.amount}
                          </span>
                        </p>

                        <p>
                          Duration:{" "}
                          <span className="font-[700]">
                            {subscription.duration}
                          </span>
                        </p>
                        <p>
                          Remainder:{" "}
                          <span className="font-[700]">
                            {subscription.renewalReminder}
                          </span>
                        </p>

                        <p className="">
                          Tax name:{" "}
                          <span className="font-[700]">
                            {subscription?.taxId?.taxName || "-"}
                          </span>
                        </p>

                        <p className="">
                          No of Orders:{" "}
                          <span className="font-[700]">
                            {subscription.noOfOrder}
                          </span>
                        </p>

                        <p className="">{subscription.description}</p>
                      </div>

                      <div className="flex mb-4">
                        <button
                          className="bg-blue-50 flex items-center rounded-3xl p-3 px-10 ml-3 mt-5"
                          onClick={() =>
                            showModalEditCustomer(subscription._id)
                          }
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
                          onEditSubscription={handleUpdateSubscription}
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
                    <div className=" ml-auto rounded-lg w-14 flex items-center justify-center">
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
                placeholder="Enter customer ID"
                className="border-2 border-gray-200 rounded p-2 w-1/3 focus:outline-none"
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
              </div>
            </div>

            <button
              className="bg-teal-800 w-1/3 p-2 text-white rounded-lg mt-5 ml-[33%]"
              onClick={handleApplyCustomerSubscription}
            >
              Apply Subscription
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SubscriptionComponent;
