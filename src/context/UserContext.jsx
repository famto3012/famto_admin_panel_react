import { createContext, useEffect, useState } from "react";
import { EncryptStorage } from "encrypt-storage";

export const UserContext = createContext();
const secretKey = import.meta.env.VITE_APP_LOCALSTORAGE_KEY
// Initialize encrypt-storage
const encryptStorage = new EncryptStorage(secretKey, {
  prefix: "FAMTO", // Optional prefix to namespace your storage
});

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(encryptStorage.getItem("token") || null);
  const [role, setRole] = useState(encryptStorage.getItem("role") || null);
  const [username, setUsername] = useState(
    encryptStorage.getItem("username") || null
  );
  const [userId, setUserId] = useState(
    encryptStorage.getItem("userId") || null
  );
  const [fcmToken, setFcmToken] = useState(
    encryptStorage.getItem("fcmToken") || null
  );
  const [signUp, setSignUp] = useState({});
  const [verification, setVerification] = useState("");

  useEffect(() => {
    const storedToken = encryptStorage.getItem("token");
    const storedRole = encryptStorage.getItem("role");
    const storedUsername = encryptStorage.getItem("username");
    const storedUserId = encryptStorage.getItem("userId");
    const storedFcmToken = encryptStorage.getItem("fcmToken");

    if (storedToken && storedRole) {
      setToken(storedToken);
      setRole(storedRole);
      setUsername(storedUsername);
      setUserId(storedUserId);
      setFcmToken(storedFcmToken);
    }
  }, []);

  useEffect(() => {
    if (token && role) {
      encryptStorage.setItem("token", token);
      encryptStorage.setItem("role", role);
      encryptStorage.setItem("userId", userId);
      encryptStorage.setItem("fcmToken", fcmToken);
      encryptStorage.setItem("username", username);
    } else {
      encryptStorage.removeItem("token");
      encryptStorage.removeItem("role");
      encryptStorage.removeItem("userId");
      encryptStorage.removeItem("fcmToken");
      encryptStorage.removeItem("username");
    }
  }, [token, role, userId, fcmToken, username]);

  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        role,
        setRole,
        userId,
        setUserId,
        fcmToken,
        setFcmToken,
        signUp,
        setSignUp,
        verification,
        setVerification,
        username,
        setUsername,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
