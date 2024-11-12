import { useContext, useEffect, useRef, useState } from "react";
import GlobalSearch from "../../../components/GlobalSearch";
import { MdCameraAlt } from "react-icons/md";
import { Modal, Switch } from "antd";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
import { Spinner, useToast } from "@chakra-ui/react";
import CropImage from "../../../components/CropImage";
import {
  userTypeForPushNotificationOptions,
} from "../../../utils/DefaultData";
import Select from "react-select";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const PushNotification = () => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const [searchFilter, setSearchFilter] = useState("");
  const [type, setType] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [geofence, setGeofence] = useState([]);
  const [croppedFile, setCroppedFile] = useState(null);
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState(null);
  const [isInnerVisible, setIsInnerVisible] = useState(false);
  const [img, setImg] = useState(null);
  const { token, role } = useContext(UserContext);
  const toast = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    geofenceId: "",
    customer: false,
    merchant: false,
    driver: false,
    pushNotificationImage: "",
  });
  useEffect(() => {
    if (!token || role !== "Admin") {
      navigate("auth/login");
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);

        const [tableResponse, geofenceResponse] = await Promise.all([
          axios.get(`${BASE_URL}/admin/notification/push-notification`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }),

          axios.get(`${BASE_URL}/admin/geofence/get-geofence`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        if (tableResponse.status === 200) {
          setData(tableResponse.data.data);
        }
        if (geofenceResponse.status === 200) {
          setGeofence(geofenceResponse.data.geofences);
        }
      } catch (err) {
        toast({
          title: "Error",
          description: "An error occoured while getting the data",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, role, navigate]);

  const geofenceOptions = geofence?.map((geofence) => ({
    label: geofence.name,
    value: geofence._id,
  }));

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitAction = async (e) => {
    e.preventDefault();
    try {
      setIsDataLoading(true);
      const addpushToSend = new FormData();
      addpushToSend.append("title", formData.title);
      addpushToSend.append("description", formData.description);
      addpushToSend.append("geofenceId", formData.geofenceId);
      addpushToSend.append("customer", formData.customer);
      addpushToSend.append("driver", formData.driver);
      addpushToSend.append("merchant", formData.merchant);
      addpushToSend.append("pushNotificationImage", croppedFile);

      const addPushResponse = await axios.post(
        `${BASE_URL}/admin/notification/push-notification`,
        addpushToSend,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (addPushResponse.status === 201) {
        onAddNotification(addPushResponse.data.data);
        toast({
          title: "Success",
          description: "Notification Added Successfully.",
          duration: 3000,
          isClosable: true,
          status: "success",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An error occoured while submitting the data",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsDataLoading(false);
    }
  };

  const onChange = (name, checked) => {
    setFormData({ ...formData, [name]: checked ? true : false }); //INFO: Changed
  };

  const showModalDelete = (dataId) => {
    setCurrentData(dataId);
    setIsShowModalDelete(true);
  };

  const removeBanner = (dataId) => {
    setData(data.filter((data) => data._id !== dataId));
  };

  // New function to handle confirm delete
  const handleConfirmDelete = () => {
    setIsShowModalDelete(false);
    // setCurrentManager(null);
  };

  const onAddNotification = (newNotification) => {
    setData((prevBanners) => {
      if (Array.isArray(prevBanners)) {
        return [...prevBanners, newNotification];
      } else {
        return [newNotification];
      }
    });
  };

  const handleCancel = () => {
    setIsShowModalDelete(false);
    setIsModalVisible(false);
  };
  const handleDelete = async (currentData) => {
    try {
      setConfirmLoading(true);

      const deleteResponse = await axios.delete(
        `${BASE_URL}/admin/notification/push-notification/${currentData}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (deleteResponse.status === 200) {
        removeBanner(currentData);
        handleConfirmDelete();
        toast({
          title: "Success",
          description: "Notification Deleted Successfully.",
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
      setConfirmLoading(false);
    }
  };

  const sendNotification = async (e, id) => {
    e.preventDefault();
    try {
      setDataLoading(true);
      const sendResponse = await axios.post(
        `${BASE_URL}/admin/notification/send-push-notification/${id}`,
        {},
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (sendResponse.status === 200) {
        handleCancel();
        toast({
          title: "Success",
          description: "Push notification send successfully.",
          duration: 3000,
          isClosable: true,
          status: "success",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An error occoured while sending notification",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setDataLoading(false);
    }
  };

  const onTypeChange = (e) => {
    const selectedType = e;
    setType(selectedType);
    if (selectedType !== "") {
      handleTypeFilter(selectedType);
    } else {
      setData([]);
    }
  };

  const handleTypeFilter = async (selectedType) => {
    try {
      const typeResponse = await axios.get(
        `${BASE_URL}/admin/notification/push-notification-type`,
        {
          params: { type: selectedType },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (typeResponse.status === 200) {
        setData(typeResponse.data.data);
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An error occoured while getting the data",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const onSearchChange = (e) => {
    const searchService = e.target.value;
    setSearchFilter(searchService);
    if (searchService !== "") {
      handleSearchChangeFilter(searchService);
    } else {
      setData([]);
    }
  };

  const handleSearchChangeFilter = async (searchService) => {
    try {
      const searchResponse = await axios.get(
        `${BASE_URL}/admin/notification/push-notification-search`,
        {
          params: { query: searchService },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (searchResponse.status === 200) {
        setData(searchResponse.data.data);
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

  const showModal = (id) => {
    setCurrentId(id);
    setIsModalVisible(true);
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
    <>
      <div className="pl-[300px] bg-gray-100">
        <div className="p-5">
          <GlobalSearch />
        </div>
        <header className="font-bold ml-5">Push Notifications</header>

        <div className="bg-white text-[16px] mx-5 rounded-lg mt-5 text-gray-700">
          <form onSubmit={submitAction}>
            <div className="flex">
              <label className="mt-10 ml-10">
                Title<span className="text-red-500 ms-2">*</span>
              </label>
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
                Description (This note will be shown in notification. <span className="text-red-500">[Visibility 30 characters]</span>)
                <span className="text-red-500 ms-2">*</span>
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                className="border-2 border-gray-300 rounded  mt-10 ml-[94px]  w-96 outline-none focus:outline-none p-2"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex">
              <label className="mt-10 ml-10">
                Geofence<span className="text-red-500 ms-2">*</span>
              </label>

              <Select
                options={geofenceOptions}
                value={geofenceOptions.find(
                  (option) => option.value === formData.geofenceId
                )}
                onChange={(option) =>
                  setFormData({ ...formData, geofenceId: option.value })
                }
                className=" rounded ml-52 mt-10 w-96 focus:outline-none"
                placeholder="Select geofence"
                isSearchable={true}
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
            </div>
            <div className="flex">
              <label className="mt-16 ml-10">
                Image (342px x 160px)
                <span className="text-red-500 ms-2">*</span>
              </label>
              <div className=" flex items-center gap-[30px]">
                {!croppedFile && (
                  <div className="bg-gray-400 ml-[115px] mt-10 h-20 w-20 rounded-md" />
                )}
                {!!croppedFile && (
                  <figure className="ml-[115px] mt-10 h-20 w-20 rounded-mdrelative">
                    <img
                      ref={previewCanvasRef}
                      src={URL.createObjectURL(croppedFile)}
                      alt="profile"
                      className="w-full rounded h-full object-cover "
                    />
                  </figure>
                )}
                <input
                  type="file"
                  name="pushNotificationImage"
                  id="pushNotificationImage"
                  className="hidden"
                  accept="image/*"
                  onChange={onSelectFile}
                />
                <label
                  htmlFor="pushNotificationImage"
                  className="cursor-pointer "
                >
                  <MdCameraAlt
                    className=" bg-teal-800  text-[40px] text-white p-6 h-20 w-20 mt-10 rounded"
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
            <div className="flex">
              <label className="mt-10 ml-10">Customer App</label>
              <Switch
                className="mt-11 ml-[185px]"
                onChange={(checked) => onChange("customer", checked)}
                name="agent"
              />
            </div>
            <div className="flex">
              <label className="mt-10 ml-10">Merchant App</label>
              <Switch
                className="mt-11 ml-[185px]"
                onChange={(checked) => onChange("merchant", checked)}
                name="merchant"
              />
            </div>
            <div className="flex">
              <label className="mt-10 ml-10">Driver App</label>
              <Switch
                className="mt-11 ml-[210px]"
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
                {isDataLoading ? "Adding..." : "Add"}
              </button>
            </div>
          </form>
        </div>

        <p className="font-bold ml-5">Push Notification log</p>

        <div className="bg-white mx-5 rounded-lg mt-5 flex p-8 justify-between">
          <Select
            options={userTypeForPushNotificationOptions}
            value={userTypeForPushNotificationOptions.find(
              (option) => option.value === type
            )}
            onChange={(option) => onTypeChange(option.value)}
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
              placeholder="Search push notification name"
              className="bg-gray-100 p-3 rounded-3xl focus:outline-none outline-none text-[14px] ps-[20px] ml-5 w-72"
              value={searchFilter}
              onChange={onSearchChange}
            />
          </div>
        </div>

        <table className="w-full mt-10 mb-24 bg-white">
          <thead>
            <tr>
              {[
                "Type of User",
                "Description",
                "Image",
                "Customer App",
                "Driver App",
                "Merchant App",
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
            {isLoading && (
              <tr className="bg-gray-200">
                <td colSpan={7} className="text-center text-[16px] py-6">
                  Loading Data... <Spinner size={"sm"} />
                </td>
              </tr>
            )}

            {!isLoading && data?.length === 0 && (
              <tr className="bg-gray-200">
                <td colSpan={7} className="text-center py-3">
                  No Data available
                </td>
              </tr>
            )}

            {!isLoading &&
              data?.map((data) => (
                <tr
                  key={data._id}
                  className="text-center h-20 even:bg-gray-200"
                >
                  <td>
                    {data.customer && data.driver && data.merchant
                      ? "All"
                      : type}
                  </td>
                  <td>
                    {" "}
                    {data.description.length > 30
                      ? `${data.description.substring(0, 30)}...`
                      : data.description}
                  </td>
                  <td className=" flex items-center justify-center p-3">
                    <figure className="h-[70px] w-[100px]">
                      <img
                        src={data.imageUrl}
                        className="w-full h-full object-contain"
                      />
                    </figure>
                  </td>
                  <td>
                    <Switch checked={data.customer} />
                  </td>
                  <td>
                    <Switch checked={data.driver} />
                  </td>
                  <td>
                    <Switch checked={data.merchant} />
                  </td>

                  <td>
                    <div className="flex items-center justify-center gap-3">
                      <button onClick={() => showModal(data._id)}>
                        <AiOutlineCloudUpload className="bg-green-100 text-green-500 text-[35px] p-2  rounded-lg" />
                      </button>
                      <Modal
                        open={isModalVisible}
                        onCancel={handleCancel}
                        centered
                        footer={null}
                      >
                        <p className="font-semibold text-[18px] mb-5">
                          Are you sure you want to Send?
                        </p>
                        <div className="flex justify-end">
                          <form>
                            <button
                              type="button"
                              className="bg-cyan-100 px-5 py-1 rounded-md font-semibold"
                              onClick={handleCancel}
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              onClick={(e) => sendNotification(e, currentId)}
                              className="bg-teal-800 px-5 py-1 rounded-md ml-3 text-white"
                            >
                              {dataLoading ? "Sending..." : "Send"}
                            </button>
                          </form>
                        </div>
                      </Modal>
                      <button
                        className="outline-none focus:outline-none"
                        onClick={() => showModalDelete(data._id)}
                      >
                        <RiDeleteBinLine className="text-red-900 rounded-lg bg-red-100 p-2 text-[35px]" />
                      </button>
                      <Modal
                        onCancel={handleCancel}
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
                            onClick={handleCancel}
                          >
                            Cancel
                          </button>
                          <button
                            className="bg-red-100 px-5 py-1 rounded-md ml-3 text-red-700"
                            onClick={() => handleDelete(currentData)}
                          >
                            {confirmLoading ? "Deleting..." : "Delete"}
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
    </>
  );
};

export default PushNotification;
