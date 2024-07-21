import { useContext, useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import GlobalSearch from "../../../components/GlobalSearch";
import HomeComponents from "../../../components/HomeComponents";
import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import { LineChart } from "@saas-ui/charts";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "../../../firebase";

const HomePage = () => {
  const [selectedOption, setSelectedOption] = useState("sales");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const { token, role, userId, fcmToken, setFcmToken } =
    useContext(UserContext);
  // console.log(fcmToken);

  const socket = io("http://localhost:5000", {
    query: {
      userId: userId,
      fcmToken: fcmToken,
    },
    autoConnect: true,
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Message received:", payload);
      // Handle notification display or other actions based on payload
      const { title, body } = payload.notification;
      if (Notification.permission === "granted") {
        new Notification(title, { body });
      }
    });

    return () => {
      unsubscribe();
      // Clean up other listeners as needed
    };
  }, [token, navigate, socket]);

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

  // console.log(selectedOption);

  const data = [
    {
      date: "Jan 1",
      Revenue: 1475,
    },
    {
      date: "Jan 8",
      Revenue: 1936,
    },
    {
      date: "Jan 15",
      Revenue: 1555,
    },
    {
      date: "Jan 22",
      Revenue: 1557,
    },
    {
      date: "Jan 29",
      Revenue: 1977,
    },
    {
      date: "Feb 5",
      Revenue: 2315,
    },
    {
      date: "Feb 12",
      Revenue: 1736,
    },
    {
      date: "Feb 19",
      Revenue: 1981,
    },
    {
      date: "Feb 26",
      Revenue: 2581,
    },
    {
      date: "Mar 5",
      Revenue: 2592,
    },
    {
      date: "Mar 12",
      Revenue: 2635,
    },
    {
      date: "Mar 19",
      Revenue: 2074,
    },
    {
      date: "Mar 26",
      Revenue: 2984,
    },
    {
      date: "Apr 2",
      Revenue: 2254,
    },
    {
      date: "Apr 9",
      Revenue: 3159,
    },
    {
      date: "Apr 16",
      Revenue: 2804,
    },
    {
      date: "Apr 23",
      Revenue: 2602,
    },
    {
      date: "Apr 30",
      Revenue: 2840,
    },
    {
      date: "May 7",
      Revenue: 3299,
    },
    {
      date: "May 14",
      Revenue: 3487,
    },
    {
      date: "May 21",
      Revenue: 3439,
    },
    {
      date: "May 28",
      Revenue: 3095,
    },
    {
      date: "Jun 4",
      Revenue: 3252,
    },
    {
      date: "Jun 11",
      Revenue: 4096,
    },
    {
      date: "Jun 18",
      Revenue: 4193,
    },
    {
      date: "Jun 25",
      Revenue: 4759,
    },
  ];

  const valueFormatter = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
    }).format(value);
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
            <p>Hi</p>
            <p className="text-[20px] text-gray-500">Designation</p>
          </div>
          <div>
            <select name="day" className="bg-white rounded-lg p-3">
              <option>Today</option>
            </select>
          </div>
        </div>
        <div className="bg-white p-2 mt-5 mx-5">
          <div className="flex item-center space-x-2 w-2/3 gap-3">
            <input
              type="radio"
              id="sales"
              name="sales"
              value="sales"
              onChange={handleOptionChange}
              checked={selectedOption === "sales"}
              className=""
            />
            <label htmlFor="sales" className="mr-4">
              Sales
            </label>

            <input
              type="radio"
              id="merchants"
              name="merchants"
              value="merchants"
              onChange={handleOptionChange}
              checked={selectedOption === "merchants"}
              className=""
            />
            <label htmlFor="merchants" className="mr-4">
              Merchants
            </label>

            <input
              type="radio"
              id="commission"
              name="commission"
              value="commission"
              onChange={handleOptionChange}
              checked={selectedOption === "commission"}
              className="mr-2"
            />
            <label htmlFor="commission">Commission (in)</label>
            <input
              type="radio"
              id="subscription"
              name="subscription"
              value="subscription"
              onChange={handleOptionChange}
              checked={selectedOption === "subscription"}
              className="mr-2"
            />
            <label htmlFor="subscription" className="mr-4">
              Subscription (in)
            </label>
          </div>

          <div>
            <Card>
              <CardHeader pb="0">
                <Heading as="h4" fontWeight="medium" size="md">
                  Revenue over time
                </Heading>
              </CardHeader>
              <CardBody>
                <LineChart
                  data={data}
                  categories={["Revenue"]}
                  valueFormatter={valueFormatter}
                  yAxisWidth={80}
                  height="300px"
                  colors={["#115e59"]}
                />
              </CardBody>
            </Card>
          </div>
        </div>
        <div className="flex">
          <HomeComponents />
        </div>
      </div>
    </>
  );
};

export default HomePage;
