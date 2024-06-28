import React, { useState } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import TwoWheelerOutlinedIcon from "@mui/icons-material/TwoWheelerOutlined";
import PercentOutlinedIcon from "@mui/icons-material/PercentOutlined";
import AppBlockingOutlinedIcon from '@mui/icons-material/AppBlockingOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { CaretRightOutlined } from "@ant-design/icons";
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isgeneralOpen, setGeneralOpen] = useState(false);
  const [ismarketingOpen, setMarketingOpen] = useState(false);
  const [isnotifcationOpen, setNotificationOpen] = useState(false);
  const [isconfigureOpen, setConfigureOpen] = useState(false);
  const [isappOpen, setAppOpen] = useState(false);
  const [isaccountOpen, setAccountOpen] = useState(false);


  const toggleSidebar1= () => {
    setGeneralOpen(!isgeneralOpen);
  };

  const toggleSidebar2= () => {
    setMarketingOpen(!ismarketingOpen);
  };

  const toggleSidebar3= () => {
    setNotificationOpen(!isnotifcationOpen);
  };

  const toggleSidebar4= () => {
    setConfigureOpen(!isconfigureOpen);
  };

  const toggleSidebar5= () => {
    setAppOpen(!isappOpen);
  };
  const toggleSidebar6= () => {
    setAccountOpen(!isaccountOpen);
  };




  return (
    <div className="fixed w-[250px] h-full bg-gradient-to-t from-teal-700 to-cyan-500 p-4 font-poppins overflow-y-auto">
      <div className="flex gap-3 ml-[10px] mt-[30px]">
        <img src="whitelogo.svg" alt="Logo" />
        <h1 className="text-white font-poppins font-medium text-2xl">Famto</h1>
      </div>
      <div className="dropside">
        General
        <button onClick={toggleSidebar1}><CaretRightOutlined /></button>
      </div>
      {isgeneralOpen && (
        <ul className="ul-side">
          <Link to="/home" className="side"><HomeOutlinedIcon className="m-2" />Home</Link>
          <Link to="/orders" className="side"><BookOutlinedIcon className="m-2" />Orders</Link>
          <Link to="/merchants" className="side"><StorefrontOutlinedIcon className="m-2" />Merchants</Link>
          <Link to="/products" className="side"><ListAltOutlinedIcon className="m-2" />Products</Link>
          <Link to="/customers" className="side"><GroupsOutlinedIcon className="m-2" />Customers</Link>
          <Link to="/deliveryagent" className="side"><AssignmentIndOutlinedIcon className="m-2" />Delivery Agents</Link>
          <Link to="/deliverymanagement" className="side"><TwoWheelerOutlinedIcon className="m-2" />Delivery Management</Link>
          <Link to="commission" className="side"><PercentOutlinedIcon className="flex mr-[3px] m-2"/>Commission/Subscription</Link>
        </ul>
      )}

       <div className="dropside">
        Marketing
        <button onClick={toggleSidebar2}><CaretRightOutlined /></button>
      </div>
      {ismarketingOpen && (
        <ul className="ul-side">
          <Link to="/options" className="side"><HomeOutlinedIcon className="m-2" />Option</Link>
         </ul>
      )}


      <div className="dropside">
         Notification
        <button onClick={toggleSidebar3}><CaretRightOutlined /></button>
      </div>
      {isnotifcationOpen && (
        <ul className="ul-side">
          <Link to="/options" className="side"><HomeOutlinedIcon className="m-2" />Option</Link>
         </ul>
      )}


      <div className="dropside">
         Configure
        <button onClick={toggleSidebar4}><CaretRightOutlined /></button>
      </div>
      {isconfigureOpen && (
        <ul className="ul-side">
           <Link to="/roles" className="side"><PersonOutlineOutlinedIcon className="m-2" />Managers</Link>
          <Link to="/roles" className="side"><ManageAccountsOutlinedIcon className="m-2" />Roles</Link>
          <Link to="/customer-app-edits" className="side">< SettingsOutlinedIcon className="m-2"/>Customer App Edits</Link>
          <Link to="/pricing" className="side"><CurrencyRupeeOutlinedIcon className="m-2" />Pricing</Link>
          <Link to="/tax" className="side"><PercentOutlinedIcon className="m-2" />Tax</Link>
          </ul>
      )}


      <div className="dropside">
         App Customization
        <button onClick={toggleSidebar5}><CaretRightOutlined /></button>
      </div>
      {isappOpen && (
        <ul className="ul-side">
          <Link to="/options" className="side"><HomeOutlinedIcon className="m-2" />Option</Link>
         </ul>
      )}

      
      <div className="dropside">
         Account
        <button onClick={toggleSidebar6}><CaretRightOutlined /></button>
      </div>
      {isaccountOpen && (
        <ul className="ul-side">
          <Link to="/accountlogs" className="side"><AppBlockingOutlinedIcon className="m-2" />Account logs</Link>
          <Link to="/settings" className="side"><SettingsOutlinedIcon className="m-2" />Settings</Link>
        </ul>
      )}

    </div>
  );
};

export default Sidebar;
