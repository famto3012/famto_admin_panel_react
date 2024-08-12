import { useToast } from "@chakra-ui/react";
import { Modal } from "antd";
import axios from "axios";
import { useState } from "react";

const DeleteVariantTypeModal = ({
  isOpen,
  onCancel,
  token,
  BASE_URL,
  productId,
  variantId,
  variantTypeId,
  onDeleteVariantType,
}) => {
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteVariantType = async () => {
    try {
      setIsLoading(true);

      const response = await axios.delete(
        `${BASE_URL}/products/${productId}/variants/${variantId}/types/${variantTypeId}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        onDeleteVariantType(variantTypeId);
        onCancel();
        toast({
          title: "Success",
          description: `Variant type deleted successfully`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(`Error in deleting variant type: ${err}`);
      toast({
        title: "Error",
        description: `Error in deleting variant type`,
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
        <p className="text-[20px] mb-5">Are you sure want to delete ?</p>
        <div className="flex justify-end">
          <button
            className="bg-zinc-200 p-2 rounded-md font-semibold"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteVariantType}
            className="bg-red-100 p-2 rounded-md ml-3 px-2 text-red-700"
          >
            {isLoading ? `Deleting...` : `Delete`}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteVariantTypeModal;
