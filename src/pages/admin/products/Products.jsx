import { useContext, useEffect, useRef, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import GlobalSearch from "../../../components/GlobalSearch";
import { ArrowDownOutlined, PlusOutlined } from "@ant-design/icons";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
import { Switch } from "antd";
import AddCategoriesModal from "../../../components/model/ProductModels/AddCategoriesModal";
import { UserContext } from "../../../context/UserContext";
import EditCategoriesModal from "../../../components/model/ProductModels/EditCategoriesModal";
import EditProductItemModal from "../../../components/model/ProductModels/EditProductItemModal";
import AddProductItemModal from "../../../components/model/ProductModels/AddProductItemModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteCategoryModal from "../../../components/model/ProductModels/DeleteCategoryModal";
import ChangeCategoryModal from "../../../components/model/ProductModels/ChangeCategoryModal";
import DeleteProductModal from "../../../components/model/ProductModels/DeleteProductModal";
import ProductDetail from "../../../components/Product/ProductDetail";
import { Spinner, useToast } from "@chakra-ui/react";
import Select from "react-select";
import CSVModal from "../../../components/model/ProductModels/CSVModal";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const Products = () => {
  const [allMerchants, setAllMerchants] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedMerchant, setSelectedMerchant] = useState("");
  const [selectedCategory, setSelectedCategory] = useState({
    categoryId: "",
    categoryName: "",
    categoryStatus: null,
  });
  const [selectedProduct, setSelectedProduct] = useState({
    productId: "",
    productName: "",
  });
  const [productDetail, setProductDetail] = useState({});

  // States for modal
  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const [editCategoryModal, setEditCategoryModal] = useState(false);
  const [changeCategoryModal, setChangeCategoryModal] = useState(false);
  const [addProductModal, setAddProductModal] = useState(false);
  const [editProductModal, setEditProductModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
  const [deleteProductModal, setDeleteProductModal] = useState(false);
  const [csvModal, setCsvModal] = useState(false);

  const [isCategoryListLoading, setIsCategoryListLoading] = useState(false);
  const [isProductListLoading, setIsProductListLoading] = useState(false);
  const [isProductDetailLoading, setIsProductDetailLoading] = useState(false);
  const [CSVDownloadLoading, setCSVDownloadLoading] = useState(false);

  const { token, role, userId } = useContext(UserContext);
  const navigate = useNavigate();
  const toast = useToast();

  const dragCategory = useRef(0);
  const dragOverCategory = useRef(0);
  const dragProduct = useRef(0);
  const dragOverProduct = useRef(0);

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
      return;
    }

    const getAllMerchants = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/merchants/admin/all-merchants`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          const { data } = response.data;
          setAllMerchants(data);

          if (data.length > 0) {
            setSelectedMerchant(data[0]._id);
          }
        }
      } catch (err) {
        toast({
          title: "Error",
          description: "An error occurred while getting the data: " + err,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    if (role === "Admin") {
      getAllMerchants();
    } else {
      setSelectedMerchant(userId);
    }
  }, [token, role, navigate, userId]);

  useEffect(() => {
    const getAllCategories = async (merchantId) => {
      try {
        setIsCategoryListLoading(true);

        const endPoint =
          role === "Admin"
            ? `${BASE_URL}/categories/admin/${merchantId}`
            : `${BASE_URL}/categories/all-categories`;

        const response = await axios.get(endPoint, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          const { data } = response.data;

          if (data.length > 0) {
            setAllCategories(data);

            setSelectedCategory({
              categoryId: data[0]?._id,
              categoryName: data[0]?.categoryName,
              categoryStatus: data[0]?.status,
            });
          } else {
            setAllCategories([]);
            setSelectedCategory(null);
            setAllProducts([]);
            setSelectedProduct(null);
            setProductDetail(null);
            setIsCategoryListLoading(false);
            return;
          }
        }
      } catch (err) {
        toast({
          title: "Error",
          description: "An error occurred while getting the data",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsCategoryListLoading(false);
      }
    };

    if (selectedMerchant) {
      getAllCategories(selectedMerchant);
    }
  }, [selectedMerchant, token]);

  useEffect(() => {
    if (selectedCategory?.categoryId) {
      getProductsByCategory(selectedCategory.categoryId);
    }
  }, [selectedCategory?.categoryId, token]);

  useEffect(() => {
    const getProductDetail = async (productId) => {
      try {
        setIsProductDetailLoading(true);

        const response = await axios.get(`${BASE_URL}/products/${productId}`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          const { data } = response.data;

          if (data) {
            setProductDetail(data);
          } else {
            setProductDetail(null);
            setIsProductDetailLoading(false);
            return;
          }
        }
      } catch (err) {
        toast({
          title: "Error",
          description: "An error occurred while getting the data",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsProductDetailLoading(false);
      }
    };

    if (selectedProduct?.productId) {
      getProductDetail(selectedProduct.productId);
    } else {
      setProductDetail(null);
    }
  }, [selectedProduct?.productId, token]);

  const getProductsByCategory = async (categoryId) => {
    try {
      setIsProductListLoading(true);

      const response = await axios.get(
        `${BASE_URL}/products/product-by-category/${categoryId}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        const { data } = response.data;

        if (data.length > 0) {
          setAllProducts(data);
          setSelectedProduct({
            productId: data[0]?._id,
            productName: data[0]?.productName,
          });
        } else {
          setIsProductListLoading(false);
          setAllProducts([]);
          setSelectedProduct(null);
          setProductDetail(null);
          return;
        }
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An error occurred while getting the data",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsProductListLoading(false);
    }
  };

  const selectCategory = (id, name, status) => {
    setSelectedCategory({
      categoryId: id,
      categoryName: name,
      categoryStatus: status,
    });
  };

  const selectProduct = (id, name) => {
    setSelectedProduct({
      productId: id,
      productName: name,
    });
  };

  const showAddCategoryModal = () => setAddCategoryModal(true);
  const showEditCategoryModal = () => setEditCategoryModal(true);
  const showChangeCategoryModal = () => setChangeCategoryModal(true);
  const showAddProductModal = () => setAddProductModal(true);
  const showEditProductModal = () => setEditProductModal(true);
  const showDeleteCategoryModal = () => setDeleteCategoryModal(true);
  const showDeleteProductModal = () => setDeleteProductModal(true);
  const showCsvModal = () => setCsvModal(true);

  const handleCancel = () => {
    setAddCategoryModal(false);
    setEditCategoryModal(false);
    setEditProductModal(false);
    setAddProductModal(false);
    setDeleteCategoryModal(false);
    setDeleteProductModal(false);
    setChangeCategoryModal(false);
    setCsvModal(false);
  };

  const handleAddCategory = (category) =>
    setAllCategories([...allCategories, category]);

  const handleAddCSVData = (category) => {
    setAllCategories(category);

    setSelectedCategory({
      categoryId: category[0]?._id,
      categoryName: category[0]?.categoryName,
      categoryStatus: category[0]?.status,
    });
  };

  const handleAddProduct = (product) =>
    setAllProducts([...allProducts, product]);

  const handleAddProductCSV = (product) => {
    setAllProducts(product);

    setSelectedProduct({
      productId: product._id,
      productName: product.productName,
    });
  };

  const filterDeletedCategory = (categoryId) => {
    const remainingCategories = allCategories.filter(
      (category) => category._id !== categoryId
    );

    setAllCategories(remainingCategories);
    handleCancel();

    if (remainingCategories.length > 0) {
      const newSelectedCategory = {
        categoryId: remainingCategories[0]._id,
        categoryName: remainingCategories[0].categoryName,
        categoryStatus: remainingCategories[0].status,
      };

      setSelectedCategory(newSelectedCategory);
      getProductsByCategory(newSelectedCategory.categoryId);
    } else {
      setSelectedCategory({
        categoryId: "",
        categoryName: "",
        categoryStatus: null,
      });
      setAllProducts([]);
      setSelectedProduct(null);
      setProductDetail(null);
    }
  };

  const filterDeletedProduct = (productId) => {
    setAllProducts(allProducts.filter((product) => product._id !== productId));

    if (allProducts.length > 1) {
      setSelectedProduct({
        productId: allProducts[0]._id,
        productName: allProducts[0].productName,
      });
    } else {
      setSelectedProduct({
        productId: "",
        productName: "",
      });
    }
  };

  const filterChangedProduct = (productId) => {
    setAllProducts(
      allProducts.filter((product) => product._id.toString() !== productId)
    );
  };

  const handleChangeCategoryStatus = async () => {
    try {
      const endPoint =
        role === "Admin"
          ? `${BASE_URL}/categories/admin/change-status/${selectedMerchant}/${selectedCategory.categoryId}`
          : `${BASE_URL}/categories/change-status/${selectedCategory.categoryId}`;

      const response = await axios.patch(
        endPoint,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedStatus = !selectedCategory.categoryStatus;

        // Update selected category status
        setSelectedCategory({
          ...selectedCategory,
          categoryStatus: updatedStatus,
        });

        // Update allCategories array with the new status
        setAllCategories((prevCategories) =>
          prevCategories.map((category) =>
            category._id === selectedCategory.categoryId
              ? { ...category, status: updatedStatus }
              : category
          )
        );

        toast({
          title: "Success",
          description: response.data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An error occoured while changing category status",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleChangeProductStatus = async () => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/products/change-inventory-status/${selectedProduct.productId}`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setProductDetail({
          ...productDetail,
          inventory: !productDetail.inventory,
        });

        toast({
          title: "Success",
          description: response.data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An error occoured while changing product status",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleReorderCategory = async () => {
    try {
      const categoryClone = [...allCategories];
      const temp = categoryClone[dragCategory.current];
      categoryClone[dragCategory.current] =
        categoryClone[dragOverCategory.current];
      categoryClone[dragOverCategory.current] = temp;

      const categories = categoryClone.map((category, index) => {
        return { id: category._id, order: index + 1 };
      });

      const response = await axios.put(
        `${BASE_URL}/categories/admin/change-order`,
        { categories: categories },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setAllCategories(categoryClone);
        toast({
          title: "Success",
          description: "Category reordered",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: `Error in reodering categories`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleReorderProduct = async () => {
    try {
      const productClone = [...allProducts];
      const temp = productClone[dragProduct.current];
      productClone[dragProduct.current] = productClone[dragOverProduct.current];
      productClone[dragOverProduct.current] = temp;

      const products = productClone.map((product, index) => {
        return { id: product._id, order: index + 1 };
      });

      const response = await axios.put(
        `${BASE_URL}/products/change-order`,
        { products: products },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setAllProducts(productClone);
        toast({
          title: "Success",
          description: "Product re-ordered",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: `Error in re-odering products`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const merchantOptions = allMerchants.map((merchant) => ({
    label: merchant.merchantName,
    value: merchant._id,
  }));

  return (
    <>
      <Sidebar />
      <div className="pl-[300px] bg-gray-100 h-screen">
        <nav className="p-5">
          <GlobalSearch />
        </nav>

        <div className="flex justify-between bg-white p-5 mx-5 rounded-md">
          {role === "Admin" && (
            <Select
              className="w-[200px] outline-none focus:outline-none"
              value={merchantOptions.find(
                (option) => option.value === selectedMerchant
              )}
              isMulti={false}
              isSearchable={true}
              onChange={(option) =>
                setSelectedMerchant(option ? option.value : "")
              }
              options={merchantOptions}
              placeholder="Select Merchant"
              isClearable={false}
            />
          )}

          <div className="flex gap-3">
            <button
              onClick={showCsvModal}
              className="bg-cyan-100 text-black rounded-md py-2 px-4 font-semibold flex gap-[5px] items-center"
            >
              CSV
            </button>

            <CSVModal
              isVisible={csvModal}
              handleCancel={handleCancel}
              token={token}
              BASE_URL={BASE_URL}
              merchantId={selectedMerchant}
              onCSVDataAdd={handleAddCSVData}
            />
          </div>
        </div>

        <div className="flex">
          <div className="w-1/5 bg-white rounded-md m-5 mr-0">
            <div className="border-b-2">
              <h1 className="font-[600] px-8 pt-8 pb-4 text-[18px]">
                Categories
              </h1>
            </div>

            <div className="max-h-[30rem] overflow-auto">
              {isCategoryListLoading && (
                <div className="flex justify-center my-3 ">
                  <Spinner size="sm" />
                </div>
              )}

              {!isCategoryListLoading &&
                allCategories?.map((category, index) => (
                  <h6
                    key={category._id}
                    draggable
                    onDragStart={() => (dragCategory.current = index)}
                    onDragEnter={() => (dragOverCategory.current = index)}
                    onDragEnd={handleReorderCategory}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() =>
                      selectCategory(
                        category._id,
                        category.categoryName,
                        category.status
                      )
                    }
                    className={` ${
                      selectedCategory.categoryName === category.categoryName
                        ? "bg-gray-200"
                        : ""
                    } text-start ps-[20px] py-[20px] text-[16px] cursor-pointer hover:bg-gray-100 font-[400] capitalize`}
                  >
                    {category.categoryName}
                  </h6>
                ))}
            </div>

            <div className="flex flex-col items-center justify-center gap-2 mt-3">
              {!isCategoryListLoading && (
                <>
                  <PlusOutlined
                    className="rounded-full bg-teal-800 text-[12px] text-white p-2.5 w-fit"
                    onClick={showAddCategoryModal}
                  />
                  <button className="text-gray-500 text-[14px]">
                    Add Categories
                  </button>
                </>
              )}

              <AddCategoriesModal
                isVisible={addCategoryModal}
                handleCancel={handleCancel}
                token={token}
                BASE_URL={BASE_URL}
                role={role}
                merchantId={selectedMerchant}
                onAddCategory={handleAddCategory}
                onAddCategoryCSV={handleAddCSVData}
              />
            </div>
          </div>

          <div className="w-4/5 bg-white rounded-md m-5 ml-2">
            <div className="border-b-2 flex justify-between p-5">
              <h1 className="font-semibold flex ml-3 items-center text-[18px] capitalize">
                {selectedCategory?.categoryName}
              </h1>

              <div className="flex gap-5 items-center">
                Disabled{" "}
                <Switch
                  value={selectedCategory?.categoryStatus || false}
                  onClick={handleChangeCategoryStatus}
                />
                Enable
                <button
                  className="bg-blue-50 p-2 flex items-center px-5 rounded-lg"
                  onClick={showEditCategoryModal}
                >
                  <MdOutlineModeEdit className="text-xl mr-1" /> Edit
                </button>
                <EditCategoriesModal
                  isVisible={editCategoryModal}
                  handleCancel={handleCancel}
                  token={token}
                  role={role}
                  BASE_URL={BASE_URL}
                  categoryId={selectedCategory?.categoryId}
                  merchantId={selectedMerchant}
                />
                <button
                  className="bg-red-100 p-2 flex items-center rounded-lg px-3"
                  onClick={showDeleteCategoryModal}
                >
                  <RiDeleteBin6Line className="text-xl mr-1 text-red-700" />{" "}
                  Delete
                </button>
                <DeleteCategoryModal
                  isOpen={deleteCategoryModal}
                  onCancel={handleCancel}
                  BASE_URL={BASE_URL}
                  token={token}
                  role={role}
                  merchantId={selectedMerchant}
                  categoryName={selectedCategory?.categoryName}
                  categoryId={selectedCategory?.categoryId}
                  onDeleteCategory={filterDeletedCategory}
                />
              </div>
            </div>

            <div className="flex">
              <div className=" border border-gray-200 w-1/3">
                <div className="max-h-[30rem] overflow-auto">
                  {isProductListLoading && (
                    <div className="flex justify-center my-3 ">
                      <Spinner size="sm" />
                    </div>
                  )}

                  {!isProductListLoading &&
                    allProducts?.map((product, index) => (
                      <h6
                        key={product?._id}
                        draggable
                        onDragStart={() => (dragProduct.current = index)}
                        onDragEnter={() => (dragOverProduct.current = index)}
                        onDragEnd={handleReorderProduct}
                        onDragOver={(e) => e.preventDefault()}
                        onClick={() =>
                          selectProduct(product?._id, product?.productName)
                        }
                        className={`${
                          selectedProduct?.productName === product?.productName
                            ? "bg-gray-200"
                            : ""
                        } text-start ps-[20px] py-[20px] text-[16px] cursor-pointer hover:bg-gray-100 font-[400]`}
                      >
                        {product?.productName}
                      </h6>
                    ))}
                </div>

                <div className="flex flex-col items-center justify-center gap-2 mt-3">
                  {!isProductListLoading && (
                    <>
                      <PlusOutlined
                        className="rounded-full bg-teal-800 text-[12px] text-white p-2.5 w-fit"
                        onClick={showAddProductModal}
                      />
                      <p className="text-gray-500">Add Items</p>
                    </>
                  )}

                  <AddProductItemModal
                    isVisible={addProductModal}
                    handleCancel={handleCancel}
                    BASE_URL={BASE_URL}
                    token={token}
                    role={role}
                    categoryId={selectedCategory?.categoryId}
                    merchantId={selectedMerchant}
                    onAddProduct={handleAddProduct}
                    onAddProductCSV={handleAddProductCSV}
                  />
                </div>
              </div>
              <div className="w-full">
                {isProductDetailLoading && (
                  <div className="flex justify-center items-center h-[55dvh]">
                    <Spinner size="sm" />
                  </div>
                )}

                {!isProductDetailLoading &&
                  (!productDetail ||
                    Object?.keys(productDetail)?.length === 0) && (
                    <div className="flex justify-center items-center h-[50%]">
                      <p>No Data available</p>
                    </div>
                  )}

                {!isProductDetailLoading &&
                  productDetail &&
                  Object?.keys(productDetail)?.length > 0 && (
                    <>
                      <div className="p-5 flex justify-between">
                        <div className="flex w-2/3 gap-3">
                          <figure className="h-[90px] w-[90px] ">
                            <img
                              src={productDetail?.productImageURL}
                              alt=""
                              className="w-full h-full object-cover rounded-md"
                            />
                          </figure>
                          <div>
                            <p className="font-semibold">
                              {productDetail?.productName}
                            </p>
                            <p className="text-teal-800 font-bold">
                              ₹ {productDetail?.price}
                            </p>
                          </div>
                        </div>
                        <div>
                          <button
                            className="bg-yellow-200/50 p-3 font-medium rounded-lg"
                            onClick={showChangeCategoryModal}
                          >
                            Change Category
                          </button>
                          <ChangeCategoryModal
                            isOpen={changeCategoryModal}
                            onCancel={handleCancel}
                            allCategories={allCategories}
                            BASE_URL={BASE_URL}
                            token={token}
                            categoryId={selectedCategory?.categoryId}
                            productId={selectedProduct?.productId}
                            onChangeCategory={filterChangedProduct}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between p-5 items-center">
                        <p className="font-semibold">Product Details</p>
                        <div className="flex gap-5 items-center">
                          Inventory
                          <Switch
                            value={productDetail?.inventory}
                            onClick={handleChangeProductStatus}
                          />
                          <button
                            className="bg-blue-50 p-2 flex items-center outline-none focus:outline-none px-5 rounded-lg"
                            onClick={showEditProductModal}
                          >
                            <MdOutlineModeEdit className="text-xl mr-1" /> Edit
                          </button>
                          <EditProductItemModal
                            isVisible={editProductModal}
                            handleCancel={handleCancel}
                            BASE_URL={BASE_URL}
                            token={token}
                            role={role}
                            merchantId={selectedMerchant}
                            productId={selectedProduct?.productId}
                            categoryId={selectedCategory?.categoryId}
                          />
                          <button
                            className="bg-red-100 p-2 flex items-center rounded-lg px-3"
                            onClick={showDeleteProductModal}
                          >
                            <RiDeleteBin6Line className="text-xl mr-1 text-red-700" />{" "}
                            Delete
                          </button>
                          <DeleteProductModal
                            isOpen={deleteProductModal}
                            onCancel={handleCancel}
                            token={token}
                            BASE_URL={BASE_URL}
                            productName={selectedProduct?.productName}
                            productId={selectedProduct?.productId}
                            onDeleteProduct={filterDeletedProduct}
                          />
                        </div>
                      </div>
                      <div>
                        <ProductDetail
                          detail={productDetail}
                          BASE_URL={BASE_URL}
                          token={token}
                        />
                      </div>
                    </>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
