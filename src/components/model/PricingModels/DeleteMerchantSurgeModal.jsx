import React, { useState } from "react";
import { Modal, Button, Spin } from "antd";
import axios from "axios";

const DeleteMerchantSurgeModal = ({
  isVisible,
  handleCancel,
  handleConfirmDeleteMs,
  currentDeleteMs,
  token,
  BASE_URL,
  removeMs,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      const response = await axios.delete(
        `${BASE_URL}/admin/merchant-surge/delete-merchant-surge/${currentDeleteMs}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        removeMs(currentDeleteMs);
        handleConfirmDeleteMs();
      }
    } catch (error) {
      console.error("Error deleting surge:", error);
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

export default DeleteMerchantSurgeModal;
