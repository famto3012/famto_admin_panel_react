import { useContext, useEffect, useState } from "react";
import {
  PlusOutlined,
  ArrowDownOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import GlobalSearch from "../../../components/GlobalSearch";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [deliveryMode, setDeliveryMode] = useState("");
  const [search, setSearch] = useState("");

  const { token, role } = useContext(UserContext);

  const navigate = useNavigate();

  const onSearch = (e) => {
    let text = e.target.value;
    setSearch(text);
  };

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }

    const getAllOrders = async () => {
      try {
        setIsTableLoading(true);
        const endpoint =
          role === "Admin"
            ? `${BASE_URL}/orders/admin/all-orders`
            : `${BASE_URL}/orders/all-orders`;

        const response = await axios.get(endpoint, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setOrders(response.data.data);
        }
      } catch (err) {
        console.log(`Error in getting all orders: ${err}`);
      } finally {
        setIsTableLoading(false);
      }
    };

    getAllOrders();
  }, [token]);

  useEffect(() => {
    if (!orderStatus && !paymentMode && !deliveryMode) return;
    const filterHandler = async () => {
      try {
        setIsTableLoading(true);
        let endpoint =
          role === "Admin"
            ? `${BASE_URL}/orders/admin/filter`
            : `${BASE_URL}/orders/filter`;

        const params = [];
        if (orderStatus) params.push(`status=${orderStatus}`);
        if (paymentMode) params.push(`paymentMode=${paymentMode}`);
        if (deliveryMode) params.push(`deliveryMode=${deliveryMode}`);

        if (params.length > 0) {
          endpoint += `?${params.join("&")}`;
        }

        const response = await axios.get(endpoint, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setOrders(response.data.data);
        }
      } catch (err) {
        console.log(`Error in filtering orders: ${err}`);
      } finally {
        setIsTableLoading(false);
      }
    };

    filterHandler();
  }, [orderStatus, paymentMode, deliveryMode, token, role]);

  useEffect(() => {
    const searchOrder = async () => {
      try {
        if (search.trim() !== "") {
          setIsTableLoading(true);

          const endpoint =
            role === "Admin"
              ? `${BASE_URL}/orders/admin/search-order?query=${search}`
              : `${BASE_URL}/orders/search?query=${search}`;

          const response = await axios.get(endpoint, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.status === 200) {
            setOrders(response.data.data);
          }
        }
      } catch (err) {
        console.log(
          `Error in searching orders: ${err.response?.data || err.message}`
        );
      } finally {
        setIsTableLoading(false);
      }
    };

    const timeOut = setTimeout(() => {
      searchOrder();
    }, 500);

    return () => {
      clearTimeout(timeOut);
    };
  }, [search, token, role]);

  const handleConfirmOrder = async (orderId) => {
    try {
      const endpoint =
        role === "Admin"
          ? `${BASE_URL}/orders/admin/confirm-order/${orderId}`
          : `${BASE_URL}/orders/confirm-order/${orderId}`;

      const response = await axios.patch(
        endpoint,
        {},
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId
              ? { ...order, orderStatus: "On-going" }
              : order
          )
        );
      }
    } catch (err) {
      console.log(`Error in confirming order: ${err}`);
    }
  };

  const handleRejectOrder = async (orderId) => {
    try {
      const endpoint =
        role === "Admin"
          ? `${BASE_URL}/orders/admin/reject-order/${orderId}`
          : `${BASE_URL}/orders/reject-order/${orderId}`;

      const response = await axios.put(
        endpoint,
        {},
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId
              ? { ...order, orderStatus: "Cancelled" }
              : order
          )
        );
      }
    } catch (err) {
      console.log(`Error in rejecting order: ${err}`);
    }
  };

  return (
    <>
      <Sidebar />
      <main className="pl-[300px] bg-gray-100 h-screen overflow-auto">
        <nav className="p-5">
          <GlobalSearch />
        </nav>

        <div className="flex justify-between items-center px-[30px]">
          <h1 className="text-[18px] font-semibold">Orders</h1>
          <div className="flex space-x-2 justify-end">
            <button className="bg-cyan-100 text-black rounded-md px-4 py-2 font-semibold flex items-center space-x-2">
              <ArrowDownOutlined /> <span>CSV</span>
            </button>
            <div>
              <button className="bg-teal-700 text-white rounded-md px-4 py-2 font-semibold flex items-center space-x-1">
                <PlusOutlined />
                <Link to="/create-order">
                  <span>Create Order</span>
                </Link>
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center bg-white p-3 mx-5 rounded-lg justify-between mt-[20px] px-[30px]">
          <div className="flex items-center gap-[20px]">
            <select
              id="orderStatus"
              name="orderStatus"
              className="bg-blue-50 text-gray-900 text-sm rounded-lg focus:outline-none outline-none block w-full p-2.5"
              value={orderStatus}
              onChange={(e) => setOrderStatus(e.target.value)}
            >
              <option defaultValue={"Order status"} hidden>
                Order Status
              </option>
              <option value="Pending">Pending</option>
              <option value="On-going">On-going</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <select
              id="paymentMode"
              name="paymentMode"
              className="bg-blue-50 text-gray-900 text-sm rounded-lg focus:outline-none outline-none block w-fit p-2.5"
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
            >
              <option defaultValue={"Payment mode"} hidden>
                Payment Mode
              </option>
              <option value="Cash-on-delivery">Cash on delivery</option>
              <option value="Online-payment">Online payment</option>
              <option value="Famto-cash">Famto cash</option>
            </select>

            <select
              id="deliveryMode"
              name="deliveryMode"
              className="bg-blue-50 w-fit text-gray-900 text-sm rounded-lg focus:outline-none outline-none block p-2.5"
              value={deliveryMode}
              onChange={(e) => setDeliveryMode(e.target.value)}
            >
              <option defaultValue={"Delivery mode"} hidden>
                Delivery Mode
              </option>
              <option value="Home Delivery">Home Delivery</option>
              <option value="Take Away">Take Away</option>
              <option value="Pick and Drop">Pick and Drop</option>
              <option value="Custom Order">Custom Order</option>
            </select>
          </div>

          <div className="flex items-center gap-[20px]">
            <div>
              <FilterAltOutlinedIcon className="mt-2 text-gray-400" />
            </div>

            <div>
              <input
                type="search"
                className="bg-gray-100 relative p-3 rounded-3xl focus:outline-none outline-none"
                placeholder="Search order id"
                onChange={onSearch}
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto mt-[20px]  w-full">
          <table className="text-center w-full">
            <thead>
              <tr>
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
                  "Amount",
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
              {isTableLoading && (
                <tr>
                  <td colSpan={10} className="text-center py-[20px] bg-gray-50">
                    Loading data...
                  </td>
                </tr>
              )}

              {!isTableLoading && orders.length === 0 && (
                <tr>
                  <td colSpan={10} className="text-center py-[20px] bg-gray-50">
                    No data available
                  </td>
                </tr>
              )}

              {!isTableLoading &&
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className={`align-middle border-b border-gray-300 ${
                      order.orderStatus === "Pending"
                        ? "bg-red-500 text-white"
                        : "text-black"
                    }`}
                  >
                    <td className="p-4 underline underline-offset-2">
                      <Link to={`/order-details/${order._id}`}>
                        #{order._id}
                      </Link>
                    </td>
                    <td className="p-4 w-[120px]">
                      <div className="flex space-x-2 justify-center">
                        <>
                          {order.orderStatus === "Completed" && (
                            <p className=" text-green-500">Completed</p>
                          )}

                          {order.orderStatus === "Cancelled" && (
                            <p className=" text-red-500">Cancelled</p>
                          )}

                          {order.orderStatus === "On-going" && (
                            <p className=" text-orange-500">On-going</p>
                          )}

                          {order.orderStatus === "Pending" && (
                            <>
                              <CheckCircleOutlined
                                className="text-2xl cursor-pointer text-white"
                                onClick={() => handleConfirmOrder(order._id)}
                              />
                              <CloseCircleOutlined
                                className="text-2xl cursor-pointer text-white"
                                onClick={() => handleRejectOrder(order._id)}
                              />
                            </>
                          )}
                        </>
                      </div>
                    </td>
                    <td className="py-4 w-[200px] text-center">
                      {order.merchantName}
                    </td>
                    <td className="p-4">{order.customerName}</td>
                    <td className="p-4">{order.deliveryMode}</td>
                    <td className="p-4 w-[120px] text-center">
                      <p>{order.orderDate}</p>
                      <p>{order.orderTime}</p>
                    </td>
                    <td className="p-4 w-[120px]  text-center">
                      <>
                        {(!order?.deliveryDate || !order?.deliveryTime) && (
                          <p>N/A</p>
                        )}

                        {(order?.deliveryDate || order?.deliveryTime) && (
                          <>
                            <p>{order.deliveryDate}</p>
                            <p>{order.deliveryTime}</p>
                          </>
                        )}
                      </>
                    </td>
                    <td className="p-4">{order.paymentMethod}</td>
                    <td className="p-4">{order.deliveryOption}</td>
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
