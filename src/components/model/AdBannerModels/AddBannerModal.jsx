import React, { useState } from "react";
import { Modal } from "antd";
import axios from "axios";
import { MdCameraAlt } from "react-icons/md";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AddBannerModal = ({
  isVisible,
  handleCancel,
  token,
  allGeofence,
  BASE_URL,
  onAddBanner
}) => {
  const [appBanner, setAppData] = useState({
    name: "",
    merchantId: "",
    geofenceId: "",
    appBannerImage: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    merchantId: "",
    geofenceId: "",
    appBannerImage: "",
  });

  const [notificationFile, setNotificationFile] = useState(null);
  const [notificationPreviewURL, setNotificationPreviewURL] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAppBannerImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNotificationFile(file);
      setNotificationPreviewURL(URL.createObjectURL(file));
    }
  };

  console.log("image", notificationFile);
  const saveAction = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const appBannerDataToSend = new FormData();
      appBannerDataToSend.append("name", appBanner.name);
      appBannerDataToSend.append("merchantId", appBanner.merchantId);
      appBannerDataToSend.append("geofenceId", appBanner.geofenceId);
      if (notificationFile) {
        appBannerDataToSend.append("appBannerImage", notificationFile);
      }

      const addBannerResponse = await axios.post(
        `${BASE_URL}/admin/app-banner/add-app-banner`,
        appBannerDataToSend, // Send FormData directly
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (addBannerResponse.status === 201) {
        onAddBanner(addBannerResponse.data.data);
        console.log("resposne",addBannerResponse.data.data);
        setNotificationFile(null);
        setNotificationPreviewURL(null);
        handleCancel();
        toast({
          title: "Banner Created.",
          description: "The banner was created successfully.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        // navigate(0)
      }
    } catch (err) {
      console.error(`Error in fetch data: ${err.message}`);

      if (err.response && err.response.data && err.response.data.errors) {
        const { errors } = err.response.data;
        setErrors({
          name: errors.name || "",
          merchantId: errors.merchantId || "",
          geofenceId: errors.geofenceId || "",
          appBannerImage: errors.appBannerImage || "",
        });
      }

      toast({
        title: "Error",
        description: "There was an error creating the banner.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Add App Ad Banner"
      open={isVisible}
      className="mt-20"
      onCancel={handleCancel}
      footer={null}
    >
      <form onSubmit={saveAction}>
        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <label htmlFor="name" className="w-1/3">
              Name
            </label>
            <input
              type="text"
              placeholder="Name"
              id="name"
              name="name"
              value={appBanner.name}
              onChange={handleInputChange}
              className={`${
                errors.name
                  ? "bg-red-100 border border-red-600 placeholder:text-red-500"
                  : "border-2 border-gray-300"
              } rounded p-2 w-2/3 outline-none focus:outline-none`}
            />
            {errors.name && (
              <small className="text-red-600">{errors.name}</small>
            )}
          </div>
          <div className="flex items-center">
            <label htmlFor="merchantId" className="w-1/3">
              Merchant ID
            </label>
            <input
              type="text"
              placeholder="Merchant ID"
              id="merchantId"
              name="merchantId"
              value={appBanner.merchantId}
              onChange={handleInputChange}
              className={`${
                errors.merchantId
                  ? "bg-red-100 border border-red-600 placeholder:text-red-500"
                  : "border-2 border-gray-300"
              } rounded p-2 w-2/3 outline-none focus:outline-none`}
            />
            {errors.merchantId && (
              <small className="text-red-600">{errors.merchantId}</small>
            )}
          </div>
          <div className="flex items-center">
            <label htmlFor="geofenceId" className="w-1/3">
              Geofence
            </label>
            <select
              className={`${
                errors.geofenceId
                  ? "bg-red-100 border border-red-600 placeholder:text-red-500"
                  : "border-2 border-gray-300"
              } rounded p-2 w-2/3 outline-none focus:outline-none`}
              name="geofenceId"
              value={appBanner.geofenceId}
              onChange={handleInputChange}
            >
              <option value="" disabled hidden>
                Select geofence
              </option>
              {allGeofence.map((geofence) => (
                <option key={geofence._id} value={geofence._id}>
                  {geofence.name}
                </option>
              ))}
            </select>
            {errors.geofenceId && (
              <small className="text-red-600">{errors.geofenceId}</small>
            )}
          </div>
          <div className="flex items-center">
            <label className="w-1/3">Banner Image (390px x 400px)</label>
            <div className="flex items-center gap-[30px]">
              {!notificationPreviewURL && (
                <div
                  className={`bg-cyan-50 shadow-md mt-3 h-16 w-16 rounded-md ${
                    errors.appBannerImage ? "border-2 border-red-600" : ""
                  }`}
                />
              )}
              {notificationPreviewURL && (
                <figure className="mt-3 h-16 w-16 rounded-md relative">
                  <img
                    src={notificationPreviewURL}
                    alt="profile"
                    className="w-full rounded h-full object-cover"
                  />
                </figure>
              )}
              <input
                type="file"
                name="appBannerImage"
                id="appBannerImage"
                className="hidden"
                onChange={handleAppBannerImageChange}
              />
              <label htmlFor="appBannerImage" className="cursor-pointer">
                <MdCameraAlt
                  className="bg-teal-800 text-[30px] text-white p-4 h-16 w-16 mt-3 rounded-md"
                  size={30}
                />
              </label>
              {errors.appBannerImage && (
                <small className="text-red-600">{errors.appBannerImage}</small>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            className="bg-cyan-50 py-2 px-4 rounded-md"
            type="button"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="bg-teal-700 text-white py-2 px-4 rounded-md"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddBannerModal;
