import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { MdCameraAlt } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

const EditIndividualModal = ({
  isVisible,
  token,
  BASE_URL,
  currentIndBanner,
  handleCancel,
  allGeofence,
  onEditIndBanner,
}) => {
  const [individualdata, setIndividualData] = useState({
    name: "",
    merchantId: "",
    geofence: "",
    imageUrl: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    merchantId: "",
    geofenceId: "",
    appBannerImage: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [adFile, setAdFile] = useState(null);
  const [adPreviewURL, setAdPreviewURL] = useState(null);

  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      setConfirmLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/admin/banner/get-banner/${currentIndBanner}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          const data = response.data.data;
          setIndividualData({
            name: data.name,
            merchantId: data.merchantId,
            geofence: data.geofenceId,
            bannerImage: data.imageUrl,
          });
          setAdPreviewURL(data.imageUrl); // Set the initial preview URL
        }
      } catch (err) {
        console.error(`Error fetching data: ${err.message}`);
      } finally {
        setConfirmLoading(false);
      }
    };

    if (currentIndBanner) {
      getData();
    }
  }, [currentIndBanner, token, BASE_URL]);

  const handleInputChangeIndividual = (e) => {
    setIndividualData({
      ...individualdata,
      [e.target.name]: e.target.value,
    });
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const IndBannerDataToSend = new FormData();
      IndBannerDataToSend.append("name", individualdata.name);
      IndBannerDataToSend.append("merchantId", individualdata.merchantId);
      IndBannerDataToSend.append("geofenceId", individualdata.geofence);

      if (adFile) {
        IndBannerDataToSend.append("imageUrl", adFile);
      }

      const IndBannerResponse = await axios.put(
        `${BASE_URL}/admin/banner/edit-banner/${currentIndBanner}`,
        IndBannerDataToSend,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (IndBannerResponse.status === 200) {
        onEditIndBanner(IndBannerResponse.data.data);
        setAdFile(null);
        setAdPreviewURL(null);
        handleCancel();
        toast({
          title: "Banner Updated.",
          description: "The banner was updated successfully.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(`Error updating banner: ${err.message}`);

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
        description: "There was an error updating the banner.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAdFile(file);
      setAdPreviewURL(URL.createObjectURL(file));
    }
  };

  return (
    <Modal
      title="Edit Individual Merchant Ad Banner"
      open={isVisible}
      className="mt-20"
      onCancel={handleCancel}
      footer={null}
    >
      <form onSubmit={formSubmit}>
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
              value={individualdata.name}
              onChange={handleInputChangeIndividual}
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
            />
            {errors.name && <span className="text-red-500">{errors.name}</span>}
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
              value={individualdata.merchantId}
              onChange={handleInputChangeIndividual}
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
            />
            {errors.merchantId && (
              <span className="text-red-500">{errors.merchantId}</span>
            )}
          </div>
          <div className="flex items-center">
            <label htmlFor="geofence" className="w-1/3">
              Geofence
            </label>
            <select
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              name="geofence"
              value={individualdata.geofence}
              onChange={handleInputChangeIndividual}
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
              <span className="text-red-500">{errors.geofenceId}</span>
            )}
          </div>
          <div className="flex items-center">
            <label className="w-1/3">Banner Image (390px x 400px)</label>
            <div className="flex items-center gap-[30px]">
              {adPreviewURL ? (
                <figure className="mt-3 h-16 w-16 rounded-md relative">
                  <img
                    src={adPreviewURL}
                    alt="profile"
                    className="w-full rounded h-full object-cover"
                  />
                </figure>
              ) : individualdata?.imageUrl ? (
                <div className="bg-cyan-50 shadow-md mt-3 h-16 w-16 rounded-md">
                  <img
                    src={individualdata?.imageUrl}
                    className="w-full rounded h-full object-cover"
                  />
                </div>
              ) : null}

              <input
                type="file"
                name="adImage"
                id="adImage"
                className="hidden"
                onChange={handleAdImageChange}
              />
              <label htmlFor="adImage" className="cursor-pointer">
                <MdCameraAlt
                  className="bg-teal-800 text-[30px] text-white p-4 h-16 w-16 mt-3 rounded-md"
                  size={30}
                />
              </label>
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
                isLoading ? "opacity-50" : ""
              }`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditIndividualModal;

