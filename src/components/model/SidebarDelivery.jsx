import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import TwoWheelerOutlinedIcon from "@mui/icons-material/TwoWheelerOutlined";
import PercentOutlinedIcon from "@mui/icons-material/PercentOutlined";
import { Link } from "react-router-dom";

const SidebarDelivery = () => {
  return (
    <div className="fixed w-[4rem] h-full bg-gradient-to-t from-teal-700 to-cyan-500 p-4 font-poppins overflow-y-auto">
      <div className="flex gap-3 ml-[6px] mt-[30px]">
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
        <Link to="/all-agents" className="side">
          <AssignmentIndOutlinedIcon className="m-2" />
        </Link>
        <Link to="/delivery-management" className="side">
          <TwoWheelerOutlinedIcon className="m-2" />
        </Link>
        <Link to="/commission" className="side">
          <PercentOutlinedIcon className="flex mr-[3px] m-2" />
        </Link>
      </ul>
    </div>
  );
};

export default SidebarDelivery;
