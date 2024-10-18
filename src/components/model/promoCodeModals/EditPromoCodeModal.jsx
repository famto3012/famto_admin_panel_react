import { useToast } from "@chakra-ui/react";
import { Modal, Spin } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { MdCameraAlt } from "react-icons/md";
import CropImage from "../../CropImage";
import Select from "react-select";
import { promoCodeModeOptions } from "../../../utils/DefaultData";

const EditPromoCodeModal = ({
  handleCancel,
  BASE_URL,
  currentPromoEdit,
  isVisible,
  onAddPromocode,
  token,
}) => {
  if (!currentPromoEdit) return;

  const [formData, setFormData] = useState({
    promoCode: "",
    promoType: "",
    discount: "",
    description: "",
    fromDate: "",
    toDate: "",
    applicationMode: "",
    maxDiscountValue: "",
    minOrderAmount: "",
    maxAllowedUsers: "",
    appliedOn: "",
    merchantId: "",
    geofenceId: "",
    imageUrl: "",
  });

  const [geofence, setGeofence] = useState([]);
  const [merchant, setMerchant] = useState([]);
  const [promoImageFile, setPromoImageFile] = useState(null);
  const [promoPreviewURL, setPromoPreviewURL] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const toast = useToast();
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState(null);
  const [img, setImg] = useState(null);
  const [isInnerVisible, setIsInnerVisible] = useState(false);
  const [croppedFile, setCroppedFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setDataLoading(true);
        const [response, geofenceResponse, merchantResponse] =
          await Promise.all([
            axios.get(`${BASE_URL}/admin/promocode/${currentPromoEdit}`, {
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${BASE_URL}/admin/geofence/get-geofence`, {
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${BASE_URL}/merchants/admin/all-merchants`, {
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);
        if (response.status === 200) {
          const formData = response.data.data;
          formData.fromDate = formatDate(formData.fromDate);
          formData.toDate = formatDate(formData.toDate);

          setFormData(formData);
        }
        if (geofenceResponse.status === 200) {
          setGeofence(geofenceResponse.data.geofences);
        }
        if (merchantResponse.status === 200) {
          setMerchant(merchantResponse.data.data);
        }
      } catch (err) {
        console.error(`Error in fetch data ${err}`);
      } finally {
        setDataLoading(false);
      }
    };

    if (currentPromoEdit) {
      fetchData();
    }
  }, [token, currentPromoEdit, BASE_URL]);

  const geofenceOptions = geofence?.map((geofence) => ({
    label: geofence.name,
    value: geofence._id,
  }));

  const merchantOptions = merchant?.map((merchant) => ({
    label: merchant.merchantName,
    value: merchant._id,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const addPromoToSend = new FormData();
      addPromoToSend.append("promoCode", formData.promoCode);
      addPromoToSend.append("promoType", formData.promoType);
      addPromoToSend.append("discount", formData.discount);
      addPromoToSend.append("description", formData.description);
      addPromoToSend.append("fromDate", formData.fromDate);
      addPromoToSend.append("toDate", formData.toDate);
      addPromoToSend.append("applicationMode", formData.applicationMode);
      addPromoToSend.append("maxDiscountValue", formData.maxDiscountValue);
      addPromoToSend.append("minOrderAmount", formData.minOrderAmount);
      addPromoToSend.append("maxAllowedUsers", formData.maxAllowedUsers);
      addPromoToSend.append("appliedOn", formData.appliedOn);
      addPromoToSend.append("merchantId", formData.merchantId);
      addPromoToSend.append("geofenceId", formData.geofenceId);

      if (croppedFile) {
        addPromoToSend.append("promoImage", croppedFile);
      }
      const response = await axios.put(
        `${BASE_URL}/admin/promocode/edit-promocode/${currentPromoEdit}`,
        addPromoToSend,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        handleCancel();
        onAddPromocode(response.data.data);
        toast({
          title: "Success",
          description: "Promocode updated Successfully",
          duration: 3000,
          isClosable: true,
          status: "success",
        });
      }
    } catch (err) {
      console.error(`Error in update data ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      setIsInnerVisible(true);
      setCrop(null); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
      setImg(e.target.files[0]);
    }
  }

  const handleCropComplete = (croppedFile) => setCroppedFile(croppedFile);

  return (
    <Modal
      width="900px"
      title="Edit Promo Code"
      open={isVisible}
      className="w-[1000px]"
      onCancel={handleCancel}
      footer={null}
    >
      <div className="flex flex-col p-2 justify-between">
        <form onSubmit={handleSubmit} className="h-[30rem] overflow-auto">
          <div className="flex gap-4 mt-5">
            <label className="w-1/2 text-gray-500">
              Code<span className="text-red-600 ml-2">*</span>
            </label>
            <input
              type="text"
              name="promoCode"
              className="border-2 border-gray-300 rounded p-2 w-2/3 focus:outline-none"
              value={formData.promoCode}
              placeholder={dataLoading ? "Loading data..." : ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex mt-5">
            <label className="w-1/2 text-gray-500">
              Promotion Type<span className="text-red-600 ml-2">*</span>
            </label>
            <input
              type="radio"
              name="promoType"
              value="Flat-discount"
              className="-ml-12 mr-1"
              checked={formData.promoType === "Flat-discount"}
              onChange={handleChange}
            />
            Flat discount
            <input
              type="radio"
              name="promoType"
              className="ml-3 mr-1"
              value="Percentage-discount"
              checked={formData.promoType === "Percentage-discount"}
              onChange={handleChange}
            />
            Percentage discount
          </div>
          <div className="flex gap-4 mt-5">
            <label className="w-1/2 text-gray-500">
              Discount<span className="text-red-600 ml-2">*</span>
            </label>
            <input
              type="text"
              name="discount"
              className="border-2 border-gray-300 rounded focus:outline-none p-2 w-2/3"
              value={formData.discount}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-4 mt-5">
            <label className="w-1/2 text-gray-500">
              Description Max 150 characters.
            </label>
            <input
              type="text"
              name="description"
              maxLength={150}
              className="border-2 border-gray-300 rounded focus:outline-none p-2 w-2/3"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-4 mt-5">
            <label className="w-1/2 text-gray-500">
              From<span className="text-red-600 ml-2">*</span>
            </label>
            <input
              type="date"
              name="fromDate"
              min={new Date()}
              value={formData.fromDate}
              className="border-2 border-gray-300 rounded focus:outline-none p-2 w-2/3"
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-4 mt-5">
            <label className="w-1/2 text-gray-500">
              To<span className="text-red-600 ml-2">*</span>
            </label>
            <input
              type="date"
              name="toDate"
              className="border-2 border-gray-300 rounded focus:outline-none p-2 w-2/3"
              value={formData.toDate}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-4 mt-5">
            <label className="w-1/2 text-gray-500">
              Promo Application Mode<span className="text-red-600 ml-2">*</span>
            </label>
            <Select
              options={promoCodeModeOptions}
              value={promoCodeModeOptions.find(
                (option) => option.value === formData.applicationMode
              )}
              onChange={(option) =>
                setFormData({
                  ...formData,
                  applicationMode: option.value,
                })
              }
              className="border-gray-100 rounded focus:outline-none w-2/3"
              placeholder="Select application mode"
              isSearchable={true}
              isMulti={false}
            />
          </div>
          <div className="flex gap-4 mt-5">
            <label className="w-1/2 text-gray-500">
              Max discount value<span className="text-red-600 ml-2">*</span>
            </label>
            <input
              type="number"
              name="maxDiscountValue"
              value={formData.maxDiscountValue}
              className="border-2 border-gray-300 rounded focus:outline-none p-2 w-2/3"
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-4 mt-5">
            <label className="w-1/2 text-gray-500">
              Minimum order amount<span className="text-red-600 ml-2">*</span>
            </label>
            <input
              type="text"
              name="minOrderAmount"
              value={formData.minOrderAmount}
              className="border-2 border-gray-300 rounded focus:outline-none p-2 w-2/3"
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-4 mt-5">
            <label className="w-1/2 text-gray-500">
              Maximum number of allowed users
              <span className="text-red-600 ml-2">*</span>
            </label>
            <input
              type="number"
              name="maxAllowedUsers"
              value={formData.maxAllowedUsers}
              className="border-2 border-gray-300 rounded focus:outline-none p-2 w-2/3"
              onChange={handleChange}
            />
          </div>
          <div className="flex mt-5">
            <label className="w-1/2 text-gray-500">
              Applied on<span className="text-red-600 ml-2">*</span>
            </label>
            <input
              type="radio"
              name="appliedOn"
              value="Cart-value"
              className="-ml-12  mr-2"
              checked={formData.appliedOn === "Cart-value"}
              onChange={handleChange}
            />
            Cart Value
            <input
              type="radio"
              name="appliedOn"
              value="Delivery-charge"
              className="ml-4 mr-1"
              checked={formData.appliedOn === "Delivery-charge"}
              onChange={handleChange}
            />
            Delivery charge
          </div>
          <div className="flex gap-4 mt-5">
            <label className="w-1/2 text-gray-500">
              Assign Merchant<span className="text-red-600 ml-2">*</span>
            </label>

            <Select
              options={merchantOptions}
              value={merchantOptions.find(
                (option) => option.value === formData.merchantId
              )}
              onChange={(option) =>
                setFormData({
                  ...formData,
                  merchantId: option.value,
                })
              }
              className="border-gray-100 rounded focus:outline-none w-2/3"
              placeholder="Select merchant"
              isSearchable={true}
              isMulti={false}
              menuPlacement="top"
            />
          </div>
          <div className="flex gap-4 mt-5 ">
            <label className="w-1/2 text-gray-500">
              Geofence<span className="text-red-600 ml-2">*</span>
            </label>

            <Select
              options={geofenceOptions}
              value={geofenceOptions.find(
                (option) => option.value === formData.geofenceId
              )}
              onChange={(option) =>
                setFormData({
                  ...formData,
                  geofenceId: option.value,
                })
              }
              className="border-gray-100 rounded focus:outline-none w-2/3"
              placeholder="Select geofence"
              isSearchable={true}
              isMulti={false}
              menuPlacement="top"
            />
          </div>
          <div className="flex">
            <label className="mt-16">
              Image (342px x 160px)<span className="text-red-600 ml-2">*</span>
            </label>
            <div className=" flex items-center gap-[20px]">
              {!croppedFile && (
                <img
                  className="h-[66px] w-[66px] bg-gray-200 rounded-md mt-[38px] ml-[210px]"
                  src={formData.imageUrl}
                />
              )}
              {!!croppedFile && (
                <>
                  <div>
                    <img
                      ref={previewCanvasRef}
                      src={URL.createObjectURL(croppedFile)}
                      style={{
                        border: "1px solid white",
                        borderRadius: "5px",
                        objectFit: "contain",
                        width: "66px",
                        height: "66px",
                        marginTop: "38px",
                        marginLeft: "210px",
                      }}
                    />
                  </div>
                </>
              )}
              <input
                type="file"
                name="imageUrl"
                id="imageUrl"
                className="hidden"
                onChange={onSelectFile}
              />
              <label htmlFor="imageUrl" className="cursor-pointer ">
                <MdCameraAlt
                  className=" bg-teal-800  text-[40px] text-white p-6 h-16 w-16 mt-10 rounded"
                  size={30}
                />
              </label>
              {imgSrc && (
                <CropImage
                  selectedImage={img}
                  aspectRatio={1 / 1} // Optional, set aspect ratio (1:1 here)
                  onCropComplete={handleCropComplete}
                  onClose={handleModalClose} // Pass the handler to close the modal and reset the state
                />
              )}
            </div>
          </div>
          <div className="flex justify-end mt-10  gap-4">
            <button
              className="bg-gray-300 rounded-lg px-6 py-2 font-semibold justify-end"
              onClick={handleCancel}
              type="submit"
            >
              Cancel
            </button>
            <button
              className="bg-teal-800 rounded-lg px-6 py-2 text-white font-semibold justify-end"
              type="submit"
            >
              {isLoading ? "Saving...." : "save"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditPromoCodeModal;
