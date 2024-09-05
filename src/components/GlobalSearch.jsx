import { SearchOutlined } from "@ant-design/icons";
import { IoMdLogOut } from "react-icons/io";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useSoundContext } from "../context/SoundContext";
import { initializeApp } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";
import { Avatar, AvatarBadge } from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";

const GlobalSearch = () => {
  const { setToken, setRole } = useContext(UserContext);
  const {
    playNewOrderNotificationSound,
    playNewNotificationSound,
    setShowBadge,
    showBadge,
    newOrder,
    orderRejected,
    scheduledOrder,
  } = useSoundContext();

  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    setRole(null);

    navigate("/auth/login");
  };

  const handleNotificationLog = () => {
    navigate("/notification-log");
    setShowBadge(false);
  };

  const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_API_KEY,
    authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_APP_PROJECT_ID,
    storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_APP_ID,
    measurementId: import.meta.env.VITE_APP_MEASUREMENT_ID,
  };

  const handleNotification = (payload) => {
    if (
      payload.notification.title === newOrder ||
      payload.notification.title === orderRejected ||
      payload.notification.title === scheduledOrder
    ) {
      console.log("New order sound");
      console.log("New order sound", newOrder);
      console.log("New order sound", orderRejected);
      console.log("New order sound", scheduledOrder);
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
    console.log("New order sound", newOrder);
    console.log("New order sound", orderRejected);
    console.log("New order sound", scheduledOrder);
    navigator.serviceWorker.addEventListener("message", (event) => {
      if (event.data && event.data.type === "NOTIFICATION_RECEIVED") {
        const payload = event.data.payload;
        handleNotification(payload);
      }
    });

    // Handle messages when the app is in the foreground
    onMessage(messaging, (payload) => {
      console.log("Received foreground message ", payload);
      handleNotification(payload);
      setShowBadge(true);
    });
  }, []);

  return (
    <div className="flex items-center justify-end gap-[20px]">
      <Avatar
        icon={
          <BellIcon
            color={"gray.400"}
            boxSize="1em"
            onClick={handleNotificationLog}
            style={{ cursor: "pointer" }}
          />
        }
        bg={"blue.30"}
      >
        {showBadge && (
          <AvatarBadge
            boxSize="0.5em"
            bg="red.500"
            borderColor="transparent"
            position="absolute"
            top="8"
            right="4"
            transform="translate(50%, -50%)"
          />
        )}
      </Avatar>
      <div className="relative">
        <input
          type="search"
          name="search"
          placeholder="Search"
          className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
        />
        <button type="submit" className="absolute right-0 top-0 mt-2 mr-4">
          <SearchOutlined className="text-xl text-gray-500" />
        </button>
      </div>
      <IoMdLogOut size={24} onClick={handleLogout} />
    </div>
  );
};

export default GlobalSearch;
