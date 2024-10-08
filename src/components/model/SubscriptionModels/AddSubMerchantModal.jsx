import { useState } from "react";
import axios from "axios";
import Select from "react-select";

import { useToast } from "@chakra-ui/react";
import { Modal } from "antd";

const AddSubMerchantModal = ({
  isVisible,
  handleCancel,
  token,
  tax,
  BASE_URL,
}) => {
  const [merchantData, setMerchantData] = useState({
    name: "",
    amount: "",
    duration: "",
    taxId: "",
    renewalReminder: "",
    description: "",
  });

  const toast = useToast();

  const handleInputChange = (e) => {
    setMerchantData({ ...merchantData, [e.target.name]: e.target.value });
  };

  const handleTaxChange = (selectedOption) => {
    setMerchantData((prevData) => ({
      ...prevData,
      taxId: selectedOption ? selectedOption.value : "",
    }));
  };

  const taxOptions = tax.map((tax) => ({
    label: tax.taxName,
    value: tax.taxId,
  }));

  const signupAction = async (e) => {
    try {
      e.preventDefault();

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
        toast({
          title: "Success",
          description: "Agent Pricng Created successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "There was an error occured",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
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
              Plan name <span className="text-red-600">*</span>
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
              Amount <span className="text-red-600">*</span>
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
              Duration (In Days) <span className="text-red-600">*</span>
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
              Tax Id <span className="text-red-600">*</span>
            </label>

            <Select
              className="rounded w-2/3 focus:outline-none"
              value={
                taxOptions.find(
                  (option) => option.value === merchantData.taxId
                ) || null
              } // Ensure null when no option matches
              isSearchable={true}
              onChange={handleTaxChange}
              options={taxOptions}
              placeholder="Select Tax"
              isClearable={true} // Allow clearing the selection
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="renewalReminder">
              Renewal Reminder (In days) <span className="text-red-600">*</span>
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
              Description <span className="text-red-600">*</span>
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
