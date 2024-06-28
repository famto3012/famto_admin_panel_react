import React, { useState } from 'react'

const EditMerchant = () => {
  const [editData, setEditData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
  });

  const handleInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const signupAction = async (e) => {
    e.preventDefault();
    console.log(editData);
  };

  return (
    // <section className="flex items-center justify-center min-h-screen font-poppins">
      <div className="bg-white p-10 rounded-lg shadow-md w-[800px]">
        <h1 className="text-2xl font-bold font-poppins mb-6 text-gray-800">Edit Merchant</h1>
        <form onSubmit={signupAction}>
          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <label className= "w-1/3 text-gray-500">Full Name of owner</label>
              <input
                className="border-2 border-gray-300 rounded p-2 w-2/3"
                type="text"
                value={editData.fullname}
                id="name"
                name="name"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center">
              <label className="w-1/3 text-gray-500">Email</label>
              <input
                className="border-2 border-gray-300 rounded p-2 w-2/3"
                type="email"
                value={editData.email}
                id="email"
                name="email"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center">
              <label className="w-1/3 text-gray-500">Phone Number</label>
              <input
                className="border-2 border-gray-300 rounded p-2 w-2/3"
                type="tel"
                value={editData.phone}
                id="phone"
                name="phone"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center">
              <label className="w-1/3 text-gray-500">Password</label>
              <input
                className="border-2 border-gray-300 rounded p-2 w-2/3"
                type="password"
                value={editData.password}
                id="password"
                name="password"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center">
              <label className="w-1/3 text-gray-500">Confirm Password</label>
              <input
                className="border-2 border-gray-300 rounded p-2 w-2/3"
                type="password"
                value={editData.confirmpassword}
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
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    // </section>
    
  )
}

export default EditMerchant
