import { useContext, useEffect, useState } from "react";
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
        toast({
          title: "Success",
          description: "Referral Updated Successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "There was an error occured",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleReferralStatusChange = async () => {
    try {
      const editResponse = await axios.put(
        `${BASE_URL}/referrals/edit-referral-status`,
        {},
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (editResponse.status === 200) {
        console.log(editResponse.data.message);
        toast({
          title: "Success",
          description: editResponse.data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "There was an error occured",
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
          <div className="pl-[300px] bg-gray-100 h-full">
            <nav className="p-5">
              <GlobalSearch />
            </nav>

            <div className="mx-5 flex justify-between">
              <h1 className="font-bold text-[20px]">Referral</h1>
              {/* <Switch
                onChange={handleReferralStatusChange}
                name="referral"
                value={formData.status}
              /> */}
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
                  <label>
                    Referral Type<span className="text-red-600 ml-2">*</span>
                  </label>
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
                <label className="mt-10 w-1/2">
                  Referrer Discount<span className="text-red-600 ml-2">*</span>
                </label>
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
                  {formData.referralType === "Percentage-discount" && (
                    <span className="text-red-600 ml-2">*</span>
                  )}
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
                  <span className="text-red-600 ml-2">*</span>
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
                <label className="mt-10 w-1/2">
                  Referee discount<span className="text-red-600 ml-2">*</span>
                </label>
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
                  {formData.referralType === "Percentage-discount" && (
                    <span className="text-red-600 ml-2">*</span>
                  )}
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
                <label className="mt-10 w-1/2">
                  Minimum order amount
                  <span className="text-red-600 ml-2">*</span>
                </label>
                <input
                  type="text"
                  name="minOrderAmount"
                  value={formData.minOrderAmount}
                  onChange={handleChange}
                  className="border-2 border-gray-300 rounded  mt-10 w-2/3 p-2 outline-none focus:outline-none"
                />
              </div>

              <div className="flex">
                <label className="mt-10 w-1/2">
                  Referee description
                  <span className="text-red-600 ml-2">*</span>
                </label>
                <input
                  type="text"
                  name="refereeDescription"
                  value={formData.refereeDescription}
                  onChange={handleChange}
                  className="border-2 border-gray-300 rounded  mt-10 w-2/3 p-2 outline-none focus:outline-none"
                />
              </div>
              <div className="mt-10 flex">
                <label className="w-1/2">
                  Status<span className="text-red-600 ml-2">*</span>
                </label>
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
                  <label>
                    Referral Code on Customers SignUp
                    <span className="text-red-600 ml-2">*</span>
                  </label>
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

              <div className="flex justify-end mt-10 mb-2 gap-[15px]">
                <button
                  className="bg-cyan-50 rounded-lg px-8 py-2 right-10 mb-5 font-semibold justify-end"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="bg-teal-800 rounded-lg px-8 py-2 right-5 mb-5 text-white font-semibold justify-end"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>

            <p className="mx-5 mb-5 font-bold text-[20px]">Referral Statics</p>

            <div className="overflow-auto mb-10 max-h-[30rem]">
              <table className="">
                <thead className="sticky top0 left-0">
                  <tr>
                    {[
                      "Customers Id",
                      "Name",
                      "Customers Email",
                      "Referral Code",
                      "Successful Refers",
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
                      className="text-center h-[50px] even:bg-gray-200 last:border-2"
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
