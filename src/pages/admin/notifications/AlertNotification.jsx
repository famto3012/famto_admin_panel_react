import { useContext, useEffect, useRef, useState } from "react";
import { MdCameraAlt } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { Modal } from "antd";
import GlobalSearch from "../../../components/GlobalSearch";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import GIFLoader from "../../../components/GIFLoader";
import { useSocket } from "../../../context/SocketContext";
import CropImage from "../../../components/CropImage";
import Select from "react-select";
import { userTypeOptions } from "../../../utils/DefaultData";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const AlertNotification = () => {
  const [alert, setAlert] = useState([]);
  const { token, role } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [searchType, setSearchType] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
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
  const { socket } = useSocket();
  const [croppedFile, setCroppedFile] = useState(null);
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState(null);
  const [isInnerVisible, setIsInnerVisible] = useState(false);
  const [img, setImg] = useState(null);

  useEffect(() => {
    if (!token || role !== "Admin") {
      navigate("auth/login");
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);

        const alertResponse = await axios.get(
          `${BASE_URL}/admin/notification/alert-notification`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (alertResponse.status === 200) {
          setAlert(alertResponse.data.data);
        }
      } catch (err) {
        console.error(`Error in fetching data: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, role, navigate]);

  useEffect(() => {
    socket?.on("pushNotification", (data) => {
      console.log("Push notification", data);
    });
    socket?.on("alertNotification", (data) => {
      console.log("Alert notification", data);
    });
  }, [socket]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInputChange = async (e) => {
    try {
      setSearchType(e);
      const typeResponse = await axios.get(
        `${BASE_URL}/admin/notification/alert-notification/${e}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (typeResponse.status === 200) {
        setAlert(typeResponse.data.alertNotifications);
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An error occoured while searching the data",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    console.log("State", state);
    const formData = new FormData();
    formData.append("title", state.title);
    formData.append("description", state.description);
    formData.append("alertNotificationImage", croppedFile);
    formData.append("id", state.id);
    formData.append("userType", state.userType);
    try {
      setConfirmLoading(true);
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
        showModalCancel();
        onAddNotification(alertNotificationResponse.data.alertNotification);
        toast({
          title: "Success",
          description: "Alert notification send successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(`Error in adding data: ${err}`);
    } finally {
      setConfirmLoading(false);
    }
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
        setAlert((prevAlert) => prevAlert.filter((alert) => alert._id !== id));
        toast({
          title: "Success",
          description: "Alert notification deleted successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An error occoured while deleting the data",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsDeleteLoading(false);
      showModalCancelTask(id);
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
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An error occoured while searching the data",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const onAddNotification = (newNotification) => {
    setAlert((prevBanners) => {
      if (Array.isArray(prevBanners)) {
        return [...prevBanners, newNotification];
      } else {
        return [newNotification];
      }
    });
  };

  const showModal = (e) => {
    e.preventDefault();
    setIsModalVisible(true);
  };

  const showModalCancel = () => {
    setIsModalVisible(false);
  };

  const showModalTask = (taskId) => {
    setVisibleTaskModal((prev) => ({ ...prev, [taskId]: true }));
  };

  const showModalCancelTask = (taskId) => {
    setVisibleTaskModal((prev) => ({ ...prev, [taskId]: false }));
  };

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      setIsInnerVisible(true);
      setCrop(null); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
      setImg(e.target.files[0]);
    }
  }

  const handleCropComplete = (croppedFile) => {
    setCroppedFile(croppedFile);
    // setSelectedFile(croppedFile); // Get the cropped image file
    console.log("Cropped image file:", croppedFile);
  };

  const handleModalClose = () => {
    // setSelectedFile(null); // Reset the selected file to allow new selection
  };

  return (
    <div>
      {isLoading ? (
        <GIFLoader />
      ) : (
        <>
          <div className="w-full  pl-[300px] bg-gray-100">
            <nav className="p-5">
              <GlobalSearch />
            </nav>
            <div className="flex flex-col mx-[30px] mt-[20px] gap-2">
              <h1 className="font-bold">Alert Notification</h1>
              <h1>
                This feature is give alert, remind an individual customer or
                agent or merchant
              </h1>
            </div>
            <div className="bg-white p-12 rounded-lg mt-[40px] mx-5">
              <form>
                <div className="flex flex-col gap-6 ">
                  <div className="flex items-center">
                    <label className="block text-gray-700">
                      Type of user<span className="text-red-500 ms-2">*</span>
                    </label>
                    <div className="flex space-x-24 ml-[128px]">
                      {["customer", "agent", "merchant"].map((type) => (
                        <label
                          key={type}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="radio"
                            name="userType"
                            value={type}
                            checked={state.userType === type}
                            onChange={handleChange}
                            className="form-radio"
                          />
                          <span>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <label htmlFor="id" className="text-gray-500">
                      ID<span className="text-red-500 ms-2">*</span>
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
                      Title<span className="text-red-500 ms-2">*</span>
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
                      Description (This note will be shown in notification. <span className="text-red-500">[Visibility 30 characters]</span>)
                      <span className="text-red-500 ms-2">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={state.description}
                      onChange={handleChange}
                      className="border-2 border-gray-300 rounded p-2 w-[45%] ml-[18px] outline-none focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center">
                    <label className="text-gray-500">
                      Image (342px x 160px)
                      <span className="text-red-500 ms-2">*</span>
                    </label>
                    <div className="flex items-center gap-[30px]">
                      {!croppedFile && (
                        <div className="bg-gray-400 ml-[55px] mt-0.5 h-20 w-20 rounded-md" />
                      )}
                      {!!croppedFile && (
                        <figure className="mt-0.5 ml-[55px] h-20 w-20 rounded-md relative">
                          <img
                            ref={previewCanvasRef}
                            src={URL.createObjectURL(croppedFile)}
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
                        accept="image/*"
                        onChange={onSelectFile}
                      />
                      <label
                        htmlFor="notificationImage"
                        className="cursor-pointer"
                      >
                        <MdCameraAlt
                          className="bg-teal-800 text-[40px] text-white p-6 h-20 w-20 mt-0.5 rounded-md"
                          size={30}
                        />
                      </label>
                      {imgSrc && (
                        <CropImage
                          selectedImage={img}
                          aspectRatio={16 / 9} // Optional, set aspect ratio (1:1 here)
                          onCropComplete={handleCropComplete}
                          onClose={handleModalClose} // Pass the handler to close the modal and reset the state
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      className="bg-cyan-50 py-2 px-8 rounded-md"
                      type="button"
                      onClick={showModalCancel}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-teal-800 text-white py-2 px-10 rounded-md"
                      type="submit"
                      onClick={(e) => showModal(e)}
                    >
                      Send
                    </button>
                    <Modal
                      open={isModalVisible}
                      onCancel={showModalCancel}
                      footer={null}
                      centered
                    >
                      <p className="font-semibold text-[18px] mb-5">
                        Are you sure you want to Send?
                      </p>
                      <div className="flex justify-end">
                        <form onSubmit={(e) => handleConfirm(e)}>
                          <button
                            type="button"
                            className="bg-cyan-100 px-5 py-1 rounded-md font-semibold"
                            onClick={showModalCancel}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="bg-teal-800 px-5 py-1 rounded-md ml-3 text-white"
                          >
                            {confirmLoading ? "Sending..." : "Send"}
                          </button>
                        </form>
                      </div>
                    </Modal>
                  </div>
                </div>
              </form>
            </div>
            <div>
              <p className="font-bold mt-5 mx-[30px]">Alert Notification log</p>
              <div className="bg-white mx-9 rounded-lg mt-5 flex p-8 justify-between">
                <Select
                  options={userTypeOptions}
                  value={userTypeOptions.find(
                    (option) => option.value === searchType
                  )}
                  onChange={(option) => handleInputChange(option.value)}
                  className=" bg-cyan-50 min-w-[10rem]"
                  placeholder="Type of user"
                  isSearchable={false}
                  isMulti={false}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      paddingRight: "",
                    }),
                    dropdownIndicator: (provided) => ({
                      ...provided,
                      padding: "10px",
                    }),
                  }}
                />
                <div>
                  <input
                    type="search"
                    name="search"
                    placeholder="Search alert notification name"
                    className="bg-gray-100 p-3 rounded-3xl focus:outline-none outline-none text-[14px] ps-[20px] ml-5 w-72"
                    onChange={handleTitleChange}
                  />
                </div>
              </div>
              <table className="w-full mt-5 ">
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
                      <tr
                        key={alertItem._id}
                        className="text-center bg-white h-20"
                      >
                        <td>{alertItem.title}</td>
                        <td>{alertItem._id}</td>
                        <td>
                          {" "}
                          {alertItem.description.length > 30
                            ? `${alertItem.description.substring(0, 30)}...`
                            : alertItem.description}
                        </td>
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
                            title={
                              <span className="font-[500] text-[16px]">
                                Delete?
                              </span>
                            }
                            onCancel={() => showModalCancelTask(alertItem._id)}
                            open={visibleTaskModal[alertItem._id] || false}
                            footer={null}
                            centered
                          >
                            <p className="text-[14px] mb-5">
                              Do you want to delete?
                            </p>
                            <div className="flex justify-end">
                              <button
                                className="bg-cyan-100 px-5 py-1 rounded-md font-semibold"
                                onClick={() =>
                                  showModalCancelTask(alertItem._id)
                                }
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                className="bg-red-100 px-5 py-1 rounded-md ml-3 text-red-700"
                                onClick={() => {
                                  handleDelete(alertItem._id);
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
      )}
    </div>
  );
};

export default AlertNotification;
