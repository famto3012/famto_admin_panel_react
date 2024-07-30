import { Modal } from "antd";
import axios from "axios";
import React, { useState } from "react";

const AddAgentPricingModal = ({
  isVisible,
  handleCancel,
  token,
  geofence,
  BASE_URL,
}) => {
  const [apricing, setApricing] = useState({
    ruleName: "",
    baseFare: "",
    baseDistanceFare: "",
    extraFarePerDay: "",
    baseDistanceFarePerKM: "",
    waitingTime: "",
    waitingFare: "",
    purchaseFarePerHour: "",
    geofenceId: "",
  });
  const handleInputChange = (e) => {
    setApricing({ ...apricing, [e.target.name]: e.target.value });
  };

  const submitAction = async (e) => {
    e.preventDefault();
    try {
      console.log("agentpricing", apricing);
      const addResponse = await axios.post(
        `${BASE_URL}/admin/agent-pricing/add-agent-pricing`,
        apricing,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (addResponse.status === 201) {
        console.log("adddata", addResponse.data.message);
        //      toast({
        //        title: "Updated",
        //        description: "Updated successfully.",
        //        status: "success",
        //        duration: 9000,
        //        isClosable: true,
        //    });
      }
    } catch (err) {
      console.error(`Error in fetching data: ${err}`);
    }
    console.log(apricing);
  };
  return (
    <Modal
      title="Agent Pricing"
      open={isVisible}
      centered
      onCancel={handleCancel}
      footer={null}
    >
      <form onSubmit={submitAction}>
        <div className="flex flex-col max-h-[30rem] overflow-auto gap-4">
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="ruleName">
              Rule Name
            </label>
            <input
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              type="text"
              placeholder="Rule Name"
              value={apricing.ruleName}
              id="ruleName"
              name="ruleName"
              onChange={handleInputChange}
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
              value={apricing.baseFare}
              id="baseFare"
              name="baseFare"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="baseDistanceFare">
              Base Distance Fare
            </label>
            <input
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              type="text"
              placeholder="Base Distance"
              value={apricing.baseDistanceFare}
              id="baseDistanceFare"
              name="baseDistanceFare"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="extraFarePerDay">
              Extra Fare Day
            </label>
            <input
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              type="text"
              placeholder="Extra Fare Day"
              value={apricing.extraFarePerDay}
              id="extraFarePerDay"
              name="extraFarePerDay"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label
              className="w-1/3 text-gray-500"
              htmlFor="baseDistanceFarePerKM"
            >
              Base Distance Km
            </label>
            <input
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              type="text"
              placeholder="Base Distance"
              value={apricing.baseDistanceFarePerKM}
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
              value={apricing.waitingTime}
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
              value={apricing.waitingFare}
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
              value={apricing.purchaseFarePerHour}
              id="purchaseFarePerHour"
              name="purchaseFarePerHour"
              onChange={handleInputChange}
            />
          </div>
          {/* <div className="flex items-center">
          <label className="w-1/3 text-gray-500" htmlFor="addedTip">
            Added Tip
          </label>
          <input
            className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
            type="text"
            placeholder="Added Tip"
            value={apricing.addedTip}
            id="addedTip"
            name="addedTip"
            onChange={handleInputChange}
          />
        </div> */}

          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="geofence">
              Geofence
            </label>
            <select
              name="geofenceId"
              value={apricing.geofenceId}
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              onChange={handleInputChange}
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
          <button className="bg-cyan-50 py-2 px-4 rounded-md" type="button">
            Cancel
          </button>
          <button
            className="bg-teal-700 text-white py-2 px-4 rounded-md"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddAgentPricingModal;
