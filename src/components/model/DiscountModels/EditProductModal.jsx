import { Switch, Modal } from "antd";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { useToast } from "@chakra-ui/react";
import { formatDateForDateSelect } from "../../../utils/formatter";
import { UserContext } from "../../../context/UserContext";

const EditProductModal = ({
  isVisible,
  token,
  BASE_URL,
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
  const [allProducts, setAllProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const { role } = useContext(UserContext);

  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/merchant/product-discount/get-product-discount-id/${currentProduct}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 200) {
          const { data } = response.data;
          setProductDiscount(data);
        }
      } catch (err) {
        console.error(`Error in fetching data ${err.message}`);
      }
    };

    if (currentProduct) {
      fetchData();
    }
  }, [currentProduct, token]);

  useEffect(() => {
    const fetchAllProductsOfMerchant = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/products/all-products-of-merchant/${productDiscount.merchantId}`,
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

    if (productDiscount.merchantId) fetchAllProductsOfMerchant();
  }, [productDiscount.productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const endPoint =
        role === "Admin"
          ? `${BASE_URL}/admin/product-discount/edit-product-discount-admin/${currentProduct}`
          : `${BASE_URL}/admin/product-discount/edit-product-discount/${currentProduct}`;

      const response = await axios.put(endPoint, productDiscount, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        onEditProduct(response.data.data);
        handleCancel();
        toast({
          title: "Success",
          description: "Successfully Updated Product Discount",
          duration: 3000,
          status: "success",
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(`Error in updating data ${err.message}`);
      toast({
        title: "Error",
        description: "Error in Updating Product Discount",
        duration: 3000,
        status: "error",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const geofenceOptions = geofence?.map((geofence) => ({
    label: geofence.name,
    value: geofence._id,
  }));

  const handleInputChange = (e) => {
    setProductDiscount({
      ...productDiscount,
      [e.target.name]: e.target.value,
    });
  };

  const handleSwitchChange = (checked) => {
    setProductDiscount({
      ...productDiscount,
      onAddOn: checked,
    });
  };

  const productOptions = allProducts?.map((product) => ({
    label: product.productName,
    value: product._id,
  }));

  const handleSelectChange = (selectedOption) => {
    setProductDiscount({
      ...productDiscount,
      productId: selectedOption ? selectedOption.value : "",
    });
  };

  return (
    <Modal
      title="Edit Product"
      width="700px"
      open={isVisible}
      centered
      onCancel={handleCancel}
      footer={null}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mt-5 max-h-[30rem] overflow-auto gap-4 justify-between">
          <div className="flex mt-5 gap-4">
            <label className="w-1/2 text-gray-500">
              Discount Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              className="border-2 border-gray-300 rounded p-2 w-2/3 focus:outline-none"
              name="discountName"
              placeholder="Discount name"
              value={productDiscount.discountName}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex mt-1 gap-4">
            <div>
              <label className="w-1/2 text-gray-500">
                Discount <span className="text-red-600">*</span>
              </label>
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

          {/* <div className="flex mt-5 gap-4">
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
              onChange={handleInputChange}
            />
          </div> */}

          <div className="flex mt-1 gap-4">
            <label className="w-1/2 text-gray-500">
              Select Product <span className="text-red-600">*</span>
            </label>
            <Select
              name="productId"
              className="border-2 border-gray-300 rounded w-2/3 focus:outline-none"
              value={productOptions.find(
                (option) => option.value === productDiscount.productId
              )}
              onChange={handleSelectChange}
              options={productOptions}
              placeholder="Select Product"
            />
          </div>

          <div className="flex mt-1 gap-4">
            <label className="w-1/2 text-gray-500">
              Max Amount <span className="text-red-600">*</span>
            </label>

            <input
              type="text"
              className="border-2 border-gray-300 rounded p-2 w-2/3 focus:outline-none"
              name="maxAmount"
              value={productDiscount.maxAmount}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex gap-4 mt-1">
            <label className="w-1/2 text-gray-500">
              Valid From <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              name="validFrom"
              value={formatDateForDateSelect(productDiscount.validFrom)}
              className="border-2 border-gray-300 rounded focus:outline-none p-2 w-2/3"
              onChange={handleInputChange}
            />
          </div>

          <div className="flex gap-4 mt-1">
            <label className="w-1/2 text-gray-500">
              Valid To <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              name="validTo"
              className="border-2 border-gray-300 rounded focus:outline-none p-2 w-2/3"
              value={formatDateForDateSelect(productDiscount.validTo)}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex mt-1 gap-4">
            <label className="w-1/2 text-gray-500">
              Geofence <span className="text-red-600">*</span>
            </label>

            <Select
              options={geofenceOptions}
              value={geofenceOptions.find(
                (option) => option.value === productDiscount.geofenceId
              )}
              onChange={(option) =>
                setProductDiscount({
                  ...productDiscount,
                  geofenceId: option.value,
                })
              }
              className="rounded w-2/3 outline-none focus:outline-none"
              placeholder="Select geofence"
              isSearchable={true}
              isMulti={false}
              menuPortalTarget={document.body}
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
              }}
            />
          </div>

          <div className="flex mt-1 justify-between">
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
              type="button"
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
