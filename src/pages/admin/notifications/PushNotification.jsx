import React, { useContext, useEffect, useState } from "react";
import GlobalSearch from "../../../components/GlobalSearch";
import Sidebar from "../../../components/Sidebar";
import { MdCameraAlt } from "react-icons/md";
import { Modal, Spin, Switch } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import FilterAltOutlined from "@mui/icons-material/FilterAltOutlined";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
import GIFLoader from "../../../components/GIFLoader";
import { useToast } from "@chakra-ui/react";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const PushNotification = () => {
  const [notificationFile, setNotificationFile] = useState(null);
  const [notificationPreviewURL, setNotificationPreviewURL] = useState(null);
  const [currentData, setCurrentData] = useState(null);
  const [searchFilter, setSearchFilter] = useState("");
  const [type, setType] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [data, setData] = useState([]);
  const [geofence, setGeofence] = useState([]);
  const { token, role } = useContext(UserContext);
  const navigate = useNavigate();
  const toast = useToast();
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
          console.log(tableResponse.data.data);
        }
        if (geofenceResponse.status === 200) {
          setGeofence(geofenceResponse.data.geofences);
          console.log(geofence);
        }
      } catch (err) {
        console.error(`Error in fetching data: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, role, navigate]);

  // function for post Add Data in Notification
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNotificationImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setNotificationFile(file);
    setNotificationPreviewURL(URL.createObjectURL(file));
  };

  const onChange = (name, checked) => {
    setFormData({ ...formData, [name]: checked ? true : false }); //INFO: Changed
    console.log(formData.customer);
    console.log(formData.merchant);
    console.log(formData.driver);
  };

  const submitAction = async (e) => {
    e.preventDefault();
    try {
      console.log("formData", formData);
      setIsDataLoading(true);
      const addpushToSend = new FormData();
      addpushToSend.append("title", formData.title);
      addpushToSend.append("description", formData.description);
      addpushToSend.append("geofenceId", formData.geofenceId);
      addpushToSend.append("customer", formData.customer);
      addpushToSend.append("driver", formData.driver);
      addpushToSend.append("merchant", formData.merchant);
      addpushToSend.append("pushNotificationImage", notificationFile);

      console.log("here");
      console.log("data for test", addpushToSend);

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
          title:"Notification Added",
          description:"Notification Added Successfully.",
          duration:900,
          isClosable:true,
          status:"success"
        })
        console.log("MESSAGE:", addPushResponse.data);
      }
    } catch (err) {
      console.error(`Error in fetch datas : ${err.message}`);
    } finally {
      setIsDataLoading(false);
    }

    console.log(formData);
  };

  // Modal for Delete

  const showModalDelete = (dataId) => {
    setCurrentData(dataId);
    console.log(dataId);
    setIsShowModalDelete(true);
  };

  const removeBanner = (dataId) => {
    setData(data.filter((data) => data._id !== dataId));
  };

  const handleConfirmDelete = () => {
    setIsShowModalDelete(false);
    setCurrentManager(null);
  };

  const handleCancel = () => {
    setIsShowModalDelete(false);
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
          title:"Notification Deleted",
          description:"Notification Deleted Successfully.",
          status:"success",
          duration:900,
          isClosable:true
        })
      }
    } catch (err) {
      console.error("Error in deleting banner:", err);
    } finally {
      setConfirmLoading(false);
    }
  };

  //Function for send Notification

  const sendNotification = async (id) => {
    try {
      const sendResponse = await axios.post(
        `${BASE_URL}/admin/notification/send-push-notification/${id}`,
        {},
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (sendResponse.status === 200) {
        toast({
          title:"Notification Send",
          description:"Push notification send successfully.",
          duration:900,
          isClosable:true,
          status:"success"
        })
        console.log("notification send", sendResponse.data.data);
      }
    } catch (err) {
      console.error("Error in send notification:", err);
    }
  };

  //Function for type user filter

  const onTypeChange = (e) => {
    const selectedType = e.target.value;
    setType(selectedType);
    if (selectedType !== "") {
      handleTypeFilter(selectedType);
    } else {
      setData([]);
    }
  };

  const handleTypeFilter = async (selectedType) => {
    try {
      console.log(token);
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
      console.log(`Error in fetching notification`, err);
    }
  };

  // Function for search

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
      console.log(token);
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
      console.log(`Error in fetching notification`, err);
    }
  };
 
  const onAddNotification = (newNotification) => {
    setData((prevNotification) => {
      if (Array.isArray(prevNotification)) {
        return [...prevNotification, newNotification];
      } else {
        return [newNotification];
      }
    })
  }

  return (
    <div>
      {isLoading ? (
        <GIFLoader />
      ) : (
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
                    <option hidden value="">
                      {" "}
                      Geofence
                    </option>
                    {geofence.map((geoFence) => (
                      <option value={geoFence._id} key={geoFence._id}>
                        {geoFence.name}
                      </option>
                    ))}
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
                      name="pushNotificationImage"
                      id="pushNotificationImage"
                      className="hidden"
                      onChange={handleNotificationImageChange}
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
                  <label className="mt-10 ml-10">Merchant App</label>
                  <Switch
                    className="mt-11 ml-[175px]"
                    onChange={(checked) => onChange("merchant", checked)}
                    name="merchant"
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
                value={type}
                onChange={onTypeChange}
                className="bg-blue-50 rounded-lg p-3 outline-none focus:outline-none"
              >
                <option hidden value="">
                  Type of user
                </option>
                <option value="customer">Customer</option>
                <option value="merchant">Merchant</option>
                <option value="driver">Driver</option>
              </select>
              <div>
                <FilterAltOutlined className="text-gray-500" />
                <input
                  type="search"
                  name="search"
                  placeholder="search push notification name"
                  className="bg-gray-100 h-10 px-5 pr-10 rounded-full ml-5 w-72 text-sm focus:outline-none"
                  value={searchFilter}
                  onChange={onSearchChange}
                />
                <button type="submit" className="absolute right-16 mt-2">
                  <SearchOutlined className="text-xl text-gray-600" />
                </button>
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
              <label className="mt-10 ml-10">Merchant App</label>
              <Switch
                className="mt-11 ml-[175px]"
                onChange={(checked) => onChange("merchant", checked)}
                name="merchant"
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
                {isDataLoading ? "Adding..." : "Save"}
              </button>
            </div>
          </form>
        </div>
        <p className="font-bold ml-5">Push Notification log</p>
        <div className="bg-white mx-5 rounded-lg mt-5 flex p-8 justify-between">
          <select
            name="type"
            value={type}
            onChange={onTypeChange}
            className="bg-blue-50 rounded-lg p-3 outline-none focus:outline-none"
          >
            <option hidden value="">
              Type of user
            </option>
            <option value="customer">Customer</option>
            <option value="merchant">Merchant</option>
            <option value="driver">Driver</option>
          </select>
          <div>
            <FilterAltOutlined className="text-gray-500" />
            <input
              type="search"
              name="search"
              placeholder="search push notification name"
              className="bg-gray-100 h-10 px-5 pr-10 rounded-full ml-5 w-72 text-sm focus:outline-none"
              value={searchFilter}
              onChange={onSearchChange}
            />
            <button type="submit" className="absolute right-16 mt-2">
              <SearchOutlined className="text-xl text-gray-600" />
            </button>
          </div>
        </div>
        <table className="w-full mt-10 mb-24">
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
            {data.map((data) => (
              <tr key={data._id} className="text-center bg-white h-20">
                <td>
                  {data.customer && data.driver && data.merchant ? "All" : type}
                </td>
                <td>{data.description}</td>
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
                    <button onClick={() => sendNotification(data._id)}>
                      <AiOutlineCloudUpload className="bg-green-100 text-green-500 text-[35px] p-2  rounded-lg" />
                    </button>
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
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((data) => (
                  <tr key={data._id} className="text-center bg-white h-20">
                    <td>
                      {data.customer && data.driver && data.merchant
                        ? "All"
                        : type}
                    </td>
                    <td>{data.description}</td>
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
                        <button onClick={() => sendNotification(data._id)}>
                          <AiOutlineCloudUpload className="bg-green-100 text-green-500 text-[35px] p-2  rounded-lg" />
                        </button>
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
                            <Spin spinning={confirmLoading}>
                              Are you sure want to delete?
                            </Spin>
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
                              Delete
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
      )}
    </div>
  );
};

export default PushNotification;
