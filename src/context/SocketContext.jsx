import { EncryptStorage } from "encrypt-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
export const SocketContext = createContext();

const secretKey = import.meta.env.VITE_APP_LOCALSTORAGE_KEY
// Initialize encrypt-storage
const encryptStorage = new EncryptStorage(secretKey, {
  prefix: "FAMTO", // Optional prefix to namespace your storage
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [userId, setUserId] = useState(
    encryptStorage.getItem("userId") || null
  );
  const [fcmToken, setFcmToken] = useState(
    encryptStorage.getItem("fcmToken") || null
  );
  const [socket, setSocket] = useState(null);
  // https://api.famto.in
  // http://localhost:8080
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
        pingInterval: 10000,
        pingTimeout: 10000,
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
