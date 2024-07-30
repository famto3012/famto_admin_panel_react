import React, { useState } from "react";
import { Modal, Button, Spin } from "antd";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const DeleteAgentSurgeModal = ({
  isVisible,
  handleCancel,
  handleConfirmDeleteAs,
  currentDeleteAs,
  token,
  BASE_URL,
  removeAs,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const toast = useToast();
  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      const response = await axios.delete(
        `${BASE_URL}/admin/agent-surge/delete-agent-surge/${currentDeleteAs}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        removeAs(currentDeleteAs);
        handleConfirmDeleteAs();
        toast({
          title: "Deleted",
          description: "Agent Pricng Deleted successfully.",
          status: "success",
          duration: 1000,
          isClosable: true,
      });
      }
    } catch (error) {
      console.error("Error deleting surge:", error);
      toast({
        title: "Error",
        description: "There was an error occured.",
        status: "error",
        duration: 1000,
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

export default DeleteAgentSurgeModal;
