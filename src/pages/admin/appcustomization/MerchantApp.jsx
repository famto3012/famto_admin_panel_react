import { BellOutlined, SearchOutlined } from "@ant-design/icons";
import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { MdCameraAlt } from "react-icons/md";
import { Switch } from "antd";
import { FaGoogle } from "react-icons/fa";
import { AiFillApple } from "react-icons/ai";
import { FaFacebookSquare } from "react-icons/fa";
import GlobalSearch from "../../../components/GlobalSearch";
import { useToast } from "@chakra-ui/react";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const MerchantApp = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { token, role } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    splashScreenUrl: "",
    email: false,
    phoneNumber: false,
    emailVerification: false,
    otpVerification: false,
    loginViaOtp: false,
    loginViaGoogle: false,
    loginViaApple: false,
    loginViaFacebook: false,
  });
  const [notificationFile, setNotificationFile] = useState(null);
  const [notificationPreviewURL, setNotificationPreviewURL] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/admin/app-customization/merchant-app`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          setFormData(response.data.data);
          console.log(response.data.data);
        }
      } catch (err) {
        console.error(`Error in fetching data: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, role, navigate]);

  const onChange = (name, checked) => {
    setFormData({ ...formData, [name]: checked });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNotificationFile(file);
    setNotificationPreviewURL(URL.createObjectURL(file));
  };

  const submitAction = async (e) => {
    e.preventDefault();
    try {
      console.log("formData", formData);

      setIsLoading(true);
      const adddataToSend = new FormData();
      adddataToSend.append("email", formData.email);
      adddataToSend.append("phoneNumber", formData.phoneNumber);
      adddataToSend.append("emailVerification", formData.emailVerification);
      adddataToSend.append("otpVerification", formData.otpVerification);
      adddataToSend.append("loginViaOtp", formData.loginViaOtp);
      adddataToSend.append("loginViaGoogle", formData.loginViaGoogle);
      adddataToSend.append("loginViaApple", formData.loginViaApple);
      adddataToSend.append("loginViaFacebook", formData.loginViaFacebook);

      adddataToSend.append("splashScreenImage", notificationFile);
      console.log("data for test", adddataToSend);

      const addDataResponse = await axios.post(
        `${BASE_URL}/admin/app-customization/merchant-app`,
        adddataToSend,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (addDataResponse.status === 201) {
        setFormData(addDataResponse.data.data);
        setNotificationPreviewURL(null);
        setNotificationFile(null);
        handleCancel();
        toast({
          title: "Updated",
          description: "Agent App Updated Successfully",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(`Error in fetch datas : ${addDataResponse.data.message}`);
      toast({
        title: "Error",
        description: "There was an error occured",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
    console.log(formData);
  };

  return (
    <>
      <Sidebar />
      <div className="w-fit min-h-screen pl-[290px] bg-gray-100">
        <nav className="p-5">
          <GlobalSearch />
        </nav>
        <div>
          <h1 className="text-lg font-bold mt-7 mx-11">Merchant App</h1>
        </div>
        <div className="flex items-center justify-between mt-7 border-b-2 border-gray-200 pb-10">
          <h1 className="mx-10 ">Splash screen (390px x 844px)</h1>
          <p className="text-gray-500 ">
            Note: The purpose is to wish or design the splash page. The format
            can image or gif{" "}
            <span className="flex justtify-start">
              {" "}
              Note: Design according to aspect ratio{" "}
            </span>
          </p>

          <div className="flex items-center ml-14 gap-[30px] mx-10">
            {formData?.splashScreenUrl && !notificationPreviewURL && (
              <figure className="h-16 w-16 rounded-md  relative">
                <img
                  src={formData?.splashScreenUrl}
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
                className="bg-teal-800 text-[30px] text-white p-4 h-16 w-16 rounded-md"
                size={30}
              />
            </label>
          </div>
        </div>
        <div className="flex justify-between mt-5 mx-10">
          <h1 className="w-[350px]">Sign up and Sign in settings</h1>
          <div className="flex flex-col ">
            <div className="text-gray-500 mx-[168px] ">
              Control sign-up of agent on your platform. Here you are given with
              a variety of options such as whether to have email orphone number
              as mandatory fields on the sign-up form, how do you want to verify
              the agent: via Email verification or OTP verification and which
              social platform you want to enable through which agent can sign up
              on your platform.
            </div>

            <div className="flex justify-end gap-10 mx-10">
              <div className="mt-12 mx-6">
                <h1>Required Field on Signup</h1>
                <div className="flex items-center mt-5">
                  <label className="text-gray-500">Phoneno</label>
                  <Switch
                    className="ml-[54px]"
                    checked={formData.phoneNumber}
                    onChange={(checked) => onChange("phoneNumber", checked)}
                    name="phoneNumber"
                  />
                </div>
                <div className="flex items-center mt-5">
                  <label className="text-gray-500">Email</label>
                  <Switch
                    className="ml-20"
                    checked={formData.email}
                    onChange={(checked) => onChange("email", checked)}
                    name="email"
                  />
                </div>
              </div>
              <div className="mt-12 mx-6">
                <h1>Signup Verification</h1>
                <div className="flex items-center mt-5">
                  <label className="text-gray-500">Email Verification</label>
                  <Switch
                    className="ml-10"
                    checked={formData.emailVerification}
                    onChange={(checked) =>
                      onChange("emailVerification", checked)
                    }
                    name="emailVerification"
                  />
                </div>
                <div className="flex items-center mt-5">
                  <label className="text-gray-500">OTP Verification</label>
                  <Switch
                    className="ml-12"
                    checked={formData.otpVerification}
                    onChange={(checked) => onChange("otpVerification", checked)}
                    name="otpVerification"
                  />
                </div>
              </div>
              <div className="mt-3 mx-6">
                <h1>Login Via</h1>
                <div className="flex items-center mt-5 ">
                  <label className="text-gray-500">OTP</label>
                  <Switch
                    className="ml-20"
                    checked={formData.loginViaOtp}
                    onChange={(checked) => onChange("loginViaOtp", checked)}
                    name="loginViaOtp"
                  />
                </div>
                <div className="flex items-center mt-5">
                  <FaGoogle className="text-gray-500 text-[25px]" />
                  <Switch
                    className="ml-[84px]"
                    checked={formData.loginViaGoogle}
                    onChange={(checked) => onChange("loginViaGoogle", checked)}
                    name="loginViaGoogle"
                  />
                </div>
                <div className="flex items-center mt-5">
                  <AiFillApple className="text-gray-500 text-[30px]" />
                  <Switch
                    className="ml-[80px]"
                    checked={formData.loginViaApple}
                    onChange={(checked) => onChange("loginViaApple", checked)}
                    name="loginViaApple"
                  />
                </div>
                <div className="flex items-center mt-5">
                  <FaFacebookSquare className="text-gray-500 text-[30px]" />
                  <Switch
                    className="ml-[80px]"
                    checked={formData.loginViaFacebook}
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

        {/* <div className="flex justify-between mt-16 border-t-2 pt-10 border-gray-300">
          <h1 className="mx-10">Merchant login restriction</h1>
          <p className="text-gray-500 mr-[100px]">
            Enable this, to restrict Agent from accessing the platform without
            logging in into the{" "}
            <span className="flex justtify-start">
              platform. (Make sure your apps are updated).
            </span>
          </p>
          <div className="mx-10">
            <Switch />
          </div>
        </div> */}

        <div className="flex justify-end gap-4 mt-16 mx-10">
          <button className="bg-cyan-50 py-2 px-4 rounded-md" type="button">
            Cancel
          </button>
          <button
            className="bg-teal-700 text-white py-2 px-4 rounded-md"
            type="submit"
            onClick={submitAction}
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default MerchantApp;
