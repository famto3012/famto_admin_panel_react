import React, { useState } from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import TwoWheelerOutlinedIcon from '@mui/icons-material/TwoWheelerOutlined';
import PercentOutlinedIcon from '@mui/icons-material/PercentOutlined';
import { CaretRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpened, setIsOpened] = useState(false);

  const toggleSidebar = () => {
    setIsOpened(!isOpened);
  };

  return (
    <section >
      <div className="fixed w-64 h-screen bg-gradient-to-t from-teal-700 to-cyan-500 p-4 font-poppins">
        <div className="flex gap-3 ml-[10px] mt-[30px]">
          <img src="whitelogo.svg" alt="Logo" />
          <h1 className="text-white font-poppins font-medium text-2xl">Famto</h1>
        </div>
        <div className="flex items-center justify-between text-white mt-[20px]">
            General
            <button onClick={toggleSidebar}><CaretRightOutlined /></button>
       </div>
          {isOpened && (
          <ul className="flex flex-col text-[14px] text-gray-300 ml-[2px] mt-[30px] w-full">
          <Link to="/home" className="side"><HomeOutlinedIcon className="m-2"/>Home</Link>
          <Link to="/orders" className="side"><BookOutlinedIcon className="m-2"/>Orders</Link>
          <Link to="/merchants" className="side"><StorefrontOutlinedIcon className="m-2"/>Merchants</Link>
          <Link to="/products" className="side"><ListAltOutlinedIcon className="m-2"/>Products</Link>
          <Link to="/customers" className="side"><GroupsOutlinedIcon className="m-2"/>Customers</Link>
          <Link to="/deliveryagent" className="side"><AssignmentIndOutlinedIcon className="m-2"/>Delivery Agents</Link>
          <Link to="/deliverymanagement" className="side"><TwoWheelerOutlinedIcon className="m-2"/>Delivery Management</Link>
          <Link to="commission" className="side"><PercentOutlinedIcon className="m-2"/>Commission/Subscription</Link>
          </ul>
          )}
      <div className="dropside"> Marketing <CaretRightOutlined /></div>
       <div className="dropside"> Notification <CaretRightOutlined /> </div>
       <div className="dropside"> Configure <CaretRightOutlined /></div>
       <div className="dropside"> App Customization <CaretRightOutlined /></div>
       <div className="dropside"> Account <CaretRightOutlined /></div>
       </div>
    </section>
  );
};

export default Sidebar;