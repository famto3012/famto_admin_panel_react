import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import { MdCameraAlt } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import axios from "axios"; // Import axios

const EditIndividualModal = ({
  isVisible,
  token,
  BASE_URL,
  currentIndBanner,
  handleCancel,
  allGeofence,
}) => {
  const [individualdata, setIndividualData] = useState({
    name: "",
    merchantId: "",
    geofence: "",
    bannerImage: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    merchantId: "",
    geofenceId: "",
    appBannerImage: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  console.log("data",individualdata);

  //api connection to get individual banner details

  useEffect(() => {

    const getData = async () => {
      setConfirmLoading(true);

      try {
            const response = await axios.get(
          `${BASE_URL}/admin/banner/get-banner/${currentIndBanner}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        if (response.status === 200) {
          const data = response.data.data;
          setIndividualData({
            name: data.name,
            merchantId : data.merchantId,
            geofence: data.geofenceId,
            bannerImage: data.imageUrl
          })
        }
      }catch (err) {
        console.error(`Error in fetch data ${response.data.message}`);
      } finally {
        setConfirmLoading(false);
      }
    }

    if(currentIndBanner) {
    getData();
    }

  },[currentIndBanner,token,BASE_URL])


  // Populate initial state when currentIndBanner changes
  // useEffect(() => {
  //   if (currentIndBanner) {
  //     setIndividualData({
  //       name: currentIndBanner.name || "",
  //       merchantId: currentIndBanner.merchantId || "",
  //       geofence: currentIndBanner.geofenceId || "",
  //       bannerImage: currentIndBanner.bannerImage || "",
  //     });

  //     setAdPreviewURL(currentIndBanner.bannerImage || null);
  //   }
  // }, [currentIndBanner]);

  const handleInputChangeIndividual = (e) => {
    setIndividualData({
      ...individualdata,
      [e.target.name]: e.target.value,
    });
  };

  console.log("individual banner Id", currentIndBanner);

  const formSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const IndBannerDataToSend = new FormData();
      IndBannerDataToSend.append("name", individualdata.name);
      IndBannerDataToSend.append("merchantId", individualdata.merchantId);
      IndBannerDataToSend.append("geofenceId", individualdata.geofence);
      if (adFile) {
        IndBannerDataToSend.append("bannerImage", adFile);
      }

      const IndBannerResponse = await axios.put(
        `${BASE_URL}/admin/banner/edit-banner/${currentIndBanner}`,
        IndBannerDataToSend, // Send FormData directly
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (IndBannerResponse.status === 200) {
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
        navigate(0);
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
        description: "There was an error updating the banner.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const [adFile, setAdFile] = useState(null);
  const [adPreviewURL, setAdPreviewURL] = useState(null);

  const handleAdImageChange = (e) => {
    const file = e.target.files[0];
    setAdFile(file);
    setAdPreviewURL(URL.createObjectURL(file));
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
            <label className=" w-1/3">
              Banner Image (390px x 400px)
            </label>
            <div className="flex items-center gap-[30px]">
              {!adPreviewURL && (
                <div className="bg-cyan-50 shadow-md  mt-3 h-16 w-16 rounded-md" />
              )}
              {adPreviewURL && (
                <figure className="mt-3 h-16 w-16 rounded-md relative">
                  <img
                    src={adPreviewURL}
                    alt="profile"
                    className="w-full rounded h-full object-cover"
                  />
                </figure>
              )}
              <input
                type="file"
                name="adImage"
                id="adImage"
                className="hidden"
                onChange={handleAdImageChange}
              />
              <label
                htmlFor="adImage"
                className="cursor-pointer"
              >
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
            className={`bg-teal-700 text-white py-2 px-4 rounded-md ${isLoading ? "opacity-50" : ""
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
