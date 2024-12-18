import { useContext, useEffect, useRef, useState } from "react";
import GlobalSearch from "../../../components/GlobalSearch";
import { ArrowLeftOutlined, DownloadOutlined } from "@ant-design/icons";
import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Box,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
import { mappls } from "mappls-web-maps";
import { formatDate, formatTime } from "../../../utils/formatter";
import { useSocket } from "../../../context/SocketContext";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const mapplsClassObject = new mappls();

const OrderDetails = () => {
  const [orderDetail, setOrderDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [billData, setBillData] = useState([]);
  const mapContainerRef = useRef(null);
  const [mapObject, setMapObject] = useState(null);
  const { orderId } = useParams();
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [steps, setStep] = useState();
  const [authToken, setAuthToken] = useState("");

  const toast = useToast();
  const { token, role, userId } = useContext(UserContext);
  const { socket } = useSocket();
  const navigate = useNavigate();

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

    const agentGeoData = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            htmlPopup: `Id:${Id} |
               Name: ${fullName} |
               Phone Number: ${phoneNumber} `,
          },
          geometry: {
            type: "Point",
            coordinates: coordinates,
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
          "https://firebasestorage.googleapis.com/v0/b/famto-aa73e.appspot.com/o/admin_panel_assets%2Fgoride%20icon.svg?alt=media&token=71896ad1-d821-4ccd-996c-f3131fd09404"
        );
        await agentMarker.setPopup(htmlPopup);
        mapObject.setView([coordinates[0], coordinates[1]], 17);
      } catch (error) {
        console.error("Error adding marker:", error);
      }
    });
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

    const shopGeoData = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            htmlPopup: `Id:${Id} |
               Name: ${fullName} | `,
          },
          geometry: {
            type: "Point",
            coordinates: coordinates,
          },
        },
      ],
    };

    const mapplsObject = new mappls();

    shopGeoData.features.forEach(async (feature) => {
      const { coordinates } = feature.geometry;
      const { htmlPopup } = feature.properties;

      try {
        const shopMarker = await mapplsObject.Marker({
          map: mapObject,
          position: { lat: coordinates[0], lng: coordinates[1] },
          properties: { ...markerProps, popupHtml: htmlPopup },
        });
        await shopMarker.setIcon(
          "https://firebasestorage.googleapis.com/v0/b/famto-aa73e.appspot.com/o/admin_panel_assets%2Fshop-svgrepo-com.svg?alt=media&token=1da55e13-4b6e-477b-98ed-8024cfb89f24"
        );
        await shopMarker.setPopup(htmlPopup);
      } catch (error) {
        console.error("Error adding marker:", error);
      }
    });
  };

  const showDeliveryLocationOnMap = (
    coordinates,
    fullName,
    Id,
    phoneNumber
  ) => {
    const markerProps = {
      fitbounds: true,
      fitboundOptions: { padding: 120, duration: 1000 },
      width: 25,
      height: 40,
      clusters: true,
      clustersOptions: { color: "blue", bgcolor: "red" },
      offset: [0, 10],
      draggable: true,
    };

    const deliveryGeoData = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            htmlPopup: `Id:${Id} |
               Name: ${fullName} |
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
    deliveryGeoData.features.forEach(async (feature) => {
      const { coordinates } = feature.geometry;
      const { htmlPopup } = feature.properties;

      try {
        const houseMarker = await mapplsObject.Marker({
          map: mapObject,
          position: { lat: coordinates[0], lng: coordinates[1] },
          properties: { ...markerProps, popupHtml: htmlPopup },
        });
        await houseMarker.setIcon(
          "https://firebasestorage.googleapis.com/v0/b/famto-aa73e.appspot.com/o/admin_panel_assets%2Fhouse-svgrepo-com%201%201.svg?alt=media&token=3b738e30-6cf1-4f21-97d6-7f713831562f4"
        );
        await houseMarker.setPopup(htmlPopup);
      } catch (error) {
        console.error("Error adding marker:", error);
      }
    });
  };

  const showStepperLocationOnMap = (coordinates, by, Id, date) => {
    const markerProps = {
      fitbounds: true,
      fitboundOptions: { padding: 120, duration: 1000 },
      width: 25,
      height: 40,
      clusters: true,
      clustersOptions: { color: "blue", bgcolor: "red" },
      offset: [0, 10],
      draggable: true,
    };

    const stepperGeoData = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            htmlPopup: `Id:${Id} |
               By: ${by} |
               date: ${date} `,
          },
          geometry: {
            type: "Point",
            coordinates: coordinates, // Assuming agent.location is [lat, lng]
          },
        },
      ],
    };
    const mapplsObject = new mappls();
    stepperGeoData.features.forEach(async (feature) => {
      const { coordinates } = feature.geometry;
      const { htmlPopup } = feature.properties;

      try {
        const houseMarker = await mapplsObject.Marker({
          map: mapObject,
          position: { lat: coordinates[0], lng: coordinates[1] },
          properties: { ...markerProps, popupHtml: htmlPopup },
        });
        await houseMarker.setIcon(
          "https://firebasestorage.googleapis.com/v0/b/famto-aa73e.appspot.com/o/admin_panel_assets%2FGroup%20427319321.svg?alt=media&token=f76a13db-218d-48fe-8e54-d13955daeb30"
        );
        await houseMarker.setPopup(htmlPopup);
      } catch (error) {
        console.error("Error adding marker:", error);
      }
    });
  };

  const PolylineComponent = ({ map }) => {
    const polylineRef = useRef(null);
    const [coordinates, setCoordinates] = useState([]);
    const generatePolyline = async () => {
      try {
        const pickupLat = orderDetail.pickUpLocation[0];
        const pickupLng = orderDetail.pickUpLocation[1];
        const deliveryLat = orderDetail.deliveryLocation[0];
        const deliveryLng = orderDetail.deliveryLocation[1];
        const response = await axios.post(
          `${BASE_URL}/admin/map/get-polyline`,
          { pickupLat, pickupLng, deliveryLat, deliveryLng },
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          const coords = response.data.routes[0].geometry.coordinates.map(
            (coor) => ({
              lat: coor[1],
              lng: coor[0],
            })
          );
          setCoordinates(coords);
        }
      } catch (err) {
        console.log(`Error in getting polyline`);
      }
    };

    useEffect(() => {
      generatePolyline();
    }, []);

    useEffect(() => {
      if (coordinates.length > 0) {
        if (polylineRef.current) {
          mapplsClassObject.removeLayer({
            map: map,
            layer: polylineRef.current,
          });
        }

        polylineRef.current = mapplsClassObject.Polyline({
          map: map,
          path: coordinates,
          strokeColor: "#00CED1",
          strokeOpacity: 1.0,
          strokeWeight: 10,
          fitbounds: true,
        });
      }
    }, [coordinates]);
  };

  const markScheduledOrderAsViewed = async () => {
    try {
      console.log("Token mark", token);
      const endpoint = `${BASE_URL}/orders/scheduled-order-view/${orderId}/${userId}`;
      const response = await axios.put(
        endpoint,
        {},
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        console.log("Marked successfully");
      }
    } catch (err) {
      toast({
        title: "Error",
        description: `Error marking seen.`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }

    const getOrderDetail = async () => {
      if (orderId.charAt(0) === "O") {
        try {
          setIsLoading(true);
          const endpoint =
            role === "Admin"
              ? `${BASE_URL}/orders/admin/${orderId}`
              : `${BASE_URL}/orders/${orderId}`;

          const response = await axios.get(endpoint, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.status === 200) {
            const { data } = response.data;
            setOrderDetail(data);
            setBillData(data.billDetail);
          }
        } catch (err) {
          toast({
            title: "Error",
            description: `Error getting order detail`,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } finally {
          setIsLoading(false);
        }
      } else {
        try {
          setIsLoading(true);
          const endpoint =
            role === "Admin"
              ? `${BASE_URL}/orders/admin/scheduled-order/${orderId}`
              : `${BASE_URL}/orders/scheduled-order/${orderId}`;

          const response = await axios.get(endpoint, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.status === 200) {
            setOrderDetail(response.data.data);
            setBillData(response.data.data.billDetail);
            console.log("Scheduled order detail", response.data.data);
          }

          if (role === "Merchant" && !response.data.data.isViewed) {
            await markScheduledOrderAsViewed();
          }
        } catch (err) {
          toast({
            title: "Error",
            description: `Error getting order detail`,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      }
    };

    getOrderDetail();
  }, [token, orderId, userId]);

  useEffect(() => {
    if (orderDetail && mapObject) {
      if (orderId.charAt(0) === "O") {
        const coordinates = orderDetail?.agentLocation;
        showAgentLocationOnMap(
          coordinates,
          orderDetail?.deliveryAgentDetail?.name,
          orderDetail?.deliveryAgentDetail?._id,
          orderDetail?.deliveryAgentDetail?.phoneNumber
        );
        const shopCoordinates = orderDetail?.pickUpLocation;
        showShopLocationOnMap(
          shopCoordinates,
          orderDetail?.merchantDetail?.name,
          orderDetail?.merchantDetail?._id
        );
        const deliveryLocation = orderDetail?.deliveryLocation;
        showDeliveryLocationOnMap(
          deliveryLocation,
          orderDetail?.customerDetail?.name,
          "",
          orderDetail?.customerDetail?.address?.phoneNumber
        );
      }
    }

    let mappedSteps = [];
    orderDetail?.orderDetailStepper?.map((item) => {
      const addStep = (step, label, index) => {
        if (step) {
          mappedSteps.push({
            title: label,
            description: `by ${step?.by}`,
            id: step?.userId || "N/A",
            time: `${formatDate(step?.date)} | ${formatTime(step?.date)}`,
          });
          const date = `${formatDate(step?.date)} | ${formatTime(step?.date)}`;
          if (!item?.cancelled && step?.date) {
            setActiveStepIndex(index);
          }
          if (step?.location) {
            showStepperLocationOnMap(
              step.location,
              step?.by,
              step?.userId,
              date
            );
          }
        }
      };

      addStep(item?.created, "Created", mappedSteps.length);
      addStep(item?.assigned, "Assigned", mappedSteps.length);
      addStep(item?.accepted, "Accepted", mappedSteps.length);
      addStep(item?.pickupStarted, "Pickup Started", mappedSteps.length);
      addStep(
        item?.reachedPickupLocation,
        "Reached pickup location",
        mappedSteps.length
      );
      addStep(item?.deliveryStarted, "Delivery started", mappedSteps.length);
      addStep(
        item?.reachedDeliveryLocation,
        "Reached delivery location",
        mappedSteps.length
      );
      addStep(item?.noteAdded, "Note Added", mappedSteps.length);
      addStep(item?.signatureAdded, "Signature Added", mappedSteps.length);
      addStep(item?.imageAdded, "Image Added", mappedSteps.length);
      addStep(item?.completed, "Completed", mappedSteps.length);

      if (item?.cancelled) {
        mappedSteps.push({
          title: "Cancelled",
          description: `by ${item?.cancelled?.by} with Id ${
            item?.cancelled?.userId || "N/A"
          }
              on ${formatDate(item?.cancelled?.date)}, ${formatTime(
            item?.cancelled?.date
          )}`,
        });
        setActiveStepIndex(mappedSteps.length);
      }
    });

    setStep(mappedSteps);
  }, [mapObject, orderDetail]);

  useEffect(() => {
    if (activeStepIndex !== -1 && steps?.length > 0) {
      setActiveStep(activeStepIndex);
    }
  }, [activeStepIndex, steps]);

  const { activeStep, setActiveStep } = useSteps({
    index: activeStepIndex,
    count: steps?.length,
  });

  useEffect(() => {
    getAuthToken();

    const mapProps = {
      center: [8.528818999999999, 76.94310683333333],
      traffic: true,
      zoom: 12,
      geolocation: true,
      clickableIcons: true,
    };

    if (authToken) {
      mapplsClassObject.initialize(authToken, async () => {
        if (mapContainerRef.current) {
          const map = await mapplsClassObject.Map({
            id: "map",
            properties: mapProps,
          });

          if (map && typeof map.on === "function") {
            map.on("load", () => {
              setMapObject(map);
              setIsMapLoaded(true); // Save the map object to state
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

  useEffect(() => {
    let mappedSteps = [];
    socket?.on("newOrderCreated", ({ orderDetailStepper }) => {
      setOrderDetail((prev) => ({
        ...prev,
        orderDetailStepper: [
          ...prev.orderDetailStepper,
          { created: orderDetailStepper },
        ],
      }));
      // addStep(orderDetailStepper, "Created", mappedSteps.length, );
    });

    socket?.on("orderAccepted", ({ orderDetailStepper }) => {
      setOrderDetail((prev) => {
        return {
          ...prev,
          orderDetailStepper: [
            ...(prev.orderDetailStepper || []),
            { accepted: orderDetailStepper },
          ],
        };
      });
    });

    socket?.on("orderRejected", ({ orderDetailStepper }) => {
      setOrderDetail((prev) => ({
        ...prev,
        orderDetailStepper: [
          ...prev.orderDetailStepper,
          { orderDetailStepper },
        ],
      }));
    });

    socket?.on("agentOrderAccepted", ({ orderDetailStepper }) => {
      setOrderDetail((prev) => ({
        ...prev,
        orderDetailStepper: [
          ...prev.orderDetailStepper,
          { assigned: orderDetailStepper },
        ],
      }));
    });

    socket?.on("agentPickupStarted", ({ orderDetailStepper }) => {
      setOrderDetail((prev) => ({
        ...prev,
        orderDetailStepper: [
          ...prev.orderDetailStepper,
          { pickupStarted: orderDetailStepper },
        ],
      }));
    });

    socket?.on("reachedPickupLocation", ({ orderDetailStepper }) => {
      setOrderDetail((prev) => ({
        ...prev,
        orderDetailStepper: [
          ...prev.orderDetailStepper,
          { reachedPickupLocation: orderDetailStepper },
        ],
      }));
    });

    socket?.on("agentDeliveryStarted", ({ orderDetailStepper }) => {
      setOrderDetail((prev) => ({
        ...prev,
        orderDetailStepper: [
          ...prev.orderDetailStepper,
          { deliveryStarted: orderDetailStepper },
        ],
      }));
    });

    socket?.on("reachedDeliveryLocation", ({ orderDetailStepper }) => {
      setOrderDetail((prev) => ({
        ...prev,
        orderDetailStepper: [
          ...prev.orderDetailStepper,
          { reachedDeliveryLocation: orderDetailStepper },
        ],
      }));
    });

    socket?.on("agentOrderDetailUpdated", ({ orderDetailStepper }) => {
      setOrderDetail((prev) => ({
        ...prev,
        orderDetailStepper: [...prev.orderDetailStepper, orderDetailStepper],
      }));
    });

    socket?.on("orderCompleted", ({ orderDetailStepper }) => {
      setOrderDetail((prev) => ({
        ...prev,
        orderDetailStepper: [
          ...prev.orderDetailStepper,
          { completed: orderDetailStepper },
        ],
      }));
    });
    setStep(mappedSteps);

    return () => {
      socket?.off("newOrderCreated");
      socket?.off("orderAccepted");
      socket?.off("orderRejected");
      socket?.off("agentOrderAccepted");
      socket?.off("agentPickupStarted");
      socket?.off("reachedPickupLocation");
      socket?.off("agentDeliveryStarted");
      socket?.off("reachedDeliveryLocation");
      socket?.off("agentOrderDetailUpdated");
      socket?.off("orderCompleted");
    };
  }, [socket]);

  const downloadOrderBill = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post(
        `${BASE_URL}/orders/download-order-bill`,
        { orderId },
        {
          responseType: "blob",
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `Bill_(${orderId}).pdf`);
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      toast({
        title: "Error",
        description: `Error downloading invoice`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <div className="pl-[300px] bg-gray-100 min-w-fit">
        <nav className="p-5">
          <GlobalSearch />
        </nav>
        <div className="flex justify-between mx-5">
          <div>
            <p className="flex gap-[20px] mb-0">
              <ArrowLeftOutlined onClick={() => navigate("/all-orders")} />
              <p className="font-[600] mb-0">
                Order information #{orderDetail?._id}{" "}
                {orderDetail?.scheduledOrderId && (
                  <>
                    <span className="text-black me-2">of</span>
                    <span className="text-gray-500">
                      [ #{orderDetail?.scheduledOrderId} ]
                    </span>
                  </>
                )}
              </p>
            </p>
          </div>
          {orderId.charAt(0) === "O" && (
            <div>
              <button
                onClick={downloadOrderBill}
                className="bg-blue-100 px-4 p-2 rounded-md"
              >
                <DownloadOutlined /> Bill
              </button>
            </div>
          )}
        </div>
        <div className="flex bg-white mx-5 rounded-lg mt-5 gap-16 p-5">
          <div className="w-1/3">
            <div className="flex justify-between mb-[10px]">
              <label className="text-[14px] text-gray-500 w-3/5">
                Order Status
              </label>
              <p className="text-[14px] text-gray-900 font-[500] text-left w-2/5">
                {orderDetail.orderStatus}
              </p>
            </div>
            <div className="flex justify-between mb-[10px]">
              <label className="text-[14px] text-gray-500 w-3/5">
                Payment Status
              </label>
              <p className="text-[14px] text-gray-900 font-[500] text-left w-2/5">
                {orderDetail.paymentStatus}
              </p>
            </div>
            <div className="flex justify-between mb-[10px]">
              <label className="text-[14px] text-gray-500 w-3/5">
                Payment Mode
              </label>
              <p className="text-[14px] text-gray-900 font-[500] text-left w-2/5">
                {orderDetail.paymentMode}
              </p>
            </div>
            <div className="flex justify-between mb-[10px]">
              <label className="text-[14px] text-gray-500 w-3/5">
                Delivery Mode
              </label>
              <p className="text-[14px] text-gray-900 font-[500] text-left w-2/5">
                {orderDetail.deliveryMode}
              </p>
            </div>
          </div>

          <div className="h-[7rem] w-[2px] bg-gray-300 rounded-full"></div>

          <div className="w-1/3">
            <div className="flex justify-between mb-[10px]">
              <label className="text-[14px] text-gray-500 w-3/5">
                Delivery option
              </label>
              <p className="text-[14px] text-gray-900 font-[500] text-left w-2/5">
                {orderDetail.deliveryOption}
              </p>
            </div>
            {orderId.charAt(0) === "O" ? (
              <>
                <div className="flex justify-between mb-[10px]">
                  <label className="text-[14px] text-gray-500 w-3/5">
                    Vehicle Type
                  </label>
                  <p className="text-[14px] text-gray-900 font-[500] text-left w-2/5">
                    {orderDetail?.vehicleType}
                  </p>
                </div>
                <div className="flex justify-between mb-[10px]">
                  <label className="text-[14px] text-gray-500 w-3/5">
                    Order Time
                  </label>
                  <p className="text-[14px] text-gray-900 font-[500] text-left w-2/5">
                    {orderDetail.orderTime}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between mb-[10px]">
                  <label className="text-[14px] text-gray-500 w-3/5">
                    Order From
                  </label>
                  <p className="text-[14px] text-gray-900 font-[500] text-left w-2/5">
                    {orderDetail?.orderTime?.split("||")[0]}
                  </p>
                </div>
                <div className="flex justify-between mb-[10px]">
                  <label className="text-[14px] text-gray-500 w-3/5">
                    Order To
                  </label>
                  <p className="text-[14px] text-gray-900 font-[500] text-left w-2/5">
                    {orderDetail?.orderTime?.split("||")[1]}
                  </p>
                </div>
              </>
            )}
            <div className="flex justify-between mb-[10px]">
              <label className="text-[14px] text-gray-500 w-3/5">
                {orderId.charAt(0) === "O"
                  ? "Delivery Time"
                  : "Next Delivery Time"}
              </label>
              <p className="text-[14px] text-gray-900 font-[500] text-left w-2/5">
                {orderDetail.deliveryTime}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h1 className="text-[18px] font-semibold ml-5 mb-5">
            Customer Details
          </h1>
          <table className="w-full">
            <thead>
              <tr>
                {[
                  "Id",
                  "Name",
                  "Email",
                  "Phone",
                  "Address",
                  "Ratings to Delivery Agent",
                  "Rating by Delivery Agent",
                ].map((header) => (
                  <th
                    key={header}
                    className="bg-teal-800 text-white h-[70px] text-center"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="text-center bg-white h-20">
                <td className="underline underline-offset-2">
                  <Link
                    to={`/customer-detail/${orderDetail?.customerDetail?._id}`}
                  >
                    #{orderDetail?.customerDetail?._id}
                  </Link>
                </td>
                <td>{orderDetail?.customerDetail?.name}</td>
                <td>{orderDetail?.customerDetail?.email}</td>
                <td>{orderDetail?.customerDetail?.phone}</td>

                <td>
                  <div className="flex flex-col">
                    <small>
                      {orderDetail?.customerDetail?.address?.fullName}
                    </small>
                    <small>
                      {orderDetail?.customerDetail?.address?.phoneNumber}
                    </small>
                    <small>{orderDetail?.customerDetail?.address?.flat}</small>
                    <small>{orderDetail?.customerDetail?.address?.area}</small>
                    <small>
                      {orderDetail?.customerDetail?.address?.landmark}
                    </small>
                  </div>
                </td>
                <td>
                  <div className="flex flex-col">
                    <small>
                      {
                        orderDetail?.customerDetail?.ratingsToDeliveryAgent
                          ?.rating
                      }
                    </small>
                    <small>
                      {
                        orderDetail?.customerDetail?.ratingsToDeliveryAgent
                          ?.review
                      }
                    </small>
                  </div>
                </td>
                <td>
                  <div className="flex flex-col">
                    <small>
                      {
                        orderDetail?.customerDetail?.ratingsByDeliveryAgent
                          ?.rating
                      }
                    </small>
                    <small>
                      {
                        orderDetail?.customerDetail?.ratingsByDeliveryAgent
                          ?.review
                      }
                    </small>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-10">
          <h1 className="text-[18px] font-semibold ml-5 mb-5">
            Merchant Details
          </h1>
          <table className="w-full">
            <thead>
              <tr>
                {[
                  "Id",
                  "Name",
                  "Instructions by Customer",
                  "Merchant Earnings",
                  "Famto Earnings",
                ].map((header) => (
                  <th
                    key={header}
                    className="bg-teal-800 text-white h-[70px] text-center"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="text-center bg-white h-20">
                <td className="underline underline-offset-2">
                  <Link
                    to={`merchant-detail/${orderDetail?.merchantDetail?._id}`}
                  >
                    #{orderDetail?.merchantDetail?._id}
                  </Link>
                </td>
                <td>{orderDetail?.merchantDetail?.name}</td>
                <td>{orderDetail?.merchantDetail?.instructionsByCustomer}</td>
                <td>{orderDetail?.merchantDetail?.merchantEarnings}</td>
                <td>{orderDetail?.merchantDetail?.famtoEarnings}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {orderId.charAt(0) === "O" && (
          <div className="mt-10">
            <h1 className="text-[18px] font-semibold ml-5 mb-5">
              Delivery Agent Details
            </h1>
            <table className="w-full">
              <thead>
                <tr>
                  {[
                    "Id",
                    "Name",
                    "Team Name",
                    "Instruction by Customer",
                    "Time taken",
                    "Distance travelled",
                    "Delayed by",
                  ].map((header) => (
                    <th
                      key={header}
                      className="bg-teal-800 text-white h-[70px] text-center"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="text-center bg-white h-20">
                  <td className="underline underline-offset-2">
                    <Link
                      to={`/agent-detail/${orderDetail?.deliveryAgentDetail?._id}`}
                    >
                      #{orderDetail?.deliveryAgentDetail?._id}
                    </Link>
                  </td>
                  <td>{orderDetail?.deliveryAgentDetail?.name}</td>
                  <td>{orderDetail?.deliveryAgentDetail?.team}</td>
                  <td>
                    {orderDetail?.deliveryAgentDetail?.instructionsByCustomer}
                  </td>
                  <td>{orderDetail?.deliveryAgentDetail?.timeTaken}</td>
                  <td>{orderDetail?.deliveryAgentDetail?.distanceTravelled}</td>
                  <td>{orderDetail?.deliveryAgentDetail?.delayedBy}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <h1 className="text-[18px] font-semibold m-5">Order Details</h1>

        {/* Pick and Drop */}
        {orderDetail.deliveryMode === "Pick and Drop" && (
          <div>
            <table className="w-[96%] ms-[20px] me-auto border-2 border-gray-600">
              <thead>
                <tr>
                  {["Items Type", "Dimensions", "Weight Range"].map(
                    (header) => (
                      <th
                        key={header}
                        className="bg-teal-800 text-white h-[70px] text-center p-5 "
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {orderDetail.items.map((item) => (
                  <tr className="text-center bg-white h-20" key={item.itemName}>
                    <td>{item.itemName}</td>
                    <td>
                      {item.length}x{item.width}x{item.height}
                    </td>
                    <td>{item.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Custom Order */}
        {orderDetail.deliveryMode === "Custom Order" && (
          <div>
            <table className="w-[96%] ms-[20px] me-auto border-2 border-gray-600">
              <thead>
                <tr>
                  {["Items", "Quantity", "Unit", "Image"].map((header) => (
                    <th
                      key={header}
                      className="bg-teal-800 text-white h-[70px] text-center p-5 "
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orderDetail.items.map((item) => (
                  <tr className="text-center bg-white h-20" key={item.itemName}>
                    <td>{item.itemName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.numOfUnits}</td>
                    <td className="flex justify-center items-center">
                      <img
                        src={item.itemImageURL}
                        alt={item.itemName}
                        className="w-[100px] h-[100px] object-contain"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Home Delivery and Take Away */}
        {(orderDetail.deliveryMode === "Take Away" ||
          orderDetail.deliveryMode === "Home Delivery") && (
          <div>
            <table className="w-[96%] ms-[20px] me-auto border-2 border-gray-600">
              <thead>
                <tr>
                  {["Items", "Quantity", "Amount"].map((header) => (
                    <th
                      key={header}
                      className="bg-teal-800 text-white h-[70px] text-center p-5"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orderDetail.items.map((item) => (
                  <tr className="text-center bg-white h-20" key={item.itemName}>
                    <td>{item.itemName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className={`${orderId.charAt(0) === "O" ? "" : "mb-5"}`}>
          <h1 className="text-[18px] font-semibold m-5">Bill Summary</h1>
          <div className="w-[96%] ms-[20px] me-auto border-2 border-gray-600">
            <div className="flex justify-between mx-5 m-3">
              <label>Price</label>
              <p>
                {orderDetail.billDetail ? orderDetail.billDetail.itemTotal : ""}
              </p>
            </div>
            <div className="flex justify-between mx-5 m-3">
              <label>Delivery Charges</label>
              <p>
                {orderDetail.billDetail
                  ? orderDetail.billDetail.deliveryCharge
                  : ""}
              </p>
            </div>
            <div className="flex justify-between mx-5 m-3">
              <label>Added Tip</label>
              <p>
                {orderDetail.billDetail ? orderDetail.billDetail.addedTip : ""}
              </p>
            </div>
            <div className="flex justify-between mx-5 m-3">
              <label>Discount</label>
              <p>{orderDetail?.billDetail?.discountedAmount || 0}</p>
            </div>
            <div className="flex justify-between mx-5 m-3">
              <label>Sub Total</label>
              <p>{orderDetail?.billDetail?.subTotal}</p>
            </div>
            <div className="flex justify-between mx-5 m-3">
              <label>Taxes & Fees</label>
              <p>{orderDetail?.billDetail?.taxAmount}</p>
            </div>
          </div>
          <div className="bg-teal-800 flex justify-between p-5 text-white text-[16px] font-semibold w-[96%] ms-[20px] me-auto">
            <label>Net Payable Amount</label>
            <p>{orderDetail?.billDetail?.grandTotal}</p>
          </div>
        </div>
        {orderId.charAt(0) === "O" && (
          <>
            <h1 className="text-[18px] font-semibold m-5">
              Order Activity log
            </h1>
            <div className="bg-white mx-5 p-5 rounded-lg flex justify-between gap-20 items-center">
              <div className="bg-gray-200 rounded-full w-[60px] h-[60px]">
                <img
                  src={orderDetail?.deliveryAgentDetail?.avatar}
                  className=" rounded-full w-[60px] h-[60px]"
                  alt=""
                />
              </div>
              <div className="flex justify-around w-1/4">
                <label className="text-gray-500">Agent Name</label>
                <p className="text-gray-900 font-[500]">
                  {orderDetail?.deliveryAgentDetail?.name}
                </p>
              </div>
              <div className="flex justify-around w-1/4">
                <label className="text-gray-500">Total Distance</label>
                <p className="text-gray-900 font-[500]">
                  {orderDetail?.deliveryAgentDetail?.distanceTravelled}
                </p>
              </div>
              <div className="flex justify-around w-1/4 ">
                <label className="text-gray-500">Total Time</label>
                <p className="text-gray-900 font-[500]">
                  {orderDetail?.deliveryAgentDetail?.timeTaken}
                </p>
              </div>
            </div>
            <div className="flex m-5 mx-10 ">
              <div className="w-1/2 ">
                {activeStepIndex !== null && (
                  <Stepper
                    index={activeStep}
                    orientation="vertical"
                    height="800px"
                    colorScheme="teal"
                    m="20px"
                    gap="0"
                  >
                    {steps?.map((step, index) => (
                      <Step key={index}>
                        <StepIndicator>
                          <StepStatus
                            complete={<StepIcon />}
                            incomplete={<StepNumber />}
                            active={<StepNumber />}
                          />
                        </StepIndicator>

                        <Box flexShrink="0">
                          <StepTitle>{step?.title}</StepTitle>
                          <div className="flex items-center gap-4">
                            <StepDescription>
                              {step?.description}
                            </StepDescription>
                            <StepDescription>#ID {step?.id}</StepDescription>
                          </div>
                          <StepDescription className="mt-2">
                            {step?.time}
                          </StepDescription>
                        </Box>

                        <StepSeparator />
                      </Step>
                    ))}
                  </Stepper>
                )}
              </div>
              <div className="w-3/4 bg-white h-[820px]">
                <div
                  id="map"
                  ref={mapContainerRef}
                  style={{
                    width: "99%",
                    height: "810px",
                    display: "inline-block",
                  }}
                >
                  {isMapLoaded && <PolylineComponent map={mapObject} />}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OrderDetails;
