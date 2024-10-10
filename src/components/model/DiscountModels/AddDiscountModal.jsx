import { useContext, useEffect, useState } from "react";
import { Modal } from "antd";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { UserContext } from "../../../context/UserContext";

const AddDiscountModal = ({
  isVisible,
  token,
  geofence,
  selectedMerchant,
  BASE_URL,
  handleCancel,
  onDiscountAdd,
}) => {
  const { role, userId } = useContext(UserContext);

  const [merchantDiscount, setMerchantDiscount] = useState({
    merchantId: "",
    discountName: "",
    maxCheckoutValue: "",
    maxDiscountValue: "",
    discountType: "",
    discountValue: "",
    description: "",
    validFrom: "",
    validTo: "",
    geofenceId: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  useEffect(() => {
    if (role === "Admin" && selectedMerchant) {
      setMerchantDiscount((prev) => ({
        ...prev,
        merchantId: selectedMerchant.merchantId,
      }));
    } else if (role === "Merchant") {
      setMerchantDiscount((prev) => ({
        ...prev,
        merchantId: userId,
      }));
    }
  }, [selectedMerchant, role]);

  const handleInputChange = (e) => {
    setMerchantDiscount({
      ...merchantDiscount,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddDiscount = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const endPoint =
        role === "Admin"
          ? `${BASE_URL}/admin/shop-discount/add-merchant-discount-admin`
          : ` ${BASE_URL}/merchant/shop-discount/add-merchant-discount`;

      const response = await axios.post(endPoint, merchantDiscount, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        setMerchantDiscount({
          merchantId: "",
          discountName: "",
          maxCheckoutValue: "",
          maxDiscountValue: "",
          discountType: "",
          discountValue: "",
          description: "",
          validFrom: "",
          validTo: "",
          geofenceId: "",
        });
        handleCancel();
        onDiscountAdd(response.data.data);
        toast({
          title: "Success",
          description: "Successfully added Merchant Discount",
          status: "success",
          isClosable: true,
          duration: 3000,
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Error in adding Merchant Discount",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Add Discount"
      width="700px"
      open={isVisible}
      centered
      onCancel={handleCancel}
      footer={null}
    >
      <form>
        <div className="flex flex-col gap-4 pt-[30px] max-h-[30rem] overflow-auto justify-between">
          {role === "Admin" && (
            <div className="flex gap-4 ">
              <label className="w-1/2 text-gray-500">
                Assign Merchant <span className="text-red-600">*</span>
              </label>

              <input
                type="text"
                value={selectedMerchant.merchantName}
                readOnly
                className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              />
            </div>
          )}

          <div className="flex gap-4">
            <label className="w-1/2 text-gray-500">
              Discount Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              name="discountName"
              value={merchantDiscount.discountName}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex gap-4">
            <label className="w-1/2 text-gray-500">
              Maximum checkout value (₹) <span className="text-red-600">*</span>
            </label>

            <input
              type="text"
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              name="maxCheckoutValue"
              value={merchantDiscount.maxCheckoutValue}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex gap-4">
            <label className="w-1/2 text-gray-500">
              Max Amount <span className="text-red-600">*</span>
            </label>

            <input
              type="number"
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              name="maxDiscountValue"
              value={merchantDiscount.maxDiscountValue}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex gap-4">
            <label className="w-1/2 text-gray-500">
              Discount <span className="text-red-600">*</span>
            </label>
            <input
              type="radio"
              className="border-2 -ml-14 border-gray-300 rounded outline-none focus:outline-none"
              name="discountType"
              value="Flat-discount"
              checked={merchantDiscount.discountType === "Flat-discount"}
              onChange={handleInputChange}
            />
            Fixed-discount
            <input
              type="radio"
              className=" border-gray-300 rounded  "
              name="discountType"
              value="Percentage-discount"
              checked={merchantDiscount.discountType === "Percentage-discount"}
              onChange={handleInputChange}
            />
            Percentage-discount
          </div>
          <div className="ml-72 w-[300px]">
            <input
              type="text"
              className="border-2 border-gray-300 rounded p-2 w-[360px] outline-none focus:outline-none"
              name="discountValue"
              value={merchantDiscount.discountValue}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex gap-4">
            <label className="w-1/2 text-gray-500">
              Description Maximum 150 Characters{" "}
              <span className="text-red-600">*</span>
            </label>

            <input
              type="text"
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              name="description"
              maxLength={150}
              value={merchantDiscount.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex gap-4 mt-5">
            <label className="w-1/2 text-gray-500">
              From <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              name="validFrom"
              value={merchantDiscount.validFrom}
              className="border-2 border-gray-300 rounded outline-none focus:outline-none p-2 w-2/3"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex gap-4 mt-5">
            <label className="w-1/2 text-gray-500">
              To <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              name="validTo"
              className="border-2 border-gray-300 rounded outline-none focus:outline-none p-2 w-2/3"
              value={merchantDiscount.validTo}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex gap-4">
            <label className="w-1/2 text-gray-500">
              GeoFence <span className="text-red-600">*</span>
            </label>
            <select
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              name="geofenceId"
              value={merchantDiscount.geofenceId}
              onChange={handleInputChange}
            >
              <option defaultValue={"select geofence"} hidden>
                Select Geofence
              </option>
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
              onClick={handleAddDiscount}
              type="submit"
            >
              {isLoading ? "Adding..." : "Add"}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddDiscountModal;
