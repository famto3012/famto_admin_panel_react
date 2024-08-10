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
import axios from "axios";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import GIFLoader from "../../../components/GIFLoader";
import { useToast } from "@chakra-ui/react";
import BusinessCategory from "../../../components/CustomerApp/BusinessCategory";
import CustomerOrder from "../../../components/CustomerApp/CustomerOrder";
import PickAndDrop from "../../../components/CustomerApp/PickAndDrop";
import ServiceCategory from "../../../components/CustomerApp/ServiceCategory";

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
          title: "Success",
          description: "Customer App updated successfully.",
          duration: 3000,
          status: "success",
          isClosable: true,
        });
        handleCancel();
      }
    } catch (err) {
      console.error(`Error in saving data ${err.message}`);
      toast({
        title: "Error",
        description: "Error in creating Customer App ",
        duration: 3000,
        status: "error",
        isClosable: true,
      });
    } finally {
      setIsSaveLoading(false);
    }
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

            <ServiceCategory />

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
