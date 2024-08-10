import { useToast } from "@chakra-ui/react";
import { Modal } from "antd";
import axios from "axios";
import { useState } from "react";

const DeleteProductModal = ({
  isOpen,
  onCancel,
  token,
  BASE_URL,
  productName,
  productId,
  onDeleteProduct,
}) => {
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteCategory = async () => {
    try {
      setIsLoading(true);

      const response = await axios.delete(
        `${BASE_URL}/products/delete-product/${productId}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        onDeleteProduct(productId);
        onCancel();
        toast({
          title: "Success",
          description: `Product deleted successfully`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(`Error in deleting product: ${err}`);
      toast({
        title: "Error",
        description: `Error in deleting product`,
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
      open={isOpen}
      onCancel={onCancel}
      width="500px"
      footer={null}
      centered
    >
      <div>
        <p className="text-[20px] mb-5">
          Are you sure want to delete{" "}
          <span className="font-[500]">{productName}</span> ?
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
  );
};

export default DeleteProductModal;
