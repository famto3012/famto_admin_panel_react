import { createContext, useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(
    secureLocalStorage.getItem("token") || null
  );
  const [role, setRole] = useState(secureLocalStorage.getItem("role") || null);
  const [username, setUsername] = useState(
    secureLocalStorage.getItem("username") || null
  );
  const [userId, setUserId] = useState(
    secureLocalStorage.getItem("userId") || null
  );
  const [fcmToken, setFcmToken] = useState(
    secureLocalStorage.getItem("fcmToken") || null
  );
  const [signUp, setSignUp] = useState({});
  const [verification, setVerification] = useState("");

  useEffect(() => {
    const storedToken = secureLocalStorage.getItem("token");
    const storedRole = secureLocalStorage.getItem("role");
    const storedUsername = secureLocalStorage.getItem("username");
    const storedUserId = secureLocalStorage.getItem("userId");
    const storedFcmToken = secureLocalStorage.getItem("fcmToken");
  
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
      secureLocalStorage.setItem("token", token);
      secureLocalStorage.setItem("role", role);
      secureLocalStorage.setItem("userId", userId);
      secureLocalStorage.setItem("fcmToken", fcmToken);
      secureLocalStorage.setItem("username", username);
    } else {
      secureLocalStorage.removeItem("token");
      secureLocalStorage.removeItem("role");
      secureLocalStorage.removeItem("userId");
      secureLocalStorage.removeItem("fcmToken");
      secureLocalStorage.removeItem("username");
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
