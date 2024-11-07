import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import Select from "react-select";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const CommissionComponent = () => {
  const [formData, setFormData] = useState({
    commissionType: "Percentage",
    merchantId: null,
    commissionValue: "",
  });
  const [commissionDetail, setCommissionDetail] = useState({
    commissionType: "",
    commissionValue: "",
  });
  const [allMerchants, setAllMerchants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { token, role } = useContext(UserContext);
  const toast = useToast();

  useEffect(() => {
    if (role === "Admin") {
      const getAllMerchants = async () => {
        try {
          const response = await axios.get(
            `${BASE_URL}/merchants/admin/all-merchants`,
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.status === 200) {
            const { data } = response.data;
            setAllMerchants(data);
          }
        } catch (err) {
          toast({
            title: "Error",
            description: "An error occurred while getting the merchants data.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      };

      getAllMerchants();
    }
  }, [role, token, toast]);

  useEffect(() => {
    if (role === "Merchant") {
      const getCommissionDetail = async () => {
        try {
          const response = await axios.get(
            `${BASE_URL}/admin/commission/commission-detail`,
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.status === 200) {
            setCommissionDetail(response.data.data);
          }
        } catch (err) {
          toast({
            title: "Error",
            description: "An error occurred while fetching commission details.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      };

      getCommissionDetail();
    }
  }, [role, token, toast]);

  const merchantOptions = allMerchants.map((merchant) => ({
    label: merchant.merchantName,
    value: merchant._id,
  }));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleMerchantChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      merchantId: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const addResponse = await axios.post(
        `${BASE_URL}/admin/commission/add-commission`,
        formData,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (addResponse.status === 200) {
        setFormData({
          commissionType: "Fixed",
          merchantId: "",
          commissionValue: "",
        });
        toast({
          title: "Success",
          description: "Commission created successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      if (err?.response?.data?.message) {
        toast({
          title: "Error",
          description: err?.response?.data?.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex m-20 h-screen min-w-fit">
      {role === "Admin" && (
        <form className="rounded w-fit pl-[300px] mx-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-8">
            <div className="flex items-center">
              <label className="w-1/3 text-gray-600">Commission setup</label>
              <input
                type="radio"
                id="Fixed"
                name="commissionType"
                value="Fixed"
                checked={formData.commissionType === "Fixed"}
                onChange={handleInputChange}
                className="mr-2 ml-6"
              />
              <label htmlFor="Fixed" className="w-[200px] text-gray-600">
                Set fixed amount (in ₹)
              </label>
              <input
                type="radio"
                id="Percentage"
                name="commissionType"
                value="Percentage"
                checked={formData.commissionType === "Percentage"}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="Percentage" className="w-[200px] text-gray-600">
                Set a percentage (%)
              </label>
            </div>

            <div className="flex items-center">
              <label htmlFor="merchantId" className="w-1/3 text-gray-600">
                Merchant ID
              </label>
              <Select
                className="w-2/3 outline-none focus:outline-none"
                value={merchantOptions.find(
                  (option) => option.value === formData.merchantId
                )}
                isSearchable={true}
                onChange={handleMerchantChange}
                options={merchantOptions}
                placeholder="Select Merchant"
                isClearable={false}
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
                value={formData.commissionValue}
                onChange={handleInputChange}
                className="w-2/3 p-2 border border-gray-300 rounded outline-none focus:outline-none"
                placeholder="Enter value"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="w-2/3 bg-teal-700 text-white py-2 rounded outline-none focus:outline-none"
                disabled={isLoading}
              >
                {isLoading ? "Applying..." : "Apply Commission"}
              </button>
            </div>
          </div>
        </form>
      )}

      {role === "Merchant" && (
        <div className="ml-[250px] px-[30px] w-full">
          {commissionDetail?.commissionType &&
          commissionDetail?.commissionValue ? (
            <div className="shadow-md bg-white h-fit py-4 w-fit flex justify-between gap-5 rounded">
              <p className="w-[150px]">Commission value</p>
              <p className="w-[150px] text-end">
                {commissionDetail?.commissionType === "Percentage"
                  ? `${commissionDetail?.commissionValue} %`
                  : `₹${commissionDetail?.commissionValue}`}
              </p>
            </div>
          ) : (
            <div className="flex">
              <p className="text-[16px] font-[600] mx-auto mt-[50px]">
                No Commission Available
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommissionComponent;
