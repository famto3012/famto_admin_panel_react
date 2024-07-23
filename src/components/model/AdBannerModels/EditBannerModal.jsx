import React, { useState } from "react";
import { Modal } from "antd";
import axios from "axios";
import { MdCameraAlt } from "react-icons/md";

const EditBannerModal = ({
  isVisible,
  handleCancel,
  token,
  allGeofence,
  currentBannerEdit,
  BASE_URL
}) => {
  const [appBanner, setAppData] = useState({
    name: "",
    merchantId: "",
    geofenceId: "",
    appBannerImage: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [notificationFile, setNotificationFile] = useState(null);
  const [notificationPreviewURL, setNotificationPreviewURL] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAppBannerImageChange = (e) => {
    const file = e.target.files[0];
    setNotificationFile(file);
    setNotificationPreviewURL(URL.createObjectURL(file));
  };

  const saveAction = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      setIsLoading(true);

      const appBannerDataToSend = new FormData();
      appBannerDataToSend.append("name", appBanner.name);
      appBannerDataToSend.append("merchantId", appBanner.merchantId);
      appBannerDataToSend.append("geofenceId", appBanner.geofenceId);
      if (notificationFile) {
        appBannerDataToSend.append("appBannerImage", notificationFile);
      }

      console.log("appBannerDataToSend", appBannerDataToSend);

      const addBannerResponse = await axios.put(
        `${BASE_URL}/admin/app-banner/edit-app-banner/${currentBannerEdit}`,
        appBannerDataToSend, // Send FormData directly, not wrapped in an object
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (addBannerResponse.status === 200) {
        setAppData(addBannerResponse.data.data);
        handleCancel();
      }
    } catch (err) {
      console.error(`Error in updating data: ${err}`);
    } finally {
      setIsLoading(false);
    }

    console.log(appBanner);
  };

  return (
    <Modal
      title="Edit App Ad Banner"
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
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="merchantId" className="w-1/3">
              Merchant ID
            </label>
            <input
              type="text" // Corrected input type
              placeholder="Merchant ID"
              id="merchantId"
              name="merchantId"
              value={appBanner.merchantId}
              onChange={handleInputChange}
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="geofenceId" className="w-1/3">
              Geofence
            </label>
            <select
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              name="geofenceId"
              value={appBanner.geofenceId}
              onChange={handleInputChange}
            >
              <option defaultValue={"Select geofence"} hidden>
                Select geofence
              </option>
              {allGeofence.map((geofence) => (
                <option key={geofence._id} value={geofence._id}>
                  {geofence.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <label className=" w-1/3">Banner Image (390px x 400px)</label>
            <div className="flex items-center gap-[30px]">
              {!notificationPreviewURL && (
                <div className="bg-cyan-50 shadow-md mt-3 h-16 w-16 rounded-md" />
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
                // Remove the value property from file input
                onChange={handleAppBannerImageChange}
              />
              <label htmlFor="appBannerImage" className="cursor-pointer">
                <MdCameraAlt
                  className="bg-teal-800 text-[30px] text-white p-4 h-16 w-16 mt-3 rounded-md"
                  size={30}
                />
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            className="bg-cyan-50 py-2 px-4 rounded-md"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="bg-teal-700 text-white py-2 px-4 rounded-md"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditBannerModal;
