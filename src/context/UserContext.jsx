import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [role, setRole] = useState(Cookies.get("role") || null);
  const [userId, setUserId] = useState(Cookies.get("userId") || null);
  const [fcmToken, setFcmToken] = useState(Cookies.get("fcmToken") || null);

  useEffect(() => {
    if (token && role) {
      Cookies.set("token", token, { expires: 7 });
      Cookies.set("role", role, { expires: 7 });
      Cookies.set("userId", userId, { expires: 7 });
      Cookies.set("fcmToken", fcmToken, { expires: 7 });
    } else {
      Cookies.remove("token");
      Cookies.remove("role");
      Cookies.remove("userId");
      Cookies.remove("fcmToken");
    }
  }, [token, role, userId, fcmToken]);

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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
