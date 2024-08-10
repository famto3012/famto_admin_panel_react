import { useToast } from "@chakra-ui/react";
import { Modal } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdCameraAlt } from "react-icons/md";

const EditBusinessCategoryModal = ({
  isOpen,
  onCancel,
  BASE_URL,
  token,
  allGeofence,
  categoryId,
  onEditCategory,
}) => {
  const [categoryData, setCategoryData] = useState({
    title: "",
    geofenceId: "",
    bannerImageURL: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const toast = useToast();

  useEffect(() => {
    if (!categoryId) return;

    const fetchBusinessCategoryData = async () => {
      try {
        const categoryResponse = await axios.get(
          `${BASE_URL}/admin/business-categories/${categoryId}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (categoryResponse.status === 200) {
          const { data } = categoryResponse.data;
          setCategoryData(data);
          setPreviewURL(data.bannerImageURL);
        }
      } catch (err) {
        console.error(`Error fetching business category ${err.message}`);
      }
    };

    fetchBusinessCategoryData();
  }, [categoryId, token]);

  const handleInputChange = (e) => {
    setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreviewURL(URL.createObjectURL(file));
  };

  const handleEditBusinessCategory = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const dataToSend = new FormData();

      dataToSend.append("title", categoryData.title);
      dataToSend.append("geofenceId", categoryData.geofenceId);
      if (selectedFile) {
        dataToSend.append("bannerImage", selectedFile);
      }

      const response = await axios.put(
        `${BASE_URL}/admin/business-categories/edit-business-category/${categoryId}`,
        dataToSend,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        onEditCategory(response.data.data);
        onCancel();
        toast({
          title: "Success",
          description: "Business Category Updated Successfully.",
          duration: 3000,
          status: "success",
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(`Error in updating business category: ${err.message}`);
      toast({
        title: "Error",
        description: "Failed to update business category.",
        duration: 3000,
        status: "error",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Business Category"
      open={isOpen}
      className="mt-24"
      onCancel={onCancel}
      footer={null}
      centered
    >
      <form onSubmit={handleEditBusinessCategory}>
        <div className="flex mt-5 gap-4">
          <label className="w-1/2 text-gray-500">Title</label>
          <input
            type="text"
            className="border-2 border-gray-300 rounded p-2 focus:outline-none w-2/3"
            name="title"
            value={categoryData?.title}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex mt-5  gap-4">
          <label className="w-1/2 text-gray-500">Geofence</label>
          <select
            name="geofenceId"
            value={categoryData?.geofenceId}
            onChange={handleInputChange}
            className="border-2 border-gray-300 rounded p-2 focus:outline-none w-2/3"
          >
            {allGeofence.map((geofence) => (
              <option value={geofence._id} key={geofence._id}>
                {geofence.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex mt-5 gap-4">
          <label className="w-1/2 text-gray-500">Image (342px x 160px)</label>
          <div className="w-2/3 flex items-center justify-start gap-[30px]">
            {previewURL && (
              <figure className="h-16 w-16 rounded-md relative">
                <img
                  src={previewURL}
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
              onChange={handleImageChange}
            />
            <label htmlFor="businessImage" className="cursor-pointer ">
              <MdCameraAlt
                className="bg-teal-800 text-[40px] text-white p-6 h-16 w-16 rounded"
                size={30}
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end mt-10 gap-4">
          <button
            className="bg-gray-300 rounded-lg px-6 py-2 font-semibold"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-teal-800 rounded-lg px-6 py-2 text-white font-semibold"
            type="submit"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditBusinessCategoryModal;
