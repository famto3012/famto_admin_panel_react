import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { Switch } from "antd";
import { BellOutlined, SearchOutlined } from "@ant-design/icons";
import { RiEqualFill } from "react-icons/ri";
import CurrencyRupeeOutlined from "@mui/icons-material/CurrencyRupeeOutlined";
import GlobalSearch from "../../../components/GlobalSearch";

const LoyalityPoint = () => {
  const [loyalityData, setLoyalityData] = useState({
    earningCriteriaRupee: "",
    earningCriteriaPoint: "",
    minOrderAmountForEarning: "",
    maxEarningPoint: "",
    expiryDuration: "",
    redemptionCriteriaPoint: "",
    redemptionCriteriaRupee: "",
    minOrderAmountForRedemption: "",
    minLoyaltyPointForRedemption: "",
    maxRedemptionAmountPercentage: "",
  });

  const handleInputChange = (e) => {
    setLoyalityData({ ...loyalityData, [e.target.name]: e.target.value });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    console.log(loyalityData);
  };

  const handleCancel = () => {
    setLoyalityData({
      earningCriteriaRupee: "",
      earningCriteriaPoint: "",
      minOrderAmountForEarning: "",
      maxEarningPoint: "",
      expiryDuration: "",
      redemptionCriteriaPoint: "",
      redemptionCriteriaRupee: "",
      minOrderAmountForRedemption: "",
      minLoyaltyPointForRedemption: "",
      maxRedemptionAmountPercentage: "",
    });
  };

  return (
    <>
      <Sidebar />
      <div className="w-fit min-h-screen pl-[300px] bg-gray-100 flex flex-col">
      <nav className="p-5">
          <GlobalSearch />
        </nav>
        <div className="flex items-center justify-between mx-10 mt-5">
          <h1 className="text-xl font-semibold">Loyality Point</h1>
          <Switch />
        </div>
        <p className="mt-5 mx-10 text-[17px] text-gray-500">
          Loyalty points are a bonus incentive scheme used to keep customers
          dedicated to your platform. Here you can define a variety of things
          like the earning criteria, the redemption criteria, the expiry time of
          points, maximum earning points, minimum order amount above which
          loyalty points can be applied and many more.
        </p>
        <div className="bg-white p-10 rounded-lg mx-11 mt-7">
          <form onSubmit={formSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex items-center relative">
                <label
                  className="w-1/3 text-gray-500"
                  htmlFor="earningCriteriaRupee"
                >
                  Earning Criteria *
                </label>

                <input
                  className="border-2 border-gray-300 rounded p-2 pl-8 ml-[80px] outline-none focus:outline-none w-[25rem] "
                  type="text"
                  value={loyalityData.earningCriteriaRupee}
                  id="earningCriteriaRupee"
                  name="earningCriteriaRupee"
                  onChange={handleInputChange}
                />
                <button className="absolute inset-y-0 left-80 ms-10 text-black rounded-md">
                  <CurrencyRupeeOutlined />
                </button>

                <RiEqualFill className="mx-2" />

                <input
                  className="border-2 border-gray-300 rounded p-2 outline-none focus:outline-none w-[25rem]"
                  type="text"
                  value={loyalityData.earningCriteriaPoint}
                  id="earningCriteriaPoint"
                  name="earningCriteriaPoint"
                  onChange={handleInputChange}
                />
                <span className="ml-2">points</span>
              </div>
              <div className="flex items-center">
                <label
                  className="w-1/3 text-gray-500"
                  htmlFor="minOrderAmountForEarning"
                >
                  Minimum Order Amount for Earning *
                </label>
                <input
                  className="border-2 border-gray-300 rounded p-2 outline-none focus:outline-none w-2/3"
                  type="text"
                  value={loyalityData.minOrderAmountForEarning}
                  id="minOrderAmountForEarning"
                  name="minOrderAmountForEarning"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center">
                <label
                  className="w-1/3 text-gray-500"
                  htmlFor="maxEarningPoint"
                >
                  Maximum Earning Points *
                </label>
                <input
                  className="border-2 border-gray-300 rounded p-2 outline-none focus:outline-none w-2/3 "
                  type="text"
                  value={loyalityData.maxEarningPoint}
                  id="maxEarningPoint"
                  name="maxEarningPoint"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center">
                <label className="w-1/3 text-gray-500" htmlFor="expiryDuration">
                  Expiry Duration Days *
                </label>
                <input
                  className="border-2 border-gray-300 rounded p-2 outline-none focus:outline-none w-2/3 "
                  type="text"
                  value={loyalityData.expiryDuration}
                  id="expiryDuration"
                  name="expiryDuration"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-row">
                <div className="flex items-center relative">
                  <label
                    className="w-1/3 text-gray-500"
                    htmlFor="redemptionCriteriaPoint"
                  >
                    Redemption Criteria *
                  </label>
                  <input
                    className="border-2 border-gray-300 rounded p-2 ml-[85px] mr-[10px] outline-none focus:outline-none w-[25rem] "
                    type="text"
                    value={loyalityData.redemptionCriteriaPoint}
                    id="redemptionCriteriaPoint"
                    name="redemptionCriteriaPoint"
                    onChange={handleInputChange}
                  />
                  points <RiEqualFill className="mx-3" />
                  <button className="absolute inset-y-0 right-60 me-11 text-black rounded-md">
                    <CurrencyRupeeOutlined />
                  </button>
                  <input
                    className="border-2 border-gray-300 rounded p-2 pl-8 outline-none focus:outline-none w-[25rem] "
                    type="text"
                    value={loyalityData.redemptionCriteriaRupee}
                    id="redemptionCriteriaRupee"
                    name="redemptionCriteriaRupee"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="flex items-center">
                <label
                  className="w-1/3 text-gray-500"
                  htmlFor="minOrderAmountForRedemption"
                >
                  Minimum Order Amount for Redemption *
                </label>
                <input
                  className="border-2 border-gray-300 rounded p-2 outline-none focus:outline-none w-full md:w-2/3"
                  type="text"
                  value={loyalityData.minOrderAmountForRedemption}
                  id="minOrderAmountForRedemption"
                  name="minOrderAmountForRedemption"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center">
                <label
                  className="w-1/3 text-gray-500"
                  htmlFor="minLoyaltyPointForRedemption"
                >
                  Minimum Loyalty Point for Redemption *
                </label>
                <input
                  className="border-2 border-gray-300 rounded p-2 outline-none focus:outline-none w-full md:w-2/3"
                  type="text"
                  value={loyalityData.minLoyaltyPointForRedemption}
                  id="minLoyaltyPointForRedemption"
                  name="minLoyaltyPointForRedemption"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center">
                <label
                  className="w-1/3 text-gray-500"
                  htmlFor="maxRedemptionAmountPercentage"
                >
                  Maximum Redemption Amount Percentage *
                </label>
                <input
                  className="border-2 border-gray-300 rounded p-2 outline-none focus:outline-none w-full md:w-2/3"
                  type="text"
                  value={loyalityData.maxRedemptionAmountPercentage}
                  id="maxRedemptionAmountPercentage"
                  name="maxRedemptionAmountPercentage"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  className="bg-cyan-50 py-2 px-8 rounded-md outline-none focus:outline-none"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className="bg-teal-700 text-white py-2 px-10 rounded-md outline-none focus:outline-none"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoyalityPoint;
