import { useLocation } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import SidebarDelivery from "./components/model/SidebarDelivery";
import App from "./App";

const Layout = () => {
  const location = useLocation();
  const path = location.pathname;

  const pathsForNoSideBar = ["sign-in", "sign-up"];
  const pathsForSmallSidebar = ["delivery-management", "agent-payout"];

  const noSidebar = pathsForNoSideBar.some((p) => path.includes(p));
  const showSmallSidebar = pathsForSmallSidebar.some((p) => path.includes(p));

  return (
    <>
      {!noSidebar && (showSmallSidebar ? <SidebarDelivery /> : <Sidebar />)}
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
