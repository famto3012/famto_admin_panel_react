import { useEffect, useState } from "react";
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
  const [geofence, setGeofence] = useState([]);
  const [discount, setDiscount] = useState([]);
  const [allMerchantDiscounts, setAllMerchantDiscounts] = useState([]);
  const [allProductDiscounts, setAllProductDiscounts] = useState([]);

  const [selectedMerchant, setSelectedMerchant] = useState({
    merchantId: "",
    merchantName: "",
  });
  const [currentDiscount, setCurrentDiscount] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentDiscountDelete, setCurrentDiscountDelete] = useState(null);
  const [currentProductDelete, setCurrentProductDelete] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);

  const toast = useToast();
  const { token, role, userId } = useContext(UserContext);

  // UseStates for show Modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
  const [isModalVisibleProduct, setIsModalVisibleProduct] = useState(false);
  const [isModalVisibleProductEdit, setIsModalVisibleProductEdit] =
    useState(false);
  const [isShowModalDelete1, setIsShowModalDelete1] = useState(false);
  const [isShowModalDelete2, setIsShowModalDelete2] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }

    getAllGeofence();

    if (role === "Admin") getAllMerchants();
  }, [token, role]);

  const getAllMerchants = async () => {
    const response = await axios.get(
      `${BASE_URL}/merchants/admin/all-merchants`,
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.status === 200) {
      const { data } = response.data;
      setMerchant(data);

      console.log(data);

      if (data.length > 0) {
        console.log("Setting merchants");
        setSelectedMerchant({
          merchantId: data[0]._id,
          merchantName: data[0].merchantName,
        });
      }
    }
  };

  const getAllGeofence = async () => {
    const response = await axios.get(
      `${BASE_URL}/admin/geofence/get-geofence`,
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.status === 200) {
      setGeofence(response.data.geofences);
    }
  };

  const merchantOptions = merchant.map((merchant) => ({
    label: merchant.merchantName,
    value: merchant._id,
  }));

  useEffect(() => {
    console.log(selectedMerchant);

    const merchantId = role === "Admin" ? selectedMerchant?.merchantId : userId;

    if (merchantId) {
      fetchDiscount(merchantId);
      console.log("INITIAL", merchantId);
    }
  }, [selectedMerchant.merchantId, token, role]);

  const fetchDiscount = async (merchantId) => {
    try {
      setIsTableLoading(true);

      const response = await axios.get(
        `${BASE_URL}/merchant/shop-discount/get-merchant-discount-admin/${merchantId}`,
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

  useEffect(() => {
    const getDataForMerchant = async () => {
      const [merchantDiscount, productDiscount] = await Promise.all([
        axios.get(`${BASE_URL}/merchant/shop-discount/get-merchant-discount`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(
          `${BASE_URL}/merchant/product-discount/get-product-discount`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        ),
      ]);

      setAllMerchantDiscounts(merchantDiscount.data.data || []);
      setAllProductDiscounts(productDiscount.data.data || []);
    };

    if (role === "Merchant") getDataForMerchant();
  }, []);

  const removeDiscount = (currentDiscountDelete) => {
    if (role === "Admin") {
      setDiscount(
        discount.filter((discount) => discount._id !== currentDiscountDelete)
      );
    } else if (role === "Merchant") {
      setAllMerchantDiscounts(
        allMerchantDiscounts.filter(
          (discount) => discount._id !== currentDiscountDelete
        )
      );
    }
  };

  const handleConfirmDelete = () => {
    setIsShowModalDelete1(false);
    setCurrentDiscountDelete(null);
  };

  const confirmDeleteDiscount = async (currentDiscountDelete) => {
    try {
      setConfirmLoading(true);

      console.log(currentDiscountDelete);

      const endPoint =
        role === "Admin"
          ? `${BASE_URL}/admin/shop-discount/delete-merchant-discount-admin/${currentDiscountDelete}`
          : `${BASE_URL}/admin/shop-discount/delete-merchant-discount/${currentDiscountDelete}`;

      const response = await axios.delete(endPoint, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });

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
    if (role === "Admin") {
      setDiscount(
        discount.filter((discount) => discount._id !== currentProductDelete)
      );
    } else if (role === "Merchant") {
      setAllProductDiscounts(
        allProductDiscounts.filter(
          (discount) => discount._id !== currentProductDelete
        )
      );
    }
  };

  const handleConfirmDeleteProduct = () => {
    setIsShowModalDelete2(false);
    setCurrentProductDelete(null);
  };

  const confirmDeleteProduct = async (currentProductDelete) => {
    try {
      setConfirmLoading(true);

      const endPoint =
        role === "Admin"
          ? `${BASE_URL}/admin/product-discount/delete-product-discount-admin/${currentProductDelete}`
          : `${BASE_URL}/merchant/product-discount/delete-product-discount/${currentProductDelete}`;

      const response = await axios.delete(endPoint, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });

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

  const onMerchantDiscountToggle = (discountId) => {
    if (role === "Admin") {
      setDiscount((prevDiscounts) =>
        prevDiscounts.map((d) =>
          d._id === discountId
            ? { ...d, status: !d.status } // Toggle the clicked discount
            : { ...d, status: false } // Set all others to false
        )
      );
    } else if (role === "Merchant") {
      setAllMerchantDiscounts((prevDiscounts) =>
        prevDiscounts.map((discount) =>
          discount._id === discountId
            ? { ...discount, status: !discount.status } // Toggle the clicked discount
            : { ...discount, status: false } // Set all others to false
        )
      );
    }
  };
  

  const handleToggle = async (merchantDiscountId) => {
    try {
      const endPoint =
        role === "Admin"
          ? `${BASE_URL}/admin/shop-discount/merchant-status-admin/${merchantDiscountId}`
          : `${BASE_URL}/merchant/shop-discount/merchant-status/${merchantDiscountId}`;

      const response = await axios.put(
        endPoint,
        {},
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        onMerchantDiscountToggle(merchantDiscountId);
        toast({
          title: "Success",
          description: "Discount status updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update discount status.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const onProductDiscountToggle = (dicountId) => {
    if (role === "Admin") {
      setDiscount((prevDiscounts) =>
        prevDiscounts.map((d) =>
          d._id === dicountId ? { ...d, status: !d.status } : d
        )
      );
    } else if (role === "Merchant") {
      setAllProductDiscounts((prevDiscount) =>
        prevDiscount.map((discount) =>
          discount._id === dicountId
            ? { ...discount, status: !discount.status }
            : discount
        )
      );
    }
  };

  const handleToggleProduct = async (discountId) => {
    try {
      const endPoint =
        role === "Admin"
          ? `${BASE_URL}/admin/product-discount/product-status-admin/${discountId}`
          : `${BASE_URL}/merchant/product-discount/product-status/${discountId}`;

      const response = await axios.put(
        endPoint,
        {},
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        onProductDiscountToggle(discountId);
        toast({
          title: "Success",
          description: "Discount status updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
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

  let merchantDiscounts =
    role === "Admin"
      ? discount.filter((item) => !item.productId)
      : allMerchantDiscounts;

  let productDiscounts =
    role === "Admin"
      ? discount.filter((item) => item.productId)
      : allProductDiscounts;

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
                    (option) => option.value === selectedMerchant.merchantId
                  )}
                  isMulti={false}
                  isSearchable={true}
                  onChange={(option) => {
                    setSelectedMerchant({
                      merchantId: option.value,
                      merchantName: option.label,
                    });
                  }}
                  options={merchantOptions}
                  placeholder="Select Merchant"
                  isClearable={false}
                />
              )}

              {/* <Switch /> */}
            </div>
            <div className="flex justify-between mt-5 mx-5">
              <h1 className="font-bold text-[20px]">Merchant Discount</h1>
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
                selectedMerchant={selectedMerchant}
                BASE_URL={BASE_URL}
                handleCancel={handleCancel}
                onDiscountAdd={handleDiscountAdd}
              />
            </div>

            <div className="w-full overflow-y-auto">
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

                  {!isTableLoading && merchantDiscounts.length === 0 && (
                    <tr className="h-[70px]">
                      <td colSpan={7}>No data available</td>
                    </tr>
                  )}

                  {merchantDiscounts.map((merchantDiscounts, index) => (
                    <tr
                      style={{
                        backgroundColor: index % 2 === 0 ? "white" : "#f3f4f6",
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
                              Are you sure you want to delete?
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
                                {confirmLoading ? `Deleting...` : `Delete`}
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

            <div className="flex justify-between mt-10">
              <h1 className="font-bold text-[20px] ms-4">Product Discount</h1>

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
                BASE_URL={BASE_URL}
                geofence={geofence}
                selectedMerchant={selectedMerchant}
                handleCancel={handleCancel}
                onAddProduct={handleAddProduct}
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

                  {!isTableLoading &&
                    productDiscounts.map((table, index) => (
                      <tr
                        style={{
                          backgroundColor:
                            index % 2 === 0 ? "white" : "#f3f4f6",
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

                  {!isTableLoading && productDiscounts?.length === 0 && (
                    <tr className="h-[70px]">
                      <td colSpan={7}>No data available</td>
                    </tr>
                  )}
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
