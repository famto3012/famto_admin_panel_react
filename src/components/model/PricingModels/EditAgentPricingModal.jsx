import { useToast } from "@chakra-ui/react";
import { Modal } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const EditAgentPricingModal = ({
  isVisible,
  handleCancel,
  token,
  geofence,
  BASE_URL,
  onEditRule,
  currentEdit,
}) => {
  const toast = useToast();
  const navigate = useNavigate();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [agentPricing, setAgentPricing] = useState({
    ruleName: "",
    baseFare: "",
    baseDistanceFarePerKM: "",
    waitingFare: "",
    waitingTime: "",
    purchaseFarePerHour: "",
    minLoginHours: "",
    minOrderNumber: "",
    fareAfterMinLoginHours: "",
    fareAfterMinOrderNumber: "",
    geofenceId: "",
  });

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
      return;
    }

    const fetchData = async () => {
      try {
        const [addResponse] = await Promise.all([
          axios.get(`${BASE_URL}/admin/agent-pricing/${currentEdit}`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        if (addResponse.status === 200) {
          console.log("data in response is", addResponse.data.data);
          const customGeofenceId = addResponse.data.data.geofenceId._id;
          const updatedData = {
            ...addResponse.data.data,
            geofenceId: customGeofenceId,
          };

          setAgentPricing(updatedData);
          console.log(addResponse.data.message);
        }
      } catch (err) {
        console.error(`Error in fetching data: ${err}`);
      }
    };

    if (currentEdit) {
      fetchData();
    }
  }, [token, navigate, currentEdit, BASE_URL]);

  const handleInputChange = (e) => {
    setAgentPricing({ ...agentPricing, [e.target.name]: e.target.value });
  };

  const geofenceOptions = geofence?.map((geofence) => ({
    label: geofence.name,
    value: geofence._id,
  }));

  const handleEditPricing = async (e) => {
    e.preventDefault();
    try {
      setConfirmLoading(true);
      console.log("agentPricing", agentPricing);
      const editResponse = await axios.put(
        `${BASE_URL}/admin/agent-pricing/edit-agent-pricing/${currentEdit}`,
        agentPricing,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (editResponse.status === 200) {
        handleCancel();
        onEditRule(editResponse.data.data);
        toast({
          title: "Success",
          description: "Agent Pricing Updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        console.log(editResponse.data.message);
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "There was an error occured",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Agent Pricing"
      open={isVisible}
      centered
      onCancel={handleCancel}
      footer={null}
      styles={{
        mask: { backgroundColor: "rgba(0, 0, 0, 0.3)" }, // Custom mask background color
      }}
    >
      <form onSubmit={handleEditPricing}>
        <div className="flex flex-col max-h-[30rem] overflow-auto gap-4">
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="ruleName">
              Rule Name <span className="text-red-500">*</span>
            </label>
            <input
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              type="text"
              placeholder="Rule Name"
              value={agentPricing.ruleName}
              id="ruleName"
              name="ruleName"
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="baseFare">
              Base Fare <span className="text-red-500">*</span>
            </label>
            <input
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              type="text"
              placeholder="Base Fare"
              value={agentPricing.baseFare}
              id="baseFare"
              name="baseFare"
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center">
            <label
              className="w-1/3 text-gray-500"
              htmlFor="baseDistanceFarePerKM"
            >
              Base Distance fare per KM <span className="text-red-500">*</span>
            </label>
            <input
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              type="text"
              placeholder="Base Distance"
              value={agentPricing.baseDistanceFarePerKM}
              id="baseDistanceFarePerKM"
              name="baseDistanceFarePerKM"
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="waitingTime">
              Waiting Time (minutes)
            </label>
            <input
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              type="text"
              placeholder="Waiting Time"
              value={agentPricing.waitingTime}
              id="waitingTime"
              name="waitingTime"
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="waitingFare">
              Waiting Fare
            </label>
            <input
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              type="text"
              placeholder="Waiting Fare"
              value={agentPricing.waitingFare}
              id="waitingFare"
              name="waitingFare"
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center">
            <label
              className="w-1/3 text-gray-500"
              htmlFor="purchaseFarePerHour"
            >
              Purchase Fare Hour
            </label>
            <input
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              type="text"
              placeholder="Purchase Fare Hour"
              value={agentPricing.purchaseFarePerHour}
              id="purchaseFarePerHour"
              name="purchaseFarePerHour"
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center">
            <label
              className="w-1/3 text-gray-500"
              htmlFor="purchaseFarePerHour"
            >
              Minimum login hours <span className="text-red-500">*</span>
            </label>
            <input
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              type="text"
              placeholder="Purchase Fare Hour"
              value={agentPricing.minLoginHours}
              name="minLoginHours"
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center">
            <label
              className="w-1/3 text-gray-500"
              htmlFor="purchaseFarePerHour"
            >
              Minimum order number <span className="text-red-500">*</span>
            </label>
            <input
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              type="text"
              placeholder="Purchase Fare Hour"
              value={agentPricing.minOrderNumber}
              name="minOrderNumber"
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center">
            <label
              className="w-1/3 text-gray-500"
              htmlFor="purchaseFarePerHour"
            >
              Fare after minimum login hours
            </label>
            <input
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              type="text"
              placeholder="Purchase Fare Hour"
              value={agentPricing.fareAfterMinLoginHours}
              name="fareAfterMinLoginHours"
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center">
            <label
              className="w-1/3 text-gray-500"
              htmlFor="purchaseFarePerHour"
            >
              Fare after minimum order number
            </label>
            <input
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              type="text"
              placeholder="Purchase Fare Hour"
              value={agentPricing.fareAfterMinOrderNumber}
              name="fareAfterMinOrderNumber"
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="geofence">
              Geofence <span className="text-red-500">*</span>
            </label>

            <Select
              options={geofenceOptions}
              value={geofenceOptions.find(
                (option) => option.value === agentPricing.geofenceId
              )}
              onChange={(option) =>
                setAgentPricing({
                  ...agentPricing,
                  geofenceId: option.value,
                })
              }
              className="rounded outline-none focus:outline-none w-2/3"
              placeholder="Select geofence"
              isSearchable={true}
              isMulti={false}
              menuPlacement="auto"
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
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button className="bg-cyan-50 py-2 px-4 rounded-md" type="button">
            Cancel
          </button>
          <button
            className="bg-teal-700 text-white py-2 px-4 rounded-md"
            type="submit"
          >
            {confirmLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditAgentPricingModal;
