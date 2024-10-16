import { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Modal, Switch } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useToast } from "@chakra-ui/react";

import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";

import Sidebar from "../../../components/Sidebar";
import AddBannerModal from "../../../components/model/AdBannerModels/AddBannerModal";
import GlobalSearch from "../../../components/GlobalSearch";
import { UserContext } from "../../../context/UserContext";
import EditBannerModal from "../../../components/model/AdBannerModels/EditBannerModal";
import AddIndividualModal from "../../../components/model/AdBannerModels/AddIndividualModal";
import EditIndividualModal from "../../../components/model/AdBannerModels/EditIndividualModal";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const Adbanner = () => {
  const [allBanner, setAllBanner] = useState([]);
  const [individualBanner, setIndividualBanner] = useState([]);
  const [allGeofence, setAllGeofence] = useState([]);

  const [currentBanner, setCurrentBanner] = useState(null);
  const [currentIndBanner, setCurrentIndBanner] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [modals, setModals] = useState({
    addBanner: false,
    editBanner: false,
    addIndividual: false,
    editIndividual: false,
    deleteBanner: false,
    deleteIndividual: false,
  });

  const toast = useToast();
  const navigate = useNavigate();
  const { token, role } = useContext(UserContext);

  useEffect(() => {
    if (!token || role !== "Admin") {
      navigate("/auth/login");
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);

        const [bannerResponse, individualBannerResponse, geofenceResponse] =
          await Promise.all([
            axios.get(`${BASE_URL}/admin/app-banner/get-app-banner`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${BASE_URL}/admin/banner/get-banner`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${BASE_URL}/admin/geofence/get-geofence`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);

        setAllBanner(bannerResponse.data.data || []);
        setIndividualBanner(individualBannerResponse.data.data || []);
        setAllGeofence(geofenceResponse.data.geofences || []);
      } catch (err) {
        console.error("Error in fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, role, navigate]);

  const toggleModal = (modalName, value = true) => {
    setModals((prev) => ({ ...prev, [modalName]: value }));
  };

  const handleAddBanner = useCallback((newBanner) => {
    setAllBanner((prevBanners) => [...prevBanners, newBanner]);
  }, []);

  const handleEditBanner = useCallback((data) => {
    console.log("Edited data", data);
    setAllBanner((prev) =>
      prev.map((banner) => (banner?._id === data?._id ? data : banner))
    );
  }, []);

  const handleAddIndividualBanner = useCallback((newBanner) => {
    setIndividualBanner((prevBanners) => [...prevBanners, newBanner]);
  }, []);

  const handleEditIndividualBanner = useCallback((data) => {
    setIndividualBanner((prev) =>
      prev.map((banner) => (banner?._id === data?._id ? data : banner))
    );
  }, []);

  const removeBanner = useCallback((bannerId) => {
    setAllBanner((prev) => prev.filter((banner) => banner._id !== bannerId));
  }, []);

  const removeIndBanner = useCallback((bannerId) => {
    setIndividualBanner((prev) =>
      prev.filter((banner) => banner._id !== bannerId)
    );
  }, []);

  const handleDelete = async (bannerId, isIndividual = false) => {
    try {
      setConfirmLoading(true);

      const url = isIndividual
        ? `${BASE_URL}/admin/banner/delete-banner/${bannerId}`
        : `${BASE_URL}/admin/app-banner/delete-app-banner/${bannerId}`;

      const deleteResponse = await axios.delete(url, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (deleteResponse.status === 200) {
        isIndividual ? removeIndBanner(bannerId) : removeBanner(bannerId);
        toggleModal(isIndividual ? "deleteIndividual" : "deleteBanner", false);
        toast({
          title: "Success",
          description: "Banner deleted successfully.",
          status: "success",
          duration: 3000,
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Error deleting banner: " + err,
        status: "error",
        duration: 3000,
      });
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleToggle = async (BannerId, isIndividual = false) => {
    try {
      const banners = isIndividual ? individualBanner : allBanner;
      const statusToUpdate = banners.find((d) => d._id === BannerId);

      if (statusToUpdate) {
        const updatedStatus = !statusToUpdate.status;
        const url = isIndividual
          ? `${BASE_URL}/admin/banner/banner-status/${BannerId}`
          : `${BASE_URL}/admin/app-banner/app-banner-status/${BannerId}`;

        await axios.put(
          url,
          { ...statusToUpdate, status: updatedStatus },
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        toast({
          title: "Success",
          description: "Banner status updated successfully.",
          status: "success",
          duration: 3000,
        });

        const updateState = isIndividual ? setIndividualBanner : setAllBanner;
        updateState((prev) =>
          prev.map((banner) =>
            banner._id === BannerId
              ? { ...banner, status: updatedStatus }
              : banner
          )
        );
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update banner status",
        status: "error",
        duration: 3000,
      });
    }
  };

  return (
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
        </div>
        <p className="mt-5 mx-10 text-[15px] text-gray-500">
          The purpose of a promotional banner is to promote a store. It can be
          used to display offers new
          <span className="flex justify-start">
            available items or discounts etc
          </span>
        </p>

        {/* Banner */}
        <div className="flex items-center justify-between mx-10 mt-5">
          <h1 className="text-lg font-bold outline-none focus:outline-none">
            App Ad Banner
          </h1>
          <div>
            <button
              className="bg-teal-800 text-white rounded-md flex items-center px-9 py-2 mb-7"
              onClick={() => toggleModal("addBanner")}
            >
              <PlusOutlined className="mr-2" /> Add
            </button>
            <AddBannerModal
              isVisible={modals.addBanner}
              onCancel={() => toggleModal("addBanner", false)}
              BASE_URL={BASE_URL}
              token={token}
              onAddBanner={handleAddBanner}
              allGeofence={allGeofence}
            />
          </div>
        </div>

        <div className="overflow-x-auto max-h-[30rem]">
          <table className="overflow-x-auto p-4 w-full ">
            <thead className=" sticky top-0 left-0 z-10">
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
              {allBanner?.map((bannerData) => (
                <tr
                  className="text-center bg-white h-20 even:bg-[#e9e9e9]"
                  key={bannerData._id}
                >
                  <td className=" flex items-center justify-center p-3">
                    <figure className="h-[70px] w-[100px]">
                      <img
                        src={bannerData.imageUrl}
                        className="w-full h-full object-contain"
                      />
                    </figure>
                  </td>
                  <td>{bannerData.name}</td>
                  <td>{bannerData.merchantId}</td>
                  <td>{bannerData?.geofenceId?.name}</td>
                  <td>
                    <Switch
                      checked={bannerData.status}
                      onChange={() => handleToggle(bannerData._id, true)}
                    />
                  </td>
                  <td>
                    <div className="flex justify-center items-center gap-3">
                      <button
                        onClick={() => {
                          setCurrentBanner(bannerData._id);
                          toggleModal("editBanner", true);
                        }}
                      >
                        <MdOutlineEdit className="bg-gray-200 rounded-lg p-2 text-[35px]" />
                      </button>
                      <EditBannerModal
                        isVisible={modals.editBanner}
                        onCancel={() => toggleModal("editBanner", false)}
                        allGeofence={allGeofence}
                        selectedBanner={currentBanner}
                        token={token}
                        BASE_URL={BASE_URL}
                        onEditBanner={handleEditBanner}
                      />

                      <button>
                        <RiDeleteBinLine
                          className="text-red-900 rounded-lg bg-red-100 p-2 text-[35px]"
                          onClick={() => {
                            setCurrentBanner(bannerData._id);
                            toggleModal("deleteBanner", true);
                          }}
                        />
                      </button>
                      <Modal
                        open={modals.deleteBanner}
                        onCancel={() => toggleModal("deleteBanner", false)}
                        footer={null}
                        centered
                      >
                        <p className="font-semibold text-[18px] mb-5">
                          Are you sure you want to delete this ?
                        </p>
                        <div className="flex justify-end">
                          <button
                            className="bg-cyan-100 px-5 py-1 rounded-md font-semibold"
                            onClick={() => {
                              currentBanner(null);
                              toggleModal("deleteBanner", false);
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            className="bg-red-100 px-5 py-1 rounded-md ml-3 text-red-700"
                            onClick={() => handleDelete(currentBanner)}
                          >
                            {confirmLoading ? `Deleting...` : `Delete`}
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

        {/* Individual Banner */}
        <div className="flex items-center justify-between mx-10 mt-10">
          <h1 className="text-lg font-bold outline-none focus:outline-none">
            Individual Merchant Ad Banner
          </h1>
          <div>
            <button
              className="bg-teal-800 text-white rounded-md flex items-center px-9 py-2 mb-7"
              onClick={() => toggleModal("addIndividual")}
            >
              <PlusOutlined className="mr-2" /> Add
            </button>
            <AddIndividualModal
              isVisible={modals.addIndividual}
              onCancel={() => toggleModal("addIndividual", false)}
              BASE_URL={BASE_URL}
              token={token}
              allGeofence={allGeofence}
              onAddIndBanner={handleAddIndividualBanner}
            />
          </div>
        </div>

        <div className="overflow-x-auto max-h-[30rem]">
          <table className="overflow-x-auto p-4 w-full mb-20">
            <thead className=" sticky top-0 left-0 z-10">
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
              {individualBanner?.map((individualBanner, index) => (
                <tr
                  className="text-center bg-white h-20 even:bg-[#e9e9e9]"
                  key={individualBanner?._id}
                >
                  <td className=" flex items-center justify-center p-3">
                    <figure className="h-[70px] w-[100px]">
                      <img
                        src={individualBanner?.imageUrl}
                        className="w-full h-full object-contain"
                      />
                    </figure>
                  </td>
                  <td>{individualBanner?.name}</td>
                  <td>{individualBanner?.merchantId}</td>
                  <td>{individualBanner?.geofenceId}</td>
                  <td>
                    <Switch
                      checked={individualBanner?.status}
                      onChange={() => handleToggle(individualBanner._id, true)}
                    />
                  </td>
                  <td>
                    <div className="flex justify-center items-center gap-3">
                      <button
                        onClick={() => {
                          setCurrentIndBanner(individualBanner._id);
                          toggleModal("editIndividual", true);
                        }}
                      >
                        <MdOutlineEdit className="bg-gray-200 rounded-lg p-2 text-[35px]" />
                      </button>

                      <EditIndividualModal
                        isVisible={modals.editIndividual}
                        onCancel={() => toggleModal("editIndividual", false)}
                        allGeofence={allGeofence}
                        selectedIndividualBanner={currentIndBanner}
                        token={token}
                        BASE_URL={BASE_URL}
                        onEditIndBanner={handleEditIndividualBanner}
                      />
                      <button>
                        <RiDeleteBinLine
                          className="text-red-900 rounded-lg bg-red-100 p-2 text-[35px]"
                          onClick={() => {
                            setCurrentIndBanner(individualBanner._id);
                            toggleModal("deleteIndividual", true);
                          }}
                        />
                      </button>
                      <Modal
                        onCancel={() => toggleModal("deleteIndividual", false)}
                        footer={null}
                        open={modals.deleteIndividual}
                        centered
                      >
                        <p className="font-semibold text-[18px] mb-5">
                          Are you sure you want to delete this ?
                        </p>

                        <div className="flex justify-end">
                          <button
                            className="bg-cyan-100 px-5 py-1 rounded-md font-semibold"
                            onClick={() => {
                              setCurrentIndBanner(null);
                              toggleModal("deleteIndividual", false);
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            className="bg-red-100 px-5 py-1 rounded-md ml-3 text-red-700"
                            onClick={() => handleDelete(currentIndBanner, true)}
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
      </div>
    </>
  );
};

export default Adbanner;
