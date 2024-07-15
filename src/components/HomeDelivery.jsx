import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { LocationOnOutlined } from "@mui/icons-material";

const HomeDelivery = () => {
  const [formData, setFormData] = useState({
    customer: "",
    merchant: "",
    product: "",
    selectedProducts: 1,
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
          amount: "₹257",
        },
        {
          item: "Delivery Charges",
          amount: "₹257",
        },
        {
          item: "Added Tip",
          amount: "₹257",
        },
        {
          item: "Discount",
          amount: "₹257",
        },
        {
          item: "Sub Total",
          amount: "₹257",
        },
        {
          item: "GST(inclusive all taxes)",
          amount: "₹257",
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
  const handleChangeProducts = (e) => {
    setFormData({ ...formData, selectedProducts: e.target.value });
    console.log("before", formData.selectedProducts);
    setValue(e.target.value);
  };
  const addition = (e) => {
    e.preventDefault();
    setFormData((prevOrder) => ({
      ...prevOrder,
      selectedProducts: Number(prevOrder.selectedProducts) + 1,
    }));
    setValue((prevValue) => prevValue + 1);
  };

  const substraction = (e) => {
    e.preventDefault();
    setFormData((prevOrder) => ({
      ...prevOrder,
      selectedProducts: Number(prevOrder.selectedProducts) - 1,
    }));
    setValue((prevValue) => prevValue + 1);
  };



  const [isFormVisible, setFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  const [addressData, setAddressData] = useState({
    locationaddress:"",
    fullName: "",
    phone: "",
    houseno:"",
    locality:"",
    landmark: "",
  });

  const handleChangeAddress = (e) => {
    setAddressData({ ...addressData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(addressData); // Replace with your submission logic
    // Example: Submit data to server or process locally
    // Clear form after submission if needed
    setAddressData({
      locationaddress:"",
      fullName: "",
      phone: "",
      houseno:"",
      locality:"",
      landmark: "",
    });
  };
  return (
    <div className="bg-white  mt-5 rounded">
      <form onSubmit={formSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex items-center relative">
            <label className="w-1/3 px-6" htmlFor="merchant">
              Select Merchant
            </label>
            <div className="relative w-1/2">
              <input
                type="search"
                name="merchant"
                id="merchant"
                placeholder="Merchant"
                className="h-10 px-5 pr-10 text-sm border-2 w-full outline-none focus:outline-none"
                value={formData.merchant}
                onChange={handleInputChange}
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-2 mr-2"
              >
                <SearchOutlined className="text-xl text-gray-500" />
              </button>
            </div>
          </div>
          <div className="flex items-center relative">
            <label className="w-1/3 px-6" htmlFor="product">
              Select Product
            </label>
            <div className="relative w-1/2">
              <input
                type="search"
                name="product"
                id="product"
                placeholder="Product"
                className="h-10 px-5  text-sm border-2 w-full  outline-none focus:outline-none"
                value={formData.product}
                onChange={handleInputChange}
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-2 mr-2"
              >
                <SearchOutlined className="text-xl text-gray-500 " />
              </button>
            </div>
          </div>
          <div className="flex items-center">
            <label className="w-1/3 px-6">Selcted Products</label>
            <div className="flex gap-7 w-[20rem] bg-gray-200 p-4 rounded-lg border-2 border-gray-300">
              <div>
                <p>Chicken mandi quater</p>
                <p>275/-</p>
              </div>
              <div className="flex items-center justify-between w-1/3">
                <button
                  id="decrement"
                  className="px-2 py-1 text-lg font-bold bg-gray-200 rounded-md hover:bg-gray-300"
                  onClick={substraction}
                >
                  -
                </button>
                <input
                  type="number"
                  name="selectedProducts"
                  value={formData.selectedProducts}
                  onChange={handleChangeProducts}
                  className="w-1/3 text-center"
                ></input>
                <button
                  className="px-2 py-1 text-lg font-bold bg-gray-200 rounded-md hover:bg-gray-300"
                  onClick={addition}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="merchantinstructions">
              Instructions to Merchants
            </label>
            <input
              className="h-10 px-5  text-sm border-2 w-1/2  outline-none focus:outline-none"
              type="text"
              placeholder="Merchant Instructions"
              id="merchantinstructions"
              name="merchantinstructions"
              value={formData.merchantinstructions}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center ">
            <label className="w-1/3 px-6" htmlFor="address">
              Select Delivery Address
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
          <div>
          <div className=" flex">
                  <label className="w-1/3"></label>
                  <button
                    type="button"
                    className="w-1/2 bg-gray-200 font-semibold py-2 rounded flex justify-between items-center px-4 border border-gray-300"
                    onClick={toggleFormVisibility}
                  >
                    <span>Add Address</span>
                    <PlusOutlined />
                  </button>
                </div>
                {isFormVisible && (
                  <div className="flex">
                    <label className="w-1/3"></label>
                    <div className="mt-6 p-6 bg-gray-200 rounded-lg shadow-lg w-1/2">
                      <form on onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-center relative">
        
            <div className="relative w-full">
              <input
                type="text"
                name="locationaddress"
                id="locationaddress"
                placeholder="Search Location in a map"
                className="rounded-md px-3 py-2 text-sm border-2 w-full outline-none focus:outline-none"
                value={addressData.locationaddress}
                onChange={handleChangeAddress}
              />
              <button
                type="button"
                className="absolute right-0 top-0 mt-2 mr-2"
              >
                <LocationOnOutlined />
              </button>
            </div>
          </div>
                          <div className="flex item-center">
                            <label className="  w-1/3 text-md font-semibold mt-2">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              name="fullName"
                              placeholder="fullName"
                              className=" w-2/3 px-3 py-2 bg-white rounded focus:outline-none outline-none"
                              value={addressData.fullName}
                              onChange={handleChangeAddress}
                            />
                          </div>
                          <div className="flex items-center">
                            <label className="w-1/3 text-md font-medium">
                             Phone *
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              placeholder="Phone"
                              className="w-2/3 px-3 py-2 bg-white rounded focus:outline-none outline-none"
                              value={addressData.phone}
                              onChange={handleChangeAddress}

                            />
                          </div>
                          <div className="flex items-center">
                            <label className="w-1/3 text-md font-medium ">
                            Flat / House no  / Floor *
                            </label>
                            <input
                              type="text"
                              name="houseno"
                              placeholder="Flat/House no/Floor"
                              className=" w-2/3 px-3 py-2  bg-white   rounded focus:outline-none outline-none"
                              value={addressData.houseno}
                              onChange={handleChangeAddress}

                            />
                          </div>
                          <div className="flex items-center">
                            <label className="w-1/3 text-md font-medium">
                              Area / Locality *
                            </label>
                            <input
                              type="text"
                              name="locality"
                              placeholder="Area/Locality"
                              className=" w-2/3 px-3 py-2 bg-white  rounded focus:outline-none outline-none"
                              value={addressData.locality}
                              onChange={handleChangeAddress}

                            />
                          </div>
                          <div className="flex items-center">
                            <label className="w-1/3 text-md font-medium ">
                             Nearby Landmark
                            </label>
                            <input
                              type="text"
                              name="landmark"
                              placeholder="Landmark"
                              className=" w-2/3 px-3 py-2 bg-white  rounded focus:outline-none outline-none"
                              value={addressData.landmark}
                              onChange={handleChangeAddress}

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
                            onClick={handleSubmit}
                          >
                            Add Address
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>     
          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="agentinstructions">
              Instructions to Delivery Agent
            </label>
            <input
              className="h-10 px-5  text-sm border-2 w-1/2  outline-none focus:outline-none"
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
              className="h-10 px-5  text-sm border-2 w-1/2  outline-none focus:outline-none"
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
              className="h-10 px-5  text-sm border-2 w-1/2  outline-none focus:outline-none"
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
              className="h-10 px-5  text-sm border-2 w-1/2  outline-none focus:outline-none"
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
              className="h-10 px-5  text-sm border-2 w-1/2  outline-none focus:outline-none"
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

          <div className="flex mt-5">
            <h1 className="px-6 w-1/3 font-semibold">Bill Summary</h1>
            <div className="overflow-auo w-2/3">
              <table className="border-2 border-teal-700  text-left w-[75%]">
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
                    <tr key={order.id} className="text-left">
                      <td className="p-4">{order.item}</td>
                      <td className="p-4">{order.amount}</td>
                    </tr>
                  ))}
                  <tr className="bg-teal-700 text-white font-semibold text-[18px]">
                    <td className="p-4">Net Payable Amount</td>
                    <td className="p-4">₹ 257</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-16 mx-10">
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
              Create Order ₹534
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HomeDelivery;
