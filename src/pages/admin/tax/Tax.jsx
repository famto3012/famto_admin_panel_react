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
import GIFLoader from "../../../components/GIFLoader";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const Tax = () => {
  const [taxData, setTaxData] = useState([]);
  const [allGeofence, setAllGeofence] = useState([]);
  const [allBusinessCategory, setBusinessCategory] = useState([]);
  const { token, role } = useContext(UserContext);
  const navigate = useNavigate();

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);

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
          setTaxData(taxResponse.data.data);
        }
        if (geofenceResponse.status === 200) {
          setAllGeofence(geofenceResponse.data.geofences);
        }
        if (businessCategoryResponse.status === 200) {
          setBusinessCategory(businessCategoryResponse.data.data);
        }
      } catch (err) {
        console.error(`Error in fetching data: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, role, navigate]);

  const showAddModal = () => {
    setAddModalVisible(!addModalVisible);
  };

  const showEditModal = (taxId) => {
    const singleTax = taxData.find(
      (tax) => tax._id.toString() === taxId.toString()
    );

    setCurrentTax(singleTax);
    setEditModalVisible(true);
  };

  const showDeleteModal = (taxId) => {
    setCurrentTax(taxId);
    setDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setAddModalVisible(false);
    setEditModalVisible(false);
    setDeleteModalVisible(false);
    setCurrentTax(null);
  };

  const handleToggle = async (taxId) => {
    try {
      const tax = taxData.find((tax) => tax._id === taxId);
      if (tax) {
        const updatedStatus = !tax.status;
        await axios.post(
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
        setTaxData(
          taxData.map((t) =>
            t._id === taxId ? { ...t, status: updatedStatus } : t
          )
        );
      }
    } catch (err) {
      console.log(`Error in toggling tax status: ${err}`);
    }
  };

  const handleAddTax = (newTax) => {
    setTaxData([...taxData, newTax]);
  };

  // New function to remove a tax from the taxData state
  const removeTax = (taxId) => {
    setTaxData(taxData.filter((tax) => tax._id !== taxId));
  };

  // New function to handle confirm delete
  const handleConfirmDelete = () => {
    setDeleteModalVisible(!deleteModalVisible);
    setCurrentTax(null);
  };

  return (
    <div>
      {isLoading ? (
        <GIFLoader />
      ) : (
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
              <AddTaxModal
                isVisible={addModalVisible}
                handleCancel={handleCancel}
                token={token}
                BASE_URL={BASE_URL}
                allGeofence={allGeofence}
                allBusinessCategory={allBusinessCategory}
                onAddTax={handleAddTax}
              />
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
                <thead>
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
                  {taxData.map((tax) => (
                    <tr key={tax._id}>
                      {/* <td className="py-2 px-4 border-b border-gray-100">
                        {tax._id}
                      </td> */}

                      <td className="py-2 px-4 border-b border-gray-100">
                        {tax.taxName}
                      </td>

                      <td className="py-2 px-4 border-b border-gray-100">
                        {tax.tax}
                      </td>

                      <td className="py-2 px-4 border-b border-gray-100">
                        {tax.taxType}
                      </td>

                      <td className="py-2 px-4 border-b border-gray-100">
                        {tax.assignToBusinessCategoryId.title}
                      </td>

                      <td className="py-2 px-4 border-b border-gray-100">
                        {tax.geofenceId.name}
                      </td>

                      <td className="py-5 px-4 border-b border-gray-100">
                        <div className="flex justify-center items-center gap-3">
                          <Switch
                            className="text-teal-700 mt-2"
                            checked={tax.status}
                            onChange={() => handleToggle(tax._id)}
                          />
                          <button onClick={() => showEditModal(tax._id)}>
                            <MdOutlineEdit className="bg-gray-200 rounded-lg p-2 text-[35px]" />
                          </button>
                          <button
                            onClick={() => showDeleteModal(tax._id)}
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
          {editModalVisible && (
            <EditTaxModal
              isVisible={editModalVisible}
              handleCancel={handleCancel}
              token={token}
              BASE_URL={BASE_URL}
              currentTax={currentTax}
              allGeofence={allGeofence}
              allBusinessCategory={allBusinessCategory}
              setTaxData={setTaxData}
            />
          )}
          {deleteModalVisible && (
            <DeleteTaxModal
              isVisible={deleteModalVisible}
              handleCancel={handleCancel}
              handleConfirmDelete={handleConfirmDelete}
              currentTax={currentTax}
              token={token}
              BASE_URL={BASE_URL}
              removeTax={removeTax}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Tax;
