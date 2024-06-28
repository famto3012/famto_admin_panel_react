import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { BellOutlined, SearchOutlined } from "@ant-design/icons";
import { Modal } from "antd";

const Settings = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const [addData, setAddData] = useState({
    currentpassword: "",
    newpassword: "",
  });

  const handleInputChange = (e) => {
    setAddData({ ...addData, [e.target.name]: e.target.value });
  };

  const signupAction = (e) => {
    e.preventDefault();
    console.log(addData);
    handleModalClose(); // Close the modal after submitting the form
  };

  const [settingsData, setSettingsData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
  });

  const inputChange = (e) => {
    setSettingsData({ ...settingsData, [e.target.name]: e.target.value });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    console.log(settingsData);
  };

  return (
    <>
      <Sidebar />

      <div className="w-full h-screen pl-[300px] bg-gray-100">
        <div className="flex justify-end p-4 gap-3">
          <BellOutlined className="text-2xl text-gray-500" />
          <div className="relative">
            <input
              type="search"
              name="search"
              placeholder="Search"
              className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none mr-3"
            />
            <button type="submit" className="absolute right-0 top-0 mt-2 mr-4">
              <SearchOutlined className="text-xl text-gray-600" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mx-[30px] mt-[20px]">
          <h1 className="text-xl font-semibold">Settings</h1>

          <div>
            <button
              className="bg-teal-700 text-white rounded-md flex items-center space-x-1 p-4"
              onClick={showModal}
            >
              Change Password
            </button>
            <Modal
              title="Change Password"
              open={isModalVisible}
              onOk={handleModalClose}
              onCancel={handleModalClose}
              footer={null}
            >
              <form onSubmit={signupAction}>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="currentpassword"
                    >
                      Current Password
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3"
                      type="password"
                      value={addData.currentpassword}
                      id="currentpassword"
                      name="currentpassword"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="newpassword"
                    >
                      New Password
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-2/3"
                      type="password"
                      value={addData.newpassword}
                      id="newpassword"
                      name="newpassword"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      className="bg-cyan-50 py-2 px-4 rounded-md"
                      type="button"
                      onClick={handleModalClose}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-teal-700 text-white py-2 px-4 rounded-md"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </Modal>
          </div>
        </div>

        <div className="bg-white p-12 rounded-lg  mt-[40px] mx-[30px]">
          <form onSubmit={formSubmit}>
            <div className="flex flex-col gap-4 ">
              <div className="flex items-center">
                <label className="w-1/3 text-gray-500" htmlFor="id">
                  ID
                </label>
                <input
                  className="border-2 border-gray-300 rounded p-2 w-[45%]"
                  type="text"
                  placeholder="ID"
                  value={""}
                  id="id"
                  name="id"
                  disabled
                />
              </div>
              <div className="flex items-center">
                <label className="w-1/3 text-gray-500" htmlFor="name">
                  Name
                </label>
                <input
                  className="border-2 border-gray-300 rounded p-2 w-[45%]"
                  type="text"
                  placeholder="Name"
                  value={settingsData.name}
                  id="name"
                  name="name"
                  onChange={inputChange}
                />
              </div>
              <div className="flex items-center">
                <label className="w-1/3 text-gray-500" htmlFor="email">
                  Email
                </label>
                <input
                  className="border-2 border-gray-300 rounded p-2 w-[45%]"
                  type="email"
                  placeholder="Email"
                  value={settingsData.email}
                  id="email"
                  name="email"
                  onChange={inputChange}
                />
              </div>
              <div className="flex items-center">
                <label className="w-1/3 text-gray-500" htmlFor="phone">
                  Phone
                </label>
                <input
                  className="border-2 border-gray-300 rounded p-2 w-[45%]"
                  type="tel"
                  placeholder="Phone"
                  value={settingsData.phone}
                  id="phone"
                  name="phone"
                  onChange={inputChange}
                />
              </div>
              <div className="flex justify-end gap-4 mt-6 ">
                <button
                  className="bg-cyan-50 py-2 px-8 rounded-md"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="bg-teal-700 text-white py-2 px-10 rounded-md"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Settings;
