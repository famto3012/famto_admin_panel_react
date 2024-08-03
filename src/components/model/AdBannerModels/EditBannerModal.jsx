import React, { useState, useEffect } from "react";
import { Modal, Spin } from "antd";
import axios from "axios";
import { MdCameraAlt } from "react-icons/md";

const EditBannerModal = ({
  isVisible,
  handleCancel,
  token,
  allGeofence,
  currentBannerEdit,
  BASE_URL,
}) => {
  // Initialize state with currentBannerEdit details if available
  const [appBanner, setAppData] = useState({
    name: "",
    merchantId: "",
    geofenceId: "",
    appBannerImage: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      console.log("Fetching data for currentBannerEdit:", currentBannerEdit);
      try {
        const response = await axios.get(
          `${BASE_URL}/admin/app-banner/get-app-banner/${currentBannerEdit}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 200) {
          const data = response.data.data;
          setAppData({
            name: data.name,
            merchantId: data.merchantId,
            geofenceId: data.geofenceId,
            appBannerImage: data.imageUrl,
          });
        }
      } catch (err) {
        console.error(`Error in fetching data:`, err);
      } finally {
        setIsLoading(false);
      }
    };

    if (currentBannerEdit) {
      fetchData();
    }
  }, [currentBannerEdit, token, BASE_URL]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAppBannerImageChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setSelectedFile(file);
    await setPreviewURL(URL.createObjectURL(file));
    if (previewURL) {
      console.log("preview added", previewURL);
    }
    setPreviewURL(URL.createObjectURL(file));
    // setAppData((prev)=>({...prev, appBannerImage: URL.createObjectURL(file)}))
  };

  const saveAction = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      setConfirmLoading(true);

      const appBannerDataToSend = new FormData();
      appBannerDataToSend.append("name", appBanner.name);
      appBannerDataToSend.append("merchantId", appBanner.merchantId);
      appBannerDataToSend.append("geofenceId", appBanner.geofenceId);
      if (selectedFile) {
        appBannerDataToSend.append("appBannerImage", selectedFile);
      }

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
      } else {
        console.error("Failed to update banner:", addBannerResponse.data);
      }
    } catch (err) {
      console.error(`Error in updating data: ${err}`);
    } finally {
      setConfirmLoading(false);
      console.log("edit data", appBanner);
    }
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
              type="text"
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
              <option value="" disabled hidden>
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
            <label className="w-1/3">Banner Image (390px x 400px)</label>
            <div className="flex items-center gap-[30px]">
              {/* Render the current banner image only if no new image is selected */}

              {previewURL && appBanner.appBannerImage && (
                <figure className="mt-3 h-16 w-16 rounded-md">
                  <img
                    src={previewURL}
                    alt="New Preview"
                    className="w-full rounded h-full object-cover"
                  />
                </figure>
              )}

              {!previewURL && appBanner.appBannerImage && (
                <div className="bg-cyan-50 shadow-md mt-3 h-16 w-16 rounded-md">
                  <img
                    src={appBanner.appBannerImage}
                    alt="Current Banner"
                    className="w-full h-full"
                  />
                </div>
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
            className={`bg-teal-700 text-white py-2 px-4 rounded-md ${
              confirmLoading ? "opacity-50" : ""
            }`}
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

export default EditBannerModal;
