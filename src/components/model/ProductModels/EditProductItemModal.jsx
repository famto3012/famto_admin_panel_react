import { Modal } from "antd";
import { useEffect, useState } from "react";
import { MdCameraAlt } from "react-icons/md";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const EditProductItemModal = ({
  isVisible,
  handleCancel,
  BASE_URL,
  token,
  role,
  merchantId,
  productId,
  categoryId,
}) => {
  const [productData, setProductData] = useState({
    productName: "",
    price: "",
    minQuantityToOrder: "",
    maxQuantityPerOrder: "",
    costPrice: "",
    sku: "",
    discountId: "",
    oftenBoughtTogetherId: "",
    preperationTime: "",
    searchTags: "",
    description: "",
    longDescription: "",
    type: "",
    availableQuantity: "",
    alert: "",
    productImageURL: "",
  });
  const [allProductDiscount, setAllProductDiscount] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const toast = useToast();

  useEffect(() => {
    if (!productId || !categoryId || !merchantId) return;

    if (isVisible) {
      const fetchData = async () => {
        console.log("started", merchantId);
        const discountEndPoint =
          role === "Admin"
            ? `${BASE_URL}/merchant/product-discount/get-product-discount-admin/${merchantId}`
            : `${BASE_URL}/merchant/product-discount/get-product-discount`;

        const [discountResponse, allProductResponse, singleProductResponse] =
          await Promise.all([
            axios.get(discountEndPoint, {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),

            axios.get(
              `${BASE_URL}/products/all-products-of-merchant/${merchantId}`,
              {
                withCredentials: true,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            ),

            axios.get(`${BASE_URL}/products/${productId}`, {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
          ]);

        if (discountResponse.status === 200) {
          setAllProductDiscount(discountResponse.data.data);
        }

        if (allProductResponse.status === 200) {
          setAllProducts(allProductResponse.data.data);
        }

        if (singleProductResponse.status === 200) {
          const { data } = singleProductResponse.data;
          setProductData({
            ...data,
            discountId: null ? "" : data.discountId,
            oftenBoughtTogetherId: null ? "" : data.oftenBoughtTogetherId,
          });
        }

        console.log("finished", merchantId);
      };

      fetchData();
    }
  }, [isVisible, BASE_URL, token, role, merchantId, productId, categoryId]);

  const handleInputChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSelectImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreviewURL(URL.createObjectURL(file));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const dataToSend = new FormData();

      Object.keys(productData).forEach((key) =>
        dataToSend.append(key, productData[key])
      );

      if (selectedFile) {
        dataToSend.append("productImage", selectedFile);
      }

      const response = await axios.put(
        `${BASE_URL}/products/edit-product/${productId}`,
        dataToSend,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setProductData({
          productName: "",
          price: "",
          minQuantityToOrder: "",
          maxQuantityPerOrder: "",
          costPrice: "",
          sku: "",
          discountId: "",
          oftenBoughtTogetherId: "",
          preperationTime: "",
          searchTags: "",
          description: "",
          longDescription: "",
          type: "",
          availableQuantity: "",
          alert: "",
          productImageURL: "",
        });
        setSelectedFile(null);
        setPreviewURL(null);
        handleCancel();
        toast({
          title: "Category Added",
          description: response.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(`Error in creating new product: ${err}`);
      toast({
        title: "Error",
        description: `Error in adding new category`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Edit product"
      onCancel={handleCancel}
      width="500px"
      footer={null}
      open={isVisible}
      centered
    >
      <form onSubmit={handleAddProduct} className="max-h-[30rem] overflow-auto">
        <div className="flex flex-col gap-4 mt-5">
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="productName">
              Product Name
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              name="productName"
              placeholder="Product name"
              value={productData.productName}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="price">
              Price
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              name="price"
              placeholder="Price"
              value={productData.price}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="availableQuantity">
              Available Quantity
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              name="availableQuantity"
              placeholder="Available quantity"
              value={productData.availableQuantity}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="alert">
              Alert Quantity
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              name="alert"
              placeholder="Alert quantity"
              value={productData.alert}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label
              className="w-1/3 text-gray-500 "
              htmlFor="minQuantityToOrder"
            >
              Minimum Quantity to Order
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              name="minQuantityToOrder"
              placeholder="Minimum quantity to order"
              value={productData.minQuantityToOrder}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label
              className="w-1/3 text-gray-500"
              htmlFor="maxQmaxQuantityPerOrderty"
            >
              Maximum Quantity to Order
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              name="maxQuantityPerOrder"
              placeholder="Maximum quantity to order"
              value={productData.maxQuantityPerOrder}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="costPrice">
              Cost Price
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              name="costPrice"
              placeholder="Cost price"
              value={productData.costPrice}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="sku">
              SKU
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              name="sku"
              placeholder="SKU"
              value={productData.sku}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="discountId">
              Discount
            </label>
            <select
              name="discountId"
              value={productData.discountId}
              onChange={handleInputChange}
              className="border-2 border-gray-100 rounded p-2 focus:outline-none w-2/3"
            >
              <option defaultValue={"Select discount"} hidden>
                Select discount
              </option>
              {allProductDiscount?.map((discount) => (
                <option key={discount._id} value={discount._id}>
                  {discount.discountName.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="boughtTogether">
              Often bought together
            </label>
            <select
              name="oftenBoughtTogetherId"
              value={productData.oftenBoughtTogetherId}
              onChange={handleInputChange}
              className="border-2 border-gray-100 rounded p-2 focus:outline-none w-2/3"
            >
              <option defaultValue={"Select product"} hidden>
                Select product
              </option>
              {allProducts?.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.productName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="preparationTime">
              Preparation Time
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              name="preperationTime"
              placeholder="Preperation time"
              value={productData.preperationTime}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="searchTag">
              Search Tag
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              name="searchTags"
              placeholder="Search tags"
              value={productData.searchTags}
              onChange={handleInputChange}
            ></input>
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="description">
              Description
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              name="description"
              placeholder="Description"
              value={productData.description}
              onChange={handleInputChange}
            ></input>
          </div>
          <div className="flex items-start">
            <label className="w-1/3 text-gray-500" htmlFor="longDescription">
              Long description
            </label>
            <textarea
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none resize-y"
              type="text"
              name="longDescription"
              placeholder="Long description"
              value={productData.longDescription}
              rows={5}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="type">
              Type
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 mr-3 focus:outline-none"
              type="radio"
              name="type"
              value="Veg"
              checked={productData.type === "Veg"}
              onChange={handleInputChange}
            />
            Veg
            <input
              className="border-2 border-gray-100 rounded p-2 mr-3 ml-5 focus:outline-none"
              type="radio"
              name="type"
              value="Non-veg"
              checked={productData.type === "Non-veg"}
              onChange={handleInputChange}
            />
            Non-veg
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="photos">
              Photos
            </label>

            <div className=" flex items-center gap-[30px]">
              {!previewURL && productData?.productImageURL && (
                <figure className=" mt-5 h-16 w-16 rounded-md relative">
                  <img
                    src={productData.productImageURL}
                    alt={productData.productName}
                    className="w-full rounded h-full object-cover "
                  />
                </figure>
              )}
              {previewURL && (
                <figure className=" mt-5 h-16 w-16 rounded-md relative">
                  <img
                    src={previewURL}
                    alt={productData.productName}
                    className="w-full rounded h-full object-cover "
                  />
                </figure>
              )}
              <input
                type="file"
                name="agentImage"
                id="agentImage"
                className="hidden"
                onChange={handleSelectImage}
              />
              <label htmlFor="agentImage" className="cursor-pointer ">
                <MdCameraAlt
                  className=" bg-teal-800  text-[40px] text-white p-6 h-16 w-16 mt-5 rounded"
                  size={30}
                />
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              className="bg-cyan-50 py-2 px-4 rounded-md"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="bg-teal-700 text-white py-2 px-4 rounded-md focus:outline-none"
              type="submit"
            >
              {isLoading ? `Saving...` : `Save`}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditProductItemModal;
