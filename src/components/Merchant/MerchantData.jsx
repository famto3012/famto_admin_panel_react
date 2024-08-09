import { useState } from "react";
import RatingModal from "../model/Merchant/RatingModal";
import EditMerchant from "../model/Merchant/EditMerchant";
import { MdOutlineModeEditOutline, MdCameraAlt } from "react-icons/md";
import MapModal from "../Order/MapModal";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

const MerchantData = ({
  detail,
  allGeofence,
  BASE_URL,
  token,
  merchantId,
  onDataChange,
}) => {
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);

  const [previewURL, setPreviewURL] = useState("");

  const toggleRatingModal = () => setShowRatingModal(!showRatingModal);
  const toggleEditModal = () => setShowEditModal(!showEditModal);
  const toggleMapModal = () => setShowMapModal(!showMapModal);

  const handleSelectImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setPreviewURL(URL.createObjectURL(file));
    onDataChange({ merchantImage: file });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onDataChange({
      ...detail,
      [name]: value,
      merchantDetail: {
        ...detail.merchantDetail,
        [name]: value,
      },
    });
  };

  const handlePrintLocation = (coordinates) => {
    console.log(coordinates);
    onDataChange({
      merchantDetail: {
        ...detail.merchantDetail,
        location: [coordinates.latitude, coordinates.longitude],
      },
    });
  };

  return (
    <>
      <div className="grid grid-cols-2 xl:grid-cols-6 gap-2">
        <div className="flex flex-col col-span-2">
          <div className="mb-4 flex items-center gap-[10px] w-[370px]">
            <label className="text-red-500 font-[600] w-1/3">ID</label>
            <input
              type="text"
              className="outline-none focus:outline-none p-[10px] bg-transparent rounded text-red-600 placeholder:text-red-600"
              disabled
              value={detail._id}
            />
          </div>

          <div className="mb-4 flex items-center gap-[10px] w-[370px]">
            <label className="block text-gray-700 w-1/3">Merchant name*</label>
            <input
              type="text"
              name="merchantName"
              className="merchantDetail-input"
              placeholder="Merchant name"
              spellCheck={false}
              value={detail?.merchantDetail?.merchantName}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4 flex items-center gap-[10px] w-[370px]">
            <label className="block text-gray-700 w-1/3">
              Display address*
            </label>
            <input
              type="text"
              name="displayAddress"
              className="merchantDetail-input"
              placeholder="Merchant Adress"
              spellCheck={false}
              value={detail?.merchantDetail?.displayAddress}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4 flex items-center gap-[10px] w-[370px]">
            <label className="block text-gray-700 w-1/3">Name of owner*</label>
            <input
              type="text"
              name="fullName"
              className="merchantDetail-input"
              placeholder="Full name of Owner"
              spellCheck={false}
              value={detail.fullName}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex flex-col col-span-2">
          <div className="mb-4 flex items-center gap-[10px] w-[370px] ">
            <label className="block text-gray-700 w-1/3">Email</label>
            <input
              type="text"
              name="email"
              className="merchantDetail-input"
              placeholder="Merchant name"
              value={detail.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4 flex items-center gap-[10px] w-[370px]">
            <label className="block text-gray-700 w-1/3">Phone</label>
            <input
              type="tel"
              name="phoneNumber"
              className="merchantDetail-input"
              placeholder="Merchant name"
              value={detail.phoneNumber}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4 flex items-center gap-[10px] w-[370px]">
            <label className="block text-gray-700 w-1/3 ">
              Registration status
            </label>
            <input
              type="text"
              className={`${
                detail?.isApproved === `Approved`
                  ? `text-green-600`
                  : detail?.isApproved === `Pending`
                  ? ` text-orange-600`
                  : ``
              }outline-none focus:outline-none p-[10px] bg-transparent rounded w-2/3`}
              disabled
              value={detail.isApproved}
            />
          </div>
        </div>

        <div className="flex flex-col items-center">
          {!previewURL && !detail?.merchantDetail?.merchantImageURL && (
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

          {previewURL && (
            <figure className="w-20 h-20 rounded relative">
              <img
                src={previewURL}
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

          {!previewURL && detail?.merchantDetail?.merchantImageURL && (
            <figure className="w-20 h-20 rounded relative">
              <img
                src={detail?.merchantDetail?.merchantImageURL}
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
            onChange={handleSelectImage}
          />
        </div>

        <button
          onClick={toggleEditModal}
          className="bg-teal-600 w-fit h-fit py-2 px-1.5 rounded text-white flex items-center gap-[10px]"
        >
          <MdOutlineModeEditOutline />
          Edit Merchant
        </button>
      </div>

      <div className=" max-w-[700px] mt-14 mb-[50px]">
        <div className="mb-[20px] flex items-center justify-between gap-[30px]">
          <label className="text-gray-700 text-[16px] w-1/3">
            Short Description <br /> (Max 10 characters)
          </label>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={detail?.merchantDetail?.description}
            className=" border rounded-md p-2 outline-none focus:outline-none w-2/3"
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-[20px] flex items-center justify-between gap-[30px]">
          <label className="text-gray-700 text-[16px] w-1/3">Geofence</label>
          <select
            name="geofenceId"
            value={detail?.merchantDetail?.geofenceId}
            onChange={handleInputChange}
            className="mt-2 p-2 w-2/3 border rounded-md outline-none focus:outline-none "
          >
            <option defaultValue={"Select geofence"} hidden>
              Select geofence
            </option>
            {allGeofence?.map((geofence) => (
              <option value={geofence._id}>{geofence.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-[20px] flex items-center justify-between gap-[30px]">
          <label className=" text-gray-700 text-[16px] w-1/3">Pricing</label>
          <input
            disabled
            type="text"
            name="pricing"
            placeholder="Pricing"
            value={detail?.merchantDetail?.pricing}
            className="w-2/3 bg-transparent rounded-md p-2 "
          />
        </div>

        <div className="mb-[20px] flex items-center justify-start gap-[30px]">
          <label className="text-gray-700 w-1/3">Location</label>

          <button
            type="button"
            onClick={toggleMapModal}
            className="font-medium bg-teal-700 text-white text-start rounded-md  py-2 flex items-center w-1/3 justify-center"
          >
            Mark location
            <LocationOnOutlinedIcon className="text-[18px] ms-2" />
          </button>

          <MapModal
            isVisible={showMapModal}
            onClose={toggleMapModal}
            setCoordinates={handlePrintLocation}
            location={MerchantData?.merchantDetail?.location}
            BASE_URL={BASE_URL}
            token={token}
          />
        </div>

        <div className="mb-[20px] flex items-center justify-start gap-[30px]">
          <label className="text-gray-700 w-1/3">Ratings</label>
          <button
            type="button"
            onClick={toggleRatingModal}
            className="bg-teal-700 text-white p-2 rounded-md w-2/3 ms-3"
          >
            Show ratings and reviews
          </button>
        </div>
      </div>

      <EditMerchant
        isVisible={showEditModal}
        onCancel={toggleEditModal}
        BASE_URL={BASE_URL}
        token={token}
        data={detail}
        merchantId={merchantId}
      />

      <RatingModal
        isVisible={showRatingModal}
        toggleModal={toggleRatingModal}
        data={detail?.merchantDetail?.ratingByCustomers}
      />
    </>
  );
};

export default MerchantData;
