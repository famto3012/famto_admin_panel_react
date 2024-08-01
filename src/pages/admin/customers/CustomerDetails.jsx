import { BellOutlined, SearchOutlined } from "@ant-design/icons";
import React, { useContext, useEffect, useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import BlockIcon from "@mui/icons-material/Block";
import Sidebar from "../../../components/Sidebar";
import { PlusOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { MdOutlineEdit } from "react-icons/md";
import GlobalSearch from "../../../components/GlobalSearch";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const CustomerDetails = () => {
  const { customerId } = useParams();
  const [customer, setCustomer] = useState({});
  const { token, role } = useContext(UserContext);
  const [rating,setRating] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  // const [walletDetails, setWalletDetails] = useState([]);
  // const [orderDetails, setOrderDetails] = useState([]);
  const [reason, setReason] = useState("");
  const [amountdeduct, setAmountDeduct] = useState("");
  const [amountadd, setAmountAdd] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleDeduct, setIsModalVisibleDeduct] = useState(false);
  const [isModalVisibleAdd, setIsModalVisibleAdd] = useState(false);
  const [isModalRatings, setIsModalRatings] = useState(false);

  // useEffect(() => {
  //   if (!token) {
  //     navigate("/auth/login");
  //     return;
  //   }

  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     try {
  //       const response = await axios.get(
  //         `${BASE_URL}/admin/customers/${customerId}`,
  //         {
  //           withCredentials: true,
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       );

  //       if (response.status === 200) {
  //         const { data } = response.data;
  //         // console.log("data in response is", data);
  //         setCustomer(data);
  //         console.log("data in state", customer);
  //       }
  //     } catch (err) {
  //       console.error(`Error in fetching data: ${err}`);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  //   console.log(customer);
  // }, [token, role, navigate, customerId]);

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/admin/customers/${customerId}`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (response.status === 200) {
          // Update customer state with response data
          setCustomer(response.data.data);
          // Assuming walletDetails and orderDetails are part of response.data.data
          // setWalletDetails(response.data.data.walletDetails);
          // setOrderDetails(response.data.data.orderDetails);
        }

        console.log("customer", customer);
      } catch (err) {
        console.error(`Error in fetching data: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };
  
    
  
    fetchData();
  }, [token, customerId, navigate]);
  

  const showModal1 = () => {
    setIsModalVisible(true);
  };

  const handleCancel1 = () => {
    setIsModalVisible(false);
  };

  const handleSubmit1 = async(e) => {
    e.preventDefault();
  
  try {
    setIsLoading(true);

    const response = await axios.patch(
      `${BASE_URL}/admin/customers/block-customer/${customerId}`,{reason},{
        withCredentials:true,
        headers:{Authorization: `Bearer${token}`,
       }
      }
      );
     if(response.status===200) {
      setReason(response.data.message)
      console.log(response.data.message)
     }
    console.log(reason);
  } catch(err) {
    // console.error(`Error in fetching data: ${err}`);
  } finally {
    setIsLoading(false);
  }
};
  const showModal2 = () => {
    setIsModalVisibleDeduct(true);
  };

  const handleCancel2 = () => {
    setIsModalVisibleDeduct(false);
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    console.log(amountdeduct);
  };
  const showModal3 = () => {
    setIsModalVisibleAdd(true);
  };

  const handleCancel3 = () => {
    setIsModalVisibleAdd(false);
  };

  const handleSubmit3 = (e) => {
    e.preventDefault();
    console.log(amountadd);
  };

  const [isModalVisibleRatings, setIsModalVisibleRatings] = useState(false)
  const showModalRatings = async () => {
    setIsModalVisibleRatings(true);
    try {
      const ratingResponse = await axios.get(
        `${BASE_URL}/admin/customers/ratings/${customerId}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (ratingResponse.status === 200) {
        setRating(ratingResponse.data.data);
      } else {
        console.error(`Unexpected status code`, ratingResponse.data.message);
      }
    } catch (err) {
      console.log(`Error in fetching data`, err);
    } finally {
      console.log(`Error in fetching data`);
    }
  };

  const handleCancelRatings = () => {
    setIsModalVisibleRatings(false);
  };
  const [editMode, setEditMode] = useState(false); // State to manage edit mode
  const [formData, setFormData] = useState({
    // Example form data state
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    registrationdate: "2024-06-18",
    platformUsed: "online",
    referalcode: "54", // Removed trailing comma
  });

  const handleEditClick = () => {
    setEditMode(true); // Enable edit mode
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here (e.g., API call)
    setEditMode(false); // Disable edit mode after submission
    console.log(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <Sidebar />

      <div className=" pl-[290px] bg-gray-100">
        <nav className="p-5">
          <GlobalSearch />
        </nav>
        <div className="flex items-center justify-between mx-11 mt-5">
          <h1 className="text-lg font-bold">Customer ID</h1>
          <button
            className="bg-yellow-100 text-black rounded-md  px-3 py-1 font-semibold flex items-center"
            onClick={showModal1}
          >
            <BlockIcon className="w-2 h-2 text-red-600 mr-2" /> Block
          </button>
          <Modal
            title="Reason for Blocking"
            open={isModalVisible}
            centered
            onOk={handleSubmit1}
            onCancel={handleCancel1}
            footer={null}
          >
            <form onSubmit={handleSubmit1}>
              <div className="flex items-center mt-10">
                <label htmlFor="reason" className="w-1/3 text-gray-500">
                  Reason
                </label>
                <input
                  type="text"
                  id="reason"
                  name="reason"
                  value={reason}
                  onChange={(event) => setReason(event.target.value)}
                  className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-4 mt-16 mx-10">
                <button
                  className="bg-cyan-50 py-2 px-4 rounded-md"
                  type="button"
                  onClick={handleCancel1}
                >
                  Cancel
                </button>
                <button
                  className="bg-teal-800 text-white py-2 px-4 rounded-md"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </Modal>
        </div>
        <div className="bg-white mx-7 py-4 mt-5 ">
          <div className="flex justify-between mt-10">
            <div className="bg-white rounded-lg mx-6 ">
              <form onSubmit={handleSubmit}>
                <div className="flex gap-6">
                  <div className="p-3 bg-white flex flex-col gap-3">
                    <div className="flex items-center ">
                      <label htmlFor="fullName" className="w-1/3 text-sm">
                        fullName
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={customer.fullName}
                        onChange={handleChange}
                        className="bg-white h-8  px-2 rounded-sm text-sm focus:outline-none mx-3 w-2/3"
                        disabled={!editMode} // Disable input if not in edit mode
                      />
                    </div>
                    <div className="flex item-center">
                      <label htmlFor="email" className="w-1/3 text-sm">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={customer.email}
                        onChange={handleChange}
                        className="bg-white h-7 px-2 rounded-sm text-sm focus:outline-none mx-3 w-2/3"
                        disabled={!editMode} // Disable input if not in edit mode
                      />
                    </div>
                    <div className="flex items-center">
                      <label htmlFor="phone" className="w-1/3 text-sm">
                        Phone
                      </label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={customer.phoneNumber}
                        onChange={handleChange}
                        className="bg-white h-8 px-2 rounded-sm text-sm focus:outline-none mx-3 w-2/3"
                        disabled={!editMode} // Disable input if not in edit mode
                      />
                    </div>
                  </div>
                  <div className="p-3 bg-white flex flex-col gap-3">
                    <div className="flex items-center">
                      <label
                        htmlFor="registrationDate"
                        className="w-1/3 text-sm"
                      >
                        Registration Date
                      </label>
                      <input
                        // type="date"
                        id="registrationDate"
                        name="registrationDate"
                        value={customer.registrationDate}
                        onChange={handleChange}
                        className="bg-white h-8 px-2 rounded-sm text-sm focus:outline-none mx-3 w-2/3 "
                        disabled={!editMode} // Disable input if not in edit mode
                      />
                    </div>
                    <div className="flex justify-between">
                      <label
                        htmlFor="lastPlatformUsed"
                        className="w-1/3 text-sm"
                      >
                        Platform Used
                      </label>
                      <input
                        type="text"
                        id="lastPlatformUsed"
                        name="lastPlatformUsed"
                        value={customer.lastPlatformUsed}
                        onChange={handleChange}
                        className="bg-white h-8 px-2 rounded-sm text-sm focus:outline-none mx-3 w-2/3  "
                        disabled={!editMode} // Disable input if not in edit mode
                      />
                    </div>
                    <div className="flex items-center">
                      <label htmlFor="referalcode" className="w-1/3 text-sm">
                        Referal Code
                      </label>
                      <input
                        type="text"
                        id="referalcode"
                        name="referalcode"
                        value={customer.referalcode}
                        onChange={handleChange}
                        className="bg-white h-8 px-2 rounded-sm text-sm focus:outline-none mx-3 w-2/3"
                        disabled={!editMode} // Disable input if not in edit mode
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="bg-gray-400 h-16 w-16 mr-3">.</div>
            <div>
              <button
                type="button"
                onClick={handleEditClick}
                disabled={editMode}
                className="bg-cyan-50 flex items-center p-2 rounded-lg mr-3 "
              >
                <MdOutlineEdit className=" rounded-lg " />
                <span className="ml-3">Edit Customer</span>
                {editMode ? "" : ""}
              </button>
            </div>
          </div>
          <div className="w-[600px] flex items-center justify-between gap-[30px] mt-10">
            <label className="text-gray-700 mx-11 font-bold">Ratings</label>
            {/* <button
              type="button"
              onClick={showModalRatings}
              className="bg-teal-800 text-white p-2 rounded-md w-[20rem]"
            >
              Show ratings and reviews
            </button>
            <Modal
              title="Ratings and Review by customer"
              open={isModalRatings}
              onCancel={handleModalClose}
              footer={null}
            >
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse block md:table text-center mt-4">
                  <thead className="block md:table-header-group">
                    <tr className="border border-gray-300 md:border-none md:table-row">
                      <th className="p-2 px-5 border-r-2 bg-teal-800 font-normal text-white">
                        ID
                      </th>
                      <th className="p-2 px-8 border-r-2 bg-teal-800 font-normal text-white">
                        Name
                      </th>
                      <th className="px-6 border-r-2 bg-teal-800 font-normal text-white text-left ">
                        Ratings and Review
                      </th>
                    </tr>
                  </thead>
                  <tbody className="block md:table-row-group">
                    {data.map((item, index) => (
                      <tr
                        key={index}
                        className=" bg-gray-100 border border-gray-300 md:border-none md:table-row mb-2 md:mb-0"
                      >
                        <td className="p-2 text-center  md:table-cell">
                          {item.id}
                        </td>
                        <td className="p-2  text-center md:table-cell">
                          {item.name}
                        </td>
                        <td className=" px-6 py-4 text-left md:table-cell">
                          <div className="flex items-center text-center">
                            {Array.from({ length: item.rating }).map((_, i) => (
                              <svg
                                key={i}
                                className="w-5 h-5 text-yellow-500 text-center"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M9.049.467a1.003 1.003 0 011.902 0l1.454 4.553h4.769a1 1 0 01.593 1.807l-3.855 2.8 1.453 4.553a1 1 0 01-1.54 1.117L10 13.137l-3.855 2.8a1 1 0 01-1.54-1.117l1.453-4.553-3.855-2.8a1 1 0 01.593-1.807h4.77L9.05.467z"></path>
                              </svg>
                            ))}
                          </div>
                          <p className="mt-2 ">{item.review}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Modal> */}



            <button
              type="button"
              onClick={showModalRatings}
              className="bg-teal-700 text-white p-2 rounded-md w-[20rem]"
            >
              Show ratings and reviews
            </button>
            <Modal
        title="Ratings"
        centered
        width="600px"
        open={isModalVisibleRatings}
        onCancel={handleCancelRatings}
        className="w-[600px]"
        footer={null}
        // confirmLoading={isConfirmLoading}
      >
        <div className="overflow-auto max-h-[30rem]">
          <table className="min-w-full border-collapse block md:table text-center rounded-lg mt-4">
            <thead className="block md:table-header-group sticky top-0">
              <tr className="border border-gray-300 md:border-none md:table-row">
                <th className="p-2 px-5 border-r-2 bg-teal-700 font-normal text-white">
                  ID
                </th>
                <th className="p-2 px-8 border-r-2 bg-teal-700 font-normal text-white">
                  Name
                </th>
                <th className="px-6 border-r-2 bg-teal-700 font-normal text-white text-left">
                  Ratings and Review
                </th>
              </tr>
            </thead>
            <tbody className="block md:table-row-group">
              {rating.length === 0 ? (
                <tr>
                  <td colSpan={3}>
                    <p className="mb-0 text-center">No data</p>
                  </td>
                </tr>
              ) : (
                rating.map((rating) => (
                  <tr
                    key={rating.id}
                    className="bg-gray-100 border border-gray-300 md:border-none md:table-row mb-2 md:mb-0"
                  >
                    <td className="p-2 text-center md:table-cell">{rating.customerId.id}</td>
                    <td className="p-2 text-center md:table-cell">{rating.customerId.fullName}</td>
                    <td className="px-6 py-4 text-left md:table-cell">
                      <div className="flex items-center text-center">
                        {Array.from({ length: rating.rating }).map((_, i) => (
                          <svg
                            key={i}
                            className="w-5 h-5 text-yellow-500 text-center"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049.467a1.003 1.003 0 011.902 0l1.454 4.553h4.769a1 1 0 01.593 1.807l-3.855 2.8 1.453 4.553a1 1 0 01-1.54 1.117L10 13.137l-3.855 2.8a1 1 0 01-1.54-1.117l1.453-4.553-3.855-2.8a1 1 0 01.593-1.807h4.77L9.05.467z"></path>
                          </svg>
                        ))}
                      </div>
                      <p className="mt-2">{rating.review}</p>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Modal>
          </div>
          <div className="mt-10">
            <h4 className="text-gray-700 mx-11 font-bold">Address</h4>
            <div className="grid grid-cols-3 mx-11 mt-10 w-fit ">
              <div className="w-[200px] px-2">
                <h2 className="font-semibold">Home</h2>
                {/* <p>{customer}</p> */}

                {/* <span className="flex justify-start mt-3">{customer.homeAddress.fullName}</span> */}
                {/* <span className="flex justify-start">{customer.homeAddress.phoneNumber}</span> */}
                {/* <span className="flex justify-start">{customer.homeAddress.flat}</span> */}
                {/* <span className="flex justify-start">{customer.homeAddress.area}</span> */}
                {/* <span className="flex justify-start">{customer.homeAddress.landmark}</span> */}
              </div>
              <div className=" w-[200px] px-2">
                <h2 className="font-semibold">Office</h2>
                <span className="flex justify-start mt-3">John James</span>
                <span className="flex justify-start">8087783199</span>
                <span className="flex justify-start">
                  Revathi, A18, Lekshmi Nagar, Kesavadasapuram,{" "}
                </span>
                <span className="flex justify-start">Trivandrum, 695004</span>
              </div>
              <div className="w-[200px] px-2">
                <h2 className="font-semibold">Other</h2>
                <span className="flex justify-start mt-3">John James</span>
                <span className="flex justify-start">8087783199</span>
                <span className="flex justify-start">
                  Revathi, A18, Lekshmi Nagar, Kesavadasapuram,{" "}
                </span>
                <span className="flex justify-start">Trivandrum, 695004</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-16 mx-10">
          <button
            className="bg-cyan-50 py-2 px-4 rounded-md"
            type="button"
            onClick={handleCancel1}
          >
            Cancel
          </button>
          <button
            className="bg-teal-800 text-white py-2 px-4 rounded-md"
            type="submit"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>

        <div className="flex items-center justify-between mx-11 mt-10">
          <h1 className="text-md font-semibold">Wallet</h1>
          <div className="flex space-x-2 justify-end ">
            <button
              className="bg-red-100 text-black rounded-md px-4 py-2 font-semibold flex items-center space-x-2"
              onClick={showModal2}
            >
              <RemoveIcon className="text-red-600" />{" "}
              <span>Money to Wallet</span>
            </button>
            <Modal
              title="Deduct Money"
              open={isModalVisibleDeduct}
              centered
              onOk={handleSubmit2}
              onCancel={handleCancel2}
              footer={null}
            >
              <form onSubmit={handleSubmit2}>
                <div className="flex items-center mt-10">
                  <label htmlFor="amountdeduct" className="w-1/3 text-gray-500">
                    Amount(₹)
                  </label>
                  <input
                    type="text"
                    id="amountdeduct"
                    name="amountdeduct"
                    value={amountdeduct}
                    onChange={(event) => setAmountDeduct(event.target.value)}
                    className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                  />
                </div>
                <div className="flex justify-end gap-4 mt-16 mx-10">
                  <button
                    className="bg-cyan-50 py-2 px-4 rounded-md"
                    type="button"
                    onClick={handleCancel2}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-teal-800 text-white py-2 px-4 rounded-md"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </form>
            </Modal>
            <div>
              <button
                className="bg-teal-800 text-white rounded-md px-4 py-2 font-semibold  flex items-center space-x-2 "
                onClick={showModal3}
              >
                <PlusOutlined /> <span>Money to Wallet</span>
              </button>
              <Modal
                title="Add Money"
                open={isModalVisibleAdd}
                centered
                onOk={handleSubmit3}
                onCancel={handleCancel3}
                footer={null}
              >
                <form onSubmit={handleSubmit3}>
                  <div className="flex items-center mt-10">
                    <label htmlFor="amountadd" className="w-1/3 text-gray-500">
                      Amount(₹)
                    </label>
                    <input
                      type="text"
                      id="amountadd"
                      name="amountadd"
                      value={amountadd}
                      onChange={(event) => setAmountAdd(event.target.value)}
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                    />
                  </div>
                  <div className="flex justify-end gap-4 mt-16 mx-10">
                    <button
                      className="bg-cyan-50 py-2 px-4 rounded-md"
                      type="button"
                      onClick={handleCancel3}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-teal-800 text-white py-2 px-4 rounded-md"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </Modal>
            </div>
          </div>
        </div>

        <div className="overflow-auto mt-[20px] w-full">
          <table className="text-start w-full">
            <thead>
              <tr>
                {[
                  "Closing Balance",
                  "Transaction Amount",
                  "Transaction ID",
                  "Order ID",
                  "Date and Time",
                ].map((header, index) => (
                  <th
                    key={index}
                    className="bg-teal-800 text-center text-white py-[20px] border-r-2 border-[#eee]/50"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customer?.walletDetails?.length === 0 && (
                <tr>
                  <td colSpan={5}>
                    <p className="mb-0 text-center">No data</p>
                  </td>
                </tr>
              )}

              {/* {walletDetails?.map((walletDetails) => ( */}
              {customer?.walletDetails?.map((walletDetails) => (
                <tr
                  key={walletDetails.id}
                  className="align-middle border-b border-gray-300 text-center"
                >
                  <td className="p-3">{walletDetails.closingBalance}</td>
                  <td className="p-3">{walletDetails.transactionAmount}</td>
                  <td className="p-3">{walletDetails.transactionId}</td>
                  <td className="p-3">{walletDetails.orderId}</td>
                  <td className="p-3">{walletDetails.datetime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h1 className="text-md font-semibold mx-11 mt-[40px]">
            Order Details
          </h1>
          <div className="overflow-auto mt-[20px] ml-2 w-full">
            <table className="text-start w-full mb-24">
              <thead>
                <tr>
                  {[
                    "Order ID",
                    "Order Status",
                    "Merchant Name",
                    "Delivery Mode",
                    "Order Time",
                    "Delivery Time",
                    "Payment Method",
                    "Delivery Option",
                    "Amount",
                    "Payment Status",
                  ].map((header, index) => (
                    <th
                      key={index}
                      className="bg-teal-800 text-center text-white py-[20px]  border-r-2 border-[#eee]/50"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {customer?.orderDetails?.length === 0 && (
                  <tr>
                    <td colSpan={10}>
                      <p className="mb-0 text-center">No data</p>
                    </td>
                  </tr>
                )}

                {/* {customer?.orderDetails?.map((orderDetails) => ( */}
                {customer?.orderDetails?.map((orderDetails) => (
                  <tr
                    key={orderDetails.id}
                    className="align-middle border-b border-gray-300 text-center"
                  >
                    <td className="p-3">{orderDetails.orderid}</td>
                    <td className="p-3">{orderDetails.orderStatus}</td>
                    <td className="p-3">{orderDetails.merchantName}</td>
                    <td className="p-3">{orderDetails.deliveryMode}</td>
                    <td className="p-3">{orderDetails.ordertime}</td>
                    <td className="p-3">{orderDetails.deliverytime}</td>
                    <td className="p-3">{orderDetails.paymentMethod}</td>
                    <td className="p-3">{orderDetails.deliveryOption}</td>
                    <td className="p-3">{orderDetails.Amount}</td>
                    <td className="p-3">{orderDetails.paymentStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerDetails;