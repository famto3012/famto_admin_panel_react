import { useContext, useEffect, useState } from "react";
import { Modal, Switch } from "antd";
import axios from "axios";
import Select from "react-select";
import { useToast } from "@chakra-ui/react";
import { UserContext } from "../../../context/UserContext";

const AddProductModal = ({
  isVisible,
  token,
  BASE_URL,
  geofence,

  selectedMerchant,
  handleCancel,
  onAddProduct,
}) => {
  const { role, userId } = useContext(UserContext);

  const [productDiscount, setProductDiscount] = useState({
    merchantId: role === "Admin" ? selectedMerchant?.merchantId : userId,
    discountName: "",
    maxAmount: "",
    discountType: "",
    discountValue: "",
    description: "",
    validFrom: "",
    validTo: "",
    geofenceId: "",
    productId: "",
    onAddOn: false,
  });
  const [allProducts, setAllProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  useEffect(() => {
    if (role === "Admin" && selectedMerchant) {
      setProductDiscount((prev) => ({
        ...prev,
        merchantId: selectedMerchant.merchantId,
      }));
    } else if (role === "Merchant") {
      setProductDiscount((prev) => ({
        ...prev,
        merchantId: userId,
      }));
    }
  }, [selectedMerchant, role]);

  useEffect(() => {
    const fetchAllProductsOfMerchant = async () => {
      try {
        const merchantId =
          role === "Admin" ? selectedMerchant?.merchantId : userId;

        if (!merchantId) return;

        const response = await axios.get(
          `${BASE_URL}/products/all-products-of-merchant/${merchantId}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          setAllProducts(response.data.data || []);
        }
      } catch (err) {
        console.error(`Error in fetching product ${err.message}`);
      }
    };

    fetchAllProductsOfMerchant();
  }, [role, selectedMerchant, userId, token, BASE_URL]);

  const productOptions = allProducts?.map((product) => ({
    label: product.productName,
    value: product._id,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const endPoint =
        role === "Admin"
          ? `${BASE_URL}/admin/product-discount/add-product-discount-admin`
          : `${BASE_URL}/merchant/product-discount/add-product-discount`;

      const response = await axios.post(endPoint, productDiscount, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 201) {
        setProductDiscount({
          merchantId: "",
          discountName: "",
          maxAmount: "",
          discountType: "",
          discountValue: "",
          description: "",
          validFrom: "",
          validTo: "",
          geofenceId: "",
          productId: "",
          onAddOn: false,
        });
        handleCancel();
        onAddProduct(response.data.data);
        toast({
          title: "Success",
          description: "Product Discount Added Successfully",
          duration: 3000,
          status: "success",
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Error in Creating Product",
        duration: 3000,
        isClosable: true,
        status: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = (checked) => {
    setProductDiscount({ ...productDiscount, onAddOn: checked });
  };

  const handleSelectProduct = (selectedOption) => {
    setProductDiscount({
      ...productDiscount,
      productId: selectedOption ? selectedOption.value : "",
    });
  };

  const handleInputChangeBasic = (e) => {
    setProductDiscount({ ...productDiscount, [e.target.name]: e.target.value });
  };

  return (
    <Modal
      title="Add Product-wise Discount"
      width="700px"
      open={isVisible}
      centered
      onCancel={handleCancel}
      footer={null}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mt-5 max-h-[30rem] overflow-auto gap-4 justify-between">
          {role === "Admin" && (
            <div className="flex gap-4">
              <label className="w-1/2 text-gray-500">
                Assign Merchant <span className="text-red-600">*</span>
              </label>

              <input
                type="text"
                readOnly
                className="border-2 border-gray-300 rounded p-2 w-2/3 focus:outline-none"
                value={selectedMerchant.merchantName}
              />
            </div>
          )}

          <div className="flex mt-5 gap-4">
            <label className="w-1/2 text-gray-500">
              Discount Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              className="border-2 border-gray-300 rounded p-2 w-2/3 focus:outline-none"
              name="discountName"
              value={productDiscount.discountName}
              onChange={handleInputChangeBasic}
            />
          </div>

          <div className="flex mt-5 gap-4">
            <div>
              <label className="w-1/2 text-gray-500">
                Discount <span className="text-red-600">*</span>
              </label>
              <input
                type="radio"
                className="border-2 ml-[225px] mr-3 border-gray-300 rounded "
                name="discountType"
                value="Flat-discount"
                checked={productDiscount.discountType === "Flat-discount"}
                onChange={handleInputChangeBasic}
              />
              Fixed discount
              <input
                type="radio"
                className="border-gray-300 mr-3 rounded ml-5"
                name="discountType"
                value="Percentage-discount"
                checked={productDiscount.discountType === "Percentage-discount"}
                onChange={handleInputChangeBasic}
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
              onChange={handleInputChangeBasic}
            />
          </div>

          <div className="flex mt-5 gap-4">
            <label className="w-1/2 text-gray-500">
              Description Maximum 150 Characters{" "}
              <span className="text-red-600">*</span>
            </label>

            <input
              type="text"
              className="border-2 border-gray-300 rounded p-2 w-2/3 focus:outline-none"
              name="description"
              maxLength={150}
              value={productDiscount.description}
              onChange={handleInputChangeBasic}
            />
          </div>

          <div className="flex mt-5 gap-4">
            <label className="w-1/2 text-gray-500">
              Select Product <span className="text-red-600">*</span>
            </label>

            <Select
              className="rounded w-2/3 outline-none focus:outline-none"
              value={productOptions.find(
                (option) => option.value === productDiscount.productId
              )}
              isSearchable={true}
              onChange={handleSelectProduct}
              options={productOptions}
              placeholder="Select product"
              isClearable={true}
            />
          </div>

          <div className="flex mt-2 gap-4">
            <label className="w-1/2 text-gray-500">
              Max Amount <span className="text-red-600">*</span>
            </label>

            <input
              type="text"
              className="border-2 border-gray-300 rounded p-2 w-2/3 focus:outline-none"
              name="maxAmount"
              value={productDiscount.maxAmount}
              onChange={handleInputChangeBasic}
            />
          </div>

          <div className="flex gap-4 mt-5">
            <label className="w-1/2 text-gray-500">
              Valid From <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              name="validFrom"
              value={productDiscount.validFrom}
              className="border-2 border-gray-300 rounded focus:outline-none p-2 w-2/3"
              onChange={handleInputChangeBasic}
            />
          </div>

          <div className="flex gap-4 mt-5">
            <label className="w-1/2 text-gray-500">
              Valid To <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              name="validTo"
              className="border-2 border-gray-300 rounded focus:outline-none p-2 w-2/3"
              value={productDiscount.validTo}
              onChange={handleInputChangeBasic}
            />
          </div>

          <div className="flex mt-5 gap-4">
            <label className="w-1/2 text-gray-500">
              Geofence <span className="text-red-600">*</span>
            </label>
            <select
              className="border-2 border-gray-300 rounded focus:outline-none p-2 w-2/3"
              name="geofenceId"
              value={productDiscount.geofenceId}
              onChange={handleInputChangeBasic}
            >
              <option value="" hidden>
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
              type="button"
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
