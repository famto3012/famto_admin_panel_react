import { useToast } from "@chakra-ui/react";
import { Modal } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditMerchantPricingModal = ({
  isVisible,
  handleCancel,
  token,
  geofence,
  BASE_URL,
  currentEditMr,
}) => {
  const toast = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [mpricing, setMpricing] = useState({
    ruleName: "",
    baseFare: "",
    baseDistance: "",
    fareAfterBaseDistance: "",
    baseWeightUpTo: "",
    fareAfterBaseWeight: "",
    waitingTime: "",
    waitingFare: "",
    purchaseFarePerHour: "",
    geofenceId: "",
  });
  useEffect(() => {
    // console.log(currentEditMr)
    if (!token) {
      navigate("/auth/login");
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [addResponse] = await Promise.all([
          axios.get(`${BASE_URL}/admin/merchant-pricing/${currentEditMr}`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        if (addResponse.status === 200) {
          console.log("data in response is", addResponse.data.data);
          setMpricing(addResponse.data.data);
          console.log(addResponse.data.message);
        }
      } catch (err) {
        console.error(`Error in fetching data: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    if (currentEditMr) {
      fetchData();
    }
  }, [token, navigate, currentEditMr, BASE_URL]);

  const handleInputChange = (e) => {
    setMpricing({ ...mpricing, [e.target.name]: e.target.value });
  };
  const submitAction = async (e) => {
    e.preventDefault();
    try {
      console.log("mpricing", mpricing);
      const editResponse = await axios.put(
        `${BASE_URL}/admin/merchant-pricing/edit-merchant-pricing/${currentEditMr}`,
        mpricing,
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
          description: "Merchant Pricing Updated Successfully.",
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
    }
    console.log(mpricing);
  };
  return (
    <Modal
      title="Merchant Pricing"
      open={isVisible}
      centered
      onCancel={handleCancel}
      footer={null}
    >
      <form onSubmit={submitAction}>
        <div className="flex flex-col gap-4  max-h-[30rem] overflow-auto">
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="ruleName">
              Rule Name
            </label>
            <input
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              type="text"
              placeholder="Rule Name"
              value={mpricing.ruleName}
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
              value={mpricing.baseFare}
              id="baseFare"
              name="baseFare"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="baseDistance">
              Base Distance
            </label>
            <input
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              type="text"
              placeholder="Fare After Distance"
              value={mpricing.baseDistance}
              id="baseDistance"
              name="baseDistance"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label
              className="w-1/3 text-gray-500"
              htmlFor="fareAfterBaseDistance"
            >
              Fare After Base Distance
            </label>
            <input
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              type="text"
              placeholder="Fare After Distance"
              value={mpricing.fareAfterBaseDistance}
              id="fareAfterBaseDistance"
              name="fareAfterBaseDistance"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="baseWeightUpTo">
              Base Weight
            </label>
            <input
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              type="text"
              placeholder="Base Weight"
              value={mpricing.baseWeightUpTo}
              id="baseWeightUpTo"
              name="baseWeightUpTo"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label
              className="w-1/3 text-gray-500"
              htmlFor="fareAfterBaseWeight"
            >
              Fare After Weight
            </label>
            <input
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              type="text"
              placeholder="Fare After Weight"
              value={mpricing.fareAfterBaseWeight}
              id="fareAfterBaseWeight"
              name="fareAfterBaseWeight"
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
              value={mpricing.purchaseFarePerHour}
              id="purchaseFarePerHour"
              name="purchaseFarePerHour"
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
              value={mpricing.waitingFare}
              id="waitingFare"
              name="waitingFare"
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
              value={mpricing.waitingTime}
              id="waitingTime"
              name="waitingTime"
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="geofenceId">
              Geofence
            </label>
            <select
              name="geofenceId"
              value={mpricing.geofenceId._id}
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
            Add
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditMerchantPricingModal;
