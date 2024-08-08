import { Switch, Modal, Spin } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Select from "react-select"; // Import react-select for product selection
import { useToast } from "@chakra-ui/react"; // Import useToast from Chakra UI
import debounce from "lodash.debounce"; // Import lodash debounce

const EditProductModal = ({
  isVisible,
  token,
  BASE_URL,
  merchant,
  geofence,
  currentProduct,
  onEditProduct,
  handleCancel,
}) => {
  const [productDiscount, setProductDiscount] = useState({
    discountName: "",
    maxAmount: "",
    discountType: "",
    discountValue: "",
    description: "",
    productId: "",
    validFrom: "",
    validTo: "",
    geofenceId: "",
    onAddOn: false,
    merchantId: "",
  });

  const [loading, setLoading] = useState(false); // Loading state for fetching data
  const [dataLoading, setDataLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state for form submission
  const [productResults, setProductResults] = useState([]);
  const toast = useToast(); // Toast for notifications

  // Fetch product options
  const fetchProductOptions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/products`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setProductResults(response.data.data || []); // Handle case where data might be empty
      }
    } catch (err) {
      console.error(`Error in fetching products ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setDataLoading(true);

        const response = await axios.get(
          `${BASE_URL}/merchant/product-discount/get-product-discount-id/${currentProduct}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 200) {
          const productData = response.data.data;

          productData.validFrom = formatDate(productData.validFrom);
          productData.validTo = formatDate(productData.validTo);
          setProductDiscount(productData);

          // Fetch product options after setting productDiscount
          fetchProductOptions();
        }
      } catch (err) {
        console.error(`Error in fetching data ${err.message}`);
      } finally {
        setDataLoading(false);
      }
    };

    if (currentProduct) {
      fetchData();
    }
  }, [currentProduct, token, BASE_URL]);

  const handleSearchProduct = async (inputValue) => {
    if (inputValue.length < 2) {
      // Only search when input value length is 2 or more characters
      setProductResults([]);
      return;
    }

    try {
      const response = await axios.get(`${BASE_URL}/products/search`, {
        params: { query: inputValue },
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setProductResults(response.data.data || []); // Handle case where data might be empty
      }
    } catch (err) {
      console.error(`Error in fetching product ${err.message}`);
    }
  };

  // Debounced search handler
  const debouncedSearchProduct = debounce(handleSearchProduct, 300);

  const handleInputProductChange = (inputValue) => {
    debouncedSearchProduct(inputValue);
  };

  // API to update the Discount
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const response = await axios.put(
        `${BASE_URL}/admin/product-discount/edit-product-discount-admin/${currentProduct}`,
        productDiscount,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        onEditProduct(response.data.data);
        handleCancel();
        toast({
          title: "Product Discount Updated",
          description: "Successfully Updated Product Discount",
          duration: 9000,
          status: "success",
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(`Error in updating data ${err.message}`);
      toast({
        title: "Error in updating",
        description: "Error in Updating Product Discount",
        duration: 9000,
        status: "error",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input change for text inputs
  const handleInputChange = (e) => {
    setProductDiscount({
      ...productDiscount,
      [e.target.name]: e.target.value,
    });
  };

  // Handle switch toggle change
  const handleSwitchChange = (checked) => {
    setProductDiscount({
      ...productDiscount,
      onAddOn: checked,
    });
  };

  // Correct the product options mapping to use actual product names
  const productOptions = productResults.map((product) => ({
    label: product.productName, // Adjust this field as necessary
    value: product._id,
  }));

  // Handle select change for product selection
  const handleSelectChange = (selectedOption) => {
    setProductDiscount({
      ...productDiscount,
      productId: selectedOption ? selectedOption.value : "",
    });
  };

  // Helper function to format date to "yyyy-MM-dd"
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <Modal
      title="Edit Product"
      width="700px"
      open={isVisible}
      centered
      onCancel={handleCancel}
      footer={null} // Custom footer to include form buttons
    >
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mt-5 max-h-[30rem] overflow-auto gap-4 justify-between">
          <div className="flex gap-4">
            <label className="w-1/2 text-gray-500">Assign Merchant</label>
            <select
              className="border-2 border-gray-300 rounded p-2 w-2/3 focus:outline-none"
              name="merchantId"
              value={productDiscount.merchantId}
              onChange={handleInputChange}
            >
              <option value="" hidden>
                Select Merchant
              </option>
              {merchant.map((data) => (
                <option value={data._id} key={data._id}>
                  {data.merchantName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex mt-5 gap-4">
            <label className="w-1/2 text-gray-500">Discount Name</label>
            <input
              type="text"
              className="border-2 border-gray-300 rounded p-2 w-2/3 focus:outline-none"
              name="discountName"
              placeholder={dataLoading ? "Loading data..." : ""}
              value={productDiscount.discountName}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex mt-5 gap-4">
            <div>
              <label className="w-1/2 text-gray-500">Discount</label>
              <input
                type="radio"
                className="border-2 ml-[230px] mr-3 border-gray-300 rounded "
                name="discountType"
                value="Flat-discount"
                checked={productDiscount.discountType === "Flat-discount"}
                onChange={handleInputChange}
              />
              Fixed discount
              <input
                type="radio"
                className="border-gray-300 mr-3 rounded ml-5 "
                name="discountType"
                value="Percentage-discount"
                checked={productDiscount.discountType === "Percentage-discount"}
                onChange={handleInputChange}
              />
              Percentage discount
            </div>
          </div>
          <div>
            <input
              type="text"
              className="border-2 border-gray-300 rounded ml-72 p-2 w-[360px] focus:outline-none"
              name="discountValue"
              value={productDiscount.discountValue}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex mt-5 gap-4">
            <label className="w-1/2 text-gray-500">
              Description Maximum 150 Characters
            </label>

            <input
              type="text"
              className="border-2 border-gray-300 rounded p-2 w-2/3 focus:outline-none"
              name="description"
              maxLength={150}
              value={productDiscount.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex mt-5 gap-4">
            <label className="w-1/2 text-gray-500">Select Product</label>
            <Select
              name="productId"
              className="border-2 border-gray-300 rounded w-2/3 focus:outline-none"
              value={productOptions.find(
                (option) => option.value === productDiscount.productId
              )}
              onInputChange={handleInputProductChange}
              onChange={handleSelectChange}
              options={productOptions}
              isLoading={loading}
              placeholder={loading ? "Loading products..." : "Select Product"}
            />
          </div>
          <div className="flex mt-5 gap-4">
            <label className="w-1/2 text-gray-500">Max Amount</label>

            <input
              type="text"
              className="border-2 border-gray-300 rounded p-2 w-2/3 focus:outline-none"
              name="maxAmount"
              value={productDiscount.maxAmount}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex gap-4 mt-5">
            <label className="w-1/2 text-gray-500">Valid From</label>
            <input
              type="date"
              name="validFrom"
              value={productDiscount.validFrom}
              className="border-2 border-gray-300 rounded focus:outline-none p-2 w-2/3"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex gap-4 mt-5">
            <label className="w-1/2 text-gray-500">Valid To</label>
            <input
              type="date"
              name="validTo"
              className="border-2 border-gray-300 rounded focus:outline-none p-2 w-2/3"
              value={productDiscount.validTo}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex mt-5 gap-4">
            <label className="w-1/2 text-gray-500">Geofence</label>
            <select
              className="border-2 border-gray-300 rounded focus:outline-none p-2 w-2/3"
              name="geofenceId"
              value={productDiscount.geofenceId}
              onChange={handleInputChange}
            >
              <option value="" hidden>
                Select Geofence
              </option>
              {geofence.map((data) => (
                <option key={data._id} value={data._id}>
                  {data.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex mt-5 justify-between">
            <label>Discount on add-on</label>
            <Switch
              checked={productDiscount.onAddOn}
              onChange={handleSwitchChange}
            />
          </div>

          <div className="flex justify-end mt-5 gap-4">
            <button
              className="bg-gray-300 rounded-lg px-6 py-2 font-semibold justify-end"
              onClick={handleCancel}
              type="button" // Change to "button" to prevent form submission
            >
              Cancel
            </button>
            <button
              className="bg-teal-800 rounded-lg px-6 py-2 text-white font-semibold justify-end"
              type="submit"
            >
              {isLoading ? "Updating..." : "Save"}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditProductModal;
