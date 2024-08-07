import React, { useState } from "react";
import { Modal, Switch } from "antd";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const AddProductModal = ({
  isVisible,
  token,
  BASE_URL,
  geofence,
  merchant,
  handleCancel,
  onAddProduct,
}) => {
  const [productResults, setProductResults] = useState([]);
  const [selectedProductName, setSelectedProductName] = useState(""); // State for selected product name
  const [productDiscount, setProductDiscount] = useState({
    discountName: "",
    maxAmount: "",
    discountType: "",
    discountValue: "",
    description: "",
    merchantId: "",
    validFrom: "",
    validTo: "",
    geofenceId: "",
    productId: "",
    onAddOn: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const response = await axios.post(
        `${BASE_URL}/admin/product-discount/add-product-discount-admin`,
        productDiscount,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 201) {
        handleCancel();
        onAddProduct(response.data.data);
        toast({
          title: "Product Discount Created",
          description: "Product Discount Added Successfully",
          duration: 9000,
          status: "success",
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(`Error in add data ${err.message}`);
      toast({
        title: "Product Discount Creating Failed",
        description: "Error in Creating Product",
        duration: 9000,
        isClosable: true,
        status: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchProduct = async (e) => {
    const query = e.target.value;

    if (query.length < 2) {
      // Only search when query length is 2 or more characters
      setProductResults([]);
      return;
    }

    try {
      const response = await axios.get(`${BASE_URL}/products/search`, {
        params: { query },
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setProductResults(response.data.data || []); // Handle case where data might be empty
      }
    } catch (err) {
      console.error(`Error in fetch product ${err.message}`);
    }
  };

  const handleProductSelect = (productId, productName) => {
    setProductDiscount({ ...productDiscount, productId });
    setSelectedProductName(productName); // Store the selected product name
  };

  const handleToggle = (checked) => {
    setProductDiscount({ ...productDiscount, onAddOn: checked });
  };

  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setProductDiscount({ ...productDiscount, [e.target.name]: e.target.value });
  };

  // Debugging logs
  console.log("Product Discount:", productDiscount);
  console.log("Selected Product Name:", selectedProductName);

  return (
    <Modal
      title="Add Product-wise Discount"
      width="700px"
      open={isVisible}
      centered
      onCancel={handleCancel}
      footer={null} // Custom footer to include form buttons
    >
      <form>
        <div className="flex flex-col mt-5 max-h-[30rem] overflow-auto gap-4 justify-between">
          <div className="flex gap-4">
            <label className="w-1/2 text-gray-500">Assign Merchant</label>
            <select
              className="border-2 border-gray-300 rounded p-2 w-2/3 focus:outline-none"
              name="merchantId"
              value={productDiscount.merchantId}
              onChange={handleInputChange}
            >
              <option defaultValue={"Select Merchant"} hidden>
                Select Merchant
              </option>
              {merchant.map((data) => (
                <option key={data._id} value={data._id}>
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
              value={productDiscount.discountName}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex mt-5 gap-4">
            <div>
              <label className="w-1/2 text-gray-500">Discount</label>
              <input
                type="radio"
                className="border-2 ml-[225px] mr-3 border-gray-300 rounded "
                name="discountType"
                value="Flat-discount"
                checked={productDiscount.discountType === "Flat-discount"}
                onChange={handleInputChange}
              />
              Fixed discount
              <input
                type="radio"
                className="border-gray-300 mr-3 rounded ml-5"
                name="discountType"
                value="Percentage-discount"
                checked={productDiscount.discountType === "Percentage-discount"}
                onChange={handleInputChange}
              />
              Percentage-discount
            </div>
          </div>
          <div>
            <input
              type="text"
              className="border-2 border-gray-300 rounded ml-[280px] p-2 w-[357px] focus:outline-none"
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

            <input
              type="search"
              className="border-2 border-gray-300 rounded p-2 w-2/3 focus:outline-none"
              name="productId"
              // value={selectedProductName} // Bind input value to selected product name
              onChange={handleSearchProduct}
            />
          </div>
          <div className="mt-2">
            <ul className="border-gray-300 rounded-md max-h-40 overflow-y-auto">
              {productResults.map((product) => (
                <li
                  key={product._id}
                  className={`p-2 cursor-pointer text-black hover:bg-gray-100 ${
                    productDiscount.productId === product._id
                      ? "bg-teal-200"
                      : ""
                  }`}
                  onClick={
                    () => handleProductSelect(product._id, product.productName) // Pass product name to the handler
                  }
                >
                  {product.productName}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex mt-2 gap-4">
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
              <option value="Select Geofence" hidden>
                Select Geofence
              </option>
              {geofence.map((data) => (
                <option value={data._id} key={data._id}>
                  {data.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex mt-5 justify-between">
            <label>Discount on add-on</label>
            <Switch
              value={productDiscount.onAddOn}
              checked={productDiscount.onAddOn}
              onChange={handleToggle}
            />
          </div>

          <div className="flex justify-end mt-5 gap-4">
            <button
              className="bg-gray-300 rounded-lg px-6 py-2 font-semibold justify-end"
              onClick={handleCancel}
              type="button" // Changed to "button" to prevent accidental form submission
            >
              Cancel
            </button>
            <button
              className="bg-teal-800 rounded-lg px-6 py-2 text-white font-semibold justify-end"
              onClick={handleSubmit}
              type="submit"
            >
              {isLoading ? "Saving..." : "Add"}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddProductModal;
