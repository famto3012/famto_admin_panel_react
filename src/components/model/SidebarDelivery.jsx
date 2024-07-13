import React, { useState } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import TwoWheelerOutlinedIcon from "@mui/icons-material/TwoWheelerOutlined";
import PercentOutlinedIcon from "@mui/icons-material/PercentOutlined";
import AppBlockingOutlinedIcon from "@mui/icons-material/AppBlockingOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { CaretRightOutlined } from "@ant-design/icons";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import NotificationImportantOutlinedIcon from '@mui/icons-material/NotificationImportantOutlined';
import EditNotificationsOutlinedIcon from '@mui/icons-material/EditNotificationsOutlined';
import CrisisAlertOutlinedIcon from '@mui/icons-material/CrisisAlertOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import RedeemOutlinedIcon from '@mui/icons-material/RedeemOutlined';
import HubOutlinedIcon from '@mui/icons-material/HubOutlined';
import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined';
import ShareLocationOutlinedIcon from '@mui/icons-material/ShareLocationOutlined';
import { BsPersonLinesFill } from "react-icons/bs";
import { LuFolderCog } from "react-icons/lu";
import { Link } from "react-router-dom";


const SidebarDelivery = () => {

  const [ismarketingOpen, setMarketingOpen] = useState(false);
  const [isnotifcationOpen, setNotificationOpen] = useState(false);
  const [isconfigureOpen, setConfigureOpen] = useState(false);
  const [isappOpen, setAppOpen] = useState(false);
  const [isaccountOpen, setAccountOpen] = useState(false);



  const toggleSidebar1 = () => {
    setMarketingOpen(!ismarketingOpen);
  };

  const toggleSidebar2 = () => {
    setNotificationOpen(!isnotifcationOpen);
  };

  const toggleSidebar3 = () => {
    setConfigureOpen(!isconfigureOpen);
  };

  const toggleSidebar4 = () => {
    setAppOpen(!isappOpen);
  };
  const toggleSidebar5 = () => {
    setAccountOpen(!isaccountOpen);
  };

  return (
    <div className="fixed w-[4rem] h-full bg-gradient-to-t from-teal-700 to-cyan-500 p-4 font-poppins overflow-y-auto">
      <div className="flex gap-3 ml-[6px] mt-[30px]">
        <img src="whitelogo.svg" alt="Logo" />
      </div>
      <div className="dropside">
    
       </div>
      
      
  
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
    

      <div className="dropside">

        <button onClick={toggleSidebar1}>
          <CaretRightOutlined />
        </button>
      </div>
      {ismarketingOpen && (
        <ul className="ul-side">
          <Link to="/ad-banner" className="side">
            <CampaignOutlinedIcon className="m-2" />
         
          </Link>
          <Link to="/discount" className="side">
            <HomeOutlinedIcon className="m-2" />
         
          </Link>
          <Link to="/loyality-point" className="side">
            <LoyaltyOutlinedIcon className="m-2" />
    
          </Link>
          <Link to="/promo-code" className="side">
            <RedeemOutlinedIcon className="m-2" />
  
          </Link>
          <Link to="/referral" className="side">
            <HubOutlinedIcon className="m-2" />
          </Link>
        </ul>
      )}

      <div className="dropside">

        <button onClick={toggleSidebar2}>
          <CaretRightOutlined />
        </button>
      </div>
      {isnotifcationOpen && (
        <ul className="ul-side">
          <Link to="/notification-log" className="side">
            <NotificationsNoneOutlinedIcon className="m-2" />
      
          </Link>
          <Link to="/push-notification" className="side">
            <NotificationImportantOutlinedIcon className="m-2" />
       
          </Link>
          <Link to="/notification-settings" className="side">
            <EditNotificationsOutlinedIcon className="m-2" />
     
          </Link>
          <Link to="/alert-notification" className="side">
            <CrisisAlertOutlinedIcon className="m-2" />
      
          </Link>
          
        </ul>
      )}

      <div className="dropside">
        <button onClick={toggleSidebar3}>
          <CaretRightOutlined />
        </button>
      </div>
      {isconfigureOpen && (
        <ul className="ul-side">
          <Link to="/all-managers" className=" hover:bg-cyan-400 hover:text-white flex items-center gap-2">
          <BsPersonLinesFill className="m-2 text-[20px]" />
              </Link>
          <Link to="/roles" className="side">
            <ManageAccountsOutlinedIcon className="m-2" />
          </Link>
          <Link to="/pricing" className="side">
            <CurrencyRupeeOutlinedIcon className="m-2" />
          </Link>
          <Link to="/all-tax" className="side">
            <PercentOutlinedIcon className="m-2" />
                </Link>
          <Link to="/geofence" className="side">
            <ShareLocationOutlinedIcon className="m-2" />
                </Link>
        </ul>
      )}

      <div className="dropside">
        <button onClick={toggleSidebar4}>
          <CaretRightOutlined />
        </button>
      </div>
      {isappOpen && (
        <ul className="ul-side">
          <Link to="/customer-app" className=" hover:bg-cyan-400 hover:text-white flex items-center gap-2">
          <LuFolderCog className="m-2 text-[25px]" />
          </Link>
          <Link to="/agent-app" className=" hover:bg-cyan-400 hover:text-white flex items-center gap-2">
          <LuFolderCog className="m-2 text-[25px]" />
            </Link>
          <Link to="/merchant-app" className=" hover:bg-cyan-400 hover:text-white flex items-center gap-2">
          <LuFolderCog className="m-2 text-[25px] " /> Merchant App
          </Link>
        </ul>
      )}

      <div className="dropside">

        <button onClick={toggleSidebar5}>
          <CaretRightOutlined />
        </button>
      </div>
      {isaccountOpen && (
        <ul className="ul-side">
          <Link to="/account-logs" className="side">
            <AppBlockingOutlinedIcon className="m-2" />
                 </Link>
          <Link to="/settings" className="side">
            <SettingsOutlinedIcon className="m-2" />
          </Link>
        </ul>
      )}
    </div>
  );
};

export default SidebarDelivery;