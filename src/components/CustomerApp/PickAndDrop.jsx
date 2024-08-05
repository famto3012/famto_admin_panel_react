import React, { useContext, useEffect, useState } from "react";
import { MdCameraAlt } from "react-icons/md";
import { Switch, Card, Modal, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { MdOutlineEdit } from "react-icons/md";
import { useToast } from "@chakra-ui/react";
import { DeleteOutlined } from "@mui/icons-material";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const PickAndDrop = () => {
  const [getPickDrop, setGetPickDrop] = useState([]);
  const { token, role } = useContext(UserContext);
  const [status, setStatus] = useState("");
  const [pickDrop, setPickDrop] = useState({
    title: "",
    description: "",
    banenrImage: "",
  });
  const [currentBannerEdit, setCurrentBannerEdit] = useState(null);
  const [currentBannerDelete, setCurrentBannerDelete] = useState(null);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isModalVisiblePickDrop, setIsModalVisiblePickDrop] = useState(false);
  const [isModalVisiblePickDropEdit, setIsModalVisiblePickDropEdit] =
    useState(false);

  const [isShowModalDeletePick, setIsShowModalDeletePick] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${BASE_URL}/admin/pick-and-drop-banner/get-pick-drop-banner`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 200) {
          setGetPickDrop(response.data.data);
        }
      } catch (err) {
        console.error(`Error in fetching data ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, role]);

  const handlePickDrop = async (e) => {
    e.preventDefault();
    try {
      setIsSaveLoading(true);
      const banenrDataToSend = new FormData();
      banenrDataToSend.append("description", pickDrop.description);
      banenrDataToSend.append("title", pickDrop.title);
      banenrDataToSend.append("bannerImage", pickDropFile);

      const response = await axios.post(
        `${BASE_URL}/admin/pick-and-drop-banner/add-pick-drop-banner`,
        banenrDataToSend,
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
          title: "Created",
          description: "Custom Order Created Successfully.",
          duration: 900,
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
    setGetPickDrop((prevBanners) => {
      if (Array.isArray(prevBanners)) {
        return [...prevBanners, newCategory];
      } else {
        [newCategory];
      }
    });
  };

  useEffect(() => {
    const fetchBusinessCategory = async (currentBannerEdit) => {
      try {
        setDataLoading(true);
        const categoryResponse = await axios.get(
          `${BASE_URL}/admin/pick-and-drop-banner/get-pick-drop-banner/${currentBannerEdit}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (categoryResponse.status === 200) {
          const data = categoryResponse.data.data;
          setPickDrop({
            title: data.title,
            description: data.description,
            imageURL: data.imageUrl,
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

    if (currentBannerEdit) {
      fetchBusinessCategory(currentBannerEdit);
    }
  }, [currentBannerEdit, token]);

  const handlePickDropEdit = async (e) => {
    e.preventDefault();

    try {
      setIsSaveLoading(true);
      const businessDataToSend = new FormData();
      businessDataToSend.append("description", pickDrop.description);
      businessDataToSend.append("title", pickDrop.title);
      businessDataToSend.append("imageUrl", serviceFile);

      const response = await axios.put(
        `${BASE_URL}/admin/pick-and-drop-banner/edit-pick-drop-banner/${currentBannerEdit}`,
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

  // Function to remove a banner from the state
  const removeBanner = (bannerId) => {
    setGetPickDrop(getPickDrop.filter((banner) => banner._id !== bannerId));
  };

  // Function to handle confirm delete
  const handleConfirmDelete = () => {
    setCurrentBannerDelete(null);
    setIsShowModalDeletePick(false);
  };

  // API call to delete app banner
  const handleBannerDelete = async (e, currentBannerDelete) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      setConfirmLoading(true);

      const deleteResponse = await axios.delete(
        `${BASE_URL}/admin/pick-and-drop-banner/delete-pick-drop-banner/${currentBannerDelete}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (deleteResponse.status === 200) {
        removeBanner(currentBannerDelete);
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

  //update all Pick and Drop status

  const toggleChange = async (checked) => {
    setStatus(checked);

    try {
      const response = await axios.put(
        `${BASE_URL}/admin/pick-and-drop-banner/pick-drop-banner-status`,
        status,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setStatus(response.data.data);
        toast({
          title: "Status Updated",
          description: "Pick and Drop Status updated successfully.",
          duration: 900,
          status: "success",
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(`Error in updating data ${err}`);
    }
  };

  
  const bannerStatus = getPickDrop.some((banner) => banner.status === true);

  const handlePickDropChange = (e) => {
    setPickDrop({ ...pickDrop, [e.target.name]: e.target.value });
  };

  const [pickDropFile, setPickDropFile] = useState(null);
  const [pickDropPreviewURL, setPickDropPreviewURL] = useState(null);

  const handlePickDropImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setPickDropFile(file);
    setPickDropPreviewURL(URL.createObjectURL(file));
  };

  const [serviceFile, setServiceFile] = useState(null);
  const [servicePreviewURL, setServicePreviewURL] = useState(null);

  const handleServiceImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setServiceFile(file);
    setServicePreviewURL(URL.createObjectURL(file));
  };

  const showModalPickDrop = () => {
    setIsModalVisiblePickDrop(true);
  };

  const showModalPickDropEdit = (Id) => {
    setCurrentBannerEdit(Id);
    setIsModalVisiblePickDropEdit(true);
  };

  const showModalDeletePick = (Id) => {
    setCurrentBannerDelete(Id);
    setIsShowModalDeletePick(true);
  };

  const handleCancel = () => {
    setIsShowModalDeletePick(false);
    setIsModalVisiblePickDrop(false);
    setIsModalVisiblePickDropEdit(false);
  };

  return (
    <div>
      <div className="mt-10 justify-between flex mx-5">
        <h1>Pick and drop banners (info)</h1>
        <p className="w-[45rem] text-gray-500">
          The Purpose of this banner is to educate customer.
        </p>
        <Switch checked={bannerStatus} onChange={toggleChange} />
      </div>
      <div className=" ml-[335px] mt-5">
        <button
          onClick={showModalPickDrop}
          className="bg-teal-800 text-white  rounded-lg p-2"
        >
          <PlusOutlined /> Add Banner
        </button>
        <Modal
          title="Add Banner"
          open={isModalVisiblePickDrop}
          className="mt-24"
          onCancel={handleCancel}
          footer={null} // Custom footer to include form buttons
        >
          <form onSubmit={handlePickDrop}>
            <div className="flex mt-5 gap-4">
              <label className="w-1/2 text-gray-500">Service title</label>
              <input
                type="text"
                className="border-2 border-gray-300 rounded p-2 focus:outline-none w-2/3"
                name="title"
                value={pickDrop?.title}
                onChange={handlePickDropChange}
              />
            </div>
            <div className="flex mt-5  gap-4">
              <label className="w-1/2 text-gray-500">Description</label>
              <input
                type="text"
                className="border-2 border-gray-300 rounded p-2 focus:outline-none w-2/3"
                name="description"
                value={pickDrop?.description}
                onChange={handlePickDropChange}
              />
            </div>
            <div className="flex">
              <label className="mt-5">Image (342px x 160px)</label>
              <div className=" flex items-center gap-[30px]">
                {!pickDropPreviewURL && (
                  <div className="bg-gray-400 ml-20 mt-5 h-16 w-16 rounded-md" />
                )}
                {pickDropPreviewURL && (
                  <figure className="ml-20 mt-5 h-16 w-16 rounded-md relative">
                    <img
                      src={pickDropPreviewURL}
                      alt="profile"
                      className="w-full rounded h-full object-cover "
                    />
                  </figure>
                )}
                <input
                  type="file"
                  name="pickDrop"
                  id="pickDrop"
                  className="hidden"
                  onChange={handlePickDropImageChange}
                />
                <label htmlFor="pickDrop" className="cursor-pointer ">
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
                {isSaveLoading ? "Saving..." : "Add"}
              </button>
            </div>
          </form>
        </Modal>
      </div>
      <Spin spinning={isLoading} size="large">
        <div className="grid xl:grid-cols-2 grid-cols-1 ml-[335px]  mt-10  gap-5">
          {getPickDrop.map((banner) => (
            <Card className="w-[23rem]" key={banner._id}>
              <p className="font-semibold">{banner.title}</p>
              <p>{banner.description}</p>
              <img src={banner.imageUrl} className="max-h-32 w-full" />
              <div className="flex h-14">
                <button
                  className="bg-blue-100 rounded-3xl px-12 mt-5"
                  onClick={() => showModalPickDropEdit(banner._id)}
                >
                  <div className="flex items-center justify-center">
                    <MdOutlineEdit className="text-[18px] mr-1" /> Edit
                  </div>
                </button>
                <Modal
                  title="Edit Banner"
                  open={isModalVisiblePickDropEdit}
                  className="mt-24"
                  onCancel={handleCancel}
                  footer={null} // Custom footer to include form buttons
                >
                  <form onSubmit={handlePickDropEdit}>
                    <div className="flex mt-5 gap-4">
                      <label className="w-1/2 text-gray-500">
                        Service title
                      </label>
                      <input
                        type="text"
                        className="border-2 border-gray-300 rounded p-2 focus:outline-none w-2/3"
                        name="title"
                        placeholder={dataLoading ? "Loading data..." : ""}
                        value={pickDrop.title}
                        onChange={handlePickDropChange}
                      />
                    </div>
                    <div className="flex mt-5  gap-4">
                      <label className="w-1/2 text-gray-500">Geofence</label>
                      <input
                        type="text"
                        className="border-2 border-gray-300 rounded p-2 focus:outline-none w-2/3"
                        name="description"
                        value={pickDrop.description}
                        onChange={handlePickDropChange}
                      />
                    </div>
                    <div className="flex">
                      <label className="mt-5">Image (342px x 160px)</label>
                      <div className=" flex items-center gap-[30px]">
                        {!servicePreviewURL && (
                          <div className="bg-gray-400 ml-20 mt-5 h-16 w-16 rounded-md" />
                        )}
                        {servicePreviewURL && pickDrop.imageUrl && (
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
                          name="bannerURL"
                          id="bannerURL"
                          className="hidden"
                          onChange={handleServiceImageChange}
                        />
                        <label
                          htmlFor="bannerImage"
                          className="cursor-pointer "
                        >
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
                        Add
                      </button>
                    </div>
                  </form>
                </Modal>
                <button
                  className="bg-teal-800 rounded-3xl text-white ml-5 px-12 mt-5"
                  onClick={() => showModalDeletePick(banner._id)}
                >
                  <div className="flex items-center justify-center">
                    <DeleteOutlined className="text-[18px] mr-1" /> Delete
                  </div>
                </button>
                <Modal
                  onCancel={handleCancel}
                  footer={null}
                  open={isShowModalDeletePick}
                  centered
                >
                  <form>
                    <p className="font-bold text-[20px] mb-5">
                      <Spin spinning={confirmLoading}>
                        Are you sure want to delete this?
                      </Spin>
                    </p>
                    <div className="flex justify-end">
                      <button
                        className="bg-zinc-200 p-2 rounded-md font-semibold"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-red-100 p-2 rounded-md ml-3 px-2 text-red-700"
                        onClick={(e) =>
                          handleBannerDelete(e, currentBannerDelete)
                        }
                      >
                        {" "}
                        Delete
                      </button>
                    </div>
                  </form>
                </Modal>
              </div>
            </Card>
          ))}
        </div>
      </Spin>
    </div>
  );
};

export default PickAndDrop;
