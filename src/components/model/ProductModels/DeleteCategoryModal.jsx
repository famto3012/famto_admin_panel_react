import { useToast } from "@chakra-ui/react";
import { Modal } from "antd";
import axios from "axios";
import { useState } from "react";

const DeleteCategoryModal = ({
  isOpen,
  onCancel,
  BASE_URL,
  token,
  role,
  merchantId,
  categoryName,
  categoryId,
  onDeleteCategory,
}) => {
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteCategory = async () => {
    try {
      setIsLoading(true);

      const endpoint =
        role === "Admin"
          ? `${BASE_URL}/categories/admin/delete-category/${merchantId}/${categoryId}`
          : `${BASE_URL}/categories/${categoryId}`;

      const response = await axios.delete(endpoint, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        onDeleteCategory(categoryId);
        toast({
          title: "Success",
          description: `Category deleted successfully`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: `Error in deleting category`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal
        open={isOpen}
        onCancel={onCancel}
        footer={null}
        width={"500px"}
        centered
      >
        <div>
          <p className="font-bold text-[20px] mb-5">
            Are you sure you want to delete ?
          </p>

          <div className="flex justify-end">
            <button
              className="bg-zinc-200 p-2 rounded-md font-semibold"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteCategory}
              className="bg-red-100 p-2 rounded-md ml-3 px-2 text-red-700"
            >
              {isLoading ? `Deleting...` : `Delete`}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteCategoryModal;
