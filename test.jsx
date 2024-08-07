import React, { useContext, useEffect, useRef, useState } from "react";
import { MdCameraAlt } from "react-icons/md";
import { Switch, Modal, Spin } from "antd";
import { RiDeleteBinLine } from "react-icons/ri";
import { PlusOutlined } from "@ant-design/icons";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { MdOutlineEdit } from "react-icons/md";
import { useToast } from "@chakra-ui/react";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const BusinessCategory = () => {
  const [allBusinessCategory, setAllBusinessCategory] = useState([]);
  const [allGeofence, setAllGeofence] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(null);
  const [currentBannerGet, setCurrentBannerGet] = useState(null);
  const [business, setBusiness] = useState({
    title: "",
    geofenceId: "",
    bannerImage: null,
  });

  const { token } = useContext(UserContext);
  const toast = useToast();
  const dragCategory = useRef(0);
  const dragOverCategory = useRef(0);

  const [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isSaveLoading, setIsSaveLoading] = useState(false);

  const [isModalVisibleBusiness, setIsModalVisibleBusiness] = useState(false);
  const [isModalVisibleBuinessEdit, setIsModalVisibleBusinessEdit] =
    useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  const [businessFile, setBusinessFile] = useState(null);
  const [businessPreviewURL, setBusinessPreviewURL] = useState(null);
  const [businessEditFile, setBusinessEditFile] = useState(null);
  const [businessEditPreviewURL, setBusinessEditPreviewURL] = useState(null);

  // API to fetch Business Categories..
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [allBusinessCategoryResponse, geofenceResponse] =
          await Promise.all([
            axios.get(
              `${BASE_URL}/admin/business-categories/get-all-business-category`,
              {
                withCredentials: true,
                headers: { Authorization: `Bearer ${token}` },
              }
            ),
            axios.get(`${BASE_URL}/admin/geofence/get-geofence`, {
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);

        if (allBusinessCategoryResponse.status === 200) {
          setAllBusinessCategory(allBusinessCategoryResponse.data.data);
        }

        if (geofenceResponse.status === 200) {
          setAllGeofence(geofenceResponse.data.geofences);
        }
      } catch (err) {
        console.error(`Error in fetching data ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  useEffect(() => {
    const fetchBusinessCategory = async (currentBannerGet) => {
      try {
        setDataLoading(true);
        const categoryResponse = await axios.get(
          `${BASE_URL}/admin/business-categories/${currentBannerGet}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (categoryResponse.status === 200) {
          const data = categoryResponse.data.data;
          setBusiness({
            title: data.title,
            geofenceId: data.geofenceId?._id,
            bannerImage: data.bannerImageURL,
          });
        }
      } catch (err) {
        console.error(`Error fetching business category ${err.message}`);
        toast({
          title: "Error",
          description: "Failed to fetch business category.",
          status: "error",
          duration: 900,
          isClosable: true,
        });
      } finally {
        setDataLoading(false);
      }
    };

    if (currentBannerGet) {
      fetchBusinessCategory(currentBannerGet);
    }
  }, [currentBannerGet, token]);

  // API to Add Business Category...
  const handleBusiness = async (e) => {
    e.preventDefault();

    try {
      setIsSaveLoading(true);
      const businessDataToSend = new FormData();
      businessDataToSend.append("geofenceId", business.geofenceId);
      businessDataToSend.append("title", business.title);
      businessDataToSend.append("bannerImage", businessFile);

      const response = await axios.post(
        `${BASE_URL}/admin/business-categories/add-business-category`,
        businessDataToSend,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        handleAddBanner(response.data.data);
        console.log(response.data.data);
        toast({
          title: "Created",
          description: "Business Category Created Successfully.",
          duration: 900,
          status: "success",
          isClosable: true,
        });
        handleCancel();
      }
    } catch (err) {
      console.error(`Error in creating business ${err.message}`);
    } finally {
      setIsSaveLoading(false);
    }
  };

  // API to Add Business Category...
  const handleBusinessEdit = async (e) => {
    e.preventDefault();

    try {
      setIsSaveLoading(true);
      const businessDataToSend = new FormData();
      businessDataToSend.append("geofenceId", business.geofenceId);
      businessDataToSend.append("title", business.title);
      businessDataToSend.append("bannerImage", businessFile);

      const response = await axios.put(
        `${BASE_URL}/admin/business-categories/edit-business-category/${currentBannerGet}`,
        businessDataToSend,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        // handleAddBanner(response.data.data);
        toast({
          title: "Created",
          description: "Business Category Created Successfully.",
          duration: 900,
          status: "success",
          isClosable: true,
        });
        handleCancel();
      }
    } catch (err) {
      console.error(`Error in creating business ${err.message}`);
    } finally {
      setIsSaveLoading(false);
    }
  };

  const handleAddBanner = (newCategory) => {
    setAllBusinessCategory((prevData) => {
      if (Array.isArray(prevData)) {
        return [...prevData, newCategory];
      } else {
        return [newCategory];
      }
    });
  };

  const handleToggle = async (Id) => {
    try {
      const statusToUpdate = allBusinessCategory.find((d) => d._id === Id);
      if (statusToUpdate) {
        const updatedStatus = !statusToUpdate.status;

        await axios.post(
          `${BASE_URL}/admin/business-categories/change-status/${Id}`,
          {
            ...statusToUpdate,
            status: updatedStatus,
          },
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        toast({
          title: "Status updated",
          description: "Business status updated successfully.",
          status: "success",
          duration: 900,
          isClosable: true,
        });

        // Update the state with the new status
        setAllBusinessCategory((prevBusiness) =>
          prevBusiness.map((business) =>
            business._id === Id
              ? { ...business, status: updatedStatus }
              : business
          )
        );
      }
    } catch (err) {
      console.error(`Error in toggling status: ${err.message}`);
      // Optionally show an error toast notification
      toast({
        title: "Error",
        description: "Failed to update business status.",
        status: "error",
        duration: 900,
        isClosable: true,
      });
    }
  };

  const handleBusinessChange = (e) => {
    setBusiness({ ...business, [e.target.name]: e.target.value });
  };

  const handleBusinessImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setBusinessFile(file);
    setBusinessPreviewURL(URL.createObjectURL(file));
  };

  const handleBusinessEditImageChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setBusinessEditFile(file);
    setBusinessEditPreviewURL(URL.createObjectURL(file));
    if (businessPreviewURL) {
      console.log("preview added", businessPreviewURL);
    }
    setBusinessEditPreviewURL(URL.createObjectURL(file));
  };

  const showModalBusiness = () => setIsModalVisibleBusiness(true);

  const showModalBusinessEdit = (Id) => {
    setCurrentBannerGet(Id);
    setIsModalVisibleBusinessEdit(true);
  };

  const showModalDelete = (Id) => {
    setCurrentBanner(Id);
    setIsShowModalDelete(true);
  };

  const handleCancel = () => {
    setIsModalVisibleBusiness(false);
    setIsModalVisibleBusinessEdit(false);
    setIsShowModalDelete(false);
  };

  // Function to remove a banner from the state
  const removeBanner = (Id) => {
    setAllBusinessCategory((prevBusiness) =>
      prevBusiness.filter((business) => business._id !== Id)
    );
  };

  // Function to handle confirm delete
  const handleConfirmDelete = () => {
    setIsShowModalDelete(false);
    setCurrentBanner(null);
  };

  // API call to delete app banner
  const handleBannerDelete = async (currentBanner) => {
    try {
      setConfirmLoading(true);

      const deleteResponse = await axios.delete(
        `${BASE_URL}/admin/business-categories/delete-business-category/${currentBanner}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (deleteResponse.status === 200) {
        removeBanner(currentBanner);
        handleConfirmDelete();
        toast({
          title: "Banner Deleted",
          description: "The banner was deleted successfully.",
          status: "success",
          duration: 900,
          isClosable: true,
        });
      } else {
        console.error(`Unexpected status code: ${deleteResponse.status}`);
        toast({
          title: "Error",
          description: "Failed to delete the banner. Unexpected status code.",
          status: "error",
          duration: 900,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(`Error deleting banner: ${err.message}`);
      toast({
        title: "Error",
        description: "Failed to delete the banner.",
        status: "error",
        duration: 900,
        isClosable: true,
      });
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleReorderCategory = async () => {
    try {
      const categoryClone = [...allBusinessCategory];
      const temp = categoryClone[dragCategory.current];
      categoryClone[dragCategory.current] =
        categoryClone[dragOverCategory.current];
      categoryClone[dragOverCategory.current] = temp;

      const categories = categoryClone.map((category, index) => {
        return { id: category._id, order: index + 1 };
      });

      const response = await axios.put(
        `${BASE_URL}/admin/business-categories/edit-business-category-order`,
        { categories: categories },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setAllBusinessCategory(categoryClone);
        toast({
          title: "Success",
          description: "Category reordered",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(`Error in reodering categories: ${err.stack}`);
      toast({
        title: "Error",
        description: `Error in reodering categories`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <div className="flex justify-between mx-5 gap-10 mt-10">
        <div className="w-96">Business Category</div>
        <p className="text-gray-500 w-[900px]">
          Business Categories provide your merchants the power to map their
          categories/products to a business category, which in turn will help
          the customers to easy checkout.
        </p>
        <div>
          <button
            onClick={showModalBusiness}
            className="bg-teal-800 text-white w-52 p-2 rounded-lg"
          >
            <PlusOutlined /> Add Business Category
          </button>
        </div>
      </div>

      <div className="grid justify-center mt-10 gap-5  border-b-2 border-gray-200 pb-10">
        {allBusinessCategory?.map((data) => (
          <div
            draggable
            onDragStart={() => (dragCategory.current = index)}
            onDragEnter={() => (dragOverCategory.current = index)}
            onDragEnd={handleReorderCategory}
            onDragOver={(e) => e.preventDefault()}
            className="bg-white rounded-lg p-3 px-5 flex items-center justify-between gap-5"
            key={data?._id}
          >
            <DragIndicatorIcon className="cursor-pointer" />
            <figure className="h-10 w-10">
              <img
                src={data?.bannerImageURL}
                className="object-cover w-full h-full rounded-full"
              />
            </figure>
            <p>{data?.title}</p>
            <Switch
              checked={data?.status}
              onChange={() => handleToggle(data?._id)}
              className="ml-24"
            />
            <button
              onClick={() => showModalBusinessEdit(data?._id)}
              className="bg-gray-200 p-3 rounded-lg"
            >
              <MdOutlineEdit className="bg-gray-200 text-[18px] rounded-lg" />
            </button>

            <button
              onClick={() => showModalDelete(data._id)}
              className="bg-red-100 p-3 rounded-lg"
            >
              <RiDeleteBinLine className=" text-[18px] text-red-900 " />
            </button>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      <Modal
        title="Add Business Category"
        open={isModalVisibleBusiness}
        className="mt-24"
        onCancel={handleCancel}
        footer={null} // Custom footer to include form buttons
      >
        <form onSubmit={handleBusiness}>
          <div className="flex mt-5 gap-4">
            <label className="w-1/2 text-gray-500">Service title</label>
            <input
              type="text"
              className="border-2 border-gray-300 rounded p-2 focus:outline-none w-2/3"
              name="title"
              value={business?.title}
              onChange={handleBusinessChange}
            />
          </div>
          <div className="flex mt-5  gap-4">
            <label className="w-1/2 text-gray-500">Geofence</label>
            <select
              name="geofenceId"
              value={business?.geofenceId}
              onChange={handleBusinessChange}
              className="border-2 border-gray-300 rounded p-2 focus:outline-none w-2/3"
            >
              <option defaultValue="select" hidden>
                Select Geofence
              </option>
              {allGeofence.map((geofence) => (
                <option value={geofence._id} key={geofence._id}>
                  {geofence.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex">
            <label className="mt-5">Image (342px x 160px)</label>
            <div className=" flex items-center gap-[30px]">
              {!businessPreviewURL && (
                <div className="bg-gray-400 ml-20 mt-5 h-16 w-16 rounded-md" />
              )}
              {businessPreviewURL && (
                <figure className="ml-20 mt-5 h-16 w-16 rounded-md relative">
                  <img
                    src={businessPreviewURL}
                    alt="profile"
                    className="w-full rounded h-full object-cover "
                  />
                </figure>
              )}
              <input
                type="file"
                name="businessImage"
                id="businessImage"
                className="hidden"
                onChange={handleBusinessImageChange}
              />
              <label htmlFor="businessImage" className="cursor-pointer ">
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
              {isSaveLoading ? "Adding" : "Add"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        title="Edit Business Category"
        open={isModalVisibleBuinessEdit}
        className="mt-24"
        onCancel={handleCancel}
        footer={null} // Custom footer to include form buttons
      >
        <form onSubmit={handleBusinessEdit}>
          <div className="flex mt-5 gap-4">
            <label className="w-1/2 text-gray-500">Service title</label>
            <input
              type="text"
              className="border-2 border-gray-300 rounded p-2 focus:outline-none w-2/3"
              name="title"
              id="title"
              placeholder={dataLoading ? "Loading data..." : ""}
              value={business?.title}
              onChange={handleBusinessChange}
            />
          </div>
          <div className="flex mt-5  gap-4">
            <label className="w-1/2 text-gray-500">Geofence</label>
            <select
              name="geofenceId"
              id="geofenceId"
              value={business?.geofenceId}
              onChange={handleBusinessChange}
              className="border-2 border-gray-300 rounded p-2 focus:outline-none w-2/3"
            >
              <option defaultValue="" hidden>
                Select Geofence
              </option>
              {allGeofence?.map((geofence) => (
                <option value={geofence._id} key={geofence._id}>
                  {geofence.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex">
            <label className="mt-5">Image (342px x 160px)</label>
            <div className=" flex items-center gap-[30px]">
              {!businessEditPreviewURL && (
                <div className="bg-gray-400 ml-20 mt-5 h-16 w-16 rounded-md" />
              )}
              {businessEditPreviewURL && business?.bannerImage && (
                <figure className="ml-20 mt-5 h-16 w-16 rounded-md relative">
                  <img
                    src={businessEditPreviewURL}
                    alt="profile"
                    className="w-full rounded h-full object-cover "
                  />
                </figure>
              )}

              {!businessEditPreviewURL && business?.bannerImage && (
                <div className="bg-cyan-50 shadow-md mt-3 h-16 w-16 rounded-md">
                  <img
                    src={business?.bannerImage}
                    alt="Current Banner"
                    className="w-full h-full"
                  />
                </div>
              )}
              <input
                type="file"
                name="bannerImage"
                id="bannerImage"
                className="hidden"
                onChange={handleBusinessEditImageChange}
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
              className="bg-teal-800 rounded-lg px-6 py-3 text-white font-semibold justify-end"
              type="submit"
            >
              {isSaveLoading ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Modal */}
      <Modal
        onCancel={handleCancel}
        footer={null}
        open={isShowModalDelete}
        centered
      >
        <form>
          <p className="font-bold text-[20px] mb-5">
            <Spin spinning={confirmLoading}>Are you sure want to delete?</Spin>
          </p>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-zinc-200 p-2 rounded-md font-semibold"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-red-100 p-2 rounded-md ml-3 px-2 text-red-700"
              onClick={() => handleBannerDelete(currentBanner)}
            >
              {" "}
              {confirmLoading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default BusinessCategory;
