import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import secureLocalStorage from "react-secure-storage";
export const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [userId, setUserId] = useState(
    secureLocalStorage.getItem("userId") || null
  );
  const [fcmToken, setFcmToken] = useState(
    secureLocalStorage.getItem("fcmToken") || null
  );
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (userId && fcmToken) {
      const newSocket = io("https://api.famto.in", {
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
