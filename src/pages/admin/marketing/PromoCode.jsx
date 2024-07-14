import React from "react";
import Sidebar from "../../../components/Sidebar";
import { Switch, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import GlobalSearch from "../../../components/GlobalSearch";
import { useState } from "react";
import { MdCameraAlt, MdOutlineEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

const PromoCode = () => {
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
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);

  const showModalEdit = () => {
    setIsModalVisibleEdit(true);
  };

  const handleOkEdit = () => {
    setIsModalVisibleEdit(false);
  };

  const handleCancelEdit = () => {
    setIsModalVisibleEdit(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  const tableData = [
    {
      Code: "1",
      Type: "Flat-Discount",
      Value: "123",
      MaxDiscount: "12",
      MinOrderAmount: "500",
      FromDate: "18/05/2003",
      ToDate: "18/06/2003",
      Description: "The testing description",
      PromoApplicationMode: "option1",
      PromoAppliedOn: "Cart",
      PromoUsed: "1",
      Status: true,
    },
  ];
  const [notificationFile, setNotificationFile] = useState(null);
  const [notificationPreviewURL, setNotificationPreviewURL] = useState(null);

  const handleNotificationImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setNotificationFile(file);
    setNotificationPreviewURL(URL.createObjectURL(file));
  };
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  const showModalDelete = () => {
    setIsShowModalDelete(true);
  };

  const showModalDeleteOk = () => {
    setIsShowModalDelete(false);
  };

  const showModalDeleteCancel = () => {
    setIsShowModalDelete(false);
  };

  return (
    <>
      <Sidebar />

      <div className="pl-[300px] bg-gray-100 w-fit h-fit">
        <div className="w-[1250px]">
          <nav className="p-5">
            <GlobalSearch />
          </nav>

          <div className="mx-5 flex justify-between">
            <h1 className="font-bold text-[20px]">Promo codes</h1>
            <Switch
              onChange={(checked) => onChange("agent", checked)}
              name="referral"
            />
          </div>

          <p className="m-5 text-gray-500">
            Promo codes are exclusive discount vouchers that can be redeemed by
            the customers during the checkout process
            <span className="flex justify-start">
              You can create customized promotional codes with a detailed
              description that will be visible to customers
            </span>
          </p>
          <div className="flex justify-end pr-5 mb-10">
            <button
              className="bg-teal-800 text-white rounded-md px-4 py-2 font-semibold  flex items-center  space-x-1 "
              onClick={showModal}
            >
              <PlusOutlined /> <span>Add Promo codes</span>
            </button>
            <Modal
              title="Add Promo Code"
              open={isModalVisible}
              className="w-[1000px]"
              onOk={handleOk}
              width="900px"
              onCancel={handleCancel}
              footer={null}
            >
              <div className="flex flex-col p-2 justify-between">
                <form onSubmit={handleSubmit}>
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
                    <label className="w-1/2 text-gray-500">
                      Promotion Type
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
                      value="Deliver-charge"
                      className="ml-4 mr-1"
                      checked={formData.appliedOn === "Deliver-charge"}
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
                      Assign Merchant
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
                      onClick={handleOk}
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </Modal>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="overflow-x-auto p-5 w-full">
            <thead>
              <tr className="p-5 w-full">
                {[
                  "Code",
                  "Type",
                  "Value",
                  "Maximum discount",
                  "Minimum order amount",
                  "Start Date",
                  "End Date",
                  "Description",
                  "Promo Application mode",
                  "Promo Applied on",
                  "Promo used (No. of Times)",
                  "Status",
                ].map((headers) => (
                  <th
                    key={headers}
                    className="bg-teal-800 text-white h-[70px] mt-10 px-5 text-center whitespace-nowrap"
                  >
                    {headers}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((dummyData) => (
                <tr className="text-center bg-white h-20" key={dummyData.id}>
                  <td>{dummyData.Code}</td>
                  <td>{dummyData.Type}</td>
                  <td>{dummyData.Value}</td>
                  <td>{dummyData.MaxDiscount}</td>
                  <td>{dummyData.MinOrderAmount}</td>
                  <td>{dummyData.FromDate}</td>
                  <td>{dummyData.ToDate}</td>
                  <td>{dummyData.Description}</td>
                  <td>{dummyData.PromoApplicationMode}</td>
                  <td>{dummyData.PromoAppliedOn}</td>
                  <td>{dummyData.PromoUsed}</td>
                  <td>
                    <div className="flex gap-3 items-center">
                      <div>
                        <Switch />
                      </div>
                      <div className="flex items-center">
                        <button onClick={showModalEdit}>
                          <MdOutlineEdit className="bg-gray-200 rounded-lg p-2 text-[35px]" />
                        </button>
                        <Modal
                          width="900px"
                          title="Edit Promo Code"
                          open={isModalVisibleEdit}
                          className="w-[1000px]"
                          onOk={handleOkEdit}
                          onCancel={handleCancelEdit}
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
                                  Assign Merchant
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
                                  onClick={handleCancelEdit}
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
                      </div>
                      <button onClick={showModalDelete}>
                        <RiDeleteBinLine className="bg-red-100 text-red-600 p-2 text-[35px] rounded-lg" />
                      </button>
                      <Modal
                        onOk={showModalDeleteOk}
                        onCancel={showModalDeleteCancel}
                        footer={null}
                        open={isShowModalDelete}
                        centered
                      >
                        <p className="font-semibold text-[18px] mb-5">
                          Are you sure want to delete?
                        </p>
                        <div className="flex justify-end">
                          <button
                            className="bg-cyan-100 px-5 py-1 rounded-md font-semibold"
                            onClick={showModalDeleteCancel}
                          >
                            Cancel
                          </button>
                          <button className="bg-teal-800 px-5 py-1 rounded-md ml-3 text-white">
                            {" "}
                            Delete
                          </button>
                        </div>
                      </Modal>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PromoCode;
