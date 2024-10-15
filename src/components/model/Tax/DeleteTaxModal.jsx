import { useState } from "react";
import { Modal } from "antd";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const DeleteTaxModal = ({
  isVisible,
  handleCancel,
  currentTax,
  token,
  BASE_URL,
  onDeleteTax,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const handleDeleteTax = async () => {
    try {
      setIsLoading(true);

      const response = await axios.delete(
        `${BASE_URL}/admin/taxes/delete-tax/${currentTax}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        onDeleteTax(currentTax);
        handleCancel();
        toast({
          title: "Success",
          description: response.data.message,
          duration: 3000,
          status: "success",
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error deleting tax:", error);
      toast({
        title: "Error",
        description: `Error in deleting tax`,
        duration: 3000,
        status: "error",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Delete Tax"
      open={isVisible}
      onCancel={handleCancel}
      footer={null}
      centered
    >
      <p>Are you sure you want to delete ?</p>

      <div className="flex gap-[30px] justify-end">
        <button
          onClick={handleCancel}
          className=" bg-teal-200 text-teal-600 p-2 rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleDeleteTax}
          className="bg-red-100 text-red-600 p-2 rounded"
        >
          {isLoading ? `Deleting...` : `Delete`}
        </button>
      </div>
    </Modal>
  );
};

export default DeleteTaxModal;
