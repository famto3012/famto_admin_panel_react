import { useContext, useEffect, useState } from "react";
import { Switch } from "antd";
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
  const [isConfirming, setIsConfirming] = useState(false);

  const { token, role } = useContext(UserContext);
  const navigate = useNavigate();
  const toast = useToast();

  const [loyaltyData, setLoyaltyData] = useState({
    earningCriteriaRupee: "",
    earningCriteriaPoint: "",
    minOrderAmountForEarning: "",
    maxEarningPointPerOrder: "",
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

        if (response.status === 200) setLoyaltyData(response.data.data);
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

  const handleUpdateLoyalty = async (e) => {
    e.preventDefault();
    try {
      setIsConfirming(true);

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
        toast({
          title: "Success",
          description: "Updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Error in updating loyalty criteria",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsConfirming(false);
    }
  };

  const handleCancel = () => {
    setLoyaltyData({
      earningCriteriaRupee: "",
      earningCriteriaPoint: "",
      minOrderAmountForEarning: "",
      maxEarningPointPerOrder: "",
      expiryDuration: "",
      redemptionCriteriaPoint: "",
      redemptionCriteriaRupee: "",
      minOrderAmountForRedemption: "",
      minLoyaltyPointForRedemption: "",
      maxRedemptionAmountPercentage: "",
    });
  };

  const changeStatus = async () => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/admin/loyalty-point`,
        {},
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status == 200) {
        setLoyaltyData({
          ...loyaltyData,
          status: response.data.data,
        });

        toast({
          title: "Success",
          description: "Status updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Error in updating status",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <div>
      {isLoading ? (
        <GIFLoader />
      ) : (
        <>
          <div className="w-fit min-h-screen pl-[300px] bg-gray-100 flex flex-col">
            <nav className="p-5">
              <GlobalSearch />
            </nav>
            <div className="flex items-center justify-between mx-10 mt-5">
              <h1 className="text-xl font-semibold">Loyality Point</h1>
              <Switch
                onChange={changeStatus}
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
              <form onSubmit={handleUpdateLoyalty}>
                <div className="flex flex-col gap-6">
                  <div className="flex items-center relative">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="earningCriteriaRupee"
                    >
                      Earning Criteria
                      <span className="text-red-600 ml-2">*</span>
                    </label>

                    <span className=" text-black rounded-md me-[5px]">
                      <CurrencyRupeeOutlined />
                    </span>
                    <input
                      className="border-2 border-gray-300 rounded p-2 pl-3  outline-none focus:outline-none w-[32%] "
                      type="text"
                      value={loyaltyData?.earningCriteriaRupee}
                      id="earningCriteriaRupee"
                      name="earningCriteriaRupee"
                      onChange={handleInputChange}
                    />

                    <span className="mx-2 font-bold">=</span>

                    <input
                      className="border-2 border-gray-300 rounded p-2 pl-3 outline-none focus:outline-none w-[32%]"
                      type="text"
                      value={loyaltyData?.earningCriteriaPoint}
                      id="earningCriteriaPoint"
                      name="earningCriteriaPoint"
                      onChange={handleInputChange}
                    />
                    <span className="ml-3 font-bold">points</span>
                  </div>
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="minOrderAmountForEarning"
                    >
                      Minimum Order Amount for Earning
                      <span className="text-red-600 ml-2">*</span>
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 pl-3 outline-none focus:outline-none w-2/3"
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
                      htmlFor="maxEarningPointPerOrder"
                    >
                      Maximum Earning Points
                      <span className="text-red-600 ml-2">*</span>
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 pl-3 outline-none focus:outline-none w-2/3 "
                      type="text"
                      value={loyaltyData?.maxEarningPointPerOrder}
                      id="maxEarningPointPerOrder"
                      name="maxEarningPointPerOrder"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex items-center">
                    <label
                      className="w-1/3 text-gray-500"
                      htmlFor="expiryDuration"
                    >
                      Expiry Duration Days
                      <span className="text-red-600 ml-2">*</span>
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 pl-3 outline-none focus:outline-none w-2/3 "
                      type="text"
                      value={loyaltyData?.expiryDuration}
                      id="expiryDuration"
                      name="expiryDuration"
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="flex items-center relative">
                    <label
                      className="w-full sm:w-1/2 lg:w-1/3 text-gray-500 lg:mr-[40px] xl:mr-0"
                      htmlFor="redemptionCriteriaPoint"
                    >
                      Redemption Criteria
                      <span className="text-red-600 ml-2">*</span>
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 pl-3 outline-none focus:outline-none w-[27%] "
                      type="text"
                      value={loyaltyData?.redemptionCriteriaPoint}
                      id="redemptionCriteriaPoint"
                      name="redemptionCriteriaPoint"
                      onChange={handleInputChange}
                    />
                    <span className="ml-3 font-bold">points</span>
                    <span className="ml-3 mr-3 font-bold">=</span>
                    <span className=" text-black rounded-md me-4">
                      <CurrencyRupeeOutlined />
                    </span>
                    <input
                      className="border-2 border-gray-300 rounded p-2 pl-3 outline-none focus:outline-none w-[27%] "
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
                      Minimum Order Amount for Redemption
                      <span className="text-red-600 ml-2">*</span>
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 pl-3 outline-none focus:outline-none w-full md:w-2/3"
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
                      Minimum Loyalty Point for Redemption
                      <span className="text-red-600 ml-2">*</span>
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 pl-3 outline-none focus:outline-none w-full md:w-2/3"
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
                      Maximum Redemption Amount Percentage
                      <span className="text-red-600 ml-2">*</span>
                    </label>
                    <input
                      className="border-2 border-gray-300 rounded p-2 pl-3 outline-none focus:outline-none w-full md:w-2/3"
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
                      {isConfirming ? `Saving...` : `Save`}
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
