import { useContext, useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { PlusOutlined } from "@ant-design/icons";
import { Switch } from "antd";
import GlobalSearch from "../../../components/GlobalSearch";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";
import AddTaxModal from "../../../components/model/Tax/AddTaxModal";
import EditTaxModal from "../../../components/model/Tax/EditTaxModal";
import DeleteTaxModal from "../../../components/model/Tax/DeleteTaxModal";
import { useNavigate } from "react-router-dom";
import { Spinner, useToast } from "@chakra-ui/react";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const Tax = () => {
  const [allTax, setAllTax] = useState([]);
  const [allGeofence, setAllGeofence] = useState([]);
  const [allBusinessCategory, setBusinessCategory] = useState([]);

  const { token, role } = useContext(UserContext);
  const toast = useToast();
  const navigate = useNavigate();

  // Loading state
  const [isTableLoading, setIsTableLoading] = useState(false);

  // State for each modal
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [currentTax, setCurrentTax] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
      return;
    } else if (token && role === "Merchant") {
      navigate("/home");
      return;
    }

    const fetchData = async () => {
      try {
        setIsTableLoading(true);

        const [taxResponse, geofenceResponse, businessCategoryResponse] =
          await Promise.all([
            axios.get(`${BASE_URL}/admin/taxes/all-tax`, {
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${BASE_URL}/admin/geofence/get-geofence`, {
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(
              `${BASE_URL}/admin/business-categories/get-all-business-category`,
              {
                withCredentials: true,
                headers: { Authorization: `Bearer ${token}` },
              }
            ),
          ]);

        if (taxResponse.status === 200) {
          setAllTax(taxResponse.data.data);
        }

        if (geofenceResponse.status === 200) {
          setAllGeofence(geofenceResponse.data.geofences);
        }

        if (businessCategoryResponse.status === 200) {
          setBusinessCategory(businessCategoryResponse.data.data);
          console.log(businessCategoryResponse.data.data);
        }
      } catch (err) {
        toast({
          title: "Error",
          description: "There is an error occoured while fetching all taxes",
          duration: 3000,
          isClosable: true,
          status: "error",
        });
      } finally {
        setIsTableLoading(false);
      }
    };

    fetchData();
  }, [token, role, navigate]);

  const showAddModal = () => {
    setAddModalVisible(!addModalVisible);
  };

  const showEditModal = (taxId) => {
    setCurrentTax(taxId);
    setEditModalVisible(true);
  };

  const showDeleteModal = (taxId) => {
    setCurrentTax(taxId);
    setDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setCurrentTax(null);
    setAddModalVisible(false);
    setEditModalVisible(false);
    setDeleteModalVisible(false);
  };

  const handleToggle = async (taxId) => {
    try {
      const tax = allTax.find((tax) => tax.taxId === taxId);

      if (tax) {
        const updatedStatus = !tax.status;

        const response = await axios.post(
          `${BASE_URL}/admin/taxes/change-status/${taxId}`,
          {
            ...tax,
            status: updatedStatus,
          },
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          setAllTax(
            allTax.map((t) =>
              t.taxId === taxId ? { ...t, status: updatedStatus } : t
            )
          );

          toast({
            title: "Success",
            description: "Tax status Updated successfully.",
            duration: 3000,
            isClosable: true,
            status: "success",
          });
        }
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Error un changing tax status",
        duration: 3000,
        isClosable: true,
        status: "error",
      });
    }
  };

  const handleAddedTax = (newTax) => {
    setAllTax((prevTax) => [...prevTax, newTax]);
  };

  const handleDeletedTax = (taxId) => {
    setAllTax(allTax.filter((tax) => tax.taxId !== taxId));
  };

  const handleEditedTax = (editedTax) => {
    setAllTax((prevTax) =>
      prevTax.map((tax) =>
        tax.taxId === editedTax.taxId
          ? {
              ...tax,
              taxName: editedTax.taxName,
              tax: editedTax.tax,
              taxType: editedTax.taxType,
              assignToBusinessCategory: editedTax.assignToBusinessCategory,
              geofences: editedTax.geofences,
              status: editedTax.status,
            }
          : tax
      )
    );
  };

  return (
    <div>
      <>
        <Sidebar />
        <div className="pl-[300px] w-full">
          <nav className="p-5">
            <GlobalSearch />
          </nav>
          <div className="flex justify-between mt-5 mx-5">
            <h1 className="font-bold">Tax</h1>
            <button
              onClick={showAddModal}
              className="bg-teal-700 text-white px-5 rounded-lg p-2"
            >
              <PlusOutlined /> Add Tax
            </button>
          </div>
          <p className="ms-5 mt-8 text-gray-500">
            Make sure that taxes aren't duplicated under the same name on the
            platform.
            <span className="text-red-700">
              {" "}
              Two taxes under the same name cannot coexist.
            </span>
          </p>
          <div className="w-full">
            <table className="bg-white mt-[45px] text-center w-full">
              <thead className=" sticky top-0 left-0 z-20">
                <tr>
                  {[
                    // "Tax Id",
                    "Tax name",
                    "Tax",
                    "Fixed/Percentage",
                    "Assign to Business category",
                    "Geofence",
                    "Status",
                  ].map((header) => (
                    <th
                      key={header}
                      className="bg-teal-800 text-center h-[70px] text-white"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {isTableLoading && (
                  <tr>
                    <td colSpan={6} className="text-center text-[16px] py-6">
                      Loading Data... <Spinner size="sm" />
                    </td>
                  </tr>
                )}

                {!isTableLoading && allTax?.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-3">
                      No Data available
                    </td>
                  </tr>
                )}

                {!isTableLoading &&
                  allTax?.map((tax) => (
                    <tr
                      key={tax.taxId}
                      className="even:bg-gray-200 last:border-b max-h-[30rem] overflow-y-auto"
                    >
                      <td className="py-2 px-4">{tax.taxName}</td>
                      <td className="py-2 px-4">{tax.tax}</td>
                      <td className="py-2 px-4">{tax.taxType}</td>
                      <td className="py-2 px-4">
                        {tax?.assignToBusinessCategory}
                      </td>
                      <td className="py-2 px-4">
                        {tax?.geofences?.map((geofence, index) => (
                          <span key={index} className="flex flex-col">
                            {geofence}
                            {index < tax.geofences.length - 1 && ", "}
                          </span>
                        ))}
                      </td>
                      <td className="py-5 px-4">
                        <div className="flex justify-center items-center gap-3">
                          <Switch
                            className="text-teal-700 mt-2 z-10"
                            checked={tax.status}
                            onChange={() => handleToggle(tax.taxId)}
                          />
                          <button onClick={() => showEditModal(tax.taxId)}>
                            <MdOutlineEdit className="bg-gray-200 rounded-lg p-2 text-[35px]" />
                          </button>
                          <button
                            onClick={() => showDeleteModal(tax.taxId)}
                            className="outline-none focus:outline-none"
                          >
                            <RiDeleteBinLine className="text-red-900 rounded-lg bg-red-100 p-2 text-[35px]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <AddTaxModal
          isVisible={addModalVisible}
          handleCancel={handleCancel}
          token={token}
          BASE_URL={BASE_URL}
          allGeofence={allGeofence}
          allBusinessCategory={allBusinessCategory}
          onAddTax={handleAddedTax}
        />

        <EditTaxModal
          isVisible={editModalVisible}
          handleCancel={handleCancel}
          token={token}
          BASE_URL={BASE_URL}
          taxId={currentTax}
          allGeofence={allGeofence}
          allBusinessCategory={allBusinessCategory}
          onEditTax={handleEditedTax}
        />

        <DeleteTaxModal
          isVisible={deleteModalVisible}
          handleCancel={handleCancel}
          currentTax={currentTax}
          token={token}
          BASE_URL={BASE_URL}
          onDeleteTax={handleDeletedTax}
        />
      </>
    </div>
  );
};

export default Tax;
