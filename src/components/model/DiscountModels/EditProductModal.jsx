import { Switch, Modal } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";

const EditProductModal = ({
  isVisible,
  token,
  BASE_URL,
  merchant,
  geofence,
  currentProduct,
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
    onAddOn: null,
  });

  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // API to ftech selected discount details.

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${BASE_URL}/merchant/product-discount/get-product-discount-id/${currentProduct}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 200) {
          setProductDiscount(response.data.data);
        }
      } catch (err) {
        console.error(`Error in fetch data ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (currentProduct) {
      fetchData();
    }
  }, [currentProduct, token]);

  // API to update the Discount.

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

  const onChange = (e) => {
    setProductDiscount({ [e.target.name]: checked });
  };

  const handleInputChange = (e) => {
    setProductDiscount({ ...productDiscount, [e.target.name]: e.target.value });
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
              name="merchant"
              value={productDiscount.merchant}
              onChange={handleInputChange}
            >
              {merchant.map((data) => (
                <option value={data._id} key={data._id}>
                  {data.merchantName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex mt-5  gap-4">
            <label className="w-1/2 text-gray-500">Discount Name</label>
            <input
              type="text"
              className="border-2 border-gray-300 rounded p-2 w-2/3 focus:outline-none"
              name="discountName"
              placeholder={loading ? "Loading data..." : ""}
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
                className=" border-gray-300 mr-3 rounded ml-5 "
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

            <input
              type="search"
              className="border-2 border-gray-300 rounded p-2 w-2/3 focus:outline-none"
              name="maxAmount"

              // onChange={handleInputChange}
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
              // value={productDiscount.onAddOn}
              onChange={onChange}
              name="onAddOn"
            />
          </div>

          <div className="flex justify-end mt-5 gap-4">
            <button
              className="bg-gray-300 rounded-lg px-6 py-2 font-semibold justify-end"
              onClick={handleCancel}
              type="submit"
            >
              Cancel
            </button>
            <button
              className="bg-teal-800 rounded-lg px-6 py-2 text-white font-semibold justify-end"
              // onClick={handleOkProductEdit}
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
