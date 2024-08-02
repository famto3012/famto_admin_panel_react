import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import GlobalSearch from "../../../components/GlobalSearch";
import { Switch } from "antd";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const Referral = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { token, role } = useContext(UserContext);
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState({
    referalType: "Flat-discount",
    referrerDiscount: "",
    referrerMaxDiscountValue: "",
    referrerAppHeadingAndDescription: "",
    refereeDiscount: "",
    refereeMaxDiscountValue: "",
    minOrderAmount: "",
    refereeDescription: "",
    status: null,
    referalCodeOnCustomerSignUp: null,
  });

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
      return;
    }
    fetchData(formData.referalType); // Fetch data with default referral type on load
  }, [token, role, navigate]);

  const fetchData = async (referalType) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/referals/referal-criteria`,
        {
          params: { referalType: referalType },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setFormData(response.data.data);
        console.log(response.data.data);
      }
    } catch (err) {
      console.error(`Error in fetching data: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "referalType") {
      fetchData(value); // Fetch data based on the selected referral type
    }
  };

  const submitAction = async (e) => {
    e.preventDefault();
    try {
      const addResponse = await axios.post(
        `${BASE_URL}/referals/add-referal`,
        formData,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (addResponse.status === 201) {
        console.log(addResponse.data.message);
        toast({
          title: "Updated",
          description: "Referal Updated Successfully",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(`Error in fetch data:${err}`);
      toast({
        title: "Error",
        description: "There was an error occured",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
    console.log(formData);
  };

  const onChange = (name, checked) => {
    setFormData({ ...formData, [name]: checked });
  };

  return (
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
          checkout while placing the order. Note: Referrer - who shares; Referee
          - who receives
        </p>
        <form onSubmit={submitAction} className="bg-white m-5 p-10 rounded-lg">
          <div className="flex">
            <div className="w-1/2">
              <label>Referal Type</label>
            </div>
            <div className="w-2/3">
              <input
                type="radio"
                name="referalType"
                value="Flat-discount"
                checked={formData.referalType === "Flat-discount"}
                onChange={handleChange}
                className="mr-5 "
              />
              Flat discount
              <input
                type="radio"
                name="referalType"
                value="Percentage-discount"
                checked={formData.referalType === "Percentage-discount"}
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
              disabled={formData.referalType === "Flat-discount"}
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
              disabled={formData.referalType === "Flat-discount"}
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
                checked={formData.referalCodeOnCustomerSignUp}
                onChange={(checked) =>
                  onChange("referalCodeOnCustomerSignUp", checked)
                }
                name="referalCodeOnCustomerSignUp"
              />
            </div>
          </div>
          <div className="flex justify-end mt-10 mb-10 gap-4">
            <button
              className="bg-cyan-50 rounded-lg px-8 py-2 right-10 mb-5 mr-5 font-semibold justify-end"
              type="submit"
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
        <table>
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
            <tr className="text-center bg-white h-20">
              <td>Dummy Data</td>
              <td>Dummy Data</td>
              <td>Dummy Data</td>
              <td>Dummy Data</td>
              <td>Dummy Data</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Referral;
