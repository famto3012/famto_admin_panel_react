// src/context/SocketContext.js

import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
// import { UserContext } from "./UserContext";
import Cookies from "js-cookie";
export const SocketContext = createContext();

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
      const newSocket = io("http://localhost:5000", {
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
