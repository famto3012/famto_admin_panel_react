import React, { useState } from "react";

const CommissionComponent = () => {
  const [isForm, setIsForm] = useState({
    merchantId: "",
    commissionValue: "",
  });
  const [commissionType, setCommissionType] = useState("fixed");

  const handleInputChange = (e) => {
    setIsForm({ ...isForm, [e.target.name]: e.target.value });
  };

  const handleTypeChange = (e) => {
    setCommissionType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { merchantId, commissionValue } = isForm;
    const payload = { merchantId, commissionValue, commissionType };
    console.log("Confirmed Payload", payload);
    // Add your form submission logic here
  };

  return (
    <div className="flex m-20 h-screen min-w-fit">
      <form className=" rounded w-fit pl-[300px] mx-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-8 ">
          <div className="flex items-center">
            <label className=" w-1/3 text-gray-600">Commission setup</label>
            <input
              type="radio"
              id="fixed"
              name="commissionType"
              value="fixed"
              checked={commissionType === "fixed"}
              onChange={handleTypeChange}
              className="mr-2 ml-6"
            />
            <label htmlFor="fixed" className="w-[200px] text-gray-600">
              Set fixed amount (in₹)
            </label>
            <input
              type="radio"
              id="percentage"
              name="commissionType"
              value="percentage"
              checked={commissionType === "percentage"}
              onChange={handleTypeChange}
              className="mr-2"
            />
            <label htmlFor="percentage" className="w-[200px] text-gray-600">
              Set a percentage (%)
            </label>
          </div>

          <div className="flex items-center">
            <label htmlFor="merchantId" className="w-1/3 text-gray-600">
              Merchant ID
            </label>
            <input
              type="text"
              id="merchantId"
              name="merchantId"
              value={isForm.merchantId}
              onChange={handleInputChange}
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              placeholder="Lorem Ipsum"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="commissionValue" className="w-1/3 text-gray-600">
              Commission Value
            </label>
            <input
              type="text"
              id="commissionValue"
              name="commissionValue"
              value={isForm.commissionValue}
              onChange={handleInputChange}
              className="w-2/3 p-2 border border-gray-300 rounded outline-none focus:outline-none"
              placeholder="Lorem Ipsum"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="w-2/3  bg-teal-700 text-white py-2 rounded outline-none focus:outline-none"
            >
              Apply Commission
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommissionComponent;
