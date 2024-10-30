import { useContext, useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import GlobalSearch from "../../../components/GlobalSearch";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
import { formatDate, formatTime } from "../../../utils/formatter";
import { Pagination } from "@mui/material";
import { useSocket } from "../../../context/SocketContext";
import { useSoundContext } from "../../../context/SoundContext";
import { useToast } from "@chakra-ui/react";
import { initializeApp } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const Notificationlog = () => {
  const { token, role } = useContext(UserContext);
  const [tableData, setTableData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { socket } = useSocket();
  const {
    playNewOrderNotificationSound,
    playNewNotificationSound,
    setShowBadge,
    newOrder,
    orderRejected,
    scheduledOrder,
  } = useSoundContext();
  const toast = useToast();

  const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_API_KEY,
    authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_APP_PROJECT_ID,
    storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_APP_ID,
    measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID,
  };

  useEffect(() => {
    if (role === "Admin") {
      getAdminNotificationLog(page, limit);
    } else if (role === "Merchant") {
      getMerchantNotificationLog(page, limit);
    }
    setShowBadge(false);
  }, [page, limit, role]);

  const handleNotification = (payload) => {
    if (
      payload.notification.title === newOrder ||
      payload.notification.title === orderRejected ||
      payload.notification.title === scheduledOrder
    ) {
      console.log("New order sound");
      playNewOrderNotificationSound();
    } else {
      console.log("New Notification sound");
      playNewNotificationSound();
    }
    // addNotificationToTable(payload.notification);
  };

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);
    navigator.serviceWorker.addEventListener("message", (event) => {
      if (event.data && event.data.type === "NOTIFICATION_RECEIVED") {
        const payload = event.data.payload;
        handleNotification(payload);
      }
    });

    // Handle messages when the app is in the foreground
    onMessage(messaging, (payload) => {
      console.log("Received foreground message ", payload);
      addNotificationToTable(payload);
      handleNotification(payload);
    });
  }, [socket]);

  const addNotificationToTable = (data) => {
    console.log("Data", data);
    const newNotification = {
      title: data.notification.title, // Set the title
      description: data.notification.body, // Set the body as description
      imageUrl: data.notification.image, // Set the image URL
      createdAt: new Date().toISOString(),
      orderId: data?.data?.orderId,
    };

    setTableData((prevData) => [newNotification, ...prevData]);
  };

  const getAdminNotificationLog = async (page, limit) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/admin/notification/get-admin-notification-log`,
        {
          params: { page, limit },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setTableData(response.data.data);
        console.log(response.data.data);
        setPagination(response.data);
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An error occoured while getting the data",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const getMerchantNotificationLog = async (page, limit) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/admin/notification/get-merchant-notification-log`,
        {
          params: { page, limit },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setTableData(response.data.data);
        console.log(response.data.data);
        setPagination(response.data);
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An error occoured while getting the data",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const getItemAriaLabel = (type, page, selected) => {
    switch (type) {
      case "page":
        return `${selected ? "" : "Go to "}page ${page}`;
      case "first":
        return "Go to first page";
      case "last":
        return "Go to last page";
      case "next":
        return "Go to next page";
      case "previous":
        return "Go to previous page";
      default:
        return "";
    }
  };

  return (
    <>
      <Sidebar />
      <div className="w-full h-screen pl-[290px] bg-gray-100">
        <nav className="p-5">
          <GlobalSearch />
        </nav>
        <div>
          <h1 className="text-lg font-bold mt-7 mx-11">Notification Log</h1>
        </div>
        <div className="overflow-x-auto">
          <table className="overflow-x-auto p-4 w-full mt-7">
            <thead>
              <tr>
                {["Order ID / Image", "Notification", "Date & Time"].map(
                  (header) => (
                    <th
                      key={header}
                      className="bg-teal-800 text-white h-[70px] mt-10 px-5 text-center whitespace-nowrap border-r-2"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {tableData.map((table) => (
                <tr className="text-center bg-white h-20 " key={table._id}>
                  <td className="p-2 flex items-center justify-center">
                    {table.orderId ? (
                      table.orderId
                    ) : table.imageUrl ? (
                      <img
                        className="w-[150px] h-[80px]"
                        src={table.imageUrl}
                        alt="Order Image"
                      />
                    ) : (
                      <span>-</span>
                    )}
                  </td>
                  <td className="mt-2">
                    <span className="font-bold block">{table.title}</span>
                    <span className="block">
                      {table.description.length > 30
                        ? `${table.description.substring(0, 30)}...`
                        : table.description}
                    </span>
                  </td>
                  <td>
                    {`${formatDate(table.createdAt)} ${formatTime(
                      table.createdAt
                    )}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-5 mb-4">
            <Pagination
              count={pagination.totalPages || 0}
              page={pagination.currentPage || page}
              onChange={handlePageChange}
              shape="rounded"
              siblingCount={0}
              hidePrevButton={!pagination.hasPrevPage}
              hideNextButton={!pagination.hasNextPage}
              getItemAriaLabel={getItemAriaLabel}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Notificationlog;
