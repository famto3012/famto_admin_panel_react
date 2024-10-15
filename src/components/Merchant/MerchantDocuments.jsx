import { useState } from "react";
import { MdCameraAlt } from "react-icons/md";
import ImageModal from "../model/AgentModels/ImageModal";

const MerchantDocuments = ({ detail, onDataChange }) => {
  const [previewURL, setPreviewURL] = useState({
    merchantPreviewURL: "",
    pancardPreviewURL: "",
    gstPreviewURL: "",
    fssaiPreviewURL: "",
    aadharPreviewURL: "",
  });
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [imageModalUrl, setImageModalUrl] = useState("");

  const handleImageChange = (e, previewType, imageName) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewURL((prev) => ({
        ...prev,
        [previewType]: previewUrl,
      }));
      onDataChange({
        ...detail,
        [imageName]: file,
        merchantDetail: {
          ...detail.merchantDetail,
        },
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onDataChange({
      ...detail,
      merchantDetail: {
        ...detail.merchantDetail,
        [name]: value,
      },
    });
  };

  const handleImageClick = (imageUrl) => {
    setImageModalUrl(imageUrl);
    setIsImageModalVisible(true);
  };

  const handleCloseImageModal = () => {
    setIsImageModalVisible(false);
    setImageModalUrl("");
  };

  return (
    <div className="mb-[50px] w-full">
      <h3 className="text-gray-700 font-bold mb-2">Documents provided</h3>

      <div className="flex justify-between items-center my-[20px] max-w-[900px]">
        <label className=" text-gray-700 text-[16px] w-1/4">Pan card</label>

        <input
          type="text"
          name="pancardNumber"
          value={detail?.merchantDetail?.pancardNumber}
          onChange={handleInputChange}
          className="p-2 border rounded-md w-[20rem] mx-[40px] outline-none focus:outline-none flex-grow"
        />

        <div className="flex items-center gap-[30px]">
          {!previewURL?.pancardPreviewURL &&
            !detail?.merchantDetail?.pancardImageURL && (
              <div className="bg-gray-400 w-[65px] h-[65px] rounded-md" />
            )}

          {previewURL?.pancardPreviewURL && (
            <figure
              onClick={() => handleImageClick(previewURL?.pancardPreviewURL)}
              className="w-[65px] h-[65px] rounded relative"
            >
              <img
                src={previewURL?.pancardPreviewURL}
                alt="pancard"
                className="w-full rounded h-full object-cover"
              />
            </figure>
          )}

          {!previewURL?.pancardPreviewURL &&
            detail?.merchantDetail?.pancardImageURL && (
              <figure
                onClick={() =>
                  handleImageClick(detail?.merchantDetail?.pancardImageURL)
                }
                className="w-[65px] h-[65px] rounded relative"
              >
                <img
                  src={detail?.merchantDetail?.pancardImageURL}
                  alt="pancard"
                  className="w-full rounded h-full object-cover"
                />
              </figure>
            )}

          <input
            type="file"
            name="pancardImage"
            id="pancardImage"
            className="hidden"
            onChange={(e) =>
              handleImageChange(e, "pancardPreviewURL", "pancardImage")
            }
          />

          <label htmlFor="pancardImage" className="cursor-pointer">
            <MdCameraAlt
              className="bg-teal-500 text-[40px] text-white p-2 h-[40px] w-[40px] rounded"
              size={30}
            />
          </label>
        </div>
      </div>

      <div className="flex justify-between items-center my-[20px] max-w-[900px]">
        <label className="text-gray-700 text-[16px] w-1/4">GSTIN</label>
        <input
          type="text"
          name="GSTINNumber"
          value={detail?.merchantDetail?.GSTINNumber}
          onChange={handleInputChange}
          className="p-2 border rounded-md w-[20rem] mx-[40px] outline-none focus:outline-none flex-grow"
        />
        <div className="flex items-center gap-[30px]">
          {!previewURL?.gstPreviewURL &&
            !detail?.merchantDetail?.GSTINImageURL && (
              <div className="bg-gray-400 w-[65px] h-[65px] rounded-md" />
            )}

          {previewURL?.gstPreviewURL && (
            <figure
              onClick={() => handleImageClick(previewURL?.gstPreviewURL)}
              className="w-[65px] h-[65px] rounded relative"
            >
              <img
                src={previewURL?.gstPreviewURL}
                alt="gst"
                className="w-full rounded h-full object-cover"
              />
            </figure>
          )}

          {!previewURL?.gstPreviewURL &&
            detail?.merchantDetail?.GSTINImageURL && (
              <figure
                onClick={() =>
                  handleImageClick(detail?.merchantDetail?.GSTINImageURL)
                }
                className="w-[65px] h-[65px] rounded relative"
              >
                <img
                  src={detail?.merchantDetail?.GSTINImageURL}
                  alt="gst"
                  className="w-full rounded h-full object-cover"
                />
              </figure>
            )}

          <input
            type="file"
            name="gstImage"
            id="gstImage"
            className="hidden"
            onChange={(e) =>
              handleImageChange(e, "gstPreviewURL", "GSTINImage")
            }
          />

          <label htmlFor="gstImage" className="cursor-pointer">
            <MdCameraAlt
              className="bg-teal-500 text-[40px] text-white p-2 h-[40px] w-[40px] rounded"
              size={30}
            />
          </label>
        </div>
      </div>

      <div className="flex justify-between items-center my-[20px] max-w-[900px]">
        <label className=" text-gray-700 text-[16px] w-1/4">FSSAI</label>
        <input
          type="text"
          name="FSSAINumber"
          value={detail?.merchantDetail?.FSSAINumber}
          onChange={handleInputChange}
          className="p-2 border rounded-md w-[20rem] mx-[40px] outline-none focus:outline-none flex-grow"
        />
        <div className=" flex items-center gap-[30px]">
          {!previewURL?.fssaiPreviewURL &&
            !detail?.merchantDetail?.FSSAIImageURL && (
              <div className="bg-gray-400 w-[65px] h-[65px] rounded-md" />
            )}

          {previewURL?.fssaiPreviewURL && (
            <figure
              onClick={() => handleImageClick(previewURL?.fssaiPreviewURLL)}
              className="w-[65px] h-[65px] rounded relative"
            >
              <img
                src={previewURL?.fssaiPreviewURL}
                alt="profile"
                className="w-full rounded h-full object-cover "
              />
            </figure>
          )}

          {!previewURL?.fssaiPreviewURL &&
            detail?.merchantDetail?.FSSAIImageURL && (
              <figure
                onClick={() =>
                  handleImageClick(detail?.merchantDetail?.FSSAIImageURL)
                }
                className="w-[65px] h-[65px] rounded relative"
              >
                <img
                  src={detail?.merchantDetail?.FSSAIImageURL}
                  alt="profile"
                  className="w-full rounded h-full object-cover "
                />
              </figure>
            )}
          <input
            type="file"
            name="FSSAIImageURL"
            id="FSSAIImageURL"
            className="hidden"
            onChange={(e) =>
              handleImageChange(e, "fssaiPreviewURL", "FSSAIImage")
            }
          />

          <label htmlFor="FSSAIImageURL" className="cursor-pointer ">
            <MdCameraAlt
              className=" bg-teal-500 text-[40px] text-white p-2 h-[40px] w-[40px] rounded"
              size={30}
            />
          </label>
        </div>
      </div>

      <div className="flex justify-between items-center my-[20px] max-w-[900px]">
        <label className=" text-gray-700 text-[16px] w-1/4">
          Adhaar Number
        </label>
        <input
          type="text"
          name="aadharNumber"
          value={detail?.merchantDetail?.aadharNumber}
          onChange={handleInputChange}
          className="p-2 border rounded-md w-[20rem] mx-[40px] outline-none focus:outline-none flex-grow"
        />
        <div className=" flex items-center gap-[30px]">
          {!previewURL?.aadharPreviewURL &&
            !detail?.merchantDetail?.aadharImageURL && (
              <div className="bg-gray-400 w-[65px] h-[65px] rounded-md" />
            )}

          {previewURL?.aadharPreviewURL && (
            <figure
              onClick={() => handleImageClick(previewURL?.aadharPreviewURL)}
              className="w-[65px] h-[65px] rounded relative"
            >
              <img
                src={previewURL?.aadharPreviewURL}
                alt="profile"
                className="w-full rounded h-full object-cover "
              />
            </figure>
          )}

          {!previewURL?.aadharPreviewURL &&
            detail?.merchantDetail?.aadharImageURL && (
              <figure
                onClick={() =>
                  handleImageClick(detail?.merchantDetail?.aadharImageURL)
                }
                className="w-[65px] h-[65px] rounded relative"
              >
                <img
                  src={detail?.merchantDetail?.aadharImageURL}
                  alt="profile"
                  className="w-full rounded h-full object-cover "
                />
              </figure>
            )}

          <input
            type="file"
            name="AadharImage"
            id="AadharImage"
            className="hidden"
            onChange={(e) =>
              handleImageChange(e, "aadharPreviewURL", "aadharImage")
            }
          />

          <label htmlFor="AadharImage" className="cursor-pointer ">
            <MdCameraAlt
              className=" bg-teal-500 text-[40px] text-white p-2 h-[40px] w-[40px] rounded"
              size={30}
            />
          </label>
        </div>
      </div>

      <ImageModal
        isVisible={isImageModalVisible}
        handleClose={handleCloseImageModal}
        imageUrl={imageModalUrl}
      />
    </div>
  );
};

export default MerchantDocuments;
