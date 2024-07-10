import React, { useEffect, useState } from 'react';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { PlusOutlined } from '@ant-design/icons';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { AddOutlined, DeleteOutline } from '@mui/icons-material';

const Customorder = () => {
    const [order, setOrder] = useState([]);
    useEffect(() => {
      const fetchOrder = async () => {
        const dummyData = [
          {
            item: "Price",
            amount: "₹257",
          },
          {
            item: "Delivery Charges",
            amount: "₹257",
          },
          {
            item: "Added Tip",
            amount: "₹257",
          },
          {
            item: "Discount",
            amount: "₹257",
          },
          {
            item: "Sub Total",
            amount: "₹257",
          },
          {
            item: "GST(inclusive all taxes)",
            amount: "₹257",
          },
          // Add more customers as needed
        ];
  
        setOrder(dummyData);
      };
  
      fetchOrder();
    }, []);
    const [formData, setFormData] = useState({
        location: "",
        agentinstructions: "",
        tips: "",
        deliveryCharges: "",
        discount: "",
        paymentType: "",
        subtotal:"",
      });
      const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const formSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
      };
  return (
    <div className="bg-white mt-5 rounded">
      <form onSubmit={formSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex items-center relative">
            <label className="w-1/3 px-6" htmlFor="location">
              Search for a location
            </label>
            <div className="relative w-1/2">
              <input
                type="text"
                name="location"
                id="location"
                placeholder="Search Location"
                className="h-10 px-5 pr-10 text-sm border-2 w-full outline-none focus:outline-none"
                value={formData.location}
                onChange={handleInputChange}
              />
              <button type="button" className="absolute right-0 top-0 mt-2 mr-2">
                <LocationOnOutlinedIcon />
              </button>
            </div>
          </div>
          <h1 className='px-6 mt-5 font-semibold'>Add Items</h1>
          <div className='bg-gray-100 mx-6 p-10 rounded-lg'>
          <div className='flex'>
              <label className='w-1/3'>Item Name</label>
              <select 
              name='type'
              value="type"
              className='w-1/2 p-3'
              >
                <option value="option 1">Option 1</option>
                <option value="option 2">Option 2</option>

              </select>
          </div>
          <div className='flex items-center mt-5'>
           <label className='w-1/3'>Quantity</label> 
           <div className='w-1/2 gap-2'>
          
           <div className='mt-3'>
           <input
            type='text'
            name='quantity'
            className='outline-none focus:outline-none border border-gray-200 p-3 rounded w-full'
            placeholder='quantity'
            />
           </div>
           </div>
           </div>
           <div className='flex items-center mt-5'>
           <label className='w-1/3'>Item Name</label>
           <input
            type='text'
            name='unit'
            className='outline-none focus:outline-none border border-gray-200 p-3 rounded w-1/2'
            placeholder='unit'
            />
           </div>
           <div className='mx-3 flex gap-4 mt-5'>
            <button className='bg-zinc-200 w-1/3 rounded-md p-2'>
              <AddOutlined/>{" "}Update Photo
            </button>
            <button className='bg-red-100 w-1/3 rounded-md p-2'>
              <DeleteOutline className='text-red-500'/> Delete Item</button>
           </div>
        
        </div>
          <div className='px-6'>
               <button
              className="bg-gray-300 rounded-md flex items-center justify-center font-semibold p-3 w-[85%] "
              
            >
              <PlusOutlined className="mr-3" /> Add More Items
            </button>
               </div>
               <div className="flex items-center">
                <label className="w-1/3 px-6" htmlFor="agentinstructions">
                  Instructions to Delivery Agent
                </label>
                <input
                  className="h-10 px-5  text-sm border-2 w-1/2  outline-none focus:outline-none"
                  type="text"
                  placeholder="Agent Instructions"
                  id="agentinstructions"
                  name="agentinstructions"
                  value={formData.agentinstructions}
                  onChange={handleInputChange}
                />
              </div>   
              <div className="flex items-center">
                <label className="w-1/3 px-6" htmlFor="tips">
                  Tips
                </label>
                <input
                  className="h-10 px-5  text-sm border-2 w-1/2  outline-none focus:outline-none"
                  type="text"
                  placeholder="Tips"
                  id="tips"
                  name="tips"
                  value={formData.tips}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center">
                <label className="w-1/3 px-6" htmlFor="deliveryCharges">
                  Delivery Charges
                </label>
                <input
                  className="h-10 px-5  text-sm border-2 w-1/2  outline-none focus:outline-none"
                  type="text"
                  placeholder="Delivery Charges"
                  id="deliveryCharges"
                  name="deliveryCharges"
                  value={formData.deliveryCharges}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center">
              <label className="w-1/3 px-6" htmlFor="discount">
                  Discount *
                </label>
                <input
                  type="discount"
                  name="discount"
                  id="discount"
                  placeholder="Discount"
                  className="h-10 px-5  text-sm border-2 w-1/2 outline-none focus:outline-none relative"
                  value={formData.discount}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center">
                <label className="w-1/3 px-6" htmlFor="paymentType">
                  Payment Type
                </label>
                <select
                  className="h-10 px-5  text-sm border-2 w-1/2  outline-none focus:outline-none"
                  type="text"
                  placeholder="Payment Type"
                  id="paymentType"
                  name="paymentType"
                  value={formData.paymentType}
                  onChange={handleInputChange}
                >
                  <option hidden value=""></option>
                  <option value="option1" className="bg-white">
                    option1
                  </option>
                  <option value="option2" className="bg-white">
                    option2
                  </option>
                  <option value="option3" className="bg-white">
                    option3
                  </option>
                </select>
              </div>
              <div className='flex items-center'>
              <label className="w-1/3 px-6" htmlFor="subtotal">
                  Sub Total
                </label>
                <input
                  type="number"
                  name="subtotal"
                  id="subtotal"
                  placeholder="Sub Total"
                  className="h-10 px-5  text-sm border-2 w-1/2 outline-none focus:outline-none relative"
                  value={formData.subtotal}
                  onChange={handleInputChange}
                />
               </div>


              <div className='flex mt-5'>
                <h1 className='px-6 w-1/3 font-semibold'>Bill Summary</h1>
             <div className="overflow-auo w-2/3">
              <table className="border-2 border-teal-700  text-left w-[75%]">
                <thead>
                  <tr>
                    {["Item", "Amount"].map((header, index) => (
                      <th
                        key={index}
                        className="bg-teal-700  text-white p-4  border-[#eee]/50"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {order.map((order) => (
                    <tr key={order.id} className="text-left">
                      <td className="p-4">{order.item}</td>
                      <td className="p-4">{order.amount}</td>
                    </tr>
                    
                  ))}
                   <tr className="bg-teal-700 text-white font-semibold text-[18px]">
              <td className="p-4">Net Payable Amount</td>
              <td className="p-4">₹ 257</td>
            </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-16 mx-10">
          <button
            className="bg-cyan-50 py-2 px-4 rounded-md text-lg"
            type="button"
          >
            <SaveAltIcon /> Bill
          </button>
          <button
            className="bg-teal-700 text-white py-2 px-4 rounded-md"
            type="submit"
            onClick={formSubmit}
          >
            Create Order ₹534
          </button>
        </div>
        </div>
      </form>
    </div>
  );
};

export default Customorder;

