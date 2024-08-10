import { useContext, useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { Switch } from "antd";
import { useToast } from "@chakra-ui/react";

import BlockIcon from "@mui/icons-material/Block";

import { UserContext } from "../../../context/UserContext";

import Sidebar from "../../../components/Sidebar";
import GlobalSearch from "../../../components/GlobalSearch";

import SponsorshipDetail from "../../../components/Merchant/SponsorshipDetail";
import MerchantData from "../../../components/Merchant/MerchantData";
import MerchantDocuments from "../../../components/Merchant/MerchantDocuments";
import ConfigureMerchant from "../../../components/Merchant/ConfigureMerchant";
import MerchantAvailability from "../../../components/Merchant/MerchantAvailability";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const MerchantDetails = () => {
  const [merchantData, setMerchantData] = useState({});
  const [allGeofence, setAllGeofence] = useState([]);
  const [allBusinessCategory, setBusinessCategory] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { token, role } = useContext(UserContext);
  const { merchantId } = useParams();
  const toast = useToast();

  useEffect(() => {
    if (!token || role !== "Admin") {
      navigate("/auth/login");
    }

    const getMerchantData = async () => {
      try {
        const [merchantResponse, geofenceResponse, businessCategoryResponse] =
          await Promise.all([
            axios.get(`${BASE_URL}/merchants/admin/${merchantId}`, {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
            axios.get(`${BASE_URL}/admin/geofence/get-geofence`, {
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(
              `${BASE_URL}/admin/business-categories/get-all-business-category`,
              {
                withCredentials: true,
                headers: { Authorization: `Bearer ${token}` },
              }
            ),
          ]);

        if (merchantResponse.status === 200) {
          setMerchantData(merchantResponse.data.data);
        }
        if (geofenceResponse.status === 200) {
          setAllGeofence(geofenceResponse.data.geofences);
        }
        if (businessCategoryResponse.status === 200) {
          setBusinessCategory(businessCategoryResponse.data.data);
        }
      } catch (err) {
        console.log(`Error in getting merchant data: ${err}`);
        toast({
          title: "Error",
          description: `Error in getting merchant data`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    getMerchantData();
  }, [merchantId, token, role]);

  // Callback function to handle changes from the child component
  const handleMerchantDataChange = (updatedData) => {
    setMerchantData((prevData) => ({
      ...prevData,
      ...updatedData,
    }));
  };

  const handleSaveMerchant = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      console.log(merchantData);

      const formData = new FormData();

      function appendFormData(data, rootKey = "") {
        if (data instanceof File) {
          formData.append(rootKey, data);
        } else if (
          typeof data === "object" &&
          !Array.isArray(data) &&
          data !== null
        ) {
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              appendFormData(data[key], rootKey ? `${rootKey}[${key}]` : key);
            }
          }
        } else if (Array.isArray(data)) {
          data.forEach((item, index) => {
            appendFormData(item, `${rootKey}[${index}]`);
          });
        } else {
          formData.append(rootKey, data);
        }
      }

      // Assuming merchantData is your data object that you want to send
      appendFormData(merchantData);

      const response = await axios.put(
        `${BASE_URL}/merchants/admin/update-merchant-details/${merchantId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Merchant details updated successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error updating merchant details:", error);
      toast({
        title: "Error",
        description: "Failed to update merchant details.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Sidebar />

      <main className="p-6 bg-gray-100 pl-[300px] h-full">
        <GlobalSearch />
        <div className="flex justify-between my-[15px] mt-8 mb-8">
          <h3 className="font-[600] text-[18px] ms-3">Merchant name</h3>
          <div>
            <Link className="bg-yellow-100 py-2 px-5 mr-5 rounded-xl ">
              <BlockIcon className="h-5 w-5 text-red-600" /> Block
            </Link>
            Status
            <Switch
              value={merchantData?.status}
              className="text-teal-700 ml-2"
              onChange={(e) => {
                setMerchantData({
                  ...merchantData,
                  status: !merchantData?.status,
                });
              }}
            />
          </div>
        </div>

        <form
          className="bg-white rounded-lg ms-3 p-5 w-full overflow-auto"
          onSubmit={handleSaveMerchant}
        >
          <MerchantData
            detail={merchantData}
            allGeofence={allGeofence}
            BASE_URL={BASE_URL}
            token={token}
            merchantId={merchantId}
            onDataChange={handleMerchantDataChange}
          />

          <MerchantDocuments
            detail={merchantData}
            onDataChange={handleMerchantDataChange}
          />

          <ConfigureMerchant
            detail={merchantData}
            allBusinessCategory={allBusinessCategory}
            onDataChange={handleMerchantDataChange}
          />

          <SponsorshipDetail
            data={merchantData.sponsorshipDetail}
            merchantId={merchantData._id}
            name={
              merchantData?.merchantDetail?.merchantName ||
              merchantData.fullName
            }
            email={merchantData.email}
            phoneNumber={merchantData.phoneNumber}
            BASE_URL={BASE_URL}
            token={token}
          />

          <MerchantAvailability
            detail={merchantData}
            onDataChange={handleMerchantDataChange}
          />

          <div className="flex justify-end items-center gap-3 mt-8 mb-5">
            <button
              type="button"
              className="bg-gray-300 px-10 py-3 rounded-md font-[500] hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-teal-700 text-white px-10 py-3 rounded-md font-[500] hover:bg-teal-600"
            >
              {isLoading ? `Saving...` : `Save`}
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default MerchantDetails;
