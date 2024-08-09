import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { Modal } from "antd";
import GlobalSearch from "../../../components/GlobalSearch";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import GIFLoader from "../../../components/GIFLoader";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const Settings = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [settingsData, setSettingsData] = useState({
    id: "",
    fullName: "",
    email: "",
    phoneNumber: "",
  });
  const [addData, setAddData] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const { token, role } = useContext(UserContext);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const settingResponse = await axios.get(`${BASE_URL}/settings`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });

        if (settingResponse.status === 200) {
          setSettingsData(settingResponse.data.data);
          console.log(settingResponse.data.data);
        }
      } catch (err) {
        console.error(`Error in fetching data: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [token, role, navigate]);

  //  function for settings data
  const inputChange = (e) => {
    setSettingsData({ ...settingsData, [e.target.name]: e.target.value });
  };
  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("settingsData", settingsData);
      const updateResponse = await axios.put(
        `${BASE_URL}/settings/update-settings`,
        settingsData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (updateResponse.status === 200) {
        console.log("update data", updateResponse.data.message);
        toast({
          title: "Updated",
          description: "Updated successfully.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(`Error in fetching data: ${err}`);
    }
    console.log(settingsData);
  };

  // Modal Function
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (e) => {
    setAddData({ ...addData, [e.target.name]: e.target.value });
  };

  const signupAction = async (e) => {
    e.preventDefault();
    try {
      const passwordResponse = await axios.patch(
        `${BASE_URL}/settings/change-password`,
        addData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (passwordResponse.status === 200) {
        console.log("PASSWORD", passwordResponse.data.message);
        toast({
          title: "Change Password",
          description: "Admin Password Changed Successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(`Error in fetching data: ${err}`);
    }

    console.log(addData);
    handleModalClose(); // Close the modal after submitting the form
  };

  return (
    <div>
      {isLoading ? (
        <GIFLoader />
      ) : (
        <>
          <Sidebar />

          <div className="w-full h-screen pl-[300px] bg-gray-100">
            <nav className="p-5">
              <GlobalSearch />
            </nav>

            <div className="flex items-center justify-between mx-11 mt-[20px]">
              <h1 className="text-xl font-semibold">Settings</h1>

              <div>
                <button
                  className="bg-teal-700 text-white rounded-md flex items-center space-x-1 p-2"
                  onClick={showModal}
                >
                  Change Password
                </button>
                <Modal
                  title="Change Password"
                  className="mt-32"
                  open={isModalVisible}
                  onCancel={handleModalClose}
                  footer={null}
                >
                  <form onSubmit={signupAction}>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center">
                        <label
                          className="w-1/3 text-gray-500"
                          htmlFor="currentPassword"
                        >
                          Current Password
                        </label>
                        <input
                          className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                          type="password"
                          value={addData.currentPassword}
                          id="currentPassword"
                          name="currentPassword"
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="flex items-center">
                        <label
                          className="w-1/3 text-gray-500"
                          htmlFor="newPassword"
                        >
                          New Password
                        </label>
                        <input
                          className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                          type="password"
                          value={addData.newPassword}
                          id="newPassword"
                          name="newPassword"
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

            <div className="bg-white p-12 rounded-lg  mt-[40px] mx-11">
              <form onSubmit={formSubmit}>
                <div className="flex flex-col gap-4 ">
                  <div className="flex items-center">
                    <label className="w-1/3 text-gray-500" htmlFor="id">
                      ID
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-[45%] outline-none focus:outline-none"
                      type="text"
                      placeholder="ID"
                      value={settingsData._id}
                      id="id"
                      name="id"
                      disabled
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-gray-500" htmlFor="fullName">
                      Name
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-[45%] outline-none focus:outline-none"
                      type="text"
                      placeholder="Name"
                      value={settingsData.fullName}
                      id="fullName"
                      name="fullName"
                      onChange={inputChange}
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="w-1/3 text-gray-500" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-[45%] outline-none focus:outline-none"
                      type="email"
                      placeholder="Email"
                      value={settingsData.email}
                      id="email"
                      name="email"
                      onChange={inputChange}
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="phoneNumber"
                    >
                      Phone
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 w-[45%] outline-none focus:outline-none"
                      type="tel"
                      placeholder="Phone"
                      value={settingsData.phoneNumber}
                      id="phoneNumber"
                      name="phoneNumber"
                      onChange={inputChange}
                    />
                  </div>
                  <div className="flex justify-end gap-4 mt-6 ">
                    <button
                      className="bg-cyan-50 py-2 px-8 rounded-md"
                      type="button"
                      onClick={() => navigate("/home")}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-teal-700 text-white py-2 px-10 rounded-md"
                      type="submit"
                      onClick={formSubmit}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Settings;
