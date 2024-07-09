import React, { useEffect, useState } from "react";
import {
  SearchOutlined,
  BellOutlined,
  PlusOutlined,
  ArrowDownOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { Link } from "react-router-dom";
import { Modal, Switch } from "antd";
import Sidebar from "../../../components/Sidebar";

const Orders = () => {
  const [order, setOrder] = useState([]);

  const handleToggle = (id) => {
    setOrder((prevOrder) =>
      prevOrder.map((order) =>
        order.id === id
          ? { ...order, status: !order.status }
          : order
      )
    );
  };

  const handleApprove = (id) => {
    setOrder((prevOrder) =>
      prevOrder.map((order) =>
        prder.id === id
          ? { ...order, registrationApproval: "approved" }
          : order
      )
    );
  };

  const handleReject = (id) => {
    setOrder((prevOrder) =>
      prevOrder.map((order) =>
        order.id === id
          ? { ...order, registrationApproval: "rejected" }
          : order
      )
    );
  };

  useEffect(() => {
    const fetchOrder = async () => {
      const dummyData = [
        {
          id: "01",
          name: "Merchant One",
          phone: "1234567890",
          rating: 4.5,
          subscriptionStatus: "Active",
          serviceable: "Yes",
          geofence: "geofence",
          status: "Approved",
          registrationApproval: "Pending",
          delivery : "on-demand",
          amount : "1000"
        },
        {
          id: "02",
          name: "Merchant Two",
          phone: "0987654321",
          rating: 3.8,
          subscriptionStatus: "Inactive",
          serviceable: "No",
          geofence: "geofence",
          status: "Pending",
          registrationApproval: "Approved",
           delivery : "on-demand",
          amount : "1000"
        },
      ];
      setOrder(dummyData);
    };

    fetchOrder();
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

 



  return (
    <>
      <Sidebar />
      <main className="pl-[300px]">
        <div className="flex items-center gap-[20px] justify-end py-[20px] pe-[30px]">
          <BellOutlined className="text-2xl text-gray-500" />
          <div className="relative">
            <input
              type="search"
              name="search"
              placeholder="Search"
              className="bg-gray-100 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
            />
            <button type="submit" className="absolute right-0 top-0 mt-2 mr-4">
              <SearchOutlined className="text-xl text-gray-600" />
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center px-[30px]">
          <h1 className="text-[18px] font-semibold">Orders</h1>
          <div className="flex space-x-2 justify-end ">
            <button className="bg-cyan-100 text-black rounded-md px-4 py-2 font-semibold flex items-center space-x-2">
              <ArrowDownOutlined /> <span>CSV</span>
            </button>
            <div>
              <button
                className="bg-teal-700 text-white rounded-md px-4 py-2 font-semibold  flex items-center space-x-1 "
            
              >
                <PlusOutlined /><Link to="/create-order"> <span>Create Order</span></Link>
              </button>
              
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-[20px] px-[30px]">
          <div className="flex items-center gap-[20px]">
            <select
              id="serviceable"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option selected hidden>
                Order Status
              </option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>

            <select
              id="eofence"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5"
            >
              <option selected hidden>
                Payment Mode
              </option>
              <option value="US">Online</option>
            </select>

            <select
              id="businessCategory"
              className="bg-gray-50 border border-gray-300 w-fit text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            >
              <option selected hidden>
                Delivery Mode 
              </option>
              <option value="US">Home delivery</option>
            </select>
          </div>

          <div className="flex items-center gap-[30px]">
            <div>
              <FilterAltOutlinedIcon className="mt-2 text-gray-400   " />
            </div>
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                class="bg-gray-50 border border-gray-300 outline-none focus:outline-none text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5  "
                placeholder="Search Order Id"
                required
              />
            </div>
          </div>
        </div>

        <div className="overflow-auto mt-[20px] w-full">
          <table className="text-start w-full">
            <thead>
              <tr className="">
                {[
                  "Order ID",
                  "Order Status",
                  "Merchant Name",
                  "Customer Name",
                  "Delivery Mode",
                  "Order Time",
                  "Delivery Time",
                  "Payment Method",
                  "Delivery Option",
                  "Amount"
                ].map((header) => (
                  <th
                    key={header}
                    className="bg-teal-700 text-center text-white py-[20px] border-r-2 border-[#eee]/50"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {order.map((order) => (
                <tr
                  key={order.id}
                  className="align-middle border-b border-gray-300"
                >
                  <td className="p-4">
                    <Link to={`/order-details/${order.id}`}>
                      {order.id}
                    </Link>
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2 justify-center">
                      <CheckCircleOutlined
                        className="text-2xl cursor-pointer text-green-500"
                        onClick={() => handleApprove(order.id)}
                      />
                      <CloseCircleOutlined
                        className="text-2xl cursor-pointer text-red-500"
                        onClick={() => handleReject(order.id)}
                      />
                    </div>
                  </td>
                  <td className="p-4">{order.name}</td>
                  <td className="p-4">{order.phone}</td>
                  <td className="p-4">{order.rating}</td>
                  <td className="p-4">{order.subscriptionStatus}</td>
                  <td className="p-4">{order.serviceable}</td>
                  <td className="p-4">{order.geofence}</td>
                  <td className="p-4">{order.delivery}</td>
                  <td className="p-4">{order.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default Orders;
