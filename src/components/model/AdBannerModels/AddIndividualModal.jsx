import { useRef, useState } from "react";
import { Modal } from "antd";
import { MdCameraAlt } from "react-icons/md";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import CropImage from "../../CropImage";
import Select from "react-select";

const AddIndividualModal = ({
  isVisible,
  onCancel,
  token,
  allGeofence,
  BASE_URL,
  onAddIndBanner,
}) => {
  const [bannerData, setBannerData] = useState({
    name: "",
    merchantId: "",
    geofenceId: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState(null);
  const [isInnerVisible, setIsInnerVisible] = useState(false);
  const [img, setImg] = useState(null);
  const [croppedFile, setCroppedFile] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBannerData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const geofenceOptions = allGeofence?.map((geofence) => ({
    label: geofence.name,
    value: geofence._id,
  }));

  const handleAddBanner = async (e) => {
    try {
      e.preventDefault();

      setIsLoading(true);

      const formData = new FormData();

      formData.append("name", bannerData.name);
      formData.append("merchantId", bannerData.merchantId);
      formData.append("geofenceId", bannerData.geofenceId);

      if (croppedFile) {
        formData.append("bannerImage", croppedFile);
      }

      const response = await axios.post(
        `${BASE_URL}/admin/banner/add-banner`,
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        onAddIndBanner(response.data.data);
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

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      setIsInnerVisible(true);
      setCrop(null); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
      setImg(e.target.files[0]);
    }
  }

  const handleCropComplete = (croppedFile) => {
    setCroppedFile(croppedFile);
    setSelectedFile(croppedFile); // Get the cropped image file
    console.log("Cropped image file:", croppedFile);
  };

  const handleModalClose = () => {
    setSelectedFile(null); // Reset the selected file to allow new selection
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
              Name<span className="text-red-600 ml-2">*</span>
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
              Merchant ID<span className="text-red-600 ml-2">*</span>
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
              Geofence<span className="text-red-600 ml-2">*</span>
            </label>

            <Select
              options={geofenceOptions}
              value={geofenceOptions.find(
                (option) => option.value === bannerData.geofenceId
              )}
              onChange={(option) =>
                setBannerData({
                  ...bannerData,
                  geofenceId: option.value,
                })
              }
              className="rounded w-2/3 outline-none focus:outline-none"
              placeholder="Select geofence"
              isSearchable={true}
              isMulti={false}
              menuPlacement="auto"
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3">
              Banner Image <span className="text-red-600 ml-2">*</span> <br />{" "}
              (390px x 120px)
            </label>

            <div className="flex items-center gap-[30px]">
              {!croppedFile && (
                <div className="h-[85px] w-[175px] bg-gray-200 rounded-md mt-[14px]"></div>
              )}
              {!!croppedFile && (
                <>
                  <div>
                    <img
                      ref={previewCanvasRef}
                      src={URL.createObjectURL(croppedFile)}
                      style={{
                        border: "1px solid white",
                        borderRadius: "5px",
                        objectFit: "contain",
                        width: "175px",
                        height: "85px",
                        marginTop: "14px",
                      }}
                    />
                  </div>
                </>
              )}
              <input
                type="file"
                name="bannerImage"
                id="bannerImage"
                className="hidden"
                accept="image/*"
                onChange={onSelectFile}
              />
              <label htmlFor="bannerImage" className="cursor-pointer">
                <MdCameraAlt
                  className="bg-teal-800 text-[30px] text-white p-4 h-16 w-16 mt-3 rounded-md"
                  size={30}
                />
              </label>
              {imgSrc && (
                <CropImage
                  selectedImage={img}
                  aspectRatio={16 / 9} // Optional, set aspect ratio (1:1 here)
                  onCropComplete={handleCropComplete}
                  onClose={handleModalClose} // Pass the handler to close the modal and reset the state
                />
              )}
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

export default AddIndividualModal;
