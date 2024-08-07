import { useContext, useEffect, useRef, useState } from "react";
import { Switch } from "antd";
import { RiDeleteBinLine } from "react-icons/ri";
import { PlusOutlined } from "@ant-design/icons";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { MdOutlineEdit } from "react-icons/md";
import { Spinner, useToast } from "@chakra-ui/react";
import AddBusinessCategoryModal from "../model/customerApp/AddBusinessCategoryModal";
import EditBusinessCategoryModal from "../model/customerApp/EditBusinessCategoryModal";
import DeleteBusinessCategoryModal from "../model/customerApp/DeleteBusinessCategoryModal";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const BusinessCategory = () => {
  const [allBusinessCategory, setAllBusinessCategory] = useState([]);
  const [allGeofence, setAllGeofence] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { token } = useContext(UserContext);
  const toast = useToast();
  const dragCategory = useRef(0);
  const dragOverCategory = useRef(0);

  const [isLoading, setIsLoading] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Get all Business category and Geofence
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

  const showAddCategoryModal = () => setShowAddModal(true);

  const showEditCategoryModal = (id) => {
    setSelectedCategory(id);
    setShowEditModal(true);
  };

  const showDeleteCategoryModal = (id) => {
    setSelectedCategory(id);
    setShowDeleteModal(true);
  };

  const handleCancel = () => {
    setSelectedCategory(null);
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
  };

  // Change category status
  const handleChangeStatus = async (categoryId) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/admin/business-categories/change-status/${categoryId}`,
        {},
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      if (response.status === 201) {
        handleAddBanner(response.data.data);
        toast({
          title: "Created",
          description: "Business Category Created Successfully.",
          duration: 5000,
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
      toast({
        title: "Status updated",
        description: "Business status updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      if (response.status === 200) {
        const { data } = response.data;

        setAllBusinessCategory((prevCategories) =>
          prevCategories.map((category) =>
            category._id === categoryId
              ? { ...category, status: data }
              : category
          )
        );
      }
    } catch (err) {
      console.error(`Error in toggling status: ${err.message}`);
      toast({
        title: "Error",
        description: "Failed to update business status.",
        status: "error",
        duration: 900,
        isClosable: true,
      });
    }
  };

  // Re arrage Categories
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

  // Include the newly added category
  const handleAddedCategory = (newCategory) => {
    setAllBusinessCategory((prevCategories) => [
      ...prevCategories,
      newCategory,
    ]);
  };

  // Change edited category
  const handleEditedCategory = (editedCategory) => {
    setAllBusinessCategory((prevCategories) =>
      prevCategories.map((category) =>
        category._id === editedCategory._id
          ? {
              ...category,
              title: editedCategory.title,
              geofenceId: editedCategory.geofenceId,
              bannerImageURL: editedCategory.bannerImageURL,
              status: editedCategory.status,
            }
          : category
      )
    );
  };

  // Remove deleted category
  const handleDeletedCategory = (categoryId) => {
    setAllBusinessCategory((prevCategories) =>
      prevCategories.filter((category) => category._id !== categoryId)
    );
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
            onClick={showAddCategoryModal}
            className="bg-teal-800 text-white w-52 p-2 rounded-lg"
          >
            <PlusOutlined /> Add Business Category
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="h-[20rem] flex items-center justify-center">
          <Spinner />
        </div>
      )}

      {!isLoading && (
        <div className="grid justify-center mt-10 gap-5  border-b-2 border-gray-200 pb-10">
          {allBusinessCategory?.map((data, index) => (
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
              <p className=" flex-grow overflow-ellipsis">{data?.title}</p>
              <Switch
                checked={data?.status}
                onChange={() => handleChangeStatus(data._id)}
                className="ml-24"
              />
              <button
                onClick={() => showEditCategoryModal(data._id)}
                className="bg-gray-200 p-3 rounded-lg"
              >
                <MdOutlineEdit className="bg-gray-200 text-[18px] rounded-lg" />
              </button>

              <button
                onClick={() => showDeleteCategoryModal(data._id)}
                className="bg-red-100 p-3 rounded-lg"
              >
                <RiDeleteBinLine className=" text-[18px] text-red-900 " />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      <AddBusinessCategoryModal
        isOpen={showAddModal}
        onCancel={handleCancel}
        BASE_URL={BASE_URL}
        token={token}
        allGeofence={allGeofence}
        onAddCategory={handleAddedCategory}
      />

      {/* Edit Modal */}
      <EditBusinessCategoryModal
        isOpen={showEditModal}
        onCancel={handleCancel}
        BASE_URL={BASE_URL}
        token={token}
        allGeofence={allGeofence}
        categoryId={selectedCategory}
        onEditCategory={handleEditedCategory}
      />

      {/* Delete Modal */}
      <DeleteBusinessCategoryModal
        isOpen={showDeleteModal}
        onCancel={handleCancel}
        BASE_URL={BASE_URL}
        token={token}
        categoryId={selectedCategory}
        onDeleteCategory={handleDeletedCategory}
      />
    </>
  );
};

export default BusinessCategory;
