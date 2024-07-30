import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import GlobalSearch from "../../../components/GlobalSearch";
import { Switch, Modal, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import AddProductModal from "../../../components/model/DiscountModels/AddProductModal";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import EditProductModal from "../../../components/model/DiscountModels/EditProductModal";
import AddDiscountModal from "../../../components/model/DiscountModels/AddDiscountModal";
import EditDiscountModal from "../../../components/model/DiscountModels/EditDiscountModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GIFLoader from "../../../components/GIFLoader";
import { useToast } from "@chakra-ui/react";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const Discount = () => {
  const [merchant, setMerchant] = useState([]);
  const [selectedMerchant, setSelectedMerchant] = useState(null);
  const [currentDiscount, setCurrentDiscount] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentDiscountDelete, setCurrentDiscountDelete] = useState(null);
  const [currentProductDelete, setCurrentProductDelete] = useState(null);
  const [geofence, setGeofence] = useState([]);
  const [discount, setDiscount] = useState([]);
  const { token, role } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const toast = useToast();

  // UseStates for show Modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
  const [isModalVisibleProduct, setIsModalVisibleProduct] = useState(false);
  const [isModalVisibleProductEdit, setIsModalVisibleProductEdit] =
    useState(false);
  const [isShowModalDelete1, setIsShowModalDelete1] = useState(false);
  const [isShowModalDelete2, setIsShowModalDelete2] = useState(false);

  const navigate = useNavigate();

  // API for fetch Merchant data
  useEffect(() => {
    if (!token || role !== "Admin") {
      navigate("/auth/login");
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);

        const [response, geofenceResponse] = await Promise.all([
          axios.get(`${BASE_URL}/merchants/admin/all-merchants`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BASE_URL}/admin/geofence/get-geofence`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (response.status === 200) {
          const merchants = response.data.data;
          setMerchant(merchants);
          // Set the first merchant as selected by default if selectedMerchant is null
          if (!selectedMerchant && merchants.length > 0) {
            setSelectedMerchant(merchants[0]._id);
          }
        }

        if (geofenceResponse.status === 200) {
          setGeofence(geofenceResponse.data.geofences);
        }
      } catch (err) {
        console.error(`Error in fetching data ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, role, selectedMerchant]);

  // Add merchant discount by admin

  console.log("merchantrId", currentDiscount);

  const handleChange = async (e) => {
    setSelectedMerchant(e.target.value); // Set selectedMerchant to the selected value (merchant ID)
  };

  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        setIsTableLoading(true);

        const response = await axios.get(
          `${BASE_URL}/merchant/shop-discount/get-merchant-discount-admin/${selectedMerchant}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 200) {
          setDiscount(response.data.data);
        }
      } catch (err) {
        console.error(`Error in fetching discount ${err.message}`);
      } finally {
        setIsTableLoading(false);
      }
    };
    if (selectedMerchant) {
      fetchDiscount();
    }
  }, [selectedMerchant, token]);

  // Delete Current Discount...

  const removeDiscount = (currentDiscountDelete) => {
    setDiscount(
      discount.filter((discount) => discount._id !== currentDiscountDelete)
    );
  };

  const handleConfirmDelete = () => {
    setIsShowModalDelete1(false);
    setCurrentDiscountDelete(null);
  };

  const confirmDeleteDiscount = async (currentDiscountDelete) => {
    try {
      setConfirmLoading(true);

      const response = await axios.delete(
        `${BASE_URL}/admin/shop-discount/delete-merchant-discount-admin/${currentDiscountDelete}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        removeDiscount(currentDiscountDelete);
        handleConfirmDelete();
        toast({
          title: "Discount Deleted",
          description: "Discount Deleted Successfully.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(`Error in deleting discount ${err.message}`);
      toast({
        title: "Error Occured",
        description: "Error in deleting Discount.",
        status: "error",
        isClosable: true,
        duration: 9000,
      });
    } finally {
      setConfirmLoading(false);
    }
  };

    // Delete Current Product...


  const removeProduct = (currentProductDelete) => {
    setDiscount(
      discount.filter((discount) => discount._id !== currentProductDelete)
    );
  };

  const handleConfirmDeleteProduct = () => {
    setIsShowModalDelete2(false);
    setCurrentProductDelete(null);
  };

  const confirmDeleteProduct = async (currentProductDelete) => {
    try {
      setConfirmLoading(true);

      const response = await axios.delete(
        `${BASE_URL}/admin/product-discount/delete-product-discount-admin/${currentProductDelete}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        removeProduct(currentProductDelete);
        handleConfirmDeleteProduct();
        toast({
          title: "Discount Deleted",
          description: "Discount Deleted Successfully.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(`Error in deleting discount ${err.message}`);
      toast({
        title: "Error Occured",
        description: "Error in deleting Discount.",
        status: "error",
        isClosable: true,
        duration: 9000,
      });
    } finally {
      setConfirmLoading(false);
    }
  };

  // API to update status

  const handleToggle = async (merchantDiscountId) => {
    try {
      const response = merchantDiscounts.find((response) => response._id === merchantDiscountId);
      if (response) {
        const updatedStatus = !merchantDiscounts.status;
        await axios.post(
          `${BASE_URL}/admin/discount/merchant-status-admin/${merchantDiscountId}`,
          {
            ...response,
            status: updatedStatus,
          },
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDiscount(
          merchantDiscounts.map((m) =>
            m._id ===  merchantDiscountId? { ...m, status: updatedStatus } : m
          )
        );
      }
    } catch (err) {
      console.log(`Error in toggling tax status: ${err}`);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalVisibleProduct(false);
    setIsModalVisibleEdit(false);
    setIsModalVisibleProductEdit(false);
    setIsShowModalDelete1(false);
    setIsShowModalDelete2(false);
  };

  const showModalEdit = (discountId) => {
    setCurrentDiscount(discountId);
    setIsModalVisibleEdit(true);
  };

  const showModalProduct = () => {
    setIsModalVisibleProduct(true);
  };

  const showModalProductEdit = (Id) => {
    setCurrentProduct(Id);
    setIsModalVisibleProductEdit(true);
  };

  const showModalDelete1 = (Id) => {
    setCurrentDiscountDelete(Id);
    setIsShowModalDelete1(true);
  };

  const showModalDelete2 = (Id) => {
    setCurrentProductDelete(Id);
    setIsShowModalDelete2(true);
  };

  // Filter discounts based on the presence of a productId
  const merchantDiscounts = discount.filter((item) => !item.productId);
  const productDiscounts = discount.filter((item) => item.productId);

  console.log("GEOFENCES", geofence);
  console.log("Delete", currentDiscountDelete);

  return (
    <div>
      {isLoading ? (
        <GIFLoader />
      ) : (
        <>
          <Sidebar />
          <div className="pl-[300px] bg-gray-100 min-w-fit h-screen">
            <nav className="p-5">
              <GlobalSearch />
            </nav>
            <div className="flex justify-between mx-5 focus:outline-none">
              <select
                value={selectedMerchant || ""}
                name="merchantName"
                className="bg-blue-50 p-3 rounded-lg outline-none focus:outline-none text-black"
                onChange={handleChange}
              >
                <option defaultValue hidden className="text-black">
                  Select Merchant
                </option>
                {merchant.map((data) => (
                  <option value={data._id} key={data._id}>
                    {data.merchantName}
                  </option>
                ))}
              </select>
              <Switch />
            </div>
            <div className="flex justify-between mt-5 mx-5">
              <h1 className="font-bold text-[20px]">Discount</h1>
              <button
                onClick={showModal}
                className="bg-teal-800 text-white px-5 rounded-lg p-2"
              >
                <PlusOutlined /> Add Discount
              </button>

              <AddDiscountModal
                isVisible={isModalVisible}
                token={token}
                geofence={geofence}
                role={role}
                merchant={merchant}
                selectedMerchant={selectedMerchant}
                BASE_URL={BASE_URL}
                handleCancel={handleCancel}
              />
            </div>

            <div className="w-full">
              <table className="bg-teal-800 mt-[45px] text-center w-full">
                <thead>
                  <tr>
                    {[
                      "Name",
                      "Value",
                      "Description",
                      "Valid From",
                      "Valid To",
                      "Geofence",
                      "Status",
                    ].map((header) => (
                      <th
                        key={header}
                        className="  bg-teal-800 text-center h-[70px] text-white"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {isTableLoading && (
                    <tr>
                      <td colSpan={7}>Loading data...</td>
                    </tr>
                  )}

                  {!isTableLoading && discount.length === 0 && (
                    <tr>
                      <td colSpan={7}>No data available</td>
                    </tr>
                  )}

                  {merchantDiscounts.map((merchantDiscounts, index) => (
                    <tr
                      style={{
                        backgroundColor: index % 2 === 0 ? "white" : "#f3f4f6", // Apply inline styles for alternating row colors
                      }}
                      key={merchantDiscounts._id}
                    >
                      <td className="py-5 px-4 border-b  border-gray-100 ">
                        {merchantDiscounts.discountName}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-100">
                        {merchantDiscounts.maxDiscountValue}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-100 text-start">
                        {merchantDiscounts.description}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-100">
                        {merchantDiscounts.validFrom}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-100">
                        {merchantDiscounts.validTo}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-100">
                        {merchantDiscounts.geofence}
                      </td>
                      <td className="py-5 px-4 border-b border-gray-100">
                        <div className="flex gap-4">
                          <Switch
                            className="text-teal-700 mt-2"
                            checked={merchantDiscounts.status}
                            onChange={() =>handleToggle(merchantDiscounts._id)}
                          />
                          <div className="flex items-center">
                            <button onClick={() => showModalEdit(merchantDiscounts._id)}>
                              <MdOutlineEdit className="bg-gray-200 rounded-lg p-2 text-[35px]" />
                            </button>

                            <EditDiscountModal
                              isVisible={isModalVisibleEdit}
                              token={token}
                              merchant={merchant}
                              geofence={geofence}
                              currentDiscount={currentDiscount}
                              BASE_URL={BASE_URL}
                              handleCancel={handleCancel}
                            />
                          </div>
                          <button
                            onClick={() => showModalDelete1(merchantDiscounts._id)}
                            className="outline-none focus:outline-none"
                          >
                            <RiDeleteBinLine className="text-red-900 rounded-lg bg-red-100 p-2 text-[35px]" />
                          </button>
                          <Modal
                            onCancel={handleCancel}
                            footer={null}
                            open={isShowModalDelete1}
                            centered
                          >
                            <p className="font-semibold text-[18px] mb-5">
                              <Spin spinning={confirmLoading}>
                                Are you sure you want to delete?
                              </Spin>
                            </p>
                            <div className="flex justify-end">
                              <button
                                className="bg-cyan-100 px-5 py-1 rounded-md font-semibold"
                                onClick={handleCancel}
                              >
                                Cancel
                              </button>
                              <button
                                className="bg-red-100 px-5 py-1 rounded-md ml-3 text-red-700"
                                onClick={() =>
                                  confirmDeleteDiscount(currentDiscountDelete)
                                }
                              >
                                {" "}
                                Delete
                              </button>
                            </div>
                          </Modal>
                        </div>
                      </td>
                      <td className="border-b border-gray-300"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end mt-10">
              <button
                onClick={showModalProduct}
                className="bg-teal-800 text-white px-5 mr-5 rounded-lg p-2"
              >
                <PlusOutlined />
                Add Product wise Discount
              </button>

              <AddProductModal
                isVisible={isModalVisibleProduct}
                token={token}
                geofence={geofence}
                merchant={merchant}
                BASE_URL={BASE_URL}
                handleCancel={handleCancel}
              />
            </div>
            <div className="w-full">
              <table className="bg-teal-800 mt-[45px] text-center w-full">
                <thead>
                  <tr>
                    {[
                      "Name",
                      "Value",
                      "Description",
                      "Valid From",
                      "Valid To",
                      "Geofence",
                      "Status",
                    ].map((header) => (
                      <th
                        key={header}
                        className="  bg-teal-800 text-center h-[70px] text-white"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {productDiscounts.map((table, index) => (
                    <tr
                      style={{
                        backgroundColor: index % 2 === 0 ? "white" : "#f3f4f6", // Apply inline styles for alternating row colors
                      }}
                      key={table._id}
                    >
                      <td className="py-5 px-4 border-b  border-gray-100">
                        {table.discountName}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-100">
                        {table.discountValue}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-100 text-start">
                        {table.description}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-100">
                        {table.validFrom}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-100">
                        {table.validTo}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-100">
                        {table.geofence}
                      </td>
                      <td className="py-5 px-4 border-b  border-gray-100">
                        <div className="flex gap-4">
                          <Switch
                            className="text-teal-700 mt-2"
                            checked={table.status}
                          />
                          <div className="flex item-center">
                            <button
                              onClick={() => showModalProductEdit(table._id)}
                            >
                              <MdOutlineEdit className="bg-gray-200 rounded-lg p-2 text-[35px]" />
                            </button>

                            <EditProductModal
                              isVisible={isModalVisibleProductEdit}
                              token={token}
                              geofence={geofence}
                              merchant={merchant}
                              currentProduct={currentProduct}
                              BASE_URL={BASE_URL}
                              handleCancel={handleCancel}
                            />
                          </div>
                          <button
                            onClick={() => showModalDelete2(table._id)}
                            className="outline-none focus:outline-none"
                          >
                            <RiDeleteBinLine className="text-red-900 rounded-lg bg-red-100 p-2 text-[35px]" />
                          </button>
                          <Modal
                            onCancel={handleCancel}
                            footer={null}
                            open={isShowModalDelete2}
                            centered
                          >
                            <p className="font-semibold text-[18px] mb-5">
                              <Spin spinning={confirmLoading}>
                                Are you sure want to delete?
                              </Spin>
                            </p>
                            <div className="flex justify-end">
                              <button
                                className="bg-cyan-100 px-5 py-1 rounded-md font-semibold"
                                onClick={handleCancel}
                              >
                                Cancel
                              </button>
                              <button
                                className="bg-red-100 px-5 py-1 rounded-md ml-3 text-red-700"
                                onClick={() =>
                                  confirmDeleteProduct(currentProductDelete)
                                }
                              >
                                {" "}
                                Delete
                              </button>
                            </div>
                          </Modal>
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
      )}
    </div>
  );
};

export default Discount;
