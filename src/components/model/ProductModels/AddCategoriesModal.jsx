import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { MdCameraAlt } from "react-icons/md";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

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

  const [allBusinessCategory, setAllBusinessCategory] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  useEffect(() => {
    setCategoryData((prevData) => ({
      ...prevData,
      merchantId,
    }));
    console.log("MERCHANT ID", merchantId);
  }, []);

  useEffect(() => {
    const getAllBusinessCategories = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/admin/business-categories/get-all-business-category`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setAllBusinessCategory(response.data.data);
        }
      } catch (err) {
        console.log(`Error in getting all business categories: ${err}`);
      }
    };

    getAllBusinessCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleAdImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreviewURL(URL.createObjectURL(file));
  };

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
      if (selectedFile) {
        dataToSend.append("categoryImage", selectedFile);
      }

      const endpoint =
        role === "Admin"
          ? `${BASE_URL}/categories/admin/add-category`
          : `${BASE_URL}/categories/add-category`;

      const response = await axios.post(endpoint, dataToSend, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        onAddCategory(categoryData.categoryName);
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
          title: "Category Added",
          description: response.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(`Error in adding category: ${err}`);
      toast({
        title: "Error",
        description: `Error in adding new category`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

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
          <div className="flex mt-5 gap-4">
            <label className="w-1/2 text-gray-500" htmlFor="businessCategory">
              Business Category
            </label>
            <select
              name="businessCategoryId"
              value={categoryData.businessCategoryId}
              onChange={handleInputChange}
              className="border-2 border-gray-100 rounded p-2 focus:outline-none w-full"
            >
              <option defaultValue={"Select business category"} hidden>
                Select business category
              </option>
              {allBusinessCategory?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="categoryName">
              Category Name
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              value={categoryData.categoryName}
              id="categoryName"
              name="categoryName"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
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
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-gray-500">Veg/Non-veg</label>
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
          <div className="flex items-center">
            <label className=" w-1/3">Photos</label>
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
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="bg-teal-700 text-white py-2 px-4 rounded-md focus:outline-none"
              type="submit"
            >
              {isLoading ? `Adding...` : `Add`}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddCategoriesModal;
