// src/context/SoundContext.js
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const SoundContext = createContext();

export const useSoundContext = () => useContext(SoundContext);

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const SoundProvider = ({ children }) => {

  const playNewOrderNotificationSound = () => {
    const newOrderSoundUrl = new Audio(
      "https://res.cloudinary.com/dajlabmrb/video/upload/v1724931153/orderCreateAndRejectAudio_dg1rle.mp3"
    );
    newOrderSoundUrl.play();
  };
  const playNewNotificationSound = () => {
    const playNewNotification = new Audio(
      "https://res.cloudinary.com/dajlabmrb/video/upload/v1724931165/46ffbafd-37e2-403e-92ed-b56edd5df42e-Notification_sound_gyz5ux.mp3"
    );
    playNewNotification.play();
  };
  const [showBadge, setShowBadge] = useState(false);
  const [newOrder, setNewOrder] = useState("");
  const [orderRejected, setOrderRejected] = useState("");
  const [scheduledOrder, setScheduledOrder] = useState("");
  const [notification, setNotification] = useState([]);
  const [token, setToken] = useState(Cookies.get("token") || null);

  useEffect(() => {
    console.log(token);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/admin/notification/notification-setting/context`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 200) {
          const data = response.data.data;
          const newOrderNotification = data.filter(
            (item) => item.event === "newOrderCreated"
          );
          const orderRejectedNotification = data.filter(
            (item) => item.event === "orderRejected"
          );
          const scheduledOrderNotification = data.filter(
            (item) => item.event === "scheduledOrderCreated"
          );
          // Set the titles in respective useState hooks
          setNewOrder(newOrderNotification[0]?.title || "");
          setOrderRejected(orderRejectedNotification[0]?.title || "");
          setScheduledOrder(scheduledOrderNotification[0]?.title || "");

          setNotification(response.data.data);
        }
      } catch (err) {
        console.error(`Error in fetching data: ${err}`);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    console.log("Notification", notification);
    console.log("New order sound", newOrder);
    console.log("New order sound", orderRejected);
    console.log("New order sound", scheduledOrder);
  }, [notification, newOrder, orderRejected, scheduledOrder]);

  return (
    <SoundContext.Provider
      value={{
        playNewOrderNotificationSound,
        playNewNotificationSound,
        setShowBadge,
        showBadge,
        newOrder,
        setNewOrder,
        orderRejected,
        setOrderRejected,
        scheduledOrder,
        setScheduledOrder,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};
