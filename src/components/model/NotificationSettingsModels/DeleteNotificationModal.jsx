import React, { useState } from "react";
import { Modal, Spin } from "antd";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const DeleteNotificationModal = ({
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
        `${BASE_URL}/admin/notification/notification-setting/${currentDelete}`,
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
          description: "Notification Deleted Successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error deleting", error);

      toast({
        title: "Error",
        description: "There was an error creating the banner.",
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
      title="Delete"
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

export default DeleteNotificationModal;
