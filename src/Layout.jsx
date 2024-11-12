import { useLocation } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import SidebarDelivery from "./components/model/SidebarDelivery";
import App from "./App";
import { useEffect, useState } from "react";

const Layout = () => {
  const location = useLocation();
  const path = location.pathname;

  const pathsForNoSideBar = [
    "login",
    "sign-up",
    "success",
    "verify",
    "reset-password",
    "forgot-password",
  ];
  const pathsForSmallSidebar = ["delivery-management", "agent-payout"];

  const noSidebar = pathsForNoSideBar.some((p) => path.includes(p));
  const showSmallSidebar = pathsForSmallSidebar.some((p) => path.includes(p));

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsSmallScreen(window.innerWidth < 1080);
    };

    // Initial check
    checkScreenWidth();

    // Add event listener to check on window resize
    window.addEventListener("resize", checkScreenWidth);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  return (
    <>
      {!noSidebar &&
        !isSmallScreen &&
        (showSmallSidebar ? <SidebarDelivery /> : <Sidebar />)}
      <main
      // className={`h-screen w-full ${
      //   noSidebar ? "" : showSmallSidebar ? "ps-[4rem]" : "ps-[270px]"
      // }`}
      >
        <App />
      </main>
    </>
  );
};

export default Layout;
