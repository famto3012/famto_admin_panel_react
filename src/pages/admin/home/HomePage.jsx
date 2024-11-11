import { useContext, useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import GlobalSearch from "../../../components/GlobalSearch";
import HomeComponents from "../../../components/HomeComponents";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { LineChart } from "@saas-ui/charts";
import { UserContext } from "../../../context/UserContext";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "../../../firebase";
import { Switch } from "antd";
import axios from "axios";
import { useSocket } from "../../../context/SocketContext";
import { useNavigate } from "react-router-dom";

import { formatDate } from "../../../utils/formatter";
import { useSoundContext } from "../../../context/SoundContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CronJob } from "cron";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const HomePage = () => {
  const [selectedOption, setSelectedOption] = useState("sales");
  const [realTimeDataCount, setRealTimeDataCount] = useState({});

  const [sales, setSales] = useState([]);
  const [orders, setOrders] = useState([]);
  const [merchants, setMerchants] = useState([]);
  const [data, setData] = useState([]);
  const [commission, setCommission] = useState([]);
  const [subscription, setSubscription] = useState([]);
  const [merchantAvailability, setMerchantAvailability] = useState();
  const [isAvailable, setIsAvailable] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const [dateRange, setDateRange] = useState([
    new Date(new Date().setDate(new Date().getDate() - 7)),
    new Date(),
  ]);
  const [startDate, endDate] = dateRange;

  const { socket } = useSocket();

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value === "sales") {
      setData(sales);
    } else if (event.target.value === "merchants") {
      setData(merchants);
    } else if (event.target.value === "subscription") {
      setData(subscription);
    } else if (event.target.value === "commission") {
      setData(commission);
    } else if (event.target.value === "order") {
      setData(orders);
    }
  };

  const {
    playNewOrderNotificationSound,
    playNewNotificationSound,
    newOrder,
    orderRejected,
    scheduledOrder,
  } = useSoundContext();

  const handleNotification = (payload) => {
    if (
      payload.notification.title === newOrder ||
      payload.notification.title === orderRejected ||
      payload.notification.title === scheduledOrder
    ) {
      playNewOrderNotificationSound();
    } else {
      playNewNotificationSound();
    }
    // addNotificationToTable(payload.notification);
  };

  const { token, role, userId, setFcmToken, username } =
    useContext(UserContext);
  const toast = useToast();
  const navigate = useNavigate();

  socket?.on("connect_error", (err) => {
    console.log(err.message);
  });

  const getMerchantProfile = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/merchants/profile`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setMerchantAvailability(response.data.data.merchantDetail.availability);
      }
    } catch (err) {
      toast({
        title: "Error",
        description: `Error in getting merchant profile`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const getCurrentDayAndTime = () => {
    const currentDay = new Date()
      .toLocaleString("en-us", { weekday: "long" })
      .toLowerCase();
    const currentTime = new Date().toLocaleTimeString("en-US", {
      hour12: false, // 24-hour format
      hour: "2-digit",
      minute: "2-digit",
    });
    return { currentDay, currentTime };
  };

  const handleChangeMerchantStatusToggle = async (status) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/merchants/change-status-toggle`,
        { status },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // toast({
        //   title: "Success",
        //   description: "Merchant status updated successfully!",
        //   status: "success",
        //   duration: 3000,
        //   isClosable: true,
        // });
      }
    } catch (err) {
      console.log(err);
      // toast({
      //   title: "Error",
      //   description: "Error in changing merchant status",
      //   status: "error",
      //   duration: 3000,
      //   isClosable: true,
      // });
    }
  };

  const checkAvailability = async () => {
    try {
      // Fetch the merchant's availability data
      const { currentDay, currentTime } = getCurrentDayAndTime();
      const todayAvailability = merchantAvailability?.specificDays[currentDay];
      if (!todayAvailability) {
        // setErrorMessage("No availability data found for today.");
        setIsAvailable(false);
        return;
      }

      // Handle openAllDay
      if (todayAvailability.openAllDay) {
        setIsAvailable(true);
        await handleChangeMerchantStatusToggle(true);
        return;
      }

      // Handle closedAllDay
      if (todayAvailability.closedAllDay) {
        setIsAvailable(false);
        await handleChangeMerchantStatusToggle(false);
        // setErrorMessage("Merchant is closed all day.");
        return;
      }

      // Handle specificTime
      if (todayAvailability.specificTime) {
        const { startTime, endTime } = todayAvailability;
        if (currentTime >= startTime && currentTime <= endTime) {
          setIsAvailable(true);
          await handleChangeMerchantStatusToggle(true);
        } else {
          setIsAvailable(false);
          await handleChangeMerchantStatusToggle(false);
          // setErrorMessage("Merchant is not available at the current time.");
        }
        return;
      }

      // Default case: If no condition is met
      setIsAvailable(false);
    } catch (error) {
      console.error("Error fetching availability", error);
      // setErrorMessage("Error fetching availability data.");
    }
  };

  useEffect(() => {
    checkAvailability();
  }, [merchantAvailability]);

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }

    socket?.on("realTimeDataCount", (dataCount) => {
      setTimeout(() => {
        setRealTimeDataCount(dataCount);
      }, 1000);
    });

    if (role === "Admin") {
      socket?.emit("getRealTimeDataOnRefresh", "");
    } else if (role === "Merchant") {
      const data = {
        id: userId,
        role: role,
      };
      socket?.emit("getRealTimeDataOnRefreshMerchant", data);
      getMerchantProfile();
    }

    const unsubscribe = onMessage(messaging, (payload) => {
      handleNotification(payload);
      const { title, body } = payload.notification;
      if (Notification.permission === "granted") {
        new Notification(title, { body });
      }
    });

    return () => {
      unsubscribe();
      socket?.off("realTimeDataCount");
    };
  }, [token, socket, userId]);

  const requestPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const token = await getToken(messaging, {
          vapidKey:
            "BGgnJ6sB5-CVQCHLuNYw_MtcrUA0gJpS-MtLbpHMxAjzTEz1NegR_xyzYaLbGPGn832jFO0crtSjkspqQMcSZ28",
        });
        if (token) {
          setFcmToken(token);
          // Send the token to your server and update the UI if necessary
        } else {
          console.log(
            "No registration token available. Ensure your service worker is registered correctly."
          );
        }
      } else {
        toast({
          title: "Error",
          description: "Notification permission not granted",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error("Error retrieving token:", err);
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  // useEffect(() => {
  new CronJob(
    "0 */1 * * * *", // Runs every minute
    async () => {
      // if (isFetching) return;
      // setIsFetching(true);
      // try {
      await checkAvailability(); // Your function to check availability
      // } finally {
      //   setIsFetching(false);
      // }
    },
    true // Starts the job immediately
  );
  // }, []);

  useEffect(() => {
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    const getChartData = async () => {
      try {
        let endpoint =
          role === "Admin"
            ? `${BASE_URL}/admin/home/home-screen-sale-data`
            : `${BASE_URL}/admin/home/home-screen-sale-data-merchant`;

        const response = await axios.get(endpoint, {
          params: { startDate: formattedStartDate, endDate: formattedEndDate },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          if (role === "Admin") {
            setSales(convertRevenueDataToSalesChartFormat(response.data));
            setData(convertRevenueDataToSalesChartFormat(response.data));
            setMerchants(
              convertRevenueDataToMerchantChartFormat(response.data)
            );
            setOrders(convertRevenueDataToOrdersChartFormat(response.data));
            setCommission(
              convertRevenueDataToCommissionChartFormat(response.data)
            );
            setSubscription(
              convertRevenueDataToSubscriptionChartFormat(response.data)
            );
          } else {
            setSales(convertRevenueDataToSalesChartFormat(response.data));
            setData(convertRevenueDataToSalesChartFormat(response.data));
            setCommission(
              convertRevenueDataToCommissionChartFormat(response.data)
            );
            setOrders(convertRevenueDataToOrdersChartFormat(response.data));
          }
        }
      } catch (err) {
        toast({
          title: "Error",
          description: "An error while fetching graph detail.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    getChartData();
  }, [startDate, endDate, token, role]);

  function convertRevenueDataToSalesChartFormat(revenueData) {
    return revenueData.map((entry) => {
      const date = new Date(entry.createdAt);

      // Format date as desired, e.g., "Jan 1"
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      return {
        date: formattedDate,
        Revenue: entry.sales, // Assuming sales corresponds to the Revenue in your chart
      };
    });
  }

  function convertRevenueDataToOrdersChartFormat(revenueData) {
    return revenueData.map((entry) => {
      const date = new Date(entry.createdAt);

      // Format date as desired, e.g., "Jan 1"
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      return {
        date: formattedDate,
        Orders: entry.order, // Assuming sales corresponds to the Revenue in your chart
      };
    });
  }

  function convertRevenueDataToMerchantChartFormat(revenueData) {
    return revenueData.map((entry) => {
      const date = new Date(entry.createdAt);

      // Format date as desired, e.g., "Jan 1"
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      return {
        date: formattedDate,
        Logins: entry.merchants, // Assuming sales corresponds to the Revenue in your chart
      };
    });
  }

  function convertRevenueDataToCommissionChartFormat(revenueData) {
    return revenueData.map((entry) => {
      const date = new Date(entry.createdAt);

      // Format date as desired, e.g., "Jan 1"
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      return {
        date: formattedDate,
        Revenue: entry.commission, // Assuming sales corresponds to the Revenue in your chart
      };
    });
  }

  function convertRevenueDataToSubscriptionChartFormat(revenueData) {
    return revenueData.map((entry) => {
      const date = new Date(entry.createdAt);

      // Format date as desired, e.g., "Jan 1"
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      return {
        date: formattedDate,
        Revenue: entry.subscription, // Assuming sales corresponds to the Revenue in your chart
      };
    });
  }

  const valueFormatter = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);
  };

  const handleChangeMerchantStatus = async () => {
    try {
      await checkAvailability();
      if (isAvailable) {
        toast({
          title: "Error",
          description:
            "As per your availability settings now is your working hours.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      const response = await axios.patch(
        `${BASE_URL}/merchants/change-status`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Merchant status updated successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        const { message } = err.response.data;

        toast({
          title: "Error",
          description: message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <>
      <Sidebar />
      <div className="bg-gray-100 pl-[300px] w-full">
        <nav className="p-5">
          <GlobalSearch />
        </nav>
        <div className="flex justify-between mx-5 mt-5">
          <div>
            <p className="text-[25px] text-teal-800 capitalize font-semibold">
              Hi! <span>{username}</span>
            </p>
            {/* <p className="text-[25px] text-gray-500 capitalize">{role}</p> */}
          </div>

          <div className="flex items-center gap-[30px] ">
            {role === "Merchant" && (
              <p className="flex flex-col items-center justify-center">
                <Switch
                  value={isAvailable}
                  onChange={handleChangeMerchantStatus}
                  className="w-fit"
                />
                <span className="text-gray-500">Accepting orders</span>
              </p>
            )}
          </div>
        </div>

        <div className="bg-white mt-2 mx-5 pt-4">
          <div className="flex items-center mx-[20px] justify-between ">
            <div className="flex items-center w-2/3 gap-3 mt-3 mb-3">
              <div className="flex items-center gap-1">
                <input
                  type="radio"
                  id="sales"
                  name="sales"
                  value="sales"
                  onChange={handleOptionChange}
                  checked={selectedOption === "sales"}
                />
                <label htmlFor="sales">Sales(in ₹)</label>
              </div>
              {role === "Admin" && (
                <>
                  <div className="flex items-center gap-1">
                    <input
                      type="radio"
                      id="merchants"
                      name="merchants"
                      value="merchants"
                      onChange={handleOptionChange}
                      checked={selectedOption === "merchants"}
                    />
                    <label htmlFor="merchants">Merchants</label>
                  </div>
                </>
              )}
              <div className="flex items-center gap-1">
                <input
                  type="radio"
                  id="order"
                  name="order"
                  value="order"
                  onChange={handleOptionChange}
                  checked={selectedOption === "order"}
                />
                <label htmlFor="commission">Orders</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="radio"
                  id="commission"
                  name="commission"
                  value="commission"
                  onChange={handleOptionChange}
                  checked={selectedOption === "commission"}
                />
                <label htmlFor="commission">Commission(in ₹)</label>
              </div>
              {role === "Admin" && (
                <>
                  <div className="flex items-center gap-1">
                    <input
                      type="radio"
                      id="subscription"
                      name="subscription"
                      value="subscription"
                      onChange={handleOptionChange}
                      checked={selectedOption === "subscription"}
                    />
                    <label htmlFor="subscription">Subscription(in ₹)</label>
                  </div>
                </>
              )}
            </div>

            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update);
              }}
              dateFormat="yyyy/MM/dd"
              withPortal
              className="border-2 p-2 rounded-lg cursor-pointer mt-4 outline-none focus:outline-none"
              placeholderText="Select Date range"
              maxDate={new Date()}
            />
          </div>

          <div>
            <Card>
              <CardHeader pb="0">
                <Heading as="h4" fontWeight="medium" size="md">
                  {selectedOption === "merchants"
                    ? "Logins over time"
                    : selectedOption === "order"
                    ? "Orders over time"
                    : "Revenue over time"}
                </Heading>
              </CardHeader>

              <CardBody>
                <LineChart
                  data={data}
                  categories={
                    selectedOption === "merchants"
                      ? ["Logins"]
                      : selectedOption === "order"
                      ? ["Orders"]
                      : ["Revenue"]
                  }
                  valueFormatter={
                    selectedOption === "merchants"
                      ? ""
                      : selectedOption === "order"
                      ? ""
                      : valueFormatter
                  }
                  yAxisWidth={
                    selectedOption === "merchants"
                      ? 40
                      : selectedOption === "order"
                      ? 40
                      : 90
                  }
                  height="360px"
                  colors={["#115e59"]}
                />
              </CardBody>
            </Card>
          </div>
        </div>

        <div className="flex pb-[20px]">
          <HomeComponents realTimeDataCount={realTimeDataCount} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
