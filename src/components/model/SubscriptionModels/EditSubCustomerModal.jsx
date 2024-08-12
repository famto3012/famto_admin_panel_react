import { useToast } from "@chakra-ui/react";
import { Modal } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditSubCustomerModal = ({
  isVisible,
  handleCancel,
  token,
  BASE_URL,
  tax,
  currentEditCustomer,
}) => {
  const toast = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [customerData, setCustomerData] = useState({
    name: "",
    amount: "",
    duration: "",
    taxId: "",
    noOfOrder: "",
    renewalReminder: "",
    description: "",
  });
  useEffect(() => {
    console.log(currentEditCustomer);
    if (!token) {
      navigate("/auth/login");
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
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
          console.log("data in response is", addResponse.data.data);
          setCustomerData(addResponse.data.data);
          console.log(addResponse.data.message);
        }
      } catch (err) {
        console.error(`Error in fetching data: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    if (currentEditCustomer) {
      fetchData();
    }
  }, [token, navigate, currentEditCustomer, BASE_URL]);

  const handleInputChange = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };
  const signupAction = async (e) => {
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
        toast({
          title: "Success",
          description: "Customer Subscription Updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        console.log("edited data", customerData);
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "There was an error occured.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.log(`Error in fetching data:${err}`);
    }
    console.log("Customerdata", customerData);
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
      <form onSubmit={signupAction} className="max-h-[30rem] overflow-auto">
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
              value={customerData.amount}
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
              value={customerData.duration}
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
              value={customerData.taxId}
              id="taxId"
              name="taxId"
              onChange={handleInputChange}
            >
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
              value={customerData.renewalReminder}
              id="renewalReminder"
              name="renewalReminder"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="noOfOrder">
              No of Orders
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
              Description
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

export default EditSubCustomerModal;
