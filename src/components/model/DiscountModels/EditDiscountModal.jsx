import React, { useEffect, useState } from "react";
import { Modal, Switch } from "antd";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const EditDiscountModal = (
  {
    isVisible,
    currentDiscount,
    token,
    merchant,
    geofence,
    BASE_URL,
    handleCancel,
    onEditDiscount
  }
) => {
  const [merchantDiscount, setMerchantDiscount] = useState({
    merchant: "",
    discountName: "",
    maxCheckoutValue: "",
    discountType: "",
    discountValue: "",
    description: "",
    validFrom: "",
    validTo: "",
    geofenceId: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [isTableLoading, setIsTableLoading] = useState(false);

  const handleDiscount = (e) => {
    setMerchantDiscount({
      ...merchantDiscount,
      [e.target.name]: e.target.value,
    });
  };

  // API to ftech selected discount details.

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsTableLoading(true);

        const response = await axios.get(
          `${BASE_URL}/merchant/shop-discount/get-merchant-discount-id/${currentDiscount}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 200) {
          const discountData = response.data.data;
          // Format the date fields
          discountData.validFrom = formatDate(discountData.validFrom);
          discountData.validTo = formatDate(discountData.validTo);

          setMerchantDiscount(discountData);
        }
      } catch (err) {
        console.error(`Error in fetch data ${err.message}`);
      } finally {
        setIsTableLoading(false);
      }
    };

    if (currentDiscount) {
      fetchData();
    }
  }, [currentDiscount, token]);

  // API to update the Discount.

  const handleDiscountSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const response = await axios.put(
        `${BASE_URL}/admin/shop-discount/edit-merchant-discount-admin/${currentDiscount}`,
        merchantDiscount,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        handleCancel();
        onEditDiscount(response.data.data);
        toast({
          title: "Discount Updated",
          description: "Successfully Updated Discount",
          duration: 9000,
          status: "success",
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(`Error in updating data ${err.message}`);
      toast({
        title: "Error in updating",
        description: "Error in Updating Discount",
        duration: 9000,
        status: "error",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
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
      title="Edit Discount Tax"
      open={isVisible}
      // onOk={handleOkEdit}
      width="700px"
      centered
      onCancel={handleCancel}
      footer={null} // Custom footer to include form buttons
    >
      <form onSubmit={handleDiscountSubmit}>
        <div className="flex flex-col  gap-4 max-h-[30rem] overflow-auto justify-between">
          <div className="flex gap-4">
            <label className="w-1/2 text-gray-500">Assign Merchant</label>
            <select
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              name="merchant"
              value={merchantDiscount.merchant}
              onChange={handleDiscount}
            >
              {merchant.map((data) => (
                <option value={data._id} key={data._id}>
                  {data.merchantName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex  gap-4">
            <label className="w-1/2 text-gray-500">Discount Name</label>
            <input
              type="text"
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              name="discountName"
              placeholder={isTableLoading ? "Loading data..." : ""}
              value={merchantDiscount.discountName}
              onChange={handleDiscount}
            />
          </div>
          <div className="flex gap-4">
            <label className="w-1/2 text-gray-500">
              Maximum checkout value (₹)
            </label>

            <input
              type="text"
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              name="maxCheckoutValue"
              value={merchantDiscount.maxCheckoutValue}
              onChange={handleDiscount}
            />
          </div>
          <div className="flex gap-4">
            <label className="w-1/2 text-gray-500">Max Amount</label>

            <input
              type="text"
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              name="maxDiscountValue"
              value={merchantDiscount.maxDiscountValue}
              onChange={handleDiscount}
            />
          </div>
          <div className="flex gap-4">
            <label className="w-1/2 text-gray-500">Discount</label>
            <input
              type="radio"
              className="border-2 -ml-14 border-gray-300 rounded outline-none focus:outline-none"
              name="discountType"
              value="Fixed-discount"
              checked={merchantDiscount.discountType === "Fixed-discount"}
              onChange={handleDiscount}
            />
            Fixed-discount
            <input
              type="radio"
              className=" border-gray-300 rounded  outline-none focus:outline-none"
              name="discountType"
              value="Percentage-discount"
              checked={merchantDiscount.discountType === "Percentage-discount"}
              onChange={handleDiscount}
            />
            Percentage-discount
          </div>
          <div className="ml-72 w-[300px]">
            <input
              type="text"
              className="border-2 border-gray-300 rounded p-2 w-[360px] outline-none focus:outline-none"
              name="discountValue"
              value={merchantDiscount.discountValue}
              onChange={handleDiscount}
            />
          </div>
          <div className="flex gap-4">
            <label className="w-1/2 text-gray-500">
              Description Maximum 150 Characters
            </label>

            <input
              type="text"
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              name="description"
              maxLength={150}
              value={merchantDiscount.description}
              onChange={handleDiscount}
            />
          </div>
          <div className="flex gap-4 mt-5">
            <label className="w-1/2 text-gray-500">From</label>
            <input
              type="date"
              name="validFrom"
              value={merchantDiscount.validFrom}
              className="border-2 border-gray-300 rounded outline-none focus:outline-none p-2 w-2/3"
              onChange={handleDiscount}
            />
          </div>
          <div className="flex gap-4 mt-5">
            <label className="w-1/2 text-gray-500">To</label>
            <input
              type="date"
              name="validTo"
              className="border-2 border-gray-300 rounded outline-none focus:outline-none p-2 w-2/3"
              value={merchantDiscount.validTo}
              onChange={handleDiscount}
            />
          </div>
          <div className="flex gap-4">
            <label className="w-1/2 text-gray-500">geoFence</label>
            <select
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              name="geofenceId"
              value={merchantDiscount.geofenceId}
              onChange={handleDiscount}
            >
              {geofence.map((data) => (
                <option value={data._id} key={data._id}>
                  {data.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end  gap-4">
            <button
              className="bg-gray-300 rounded-lg px-6 py-2 font-semibold justify-end"
              onClick={handleCancel}
              type="submit"
            >
              Cancel
            </button>
            <button
              className="bg-teal-800 rounded-lg px-6 py-2 text-white font-semibold justify-end"
              // onClick={handleOkEdit}
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

export default EditDiscountModal;
