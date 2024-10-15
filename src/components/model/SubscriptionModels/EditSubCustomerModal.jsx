import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

import { useToast } from "@chakra-ui/react";
import { Modal } from "antd";

const EditSubCustomerModal = ({
  isVisible,
  handleCancel,
  token,
  BASE_URL,
  tax,
  currentEditCustomer,
  onEditSubscription,
}) => {
  const [customerData, setCustomerData] = useState({
    name: "",
    amount: "",
    duration: "",
    taxId: null,
    noOfOrder: "",
    renewalReminder: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [addResponse] = await Promise.all([
          axios.get(
            `${BASE_URL}/admin/subscription/get-customer-subscription/${currentEditCustomer}`,
            {
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
        ]);

        if (addResponse.status === 200) {
          setCustomerData(addResponse.data.data);
        }
      } catch (err) {
        toast({
          title: "Error",
          description: "Error in getting customer subscription",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    if (currentEditCustomer) {
      fetchData();
    }
  }, [token, currentEditCustomer]);

  const handleInputChange = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  const taxOptions = [
    { label: "No Tax", value: null },
    ...tax.map((tax) => ({
      label: tax.taxName,
      value: tax.taxId,
    })),
  ];

  const handleTaxChange = (selectedOption) => {
    setCustomerData((prevData) => ({
      ...prevData,
      taxId: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleEditSubscription = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const updateResponse = await axios.put(
        `${BASE_URL}/admin/subscription/edit-customer-subscription/${currentEditCustomer}`,
        customerData,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (updateResponse.status === 200) {
        handleCancel();
        onEditSubscription(updateResponse.data.data);
        toast({
          title: "Success",
          description: "Customer Subscription Updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Error in updating subscription plan" + err,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal
      title="Edit Customer Subscription Plan"
      width="700px"
      centered
      open={isVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <form
        onSubmit={handleEditSubscription}
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
              value={customerData.name}
              id="name"
              name="name"
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="amount">
              Plan amount <span className="text-red-600">*</span>
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              value={customerData.amount}
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
              value={customerData.duration}
              id="duration"
              name="duration"
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="taxId">
              Tax name
            </label>

            <Select
              className="rounded w-2/3 focus:outline-none"
              value={
                taxOptions.find(
                  (option) => option.value === customerData.taxId
                ) || null
              }
              isSearchable={true}
              onChange={handleTaxChange}
              options={taxOptions}
              placeholder="Select Tax"
              isClearable={true}
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="renewalReminder">
              Renewal Reminder (In days) <span className="text-red-600">*</span>
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              value={customerData.renewalReminder}
              id="renewalReminder"
              name="renewalReminder"
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="noOfOrder">
              No of Orders <span className="text-red-600">*</span>
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              value={customerData.noOfOrder}
              id="noOfOrder"
              name="noOfOrder"
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
              value={customerData.description}
              id="description"
              name="description"
              onChange={handleInputChange}
            />
          </div>

          <div className="flex justify-end mt-5 gap-4">
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
              {isLoading ? `Saving...` : `Save`}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditSubCustomerModal;
