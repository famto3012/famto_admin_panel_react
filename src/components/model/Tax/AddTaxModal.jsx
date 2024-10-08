import { useState } from "react";
import { Modal } from "antd";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

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
    assignToBusinessCategory: null,
    geofences: [],
  });

  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const animatedComponents = makeAnimated();

  const geofenceOptions = allGeofence.map((geofence) => ({
    label: geofence.name,
    value: geofence._id,
  }));

  const categoryOptions = allBusinessCategory?.map((category) => ({
    label: category.title,
    value: category._id,
  }));

  const handleSelectGeofence = (selectedOptions) => {
    setTaxData({
      ...taxData,
      geofences: selectedOptions.map((option) => option.value),
    });
  };

  const handleSelectCategory = (option) => {
    setTaxData({
      ...taxData,
      assignToBusinessCategory: option ? option.value : null,
    });
  };

  const handleInputChange = (e) => {
    setTaxData({ ...taxData, [e.target.name]: e.target.value });
  };

  const handleRadioChange = (e) => {
    setTaxData((tax) => ({
      ...tax,
      taxType: e.target.value,
    }));
  };

  const handleAddTax = async (e) => {
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
          assignToBusinessCategory: "",
          geofences: "",
        });
        toast({
          title: "Success",
          description: response.data.message,
          duration: 3000,
          status: "success",
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: `Error in adding new tax`,
        duration: 3000,
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
      onCancel={handleCancel}
      footer={null}
      centered
    >
      <form onSubmit={handleAddTax}>
        <div className="flex flex-col gap-4 justify-between">
          <div className="flex gap-4">
            <label className="w-1/2 text-gray-500">
              Tax Name <span className="text-red-600">*</span>{" "}
            </label>
            <input
              type="text"
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              name="taxName"
              value={taxData.taxName}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex gap-4">
            <label className="w-1/2 text-gray-500">
              Tax <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              name="tax"
              value={taxData.tax}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex gap-4">
            <label className="w-1/2 text-gray-500">
              Tax Type <span className="text-red-600">*</span>
            </label>
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
            <label className="w-1/2 text-gray-500">
              Geofence <span className="text-red-600">*</span>
            </label>
            <Select
              className="w-2/3 outline-none focus:outline-none"
              value={geofenceOptions?.filter((option) =>
                taxData?.geofences?.includes(option.value)
              )}
              isMulti={true}
              isSearchable={true}
              onChange={handleSelectGeofence}
              options={geofenceOptions}
              placeholder="Select geofence"
              isClearable={true}
              components={animatedComponents}
            />
          </div>

          <div className="flex gap-4">
            <label className="w-1/2 text-gray-500">
              Assign to business category{" "}
              <span className="text-red-600">*</span>
            </label>

            <Select
              className="w-2/3 outline-none focus:outline-none"
              value={categoryOptions.find(
                (option) => option.value === taxData.assignToBusinessCategory
              )}
              isMulti={false}
              isClearable={true}
              isSearchable={true}
              onChange={handleSelectCategory}
              options={categoryOptions}
              placeholder="Select Business category"
            />
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
