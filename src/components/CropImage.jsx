// import React, { useState, useRef, useEffect } from "react";
// import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
// import "react-image-crop/dist/ReactCrop.css";
// import { Modal } from "antd";

// // Helper function to center crop with a given aspect ratio
// function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
//   return centerCrop(
//     makeAspectCrop(
//       {
//         unit: "%",
//         width: 90,
//       },
//       aspect,
//       mediaWidth,
//       mediaHeight
//     ),
//     mediaWidth,
//     mediaHeight
//   );
// }

// // CropImage component
// export default function CropImage({
//   selectedImage,
//   aspectRatio,
//   onCropComplete,
//   onClose,
// }) {
//   const [imgSrc, setImgSrc] = useState(null);
//   const imgRef = useRef(null);
//   const [crop, setCrop] = useState(null);
//   const [completedCrop, setCompletedCrop] = useState(null);
//   const [aspect, setAspect] = useState(aspectRatio || 1 / 1); // Default aspect ratio is 1:1
//   const [isVisible, setIsVisible] = useState(!!selectedImage); // Modal is visible if image is selected

//   useEffect(() => {
//     if (selectedImage) {
//       console.log("selectedImage", selectedImage);
//       setIsVisible(true); // Open modal when new image is selected
//       const reader = new FileReader();
//       reader.onload = () => setImgSrc(reader.result);
//       reader.readAsDataURL(selectedImage); // Convert the image to base64 string for preview
//     }
//   }, [selectedImage]);

//   // Handle image load and initialize crop
//   function onImageLoad(e) {
//     if (aspect) {
//       const { width, height } = e.currentTarget;
//       setCrop(centerAspectCrop(width, height, aspect));
//     }
//   }

//   // Handle the cropping process
//   async function handleCropConfirm() {
//     if (!imgRef.current || !completedCrop) return;

//     const canvas = document.createElement("canvas");
//     const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
//     const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
//     canvas.width = completedCrop.width;
//     canvas.height = completedCrop.height;
//     const ctx = canvas.getContext("2d");

//     ctx.drawImage(
//       imgRef.current,
//       completedCrop.x * scaleX,
//       completedCrop.y * scaleY,
//       completedCrop.width * scaleX,
//       completedCrop.height * scaleY,
//       0,
//       0,
//       completedCrop.width,
//       completedCrop.height
//     );

//     canvas.toBlob((blob) => {
//       if (!blob) return;
//       const croppedImageFile = new File(
//         [blob],
//         `${blob.size}-croppedImage.png`,
//         { type: "image/png" }
//       );
//       onCropComplete(croppedImageFile); // Pass the cropped image file back through callback
//       setIsVisible(false); // Close the modal after confirming the crop
//       setImgSrc(null)
//       selectedImage(null) // Notify the parent that the modal is closed
//       onClose();
//     });
//   }

//   return (
//     selectedImage && (
//       <Modal
//         title="Crop Image"
//         open={isVisible}
//         onCancel={() => {
//           setIsVisible(false);
//           onClose();
//           setImgSrc(null)
//           selectedImage(null)
//         }}
//         footer={null}
//         centered
//         width="500px"
//       >
//         {!!imgSrc && (
//           <ReactCrop
//             crop={crop}
//             onChange={(_, percentCrop) => setCrop(percentCrop)}
//             onComplete={(c) => setCompletedCrop(c)}
//             aspect={aspect}
//           >
//             <img
//               ref={imgRef}
//               alt="Crop me"
//               src={imgSrc}
//               style={{ maxWidth: "100%" }}
//               onLoad={onImageLoad}
//             />
//           </ReactCrop>
//         )}
//         <button
//           onClick={handleCropConfirm}
//           className="h-[30px] w-[100px] bg-teal-500 text-white rounded-md mt-4"
//         >
//           Confirm
//         </button>
//       </Modal>
//     )
//   );
// }

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
export default function CropImage({
  selectedImage,
  aspectRatio,
  onCropComplete,
  onClose,
}) {
  const [imgSrc, setImgSrc] = useState(null);
  const imgRef = useRef(null);
  const [crop, setCrop] = useState(null);
  const [completedCrop, setCompletedCrop] = useState(null);
  const [aspect, setAspect] = useState(aspectRatio || 1 / 1); // Default aspect ratio is 1:1
  const [isVisible, setIsVisible] = useState(!!selectedImage); // Modal is visible if image is selected

  // Effect to load the selected image and open the modal
  useEffect(() => {
    if (selectedImage) {
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
      const croppedImageFile = new File(
        [blob],
        `${blob.size}-croppedImage.png`,
        { type: "image/png" }
      );
      onCropComplete(croppedImageFile); // Pass the cropped image file back through callback

      // Reset all state values
      setImgSrc(null);
      setCrop(null);
      setCompletedCrop(null);
      setIsVisible(false); // Close the modal after confirming the crop
      handleClose();
      onClose(); // Notify the parent component to reset the selectedImage
    });
  }

  // Handle closing the modal and resetting the component state
  const handleClose = () => {
    setIsVisible(false); // Close the modal
    setImgSrc(null); // Clear the image source
    setCrop(null); // Reset the crop state
    setCompletedCrop(null); // Reset the completed crop state
    onClose(); // Notify the parent that the modal has been closed
  };

  return (
    selectedImage && (
      <Modal
        title="Crop Image"
        open={isVisible}
        onCancel={handleClose}
        footer={null}
        centered
        width="500px"
      >
        <div>
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
        </div>

        <button
          onClick={handleCropConfirm}
          className="h-[30px] w-[100px] bg-teal-500 text-white rounded-md mt-4"
        >
          Confirm
        </button>
      </Modal>
    )
  );
}
