import { useContext, useEffect, useState } from "react";
import { Modal } from "antd";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { formatDateForDateSelect } from "../../../utils/formatter";
import { UserContext } from "../../../context/UserContext";
import Select from "react-select";

const EditDiscountModal = ({
  isVisible,
  currentDiscount,
  token,
  geofence,
  BASE_URL,
  handleCancel,
  onEditDiscount,
}) => {
  const [merchantDiscount, setMerchantDiscount] = useState({
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
  const [isTableLoading, setIsTableLoading] = useState(false);

  const toast = useToast();
  const { role } = useContext(UserContext);

  const handleDiscount = (e) => {
    setMerchantDiscount({
      ...merchantDiscount,
      [e.target.name]: e.target.value,
    });
  };

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
          setMerchantDiscount(response.data.data);
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

  const geofenceOptions = geofence?.map((geofence) => ({
    label: geofence.name,
    value: geofence._id,
  }));

  const handleDiscountSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const endPoint =
        role === "Admin"
          ? `${BASE_URL}/admin/shop-discount/edit-merchant-discount-admin/${currentDiscount}`
          : `${BASE_URL}/admin/shop-discount/edit-merchant-discount/${currentDiscount}`;

      const response = await axios.put(endPoint, merchantDiscount, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        handleCancel();
        onEditDiscount(response.data.data);
        toast({
          title: "Success",
          description: "Successfully Updated Discount",
          duration: 3000,
          status: "success",
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Error in Updating Discount",
        duration: 3000,
        status: "error",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Discount"
      open={isVisible}
      width="700px"
      centered
      onCancel={handleCancel}
      footer={null}
    >
      <form onSubmit={handleDiscountSubmit}>
        <div className="flex flex-col gap-4 pt-[30px] max-h-[30rem] overflow-auto justify-between">
          <div className="flex  gap-4">
            <label className="w-1/2 text-gray-500">
              Discount Name <span className="text-red-600">*</span>
            </label>
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
              Maximum checkout value (₹) <span className="text-red-600">*</span>
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
            <label className="w-1/2 text-gray-500">
              Max Amount <span className="text-red-600">*</span>
            </label>

            <input
              type="text"
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              name="maxDiscountValue"
              value={merchantDiscount.maxDiscountValue}
              onChange={handleDiscount}
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

          {/* <div className="flex gap-4">
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
              onChange={handleDiscount}
            />
          </div> */}

          <div className="flex gap-4 mt-1">
            <label className="w-1/2 text-gray-500">
              Valid From <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              name="validFrom"
              value={formatDateForDateSelect(merchantDiscount.validFrom)}
              className="border-2 border-gray-300 rounded outline-none focus:outline-none p-2 w-2/3"
              onChange={handleDiscount}
            />
          </div>

          <div className="flex gap-4 mt-1">
            <label className="w-1/2 text-gray-500">
              Valid To <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              name="validTo"
              className="border-2 border-gray-300 rounded outline-none focus:outline-none p-2 w-2/3"
              value={formatDateForDateSelect(merchantDiscount.validTo)}
              onChange={handleDiscount}
            />
          </div>

          <div className="flex gap-4">
            <label className="w-1/2 text-gray-500">
              Geofence <span className="text-red-600">*</span>
            </label>

            <Select
              options={geofenceOptions}
              value={geofenceOptions.find(
                (option) => option.value === merchantDiscount.geofenceId
              )}
              onChange={(option) =>
                setMerchantDiscount({
                  ...merchantDiscount,
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
