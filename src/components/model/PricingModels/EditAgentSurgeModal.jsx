import { useToast } from '@chakra-ui/react'
import { Modal } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const EditAgentSurgeModal = ({
    isVisible,
    handleCancel,
    token,
    geofence,
    BASE_URL,
    currentEditAs,
  }) => {
    const toast = useToast();
    const navigate = useNavigate()
    const[isLoading,setIsLoading] = useState(false)
    const [agentsurge, setAgentSurge] = useState({
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
          setIsLoading(true);
          try {
            const [addResponse] =
            await Promise.all([
            axios.get(
              `${BASE_URL}/admin/agent-surge/${currentEditAs}`,
              {
                withCredentials: true,
                headers: { Authorization: `Bearer ${token}` },
              }
            ) 
          ]);
            if (addResponse.status === 200) {
              console.log("data in response is", addResponse.data.data);
              setAgentSurge(addResponse.data.data);
              console.log(addResponse.data.message)
              
            }
          } catch (err) {
            console.error(`Error in fetching data: ${err}`);
            
          } finally {
            setIsLoading(false);
          }
        };
    
        if (currentEditAs) {
            fetchData();
          }
      }, [token, navigate,currentEditAs ,BASE_URL]);
    
      const inputChange =(e) => {
        setAgentSurge({ ...agentsurge, [e.target.name]: e.target.value });
      };
      const formSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("agentsurge", agentsurge);
           const editResponse = await axios.put(
             `${BASE_URL}/admin/agent-surge/edit-agent-surge/${currentEditAs}`,
             agentsurge,
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
              description: "Agent Surge Updated Succesfully.",
              status: "success",
              duration: 1000,
              isClosable: true,
          });
            console.log(editResponse.data.message)
           }
         } catch (err) {
          toast({
            title: "Error",
            description: "There was an error occured",
            status: "error",
            duration: 1000,
            isClosable: true,
        });
            console.log(`Error in fetching data:${err}`)
         }
         console.log(agentsurge)
      }
  return (
    <Modal
    title="Surge"
    open={isVisible}
    centered
    onCancel={handleCancel}
    footer={null}
  >
    <form onSubmit={formSubmit} >
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
            value={agentsurge.ruleName}
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
            value={agentsurge.baseFare}
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
            value={agentsurge.baseDistance}
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
            value={agentsurge.waitingFare}
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
            value={agentsurge.waitingTime}
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
              value={agentsurge.geofenceId}
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

export default EditAgentSurgeModal
