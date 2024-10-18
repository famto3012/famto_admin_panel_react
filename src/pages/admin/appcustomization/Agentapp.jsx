import { BellOutlined, SearchOutlined } from "@ant-design/icons";
import React, { useContext, useEffect, useRef, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { MdCameraAlt } from "react-icons/md";
import { Switch } from "antd";
import { FaGoogle } from "react-icons/fa";
import { AiFillApple } from "react-icons/ai";
import { FaFacebookSquare } from "react-icons/fa";
import GlobalSearch from "../../../components/GlobalSearch";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import GIFLoader from "../../../components/GIFLoader";
import CropImage from "../../../components/CropImage";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const Agentapp = () => {
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
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { token, role } = useContext(UserContext);
  const toast = useToast();
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState(null);
  const [isInnerVisible, setIsInnerVisible] = useState(false);
  const [img, setImg] = useState(null);
  const [croppedFile, setCroppedFile] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${BASE_URL}/admin/app-customization/agent-app`,
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

  const submitAction = async (e) => {
    e.preventDefault();
    try {
      setConfirmLoading(true);
      const dataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (Array.isArray(formData[key])) {
          formData[key].forEach((item) => {
            dataToSend.append(key, item);
          });
        } else {
          dataToSend.append(key, formData[key]);
        }
      });

      if (croppedFile) {
        dataToSend.append("splashScreenImage", croppedFile);
      }
      const addDataResponse = await axios.post(
        `${BASE_URL}/admin/app-customization/agent-app`,
        dataToSend,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (addDataResponse.status === 200) {
        setFormData(addDataResponse.data.data);
        setNotificationPreviewURL(null);
        setNotificationFile(null);
        toast({
          title: "Success",
          description: "Agent App Updated Successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(`Error in fetch datas : ${err}`);
      toast({
        title: "Error",
        description: "There was an error occured",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setConfirmLoading(false);
    }
  };

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      setIsInnerVisible(true);
      setCrop(null);
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
      setImg(e.target.files[0]);
    }
  }

  const handleCropComplete = (croppedFile) => setCroppedFile(croppedFile);

  return (
    <div>
      {isLoading ? (
        <GIFLoader />
      ) : (
        <>
          <Sidebar />
          <div className="w-fit pl-[290px] h-screen bg-gray-100 ">
            <nav className="p-5">
              <GlobalSearch />
            </nav>
            <div>
              <h1 className="text-lg font-bold mt-7 mx-11">Agent App</h1>
            </div>
            <div className="flex items-center justify-between mt-7 border-b-2 border-gray-300 pb-10">
              <h1 className="mx-10">Splash screen (390px x 844px)</h1>
              <p className="text-gray-500 ">
                Note: The purpose is to wish or design the splash page. The
                format can image or gif{" "}
                <span className="flex justify-start">
                  {" "}
                  Note: Design according to aspect ratio{" "}
                </span>
              </p>

              <div className="flex items-center ml-14 gap-[30px] mx-10">
                {formData?.splashScreenUrl && !croppedFile && (
                  <figure className="h-16 w-16 rounded-md  relative">
                    <img
                      src={formData?.splashScreenUrl}
                      alt="profile"
                      className="w-full rounded h-full object-cover"
                    />
                  </figure>
                )}
                {!croppedFile && !formData?.splashScreenUrl && (
                  <div className="h-[66px] w-[66px] bg-gray-200 rounded-md"></div>
                )}
                {!!croppedFile && (
                  <>
                    <div>
                      <img
                        ref={previewCanvasRef}
                        src={URL.createObjectURL(croppedFile)}
                        style={{
                          border: "1px solid white",
                          borderRadius: "5px",
                          objectFit: "cover",
                          width: "66px",
                          height: "66px",
                        }}
                      />
                    </div>
                  </>
                )}
                <input
                  type="file"
                  name="splashScreenImage"
                  id="splashScreenImage"
                  className="hidden"
                  accept="image/*"
                  onChange={onSelectFile}
                />
                <label htmlFor="splashScreenImage" className="cursor-pointer">
                  <MdCameraAlt
                    className="bg-teal-800 text-[30px] text-white p-4 h-16 w-16 rounded-md"
                    size={30}
                  />
                </label>
                {imgSrc && (
                  <CropImage
                    selectedImage={img}
                    aspectRatio={9 / 16} // Optional, set aspect ratio (1:1 here)
                    onCropComplete={handleCropComplete}
                    onClose={handleModalClose} // Pass the handler to close the modal and reset the state
                  />
                )}
              </div>
            </div>

            <div className="flex justify-between mt-10 mx-10">
              <h1 className="w-[350px]">Sign up and Sign in settings</h1>
              <div className="flex flex-col ">
                <div className="text-gray-500 mx-[165px] ">
                  Control sign-up of agent on your platform. Here you are given
                  with a variety of options such as whether to have email
                  orphone number as mandatory fields on the sign-up form, how do
                  you want to verify the agent: via Email verification or OTP
                  verification and which social platform you want to enable
                  through which agent can sign up on your platform.
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
                      <label className="text-gray-500">
                        Email Verification
                      </label>
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
                        onChange={(checked) =>
                          onChange("otpVerification", checked)
                        }
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
                        onChange={(checked) =>
                          onChange("loginViaGoogle", checked)
                        }
                        name="loginViaGoogle"
                      />
                    </div>
                    <div className="flex items-center mt-5">
                      <AiFillApple className="text-gray-500 text-[30px]" />
                      <Switch
                        className="ml-[80px]"
                        checked={formData.loginViaApple}
                        onChange={(checked) =>
                          onChange("loginViaApple", checked)
                        }
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

            {/* <div className="flex justify-between mt-16 border-t-2 border-gray-200 pt-10">
              <h1 className="mx-10">Agent login restriction</h1>
              <p className="text-gray-500 mr-[70px]">
                Enable this, to restrict Agent from accessing the platform
                without logging in into the{" "}
                <span className="flex justtify-start">
                  platform. (Make sure your apps are updated).
                </span>
              </p>
              <div className="mx-10">
                <Switch />
              </div>
            </div> */}

            <div className="flex justify-end gap-4 mt-14 px-10 bg-gray-100">
              <button
                className="bg-teal-800 text-white py-2 px-4 rounded-md my-10"
                type="submit"
                onClick={submitAction}
              >
                {confirmLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Agentapp;
