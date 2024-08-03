import React, { useContext, useEffect } from "react";
import Sidebar from "../../../components/Sidebar";
import GlobalSearch from "../../../components/GlobalSearch";
import { MdCameraAlt } from "react-icons/md";
import { useState } from "react";
import { Switch, Modal } from "antd";
import {
  GoogleOutlined,
  AppleFilled,
  PlusOutlined,
  FacebookFilled,
} from "@ant-design/icons";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import GIFLoader from "../../../components/GIFLoader";
import { useToast } from "@chakra-ui/react";
import BusinessCategory from "../../../components/CustomerApp/BusinessCategory";
import CustomerOrder from "../../../components/CustomerApp/CustomerOrder";
import PickAndDrop from "../../../components/CustomerApp/PickAndDrop";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const CustomerApp = () => {
  const [customerData, setCustomerData] = useState({
    splashScreenUrl: "",
    phoneNumber: false,
    emailVerification: false,
    email: false,
    otpVerification: false,
    loginViaOtp: false,
    loginViaGoogle: false,
    loginViaApple: false,
    loginViaFacebook: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const { token, role } = useContext(UserContext);
  const navigate = useNavigate();
  const toast = useToast();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [service, setService] = useState({
    title: "",
    geofence: "",
    imageURL: "",
  });


  console.log("Customer Data", customerData);
  //API for fetch data..

  useEffect(() => {
    if (!token || role !== "Admin") {
      navigate("/auth/login");
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(false);

        const response = await axios.get(
          `${BASE_URL}/admin/app-customization/customer-app`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 200) {
          setCustomerData(response.data.data);
        }
      } catch (err) {
        console.error(`Error in fetching data ${err.message}`);
      }
    };

    fetchData();
  }, [token, role, navigate]);

  //API to save customer data
  const submitAction = async (e) => {
    e.preventDefault();

    try {
      setIsSaveLoading(true);

      const customerDataToSend = new FormData();
      customerDataToSend.append("phoneNumber", customerData.phoneNumber),
        customerDataToSend.append("email", customerData.email),
        customerDataToSend.append(
          "otpVerification",
          customerData.otpVerification
        ),
        customerDataToSend.append("loginViaApple", customerData.loginViaApple),
        customerDataToSend.append(
          "loginViaFacebook",
          customerData.loginViaFacebook
        ),
        customerDataToSend.append(
          "loginViaGoogle",
          customerData.loginViaGoogle
        ),
        customerDataToSend.append("loginViaOtp", customerData.loginViaOtp),
        customerDataToSend.append(
          "emailVerification",
          customerData.emailVerification
        ),
        customerDataToSend.append("splashScreenImage", notificationFile);

      const response = await axios.post(
        `${BASE_URL}/admin/app-customization/customer-app`,
        customerDataToSend,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
          "Content-Type": "multipart/form-data",
        }
      );
      if (response.status === 200) {
        console.log(customerData);
        toast({
          title: "Updated",
          description: "Customer App updated successfully.",
          duration: 900,
          status: "success",
          isClosable: true,
        });
        handleCancel();
      }
    } catch (err) {
      console.error(`Error in saving data ${err.message}`);
      toast({
        title: "Failed",
        description: "Error in creating Customer App ",
        duration: 900,
        status: "error",
        isClosable: true,
      });
    } finally {
      setIsSaveLoading(false);
    }
  };

  const handleServiceChange = (e) => {
    setService({ ...service, [e.target.name]: e.target.value });
  };

  const handleService = (e) => {
    e.preventDefault();

    console.log("Service : ", service);
  };

  const onChange = (name, checked) => {
    setCustomerData({ ...customerData, [name]: checked });
  };

  const [notificationFile, setNotificationFile] = useState(null);
  const [notificationPreviewURL, setNotificationPreviewURL] = useState(null);

  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setNotificationFile(file);
    setNotificationPreviewURL(URL.createObjectURL(file));
  };

  const [serviceFile, setServiceFile] = useState(null);
  const [servicePreviewURL, setServicePreviewURL] = useState(null);

  const handleServiceImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setServiceFile(file);
    setServicePreviewURL(URL.createObjectURL(file));
  };

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalVisibleBannerEdit(false);
  };

  return (
    <div>
      {isLoading ? (
        <GIFLoader />
      ) : (
        <>
          <Sidebar />
          <div className="pl-[300px]  bg-gray-100">
            <nav className="p-5">
              <GlobalSearch />
            </nav>
            <h1 className="mx-5 font-bold text-[20px]">Customer App </h1>
            <div className="flex gap-10 mt-10 mx-5  border-b-2 border-gray-200 pb-5">
              <div className="w-72">Splash Screen (390px x 844px)</div>
              <div className="text-gray-500">
                Note: The purpose is to wish or design the splash page. The
                format can image or gif Note: Design according to aspect ratio
              </div>
              <div className="flex w-44">
                {customerData?.splashScreenUrl && !notificationPreviewURL && (
                  <figure className="h-16 w-16 rounded-md  relative">
                    <img
                      src={customerData?.splashScreenUrl}
                      alt="profile"
                      className="w-full rounded h-full object-cover"
                    />
                  </figure>
                )}
                {notificationPreviewURL && (
                  <figure className="h-16 w-16 rounded-md  relative">
                    <img
                      src={notificationPreviewURL}
                      alt="profile"
                      className="w-full rounded h-full object-cover"
                    />
                  </figure>
                )}
                <input
                  type="file"
                  name="splashScreenImage"
                  id="splashScreenImage"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <label htmlFor="splashScreenImage" className="cursor-pointer">
                  <MdCameraAlt
                    className="bg-teal-800 ml-5 text-[30px] text-white p-4 h-16 w-16 rounded-md"
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
                number as mandatory fields on the sign-up form, how do you want
                to verify the Customer: via Email verification or OTP
                verification and which social platform you want to enable
                through which Customer can sign up on your platform.
                <div className="flex justify-between gap-3 mt-5">
                  <div className="bg-white p-7 grid rounded-lg mt-20">
                    <label className="font-semibold">
                      Required fileds on signup
                    </label>
                    <div className="flex justify-between">
                      Phone No.
                      <Switch
                        className="ml-6"
                        checked={customerData.phoneNumber}
                        onChange={(checked) => onChange("phoneNumber", checked)}
                        name="phoneNumber"
                      />
                    </div>
                    <div className="flex justify-between">
                      Email{" "}
                      <Switch
                        className="ml-14"
                        checked={customerData.email}
                        onChange={(checked) => onChange("email", checked)}
                        name="email"
                      />
                    </div>
                  </div>
                  <div className="bg-white p-5 grid rounded-lg mt-20">
                    <label className="font-semibold">Signup Verification</label>
                    <div className="flex justify-between">
                      Email verification
                      <Switch
                        className="ml-5"
                        checked={customerData.emailVerification}
                        onChange={(checked) =>
                          onChange("emailVerification", checked)
                        }
                        name="emailVerification"
                      />
                    </div>
                    <div className="flex justify-between">
                      OTP verification{" "}
                      <Switch
                        className="ml-6"
                        checked={customerData.otpVerification}
                        onChange={(checked) =>
                          onChange("otpVerification", checked)
                        }
                        name="otpVerification"
                      />
                    </div>
                  </div>
                  <div className="bg-white p-5 gap-5 grid rounded-lg">
                    <label className="font-semibold">Login via</label>
                    <div className="flex">
                      OTP
                      <Switch
                        className="ml-32"
                        checked={customerData.loginViaOtp}
                        onChange={(checked) => onChange("loginViaOtp", checked)}
                        name="loginViaOtp"
                      />
                    </div>
                    <div>
                      <GoogleOutlined className="text-[30px]" />
                      <Switch
                        className="ml-[125px]"
                        checked={customerData.loginViaGoogle}
                        onChange={(checked) =>
                          onChange("loginViaGoogle", checked)
                        }
                        name="loginViaGoogle"
                      />
                    </div>
                    <div>
                      <AppleFilled className="text-[30px]" />
                      <Switch
                        className="ml-[125px]"
                        checked={customerData.loginViaApple}
                        onChange={(checked) =>
                          onChange("loginViaApple", checked)
                        }
                        name="loginViaApple"
                      />
                    </div>
                    <div>
                      <FacebookFilled className="text-[30px]" />
                      <Switch
                        className="ml-[125px]"
                        checked={customerData.loginViaFacebook}
                        onChange={(checked) =>
                          onChange("loginViaFacebook", checked)
                        }
                        name="loginViaFacebook"
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
                  This enables to add, edit, change thumbnail of the listed
                  services
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
                  onCancel={handleCancel}
                  footer={null} // Custom footer to include form buttons
                >
                  <form onSubmit={handleService}>
                    <div className="flex mt-5 gap-4">
                      <label className="w-1/2 text-gray-500">
                        Service title
                      </label>
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
                        <label
                          htmlFor="serviceImage"
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
                        onClick={handleCancel}
                        type="submit"
                      >
                        {" "}
                        Cancel
                      </button>
                      <button
                        className="bg-teal-800 rounded-lg px-6 py-2 text-white font-semibold justify-end"
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
                      <img
                        className="ml-3 rounded"
                        src="Taxi-card.svg"
                        alt=""
                      />
                      <p className="text-white absolute bottom-1 right-1">
                        Taxi
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

            <BusinessCategory />

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

            <CustomerOrder />

            <PickAndDrop />

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
                {isSaveLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CustomerApp;