import { useToast } from "@chakra-ui/react";
import { Modal } from "antd";
import axios from "axios";
import { useRef, useState } from "react";
import { MdCameraAlt } from "react-icons/md";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import CropImage from "../../CropImage";

const AddBusinessCategoryModal = ({
  isOpen,
  onCancel,
  BASE_URL,
  token,
  allGeofence,
  onAddCategory,
}) => {
  const [categoryData, setCategoryData] = useState({
    title: "",
    geofenceId: [],
  });

  const [isLoading, setIsLoading] = useState(false);

  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState(null);
  const [isInnerVisible, setIsInnerVisible] = useState(false);
  const [img, setImg] = useState(null);
  const [croppedFile, setCroppedFile] = useState(null);

  const toast = useToast();
  const animatedComponents = makeAnimated();

  const handleInputChange = (e) => {
    setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
  };

  const handleSelectGeofence = (selectedOptions) => {
    setCategoryData({
      ...categoryData,
      geofenceId: selectedOptions.map((option) => option.value),
    });
  };

  const geofenceOptions = allGeofence.map((geofence) => ({
    label: geofence.name,
    value: geofence._id,
  }));

  const handleAddBusinessCategory = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const businessDataToSend = new FormData();

      businessDataToSend.append("title", categoryData.title);
      categoryData.geofenceId.forEach((id) => {
        businessDataToSend.append("geofenceId[]", id);
      });
      if (croppedFile) {
        businessDataToSend.append("bannerImage", croppedFile);
      }

      const response = await axios.post(
        `${BASE_URL}/admin/business-categories/add-business-category`,
        businessDataToSend,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        onAddCategory(response.data.data);
        onCancel();
        toast({
          title: "Success",
          description: "Business Category Created Successfully.",
          duration: 3000,
          status: "success",
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(`Error in creating business ${err.message}`);
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
    // setSelectedFile(croppedFile); // Get the cropped image file
    console.log("Cropped image file:", croppedFile);
  };

  const handleModalClose = () => {
    // setSelectedFile(null); // Reset the selected file to allow new selection
  };

  return (
    <Modal
      title="Add Business Category"
      open={isOpen}
      onCancel={onCancel}
      footer={null}
      centered
    >
      <form onSubmit={handleAddBusinessCategory}>
        <div className="flex mt-5 gap-4">
          <label className="w-1/2 text-gray-500">Service title</label>
          <input
            type="text"
            className="border-2 border-gray-300 rounded p-2 focus:outline-none w-2/3"
            name="title"
            value={categoryData?.title}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex mt-5  gap-4">
          <label className="w-1/2 text-gray-500">Geofence</label>

          <Select
            className="w-2/3 outline-none focus:outline-none"
            value={geofenceOptions.filter((option) =>
              categoryData.geofenceId.includes(option.value)
            )}
            isMulti={true}
            isSearchable={true}
            onChange={handleSelectGeofence}
            options={geofenceOptions}
            placeholder="Select geofence"
            isClearable={true}
            components={animatedComponents}
          />
        </div>

        <div className="flex">
          <label className="mt-5">Image (342px x 160px)</label>
          <div className=" flex items-center gap-[30px]">
            {!croppedFile && (
              <div className="bg-gray-400 ml-[70px] mt-5 h-16 w-16 rounded-md" />
            )}

            {!!croppedFile && (
              <figure className="ml-[70px] mt-5 h-16 w-16 rounded-md relative">
                <img
                  ref={previewCanvasRef}
                  src={URL.createObjectURL(croppedFile)}
                  alt="profile"
                  className="w-full rounded h-full object-cover "
                />
              </figure>
            )}

            <input
              type="file"
              name="businessImage"
              id="businessImage"
              className="hidden"
              accept="image/*"
              onChange={onSelectFile}
            />
            <label htmlFor="businessImage" className="cursor-pointer ">
              <MdCameraAlt
                className=" bg-teal-800  text-[40px] text-white p-6 h-16 w-16 mt-5 rounded"
                size={30}
              />
            </label>
            {imgSrc && (
              <CropImage
                selectedImage={img}
                aspectRatio={1 / 1} // Optional, set aspect ratio (1:1 here)
                onCropComplete={handleCropComplete}
                onClose={handleModalClose} // Pass the handler to close the modal and reset the state
              />
            )}
          </div>
        </div>

        <div className="flex justify-end mt-10  gap-4">
          <button
            className="bg-gray-300 rounded-lg px-6 py-2 font-semibold justify-end"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-teal-800 rounded-lg px-6 py-2 text-white font-semibold justify-end"
            type="submit"
          >
            {isLoading ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddBusinessCategoryModal;
