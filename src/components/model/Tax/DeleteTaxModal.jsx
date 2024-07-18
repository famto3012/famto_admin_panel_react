import { Modal } from "antd";
import React from "react";

const DeleteTaxModal = ({
  isVisible,
  handleCancel,
  token,
  BASE_URL,
  taxData,
}) => {
  return (
    <>
      <Modal onCancel={handleCancel} open={isVisible} footer={null} centered>
        <p className="font-semibold text-[18px] mb-5">
          Are you sure want to delete?
        </p>
        <div className="flex justify-end">
          <button
            className="bg-cyan-100 px-5 py-1 rounded-md font-semibold"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button className="bg-red-100 px-5 py-1 rounded-md ml-3 text-red-700">
            Delete
          </button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteTaxModal;
