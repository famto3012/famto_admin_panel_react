import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import GlobalSearch from "../../../components/GlobalSearch";
import { Switch } from "antd";

const Referral = () => {
  const [formData, setFormData] = useState({
    referralType: "",
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitAction = async (e) => {
    e.preventDefault();

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
            <div  className="w-1/2">
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
            <label className="mt-10 w-1/2">Referrer maximum discount value</label>
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
            <label className="mt-10 w-1/2">Referrer App Heading Description</label>
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
            <label className="mt-10 w-1/2">Referee maximum discount value</label>
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
              onChange={(checked) => onChange("status", checked)}
              name="status"
            />
            </div>
          </div>
          <div className="mt-10 flex">
            <div className="w-1/2">
            <label >Referral Code on Customers SignUp</label>
            </div>
            <div className="w-2/3">
            <Switch
              className=" "
              onChange={(checked) =>
                onChange("referalCodeOnCustomerSignUp", checked)
              }
              name="referalCodeOnCustomerSignUp"
            />
            </div>
          </div>
          <div className="flex justify-end mt-10 mb-10 gap-4">
            <button
              className="bg-gray-200 rounded-lg px-8 py-2 right-10 mb-5 mr-5 font-semibold justify-end"
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
