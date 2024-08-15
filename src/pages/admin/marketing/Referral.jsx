import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import GlobalSearch from "../../../components/GlobalSearch";
import { Switch } from "antd";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import GIFLoader from "../../../components/GIFLoader";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const Referral = () => {
  const [allReferralDetails, setAllReferralDetails] = useState([]);
  const [formData, setFormData] = useState({
    referralType: "Flat-discount",
    referrerDiscount: "",
    referrerMaxDiscountValue: "",
    referrerAppHeadingAndDescription: "",
    refereeDiscount: "",
    refereeMaxDiscountValue: "",
    minOrderAmount: "",
    refereeDescription: "",
    status: null,
    referralCodeOnCustomerSignUp: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const { token, role } = useContext(UserContext);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
      return;
    }

    fetchData(formData.referralType);
    getAllReferralDetails();
  }, [token, role, navigate]);

  const fetchData = async (referralType) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/referrals/referral-criteria`,
        {
          params: { referralType: referralType },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setFormData(response.data.data);
      }
    } catch (err) {
      console.error(`Error in fetching data: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getAllReferralDetails = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/referrals/referral-detail`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setAllReferralDetails(response.data.data);
      }
    } catch (err) {
      console.log(`Error in getting all referrals: ${err}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "referralType") {
      fetchData(value);
    }
  };

  const onChange = (name, checked) => {
    setFormData({ ...formData, [name]: checked });
  };

  const submitAction = async (e) => {
    e.preventDefault();
    try {
      const addResponse = await axios.post(
        `${BASE_URL}/referrals/add-referral`,
        formData,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (addResponse.status === 200) {
        console.log(addResponse.data.message);
        toast({
          title: "Success",
          description: "Referral Updated Successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(`Error in fetch data:${err}`);
      toast({
        title: "Error",
        description: "There was an error occured",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    console.log(formData);
  };

  return (
    <div>
      {isLoading ? (
        <GIFLoader />
      ) : (
        <>
          <Sidebar />
          <div className="pl-[300px] bg-gray-100 h-full">
            <nav className="p-5">
              <GlobalSearch />
            </nav>

            <div className="mx-5 flex justify-between">
              <h1 className="font-bold text-[20px]">Referral</h1>
              <Switch
                onChange={(checked) => onChange("agent", checked)}
                name="referral"
              />
            </div>
            <p className="mx-5 text-gray-500 mt-5">
              Define referral code that customers can use to refer new customers
              coming on your platform. Referral code defined here is applied on
              checkout while placing the order. Note: Referrer - who shares;
              Referee - who receives
            </p>
            <form
              onSubmit={submitAction}
              className="bg-white m-5 p-10 rounded-lg"
            >
              <div className="flex">
                <div className="w-1/2">
                  <label>Referral Type</label>
                </div>
                <div className="w-2/3">
                  <input
                    type="radio"
                    name="referralType"
                    value="Flat-discount"
                    checked={formData.referralType === "Flat-discount"}
                    onChange={handleChange}
                    className="mr-5 "
                  />
                  Flat discount
                  <input
                    type="radio"
                    name="referralType"
                    value="Percentage-discount"
                    checked={formData.referralType === "Percentage-discount"}
                    onChange={handleChange}
                    className="ml-10 mr-5 "
                  />
                  Percentage discount
                </div>
              </div>
              <div className="flex">
                <label className="mt-10 w-1/2">Refferer Discount</label>
                <input
                  type="text"
                  name="referrerDiscount"
                  value={formData.referrerDiscount}
                  onChange={handleChange}
                  className="border-2 border-gray-300 rounded w-2/3 mt-10 p-2 outline-none focus:outline-none"
                />
              </div>
              <div className="flex">
                <label className="mt-10 w-1/2">
                  Referrer maximum discount value
                </label>
                <input
                  type="text"
                  name="referrerMaxDiscountValue"
                  disabled={formData.referralType === "Flat-discount"}
                  value={formData.referrerMaxDiscountValue}
                  onChange={handleChange}
                  className="border-2 border-gray-300 rounded mt-10 w-2/3 p-2 outline-none focus:outline-none disabled:bg-zinc-300"
                />
              </div>
              <div className="flex">
                <label className="mt-10 w-1/2">
                  Referrer App Heading Description
                </label>
                <input
                  type="text"
                  name="referrerAppHeadingAndDescription"
                  value={formData.referrerAppHeadingAndDescription}
                  onChange={handleChange}
                  className="border-2 border-gray-300 rounded w-2/3 mt-10 p-2 outline-none focus:outline-none"
                />
              </div>
              <div className="flex">
                <label className="mt-10 w-1/2">Referee discount</label>
                <input
                  type="text"
                  name="refereeDiscount"
                  value={formData.refereeDiscount}
                  onChange={handleChange}
                  className="border-2 border-gray-300 rounded mt-10 w-2/3 p-2 outline-none focus:outline-none"
                />
              </div>
              <div className="flex">
                <label className="mt-10 w-1/2">
                  Referee maximum discount value
                </label>
                <input
                  type="text"
                  name="refereeMaxDiscountValue"
                  value={formData.refereeMaxDiscountValue}
                  disabled={formData.referralType === "Flat-discount"}
                  onChange={handleChange}
                  className="border-2 border-gray-300 rounded mt-10 w-2/3 p-2 outline-none focus:outline-none disabled:bg-zinc-300"
                />
              </div>
              <div className="flex">
                <label className="mt-10 w-1/2">Minimum order amount</label>
                <input
                  type="text"
                  name="minOrderAmount"
                  value={formData.minOrderAmount}
                  onChange={handleChange}
                  className="border-2 border-gray-300 rounded  mt-10 w-2/3 p-2 outline-none focus:outline-none"
                />
              </div>

              <div className="flex">
                <label className="mt-10 w-1/2">Referee discount</label>
                <input
                  type="text"
                  name="refereeDescription"
                  value={formData.refereeDescription}
                  onChange={handleChange}
                  className="border-2 border-gray-300 rounded  mt-10 w-2/3 p-2 outline-none focus:outline-none"
                />
              </div>
              <div className="mt-10 flex">
                <label className="w-1/2">Status</label>
                <div className="w-2/3">
                  <Switch
                    className=""
                    checked={formData.status}
                    onChange={(checked) => onChange("status", checked)}
                    name="status"
                  />
                </div>
              </div>
              <div className="mt-10 flex">
                <div className="w-1/2">
                  <label>Referral Code on Customers SignUp</label>
                </div>
                <div className="w-2/3">
                  <Switch
                    className=" "
                    checked={formData.referralCodeOnCustomerSignUp}
                    onChange={(checked) =>
                      onChange("referralCodeOnCustomerSignUp", checked)
                    }
                    name="referralCodeOnCustomerSignUp"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-10 mb-10 gap-4">
                <button
                  className="bg-cyan-50 rounded-lg px-8 py-2 right-10 mb-5 mr-5 font-semibold justify-end"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="bg-teal-800 rounded-lg px-8 py-2 right-5 mb-5 mr-10 text-white font-semibold justify-end"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>

            <p className="mx-5 mb-5 font-bold text-[20px]">Referral Statics</p>

            <div className=" overflow-x-auto mb-10">
              <table className="">
                <thead>
                  <tr>
                    {[
                      "Customers Id",
                      "Name",
                      "Customers Email",
                      "Referral Code",
                      "Succesful Refers",
                    ].map((headers) => (
                      <th
                        key={headers}
                        className="bg-teal-800 text-white h-[70px] mt-10 text-center w-screen"
                      >
                        {headers}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allReferralDetails?.map((referral) => (
                    <tr
                      key={referral._id}
                      className="text-center h-[50px] odd:bg-gray-200"
                    >
                      <td>{referral.customerId}</td>
                      <td>{referral.name || "-"}</td>
                      <td>{referral.email}</td>
                      <td>{referral.referralCode}</td>
                      <td>{referral.numOfReferrals}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Referral;
