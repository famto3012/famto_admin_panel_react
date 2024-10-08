import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import { useToast } from "@chakra-ui/react";
import { Modal } from "antd";

const EditSubMerchantModal = ({
  isVisible,
  handleCancel,
  token,
  BASE_URL,
  tax,
  currentEditMerchant,
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
  const navigate = useNavigate();

  useEffect(() => {
    console.log(tax);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/admin/subscription/get-merchant-subscription/${currentEditMerchant}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          setMerchantData(response.data.data);
        }
      } catch (err) {
        toast({
          title: "Error",
          description: "Error in getting merchant subscriptions",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    if (currentEditMerchant) {
      fetchData();
    }
  }, [token, navigate, currentEditMerchant]);

  const taxOptions = tax.map((tax) => ({
    label: tax.taxName,
    value: tax.taxId,
  }));

  const handleInputChange = (e) => {
    setMerchantData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTaxChange = (selectedOption) => {
    setMerchantData((prevData) => ({
      ...prevData,
      taxId: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleAddSubscription = async (e) => {
    e.preventDefault();

    try {
      const updateResponse = await axios.put(
        `${BASE_URL}/admin/subscription/edit-merchant-subscription/${currentEditMerchant}`,
        merchantData,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (updateResponse.status === 200) {
        handleCancel();
        toast({
          title: "Success",
          description: "Merchant Subscription Updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Error while updating merchant subscription",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal
      title="Edit Merchant Subscription Plan"
      width="700px"
      centered
      open={isVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <form
        onSubmit={handleAddSubscription}
        className="max-h-[30rem] overflow-auto"
      >
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

          <div className="flex justify-end mt-10 gap-4">
            <button
              className="bg-gray-300 rounded-lg px-6 py-2 font-semibold"
              onClick={handleCancel}
              type="button" // Change type to button for cancel button
            >
              Cancel
            </button>
            <button
              className="bg-teal-800 rounded-lg px-6 py-2 text-white font-semibold"
              type="submit"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditSubMerchantModal;
