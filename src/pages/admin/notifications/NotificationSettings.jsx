import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { PlusOutlined } from "@ant-design/icons";
import { Switch } from "antd";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import GlobalSearch from "../../../components/GlobalSearch";
import AddNotificationModal from "../../../components/model/NotificationSettingsModels/AddNotificationModal";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EditNotificatioModal from "../../../components/model/NotificationSettingsModels/EditNotificatioModal";
import DeleteNotificationModal from "../../../components/model/NotificationSettingsModels/DeleteNotificationModal";
import GIFLoader from "../../../components/GIFLoader";
import { useToast } from "@chakra-ui/react";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const NotificationSettings = () => {
  const [notification, setNotification] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [currentDelete, setCurrentDelete] = useState(null);
  const { token, role } = useContext(UserContext);
  const toast = useToast();

  const navigate = useNavigate();

  useEffect(() => {
    if (!token || role !== "Admin") {
      navigate("auth/login");
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);

        const response = await axios.get(
          `${BASE_URL}/admin/notification/notification-setting`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 200) {
          setNotification(response.data.data);
        }
      } catch (err) {
        console.error(`Error in fetching data: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, role, navigate]);

  const onAddNotification = (newNotification) => {
    setNotification((prevNotification) => {
      if (Array.isArray(prevNotification)) {
        return [...prevNotification, newNotification];
      } else {
        return [newNotification];
      }
    });
  };
  // Modal Function for Add Notification

  const showModal = () => {
    setIsModalVisible(true);
  };

  // Modal Function for Edit Notification

  const showModalEdit = (notificationId) => {
    setCurrentEdit(notificationId);
    setIsModalVisibleEdit(true);
  };

  // Modal Function for Delete Notification

  const showModalDelete = (notificationId) => {
    setCurrentDelete(notificationId);
    setDeleteModalVisible(true);
  };

  const remove = (notificationId) => {
    setNotification(
      notification.filter((notification) => notification._id !== notificationId)
    );
  };
  const handleConfirmDelete = () => {
    setDeleteModalVisible(false);
    setCurrentDelete(null);
  };

  // Status Change function

  const handleToggle = async (notificationId) => {
    try {
      const notificationResponse = notification.find(
        (notificationResponse) => notificationResponse._id === notificationId
      );
      if (notificationResponse) {
        const updatedStatus = !notificationResponse.status;
        await axios.put(
          `${BASE_URL}/admin/notification/notification-setting-status/${notificationId}`,
          {
            ...notificationResponse,
            status: updatedStatus,
          },
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setNotification(
          notification.map((n) =>
            n._id === notificationId ? { ...n, status: updatedStatus } : n
          )
        );
        toast({
          title: "Success",
          description: `Notification status has been ${
            updatedStatus ? "enabled" : "disabled"
          }.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An error occoured while toggling the status",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const onEditNewData = (newData) => {
    setNotification((prevData) =>
      prevData.map((data) => (data._id === newData._id ? newData : data))
    );
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalVisibleEdit(false);
    setDeleteModalVisible(false);
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
            <div className="flex items-center justify-between mx-[30px] mt-[20px]">
              <h1 className="text-xl font-bold">Notification Settings</h1>
              <div>
                <button
                  className="bg-teal-700 text-white rounded-md flex items-center space-x-1 p-4"
                  onClick={showModal}
                >
                  <PlusOutlined className="mr-3" /> Add Notification
                </button>
                <AddNotificationModal
                  isVisible={isModalVisible}
                  handleCancel={handleCancel}
                  token={token}
                  BASE_URL={BASE_URL}
                  onAddNotification={onAddNotification}
                />
              </div>
            </div>
            <div className="overflow-x-auto w-full">
              <table className="w-full mt-[20px]">
                <thead>
                  <tr>
                    {[
                      "Events",
                      "Description",
                      "Admin",
                      "Customer App",
                      "Driver App",
                      "Merchant App",
                      "Whatsapp",
                      "Email",
                      "SMS",
                      "Status",
                    ].map((header) => (
                      <th
                        key={header}
                        className="bg-teal-700 text-white py-[20px] border-r-2"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {notification.map((notification) => (
                    <tr className="bg-white w-full" key={notification._id}>
                      <td className="px-7 py-4">{notification.title}</td>
                      <td className="items-left px-4 py-4">
                        {notification.description}
                      </td>
                      <td className="px-6 py-4">
                        <Switch checked={notification.admin} />
                      </td>
                      <td className="px-6 py-4">
                        <Switch checked={notification.customer} />
                      </td>
                      <td className="px-6 py-4">
                        <Switch checked={notification.driver} />
                      </td>
                      <td className="px-6 py-4">
                        <Switch checked={notification.merchant} />
                      </td>
                      <td className="px-6 py-4">
                        <Switch checked={notification.whatsapp} />
                      </td>
                      <td className="px-6 py-4">
                        <Switch checked={notification.email} />
                      </td>
                      <td className="px-6 py-4">
                        <Switch checked={notification.sms} />
                      </td>
                      <td>
                        <div className="flex justify-center items-center gap-3">
                          <div>
                            <Switch
                              checked={notification.status}
                              onChange={() => handleToggle(notification._id)}
                            />
                          </div>
                          <button
                            onClick={() => showModalEdit(notification._id)}
                          >
                            <MdOutlineEdit className="bg-gray-200 rounded-lg p-2 text-[35px]" />
                          </button>

                          <button
                            onClick={() => showModalDelete(notification._id)}
                          >
                            <RiDeleteBinLine className="text-red-900 rounded-lg bg-red-100 p-2 text-[35px]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <EditNotificatioModal
              isVisible={isModalVisibleEdit}
              handleCancel={handleCancel}
              token={token}
              onEditNewData={onEditNewData}
              currentEdit={currentEdit}
              BASE_URL={BASE_URL}
            />
            <DeleteNotificationModal
              isVisible={deleteModalVisible}
              handleCancel={handleCancel}
              handleConfirmDelete={handleConfirmDelete}
              currentDelete={currentDelete}
              token={token}
              BASE_URL={BASE_URL}
              remove={remove}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationSettings;
