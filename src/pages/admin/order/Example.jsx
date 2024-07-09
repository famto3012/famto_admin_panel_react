import React, { useState } from 'react';

const Examples1 = () =>{
  const [isFormVisible, setFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  return (
    <div className="flex flex-col items-center p-6">
      <button
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
        onClick={toggleFormVisibility}
      >
        Add Customer
      </button>
      {isFormVisible && (
        <div className="mt-6 p-6 bg-gray-300 rounded-lg shadow-lg w-full max-w-md">
          <form>
            <div className='flex flex-col gap-3'>
            <div className='flex item-center justify-center'>
              <label className="  w-1/3 text-md font-medium ">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className=" w-2/3 px-3 py-2 bg-white   rounded focus:outline-none outline-none"
              />
            </div>
            <div className='flex items-center'>
              <label className="w-1/3 text-md font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-2/3 px-3 py-2 bg-white rounded focus:outline-none outline-none"
              />
            </div>
            <div className='flex items-center'>
              <label className="w-1/3 text-md font-medium ">Phone</label>
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                className=" w-2/3 px-3 py-2  bg-white   rounded focus:outline-none outline-none"
              />
            </div>
            <div className='flex items-center'>
              <label className="w-1/3 text-md font-medium">Address</label>
              <input
                type="text"
                name="address"
                placeholder="Address"
                className=" w-2/3 px-3 py-2 bg-white  rounded focus:outline-none outline-none"
              />
            </div>
            </div>
            <div className="flex justify-between mt-5 gap-3">
              <button
                type="button"
                className="bg-cyan-100 px-4 py-2 w-1/2"
                onClick={toggleFormVisibility}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-teal-700 text-white px-4 py-2 rounded w-1/2 "
              >
                Add Customer
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Examples1;