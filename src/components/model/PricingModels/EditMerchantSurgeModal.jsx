import { useToast } from "@chakra-ui/react";
import { Modal } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditMerchantSurgeModal = ({
  isVisible,
  handleCancel,
  token,
  geofence,
  BASE_URL,
  currentEditMs,
}) => {
  const toast = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [confirmLoading,setConfirmLoading] = useState(false)
  const [merchantSurge, setMerchantSurge] = useState({
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
          axios.get(`${BASE_URL}/admin/merchant-surge/${currentEditMs}`, {
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

          setMerchantSurge(updatedData);
          console.log(addResponse.data.message);
        }
      } catch (err) {
        console.error(`Error in fetching data: ${err}`);
      } 
    };

    if (currentEditMs) {
      fetchData();
    }
  }, [token, navigate, currentEditMs, BASE_URL]);

  const inputChange = (e) => {
    setMerchantSurge({ ...merchantSurge, [e.target.name]: e.target.value });
  };
  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("merchantSurge", merchantSurge);
      const editResponse = await axios.put(
        `${BASE_URL}/admin/merchant-surge/edit-merchant-surge/${currentEditMs}`,
        merchantSurge,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (editResponse.status === 200) {
        handleCancel();
        toast({
          title: "Updated",
          description: "Merchant Updated Successfully.",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
        console.log(editResponse.data.message);
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "There was an error occured",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      console.log(`Error in fetching data:${err}`);
    } finally {
    setConfirmLoading(false);
    }
    console.log(merchantSurge);
  };
  return (
    <Modal
      title="Surge"
      open={isVisible}
      centered
      onCancel={handleCancel}
      footer={null}
    >
      <form onSubmit={formSubmit}>
        <div className="flex flex-col  max-h-[30rem] overflow-auto gap-4">
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="ruleName">
              Rule Name
            </label>
            <input
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              type="text"
              placeholder="Rule Name"
              value={merchantSurge.ruleName}
              id="ruleName"
              name="ruleName"
              onChange={inputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="baseFare">
              Base Fare
            </label>
            <input
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              type="text"
              placeholder="Base Fare"
              value={merchantSurge.baseFare}
              id="baseFare"
              name="baseFare"
              onChange={inputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="baseDistance">
              Base Distance
            </label>
            <input
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              type="text"
              placeholder="Base Distance"
              value={merchantSurge.baseDistance}
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
              value={merchantSurge.waitingFare}
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
              value={merchantSurge.waitingTime}
              id="waitingTime"
              name="waitingTime"
              onChange={inputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="geofenceId">
              Geofence
            </label>
            <select
              name="geofenceId"
              value={merchantSurge.geofenceId}
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              onChange={inputChange}
            >
              <option hidden value="">
                Geofence
              </option>
              {geofence.map((geoFence) => (
                <option value={geoFence._id} key={geoFence._id}>
                  {geoFence.name}
                </option>
              ))}
            </select>
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

export default EditMerchantSurgeModal;
