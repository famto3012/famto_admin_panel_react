import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import axios from "axios";

const EditTaxModal = ({
  isVisible,
  handleCancel,
  token,
  BASE_URL,
  allGeofence,
  allBusinessCategory,
  taxData,
}) => {
  if (!taxData) return null;
  const [editTaxData, setEditTaxData] = useState(taxData);

  console.log(editTaxData);

  useEffect(() => {
    setEditTaxData(taxData);
  }, [taxData]);

  const handleInputChange = (e) => {
    setEditTaxData({ ...editTaxData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e) => {
    setEditTaxData({
      ...editTaxData,
      [e.target.name]: { ...editTaxData[e.target.name], _id: e.target.value },
    });
  };

  const handleRadioChange = (event) => {
    setEditTaxData((tax) => ({
      ...tax,
      taxType: event.target.value,
    }));
  };

  const submitAction = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${BASE_URL}/admin/taxes/update-tax`,
        editTaxData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        handleOk();
      }
    } catch (err) {
      console.log(`Error in updating tax: ${err}`);
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
              onChange={handleRadioChange}
            />
            <label className="w-1/2 text-gray-500">Fixed Amount</label>
            <input
              type="radio"
              className=" border-gray-300 rounded outline-none focus:outline-none"
              name="taxType"
              value="Percentage"
              checked={editTaxData.taxType === "Percentage"}
              onChange={handleRadioChange}
            />
            <label className="w-1/2 text-gray-500">Percentage</label>
          </div>

          <div className="flex gap-4">
            <label className="w-1/2 text-gray-500">Geofence</label>
            <select
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              name="geofenceId"
              value={editTaxData.geofenceId._id}
              onChange={handleSelectChange}
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
              value={editTaxData.assignToBusinessCategoryId._id}
              onChange={handleSelectChange}
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
              Save
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditTaxModal;
