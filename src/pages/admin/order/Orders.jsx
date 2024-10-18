import { useContext, useEffect, useState } from "react";
import {
  PlusOutlined,
  ArrowDownOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar";
import GlobalSearch from "../../../components/GlobalSearch";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";
import { Pagination } from "@mui/material";
import { Badge, Spinner, Stack, useToast } from "@chakra-ui/react";
import { useSocket } from "../../../context/SocketContext";
import { Modal } from "antd";
import Select from "react-select";
import {
  orderStatusOption,
  paymentModeOption,
  deliveryModeOption,
} from "../../../utils/DefaultData";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [deliveryOption, setDeliveryOption] = useState(true);

  const [isTableLoading, setIsTableLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [CSVDownloadLoading, setCSVDownloadLoading] = useState(false);
  const [orderActionLoading, setOrderActionLoading] = useState({});
  const [isModalReject, setIsModalReject] = useState(false);

  const [orderStatus, setOrderStatus] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [deliveryMode, setDeliveryMode] = useState("");
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [pagination, setPagination] = useState({});
  const [unSeenCount, setUnSeenCount] = useState(0);

  const { token, role } = useContext(UserContext);
  const { socket } = useSocket();
  const toast = useToast();
  const navigate = useNavigate();

  const onSearch = (e) => {
    let text = e.target.value;
    setSearch(text);
  };

  const showModalReject = () => setIsModalReject(true);
  const handleCancel = () => {
    setIsModalReject(false);
  };

  useEffect(() => {
    const handleNewOrder = (orderData) => {
      setOrders((prevOrders) => [orderData, ...prevOrders]);
    };

    const handleChangeAccepterOrderStatus = ({ orderId }) => {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, orderStatus: "On-going" } : order
        )
      );
    };

    const handleChangeRejectedOrderStatus = ({ orderId }) => {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, orderStatus: "Cancelled" } : order
        )
      );
    };

    socket?.on("newOrderCreated", handleNewOrder);
    socket?.on("orderAccepted", handleChangeAccepterOrderStatus);
    socket?.on("orderRejected", handleChangeRejectedOrderStatus);
    socket?.on("error", (message) => {
      console.log(message);
    });

    return () => {
      socket?.off("newOrderCreated", handleNewOrder);
      socket?.off("orderAccepted", handleChangeAccepterOrderStatus);
      socket?.off("orderRejected", handleChangeRejectedOrderStatus);
    };
  }, [socket]);

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }

    getAllOrders();
  }, [token, page, limit, role, deliveryOption]);

  const getAllOrders = async () => {
    try {
      setIsTableLoading(true);
      let endpoint;

      if (role === "Admin" && deliveryOption === true) {
        endpoint = `${BASE_URL}/orders/admin/all-orders`;
      } else if (role === "Admin" && deliveryOption === false) {
        endpoint = `${BASE_URL}/orders/admin/all-scheduled-orders`;
      } else if (role === "Merchant" && deliveryOption === true) {
        endpoint = `${BASE_URL}/orders/all-orders`;
      } else if (role === "Merchant" && deliveryOption === false) {
        endpoint = `${BASE_URL}/orders/all-scheduled-orders`;
      }

      const response = await axios.get(endpoint, {
        params: { page, limit },
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setOrders(response.data.data);
        console.log("Order", response.data.data);
        setPagination(response.data.pagination);
        if (role === "Merchant" && deliveryOption === false) {
          setUnSeenCount(response.data.notSeen);
          console.log("Unseen", response.data.notSeen);
        }
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An error occoured while getting all orders",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsTableLoading(false);
    }
  };

  useEffect(() => {
    if (!orderStatus && !paymentMode && !deliveryMode) return;
    const filterHandler = async () => {
      try {
        setIsTableLoading(true);

        let endPoint;
        if (role === "Admin") {
          endPoint = deliveryOption
            ? `${BASE_URL}/orders/admin/filter`
            : `${BASE_URL}/orders/admin/filter-scheduled`;
        } else if (role === "Merchant") {
          endPoint = deliveryOption
            ? `${BASE_URL}/orders/filter`
            : `${BASE_URL}/orders/filter-scheduled`;
        }

        const params = [];
        if (orderStatus) params.push(`status=${orderStatus}`);
        if (paymentMode) params.push(`paymentMode=${paymentMode}`);
        if (deliveryMode) params.push(`deliveryMode=${deliveryMode}`);

        if (params.length > 0) {
          endPoint += `?${params.join("&")}`;
        }

        const response = await axios.get(endPoint, {
          params: { page, limit },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setOrders(response.data.data);
          setPagination(response.data.pagination);
        }
      } catch (err) {
        toast({
          title: "Error",
          description: "An error occoured while filtering the orders",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsTableLoading(false);
      }
    };

    filterHandler();
  }, [orderStatus, paymentMode, deliveryMode, token, role, page, limit]);

  useEffect(() => {
    const searchOrder = async () => {
      try {
        if (search.trim() !== "") {
          setIsTableLoading(true);

          let endPoint;
          if (role === "Admin") {
            endPoint = deliveryOption
              ? `${BASE_URL}/orders/admin/search-order?query=${search}`
              : `${BASE_URL}/orders/admin/search-scheduled-order?query=${search}`;
          } else if (role === "Merchant") {
            endPoint = deliveryOption
              ? `${BASE_URL}/orders/search?query=${search}`
              : `${BASE_URL}/orders/search-scheduled-order?query=${search}`;
          }

          const response = await axios.get(endPoint, {
            params: { page, limit },
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.status === 200) {
            setOrders(response.data.data);
            setPagination(response.data.pagination);
          }
        } else {
          getAllOrders();
        }
      } catch (err) {
        toast({
          title: "Error",
          description: "An error occoured while searching the order",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
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
  }, [search, token, role, page, limit]);

  // Filter options based on role
  const filteredOptions =
    role === "Merchant"
      ? deliveryModeOption.filter(
          (option) =>
            option.value !== "Pick and Drop" && option.value !== "Custom Order"
        )
      : deliveryModeOption;

  const handleConfirmOrder = async (orderId) => {
    try {
      setOrderActionLoading((prevLoading) => ({
        ...prevLoading,
        [orderId]: true,
      }));

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
      toast({
        title: "Error",
        description: "Error in confirming order",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setOrderActionLoading((prevLoading) => ({
        ...prevLoading,
        [orderId]: false,
      }));
    }
  };

  const handleRejectOrder = async (orderId) => {
    try {
      setOrderActionLoading((prevLoading) => ({
        ...prevLoading,
        [orderId]: true,
      }));
      setRejectLoading(true);

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
        setRejectLoading(false);
        setIsModalReject(false);
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Error in rejecting order",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setOrderActionLoading((prevLoading) => ({
        ...prevLoading,
        [orderId]: false,
      }));
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const getItemAriaLabel = (type, page, selected) => {
    switch (type) {
      case "page":
        return `${selected ? "" : "Go to "}page ${page}`;
      case "first":
        return "Go to first page";
      case "last":
        return "Go to last page";
      case "next":
        return "Go to next page";
      case "previous":
        return "Go to previous page";
      default:
        return "";
    }
  };

  const handleToggle = () => setDeliveryOption(!deliveryOption);

  const handleDownloadCSV = async (e) => {
    try {
      setCSVDownloadLoading(true);

      const endPoint =
        role === "Admin"
          ? `${BASE_URL}/orders/admin/download-csv`
          : `${BASE_URL}/orders/download-csv`;

      const response = await axios.get(endPoint, {
        params: { orderStatus, paymentMode, deliveryMode, query: search },
        responseType: "blob",
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // Create a URL for the file and trigger the download
        const url = window.URL.createObjectURL(new Blob([response.data]));

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Order_Data.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An error occoured while downloading CSV file",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setCSVDownloadLoading(false);
    }
  };

  const handleMarkAsReady = async (orderId) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/orders/mark-as-ready/${orderId}`,
        {},
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, isReady: true } : order
          )
        );
        toast({
          title: "Success",
          description: "Order marked as ready.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: err.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleMarkOrderCompleted = async (orderId) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/orders/mark-as-completed/${orderId}`,
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
              ? { ...order, orderStatus: "Completed" }
              : order
          )
        );
        toast({
          title: "Success",
          description: "Order marked as collected by customer.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An error occoured",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Sidebar />
      <main className="pl-[300px] bg-gray-100 h-screen overflow-auto">
        <nav className="p-5">
          <GlobalSearch />
        </nav>
        <div className="flex justify-between items-center px-[30px] ">
          <Stack direction="row">
            <div className="relative w-fit border-2 border-black rounded-full">
              {/* Toggle Switch */}
              <label
                htmlFor="Toggle"
                className="inline-flex items-center p-1 outline-2 outline-gray-500 rounded-3xl border-gray-700 bg-gray-100 cursor-pointer relative"
              >
                <input
                  id="Toggle"
                  type="checkbox"
                  className="hidden peer rounded-3xl"
                  checked={deliveryOption}
                  onChange={handleToggle}
                />
                <span
                  className={`px-3 py-2 rounded-3xl transition-all duration-900 ease-in-out ${
                    deliveryOption ? "bg-teal-800 text-white" : "bg-gray-100"
                  }`}
                >
                  Orders
                </span>
                <span
                  className={`px-3 py-2 rounded-3xl transition-all duration-900 ease-in-out ${
                    deliveryOption ? "bg-gray-100" : "bg-teal-800 text-white"
                  }`}
                >
                  Scheduled Orders
                </span>
              </label>

              {/* Badge positioned absolutely inside this div */}
              {!deliveryOption && role === "Merchant" && unSeenCount !== 0 && (
                <Badge
                  variant="solid"
                  colorScheme="red"
                  className="absolute top-[-8px] right-[-4px] z-10 h-[21px] w-[21px] rounded-full flex justify-center items-center"
                >
                  <span className="text-[16px]">{unSeenCount}</span>
                </Badge>
              )}
            </div>
          </Stack>

          <div className="flex space-x-2 justify-end">
            <button
              onClick={handleDownloadCSV}
              className="bg-cyan-100 text-black rounded-md px-4 py-2 font-semibold flex items-center space-x-2"
            >
              {CSVDownloadLoading ? (
                <Spinner size="sm" />
              ) : (
                <>
                  <ArrowDownOutlined /> <span>CSV</span>
                </>
              )}
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
            <Select
              options={orderStatusOption}
              value={orderStatusOption.find(
                (option) => option.value === orderStatus
              )}
              onChange={(option) => setOrderStatus(option.value)}
              className=" bg-cyan-50 min-w-[10rem]"
              placeholder="Order status"
              isSearchable={false}
              isMulti={false}
              styles={{
                control: (provided) => ({
                  ...provided,
                  paddingRight: "",
                }),
                dropdownIndicator: (provided) => ({
                  ...provided,
                  padding: "10px",
                }),
              }}
            />

            <Select
              options={paymentModeOption}
              value={paymentModeOption.find(
                (option) => option.value === paymentMode
              )}
              onChange={(option) => setPaymentMode(option.value)}
              className=" bg-cyan-50 min-w-[10rem]"
              placeholder="Payment mode"
              isSearchable={false}
              isMulti={false}
              styles={{
                control: (provided) => ({
                  ...provided,
                  paddingRight: "",
                }),
                dropdownIndicator: (provided) => ({
                  ...provided,
                  padding: "10px",
                }),
              }}
            />

            <Select
              options={filteredOptions}
              value={filteredOptions.find(
                (option) => option.value === deliveryMode
              )}
              onChange={(option) => setDeliveryMode(option.value)}
              className=" bg-cyan-50 min-w-[10rem]"
              placeholder="Delivery mode"
              isSearchable={false}
              isMulti={false}
              styles={{
                control: (provided) => ({
                  ...provided,
                  paddingRight: "",
                }),
                dropdownIndicator: (provided) => ({
                  ...provided,
                  padding: "10px",
                }),
              }}
            />
          </div>

          <div className="flex items-center gap-[20px]">
            {/* <div>
              <FilterAltOutlinedIcon className="mt-2 text-gray-400" />
            </div> */}

            <div>
              <input
                type="search"
                className="bg-gray-100 p-3 rounded-3xl focus:outline-none outline-none text-[14px] ps-[20px]"
                placeholder="Search order ID"
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
                  <td
                    colSpan={10}
                    className="text-center py-[20px] bg-gray-50 text-[14px]"
                  >
                    Loading data...
                  </td>
                </tr>
              )}

              {!isTableLoading && orders.length === 0 && (
                <tr>
                  <td
                    colSpan={10}
                    className="text-center py-[20px] bg-gray-50 text-[14px]"
                  >
                    No data available
                  </td>
                </tr>
              )}

              {!isTableLoading &&
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className={`align-middle border-b border-gray-300 ${
                      deliveryOption
                        ? order.orderStatus === "Pending"
                          ? "bg-red-500 text-white"
                          : "text-black"
                        : (order.isViewed &&
                            order.deliveryMode === "Home Delivery") ||
                          (order.isViewed && order.deliveryMode === "Take Away")
                        ? "text-black"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    <td
                      className={`underline underline-offset-2
                      p-4 text-[14px]`}
                    >
                      {deliveryOption ? (
                        <Link to={`/order-details/${order._id}`}>
                          #{order._id}
                        </Link>
                      ) : (
                        <Link to={`/order-details/${order._id}`}>
                          #{order._id}
                        </Link>
                      )}
                    </td>
                    <td className="p-4 w-[120px]">
                      <div className="flex space-x-4 justify-center">
                        {deliveryOption && (
                          <>
                            {order.orderStatus === "Completed" && (
                              <p className=" text-green-500 font-[600] text-[14px]">
                                Completed
                              </p>
                            )}

                            {order.orderStatus === "Cancelled" && (
                              <p className=" text-red-500 font-[600] text-[14px]">
                                Cancelled
                              </p>
                            )}
                            {order?.orderStatus === "On-going" && (
                              <>
                                {order?.deliveryMode === "Take Away" && (
                                  <>
                                    {order?.isReady === false ? (
                                      <button
                                        className="text-white text-[14px] bg-teal-600 font-[500] py-1 rounded-md outline-none focus:outline-none"
                                        onClick={() =>
                                          handleMarkAsReady(order._id)
                                        }
                                      >
                                        Mark As Ready
                                      </button>
                                    ) : (
                                      <button
                                        className="text-white bg-teal-600 font-[500] text-[14px] py-1 rounded-md outline-none focus:outline-none"
                                        onClick={() =>
                                          handleMarkOrderCompleted(order._id)
                                        }
                                      >
                                        Collected by customer
                                      </button>
                                    )}
                                  </>
                                )}

                                {order?.deliveryMode === "Home Delivery" && (
                                  <>
                                    {order?.isReady === false ? (
                                      <button
                                        className="text-white text-[14px] bg-teal-600 font-[500] py-1 rounded-md outline-none focus:outline-none"
                                        onClick={() =>
                                          handleMarkAsReady(order._id)
                                        }
                                      >
                                        Mark As Ready
                                      </button>
                                    ) : (
                                      <p className="text-orange-500 font-[600] text-[14px]">
                                        On-going
                                      </p>
                                    )}
                                  </>
                                )}
                                {order?.deliveryMode !== "Take Away" &&
                                  order?.deliveryMode !== "Home Delivery" && (
                                    <p className="text-orange-500 font-[600] text-[14px]">
                                      On-going
                                    </p>
                                  )}
                              </>
                            )}

                            {order.orderStatus === "Pending" && (
                              <>
                                {orderActionLoading[order._id] ? (
                                  <Spinner size={"sm"} />
                                ) : (
                                  <>
                                    <CheckCircleOutlined
                                      className="text-2xl cursor-pointer text-white"
                                      onClick={() =>
                                        handleConfirmOrder(order._id)
                                      }
                                    />
                                    <CloseCircleOutlined
                                      className="text-2xl cursor-pointer text-white"
                                      onClick={showModalReject}
                                    />
                                    <Modal
                                      title={
                                        <span className="font-bold text-[16px]">
                                          Reject?
                                        </span>
                                      }
                                      open={isModalReject}
                                      onCancel={handleCancel}
                                      centered
                                      footer={null}
                                    >
                                      <form>
                                        <p className=" text-[16px] py-2">
                                          Do you want to Reject?
                                        </p>
                                        <div className="flex justify-end mt-5 gap-6">
                                          <button
                                            type="button"
                                            className="bg-cyan-100 px-5 py-1 rounded-md outline-none focus:outline-none font-semibold"
                                            onClick={handleCancel}
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            type="submit"
                                            className="bg-red-600 px-5 py-1 rounded-md outline-none focus:outline-none text-white"
                                            onClick={() =>
                                              handleRejectOrder(order._id)
                                            }
                                          >
                                            {rejectLoading
                                              ? `Rejecting...`
                                              : `Reject`}
                                          </button>
                                        </div>
                                      </form>
                                    </Modal>
                                  </>
                                )}
                              </>
                            )}
                          </>
                        )}

                        {!deliveryOption && (
                          <>
                            {order.orderStatus === "Completed" && (
                              <p className=" text-green-500 font-[600] text-[14px]">
                                Completed
                              </p>
                            )}
                            {order.orderStatus === "Cancelled" && (
                              <p className=" text-red-500 font-[600] text-[14px]">
                                Cancelled
                              </p>
                            )}
                            {order?.orderStatus === "On-going" && (
                              <p className="text-orange-500 font-[600] text-[14px]">
                                On-going
                              </p>
                            )}
                            {order.orderStatus === "Pending" && (
                              <p className="text-yellow-400 font-[600] text-[14px]">
                                Pending
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                    <td className="py-4 w-[200px] text-center text-[14px]">
                      {order.merchantName}
                    </td>
                    <td className="p-4 text-[14px]">{order.customerName}</td>
                    <td className="p-4 text-[14px]">{order.deliveryMode}</td>
                    <td className="p-4 text-[14px] w-[120px] text-center">
                      <p>{order.orderDate}</p>
                      <p>{order.orderTime}</p>
                    </td>
                    <td className="p-4 w-[120px]  text-center text-[14px]">
                      <>
                        {(!order?.deliveryDate || !order?.deliveryTime) && (
                          <p>N/A</p>
                        )}

                        {order?.deliveryDate && order?.deliveryTime && (
                          <>
                            <p>{order?.deliveryDate}</p>
                            <p>{order?.deliveryTime}</p>
                          </>
                        )}
                      </>
                    </td>
                    <td className="p-4 text-[14px]">{order.paymentMethod}</td>
                    <td className="p-4 text-[14px]">{order.deliveryOption}</td>
                    <td className="p-4 text-[14px]">{order.amount}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="my-[30px] flex justify-center">
          <Pagination
            count={pagination.totalPages || 0}
            page={pagination.currentPage || page}
            onChange={handlePageChange}
            shape="rounded"
            siblingCount={0}
            hidePrevButton={!pagination.hasPrevPage}
            hideNextButton={!pagination.hasNextPage}
            getItemAriaLabel={getItemAriaLabel}
          />
        </div>
      </main>
    </>
  );
};

export default Orders;
