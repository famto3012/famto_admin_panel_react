import { Modal } from "antd";
import { useEffect, useRef, useState } from "react";
import { MdCameraAlt } from "react-icons/md";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import CropImage from "../../CropImage";

const EditCategoriesModal = ({
  isVisible,
  handleCancel,
  token,
  role,
  BASE_URL,
  categoryId,
  merchantId,
}) => {
  const [categoryData, setCategoryData] = useState({
    businessCategoryId: "",
    categoryName: "",
    description: "",
    type: "",
    categoryImageURL: "",
  });

  const [availableBusinessCategory, setAvailableBusinessCategory] = useState(
    []
  );
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState(null);
  const [isInnerVisible, setIsInnerVisible] = useState(false);
  const [img, setImg] = useState(null);
  const [croppedFile, setCroppedFile] = useState(null);

  const toast = useToast();

  useEffect(() => {
    if (!categoryId || !merchantId) return;

    const fetchData = async () => {
      const getCategoryEndPoint =
        role === "Admin"
          ? `${BASE_URL}/categories/admin/${merchantId}/${categoryId}`
          : `${BASE_URL}/categories/${categoryId}`;

      const [businessCategoryResponse, categoryResponse] = await Promise.all([
        axios.get(`${BASE_URL}/categories/${merchantId}/business-categories`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axios.get(getCategoryEndPoint, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      if (businessCategoryResponse.status === 200) {
        setAvailableBusinessCategory(businessCategoryResponse.data.data);
      }

      if (categoryResponse.status === 200) {
        setCategoryData(categoryResponse.data.data);
      }
    };

    fetchData();
  }, [role, token, merchantId, categoryId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const submitCategory = async (e) => {
    try {
      e.preventDefault();

      setIsLoading(true);

      const formData = new FormData();
      formData.append("businessCategoryId", categoryData.businessCategoryId);
      formData.append("categoryName", categoryData.categoryName);
      formData.append("description", categoryData.description);
      formData.append("categoryImageURL", categoryData.categoryImageURL);
      formData.append("type", categoryData.type);
      formData.append("merchantId", merchantId);

      if (croppedFile) {
        formData.append("categoryImage", croppedFile);
      }
      const endPoint =
        role === "Admin"
          ? `${BASE_URL}/categories/admin/edit-category/${merchantId}/${categoryId}`
          : `${BASE_URL}/categories/${categoryId}`;

      await axios.put(endPoint, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast({
        title: "Success",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      handleCancel();
    } catch (error) {
      toast({
        title: "Error",
        status: "error",
        duration: 3000,
        isClosable: true,
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
      title="Edit Product Category"
      width="500px"
      onCancel={handleCancel}
      centered
      open={isVisible}
      footer={null}
    >
      <form onSubmit={submitCategory}>
        <div className="flex flex-col gap-4 mt-5">
          <div className="flex mt-5 gap-4">
            <label className="w-1/2 text-gray-500" htmlFor="businessCategory">
              Business Category <span className="text-red-600">*</span>
            </label>
            <select
              name="businessCategoryId"
              value={categoryData.businessCategoryId._id}
              onChange={handleInputChange}
              className="border-2 border-gray-100 rounded p-2 focus:outline-none w-full"
            >
              {availableBusinessCategory.map((business) => (
                <option key={business._id} value={business._id}>
                  {business.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="categoryName">
              Category Name <span className="text-red-600">*</span>
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              name="categoryName"
              value={categoryData.categoryName}
              onChange={handleInputChange}
            />
          </div>

          {/* <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="description">
              Description
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              value={categoryData.description}
              name="description"
              onChange={handleInputChange}
            ></input>
          </div> */}

          <div className="flex items-center">
            <label className="w-1/3 text-gray-500">
              Type <span className="text-red-600">*</span>
            </label>
            <div>
              <input
                type="radio"
                name="type"
                value="Veg"
                checked={categoryData.type === "Veg"}
                onChange={handleInputChange}
                className="border-2 border-gray-100 rounded p-2 mr-3 focus:outline-none"
              />
              <label> Veg</label>
            </div>
            <input
              type="radio"
              name="type"
              value="Non-veg"
              checked={categoryData.type === "Non-veg"}
              onChange={handleInputChange}
              className="border-2 border-gray-100 ml-5 rounded p-2 mr-3 focus:outline-none"
            />
            <label>Non-Veg</label>
            <input
              type="radio"
              name="type"
              value="Both"
              checked={categoryData.type === "Both"}
              onChange={handleInputChange}
              className="border-2 border-gray-100 ml-5 rounded p-2 mr-3 focus:outline-none"
            />
            <label> Both</label>
          </div>

          {/* <div className="flex items-center">
            <label className=" w-1/3">Photos</label>
            <div className="flex items-center gap-[30px]">
              {!croppedFile && (
                <img
                  className="h-[65px] w-[65px] bg-gray-200 rounded-md mt-[15px]"
                  src={categoryData.categoryImageURL}
                />
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
                        width: "65px",
                        height: "65px",
                        marginTop: "15px",
                      }}
                    />
                  </div>
                </>
              )}
              <input
                type="file"
                name="selectImage"
                id="selectImage"
                className="hidden"
                accept="image/*"
                onChange={onSelectFile}
              />
              <label htmlFor="selectImage" className="cursor-pointer">
                <MdCameraAlt
                  className="bg-teal-800 text-[30px] text-white p-4 h-16 w-16 mt-3 rounded-md"
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
          </div> */}

          <div className="flex justify-end gap-4 mt-6">
            <button
              className="bg-cyan-50 py-2 px-4 rounded-md"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="bg-teal-700 text-white py-2 px-4 rounded-md focus:outline-none"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? `Saving...` : `Save`}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditCategoriesModal;
