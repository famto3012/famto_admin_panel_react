import React from "react";
import { Modal } from "antd";

const ImageModal = ({ isVisible, handleClose, imageUrl }) => {
  return (
    <Modal
      title="Image"
      open={isVisible}
      onCancel={handleClose}
      footer={null}
      centered
      width="500px"
    >
      <figure className="h-[500px] w-full">
        <img
          src={imageUrl}
          alt="Enlarged"
          className="w-full h-full object-cover "
        />
      </figure>
    </Modal>
  );
};

export default ImageModal;
