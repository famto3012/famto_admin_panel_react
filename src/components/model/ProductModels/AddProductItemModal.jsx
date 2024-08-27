import { Modal } from "antd";
import { useEffect, useRef, useState } from "react";
import { MdCameraAlt } from "react-icons/md";
import axios from "axios";
import { Spinner, useToast } from "@chakra-ui/react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { AiOutlineCloudUpload } from "react-icons/ai";

const AddProductItemModal = ({
  isVisible,
  handleCancel,
  BASE_URL,
  token,
  role,
  categoryId,
  merchantId,
  onAddProduct,
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
  });
  const [allProductDiscount, setAllProductDiscount] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const [selectedCSVFile, setSelectedCSVFile] = useState(null);
  const [isUploadLoading, setIsUploadLoading] = useState(false);

  const [tagValue, setTagValue] = useState("");
  const inputRef = useRef(null);

  const toast = useToast();
  const animatedComponents = makeAnimated();

  useEffect(() => {
    if (!categoryId || !merchantId) return;

    if (isVisible) {
      const fetchData = async () => {
        const discountEndPoint =
          role === "Admin"
            ? `${BASE_URL}/merchant/product-discount/get-product-discount-admin/${merchantId}`
            : `${BASE_URL}/merchant/product-discount/get-product-discount`;

        const [discountResponse, allProductResponse] = await Promise.all([
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
        ]);

        if (discountResponse.status === 200) {
          setAllProductDiscount(discountResponse.data.data);
        }
        if (allProductResponse.status === 200) {
          setAllProducts(allProductResponse.data.data);
        }
      };

      fetchData();
    }
  }, [categoryId, merchantId, isVisible, role, token, BASE_URL]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmedValue = tagValue.trim();
      const currentTags = Array.isArray(productData.searchTags)
        ? productData.searchTags
        : [];

      if (trimmedValue && !currentTags.includes(trimmedValue)) {
        setProductData({
          ...productData,
          searchTags: [...currentTags, trimmedValue],
        });
        setTagValue("");
        inputRef.current.focus();
      }
    } else if (e.key === "Backspace" && !tagValue) {
      const currentTags = Array.isArray(productData.searchTags)
        ? productData.searchTags
        : [];

      setProductData({
        ...productData,
        searchTags: currentTags.slice(0, -1),
      });
    }
  };

  const handleRemoveTag = (index) => {
    setProductData({
      ...productData,
      searchTags: productData.searchTags.filter((_, i) => i !== index),
    });
  };

  const productOptions = allProducts.map((product) => ({
    label: product.productName,
    value: product._id,
  }));

  const handleInputChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSelectImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreviewURL(URL.createObjectURL(file));
  };

  const handleSelectProduct = (selectedOptions) => {
    setProductData({
      ...productData,
      oftenBoughtTogetherId: selectedOptions.map((option) => option.value),
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const dataToSend = new FormData();

      Object.keys(productData).forEach((key) => {
        if (Array.isArray(productData[key])) {
          // Append each item in the array with the same key name
          productData[key].forEach((item) => {
            dataToSend.append(`${key}[]`, item);
          });
        } else {
          dataToSend.append(key, productData[key]);
        }
      });

      dataToSend.append("categoryId", categoryId);

      if (selectedFile) {
        dataToSend.append("productImage", selectedFile);
      }

      const response = await axios.post(
        `${BASE_URL}/products/add-product`,
        dataToSend,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        onAddProduct(response.data.data);
        setProductData({
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
      console.log(
        `Error in creating new product: ${err.response?.data || err.message}`
      );
      toast({
        title: "Error",
        description: `Error in adding new product`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadSampleCSV = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.get(
        `${BASE_URL}/products/download-sample-product-csv`,
        {
          responseType: "blob",
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("In fronend");

      // Create a URL for the file and trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));

      console.log("url", url);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Product_sample.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.log(`Error in downloading sample CSV file: ${err.stack}`);
    }
  };

  const handleSelectCSVFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setSelectedCSVFile(file);
  };

  const handlUploadCSVFile = async (e) => {
    try {
      e.preventDefault();

      setIsUploadLoading(true);

      const csvToSend = new FormData();

      if (selectedCSVFile) {
        csvToSend.append("productCSV", selectedCSVFile);
        csvToSend.append("categoryId", categoryId);
      }

      const response = await axios.post(
        `${BASE_URL}/products/upload-product-csv`,
        csvToSend,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setSelectedCSVFile(null);
        handleCancel();
        toast({
          title: "Success",
          description: "CSV data added successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        // navigate(0);
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Error in uploading CSV file",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsUploadLoading(false);
    }
  };

  return (
    <Modal
      title="Add Product"
      onCancel={handleCancel}
      width="600px"
      footer={null}
      open={isVisible}
      centered
    >
      <form onSubmit={handleAddProduct} className="max-h-[30rem] overflow-auto">
        <div className="flex flex-col gap-4 mt-5">
          <div className="grid justify-end">
            <label
              htmlFor="uploadCSV"
              className="flex items-center bg-teal-800 w-fit p-2 gap-2 text-white rounded-xl border cursor-pointer"
            >
              <AiOutlineCloudUpload size={20} />
              Upload CSV
              <input
                type="file"
                name="uploadCSV"
                id="uploadCSV"
                className="hidden"
                onChange={handleSelectCSVFile}
              />
            </label>

            <p
              onClick={downloadSampleCSV}
              className="text-gray-500 underline underline-offset-2 cursor-pointer"
            >
              Download Sample CSV
            </p>

            {selectedCSVFile && (
              <div className="flex items-center gap-4 mt-[20px]">
                <p>{selectedCSVFile.name}</p>
                {isUploadLoading ? (
                  <Spinner size="sm" />
                ) : (
                  <AiOutlineCloudUpload
                    size={25}
                    onClick={handlUploadCSVFile}
                    className="cursor-pointer  text-teal-600"
                  />
                )}
              </div>
            )}
          </div>
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
              Veg/Non-veg
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
              {!previewURL && (
                <div className="bg-gray-400  mt-5 h-16 w-16 rounded-md" />
              )}
              {previewURL && (
                <figure className=" mt-5 h-16 w-16 rounded-md relative">
                  <img
                    src={previewURL}
                    alt="profile"
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
                  className=" bg-teal-800  text-[40px] text-white p-5 h-16 w-16 mt-5 rounded"
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
              className="bg-teal-800 text-white py-2 px-4 rounded-md focus:outline-none"
              type="submit"
            >
              {isLoading ? `Adding...` : `Add`}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddProductItemModal;
