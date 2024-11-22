import { useContext, useEffect, useRef } from "react";
import GlobalSearch from "../../../components/GlobalSearch";
import { MdCameraAlt } from "react-icons/md";
import { useState } from "react";
import { Switch } from "antd";
import { GoogleOutlined, AppleFilled, FacebookFilled } from "@ant-design/icons";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import GIFLoader from "../../../components/GIFLoader";
import { useToast } from "@chakra-ui/react";
import BusinessCategory from "../../../components/CustomerApp/BusinessCategory";
import CustomOrder from "../../../components/CustomerApp/CustomOrder";
import PickAndDrop from "../../../components/CustomerApp/PickAndDrop";
import ServiceCategory from "../../../components/CustomerApp/ServiceCategory";
import CropImage from "../../../components/CropImage";
import DatePicker from "react-datepicker";
import Select from "react-select";

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
    customOrderCustomization: {
      startTime: "",
      endTime: "",
      taxId: null,
    },
    pickAndDropOrderCustomization: {
      startTime: "",
      endTime: "",
      taxId: null,
    },
  });

  const [allTax, setAllTax] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const { token, role } = useContext(UserContext);
  const navigate = useNavigate();
  const toast = useToast();
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState(null);
  const [isInnerVisible, setIsInnerVisible] = useState(false);
  const [img, setImg] = useState(null);
  const [croppedFile, setCroppedFile] = useState(null);

  useEffect(() => {
    if (!token || role !== "Admin") {
      navigate("/auth/login");
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(false);

        const [appCustomizationResponse, taxResponse] = await Promise.all([
          axios.get(`${BASE_URL}/admin/app-customization/customer-app`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BASE_URL}/admin/taxes/all-tax`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (appCustomizationResponse.status === 200) {
          console.log("Data", appCustomizationResponse.data);
          setCustomerData(appCustomizationResponse.data);
        }
        if (taxResponse.status === 200) {
          setAllTax(taxResponse.data.data);
        }
      } catch (err) {
        console.error(`Error in fetching data ${err.message}`);
      }
    };

    fetchData();
  }, []);

  const taxOptions = allTax?.map((tax) => ({
    label: tax.taxName,
    value: tax.taxId,
  }));

  const submitAction = async (e) => {
    e.preventDefault();

    try {
      setIsSaveLoading(true);

      const customerDataToSend = new FormData();

      // Append fields to FormData
      customerDataToSend.append("splashScreenImage", croppedFile || "");

      // Append primitive values
      customerDataToSend.append(
        "phoneNumber",
        customerData.phoneNumber.toString()
      );
      customerDataToSend.append("email", customerData.email.toString());
      customerDataToSend.append(
        "otpVerification",
        customerData.otpVerification.toString()
      );
      customerDataToSend.append(
        "loginViaApple",
        customerData.loginViaApple.toString()
      );
      customerDataToSend.append(
        "loginViaFacebook",
        customerData.loginViaFacebook.toString()
      );
      customerDataToSend.append(
        "loginViaGoogle",
        customerData.loginViaGoogle.toString()
      );
      customerDataToSend.append(
        "loginViaOtp",
        customerData.loginViaOtp.toString()
      );
      customerDataToSend.append(
        "emailVerification",
        customerData.emailVerification.toString()
      );

      // Serialize nested objects
      customerDataToSend.append(
        "customOrderCustomization",
        JSON.stringify(customerData.customOrderCustomization)
      );
      customerDataToSend.append(
        "pickAndDropOrderCustomization",
        JSON.stringify(customerData.pickAndDropOrderCustomization)
      );

      // Send the request
      const response = await axios.post(
        `${BASE_URL}/admin/app-customization/customer-app`,
        customerDataToSend,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Customer App updated successfully.",
          duration: 3000,
          status: "success",
          isClosable: true,
        });
      }
    } catch (err) {
      console.error("Error in updating customization:", err);
      toast({
        title: "Error",
        description: "Error in updating customization",
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

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      setIsInnerVisible(true);
      setCrop(null); // Makes crop preview update between images.
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
                {customerData?.splashScreenUrl && !croppedFile && (
                  <figure className="h-16 w-16 rounded-md  relative">
                    <img
                      src={customerData?.splashScreenUrl}
                      alt="profile"
                      className="w-full rounded h-full object-cover"
                    />
                  </figure>
                )}

                {!croppedFile && !customerData?.splashScreenUrl && (
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
                    className="bg-teal-800 ml-5 text-[30px] text-white p-4 h-16 w-16 rounded-md"
                    size={30}
                  />
                </label>
                {imgSrc && (
                  <CropImage
                    selectedImage={img}
                    aspectRatio={9 / 16}
                    onCropComplete={handleCropComplete}
                  />
                )}
              </div>
            </div>

            <div className="flex mx-5 mt-10 gap-10 pb-5">
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
                        checked={customerData?.phoneNumber}
                        onChange={(checked) => onChange("phoneNumber", checked)}
                        name="phoneNumber"
                      />
                    </div>
                    <div className="flex justify-between">
                      Email{" "}
                      <Switch
                        className="ml-14"
                        checked={customerData?.email}
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
                        checked={customerData?.emailVerification}
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
                        checked={customerData?.otpVerification}
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
                        checked={customerData?.loginViaOtp}
                        onChange={(checked) => onChange("loginViaOtp", checked)}
                        name="loginViaOtp"
                      />
                    </div>
                    <div>
                      <GoogleOutlined className="text-[30px]" />
                      <Switch
                        className="ml-[125px]"
                        checked={customerData?.loginViaGoogle}
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
                        checked={customerData?.loginViaApple}
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
                        checked={customerData?.loginViaFacebook}
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

            <div className="mt-10 flex mx-5">
              <h1 className="w-1/5">Manage Custom order timing</h1>
              <div className="w-4/5 flex-col justify-start">
                <p className="text-gray-500 mb-3">
                  The purpose of this time is to set the working time for custom
                  order.
                </p>

                <div className="flex flex-row items-center">
                  <DatePicker
                    selected={
                      customerData?.customOrderCustomization?.startTime
                        ? new Date(
                            `1970-01-01T${customerData.customOrderCustomization.startTime}`
                          )
                        : null
                    }
                    onChange={(time) => {
                      if (time) {
                        const formattedTime = time.toLocaleTimeString("en-CA", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        });

                        setCustomerData((prev) => ({
                          ...prev,
                          customOrderCustomization: {
                            ...prev.customOrderCustomization,
                            startTime: formattedTime, // Save the formatted time string
                          },
                        }));
                      }
                    }}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    placeholderText="Start time"
                    className="border-2 p-2 rounded-lg cursor-pointer outline-none focus:outline-none w-full"
                  />

                  <DatePicker
                    selected={
                      customerData?.customOrderCustomization?.endTime
                        ? new Date(
                            `1970-01-01T${customerData.customOrderCustomization.endTime}`
                          )
                        : null
                    }
                    onChange={(time) => {
                      if (time) {
                        const formattedTime = time.toLocaleTimeString("en-CA", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        });

                        setCustomerData((prev) => ({
                          ...prev,
                          customOrderCustomization: {
                            ...prev.customOrderCustomization,
                            endTime: formattedTime,
                          },
                        }));
                      }
                    }}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    placeholderText="End time"
                    className="border-2 p-2 rounded-lg cursor-pointer outline-none focus:outline-none w-fit ml-5"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 flex mx-5">
              <h1 className="w-1/5">Manage Custom order tax</h1>

              <Select
                options={taxOptions}
                value={taxOptions.find(
                  (option) =>
                    option.value === customerData.customOrderCustomization.taxId
                )}
                onChange={(option) => {
                  setCustomerData((prev) => ({
                    ...prev,
                    customOrderCustomization: {
                      ...prev.customOrderCustomization,
                      taxId: option.value,
                    },
                  }));
                }}
                isSearchable
                isMulti={false}
                className="w-[20%]"
              />
            </div>

            <div className="mt-10 flex mx-5">
              <h1 className="w-1/5">Manage Pick and Drop timing</h1>
              <div className="w-4/5 flex-col">
                <p className="text-gray-500 mb-3">
                  The purpose of this time is to set the working time for Pick
                  and Drop.
                </p>

                <div className="flex flex-row items-center">
                  <DatePicker
                    selected={
                      customerData?.pickAndDropOrderCustomization?.startTime
                        ? new Date(
                            `1970-01-01T${customerData.pickAndDropOrderCustomization.startTime}`
                          )
                        : null
                    }
                    onChange={(time) => {
                      if (time) {
                        const formattedTime = time.toLocaleTimeString("en-CA", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        });

                        setCustomerData((prev) => ({
                          ...prev,
                          pickAndDropOrderCustomization: {
                            ...prev.pickAndDropOrderCustomization,
                            startTime: formattedTime, // Save the formatted time string
                          },
                        }));
                      }
                    }}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    placeholderText="Start time"
                    className="border-2 p-2 rounded-lg cursor-pointer outline-none focus:outline-none w-full"
                  />

                  <DatePicker
                    selected={
                      customerData?.pickAndDropOrderCustomization?.endTime
                        ? new Date(
                            `1970-01-01T${customerData.pickAndDropOrderCustomization.endTime}`
                          )
                        : null
                    }
                    onChange={(time) => {
                      if (time) {
                        const formattedTime = time.toLocaleTimeString("en-CA", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        });

                        setCustomerData((prev) => ({
                          ...prev,
                          pickAndDropOrderCustomization: {
                            ...prev.pickAndDropOrderCustomization,
                            endTime: formattedTime,
                          },
                        }));
                      }
                    }}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    placeholderText="End time"
                    className="border-2 p-2 rounded-lg cursor-pointer outline-none focus:outline-none w-fit ml-5"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 flex mx-5">
              <h1 className="w-1/5">
                Manage Pick and Drop Order <br /> tax
              </h1>

              <Select
                options={taxOptions}
                value={taxOptions.find(
                  (option) =>
                    option.value ===
                    customerData.pickAndDropOrderCustomization.taxId
                )}
                onChange={(option) => {
                  setCustomerData((prev) => ({
                    ...prev,
                    pickAndDropOrderCustomization: {
                      ...prev.pickAndDropOrderCustomization,
                      taxId: option.value,
                    },
                  }));
                }}
                isSearchable
                isMulti={false}
                className="w-[20%]"
              />
            </div>

            <div className="flex justify-end p-10 gap-4 border-b-2 border-gray-200">
              <button
                className="bg-teal-800 rounded-lg px-6 py-2 text-white font-semibold justify-end"
                onClick={submitAction}
                type="submit"
              >
                {isSaveLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>

            <ServiceCategory />

            <BusinessCategory />

            <CustomOrder />

            <PickAndDrop />
          </div>
        </>
      )}
    </div>
  );
};

export default CustomerApp;
