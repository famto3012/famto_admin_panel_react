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

  useEffect(() => {
    // localStorage.setItem("token", JSON.stringify(isLoggedIn));
    // localStorage.setItem("role", JSON.stringify(role));

    if (token) {
      Cookies.set("token", token, { expires: 1 }); // Persistent for 1 day
      Cookies.set("role", role, { expires: 1 }); // Persistent for 1 day
    } else {
      Cookies.remove("token");
      Cookies.remove("role");
    }
  }, [token, role]);

  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        role,
        setRole,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
