import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import TwoWheelerOutlinedIcon from "@mui/icons-material/TwoWheelerOutlined";
import PercentOutlinedIcon from "@mui/icons-material/PercentOutlined";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const SidebarDelivery = () => {
  const [selectedLink, setSelectedLink] = useState("");

  const location = useLocation();

  useEffect(() => {
    setSelectedLink(location.pathname);
  }, [location.pathname]);

  return (
    <div className="fixed w-[4rem] h-full bg-gradient-to-b from-[#016B6C] to-[#000] bg-[length:100%_150%] bg-top font-poppins overflow-y-auto">
      <div className="flex gap-3 ml-[18px] mt-[30px] w-[30px]">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/famto-aa73e.appspot.com/o/admin_panel_assets%2Fwhitelogo.svg?alt=media&token=a7436647-2de7-4fee-8e3a-5c637bd0bc61"
          alt="Logo"
        />
      </div>
      <div className="dropside"></div>

      <ul className="ul-side">
        <Link to="/home" className="side">
          <HomeOutlinedIcon className="m-2" />
        </Link>
        <Link to="/all-orders" className="side">
          <BookOutlinedIcon className="m-2" />
        </Link>
        <Link to="/all-merchants" className="side">
          <StorefrontOutlinedIcon className="m-2" />
        </Link>
        <Link to="/products" className="side">
          <ListAltOutlinedIcon className="m-2" />
        </Link>
        <Link to="/customers" className="side">
          <GroupsOutlinedIcon className="m-2" />
        </Link>
        <Link
          to="/all-agents"
          className={`side ${
            selectedLink === "/agent-payout" ? "selected-link" : ""
          }`}
        >
          <AssignmentIndOutlinedIcon className="m-2" />
        </Link>
        <Link
          to="/delivery-management"
          className={` side ${
            selectedLink === "/delivery-management" ? "selected-link" : ""
          }`}
        >
          <TwoWheelerOutlinedIcon className="m-2" />
        </Link>
        <Link to="/commission" className="side">
          <PercentOutlinedIcon className="flex mr-[3px] m-2" />
        </Link>
        <Link
          to="/chat"
          className={` side ${
            selectedLink === "/chat" ? "selected-link" : ""
          }`}
        >
          <FaWhatsapp className="m-[7px] text-[25px]" />
        </Link>
      </ul>
    </div>
  );
};

export default SidebarDelivery;
