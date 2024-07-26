import { Modal } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdCameraAlt } from 'react-icons/md';

const EditPromoCodeModal = (
   { 
    handleCancel,
    BASE_URL,
    currentPromoEdit,
    handleOkEdit,
    isVisible,
    token
  }
) => {
    const [formData, setFormData] = useState({
        promoCode: "",
        promoType: "",
        discount: "",
        description: "",
        fromDate: "",
        toDate: "",
        promoApplicationMode: "",
        maxDiscountValue: "",
        minOrderAmount: "",
        maxAllowedUsers: "",
        appliedOn: "",
        merchantId: "",
        geofenceId: "",
        imageUrl: ""
      });

      // api call for get the promoCode details

      useEffect(() => {

        const fetchData = async() => {

          try {
            setIsLoading(true);

            const response = await axios.get(
              `${BASE_URL}/admin/`
            )
            
          } catch (error) {
            
          }
        }
      })
      console.log(currentPromoEdit);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    

      //API to edit the promo codes..

      
      const handleSubmit = async(currentPromoEdit) => {
       e.preventDefault();

       try{
       const response = await axios.put(
        `${BASE_URL}/admin/promocode/edit-promocode/${currentPromoEdit}`,{}
        , {
          withCredentials: true,
          headers: {Authorization : `Bearer ${token}`}
        }
       );
       if (response.status === 200) {
        handleCancel();
       }
      }catch (err) {
        console.error(`Error in update data ${err}`)
      }
      };

      const [notificationFile, setNotificationFile] = useState(null);
      const [notificationPreviewURL, setNotificationPreviewURL] = useState(null);
    
      const handleNotificationImageChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setNotificationFile(file);
        setNotificationPreviewURL(URL.createObjectURL(file));
      };

  return (
    <Modal
    width="900px"
    title="Edit Promo Code"
    open={isVisible}
    className="w-[1000px]"
    onOk={handleOkEdit}
    onCancel={handleCancel}
    footer={null}
  >
    <div className="flex flex-col p-2 justify-between">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-4 mt-5">
          <label className="w-1/2 text-gray-500">
            Code
          </label>
          <input
            type="text"
            name="promoCode"
            className="border-2 border-gray-300 rounded focus:outline-none p-2 w-2/3"
            value={formData.promoCode}
            onChange={handleChange}
          />
        </div>
        <div className="flex mt-5">
          <label className="w-1/2 text-gray-500">
            Promotion Type
          </label>
          <input
            type="radio"
            name="promoType"
            value="Flat-discount"
            className="-ml-10 mr-1"
            checked={
              formData.promoType === "Flat-discount"
            }
            onChange={handleChange}
          />
          Flat discount
          <input
            type="radio"
            name="promoType"
            className="ml-3 mr-1"
            value="Percentage-discount"
            checked={
              formData.promoType === "Percentage-discount"
            }
            onChange={handleChange}
          />
          Percentage discount
        </div>
        <div className="flex gap-4 mt-5">
          <label className="w-1/2 text-gray-500">
            Discount
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
            className="border-2 border-gray-300 rounded focus:outline-none p-2 w-2/3"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-4 mt-5">
          <label className="w-1/2 text-gray-500">
            From
          </label>
          <input
            type="date"
            name="fromDate"
            value={formData.fromDate}
            className="border-2 border-gray-300 rounded focus:outline-none p-2 w-2/3"
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-4 mt-5">
          <label className="w-1/2 text-gray-500">
            To
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
            Promo Application Mode
          </label>
          <select
            name="promoApplicationMode"
            value={formData.promoApplicationMode}
            className="border-2 border-gray-300 rounded focus:outline-none p-2 w-2/3"
            onChange={handleChange}
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>
        </div>
        <div className="flex gap-4 mt-5">
          <label className="w-1/2 text-gray-500">
            Max discount value
          </label>
          <input
            type="text"
            name="maxDiscountValue"
            value={formData.maxDiscountValue}
            className="border-2 border-gray-300 rounded focus:outline-none p-2 w-2/3"
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-4 mt-5">
          <label className="w-1/2 text-gray-500">
            Minimum order amount
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
          </label>
          <input
            type="text"
            name="maxAllowedUsers"
            value={formData.maxAllowedUsers}
            className="border-2 border-gray-300 rounded focus:outline-none p-2 w-2/3"
            onChange={handleChange}
          />
        </div>
        <div className="flex mt-5">
          <label className="w-1/2 text-gray-500">
            Applied on
          </label>
          <input
            type="radio"
            name="appliedOn"
            value="Cart-value"
            className="-ml-10  mr-2"
            checked={formData.appliedOn === "Cart-value"}
            onChange={handleChange}
          />
          Cart Value
          <input
            type="radio"
            name="appliedOn"
            value="Deliver-charge"
            className="ml-4 mr-1"
            checked={
              formData.appliedOn === "Deliver-charge"
            }
            onChange={handleChange}
          />
          Deliver charge
        </div>
        <div className="flex gap-4 mt-5">
          <label className="w-1/2 text-gray-500">
            Assign Merchant
          </label>
          <select
            name="merchantId"
            className="border-2 border-gray-300 rounded focus:outline-none p-2 w-2/3"
            value={formData.merchantId}
            onChange={handleChange}
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>
        </div>
        <div className="flex gap-4 mt-5 ">
          <label className="w-1/2 text-gray-500">
            Geofence
          </label>
          <select
            name="geofenceId"
            value={formData.geofenceId}
            className="border-2 border-gray-300 rounded focus:outline-none p-2 w-2/3"
            onChange={handleChange}
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>
        </div>
        <div className="flex">
          <label className="mt-16">
            Image (342px x 160px)
          </label>
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
              name="notificationImage"
              id="notificationImage"
              className="hidden"
              onChange={handleNotificationImageChange}
            />
            <label
              htmlFor="notificationImage"
              className="cursor-pointer "
            >
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
            onClick={handleOkEdit}
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </Modal>
  )
}

export default EditPromoCodeModal
