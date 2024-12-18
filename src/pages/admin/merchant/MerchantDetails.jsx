import { useContext, useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { Switch } from "antd";
import { useToast } from "@chakra-ui/react";

import BlockIcon from "@mui/icons-material/Block";
import { MdOutlineModeEditOutline } from "react-icons/md";

import { UserContext } from "../../../context/UserContext";

import GlobalSearch from "../../../components/GlobalSearch";

import SponsorshipDetail from "../../../components/Merchant/SponsorshipDetail";
import MerchantData from "../../../components/Merchant/MerchantData";
import MerchantDocuments from "../../../components/Merchant/MerchantDocuments";
import ConfigureMerchant from "../../../components/Merchant/ConfigureMerchant";
import MerchantAvailability from "../../../components/Merchant/MerchantAvailability";
import BlockMerchantModel from "../../../components/model/Merchant/BlockMerchantModel";
import DeleteMerchant from "../../../components/model/Merchant/DeleteMerchant";
import EditMerchant from "../../../components/model/Merchant/EditMerchant";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const MerchantDetails = () => {
  const [merchantData, setMerchantData] = useState({});
  const [allGeofence, setAllGeofence] = useState([]);
  const [allBusinessCategory, setBusinessCategory] = useState([]);

  const [showBlock, setShowBlock] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const toggleEditModal = (e) => {
    // e.preventDefault();
    setShowEditModal(!showEditModal);
  };

  const navigate = useNavigate();
  const { merchantId } = useParams();
  const toast = useToast();
  const { token, role } = useContext(UserContext);

  useEffect(() => {
    if (!token) {
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
          console.log(merchantResponse.data.data);
          setMerchantData(merchantResponse.data.data);
        }
        if (geofenceResponse.status === 200) {
          setAllGeofence(geofenceResponse.data.geofences);
        }
        if (businessCategoryResponse.status === 200) {
          setBusinessCategory(businessCategoryResponse.data.data);
          console.log("business category", businessCategoryResponse.data.data);
        }
      } catch (err) {
        toast({
          title: "Error",
          description: `Error in getting merchant data`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    const getAllBusinessCategory = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/admin/business-categories/get-all-business-category`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 200) {
          setBusinessCategory(response.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const getMerchantProfile = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/merchants/profile`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setMerchantData(response.data.data);
        }
      } catch (err) {
        toast({
          title: "Error",
          description: `Error in getting merchant profile`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    if (role === "Admin") {
      getMerchantData();
    } else if (role === "Merchant") {
      getMerchantProfile();
      getAllBusinessCategory();
    }
  }, [merchantId, token, role]);

  const toggleBlock = () => setShowBlock(!showBlock);
  const toggleDeleteModal = () => setShowDelete(!showDelete);

  const handleMarkBlocked = () => {
    setMerchantData({ ...merchantData, isBlocked: true });
  };

  // Callback function to handle changes from the child component
  const handleMerchantDataChange = (updatedData) => {
    setMerchantData((prevData) => ({
      ...prevData,
      ...updatedData,
    }));
  };

  const toggleMerchantStatus = async () => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/merchants/admin/change-status/${merchantData._id}`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setMerchantData({
          ...merchantData,
          status: !merchantData?.status,
        });
        toast({
          title: "Success",
          description: "Merchant status updated successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        toast({
          title: "Error",
          description: err.response.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: `An error occoured, Please try again later`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const handleSaveMerchant = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

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

      // Assuming merchantData is your data object that you want to send k
      appendFormData(merchantData);
      console.log("merchantData", merchantData);
      console.log("Edit", formData);

      const endpoint =
        role === "Admin"
          ? `${BASE_URL}/merchants/admin/update-merchant-details/${merchantId}`
          : `${BASE_URL}/merchants/update-merchant-details`;

      const response = await axios.put(endpoint, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
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
      <main className="p-6 bg-gray-100 pl-[300px] h-full">
        <GlobalSearch />
        <div className="flex justify-between my-[15px] mt-8 mb-8">
          <h3 className="font-[600] text-[18px] ms-3">
            {merchantData?.merchantDetail?.merchantName}
          </h3>
          <div className="flex items-center gap-[15px]">
            {role === "Admin" && !merchantData.isBlocked && (
              <>
                <Link
                  onClick={toggleBlock}
                  className="bg-yellow-100 py-2 px-5 rounded-xl "
                >
                  <BlockIcon className="h-5 w-5 text-red-600" /> Block
                </Link>
                <BlockMerchantModel
                  isVisible={showBlock}
                  onCancel={toggleBlock}
                  BASE_URL={BASE_URL}
                  token={token}
                  merchantId={merchantId}
                  onBlock={handleMarkBlocked}
                />

                <button
                  onClick={toggleEditModal}
                  className="bg-teal-600 text-white flex items-center gap-[10px] py-2 px-1.5 rounded"
                >
                  <MdOutlineModeEditOutline />
                  Edit Merchant
                </button>

                <EditMerchant
                  isVisible={showEditModal}
                  onCancel={toggleEditModal}
                  BASE_URL={BASE_URL}
                  token={token}
                  role={role}
                  data={merchantData}
                  merchantId={merchantId}
                />

                <button
                  onClick={toggleDeleteModal}
                  className="bg-red-500 text-white rounded-md p-2"
                >
                  Delete
                </button>

                <DeleteMerchant
                  isVisible={showDelete}
                  onCancel={toggleDeleteModal}
                  BASE_URL={BASE_URL}
                  token={token}
                  merchantId={merchantId}
                />

                <span>Status</span>
                <Switch
                  value={merchantData?.status}
                  className="text-teal-700 ml-2"
                  onChange={toggleMerchantStatus}
                />
              </>
            )}
          </div>
        </div>

        <form
          className="bg-white rounded-lg ms-3 p-5 w-full overflow-hidden"
          onSubmit={handleSaveMerchant}
        >
          <MerchantData
            detail={merchantData}
            allGeofence={allGeofence}
            BASE_URL={BASE_URL}
            token={token}
            role={role}
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
