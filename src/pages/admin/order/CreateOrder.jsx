import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { ArrowBack } from "@mui/icons-material";
import { BellOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import Takeaway from "../../../components/Takeaway";
import HomeDelivery from "../../../components/HomeDelivery";
import PickDrop from "../../../components/PickDrop";
import Customorder from "../../../components/Customorder";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const CreateOrder = () => {
  const [customer, setCustomer] = useState("");
  const [selectedOption, setSelectedOption] = useState("takeaway");
  const [selectOption, setSelectOption] = useState("ondemand");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleOptionChange1 = (event) => {
    setSelectOption(event.target.value);
    if (event.target.value === "scheduled") {
      showModal();
    }
  };

  const [dateTime, setDateTime] = useState("");

  const handleChange = (event) => {
    setDateTime(event.target.value);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    console.log(customer);
  };

  const [isFormVisible, setFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    location: "",
  });

  const handleInputChange = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(customerData); // Replace with your submission logic
    // Example: Submit data to server or process locally
    // Clear form after submission if needed
    setCustomerData({
      name: "",
      email: "",
      phone: "",
      address: "",
      location: "",
    });
  
  
  const currentDate = new Date();
  // Set the maximum date to 30 days from now
  const maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  // Format dates to YYYY-MM-DDTHH:MM (for datetime-local input)
  const formatDateTimeLocal = (date) => {
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
    return adjustedDate.toISOString().slice(0, 16);
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
          <div className="flex justify-end p-4 gap-7">
            <BellOutlined className="text-2xl text-gray-500" />
            <div className="relative">
              <input
                type="search"
                name="search"
                placeholder="Search"
                className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none mr-6"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-2 mr-9"
              >
                <SearchOutlined className="text-xl text-gray-500" />
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white mx-11 mt-5 p-5 rounded">
          <form onSubmit={formSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex items-center relative">
                <label className="w-1/3 px-6" htmlFor="customer">
                  Select Customer
                </label>
                <div className="relative w-1/2">
                  <input
                    type="search"
                    id="customer"
                    name="customer"
                    placeholder="Search Customer"
                    className="h-10 px-5 text-sm border-2 w-full outline-none focus:outline-none"
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="absolute right-0 top-0 mt-2 mr-2"
                  >
                    <SearchOutlined className="text-xl text-gray-500" />
                  </button>
                </div>
              </div>
              <div className="">
                <div className=" flex">
                  <label className="w-1/3"></label>
                  <button
                    type="button"
                    className="w-1/2 bg-gray-200 font-semibold py-2 rounded flex justify-between items-center px-4 border border-gray-300"
                    onClick={toggleFormVisibility}
                  >
                    <span>Add Customer</span>
                    <PlusOutlined />
                  </button>
                </div>

                {isFormVisible && (
                  <div className="flex">
                    <label className="w-1/3"></label>
                    <div className="mt-6 p-6 bg-gray-200 rounded-lg shadow-lg w-1/2">
                      <form on onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-3">
                          <div className="flex item-center justify-center">
                            <label className="  w-1/3 text-md font-medium mt-2">
                              Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              placeholder="Name"
                              className=" w-2/3 px-3 py-2 bg-white   rounded focus:outline-none outline-none"
                              value={customerData.name}
                              onChange={handleInputChange}
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
                              value={customerData.email}
                              onChange={handleInputChange}

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
                              value={customerData.phone}
                              onChange={handleInputChange}

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
                              value={customerData.address}
                              onChange={handleInputChange}

                            />
                          </div>
                          <div className="flex items-center">
                            <label className="w-1/3 text-md font-medium ">
                              <LocationOnOutlinedIcon />
                            </label>
                            <input
                              type="text"
                              name="location"
                              placeholder="location"
                              className=" w-2/3 px-3 py-2 bg-white  rounded focus:outline-none outline-none"
                              value={customerData.location}
                              onChange={handleInputChange}

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
                            Add Customer
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center mt-1">
                <label className="w-1/3 px-6 text-gray-700">
                  Select Delivery Option
                </label>
                <div className="flex items-center space-x-2 gap-2">
                  <input
                    type="radio"
                    name="deliveryOption"
                    value="ondemand"
                    checked={selectOption === "ondemand"}
                    onChange={handleOptionChange1}
                    className="form-radio"
                  />
                  <label htmlFor="ondemand" className="mr-4">
                    On demand
                  </label>
                  <input
                    type="radio"
                    name="deliveryOption"
                    value="scheduled"
                    checked={selectOption === "scheduled"}
                    onChange={handleOptionChange1}
                    className="form-radio"
                  />
                  <label htmlFor="scheduled" className="mr-4">
                    Scheduled
                  </label>
                </div>
              </div>
              {selectOption === "scheduled" && (
                <div className="relative flex justify-center my-8 ml-24">
                  <input
                    type="datetime-local"
                    id="datetime"
                    name="datetime"
                    className="h-10 text-sm  px-3 border-2 w-1/2 ml-10 outline-none focus:outline-none"
                    value={dateTime}
                    min={formatDateTimeLocal(currentDate)} 
                    max={formatDateTimeLocal(maxDate)}
                    onChange={handleChange}
                  />
                </div>
              )}

              <div className="flex items-center mt-2">
                <label className="w-1/3 px-6 text-gray-700">
                  Select Delivery Option
                </label>
                <div className="flex item-center space-x-2 w-2/3 gap-3">
                  <input
                    type="radio"
                    id="takeaway"
                    name="option"
                    value="takeaway"
                    onChange={handleOptionChange}
                    checked={selectedOption === "takeaway"}
                    className=""
                  />
                  <label htmlFor="takeaway" className="mr-4">
                    Take Away
                  </label>

                  <input
                    type="radio"
                    id="homedelivery"
                    name="option"
                    value="homedelivery"
                    onChange={handleOptionChange}
                    checked={selectedOption === "homedelivery"}
                    className=""
                  />
                  <label htmlFor="homedelivery" className="mr-4">
                    Home Delivery
                  </label>

                  <input
                    type="radio"
                    id="pickanddrop"
                    name="option"
                    value="pickanddrop"
                    onChange={handleOptionChange}
                    checked={selectedOption === "pickanddrop"}
                    className="mr-2"
                  />
                  <label htmlFor="pickanddrop">Pick & Drop</label>
                  <input
                    type="radio"
                    id="customorder"
                    name="option"
                    value="customorder"
                    onChange={handleOptionChange}
                    checked={selectedOption === "customorder"}
                    className="mr-2"
                  />
                  <label htmlFor="customorder" className="mr-4">
                    Custom Order
                  </label>
                </div>
              </div>
            </div>

            {selectedOption === "takeaway" && (
              <div className="mt-8">
                <Takeaway />
              </div>
            )}

            {selectedOption === "homedelivery" && (
              <div className="mt-8">
                <HomeDelivery />
              </div>
            )}
            {selectedOption === "pickanddrop" && (
              <div className="mt-8">
                <PickDrop />
              </div>
            )}
            {selectedOption === "customorder" && (
              <div className="mt-8">
                <Customorder />
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};


export default CreateOrder;
