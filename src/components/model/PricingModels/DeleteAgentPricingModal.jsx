import React, { useState } from "react";
import { Modal, Button, Spin } from "antd";
import axios from "axios";

const DeleteAgentPricingModal = ({
  isVisible,
  handleCancel,
  handleConfirmDeleteAr,
  currentDeleteAr,
  token,
  BASE_URL,
  removeAr,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      const response = await axios.delete(
        `${BASE_URL}/admin/agent-pricing/delete-agent-pricing/${currentDeleteAr}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        removeAr(currentDeleteAr);
        handleConfirmDeleteAr();
      }
    } catch (error) {
      console.error("Error deleting tax:", error);
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <Modal
      title="Delete Tax"
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

export default DeleteAgentPricingModal;
