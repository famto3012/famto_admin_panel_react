import { Modal } from "antd";
import { useEffect, useRef, useState } from "react";
import { MdCameraAlt } from "react-icons/md";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  // convertToPixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import CropImage from "../../CropImage";

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
    oftenBoughtTogetherId: [],
    preparationTime: "",
    searchTags: [],
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
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState(null);
  const [img, setImg] = useState(null);
  const [isInnerVisible, setIsInnerVisible] = useState(false);
  const [croppedFile, setCroppedFile] = useState(null);

  const [tagValue, setTagValue] = useState("");
  const inputRef = useRef(null);

  const toast = useToast();
  const animatedComponents = makeAnimated();

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
            discountId: data.discountId || "",
            oftenBoughtTogetherId: data.oftenBoughtTogetherId || [],
            searchTags: data.searchTags || [],
          });
        }

        console.log("finished", merchantId);
      };

      fetchData();
    }
  }, [isVisible, BASE_URL, token, role, merchantId, productId, categoryId]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmedValue = tagValue.trim();
      if (trimmedValue && !productData.searchTags.includes(trimmedValue)) {
        setProductData({
          ...productData,
          searchTags: [...productData.searchTags, trimmedValue],
        });
        console.log(productData.searchTags);
        setTagValue("");
        inputRef.current.focus();
      }
    } else if (e.key === "Backspace" && !tagValue) {
      setProductData({
        ...productData,
        searchTags: productData.searchTags.slice(0, -1),
      });
    }
  };

  const handleRemoveTag = (index) => {
    // Create a new array without the tag at the specified index
    const updatedTags = productData.searchTags.filter((_, i) => i !== index);

    // Update the productData state with the new array
    setProductData((prevState) => ({
      ...prevState,
      searchTags: updatedTags,
    }));
  };

  const productOptions = allProducts.map((product) => ({
    label: product.productName,
    value: product._id,
  }));

  const discountOptions = allProductDiscount?.map((discount) => ({
    label: discount.discountName,
    value: discount._id,
  }));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleSelectProduct = (selectedOptions) => {
    setProductData({
      ...productData,
      oftenBoughtTogetherId: selectedOptions.map((option) => option.value),
    });
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      console.log(productData);

      const dataToSend = new FormData();

      Object.keys(productData).forEach((key) => {
        if (Array.isArray(productData[key])) {
          productData[key].forEach((item) => {
            dataToSend.append(`${key}[]`, item);
          });
        } else if (productData[key]) {
          dataToSend.append(key, productData[key]);
        }
      });
      dataToSend.append("categoryId", categoryId);

      if (croppedFile) {
        dataToSend.append("productImage", croppedFile);
      }

      for (const [key, value] of dataToSend.entries()) {
        console.log(key, value);
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
          preparationTime: "",
          description: "",
          longDescription: "",
          type: "",
          availableQuantity: "",
          alert: "",
          productImageURL: "",
          discountId: "",
          oftenBoughtTogetherId: [],
          searchTags: [],
        });
        setSelectedFile(null);
        setPreviewURL(null);
        handleCancel();
        toast({
          title: "Success",
          description: response.data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(`Error in updating product: ${err}`);
      toast({
        title: "Error",
        description: "Error in updating product",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      setIsInnerVisible(true);
      setCrop(null);
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
      setImg(e.target.files[0]);
    }
  }

  const handleCropComplete = (croppedFile) => {
    setCroppedFile(croppedFile);
    setSelectedFile(croppedFile);
    console.log("Cropped image file:", croppedFile);
  };

  const handleModalClose = () => {
    setSelectedFile(null);
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
      <form
        onSubmit={handleEditProduct}
        className="max-h-[30rem] overflow-y-auto"
      >
        <div className="flex flex-col gap-4 mt-5">
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="productName">
              Product Name <span className="text-red-600">*</span>
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
          {role === "Admin" && (
            <div className="flex items-center">
              <label className="w-1/3 text-gray-500" htmlFor="price">
                Price <span className="text-red-600">*</span>
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
          )}
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
              Cost Price <span className="text-red-600">*</span>
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
            <Select
              className="w-2/3 outline-none focus:outline-none"
              value={discountOptions.find(
                (option) => option.value === productData.discountId
              )}
              isMulti={false}
              isSearchable={true}
              onChange={(option) =>
                setProductData({ ...productData, discountId: option.value })
              }
              options={discountOptions}
              placeholder="Select discount"
            />
          </div>
          {/*
          //? Not in use right now
          <div className="hidden items-center">
            <label className="w-1/3 text-gray-500" htmlFor="boughtTogether">
              Often bought together
            </label>
            <Select
              className="w-2/3 outline-none focus:outline-none"
              value={productOptions.filter((option) =>
                productData.oftenBoughtTogetherId.includes(option.value)
              )}
              isMulti={true}
              isSearchable={true}
              onChange={handleSelectProduct}
              options={productOptions}
              placeholder="Select Product"
              isClearable={true}
              components={animatedComponents}
            />
          </div>
          //?
          */}
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="preparationTime">
              Preparation Time
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              name="preparationTime"
              placeholder="Preparation time (in minutes)"
              value={productData.preparationTime}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="searchTag">
              Search Tag
            </label>
            <div className="w-2/3">
              <div className="flex flex-wrap gap-1 mb-1">
                {productData?.searchTags?.map((tag, index) => (
                  <div
                    className="flex items-center bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full"
                    key={index}
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(index)}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
              <input
                ref={inputRef}
                type="text"
                name="searchTags"
                placeholder="Search tags"
                value={tagValue}
                onChange={(e) => setTagValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full border-2 border-gray-100 rounded p-2 focus:outline-none"
              />
            </div>
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
            />
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
              Type <span className="text-red-600">*</span>
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
            <input
              className="border-2 border-gray-100 rounded p-2 mr-3 ml-5 focus:outline-none"
              type="radio"
              name="type"
              value="Other"
              checked={productData.type === "Other"}
              onChange={handleInputChange}
            />
            Other
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="photos">
              Photos
            </label>

            <div className=" flex items-center gap-[30px]">
              {!croppedFile && (
                <img
                  className="h-[66px] w-[66px] bg-gray-200 rounded-md mt-[20px]"
                  src={productData.productImageURL}
                />
              )}
              {!!croppedFile && (
                <>
                  <div>
                    <img
                      ref={previewCanvasRef}
                      src={URL.createObjectURL(croppedFile)}
                      style={{
                        border: "1px solid white",
                        borderRadius: "5px",
                        objectFit: "contain",
                        width: "66px",
                        height: "66px",
                        marginTop: "20px",
                      }}
                    />
                  </div>
                </>
              )}
              <input
                type="file"
                name="agentImage"
                id="agentImage"
                className="hidden"
                accept="image/*"
                onChange={onSelectFile}
              />
              <label htmlFor="agentImage" className="cursor-pointer ">
                <MdCameraAlt
                  className=" bg-teal-800  text-[40px] text-white p-6 h-16 w-16 mt-5 rounded"
                  size={30}
                />
              </label>
              {imgSrc && (
                <CropImage
                  selectedImage={img}
                  aspectRatio={1 / 1} // Optional, set aspect ratio (1:1 here)
                  onCropComplete={handleCropComplete}
                  onClose={handleModalClose} // Pass the handler to close the modal and reset the state
                />
              )}
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
