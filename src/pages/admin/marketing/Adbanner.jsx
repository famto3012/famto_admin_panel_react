import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { Modal, Switch } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import AddBannerModal from "../../../components/model/AdBannerModels/AddBannerModal";
import GlobalSearch from "../../../components/GlobalSearch";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";
import GIFLoader from "../../../components/GIFLoader";
import EditBannerModal from "../../../components/model/AdBannerModels/EditBannerModal";
import AddIndividualModal from "../../../components/model/AdBannerModels/AddIndividualModal";
import EditIndividualModal from "../../../components/model/AdBannerModels/EditIndividualModal";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const Adbanner = () => {
  const [banner, setBanner] = useState([]);
  const [individualBanner, setIndividualBanner] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allGeofence, setAllGeofence] = useState([]);
  const { token, role } = useContext(UserContext);
  const navigate = useNavigate();

  //States for Modals

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [isModalVisibleIndividual, setIsModalVisibleIndividual] =  useState(false);
  const [isModalVisibleIndividualEdit, setIsModalVisibleIndividualEdit] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [isShowModalDeleteIndividual, setShowModalDeleteIndividual] = useState(false);

  //api connections 

  useEffect(() => {
    if (!token || role !== "Admin") {
      navigate("auth/login");
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);

        const [bannerResponse, individualBannerResponse, geofenceResponse] =
          await Promise.all([
            axios.get(`${BASE_URL}/admin/app-banner/get-app-banner`, {
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${BASE_URL}/admin/banner/get-banner`, {
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${BASE_URL}/admin/geofence/get-geofence`, {
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);
        if (bannerResponse.status === 200) {
          setBanner(bannerResponse.data.data);
        }
        if (individualBannerResponse.status === 200) {
          setIndividualBanner(individualBannerResponse.data.data);
        }
        if (geofenceResponse.status === 200) {
          setAllGeofence(geofenceResponse.data.geofences);
        }
      } catch (err) {
        console.error(`Error in fetching data: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, role, navigate]);

  //view Modals

  const showModal = () => {
    setAddModalVisible(true);
  };

  const showModalEdit = () => {
    setEditModalVisible(true);
  };

  const showModalIndividual = () => {
    setIsModalVisibleIndividual(true);
  };

  const showModalIndividualEdit = () => {
    setIsModalVisibleIndividualEdit(true);
  };

  const showModalDelete = () => {
    setIsShowModalDelete(true);
  };

  const showModalDeleteIndividual = () => {
    setShowModalDeleteIndividual(true);
  };

  const handleCancel = () => {
    setAddModalVisible(false);
    setEditModalVisible(false);
    setIsModalVisibleIndividual(false);
    setIsModalVisibleIndividualEdit(false);
    setShowModalDeleteIndividual(false);
    setIsShowModalDelete(false);
   };

  const handleToggle = (id) => {
    setBanner((prevBanner) =>
      prevBanner.map((banner) =>
        banner._id === id ? { ...banner, status: !banner.status } : banner
      )
    );
  };

  return (
    <div>
      {isLoading ? (
        <GIFLoader />
      ) : (
        <>
          <Sidebar />
          <div className="w-full min-h-screen pl-[300px] bg-gray-100 flex flex-col">
            <nav className="p-5">
              <GlobalSearch />
            </nav>
            <div className="flex items-center justify-between mx-10 mt-5">
              <h1 className="text-lg font-bold outline-none focus:outline-none">
                Ad Banner
              </h1>
              <Switch />
            </div>
            <p className="mt-5 mx-10 text-[15px] text-gray-500">
              The purpose of a promotional banner is to promote a store. It can
              be used to display offers new{" "}
              <span className="flex justify-start">
                {" "}
                available items or discounts etc{" "}
              </span>
            </p>
            <div className="flex items-center justify-between mx-10 mt-5">
              <h1 className="text-lg font-bold outline-none focus:outline-none">
                App Ad Banner
              </h1>
              <div>
                <button
                  className="bg-teal-800 text-white rounded-md flex items-center px-9 py-2 "
                  onClick={showModal}
                >
                  <PlusOutlined className="mr-2" /> Add
                </button>
                <AddBannerModal
                  isVisible={addModalVisible}
                  handleCancel={handleCancel}
                  BASE_URL={BASE_URL}
                  allGeofence={allGeofence}
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="overflow-x-auto p-4 w-full mt-7">
                <thead>
                  <tr className="p-5 w-full">
                    {[
                      "Image",
                      "Name",
                      "Merchant ID",
                      "Geofence",
                      "Status",
                      "Actions",
                    ].map((headers) => (
                      <th
                        key={headers}
                        className="bg-teal-800 text-white h-[70px] mt-10 px-5 text-center whitespace-nowrap"
                      >
                        {headers}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {banner.map((bannerData) => (
                    <tr
                      className="text-center bg-white h-20"
                      key={bannerData._id}
                    >
                      <td className="w-[120px] px-5">
                        <img src={bannerData.imageUrl} />
                      </td>
                      <td>{bannerData.name}</td>
                      <td>{bannerData.merchantId}</td>
                      <td>{bannerData.geofenceId.name}</td>
                      <td>
                        <Switch
                          checked={bannerData.status === "true" ? false : true}
                          onChange={() => handleToggle(bannerData._id)}
                        />
                      </td>
                      <td>
                        <div className="flex justify-center items-center gap-3">
                          <button onClick={showModalEdit}>
                            <MdOutlineEdit className="bg-gray-200 rounded-lg p-2 text-[35px]" />
                          </button>
                          <EditBannerModal
                            isVisible={editModalVisible}
                            handleCancel={handleCancel}
                            BASE_URL={BASE_URL}
                            allGeofence={allGeofence}
                          />

                          <button>
                            <RiDeleteBinLine
                              className="text-red-900 rounded-lg bg-red-100 p-2 text-[35px]"
                              onClick={showModalDelete}
                            />
                          </button>
                          <Modal
                            // onOk={showModalDeleteOk}
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
                              <button className="bg-red-100 px-5 py-1 rounded-md ml-3 text-red-700">
                                {" "}
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

            <div className="flex items-center justify-between mx-10 mt-10">
              <h1 className="text-lg font-bold outline-none focus:outline-none">
                Individual Merchant Ad Banner
              </h1>
              <div>
                <button
                  className="bg-teal-800 text-white rounded-md flex items-center px-9 py-2 "
                  onClick={showModalIndividual}
                >
                  <PlusOutlined className="mr-2" /> Add
                </button>
                <AddIndividualModal
                  isVisible={isModalVisibleIndividual}
                  handleCancel={handleCancel}
                  BASE_URL={BASE_URL}
                  allGeofence={allGeofence}
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="overflow-x-auto p-4 w-full mt-7 mb-20">
                <thead>
                  <tr className="p-5 w-full">
                    {[
                      "Image",
                      "Name",
                      "Merchant ID",
                      "Geofence",
                      "Status",
                      "Actions",
                    ].map((headers) => (
                      <th
                        key={headers}
                        className="bg-teal-800 text-white h-[70px] mt-10 px-5 text-center whitespace-nowrap"
                      >
                        {headers}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {individualBanner.map((individualBanner) => (
                    <tr
                      className="text-center bg-white h-20"
                      key={individualBanner._id}
                    >
                      <td className="w-[120px] px-5">
                        <img src={individualBanner.imageUrl} />
                      </td>
                      <td>{individualBanner.name}</td>
                      <td>{individualBanner.merchantId}</td>
                      <td>{individualBanner.geofenceId}</td>
                      <td>
                        <Switch
                          checked={
                            individualBanner.status === "true" ? false : true
                          }
                          onChange={() => handleToggle(individualBanner._id)}
                        />
                      </td>
                      <td>
                        <div className="flex justify-center items-center gap-3">
                          <button onClick={showModalIndividualEdit}>
                            <MdOutlineEdit className="bg-gray-200 rounded-lg p-2 text-[35px]" />
                          </button>

                          <EditIndividualModal
                            isVisible={isModalVisibleIndividualEdit}
                            handleCancel={handleCancel}
                            BASE_URL={BASE_URL}
                            allGeofence={allGeofence}
                          />
                          <button>
                            <RiDeleteBinLine
                              className="text-red-900 rounded-lg bg-red-100 p-2 text-[35px]"
                              onClick={showModalDeleteIndividual}
                            />
                          </button>
                          <Modal
                            onCancel={handleCancel}
                            footer={null}
                            open={isShowModalDeleteIndividual}
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
                              <button className="bg-red-100 px-5 py-1 rounded-md ml-3 text-red-700">
                                {" "}
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
          </div>
        </>
      )}
    </div>
  );
};

export default Adbanner;
