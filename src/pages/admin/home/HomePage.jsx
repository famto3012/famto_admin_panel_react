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
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import { formatDate } from "../../../utils/formatter";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const HomePage = () => {
  const [selectedOption, setSelectedOption] = useState("sales");
  const [realTimeDataCount, setRealTimeDataCount] = useState({});
  const [value, setValue] = useState([new Date(), new Date()]);
  const [sales, setSales] = useState([]);
  const [merchants, setMerchants] = useState([]);
  const [data, setData] = useState([]);
  const [commission, setCommission] = useState([]);
  const [subscription, setSubscription] = useState([]);
  const { socket } = useSocket();
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    if(event.target.value === "sales"){
      setData(sales)
    }else if(event.target.value === "merchants"){
      setData(merchants)
    }else if(event.target.value === "subscription"){
      setData(subscription)
    }else if(event.target.value === "commission"){
      setData(commission)
    }
  };

  const { token, role, userId, setFcmToken, username } =
    useContext(UserContext);
  const toast = useToast();
  const navigate = useNavigate();

  socket?.on("connect_error", (err) => {
    console.log(err.message);
    console.log(err.description);
    console.log(err.context);
  });

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }

    socket?.on("realTimeDataCount", (dataCount) => {
      setTimeout(() => {
        console.log(dataCount);
        setRealTimeDataCount(dataCount);
      }, 1000);
    });

    socket.emit("getRealTimeDataOnRefresh", "");

    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Message received:", payload);
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
      console.log("Permission:", permission);
      if (permission === "granted") {
        const token = await getToken(messaging, {
          vapidKey:
            "BCTdfiFGGBfYA5T5egVXkwTwhZp7Gxv0dYf1zfc7yHLB5Z_0JBJaGQ7fVH9_-mNgn4VMVgmJfatFDknNBseoNbE",
        });
        console.log("Token generated");
        if (token) {
          console.log("FCM Token:", token);
          setFcmToken(token);
          // Send the token to your server and update the UI if necessary
        } else {
          console.log(
            "No registration token available. Ensure your service worker is registered correctly."
          );
        }
      } else {
        console.log("Notification permission not granted");
      }
    } catch (err) {
      console.error("Error retrieving token:", err);
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  function convertRevenueDataToSalesChartFormat(revenueData) {
    return revenueData.map((entry) => {
      const date = new Date(entry.createdAt);

      // Format date as desired, e.g., "Jan 1"
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      return {
        date: formattedDate,
        Revenue: entry.sales, // Assuming sales corresponds to the Revenue in your chart
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
      });

      return {
        date: formattedDate,
        Revenue: entry.merchants, // Assuming sales corresponds to the Revenue in your chart
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
      });

      return {
        date: formattedDate,
        Revenue: entry.subscription, // Assuming sales corresponds to the Revenue in your chart
      };
    });
  }

  const selectDateRange = async (value) => {
    setValue(value);
    const formattedStartDate = formatDate(value[0]);
    const formattedEndDate = formatDate(value[1]);
    try {
      let endpoint =
        role === "Admin"
          ? `${BASE_URL}/admin/home/home-screen-sale-data`
          : `${BASE_URL}/admin/home/home-screen-sale-data-merchant`;
      console.log("Start", formattedStartDate, "End", formattedEndDate)
      const response = await axios.get(endpoint, {
        params: { startDate: formattedStartDate, endDate: formattedEndDate },
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        if (role === "Admin") {
          setSales(convertRevenueDataToSalesChartFormat(response.data));
          setMerchants(convertRevenueDataToMerchantChartFormat(response.data));
          setCommission(
            convertRevenueDataToCommissionChartFormat(response.data)
          );
          setSubscription(
            convertRevenueDataToSubscriptionChartFormat(response.data)
          );
        } else {
          setSales(convertRevenueDataToSalesChartFormat(response.data));
          setCommission(
            convertRevenueDataToCommissionChartFormat(response.data)
          );
        }
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An error occoured while filtering the orders",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
   console.log("sales", sales)
   console.log("merchants", merchants)
   console.log("commission", commission)
   console.log("subscription", subscription)
  }, [sales,merchants,commission,subscription])


  const valueFormatter = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(value);
  };

  const handleChangeMerchantStatus = async () => {
    try {
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
      console.log(err);
      toast({
        title: "Error",
        description: "Error in changing merchant status",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
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
            <p>
              Hi <span>{username}</span>
            </p>
            <p className="text-[20px] text-gray-500 capitalize">{role}</p>
          </div>

          <div className="flex items-center gap-[30px] ">
            {role === "Merchant" && (
              <p className="flex flex-col items-center justify-center">
                <Switch
                  value
                  onChange={handleChangeMerchantStatus}
                  className="w-fit"
                />
                <span className="text-gray-500">Accepting orders</span>
              </p>
            )}
          </div>
        </div>

        <div className="bg-white p-2 mt-5 mx-5">
          <div className="flex items-center mx-[20px] justify-between">
            <div className="flex item-center space-x-2 w-2/3 gap-3">
              <input
                type="radio"
                id="sales"
                name="sales"
                value="sales"
                onChange={handleOptionChange}
                checked={selectedOption === "sales"}
              />
              <label htmlFor="sales">Sales</label>
              {role === "Admin" && (
                <>
                  <input
                    type="radio"
                    id="merchants"
                    name="merchants"
                    value="merchants"
                    onChange={handleOptionChange}
                    checked={selectedOption === "merchants"}
                  />
                  <label htmlFor="merchants">Merchants</label>
                </>
              )}
              <input
                type="radio"
                id="commission"
                name="commission"
                value="commission"
                onChange={handleOptionChange}
                checked={selectedOption === "commission"}
              />
              <label htmlFor="commission">Commission (in)</label>
              {role === "Admin" && (
                <>
                  <input
                    type="radio"
                    id="subscription"
                    name="subscription"
                    value="subscription"
                    onChange={handleOptionChange}
                    checked={selectedOption === "subscription"}
                  />
                  <label htmlFor="subscription">Subscription (in)</label>
                </>
              )}
            </div>

            <DateRangePicker
              onChange={selectDateRange}
              name="date"
              value={value}
              format="y-MM-dd"
              // minDate={new Date()}
              maxDate={new Date(new Date().setDate(new Date().getDate() + 30))}
            />
          </div>

          <div>
            <Card>
              <CardHeader pb="0">
                <Heading as="h4" fontWeight="medium" size="md">
                { selectedOption === "merchants" ? "Logins over time" : "Revenue over time"}
                </Heading>
              </CardHeader>

              <CardBody>
                <LineChart
                  data={data}
                  categories={["Revenue"]}
                  valueFormatter={selectedOption === "merchants" ? "" : valueFormatter}
                  yAxisWidth={80}
                  height="300px"
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
