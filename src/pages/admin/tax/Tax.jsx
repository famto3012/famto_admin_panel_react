import React, { useContext, useEffect, useState } from "react";
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

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const Tax = () => {
  const [taxData, setTaxData] = useState([]);
  const [allGeofence, setAllGeofence] = useState([]);
  const [allBusinessCategory, setBusinessCategory] = useState([]);
  const { token, role } = useContext(UserContext);
  const navigate = useNavigate();

  // State for each modal
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [currentTax, setCurrentTax] = useState(null);

  useEffect(() => {
    if (!token || role !== "Admin") {
      navigate("/auth/login");
    }

    const getAllTax = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/admin/taxes/all-tax`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const { data } = response.data;
          setTaxData(data);
        }
      } catch (err) {
        console.log(`Error in getting all tax: ${err}`);
      }
    };

    const getAllGeofence = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/admin/geofence/get-geofence`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          const { geofences } = response.data;
          setAllGeofence(geofences);
        }
      } catch (err) {
        console.log(`Error in getting all geofence: ${err}`);
      }
    };

    const getAllBusinessCategory = async () => {
      const response = await axios.get(
        `${BASE_URL}/admin/business-categories/get-all-business-category`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const { data } = response.data;
        setBusinessCategory(data);
      }
    };

    getAllTax();
    getAllGeofence();
    getAllBusinessCategory();
  }, [token, role, navigate]);

  const showAddModal = () => {
    setAddModalVisible(true);
  };

  const showEditModal = async (taxId) => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/taxes/${taxId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const { data } = response.data;
        setCurrentTax(data); // Update currentTax state with the fetched data
        setEditModalVisible(true);
      }
    } catch (err) {
      console.log(`Error in getting tax data: ${err}`);
    }
  };

  const showDeleteModal = (taxId) => {
    setDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setAddModalVisible(false);
    setEditModalVisible(false);
    setDeleteModalVisible(false);
  };

  return (
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
                  "Tax Id",
                  // "Tax Name",
                  "Tax",
                  "Fixed/Percentage",
                  "Assign to Merchant",
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
                  <td className="py-5 px-4 border-b border-gray-100 underline underline-offset-2">
                    {tax._id}
                  </td>
                  {/* <td className="py-2 px-4 border-b border-gray-100">
                    {tax.taxName}
                  </td> */}
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
                      <div>
                        <Switch
                          className="text-teal-700 mt-2"
                          checked={tax.status}
                          onChange={() => handleToggle(tax._id)}
                        />
                      </div>
                      <div className="flex items-center">
                        <button onClick={() => showEditModal(tax._id)}>
                          <MdOutlineEdit className="bg-gray-200 rounded-lg p-2 text-[35px]" />
                        </button>
                        <EditTaxModal
                          isVisible={editModalVisible}
                          handleCancel={handleCancel}
                          token={token}
                          BASE_URL={BASE_URL}
                          allGeofence={allGeofence}
                          allBusinessCategory={allBusinessCategory}
                          taxData={currentTax}
                        />
                      </div>
                      <button
                        onClick={() => showDeleteModal(tax._id)}
                        className="outline-none focus:outline-none"
                      >
                        <RiDeleteBinLine className="text-red-900 rounded-lg bg-red-100 p-2 text-[35px]" />
                      </button>
                      <DeleteTaxModal
                        isVisible={deleteModalVisible}
                        handleCancel={handleCancel}
                        token={token}
                        BASE_URL={BASE_URL}
                        taxId={tax._id}
                      />
                    </div>
                  </td>
                  <td className="border-b border-gray-300"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Tax;
