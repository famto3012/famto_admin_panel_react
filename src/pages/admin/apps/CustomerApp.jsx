import React from "react";
import Sidebar from "../../../components/Sidebar";
import GlobalSearch from "../../../components/GlobalSearch";
import { MdCameraAlt } from "react-icons/md";
import { useState } from "react";
import { Switch, Card, Modal } from "antd";
import {
  GoogleOutlined,
  AppleFilled,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  FacebookFilled,
} from "@ant-design/icons";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { RiDeleteBinLine } from "react-icons/ri";

const CustomerApp = () => {
  const [formData, setFormData] = useState({
    imageUrl: "",
    phoneno: false,
    email: false,
    emailverify: false,
    otpverify: false,
    otp: false,
    google: false,
    ios: false,
    facebook: false,
  });

  const [service, setService] = useState({
    title: "",
    geofence: "",
    imageURL: "",
  });

  const [banner, setBanner] = useState({
    title: "",
    description: "",
    imageURL: "",
  });

  const [business, setBusiness] = useState({
    title: "Food",
    geofence: "",
    imageURL: "",
  });

  const [pickDrop, setPickDrop] = useState({
    title: "",
    description: "",
    imageURL: "",
  });

  const handleServiceChange = (e) => {
    setService({ ...service, [e.target.name]: e.target.value });
  };

  const handleService = (e) => {
    e.preventDefault();

    console.log("Service : ", service);
  };

  const handleBannerChange = (e) => {
    setBanner({ ...banner, [e.target.name]: e.target.value });
  };

  const handleBanner = (e) => {
    e.preventDefault();

    console.log("Banner", banner);
  };

  const handlePickDropChange = (e) => {
    setPickDrop({ ...pickDrop, [e.target.name]: e.target.value });
  };

  const handlePickDrop = (e) => {
    e.preventDefault();

    console.log("Pick & Drop", pickDrop);
  };

  const handleBusinessChange = (e) => {
    setBusiness({ ...business, [e.target.name]: e.target.value });
  };

  const handleBusiness = (e) => {
    e.preventDefault();

    console.log("Business", business);
  };

  const submitAction = (e) => {
    e.preventDefault();
    console.log("Form Data", formData);
  };

  const onChange = (name, checked) => {
    setFormData({ ...formData, [name]: checked });
  };

  const [notificationFile, setNotificationFile] = useState(null);
  const [notificationPreviewURL, setNotificationPreviewURL] = useState(null);

  const handleNotificationImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setNotificationFile(file);
    setNotificationPreviewURL(URL.createObjectURL(file));
  };

  const [bannerFile, setBannerFile] = useState(null);
  const [bannerPreviewURL, setBannerPreviewURL] = useState(null);

  const handleBannerImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setBannerFile(file);
    setBannerPreviewURL(URL.createObjectURL(file));
  };

  const [serviceFile, setServiceFile] = useState(null);
  const [servicePreviewURL, setServicePreviewURL] = useState(null);

  const handleServiceImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setServiceFile(file);
    setServicePreviewURL(URL.createObjectURL(file));
  };

  const [businessFile, setBusinessFile] = useState(null);
  const [businessPreviewURL, setBusinessPreviewURL] = useState(null);

  const handleBusinessImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setBusinessFile(file);
    setBusinessPreviewURL(URL.createObjectURL(file));
  };

  const [businessEditFile, setBusinessEditFile] = useState(null);
  const [businessEditPreviewURL, setBusinessEditPreviewURL] = useState(null);

  const handleBusinessEditImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setBusinessEditFile(file);
    setBusinessEditPreviewURL(URL.createObjectURL(file));
  };

  const [pickDropFile, setPickDropFile] = useState(null);
  const [pickDropPreviewURL, setPickDropPreviewURL] = useState(null);

  const handlePickDropImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setPickDropFile(file);
    setPickDropPreviewURL(URL.createObjectURL(file));
  };

  const [isModalVisibleBanner, setIsModalVisibleBanner] = useState(false);

  const showModalBanner = () => {
    setIsModalVisibleBanner(true);
  };

  const handleOkBanner = () => {
    setIsModalVisibleBanner(false);
  };

  const handleCancelBanner = () => {
    setIsModalVisibleBanner(false);
  };

  const [isModalVisibleBannerEdit, setIsModalVisibleBannerEdit] =
    useState(false);

  const showModalBannerEdit = () => {
    setIsModalVisibleBannerEdit(true);
  };

  const handleOkBannerEdit = () => {
    setIsModalVisibleBannerEdit(false);
  };

  const handleCancelBannerEdit = () => {
    setIsModalVisibleBannerEdit(false);
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

  const [isModalVisiblePickDrop, setIsModalVisiblePickDrop] = useState(false);

  const showModalPickDrop = () => {
    setIsModalVisiblePickDrop(true);
  };

  const handleOkPickDrop = () => {
    setIsModalVisiblePickDrop(false);
  };

  const handleCancelPickDrop = () => {
    setIsModalVisiblePickDrop(false);
  };

  const [isModalVisiblePickDropEdit, setIsModalVisiblePickDropEdit] =
    useState(false);

  const showModalPickDropEdit = () => {
    setIsModalVisiblePickDropEdit(true);
  };

  const handleOkPickDropEdit = () => {
    setIsModalVisiblePickDropEdit(false);
  };

  const handleCancelPickDropEdit = () => {
    setIsModalVisiblePickDropEdit(false);
  };

  const [isModalVisibleBusiness, setIsModalVisibleBusiness] = useState(false);

  const showModalBusiness = () => {
    setIsModalVisibleBusiness(true);
  };

  const handleOkBusiness = () => {
    setIsModalVisibleBusiness(false);
  };

  const handleCancelBusiness = () => {
    setIsModalVisibleBusiness(false);
  };

  const [isModalVisibleBuinessEdit, setIsModalVisibleBusinessEdit] =
    useState(false);

  const showModalBusinessEdit = () => {
    setIsModalVisibleBusinessEdit(true);
  };

  const handleOkBusinessEdit = () => {
    setIsModalVisibleBusinessEdit(false);
  };

  const handleCancelBusinessEdit = () => {
    setIsModalVisibleBusinessEdit(false);
  };

  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  const showModalDelete = () => {
    setIsShowModalDelete(true);
  };

  const showModalDeleteOk = () => {
    setIsShowModalDelete(false);
  };

  const showModalDeleteCancel = () => {
    setIsShowModalDelete(false);
  };

  const [isShowModalDeleteCustomer, setIsShowModalDeleteCustomer] =
    useState(false);

  const ShowModalDeleteCustomer = () => {
    setIsShowModalDeleteCustomer(true);
  };

  const showModalDeleteOkCustomer = () => {
    setIsShowModalDeleteCustomer(false);
  };

  const showModalDeleteCancelCustomer = () => {
    setIsShowModalDeleteCustomer(false);
  };

  const [isShowModalDeletePick, setIsShowModalDeletePick] = useState(false);

  const showModalDeletePick = () => {
    setIsShowModalDeletePick(true);
  };

  const showModalDeleteOkPick = () => {
    setIsShowModalDeletePick(false);
  };

  const showModalDeleteCancelPick = () => {
    setIsShowModalDeletePick(false);
  };

  return (
    <>
      <Sidebar />
      <div className="pl-[300px] max-w-fit bg-gray-100">
        <nav className="p-5">
          <GlobalSearch />
        </nav>
        <h1 className="mx-5 font-bold text-[20px]">Customer App </h1>
        <div className="flex gap-10 mt-10 mx-5  border-b-2 border-gray-200 pb-5">
          <div className="w-72">Splash Screen (390px x 844px)</div>
          <div className="text-gray-500">
            Note: The purpose is to wish or design the splash page. The format
            can image or gif Note: Design according to aspect ratio
          </div>
          <div className="flex w-44">
            {!notificationPreviewURL && (
              <div className="bg-gray-400 h-16 w-16 rounded-md" />
            )}
            {notificationPreviewURL && (
              <figure className=" h-16 w-16 rounded-md relative">
                <img
                  src={notificationPreviewURL}
                  alt="profile"
                  className="w-full rounded h-full object-cover "
                />
              </figure>
            )}
            <input
              type="file"
              name="notificationImage"
              id="notificationImage"
              className="hidden"
              onChange={handleNotificationImageChange}
            />

            <label htmlFor="notificationImage" className="cursor-pointer ">
              <MdCameraAlt
                className=" bg-teal-800 text-[40px] ml-5 text-white p-6 h-16 w-16 rounded"
                size={30}
              />
            </label>
          </div>
        </div>
        <div className="flex mx-5 mt-10 gap-10  border-b-2 border-gray-200 pb-5">
          <div className="w-[42rem]">Sign up and Sign in Settings</div>
          <div className="text-gray-500">
            Control sign-up of Customer on your platform. Here you are given
            with a variety of options such as whether to have email or phone
            number as mandatory fields on the sign-up form, how do you want to
            verify the Customer: via Email verification or OTP verification and
            which social platform you want to enable through which Customer can
            sign up on your platform.
            <div className="flex gap-16 mt-5">
              <div className="bg-white p-7 grid rounded-lg mt-20">
                <label className="font-semibold">
                  Required fileds on signup
                </label>
                <div>
                  {" "}
                  Phone No.
                  <Switch
                    className="ml-6"
                    onChange={(checked) => onChange("phoneno", checked)}
                    name="phoneno"
                  />
                </div>
                <div>
                  Email{" "}
                  <Switch
                    className="ml-14"
                    onChange={(checked) => onChange("email", checked)}
                    name="email"
                  />
                </div>
              </div>
              <div className="bg-white p-5 grid rounded-lg mt-20">
                <label className="font-semibold">Signup Verification</label>
                <div>
                  Email verification
                  <Switch
                    className="ml-5"
                    onChange={(checked) => onChange("emailverify", checked)}
                    name="emailverify"
                  />
                </div>
                <div>
                  OTP verification{" "}
                  <Switch
                    className="ml-6"
                    onChange={(checked) => onChange("otpverify", checked)}
                    name="otpverify"
                  />
                </div>
              </div>
              <div className="bg-white p-5 gap-5 grid rounded-lg">
                <label className="font-semibold">Login via</label>
                <div>
                  OTP
                  <Switch
                    className="ml-32"
                    onChange={(checked) => onChange("otp", checked)}
                    name="otp"
                  />
                </div>
                <div>
                  <GoogleOutlined className="text-[30px]" />
                  <Switch
                    className="ml-[125px]"
                    onChange={(checked) => onChange("google", checked)}
                    name="google"
                  />
                </div>
                <div>
                  <AppleFilled className="text-[30px]" />
                  <Switch
                    className="ml-[125px]"
                    onChange={(checked) => onChange("ios", checked)}
                    name="ios"
                  />
                </div>
                <div>
                  <FacebookFilled className="text-[30px]" />
                  <Switch
                    className="ml-[125px]"
                    onChange={(checked) => onChange("facebook", checked)}
                    name="facebook"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-b-2 border-gray-200 pb-5">
          <div className="flex justify-between mx-5 mt-10">
            <h1>Services</h1>
            <p className="text-gray-500">
              This enables to add, edit, change thumbnail of the listed services
            </p>
            <button
              onClick={showModal}
              className="bg-teal-800 text-white px-5 rounded-lg p-2"
            >
              <PlusOutlined /> Add Services
            </button>
            <Modal
              title="Add Service icon"
              open={isModalVisible}
              className="mt-24"
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null} // Custom footer to include form buttons
            >
              <form onSubmit={handleService}>
                <div className="flex mt-5 gap-4">
                  <label className="w-1/2 text-gray-500">Service title</label>
                  <input
                    type="text"
                    className="border-2 border-gray-300 rounded p-2 focus:outline-none w-2/3"
                    name="title"
                    value={service.title}
                    onChange={handleServiceChange}
                  />
                </div>
                <div className="flex mt-5  gap-4">
                  <label className="w-1/2 text-gray-500">Geofence</label>
                  <select
                    name="geofence"
                    value={service.geofence}
                    onChange={handleServiceChange}
                    className="border-2 border-gray-300 rounded p-2 focus:outline-none w-2/3"
                  >
                    <option value="select" hidden selected>
                      Geofence
                    </option>
                    <option value="Option 1">Option 1</option>
                  </select>
                </div>
                <div className="flex">
                  <label className="mt-5">Image (342px x 160px)</label>
                  <div className=" flex items-center gap-[30px]">
                    {!servicePreviewURL && (
                      <div className="bg-gray-400 ml-20 mt-5 h-16 w-16 rounded-md" />
                    )}
                    {servicePreviewURL && (
                      <figure className="ml-20 mt-5 h-16 w-16 rounded-md relative">
                        <img
                          src={servicePreviewURL}
                          alt="profile"
                          className="w-full rounded h-full object-cover "
                        />
                      </figure>
                    )}
                    <input
                      type="file"
                      name="serviceImage"
                      id="serviceImage"
                      className="hidden"
                      onChange={handleServiceImageChange}
                    />
                    <label htmlFor="serviceImage" className="cursor-pointer ">
                      <MdCameraAlt
                        className=" bg-teal-800  text-[40px] text-white p-6 h-16 w-16 mt-5 rounded"
                        size={30}
                      />
                    </label>
                  </div>
                </div>
                <div className="flex justify-end mt-10  gap-4">
                  <button
                    className="bg-gray-300 rounded-lg px-6 py-2 font-semibold justify-end"
                    onClick={handleCancel}
                    type="submit"
                  >
                    {" "}
                    Cancel
                  </button>
                  <button
                    className="bg-teal-800 rounded-lg px-6 py-2 text-white font-semibold justify-end"
                    onClick={handleOk}
                    type="submit"
                  >
                    Add
                  </button>
                </div>
              </form>
            </Modal>
          </div>
          <div className="grid justify-center mt-5">
            <div className="w-96 h-48">
              <div className=" bg-gray-300 rounded-lg">
                <div className="flex relative ">
                  <DragIndicatorIcon className="mt-14 text-3xl ml-3" />
                  <img
                    className="ml-3 rounded"
                    src="Delivery-card.svg"
                    alt=""
                  />
                  <p className="text-white absolute bottom-1 right-1">
                    Delivery
                  </p>
                </div>
              </div>
            </div>
            <div className="w-96 h-48">
              <div className=" bg-gray-300 rounded-lg">
                <div className="flex relative ">
                  <DragIndicatorIcon className="mt-14 text-3xl ml-3" />
                  <img className="ml-3 rounded" src="Taxi-card.svg" alt="" />
                  <p className="text-white absolute bottom-1 right-1">Taxi</p>
                </div>
              </div>
            </div>
            <div className="w-96 h-48">
              <div className=" bg-gray-300 rounded-lg">
                <div className="flex relative ">
                  <DragIndicatorIcon className="mt-14 text-3xl ml-3" />
                  <img
                    className="ml-3 rounded"
                    src="OnlineConsultation-card.svg"
                    alt=""
                  />
                  <p className="text-white absolute w-16 bottom-1 right-6">
                    Online Consultation
                  </p>
                </div>
              </div>
            </div>
            <div className="w-96 h-48">
              <div className=" bg-gray-300 rounded-lg">
                <div className="flex relative ">
                  <DragIndicatorIcon className="mt-14 text-3xl ml-3" />
                  <img
                    className="ml-3 rounded"
                    src="HandymanServices-card.svg"
                    alt=""
                  />
                  <p className="text-white w-16 absolute bottom-1 right-2 text-end">
                    Handyman Services
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between mx-5 gap-10 mt-10">
          <div className="w-96">Business Category</div>
          <p className="text-gray-500 w-[900px]">
            Business Categories provide your merchants the power to map their
            categories/products to a business category, which in turn will help
            the customers to easy checkout.
          </p>
          <div>
            {" "}
            <button
              onClick={showModalBusiness}
              className="bg-teal-800 text-white w-52 p-2 rounded-lg"
            >
              <PlusOutlined /> Add Business Category
            </button>
            <Modal
              title="Add Business Category"
              open={isModalVisibleBusiness}
              className="mt-24"
              onOk={handleOkBusiness}
              onCancel={handleCancelBusiness}
              footer={null} // Custom footer to include form buttons
            >
              <form onSubmit={handleBusiness}>
                <div className="flex mt-5 gap-4">
                  <label className="w-1/2 text-gray-500">Service title</label>
                  <input
                    type="text"
                    className="border-2 border-gray-300 rounded p-2 focus:outline-none w-2/3"
                    name="title"
                    value={business.title}
                    onChange={handleBusinessChange}
                  />
                </div>
                <div className="flex mt-5  gap-4">
                  <label className="w-1/2 text-gray-500">Geofence</label>
                  <select
                    name="geofence"
                    value={business.geofence}
                    onChange={handleBusinessChange}
                    className="border-2 border-gray-300 rounded p-2 focus:outline-none w-2/3"
                  >
                    <option value="select" hidden selected>
                      Geofence
                    </option>
                    <option value="Option 1">Option 1</option>
                  </select>
                </div>
                <div className="flex">
                  <label className="mt-5">Image (342px x 160px)</label>
                  <div className=" flex items-center gap-[30px]">
                    {!businessPreviewURL && (
                      <div className="bg-gray-400 ml-20 mt-5 h-16 w-16 rounded-md" />
                    )}
                    {businessPreviewURL && (
                      <figure className="ml-20 mt-5 h-16 w-16 rounded-md relative">
                        <img
                          src={businessPreviewURL}
                          alt="profile"
                          className="w-full rounded h-full object-cover "
                        />
                      </figure>
                    )}
                    <input
                      type="file"
                      name="businessImage"
                      id="businessImage"
                      className="hidden"
                      onChange={handleBusinessImageChange}
                    />
                    <label htmlFor="businessImage" className="cursor-pointer ">
                      <MdCameraAlt
                        className=" bg-teal-800  text-[40px] text-white p-6 h-16 w-16 mt-5 rounded"
                        size={30}
                      />
                    </label>
                  </div>
                </div>
                <div className="flex justify-end mt-10  gap-4">
                  <button
                    className="bg-gray-300 rounded-lg px-6 py-2 font-semibold justify-end"
                    onClick={handleCancelBusiness}
                    type="submit"
                  >
                    {" "}
                    Cancel
                  </button>
                  <button
                    className="bg-teal-800 rounded-lg px-6 py-2 text-white font-semibold justify-end"
                    onClick={handleOkBusiness}
                    type="submit"
                  >
                    Add
                  </button>
                </div>
              </form>
            </Modal>
          </div>
        </div>
        <div className="grid justify-center mt-10 gap-5  border-b-2 border-gray-200 pb-10">
          <div className="bg-white rounded-lg p-3 px-5 flex items-center justify-between gap-5">
            <DragIndicatorIcon />
            <div className="bg-gray-200 rounded-full p-5">
              <img src="Food.svg" />
            </div>
            <p>{business.title}</p>
            <Switch className="ml-24" />
            <button onClick={showModalBusinessEdit}>
              <EditOutlined className="bg-gray-200 p-3 rounded-lg" />
            </button>
            <Modal
              title="Edit Business Category"
              open={isModalVisibleBuinessEdit}
              className="mt-24"
              onOk={handleOkBusinessEdit}
              onCancel={handleCancelBusinessEdit}
              footer={null} // Custom footer to include form buttons
            >
              <form onSubmit={handleBusiness}>
                <div className="flex mt-5 gap-4">
                  <label className="w-1/2 text-gray-500">Service title</label>
                  <input
                    type="text"
                    className="border-2 border-gray-300 rounded p-2 focus:outline-none w-2/3"
                    name="title"
                    value={business.title}
                    onChange={handleBusinessChange}
                  />
                </div>
                <div className="flex mt-5  gap-4">
                  <label className="w-1/2 text-gray-500">Geofence</label>
                  <select
                    name="geofence"
                    value={business.geofence}
                    onChange={handleBusinessChange}
                    className="border-2 border-gray-300 rounded p-2 focus:outline-none w-2/3"
                  >
                    <option value="select" hidden selected>
                      Geofence
                    </option>
                    <option value="Option 1">Option 1</option>
                  </select>
                </div>
                <div className="flex">
                  <label className="mt-5">Image (342px x 160px)</label>
                  <div className=" flex items-center gap-[30px]">
                    {!businessEditPreviewURL && (
                      <div className="bg-gray-400 ml-20 mt-5 h-16 w-16 rounded-md" />
                    )}
                    {businessEditPreviewURL && (
                      <figure className="ml-20 mt-5 h-16 w-16 rounded-md relative">
                        <img
                          src={businessEditPreviewURL}
                          alt="profile"
                          className="w-full rounded h-full object-cover "
                        />
                      </figure>
                    )}
                    <input
                      type="file"
                      name="businessEditImage"
                      id="businessEditImage"
                      className="hidden"
                      onChange={handleBusinessEditImageChange}
                    />
                    <label
                      htmlFor="businessEditImage"
                      className="cursor-pointer "
                    >
                      <MdCameraAlt
                        className=" bg-teal-800  text-[40px] text-white p-6 h-16 w-16 mt-5 rounded"
                        size={30}
                      />
                    </label>
                  </div>
                </div>
                <div className="flex justify-end mt-10  gap-4">
                  <button
                    className="bg-gray-300 rounded-lg px-6 py-2 font-semibold justify-end"
                    onClick={handleCancelBusinessEdit}
                    type="submit"
                  >
                    {" "}
                    Cancel
                  </button>
                  <button
                    className="bg-teal-800 rounded-lg px-6 py-3 text-white font-semibold justify-end"
                    onClick={handleOkBusinessEdit}
                    type="submit"
                  >
                    Add
                  </button>
                </div>
              </form>
            </Modal>
            <button
              onClick={showModalDelete}
              className="bg-red-100 p-3 rounded-lg"
            >
              <RiDeleteBinLine className=" text-[18px] text-red-900 " />
            </button>
            <Modal
              onOk={showModalDeleteOk}
              onCancel={showModalDeleteCancel}
              footer={null}
              open={isShowModalDelete}
              centered
            >
              <form>
                <p className="font-bold text-[20px] mb-5">
                  Are you sure want to delete?
                </p>
                <div className="flex justify-end">
                  <button
                    className="bg-zinc-200 p-2 rounded-md font-semibold"
                    onClick={showModalDeleteCancel}
                  >
                    Cancel
                  </button>
                  <button className="bg-red-100 p-2 rounded-md ml-3 px-2 text-red-700">
                    {" "}
                    Delete
                  </button>
                </div>
              </form>
            </Modal>
          </div>
        </div>

        {/* // Customer Login Restriction */}

        {/* <div className="mt-10 justify-between flex mx-5 border-b-2 pb-10 mb-5 border-gray-200">
          <h1>Customer login Restriction</h1>
          <p className="w-[43rem] text-gray-500">
            Enable this, to restrict Customer from accessing the platform
            without logging in into the platform. (Make sure your apps are
            updated).
          </p>
          <Switch />
        </div> */}

        <div className="mt-10 justify-between flex mx-5">
          <h1>Customer Order Banners (info)</h1>
          <p className="w-[45rem] text-gray-500">
            The Purpose of this banner is to educate customer.
          </p>
          <Switch />
        </div>
        <div className=" ml-[335px] mt-5">
          <button
            onClick={showModalBanner}
            className="bg-teal-800 text-white  rounded-lg p-2"
          >
            <PlusOutlined /> Add Banner
          </button>
          <Modal
            title="Add Banner"
            open={isModalVisibleBanner}
            className="mt-24"
            onOk={handleOkBanner}
            onCancel={handleCancelBanner}
            footer={null} // Custom footer to include form buttons
          >
            <form onSubmit={handleBanner}>
              <div className="flex mt-5 gap-4">
                <label className="w-1/2 text-gray-500">Service title</label>
                <input
                  type="text"
                  className="border-2 border-gray-300 rounded p-2 focus:outline-none w-2/3"
                  name="title"
                  value={banner.title}
                  onChange={handleBannerChange}
                />
              </div>
              <div className="flex mt-5  gap-4">
                <label className="w-1/2 text-gray-500">Description</label>
                <input
                  type="text"
                  className="border-2 border-gray-300 rounded p-2 focus:outline-none w-2/3"
                  name="description"
                  value={banner.description}
                  onChange={handleBannerChange}
                />
              </div>
              <div className="flex">
                <label className="mt-5">Image (342px x 160px)</label>
                <div className=" flex items-center gap-[30px]">
                  {!bannerPreviewURL && (
                    <div className="bg-gray-400 ml-20 mt-5 h-16 w-16 rounded-md" />
                  )}
                  {bannerPreviewURL && (
                    <figure className="ml-20 mt-5 h-16 w-16 rounded-md relative">
                      <img
                        src={bannerPreviewURL}
                        alt="profile"
                        className="w-full rounded h-full object-cover "
                      />
                    </figure>
                  )}
                  <input
                    type="file"
                    name="bannerImage"
                    id="bannerImage"
                    className="hidden"
                    onChange={handleBannerImageChange}
                  />
                  <label htmlFor="bannerImage" className="cursor-pointer ">
                    <MdCameraAlt
                      className=" bg-teal-800  text-[40px] text-white p-6 h-16 w-16 mt-5 rounded"
                      size={30}
                    />
                  </label>
                </div>
              </div>
              <div className="flex justify-end mt-10  gap-4">
                <button
                  className="bg-gray-300 rounded-lg px-6 py-2 font-semibold justify-end"
                  onClick={handleCancelBanner}
                  type="submit"
                >
                  {" "}
                  Cancel
                </button>
                <button
                  className="bg-teal-800 rounded-lg px-6 py-2 text-white font-semibold justify-end"
                  onClick={handleOkBanner}
                  type="submit"
                >
                  Add
                </button>
              </div>
            </form>
          </Modal>
        </div>
        <div className="grid grid-cols-2 ml-[335px] mt-10  gap-5">
          <Card className="w-[23rem]">
            <p>Card 1</p>
            <p className="font-semibold">{banner.title}</p>
            <p>{banner.description}</p>
            <img src="Sadhya.svg" />
            <button
              className="bg-blue-50 rounded-3xl p-3 px-12 mt-5"
              onClick={showModalBannerEdit}
            >
              <EditOutlined /> Edit
            </button>
            <Modal
              title="Edit Banner"
              open={isModalVisibleBannerEdit}
              className="mt-24"
              onOk={handleOkBannerEdit}
              onCancel={handleCancelBannerEdit}
              footer={null} // Custom footer to include form buttons
            >
              <form onSubmit={handleBanner}>
                <div className="flex mt-5 gap-4">
                  <label className="w-1/2 text-gray-500">Service title</label>
                  <input
                    type="text"
                    className="border-2 border-gray-300 rounded p-2 focus:outline-none w-2/3"
                    name="title"
                    value={banner.title}
                    onChange={handleBannerChange}
                  />
                </div>
                <div className="flex mt-5  gap-4">
                  <label className="w-1/2 text-gray-500">Geofence</label>
                  <input
                    type="text"
                    className="border-2 border-gray-300 rounded p-2 focus:outline-none w-2/3"
                    name="description"
                    value={banner.description}
                    onChange={handleBannerChange}
                  />
                </div>
                <div className="flex">
                  <label className="mt-5">Image (342px x 160px)</label>
                  <div className=" flex items-center gap-[30px]">
                    {!bannerPreviewURL && (
                      <div className="bg-gray-400 ml-20 mt-5 h-16 w-16 rounded-md" />
                    )}
                    {bannerPreviewURL && (
                      <figure className="ml-20 mt-5 h-16 w-16 rounded-md relative">
                        <img
                          src={bannerPreviewURL}
                          alt="profile"
                          className="w-full rounded h-full object-cover "
                        />
                      </figure>
                    )}
                    <input
                      type="file"
                      name="bannerURL"
                      id="bannerURL"
                      className="hidden"
                      onChange={handleServiceImageChange}
                    />
                    <label htmlFor="bannerImage" className="cursor-pointer ">
                      <MdCameraAlt
                        className=" bg-teal-800  text-[40px] text-white p-6 h-16 w-16 mt-5 rounded"
                        size={30}
                      />
                    </label>
                  </div>
                </div>
                <div className="flex justify-end mt-10  gap-4">
                  <button
                    className="bg-gray-300 rounded-lg px-6 py-2 font-semibold justify-end"
                    onClick={handleCancelBannerEdit}
                    type="submit"
                  >
                    {" "}
                    Cancel
                  </button>
                  <button
                    className="bg-teal-800 rounded-lg px-6 py-2 text-white font-semibold justify-end"
                    onClick={handleOkBannerEdit}
                    type="submit"
                  >
                    Add
                  </button>
                </div>
              </form>
            </Modal>
            <button
              className="bg-red-100 rounded-3xl p-3 text-red-700 ml-5 px-12 mt-5"
              onClick={ShowModalDeleteCustomer}
            >
              <DeleteOutlined /> Delete
            </button>
            <Modal
              onOk={showModalDeleteOkCustomer}
              onCancel={showModalDeleteCancelCustomer}
              footer={null}
              open={isShowModalDeleteCustomer}
              centered
            >
              <form>
                <p className="font-bold text-[20px] mb-5">
                  Are you sure want to delete?
                </p>
                <div className="flex justify-end">
                  <button
                    className="bg-zinc-200 p-2 rounded-md font-semibold"
                    onClick={showModalDeleteCancelCustomer}
                  >
                    Cancel
                  </button>
                  <button className="bg-red-100 p-2 rounded-md ml-3 px-2 text-red-700">
                    {" "}
                    Delete
                  </button>
                </div>
              </form>
            </Modal>
          </Card>
        </div>
        <div className="mt-10 justify-between flex mx-5">
          <h1>Pick and drop banners (info)</h1>
          <p className="w-[45rem] text-gray-500">
            The Purpose of this banner is to educate customer.
          </p>
          <Switch />
        </div>
        <div className=" ml-[335px] mt-5">
          <button
            onClick={showModalPickDrop}
            className="bg-teal-800 text-white  rounded-lg p-2"
          >
            <PlusOutlined /> Add Banner
          </button>
          <Modal
            title="Add Banner"
            open={isModalVisiblePickDrop}
            className="mt-24"
            onOk={handleOkPickDrop}
            onCancel={handleCancelPickDrop}
            footer={null} // Custom footer to include form buttons
          >
            <form onSubmit={handlePickDrop}>
              <div className="flex mt-5 gap-4">
                <label className="w-1/2 text-gray-500">Service title</label>
                <input
                  type="text"
                  className="border-2 border-gray-300 rounded p-2 focus:outline-none w-2/3"
                  name="title"
                  value={pickDrop.title}
                  onChange={handlePickDropChange}
                />
              </div>
              <div className="flex mt-5  gap-4">
                <label className="w-1/2 text-gray-500">Geofence</label>
                <input
                  type="text"
                  className="border-2 border-gray-300 rounded p-2 focus:outline-none w-2/3"
                  name="description"
                  value={pickDrop.description}
                  onChange={handlePickDropChange}
                />
              </div>
              <div className="flex">
                <label className="mt-5">Image (342px x 160px)</label>
                <div className=" flex items-center gap-[30px]">
                  {!pickDropPreviewURL && (
                    <div className="bg-gray-400 ml-20 mt-5 h-16 w-16 rounded-md" />
                  )}
                  {pickDropPreviewURL && (
                    <figure className="ml-20 mt-5 h-16 w-16 rounded-md relative">
                      <img
                        src={pickDropPreviewURL}
                        alt="profile"
                        className="w-full rounded h-full object-cover "
                      />
                    </figure>
                  )}
                  <input
                    type="file"
                    name="pickDrop"
                    id="pickDrop"
                    className="hidden"
                    onChange={handlePickDropImageChange}
                  />
                  <label htmlFor="pickDrop" className="cursor-pointer ">
                    <MdCameraAlt
                      className=" bg-teal-800  text-[40px] text-white p-6 h-16 w-16 mt-5 rounded"
                      size={30}
                    />
                  </label>
                </div>
              </div>
              <div className="flex justify-end mt-10  gap-4">
                <button
                  className="bg-gray-300 rounded-lg px-6 py-2 font-semibold justify-end"
                  onClick={handleCancelPickDrop}
                  type="submit"
                >
                  {" "}
                  Cancel
                </button>
                <button
                  className="bg-teal-800 rounded-lg px-6 py-2 text-white font-semibold justify-end"
                  onClick={handleOkPickDrop}
                  type="submit"
                >
                  Add
                </button>
              </div>
            </form>
          </Modal>
        </div>

        <div className="grid grid-cols-2 ml-[335px]  mt-10  gap-5">
          <Card className="w-[23rem]">
            <p>Card 1</p>
            <p className="font-semibold">{pickDrop.title}</p>
            <p>{pickDrop.description}</p>
            <img src="Sadhya.svg" />
            <button
              className="bg-blue-50 rounded-3xl p-3 px-12 mt-5"
              onClick={showModalPickDropEdit}
            >
              <EditOutlined /> Edit
            </button>
            <Modal
              title="Edit Banner"
              open={isModalVisiblePickDropEdit}
              className="mt-24"
              onOk={handleOkPickDropEdit}
              onCancel={handleCancelPickDropEdit}
              footer={null} // Custom footer to include form buttons
            >
              <form onSubmit={handlePickDrop}>
                <div className="flex mt-5 gap-4">
                  <label className="w-1/2 text-gray-500">Service title</label>
                  <input
                    type="text"
                    className="border-2 border-gray-300 rounded p-2 focus:outline-none w-2/3"
                    name="title"
                    value={pickDrop.title}
                    onChange={handlePickDropChange}
                  />
                </div>
                <div className="flex mt-5  gap-4">
                  <label className="w-1/2 text-gray-500">Geofence</label>
                  <input
                    type="text"
                    className="border-2 border-gray-300 rounded p-2 focus:outline-none w-2/3"
                    name="description"
                    value={pickDrop.description}
                    onChange={handlePickDropChange}
                  />
                </div>
                <div className="flex">
                  <label className="mt-5">Image (342px x 160px)</label>
                  <div className=" flex items-center gap-[30px]">
                    {!pickDropPreviewURL && (
                      <div className="bg-gray-400 ml-20 mt-5 h-16 w-16 rounded-md" />
                    )}
                    {pickDropPreviewURL && (
                      <figure className="ml-20 mt-5 h-16 w-16 rounded-md relative">
                        <img
                          src={pickDropPreviewURL}
                          alt="profile"
                          className="w-full rounded h-full object-cover "
                        />
                      </figure>
                    )}
                    <input
                      type="file"
                      name="pickDrop"
                      id="pickDrop"
                      className="hidden"
                      onChange={handlePickDropImageChange}
                    />
                    <label htmlFor="pickDrop" className="cursor-pointer ">
                      <MdCameraAlt
                        className=" bg-teal-800  text-[40px] text-white p-6 h-16 w-16 mt-5 rounded"
                        size={30}
                      />
                    </label>
                  </div>
                </div>
                <div className="flex justify-end mt-10  gap-4">
                  <button
                    className="bg-gray-300 rounded-lg px-6 py-2 font-semibold justify-end"
                    onClick={handleCancelPickDropEdit}
                    type="submit"
                  >
                    {" "}
                    Cancel
                  </button>
                  <button
                    className="bg-teal-800 rounded-lg px-6 py-2 text-white font-semibold justify-end"
                    onClick={handleOkPickDropEdit}
                    type="submit"
                  >
                    Add
                  </button>
                </div>
              </form>
            </Modal>
            <button
              className="bg-teal-800 rounded-3xl p-3 text-white ml-5 px-12 mt-5"
              onClick={showModalDeletePick}
            >
              <DeleteOutlined /> Delete
            </button>
            <Modal
              onOk={showModalDeleteOkPick}
              onCancel={showModalDeleteCancelPick}
              footer={null}
              open={isShowModalDeletePick}
              centered
            >
              <form>
                <p className="font-bold text-[20px] mb-5">
                  Are you sure want to delete?
                </p>
                <div className="flex justify-end">
                  <button
                    className="bg-zinc-200 p-2 rounded-md font-semibold"
                    onClick={showModalDeleteCancelPick}
                  >
                    Cancel
                  </button>
                  <button className="bg-red-100 p-2 rounded-md ml-3 px-2 text-red-700">
                    {" "}
                    Delete
                  </button>
                </div>
              </form>
            </Modal>
          </Card>
        </div>
        <div className="flex justify-end p-10 gap-4">
          <button
            className="bg-gray-300 rounded-lg px-6 py-2 font-semibold justify-end"
            // onClick={handleCancelEdit}
            type="submit"
          >
            Cancel
          </button>
          <button
            className="bg-teal-800 rounded-lg px-6 py-2 text-white font-semibold justify-end"
            onClick={submitAction}
            type="submit"
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default CustomerApp;
