import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { ArrowBack } from "@mui/icons-material";
import { BellOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import GlobalSearch from "../../../components/GlobalSearch";

const CustomerOrder = () => {
  const [userType, setUserType] = useState("");
  const handleTypeChange = (e) => {
    setUserType(e.target.value);
    console.log(e.target.value);
  };
  const [deliveryType, setDeliveryType] = useState("");
  const handleTypeChange1 = (e) => {
    setDeliveryType(e.target.value);
    console.log(e.target.value);
  };
  const [formData, setFormData] = useState({
    customer: "",
    merchant: "",
    product: "",
    merchantinstructions: "",
    agentinstructions: "",
    tips: "",
    deliverycharges: "",
    discount: "",
    paymentType: "",
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  const [order, setOrder] = useState([]);
  useEffect(() => {
    const fetchOrder = async () => {
      const dummyData = [
        {
          item: "Price",
          amount: "257",
        },
        {
          item: "Delivery Charges",
          amount: "257",
        },
        {
          item: "Added Tip",
          amount: "257",
        },
        {
          item: "Discount",
          amount: "257",
        },
        {
          item: "Sub Total",
          amount: "257",
        },
        {
          item: "GST(inclusive all taxes)",
          amount: "257",
        },
        // Add more customers as needed
      ];

      setOrder(dummyData);
    };

    fetchOrder();
  }, []);

  const [selectedAddress, setSelectedAddress] = useState("");

  const handleAddressChange = (address) => {
    setSelectedAddress(address);
  };

  return (
    <>
      <Sidebar />
      <div className="w-full min-h-screen pl-[290px] bg-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <ArrowBack className="ml-7" />
            <span className="text-lg font-bold ml-3">Create Order</span>
          </div>
          <nav className="p-5">
          <GlobalSearch />
        </nav>
        </div>
        <div className="bg-white mx-11 mt-5 p-5 rounded">
          <form onSubmit={formSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex items-center">
                <label className="w-1/3 px-6" htmlFor="customer">
                  Select Customer
                </label>
                <input
                  type="search"
                  id="customer"
                  name="customer"
                  placeholder="Search Customer"
                  className="h-10 px-5  text-sm border-2 w-1/3 outline-none focus:outline-none"
                  value={formData.customer}
                  onChange={handleInputChange}
                />
                <button type="submit" className="">
                  <SearchOutlined className="text-xl text-gray-500" />
                </button>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-1/3 bg-white py-2 rounded flex justify-between items-center px-4 border border-gray-300"
                >
                  <span>Add Customer</span>
                  <PlusOutlined />
                </button>

                {isFormVisible && (
                  <div className="mt-6 p-6 bg-gray-300 rounded-lg shadow-lg w-full max-w-md">
                    <form>
                      <div className="flex flex-col gap-3">
                        <div className="flex item-center justify-center">
                          <label className="  w-1/3 text-md font-medium ">
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            className=" w-2/3 px-3 py-2 bg-white   rounded focus:outline-none outline-none"
                          />
                        </div>
                        <div className="flex items-center">
                          <label className="w-1/3 text-md font-medium">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="w-2/3 px-3 py-2 bg-white rounded focus:outline-none outline-none"
                          />
                        </div>
                        <div className="flex items-center">
                          <label className="w-1/3 text-md font-medium ">
                            Phone
                          </label>
                          <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            className=" w-2/3 px-3 py-2  bg-white   rounded focus:outline-none outline-none"
                          />
                        </div>
                        <div className="flex items-center">
                          <label className="w-1/3 text-md font-medium">
                            Address
                          </label>
                          <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            className=" w-2/3 px-3 py-2 bg-white  rounded focus:outline-none outline-none"
                          />
                        </div>
                      </div>
                      <div className="flex justify-between mt-5 gap-3">
                        <button
                          type="button"
                          className="bg-cyan-100 px-4 py-2 w-1/2"
                          onClick={toggleFormVisibility}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-teal-700 text-white px-4 py-2 rounded w-1/2 "
                        >
                          Add Customer
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
              <div className="flex items-center mt-1">
                <label className="block w-1/3 px-6 text-gray-700">
                  Select Delivery Option
                </label>
                <div className="flex gap-10">
                  {["On-Demand", "Scheduled"].map((type) => (
                    <label key={type} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="userType"
                        value={type}
                        checked={userType === type}
                        onChange={handleTypeChange}
                        className="form-radio"
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex items-center mt-2">
                <label className="block w-1/3 px-6 text-gray-700">
                  Select Delivery Option
                </label>
                <div className="flex justify-evenly gap-6">
                  {[
                    "Take Away",
                    "Home Delivery",
                    "Pick&Drop",
                    "CustomOrder",
                  ].map((type1) => (
                    <label key={type1} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="deliveryType"
                        value={type1}
                        checked={deliveryType === type1}
                        onChange={handleTypeChange1}
                        className="form-radio "
                      />
                      <span>{type1}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <label className="w-1/3 px-6" htmlFor="merchant">
                  Select Merchant
                </label>
                <input
                  type="search"
                  name="merchant"
                  id="merchant"
                  placeholder="Merchant"
                  className="h-10 px-5  text-sm border-2 w-1/3 outline-none focus:outline-none relative"
                  value={formData.merchant}
                  onChange={handleInputChange}
                />
                <button type="submit" className="">
                  <SearchOutlined className="text-xl text-gray-500" />
                </button>
              </div>
              <div className="flex items-center relative">
                <label className="w-1/3 px-6" htmlFor="product">
                  Select Product
                </label>
                <input
                  type="search"
                  name="product"
                  id="product"
                  placeholder="Product"
                  className="h-10 px-5  text-sm border-2 w-1/3  outline-none focus:outline-none"
                  value={formData.product}
                  onChange={handleInputChange}
                />
                <button type="submit" className="">
                  <SearchOutlined className="text-xl text-gray-500 " />
                </button>
              </div>
              <div className="flex items-center">
                <label className="w-1/3 px-6" htmlFor="product">
                  Selected Products
                </label>
                <div className="bg-gray-200 p-4">
                  Chicken Mandi Quarter
                  <span className="flex justify-start">257</span>
                  <div></div>
                </div>
              </div>
              <div className="flex items-center">
                <label className="w-1/3 px-6" htmlFor="merchantinstructions">
                  Instructions to Merchants
                </label>
                <input
                  className="h-10 px-5  text-sm border-2 w-1/3  outline-none focus:outline-none"
                  type="text"
                  placeholder="Merchant Instructions"
                  id="merchantinstructions"
                  name="merchantinstructions"
                  value={formData.merchantinstructions}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="w-1/3 px-6" htmlFor="customer">
                  Select Customer
                </label>
                {["Home", "Office", "Others"].map((address) => (
                  <button
                    key={address}
                    type="button"
                    className={`py-2 px-4 rounded border ${
                      selectedAddress === address ? "bg-gray-300" : "bg-white"
                    }`}
                    onClick={() => handleAddressChange(address)}
                  >
                    {address}
                  </button>
                ))}
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-1/3 bg-white py-2 rounded flex justify-between items-center px-4 border border-gray-300"
                >
                  <span>Add Customer</span>
                  <PlusOutlined />
                </button>
              </div>

              <div className="flex items-center">
                <label className="w-1/3 px-6" htmlFor="agentinstructions">
                  Instructions to Delivery Agent
                </label>
                <input
                  className="h-10 px-5  text-sm border-2 w-1/3  outline-none focus:outline-none"
                  type="text"
                  placeholder="Agent Instructions"
                  id="agentinstructions"
                  name="agentinstructions"
                  value={formData.agentinstructions}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center">
                <label className="w-1/3 px-6" htmlFor="tips">
                  Tips
                </label>
                <input
                  className="h-10 px-5  text-sm border-2 w-1/3  outline-none focus:outline-none"
                  type="text"
                  placeholder="Tips"
                  id="tips"
                  name="tips"
                  value={formData.tips}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center">
                <label className="w-1/3 px-6" htmlFor="deliverycharges">
                  Delivery Charges
                </label>
                <input
                  className="h-10 px-5  text-sm border-2 w-1/3  outline-none focus:outline-none"
                  type="text"
                  placeholder="Delivery Charges"
                  id="deliverycharges"
                  name="deliverycharges"
                  value={formData.deliverycharges}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center">
                <label className="w-1/3 px-6" htmlFor="discount">
                  Discount
                </label>
                <select
                  className="h-10 px-5  text-sm border-2 w-1/3  outline-none focus:outline-none"
                  type="text"
                  placeholder="Discount"
                  id="discount"
                  name="discount"
                  value={formData.discount}
                  onChange={handleInputChange}
                >
                  <option hidden value=""></option>
                  <option value="option1" className="bg-white">
                    option1
                  </option>
                  <option value="option2" className="bg-white">
                    option2
                  </option>
                  <option value="option3" className="bg-white">
                    option3
                  </option>
                </select>
              </div>
              <div className="flex items-center">
                <label className="w-1/3 px-6" htmlFor="paymentType">
                  Payment Type
                </label>
                <select
                  className="h-10 px-5  text-sm border-2 w-1/3  outline-none focus:outline-none"
                  type="text"
                  placeholder="Payment Type"
                  id="paymentType"
                  name="paymentType"
                  value={formData.paymentType}
                  onChange={handleInputChange}
                >
                  <option hidden value=""></option>
                  <option value="option1" className="bg-white">
                    option1
                  </option>
                  <option value="option2" className="bg-white">
                    option2
                  </option>
                  <option value="option3" className="bg-white">
                    option3
                  </option>
                </select>
              </div>
            </div>
          </form>
          <div className="px-6 mt-10 ">
            <h1 className="font-semibold">Bill Summary</h1>
            <div className="overflow-auto flex justify-center  ">
              <table className="border-2 border-teal-700 w-1/2 ">
                <thead>
                  <tr>
                    {["Item", "Amount"].map((header, index) => (
                      <th
                        key={index}
                        className="bg-teal-700  text-white p-4  border-[#eee]/50"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {order.map((order) => (
                    <tr key={order.id} className="text-center">
                      <td className="p-4">{order.item}</td>
                      <td className="p-4">{order.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-16 mx-10 ">
            <button
              className="bg-cyan-50 py-2 px-4 rounded-md text-lg"
              type="button"
            >
              <SaveAltIcon /> Bill
            </button>
            <button
              className="bg-teal-700 text-white py-2 px-4 rounded-md"
              type="submit"
              onClick={formSubmit}
            >
              CreateOrder ₹534
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerOrder;
