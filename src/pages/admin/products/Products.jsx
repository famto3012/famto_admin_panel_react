import { useContext, useEffect, useRef, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import GlobalSearch from "../../../components/GlobalSearch";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
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

  const [isCategoryListLoading, setIsCategoryListLoading] = useState(false);
  const [isProductListLoading, setIsProductListLoading] = useState(false);
  const [isProductDetailLoading, setIsProductDetailLoading] = useState(false);

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
        setIsCategoryListLoading(true);
        setIsProductListLoading(true);
        setIsProductDetailLoading(true);

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
          console.log(data);
          if (data.length > 0) {
            setSelectedMerchant(data[0]._id);
            console.log("SelectedMerchant", selectedMerchant);
          }
        }
      } catch (err) {
        console.log(`Error in getting all merchants: ${err}`);
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
        console.log("Merchant id in getting categories", merchantId);

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
          setAllCategories(data);
          if (data.length > 0) {
            setSelectedCategory({
              categoryId: data[0]?._id,
              categoryName: data[0]?.categoryName,
              categoryStatus: data[0]?.status,
            });
          }
        }
      } catch (err) {
        console.log(`Error in getting all categories: ${err}`);
      } finally {
        setIsCategoryListLoading(false);
      }
    };

    if (selectedMerchant) {
      getAllCategories(selectedMerchant);
    }
  }, [selectedMerchant, token]);

  useEffect(() => {
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
          setAllProducts(data);
          setSelectedProduct({
            productId: data[0]?._id,
            productName: data[0]?.productName,
          });
        }
      } catch (err) {
        console.log(`Error in getting products by category: ${err}`);
      } finally {
        setIsProductListLoading(false);
      }
    };

    if (selectedCategory?.categoryId) {
      getProductsByCategory(selectedCategory.categoryId);
    }
  }, [selectedCategory, token]);

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
          setProductDetail(data);
        }
      } catch (err) {
        console.log(`Error in getting product detail: ${err}`);
      } finally {
        setIsProductDetailLoading(false);
      }
    };

    if (selectedProduct?.productId) {
      getProductDetail(selectedProduct.productId);
    }
  }, [selectedProduct, token]);

  const selectCategory = (id, name) => {
    setSelectedCategory({
      categoryId: id,
      categoryName: name,
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

  const handleCancel = () => {
    setAddCategoryModal(false);
    setEditCategoryModal(false);
    setEditProductModal(false);
    setAddProductModal(false);
    setDeleteCategoryModal(false);
    setDeleteProductModal(false);
    setChangeCategoryModal(false);
  };

  const handleAddCategory = (category) => {
    console.log("Adding category:", category); // Debugging
    setAllCategories((prevCategories) => [...prevCategories, category]);
  };

  const handleAddProduct = (newProduct) =>
    setAllProducts((prevProducts) => [...allProducts, newProduct]);

  const filterDeletedCategory = (categoryId) => {
    setAllCategories(
      allCategories.filter((category) => category._id !== categoryId)
    );
    if (allCategories.length > 1) {
      setSelectedCategory({
        categoryId: allCategories[0]._id,
        categoryName: allCategories[0].categoryName,
        categoryStatus: allCategories[0].status,
      });
    } else {
      setSelectedCategory({
        categoryId: "",
        categoryName: "",
        categoryStatus: null,
      });
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
        setSelectedCategory({
          ...selectedCategory,
          categoryStatus: !selectedCategory.categoryStatus,
        });
        toast({
          title: "Success",
          description: response.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(`Error in changing product status: ${err}`);
      toast({
        title: "Error",
        description: `Error in changing category status`,
        status: "error",
        duration: 5000,
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
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(`Error in changing product status: ${err}`);
      toast({
        title: "Error",
        description: `Error in changing product status`,
        status: "error",
        duration: 5000,
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

  const handleReorderProduct = async () => {
    try {
      const productClone = [...allProducts];
      const temp = productClone[dragProduct.current];
      productClone[dragProduct.current] = productClone[dragOverProduct.current];
      productClone[dragOverProduct.current] = temp;

      const products = productClone.map((product, index) => {
        return { id: product._id, order: index + 1 };
      });

      console.log(products);

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
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(`Error in re-odering products: ${err}`);
      toast({
        title: "Error",
        description: `Error in re-odering products`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Sidebar />
      <div className="pl-[300px] bg-gray-100">
        <nav className="p-5">
          <GlobalSearch />
        </nav>
        <div
          className={`flex ${
            role === "Admin" ? "justify-between" : "justify-end"
          } bg-white p-5 mx-5 rounded-md`}
        >
          {role === "Admin" && (
            <select
              name="merchantId"
              value={selectedMerchant}
              className="bg-blue-50 p-2 rounded focus:outline-none outline-none"
              onChange={(e) => setSelectedMerchant(e.target.value)}
            >
              <option defaultValue={"Select merchant"} hidden>
                Select merchant
              </option>
              {allMerchants?.map((merchant) => (
                <option key={merchant._id} value={merchant._id}>
                  {merchant.merchantName}
                </option>
              ))}
            </select>
          )}
          <div>
            <input
              type="search"
              name="search"
              className="bg-gray-100 relative p-2 rounded-2xl"
              placeholder="Search records"
            />
            <SearchOutlined className="absolute -ml-7 mt-3" />
          </div>
        </div>
        {/* <div className="flex">
          <div className="w-1/5 bg-white rounded-md m-5 mr-0">
            <div className="border-b-2 ">
              <h1 className="font-[600] pb-5 p-8 text-[18px]">Categories</h1>
            </div>

            <div>
              {isCategoryListLoading && (
                <div className="flex justify-center my-3 ">
                  <Spinner />
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
                      selectCategory(category._id, category.categoryName)
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
              />
            </div>
          </div> */}
        <div className="flex">
          <div className="w-1/5 bg-white rounded-md m-5 mr-0">
            <div className="border-b-2 ">
              <h1 className="font-[600] pb-5 p-8 text-[18px]">Categories</h1>
            </div>

            <div>
              {isCategoryListLoading && (
                <div className="flex justify-center my-3 ">
                  <Spinner />
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
                      selectCategory(category._id, category.categoryName)
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
              />
            </div>
          </div>
        </div>
        <div className="w-4/5 bg-white rounded-md m-5 ml-2">
          <div className="border-b-2 flex justify-between p-5">
            <h1 className="font-semibold flex ml-3 items-center text-[18px] capitalize">
              {selectedCategory.categoryName}
            </h1>
            <div className="flex gap-5 items-center">
              Disabled{" "}
              <Switch
                value={selectedCategory.categoryStatus}
                onClick={handleChangeCategoryStatus}
              />{" "}
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
                categoryId={selectedCategory.categoryId}
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
                categoryName={selectedCategory.categoryName}
                categoryId={selectedCategory.categoryId}
                onDeleteCategory={filterDeletedCategory}
              />
            </div>
          </div>

          <div className="flex">
            <div className=" border border-gray-200 w-1/3">
              <div>
                {isProductListLoading && (
                  <div className="flex justify-center my-3 ">
                    <Spinner />
                  </div>
                )}

                {!isProductListLoading &&
                  allProducts?.map((product, index) => (
                    <h6
                      key={product._id}
                      draggable
                      onDragStart={() => (dragProduct.current = index)}
                      onDragEnter={() => (dragOverProduct.current = index)}
                      onDragEnd={handleReorderProduct}
                      onDragOver={(e) => e.preventDefault()}
                      onClick={() =>
                        selectProduct(product._id, product.productName)
                      }
                      className={`${
                        selectedProduct.productName === product.productName
                          ? "bg-gray-200"
                          : ""
                      } text-start ps-[20px] py-[20px] text-[16px] cursor-pointer hover:bg-gray-100 font-[400]`}
                    >
                      {product.productName}
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
                  categoryId={selectedCategory.categoryId}
                  merchantId={selectedMerchant}
                  onAddProduct={handleAddProduct}
                />
              </div>
            </div>
            <div className="w-full">
              {isProductDetailLoading && (
                <div className="flex justify-center items-center h-[55dvh]">
                  <Spinner />
                </div>
              )}

              {!isProductDetailLoading &&
                Object.keys(productDetail).length === 0 && (
                  <div className="flex justify-center items-center h-[50%]">
                    <p>No Data available</p>
                  </div>
                )}

              {!isProductDetailLoading &&
                Object.keys(productDetail).length > 0 && (
                  <div>
                    <div className="p-5 flex justify-between">
                      <div className="flex w-2/3 gap-3">
                        <figure className="h-[90px] w-[90px] ">
                          <img
                            src={productDetail.productImageURL}
                            alt=""
                            className="w-full h-full object-cover rounded-md"
                          />
                        </figure>
                        <div>
                          <p className="font-semibold">
                            {productDetail.productName}
                          </p>
                          <p className="text-teal-800 font-bold">
                            ₹ {productDetail.price}
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
                          categoryId={selectedCategory.categoryId}
                          productId={selectedProduct.productId}
                          onChangeCategory={filterChangedProduct}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between p-5 items-center">
                      <p className="font-semibold">Product Details</p>
                      <div className="flex gap-5 items-center">
                        Inventory
                        <Switch
                          value={productDetail.inventory}
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
                          productId={selectedProduct.productId}
                          categoryId={selectedCategory.categoryId}
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
                          productName={selectedProduct.productName}
                          productId={selectedProduct.productId}
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
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Products;
