import React, { useContext, useEffect, useState } from "react";
import { MdCameraAlt } from "react-icons/md";
import { Switch, Card, Modal } from "antd";
import { RiDeleteBinLine } from "react-icons/ri";
import { PlusOutlined } from "@ant-design/icons";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { MdOutlineEdit } from "react-icons/md";
import { useToast } from "@chakra-ui/react";
import { DeleteOutlined } from "@mui/icons-material";

const PickAndDrop = () => {
  const [pickDrop, setPickDrop] = useState({
    title: "",
    description: "",
    imageURL: "",
  });

  const [isModalVisiblePickDrop, setIsModalVisiblePickDrop] = useState(false);
  const [isModalVisiblePickDropEdit, setIsModalVisiblePickDropEdit] =
    useState(false);

  const [isShowModalDeletePick, setIsShowModalDeletePick] = useState(false);

  const handlePickDropChange = (e) => {
    setPickDrop({ ...pickDrop, [e.target.name]: e.target.value });
  };

  const handlePickDrop = (e) => {
    e.preventDefault();

    console.log("Pick & Drop", pickDrop);
  };
  const [pickDropFile, setPickDropFile] = useState(null);
  const [pickDropPreviewURL, setPickDropPreviewURL] = useState(null);

  const handlePickDropImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setPickDropFile(file);
    setPickDropPreviewURL(URL.createObjectURL(file));
  };
  const showModalPickDrop = () => {
    setIsModalVisiblePickDrop(true);
  };

  const showModalPickDropEdit = () => {
    setIsModalVisiblePickDropEdit(true);
  };

  const showModalDeletePick = () => {
    setIsShowModalDeletePick(true);
  };

  const handleCancel = () => {
    setIsShowModalDeletePick(false);
    setIsModalVisiblePickDrop(false);
    setIsModalVisiblePickDropEdit(false);
  };

  return (
    <div>
      <div className="mt-10 justify-between flex mx-5">
        <h1>Pick and drop banners (info)</h1>
        <p className="w-[45rem] text-gray-500">
          The Purpose of this banner is to educate customer.
        </p>
        <Switch />
      </div>
      <div className=" ml-[335px] mt-5">
        <button
          onClick={showModalPickDrop}
          className="bg-teal-800 text-white  rounded-lg p-2"
        >
          <PlusOutlined /> Add Banner
        </button>
        <Modal
          title="Add Banner"
          open={isModalVisiblePickDrop}
          className="mt-24"
          onCancel={handleCancel}
          footer={null} // Custom footer to include form buttons
        >
          <form onSubmit={handlePickDrop}>
            <div className="flex mt-5 gap-4">
              <label className="w-1/2 text-gray-500">Service title</label>
              <input
                type="text"
                className="border-2 border-gray-300 rounded p-2 focus:outline-none w-2/3"
                name="title"
                value={pickDrop.title}
                onChange={handlePickDropChange}
              />
            </div>
            <div className="flex mt-5  gap-4">
              <label className="w-1/2 text-gray-500">Geofence</label>
              <input
                type="text"
                className="border-2 border-gray-300 rounded p-2 focus:outline-none w-2/3"
                name="description"
                value={pickDrop.description}
                onChange={handlePickDropChange}
              />
            </div>
            <div className="flex">
              <label className="mt-5">Image (342px x 160px)</label>
              <div className=" flex items-center gap-[30px]">
                {!pickDropPreviewURL && (
                  <div className="bg-gray-400 ml-20 mt-5 h-16 w-16 rounded-md" />
                )}
                {pickDropPreviewURL && (
                  <figure className="ml-20 mt-5 h-16 w-16 rounded-md relative">
                    <img
                      src={pickDropPreviewURL}
                      alt="profile"
                      className="w-full rounded h-full object-cover "
                    />
                  </figure>
                )}
                <input
                  type="file"
                  name="pickDrop"
                  id="pickDrop"
                  className="hidden"
                  onChange={handlePickDropImageChange}
                />
                <label htmlFor="pickDrop" className="cursor-pointer ">
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

      <div className="grid grid-cols-2 ml-[335px]  mt-10  gap-5">
        <Card className="w-[23rem]">
          <p>Card 1</p>
          <p className="font-semibold">{pickDrop.title}</p>
          <p>{pickDrop.description}</p>
          <img src="Sadhya.svg" />
          <button
            className="bg-blue-50 rounded-3xl p-3 px-12 mt-5"
            onClick={showModalPickDropEdit}
          >
            <MdOutlineEdit /> Edit
          </button>
          <Modal
            title="Edit Banner"
            open={isModalVisiblePickDropEdit}
            className="mt-24"
            onCancel={handleCancel}
            footer={null} // Custom footer to include form buttons
          >
            <form onSubmit={handlePickDrop}>
              <div className="flex mt-5 gap-4">
                <label className="w-1/2 text-gray-500">Service title</label>
                <input
                  type="text"
                  className="border-2 border-gray-300 rounded p-2 focus:outline-none w-2/3"
                  name="title"
                  value={pickDrop.title}
                  onChange={handlePickDropChange}
                />
              </div>
              <div className="flex mt-5  gap-4">
                <label className="w-1/2 text-gray-500">Geofence</label>
                <input
                  type="text"
                  className="border-2 border-gray-300 rounded p-2 focus:outline-none w-2/3"
                  name="description"
                  value={pickDrop.description}
                  onChange={handlePickDropChange}
                />
              </div>
              <div className="flex">
                <label className="mt-5">Image (342px x 160px)</label>
                <div className=" flex items-center gap-[30px]">
                  {!pickDropPreviewURL && (
                    <div className="bg-gray-400 ml-20 mt-5 h-16 w-16 rounded-md" />
                  )}
                  {pickDropPreviewURL && (
                    <figure className="ml-20 mt-5 h-16 w-16 rounded-md relative">
                      <img
                        src={pickDropPreviewURL}
                        alt="profile"
                        className="w-full rounded h-full object-cover "
                      />
                    </figure>
                  )}
                  <input
                    type="file"
                    name="pickDrop"
                    id="pickDrop"
                    className="hidden"
                    onChange={handlePickDropImageChange}
                  />
                  <label htmlFor="pickDrop" className="cursor-pointer ">
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
            className="bg-teal-800 rounded-3xl p-3 text-white ml-5 px-12 mt-5"
            onClick={showModalDeletePick}
          >
            <DeleteOutlined /> Delete
          </button>
          <Modal
            onCancel={handleCancel}
            footer={null}
            open={isShowModalDeletePick}
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

export default PickAndDrop;
