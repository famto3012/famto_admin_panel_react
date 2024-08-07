import { Modal } from "antd";
import axios from "axios";
import { useState } from "react";
import { MdCameraAlt } from "react-icons/md";

const AddBusinessCategoryModal = ({
  isOpen,
  onCancel,
  BASE_URL,
  token,
  allGeofence,
  onAddCategory,
}) => {
  const [categoryData, setCategoryData] = useState({
    title: "",
    geofenceId: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const handleInputChange = (e) => {
    setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreviewURL(URL.createObjectURL(file));
  };

  const handleAddBusinessCategory = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const businessDataToSend = new FormData();
      businessDataToSend.append("geofenceId", categoryData.geofenceId);
      businessDataToSend.append("title", categoryData.title);
      if (selectedFile) {
        businessDataToSend.append("bannerImage", selectedFile);
      }

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

      if (response.status === 201) {
        onAddCategory(response.data.data);
        onCancel();
        toast({
          title: "Created",
          description: "Business Category Created Successfully.",
          duration: 900,
          status: "success",
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(`Error in creating business ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Add Business Category"
      open={isOpen}
      onCancel={onCancel}
      footer={null}
      centered
    >
      <form onSubmit={handleAddBusinessCategory}>
        <div className="flex mt-5 gap-4">
          <label className="w-1/2 text-gray-500">Service title</label>
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
            <option defaultValue="Select geofence" hidden>
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
            {!previewURL && (
              <div className="bg-gray-400 ml-20 mt-5 h-16 w-16 rounded-md" />
            )}

            {previewURL && (
              <figure className="ml-20 mt-5 h-16 w-16 rounded-md relative">
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
                className=" bg-teal-800  text-[40px] text-white p-6 h-16 w-16 mt-5 rounded"
                size={30}
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end mt-10  gap-4">
          <button
            className="bg-gray-300 rounded-lg px-6 py-2 font-semibold justify-end"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-teal-800 rounded-lg px-6 py-2 text-white font-semibold justify-end"
            type="submit"
          >
            {isLoading ? "Adding" : "Add"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddBusinessCategoryModal;
