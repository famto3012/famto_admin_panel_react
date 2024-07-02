import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { BellOutlined } from "@ant-design/icons";
import { Modal, Switch } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { MdCameraAlt } from "react-icons/md";

const Adbanner = () => {
  const [appdata, SetAppData] = useState({
    name: "",
    merchantId: "",
    geofenceId: "",
    imageUrl: "",
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleConfirm = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (e) => {
    SetAppData({ ...appdata, [e.target.name]: e.target.value });
  };

  const signupAction = (e) => {
    e.preventDefault();
    console.log(appdata);
    handleCancel();
  };

  const showModalEdit = () => {
    setIsModalVisibleEdit(true);
  };

  const handleConfirmEdit = () => {
    setIsModalVisibleEdit(false);
  };

  const handleCancelEdit = () => {
    setIsModalVisibleEdit(false);
  };

  const [notificationFile, setNotificationFile] = useState(null);
  const [notificationPreviewURL, setNotificationPreviewURL] = useState(null);

  const handleNotificationImageChange = (e) => {
    const file = e.target.files[0];
    setNotificationFile(file);
    setNotificationPreviewURL(URL.createObjectURL(file));
  };
  const [tableData, setTableData] = useState([
    {
      imageUrl:<img src="sadhya.jpg"/>,
      name:"paru",
      merchantId: "2",
      geofence: "India",
      status: "",
    },
  ]);
  const onChange = (name, checked) => {
    setTableData({ ...dummyData, [name]: checked });
  };

  const [individualdata, SetIndividualData] = useState({
    name: "",
    merchantId: "",
    geofenceId: "",
    imageUrl: "",
  });

  const [isModalVisibleIndividual, setIsModalVisibleIndividual] = useState(false);
  const [isModalVisibleIndividualEdit, setIsModalVisibleIndividualEdit] = useState(false);

  const showModalIndividual = () => {
    setIsModalVisibleIndividual(true);
  };

  const handleConfirmIndividual = () => {
    setIsModalVisibleIndividual(false);
  };

  const handleCancelIndividual = () => {
    setIsModalVisibleIndividual(false);
  };

  const handleInputChangeIndividual = (e) => {
  SetIndividualData({ ...individualdata, [e.target.name]: e.target.value });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    console.log(individualdata);
    handleCancelIndividual();
  };

  const showModalIndividualEdit = () => {
    setIsModalVisibleIndividualEdit(true);
  };

  const handleConfirmIndividualEdit= () => {
    setIsModalVisibleIndividualEdit(false);
  };

  const handleCancelIndividualEdit = () => {
    setIsModalVisibleIndividualEdit(false);
  };

  const [adFile, setAdFile] = useState(null);
  const [adPreviewURL, setAdPreviewURL] = useState(null);

  const handleAdImageChange = (e) => {
    const file = e.target.files[0];
    setAdFile(file);
    setAdPreviewURL(URL.createObjectURL(file));
  };
  const [indtableData, setIndTableData] = useState([
    {
      imageUrl:<img src="sadhya.jpg"/>,
      name:"nandhu",
      merchantId: "2",
      geofence: "India",
      status: "",
    },
  ]);
  const onChanged = (name, checked) => {
    setIndTableData({ ...indtableData, [name]: checked });
  };










  return (
    <>
      <Sidebar />
      <div className="w-full min-h-screen pl-[300px] bg-gray-100 flex flex-col">
        <div className="flex justify-end p-4 gap-7">
          <BellOutlined className="text-2xl text-gray-500" />
          <div className="relative">
            <input
              type="search"
              name="search"
              placeholder="Search"
              className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none mr-5"
            />
            <button type="submit" className="absolute right-0 top-0 mt-2 mr-9">
              <SearchOutlined className="text-xl text-gray-600" />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between mx-10 mt-5">
          <h1 className="text-lg font-bold">Ad Banner</h1>
          <Switch />
        </div>
        <p className="mt-5 mx-10 text-[15px] text-gray-500">
          The purpose of a promotional banner is to promote a store. It can be
          used to display offers new{" "}
          <span className="flex justify-start">
            {" "}
            available items or discounts etc{" "}
          </span>
        </p>
        <div className="flex items-center justify-between mx-10 mt-5">
          <h1 className="text-lg font-bold">App Ad Banner</h1>
          <div>
            <button
              className="bg-teal-700 text-white rounded-md flex items-center px-9 py-2 "
              onClick={showModal}
            >
              <PlusOutlined className="mr-2" /> Add
            </button>
            <Modal
              title="Add App Ad Banner"
              open={isModalVisible}
              onOk={handleConfirm}
              className="mt-20"
              onCancel={handleCancel}
              footer={null}
            >
              <form onSubmit={signupAction}>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center">
                    <label htmlFor="name" className="w-1/3">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Name"
                      id="name"
                      name="name"
                      value={appdata.name}
                      onChange={handleInputChange}
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center">
                    <label htmlFor="merchantId" className="w-1/3">
                      Merchant ID
                    </label>
                    <input
                      type="id"
                      placeholder="Merchant ID"
                      id="merchantId"
                      name="merchantId"
                      value={appdata.merchantId}
                      onChange={handleInputChange}
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center">
                    <label htmlFor="geofenceId" className="w-1/3">
                      Geofence
                    </label>
                    <input
                      type="id"
                      placeholder="Geofence"
                      id="geofenceId"
                      name="geofenceId"
                      value={appdata.geofenceId}
                      onChange={handleInputChange}
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className=" w-1/3">
                      Banner Image (390px x 400px)
                    </label>
                    <div className="flex items-center gap-[30px]">
                      {!notificationPreviewURL && (
                        <div className="bg-cyan-50 shadow-md  mt-3 h-16 w-16 rounded-md" />
                      )}
                      {notificationPreviewURL && (
                        <figure className="mt-3 h-16 w-16 rounded-md relative">
                          <img
                            src={notificationPreviewURL}
                            alt="profile"
                            className="w-full rounded h-full object-cover"
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
                        className="cursor-pointer"
                      >
                        <MdCameraAlt
                          className="bg-teal-800 text-[30px] text-white p-4 h-16 w-16 mt-3 rounded-md"
                          size={30}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                  <button
                    className="bg-cyan-50 py-2 px-4 rounded-md"
                    type="button"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-teal-700 text-white py-2 px-4 rounded-md"
                    type="submit"
                    onClick={handleConfirm}
                  >
                    Save
                  </button>
                </div>
              </form>
            </Modal>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="overflow-x-auto p-4 w-full mt-7">
            <thead>
              <tr className="p-5 w-full">
                {[
                  "Image",
                  "Name",
                  "Merchant ID",
                  "Geofence",
                  "Status",
                  "Actions",
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
                  <td className="w-[120px] px-5">{dummyData.imageUrl}</td>
                  <td>{dummyData.name}</td>
                  <td>{dummyData.merchantId}</td>
                  <td>{dummyData.geofence}</td>
                  <td>
                    <Switch
                      onChange={(checked) => onChange("status", checked)}
                      name="status"
                    />
                  </td>
                  <td>
                   <div className='flex justify-center items-center gap-3'>
                
                    <button onClick={showModalEdit}>
                    <MdOutlineEdit className="bg-gray-200 rounded-lg p-2 text-[35px]" />
                    </button>
                    <Modal
                      title="Edit App Ad Banner"
                      open={isModalVisibleEdit}
                      onOk={handleConfirmEdit}
                      className="mt-20"
                      onCancel={handleCancelEdit}
                      footer={null}
                    >
                      <form onSubmit={signupAction}>
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center">
                            <label htmlFor="name" className="w-1/3">
                              Name
                            </label>
                            <input
                              type="text"
                              placeholder="Name"
                              id="name"
                              name="name"
                              value={appdata.name}
                              onChange={handleInputChange}
                              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                            />
                          </div>
                          <div className="flex items-center">
                            <label htmlFor="merchantId" className="w-1/3">
                              Merchant ID
                            </label>
                            <input
                              type="id"
                              placeholder="Merchant ID"
                              id="merchantId"
                              name="merchant.Id"
                              value={appdata.merchantId}
                              onChange={handleInputChange}
                              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                            />
                          </div>
                          <div className="flex items-center">
                            <label htmlFor="geofenceId" className="w-1/3">
                              Geofence
                            </label>
                            <input
                              type="id"
                              placeholder="Geofence"
                              id="geofenceId"
                              name="geofenceId"
                              value={appdata.geofenceId}
                              onChange={handleInputChange}
                              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                            />
                          </div>
                          <div className="flex items-center">
                            <label className=" w-1/3">
                              Banner Image (390px x 400px)
                            </label>
                            <div className="flex items-center gap-[30px]">
                              {!notificationPreviewURL && (
                                <div className="bg-cyan-50 shadow-md  mt-3 h-16 w-16 rounded-md" />
                              )}
                              {notificationPreviewURL && (
                                <figure className="mt-3 h-16 w-16 rounded-md relative">
                                  <img
                                    src={notificationPreviewURL}
                                    alt="profile"
                                    className="w-full rounded h-full object-cover"
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
                                className="cursor-pointer"
                              >
                                <MdCameraAlt
                                  className="bg-teal-800 text-[30px] text-white p-4 h-16 w-16 mt-3 rounded-md"
                                  size={30}
                                />
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end gap-4 mt-6">
                          <button
                            className="bg-cyan-50 py-2 px-4 rounded-md"
                            type="button"
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </button>
                          <button
                            className="bg-teal-700 text-white py-2 px-4 rounded-md"
                            type="submit"
                            onClick={handleConfirmEdit}
                          >
                            Save
                          </button>
                        </div>
                      </form>
                    </Modal>
                    
                    <div>
                    <RiDeleteBinLine className="text-red-900 rounded-lg bg-red-100 p-2 text-[35px]" />
                    </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    
      
        <div className="flex items-center justify-between mx-10 mt-10">
          <h1 className="text-lg font-bold">Individual Merchant Ad Banner</h1>
          <div>
            <button
              className="bg-teal-700 text-white rounded-md flex items-center px-9 py-2 "
              onClick={showModalIndividual}
            >
              <PlusOutlined className="mr-2" /> Add
            </button>
            <Modal
              title="Individual Merchant Ad Banner"
              open={isModalVisibleIndividual}
              onOk={handleConfirmIndividual}
              className="mt-20"
              onCancel={handleCancelIndividual}
              footer={null}
            >
              <form onSubmit={formSubmit}>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center">
                    <label htmlFor="name" className="w-1/3">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Name"
                      id="name"
                      name="name"
                      value={individualdata.name}
                      onChange={handleInputChangeIndividual}
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center">
                    <label htmlFor="merchantId" className="w-1/3">
                      Merchant ID
                    </label>
                    <input
                      type="id"
                      placeholder="Merchant ID"
                      id="merchantId"
                      name="merchantId"
                      value={individualdata.merchantId}
                      onChange={handleInputChangeIndividual}
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center">
                    <label htmlFor="geofenceId" className="w-1/3">
                      Geofence
                    </label>
                    <input
                      type="id"
                      placeholder="Geofence"
                      id="geofenceId"
                      name="geofenceId"
                      value={individualdata.geofenceId}
                      onChange={handleInputChangeIndividual}
                      className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className=" w-1/3">
                      Banner Image (390px x 400px)
                    </label>
                    <div className="flex items-center gap-[30px]">
                      {!adPreviewURL && (
                        <div className="bg-cyan-50 shadow-md  mt-3 h-16 w-16 rounded-md" />
                      )}
                      {adPreviewURL && (
                        <figure className="mt-3 h-16 w-16 rounded-md relative">
                          <img
                            src={adPreviewURL}
                            alt="profile"
                            className="w-full rounded h-full object-cover"
                          />
                        </figure>
                      )}
                      <input
                        type="file"
                        name="adImage"
                        id="adImage"
                        className="hidden"
                        onChange={handleAdImageChange}
                      />
                      <label
                        htmlFor="adImage"
                        className="cursor-pointer"
                      >
                        <MdCameraAlt
                          className="bg-teal-800 text-[30px] text-white p-4 h-16 w-16 mt-3 rounded-md"
                          size={30}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                  <button
                    className="bg-cyan-50 py-2 px-4 rounded-md"
                    type="button"
                    onClick={handleCancelIndividual}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-teal-700 text-white py-2 px-4 rounded-md"
                    type="submit"
                    onClick={handleConfirmIndividual}
                  >
                    Save
                  </button>
                </div>
              </form>
            </Modal>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="overflow-x-auto p-4 w-full mt-7">
            <thead>
              <tr className="p-5 w-full">
                {[
                  "Image",
                  "Name",
                  "Merchant ID",
                  "Geofence",
                  "Status",
                  "Actions",
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
              {indtableData.map((dummyData1) => (
                <tr className="text-center bg-white h-20" key={dummyData1.id}>
                  <td className="w-[120px] px-5">{dummyData1.imageUrl}</td>
                  <td>{dummyData1.name}</td>
                  <td>{dummyData1.merchantId}</td>
                  <td>{dummyData1.geofence}</td>
                  <td>
                    <Switch
                      onChange={(checked) => onChange("status", checked)}
                      name="status"
                    />
                  </td>
                  <td>
                   <div className='flex justify-center items-center gap-3'>
                    
                    <button onClick={showModalIndividualEdit}>
                    <MdOutlineEdit className="bg-gray-200 rounded-lg p-2 text-[35px]" />
                    </button>
                    <Modal
                      title="Edit Individual Merchant Ad Banner"
                      open={isModalVisibleIndividualEdit}
                      onOk={handleConfirmIndividualEdit}
                      className="mt-20"
                      onCancel={handleCancelIndividualEdit}
                      footer={null}
                    >
                      <form onSubmit={formSubmit}>
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center">
                            <label htmlFor="name" className="w-1/3">
                              Name
                            </label>
                            <input
                              type="text"
                              placeholder="Name"
                              id="name"
                              name="name"
                              value={individualdata.name}
                              onChange={handleInputChangeIndividual}
                              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                            />
                          </div>
                          <div className="flex items-center">
                            <label htmlFor="merchantId" className="w-1/3">
                              Merchant ID
                            </label>
                            <input
                              type="id"
                              placeholder="Merchant ID"
                              id="merchantId"
                              name="merchant.Id"
                              value={individualdata.merchantId}
                              onChange={handleInputChangeIndividual}
                              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                            />
                          </div>
                          <div className="flex items-center">
                            <label htmlFor="geofenceId" className="w-1/3">
                              Geofence
                            </label>
                            <input
                              type="id"
                              placeholder="Geofence"
                              id="geofenceId"
                              name="geofenceId"
                              value={individualdata.geofenceId}
                              onChange={handleInputChangeIndividual}
                              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                            />
                          </div>
                          <div className="flex items-center">
                            <label className=" w-1/3">
                              Banner Image (390px x 400px)
                            </label>
                            <div className="flex items-center gap-[30px]">
                              {!adPreviewURL && (
                                <div className="bg-cyan-50 shadow-md  mt-3 h-16 w-16 rounded-md" />
                              )}
                              {adPreviewURL && (
                                <figure className="mt-3 h-16 w-16 rounded-md relative">
                                  <img
                                    src={adPreviewURL}
                                    alt="profile"
                                    className="w-full rounded h-full object-cover"
                                  />
                                </figure>
                              )}
                              <input
                                type="file"
                                name="adImage"
                                id="adImage"
                                className="hidden"
                                onChange={handleAdImageChange}
                              />
                              <label
                                htmlFor="adImage"
                                className="cursor-pointer"
                              >
                                <MdCameraAlt
                                  className="bg-teal-800 text-[30px] text-white p-4 h-16 w-16 mt-3 rounded-md"
                                  size={30}
                                />
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end gap-4 mt-6">
                          <button
                            className="bg-cyan-50 py-2 px-4 rounded-md"
                            type="button"
                            onClick={handleCancelIndividualEdit}
                          >
                            Cancel
                          </button>
                          <button
                            className="bg-teal-700 text-white py-2 px-4 rounded-md"
                            type="submit"
                            onClick={handleConfirmIndividualEdit}
                          >
                            Save
                          </button>
                        </div>
                      </form>
                    </Modal>
                  
                    <div>
                    <RiDeleteBinLine className="text-red-900 rounded-lg bg-red-100 p-2 text-[35px]" />
                    </div>
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

export default Adbanner;
