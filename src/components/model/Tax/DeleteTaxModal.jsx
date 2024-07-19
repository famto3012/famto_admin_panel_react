import React, { useState } from "react";
import { Modal, Button, Spin } from "antd";
import axios from "axios";

const DeleteTaxModal = ({
  isVisible,
  handleCancel,
  handleConfirmDelete,
  currentTax,
  token,
  BASE_URL,
  removeTax,
  setModalLoading,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = async () => {
    setConfirmLoading(true);
    setModalLoading(true);
    try {
      const response = await axios.delete(
        `${BASE_URL}/admin/taxes/delete-tax/${currentTax}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        removeTax(currentTax);
        handleConfirmDelete();
      }
    } catch (error) {
      console.error("Error deleting tax:", error);
    } finally {
      setConfirmLoading(false);
      setModalLoading(false);
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
        <p>Are you sure you want to delete this tax?</p>
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

export default DeleteTaxModal;
