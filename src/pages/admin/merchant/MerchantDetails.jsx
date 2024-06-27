import React, { useState } from "react";
import BlockIcon from "@mui/icons-material/Block";
import { MdOutlineModeEditOutline, MdCameraAlt } from "react-icons/md";
import Modal from "../../../components/Modal";
import Sidebar from "../../../components/Sidebar";
import { Link } from "react-router-dom";
import GlobalSearch from "../../../components/GlobalSearch";
import AddMerchant from "../../../components/model/AddMerchant";
import EditMerchant from "../../../components/model/EditMerchant";

const MerchantDetails = () => {
  const [formData, setFormData] = useState({
    shortDescription: "",
    geoFence: "",
    pricing: "",
    location: "",
    panCard: "",
    gstin: "",
    fssai: "",
    adhaar: "",
    businessCategory: "",
    isVeg: "both",
    deliveryOption: "both",
    deliveryTime: "",
    preOrderSalesStatus: false,
    servingArea: "radius",
    servingRadius: "",
    chosenPlan: "Monthly plan | 07 June 2024 - 07 July 2024",
    plan: "monthly",
    sponsorshipStatus: true,
    timeAvailability: "specific",
    weekdays: {
      sunday: {
        open: false,
        closed: false,
        specific: false,
        startTime: "",
        endTime: "",
      },
      monday: {
        open: false,
        closed: false,
        specific: false,
        startTime: "",
        endTime: "",
      },
      tuesday: {
        open: false,
        closed: false,
        specific: false,
        startTime: "",
        endTime: "",
      },
      wednesday: {
        open: false,
        closed: false,
        specific: false,
        startTime: "",
        endTime: "",
      },
      thursday: {
        open: false,
        closed: false,
        specific: false,
        startTime: "",
        endTime: "",
      },
      friday: {
        open: false,
        closed: false,
        specific: false,
        startTime: "",
        endTime: "",
      },
      saturday: {
        open: false,
        closed: false,
        specific: false,
        startTime: "",
        endTime: "",
      },
    },
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const handleAvatarChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreviewURL(URL.createObjectURL(file));
    console.log(previewURL);
  };

  const [editData, setEditData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
  });

  const handleInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const signupAction = async (e) => {
    e.preventDefault();
    console.log(editData);
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

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
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

        <div className="flex justify-between my-[15px]">
          <h3 className="font-[600] text-[18px]">Merchantname</h3>

          <Link className="bg-yellow-200 p-1 rounded">
            <BlockIcon className="w-2 h-2 text-red-600" /> Block
          </Link>
        </div>

        <form
          className="bg-white shadow-md rounded-lg p-5 w-full overflow-auto"
          onSubmit={""}
        >
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-2">
            <div className="flex flex-col ">
              <div className="mb-4 flex items-center justify-between">
                <label className="text-red-500 font-[600]">ID</label>
                <input
                  type="text"
                  className=" outline-none focus:outline-none p-[10px] bg-transparent rounded text-red-600 placeholder:text-red-600"
                  placeholder="Merchant name"
                  disabled
                  value={""}
                />
              </div>

              <div className="mb-4 flex items-center justify-between">
                <label className="block text-gray-700">Merchant name*</label>
                <input
                  type="text"
                  className=" outline-none focus:outline-none border border-[#333]/10 p-[10px] rounded"
                  placeholder="Merchant name"
                  value={""}
                />
              </div>

              <div className="mb-4 flex items-center justify-between">
                <label className="block text-gray-700">Display address*</label>
                <input
                  type="text"
                  className=" outline-none focus:outline-none border border-[#333]/10 p-[10px] rounded"
                  placeholder="Merchant name"
                  value={""}
                />
              </div>

              <div className="mb-4 flex items-center justify-between">
                <label className="block text-gray-700">Name of owner*</label>
                <input
                  type="text"
                  className=" outline-none focus:outline-none border border-[#333]/10 p-[10px] rounded"
                  placeholder="Merchant name"
                  value={""}
                />
              </div>
            </div>

            <div className="flex flex-col ">
              <div className=" flex items-center justify-between mb-4">
                <label className="">Email</label>
                <input
                  type="text"
                  className=" outline-none focus:outline-none border border-[#333]/10 p-[10px] rounded"
                  placeholder="Merchant name"
                  value={""}
                />
              </div>

              <div className="mb-4 flex items-center justify-between">
                <label className="block text-gray-700">Phone</label>
                <input
                  type="tel"
                  className=" outline-none focus:outline-none border border-[#333]/10 p-[10px] rounded"
                  placeholder="Merchant name"
                  value={""}
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
              {!previewURL && (
                <figure className="w-[100px] h-[100px] rounded relative">
                  <img
                    src={""}
                    alt="profile"
                    className="w-full h-full rounded object-cover "
                  />
                </figure>
              )}

              {previewURL && (
                <figure className="w-[100px] h-[100px] rounded relative">
                  <img
                    src={previewURL}
                    alt="profile"
                    className="w-full rounded h-full object-cover "
                  />
                </figure>
              )}

              <input
                type="file"
                name="avatar"
                id="avatar"
                className="hidden"
                onChange={handleAvatarChange}
              />

              <label htmlFor="avatar" className="cursor-pointer">
                <MdCameraAlt
                  className=" bg-teal-500 text-[40px] text-white p-2"
                  size={30}
                />
              </label>
            </div>

            <button
              onClick={""}
              className="bg-teal-600 w-fit h-fit py-2 px-1.5 rounded text-white flex items-center gap-[10px]"
            >
              {" "}
              <MdOutlineModeEditOutline className="" />
              Edit Merchant
            </button>
            <Modal isOpen={isOpen} toggleOpen={toggleOpen}>
              <EditMerchant />
            </Modal>
          </div>

          <div className=" max-w-[500px] mb-[50px]">
            <div className="mb-[20px] flex items-center justify-between gap-[30px]">
              <label className=" text-gray-700 text-[16px]">
                Short Description <br /> (Max 10 characters)
              </label>
              <input
                type="text"
                name="description"
                placeholder="Description"
                className="w-[20rem] border rounded-md p-2"
              />
            </div>

            <div className="mb-[20px] flex items-center justify-between gap-[30px]">
              <label className="text-gray-700 text-[16px]">Geo fence</label>
              <select
                name="geoFence"
                value={formData.geoFence}
                // onChange={handleChange}
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
                // onChange={handleChange}
                className=" p-2  w-[20rem] border rounded-md"
              />
            </div>

            <div className="mb-[20px] flex items-center justify-between gap-[30px]">
              <label className="text-gray-700 ">Ratings</label>
              <button
                type="button"
                className="bg-teal-700 text-white p-2 rounded-md w-[20rem]"
              >
                Show ratings and reviews
              </button>
            </div>
          </div>

          <div className="mb-[50px] w-full">
            <h3 className="text-gray-700 font-bold mb-2">Documents provided</h3>

            <div className="flex justify-between items-center my-[20px] max-w-[700px]">
              <label className=" text-gray-700 text-[16px]">Pan card</label>
              <input
                type="text"
                name="panCard"
                value={formData.panCard}
                className="p-2 border rounded-md w-[20rem] mx-[40px]"
              />
              <div className=" flex items-center gap-[30px]">
                <figure className="h-[60px] w-[60px]">
                  <img
                    id="preview_img"
                    className="h-full w-full object-cover rounded-lg bg-gray-100"
                    src="https://lh3.googleusercontent.com/a-/AFdZucpC_6WFBIfaAbPHBwGM9z8SxyM1oV4wB4Ngwp_UyQ=s96-c"
                    alt="Current profile photo"
                  />
                </figure>
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  className="hidden"
                  onChange={handleAvatarChange}
                />

                <label htmlFor="avatar" className="cursor-pointer ">
                  <MdCameraAlt
                    className=" bg-teal-500 text-[40px] text-white p-2 h-[40px] w-[40px] rounded"
                    size={30}
                  />
                </label>
              </div>
            </div>

            <div className="flex justify-between items-center my-[20px] max-w-[700px]">
              <label className=" text-gray-700 text-[16px]">Pan card</label>
              <input
                type="text"
                name="panCard"
                value={formData.panCard}
                className="p-2 border rounded-md w-[20rem] mx-[40px]"
              />
              <div className=" flex items-center gap-[30px]">
                <figure className="h-[60px] w-[60px]">
                  <img
                    id="preview_img"
                    className="h-full w-full object-cover rounded-lg bg-gray-100"
                    src="https://lh3.googleusercontent.com/a-/AFdZucpC_6WFBIfaAbPHBwGM9z8SxyM1oV4wB4Ngwp_UyQ=s96-c"
                    alt="Current profile photo"
                  />
                </figure>
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  className="hidden"
                  onChange={handleAvatarChange}
                />

                <label htmlFor="avatar" className="cursor-pointer ">
                  <MdCameraAlt
                    className=" bg-teal-500 text-[40px] text-white p-2 h-[40px] w-[40px] rounded"
                    size={30}
                  />
                </label>
              </div>
            </div>

            <div className="flex justify-between items-center my-[20px] max-w-[700px]">
              <label className=" text-gray-700 text-[16px]">Pan card</label>
              <input
                type="text"
                name="panCard"
                value={formData.panCard}
                className="p-2 border rounded-md w-[20rem] mx-[40px]"
              />
              <div className=" flex items-center gap-[30px]">
                <figure className="h-[60px] w-[60px]">
                  <img
                    id="preview_img"
                    className="h-full w-full object-cover rounded-lg bg-gray-100"
                    src="https://lh3.googleusercontent.com/a-/AFdZucpC_6WFBIfaAbPHBwGM9z8SxyM1oV4wB4Ngwp_UyQ=s96-c"
                    alt="Current profile photo"
                  />
                </figure>
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  className="hidden"
                  onChange={handleAvatarChange}
                />

                <label htmlFor="avatar" className="cursor-pointer ">
                  <MdCameraAlt
                    className=" bg-teal-500 text-[40px] text-white p-2 h-[40px] w-[40px] rounded"
                    size={30}
                  />
                </label>
              </div>
            </div>

            <div className="flex justify-between items-center my-[20px] max-w-[700px]">
              <label className=" text-gray-700 text-[16px]">Pan card</label>
              <input
                type="text"
                name="panCard"
                value={formData.panCard}
                className="p-2 border rounded-md w-[20rem] mx-[40px]"
              />
              <div className=" flex items-center gap-[30px]">
                <figure className="h-[60px] w-[60px]">
                  <img
                    id="preview_img"
                    className="h-full w-full object-cover rounded-lg bg-gray-100"
                    src="https://lh3.googleusercontent.com/a-/AFdZucpC_6WFBIfaAbPHBwGM9z8SxyM1oV4wB4Ngwp_UyQ=s96-c"
                    alt="Current profile photo"
                  />
                </figure>
                <input
                  type="file"
                  name="avatar"
                  id="avatar"
                  className="hidden"
                  onChange={handleAvatarChange}
                />

                <label htmlFor="avatar" className="cursor-pointer ">
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
                name="businessCategory"
                value={formData.businessCategory}
                // onChange={handleChange}
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
                    name="isVeg"
                    value="veg"
                    checked={formData.isVeg === "veg"}
                    // onChange={handleChange}
                    className="mr-2 form-radio text-teal-600 focus:ring-teal-500"
                  />{" "}
                  Veg
                </label>
                <label className="mr-4">
                  <input
                    type="radio"
                    name="isVeg"
                    value="nonVeg"
                    checked={formData.isVeg === "nonVeg"}
                    // onChange={handleChange}
                    className="mr-2 form-radio text-teal-600 focus:ring-teal-500"
                  />{" "}
                  Non-Veg
                </label>
                <label className="mr-4">
                  <input
                    type="radio"
                    name="isVeg"
                    value="both"
                    checked={formData.isVeg === "both"}
                    // onChange={handleChange}
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
                    // onChange={handleChange}
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
                    // onChange={handleChange}
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
                    // onChange={handleChange}
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
                // onChange={handleChange}
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
                    // onChange={handleChange}
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
                    // onChange={handleChange}
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
                  // onChange={handleChange}
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
                <p className="text-gray-500">{formData.chosenPlan}</p>
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
                      name="plan"
                      value={plan.value}
                      checked={formData.plan === plan.value}
                      // onChange={handleChange}
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
                    name="timeAvailability"
                    value="full"
                    checked={formData.timeAvailability === "full"}
                    // onChange={handleChange}
                  />{" "}
                  Full time
                </label>
                <label className="mr-4">
                  <input
                    type="radio"
                    name="timeAvailability"
                    value="specific"
                    checked={formData.timeAvailability === "specific"}
                    // onChange={handleChange}
                  />{" "}
                  Specific time
                </label>
              </div>
            </div>
          </div>

          {formData.timeAvailability === "specific" && (
            <div className="grid grid-cols-1 gap-4 text-black">
              <div className="flex justify-between w-3/6 text-[16px] font-semibold">
                <ul>Week day</ul>
                <ul>Open all day</ul>
                <ul>Close all day</ul>
                <ul>Specific Time</ul>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {Object.keys(formData.weekdays).map((day, index) => (
                  <div key={index} className="flex items-center">
                    <label className="w-1/4 capitalize">{day}</label>
                    <div className="flex items-center gap-16 justify-start -ml-12">
                      <label className="mr-4">
                        <input
                          type="radio"
                          name={`${day}.open`}
                          value={true}
                          checked={formData.weekdays[day].open}
                          // onChange={handleChangeRadio}
                          className="mr-2"
                        />
                      </label>
                      <label className="mr-4">
                        <input
                          type="radio"
                          name={`${day}.closed`}
                          value={true}
                          checked={formData.weekdays[day].closed}
                          // onChange={handleChangeRadio}
                          className="mr-2"
                        />
                      </label>
                      <label className="mr-4">
                        <input
                          type="radio"
                          name={`${day}.specific`}
                          value={true}
                          checked={formData.weekdays[day].specific}
                          // onChange={handleChangeRadio}
                          className="mr-2"
                        />
                      </label>
                      {formData.weekdays[day].specific && (
                        <div className="flex ml-2 justify-start">
                          <input
                            type="text"
                            name={`${day}.startTime`}
                            value={formData.weekdays[day].startTime}
                            // onChange={handleChangeRadio}
                            className="py-2 border rounded-md text-center"
                            placeholder="Start Time (HH:MM)"
                          />
                          <input
                            type="text"
                            name={`${day}.endTime`}
                            value={formData.weekdays[day].endTime}
                            // onChange={handleChangeRadio}
                            className="py-2 border text-center rounded-md"
                            placeholder="End Time (HH:MM)"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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

{
  /*  */
}
