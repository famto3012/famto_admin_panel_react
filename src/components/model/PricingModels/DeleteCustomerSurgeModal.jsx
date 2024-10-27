import { useState } from "react";
import { Modal, Spin } from "antd";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const DeleteCustomerSurgeModal = ({
  isVisible,
  handleCancel,
  handleConfirmDelete,
  currentDelete,
  token,
  BASE_URL,
  remove,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const toast = useToast();
  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      const response = await axios.delete(
        `${BASE_URL}/admin/customer-surge/delete-customer-surge/${currentDelete}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        remove(currentDelete);
        handleConfirmDelete();
        toast({
          title: "Success",
          description: "Customer Surge Deleted successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error deleting surge:", error);
      toast({
        title: "Error",
        description: "There was an error occured.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <Modal
      title="Delete Customer Surge"
      open={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      footer={null}
      centered
    >
      <p>Are you sure you want to delete ?</p>

      <div className="flex gap-[30px] justify-end">
        <button className=" bg-teal-100 text-teal-600 p-2 rounded">
          Cancel
        </button>
        <button
          onClick={handleOk}
          className="bg-red-100 text-red-600 p-2 rounded"
        >
          {confirmLoading ? `Deleting...` : `Delete`}
        </button>
      </div>
    </Modal>
  );
};

export default DeleteCustomerSurgeModal;
