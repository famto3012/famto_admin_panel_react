import { Modal } from '@mui/material';
import React, { useState } from 'react';

const AddMerchant = () => {
  const [addData, setAddData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
  });

  const handleInputChange = (e) => {
    setAddData({ ...addData, [e.target.name]: e.target.value });
  };

  const signupAction = async (e) => {
    e.preventDefault();
    closeModal();
    console.log(addData);
  };

  return (
    <section className="flex items-center justify-center min-h-screen font-poppins">
      <div className="bg-white p-10 rounded-lg shadow-md w-[800px]">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Add Merchant</h1>
        <form onSubmit={signupAction}>
          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <label className= "w-1/3 text-gray-500">Full Name of owner</label>
              <input
                className="border-2 border-gray-300 rounded p-2 w-2/3"
                type="text"
                value={addData.fullname}
                id="name"
                name="name"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center">
              <label className="w-1/3 text-gray-500" htmlFor="email">Email</label>
              <input
                className="border-2 border-gray-300 rounded p-2 w-2/3"
                type="email"
                value={addData.email}
                id="email"
                name="email"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center">
              <label className="w-1/3 text-gray-500" htmlFor="phone">Phone Number</label>
              <input
                className="border-2 border-gray-300 rounded p-2 w-2/3"
                type="tel"
                value={addData.phone}
                id="phone"
                name="phone"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center">
              <label className="w-1/3 text-gray-500" htmlFor="password">Password</label>
              <input
                className="border-2 border-gray-300 rounded p-2 w-2/3"
                type="password"
                value={addData.password}
                id="password"
                name="password"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center">
              <label className="w-1/3 text-gray-500" htmlFor="confirmpassword">Confirm Password</label>
              <input
                className="border-2 border-gray-300 rounded p-2 w-2/3"
                type="password"
                value={addData.confirmpassword}
                id="confirmpassword"
                name="confirmpassword"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="bg-cyan-50 py-2 px-4 rounded-md"
                type="button"
              >
                Cancel
              </button>
              <button
                className="bg-teal-700 text-white py-2 px-4 rounded-md"
                type="submit"
              >
                Add Merchant
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddMerchant;
