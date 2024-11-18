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

import { payoutPaymentStatus } from "../../../utils/DefaultData";

import "react-datepicker/dist/react-datepicker.css";
import { Modal } from "antd";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const AllMerchantPayout = () => {
  const [allMerchant, setAllMerchant] = useState([]);
  const [allGeofence, setAllGeofence] = useState([]);
  const [allPayouts, setAllPayouts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPayoutLoading, setIsPayoutLoading] = useState(false);
  const [isModalConfirm, setIsModalConfirm] = useState(false);
  const [selectedGeofence, setSelectedGeofence] = useState(null);
  const [merchantId, setMerchantId] = useState(null);
  const [payoutId, setPayoutId] = useState(null);
  const [selectedMerchant, setSelectedMerchant] = useState(null);
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState(null);
  const [search, setSearch] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

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
            query: search,
            startDate: startDate ? startDate.toLocaleDateString("en-CA") : null,
            endDate: endDate ? endDate.toLocaleDateString("en-CA") : null,
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
  }, [
    selectedGeofence,
    selectedMerchant,
    selectedPaymentStatus,
    search,
    startDate,
    endDate,
  ]);

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

  const showModalConfirm = (merchantId, payoutId) => {
    setMerchantId(merchantId);
    setPayoutId(payoutId);
    setIsModalConfirm(true);
  };

  const handleCancel = () => {
    setIsModalConfirm(false);
  };

  const handleSearchChange = (e) => setSearch(e.target.value);

  const confirmPayment = async (merchantId, payoutId) => {
    setIsPayoutLoading(true);
    try {
      const response = await axios.patch(
        `${BASE_URL}/merchants/admin/payout/${merchantId}/${payoutId}`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setAllPayouts((prevData) =>
          prevData.map((payout) =>
            payout.payoutId === payoutId
              ? { ...payout, isSettled: true }
              : payout
          )
        );
      }
    } catch (err) {
      toast({
        title: "Error",
        description: err?.response?.data?.message || `Error in getting data`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsPayoutLoading(false);
      handleCancel();
    }
  };

  const downloadPayoutCSV = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(
        `${BASE_URL}/merchants/admin/payout-csv`,
        {
          params: {
            paymentStatus: selectedPaymentStatus,
            merchantId: selectedMerchant,
            geofenceId: selectedGeofence,
            query: search,
            startDate: startDate ? startDate.toLocaleDateString("en-CA") : null,
            endDate: endDate ? endDate.toLocaleDateString("en-CA") : null,
          },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Merchant_Payout.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // setAllPayouts(response.data.data);
    } catch (err) {
      console.log(`Error in filtering payouts: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="pl-[300px] bg-gray-100 h-screen w-full">
        <div className="p-[30px]">
          <GlobalSearch />
        </div>

        <div className="flex items-center justify-between px-[20px]">
          <h3 className="font-[600] text-[18px]">Merchant Payout</h3>

          <button
            className=" bg-teal-600 text-white rounded-md px-4 py-2"
            onClick={downloadPayoutCSV}
          >
            <ArrowDownOutlined size={10} />
            <span className="text-[16px] ml-2">CSV</span>
          </button>
        </div>

        <div className="bg-white flex items-center justify-between mx-3 mt-3 p-5 rounded-md">
          <div className="flex items-center gap-[20px]">
            <Select
              options={merchantOptions}
              value={merchantOptions.find(
                (option) => option.value === selectedMerchant
              )}
              onChange={(option) => setSelectedMerchant(option.value)}
              className=" bg-cyan-50 min-w-[10rem]"
              placeholder="Merchant"
              isSearchable={true}
              isMulti={false}
              styles={{
                control: (provided) => ({
                  ...provided,
                  paddingRight: "",
                }),
                dropdownIndicator: (provided) => ({
                  ...provided,
                  padding: "10px",
                }),
              }}
            />

            <Select
              options={payoutPaymentStatus}
              value={payoutPaymentStatus.find(
                (option) => option.value === selectedPaymentStatus
              )}
              onChange={(option) => setSelectedPaymentStatus(option.value)}
              className=" bg-cyan-50 min-w-[10rem]"
              placeholder="Payment status"
              isSearchable={false}
              isMulti={false}
              styles={{
                control: (provided) => ({
                  ...provided,
                  paddingRight: "",
                }),
                dropdownIndicator: (provided) => ({
                  ...provided,
                  padding: "10px",
                }),
              }}
            />

            <Select
              options={geofenceOptions}
              value={geofenceOptions.find(
                (option) => option.value === selectedGeofence
              )}
              onChange={(option) => setSelectedGeofence(option.value)}
              className=" bg-cyan-50 min-w-[10rem]"
              placeholder="Geofence"
              isSearchable={true}
              isMulti={false}
              styles={{
                control: (provided) => ({
                  ...provided,
                  paddingRight: "",
                }),
                dropdownIndicator: (provided) => ({
                  ...provided,
                  padding: "10px",
                }),
              }}
            />
          </div>

          <div className="flex items-center gap-5">
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update);
              }}
              dateFormat="yyyy/MM/dd"
              withPortal
              className="cursor-pointer "
              customInput={
                <span>
                  <FaCalendarAlt className="text-gray-400 text-xl" />
                </span>
              }
              placeholderText="Select Date range"
              maxDate={new Date(new Date().setDate(new Date().getDate() - 1))}
            />

            <input
              type="search"
              value={search}
              onChange={handleSearchChange}
              className="bg-gray-100 p-3 rounded-3xl focus:outline-none outline-none text-[14px] ps-[20px]"
              placeholder="Search merchant"
            />
          </div>
        </div>

        <div className="overflow-x-auto mt-[20px]  w-full">
          <table className="text-center w-full">
            <thead>
              <tr className="bg-teal-600">
                {[
                  "Merchant ID",
                  "Merchant name",
                  "Phone",
                  "Date",
                  "Completed Orders",
                  "Total earnings",
                  "Payout Approval",
                  "Action",
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
                    <td className="py-2 px-4 ">
                      {payout.isSettled ? (
                        <p className="text-green-600">Paid</p>
                      ) : (
                        <p className="flex items-center justify-center ">
                          <IoCheckmarkOutline
                            className="text-teal-700 bg-teal-200 p-3 rounded-full cursor-pointer"
                            size={40}
                            onClick={() => {
                              showModalConfirm(
                                payout.merchantId,
                                payout.payoutId
                              );
                            }}
                          />
                        </p>
                      )}
                    </td>
                    <td className="py-2 px-4">
                      <Link
                        to={`/merchant/payout-detail/${payout.merchantId}/${payout.date}`}
                      >
                        <FaAngleRight
                          size={35}
                          className="p-3 bg-gray-400 text-[#333] rounded-full"
                        />
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <Modal
          title={<span className="font-bold text-[16px]">Confirm?</span>}
          open={isModalConfirm}
          onCancel={handleCancel}
          centered
          footer={null}
        >
          <div>
            <p className="text-[16px] py-2">Do you want to Confirm?</p>
            <div className="flex justify-end mt-5 gap-6">
              <button
                type="button"
                className="bg-cyan-100 px-5 py-1 rounded-md outline-none focus:outline-none font-semibold"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="bg-teal-600 px-5 py-1 rounded-md outline-none focus:outline-none text-white"
                onClick={() => {
                  confirmPayment(merchantId, payoutId);
                }}
              >
                {isPayoutLoading ? `Confirming...` : `Confirm`}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default AllMerchantPayout;
