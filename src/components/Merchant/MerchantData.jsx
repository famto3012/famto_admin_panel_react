import { useEffect, useState } from "react";
import RatingModal from "../model/Merchant/RatingModal";
import { MdCameraAlt } from "react-icons/md";
import MapModal from "../Order/MapModal";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ImageModal from "../model/AgentModels/ImageModal";
import { useMap } from "../../context/MapContext";
import CropImage from "../CropImage";
import Select from "react-select";

const MerchantData = ({
  detail,
  allGeofence,
  BASE_URL,
  token,
  role,
  merchantId,
  onDataChange,
}) => {
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);

  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState(null);
  const [isInnerVisible, setIsInnerVisible] = useState(false);
  const [img, setImg] = useState(null);
  const [croppedFile, setCroppedFile] = useState(null);

  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [imageModalUrl, setImageModalUrl] = useState("");

  const { coordinates } = useMap();

  const toggleRatingModal = () => setShowRatingModal(!showRatingModal);

  const toggleMapModal = () => setShowMapModal(!showMapModal);

  useEffect(() => {
    const updatedLocation = [coordinates?.latitude, coordinates?.longitude];

    onDataChange({
      ...detail,
      merchantDetail: {
        ...detail.merchantDetail,
        location: updatedLocation,
      },
    });
  }, [coordinates]);

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

  const handleSelectChange = (option) => {
    onDataChange({
      ...detail,
      merchantDetail: {
        ...detail.merchantDetail,
        geofenceId: option.value,
      },
    });
  };

  const geofenceOptions = allGeofence?.map((geofence) => ({
    label: geofence.name,
    value: geofence._id,
  }));

  const handleImageClick = (imageUrl) => {
    setImageModalUrl(imageUrl);
    setIsImageModalVisible(true);
  };

  const handleCloseImageModal = () => {
    setIsImageModalVisible(false);
    setImageModalUrl("");
  };

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setIsInnerVisible(true);
      setCrop(null); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(file);
      setImg(file);
    }
  }

  const handleCropComplete = (croppedFile) => {
    setCroppedFile(croppedFile);
    // setSelectedFile(croppedFile)// Get the cropped image file

    onDataChange({ merchantImage: croppedFile });
  };

  const handleModalClose = () => {
    // setSelectedFile(null); // Reset the selected file to allow new selection
  };

  return (
    <>
      <div className="grid grid-cols-2 2xl:grid-cols-6 gap-4">
        {/* Merchant Image Section */}
        <div className="flex flex-col col-span-2 2xl:col-span-2 items-center order-1 2xl:order-2">
          {!croppedFile && !detail?.merchantDetail?.merchantImageURL && (
            <div className="bg-gray-400 w-[90%] h-[12rem] rounded-md relative">
              <label
                htmlFor="merchantImage"
                className="cursor-pointer absolute bottom-0 right-0"
              >
                <MdCameraAlt
                  className="bg-teal-500 text-white p-3 rounded-br-md"
                  size={44}
                />
              </label>
            </div>
          )}

          {croppedFile && (
            <figure className="w-[90%] h-[12rem] rounded-md relative">
              <img
                onClick={() =>
                  handleImageClick(URL.createObjectURL(croppedFile))
                }
                src={URL.createObjectURL(croppedFile)}
                alt="profile"
                className="w-full h-full rounded-md object-cover cursor-pointer"
              />
              <label
                htmlFor="merchantImage"
                className="cursor-pointer absolute bottom-0 right-0"
              >
                <MdCameraAlt
                  className="bg-teal-500 text-white p-3 rounded-br-md"
                  size={44}
                />
              </label>
            </figure>
          )}

          {!croppedFile && detail?.merchantDetail?.merchantImageURL && (
            <figure className="w-[90%] h-[12rem] rounded-md relative  z-10">
              <img
                onClick={() =>
                  handleImageClick(detail?.merchantDetail?.merchantImageURL)
                }
                src={detail?.merchantDetail?.merchantImageURL}
                alt="profile"
                className="w-full h-full rounded-md object-cover cursor-pointer"
              />
              <label
                htmlFor="merchantImage"
                className="cursor-pointer absolute bottom-0 right-0 z-20"
              >
                <MdCameraAlt
                  className="bg-teal-500 text-white p-3 rounded-br-md"
                  size={44}
                />
              </label>
            </figure>
          )}

          <input
            type="file"
            name="merchantImage"
            id="merchantImage"
            className="hidden"
            accept="image/*"
            onChange={onSelectFile}
          />
          {imgSrc && (
            <CropImage
              selectedImage={img}
              aspectRatio={16 / 9}
              onCropComplete={handleCropComplete}
              onClose={handleModalClose}
            />
          )}
        </div>

        {/* Merchant Details and Contact Details Section Side by Side */}
        <div className="col-span-2 2xl:col-span-4 grid grid-cols-1 lg:grid-cols-2 gap-4 order-2 2xl:order-1">
          {/* Merchant Details Section */}
          <div className="flex flex-col">
            <div className="mb-4 flex items-center gap-[10px] w-full">
              <label className="text-red-500 font-[600] w-1/3">ID</label>
              <input
                type="text"
                className="outline-none focus:outline-none p-[10px] bg-transparent rounded text-red-600 placeholder:text-red-600"
                disabled
                value={detail._id}
              />
            </div>

            <div className="mb-4 flex items-center gap-[10px] w-full">
              <label className="block text-gray-700 w-1/3">
                Merchant name*
              </label>
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

            <div className="mb-4 flex items-center gap-[10px] w-full">
              <label className="block text-gray-700 w-1/3">
                Display address*
              </label>
              <input
                type="text"
                name="displayAddress"
                className="merchantDetail-input"
                placeholder="Merchant Address"
                spellCheck={false}
                value={detail?.merchantDetail?.displayAddress}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4 flex items-center gap-[10px] w-full">
              <label className="block text-gray-700 w-1/3">
                Name of owner*
              </label>
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

          {/* Contact Details Section */}
          <div className="flex flex-col">
            <div className="mb-4 flex items-center gap-[10px] w-full">
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

            <div className="mb-4 flex items-center gap-[10px] w-full">
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

            <div className="mb-4 flex items-center gap-[10px] w-full">
              <label className="block text-gray-700 w-1/3 ">
                Registration status
              </label>
              <input
                type="text"
                className={`${
                  detail?.isApproved === "Approved"
                    ? "text-green-600"
                    : detail?.isApproved === "Pending"
                    ? " text-orange-600"
                    : ""
                } outline-none focus:outline-none p-[10px] bg-transparent rounded w-2/3`}
                disabled
                value={detail.isApproved}
              />
            </div>
          </div>
        </div>
      </div>

      <div className=" w-[830px] mt-14 mb-[50px]">
        <div className="mb-[20px] flex items-center justify-between gap-[30px]">
          <label className="text-gray-700 text-[16px] w-1/3">
            Short Description <br /> (Max 10 characters)
          </label>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={detail?.merchantDetail?.description}
            className=" border rounded-md p-2 outline-none focus:outline-none w-2/3  me-[95px] "
            onChange={handleInputChange}
          />
        </div>

        {role === "Admin" && (
          <div className="mb-[20px] flex items-center justify-between gap-[30px]">
            <label className="text-gray-700 text-[16px] w-1/3">Geofence</label>

            <Select
              options={geofenceOptions}
              value={geofenceOptions.find(
                (option) => option.value === detail?.merchantDetail?.geofenceId
              )}
              onChange={handleSelectChange}
              className="mt-2 w-2/3 border rounded-md outline-none focus:outline-none me-[95px] "
              placeholder="Select geofence"
              isSearchable={true}
              isMulti={false}
              styles={{
                control: (provided) => ({
                  ...provided,
                  paddingRight: "",
                }),
                dropdownIndicator: (provided) => ({
                  ...provided,
                  padding: "10px",
                }),
              }}
            />
          </div>
        )}

        <div className="mb-[20px] flex items-center justify-between gap-[30px]">
          <label className="text-gray-700 text-[16px] w-1/3">Pricing</label>

          {detail?.merchantDetail?.pricing ? (
            <p className="w-2/3 bg-transparent rounded-md p-2 text-left  me-[95px]">
              {detail?.merchantDetail?.pricing?.modelType} |{" "}
              {detail?.merchantDetail?.pricing?.detail?.type === "Percentage"
                ? `${detail?.merchantDetail?.pricing?.detail?.value} %`
                : `${detail?.merchantDetail?.pricing?.detail?.value}`}
            </p>
          ) : (
            <p className="w-2/3 text-red-600 font-[500] rounded-md text-left me-[95px]">
              Inactive
            </p>
          )}
        </div>

        <div className="mb-[20px] flex items-center justify-start gap-[30px]">
          <label className="text-gray-700 w-1/3">Location</label>
          <button
            type="button"
            onClick={toggleMapModal}
            className="font-medium bg-teal-700 text-white text-start rounded-md py-2 w-2/3 flex items-center justify-center me-1"
          >
            Mark location
            <LocationOnOutlinedIcon className="text-[18px] ms-2" />
          </button>

          <MapModal
            isVisible={showMapModal}
            onClose={toggleMapModal}
            location={detail?.merchantDetail?.location}
            BASE_URL={BASE_URL}
            token={token}
            modelId={1}
          />
          {detail?.merchantDetail?.locationImage && (
            <img
              src={detail?.merchantDetail?.locationImage}
              className="w-[70px] h-[66px] rounded-md cursor-pointer"
              alt="location map"
              onClick={() =>
                handleImageClick(detail?.merchantDetail?.locationImage)
              }
            />
          )}
          {!detail?.merchantDetail?.locationImage && (
            <div className="w-[70px] h-[66px] rounded-md bg-gray-300"></div>
          )}
        </div>

        <div className="mb-[20px] flex items-center justify-start gap-[30px]  me-[95px]">
          <label className="text-gray-700 w-1/3">Ratings</label>
          <button
            type="button"
            onClick={toggleRatingModal}
            className="bg-teal-700 text-white p-2 rounded-md w-2/3"
          >
            Show ratings and reviews
          </button>
        </div>
      </div>

      <RatingModal
        isVisible={showRatingModal}
        toggleModal={toggleRatingModal}
        data={detail?.merchantDetail?.ratingByCustomers}
      />

      <ImageModal
        isVisible={isImageModalVisible}
        handleClose={handleCloseImageModal}
        imageUrl={imageModalUrl}
      />
    </>
  );
};

export default MerchantData;
