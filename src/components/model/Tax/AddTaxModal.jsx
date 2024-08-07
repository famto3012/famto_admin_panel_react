import { useState } from "react";
import { Modal } from "antd";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const AddTaxModal = ({
  isVisible,
  handleCancel,
  token,
  BASE_URL,
  allGeofence,
  allBusinessCategory,
  onAddTax,
}) => {
  const [taxData, setTaxData] = useState({
    taxName: "",
    tax: "",
    taxType: "",
    assignToBusinessCategoryId: "",
    geofenceId: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const handleInputChange = (e) => {
    setTaxData({ ...taxData, [e.target.name]: e.target.value });
  };

  const handleRadioChange = (e) => {
    setTaxData((tax) => ({
      ...tax,
      taxType: e.target.value,
    }));
  };

  const submitAction = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${BASE_URL}/admin/taxes/add-tax`,
        taxData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        onAddTax(response.data.data);
        handleCancel();
        setTaxData({
          taxName: "",
          tax: "",
          taxType: "",
          assignToBusinessCategoryId: "",
          geofenceId: "",
        });
        toast({
          title: "Success",
          description: response.data.message,
          duration: 5000,
          status: "success",
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(`Error in adding new tax: ${err}`);
      toast({
        title: "Error",
        description: `Error in adding new tax`,
        duration: 5000,
        status: "error",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Add Tax"
      open={isVisible}
      className="mt-24"
      onCancel={handleCancel}
      footer={null}
    >
      <form onSubmit={submitAction}>
        <div className="flex flex-col gap-4 justify-between">
          <div className="flex gap-4">
            <label className="w-1/2 text-gray-500">Tax Name</label>
            <input
              type="text"
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              name="taxName"
              value={taxData.taxName}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex gap-4">
            <label className="w-1/2 text-gray-500">Tax</label>
            <input
              type="text"
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              name="tax"
              value={taxData.tax}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex gap-4">
            <label className="w-1/2 text-gray-500">Tax Type</label>
            <input
              type="radio"
              className="border-2 ml-24 border-gray-300 rounded outline-none focus:outline-none"
              name="taxType"
              value="Fixed-amount"
              checked={taxData.taxType === "Fixed-amount"}
              onChange={handleRadioChange}
            />
            <label className="w-1/2 text-gray-500">Fixed Amount</label>
            <input
              type="radio"
              className=" border-gray-300 rounded outline-none focus:outline-none"
              name="taxType"
              value="Percentage"
              checked={taxData.taxType === "Percentage"}
              onChange={handleRadioChange}
            />
            <label className="w-1/2 text-gray-500">Percentage</label>
          </div>
          <div className="flex gap-4">
            <label className="w-1/2 text-gray-500">Geofence</label>
            <select
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              name="geofenceId"
              value={taxData.geofenceId}
              onChange={handleInputChange}
            >
              <option defaultValue={"Select geofence"} hidden>
                Select geofence
              </option>
              {allGeofence.map((geofence) => (
                <option key={geofence._id} value={geofence._id}>
                  {geofence.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-4">
            <label className="w-1/2 text-gray-500">
              Assign to business category
            </label>
            <select
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              name="assignToBusinessCategoryId"
              value={taxData.assignToBusinessCategoryId}
              onChange={handleInputChange}
            >
              <option defaultValue={"Select business category"} hidden>
                Select business category
              </option>
              {allBusinessCategory.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-4">
            <button
              className="bg-gray-300 rounded-lg px-6 py-2 font-semibold justify-end"
              onClick={handleCancel}
              type="button"
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

export default AddTaxModal;
