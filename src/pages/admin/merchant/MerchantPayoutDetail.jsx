import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import DatePicker from "react-datepicker";
import axios from "axios";
import { Spinner, useToast } from "@chakra-ui/react";

import { UserContext } from "../../../context/UserContext";

import { ArrowDownOutlined } from "@ant-design/icons";
import { FaCalendarAlt } from "react-icons/fa";
import { IoCheckmarkOutline } from "react-icons/io5";
import { FaAngleRight } from "react-icons/fa6";

import GlobalSearch from "../../../components/GlobalSearch";
import Sidebar from "../../../components/Sidebar";

import { payoutPaymentStatus } from "../../../utils/DefaultData";

import "react-datepicker/dist/react-datepicker.css";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const MerchantPayoutDetail = () => {
  const [allMerchant, setAllMerchant] = useState([]);
  const [allGeofence, setAllGeofence] = useState([]);
  const [allPayouts, setAllPayouts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGeofence, setSelectedGeofence] = useState(null);
  const [selectedMerchant, setSelectedMerchant] = useState(null);
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState(null);

  const { token, role } = useContext(UserContext);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (role !== "Admin") navigate("/home");

    const getInitialData = async () => {
      try {
        setIsLoading(true);

        const [merchantResponse, geofenceResponse] = await Promise.all([
          axios.get(`${BASE_URL}/merchants/admin/all-merchant-drop-down`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BASE_URL}/admin/geofence/get-geofence`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setAllMerchant(merchantResponse.data.data);
        setAllGeofence(geofenceResponse.data.geofences);
      } catch (err) {
        toast({
          title: "Error",
          description: `Error in getting data`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    getInitialData();
  }, []);

  useEffect(() => {
    const filterPayouts = async () => {
      try {
        setIsLoading(true);

        const response = await axios.get(`${BASE_URL}/merchants/admin/payout`, {
          params: {
            paymentStatus: selectedPaymentStatus,
            merchantId: selectedMerchant,
            geofenceId: selectedGeofence,
          },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });

        setAllPayouts(response.data.data);
      } catch (err) {
        console.log(`Error in filtering payouts: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };
    filterPayouts();
  }, [selectedGeofence, selectedMerchant, selectedPaymentStatus]);

  const geofenceOptions = [
    { label: "All", value: "all" },
    ...allGeofence?.map((geofence) => ({
      label: geofence.name,
      value: geofence._id,
    })),
  ];

  const merchantOptions = [
    { label: "All", value: "all" },
    ...allMerchant?.map((merchant) => ({
      label: merchant.merchantName,
      value: merchant._id,
    })),
  ];

  return (
    <>
      <Sidebar />

      <div className="pl-[300px] bg-gray-100 h-screen w-full">
        <div className="p-[30px]">
          <GlobalSearch />
        </div>

        <div className="flex items-center justify-between px-[20px]">
          <h3 className="font-[600] text-[18px]">Merchant Payout of date DD-MM-YYYY</h3>
        </div>

        <div className="overflow-x-auto mt-[20px]  w-full">
          <table className="text-center w-full">
            <thead>
              <tr className="bg-teal-600">
                {[
                  "Product Name",
                  "Variant Name",
                  "Cost Price",
                  "Price",
                  "No: of orders",
                  "Total Payable",
                ].map((header) => (
                  <td
                    key={header}
                    className="bg-teal-700 text-center text-white py-[20px] border-r-2 border-[#eee]/50"
                  >
                    {header}
                  </td>
                ))}
              </tr>
            </thead>

            <tbody>
              {isLoading && (
                <tr>
                  <td
                    colSpan={8}
                    className="h-[70px] bg-white text-center gap-4"
                  >
                    <span>Loading</span> <Spinner size="sm" />
                  </td>
                </tr>
              )}

              {!isLoading && allPayouts.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="h-[70px] bg-white text-center gap-4"
                  >
                    <span>No Data</span>
                  </td>
                </tr>
              )}

              {!isLoading &&
                allPayouts?.map((payout) => (
                  <tr
                    key={payout.payoutId}
                    className="h-[70px] even:bg-gray-200 align-middle"
                  >
                    <td className="py-2 px-4">
                      <Link
                        to={`/merchant-detail/${payout.merchantId}`}
                        className=" underline underline-offset-2"
                      >
                        {payout.merchantId}
                      </Link>
                    </td>
                    <td className="py-2 px-4">{payout.merchantName}</td>
                    <td className="py-2 px-4">{payout.phoneNumber}</td>
                    <td className="py-2 px-4">{payout.date}</td>
                    <td className="py-2 px-4">{payout.completedOrders}</td>
                    <td className="py-2 px-4">{payout.totalCostPrice}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MerchantPayoutDetail;
