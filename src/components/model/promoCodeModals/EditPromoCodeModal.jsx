import { useToast } from "@chakra-ui/react";
import { Modal } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdCameraAlt } from "react-icons/md";

const EditPromoCodeModal = ({
  handleCancel,
  BASE_URL,
  currentPromoEdit,
  isVisible,
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
  const [notificationFile, setNotificationFile] = useState(null);
  const [notificationPreviewURL, setNotificationPreviewURL] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  // api call for get the promoCode details

  useEffect(() => {
    const fetchData = async () => {
      try {
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
          formData.fromDate = formatDate(formData.fromDate)
          formData.toDate = formatDate(formData.toDate)

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
      }
    };

    if (currentPromoEdit) {
      fetchData();
    }
  }, [token, currentPromoEdit, BASE_URL]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //API to edit the promo codes..

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

      if (notificationFile) {
        addPromoToSend.append("promoImage", notificationFile);
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
        toast({
          title: "PromoCode Updated.",
          description: "Promocode updated Successfully",
          duration: 9000,
          isClosable: true,
          status: "true",
        });
      }
    } catch (err) {
      console.error(`Error in update data ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setNotificationFile(file);
    setNotificationPreviewURL(URL.createObjectURL(file));
  };

     // Helper function to format date to "yyyy-MM-dd"
     const formatDate = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, "0");
      const day = String(date.getUTCDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

  return (
    <Modal
      width="900px"
      title="Edit Promo Code"
      open={isVisible}
      className="w-[1000px]"
      // onOk={handleOkEdit}
      onCancel={handleCancel}
      footer={null}
    >
      <div className="flex flex-col p-2 justify-between">
        <form onSubmit={handleSubmit} className="h-[30rem] overflow-auto">
          <div className="flex gap-4 mt-5">
            <label className="w-1/2 text-gray-500">Code</label>
            <input
              type="text"
              name="promoCode"
              className="border-2 border-gray-300 rounded p-2 w-2/3 focus:outline-none"
              value={formData.promoCode}
              onChange={handleChange}
            />
          </div>
          <div className="flex mt-5">
            <label className="w-1/2 text-gray-500">Promotion Type</label>
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
            <label className="w-1/2 text-gray-500">Discount</label>
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
            <label className="w-1/2 text-gray-500">From</label>
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
            <label className="w-1/2 text-gray-500">To</label>
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
              Promo Application Mode
            </label>
            <select
              name="applicationMode"
              value={formData.applicationMode}
              className="border-2 border-gray-300 rounded focus:outline-none p-2 w-2/3"
              onChange={handleChange}
            >
              <option defaultValue={""} selected hidden>
                Select Application Mode
              </option>
              <option value="Public">Public</option>
              <option value="Hidden">Hidden</option>
            </select>
          </div>
          <div className="flex gap-4 mt-5">
            <label className="w-1/2 text-gray-500">Max discount value</label>
            <input
              type="number"
              name="maxDiscountValue"
              value={formData.maxDiscountValue}
              className="border-2 border-gray-300 rounded focus:outline-none p-2 w-2/3"
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-4 mt-5">
            <label className="w-1/2 text-gray-500">Minimum order amount</label>
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
            <label className="w-1/2 text-gray-500">Applied on</label>
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
            <label className="w-1/2 text-gray-500">Assign Merchant</label>
            <select
              name="merchantId"
              className="border-2 border-gray-300 rounded focus:outline-none p-2 w-2/3"
              value={formData.merchantId}
              onChange={handleChange}
            >
              <option defaultValue={"Select merchant"} hidden>
                Select Merchant
              </option>
              {merchant.map((data) => (
                <option value={data._id} key={data._id}>
                  {data.merchantName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-4 mt-5 ">
            <label className="w-1/2 text-gray-500">Geofence</label>
            <select
              name="geofenceId"
              id="geofenceId"
              value={formData.geofenceId}
              className="border-2 border-gray-300 rounded focus:outline-none p-2 w-2/3"
              onChange={handleChange}
            >
              <option defaultValue={"Select geofence"} hidden>
                Select Geofence
              </option>
              {geofence.map((geofence) => (
                <option key={geofence._id} value={geofence._id}>
                  {geofence.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex">
            <label className="mt-16">Image (342px x 160px)</label>
            <div className=" flex items-center gap-[30px]">
              {!notificationPreviewURL && (
                <div className="bg-gray-400 ml-[230px] mt-10 h-16 w-16 rounded-md" />
              )}
              {notificationPreviewURL && (
                <figure className="ml-[230px] mt-10 h-16 w-16 rounded-md relative">
                  <img
                    src={notificationPreviewURL}
                    alt="profile"
                    className="w-full rounded h-full object-cover "
                  />
                </figure>
              )}
              <input
                type="file"
                name="imageUrl"
                id="imageUrl"
                className="hidden"
                onChange={handleNotificationImageChange}
              />
              <label htmlFor="imageUrl" className="cursor-pointer ">
                <MdCameraAlt
                  className=" bg-teal-800  text-[40px] text-white p-6 h-16 w-16 mt-10 rounded"
                  size={30}
                />
              </label>
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
