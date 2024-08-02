import { useToast } from '@chakra-ui/react';
import { Modal } from 'antd';
import axios from 'axios';
import React, { useState } from 'react'

const AddCustomerSurgeModal = ({
    isVisible,
    handleCancel,
    token,
    geofence,
    BASE_URL,
  }) => {
    const toast = useToast();
    const [customerSurge, setCustomerSurge] = useState({
          ruleName: "",
          baseFare: "",
          baseDistance: "",
          waitingFare: "",
          waitingTime: "",
          geofenceId: "",
        });
        
      
        const inputChange =(e) => {
          setCustomerSurge ({ ...customerSurge, [e.target.name]: e.target.value });
        };
      
        const formSubmit = async(e) => {
          e.preventDefault();
          try {
            console.log("customerSurge", customerSurge);
            const addResponse = await axios.post(
              `${BASE_URL}/admin/customer-surge/add-customer-surge`,
              customerSurge,
              {
                withCredentials: true,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
      
            if (addResponse.status === 201) {
              console.log("customerSurge", addResponse.data.message);
                   toast({
                     title: "Created",
                     description: "Customer Surge successfully.",
                     status: "success",
                     duration: 1000,
                     isClosable: true,
                 });
            }
          } catch (err) {
            console.error(`Error in fetching data: ${err}`);
            toast({
              title: "Error",
              description: "There was an error occured.",
              status: "error",
              duration: 1000,
              isClosable: true,
          });v
          }
          
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
          <label
            className="w-1/3 text-gray-500"
            htmlFor="ruleName"
          >
            Rule Name
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
          <label
            className="w-1/3 text-gray-500"
            htmlFor="baseFare"
          >
            Base Fare
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
          <label
            className="w-1/3 text-gray-500"
            htmlFor="baseDistance"
          >
            Base Distance
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
          <label
            className="w-1/3 text-gray-500"
            htmlFor="waitingFare"
          >
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
          <label
            className="w-1/3 text-gray-500"
            htmlFor="waitingTime"
          >
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
          <label
            className="w-1/3 text-gray-500"
            htmlFor="geofenceId"
          >
            Geofence
          </label>
          <select
              name="geofenceId"
              value={customerSurge.geofenceId}
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
          Add
        </button>
      </div>
    </form>
  </Modal>
      
    
  )
}

export default AddCustomerSurgeModal