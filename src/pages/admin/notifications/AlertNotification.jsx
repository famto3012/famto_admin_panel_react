import { SearchOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { MdCameraAlt } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { Modal } from "antd";
import GlobalSearch from "../../../components/GlobalSearch";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const AlertNotification = () => {
  const [alert, setAlert] = useState([]);
  const { token, role } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [searchType, setSearchType] = useState("");
  const [isShowModalDelete1, setIsShowModalDelete1] = useState(false);
  const [state, setState] = useState({
    userType: "",
    id: "",
    title: "",
    description: "",
    alertNotificationImage: null,
    notificationPreviewURL: null,
  });
  const [visibleTaskModal, setVisibleTaskModal] = useState({});
  const toast = useToast();

  useEffect(() => {
    if (!token || role !== "Admin") {
      navigate("auth/login");
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);

        const [alertResponse] = await Promise.all([
          axios.get(`${BASE_URL}/admin/notification/alert-notification`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        if (alertResponse.status === 200) {
          setAlert(alertResponse.data.data);
          console.log("alert", alertResponse.data.data);
        }
      } catch (err) {
        console.error(`Error in fetching data: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, role, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInputChange = async (e) => {
    try {
      setSearchType(e.target.value);
      const typeResponse = await axios.get(
        `${BASE_URL}/admin/notification/alert-notification/${e.target.value}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (typeResponse.status === 200) {
        setAlert(typeResponse.data.alertNotifications);
        console.log("type", typeResponse.data.alertNotifications);
      }
    } catch (err) {
      console.error(`Error in fetching data: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    console.log("State", state);
    const formData = new FormData();
    formData.append("title", state.title);
    formData.append("description", state.description);
    formData.append("alertNotificationImage", state.alertNotificationImage);
    formData.append("id", state.id);
    formData.append("userType", state.userType);
    try {
      setConfirmLoading(true)
      const alertNotificationResponse = await axios.post(
        `${BASE_URL}/admin/notification/alert-notification`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (alertNotificationResponse.status === 201) {
        toast({
          title: "Notification Send",
          description:"Alert notification send successfully",
          status: "success",
          duration: 900,
          isClosable: true,
        });
        console.log("alertNotification", alertNotificationResponse.data);
      }
    } catch (err) {
      console.error(`Error in fetching data: ${err}`);
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    setState({
      userType: "",
      id: "",
      title: "",
      description: "",
      imageUrl: "",
    });
  };

  const handleNotificationImageChange = (e) => {
    const file = e.target.files[0];
    const previewURL = URL.createObjectURL(file);
    console.log("file", file);
    setState((prevState) => ({
      ...prevState,
      alertNotificationImage: file,
      notificationPreviewURL: previewURL,
    }));
  };

  const handleDelete = async (id) => {
    try {
      setIsDeleteLoading(true);

      const deleteResponse = await axios.delete(
        `${BASE_URL}/admin/notification/alert-notification/${id}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (deleteResponse.status === 200) {
        toast({
          title: "Notification Deleted",
          description:"Alert notification deleted successfully",
          status: "success",
          duration: 900,
          isClosable: true,
        });
        console.log("delete", deleteResponse.data);
        setAlert((prevAlert) => prevAlert.filter((alert) => alert._id !== id));
      }
    } catch (err) {
      console.error(`Error in deleting data: ${err}`);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  const handleTitleChange = async (e) => {
    try {
      const searchResponse = await axios.get(
        `${BASE_URL}/admin/notification/search-alert-notification`,
        {
          params: { title: e.target.value },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (searchResponse.status === 200) {
        setAlert(searchResponse.data.alertNotifications);
        console.log("search", searchResponse.data.alertNotifications);
      }
    } catch (err) {
      console.error(`Error in fetching data: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const showModalTask = (taskId) => {
    setVisibleTaskModal((prev) => ({ ...prev, [taskId]: true }));
  };

  const showModalCancelTask = (taskId) => {
    setVisibleTaskModal((prev) => ({ ...prev, [taskId]: false }));
  };

  const showModalDeleteCancel1 = () => {
    setIsShowModalDelete1(false);
  };

  return (
    <>
      <Sidebar />
      <div className="w-full  pl-[300px] bg-gray-100">
        <nav className="p-5">
          <GlobalSearch />
        </nav>
        <div className="flex flex-col mx-[30px] mt-[20px] gap-2">
          <h1 className="font-bold">Alert Notification</h1>
          <h1>
            This feature is give alert, remind an individual customer or agent
            or merchant
          </h1>
        </div>
        <div className="bg-white p-12 rounded-lg mt-[40px] mx-5">
          <form onSubmit={handleConfirm}>
            <div className="flex flex-col gap-6 ">
              <div className="flex items-center">
                <label className="block text-gray-700">Type of user</label>
                <div className="flex space-x-24 ml-[128px]">
                  {["customer", "agent", "merchant"].map((type) => (
                    <label key={type} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="userType"
                        value={type}
                        checked={state.userType === type}
                        onChange={handleChange}
                        className="form-radio"
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center">
                <label htmlFor="id" className="text-gray-500">
                  ID
                </label>
                <input
                  type="text"
                  id="id"
                  name="id"
                  value={state.id}
                  onChange={handleChange}
                  className="border-2 border-gray-300 rounded p-2 w-[45%] ml-[200px] outline-none focus:outline-none"
                />
              </div>

              <div className="flex items-center">
                <label htmlFor="title" className="text-gray-500">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={state.title}
                  onChange={handleChange}
                  className="border-2 border-gray-300 rounded p-2 w-[45%] ml-[185px] outline-none focus:outline-none"
                />
              </div>

              <div className="flex items-center">
                <label
                  htmlFor="description"
                  className="w-[215px] text-gray-500"
                >
                  Description (This note will be shown in Notification)
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={state.description}
                  onChange={handleChange}
                  className="border-2 border-gray-300 rounded p-2 w-[45%] outline-none focus:outline-none"
                />
              </div>

              <div className="flex items-center">
                <label className="text-gray-500">Image (342px x 160px)</label>
                <div className="flex items-center gap-[30px]">
                  {!state.notificationPreviewURL && (
                    <div className="bg-gray-400 ml-[55px] mt-0.5 h-20 w-20 rounded-md" />
                  )}
                  {state.notificationPreviewURL && (
                    <figure className="mt-0.5 ml-[55px] h-20 w-20 rounded-md relative">
                      <img
                        src={state.notificationPreviewURL}
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
                  <label htmlFor="notificationImage" className="cursor-pointer">
                    <MdCameraAlt
                      className="bg-teal-800 text-[40px] text-white p-6 h-20 w-20 mt-0.5 rounded-md"
                      size={30}
                    />
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  className="bg-cyan-50 py-2 px-8 rounded-md"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className="bg-teal-800 text-white py-2 px-10 rounded-md"
                  type="submit"
                >
                  {confirmLoading ? "Sending..." : "Send"}
                </button>
              </div>
            </div>
          </form>
        </div>
        <div>
          <p className="font-bold mt-5 mx-[30px]">Alert Notification log</p>
          <div className="bg-white mx-9 rounded-lg mt-5 flex p-8 justify-between">
            <select
              name="type"
              value={searchType}
              onChange={handleInputChange}
              className="bg-blue-50 p-3 outline-none focus:outline-none rounded-lg"
              defaultValue=""
            >
              <option hidden value="">
                Type of user
              </option>
              <option value="customer">Customer</option>
              <option value="agent">Agent</option>
              <option value="merchant">Merchant</option>
            </select>
            <div>
              <FilterAltOutlinedIcon className="text-gray-500" />
              <input
                type="search"
                name="search"
                placeholder="Search alert notification name"
                className="bg-gray-100 h-10 px-5 pr-10 rounded-full ml-5 w-72 text-sm focus:outline-none"
                onChange={handleTitleChange}
              />
              <button type="submit" className="absolute right-20 mt-2">
                <SearchOutlined className="text-xl text-gray-600" />
              </button>
            </div>
          </div>
          <table className="w-full mt-5">
            <thead>
              <tr>
                {["Title", "ID", "Description", "Image", "Action"].map(
                  (header) => (
                    <th
                      key={header}
                      className="bg-teal-800 text-white h-[70px] text-center w-screen"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {alert && alert.length > 0 ? (
                alert.map((alertItem) => (
                  <tr key={alertItem._id} className="text-center bg-white h-20">
                    <td>{alertItem.title}</td>
                    <td>{alertItem._id}</td>
                    <td>{alertItem.description}</td>
                    <td className="flex items-center justify-center p-3">
                      <figure className="h-[70px] w-[100px]">
                        <img
                          src={alertItem.imageUrl}
                          className="w-full h-full object-contain"
                          alt="alert"
                        />
                      </figure>
                    </td>
                    <td>
                      <button
                        onClick={() => showModalTask(alertItem._id)}
                        className="outline-none focus:outline-none"
                      >
                        <RiDeleteBinLine className="text-red-700 rounded-lg bg-red-100 p-2 text-[35px]" />
                      </button>
                      <Modal
                        onOk={() => showModalCancelTask(alertItem._id)}
                        onCancel={() => showModalCancelTask(alertItem._id)}
                        open={visibleTaskModal[alertItem._id] || false}
                        footer={null}
                        centered
                      >
                        <p className="font-semibold text-[18px] mb-5">
                          Are you sure you want to delete?
                        </p>
                        <div className="flex justify-end">
                          <button
                            className="bg-cyan-100 px-5 py-1 rounded-md font-semibold"
                            onClick={showModalDeleteCancel1}
                          >
                            Cancel
                          </button>
                          <button
                            className="bg-red-100 px-5 py-1 rounded-md ml-3 text-red-700"
                            onClick={() => {
                              handleDelete(alertItem._id);
                              showModalCancelTask(alertItem._id);
                            }}
                          >
                            {isDeleteLoading ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      </Modal>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AlertNotification;
