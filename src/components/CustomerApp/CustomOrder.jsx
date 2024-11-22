import React, { useContext, useEffect, useState } from "react";
import { MdCameraAlt } from "react-icons/md";
import { Switch, Card, Modal, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { MdOutlineEdit } from "react-icons/md";
import { useToast } from "@chakra-ui/react";
import { DeleteOutlined } from "@mui/icons-material";
import DatePicker from "react-datepicker";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const CustomerOrder = () => {
  const [isShowModalDeleteCustomer, setIsShowModalDeleteCustomer] =
    useState(false);
  const [isModalVisibleBanner, setIsModalVisibleBanner] = useState(false);
  const [isModalVisibleBannerEdit, setIsModalVisibleBannerEdit] =
    useState(false);
  const [currentBannerEdit, setCurrentBannerEdit] = useState(null);
  const [currentBannerDelete, setCurrentBannerDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [IsSaveLoading, setIsSaveLoading] = useState(false);
  const { token, role } = useContext(UserContext);
  const [status, setStatus] = useState("");
  const toast = useToast();
  const [banner, setBanner] = useState([]);
  const [addBanner, setAddBanner] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });

  // API to fetch Custom order Banners

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${BASE_URL}/admin/custom-order-banner/get-custom-order-banner`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 200) {
          setBanner(response.data.data);
        }
      } catch (err) {
        console.error(`Error in fetching data ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, role]);

  const handleBanner = async (e) => {
    e.preventDefault();
    try {
      setIsSaveLoading(true);
      const banenrDataToSend = new FormData();
      banenrDataToSend.append("description", addBanner.description);
      banenrDataToSend.append("title", addBanner.title);
      banenrDataToSend.append("bannerImage", bannerFile);

      const response = await axios.post(
        `${BASE_URL}/admin/custom-order-banner/add-custom-order-banner`,
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
    setBanner((prevBanners) => {
      if (Array.isArray(prevBanners)) {
        return [...prevBanners, newCategory];
      } else {
        [newCategory];
      }
    });
  };

  // API to get single custom banner

  useEffect(() => {
    const fetchBusinessCategory = async (currentBannerEdit) => {
      try {
        setDataLoading(true);
        const categoryResponse = await axios.get(
          `${BASE_URL}/admin/custom-order-banner/get-custom-order-banner/${currentBannerEdit}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (categoryResponse.status === 200) {
          const data = categoryResponse.data.data;
          setAddBanner({
            title: data.title,
            description: data.description,
            imageURL: data.imageUrl,
          });
        }
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to fetch business category.",
          status: "error",
          duration: 3000,
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
  1;

  const handleBannerEdit = async (e) => {
    e.preventDefault();

    try {
      setIsSaveLoading(true);
      const businessDataToSend = new FormData();
      businessDataToSend.append("description", addBanner.description);
      businessDataToSend.append("title", addBanner.title);
      businessDataToSend.append("imageUrl", serviceFile);

      const response = await axios.put(
        `${BASE_URL}/admin/custom-order-banner/edit-custom-order-banner/${currentBannerEdit}`,
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
        handleAddBannerEdit(response.data.data);
        toast({
          title: "Success",
          description: "Business Category Created Successfully.",
          duration: 3000,
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

  const handleAddBannerEdit = (newCategory) => {
    setBanner((prevBanners) => {
      if (Array.isArray(prevBanners)) {
        return [...prevBanners, newCategory];
      } else {
        [newCategory];
      }
    });
  };

  const bannerStatus = banner.some((banner) => banner.status === true);

  const handleBannerChange = (e) => {
    setAddBanner({ ...addBanner, [e.target.name]: e.target.value });
  };

  // Function to remove a banner from the state
  const removeBanner = (bannerId) => {
    setBanner(banner.filter((banner) => banner._id !== bannerId));
  };

  // Function to handle confirm delete
  const handleConfirmDelete = () => {
    setCurrentBannerDelete(null);
    setIsShowModalDeleteCustomer(false);
  };

  // API call to delete app banner
  const handleBannerDelete = async (e, currentBannerDelete) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      setConfirmLoading(true);

      const deleteResponse = await axios.delete(
        `${BASE_URL}/admin/custom-order-banner/delete-custom-order-banner/${currentBannerDelete}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (deleteResponse.status === 200) {
        removeBanner(currentBannerDelete);
        handleConfirmDelete();
        toast({
          title: "Success",
          description: "The banner was deleted successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete the banner. Unexpected status code.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete the banner.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setConfirmLoading(false);
    }
  };

  const toggleChange = async (checked) => {
    setStatus(checked);

    try {
      const response = await axios.put(
        `${BASE_URL}/admin/custom-order-banner/custom-order-banner-status`,
        status,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setStatus(response.data.data);
        toast({
          title: "Success",
          description: "Custom order Status updated successfully.",
          duration: 3000,
          status: "success",
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(`Error in updating data ${err}`);
    }
  };

  const showModalBanner = () => {
    setIsModalVisibleBanner(true);
  };

  const showModalBannerEdit = (Id) => {
    setCurrentBannerEdit(Id);
    setIsModalVisibleBannerEdit(true);
  };

  const ShowModalDeleteCustomer = (Id) => {
    setCurrentBannerDelete(Id);
    setIsShowModalDeleteCustomer(true);
  };

  const handleCancel = () => {
    setIsShowModalDeleteCustomer(false);
    setIsModalVisibleBanner(false);
    setIsModalVisibleBannerEdit(false);
  };

  const [bannerFile, setBannerFile] = useState(null);
  const [bannerPreviewURL, setBannerPreviewURL] = useState(null);

  const handleBannerImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setBannerFile(file);
    setBannerPreviewURL(URL.createObjectURL(file));
  };

  const [serviceFile, setServiceFile] = useState(null);
  const [servicePreviewURL, setServicePreviewURL] = useState(null);

  const handleServiceImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setServiceFile(file);
    setServicePreviewURL(URL.createObjectURL(file));
  };

  return (
    <div>
      <div className="mt-10 justify-between flex mx-5">
        <h1>Custom Order Banners (info)</h1>
        <p className="w-[45rem] text-gray-500">
          The Purpose of this banner is to educate customer.
        </p>
        <Switch checked={bannerStatus} onChange={toggleChange} />
      </div>
      <div className=" ml-[335px] mt-5">
        <button
          onClick={showModalBanner}
          className="bg-teal-800 text-white  rounded-lg p-2"
        >
          <PlusOutlined /> Add Banner
        </button>
        <Modal
          title="Add Banner"
          open={isModalVisibleBanner}
          className="mt-24"
          onCancel={handleCancel}
          footer={null} // Custom footer to include form buttons
        >
          <form onSubmit={handleBanner}>
            <div className="flex mt-5 gap-4">
              <label className="w-1/2 text-gray-500">Service title</label>
              <input
                type="text"
                className="border-2 border-gray-300 rounded p-2 focus:outline-none w-2/3"
                name="title"
                value={addBanner.title}
                onChange={handleBannerChange}
              />
            </div>
            <div className="flex mt-5  gap-4">
              <label className="w-1/2 text-gray-500">Description</label>
              <input
                type="text"
                className="border-2 border-gray-300 rounded p-2 focus:outline-none w-2/3"
                name="description"
                value={addBanner.description}
                onChange={handleBannerChange}
              />
            </div>
            <div className="flex">
              <label className="mt-5">Image (342px x 160px)</label>
              <div className=" flex items-center gap-[30px]">
                {!bannerPreviewURL && (
                  <div className="bg-gray-400 ml-20 mt-5 h-16 w-16 rounded-md" />
                )}
                {bannerPreviewURL && (
                  <figure className="ml-20 mt-5 h-16 w-16 rounded-md relative">
                    <img
                      src={bannerPreviewURL}
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
                  onChange={handleBannerImageChange}
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
                {IsSaveLoading ? "Adding..." : "Add"}
              </button>
            </div>
          </form>
        </Modal>
      </div>
      <Spin spinning={isLoading} size="large">
        <div className="grid justify-end ml-[20rem] xl:grid-cols-2 grid-cols-1">
          {banner?.map((banner) => (
            <div className="  mt-10" key={banner._id}>
              <Card className="max-w-[23rem]">
                <p className="font-semibold">{banner.title}</p>
                <p>{banner.description}</p>
                <img src={banner.imageUrl} className="max-h-32 w-full" />
                <div className="flex h-14">
                  <button
                    type="button"
                    className="bg-blue-100 rounded-3xl px-12 mt-5"
                    onClick={() => showModalBannerEdit(banner._id)}
                  >
                    <div className="flex items-center justify-center">
                      <MdOutlineEdit className="text-[18px] mr-1" /> Edit
                    </div>
                  </button>
                  <Modal
                    title="Edit Banner"
                    open={isModalVisibleBannerEdit}
                    className="mt-24"
                    onCancel={handleCancel}
                    footer={null} // Custom footer to include form buttons
                  >
                    <form onSubmit={handleBannerEdit}>
                      <div className="flex mt-5 gap-4">
                        <label className="w-1/2 text-gray-500">
                          Service title
                        </label>
                        <input
                          type="text"
                          className="border-2 border-gray-300 rounded p-2 focus:outline-none w-2/3"
                          name="title"
                          placeholder={dataLoading ? "Loading data..." : " "}
                          value={addBanner.title}
                          onChange={handleBannerChange}
                        />
                      </div>
                      <div className="flex mt-5  gap-4">
                        <label className="w-1/2 text-gray-500">
                          Description
                        </label>
                        <input
                          type="text"
                          className="border-2 border-gray-300 rounded p-2 focus:outline-none w-2/3"
                          name="description"
                          value={addBanner.description}
                          onChange={handleBannerChange}
                        />
                      </div>
                      <div className="flex">
                        <label className="mt-5">Image (342px x 160px)</label>
                        <div className=" flex items-center gap-[30px]">
                          {!servicePreviewURL && (
                            <div className="bg-gray-400 ml-20 mt-5 h-16 w-16 rounded-md" />
                          )}
                          {servicePreviewURL && addBanner.imageUrl && (
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
                    className="bg-teal-800 text-white rounded-3xl ml-5 px-12 mt-5"
                    onClick={() => ShowModalDeleteCustomer(banner._id)}
                  >
                    <div className="flex items-center justify-center">
                      <DeleteOutlined className="text-[18px] mr-1" /> Delete
                    </div>
                  </button>
                  <Modal
                    onCancel={handleCancel}
                    footer={null}
                    open={isShowModalDeleteCustomer}
                    centered
                  >
                    <form>
                      <p className="font-bold text-[20px] mb-5">
                        Are you sure want to delete?
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
                          {confirmLoading ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </form>
                  </Modal>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </Spin>
    </div>
  );
};

export default CustomerOrder;
