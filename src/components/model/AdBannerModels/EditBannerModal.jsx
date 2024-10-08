import { useEffect, useRef, useState } from "react";
import { Modal } from "antd";
import axios from "axios";
import { MdCameraAlt } from "react-icons/md";
import { useToast } from "@chakra-ui/react";
import CropImage from "../../CropImage";

const EditBannerModal = ({
  isVisible,
  onCancel,
  allGeofence,
  selectedBanner,
  token,
  BASE_URL,
  onEditBanner,
}) => {
  const [bannerData, setBannerData] = useState({
    name: "",
    merchantId: "",
    geofenceId: "",
    imageUrl: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState(null);
  const [isInnerVisible, setIsInnerVisible] = useState(false);
  const [img, setImg] = useState(null)
  const [croppedFile, setCroppedFile] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!selectedBanner) return;

    console.log("SELECTED BANNER ID", selectedBanner);

    const fetchBanner = async () => {
      const response = await axios.get(
        `${BASE_URL}/admin/app-banner/get-app-banner/${selectedBanner}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setBannerData(response.data.data);
      }
    };

    fetchBanner();
  }, [selectedBanner]);

  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBannerData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
      setImg(e.target.files[0])
    }
  }

  const handleCropComplete = (croppedFile) => {
    setCroppedFile(croppedFile); 
    setSelectedFile(croppedFile)// Get the cropped image file
    console.log("Cropped image file:", croppedFile);
  };

  const handleModalClose = () => {
    setSelectedFile(null); // Reset the selected file to allow new selection
  };

  const handleEditBanner = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const formData = new FormData();

    formData.append("name", bannerData.name);
    formData.append("merchantId", bannerData.merchantId);
    formData.append("geofenceId", bannerData.geofenceId);
    console.log("Cropped file",croppedFile)
    if (croppedFile) {
      console.log("Cropped file",croppedFile)
      formData.append("bannerImage", croppedFile);
    }

    console.log("FormData contents:");
    for (let pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    try {
      const response = await axios.put(
        `${BASE_URL}/admin/app-banner/edit-app-banner/${selectedBanner}`,
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        onEditBanner(response.data.data);
        setBannerData({
          name: "",
          merchantId: "",
          geofenceId: "",
          imageUrl: "",
        });
        setSelectedFile(null);
        setPreviewURL(null);
        onCancel();
        toast({
          title: "Success",
          description: "Banner updated successfully",
          duration: 3000,
          isClosable: true,
          status: "success",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Error in updating banner",
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
      title="Edit Banner"
      open={isVisible}
      onCancel={onCancel}
      footer={null}
      centered
    >
      <form onSubmit={handleEditBanner}>
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
            <label className="w-1/3">Banner Image (390px x 400px)<span className="text-red-600 ml-2">*</span></label>
            <div className="flex items-center gap-[30px]">
            {!croppedFile && (
                <img
                  src={bannerData?.imageUrl}
                  alt="Banner preview"
                  className="w-[175px] rounded h-[80px] object-cover"
                />
              )}
              {croppedFile && (
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
                        height: "175px",
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

export default EditBannerModal;
