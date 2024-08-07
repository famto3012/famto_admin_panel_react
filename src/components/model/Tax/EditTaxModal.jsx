import { useState, useEffect } from "react";
import { Modal } from "antd";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const EditTaxModal = ({
  isVisible,
  handleCancel,
  token,
  BASE_URL,
  taxId,
  allGeofence,
  allBusinessCategory,
  onEditTax,
}) => {
  if (!taxId) return null;

  const [editTaxData, setEditTaxData] = useState({
    taxName: "",
    tax: "",
    taxType: "",
    assignToBusinessCategoryId: "",
    geofenceId: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  useEffect(() => {
    const getTaxData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/admin/taxes/${taxId}`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setEditTaxData(response.data.data);
        }
      } catch (err) {
        console.log(`Error in getiing tax data: ${err}`);
      }
    };

    getTaxData();
  }, [taxId]);

  const handleInputChange = (e) => {
    setEditTaxData({ ...editTaxData, [e.target.name]: e.target.value });
  };

  // const handleSelectChange = (e) => {
  //   setEditTaxData({
  //     ...editTaxData,
  //     [e.target.name]: { ...editTaxData[e.target.name], _id: e.target.value },
  //   });
  // };

  const handleRadioChange = (e) => {
    setEditTaxData((tax) => ({
      ...tax,
      taxType: e.target.value,
    }));
  };

  const submitAction = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.put(
        `${BASE_URL}/admin/taxes/edit-tax/${taxId}`,
        editTaxData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        onEditTax(response.data.data);
        handleCancel();
        setEditTaxData({
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
      console.log(`Error in updating tax: ${err.stack}`);
      toast({
        title: "Error",
        description: `Error in updating tax`,
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
      title="Edit Tax"
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
              value={editTaxData.taxName}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex gap-4">
            <label className="w-1/2 text-gray-500">Tax</label>
            <input
              type="text"
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              name="tax"
              value={editTaxData.tax}
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
              checked={editTaxData.taxType === "Fixed-amount"}
              onChange={handleInputChange}
            />
            <label className="w-1/2 text-gray-500">Fixed Amount</label>
            <input
              type="radio"
              className="border-gray-300 rounded outline-none focus:outline-none"
              name="taxType"
              value="Percentage"
              checked={editTaxData.taxType === "Percentage"}
              onChange={handleInputChange}
            />
            <label className="w-1/2 text-gray-500">Percentage</label>
          </div>

          <div className="flex gap-4">
            <label className="w-1/2 text-gray-500">Geofence</label>
            <select
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              name="geofenceId"
              value={editTaxData.geofenceId?._id}
              onChange={handleInputChange}
            >
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
              value={editTaxData.assignToBusinessCategoryId?._id}
              onChange={handleInputChange}
            >
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
              {isLoading ? `Saving...` : `Save`}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditTaxModal;
