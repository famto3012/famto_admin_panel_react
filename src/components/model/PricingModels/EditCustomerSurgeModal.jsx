import { useToast } from "@chakra-ui/react";
import { Modal } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const EditCustomerSurgeModal = ({
  isVisible,
  handleCancel,
  token,
  geofence,
  BASE_URL,
  onEditSurge,
  currentEdit,
}) => {
  const toast = useToast();
  const navigate = useNavigate();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [customerSurge, setCustomerSurge] = useState({
    ruleName: "",
    baseFare: "",
    baseDistance: "",
    waitingFare: "",
    waitingTime: "",
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
          axios.get(`${BASE_URL}/admin/customer-surge/${currentEdit}`, {
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

          setCustomerSurge(updatedData);
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

  const geofenceOptions = geofence?.map((geofence) => ({
    label: geofence.name,
    value: geofence._id,
  }));

  const inputChange = (e) => {
    setCustomerSurge({ ...customerSurge, [e.target.name]: e.target.value });
  };

  const handleEditSurge = async (e) => {
    e.preventDefault();
    try {
      setConfirmLoading(true);

      const editResponse = await axios.put(
        `${BASE_URL}/admin/customer-surge/edit-customer-surge/${currentEdit}`,
        customerSurge,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (editResponse.status === 200) {
        handleCancel();
        onEditSurge(editResponse.data.data);
        toast({
          title: "Success",
          description: "Customer Surge Updated Successfully.",
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
      console.log(`Error in fetching data:${err}`);
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Customer Surge"
      open={isVisible}
      centered
      onCancel={handleCancel}
      footer={null}
      styles={{
        mask: { backgroundColor: "rgba(0, 0, 0, 0.5)" }, // Custom mask background color
      }}
    >
      <form onSubmit={handleEditSurge}>
        <div className="flex flex-col  max-h-[30rem] overflow-auto gap-4">
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="ruleName">
              Rule Name <span className="text-red-500">*</span>
            </label>
            <input
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              type="text"
              placeholder="Rule Name"
              value={customerSurge.ruleName}
              id="ruleName"
              name="ruleName"
              onChange={inputChange}
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
              value={customerSurge.baseFare}
              id="baseFare"
              name="baseFare"
              onChange={inputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="baseDistance">
              Base Distance <span className="text-red-500">*</span>
            </label>
            <input
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              type="text"
              placeholder="Base Distance"
              value={customerSurge.baseDistance}
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
              value={customerSurge.waitingFare}
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
              value={customerSurge.waitingTime}
              id="waitingTime"
              name="waitingTime"
              onChange={inputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="geofenceId">
              Geofence <span className="text-red-500">*</span>
            </label>
            <Select
              className="w-2/3 outline-none focus:outline-none"
              value={geofenceOptions.find(
                (option) => option.value === customerSurge.geofenceId
              )}
              isMulti={false}
              isClearable={true}
              isSearchable={true}
              onChange={(option) =>
                setCustomerSurge({
                  ...customerSurge,
                  geofenceId: option.value,
                })
              }
              options={geofenceOptions}
              placeholder="Select geofence"
              menuPortalTarget={document.body}
              menuPlacement="top"
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
            {confirmLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditCustomerSurgeModal;
