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
import Sidebar from "../../sidebar/Sidebar";
import { Link } from "react-router-dom";
import { Modal, Switch } from "antd";

const Merchant = () => {
  const [isServiceableOpen, setIsServiceableOpen] = useState(false);
  const [isBusinessCustomizationOpen, setIsBusinessCustomizationOpen] =
    useState(false);
  const [isGeofenceOpen, setIsGeofenceOpen] = useState(false);

  const [selectedOption1, setSelectedOption1] = useState("Serviceable");
  const [selectedOption2, setSelectedOption2] = useState(
    "Business Customization"
  );
  const [selectedOption3, setSelectedOption3] = useState("Geofence");

  const [merchant, setMerchant] = useState([]);

  const handleToggle = (id) => {
    setMerchant((prevMerchant) =>
      prevMerchant.map((merchant) =>
        merchant.id === id
          ? { ...merchant, status: !merchant.status }
          : merchant
      )
    );
  };

  const handleApprove = (id) => {
    setMerchant((prevMerchants) =>
      prevMerchants.map((merchant) =>
        merchant.id === id
          ? { ...merchant, registrationApproval: "approved" }
          : merchant
      )
    );
  };

  const handleReject = (id) => {
    setMerchant((prevMerchants) =>
      prevMerchants.map((merchant) =>
        merchant.id === id
          ? { ...merchant, registrationApproval: "rejected" }
          : merchant
      )
    );
  };

  useEffect(() => {
    const fetchMerchant = async () => {
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
        },
      ];
      setMerchant(dummyData);
    };

    fetchMerchant();
  }, []);

  const toggleDropdown1 = () => {
    setIsServiceableOpen(!isServiceableOpen);
  };

  const toggleDropdown2 = () => {
    setIsBusinessCustomizationOpen(!isBusinessCustomizationOpen);
  };

  const toggleDropdown3 = () => {
    setIsGeofenceOpen(!isGeofenceOpen);
  };

  const handleOptionClick1 = (option) => {
    setSelectedOption1(option);
    setIsServiceableOpen(false);
  };

  const handleOptionClick2 = (option) => {
    setSelectedOption2(option);
    setIsBusinessCustomizationOpen(false);
  };

  const handleOptionClick3 = (option) => {
    setSelectedOption3(option);
    setIsGeofenceOpen(false);
  };
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

  const [addData, setAddData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
  });

  const handleInputChange = (e) => {
    setAddData({ ...addData, [e.target.name]: e.target.value });
  };
  const signupAction = (e) => {
    e.preventDefault();

    console.log(addData);
  };

  return (
    <section className="font-poppins h-screen">
      <Sidebar  className="w-64 fixed"/>
      <div className="flex justify-end p-4 ">
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
      <div className="flex justify-between items-center p-3">
        <h1 className="text-lg font-semibold ml-[280px] mb-8">Merchants</h1>
        <div className="flex space-x-2 md:flex justify-end mb-8">
          <button className="bg-cyan-100 text-black rounded-md px-4 py-2 font-semibold flex items-center space-x-2">
            <ArrowDownOutlined /> <span>CSV</span>
          </button>
          <div>
            <button
              className="bg-teal-700 text-white rounded-md px-4 py-2 font-semibold  flex items-center space-x-1 "
              onClick={showModal}
            >
              <PlusOutlined /> <span>Add Merchant</span>
            </button>
            <Modal
              title="Add Merchant"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null} // Custom footer to include form buttons
            >
              <form onSubmit={signupAction}>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center">
                    <label className="w-1/3 text-gray-500" htmlFor="name">
                      Full Name of owner
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3"
                      type="text"
                      value={addData.name}
                      id="name"
                      name="name"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-gray-500" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3"
                      type="email"
                      value={addData.email}
                      id="email"
                      name="email"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-gray-500" htmlFor="phone">
                      Phone Number
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3"
                      type="tel"
                      value={addData.phone}
                      id="phone"
                      name="phone"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-gray-500" htmlFor="password">
                      Password
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3"
                      type="password"
                      value={addData.password}
                      id="password"
                      name="password"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="confirmpassword"
                    >
                      Confirm Password
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3"
                      type="password"
                      value={addData.confirmpassword}
                      id="confirmpassword"
                      name="confirmpassword"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      className="bg-cyan-50 py-2 px-4 rounded-md"
                      type="button"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-teal-700 text-white py-2 px-4 rounded-md"
                      type="submit"
                      onClick={handleOk}
                    >
                      Add Merchant
                    </button>
                  </div>
                </div>
              </form>
            </Modal>
          </div>
        </div>
      </div>
      <div className="flex space-x-2 text-[14px] ml-[300px]">
        <div className="relative">
          <button
            onClick={toggleDropdown1}
            className=" bg-cyan-100 border border-gray-300 rounded-md shadow-sm px-[15px] w-[150px] py-2 text-left cursor-pointer focus:outline-none"
          >
            {selectedOption1}
            <span className="absolute inset-y-0 right-0 flex items-center px-2">
              <svg
                className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
                  isServiceableOpen ? "transform rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>
          {isServiceableOpen && (
            <div className="absolute mt-1 rounded-md bg-white shadow-lg w-[150px]">
              <ul>
                {["Open", "Close"].map((option) => (
                  <li
                    key={option}
                    onClick={() => handleOptionClick1(option)}
                    className="cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white"
                  >
                    <span className="font-normal block truncate">{option}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="relative">
          <button
            onClick={toggleDropdown2}
            className="bg-cyan-100 border border-gray-300 rounded-md shadow-sm px-[15px] w-[220px] text-[14px] py-2 text-left cursor-pointer focus:outline-none"
          >
            {selectedOption2}
            <span className="absolute inset-y-0 right-0 flex items-center pr-2">
              <svg
                className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
                  isBusinessCustomizationOpen ? "transform rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>
          {isBusinessCustomizationOpen && (
            <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg">
              <ul>
                {["Option1", "Option2"].map((option) => (
                  <li
                    key={option}
                    onClick={() => handleOptionClick2(option)}
                    className="cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white"
                  >
                    <span className="font-normal block truncate">{option}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="relative ">
          <button
            onClick={toggleDropdown3}
            className=" bg-cyan-100 border border-gray-300 rounded-md shadow-sm px-[15px] w-[150px] py-2 text-left cursor-pointer focus:outline-none"
          >
            {selectedOption3}
            <span className="absolute inset-y-0 right-0 flex items-center pr-2">
              <svg
                className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
                  isGeofenceOpen ? "transform rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>
          {isGeofenceOpen && (
            <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg">
              <ul>
                {["Option1", "Option2"].map((option) => (
                  <li
                    key={option}
                    onClick={() => handleOptionClick3(option)}
                    className="cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white"
                  >
                    <span className="font-normal block truncate">{option}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div>
          <FilterAltOutlinedIcon className="mt-2 text-gray-400  ml-[150px] " />
        </div>
        <div className="relative flex justify-end">
          <input
            type="search"
            name="search"
            placeholder="Search Merchant Name"
            className="bg-gray-100 h-10 px-5 pr-10 ml-[150px] rounded-full w-64 text-sm focus:outline-none"
          />
          <button type="submit" className="absolute right-0 top-0 mt-2 mr-4">
            <SearchOutlined className="text-xl text-gray-600" />
          </button>
        </div>
      </div>
      <div className="overflow mt-6">
        <div className=" bg-white rounded-xl  ml-[260px] font-poppins">
          <table className="bg-white mt-[45px] text-center ">
            <thead>
              <tr>
                {[
                  "Merchant ID",
                  "Merchant Name",
                  "Phone",
                  "Rating",
                  "Subscription Status",
                  "Serviceable",
                  "Geofence",
                  "Status",
                  "Registration Approval",
                ].map((header) => (
                  <th
                    key={header}
                    className="py-2 px-4 border-r-2 bg-teal-700 text-center text-white"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {merchant.map((merchant) => (
                <tr key={merchant.id}>
                  <td className="py-2 px-4 border-b border-gray-300 underline underline-offset-2">
                    <Link to={`/merchant/${merchant.id}`}>{merchant.id}</Link>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {merchant.name}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {merchant.phone}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {merchant.rating}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {merchant.subscriptionStatus}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {merchant.serviceable}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    {merchant.geofence}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    <Switch
                      checked={merchant.status}
                      onChange={() => handleToggle(merchant.id)}
                    />
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300">
                    <div className="flex space-x-2 justify-center">
                      <CheckCircleOutlined
                        className={`text-2xl cursor-pointer ${
                          merchant.registrationApproval === "approved"
                            ? "text-green-500"
                            : "text-gray-500"
                        }`}
                        onClick={() => handleApprove(merchant.id)}
                      />
                      <CloseCircleOutlined
                        className={`text-2xl cursor-pointer ${
                          merchant.registrationApproval === "rejected"
                            ? "text-red-500"
                            : "text-gray-500"
                        }`}
                        onClick={() => handleReject(merchant.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Merchant;
