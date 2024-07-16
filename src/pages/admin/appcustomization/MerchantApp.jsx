import { BellOutlined, SearchOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { MdCameraAlt } from "react-icons/md";
import { Switch } from "antd";
import { FaGoogle } from "react-icons/fa";
import { AiFillApple } from "react-icons/ai";
import { FaFacebookSquare } from "react-icons/fa";
import GlobalSearch from "../../../components/GlobalSearch";

const MerchantApp = () => {
  const [formData, setFormData] = useState({
    phoneno: false,
    email: false,
    emailverify: false,
    otpverify: false,
    otp: false,
    google: false,
    ios: false,
    facebook: false,
  });
  const submitAction = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const onChange = (name, checked) => {
    setFormData({ ...formData, [name]: checked });
  };

  const [notificationFile, setNotificationFile] = useState(null);
  const [notificationPreviewURL, setNotificationPreviewURL] = useState(null);

  const handleNotificationImageChange = (e) => {
    const file = e.target.files[0];
    setNotificationFile(file);
    setNotificationPreviewURL(URL.createObjectURL(file));
  };

  return (
    <>
      <Sidebar />
      <div className="w-fit min-h-screen pl-[290px] bg-gray-100">
        <nav className="p-5"><GlobalSearch /></nav>
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
            {!notificationPreviewURL && (
              <div className="bg-cyan-50 shadow-md h-16 w-16 rounded-md " />
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
              name="notificationImage"
              id="notificationImage"
              className="hidden"
              onChange={handleNotificationImageChange}
            />
            <label htmlFor="notificationImage" className="cursor-pointer">
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
                    onChange={(checked) => onChange("phoneno", checked)}
                    name="phoneno"
                  />
                </div>
                <div className="flex items-center mt-5">
                  <label className="text-gray-500">Email</label>
                  <Switch
                    className="ml-20"
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
                    onChange={(checked) => onChange("emailverify", checked)}
                    name="emailverify"
                  />
                </div>
                <div className="flex items-center mt-5">
                  <label className="text-gray-500">OTP Verification</label>
                  <Switch
                    className="ml-12"
                    onChange={(checked) => onChange("otpverify", checked)}
                    name="otpverify"
                  />
                </div>
              </div>
              <div className="mt-3 mx-6">
                <h1>Login Via</h1>
                <div className="flex items-center mt-5 ">
                  <label className="text-gray-500">OTP</label>
                  <Switch
                    className="ml-20"
                    onChange={(checked) => onChange("otp", checked)}
                    name="otp"
                  />
                </div>
                <div className="flex items-center mt-5">
                  <FaGoogle className="text-gray-500 text-[25px]" />
                  <Switch
                    className="ml-[84px]"
                    onChange={(checked) => onChange("google", checked)}
                    name="google"
                  />
                </div>
                <div className="flex items-center mt-5">
                  <AiFillApple className="text-gray-500 text-[30px]" />
                  <Switch
                    className="ml-[80px]"
                    onChange={(checked) => onChange("ios", checked)}
                    name="ios"
                  />
                </div>
                <div className="flex items-center mt-5">
                  <FaFacebookSquare className="text-gray-500 text-[30px]" />
                  <Switch
                    className="ml-[80px]"
                    onChange={(checked) => onChange("facebook", checked)}
                    name="facebook"
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
