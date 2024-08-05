import { Modal } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";

const ChangeCategoryModal = ({
  isOpen,
  onCancel,
  allCategories,
  BASE_URL,
  token,
  categoryId,
  productId,
  onChangeCategory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  useEffect(() => {
    setSelectedCategory(categoryId);
  }, [categoryId]);

  const handleChangeCategory = async () => {
    try {
      setIsLoading(true);

      console.log("selectedCategory", selectedCategory);
      console.log("productId", productId);

      if (selectedCategory !== categoryId) {
        const response = await axios.patch(
          `${BASE_URL}/products/${productId}/change-category/${selectedCategory}`,
          {},
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          onChangeCategory(productId);
          onCancel();
          toast({
            title: "Success",
            description: `Changed product category successfully`,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    } catch (err) {
      console.log(`Error in changing product category: ${err}`);
      toast({
        title: "Error",
        description: `Error in changing product category`,
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
      title="Change Categories"
      open={isOpen}
      onCancel={onCancel}
      width="500px"
      footer={null}
      centered
    >
      <div>
        <div className="space-y-4">
          {allCategories?.map((category, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="radio"
                name="selectedCategory"
                value={category._id}
                checked={selectedCategory === category._id}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-black"
              />
              <span className="text-gray-700">{category.categoryName}</span>
            </label>
          ))}
        </div>
        <div className="mt-8 flex justify-end gap-4">
          <button
            className="bg-gray-200 px-4 py-2 rounded-md"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-teal-600 text-white px-4 py-2 rounded-md"
            onClick={handleChangeCategory}
          >
            {isLoading ? `Saving...` : `Save`}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ChangeCategoryModal;
