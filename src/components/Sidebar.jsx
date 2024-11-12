import { Suspense, useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../App.css";

// Import specific icons from Material UI with individual imports
import React from "react";

// Lazy load Material UI icons
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
const AppBlockingOutlinedIcon = React.lazy(() =>
  import("@mui/icons-material/AppBlockingOutlined")
);
const SettingsOutlinedIcon = React.lazy(() =>
  import("@mui/icons-material/SettingsOutlined")
);
const ManageAccountsOutlinedIcon = React.lazy(() =>
  import("@mui/icons-material/ManageAccountsOutlined")
);
const NotificationsNoneOutlinedIcon = React.lazy(() =>
  import("@mui/icons-material/NotificationsNoneOutlined")
);
const NotificationImportantOutlinedIcon = React.lazy(() =>
  import("@mui/icons-material/NotificationImportantOutlined")
);
const EditNotificationsOutlinedIcon = React.lazy(() =>
  import("@mui/icons-material/EditNotificationsOutlined")
);
const CrisisAlertOutlinedIcon = React.lazy(() =>
  import("@mui/icons-material/CrisisAlertOutlined")
);
const CampaignOutlinedIcon = React.lazy(() =>
  import("@mui/icons-material/CampaignOutlined")
);
const RedeemOutlinedIcon = React.lazy(() =>
  import("@mui/icons-material/RedeemOutlined")
);
const HubOutlinedIcon = React.lazy(() =>
  import("@mui/icons-material/HubOutlined")
);
const LoyaltyOutlinedIcon = React.lazy(() =>
  import("@mui/icons-material/LoyaltyOutlined")
);
const ShareLocationOutlinedIcon = React.lazy(() =>
  import("@mui/icons-material/ShareLocationOutlined")
);

// Lazy load Ant Design icon
const CaretRightOutlined = React.lazy(() =>
  import("@ant-design/icons/CaretRightOutlined")
);

// Lazy load react-icons
const BsPersonLinesFill = React.lazy(() =>
  import("react-icons/bs").then((module) => ({
    default: module.BsPersonLinesFill,
  }))
);
const LuFolderCog = React.lazy(() =>
  import("react-icons/lu").then((module) => ({ default: module.LuFolderCog }))
);
const FaIndianRupeeSign = React.lazy(() =>
  import("react-icons/fa6").then((module) => ({
    default: module.FaIndianRupeeSign,
  }))
);
const AiOutlineGift = React.lazy(() =>
  import("react-icons/ai").then((module) => ({ default: module.AiOutlineGift }))
);
const IoMdTime = React.lazy(() =>
  import("react-icons/io").then((module) => ({ default: module.IoMdTime }))
);
const FaWhatsapp = React.lazy(() =>
  import("react-icons/fa").then((module) => ({ default: module.FaWhatsapp }))
);
import { UserContext } from "../context/UserContext";
import { Skeleton } from "@chakra-ui/react";

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedLink, setSelectedLink] = useState("");

  const location = useLocation();

  const { role } = useContext(UserContext);

  useEffect(() => {
    setSelectedLink(location.pathname);
    const path = location.pathname;

    if (
      path.includes("ad-banner") ||
      path.includes("discount") ||
      path.includes("loyality-point") ||
      path.includes("promo-code") ||
      path.includes("referral")
    ) {
      setOpenDropdown("marketing");
    } else if (
      path.includes("notification-log") ||
      path.includes("push-notification") ||
      path.includes("notification-settings") ||
      path.includes("alert-notification")
    ) {
      setOpenDropdown("notification");
    } else if (
      path.includes("all-managers") ||
      path.includes("roles") ||
      path.includes("pricing") ||
      path.includes("all-tax") ||
      path.includes("geofence")
    ) {
      setOpenDropdown("configure");
    } else if (
      path.includes("customer-app") ||
      path.includes("agent-app") ||
      path.includes("merchant-app")
    ) {
      setOpenDropdown("customization");
    } else if (path.includes("account-logs") || path.includes("settings")) {
      setOpenDropdown("account");
    } else {
      setOpenDropdown(null);
    }
  }, [location.pathname]);

  const toggleSidebar = (dropdown) => () => {
    setOpenDropdown((prevDropdown) =>
      prevDropdown === dropdown ? null : dropdown
    );
  };

  return (
    <div className="fixed w-[300px] h-full bg-gradient-to-b from-[#016B6C] to-[#000] bg-[length:100%_150%] bg-top font-poppins overflow-y-auto pb-[50px] z-20 overflow-element">
      <div className="flex gap-3 ml-[10px] mt-[30px]">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/famtowebsite.appspot.com/o/images%2FWhite.svg?alt=media&token=3d91a036-029f-4d67-816e-19b1f8dd3f6e"
          alt="Logo"
          className="w-[140px]"
        />
        {/* <h1 className="text-white font-handelGothic text-2xl">FAMTO</h1> */}
      </div>
      <div className="dropside ">General</div>

      <ul className="ul-side">
        <Link
          to="/home"
          className={`ps-4 side ${
            selectedLink === "/home" ? "selected-link" : ""
          }`}
        >
          <Suspense fallback={<Skeleton width="24px" height="24px" />}>
            <HomeOutlinedIcon className="m-2" />
          </Suspense>
          Home
        </Link>
        <Link
          to="/all-orders"
          className={`ps-4 side ${
            selectedLink === "/all-orders" ? "selected-link" : ""
          }`}
        >
          <Suspense fallback={<Skeleton width="24px" height="24px" />}>
            <BookOutlinedIcon className="m-2" />
          </Suspense>
          Orders
        </Link>
        {role === "Admin" && (
          <Link
            to="/all-merchants"
            className={`ps-4 side ${
              selectedLink === "/all-merchants" ||
              /^\/merchant-detail\/[A-Za-z0-9]+$/.test(selectedLink) ||
              selectedLink === "/merchant/payout"
                ? "selected-link"
                : ""
            }`}
          >
            <Suspense fallback={<Skeleton width="24px" height="24px" />}>
              <StorefrontOutlinedIcon className="m-2" />
            </Suspense>
            Merchants
          </Link>
        )}
        <Link
          to="/products"
          className={`ps-4 side ${
            selectedLink === "/products" ? "selected-link" : ""
          }`}
        >
          <Suspense fallback={<Skeleton width="24px" height="24px" />}>
            <ListAltOutlinedIcon className="m-2" />
          </Suspense>
          Products
        </Link>
        <Link
          to="/customers"
          className={`ps-4 side ${
            selectedLink === "/customers" ||
            /^\/customer-detail\/[A-Za-z0-9]+$/.test(selectedLink)
              ? "selected-link"
              : ""
          }`}
        >
          <Suspense fallback={<Skeleton width="24px" height="24px" />}>
            <GroupsOutlinedIcon className="m-2" />
          </Suspense>
          Customers
        </Link>

        {role === "Admin" && (
          <>
            <Link
              to="/all-agents"
              className={`ps-4 side ${
                selectedLink === "/all-agents" ||
                /^\/agent-details\/[A-Za-z0-9]+$/.test(selectedLink)
                  ? "selected-link"
                  : ""
              }`}
            >
              <Suspense fallback={<Skeleton width="24px" height="24px" />}>
                <AssignmentIndOutlinedIcon className="m-2" />
              </Suspense>
              Delivery Agents
            </Link>

            <Link
              to="/delivery-management"
              className={`ps-4 side ${
                selectedLink === "/delivery-management" ? "selected-link" : ""
              }`}
            >
              <Suspense fallback={<Skeleton width="24px" height="24px" />}>
                <TwoWheelerOutlinedIcon className="m-2" />
              </Suspense>
              Delivery Management
            </Link>
          </>
        )}

        <Link
          to="/commission"
          className={`ps-4 side ${
            selectedLink === "/commission" ||
            selectedLink === "/view-subscription" ||
            selectedLink === "/view-commission"
              ? "selected-link"
              : ""
          }`}
        >
          <Suspense fallback={<Skeleton width="24px" height="24px" />}>
            <PercentOutlinedIcon className="flex mr-[3px] m-2" />
          </Suspense>
          Commission/Subscription
        </Link>
        {role === "Admin" && (
          <Link
            to="/chat"
            className={`ps-4 side ${
              selectedLink === "/chat" ? "selected-link" : ""
            }`}
          >
            <Suspense fallback={<Skeleton width="24px" height="24px" />}>
              <FaWhatsapp className="m-[7px] text-[25px]" />
            </Suspense>
            Whatsapp
          </Link>
        )}
      </ul>

      <div className="dropside" onClick={toggleSidebar("marketing")}>
        Marketing
        <button>
          <CaretRightOutlined />
        </button>
      </div>
      {openDropdown === "marketing" && (
        <ul className="ul-side">
          <Link
            to="/discount"
            className={`ps-4 side pt-1 pb-1 ${
              selectedLink === "/discount" ? "selected-link" : ""
            }`}
          >
            <Suspense fallback={<Skeleton width="24px" height="24px" />}>
              <AiOutlineGift className="me-2 ms-2 mb-1" size={"25px"} />
            </Suspense>
            Discount
          </Link>

          {role === "Admin" && (
            <>
              <Link
                to="/ad-banner"
                className={`ps-4 side ${
                  selectedLink === "/ad-banner" ? "selected-link" : ""
                }`}
              >
                <Suspense fallback={<Skeleton width="24px" height="24px" />}>
                  <CampaignOutlinedIcon className="m-2" />
                </Suspense>
                Ad banner
              </Link>

              <Link
                to="/loyality-point"
                className={`ps-4 side ${
                  selectedLink === "/loyality-point" ? "selected-link" : ""
                }`}
              >
                <Suspense fallback={<Skeleton width="24px" height="24px" />}>
                  <LoyaltyOutlinedIcon className="m-2" />
                </Suspense>
                Loyality Point
              </Link>

              <Link
                to="/promo-code"
                className={`ps-4 side ${
                  selectedLink === "/promo-code" ? "selected-link" : ""
                }`}
              >
                <Suspense fallback={<Skeleton width="24px" height="24px" />}>
                  <RedeemOutlinedIcon className="m-2" />
                </Suspense>
                Promo code
              </Link>

              <Link
                to="/referral"
                className={`ps-4 side ${
                  selectedLink === "/referral" ? "selected-link" : ""
                }`}
              >
                <Suspense fallback={<Skeleton width="24px" height="24px" />}>
                  <HubOutlinedIcon className="m-2" />
                </Suspense>
                Referral
              </Link>
            </>
          )}
        </ul>
      )}

      <div className="dropside" onClick={toggleSidebar("notification")}>
        Notification
        <button>
          <CaretRightOutlined />
        </button>
      </div>
      {openDropdown === "notification" && (
        <ul className="ul-side">
          <Link
            to="/notification-log"
            className={`ps-4 side ${
              selectedLink === "/notification-log" ? "selected-link" : ""
            }`}
          >
            <Suspense fallback={<Skeleton width="24px" height="24px" />}>
              <NotificationsNoneOutlinedIcon className="m-2" />
            </Suspense>
            Notification log
          </Link>

          {role === "Admin" && (
            <>
              <Link
                to="/push-notification"
                className={`ps-4 side ${
                  selectedLink === "/push-notification" ? "selected-link" : ""
                }`}
              >
                <Suspense fallback={<Skeleton width="24px" height="24px" />}>
                  <NotificationImportantOutlinedIcon className="m-2" />
                </Suspense>
                Push Notification
              </Link>

              <Link
                to="/notification-settings"
                className={`ps-4 side ${
                  selectedLink === "/notification-settings"
                    ? "selected-link"
                    : ""
                }`}
              >
                <Suspense fallback={<Skeleton width="24px" height="24px" />}>
                  <EditNotificationsOutlinedIcon className="m-2" />
                </Suspense>
                Notification Settings
              </Link>

              <Link
                to="/alert-notification"
                className={`ps-4 side ${
                  selectedLink === "/alert-notification" ? "selected-link" : ""
                }`}
              >
                <Suspense fallback={<Skeleton width="24px" height="24px" />}>
                  <CrisisAlertOutlinedIcon className="m-2" />
                </Suspense>
                Alert Notification
              </Link>
            </>
          )}
        </ul>
      )}

      {role === "Admin" && (
        <>
          <div className="dropside" onClick={toggleSidebar("configure")}>
            Configure
            <button>
              <CaretRightOutlined />
            </button>
          </div>
          {openDropdown === "configure" && (
            <ul className="ul-side">
              <Link
                to="/all-managers"
                className={`ps-4 side flex items-center ${
                  selectedLink === "/all-managers" ? "selected-link" : ""
                }`}
              >
                <Suspense fallback={<Skeleton width="24px" height="24px" />}>
                  <BsPersonLinesFill className="m-2 text-[20px]" />
                </Suspense>
                Managers
              </Link>
              {/* <Link
                to="/roles"
                className={`ps-4 side ${
                  selectedLink === "/roles" ? "selected-link" : ""
                }`}
              >
                <ManageAccountsOutlinedIcon className="m-2" />
                Roles
              </Link> */}
              <Link
                to="/pricing"
                className={`ps-4 side flex items-center ${
                  selectedLink === "/pricing" ? "selected-link" : ""
                }`}
              >
                <Suspense fallback={<Skeleton width="24px" height="24px" />}>
                  <FaIndianRupeeSign className="m-2 text-[20px]" />
                </Suspense>
                Pricing
              </Link>
              <Link
                to="/all-tax"
                className={`ps-4 side ${
                  selectedLink === "/all-tax" ? "selected-link" : ""
                }`}
              >
                <Suspense fallback={<Skeleton width="24px" height="24px" />}>
                  <PercentOutlinedIcon className="m-2" />
                </Suspense>
                Tax
              </Link>
              <Link
                to="/geofence"
                className={`ps-4 side ${
                  selectedLink === "/geofence" ? "selected-link" : ""
                }`}
              >
                <Suspense fallback={<Skeleton width="24px" height="24px" />}>
                  <ShareLocationOutlinedIcon className="m-2" />
                </Suspense>
                Geofence
              </Link>
            </ul>
          )}

          <div className="dropside" onClick={toggleSidebar("customization")}>
            App Customization
            <button>
              <CaretRightOutlined />
            </button>
          </div>
          {openDropdown === "customization" && (
            <ul className="ul-side">
              <Link
                to="/customer-app"
                className={`ps-4 side flex items-center ${
                  selectedLink === "/customer-app" ? "selected-link" : ""
                }`}
              >
                <Suspense fallback={<Skeleton width="24px" height="24px" />}>
                  <LuFolderCog className="m-2 text-[20px]" />
                </Suspense>
                Customer App
              </Link>
              <Link
                to="/agent-app"
                className={`ps-4 side flex items-center ${
                  selectedLink === "/agent-app" ? "selected-link" : ""
                }`}
              >
                <Suspense fallback={<Skeleton width="24px" height="24px" />}>
                  <LuFolderCog className="m-2 text-[20px]" />
                </Suspense>
                Agent App
              </Link>
              <Link
                to="/merchant-app"
                className={`ps-4 side flex items-center ${
                  selectedLink === "/merchant-app" ? "selected-link" : ""
                }`}
              >
                <Suspense fallback={<Skeleton width="24px" height="24px" />}>
                  <LuFolderCog className="m-2 text-[20px] " />
                </Suspense>{" "}
                Merchant App
              </Link>
            </ul>
          )}
        </>
      )}

      <div className="dropside" onClick={toggleSidebar("account")}>
        Account
        <button>
          <CaretRightOutlined />
        </button>
      </div>
      {openDropdown === "account" && (
        <ul className="ul-side">
          {role === "Admin" && (
            <>
              <Link
                to="/activity-logs"
                className={`ps-4 side ${
                  selectedLink === "/activity-logs" ? "selected-link" : ""
                }`}
              >
                <Suspense fallback={<Skeleton width="24px" height="24px" />}>
                  <IoMdTime className="m-2" size={24} />
                </Suspense>
                Activity logs
              </Link>

              <Link
                to="/account-logs"
                className={`ps-4 side ${
                  selectedLink === "/account-logs" ? "selected-link" : ""
                }`}
              >
                <Suspense fallback={<Skeleton width="24px" height="24px" />}>
                  <AppBlockingOutlinedIcon className="m-2" />
                </Suspense>
                Account logs
              </Link>
            </>
          )}

          <Link
            to="/settings"
            className={`ps-4 side ${
              selectedLink === "/settings" ? "selected-link" : ""
            }`}
          >
            <Suspense fallback={<Skeleton width="24px" height="24px" />}>
              <SettingsOutlinedIcon className="m-2" />
            </Suspense>
            Settings
          </Link>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
