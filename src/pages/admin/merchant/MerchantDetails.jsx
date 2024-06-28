import React, { useState } from "react";
import BlockIcon from "@mui/icons-material/Block";
import { MdOutlineModeEditOutline, MdCameraAlt } from "react-icons/md";
import Sidebar from "../../../components/Sidebar";
import { Link } from "react-router-dom";
import GlobalSearch from "../../../components/GlobalSearch";
import AddMerchant from "../../../components/model/AddMerchant";
import EditMerchant from "../../../components/model/EditMerchant";
import { Modal, Switch } from "antd";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const MerchantDetails = () => {
  const [formData, setFormData] = useState({
    _id: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    merchantDetails: {
      merchantName: "",
      merchantImageURL: "",
      displayAddress: "",
      isApproved: "",
      description: "",
      geoFenceId: "",
      pricing: "",
      location: "",
      pancardNumber: "",
      pancardImageURL: "",
      GSTINNumber: "",
      GSTINImageURL: "",
      FSSAINumber: "",
      FSSAIImageURL: "",
      aadharNumber: "",
      aadharImageURL: "",
      businessCategoryId: "",
      type: "",
      deliveryOption: "",
      deliveryTime: "",
      preOrderStatus: null,
      servingArea: "",
      servingRadius: "",
    },
    sponsorshipDetail: [],
    availability: {
      type: "",
      sunday: {
        openAllDay: null,
        closedAllDay: null,
        specificTime: null,
        startTime: "",
        endTime: "",
      },
      monday: {
        openAllDay: null,
        closedAllDay: null,
        specificTime: null,
        startTime: "",
        endTime: "",
      },
      tuesday: {
        openAllDay: null,
        closedAllDay: null,
        specificTime: null,
        startTime: "",
        endTime: "",
      },
      wednesday: {
        openAllDay: null,
        closedAllDay: null,
        specificTime: null,
        startTime: "",
        endTime: "",
      },
      thursday: {
        openAllDay: null,
        closedAllDay: null,
        specificTime: null,
        startTime: "",
        endTime: "",
      },
      friday: {
        openAllDay: null,
        closedAllDay: null,
        specificTime: null,
        startTime: "",
        endTime: "",
      },
      saturday: {
        openAllDay: null,
        closedAllDay: null,
        specificTime: null,
        startTime: "",
        endTime: "",
      },
    },
  });

  const data = [
    {
      id: "ID",
      name: "Name",
      review:
        "This is 💯 one hundred percent the best lip mask duo ever !!! The scent is delicious and it's so smooth from the scrub & mask",
      rating: 5,
    },
    {
      id: "ID",
      name: "Name",
      review:
        "This is 💯 one hundred percent the best lip mask duo ever !!! The scent is delicious and it's so smooth from the scrub & mask",
      rating: 5,
    },
    {
      id: "ID",
      name: "Name",
      review:
        "This is 💯 one hundred percent the best lip mask duo ever !!! The scent is delicious and it's so smooth from the scrub & mask",
      rating: 5,
    },
  ];

  const [editData, setEditData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChangeEdit = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const EditAction = async (e) => {
    e.preventDefault();
    console.log("Edit data", editData);
  };

  const [merchantFile, setMerchantFile] = useState(null);
  const [merchantPreviewURL, setMerchantPreviewURL] = useState(null);

  const handleMerchantImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setMerchantFile(file);
    setMerchantPreviewURL(URL.createObjectURL(file));
  };

  const [pancardFile, setPancardFile] = useState(null);
  const [pancardPreviewURL, setPancardPreviewURL] = useState(null);

  const handlePancardImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setPancardFile(file);
    setPancardPreviewURL(URL.createObjectURL(file));
  };

  const [gstFile, setgstFile] = useState(null);
  const [gstPreviewURL, setgstPreviewURL] = useState(null);

  const handlegstImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setgstFile(file);
    setgstPreviewURL(URL.createObjectURL(file));
  };

  const [fssaiFile, setFssaiFile] = useState(null);
  const [fssaiPreviewURL, setFssaiPreviewURL] = useState(null);

  const handleFssaiImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFssaiFile(file);
    setFssaiPreviewURL(URL.createObjectURL(file));
  };

  const [aadharFile, setAadharFile] = useState(null);
  const [aadharPreviewURL, setAadharPreviewURL] = useState(null);

  const handleAadharImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setAadharFile(file);
    setAadharPreviewURL(URL.createObjectURL(file));
  };

  const [merchant, setMerchant] = useState("");

  const handleToggle = (id) => {
    setMerchant((prevMerchant) =>
      prevMerchant.map((merchant) =>
        merchant.id === id
          ? { ...merchant, status: !merchant.status }
          : merchant
      )
    );
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

  const [isModalVisibleRatings, setIsModalVisibleRatings] = useState(false);

  const showModalRatings = () => {
    setIsModalVisibleRatings(true);
  };

  const handleOkRatings = () => {
    setIsModalVisibleRatings(false);
  };

  const handleCancelRatings = () => {
    setIsModalVisibleRatings(false);
  };

  const merchants = {
    name: "Sarath",
    address: "Trivandrum",
    owner: "Nandhu",
    email: "sarath@gmailcom",
    phone: "123456789",
    password: "1234",
  };

  function loadFile(event) {
    var output = document.getElementById("preview_img");
    var file = event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function (e) {
        output.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else if (type === "radio") {
      const [day, field] = name.split(".");
      if (day && field) {
        setFormData({
          ...formData,
          weekdays: {
            ...formData.weekdays,
            [day]: {
              ...formData.weekdays[day],
              [field]: value,
            },
          },
        });
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleChangeRadio = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "radio") {
      const [day, field] = name.split(".");
      const test = ["open", "closed", "specific"];
      const details = {
        open: false,
        closed: false,
        specific: true,
        startTime: "",
        endTime: "",
      };

      test.forEach((testValue) => {
        if (field == testValue) {
          details[testValue] = true;
        } else {
          details[testValue] = false;
        }
        setFormData({
          ...formData,
          weekdays: {
            ...formData.weekdays,
            [day]: details,
          },
        });
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <>
      <Sidebar />

      <main className="p-6 bg-gray-100 pl-[260px] h-full overflow-auto">
        <GlobalSearch />

        <div className="flex justify-between my-[15px] mt-8 mb-8">
          <h3 className="font-[600] text-[18px]">Merchantname</h3>
          <div>
            <Link className="bg-yellow-100 py-2 px-5 p-1 mr-5 rounded-xl">
              <BlockIcon className="w-2 h-2 text-red-600" /> Block
            </Link>
            Status
            <Switch className="text-teal-700 ml-2" />
          </div>
        </div>

        <form
          className="bg-white shadow-md rounded-lg p-5 w-full overflow-auto"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-2">
            <div className="flex flex-col ">
              <div className="mb-4 flex items-center justify-between">
                <label className="text-red-500 font-[600]">ID</label>
                <input
                  type="text"
                  className=" outline-none focus:outline-none p-[10px] bg-transparent rounded text-red-600 placeholder:text-red-600"
                  placeholder="Id"
                  disabled
                  value={""}
                />
              </div>

              <div className="mb-4 flex items-center justify-between">
                <label className="block text-gray-700">Merchant name*</label>
                <input
                  type="text"
                  name="fullName"
                  className=" outline-none focus:outline-none border border-[#333]/10 p-[10px] rounded"
                  placeholder="Merchant name"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4 flex items-center justify-between">
                <label className="block text-gray-700">Display address*</label>
                <input
                  type="text"
                  name="displayAddress"
                  className=" outline-none focus:outline-none border border-[#333]/10 p-[10px] rounded"
                  placeholder="Merchant Adress"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4 flex items-center justify-between">
                <label className="block text-gray-700">Name of owner*</label>
                <input
                  type="text"
                  name="merchantName"
                  className=" outline-none focus:outline-none border border-[#333]/10 p-[10px] rounded"
                  placeholder="Merchant name"
                  value={formData.merchantName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex flex-col ">
              <div className=" flex items-center justify-between mb-4">
                <label className="">Email</label>
                <input
                  type="text"
                  name="email"
                  className=" outline-none focus:outline-none border border-[#333]/10 p-[10px] rounded"
                  placeholder="Merchant name"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4 flex items-center justify-between">
                <label className="block text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  className=" outline-none focus:outline-none border border-[#333]/10 p-[10px] rounded"
                  placeholder="Merchant name"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4 flex items-center justify-between">
                <label className="block text-gray-700">
                  Registration status
                </label>
                <input
                  type="text"
                  className=" outline-none focus:outline-none p-[10px] bg-transparent rounded"
                  placeholder="Merchant name"
                  disabled
                  value={""}
                />
              </div>
            </div>

            <div className="flex flex-col items-center">
              {!merchantPreviewURL && (
                <div className="bg-gray-400 h-20 w-20 rounded-md" />
              )}

              {merchantPreviewURL && (
                <figure className="w-[100px] h-[100px] rounded relative">
                  <img
                    src={merchantPreviewURL}
                    alt="profile"
                    className="w-full rounded h-full object-cover "
                  />
                </figure>
              )}

              <input
                type="file"
                name="merchantImage"
                id="merchantImage"
                className="hidden"
                onChange={handleMerchantImageChange}
              />

              <label htmlFor="merchantImage" className="cursor-pointer">
                <MdCameraAlt
                  className=" bg-teal-500 text-[40px] text-white p-2"
                  size={30}
                />
              </label>
            </div>

            <button
              onClick={showModal}
              className="bg-teal-600 w-fit h-fit py-2 px-1.5 rounded text-white flex items-center gap-[10px]"
            >
              {" "}
              <MdOutlineModeEditOutline className="" />
              Edit Merchant
            </button>
            <Modal
              title="Edit Merchant"
              open={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null} // Custom footer to include form buttons
            >
              <form onSubmit={EditAction}>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center">
                    <label className="w-1/3 text-gray-500">
                      Full Name of owner
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3"
                      type="text"
                      value={editData.fullName}
                      id="name"
                      name="fullname"
                      onChange={handleInputChangeEdit}
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-gray-500">Email</label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3"
                      type="email"
                      value={editData.email}
                      id="email"
                      name="email"
                      onChange={handleInputChangeEdit}
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-gray-500">Phone Number</label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3"
                      type="tel"
                      value={editData.phoneNumber}
                      id="phone"
                      name="phone"
                      onChange={handleInputChangeEdit}
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-gray-500">Password</label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3"
                      type="password"
                      value={editData.password}
                      id="password"
                      name="password"
                      onChange={handleInputChangeEdit}
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-gray-500">
                      Confirm Password
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3"
                      type="password"
                      value={editData.confirmPassword}
                      id="confirmpassword"
                      name="confirmpassword"
                      onChange={handleInputChangeEdit}
                    />
                  </div>
                  <div className="flex justify-end  gap-4">
                    <button
                      className="bg-gray-300 rounded-lg px-6 py-2 font-semibold justify-end"
                      onClick={handleCancel}
                      type="submit"
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-teal-800 rounded-lg px-6 py-2 text-white font-semibold justify-end"
                      onClick={handleOk}
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </Modal>
          </div>

          <div className=" max-w-[700px] mt-14 mb-[50px]">
            <div className="mb-[20px] flex items-center justify-between gap-[30px]">
              <label className=" text-gray-700 text-[16px]">
                Short Description <br /> (Max 10 characters)
              </label>
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
                className="w-[20rem] border rounded-md p-2"
                onChange={handleChange}
              />
            </div>

            <div className="mb-[20px] flex items-center justify-between gap-[30px]">
              <label className="text-gray-700 text-[16px]">Geo fence</label>
              <select
                name="geoFence"
                value={formData.geoFenceId}
                onChange={handleChange}
                className="mt-2 p-2  w-[20rem] border rounded-md"
              >
                <option value="Thampanoor">Thampanoor</option>
                <option value="Pattom">Pattom</option>
                <option value="PMG">PMG</option>
              </select>
            </div>

            <div className="mb-[20px] flex items-center justify-between gap-[30px]">
              <label className=" text-gray-700 text-[16px]">Pricing</label>
              <input
                disabled
                type="number"
                name="pricing"
                placeholder="Pricing"
                className="w-[20rem] bg-transparent rounded-md p-2"
              />
            </div>

            <div className="mb-[20px] flex items-center justify-between gap-[30px]">
              <label className="text-gray-700 ">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className=" p-2  w-[20rem] border rounded-md"
              />
            </div>

            <div className="mb-[20px] w-[600px] flex items-center justify-between gap-[30px]">
              <label className="text-gray-700 ">Ratings</label>
              <button
                type="button"
                onClick={showModalRatings}
                className="bg-teal-700 text-white p-2 rounded-md w-[20rem]"
              >
                Show ratings and reviews
              </button>
              <Modal
                title="Ratings"
                open={isModalVisibleRatings}
                onOk={handleOkRatings}
                onCancel={handleCancelRatings}
                className="w-[600px]"
                footer={null} // Custom footer to include form buttons
              >
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse block md:table text-center mt-4">
                    <thead className="block md:table-header-group">
                      <tr className="border border-gray-300 md:border-none md:table-row">
                        <th className="p-2 px-5 border-r-2 bg-teal-700 font-normal text-white">
                          ID
                        </th>
                        <th className="p-2 px-8 border-r-2 bg-teal-700 font-normal text-white">
                          Name
                        </th>
                        <th className="px-6 border-r-2 bg-teal-700 font-normal text-white text-left ">
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
                              {Array.from({ length: item.rating }).map(
                                (_, i) => (
                                  <svg
                                    key={i}
                                    className="w-5 h-5 text-yellow-500 text-center"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M9.049.467a1.003 1.003 0 011.902 0l1.454 4.553h4.769a1 1 0 01.593 1.807l-3.855 2.8 1.453 4.553a1 1 0 01-1.54 1.117L10 13.137l-3.855 2.8a1 1 0 01-1.54-1.117l1.453-4.553-3.855-2.8a1 1 0 01.593-1.807h4.77L9.05.467z"></path>
                                  </svg>
                                )
                              )}
                            </div>
                            <p className="mt-2 ">{item.review}</p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Modal>
            </div>
          </div>

          <div className="mb-[50px] w-full">
            <h3 className="text-gray-700 font-bold mb-2">Documents provided</h3>

            <div className="flex justify-between items-center my-[20px] max-w-[700px]">
              <label className=" text-gray-700 text-[16px]">Pan card</label>
              <input
                type="text"
                name="pancardNumber"
                value={formData.pancardNumber}
                onChange={handleChange}
                className="p-2 border rounded-md w-[20rem] mx-[40px]"
              />
              <div className=" flex items-center gap-[30px]">
                {!pancardPreviewURL && (
                  <div className="bg-gray-400 h-20 w-20 rounded-md" />
                )}
                {pancardPreviewURL && (
                  <figure className="w-[100px] h-[100px] rounded relative">
                    <img
                      src={pancardPreviewURL}
                      alt="profile"
                      className="w-full rounded h-full object-cover "
                    />
                  </figure>
                )}
                <input
                  type="file"
                  name="pancardImage"
                  id="pancardImage"
                  className="hidden"
                  onChange={handlePancardImageChange}
                />

                <label htmlFor="pancardImage" className="cursor-pointer ">
                  <MdCameraAlt
                    className=" bg-teal-500 text-[40px] text-white p-2 h-[40px] w-[40px] rounded"
                    size={30}
                  />
                </label>
              </div>
            </div>

            <div className="flex justify-between items-center my-[20px] max-w-[700px]">
              <label className=" text-gray-700 text-[16px]">GSSTIN</label>
              <input
                type="text"
                name="GSTINNumber"
                value={formData.GSTINNumber}
                onChange={handleChange}
                className="p-2 border rounded-md w-[20rem] mx-[40px]"
              />
              <div className=" flex items-center gap-[30px]">
                {!gstPreviewURL && (
                  <div className="bg-gray-400 h-20 w-20 rounded-md" />
                )}
                {gstPreviewURL && (
                  <figure className="w-[100px] h-[100px] rounded relative">
                    <img
                      src={gstPreviewURL}
                      alt="profile"
                      className="w-full rounded h-full object-cover "
                    />
                  </figure>
                )}
                <input
                  type="file"
                  name="GSTImage"
                  id="gstImage"
                  className="hidden"
                  onChange={handlegstImageChange}
                />

                <label htmlFor="gstImage" className="cursor-pointer ">
                  <MdCameraAlt
                    className=" bg-teal-500 text-[40px] text-white p-2 h-[40px] w-[40px] rounded"
                    size={30}
                  />
                </label>
              </div>
            </div>

            <div className="flex justify-between items-center my-[20px] max-w-[700px]">
              <label className=" text-gray-700 text-[16px]">FSSAI</label>
              <input
                type="text"
                name="FSSAINumber"
                value={formData.FSSAINumber}
                onChange={handleChange}
                className="p-2 border rounded-md w-[20rem] mx-[40px]"
              />
              <div className=" flex items-center gap-[30px]">
                {!fssaiPreviewURL && (
                  <div className="bg-gray-400 h-20 w-20 rounded-md" />
                )}
                {fssaiPreviewURL && (
                  <figure className="w-[100px] h-[100px] rounded relative">
                    <img
                      src={fssaiPreviewURL}
                      alt="profile"
                      className="w-full rounded h-full object-cover "
                    />
                  </figure>
                )}
                <input
                  type="file"
                  name="FSSAIImageURL"
                  id="FSSAIImageURL"
                  className="hidden"
                  onChange={handleFssaiImageChange}
                />

                <label htmlFor="FSSAIImageURL" className="cursor-pointer ">
                  <MdCameraAlt
                    className=" bg-teal-500 text-[40px] text-white p-2 h-[40px] w-[40px] rounded"
                    size={30}
                  />
                </label>
              </div>
            </div>

            <div className="flex justify-between items-center my-[20px] max-w-[700px]">
              <label className=" text-gray-700 text-[16px]">
                Adhaar Number
              </label>
              <input
                type="text"
                name="aadharNumber"
                value={formData.aadharNumber}
                onChange={handleChange}
                className="p-2 border rounded-md w-[20rem] mx-[40px]"
              />
              <div className=" flex items-center gap-[30px]">
                {!aadharPreviewURL && (
                  <div className="bg-gray-400 h-20 w-20 rounded-md" />
                )}
                {aadharPreviewURL && (
                  <figure className="w-[100px] h-[100px] rounded relative">
                    <img
                      src={aadharPreviewURL}
                      alt="profile"
                      className="w-full rounded h-full object-cover "
                    />
                  </figure>
                )}
                <input
                  type="file"
                  name="AadharImage"
                  id="AadharImage"
                  className="hidden"
                  onChange={handleAadharImageChange}
                />

                <label htmlFor="AadharImage" className="cursor-pointer ">
                  <MdCameraAlt
                    className=" bg-teal-500 text-[40px] text-white p-2 h-[40px] w-[40px] rounded"
                    size={30}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-gray-700 font-bold mb-2">Configuration</h3>

            <div className="mb-4 flex">
              <label className="block mt-3 text-gray-700">
                Business category
              </label>
              <select
                name="businessCategoryId"
                value={formData.businessCategoryId}
                onChange={handleChange}
                className="mt-2 p-2 ml-[11.5rem] w-[20rem] border rounded-md"
              >
                <option value="Hotel">Hotel</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Bakery">Bakery</option>
              </select>
            </div>

            <div className="mb-4 flex">
              <label className="block text-gray-700">If restaurant, then</label>
              <div className="flex items-center gap-[4rem]">
                <label className="mr-4 ml-[12.5rem] text-teal-700  ">
                  <input
                    type="radio"
                    name="type"
                    value="veg"
                    checked={formData.type === "veg"}
                    onChange={handleChange}
                    className="mr-2 form-radio text-teal-600 focus:ring-teal-500"
                  />{" "}
                  Veg
                </label>
                <label className="mr-4">
                  <input
                    type="radio"
                    name="type"
                    value="non-veg"
                    checked={formData.type === "non-veg"}
                    onChange={handleChange}
                    className="mr-2 form-radio text-teal-600 focus:ring-teal-500"
                  />{" "}
                  Non-Veg
                </label>
                <label className="mr-4">
                  <input
                    type="radio"
                    name="type"
                    value="both"
                    checked={formData.type === "both"}
                    onChange={handleChange}
                    className="mr-2 form-radio text-teal-600 focus:ring-teal-500"
                  />{" "}
                  Both
                </label>
              </div>
            </div>

            <div className="mb-4 flex">
              <label className="block text-gray-700">
                Select Delivery Option
              </label>
              <div className="flex items-center gap-[2rem] ml-[10.4rem]">
                <label className="mr-4">
                  <input
                    type="radio"
                    name="deliveryOption"
                    value="onDemand"
                    checked={formData.deliveryOption === "onDemand"}
                    onChange={handleChange}
                    className="mr-2 form-radio text-teal-600 focus:ring-teal-500"
                  />{" "}
                  On-demand
                </label>
                <label className="mr-4">
                  <input
                    type="radio"
                    name="deliveryOption"
                    value="scheduled"
                    checked={formData.deliveryOption === "scheduled"}
                    onChange={handleChange}
                    className="mr-2 form-radio text-teal-600 focus:ring-teal-500"
                  />{" "}
                  Scheduled
                </label>
                <label className="mr-4">
                  <input
                    type="radio"
                    name="deliveryOption"
                    value="both"
                    checked={formData.deliveryOption === "both"}
                    onChange={handleChange}
                    className="mr-2 form-radio text-teal-600 focus:ring-teal-500"
                  />{" "}
                  Both
                </label>
              </div>
            </div>

            <div className="mb-4 flex">
              <label className="block mt-3 text-gray-700">
                Select Delivery time
              </label>
              <input
                type="text"
                name="deliveryTime"
                value={formData.deliveryTime}
                onChange={handleChange}
                className="mt-2 ml-[11.5rem] p-2 w-[20rem] border rounded-md"
                placeholder="Time (in minutes)"
              />
            </div>
            <div className="w-[650px]">
              <p className="text-gray-500 ml-[20.5rem] right-0 text-sm mt-2">
                Note: Enter here the default time taken for the Delivery of an
                order. If a merchant is handling their delivery by itself then
                he will enter his/her own delivery time.
              </p>
            </div>
            <div className="mb-10 mt-6 flex">
              <label className="block mt-3 text-gray-700">
                Pre Order Sales Status
              </label>

              <Switch className="mt-5 ml-[11.5rem]" />
            </div>
          </div>

          <div className="mb-6 flex">
            <h3 className="text-black mb-2 flex">Serving Area</h3>
            <div className="mb-4 ">
              <div className="grid ml-[15rem] gap-3">
                <label className="mr-4 text-gray-700 text-[14px]">
                  <input
                    type="radio"
                    name="servingArea"
                    value="noRestrictions"
                    checked={formData.servingArea === "noRestrictions"}
                    onChange={handleChange}
                    className="mr-2 form-radio text-teal-600 focus:ring-teal-500"
                  />{" "}
                  No Serving restrictions (I serve everywhere)
                </label>
                <label className="mr-6 text-gray-700 w-[20rem] text-[14px] flex-col space-x-3">
                  <input
                    type="radio"
                    name="servingArea"
                    value="radius"
                    checked={formData.servingArea === "radius"}
                    onChange={handleChange}
                    className="mr-2 form-radio text-teal-600 focus:ring-teal-500"
                  />{" "}
                  Mention a radius around the central location of my merchant.
                  Your store will serve within a this radius around your central
                  location. Note: Serving radius 0 means that the Restaurant can
                  serve anywhere.
                </label>
              </div>
              {formData.servingArea === "radius" && (
                <input
                  type="text"
                  name="servingRadius"
                  value={formData.servingRadius}
                  onChange={handleChange}
                  className="mt-6 ml-[15rem] p-2 w-[20rem] border rounded-md"
                  placeholder="Serving Radius (in km)"
                />
              )}
            </div>
          </div>

          <div className="mb-6 flex">
            <div className="flex">
              <h3 className="text-gray-700 mb-2 mt-3 ">Sponsorship Status</h3>
              <div className="mb-4 w-[20rem] p-5 justify-center ml-[12rem] shadow-lg">
                <label className="block text-gray-700">
                  Current Chosen Plan
                </label>
                <p className="text-gray-500">{formData.sponsorshipDetail}</p>
              </div>
            </div>
          </div>

          <div className="mb-6 flex">
            <h3 className="text-black mb-2 flex">Choose or Renew Plan</h3>

            <div className="grid ml-[11rem] gap-3">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "monthly", label: "Monthly", price: "₹250" },
                  { value: "3months", label: "3 months", price: "₹750" },
                  { value: "6months", label: "6 months", price: "₹1500" },
                  { value: "yearly", label: "1 year", price: "₹3000" },
                ].map((plan, index) => (
                  <label
                    key={index}
                    className="flex items-center border p-3 gap-1 rounded-lg"
                  >
                    <input
                      type="radio"
                      name="sponsorshipdetail"
                      value={plan.value}
                      checked={formData.sponsorshipDetail === plan.value}
                      onChange={handleChange}
                      className="mr-2 justify-between"
                    />{" "}
                    {plan.label}({plan.price})
                  </label>
                ))}
              </div>

              <button
                type="button"
                className="bg-teal-700 text-white p-2 rounded-md w-[20rem] mt-4"
              >
                Pay
              </button>
              <p className="w-[25rem] text-[14px] text-gray-700">
                Note :Choose the date range for showing your shop on top of the
                sheet and reach your customers more easily.
              </p>
            </div>
            <p className="right-5 ml-[6rem]">
              <Switch />
            </p>
          </div>

          <div className="mb-6 flex mt-10">
            <h3 className="text-gray-700 font-bold mb-2">
              Time wise availability
            </h3>
            <div className="mb-4">
              <div className="flex items-center justify-center ml-[11rem] gap-16">
                <label className="mr-4">
                  <input
                    type="radio"
                    name="availability"
                    value="full"
                    checked={formData.availability === "full"}
                    onChange={handleChange}
                  />{" "}
                  Full time
                </label>
                <label className="mr-4">
                  <input
                    type="radio"
                    name="availability"
                    value="specific"
                    checked={formData.availability === "specific"}
                    onChange={handleChange}
                  />{" "}
                  Specific time
                </label>
              </div>
            </div>
          </div>

          {formData.availability === "specific" && (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4">Week day</th>
                    <th className="py-2 px-4">Open all day</th>
                    <th className="py-2 px-4">Close all day</th>
                    <th className="py-2 px-4">Specific Time</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(formData.type).map((day, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 capitalize">{day}</td>
                      <td className="py-2 px-4 text-center">
                        <input
                          type="radio"
                          name={`${day}.open`}
                          value={true}
                          checked={formData.weekdays[day].open}
                          onChange={handleChangeRadio}
                          className="mr-2"
                        />
                      </td>
                      <td className="py-2 px-4 text-center">
                        <input
                          type="radio"
                          name={`${day}.closed`}
                          value={true}
                          checked={formData.weekdays[day].closed}
                          onChange={handleChangeRadio}
                          className="mr-2"
                        />
                      </td>
                      <td className="py-2 px-4 text-center">
                        <input
                          type="radio"
                          name={`${day}.specific`}
                          value={true}
                          checked={formData.weekdays[day].specific}
                          onChange={handleChangeRadio}
                          className="mr-2"
                        />
                      </td>

                      {formData.weekdays[day].specific && (
                        <div className="flex justify-start mt-2">
                          <td>
                            <input
                              type="text"
                              name={`${day}.startTime`}
                              value={formData.weekdays[day].startTime}
                              onChange={handleChangeRadio}
                              className="py-2 border rounded-md text-center mr-2"
                              placeholder="Start Time (HH:MM)"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name={`${day}.endTime`}
                              value={formData.weekdays[day].endTime}
                              onChange={handleChangeRadio}
                              className="py-2 border text-center rounded-md"
                              placeholder="End Time (HH:MM)"
                            />
                          </td>
                        </div>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* <div>
            <table className="border-2 border-gray-500 w-full">
              <thead>
                <tr>
                  {[
                    "Week days",
                    "Open All days",
                    "Close All days",
                    "Specific time"
                  ].map((header) => (
                    <th
                      key={header}
                      className=" text-center h-[70px]"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <td>{Object.keys(formData.weekdays).map((day, index) => (

                <th
                  key={index}>
                  {day}
                </th>

              ))}
              </td>
            </table>
          </div> */}

          <div className="flex justify-end items-center gap-3 mt-8">
            <button type="button" className="bg-gray-300  px-6 p-1 rounded-md">
              Cancel
            </button>
            <button
              type="submit"
              className="bg-teal-700 text-white px-6 p-1 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default MerchantDetails;
