import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(
  //   JSON.parse(localStorage.getItem("token"))
  // );
  // const [role, setRole] = useState(JSON.parse(localStorage.getItem("role")));

  const [token, setToken] = useState(Cookies.get("token") || null);
  const [role, setRole] = useState(Cookies.get("role") || null);
  const [userId, setUserId] = useState(Cookies.get("userId") || null);
  const [fcmToken, setFcmToken] = useState(Cookies.get("fcmToken") || null);

  useEffect(() => {
    // localStorage.setItem("token", JSON.stringify(isLoggedIn));
    // localStorage.setItem("role", JSON.stringify(role));

    if (token) {
      Cookies.set("token", token, { expires: 1 }); // Persistent for 1 day
      Cookies.set("role", role, { expires: 1 }); // Persistent for 1 day
      Cookies.set("userId", userId, { expires: 1 }); // Persistent for 1 day
      Cookies.set("fcmToken", fcmToken, { expires: 1 }); // Persistent for 1 day
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
