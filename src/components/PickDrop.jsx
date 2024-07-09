import { PlusOutlined } from '@ant-design/icons';
import { AddOutlined, DeleteOutline } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'

const PickDrop = () => {
    const[formData, setFormData]=useState({
        firstName:"",
        emailId:"",
        phone:"",
        orderId:"",
        orderTime:"",
        instructions:"",
        tips:"",
        deliveryCharges:"",
        discount:"",
        paymentType:"",
        subtotal:"",
    })
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const formSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
      };
      const[dropData, setDropData]=useState({
        firstName:"",
        emailId:"",
        phone:"",
        orderId:"",
        orderTime:"",
        instructions:"",
        tips:"",
        deliveryCharges:"",
        discount:"",
        paymentType:"",
        subtotal:"",
    })
    const handleInputChange1 = (e) => {
        setDropData({ ...dropData, [e.target.name]: e.target.value });
      };
    
      const submitAction = (e) => {
        e.preventDefault();
        console.log(dropData);
      };
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
  return (
    <div>
        <h1 className='bg-teal-800 text-white px-6 py-4 text-xl font-semibold'>Pick Up</h1>

        <form onSubmit={formSubmit}>
            <div className="flex flex-col gap-6">
            <h4 className='px-6 mt-10 font-semibold'>Pickup Location Details</h4>
            <div className="flex items-center">
                <label className="w-1/3 px-6" htmlFor="firstName">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                  className="h-10 px-5  text-sm border-2 w-1/2 outline-none focus:outline-none relative"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
                </div>
                <div className="flex items-center">
                <label className="w-1/3 px-6" htmlFor="emailId">
                  Email ID *
                </label>
                <input
                  type="email"
                  name="emailId"
                  id="emailId"
                  placeholder="Email Id"
                  className="h-10 px-5  text-sm border-2 w-1/2 outline-none focus:outline-none relative"
                  value={formData.emailId}
                  onChange={handleInputChange}
                />
                </div>
                <div className="flex items-center">
                <label className="w-1/3 px-6" htmlFor="phone">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Phone Number"
                  className="h-10 px-5  text-sm border-2 w-1/2 outline-none focus:outline-none relative"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                </div>
                <div className="flex items-center">
                <label className="w-1/3 px-6" htmlFor="firstName">
                  Order ID *
                </label>
                <input
                  type="id"
                  name="id"
                  id="id"
                  placeholder="Order ID"
                  className="h-10 px-5  text-sm border-2 w-1/2 outline-none focus:outline-none relative"
                  value={formData.id}
                  onChange={handleInputChange}
                />
                </div>
                <div className="flex items-center">
                <label className="w-1/3 px-6" htmlFor="orderTime">
                  Order Time
                </label>
                <input
                  type="time"
                  name="orderTime"
                  id="orderTime"
                  placeholder="In scheduled order,it will filled automatically as scheduled"
                  className="h-10 px-5  text-sm border-2 w-1/2 outline-none focus:outline-none relative"
                  value={formData.orderTime}
                  onChange={handleInputChange}
                />
                </div>
                <div className="flex items-center">
                <label className="w-1/3 px-6" htmlFor="instructions">
                 Pick Instructions(if any)
                </label>
                <input
                  type="text"
                  name="instructions"
                  id="instructions"
                  placeholder="First Name"
                  className="h-10 px-5  text-sm border-2 w-1/2 outline-none focus:outline-none relative"
                  value={formData.instructions}
                  onChange={handleInputChange}
                />
                </div>
                <h4 className='px-6'>Task Specifications</h4>
                <div className='bg-gray-100 mx-6 p-10 rounded-lg'>
          <div className='flex'>
              <label className='w-1/3'>Item type</label>
              <select 
              name='type'
              value="type"
              className='w-1/2 p-3'
              >
                <option value="option 1">Option 1</option>
                <option value="option 2">Option 2</option>

              </select>
          </div>
          <div className='flex mt-5'>
           <label className='w-1/3'>Dimensions (in cm)</label> 
           <div className='w-1/2 gap-2'>
           <div className='flex gap-2'>
            <input
            type='text'
            name='dimensions'
            className='outline-none focus:outline-none border border-gray-200 p-3 rounded w-1/3'
            placeholder='Length'
            />
            <input
            type='text'
            name='dimensions'
              className='outline-none focus:outline-none border border-gray-200 p-3 rounded w-1/3'
            placeholder='Width'
            />
            <input
            type='text'
            name='dimensions'
              className='outline-none focus:outline-none border border-gray-200 p-3 rounded w-1/3'
            placeholder='Height'
            />
           </div>
           <div className='mt-3'>
           <input
            type='text'
            name='dimensions'
              className='outline-none focus:outline-none border border-gray-200 p-3 rounded w-full'
            placeholder='Approximate / Exact Weight (in Kg)'
            />
           </div>
           <div className='mx-3 flex justify-between mt-3 gap-3'>
            <button className='bg-zinc-200 w-1/2 rounded-md p-2'>
              <AddOutlined/>{" "}Add Item
            </button>
            <button className='bg-red-100 w-1/2 rounded-md p-2'>
              <DeleteOutline className='text-red-500'/> Delete Item</button>
           </div>
          </div>
          </div>
        </div>
                <h4 className='px-6 mt-5 font-semibold'>Pricing Charges</h4>
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
               <div className='px-6'>
               <button
              className="bg-gray-300 rounded-md flex items-center justify-center font-semibold p-3 w-[85%] "
              
            >
              <PlusOutlined className="mr-3" /> Add More Pick
            </button>
               </div>
   




                </div>
                </form>
        
                <h1 className='bg-teal-800 text-white px-6 py-4 text-xl font-semibold mt-8'>Drop</h1>

        <form onSubmit={submitAction}>
            <div className="flex flex-col gap-6">
            <h4 className='px-6 mt-10 font-semibold'>Delivery Location Details</h4>
            <div className="flex items-center">
                <label className="w-1/3 px-6" htmlFor="firstName">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="First Name"
                  className="h-10 px-5  text-sm border-2 w-1/2 outline-none focus:outline-none relative"
                  value={dropData.firstName}
                  onChange={handleInputChange1}
                />
                </div>
                <div className="flex items-center">
                <label className="w-1/3 px-6" htmlFor="emailId">
                  Email ID *
                </label>
                <input
                  type="email"
                  name="emailId"
                  id="emailId"
                  placeholder="Email Id"
                  className="h-10 px-5  text-sm border-2 w-1/2 outline-none focus:outline-none relative"
                  value={dropData.emailId}
                  onChange={handleInputChange1}
                />
                </div>
                <div className="flex items-center">
                <label className="w-1/3 px-6" htmlFor="phone">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Phone Number"
                  className="h-10 px-5  text-sm border-2 w-1/2 outline-none focus:outline-none relative"
                  value={dropData.phone}
                  onChange={handleInputChange1}
                />
                </div>
                <div className="flex items-center">
                <label className="w-1/3 px-6" htmlFor="firstName">
                  Order ID *
                </label>
                <input
                  type="id"
                  name="id"
                  id="id"
                  placeholder="Order ID"
                  className="h-10 px-5  text-sm border-2 w-1/2 outline-none focus:outline-none relative"
                  value={dropData.id}
                  onChange={handleInputChange1}
                />
                </div>
                <div className="flex items-center">
                <label className="w-1/3 px-6" htmlFor="orderTime">
                  Order Time
                </label>
                <input
                  type="time"
                  name="orderTime"
                  id="orderTime"
                  placeholder="In scheduled order,it will filled automatically as scheduled"
                  className="h-10 px-5  text-sm border-2 w-1/2 outline-none focus:outline-none relative"
                  value={dropData.orderTime}
                  onChange={handleInputChange1}
                />
                </div>
                <div className="flex items-center">
                <label className="w-1/3 px-6" htmlFor="instructions">
                 Pick Instructions(if any)
                </label>
                <input
                  type="text"
                  name="instructions"
                  id="instructions"
                  placeholder="First Name"
                  className="h-10 px-5  text-sm border-2 w-1/2 outline-none focus:outline-none relative"
                  value={dropData.instructions}
                  onChange={handleInputChange1}
                />
                </div>
                <h4 className='px-6'>Task Specifications</h4>
                <h4 className='px-6 mt-5 font-semibold'>Pricing Charges</h4>
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
                  value={dropData.tips}
                  onChange={handleInputChange1}
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
                  value={dropData.deliveryCharges}
                  onChange={handleInputChange1}
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
                  value={dropData.discount}
                  onChange={handleInputChange1}
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
                  value={dropData.paymentType}
                  onChange={handleInputChange1}
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
                  Order ID *
                </label>
                <input
                  type="number"
                  name="subtotal"
                  id="subtotal"
                  placeholder="Sub Total"
                  className="h-10 px-5  text-sm border-2 w-1/2 outline-none focus:outline-none relative"
                  value={dropData.subtotal}
                  onChange={handleInputChange1}
                />
               </div>
               <div className='px-6'>
               <button
              className="bg-gray-300 rounded-md flex items-center justify-center font-semibold p-3 w-[85%] "
              
            >
              <PlusOutlined className="mr-3" /> Add More Drop
            </button>
               </div>
   




                </div>
                </form>
                <div className='flex mt-8'>
                <h1 className='px-6 w-1/3 font-semibold'>Bill Summary</h1>
             <div className="overflow-auo w-2/3">
              <table className="border-2 border-teal-700  text-center w-[75%]">
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
                    <tr key={order.id} className="text-center">
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
      
    </div>
    
    
  )
}

export default PickDrop
