import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { Switch } from "antd";
import { BellOutlined, SearchOutlined } from "@ant-design/icons";
import { RiEqualFill } from "react-icons/ri";
import CurrencyRupeeOutlined from "@mui/icons-material/CurrencyRupeeOutlined";
import GlobalSearch from "../../../components/GlobalSearch";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import GIFLoader from "../../../components/GIFLoader";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const LoyalityPoint = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { token, role } = useContext(UserContext);
  const navigate = useNavigate();
  const toast = useToast();
  const [loyaltyData, setLoyaltyData] = useState({
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

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${BASE_URL}/admin/loyalty-point`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setLoyaltyData(response.data.data);
          console.log(response.data.data);
        }
      } catch (err) {
        console.error(`Error in fetching data: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [token, role, navigate]);

  const handleInputChange = (e) => {
    setLoyaltyData({ ...loyaltyData, [e.target.name]: e.target.value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("loyaltyData", loyaltyData);
      const updateResponse = await axios.post(
        `${BASE_URL}/admin/loyalty-point/add-loyalty-point`,
        loyaltyData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (updateResponse.status === 201) {
        console.log("update data", updateResponse.data.message);
        toast({
          title: "Success",
          description: "Updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(`Error in fetching data: ${err}`);
    }
    console.log(loyaltyData);
  };

  const handleCancel = () => {
    setLoyaltyData({
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

  // Updated status function

  const onChange = async (name, checked) => {
    setLoyaltyData({ ...loyaltyData, [name]: checked });
    try {
      const statusResponse = await axios.patch(
        `${BASE_URL}/admin/loyalty-point`,
        {},
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (statusResponse.status == 200) {
        setLoyaltyData(statusResponse.data.data);
      }
    } catch {
      console.error(`Error in fetching data: ${err}`);
    }
  };

  return (
    <div>
      {isLoading ? (
        <GIFLoader />
      ) : (
        <>
          <Sidebar />
          <div className="w-fit min-h-screen pl-[300px] bg-gray-100 flex flex-col">
            <nav className="p-5">
              <GlobalSearch />
            </nav>
            <div className="flex items-center justify-between mx-10 mt-5">
              <h1 className="text-xl font-semibold">Loyality Point</h1>
              <Switch
                onChange={(checked) => onChange("status", checked)}
                name="status"
                checked={loyaltyData?.status || false}
              />
            </div>
            <p className="mt-5 mx-10 text-[17px] text-gray-500">
              Loyalty points are a bonus incentive scheme used to keep customers
              dedicated to your platform. Here you can define a variety of
              things like the earning criteria, the redemption criteria, the
              expiry time of points, maximum earning points, minimum order
              amount above which loyalty points can be applied and many more.
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

                    <button className=" text-black rounded-md">
                      <CurrencyRupeeOutlined />
                    </button>
                    <input
                      className="border-2 border-gray-300 rounded p-2 pl-8  outline-none focus:outline-none w-[25rem] "
                      type="text"
                      value={loyaltyData?.earningCriteriaRupee}
                      id="earningCriteriaRupee"
                      name="earningCriteriaRupee"
                      onChange={handleInputChange}
                    />

                    <RiEqualFill className="mx-2" />

                    <input
                      className="border-2 border-gray-300 rounded p-2 outline-none focus:outline-none w-[25rem]"
                      type="text"
                      value={loyaltyData?.earningCriteriaPoint}
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
                      value={loyaltyData?.minOrderAmountForEarning}
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
                      value={loyaltyData?.maxEarningPoint}
                      id="maxEarningPoint"
                      name="maxEarningPoint"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="expiryDuration"
                    >
                      Expiry Duration Days *
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 outline-none focus:outline-none w-2/3 "
                      type="text"
                      value={loyaltyData?.expiryDuration}
                      id="expiryDuration"
                      name="expiryDuration"
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="flex items-center relative">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="redemptionCriteriaPoint"
                    >
                      Redemption Criteria *
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 mr-[10px] outline-none focus:outline-none w-[25rem] "
                      type="text"
                      value={loyaltyData?.redemptionCriteriaPoint}
                      id="redemptionCriteriaPoint"
                      name="redemptionCriteriaPoint"
                      onChange={handleInputChange}
                    />
                    points <RiEqualFill className="mx-3" />
                    <button className="ms-3 text-black rounded-md">
                      <CurrencyRupeeOutlined />
                    </button>
                    <input
                      className="border-2 border-gray-300 rounded p-2 pl-8 outline-none focus:outline-none w-[25rem] "
                      type="text"
                      value={loyaltyData?.redemptionCriteriaRupee}
                      id="redemptionCriteriaRupee"
                      name="redemptionCriteriaRupee"
                      onChange={handleInputChange}
                    />
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
                      value={loyaltyData?.minOrderAmountForRedemption}
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
                      value={loyaltyData?.minLoyaltyPointForRedemption}
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
                      value={loyaltyData?.maxRedemptionAmountPercentage}
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
      )}
    </div>
  );
};

export default LoyalityPoint;
