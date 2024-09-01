import { useState } from "react";
import { Modal } from "antd";
import { MdCameraAlt } from "react-icons/md";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

const AddIndividualModal = ({
  isVisible,
  handleCancel,
  token,
  allGeofence,
  BASE_URL,
  onAddIndBanner,
}) => {
  const [bannerData, setBannerData] = useState({
    name: "",
    merchantId: "",
    geofenceId: "",
    bannerImage: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const toast = useToast();

  const handleInputChangeIndividual = (e) => {
    setBannerData({ ...bannerData, [e.target.name]: e.target.value });
  };

  const handleAdImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setSelectedFile(file);
    setPreviewURL(URL.createObjectURL(file));
  };

  const handleAddIndividualBanner = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const dataToSend = new FormData();
      dataToSend.append("name", bannerData.name);
      dataToSend.append("merchantId", bannerData.merchantId);
      dataToSend.append("geofenceId", bannerData.geofenceId);

      if (selectedFile) {
        dataToSend.append("bannerImage", selectedFile);
      }

      const IndBannerResponse = await axios.post(
        `${BASE_URL}/admin/banner/add-banner`,
        dataToSend,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (IndBannerResponse.status === 201) {
        onAddIndBanner(IndBannerResponse.data.data);
        setSelectedFile(null);
        setPreviewURL(null);
        handleCancel();
        toast({
          title: "Success",
          description: "The banner was created successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(`Error in fetch data: ${err.message}`);

      toast({
        title: "Error",
        description: "There was an error creating the banner.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Individual Merchant Ad Banner"
      open={isVisible}
      centered
      onCancel={handleCancel}
      footer={null}
    >
      <form onSubmit={handleAddIndividualBanner}>
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
              value={bannerData.name}
              onChange={handleInputChangeIndividual}
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="merchantId" className="w-1/3">
              Merchant ID
            </label>
            <input
              type="id"
              placeholder="Merchant ID"
              id="merchantId"
              name="merchantId"
              value={bannerData.merchantId}
              onChange={handleInputChangeIndividual}
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
              value={bannerData.geofenceId}
              onChange={handleInputChangeIndividual}
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
              {!previewURL && (
                <div className="bg-cyan-50 shadow-md  mt-3 h-16 w-16 rounded-md" />
              )}
              {previewURL && (
                <figure className="mt-3 h-16 w-16 rounded-md relative">
                  <img
                    src={previewURL}
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
              <label htmlFor="adImage" className="cursor-pointer">
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
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddIndividualModal;
