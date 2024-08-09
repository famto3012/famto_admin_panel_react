import { useContext, useEffect, useRef, useState } from "react";
import { ArrowLeftOutlined, SettingOutlined } from "@ant-design/icons";
import { Modal, Switch } from "antd";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import {
  Step,
  StepDescription,
  StepIndicator,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Box,
  MenuItem,
  MenuList,
  MenuButton,
  Menu,
  Badge,
  useToast,
} from "@chakra-ui/react";
import SidebarDelivery from "../../../components/model/SidebarDelivery";
import { mappls } from "mappls-web-maps";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";
import { formatDate, formatTime } from "../../../utils/formatter";
import { ChevronDownIcon } from "@saas-ui/react";

const DeliveryManagement = () => {
  const [autoAllocation, setAutoAllocation] = useState({
    autoAllocationType: "",
    expireTime: "",
    maxRadius: "",
    priorityType: "",
  });
  const [taskData, setTaskData] = useState([]);
  const [agentData, setAgentData] = useState([]);
  const [allAgentData, setAllAgentData] = useState([]);
  const [geofenceAgentData, setGeofenceAgentData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("Free");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [geofenceToggle, setGeofenceToggle] = useState(false);
  const [autoAllocationStatus, setAutoAllocationStatus] = useState(false);
  const [manualAssign, setManualAssign] = useState("");
  const mapContainerRef = useRef(null);
  const [mapObject, setMapObject] = useState(null);
  const toast = useToast();
  //const [searchOrderId, setOrderId] = useState("")

  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const { token } = useContext(UserContext);

  const steps = [
    {
      title: "Merchant Name",
      description: "by Admin ID #123",
      adress: "56, Post office, Pattom, Thiruvallam Lorem Ipsum Lorem Ipsum",
      pickup: "delivery",
      time: "HH :MM",
    },
    {
      title: "Cusotmer Name",
      description: "by Admin ID #123",
      adress: "PMG",
      pickup: "delivery",
      time: "HH :MM",
    },
  ];

  const [authToken, setAuthToken] = useState("");

  const getAuthToken = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/token/get-auth-token`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setAuthToken(response.data.data);
      }
    } catch (err) {
      console.log(`Error in getting auth token`);
    }
  };

  const { activeStep } = useSteps({
    index: 2,
    count: steps.length,
  });

  const handleChange = (e) => {
    setAutoAllocation((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // const data = [
  //   {
  //     time: "06.00",
  //     head: "order",
  //     adress: "56, Post office, Pattom, Thiruvallam Lorem Ipsum Lorem Ipsum",
  //     phone: "1234",
  //   },
  //   {
  //     time: "06.00",
  //     head: "order",
  //     adress: "Pattom",
  //   },
  //   {
  //     time: "06.00",
  //     head: "order",
  //     adress: "Pattom",
  //   },
  //   {
  //     time: "06.00",
  //     head: "order",
  //     adress: "Pattom",
  //   },
  // ];

  const autoAllocationStatusUpdate = async () => {
    try {
      if (autoAllocation.isActive) {
        setAutoAllocationStatus(false);
      } else {
        setAutoAllocationStatus(true);
      }
      const response = await axios.put(
        `${BASE_URL}/admin/auto-allocation/update-status`,
        {},
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 201) {
        // const {data} = response.data;
        toast({
          title: "Auto allocation status updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log("Error in fetching agent: ", err);
      toast({
        title: "Error updating auto allocation status",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  console.log(task);
  const selectChange = (e) => {
    const selectedTask = e.target.value;
    setTask(selectedTask); // Update selected task state immediately
    if (selectedTask !== "") {
      handleTaskFilter(selectedTask); // Call filter function with updated value
    } else {
      setTaskData([]); // Clear task data when "Select Task" is chosen
    }
  };

  const selectChangeOfStatus = (e) => {
    const selectedStatus = e.target.value;
    setStatus(selectedStatus); // Update selected task state immediately
    if (selectedStatus === "") {
      handleStatusFilter("Free"); // Call filter function with updated value
    } else {
      handleStatusFilter(selectedStatus); // Clear task data when "Select Task" is chosen
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showOkModal = () => {
    setIsModalVisible(false);
  };

  const showModalCancel = () => {
    setIsModalVisible(false);
  };

  const [visibleTaskModal, setVisibleTaskModal] = useState({});

  const showModalTask = (taskId) => {
    setVisibleTaskModal((prev) => ({ ...prev, [taskId]: true }));
  };

  const showModalCancelTask = (taskId) => {
    setVisibleTaskModal((prev) => ({ ...prev, [taskId]: false }));
  };

  const handleOptionChange = (event) => {
    setAutoAllocation((prev) => ({
      ...prev,
      autoAllocationType: event.target.value,
    }));
  };

  const handleRadioChange = (event) => {
    setAutoAllocation((prev) => ({
      ...prev,
      priorityType: event.target.value,
    }));
  };

  const submitAutoAllocation = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/admin/auto-allocation/add`,
        {
          autoAllocationType: autoAllocation.autoAllocationType,
          expireTime: autoAllocation.expireTime,
          maxRadius: autoAllocation.maxRadius,
          priorityType: autoAllocation.priorityType,
        },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 201) {
        // const {data} = response.data;
        toast({
          title: "Auto allocation added successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log("Error in fetching agent: ", err);
      toast({
        title: "Error adding auto allocation",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const handleStatusFilter = async (selectedStatus) => {
    try {
      console.log(token);
      const response = await axios.get(
        `${BASE_URL}/admin/delivery-management/agent`,
        {
          params: { filter: selectedStatus }, // Use params object for query parameters
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 201) {
        // const {data} = response.data;
        setAgentData(response.data.data);
      }
    } catch (err) {
      console.log("Error in fetching agent: ", err);
    }
  };

  const handleGetAllAgent = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/agents/all-agents`, {
        // Use params object for query parameters
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        // const {data} = response.data;
        console.log(response.data.data);
        setAllAgentData(response.data.data);
      }
    } catch (err) {
      console.log("Error in fetching agent: ", err);
    }
  };

  const handleSearch = async (searchOrderId) => {
    setLoading(true);
    try {
      console.log(searchOrderId);
      console.log(token);
      const response = await axios.get(
        `${BASE_URL}/admin/delivery-management/get-order-id`,
        {
          params: { orderId: searchOrderId },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        // const {data} = response.data;
        console.log(response.data.data);
        setTaskData(response.data.data);
        toast({
          title: "Order id fetched successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(err);
      toast({
        title: "Error fetching order id",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };
  const handleAgentSearch = async (agentName) => {
    setLoading(true);
    try {
      console.log(agentName);
      console.log(token);
      const response = await axios.get(
        `${BASE_URL}/admin/delivery-management/agent-name`,
        {
          params: { fullName: agentName },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        // const {data} = response.data;
        console.log(response.data);
        setAgentData(response.data);
        toast({
          title: "Agent fetched successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(err);
      toast({
        title: "Error fetching agent",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // let styleMap

  // Initialize the map
  useEffect(() => {
    getAuthToken();
    handleStatusFilter("Free");
    handleGetAllAgent();
    getAutoAllocation();
    //  console.log("Token", authToken)
    const mapProps = {
      center: [8.528818999999999, 76.94310683333333],
      traffic: true,
      zoom: 12,
      geolocation: true,
      clickableIcons: true,
    };

    const mapplsClassObject = new mappls();
    if (allAgentData && authToken) {
      mapplsClassObject.initialize(`${authToken}`, async () => {
        if (mapContainerRef.current) {
          console.log("Initializing map...");
          const map = await mapplsClassObject.Map({
            id: "map",
            properties: mapProps,
          });

          if (map && typeof map.on === "function") {
            console.log("Map initialized successfully.");
            map.on("load", () => {
              console.log("Map loaded.");
              setMapObject(map); // Save the map object to state
            });
          } else {
            console.error(
              "mapObject.on is not a function or mapObject is not defined"
            );
          }
        } else {
          console.error("Map container not found");
        }
      });
    }
  }, [authToken]);

  // Add markers once agentData is fetched
  useEffect(() => {
    if (mapObject && allAgentData) {
      const markerProps = {
        fitbounds: true,
        fitboundOptions: { padding: 120, duration: 1000 },
        width: 100,
        height: 100,
        clusters: true,
        clustersOptions: { color: "blue", bgcolor: "red" },
        offset: [0, 10],
        draggable: true,
      };

      console.log("Adding markers...");
      const approvedAgents = allAgentData.filter(
        (agent) => agent.isApproved === "Approved"
      );
      console.log("Geofence", geofenceToggle);
      console.log("Approved agents", approvedAgents);
      const agentGeoData = {
        type: "FeatureCollection",
        features: approvedAgents.map((agent) => ({
          type: "Feature",
          properties: {
            htmlPopup: `Id:${agent._id} \n
                 Name: ${agent.fullName} \n
                 Phone: ${agent.phoneNumber} `,
          },
          geometry: {
            type: "Point",
            coordinates: agent.location, // Assuming agent.location is [lat, lng]
          },
        })),
      };
      const mapplsObject = new mappls();
      agentGeoData.features.forEach(async (feature) => {
        const { coordinates } = feature.geometry;
        const { htmlPopup } = feature.properties;

        try {
          const agentMarker = await mapplsObject.Marker({
            map: mapObject,
            position: { lat: coordinates[0], lng: coordinates[1] },
            properties: { ...markerProps, popupHtml: htmlPopup },
          });
          await agentMarker.setIcon(
            "https://firebasestorage.googleapis.com/v0/b/famto-aa73e.appspot.com/o/Group%20427319784.svg?alt=media&token=5c0f0c9d-fdd5-4927-8428-4a65e91825af"
          );
          await agentMarker.setPopup(htmlPopup);
          console.log(`Marker added for location: ${htmlPopup}`);
        } catch (error) {
          console.error("Error adding marker:", error);
        }
      });
    }
  }, [mapObject, allAgentData]);

  const handleTaskFilter = async (selectedTask) => {
    try {
      console.log(token);
      const response = await axios.get(
        `${BASE_URL}/admin/delivery-management/task`,
        {
          params: { filter: selectedTask }, // Use params object for query parameters
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 201) {
        // const {data} = response.data;
        setTaskData(response.data.data);
      }
    } catch (err) {
      console.log("Error in fetching agent: ", err);
    }
  };

  const showShopLocationOnMap = (coordinates, fullName, Id) => {
    const markerProps = {
      fitbounds: true,
      fitboundOptions: { padding: 120, duration: 1000 },
      width: 100,
      height: 100,
      clusters: true,
      clustersOptions: { color: "blue", bgcolor: "red" },
      offset: [0, 10],
      draggable: true,
    };

    console.log("Adding markers...");
    const agentGeoData = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            htmlPopup: `Id:${Id} \n
               Name: ${fullName} \n `,
          },
          geometry: {
            type: "Point",
            coordinates: coordinates, // Assuming agent.location is [lat, lng]
          },
        },
      ],
    };
    const mapplsObject = new mappls();
    agentGeoData.features.forEach(async (feature) => {
      const { coordinates } = feature.geometry;
      const { htmlPopup } = feature.properties;

      try {
        const agentMarker = await mapplsObject.Marker({
          map: mapObject,
          position: { lat: coordinates[0], lng: coordinates[1] },
          properties: { ...markerProps, popupHtml: htmlPopup },
        });
        await agentMarker.setIcon(
          "https://firebasestorage.googleapis.com/v0/b/famto-aa73e.appspot.com/o/admin_panel_assets%2FGroup%20427319913.svg?alt=media&token=b57902c6-aa15-45f4-a825-978dce404687"
        );
        await agentMarker.setPopup(htmlPopup);
        mapObject.setView([coordinates[0], coordinates[1]], 17);
        console.log(`Marker added for location: ${htmlPopup}`);
      } catch (error) {
        console.error("Error adding marker:", error);
      }
    });
  };

  const showAgentLocationOnMap = (coordinates, fullName, Id, phoneNumber) => {
    const markerProps = {
      fitbounds: true,
      fitboundOptions: { padding: 120, duration: 1000 },
      width: 100,
      height: 100,
      clusters: true,
      clustersOptions: { color: "blue", bgcolor: "red" },
      offset: [0, 10],
      draggable: true,
    };

    console.log("Adding markers...");
    const agentGeoData = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            htmlPopup: `Id:${Id} \n
               Name: ${fullName} \n
               Phone Number: ${phoneNumber} `,
          },
          geometry: {
            type: "Point",
            coordinates: coordinates, // Assuming agent.location is [lat, lng]
          },
        },
      ],
    };
    const mapplsObject = new mappls();
    agentGeoData.features.forEach(async (feature) => {
      const { coordinates } = feature.geometry;
      const { htmlPopup } = feature.properties;

      try {
        const agentMarker = await mapplsObject.Marker({
          map: mapObject,
          position: { lat: coordinates[0], lng: coordinates[1] },
          properties: { ...markerProps, popupHtml: htmlPopup },
        });
        await agentMarker.setIcon(
          "https://firebasestorage.googleapis.com/v0/b/famto-aa73e.appspot.com/o/Group%20427319784.svg?alt=media&token=5c0f0c9d-fdd5-4927-8428-4a65e91825af"
        );
        await agentMarker.setPopup(htmlPopup);
        mapObject.setView([coordinates[0], coordinates[1]], 17);
        console.log(`Marker added for location: ${htmlPopup}`);
      } catch (error) {
        console.error("Error adding marker:", error);
      }
    });
  };

  const handleGeofenceSwitch = (taskId) => {
    setGeofenceToggle((prevToggle) => {
      const newToggle = !prevToggle;
      fetchAgentUsingGeofence(taskId, newToggle); // Pass the newToggle value to fetchAgentUsingGeofence
      return newToggle;
    });
  };

  const fetchAgentUsingGeofence = async (taskId, newToggle) => {
    try {
      console.log(token);
      const response = await axios.post(
        `${BASE_URL}/admin/delivery-management/agents-in-geofence/${taskId}`,
        {
          geofenceStatus: newToggle,
        },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setGeofenceAgentData(response.data.data);
        toast({
          title: "Agent fetched successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      console.log(geofenceAgentData);
    } catch (err) {
      console.log("Error in fetching agent: ", err);
      toast({
        title: "Error fetching  agent",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const getAutoAllocation = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/admin/auto-allocation/get`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setAutoAllocation(response.data.data);
        setAutoAllocationStatus(response.data.data.isActive);
      }
      console.log(autoAllocation);
    } catch (err) {
      console.log("Error in fetching auto allocation: ", err);
    }
  };

  const handleManualAssignChange = (data) => {
    setManualAssign({ _id: data._id, name: data.name });
    console.log(data._id);
  };

  const handleSendNotification = async (taskId) => {
    try {
      console.log(token);
      const response = await axios.post(
        `${BASE_URL}/admin/delivery-management/assign-task/${taskId}`,
        {
          agentId: manualAssign._id,
        },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        toast({
          title: "Notification send successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log("Error in sending notification: ", err);
      toast({
        title: "Error sending notification",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <SidebarDelivery />
      <div className="p-5 pl-[75px] bg-gray-100 h-screen">
        <p className="text-[18px] font-semibold mt-5">
          {" "}
          <ArrowLeftOutlined /> Delivery Management
        </p>
        <div className="bg-white rounded-lg flex justify-between p-5 mt-5 ">
          <div>
            <select className="bg-blue-50 p-2 rounded-md" name="day">
              <option>Today</option>
              <option>Tomorrow</option>
            </select>
            <select className="bg-blue-50 p-2 ml-5 rounded-md" name="agent">
              <option>All Agents</option>
              <option>Agents</option>
            </select>
          </div>
          <div className="flex gap-8 items-center">
            <SettingOutlined
              className="p-4 bg-gray-200 rounded-2xl"
              onClick={showModal}
            />
            <Modal
              onOk={showOkModal}
              onCancel={showModalCancel}
              open={isModalVisible}
              width="600px"
              centered
              footer={null}
            >
              <div>
                <form onSubmit={submitAutoAllocation}>
                  <div>
                    <div className="flex mt-5">
                      <label className="text-[16px] mr-5 font-semibold">
                        Request expires
                      </label>
                      <input
                        type="text"
                        name="expireTime"
                        className="w-2/4 border border-gray-200 rounded-lg pl-2 outline-none focus:outline-none h-9"
                        value={autoAllocation.expireTime}
                        onChange={handleChange}
                      />
                      <div>
                        <p className="font-semibold text-[16px] ml-5">sec</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-[18px] mb-3 font-semibold">
                        Set auto allocation
                      </label>
                      <div className="flex items-center ">
                        <input
                          type="radio"
                          id="send-to-all"
                          name="autoAllocationType"
                          value="All"
                          onChange={handleOptionChange}
                          checked={autoAllocation.autoAllocationType === "All"}
                          className=""
                        />
                        <label
                          htmlFor="send-to-all"
                          className="ml-2 font-semibold"
                        >
                          Send-to-all
                        </label>
                      </div>
                      <div className="flex items-center ">
                        <input
                          type="radio"
                          id="nearest-available"
                          name="autoAllocationType"
                          value="Nearest"
                          onChange={handleOptionChange}
                          checked={
                            autoAllocation.autoAllocationType === "Nearest"
                          }
                          className=""
                        />
                        <label
                          htmlFor="nearest-available"
                          className="ml-2 font-semibold"
                        >
                          Nearest Available
                        </label>
                      </div>
                    </div>
                    {autoAllocation.autoAllocationType === "All" && (
                      <div>
                        <p className="text-gray-600 mt-5 text-[14px]">
                          Force assigns the task to Agent based on availability
                          and distance
                        </p>
                        <div className="flex mt-5">
                          <label className="text-[18px] font-semibold mr-5">
                            Maximum Radius
                          </label>
                          <input
                            type="text"
                            name="maxRadius"
                            value={autoAllocation.maxRadius}
                            className="w-2/4 border border-gray-200 rounded-lg pl-2 outline-none focus:outline-none h-9"
                            onChange={handleChange}
                          />
                          <div>
                            <p className="font-semibold text-[16px] ml-5">Km</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {autoAllocation.autoAllocationType === "Nearest" && (
                      <p className="mt-5">
                        {`Sends the task request notification to the Agent
                        (maximum limit: 500 Agent) available in
                        the task time-slot. task gets assigned to the "Agent who
                        accepts the task request first. If no Agent accepts
                        the task, it remains unassigned.`}
                      </p>
                    )}
                    <div className="grid">
                      <label className="text-[18px] mt-3 font-semibold">
                        Prioritize
                      </label>
                      <div className="flex mt-2 gap-2">
                        <input
                          type="radio"
                          name="priorityType"
                          value="Default"
                          checked={autoAllocation.priorityType === "Default"}
                          onChange={handleRadioChange}
                        />
                        <label className="font-semibold">Default</label>
                      </div>
                      <div className="flex">
                        <input
                          type="radio"
                          name="priorityType"
                          value="Monthly-salaried"
                          checked={
                            autoAllocation.priorityType === "Monthly-salaried"
                          }
                          onChange={handleRadioChange}
                        />
                        <label className="font-semibold ml-2">
                          Monthly salaried employees{" "}
                        </label>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-5">
                      <button
                        onClick={showModalCancel}
                        className="bg-blue-50 p-3 rounded-lg w-1/2 font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={showOkModal}
                        type="submit"
                        className="bg-teal-800 text-white p-3 w-1/2 rounded-lg"
                      >
                        Apply Auto Allocation
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </Modal>

            <p className="font-medium">
              Auto Allocation{" "}
              <Switch
                className="ml-2"
                value={autoAllocationStatus}
                onChange={autoAllocationStatusUpdate}
              />
            </p>
          </div>
        </div>
        <div className="flex gap-2 mt-5">
          <div className="w-1/4 rounded-lg bg-white">
            <div className="bg-teal-800 text-white p-5 rounded-lg flex">
              Tasks{" "}
              <p className="ms-[240px] bg-white text-teal-800 font-bold rounded-full w-[25px] h-[25px] flex justify-center items-center">
                {taskData.length}
              </p>
            </div>
            <div className="w-full p-2 mt-4">
              <select
                className="border-2 border-zinc-200 bg-gray-100 rounded-lg p-2 w-full focus:outline-none"
                name="task"
                value={task}
                onChange={selectChange} // Update state and call handleTaskFilter
              >
                <option value="" hidden disabled>
                  Select Task
                </option>
                <option value="Unassigned">Unassigned Tasks </option>
                <option value="Assigned">Assigned Tasks</option>
                <option value="Completed">Completed Tasks</option>
              </select>
              <input
                type="search"
                className="border-2 border-zinc-200 bg-white rounded-lg mt-5 mb-5 p-2 w-full focus:outline-none"
                name="search"
                placeholder="Search order Id"
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
              />
              <div className="px-5 bg-white max-h-[300px] overflow-y-auto">
                {/* {task === "Unassigned" && ( */}
                <div>
                  {taskData.map((data) => (
                    <Card className="bg-zinc-100 mt-3" key={data._id}>
                      <CardBody>
                        <Typography
                          variant="h5"
                          color=""
                          className="text-[15px]"
                        >
                          {`${formatDate(data.createdAt)} ${formatTime(
                            data.createdAt
                          )}`}
                        </Typography>
                        <Typography className="text-[16px]">
                          {data.pickupDetail.pickupAddress.fullName}
                        </Typography>
                        <Typography className="text-[15px]">
                          {data.pickupDetail.pickupAddress.area}
                        </Typography>
                        <Typography className="flex justify-between mt-3">
                          <Button
                            className=" bg-gray-100 text-black text-[12px] p-4 font-semibold"
                            onClick={() =>
                              showShopLocationOnMap(
                                data.pickupDetail.pickupLocation,
                                data.pickupDetail.pickupAddress.fullName,
                                data._id
                              )
                            }
                          >
                            View on Map
                          </Button>

                          {data.taskStatus === "Assigned" ||
                          data.taskStatus === "Completed" ? (
                            <div>
                              <Button
                                className=" bg-teal-800 text-white text-[12px] p-4 font-semibold"
                                onClick={() => showModalTask(data._id)}
                              >
                                View Details
                              </Button>
                              <Modal
                                onOk={() => showModalCancelTask(data._id)}
                                onCancel={() => showModalCancelTask(data._id)}
                                open={visibleTaskModal[data._id] || false}
                                width="600px"
                                centered
                                title="Task details"
                                footer={null}
                              >
                                <div>
                                  <div className="flex gap-7 text-[18px] font-normal mt-5">
                                    <div className="w-1/2 grid gap-3">
                                      <div className="flex">
                                        <div className="text-gray-500 text-[16px] w-full">
                                          Task Id
                                        </div>
                                        <p className="text-[15px] ms-[5px]">
                                          {data._id}
                                        </p>
                                      </div>
                                      <div className="flex">
                                        <label className="text-gray-500 text-[16px]">
                                          Delivery Method
                                        </label>
                                        <p className="text-[15px] ms-[15px]">
                                          {
                                            data.orderId.orderDetail
                                              .deliveryMode
                                          }
                                        </p>
                                      </div>
                                    </div>
                                    <div className="w-1/2 grid gap-3">
                                      <div className="flex ">
                                        <label className="text-gray-500 text-[15px]">
                                          Agent Name
                                        </label>
                                        <p className="text-[15px] ms-[15px]">
                                          {data.agentId.fullName}
                                        </p>
                                      </div>
                                      <div className="flex ">
                                        <label className="text-gray-500 text-[15px]">
                                          Agent ID
                                        </label>
                                        <p className="text-[15px] ms-[10px]">
                                          {data.agentId._id}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <p className="mt-5 text-lg font-semibold">
                                      Task status
                                    </p>
                                    <div className="mt-5">
                                      <Stepper
                                        index={activeStep}
                                        orientation="vertical"
                                        colorScheme="teal"
                                        gap="2"
                                      >
                                        <Step
                                          key={data.orderId.merchantId}
                                          className="flex gap-5 size-20"
                                        >
                                          <StepIndicator>
                                            <StepStatus
                                              complete={
                                                <div className="bg-teal-500 w-8 h-8 flex items-center justify-center rounded-full text-white font-bold">
                                                  1
                                                </div>
                                              }
                                              incomplete={
                                                <div className="bg-gray-300 w-8 h-8 flex items-center justify-center rounded-full text-gray-700 font-bold">
                                                  1
                                                </div>
                                              }
                                              active={
                                                <div className="bg-teal-800 w-8 h-8 flex items-center justify-center rounded-full text-white font-bold">
                                                  1
                                                </div>
                                              }
                                            />
                                          </StepIndicator>
                                          <Box
                                            flexShrink="0"
                                            className="ml-4 w-[200px]"
                                          >
                                            <StepTitle className="font-semibold text-[16px]">
                                              {
                                                data.orderId.orderDetail
                                                  .pickupAddress.fullName
                                              }
                                            </StepTitle>
                                            <StepDescription className="text-sm text-gray-500">
                                              By Admin
                                            </StepDescription>
                                            <Step className="text-sm text-gray-500">
                                              {
                                                data.orderId.orderDetail
                                                  .pickupAddress.area
                                              }
                                            </Step>
                                          </Box>
                                          <Box
                                            flexShrink="0"
                                            className="ml-[70px]"
                                          >
                                            <Step>
                                              Expected Time
                                              {`${formatDate(
                                                data.orderId.createdAt
                                              )} ${formatTime(
                                                data.orderId.createdAt
                                              )}`}
                                            </Step>
                                            <Step>
                                              Pick up Time{" "}
                                              {`${formatDate(
                                                data.orderId.createdAt
                                              )} ${formatTime(
                                                data.orderId.createdAt
                                              )}`}
                                            </Step>
                                          </Box>
                                          <StepSeparator className="mt-[18px]" />
                                        </Step>

                                        {/* <div className="w-[60%] border-t border-dotted border-gray-400 my-[5px] mx-[110px]"></div> */}
                                        <div className="relative flex items-center ml-[60px] my-[5px]">
                                          {/* Oval container on the left */}
                                          <div className="absolute left-0 bg-blue-50 w-[110px] h-[24px] flex items-center justify-center rounded-full text-black font-semibold">
                                            <span className="text-sm">
                                              In transit
                                            </span>
                                          </div>

                                          {/* Dotted separator */}
                                          <div className="w-[260px] border-t border-dotted border-gray-900 my-[5px] mx-[100px]"></div>

                                          {/* Oval container on the right */}
                                          <div className="absolute right-0 bg-blue-50 w-[140px] h-[24px] flex items-center justify-center rounded-full text-black ">
                                            <span className="text-sm font-semibold">
                                              <span className="text-gray-400 mr-1">
                                                Distance
                                              </span>{" "}
                                              {
                                                data.orderId.orderDetail
                                                  .distance
                                              }
                                              Kms
                                            </span>
                                          </div>
                                        </div>

                                        <Step
                                          key={data.orderId.customerId}
                                          className="flex gap-5 size-20"
                                        >
                                          <StepIndicator>
                                            <StepStatus
                                              complete={
                                                <div className="bg-teal-500 w-8 h-8 flex items-center justify-center rounded-full text-white font-bold">
                                                  2
                                                </div>
                                              }
                                              incomplete={
                                                <div className="bg-gray-300 w-8 h-8 flex items-center justify-center rounded-full text-gray-700 font-bold">
                                                  2
                                                </div>
                                              }
                                              active={
                                                <div className="bg-teal-800 w-8 h-8 flex items-center justify-center rounded-full text-white font-bold">
                                                  2
                                                </div>
                                              }
                                            />
                                          </StepIndicator>
                                          <Box
                                            flexShrink="0"
                                            className="ml-4 w-[200px]"
                                          >
                                            <StepTitle className="font-semibold text-[16px]">
                                              {
                                                data.orderId.orderDetail
                                                  .deliveryAddress.fullName
                                              }
                                            </StepTitle>
                                            <StepDescription className="text-sm text-gray-500">
                                              By Admin
                                            </StepDescription>
                                            <Step className="text-sm text-gray-500">
                                              {
                                                data.orderId.orderDetail
                                                  .deliveryAddress.flat
                                              }
                                              {
                                                data.orderId.orderDetail
                                                  .deliveryAddress.area
                                              }
                                              {
                                                data.orderId.orderDetail
                                                  .deliveryAddress.landMark
                                              }
                                            </Step>
                                          </Box>
                                          <Box
                                            flexShrink="0"
                                            className="ml-[70px]"
                                          >
                                            <Step>
                                              Expected Time{" "}
                                              {`${formatDate(
                                                data.orderId.orderDetail
                                                  .deliveryTime
                                              )} ${formatTime(
                                                data.orderId.orderDetail
                                                  .deliveryTime
                                              )}`}
                                            </Step>
                                            <Step>
                                              Delivery Time{" "}
                                              {`${formatDate(
                                                data.orderId.orderDetail
                                                  .deliveryTime
                                              )} ${formatTime(
                                                data.orderId.orderDetail
                                                  .deliveryTime
                                              )}`}
                                            </Step>
                                          </Box>
                                          <StepSeparator className="my-2" />
                                        </Step>
                                      </Stepper>
                                    </div>
                                  </div>
                                </div>
                              </Modal>
                            </div>
                          ) : (
                            <div>
                              <Button
                                className=" bg-teal-800  text-white text-[12px] p-4  font-semibold"
                                onClick={() => showModalTask(data._id)}
                              >
                                Assign Agent
                              </Button>
                              <Modal
                                title="Assign Agent"
                                onOk={() => showModalCancelTask(data._id)}
                                onCancel={() => showModalCancelTask(data._id)}
                                open={visibleTaskModal[data._id] || false}
                                width="600px"
                                centered
                                footer={null}
                                key={data._id}
                              >
                                <div>
                                  <div className="flex mt-5">
                                    <label className="w-1/3 text-gray-600">
                                      Task ID
                                    </label>
                                    <p className="font-semibold">{data._id}</p>
                                  </div>
                                  <div className="flex mt-5">
                                    <label className="w-1/3 text-gray-600">
                                      Geofence
                                    </label>
                                    <p className="font-semibold">
                                      <Switch
                                        value={geofenceToggle}
                                        onClick={() =>
                                          handleGeofenceSwitch(data._id)
                                        }
                                      />
                                    </p>
                                  </div>
                                  <div className="flex mt-5 ">
                                    <label className="w-1/3 text-gray-600">
                                      Agent
                                    </label>
                                    <Menu>
                                      <MenuButton
                                        as={Button}
                                        rightIcon={<ChevronDownIcon />}
                                        className="text-gray-500 font-normal w-[300px] text-left"
                                      >
                                        {manualAssign
                                          ? manualAssign.name
                                          : "Select agent"}
                                      </MenuButton>
                                      <MenuList className="h-[100px] overflow-y-auto">
                                        {geofenceAgentData.map((data) => (
                                          <MenuItem
                                            key={data._id}
                                            className="h-[70px]"
                                            value={data._id}
                                            onClick={() =>
                                              handleManualAssignChange(data)
                                            }
                                          >
                                            <div className="justify-between items-center w-[300px]">
                                              <div className="flex-1 flex justify-between">
                                                <span className="font-semibold">
                                                  {data._id}
                                                  {data.workStructure ===
                                                  "Fish & Meat" ? (
                                                    <Badge
                                                      bg="red.500"
                                                      className="w-[15px] h-[14px] ml-3"
                                                    ></Badge>
                                                  ) : (
                                                    ""
                                                  )}
                                                </span>
                                                <span
                                                  className={
                                                    data.status === "Active"
                                                      ? "text-green-400 font-semibold"
                                                      : data.status ===
                                                        "Inactive"
                                                      ? "text-gray-500 font-semibold"
                                                      : data.status === "Busy"
                                                      ? "text-red-500 font-semibold"
                                                      : "text-red-500 font-semibold"
                                                  }
                                                >
                                                  {data.status}
                                                </span>
                                              </div>
                                              <div className="flex-1 flex justify-between">
                                                <span className="font-semibold">
                                                  {data.name}
                                                </span>
                                                <span className="font-semibold">
                                                  {data.distance} Kms
                                                </span>
                                              </div>
                                            </div>
                                          </MenuItem>
                                        ))}
                                      </MenuList>
                                    </Menu>
                                  </div>
                                  <div className="flex justify-end gap-5 mt-[120px]">
                                    <button
                                      className="bg-zinc-200 p-2 rounded-md px-4"
                                      onClick={() =>
                                        showModalCancelTask(data._id)
                                      }
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      className="bg-teal-800 text-white p-2 rounded-md px-4"
                                      onClick={() =>
                                        handleSendNotification(data._id)
                                      }
                                    >
                                      Assign Agent
                                    </button>
                                  </div>
                                </div>
                              </Modal>
                            </div>
                          )}
                        </Typography>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="w-2/4 bg-white h-[520px]">
            <div
              id="map"
              ref={mapContainerRef}
              style={{ width: "99%", height: "510px", display: "inline-block" }}
            ></div>
          </div>
          <div className="w-1/4 rounded-lg bg-white">
            <div className="bg-teal-800 text-white p-5 rounded-lg flex">
              Agents{" "}
              <p className="ms-[230px] bg-white text-teal-800 font-bold rounded-full w-[25px] h-[25px] flex justify-center items-center">
                {agentData.length}
              </p>
            </div>
            <div className="w-full p-2 bg-white ">
              <select
                className="border-2 border-zinc-200 bg-gray-100 rounded-lg  p-2 w-full focus:outline-none"
                name="tasks"
                value={status}
                onChange={selectChangeOfStatus}
              >
                <option value="Free">Free</option>
                <option value="Busy">Busy</option>
                <option value="Inactive">Inactive</option>
              </select>
              <input
                type="search"
                className="border-2 border-zinc-200 bg-white rounded-lg mt-5 p-2 w-full focus:outline-none"
                name="search"
                placeholder="Search agents"
                onChange={(e) => {
                  handleAgentSearch(e.target.value);
                }}
              />
            </div>
            <div className="px-5 max-h-[300px] overflow-y-auto">
              {agentData.map((data) => (
                <Card
                  className="bg-zinc-100 mt-3 flex"
                  key={data._id}
                  onClick={() =>
                    showAgentLocationOnMap(
                      data.location,
                      data.fullName,
                      data._id,
                      data.phoneNumber
                    )
                  }
                >
                  <div className="flex justify-between">
                    <div className="w-2/3">
                      <CardBody>
                        <Typography variant="h5" className="text-[15px]">
                          {data._id}
                        </Typography>
                        <Typography>{data.fullName}</Typography>
                        <Typography>{data.phoneNumber}</Typography>
                      </CardBody>
                    </div>
                    <div className="w-1/3 flex justify-center items-center">
                      <div className="bg-teal-800 rounded-full h-[40px] w-[40px] flex justify-center items-center text-white">
                        {data.taskCompleted}
                      </div>
                    </div>
                    {/* <p className="font-semibold mt-[85px]">Tasks</p> */}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeliveryManagement;
