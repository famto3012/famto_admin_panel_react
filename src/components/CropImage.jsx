import React, { useState, useRef, useEffect } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Modal } from "antd";

// Helper function to center crop with a given aspect ratio
function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

// CropImage component
export default function CropImage({ selectedImage, aspectRatio, onCropComplete, onClose }) {
  const [imgSrc, setImgSrc] = useState("");
  const imgRef = useRef(null);
  const [crop, setCrop] = useState(null);
  const [completedCrop, setCompletedCrop] = useState(null);
  const [aspect, setAspect] = useState(aspectRatio || 1 / 1); // Default aspect ratio is 1:1
  const [isVisible, setIsVisible] = useState(!!selectedImage); // Modal is visible if image is selected

  useEffect(() => {
    if (selectedImage) {
       console.log("selectedImage", selectedImage)
      setIsVisible(true); // Open modal when new image is selected
      const reader = new FileReader();
      reader.onload = () => setImgSrc(reader.result);
      reader.readAsDataURL(selectedImage); // Convert the image to base64 string for preview
    }
  }, [selectedImage]);

  // Handle image load and initialize crop
  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  // Handle the cropping process
  async function handleCropConfirm() {
    if (!imgRef.current || !completedCrop) return;

    const canvas = document.createElement("canvas");
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      imgRef.current,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    canvas.toBlob((blob) => {
      if (!blob) return;
      const croppedImageFile = new File([blob], `${blob.size}-croppedImage.png`, { type: "image/png" });
      onCropComplete(croppedImageFile); // Pass the cropped image file back through callback
      setIsVisible(false); // Close the modal after confirming the crop
      onClose(); // Notify the parent that the modal is closed
    });
  }

  return (
    <Modal
      title="Crop Image"
      open={isVisible}
      onCancel={() => {
        setIsVisible(false);
        onClose();
      }}
      footer={null}
      centered
      width="500px"
    >
      {!!imgSrc && (
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={aspect}
        >
          <img
            ref={imgRef}
            alt="Crop me"
            src={imgSrc}
            style={{ maxWidth: "100%" }}
            onLoad={onImageLoad}
          />
        </ReactCrop>
      )}
      <button
        onClick={handleCropConfirm}
        className="h-[30px] w-[100px] bg-teal-500 text-white rounded-md mt-4"
      >
        Confirm
      </button>
    </Modal>
  );
}
