// ImageModal.js
import React from "react";
import { Modal } from "antd";

const ImageModal = ({ isVisible, handleClose, imageUrl }) => {
  return (
    <Modal
      visible={isVisible}
      onCancel={handleClose}
      footer={null}
      centered
      width="50%" 
    >
      <img src={imageUrl} alt="Enlarged" className="w-full h-full object-contain" />
    </Modal>
  );
};

export default ImageModal;
