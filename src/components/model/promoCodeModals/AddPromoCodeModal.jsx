import React, { useEffect } from "react";
import { useState } from "react";
import { Modal } from "antd";
import { MdCameraAlt } from "react-icons/md";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const AddPromoCodeModal = ({
  isVisible,
  handleCancel,
  token,
  BASE_URL,
  onPromocodeAdd,
}) => {
  const [addPromocode, setAddPromocode] = useState({
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
  const [isLoading, setIsLoading] = useState(false);
  const [notificationFile, setNotificationFile] = useState(null);
  const [notificationPreviewURL, setNotificationPreviewURL] = useState(null);
  const toast = useToast();

  const handleNotificationImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNotificationFile(file);
      setNotificationPreviewURL(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const [geofenceResponse, merchantResponse] = await Promise.all([
          axios.get(`${BASE_URL}/admin/geofence/get-geofence`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BASE_URL}/merchants/admin/all-merchants`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        if (geofenceResponse.status === 200) {
          setGeofence(geofenceResponse.data.geofences);
        }
        if (merchantResponse.status === 200) {
          setMerchant(merchantResponse.data.data);
        }
      } catch (err) {
        console.log(`Error in fetching geofence ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleChange = (e) => {
    setAddPromocode({ ...addPromocode, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const addPromoToSend = new FormData();
      addPromoToSend.append("promoCode", addPromocode.promoCode);
      addPromoToSend.append("promoType", addPromocode.promoType);
      addPromoToSend.append("discount", addPromocode.discount);
      addPromoToSend.append("description", addPromocode.description);
      addPromoToSend.append("fromDate", addPromocode.fromDate);
      addPromoToSend.append("toDate", addPromocode.toDate);
      addPromoToSend.append("applicationMode", addPromocode.applicationMode);
      addPromoToSend.append("maxDiscountValue", addPromocode.maxDiscountValue);
      addPromoToSend.append("minOrderAmount", addPromocode.minOrderAmount);
      addPromoToSend.append("maxAllowedUsers", addPromocode.maxAllowedUsers);
      addPromoToSend.append("appliedOn", addPromocode.appliedOn);
      addPromoToSend.append("merchantId", addPromocode.merchantId);
      addPromoToSend.append("geofenceId", addPromocode.geofenceId);

      if (notificationFile) {
        addPromoToSend.append("promoImage", notificationFile);
      }

      const response = await axios.post(
        `${BASE_URL}/admin/promocode/add-promocode`,
        addPromoToSend,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setNotificationFile(null);
        setNotificationPreviewURL(null);
        onPromocodeAdd(response.data.data);
        handleCancel();
        toast({
          title: "Promo Code Created",
          description: "Successfully created Promo code..",
          status: "success",
          isClosable: true,
          duration: 9000,
        });
        // You may want to clear the form here
        // setAddPromocode({
        //   promoCode: "",
        //   promoType: "",
        //   discount: "",
        //   description: "",
        //   fromDate: "",
        //   toDate: "",
        //   applicationMode: "",
        //   maxDiscountValue: "",
        //   minOrderAmount: "",
        //   maxAllowedUsers: "",
        //   appliedOn: "",
        //   merchantId: "",
        //   geofenceId: "",
        //   imageUrl: "",
        // });
      }
    } catch (err) {
      console.log(`Error in adding data: ${err.message}`);
      toast({
        title: "Error while Creating..",
        description: "Error in creating Promo Code.",
        status: "error",
        isClosable: true,
        duration: 9000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Add Promo Code"
      open={isVisible}
      className="w-[1000px]"
      width="900px"
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
              value={addPromocode.promoCode}
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
              checked={addPromocode.promoType === "Flat-discount"}
              onChange={handleChange}
            />
            Flat discount
            <input
              type="radio"
              name="promoType"
              className="ml-3 mr-1"
              value="Percentage-discount"
              checked={addPromocode.promoType === "Percentage-discount"}
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
              value={addPromocode.discount}
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
              value={addPromocode.description}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-4 mt-5">
            <label className="w-1/2 text-gray-500">From</label>
            <input
              type="date"
              name="fromDate"
              min={new Date()}
              value={addPromocode.fromDate}
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
              value={addPromocode.toDate}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-4 mt-5">
            <label className="w-1/2 text-gray-500">
              Promo Application Mode
            </label>
            <select
              name="applicationMode"
              value={addPromocode.applicationMode}
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
              value={addPromocode.maxDiscountValue}
              className="border-2 border-gray-300 rounded focus:outline-none p-2 w-2/3"
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-4 mt-5">
            <label className="w-1/2 text-gray-500">Minimum order amount</label>
            <input
              type="text"
              name="minOrderAmount"
              value={addPromocode.minOrderAmount}
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
              value={addPromocode.maxAllowedUsers}
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
              checked={addPromocode.appliedOn === "Cart-value"}
              onChange={handleChange}
            />
            Cart Value
            <input
              type="radio"
              name="appliedOn"
              value="Delivery-charge"
              className="ml-4 mr-1"
              checked={addPromocode.appliedOn === "Delivery-charge"}
              onChange={handleChange}
            />
            Delivery charge
          </div>
          <div className="flex gap-4 mt-5">
            <label className="w-1/2 text-gray-500">Assign Merchant</label>
            <select
              name="merchantId"
              className="border-2 border-gray-300 rounded focus:outline-none p-2 w-2/3"
              value={addPromocode.merchantId}
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
              value={addPromocode.geofenceId}
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

export default AddPromoCodeModal;
