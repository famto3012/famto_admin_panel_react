import { useContext, useEffect, useState } from "react";
import BlockIcon from "@mui/icons-material/Block";
import { MdOutlineModeEditOutline, MdCameraAlt } from "react-icons/md";
import Sidebar from "../../../components/Sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import GlobalSearch from "../../../components/GlobalSearch";
import { Switch } from "antd";
import EditMerchant from "../../../components/model/Merchant/EditMerchant";
import RatingModal from "../../../components/model/Merchant/RatingModal";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const MerchantDetails = () => {
  const [merchantData, setMerchantData] = useState({});
  const [allGeofence, setAllGeofence] = useState([]);
  const [allBusinessCategory, setBusinessCategory] = useState([]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editMerchantId, setEditMerchantId] = useState(null);

  const [showRatingModal, setShowRatingModal] = useState(false);

  const [previewURL, setPreviewURL] = useState({
    merchantPreviewURL: "",
    pancardPreviewURL: "",
    gstPreviewURL: "",
    fssaiPreviewURL: "",
    aadharPreviewURL: "",
  });

  const navigate = useNavigate();
  const { token, role } = useContext(UserContext);
  const { merchantId } = useParams();
  const toast = useToast();

  useEffect(() => {
    if (!token || role !== "Admin") {
      navigate("/auth/login");
    }

    const getMerchantData = async () => {
      try {
        const [merchantResponse, geofenceResponse, businessCategoryResponse] =
          await Promise.all([
            axios.get(`${BASE_URL}/merchants/admin/${merchantId}`, {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
            axios.get(`${BASE_URL}/admin/geofence/get-geofence`, {
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(
              `${BASE_URL}/admin/business-categories/get-all-business-category`,
              {
                withCredentials: true,
                headers: { Authorization: `Bearer ${token}` },
              }
            ),
          ]);

        if (merchantResponse.status === 200) {
          setMerchantData(merchantResponse.data.data);
        }
        if (geofenceResponse.status === 200) {
          setAllGeofence(geofenceResponse.data.geofences);
        }
        if (businessCategoryResponse.status === 200) {
          setBusinessCategory(businessCategoryResponse.data.data);
        }
      } catch (err) {
        console.log(`Error in getting merchant data: ${err}`);
        toast({
          title: "Error",
          description: `Error in getting merchant data`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
      }
    };

    getMerchantData();
  }, [merchantId, token, role]);

  const toggleEditModal = () => {
    setShowEditModal(!showEditModal);
  };

  const toggleRatingModal = () => {
    setShowRatingModal(!showRatingModal);
  };

  // const handlePlanChange = (e) => {
  //   setMerchantData({ sponsorshipDetail: e.target.value });
  // };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    const [day, type] = name.split(".");

    setMerchantData((prevState) => ({
      ...prevState,
      merchantDetail: {
        ...prevState.merchantDetail,
        [name]: value,
        availability: {
          ...prevState.merchantDetail.availability,
          specificDays: {
            ...prevState.merchantDetail.availability.specificDays,
            [day]: {
              ...prevState.merchantDetail.availability.specificDays[day],
              openAllDay: type === "openAllDay" ? checked : false,
              closedAllDay: type === "closedAllDay" ? checked : false,
              specificTime: type === "specificTime" ? checked : false,
            },
          },
        },
      },
    }));
  };

  const handleChangeTime = (event) => {
    const { name, value } = event.target;
    const [day, timeType] = name.split(".");

    setMerchantData((prevState) => ({
      ...prevState,
      merchantDetail: {
        ...prevState.merchantDetail,
        availability: {
          ...prevState.merchantDetail.availability,
          specificDays: {
            ...prevState.merchantDetail.availability.specificDays,
            [day]: {
              ...prevState.merchantDetail.availability.specificDays[day],
              [timeType]: value,
            },
          },
        },
      },
    }));
  };

  const handleSaveMerchant = async (e) => {
    e.preventDefault();
    try {
      console.log(merchantData);
    } catch (err) {
      console.log(`Erorr in saving merchant data: ${err}`);
    } finally {
    }
  };

  return (
    <>
      <Sidebar />

      <main className="p-6 bg-gray-100 pl-[300px] h-full">
        <GlobalSearch />
        <div className="flex justify-between my-[15px] mt-8 mb-8">
          <h3 className="font-[600] text-[18px] ms-3">Merchant name</h3>
          <div>
            <Link className="bg-yellow-100 py-2 px-5 p-1 mr-5 rounded-xl">
              <BlockIcon className="w-2 h-2 text-red-600" /> Block
            </Link>
            Status
            <Switch
              value={merchantData?.status}
              className="text-teal-700 ml-2"
            />
          </div>
        </div>

        <form
          className="bg-white shadow-md rounded-lg ms-3 p-3 w-full overflow-auto"
          onSubmit={handleSaveMerchant}
        >
          {/* <div className="grid grid-cols-2 xl:grid-cols-4 gap-2">
            <div className="flex flex-col ">
              <div className="mb-4 flex items-center justify-between">
                <label className="text-red-500 font-[600]">ID</label>
                <input
                  type="text"
                  className=" outline-none focus:outline-none p-[10px] bg-transparent rounded text-red-600 placeholder:text-red-600"
                  disabled
                  value={merchantData._id}
                />
              </div>

              <div className="mb-4 flex items-center justify-between">
                <label className="block text-gray-700">Merchant name*</label>
                <input
                  type="text"
                  name="fullName"
                  className=" outline-none focus:outline-none border border-[#333]/10 p-[10px] rounded"
                  placeholder="Merchant name"
                  value={merchantData?.merchantDetail?.merchantName}
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
                  value={merchantData?.merchantDetail?.displayAddress}
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
                  value={merchantData.fullName}
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
                  value={merchantData.email}
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
                  value={merchantData.phoneNumber}
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
                  value={merchantData.isApproved}
                />
              </div>
            </div>

            <div className="flex flex-col items-center">
              {!previewURL.merchantPreviewURL &&
                !merchantData?.merchantDetail?.merchantImageURL && (
                  <div className="bg-gray-400 h-20 w-20 rounded-md relative">
                    <label
                      htmlFor="merchantImage"
                      className="cursor-pointer absolute bottom-0 right-0"
                    >
                      <MdCameraAlt
                        className="bg-teal-500 text-white p-1 rounded-br-md"
                        size={20}
                      />
                    </label>
                  </div>
                )}

              {previewURL?.merchantPreviewURL && (
                <figure className="w-20 h-20 rounded relative">
                  <img
                    src={previewURL?.merchantPreviewURL}
                    alt="profile"
                    className="w-full h-full rounded object-cover"
                  />
                  <label
                    htmlFor="merchantImage"
                    className="cursor-pointer absolute bottom-0 right-0"
                  >
                    <MdCameraAlt
                      className="bg-teal-500 text-white p-1 rounded-br-md"
                      size={20}
                    />
                  </label>
                </figure>
              )}

              {merchantData?.merchantDetail?.merchantImageURL && (
                <figure className="w-20 h-20 rounded relative">
                  <img
                    src={merchantData?.merchantDetail?.merchantImageURL}
                    alt="profile"
                    className="w-full h-full rounded object-cover"
                  />
                  <label
                    htmlFor="merchantImage"
                    className="cursor-pointer absolute bottom-0 right-0"
                  >
                    <MdCameraAlt
                      className="bg-teal-500 text-white p-1 rounded-br-md"
                      size={20}
                    />
                  </label>
                </figure>
              )}

              <input
                type="file"
                name="merchantImage"
                id="merchantImage"
                className="hidden"
                onChange={""}
              />
            </div>

            <button
              onClick={() => setEditMerchantId(merchantData._id)}
              className="bg-teal-600 w-fit h-fit py-2 px-1.5 rounded text-white flex items-center gap-[10px]"
            >
              <MdOutlineModeEditOutline className="" />
              Edit Merchant
            </button>
            <EditMerchant
              isVisible={showEditModal}
              toggleModal={toggleEditModal}
              BASE_URL={BASE_URL}
              token={token}
            />
          </div> */}

          {/* <div className=" max-w-[700px] mt-14 mb-[50px]">
            <div className="mb-[20px] flex items-center justify-between gap-[30px]">
              <label className=" text-gray-700 text-[16px]">
                Short Description <br /> (Max 10 characters)
              </label>
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={merchantData?.merchantDetail?.description}
                className="w-[20rem] border rounded-md p-2"
                onChange={handleChange}
              />
            </div>

            <div className="mb-[20px] flex items-center justify-between gap-[30px]">
              <label className="text-gray-700 text-[16px]">Geofence</label>
              <select
                name="geoFence"
                value={merchantData?.merchantDetail?.geofenceId}
                onChange={handleChange}
                className="mt-2 p-2  w-[20rem] border rounded-md outline-none focus:outline-none"
              >
                <option defaultValue={"Select geofence"}>
                  Select geofence
                </option>
                {allGeofence?.map((geofence) => (
                  <option value={geofence._id}>{geofence.name}</option>
                ))}
              </select>
            </div>

            <div className="mb-[20px] flex items-center justify-between gap-[30px]">
              <label className=" text-gray-700 text-[16px]">Pricing</label>
              <input
                disabled
                type="text"
                name="pricing"
                placeholder="Pricing"
                value={merchantData?.merchantDetail?.pricing}
                className="w-[20rem] bg-transparent rounded-md p-2"
              />
            </div>

            <div className="mb-[20px] flex items-center justify-between gap-[30px]">
              <label className="text-gray-700 ">Location</label>
              <input
                type="text"
                name="location"
                value={merchantData?.merchantDetail?.location}
                onChange={handleChange}
                className=" p-2  w-[20rem] border rounded-md"
              />
            </div>

            <div className="mb-[20px] w-[600px] flex items-center justify-between gap-[30px]">
              <label className="text-gray-700 ">Ratings</label>
              <button
                type="button"
                onClick={toggleRatingModal}
                className="bg-teal-700 text-white p-2 rounded-md w-[20rem]"
              >
                Show ratings and reviews
              </button>
              <RatingModal
                isVisible={showRatingModal}
                toggleModal={toggleRatingModal}
                data={merchantData?.merchantDetail?.ratingByCustomers}
              />
            </div>
          </div> */}

          {/* <div className="mb-[50px] w-full">
            <h3 className="text-gray-700 font-bold mb-2">Documents provided</h3>

            <div className="flex justify-between items-center my-[20px] max-w-[700px]">
              <label className=" text-gray-700 text-[16px]">Pan card</label>
              <input
                type="text"
                name="pancardNumber"
                value={merchantData?.merchantDetail?.pancardNumber}
                onChange={handleChange}
                className="p-2 border rounded-md w-[20rem] mx-[40px]"
              />
              <div className=" flex items-center gap-[30px]">
                {!previewURL?.pancardPreviewURL &&
                  !merchantData?.merchantDetail?.pancardImageURL && (
                    <div className="bg-gray-400 h-20 w-20 rounded-md" />
                  )}

                {previewURL?.pancardPreviewURL &&
                  !merchantData?.merchantDetail?.pancardImageURL && (
                    <figure className="w-20 h-20 rounded relative">
                      <img
                        src={previewURL?.pancardPreviewURL}
                        alt="profile"
                        className="w-full rounded h-full object-cover "
                      />
                    </figure>
                  )}

                {merchantData?.merchantDetail?.pancardImageURL && (
                  <figure className="w-20 h-20 rounded relative">
                    <img
                      src={merchantData?.merchantDetail?.pancardImageURL}
                      alt="pancard"
                      className="w-full rounded h-full object-cover "
                    />
                  </figure>
                )}

                <input
                  type="file"
                  name="pancardImage"
                  id="pancardImage"
                  className="hidden"
                  onChange={""}
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
                value={merchantData?.merchantDetail?.GSTINNumber}
                onChange={handleChange}
                className="p-2 border rounded-md w-[20rem] mx-[40px]"
              />
              <div className=" flex items-center gap-[30px]">
                {!previewURL?.gstPreviewURL &&
                  !merchantData?.merchantDetail?.GSTINImageURL && (
                    <div className="bg-gray-400 h-20 w-20 rounded-md" />
                  )}

                {previewURL?.gstPreviewURL && (
                  <figure className="w-20 h-20 rounded relative">
                    <img
                      src={previewURL?.gstPreviewURL}
                      alt="profile"
                      className="w-full rounded h-full object-cover "
                    />
                  </figure>
                )}

                {!previewURL?.gstPreviewURL &&
                  merchantData?.merchantDetail?.GSTINImageURL && (
                    <figure className="w-20 h-20 rounded relative">
                      <img
                        src={merchantData?.merchantDetail?.GSTINImageURL}
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
                  onChange={""}
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
                value={merchantData?.merchantDetail?.FSSAINumber}
                onChange={handleChange}
                className="p-2 border rounded-md w-[20rem] mx-[40px]"
              />
              <div className=" flex items-center gap-[30px]">
                {!previewURL?.fssaiPreviewURL &&
                  !merchantData?.merchantDetail?.FSSAIImageURL && (
                    <div className="bg-gray-400 h-20 w-20 rounded-md" />
                  )}

                {previewURL?.fssaiPreviewURL &&
                  !merchantData?.merchantDetail?.FSSAIImageURL && (
                    <figure className="w-20 h-20 rounded relative">
                      <img
                        src={previewURL?.fssaiPreviewURL}
                        alt="profile"
                        className="w-full rounded h-full object-cover "
                      />
                    </figure>
                  )}

                {!previewURL?.fssaiPreviewURL &&
                  merchantData?.merchantDetail?.FSSAIImageURL && (
                    <figure className="w-20 h-20 rounded relative">
                      <img
                        src={merchantData?.merchantDetail?.FSSAIImageURL}
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
                  onChange={""}
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
                value={merchantData?.merchantDetail?.aadharNumber}
                onChange={handleChange}
                className="p-2 border rounded-md w-[20rem] mx-[40px]"
              />
              <div className=" flex items-center gap-[30px]">
                {!previewURL?.aadharPreviewURL &&
                  !merchantData?.merchantDetail?.aadharImageURL && (
                    <div className="bg-gray-400 h-20 w-20 rounded-md" />
                  )}

                {previewURL?.aadharPreviewURL &&
                  !merchantData?.merchantDetail?.aadharImageURL && (
                    <figure className="w-20 h-20 rounded relative">
                      <img
                        src={previewURL?.aadharPreviewURL}
                        alt="profile"
                        className="w-full rounded h-full object-cover "
                      />
                    </figure>
                  )}

                {!previewURL?.aadharPreviewURL &&
                  merchantData?.merchantDetail?.aadharImageURL && (
                    <figure className="w-20 h-20 rounded relative">
                      <img
                        src={merchantData?.merchantDetail?.aadharImageURL}
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
                  onChange={""}
                />

                <label htmlFor="AadharImage" className="cursor-pointer ">
                  <MdCameraAlt
                    className=" bg-teal-500 text-[40px] text-white p-2 h-[40px] w-[40px] rounded"
                    size={30}
                  />
                </label>
              </div>
            </div>
          </div> */}

          <div className="mb-6">
            <h3 className="text-gray-700 font-bold mb-2">Configuration</h3>

            <div className="mb-4 flex">
              <label className="block mt-3 text-gray-700">
                Business category
              </label>
              <select
                name="businessCategoryId"
                value={merchantData?.merchantDetail?.businessCategoryId}
                onChange={handleChangeInput}
                className="mt-2 p-2 ml-[11.5rem] w-[20rem] border rounded-md outline-none focus:outline-none"
              >
                <option defaultValue={"Select business category"} hidden>
                  Select business category
                </option>
                {allBusinessCategory?.map((category) => (
                  <option value={category._id}>{category.title}</option>
                ))}
              </select>
            </div>

            <div className="mb-4 flex ">
              <label className="block text-gray-700">If restaurant, then</label>
              <div className="flex items-center gap-[4rem]">
                <label className="mr-4 ml-[12.5rem] cursor-pointer">
                  <input
                    type="radio"
                    name="merchantFoodType"
                    value="Veg"
                    checked={
                      merchantData?.merchantDetail?.merchantFoodType === "Veg"
                    }
                    onChange={handleChangeInput}
                    className="mr-2  text-teal-600 focus:ring-teal-500"
                  />{" "}
                  Veg
                </label>
                <label className="mr-4 cursor-pointer">
                  <input
                    type="radio"
                    name="merchantFoodType"
                    value="Non-veg"
                    checked={
                      merchantData?.merchantDetail?.merchantFoodType ===
                      "Non-veg"
                    }
                    onChange={handleChangeInput}
                    className="mr-2  text-teal-600 focus:ring-teal-500"
                  />{" "}
                  Non-Veg
                </label>
                <label className="mr-4 cursor-pointer">
                  <input
                    type="radio"
                    name="merchantFoodType"
                    value="Both"
                    checked={
                      merchantData?.merchantDetail?.merchantFoodType === "Both"
                    }
                    onChange={handleChangeInput}
                    className="mr-2 text-teal-600 focus:ring-teal-500"
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
                value={merchantData?.merchantDetail?.deliveryTime}
                onChange={handleChangeInput}
                className="mt-2 ml-[11.5rem] p-2 w-[20rem] border rounded-md outline-none focus:outline-none"
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

              <Switch
                name="preOrderStatus"
                value={merchantData?.merchantDetail?.preOrderStatus}
                checked={merchantData?.merchantDetail?.preOrderStatus}
                onChange={handleChangeInput}
                className="mt-5 ml-[11.5rem] "
              />
            </div>
          </div>

          <div className="mb-6 flex">
            <h3 className="text-black mb-2 flex">Serving Area</h3>
            <div className="mb-4 ">
              <div className="grid ml-[15rem] gap-3">
                <label className="mr-4 text-gray-700 text-[14px] cursor-pointer">
                  <input
                    type="radio"
                    name="servingArea"
                    value="No-restrictions"
                    checked={
                      merchantData?.merchantDetail?.servingArea ===
                      "No-restrictions"
                    }
                    onChange={handleChangeInput}
                    className="mr-2 form-radio text-teal-600 focus:ring-teal-500"
                  />{" "}
                  No Serving restrictions (I serve everywhere)
                </label>
                <label className="mr-6 text-gray-700 w-[20rem] text-[14px] flex-col space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="servingArea"
                    value="Mention-radius"
                    checked={
                      merchantData?.merchantDetail?.servingArea ===
                      "Mention-radius"
                    }
                    onChange={handleChangeInput}
                    className="mr-2 form-radio text-teal-600 focus:ring-teal-500"
                  />{" "}
                  Mention a radius around the central location of my merchant.
                  Your store will serve within a this radius around your central
                  location. Note: Serving radius 0 means that the Restaurant can
                  serve anywhere.
                </label>
              </div>
              {merchantData?.merchantDetail?.servingArea ===
                "Mention-radius" && (
                <input
                  type="text"
                  name="servingRadius"
                  value={merchantData?.merchantDetail?.servingRadius}
                  onChange={handleChangeInput}
                  className="mt-6 ml-[15rem] p-2 w-[20rem] border rounded-md"
                  placeholder="Serving Radius (in km)"
                />
              )}
            </div>
          </div>

          {/* <div className="mb-6 flex">
            <div className="flex">
              <h3 className="text-gray-700 mb-2 mt-3 ">Sponsorship Status</h3>
              <div className="mb-4 w-[20rem] p-5 justify-center ml-[12rem] shadow-lg">
                <label className="block text-gray-700">
                  Current Chosen Plan
                </label>
                <p className="text-gray-500">
                  {merchantData.sponsorshipDetail}
                </p>
              </div>
            </div>
          </div> */}

          {/* <div className="mb-6 flex">
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
                      checked={merchantData.sponsorshipDetail === plan.value}
                      onChange={handlePlanChange}
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
          </div> */}

          <div className="mb-6 flex mt-10">
            <h3 className="text-gray-700 font-bold mb-2">
              Time wise availability
            </h3>
            <div className="mb-4">
              <div className="flex items-center justify-center ml-[11rem] gap-16">
                <label className="mr-4 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value={merchantData?.merchantDetail?.availability?.type}
                    checked={
                      merchantData?.merchantDetail?.availability?.type ===
                      "Full-time"
                    }
                    onChange={handleChangeInput}
                  />{" "}
                  Full time
                </label>
                <label className="mr-4 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value={merchantData?.merchantDetail?.availability?.type}
                    checked={
                      merchantData?.merchantDetail?.availability?.type ===
                      "Specific-time"
                    }
                    onChange={handleChangeInput}
                  />{" "}
                  Specific time
                </label>
              </div>
            </div>
          </div>

          {merchantData?.merchantDetail?.availability?.type ===
            "Specific-time" && (
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
                  {Object.keys(
                    merchantData?.merchantDetail?.availability?.specificDays
                  ).map((day, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 capitalize">{day}</td>
                      <td className="py-2 px-4 text-center">
                        <input
                          type="radio"
                          name={`${day}.openAllDay`}
                          value={
                            merchantData?.merchantDetail?.availability
                              ?.specificDays?.[day]?.openAllDay
                          }
                          checked={
                            merchantData?.merchantDetail?.availability
                              ?.specificDays?.[day]?.openAllDay || false
                          }
                          onChange={handleChangeInput}
                          className="mr-2"
                        />
                      </td>
                      <td className="py-2 px-4 text-center">
                        <input
                          type="radio"
                          name={`${day}.closedAllDay`}
                          value={
                            merchantData?.merchantDetail?.availability
                              ?.specificDays?.[day]?.closedAllDay
                          }
                          checked={
                            merchantData?.merchantDetail?.availability
                              ?.specificDays?.[day]?.closedAllDay || false
                          }
                          onChange={handleChangeInput}
                          className="mr-2"
                        />
                      </td>
                      <td className="py-2 px-4 text-center">
                        <input
                          type="radio"
                          name={`${day}.specificTime`}
                          value={
                            merchantData?.merchantDetail?.availability
                              ?.specificDays?.[day]?.specificTime
                          }
                          checked={
                            merchantData?.merchantDetail?.availability
                              ?.specificDays?.[day]?.specificTime || false
                          }
                          onChange={handleChangeInput}
                          className="mr-2"
                        />
                      </td>

                      {merchantData?.merchantDetail?.availability
                        ?.specificDays?.[day]?.specificTime && (
                        <>
                          <td>
                            <input
                              type="time"
                              name={`merchantData.merchantDetail.availability.specificDays.${day}.startTime`}
                              value={
                                merchantData?.merchantDetail?.availability
                                  ?.specificDays?.[day]?.startTime || ""
                              }
                              onChange={handleChangeTime}
                              class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:outline-none block w-full p-2.5"
                            />
                          </td>
                          <td>
                            <input
                              type="time"
                              name={`merchantData.merchantDetail.availability.specificDays.${day}.endTime`}
                              value={
                                merchantData?.merchantDetail?.availability
                                  ?.specificDays?.[day]?.endTime || ""
                              }
                              onChange={handleChangeTime}
                              class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:outline-none block w-full p-2.5"
                            />
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex justify-end items-center gap-3 mt-8 mb-5">
            <button
              type="button"
              className="bg-gray-300 px-10 py-3 rounded-md font-[500] hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-teal-700 text-white px-10 py-3 rounded-md font-[500] hover:bg-teal-600"
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
