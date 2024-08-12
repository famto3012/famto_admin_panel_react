import { useToast } from "@chakra-ui/react";
import { Modal } from "antd";
import axios from "axios";
import React, { useState } from "react";

const AddSubMerchantModal = ({
  isVisible,
  handleCancel,
  token,
  tax,
  BASE_URL,
}) => {
  const toast = useToast();
  const [merchantData, setMerchantData] = useState({
    name: "",
    amount: "",
    duration: "",
    taxId: "",
    renewalReminder: "",
    description: "",
  });
  const handleInputChange = (e) => {
    setMerchantData({ ...merchantData, [e.target.name]: e.target.value });
  };
  const signupAction = async (e) => {
    e.preventDefault();
    try {
      const addResponse = await axios.post(
        `${BASE_URL}/admin/subscription/add-merchant-subscription`,
        merchantData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (addResponse.status === 201) {
        handleCancel();
        console.log("adddata", addResponse.data.message);
        toast({
          title: "Success",
          description: "Agent Pricng Created successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(`Error in fetching data: ${err}`);
      toast({
        title: "Error",
        description: "There was an error occured",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    console.log("Merchant Data: ", merchantData);
  };

  return (
    <Modal
      title="Add Merchant Subscription Plan"
      width="700px"
      centered
      open={isVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <form onSubmit={signupAction} className="max-h-[30rem] overflow-auto">
        <div className="flex flex-col gap-4 mt-5">
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="Name">
              Name
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              value={merchantData.name}
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
              value={merchantData.amount}
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
              value={merchantData.duration}
              id="duration"
              name="duration"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="taxId">
              Tax Id
            </label>
            <select
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              value={merchantData.taxId}
              id="taxId"
              name="taxId"
              onChange={handleInputChange}
            >
              <option hidden defaultValue="Select tax">
                Select tax
              </option>
              {tax.map((tax) => (
                <option value={tax._id} key={tax._id}>
                  {tax.taxName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="renewalReminder">
              Renewal Reminder (In days)
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              value={merchantData.renewalReminder}
              id="renewalReminder"
              name="renewalReminder"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="description">
              Description
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              value={merchantData.description}
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
              type="submit"
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddSubMerchantModal;
