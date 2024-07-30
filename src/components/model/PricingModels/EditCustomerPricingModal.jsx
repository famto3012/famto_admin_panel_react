import { Modal } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const EditCustomerPricingModal =  ({
    isVisible,
    handleCancel,
    token,
    geofence,
    BASE_URL,
    business,
    currentEditCr
  }) => {
    const navigate =useNavigate()
    const[isLoading,setIsLoading] = useState(false)
    const [cpricing, setCpricing] = useState({
        vehicleType:null,
        ruleName: "",
        baseFare: "",
        baseDistance: "",
        fareAfterBaseDistance: "",
        baseWeightUpto: "",
        fareAfterBaseWeight: "",
        waitingTime: "",
        waitingFare: "",
        purchaseFarePerHour: "",
        addedTip: "",
        geofenceId: "",
        deliveryMode:"Home Delivery",
        businessCategoryId:null,
        
      });

      useEffect(() => {
        if (!token) {
          navigate("/auth/login");
          return;
        }
    
        const fetchData = async () => {
          setIsLoading(true);
          try {
            const [addResponse] =
            await Promise.all([
            axios.get(
              `${BASE_URL}/admin/customer-pricing/${currentEditCr}`,
              {
                withCredentials: true,
                headers: { Authorization: `Bearer ${token}` },
              }
            ) 
          ]);
            if (addResponse.status === 200) {
              console.log("data in response is", addResponse.data.data);
              setCpricing(addResponse.data.data);
              console.log(addResponse.data.message)
              
            }
          } catch (err) {
            console.error(`Error in fetching data: ${err}`);
          } finally {
            setIsLoading(false);
          }
        };
    
        if (currentEditCr) {
            fetchData();
          }
      }, [token, navigate,currentEditCr ,BASE_URL]);


      const handleRadioChange = (e) => {
        const { value } = e.target;
        setCpricing({ ...cpricing, deliveryMode: value });
        console.log(value);
      };
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCpricing({ ...cpricing, [name]: value });
      };
      const submitAction = async (e) => {
        e.preventDefault();
        try {
           console.log("customerpricing", cpricing);
           const editResponse = await axios.put(
             `${BASE_URL}/admin/customer-pricing/edit-customer-pricing/${currentEditCr}`,
             cpricing,
             {
               withCredentials: true,
               headers: {
                 Authorization: `Bearer ${token}`,
               },
             }
           );
     
           if (editResponse.status === 200) {
    
            console.log(editResponse.data.message)
           }
         } catch (err) {
            console.log(`Error in fetching data:${err}`)
         }
         console.log(cpricing)
      }

  return (
    <Modal
              title="Customer Pricing"
              open={isVisible}
              centered
              width="700px"
              onCancel={handleCancel}
              footer={null}
            >
              <form onSubmit={submitAction}>
                <div className="flex flex-col  max-h-[30rem] overflow-auto gap-4 ">
                  <div className="flex items-center">
                    <label className="w-1/3 text-gray-500" htmlFor="ruleName">
                      Rule Name
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Rule Name"
                      value={cpricing.ruleName}
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
                      value={cpricing.baseFare}
                      id="baseFare"
                      name="baseFare"
                      onChange={handleInputChange}
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
                      value={cpricing.baseDistance}
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
                      Fare After Distance
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Fare After Distance"
                      value={cpricing.fareAfterBaseDistance}
                      id="fareAfterBaseDistance"
                      name="fareAfterBaseDistance"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-gray-500" htmlFor="baseWeightUpto">
                      Base Weight upto(in kg)
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Base Weight"
                      value={cpricing.baseWeightUpto}
                      id="baseWeightUpto"
                      name="baseWeightUpto"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="fareAfterBaseWeight"
                    >
                      Fare after base weight
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Fare After Weight"
                      value={cpricing.fareAfterBaseWeight}
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
                      value={cpricing.purchaseFarePerHour}
                      id="purchaseFarePerHour"
                      name="purchaseFarePerHour"
                      onChange={handleInputChange}
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
                      value={cpricing.waitingFare}
                      id="waitingFare"
                      name="waitingFare"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="waitingTime"
                    >
                      Waiting Time
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                      type="text"
                      placeholder="Waiting Time"
                      value={cpricing.waitingTime}
                      id="waitingTime"
                      name="waitingTime"
                      onChange={handleInputChange}
                    />
                  </div>
                 
                  
                 <div className="flex items-center mt-1">
                <label className="w-1/3 text-gray-500">
                  Select Delivery Mode
                </label>
                <div className="flex items-center space-x-2 gap-2 w-2/3">
                  <input
                    type="radio"
                    id="Home Delivery"
                    value="Home Delivery"
                    name="deliveryMode"
                    checked={cpricing.deliveryMode === "Home Delivery"}
                    onChange={handleRadioChange}
                    className="form-radio"
                  />
                  <label htmlFor="Home Delivery" className="mr-4">
                   Home Delivery
                  </label>
                  <input
                    type="radio"
                    id="Custom Order"
                    name="deliveryMode"
                    value="Custom Order"
                    checked={cpricing.deliveryMode === "Custom Order"}
                    onChange={handleRadioChange}
                    className="form-radio"
                  />
                  <label htmlFor="Custom Order" className="mr-4">
                   Custom Order
                  </label>
                  <input
                    type="radio"
                    id="Pick and Drop"
                    name="deliveryMode"
                    value="Pick and Drop"
                    checked={cpricing.deliveryMode === "Pick and Drop"}
                    onChange={handleRadioChange}
                    className="form-radio"
                  />
                  <label htmlFor="Pick and Drop" className="mr-4">
                   Pick & Drop
                  </label>
                </div>
                </div>
                {cpricing.deliveryMode === "Home Delivery" && (
                <div className="flex items-center">
                    <label className="w-1/3 text-gray-500" htmlFor='business'>
                   </label>
                   <select
                   name="businessCategoryId"
                    value={cpricing.businessCategoryId}
                    onChange={handleInputChange}
                    className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                  >
                     <option hidden value="">
                    Select Business Category
                     </option>
                    {business.map((businessCategory) => (
                      <option key={businessCategory._id} value={businessCategory._id}>
                        {businessCategory.title}
                      </option>
                    ))}
                  </select>
                  </div>
                )}
                {cpricing.deliveryMode === "Pick and Drop" &&(
                  <div className="flex items-center">
                    <label className="w-1/3 text-gray-500" htmlFor='vehicleType'>
                   </label>
                   <select
                    id="vehicleType"
                    name='vehicleType'
                    value={cpricing.vehicleType}
                    onChange={handleInputChange}
                    className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                  >
                    <option value="" hidden>Type of Vehicle</option>
                    <option value="Scooter">Scooter</option>
                   <option value="Bike">Bike</option>
                    </select>
                  </div>
                   )}
                  <div className="flex items-center">
                    <label className="w-1/3 text-gray-500" htmlFor="geofence">
                      Geofence
                    </label>
                    <select
              name="geofenceId"
              value={cpricing.geofenceId}
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
  )
}

export default EditCustomerPricingModal
