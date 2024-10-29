import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../App.css";

import {
  HomeOutlined as HomeOutlinedIcon,
  BookOutlined as BookOutlinedIcon,
  StorefrontOutlined as StorefrontOutlinedIcon,
  ListAltOutlined as ListAltOutlinedIcon,
  GroupsOutlined as GroupsOutlinedIcon,
  AssignmentIndOutlined as AssignmentIndOutlinedIcon,
  TwoWheelerOutlined as TwoWheelerOutlinedIcon,
  PercentOutlined as PercentOutlinedIcon,
  AppBlockingOutlined as AppBlockingOutlinedIcon,
  SettingsOutlined as SettingsOutlinedIcon,
  ManageAccountsOutlined as ManageAccountsOutlinedIcon,
  NotificationsNoneOutlined as NotificationsNoneOutlinedIcon,
  NotificationImportantOutlined as NotificationImportantOutlinedIcon,
  EditNotificationsOutlined as EditNotificationsOutlinedIcon,
  CrisisAlertOutlined as CrisisAlertOutlinedIcon,
  CampaignOutlined as CampaignOutlinedIcon,
  RedeemOutlined as RedeemOutlinedIcon,
  HubOutlined as HubOutlinedIcon,
  LoyaltyOutlined as LoyaltyOutlinedIcon,
  ShareLocationOutlined as ShareLocationOutlinedIcon,
} from "@mui/icons-material";
import { CaretRightOutlined } from "@ant-design/icons";
import { BsPersonLinesFill } from "react-icons/bs";
import { LuFolderCog } from "react-icons/lu";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { UserContext } from "../context/UserContext";
import { AiOutlineGift } from "react-icons/ai";
import { IoMdTime } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";

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
          src="https://firebasestorage.googleapis.com/v0/b/famto-aa73e.appspot.com/o/admin_panel_assets%2FAsset%206.svg?alt=media&token=a611c00b-b1de-4968-9bb2-5e9440f55945"
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
          <HomeOutlinedIcon className="m-2 " />
          Home
        </Link>
        <Link
          to="/all-orders"
          className={`ps-4 side ${
            selectedLink === "/all-orders" ||
            selectedLink === "/create-order" ||
            /^\/order-details\/[A-Za-z0-9]+$/.test(selectedLink)
              ? "selected-link"
              : ""
          }`}
        >
          <BookOutlinedIcon className="m-2" />
          Orders
        </Link>
        {role === "Admin" && (
          <Link
            to="/all-merchants"
            className={`ps-4 side ${
              selectedLink === "/all-merchants" ||
              /^\/merchant-detail\/[A-Za-z0-9]+$/.test(selectedLink)
                ? "selected-link"
                : ""
            }`}
          >
            <StorefrontOutlinedIcon className="m-2" />
            Merchants
          </Link>
        )}
        <Link
          to="/products"
          className={`ps-4 side ${
            selectedLink === "/products" ? "selected-link" : ""
          }`}
        >
          <ListAltOutlinedIcon className="m-2" />
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
          <GroupsOutlinedIcon className="m-2" />
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
              <AssignmentIndOutlinedIcon className="m-2" />
              Delivery Agents
            </Link>

            <Link
              to="/delivery-management"
              className={`ps-4 side ${
                selectedLink === "/delivery-management" ? "selected-link" : ""
              }`}
            >
              <TwoWheelerOutlinedIcon className="m-2" />
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
          <PercentOutlinedIcon className="flex mr-[3px] m-2" />
          Commission/Subscription
        </Link>
        {role === "Admin" && (
          <Link
            to="/chat"
            className={`ps-4 side ${
              selectedLink === "/chat" ? "selected-link" : ""
            }`}
          >
            <FaWhatsapp className="m-[7px] text-[25px]" />
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
            <AiOutlineGift className="me-2 ms-2 mb-1" size={"25px"} />
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
                <CampaignOutlinedIcon className="m-2" />
                Ad banner
              </Link>

              <Link
                to="/loyality-point"
                className={`ps-4 side ${
                  selectedLink === "/loyality-point" ? "selected-link" : ""
                }`}
              >
                <LoyaltyOutlinedIcon className="m-2" />
                Loyality Point
              </Link>

              <Link
                to="/promo-code"
                className={`ps-4 side ${
                  selectedLink === "/promo-code" ? "selected-link" : ""
                }`}
              >
                <RedeemOutlinedIcon className="m-2" />
                Promo code
              </Link>

              <Link
                to="/referral"
                className={`ps-4 side ${
                  selectedLink === "/referral" ? "selected-link" : ""
                }`}
              >
                <HubOutlinedIcon className="m-2" />
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
            <NotificationsNoneOutlinedIcon className="m-2" />
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
                <NotificationImportantOutlinedIcon className="m-2" />
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
                <EditNotificationsOutlinedIcon className="m-2" />
                Notification Settings
              </Link>

              <Link
                to="/alert-notification"
                className={`ps-4 side ${
                  selectedLink === "/alert-notification" ? "selected-link" : ""
                }`}
              >
                <CrisisAlertOutlinedIcon className="m-2" />
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
                <BsPersonLinesFill className="m-2 text-[20px]" />
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
                <FaIndianRupeeSign className="m-2 text-[20px]" />
                Pricing
              </Link>
              <Link
                to="/all-tax"
                className={`ps-4 side ${
                  selectedLink === "/all-tax" ? "selected-link" : ""
                }`}
              >
                <PercentOutlinedIcon className="m-2" />
                Tax
              </Link>
              <Link
                to="/geofence"
                className={`ps-4 side ${
                  selectedLink === "/geofence" ? "selected-link" : ""
                }`}
              >
                <ShareLocationOutlinedIcon className="m-2" />
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
                <LuFolderCog className="m-2 text-[20px]" />
                Customer App
              </Link>
              <Link
                to="/agent-app"
                className={`ps-4 side flex items-center ${
                  selectedLink === "/agent-app" ? "selected-link" : ""
                }`}
              >
                <LuFolderCog className="m-2 text-[20px]" />
                Agent App
              </Link>
              <Link
                to="/merchant-app"
                className={`ps-4 side flex items-center ${
                  selectedLink === "/merchant-app" ? "selected-link" : ""
                }`}
              >
                <LuFolderCog className="m-2 text-[20px] " /> Merchant App
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
                <IoMdTime className="m-2" size={24} />
                Activity logs
              </Link>

              <Link
                to="/account-logs"
                className={`ps-4 side ${
                  selectedLink === "/account-logs" ? "selected-link" : ""
                }`}
              >
                <AppBlockingOutlinedIcon className="m-2" />
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
            <SettingsOutlinedIcon className="m-2" />
            Settings
          </Link>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
