import { useState } from "react";
import { Modal } from "antd";
import axios from "axios";
import { MdCameraAlt } from "react-icons/md";
import { useToast } from "@chakra-ui/react";

const AddBannerModal = ({
  isVisible,
  onCancel,
  token,
  allGeofence,
  BASE_URL,
  onAddBanner,
}) => {
  const [bannerData, setBannerData] = useState({
    name: "",
    merchantId: "",
    geofenceId: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBannerData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreviewURL(URL.createObjectURL(file));
  };

  const handleAddBanner = async (e) => {
    try {
      e.preventDefault();

      setIsLoading(true);

      const formData = new FormData();

      formData.append("name", bannerData.name);
      formData.append("merchantId", bannerData.merchantId);
      formData.append("geofenceId", bannerData.geofenceId);

      if (selectedFile) {
        formData.append("bannerImage", selectedFile);
      }

      const response = await axios.post(
        `${BASE_URL}/admin/app-banner/add-app-banner`,
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        onAddBanner(response.data.data);
        setBannerData({
          name: "",
          merchantId: "",
          geofenceId: "",
        });
        setSelectedFile(null);
        setPreviewURL(null);
        onCancel();
        toast({
          title: "Success",
          description: "Banner added successfully",
          duration: 3000,
          isClosable: true,
          status: "success",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Error in adding banner",
        duration: 3000,
        isClosable: true,
        status: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Add Banner"
      open={isVisible}
      onCancel={onCancel}
      footer={null}
      centered
    >
      <form onSubmit={handleAddBanner}>
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
              onChange={handleInputChange}
              className="border-2 border-gray-300  rounded p-2 w-2/3 outline-none focus:outline-none"
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
              value={bannerData.merchantId}
              onChange={handleInputChange}
              className="border-2 border-gray-300  rounded p-2 w-2/3 outline-none focus:outline-none"
            />
          </div>

          <div className="flex items-center">
            <label htmlFor="geofenceId" className="w-1/3">
              Geofence
            </label>
            <select
              className="border-2 border-gray-300  rounded p-2 w-2/3 outline-none focus:outline-none"
              name="geofenceId"
              value={bannerData.geofenceId}
              onChange={handleInputChange}
            >
              <option value="Select geofence" hidden>
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
              {!previewURL && (
                <div className="bg-cyan-50 shadow-md mt-3 h-16 w-16 rounded-md" />
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
                name="bannerImage"
                id="bannerImage"
                className="hidden"
                onChange={handleSelectImage}
              />
              <label htmlFor="bannerImage" className="cursor-pointer">
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
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-teal-700 text-white py-2 px-4 rounded-md"
            type="submit"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddBannerModal;
