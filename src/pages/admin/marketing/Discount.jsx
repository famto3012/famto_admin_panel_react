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
import { Spinner, useToast } from "@chakra-ui/react";
import { formatDate, formatTime } from "../../../utils/formatter";
import Select from "react-select";

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
    if (!token) {
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
  }, [token, role]);

  const merchantOptions = merchant.map((merchant) => ({
    label: merchant.merchantName,
    value: merchant._id,
  }));

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
          console.log(response.data.data);
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
  }, [selectedMerchant, token, role]);

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
          title: "Success",
          description: "Discount deleted successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Error in deleting discount.",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    } finally {
      setConfirmLoading(false);
    }
  };

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
          title: "Success",
          description: "Discount deleted successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Error in deleting discount.",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleToggle = async (merchantDiscountId) => {
    try {
      const discountToUpdate = discount.find(
        (d) => d._id === merchantDiscountId
      );
      if (discountToUpdate) {
        const updatedStatus = !discountToUpdate.status;

        await axios.put(
          `${BASE_URL}/admin/shop-discount/merchant-status-admin/${merchantDiscountId}`,
          {
            ...discountToUpdate,
            status: updatedStatus,
          },
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast({
          title: "Success",
          description: "Discount Status Updated Successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        // Update the state with the new status
        setDiscount((prevDiscounts) =>
          prevDiscounts.map((d) =>
            d._id === merchantDiscountId ? { ...d, status: updatedStatus } : d
          )
        );
      }
    } catch (err) {
      console.error(`Error in toggling discount status: ${err.message}`);
      // Optionally show an error toast notification
      toast({
        title: "Error",
        description: "Failed to update discount status.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleToggleProduct = async (DiscountId) => {
    try {
      const discountToUpdate = discount.find((d) => d._id === DiscountId);
      if (discountToUpdate) {
        const updatedStatus = !discountToUpdate.status;

        await axios.put(
          `${BASE_URL}/admin/product-discount/product-status-admin/${DiscountId}`,
          {
            ...discountToUpdate,
            status: updatedStatus,
          },
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast({
          title: "Success",
          description: "Discount Status Updated Successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        // Update the state with the new status
        setDiscount((prevDiscounts) =>
          prevDiscounts.map((d) =>
            d._id === DiscountId ? { ...d, status: updatedStatus } : d
          )
        );
      }
    } catch (err) {
      console.error(`Error in toggling discount status: ${err.message}`);
      // Optionally show an error toast notification
      toast({
        title: "Error",
        description: "Failed to update discount status.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDiscountAdd = (newDiscount) => {
    setDiscount((prevDiscounts) => {
      // Ensure prevPromocodes is an array before adding the new promo code
      if (Array.isArray(prevDiscounts)) {
        return [...prevDiscounts, newDiscount];
      } else {
        return [newDiscount];
      }
    });
  };

  // Function to update the discount in the list
  const handleEditDiscount = (updatedDiscount) => {
    setDiscount((prevDiscounts) =>
      prevDiscounts.map((discount) =>
        discount._id === updatedDiscount._id ? updatedDiscount : discount
      )
    );
  };

  const handleAddProduct = (newProduct) => {
    setDiscount((prevProducts) => {
      if (Array.isArray(prevProducts)) {
        return [...prevProducts, newProduct];
      } else {
        return [newProduct];
      }
    });
  };

  const handleEditProduct = (editProduct) => {
    setDiscount((prevProduct) =>
      prevProduct.map((discount) =>
        discount._id === editProduct._id ? editProduct : discount
      )
    );
  };

  const showModal = () => setIsModalVisible(true);

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
              {role === "Admin" && (
                <Select
                  className="w-[200px] outline-none focus:outline-none"
                  value={merchantOptions.find(
                    (option) => option.value === selectedMerchant
                  )}
                  isMulti={false}
                  isSearchable={true}
                  onChange={(option) => {
                    setSelectedMerchant(option ? option.value : "");
                  }}
                  options={merchantOptions}
                  placeholder="Select Merchant"
                  isClearable={false}
                />
              )}

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
                onDiscountAdd={handleDiscountAdd}
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
                    <tr className="h-[70px]">
                      <td colSpan={7}>
                        Loading data <Spinner size="sm" className="ms-2" />
                      </td>
                    </tr>
                  )}

                  {!isTableLoading && discount.length === 0 && (
                    <tr className="h-[70px]">
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
                        {formatDate(merchantDiscounts.validFrom)}
                        <br />
                        {formatTime(merchantDiscounts.validFrom)}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-100">
                        {formatDate(merchantDiscounts.validTo)}
                        <br />
                        {formatTime(merchantDiscounts.validTo)}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-100">
                        {merchantDiscounts.geofenceId.name}
                      </td>
                      <td className="py-5 px-4 border-b border-gray-100">
                        <div className="flex gap-4">
                          <Switch
                            className="text-teal-700 mt-2"
                            checked={merchantDiscounts.status}
                            onChange={() => handleToggle(merchantDiscounts._id)}
                          />
                          <div className="flex items-center">
                            <button
                              onClick={() =>
                                showModalEdit(merchantDiscounts._id)
                              }
                            >
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
                              onEditDiscount={handleEditDiscount}
                            />
                          </div>
                          <button
                            onClick={() =>
                              showModalDelete1(merchantDiscounts._id)
                            }
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
                onAddProduct={handleAddProduct}
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
                    <tr className="h-[70px]">
                      <td colSpan={7}>
                        Loading data <Spinner size="sm" className="ms-2" />
                      </td>
                    </tr>
                  )}

                  {!isTableLoading && discount.length === 0 && (
                    <tr className="h-[70px]">
                      <td colSpan={7}>No data available</td>
                    </tr>
                  )}

                  {!isTableLoading &&
                    productDiscounts.map((table, index) => (
                      <tr
                        style={{
                          backgroundColor:
                            index % 2 === 0 ? "white" : "#f3f4f6", // Apply inline styles for alternating row colors
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
                          {formatDate(table.validFrom)}
                          <br />
                          {formatTime(table.validFrom)}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-100">
                          {formatDate(table.validTo)}
                          <br />
                          {formatTime(table.validTo)}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-100">
                          {table.geofenceId.name}
                        </td>
                        <td className="py-5 px-4 border-b  border-gray-100">
                          <div className="flex gap-4">
                            <Switch
                              className="text-teal-700 mt-2"
                              checked={table.status}
                              onChange={() => handleToggleProduct(table._id)}
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
                                onEditProduct={handleEditProduct}
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
