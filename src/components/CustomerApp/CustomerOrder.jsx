import React, { useContext, useEffect, useState } from "react";
import { MdCameraAlt } from "react-icons/md";
import { Switch,Card, Modal } from "antd";
import { RiDeleteBinLine } from "react-icons/ri";
import { PlusOutlined } from "@ant-design/icons";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { MdOutlineEdit } from "react-icons/md";
import { useToast } from "@chakra-ui/react";
import { DeleteOutlined } from "@mui/icons-material";

const CustomerOrder = () => {
  const [isShowModalDeleteCustomer, setIsShowModalDeleteCustomer] =
    useState(false);
  const [isModalVisibleBanner, setIsModalVisibleBanner] = useState(false);
  const [isModalVisibleBannerEdit, setIsModalVisibleBannerEdit] =
    useState(false);
  const [banner, setBanner] = useState({
    title: "",
    description: "",
    imageURL: "",
  });
  const handleBannerChange = (e) => {
    setBanner({ ...banner, [e.target.name]: e.target.value });
  };

  const handleBanner = (e) => {
    e.preventDefault();

    console.log("Banner", banner);
  };
  const showModalBanner = () => {
    setIsModalVisibleBanner(true);
  };

  const showModalBannerEdit = () => {
    setIsModalVisibleBannerEdit(true);
  };

  const ShowModalDeleteCustomer = () => {
    setIsShowModalDeleteCustomer(true);
  };

  const handleCancel = () => {
    setIsShowModalDeleteCustomer(false);
    setIsShowModalDelete(false);
    setIsModalVisibleBanner(false);
  };

  const [bannerFile, setBannerFile] = useState(null);
  const [bannerPreviewURL, setBannerPreviewURL] = useState(null);

  const handleBannerImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setBannerFile(file);
    setBannerPreviewURL(URL.createObjectURL(file));
  };

  
  const [serviceFile, setServiceFile] = useState(null);
  const [servicePreviewURL, setServicePreviewURL] = useState(null);

  const handleServiceImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setServiceFile(file);
    setServicePreviewURL(URL.createObjectURL(file));
  };

  return (
    <div>
      <div className="mt-10 justify-between flex mx-5">
        <h1>Customer Order Banners (info)</h1>
        <p className="w-[45rem] text-gray-500">
          The Purpose of this banner is to educate customer.
        </p>
        <Switch />
      </div>
      <div className=" ml-[335px] mt-5">
        <button
          onClick={showModalBanner}
          className="bg-teal-800 text-white  rounded-lg p-2"
        >
          <PlusOutlined /> Add Banner
        </button>
        <Modal
          title="Add Banner"
          open={isModalVisibleBanner}
          className="mt-24"
          onCancel={handleCancel}
          footer={null} // Custom footer to include form buttons
        >
          <form onSubmit={handleBanner}>
            <div className="flex mt-5 gap-4">
              <label className="w-1/2 text-gray-500">Service title</label>
              <input
                type="text"
                className="border-2 border-gray-300 rounded p-2 focus:outline-none w-2/3"
                name="title"
                value={banner.title}
                onChange={handleBannerChange}
              />
            </div>
            <div className="flex mt-5  gap-4">
              <label className="w-1/2 text-gray-500">Description</label>
              <input
                type="text"
                className="border-2 border-gray-300 rounded p-2 focus:outline-none w-2/3"
                name="description"
                value={banner.description}
                onChange={handleBannerChange}
              />
            </div>
            <div className="flex">
              <label className="mt-5">Image (342px x 160px)</label>
              <div className=" flex items-center gap-[30px]">
                {!bannerPreviewURL && (
                  <div className="bg-gray-400 ml-20 mt-5 h-16 w-16 rounded-md" />
                )}
                {bannerPreviewURL && (
                  <figure className="ml-20 mt-5 h-16 w-16 rounded-md relative">
                    <img
                      src={bannerPreviewURL}
                      alt="profile"
                      className="w-full rounded h-full object-cover "
                    />
                  </figure>
                )}
                <input
                  type="file"
                  name="bannerImage"
                  id="bannerImage"
                  className="hidden"
                  onChange={handleBannerImageChange}
                />
                <label htmlFor="bannerImage" className="cursor-pointer ">
                  <MdCameraAlt
                    className=" bg-teal-800  text-[40px] text-white p-6 h-16 w-16 mt-5 rounded"
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
                {" "}
                Cancel
              </button>
              <button
                className="bg-teal-800 rounded-lg px-6 py-2 text-white font-semibold justify-end"
                type="submit"
              >
                Add
              </button>
            </div>
          </form>
        </Modal>
      </div>
      <div className="grid grid-cols-2 ml-[335px] mt-10  gap-5">
        <Card className="w-[23rem]">
          <p>Card 1</p>
          <p className="font-semibold">{banner.title}</p>
          <p>{banner.description}</p>
          <img src="Sadhya.svg" />
          <button
            className="bg-blue-50 rounded-3xl p-3 px-12 mt-5"
            onClick={showModalBannerEdit}
          >
            <MdOutlineEdit /> Edit
          </button>
          <Modal
            title="Edit Banner"
            open={isModalVisibleBannerEdit}
            className="mt-24"
            onCancel={handleCancel}
            footer={null} // Custom footer to include form buttons
          >
            <form onSubmit={handleBanner}>
              <div className="flex mt-5 gap-4">
                <label className="w-1/2 text-gray-500">Service title</label>
                <input
                  type="text"
                  className="border-2 border-gray-300 rounded p-2 focus:outline-none w-2/3"
                  name="title"
                  value={banner.title}
                  onChange={handleBannerChange}
                />
              </div>
              <div className="flex mt-5  gap-4">
                <label className="w-1/2 text-gray-500">Geofence</label>
                <input
                  type="text"
                  className="border-2 border-gray-300 rounded p-2 focus:outline-none w-2/3"
                  name="description"
                  value={banner.description}
                  onChange={handleBannerChange}
                />
              </div>
              <div className="flex">
                <label className="mt-5">Image (342px x 160px)</label>
                <div className=" flex items-center gap-[30px]">
                  {!bannerPreviewURL && (
                    <div className="bg-gray-400 ml-20 mt-5 h-16 w-16 rounded-md" />
                  )}
                  {bannerPreviewURL && (
                    <figure className="ml-20 mt-5 h-16 w-16 rounded-md relative">
                      <img
                        src={bannerPreviewURL}
                        alt="profile"
                        className="w-full rounded h-full object-cover "
                      />
                    </figure>
                  )}
                  <input
                    type="file"
                    name="bannerURL"
                    id="bannerURL"
                    className="hidden"
                    onChange={handleServiceImageChange}
                  />
                  <label htmlFor="bannerImage" className="cursor-pointer ">
                    <MdCameraAlt
                      className=" bg-teal-800  text-[40px] text-white p-6 h-16 w-16 mt-5 rounded"
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
                  {" "}
                  Cancel
                </button>
                <button
                  className="bg-teal-800 rounded-lg px-6 py-2 text-white font-semibold justify-end"
                  type="submit"
                >
                  Add
                </button>
              </div>
            </form>
          </Modal>
          <button
            className="bg-red-100 rounded-3xl p-3 text-red-700 ml-5 px-12 mt-5"
            onClick={ShowModalDeleteCustomer}
          >
            <DeleteOutlined /> Delete
          </button>
          <Modal
            onCancel={handleCancel}
            footer={null}
            open={isShowModalDeleteCustomer}
            centered
          >
            <form>
              <p className="font-bold text-[20px] mb-5">
                Are you sure want to delete?
              </p>
              <div className="flex justify-end">
                <button
                  className="bg-zinc-200 p-2 rounded-md font-semibold"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button className="bg-red-100 p-2 rounded-md ml-3 px-2 text-red-700">
                  {" "}
                  Delete
                </button>
              </div>
            </form>
          </Modal>
        </Card>
      </div>
    </div>
  );
};

export default CustomerOrder;
