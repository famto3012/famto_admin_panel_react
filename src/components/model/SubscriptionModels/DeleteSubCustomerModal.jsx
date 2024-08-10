import React, { useState } from "react";
import { Modal, Button, Spin } from "antd";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const DeleteSubCustomerModal = ({
  isVisible,
  handleCancel,
  handleConfirmDeleteCustomer,
  currentDeleteCustomer,
  token,
  BASE_URL,
  removeCustomer,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const toast = useToast();
  const handleOk = async () => {
    setConfirmLoading(true);
    try {
        console.log(currentDeleteCustomer)
      const response = await axios.delete(
        `${BASE_URL}/admin/subscription/delete-customer-subscription/${currentDeleteCustomer}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        console.log(response.data.message)
        removeCustomer(currentDeleteCustomer);
        handleConfirmDeleteCustomer();
        toast({
          title: "Success",
          description: "CustomerSubscription Deleted successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
      });
      }
    } catch (error) {
      console.error("Error deleting:", error);
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
      title="Delete"
      open={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      footer={null}
      centered
    >
      <Spin spinning={confirmLoading}>
        <p>Are you sure you want to delete?</p>
      </Spin>

      <div className="flex gap-[30px] justify-end">
        <button className=" bg-teal-100 text-teal-600 p-2 rounded">
          Cancel
        </button>
        <button
          onClick={handleOk}
          className="bg-red-100 text-red-600 p-2 rounded"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default DeleteSubCustomerModal;
