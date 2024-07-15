import React, { useEffect, useState } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { PlusOutlined } from "@ant-design/icons";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { AddOutlined, DeleteOutline, LocationOnOutlined } from "@mui/icons-material";
import { RiDeleteBinLine } from "react-icons/ri";

const Customorder = () => {
  const [order, setOrder] = useState([]);
  useEffect(() => {
    const fetchOrder = async () => {
      const dummyData = [
        {
          item1: "Price",
          amount: "₹257",
        },
        {
          item1: "Delivery Charges",
          amount: "₹257",
        },
        {
          item1: "Added Tip",
          amount: "₹257",
        },
        {
          item1: "Discount",
          amount: "₹257",
        },
        {
          item1: "Sub Total",
          amount: "₹257",
        },
        {
          item1: "GST(inclusive all taxes)",
          amount: "₹257",
        },
        // Add more customers as needed
      ];

      setOrder(dummyData);
    };

    fetchOrder();
  }, []);

  const [formData, setFormData] = useState({
    location: "",
    agentinstructions: "",
    tips: "",
    deliveryCharges: "",
    discount: "",
    paymentType: "",
    subtotal: "",
    item:[],
  });
  

  const handleAddItem = () => {
    const newItem = { name: "", quantity: "", unit: "" };
    setFormData({ ...formData, items: [...formData.item, newItem] });
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...formData.item];
    updatedItems.splice(index, 1);
    setFormData({ ...formData, item: updatedItems });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...formData.item];
    updatedItems[index] = { ...updatedItems[index], [name]: value };
    setFormData({ ...formData, item: updatedItems });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const formAction = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add your form submission logic here
  };
  const [selectedAddress, setSelectedAddress] = useState("");

  const handleAddressChange = (address) => {
    setSelectedAddress(address);
  }
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
    <div className="bg-white mt-5 rounded">
      <form>
        <div className="flex flex-col gap-6">
          <div className="flex items-center relative">
            <label className="w-1/3 px-6" htmlFor="location">
              Search for a location
            </label>
            <div className="relative w-1/2">
              <input
                type="text"
                name="location"
                id="location"
                placeholder="Search Location"
                className="h-10 px-5 pr-10 text-sm border-2 w-full outline-none focus:outline-none"
                value={formData.location}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="absolute right-0 top-0 mt-2 mr-2"
              >
                <LocationOnOutlinedIcon />
              </button>
            </div>
          </div>
          <h1 className="px-6 mt-5 font-semibold">Add Items</h1>
          <div>
          {formData.item.map((item, index) => (
            <div key={index} className="bg-gray-100 mx-6 p-10 rounded-lg mb-4">
              <div className="flex">
                <label className="w-1/3">Item Name</label>
                <select
                  name="name"
                  value={item.name}
                  onChange={(e) => handleItemChange(index, e)}
                  className="w-1/2 p-3"
                >
                  <option value="">Select</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                </select>
              </div>
              <div className="flex items-center">
                <label className="w-1/3">Quantity</label>
                <input
                  name="quantity"
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, e)}
                  className="w-1/2 p-3"
                />
              </div>
              <div className="flex items-center">
                <label className="w-1/3">Unit</label>
                <input
                  name="unit"
                  type="text"
                  value={item.unit}
                  onChange={(e) => handleItemChange(index, e)}
                  className="w-1/2 p-3"
                />
              </div>
              <div className="mx-3 flex justify-between mt-3 gap-3">
                <button
                  type="button"
                  className="bg-zinc-200 w-1/2 rounded-md p-2 flex items-center justify-center gap-2"
                >
                  <AddOutlined/>Upload Photo
                </button>
                <button
                  type="button"
                  className="bg-red-100 w-1/2 rounded-md p-2 flex items-center justify-center gap-2"
                  onClick={() => handleRemoveItem(index)}
                >
                  <RiDeleteBinLine className="text-red-500 text-[18px]" /> Delete Item
                </button>
              </div>
            </div>
          ))}
          </div>
          <div className="px-6">
            <button className="bg-gray-300 rounded-md flex items-center justify-center font-semibold p-3 w-[85%] "
                          onClick={() => handleAddItem()}>
              <PlusOutlined className="mr-3" /> Add More Items
            </button>
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
          <div className="flex items-center ">
            <label className="w-1/3 px-6" htmlFor="address">
              Select Delivery Address
            </label>
            {["Home", "Office", "Others"].map((address) => (
              <button
                key={address}
                type="button"
                className={`py-2 px-4  rounded border  ${
                  selectedAddress === address ? "bg-gray-300" : "bg-white"
                }`}
                onClick={() => handleAddressChange(address)}
              >
                {address}
              </button>
            ))}
          </div>
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
                <div>
         
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
            <label className="w-1/3 px-6" htmlFor="deliveryCharges">
              Delivery Charges
            </label>
            <input
              className="h-10 px-5  text-sm border-2 w-1/2  outline-none focus:outline-none"
              type="text"
              placeholder="Delivery Charges"
              id="deliveryCharges"
              name="deliveryCharges"
              value={formData.deliveryCharges}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="discount">
              Discount *
            </label>
            <input
              type="discount"
              name="discount"
              id="discount"
              placeholder="Discount"
              className="h-10 px-5  text-sm border-2 w-1/2 outline-none focus:outline-none relative"
              value={formData.discount}
              onChange={handleInputChange}
            />
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
          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="subtotal">
              Sub Total
            </label>
            <input
              type="number"
              name="subtotal"
              id="subtotal"
              placeholder="Sub Total"
              className="h-10 px-5  text-sm border-2 w-1/2 outline-none focus:outline-none relative"
              value={formData.subtotal}
              onChange={handleInputChange}
            />
          </div>
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
                      <td className="p-4">{order.item1}</td>
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
              onClick={formAction}
            >
              Create Order ₹534
            </button>
          </div>
  
      </form>
    </div>
  );
};

export default Customorder;
