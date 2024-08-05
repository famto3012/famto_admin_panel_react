import { Modal } from "antd";
import { useEffect, useState } from "react";
import { MdCameraAlt } from "react-icons/md";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

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
  const [allBusinessCategory, setAllBusinessCategory] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const endPoint =
        role === "Admin"
          ? `${BASE_URL}/categories/admin/${merchantId}/${categoryId}`
          : `${BASE_URL}/categories/${categoryId}`;

      const [businessCategoryResponse, categoryResponse] = await Promise.all([
        axios.get(
          `${BASE_URL}/admin/business-categories/get-all-business-category`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),
        axios.get(endPoint, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      if (businessCategoryResponse.status === 200) {
        setAllBusinessCategory(businessCategoryResponse.data.data);
      }
      if (categoryResponse.status === 200) {
        setCategoryData(categoryResponse.data.data);
      }
    };

    fetchData();
  }, [BASE_URL, role, token, merchantId, categoryId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreviewURL(URL.createObjectURL(file));
    e.target.value = null;
  };

  const submitCategory = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log(categoryData);

      const formData = new FormData();
      formData.append("businessCategoryId", categoryData.businessCategoryId);
      formData.append("categoryName", categoryData.categoryName);
      formData.append("description", categoryData.description);
      formData.append("type", categoryData.type);
      formData.append("merchantId", merchantId);

      if (selectedFile) {
        formData.append("categoryImage", selectedFile);
      }

      const endPoint =
        role === "Admin"
          ? `${BASE_URL}/categories/admin/edit-category/${merchantId}/${categoryId}`
          : `${BASE_URL}/categories/edit-category/${categoryId}`;

      await axios.put(endPoint, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast({
        title: "Category updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      handleCancel();
    } catch (error) {
      toast({
        title: "Error updating category.",
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
      title="Edit Business Category"
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
              Business Category
            </label>
            <select
              name="businessCategoryId"
              value={categoryData.businessCategoryId}
              onChange={handleInputChange}
              className="border-2 border-gray-100 rounded p-2 focus:outline-none w-full"
            >
              <option value="" disabled>
                Select a business category
              </option>
              {allBusinessCategory.map((business) => (
                <option key={business._id} value={business._id}>
                  {business.title}
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
              name="categoryName"
              value={categoryData.categoryName}
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
              name="description"
              onChange={handleInputChange}
            ></input>
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500">Type</label>
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
          <div className="flex items-center">
            <label className=" w-1/3">Photos</label>
            <div className="flex items-center gap-[30px]">
              {!previewURL && categoryData?.categoryImageURL && (
                <figure className="mt-3 h-16 w-16 rounded-md relative">
                  <img
                    src={categoryData.categoryImageURL}
                    alt={categoryData.categoryName}
                    className="w-full rounded h-full object-cover"
                  />
                </figure>
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
                name="selectImage"
                id="selectImage"
                className="hidden"
                onChange={handleSelectImage}
              />
              <label htmlFor="selectImage" className="cursor-pointer">
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
