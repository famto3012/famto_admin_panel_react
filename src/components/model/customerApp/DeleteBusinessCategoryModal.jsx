import { Modal } from "antd";
import axios from "axios";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";

const DeleteBusinessCategoryModal = ({
  isOpen,
  onCancel,
  BASE_URL,
  token,
  categoryId,
  onDeleteCategory,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const deleteResponse = await axios.delete(
        `${BASE_URL}/admin/business-categories/delete-business-category/${categoryId}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (deleteResponse.status === 200) {
        onDeleteCategory(categoryId);
        onCancel();
        toast({
          title: "Banner Deleted",
          description: "The banner was deleted successfully.",
          status: "success",
          duration: 900,
          isClosable: true,
        });
      } else {
        console.error(`Unexpected status code: ${deleteResponse.status}`);
        toast({
          title: "Error",
          description: "Failed to delete the banner. Unexpected status code.",
          status: "error",
          duration: 900,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(`Error deleting banner: ${err.message}`);
      toast({
        title: "Error",
        description: "Failed to delete the banner.",
        status: "error",
        duration: 900,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      onCancel={onCancel}
      footer={null}
      width={"500px"}
      open={isOpen}
      centered
    >
      <form>
        <p className="font-bold text-[20px] mb-5">
          Are you sure want to delete ?
        </p>
        <div className="flex justify-end">
          <button
            className="bg-zinc-200 p-2 rounded-md font-semibold"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-red-100 p-2 rounded-md ml-3 px-2 text-red-700"
            onClick={handleDelete}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default DeleteBusinessCategoryModal;
