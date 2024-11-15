import { useToast } from "@chakra-ui/react";
import { Modal } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { MdCameraAlt } from "react-icons/md";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import CropImage from "../../CropImage";

const EditBusinessCategoryModal = ({
  isOpen,
  onCancel,
  BASE_URL,
  token,
  allGeofence,
  categoryId,
  onEditCategory,
}) => {
  const [categoryData, setCategoryData] = useState({
    title: "",
    geofenceId: [],
    bannerImageURL: "",
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

  useEffect(() => {
    if (!categoryId) return;

    const fetchBusinessCategoryData = async () => {
      try {
        const categoryResponse = await axios.get(
          `${BASE_URL}/admin/business-categories/${categoryId}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (categoryResponse.status === 200) {
          const { data } = categoryResponse.data;
          setCategoryData(data);
        }
      } catch (err) {
        console.error(`Error fetching business category ${err.message}`);
      }
    };

    fetchBusinessCategoryData();
  }, [categoryId, token]);

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

  const handleEditBusinessCategory = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const dataToSend = new FormData();

      dataToSend.append("title", categoryData.title);

      categoryData.geofenceId.forEach((id) => {
        dataToSend.append("geofenceId[]", id);
      });

      if (croppedFile) {
        dataToSend.append("bannerImage", croppedFile);
      }

      const response = await axios.put(
        `${BASE_URL}/admin/business-categories/edit-business-category/${categoryId}`,
        dataToSend,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        onEditCategory(response.data.data);
        resetImageStates();
        onCancel();
        toast({
          title: "Success",
          description: "Business category updated successfully.",
          duration: 3000,
          status: "success",
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update business category",
        duration: 3000,
        status: "error",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetImageStates = () => {
    // Reset image preview and cropping states
    setImgSrc("");
    setCroppedFile(null);
    setImg(null);
    setCrop(null);
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

  const handleCropComplete = (croppedFile) => setCroppedFile(croppedFile);

  const handleModalClose = () => {};

  return (
    <Modal
      title="Edit Business Category"
      open={isOpen}
      className="mt-24"
      onCancel={onCancel}
      footer={null}
      centered
    >
      <div>
        <div className="flex mt-5 gap-4">
          <label className="w-1/2 text-gray-500">Title</label>
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

        <div className="flex mt-5 gap-4">
          <label className="w-1/2 text-gray-500">Image (342px x 160px)</label>
          <div className="w-2/3 flex items-center gap-[30px]">
            <img
              className="h-[66px] w-[66px] bg-gray-200 rounded-md"
              src={
                croppedFile
                  ? URL.createObjectURL(croppedFile)
                  : categoryData.bannerImageURL
              }
              style={{ objectFit: "contain" }}
            />

            <input
              type="file"
              id="businessImage"
              className="hidden"
              accept="image/*"
              onChange={onSelectFile}
            />

            <label htmlFor="businessImage" className="cursor-pointer">
              <MdCameraAlt
                className="bg-teal-800 text-white p-6 h-16 w-16 rounded"
                size={30}
              />
            </label>

            {imgSrc && (
              <CropImage
                selectedImage={img}
                aspectRatio={1 / 1}
                onCropComplete={handleCropComplete}
                onClose={handleModalClose}
              />
            )}
          </div>
        </div>

        <div className="flex justify-end mt-10 gap-4">
          <button
            className="bg-gray-300 rounded-lg px-6 py-2 font-semibold"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-teal-800 rounded-lg px-6 py-2 text-white font-semibold"
            onClick={handleEditBusinessCategory}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditBusinessCategoryModal;
