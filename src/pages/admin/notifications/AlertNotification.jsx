import {
  BellOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { MdCameraAlt } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { Modal } from "antd";
import GlobalSearch from "../../../components/GlobalSearch";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const AlertNotification = () => {
  const [alert,setAlert] = useState([])
  const { token, role } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoading,setIsLoading] = useState(false)

  const [state, setState] = useState({
    userType: "",
    id: "",
    title: "",
    description: "",
    imageUrl: "",
    suggestions: [],
  });

  useEffect(() => {
    if (!token || role !== "Admin") {
      navigate("auth/login");
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);

        const [alertResponse,typeResponse] =
          await Promise.all([
            axios.get(`${BASE_URL}/admin/notification/alert-notification`, {
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` },
            }),
              axios.get(`${BASE_URL}admin/notification/alert-notification/merchant9`, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${token}` },
              }),
            
          ]);
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
  const [notificationFile, setNotificationFile] = useState(null);
  const [notificationPreviewURL, setNotificationPreviewURL] = useState(null);

  const mockSuggestions = {
    Customer: ["cust-001", "cust-002", "cust-003"],
    Agent: ["agent-001", "agent-002", "agent-003"],
    Merchant: ["merchant-001", "merchant-002", "merchant-003"],
  };

  const handleTypeChange = (e) => {
    const userType = e.target.value;
    setState((prevState) => ({
      ...prevState,
      userType,
      suggestions: mockSuggestions[userType] || [],
    }));
  };

  const handleInputChange = (name) => (e) => {
    setState((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
  };

  const handleIdChange = (e) => {
    const id = e.target.value;
    setState((prevState) => ({
      ...prevState,
      id,
      suggestions: mockSuggestions[prevState.userType] || [],
    }));
  };


  const handleConfirm = (e) => {
    e.preventDefault();
    const { userType, id, title, description, imageUrl } = state;
    console.log("Confirmed Payload",state );
  };

  const handleCancel = () => {
    setState({
      userType: "",
      id: "",
      title: "",
      description: "",
      imageUrl: "",
      suggestions: [],
    });
    setUrl("");
  };

  const handleNotificationImageChange = (e) => {
    const file = e.target.files[0];
    setNotificationFile(file);
    setNotificationPreviewURL(URL.createObjectURL(file));
  };

  
  const [isShowModalDelete1, setIsShowModalDelete1] = useState(false);

  const showModalDelete1 = () => {
    setIsShowModalDelete1(true);
  };

  const showModalDeleteOk1 = () => {
    setIsShowModalDelete1(false);
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
                  {["Customer", "Agent", "Merchant"].map((type) => (
                    <label key={type} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="userType"
                        value={type}
                        checked={state.userType === type}
                        onChange={handleTypeChange}
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
                  onChange={handleIdChange}
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
                  onChange={handleInputChange("title")}
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
                  onChange={handleInputChange("description")}
                  className="border-2 border-gray-300 rounded p-2 w-[45%] outline-none focus:outline-none"
                />
              </div>

              <div className="flex items-center">
                <label className="text-gray-500">Image (342px x 160px)</label>
                <div className="flex items-center gap-[30px]">
                  {!notificationPreviewURL && (
                    <div className="bg-gray-400 ml-[55px] mt-0.5 h-20 w-20 rounded-md" />
                  )}
                  {notificationPreviewURL && (
                    <figure className="mt-0.5 ml-[55px] h-20 w-20 rounded-md relative">
                      <img
                        src={notificationPreviewURL}
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
                  className="bg-teal-700 text-white py-2 px-10 rounded-md"
                  type="submit"
                >
                  Confirm
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
              // value={type}
              // onChange={handleInputChange}
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
            {alert.map((alert) => (
              <tr className="text-center bg-white h-20">
                <td>{alert.title}</td>
                <td>{alert._id}</td>
                <td>{alert.description}</td>
                <td className=" flex items-center justify-center p-3" >
                        <figure className="h-[70px] w-[100px]">
                          <img src={alert.imageUrl} className="w-full h-full object-contain" />
                        </figure>
                      </td>
                <td> 
                <button
                        onClick={showModalDelete1}
                        className="outline-none focus:outline-none"
                      >
                        <RiDeleteBinLine className="text-red-700 rounded-lg bg-red-100 p-2 text-[35px]" />
                      </button>
                      <Modal
                        onOk={showModalDeleteOk1}
                        onCancel={showModalDeleteCancel1}
                        footer={null}
                        open={isShowModalDelete1}
                        centered
                      >
                        <p className="font-semibold text-[18px] mb-5">
                          Are you sure want to delete?
                        </p>
                        <div className="flex justify-end">
                          <button
                            className="bg-cyan-100 px-5 py-1 rounded-md font-semibold"
                            onClick={showModalDeleteCancel1}
                          >
                            Cancel
                          </button>
                          <button className="bg-red-100 px-5 py-1 rounded-md ml-3 text-red-700">
                            {" "}
                            Delete
                          </button>
                        </div>
                      </Modal>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AlertNotification;
