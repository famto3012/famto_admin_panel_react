import React, { Suspense, useContext, useEffect, useState } from "react";
const HomeOutlinedIcon = React.lazy(() =>
  import("@mui/icons-material/HomeOutlined")
);
const BookOutlinedIcon = React.lazy(() =>
  import("@mui/icons-material/BookOutlined")
);
const StorefrontOutlinedIcon = React.lazy(() =>
  import("@mui/icons-material/StorefrontOutlined")
);
const ListAltOutlinedIcon = React.lazy(() =>
  import("@mui/icons-material/ListAltOutlined")
);
const GroupsOutlinedIcon = React.lazy(() =>
  import("@mui/icons-material/GroupsOutlined")
);
const AssignmentIndOutlinedIcon = React.lazy(() =>
  import("@mui/icons-material/AssignmentIndOutlined")
);
const TwoWheelerOutlinedIcon = React.lazy(() =>
  import("@mui/icons-material/TwoWheelerOutlined")
);
const PercentOutlinedIcon = React.lazy(() =>
  import("@mui/icons-material/PercentOutlined")
);
const FaWhatsapp = React.lazy(() =>
  import("react-icons/fa").then((module) => ({ default: module.FaWhatsapp }))
);
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { Skeleton } from "@chakra-ui/react";

const SidebarDelivery = () => {
  const [selectedLink, setSelectedLink] = useState("");
  const { role } = useContext(UserContext);

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
          <Suspense fallback={<Skeleton width="24px" height="24px" />}>
            <HomeOutlinedIcon className="m-2" />
          </Suspense>
        </Link>
        <Link to="/all-orders" className="side">
          <Suspense fallback={<Skeleton width="24px" height="24px" />}>
            <BookOutlinedIcon className="m-2" />
          </Suspense>
        </Link>
        <Link to="/all-merchants" className="side">
          <Suspense fallback={<Skeleton width="24px" height="24px" />}>
            <StorefrontOutlinedIcon className="m-2" />
          </Suspense>
        </Link>
        <Link to="/products" className="side">
          <Suspense fallback={<Skeleton width="24px" height="24px" />}>
            <ListAltOutlinedIcon className="m-2" />
          </Suspense>
        </Link>
        <Link to="/customers" className="side">
          <Suspense fallback={<Skeleton width="24px" height="24px" />}>
            <GroupsOutlinedIcon className="m-2" />
          </Suspense>
        </Link>
        <Link
          to="/all-agents"
          className={`side ${
            selectedLink === "/agent-payout" ? "selected-link" : ""
          }`}
        >
          <Suspense fallback={<Skeleton width="24px" height="24px" />}>
            <AssignmentIndOutlinedIcon className="m-2" />
          </Suspense>
        </Link>
        <Link
          to="/delivery-management"
          className={` side ${
            selectedLink === "/delivery-management" ? "selected-link" : ""
          }`}
        >
          <Suspense fallback={<Skeleton width="24px" height="24px" />}>
            <TwoWheelerOutlinedIcon className="m-2" />
          </Suspense>
        </Link>
        <Link to="/commission" className="side">
          <Suspense fallback={<Skeleton width="24px" height="24px" />}>
            <PercentOutlinedIcon className="flex mr-[3px] m-2" />
          </Suspense>
        </Link>
        {role === "Admin" && (
          <Link
            to="/chat"
            className={` side ${
              selectedLink === "/chat" ? "selected-link" : ""
            }`}
          >
            <Suspense fallback={<Skeleton width="24px" height="24px" />}>
              <FaWhatsapp className="m-[7px] text-[25px]" />
            </Suspense>
          </Link>
        )}
      </ul>
    </div>
  );
};

export default SidebarDelivery;
