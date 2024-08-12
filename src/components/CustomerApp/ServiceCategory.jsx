import { PlusOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { MdCameraAlt } from "react-icons/md";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { useToast } from "@chakra-ui/react";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const ServiceCategory = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [allGeofence, setAllGeofence] = useState([]);
  const [allService, setAllService] = useState([]);
  const [service, setService] = useState({
    title: "",
    geofenceId: "",
    bannerImage: "",
  });
  const { token } = useContext(UserContext);
  const toast = useToast();
  const [serviceFile, setServiceFile] = useState(null);
  const [servicePreviewURL, setServicePreviewURL] = useState(null);
  const [isSaveLoading, setIsSaveLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [response, serviceResponse] = await Promise.all([
          axios.get(`${BASE_URL}/admin/geofence/get-geofence`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BASE_URL}/admin/service-categories/get-service`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        if (response.status === 200) {
          setAllGeofence(response.data.geofences);
        }
        if (serviceResponse.status === 200) {
          setAllService(serviceResponse.data.data);
        }
      } catch (err) {
        console.error(`Error in fetching data ${err.message}`);
      }
    };
    fetchData();
  }, [token]);

  console.log("geofence", allGeofence);
  console.log("services", allService);

  const handleService = async (e) => {
    e.preventDefault();
    try {
      setIsSaveLoading(true);
      const serviceDataToSend = new FormData();
      serviceDataToSend.append("geofenceId", service.geofenceId);
      serviceDataToSend.append("title", service.title);
      serviceDataToSend.append("bannerImage", serviceFile);

      const response = await axios.post(
        `${BASE_URL}/admin/service-categories/add-service`,
        serviceDataToSend,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        handleAddBanner(response.data.data);
        handleCancel();
        toast({
          title: "Success",
          description: "Custom Order Created Successfully.",
          duration: 3000,
          status: "success",
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(`Error in creating business ${err.message}`);
    } finally {
      setIsSaveLoading(false);
    }
  };

  const handleAddBanner = (newCategory) => {
    setAllService((prevBanners) => {
      if (Array.isArray(prevBanners)) {
        return [...prevBanners, newCategory];
      } else {
        return [newCategory];
      }
    });
  };

  const handleServiceImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setServiceFile(file);
    setServicePreviewURL(URL.createObjectURL(file));
  };

  const handleServiceChange = (e) => {
    setService({ ...service, [e.target.name]: e.target.value });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="border-b-2 border-gray-200 pb-5 h-fit">
      <div className="flex justify-between mx-5 mt-10">
        <h1>Services</h1>
        <p className="text-gray-500">
          This enables to add, edit, change thumbnail of the listed services
        </p>
        <button
          onClick={showModal}
          className="bg-teal-800 text-white px-5 rounded-lg p-2"
        >
          <PlusOutlined /> Add Services
        </button>
        <Modal
          title="Add Service icon"
          open={isModalVisible}
          className="mt-24"
          onCancel={handleCancel}
          footer={null} // Custom footer to include form buttons
        >
          <form onSubmit={handleService}>
            <div className="flex mt-5 gap-4">
              <label className="w-1/2 text-gray-500">Service title</label>
              <input
                type="text"
                className="border-2 border-gray-300 rounded p-2 focus:outline-none w-2/3"
                name="title"
                value={service.title}
                onChange={handleServiceChange}
              />
            </div>
            <div className="flex mt-5  gap-4">
              <label className="w-1/2 text-gray-500">Geofence</label>
              <select
                name="geofenceId"
                value={service.geofenceId}
                onChange={handleServiceChange}
                className="border-2 border-gray-300 rounded p-2 focus:outline-none w-2/3"
              >
                <option value="select" hidden selected>
                  Geofence
                </option>
                {allGeofence.map((geofence) => (
                  <option key={geofence._id} value={geofence._id}>
                    {geofence.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex">
              <label className="mt-5">Image (342px x 160px)</label>
              <div className=" flex items-center gap-[30px]">
                {!servicePreviewURL && (
                  <div className="bg-gray-400 ml-20 mt-5 h-16 w-16 rounded-md" />
                )}
                {servicePreviewURL && (
                  <figure className="ml-20 mt-5 h-16 w-16 rounded-md relative">
                    <img
                      src={servicePreviewURL}
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
                {isSaveLoading ? "Adding..." : "Add"}
              </button>
            </div>
          </form>
        </Modal>
      </div>
      {allService.map((services) => (
        <div className="flex justify-center mt-5">
          <div className="w-96 h-fit">
            <div className="bg-gray-300 flex flex-col gap-3 rounded-lg  w-full">
              <div className="flex items-center relative">
                <DragIndicatorIcon className="text-3xl mx-3" />
                <figure className="h-32 w-full relative">
                  <img
                    className="rounded w-full h-full object-cover"
                    src={services.bannerImageURL}
                    alt="Service Image"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#333] via-transparent to-transparent rounded z-10"></div>
                  <p className="text-white absolute bottom-1 right-1 z-20">
                    {services.title}
                  </p>
                </figure>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceCategory;
