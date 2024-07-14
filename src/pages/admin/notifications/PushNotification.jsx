import React, { useState } from "react";
import GlobalSearch from "../../../components/GlobalSearch";
import Sidebar from "../../../components/Sidebar";
import { MdCameraAlt } from "react-icons/md";
import { Modal, Switch } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import FilterAltOutlined from "@mui/icons-material/FilterAltOutlined";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";

const PushNotification = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    geofenceId: "",
    imageUrl: "",
    type: "",
    customer: null,
    driver: null,
    agent: null,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitAction = async (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const [notificationFile, setNotificationFile] = useState(null);
  const [notificationPreviewURL, setNotificationPreviewURL] = useState(null);

  const handleNotificationImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setNotificationFile(file);
    setNotificationPreviewURL(URL.createObjectURL(file));
  };

  const onChange = (name, checked) => {
    setFormData({ ...formData, [name]: checked });
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
      <div className="pl-[300px] bg-gray-100">
        <div className="p-5">
          <GlobalSearch />
        </div>
        <header className="font-bold ml-5">Push Notifications</header>
        <div className="bg-white text-[16px] mx-5 rounded-lg mt-5 text-gray-700">
          <form onSubmit={submitAction}>
            <div className="flex">
              <label className="mt-10 ml-10">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                className="border-2 border-gray-300 rounded ml-60 mt-10  w-96 p-2 outline-none focus:outline-none"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex">
              <label className="mt-10 ml-10 w-48">
                Description (This note will be shown in notification.)
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                className="border-2 border-gray-300 rounded  mt-10 ml-20  w-96 outline-none focus:outline-none p-2"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex">
              <label className="mt-10 ml-10">Geofence</label>
              <select
                name="geofenceId"
                value={formData.geofenceId}
                className="border-2 border-gray-300 rounded ml-52 mt-10  w-96 p-2 focus:outline-none"
                onChange={handleInputChange}
              >
                <option hidden>Select Geofence</option>
                <option value="TVM">TVM</option>
                <option value="PMg">PMG</option>
              </select>
            </div>
            <div className="flex">
              <label className="mt-16 ml-10">Image (342px x 160px)</label>
              <div className=" flex items-center gap-[30px]">
                {!notificationPreviewURL && (
                  <div className="bg-gray-400 ml-[115px] mt-10 h-20 w-20 rounded-md" />
                )}
                {notificationPreviewURL && (
                  <figure className="ml-[115px] mt-10 h-20 w-20 rounded-mdrelative">
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
                <label htmlFor="notificationImage" className="cursor-pointer ">
                  <MdCameraAlt
                    className=" bg-teal-800  text-[40px] text-white p-6 h-20 w-20 mt-10 rounded"
                    size={30}
                  />
                </label>
              </div>
            </div>
            <div className="flex">
              <label className="mt-10 ml-10">Customer App</label>
              <Switch
                className="mt-11 ml-44"
                onChange={(checked) => onChange("customer", checked)}
                name="agent"
              />
            </div>
            <div className="flex">
              <label className="mt-10 ml-10">Agent App</label>
              <Switch
                className="mt-11 ml-[200px]"
                onChange={(checked) => onChange("agent", checked)}
                name="agent"
              />
            </div>
            <div className="flex">
              <label className="mt-10 ml-10">Driver App</label>
              <Switch
                className="mt-11 ml-[200px]"
                onChange={(checked) => onChange("driver", checked)}
                name="driver"
              />
            </div>
            <div className="flex justify-end  mb-10 gap-4">
              <button
                className="bg-gray-200 rounded-lg px-8 py-2 right-10 mb-5 mr-5 font-semibold justify-end"
                type="submit"
              >
                Cancel
              </button>
              <button
                className="bg-teal-800 rounded-lg px-8 py-2 right-5 mb-5 mr-10 text-white font-semibold justify-end"
                type="submit"
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
        <p className="font-bold ml-5">Push Notification log</p>
        <div className="bg-white mx-5 rounded-lg mt-5 flex p-8 justify-between">
          <select
            name="type"
            value={formData.type}
            className="bg-blue-50 rounded-lg p-3"
            onChange={handleInputChange}
          >
            <option hidden selected>
              Type of user
            </option>
            <option value="customer">Customer</option>
            <option value="agent">Agent</option>
            <option value="driver">Driver</option>
          </select>
          <div>
            <FilterAltOutlined className="text-gray-500" />
            <input
              type="search"
              name="search"
              placeholder="search push notification name"
              className="bg-gray-100 h-10 px-5 pr-10 rounded-full ml-5 w-72 text-sm focus:outline-none"
            />
            <button type="submit" className="absolute right-16 mt-2">
              <SearchOutlined className="text-xl text-gray-600" />
            </button>
          </div>
        </div>
        <table className="w-full mt-10">
          <thead>
            <tr>
              {[
                "Type of User",
                "Description",
                "Image",
                "Customer App",
                "Driver App",
                "Agent App",
                "Action",
              ].map((header) => (
                <th
                  key={header}
                  className="bg-teal-800 text-white h-[70px] text-center w-screen"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="text-center bg-white h-20">
              <td>{formData.type}</td>
              <td>{formData.description}</td>
              <td>{formData.imageUrl}</td>
              <td>{formData.customer}</td>
              <td>{formData.driver}</td>
              <td>{formData.agent}</td>
              <td>
                <div className="flex items-center justify-center gap-3">
                  <button>
                    <AiOutlineCloudUpload className="bg-green-100 text-green-500 text-[35px] p-2  rounded-lg" />
                  </button>
                  <button
                    onClick={showModalDelete}
                    className="outline-none focus:outline-none"
                  >
                    <RiDeleteBinLine className="text-red-900 rounded-lg bg-red-100 p-2 text-[35px]" />
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
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PushNotification;
