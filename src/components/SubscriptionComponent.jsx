import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Switch, Modal } from "antd";
import React, { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";

const SubscriptionComponent = () => {
  const [addData, setAddData] = useState({
    name: "",
    amount: "",
    duration: "",
    taxId: "",
    reminder: "",
    description: "",
  });

  const [customerData, setCustomerData] = useState({
    name: "",
    amount: "",
    duration: "",
    taxId: "",
    reminder: "",
    description: "",
  });

  const [merchant, setMerchant] = useState({
    plan: "",
    id: "",
    mode: "",
  });

  const [customer, setCustomer] = useState({
    plan: "",
    id: "",
    mode: "",
  });

  const handleCustomer = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const submitCustomer = (e) => {
    e.preventDefault();

    console.log("Cusotmer", customer);
  };

  const handleMerchant = (e) => {
    setMerchant({ ...merchant, [e.target.name]: e.target.value });
  };

  const submitMerchant = (e) => {
    e.preventDefault();

    console.log("Merchant", merchant);
  };

  const subscription = [
    {
      name: "monthly",
      amount: "310/-",
      duration: "3",
      reminder: "7",
      tax: "1",
      description: "subscription",
    },
    {
      name: "Quaterly",
      amount: "710/-",
      duration: "3",
      reminder: "7",
      tax: "1",
      description: "subscription",
    },
    {
      name: "Yearly",
      amount: "3010/-",
      duration: "3",
      reminder: "7",
      tax: "1",
      description: "subscription",
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);

  const showModalEdit = () => {
    setIsModalVisibleEdit(true);
  };

  const handleOkEdit = () => {
    setIsModalVisibleEdit(false);
  };

  const handleCancelEdit = () => {
    setIsModalVisibleEdit(false);
  };

  const [isModalVisibleCustomer, setIsModalVisibleCustomer] = useState(false);

  const showModalCustomer = () => {
    setIsModalVisibleCustomer(true);
  };

  const handleOkCustomer = () => {
    setIsModalVisibleCustomer(false);
  };

  const handleCancelCustomer = () => {
    setIsModalVisibleCustomer(false);
  };

  const [isModalVisibleCustomerEdit, setIsModalVisibleCustomerEdit] =
    useState(false);

  const showModalCustomerEdit = () => {
    setIsModalVisibleCustomerEdit(true);
  };

  const handleOkCustomerEdit = () => {
    setIsModalVisibleCustomerEdit(false);
  };

  const handleCancelCustomerEdit = () => {
    setIsModalVisibleCustomerEdit(false);
  };

  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  const showModalDelete = () => {
    setIsShowModalDelete(true);
  };

  const showModalDeleteOk = () => {
    setIsShowModalDelete(false);
  };

  const showModalDeleteCancel = () => {
    setIsShowModalDelete(false);
  };

  const [isShowModalDeleteCustomer, setIsShowModalDeleteCustomer] =
    useState(false);

  const showModalDeleteCustomer = () => {
    setIsShowModalDeleteCustomer(true);
  };

  const showModalDeleteOkCustomer = () => {
    setIsShowModalDeleteCustomer(false);
  };

  const showModalDeleteCancelCustomer = () => {
    setIsShowModalDeleteCustomer(false);
  };

  const handleInputChange = (e) => {
    setAddData({ ...addData, [e.target.name]: e.target.value });
  };
  const signupAction = (e) => {
    e.preventDefault();

    console.log("Merchant Data: ", addData);
  };

  const handleInputCustomer = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  const signupActionCustomer = (e) => {
    e.preventDefault();

    console.log("Cusotmer Data: ", customerData);
  };

  return (
    <>
      <div className="pl-[300px] bg-gray-100">
        <h1 className="mt-10 px-5 pt-5 pb-2 bg-red-100 font-semibold text-[18px]">Merchant</h1>
        <div className="bg-white mx-5 p-5 rounded-lg mt-5">
          <div className="flex w-2/3 justify-between mt-5">
            <p>
              Enable this toggle to transfer Subscription on the basis of
              delivery methods.
            </p>
            <Switch />
          </div>
          <div className="flex w-2/3 justify-between mt-10">
            <p>Merchant Subscription Setup</p>
            <button className="bg-zinc-200 p-2 rounded-lg" onClick={showModal}>
              Add New Merchant Subscription Plan{" "}
              <PlusOutlined className="ml-10" />
            </button>
            <Modal
              title="Edit Merchant Subscription Plan"
              width="700px"
              centered
              open={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null}
            >
              <form
                onSubmit={signupAction}
                className="max-h-[30rem] overflow-auto"
              >
                <div className="flex flex-col gap-4 mt-5">
                  <div className="flex items-center">
                    <label className="w-1/3 text-gray-500" htmlFor="Name">
                      Name
                    </label>
                    <input
                      className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                      type="text"
                      value={addData.name}
                      id="name"
                      name="name"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-gray-500" htmlFor="amount">
                      Amount
                    </label>
                    <input
                      className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                      type="text"
                      value={addData.amount}
                      id="amount"
                      name="amount"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-gray-500" htmlFor="duration">
                      Duration (In Days)
                    </label>
                    <input
                      className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                      type="text"
                      value={addData.duration}
                      id="duration"
                      name="duration"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-gray-500" htmlFor="taxId">
                      Tax Id
                    </label>
                    <input
                      className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                      type="text"
                      value={addData.taxId}
                      id="taxId"
                      name="taxId"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-gray-500" htmlFor="reminder">
                      Renewal Reminder (In days)
                    </label>
                    <input
                      className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                      type="text"
                      value={addData.reminder}
                      id="reminder"
                      name="reminder"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="description"
                    >
                      Description
                    </label>
                    <input
                      className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                      type="text"
                      value={addData.description}
                      id="description"
                      name="description"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex justify-end mt-10  gap-4">
                    <button
                      className="bg-gray-300 rounded-lg px-6 py-2 font-semibold justify-end"
                      onClick={handleCancel}
                      type="submit"
                    >
                      {" "}
                      Cancel
                    </button>
                    <button
                      className="bg-teal-800 rounded-lg px-6 py-2 text-white font-semibold justify-end"
                      onClick={handleOk}
                      type="submit"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </form>
            </Modal>
          </div>
        </div>

        <div className="bg-white mx-5 p-5 rounded-lg mt-5">
          <h1>Apply Subscription</h1>
          <div className="flex mt-10">
            <label className="w-1/3">Added Subscription Plans</label>
            <div className="w-2/3 grid grid-cols-2 gap-5">
              {subscription.map((subscriptions) => (
                <div className="bg-zinc-50 shadow rounded-lg flex">
                  <div>
                    <div className="flex justify-between m-3">
                      <p>Name:{subscriptions.name}</p>
                      <p>{subscriptions.amount}</p>
                    </div>
                    <div className="flex justify-between mt-5 m-3">
                      <p>{subscriptions.duration}</p>
                      <p> {subscriptions.reminder}</p>
                    </div>
                    <p className="m-3">{subscriptions.tax}</p>
                    <p className="m-3">{subscriptions.description}</p>
                    <div className="mb-5 flex">
                      <button
                        className="bg-blue-50 flex items-center rounded-3xl p-3 px-10 ml-3 mt-5"
                        onClick={showModalEdit}
                      >
                        <BiEdit className="text-[22px] mr-1" /> Edit
                      </button>
                      <Modal
                        title="Edit Merchant Subscription Plan"
                        width="700px"
                        centered
                        open={isModalVisibleEdit}
                        onOk={handleOkEdit}
                        onCancel={handleCancelEdit}
                        footer={null}
                      >
                        <form
                          onSubmit={signupAction}
                          className="max-h-[30rem] overflow-auto"
                        >
                          <div className="flex flex-col gap-4 mt-5">
                            <div className="flex items-center">
                              <label
                                className="w-1/3 text-gray-500"
                                htmlFor="Name"
                              >
                                Name
                              </label>
                              <input
                                className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                                type="text"
                                value={addData.name}
                                id="name"
                                name="name"
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="flex items-center">
                              <label
                                className="w-1/3 text-gray-500"
                                htmlFor="amount"
                              >
                                Amount
                              </label>
                              <input
                                className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                                type="text"
                                value={addData.amount}
                                id="amount"
                                name="amount"
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="flex items-center">
                              <label
                                className="w-1/3 text-gray-500"
                                htmlFor="duration"
                              >
                                Duration (In Days)
                              </label>
                              <input
                                className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                                type="text"
                                value={addData.duration}
                                id="duration"
                                name="duration"
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="flex items-center">
                              <label
                                className="w-1/3 text-gray-500"
                                htmlFor="taxId"
                              >
                                Tax Id
                              </label>
                              <input
                                className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                                type="text"
                                value={addData.taxId}
                                id="taxId"
                                name="taxId"
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="flex items-center">
                              <label
                                className="w-1/3 text-gray-500"
                                htmlFor="reminder"
                              >
                                Renewal Reminder (In days)
                              </label>
                              <input
                                className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                                type="text"
                                value={addData.reminder}
                                id="reminder"
                                name="reminder"
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="flex items-center">
                              <label
                                className="w-1/3 text-gray-500"
                                htmlFor="description"
                              >
                                Description
                              </label>
                              <input
                                className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                                type="text"
                                value={addData.description}
                                id="description"
                                name="description"
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="flex justify-end mt-10  gap-4">
                              <button
                                className="bg-gray-300 rounded-lg px-6 py-2 font-semibold justify-end"
                                onClick={handleCancelEdit}
                                type="submit"
                              >
                                {" "}
                                Cancel
                              </button>
                              <button
                                className="bg-teal-800 rounded-lg px-6 py-2 text-white font-semibold justify-end"
                                onClick={handleOkEdit}
                                type="submit"
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        </form>
                      </Modal>

                      <button
                        className="bg-teal-800 flex  rounded-3xl p-3 items-center text-white ml-3 px-8 mt-5"
                        onClick={showModalDelete}
                      >
                        <RiDeleteBinLine className="text-[20px] mr-1" />
                        Delete
                      </button>
                      <Modal
                        onOk={showModalDeleteOk}
                        onCancel={showModalDeleteCancel}
                        footer={null}
                        open={isShowModalDelete}
                        centered
                      >
                        <form>
                          <p className="font-bold text-[20px] mb-5">
                            Are you sure want to delete?
                          </p>
                          <div className="flex justify-end">
                            <button
                              className="bg-cyan-100 p-2 rounded-md font-semibold"
                              onClick={showModalDeleteCancel}
                            >
                              Cancel
                            </button>
                            <button className="bg-red-100 p-2 rounded-md ml-3 px-2 text-red-700">
                              {" "}
                              Delete
                            </button>
                          </div>
                        </form>
                      </Modal>
                    </div>
                  </div>
                  <div className="bg-white  shadow ml-auto rounded-lg w-14 flex items-center justify-center">
                    <input
                      type="radio"
                      name="plan"
                      value={subscriptions.name}
                      checked={merchant.plan === subscriptions.name}
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
              name="id"
              value={merchant.id}
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
                name="mode"
                value="Online"
                className="mr-3"
                checked={merchant.mode === "Online"}
                onChange={handleMerchant}
              />
              Online
              <input
                type="radio"
                name="mode"
                value="Cash"
                className="mr-3 ml-8"
                checked={merchant.mode === "Cash"}
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
      <h1 className="mt-10 px-5 pt-5 pb-2 bg-red-100 font-semibold text-[18px]">Customer</h1>
        <div className=" mx-5 p-5 rounded-lg mt-5">
          <div className="flex w-2/3 justify-between mt-5">
            <p>
              Enable this toggle to transfer Subscription on the basis of
              delivery methods.
            </p>
            <Switch />
          </div>
          <div className="flex w-2/3 justify-between mt-10">
            <p>Customerr Subscription Setup</p>
            <button
              className="bg-zinc-200 p-2 rounded-lg"
              onClick={showModalCustomer}
            >
              Add New Customer Subscription Plan{" "}
              <PlusOutlined className="ml-10" />
            </button>
            <Modal
              title="Add Customer Subscription Plan"
              width="700px"
              centered
              open={isModalVisibleCustomer}
              onOk={handleOkCustomer}
              onCancel={handleCancelCustomer}
              footer={null}
            >
              <form
                onSubmit={signupActionCustomer}
                className="max-h-[30rem] overflow-auto"
              >
                <div className="flex flex-col gap-4 mt-5">
                  <div className="flex items-center">
                    <label className="w-1/3 text-gray-500" htmlFor="Name">
                      Name
                    </label>
                    <input
                      className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                      type="text"
                      value={customerData.name}
                      id="name"
                      name="name"
                      onChange={handleInputCustomer}
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-gray-500" htmlFor="amount">
                      Amount
                    </label>
                    <input
                      className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                      type="text"
                      value={customerData.amount}
                      id="amount"
                      name="amount"
                      onChange={handleInputCustomer}
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-gray-500" htmlFor="duration">
                      Duration (In Days)
                    </label>
                    <input
                      className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                      type="text"
                      value={customerData.duration}
                      id="duration"
                      name="duration"
                      onChange={handleInputCustomer}
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-gray-500" htmlFor="taxId">
                      Tax Id
                    </label>
                    <input
                      className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                      type="text"
                      value={customerData.taxId}
                      id="taxId"
                      name="taxId"
                      onChange={handleInputCustomer}
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-gray-500" htmlFor="reminder">
                      Renewal Reminder (In days)
                    </label>
                    <input
                      className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                      type="text"
                      value={customerData.reminder}
                      id="reminder"
                      name="reminder"
                      onChange={handleInputCustomer}
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="description"
                    >
                      Description
                    </label>
                    <input
                      className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                      type="text"
                      value={customerData.description}
                      id="description"
                      name="description"
                      onChange={handleInputCustomer}
                    />
                  </div>
                  <div className="flex justify-end mt-10  gap-4">
                    <button
                      className="bg-gray-300 rounded-lg px-6 py-2 font-semibold justify-end"
                      onClick={handleCancelCustomer}
                      type="submit"
                    >
                      {" "}
                      Cancel
                    </button>
                    <button
                      className="bg-teal-800 rounded-lg px-6 py-2 text-white font-semibold justify-end"
                      onClick={handleOkCustomer}
                      type="submit"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </form>
            </Modal>
          </div>
        </div>

        <div className="bg-white mx-5 p-5 pb-10 rounded-lg mt-5">
          <h1>Apply Subscription</h1>
          <div className="flex mt-10">
            <label className="w-1/3">Added Subscription Plans</label>
            <div className="w-2/3  grid grid-cols-2 gap-5">
              {subscription.map((subscriptions) => (
                <div className="bg-zinc-50 shadow-md rounded-lg flex">
                  <div>
                    <div className="flex justify-between m-3">
                      <p>Name:{subscriptions.name}</p>
                      <p>{subscriptions.amount}</p>
                    </div>
                    <div className="flex justify-between mt-5 m-3">
                      <p>{subscriptions.duration}</p>
                      <p> {subscriptions.reminder}</p>
                    </div>
                    <p className="m-3">{subscriptions.tax}</p>
                    <p className="m-3">{subscriptions.description}</p>
                    <div className="mb-5 flex">
                      <button
                        className="bg-blue-50 flex items-center rounded-3xl p-3 px-10 ml-3 mt-5"
                        onClick={showModalCustomerEdit}
                      >
                        <BiEdit className="text-[22px] mr-1" /> Edit
                      </button>
                      <Modal
                        title="Edit Customer Subscription Plan"
                        width="700px"
                        centered
                        open={isModalVisibleCustomerEdit}
                        onOk={handleOkCustomerEdit}
                        onCancel={handleCancelCustomerEdit}
                        footer={null}
                      >
                        <form
                          onSubmit={signupActionCustomer}
                          className="max-h-[30rem] overflow-auto"
                        >
                          <div className="flex flex-col gap-4 mt-5">
                            <div className="flex items-center">
                              <label
                                className="w-1/3 text-gray-500"
                                htmlFor="Name"
                              >
                                Name
                              </label>
                              <input
                                className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                                type="text"
                                value={customerData.name}
                                id="name"
                                name="name"
                                onChange={handleInputCustomer}
                              />
                            </div>
                            <div className="flex items-center">
                              <label
                                className="w-1/3 text-gray-500"
                                htmlFor="amount"
                              >
                                Amount
                              </label>
                              <input
                                className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                                type="text"
                                value={customerData.amount}
                                id="amount"
                                name="amount"
                                onChange={handleInputCustomer}
                              />
                            </div>
                            <div className="flex items-center">
                              <label
                                className="w-1/3 text-gray-500"
                                htmlFor="duration"
                              >
                                Duration (In Days)
                              </label>
                              <input
                                className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                                type="text"
                                value={customerData.duration}
                                id="duration"
                                name="duration"
                                onChange={handleInputCustomer}
                              />
                            </div>
                            <div className="flex items-center">
                              <label
                                className="w-1/3 text-gray-500"
                                htmlFor="taxId"
                              >
                                Tax Id
                              </label>
                              <input
                                className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                                type="text"
                                value={customerData.taxId}
                                id="taxId"
                                name="taxId"
                                onChange={handleInputCustomer}
                              />
                            </div>
                            <div className="flex items-center">
                              <label
                                className="w-1/3 text-gray-500"
                                htmlFor="reminder"
                              >
                                Renewal Reminder (In days)
                              </label>
                              <input
                                className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                                type="text"
                                value={customerData.reminder}
                                id="reminder"
                                name="reminder"
                                onChange={handleInputCustomer}
                              />
                            </div>
                            <div className="flex items-center">
                              <label
                                className="w-1/3 text-gray-500"
                                htmlFor="description"
                              >
                                Description
                              </label>
                              <input
                                className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                                type="text"
                                value={customerData.description}
                                id="description"
                                name="description"
                                onChange={handleInputCustomer}
                              />
                            </div>
                            <div className="flex justify-end mt-10  gap-4">
                              <button
                                className="bg-gray-300 rounded-lg px-6 py-2 font-semibold justify-end"
                                onClick={handleCancelCustomerEdit}
                                type="submit"
                              >
                                {" "}
                                Cancel
                              </button>
                              <button
                                className="bg-teal-800 rounded-lg px-6 py-2 text-white font-semibold justify-end"
                                onClick={handleOkCustomerEdit}
                                type="submit"
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        </form>
                      </Modal>
                      <button
                        className="bg-teal-800 flex items-center rounded-3xl p-3 text-white ml-3 px-8 mt-5"
                        onClick={showModalDeleteCustomer}
                      >
                        <RiDeleteBinLine className="text-[20px] mr-1" />
                        Delete
                      </button>
                      <Modal
                        onOk={showModalDeleteOkCustomer}
                        onCancel={showModalDeleteCancelCustomer}
                        footer={null}
                        open={isShowModalDeleteCustomer}
                        centered
                      >
                        <form>
                          <p className="font-bold text-[20px] mb-5">
                            Are you sure want to delete?
                          </p>
                          <div className="flex justify-end">
                            <button
                              className="bg-cyan-100 p-2 rounded-md font-semibold"
                              onClick={showModalDeleteCancelCustomer}
                            >
                              Cancel
                            </button>
                            <button className="bg-red-100 p-2 rounded-md ml-3 px-2 text-red-700">
                              {" "}
                              Delete
                            </button>
                          </div>
                        </form>
                      </Modal>
                    </div>
                  </div>
                  <div className="bg-white  shadow ml-auto rounded-lg w-14 flex items-center justify-center">
                    <input
                      type="radio"
                      name="plan"
                      value={subscriptions.name}
                      checked={customer.plan === subscriptions.name}
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
              name="id"
              value={customer.id}
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
                name="mode"
                value="Online"
                className="mr-3"
                checked={customer.mode === "Online"}
                onChange={handleCustomer}
              />
              Online
              <input
                type="radio"
                name="mode"
                value="Cash"
                className="mr-3 ml-8"
                checked={customer.mode === "Cash"}
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
