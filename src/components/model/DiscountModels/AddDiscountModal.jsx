import React, { useState } from "react";
import { Modal, Switch } from "antd";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const AddDiscountModal = ({
    isVisible,
    selectedMerchant,
    token,
    merchant,
    BASE_URL,
    role,
    geofence,
    handleCancel,
}) => {
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

    // API for add discount..

    const handleDiscountSubmit = async (e) => {
        e.preventDefault();

        if (role === "Admin") {
            try {
                setIsLoading(true);

                const response = await axios.post(
                    `${BASE_URL}/admin/shop-discount/add-merchant-discount-admin`,
                    merchantDiscount,
                    {
                        withCredentials: true,
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                    }
                );
                if (response.status === 201) {
                    handleCancel();
                    toast({
                        title: "Merchant Discount Added",
                        description: "Successfully added Merchant Discount",
                        status: "success",
                        isClosable: true,
                        duration: 9000,
                    });
                }
            } catch (err) {
                console.error(`Error in adding discount ${err.message}`);
                handleCancel();
                toast({
                    title: "Merchant Discount Failed",
                    description: "Error in adding Merchant Discount",
                    status: "error",
                    isClosable: true,
                    duration: 9000,
                })
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleDiscount = (e) => {
        setMerchantDiscount({
            ...merchantDiscount,
            [e.target.name]: e.target.value,
        });
    };

    console.log("id", selectedMerchant);
    console.log("merchant", geofence);
    console.log("LAST", merchantDiscount);

    return (
        <Modal
            title="Add Discount"
            width="700px"
            open={isVisible}
            // onOk={handleOk}
            centered
            onCancel={handleCancel}
            footer={null} // Custom footer to include form buttons
        >
            <form>
                <div className="flex flex-col  gap-4 max-h-[30rem] overflow-auto justify-between">
                    <div className="flex gap-4">
                        <label className="w-1/2 text-gray-500">Assign Merchant</label>
                        <select
                            className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
                            name="merchantId"
                            id="merchantId"
                            value={merchantDiscount.merchantId}
                            onChange={handleDiscount}
                        >
                            <option hidden defaultValue="Select Merchant">
                                Select Merchant
                            </option>
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
                        <label className="w-1/2 text-gray-500">
                            Max Amount
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
                            className=" border-gray-300 rounded  "
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
                            onClick={handleDiscountSubmit}
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
