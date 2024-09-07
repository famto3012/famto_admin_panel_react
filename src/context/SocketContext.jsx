// src/context/SocketContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
// import { UserContext } from "./UserContext";
import Cookies from "js-cookie";
export const SocketContext = createContext();
const BASE_URL = import.meta.env.VITE_APP_SOCKET_URL;
const SSL_CERT = import.meta.env.VITE_APP_SSL_CERT;
const SSL_KEY = import.meta.env.VITE_APP_SSL_KEY;

const SOCKET_BASE_URL = import.meta.env.VITE_APP_SOCKET_BASE_URL

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  //   const { userId, fcmToken } = useContext(UserContext);
  const [userId, setUserId] = useState(Cookies.get("userId"));
  const [fcmToken, setFcmToken] = useState(Cookies.get("fcmToken"));
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (userId && fcmToken) {
      const newSocket = io(SOCKET_BASE_URL, {
        query: {
          userId: userId && userId,
          fcmToken: fcmToken && fcmToken,
        },
        autoConnect: true,
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
      });
      setSocket(newSocket);

      newSocket.on("connect", () => {
        console.log("Connected to server");
        //  playNewOrderNotificationSound();
        //  playNewNotificationSound();
      });

      newSocket.on("connect_error", (err) => {
        console.error("Socket Connection Error:", err.message);
      });

      return () => {
        newSocket.close();
      };
    }
  }, [userId, fcmToken]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
