import { useToast } from "@chakra-ui/react";
import { Modal } from "antd";
import axios from "axios";
import { useState } from "react";
import Select from "react-select";

const AddSubCustomerModal = ({
  isVisible,
  handleCancel,
  token,
  tax,
  BASE_URL,
}) => {
  const toast = useToast();
  const [customerData, setCustomerData] = useState({
    name: "",
    amount: "",
    duration: "",
    taxId: null,
    renewalReminder: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);

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

  const addSubPlanHandler = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const addResponse = await axios.post(
        `${BASE_URL}/admin/subscription/add-customer-subscription`,
        customerData,
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
          description: "Customer Subscription Created successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "There was an error occured" + err,
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
      title="Add Customer Subscription Plan"
      width="700px"
      centered
      open={isVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <form
        onSubmit={addSubPlanHandler}
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
            {/* <select
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              value={customerData.taxId}
              id="taxId"
              name="taxId"
              onChange={handleInputChange}
            >
              <option hidden defaultValue={"Select tax"}>
                Select tax
              </option>
              {tax.map((tax) => (
                <option value={tax.taxId} key={tax.taxId}>
                  {tax.taxName}
                </option>
              ))}
            </select> */}

            <Select
              options={taxOptions}
              value={taxOptions.find(
                (option) => option.value === customerData.taxId
              )}
              onChange={(option) =>
                setCustomerData({ ...customerData, taxId: option.value })
              }
              className="rounded w-2/3 focus:outline-none"
              placeholder="Select Tax"
              isSearchable={true}
              isMulti={false}
              styles={{
                control: (provided) => ({
                  ...provided,
                  paddingRight: "",
                }),
                dropdownIndicator: (provided) => ({
                  ...provided,
                  padding: "10px",
                }),
              }}
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
              {isLoading ? `Adding...` : `Add`}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddSubCustomerModal;
