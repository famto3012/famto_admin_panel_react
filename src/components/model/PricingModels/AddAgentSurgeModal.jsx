import { useToast } from "@chakra-ui/react";
import { Modal } from "antd";
import axios from "axios";
import { useState } from "react";
import Select from "react-select";

const AddAgentSurgeModal = ({
  isVisible,
  handleCancel,
  token,
  geofence,
  onAddSurge,
  BASE_URL,
}) => {
  const [agentsurge, setAgentSurge] = useState({
    ruleName: "",
    baseFare: "",
    baseDistance: "",
    waitingFare: "",
    waitingTime: "",
    geofenceId: "",
  });

  const [confirmLoading, setConfirmLoading] = useState(false);

  const toast = useToast();

  const geofenceOptions = geofence?.map((geofence) => ({
    label: geofence.name,
    value: geofence._id,
  }));

  const inputChange = (e) => {
    setAgentSurge({ ...agentsurge, [e.target.name]: e.target.value });
  };

  const handleSelectGeofence = (option) => {
    setAgentSurge({
      ...agentsurge,
      geofenceId: option ? option.value : "", // Set to empty string if option is cleared
    });
  };

  const handleAddSurge = async (e) => {
    e.preventDefault();
    try {
      setConfirmLoading(true);
      const addResponse = await axios.post(
        `${BASE_URL}/admin/agent-surge/add-agent-surge`,
        agentsurge,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (addResponse.status === 201) {
        handleCancel();
        onAddSurge(addResponse.data.data);
        toast({
          title: "Success",
          description: "Agent Surge Created successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "There was an error occurred.",
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
      title=" Add Agent Surge"
      open={isVisible}
      centered
      onCancel={handleCancel}
      footer={null}
    >
      <form onSubmit={handleAddSurge}>
        <div className="flex flex-col  max-h-[30rem] overflow-auto gap-4">
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="ruleName">
              Rule Name <span className="text-red-600">*</span>
            </label>
            <input
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              type="text"
              placeholder="Rule Name"
              value={agentsurge.ruleName}
              id="ruleName"
              name="ruleName"
              onChange={inputChange}
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="baseFare">
              Base Fare <span className="text-red-600">*</span>
            </label>
            <input
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              type="text"
              placeholder="Base Fare"
              value={agentsurge.baseFare}
              id="baseFare"
              name="baseFare"
              onChange={inputChange}
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="baseDistance">
              Base Distance <span className="text-red-600">*</span>
            </label>
            <input
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              type="text"
              placeholder="Base Distance"
              value={agentsurge.baseDistance}
              id="baseDistance"
              name="baseDistance"
              onChange={inputChange}
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
              value={agentsurge.waitingFare}
              id="waitingFare"
              name="waitingFare"
              onChange={inputChange}
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
              value={agentsurge.waitingTime}
              id="waitingTime"
              name="waitingTime"
              onChange={inputChange}
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="geofenceId">
              Geofence <span className="text-red-600">*</span>
            </label>

            <Select
              className="w-2/3 outline-none focus:outline-none"
              value={geofenceOptions.find(
                (option) => option.value === agentsurge.geofenceId
              )}
              isMulti={false}
              isClearable={true}
              isSearchable={true}
              onChange={handleSelectGeofence}
              options={geofenceOptions}
              placeholder="Select geofence"
              menuPortalTarget={document.body}
              menuPlacement="auto"
              menuPosition="fixed"
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                menu: (provided) => ({
                  ...provided,
                  maxHeight: "300px",
                  overflowY: "auto",
                }),
              }}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            className="bg-cyan-50 py-2 px-4 rounded-md"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="bg-teal-700 text-white py-2 px-4 rounded-md"
            type="submit"
          >
            {confirmLoading ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddAgentSurgeModal;
