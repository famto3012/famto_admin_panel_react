import { PlusOutlined } from "@ant-design/icons";
import { AddOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { RiDeleteBinLine } from "react-icons/ri";
import NewAddress from "./NewAddress";

const PickAndDrop = () => {
  const [formData, setFormData] = useState({
    pickdata: {
      firstName: "",
      emailId: "",
      phone: "",
      orderId: "",
      orderTime: "",
      instructions: "",
      tips: "",
      deliveryCharges: "",
      discount: "",
      paymentType: "",
      subtotal: "",
      items: [],
      address: [],
    },
    dropdata: {
      firstName: "",
      emailId: "",
      phone: "",
      orderId: "",
      orderTime: "",
      instructions: "",
      tips: "",
      deliveryCharges: "",
      discount: "",
      paymentType: "",
      subtotal: "",
      items: [],
      address: [],
    },
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const [section, key] = name.split(".");
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [key]: value,
      },
    }));
  };

  const handleItemChange = (section, index, e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const items = [...prevData[section].items];
      items[index] = { ...items[index], [name]: value };
      return {
        ...prevData,
        [section]: {
          ...prevData[section],
          items,
        },
      };
    });
  };

  const handleAddItem = (section) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        items: [
          ...prevData[section].items,
          { type: "", length: "", width: "", height: "", weight: "" },
        ],
      },
    }));
  };

  const handleRemoveItem = (section, index) => {
    setFormData((prevData) => {
      const items = [...prevData[section].items];
      items.splice(index, 1);
      return {
        ...prevData,
        [section]: {
          ...prevData[section],
          items,
        },
      };
    });
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
  const [isFormVisible1, setFormVisible1] = useState(false);

  const toggleFormVisibility1 = () => {
    setFormVisible1(!isFormVisible1);
  };
  const [isFormVisible2, setFormVisible2] = useState(false);

  const toggleFormVisibility2 = () => {
    setFormVisible2(!isFormVisible2);
  };

  return (
    <div>
      <h1 className="bg-teal-800 text-white px-6 py-4 text-xl font-semibold">
        Pick Up
      </h1>

      <form onSubmit={formSubmit}>
        <div className="flex flex-col gap-6">
          <h4 className="px-6 mt-10 font-semibold">Pickup Location Details</h4>
          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="pickdata.firstName">
              First Name *
            </label>
            <input
              type="text"
              name="pickdata.firstName"
              id="pickdata.firstName"
              placeholder="First Name"
              className="h-10 px-5  text-sm border-2 w-1/2 rounded-md outline-none focus:outline-none relative"
              value={formData.pickdata.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="pickdata.emailId">
              Email ID *
            </label>
            <input
              type="email"
              name="pickdata.emailId"
              id="pickdata.emailId"
              placeholder="Email Id"
              className="h-10 px-5  text-sm border-2 w-1/2 rounded-md outline-none focus:outline-none relative"
              value={formData.pickdata.emailId}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="pickdata.phone">
              Phone Number *
            </label>
            <input
              type="tel"
              name="pickdata.phone"
              id="pickdata.phone"
              placeholder="Phone Number"
              className="h-10 px-5  text-sm border-2 w-1/2 rounded-md outline-none focus:outline-none relative"
              value={formData.pickdata.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="pickdata.id">
              Order ID *
            </label>
            <input
              type="id"
              name="pickdata.id"
              id="pickdata.id"
              placeholder="Order ID"
              className="h-10 px-5  text-sm border-2 w-1/2 rounded-md outline-none focus:outline-none relative"
              value={formData.pickdata.id}
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
                onClick={toggleFormVisibility1}
              >
                <span>Add Address</span>
                <PlusOutlined />
              </button>
            </div>
            {isFormVisible1 && <NewAddress />}
          </div>

          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="pickdata.orderTime">
              Order Time
            </label>
            <input
              type="time"
              name="pickdata.orderTime"
              id="pickdata.orderTime"
              placeholder="In scheduled order,it will filled automatically as scheduled"
              className="h-10 px-5  text-sm border-2 w-1/2 rounded-md outline-none focus:outline-none relative"
              value={formData.pickdata.orderTime}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="pickdata.instructions">
              Pick Instructions(if any)
            </label>
            <input
              type="text"
              name="pickdata.instructions"
              id="pickdata.instructions"
              placeholder="Instructions"
              className="h-10 px-5  text-sm border-2 w-1/2 rounded-md outline-none focus:outline-none relative"
              value={formData.pickdata.instructions}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 px-6"> Task Specifications</label>
            <button
              type="button"
              className="bg-zinc-200 w-1/2 rounded-md p-2"
              onClick={() => handleAddItem("pickdata")}
            >
              <AddOutlined /> Add Item
            </button>
          </div>
          <div>
            {formData.pickdata.items.map((item, index) => (
              <div
                key={index}
                className="bg-gray-100 mx-6 p-10 rounded-lg mb-4"
              >
                <div className="flex">
                  <label className="w-1/3">Item type</label>
                  <select
                    name="type"
                    value={item.type}
                    onChange={(e) => handleItemChange("pickdata", index, e)}
                    className="w-1/2 p-3"
                  >
                    <option value="">Select</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                  </select>
                </div>
                <div className="flex mt-5">
                  <label className="w-1/3">Dimensions (in cm)</label>
                  <div className="w-1/2 gap-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        name="length"
                        value={item.length}
                        onChange={(e) => handleItemChange("pickdata", index, e)}
                        className="outline-none focus:outline-none border border-gray-200 p-3 rounded w-1/3"
                        placeholder="Length"
                      />
                      <input
                        type="text"
                        name="width"
                        value={item.width}
                        onChange={(e) => handleItemChange("pickdata", index, e)}
                        className="outline-none focus:outline-none border border-gray-200 p-3 rounded w-1/3"
                        placeholder="Width"
                      />
                      <input
                        type="text"
                        name="height"
                        value={item.height}
                        onChange={(e) => handleItemChange("pickdata", index, e)}
                        className="outline-none focus:outline-none border border-gray-200 p-3 rounded w-1/3"
                        placeholder="Height"
                      />
                    </div>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="weight"
                        value={item.weight}
                        onChange={(e) => handleItemChange("pickdata", index, e)}
                        className="outline-none focus:outline-none border border-gray-200 p-3 rounded w-full"
                        placeholder="Weight (in kg)"
                      />
                    </div>
                  </div>
                </div>
                <div className="mx-3 flex justify-between mt-3 gap-3">
                  <button
                    type="button"
                    className="bg-zinc-200 w-1/2 rounded-md p-2 flex items-center justify-center gap-2"
                    onClick={() => handleAddItem("pickdata")}
                  >
                    <AddOutlined /> Add Item
                  </button>
                  <button
                    type="button"
                    className="bg-red-100 w-1/2 rounded-md p-2 flex items-center justify-center gap-2"
                    onClick={() => handleRemoveItem("pickdata", index)}
                  >
                    <RiDeleteBinLine className="text-red-500 text-[18px]" />{" "}
                    Delete Item
                  </button>
                </div>
              </div>
            ))}
          </div>
          <h4 className="px-6 mt-5 font-semibold">Pricing Charges</h4>
          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="pickdata.tips">
              Tips
            </label>
            <input
              className="h-10 px-5  text-sm border-2 w-1/2 rounded-md  outline-none focus:outline-none"
              type="text"
              placeholder="Tips"
              id="pickdata.tips"
              name="pickdata.tips"
              value={formData.pickdata.tips}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="pickdata.deliveryCharges">
              Delivery Charges
            </label>
            <input
              className="h-10 px-5  text-sm border-2 w-1/2 rounded-md outline-none focus:outline-none"
              type="text"
              placeholder="Delivery Charges"
              id="pickdata.deliveryCharges"
              name="pickdata.deliveryCharges"
              value={formData.pickdata.deliveryCharges}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="pickdata.discount">
              Discount *
            </label>
            <input
              type="text"
              name="pickdata.discount"
              id="pickdata.discount"
              placeholder="Discount"
              className="h-10 px-5  text-sm border-2 w-1/2 rounded-md outline-none focus:outline-none relative"
              value={formData.pickdata.discount}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="pickdata.paymentType">
              Payment Type
            </label>
            <select
              className="h-10 px-5  text-sm border-2 w-1/2 rounded-md outline-none focus:outline-none"
              type="text"
              placeholder="Payment Type"
              id="pickdata.paymentType"
              name="pickdata.paymentType"
              value={formData.pickdata.paymentType}
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
            <label className="w-1/3 px-6" htmlFor="pickdata.subtotal">
              Sub Total
            </label>
            <input
              type="number"
              name="pickdata.subtotal"
              id="pickdata.subtotal"
              placeholder="Sub Total"
              className="h-10 px-5  text-sm border-2 w-1/2 outline-none rounded-md focus:outline-none relative"
              value={formData.pickdata.subtotal}
              onChange={handleInputChange}
            />
          </div>
          <div className="px-6">
            <button className="bg-gray-300 rounded-md flex items-center justify-center font-semibold p-3 w-[85%] ">
              <PlusOutlined className="mr-3" /> Add More Pick
            </button>
          </div>
        </div>

        <h1 className="bg-teal-800 text-white px-6 py-4 text-xl font-semibold mt-8">
          Drop
        </h1>

        <div className="flex flex-col gap-6">
          <h4 className="px-6 mt-10 font-semibold">
            Delivery Location Details
          </h4>
          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="dropdata.firstName">
              First Name *
            </label>
            <input
              type="text"
              name="dropdata.firstName"
              id="dropdatafirstName"
              placeholder="First Name"
              className="h-10 px-5  text-sm border-2 w-1/2 rounded-md outline-none focus:outline-none relative"
              value={formData.dropdata.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="dropdata.emailId">
              Email ID *
            </label>
            <input
              type="email"
              name="dropdata.emailId"
              id="dropdata.emailId"
              placeholder="Email Id"
              className="h-10 px-5  text-sm border-2 w-1/2 rounded-md outline-none focus:outline-none relative"
              value={formData.dropdata.emailId}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="dropdata.phone">
              Phone Number *
            </label>
            <input
              type="tel"
              name="dropdata.phone"
              id="dropdata.phone"
              placeholder="Phone Number"
              className="h-10 px-5  text-sm border-2 w-1/2 rounded-md outline-none focus:outline-none relative"
              value={formData.dropdata.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="dropdata.id">
              Order ID *
            </label>
            <input
              type="id"
              name="dropdata.id"
              id="dropdata.id"
              placeholder="Order ID"
              className="h-10 px-5  text-sm border-2 w-1/2 rounded-md outline-none focus:outline-none relative"
              value={formData.dropdata.id}
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
                onClick={toggleFormVisibility2}
              >
                <span>Add Address</span>
                <PlusOutlined />
              </button>
            </div>
            {isFormVisible2 && <NewAddress />}
          </div>
          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="dropdata.orderTime">
              Order Time
            </label>
            <input
              type="time"
              name="dropdata.orderTime"
              id="dropdata.orderTime"
              placeholder="In scheduled order,it will filled automatically as scheduled"
              className="h-10 px-5  text-sm border-2 w-1/2 rounded-md outline-none focus:outline-none relative"
              value={formData.dropdata.orderTime}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="dropdata.instructions">
              Pick Instructions(if any)
            </label>
            <input
              type="text"
              name="dropdata.instructions"
              id="dropdata.instructions"
              placeholder="Instructions"
              className="h-10 px-5  text-sm border-2 w-1/2 rounded-md outline-none focus:outline-none relative"
              value={formData.dropdata.instructions}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 px-6"> Task Specifications</label>
            <button
              type="button"
              className="bg-zinc-200 w-1/2 rounded-md p-2"
              onClick={() => handleAddItem("dropdata")}
            >
              <AddOutlined /> Add Item
            </button>
          </div>
          <div>
            {formData.dropdata.items.map((item, index) => (
              <div
                key={index}
                className="bg-gray-100 mx-6 p-10 rounded-lg mb-4"
              >
                <div className="flex">
                  <label className="w-1/3">Item type</label>
                  <select
                    name="type"
                    value={item.type}
                    onChange={(e) => handleItemChange("dropdata", index, e)}
                    className="w-1/2 p-3"
                  >
                    <option value="">Select</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                  </select>
                </div>
                <div className="flex mt-5">
                  <label className="w-1/3">Dimensions (in cm)</label>
                  <div className="w-1/2 gap-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        name="length"
                        value={item.length}
                        onChange={(e) => handleItemChange("dropdata", index, e)}
                        className="outline-none focus:outline-none border border-gray-200 p-3 rounded w-1/3"
                        placeholder="Length"
                      />
                      <input
                        type="text"
                        name="width"
                        value={item.width}
                        onChange={(e) => handleItemChange("dropdata", index, e)}
                        className="outline-none focus:outline-none border border-gray-200 p-3 rounded w-1/3"
                        placeholder="Width"
                      />
                      <input
                        type="text"
                        name="height"
                        value={item.height}
                        onChange={(e) => handleItemChange("dropdata", index, e)}
                        className="outline-none focus:outline-none border border-gray-200 p-3 rounded w-1/3"
                        placeholder="Height"
                      />
                    </div>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="weight"
                        value={item.weight}
                        onChange={(e) => handleItemChange("dropdata", index, e)}
                        className="outline-none focus:outline-none border border-gray-200 p-3 rounded w-full"
                        placeholder="Weight (in kg)"
                      />
                    </div>
                  </div>
                </div>
                <div className="mx-3 flex justify-between mt-3 gap-3">
                  <button
                    type="button"
                    className="bg-zinc-200 w-1/2 rounded-md p-2 flex items-center justify-center gap-2"
                    onClick={() => handleAddItem("dropdata")}
                  >
                    <AddOutlined /> Add Item
                  </button>
                  <button
                    type="button"
                    className="bg-red-100 w-1/2 rounded-md p-2 flex items-center justify-center gap-2"
                    onClick={() => handleRemoveItem("dropdata", index)}
                  >
                    <RiDeleteBinLine className="text-red-500 text-[18px]" />{" "}
                    Delete Item
                  </button>
                </div>
              </div>
            ))}
          </div>
          <h4 className="px-6 mt-5 font-semibold">Pricing Charges</h4>
          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="dropdata.tips">
              Tips
            </label>
            <input
              className="h-10 px-5  text-sm border-2 w-1/2 rounded-md outline-none focus:outline-none"
              type="text"
              placeholder="Tips"
              id="dropdata.tips"
              name="dropdata.tips"
              value={formData.dropdata.tips}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="dropdata.deliveryCharges">
              Delivery Charges
            </label>
            <input
              className="h-10 px-5  text-sm border-2 w-1/2 rounded-md  outline-none focus:outline-none"
              type="text"
              placeholder="Delivery Charges"
              id="dropdata.deliveryCharges"
              name="dropdata.deliveryCharges"
              value={formData.dropdata.deliveryCharges}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="dropdata.discount">
              Discount *
            </label>
            <input
              type="discount"
              name="dropdata.discount"
              id="dropdata.discount"
              placeholder="Discount"
              className="h-10 px-5  text-sm border-2 w-1/2 rounded-md outline-none focus:outline-none relative"
              value={formData.dropdata.discount}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="dropdata.paymentType">
              Payment Type
            </label>
            <select
              className="h-10 px-5  text-sm border-2 w-1/2 rounded-md outline-none focus:outline-none"
              type="text"
              placeholder="Payment Type"
              id="dropdata.paymentType"
              name="dropdata.paymentType"
              value={formData.dropdata.paymentType}
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
            <label className="w-1/3 px-6" htmlFor="dropdata.subtotal">
              Sub Total *
            </label>
            <input
              type="number"
              name="dropdata.subtotal"
              id="dropdata.subtotal"
              placeholder="Sub Total"
              className="h-10 px-5  text-sm border-2 w-1/2 rounded-md outline-none focus:outline-none relative"
              value={formData.dropdata.subtotal}
              onChange={handleInputChange}
            />
          </div>
          <div className="px-6">
            <button className="bg-gray-300 rounded-md flex items-center justify-center font-semibold p-3 w-[85%] ">
              <PlusOutlined className="mr-3" /> Add More Drop
            </button>
          </div>
        </div>

        <div className="flex mt-8">
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
      </form>
    </div>
  );
};

export default PickAndDrop;
