import React from "react";
import { Modal } from "antd";

const ImageModal = ({ isVisible, handleClose, imageUrl }) => {
  return (
    <Modal
      open={isVisible}
      onCancel={handleClose}
      footer={null}
      centered
      width="40rem"
    >
      <img
        src={imageUrl}
        alt="Enlarged"
        className="w-full h-full object-contain pt-5"
      />
    </Modal>
  );
};

export default ImageModal;
