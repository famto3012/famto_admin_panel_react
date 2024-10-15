import { useContext, useEffect, useRef, useState } from "react";
import { Modal } from "antd";
// import { MdCameraAlt } from "react-icons/md";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import Select from "react-select";

import { UserContext } from "../../../context/UserContext";
// import CropImage from "../../CropImage";

const AddCategoriesModal = ({
  isVisible,
  handleCancel,
  BASE_URL,
  token,
  role,
  merchantId,
  onAddCategory,
}) => {
  const [categoryData, setCategoryData] = useState({
    categoryName: "",
    description: "",
    type: "",
    businessCategoryId: "",
    merchantId: "",
  });

  const [availableBusinessCategory, setAvailableBusinessCategory] = useState(
    []
  );
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
  const { userId } = useContext(UserContext);

  useEffect(() => {
    const getAllBusinessCategories = async () => {
      try {
        const userIdToSend = role === "Admin" ? merchantId : userId;

        const response = await axios.get(
          `${BASE_URL}/categories/${userIdToSend}/business-categories`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setAvailableBusinessCategory(response.data.data);
        }
      } catch (err) {
        console.log(`Error in getting all business categories: ${err}`);
      }
    };

    getAllBusinessCategories();
  }, [merchantId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const categoryOptions = availableBusinessCategory?.map((category) => ({
    label: category.title,
    value: category._id,
  }));

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const dataToSend = new FormData();
      dataToSend.append("categoryName", categoryData.categoryName);
      dataToSend.append("description", categoryData.description);
      dataToSend.append("type", categoryData.type);
      dataToSend.append("businessCategoryId", categoryData.businessCategoryId);
      dataToSend.append("merchantId", merchantId);
      if (croppedFile) {
        dataToSend.append("categoryImage", croppedFile);
      }

      const endPoint =
        role === "Admin"
          ? `${BASE_URL}/categories/admin/add-category`
          : `${BASE_URL}/categories/add-category`;

      const response = await axios.post(endPoint, dataToSend, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        onAddCategory(response.data.data);
        setCategoryData({
          categoryName: "",
          description: "",
          type: "",
          businessCategoryId: "",
          merchantId: merchantId || "",
        });
        setSelectedFile(null);
        setPreviewURL(null);
        handleCancel();
        toast({
          title: "Success",
          description: response.data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(`Error in adding category: ${err}`);
      toast({
        title: "Error",
        description: `Error in adding new category`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // function onSelectFile(e) {
  //   if (e.target.files && e.target.files.length > 0) {
  //     setIsInnerVisible(true);
  //     setCrop(null); // Makes crop preview update between images.
  //     const reader = new FileReader();
  //     reader.addEventListener("load", () =>
  //       setImgSrc(reader.result?.toString() || "")
  //     );
  //     reader.readAsDataURL(e.target.files[0]);
  //     setImg(e.target.files[0]);
  //   }
  // }

  // const handleCropComplete = (croppedFile) => {
  //   setCroppedFile(croppedFile);
  //   setSelectedFile(croppedFile); // Get the cropped image file
  //   console.log("Cropped image file:", croppedFile);
  // };

  // const handleModalClose = () => {
  //   setSelectedFile(null); // Reset the selected file to allow new selection
  // };

  return (
    <Modal
      title="Add Categories"
      onCancel={handleCancel}
      width="500px"
      open={isVisible}
      footer={null}
      centered
    >
      <form onSubmit={handleAddCategory}>
        <div className="flex flex-col gap-4 mt-5">
          <div className="flex mt-5">
            <label className="w-1/2 text-gray-500" htmlFor="businessCategory">
              Business Category <span className="text-red-600">*</span>
            </label>

            <Select
              options={categoryOptions}
              value={categoryOptions.find(
                (option) => option.value === categoryData.businessCategoryId
              )}
              onChange={(option) =>
                setCategoryData({
                  ...categoryData,
                  businessCategoryId: option.value,
                })
              }
              className="border-gray-100 rounded focus:outline-none w-full"
              placeholder="Business category"
              isSearchable={true}
              isMulti={false}
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="categoryName">
              Category Name <span className="text-red-600">*</span>
            </label>
            <input
              className="border-2 border-gray-200 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              value={categoryData.categoryName}
              id="categoryName"
              name="categoryName"
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
              id="description"
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
                className="cursor-pointer border-2 border-gray-100 rounded p-2 mr-3 focus:outline-none"
              />
              <label className="cursor-pointer"> Veg</label>
            </div>

            <div>
              <input
                type="radio"
                name="type"
                value="Non-veg"
                checked={categoryData.type === "Non-veg"}
                onChange={handleInputChange}
                className="cursor-pointer border-2 border-gray-100 ml-5 rounded p-2 mr-3 focus:outline-none"
              />
              <label className="cursor-pointer">Non-Veg</label>
            </div>

            <input
              type="radio"
              name="type"
              value="Both"
              checked={categoryData.type === "Both"}
              onChange={handleInputChange}
              className="cursor-pointer border-2 border-gray-100 ml-5 rounded p-2 mr-3 focus:outline-none"
            />
            <label className="cursor-pointer"> Both</label>
          </div>

          {/* <div className="flex items-center">
            <label className=" w-1/3">Photos</label>
            <div className="flex items-center gap-[30px]">
              {!croppedFile && (
                <div className="h-[65px] w-[65px] bg-gray-200 rounded-md mt-[15px]"></div>
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
                name="adImage"
                id="adImage"
                className="hidden"
                accept="image/*"
                onChange={onSelectFile}
              />
              <label htmlFor="adImage" className="cursor-pointer">
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

          <div className="flex items-start justify-end gap-4 mt-5">
            <div className="flex gap-4 w-fit h-fit">
              <button
                className="bg-cyan-50 py-2 px-4 rounded-md"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                className="bg-teal-800 text-white py-2 px-4 rounded-md focus:outline-none"
                type="submit"
              >
                {isLoading ? `Adding...` : `Add`}
              </button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddCategoriesModal;
