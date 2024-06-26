import { SearchOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import BlockIcon from '@mui/icons-material/Block';
import Sidebar from './Sidebar';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Modal from '../../../components/Modal';



const MerchantDetails = () => {
  const [formData, setFormData] = useState({
    shortDescription: '',
    geoFence: '',
    pricing: '',
    location: '',
    panCard: '',
    gstin: '',
    fssai: '',
    adhaar: '',
    businessCategory: '',
    isVeg: 'both',
    deliveryOption: 'both',
    deliveryTime: '',
    preOrderSalesStatus: false,
    servingArea: 'radius',
    servingRadius: '',
    chosenPlan: 'Monthly plan | 07 June 2024 - 07 July 2024',
    plan: 'monthly',
    sponsorshipStatus: true,
    timeAvailability: 'specific',
    weekdays: {
      sunday: { open: false, closed: false, specific: false, startTime: '', endTime: '' },
      monday: { open: false, closed: false, specific: false, startTime: '', endTime: '' },
      tuesday: { open: false, closed: false, specific: false, startTime: '', endTime: '' },
      wednesday: { open: false, closed: false, specific: false, startTime: '', endTime: '' },
      thursday: { open: false, closed: false, specific: false, startTime: '', endTime: '' },
      friday: { open: false, closed: false, specific: false, startTime: '', endTime: '' },
      saturday: { open: false, closed: false, specific: false, startTime: '', endTime: '' },
    },
  });

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


  const merchants =
  {
    name: 'Sarath',
    address: 'Trivandrum',
    owner: 'Nandhu',
    email: 'sarath@gmailcom',
    phone: '123456789',
    password: '1234',
  }



  function loadFile(event) {
    var output = document.getElementById('preview_img');
    var file = event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = function (e) {
        output.src = e.target.result;
      }
      reader.readAsDataURL(file);
    }
  }




  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else if (type === 'radio') {
      const [day, field] = name.split('.');
      if (day && field) {
        setFormData({
          ...formData,
          weekdays: {
            ...formData.weekdays,
            [day]: {
              ...formData.weekdays[day],
              [field]: value,
            },
          },
        });
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleChangeRadio = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'radio') {
      const [day, field] = name.split('.');
      const test = ["open", "closed", "specific"];
      const details = { open: false, closed: false, specific: true, startTime: '', endTime: '' }

      test.forEach(
        testValue => {
          if (field == testValue) {
            details[testValue] = true;

          } else {
            details[testValue] = false;
          }
          setFormData({
            ...formData,
            weekdays: {
              ...formData.weekdays,
              [day]: details,
            },
          })
        }
      )
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <section>
      <div className='w-1/3'>
        <Sidebar />
      </div>
      <div className="p-6 bg-gray-100  ml-[16rem] h-screen overflow-auto">

        <form className="bg-white shadow-md rounded-lg p-8" onSubmit={handleSubmit}>
          <div className="relative flex justify-end"><NotificationsNoneOutlinedIcon className='mt-2 text-gray-700' />
            <input type="search" name="search" placeholder="Search" className="bg-gray-100 h-10 right-0 px-5 pr-10  rounded-full text-sm focus:outline-none" />
            <button type="submit" className="absolute right-0 top-0 mt-2 mr-4"><SearchOutlined />
            </button>
          </div>
          <div className="relative  flex justify-end">
            <button type="submit" className="absolute bg-yellow-50 h-8 w-28 rounded-lg right-0 top-0 mt-2 mr-4"> <BlockIcon className='text-red-600' /> Block
            </button>
            
          </div>
          <div className="mb-4">

            <button type="button" className=" font-medium">&lt; {merchants.name} #ID</button>


          </div>
          <div className="grid grid-cols-4 gap-6 mt-10 w-full">
            <div>

              <div className="mb-4 flex justify-between">

                <label className="block  ">ID</label>
                <p className="font-bold">Lorem Ipsum</p>
              </div>

              <div className="mb-4 flex justify-between">

                <label className="block text-gray-700">Merchant Name*</label>
                <p className="font-bold">{merchants.name}</p>

              </div>

              <div className="mb-4 flex justify-between">
                <label className="block text-gray-700 ">Display Address*</label>
                <p className="font-bold">{merchants.address}</p>
              </div>
              <div className="mb-4 flex justify-between">
                <label className="block text-gray-700">Name of owner*</label>
                <p className="font-bold">{merchants.owner}</p>
              </div>

            </div>
            <div className='ml-14'>
              <div className="mb-4 flex justify-between">
                <label className="block text-gray-700">E-mail</label>
                <p className="font-bold">{merchants.email}</p>
              </div>
              <div className="mb-4 flex justify-between">
                <label className="block text-gray-700">Phone</label>
                <p className="font-bold">{merchants.phone}</p>
              </div>
              <div className="mb-4 flex justify-between">
                <label className="block text-gray-700">Registration Status</label>
                <p className="font-bold">Pending</p>
              </div>

            </div>
            <div className="relative ml-16 inline-block">
              <img id="preview_img" className="h-24 w-24 relative object-cover rounded-lg bg-gray-100" src="https://lh3.googleusercontent.com/a-/AFdZucpC_6WFBIfaAbPHBwGM9z8SxyM1oV4wB4Ngwp_UyQ=s96-c" alt="Current profile photo" />
              <label>

                <input type="file" id="file_input" accept=".png" onChange={loadFile} />
              </label>
            </div>
            <button onClick={toggleOpen} className='bg-teal-700 w-[10rem] right-0 h-7'> <ModeEditOutlinedIcon />Edit Merchant</button>
            <Modal isOpen={isOpen} toggleOpen={toggleOpen}>
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
                </Modal>
          </div>




          <div className="mb-6  flex">
            <label className=" text-gray-700 mt-3 text-[16px]">Short Description (Max 30 characters)</label>
            <input
              type="text"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              className="mt-2 ml-12 p-2 w-[20rem] border rounded-md"
            />
          </div>

          <div className="mb-6 flex">
            <label className="block text-gray-700 mt-3 text-[16px]">Geo fence</label>
            <select
              name="geoFence"
              value={formData.geoFence}
              onChange={handleChange}
              className="mt-2 p-2 ml-60 w-[20rem] border rounded-md"
            >
              <option value="Thampanoor">Thampanoor</option>
              <option value="Pattom">Pattom</option>
              <option value="PMG">PMG</option>

            </select>
          </div>

          <div className="mb-6 flex">
            <label className="block text-gray-700">Pricing</label>
            <p className='ml-[17rem]'>comm/sub</p>
          </div>

          <div className="mb-6 flex">
            <label className="block mt-3 text-gray-700 ">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-2 p-2 ml-64  w-[20rem] border rounded-md"
            />
          </div>

          <div className="mb-6 flex">
            <label className='block mt-3 text-gray-700 '>Ratings</label>
            <button type="button" className="bg-teal-700 text-white p-2 ml-[16.5rem] rounded-md w-[20rem]">Show ratings and reviews</button>
          </div>
          <div className="mb-6">
            <h3 className="text-gray-700 font-bold mb-2">Documents provided</h3>

            <div className="mb-6 flex">
              <label className=" text-gray-700 mt-3 text-[16px]">Pan Card</label>
              <input
                type="text"
                name="panCard"
                value={formData.panCard}
                onChange={handleChange}
                className="mt-2 h-10  p-2 w-[20rem] ml-[16rem] border rounded-md"
              />
              <div className="relative inline-block">
                <img id="preview_img" className="h-14 ms-10 w-14 relative object-cover rounded-lg bg-gray-100" src="https://lh3.googleusercontent.com/a-/AFdZucpC_6WFBIfaAbPHBwGM9z8SxyM1oV4wB4Ngwp_UyQ=s96-c" alt="Current profile photo" />
                <label>

                  <input type="file" id="file_input" accept=".png" onChange={loadFile} className='hidden' />
                </label>
              </div>
            </div>
            <div className="mb-6 flex">
              <label className=" text-gray-700 mt-3  text-[16px]">GSTIN</label>
              <input
                type="text"
                name="gstin"
                value={formData.gstin}
                onChange={handleChange}
                className="mt-2 h-10 p-2 w-[20rem] ml-[17rem] border rounded-md"
              />
              <div className="relative inline-block">
                <img id="preview_img" className="h-14 ms-10 w-14 relative object-cover rounded-lg bg-gray-100" src="https://lh3.googleusercontent.com/a-/AFdZucpC_6WFBIfaAbPHBwGM9z8SxyM1oV4wB4Ngwp_UyQ=s96-c" alt="Current profile photo" />
                <label>

                  <input type="file" id="file_input" accept=".png" onChange={loadFile} className='hidden' />
                </label>
              </div>
            </div>
            <div className="mb-6  flex">
              <label className=" text-gray-700 mt-3 text-[16px]">FFSAI</label>
              <input
                type="text"
                name="fssai"
                value={formData.fssai}
                onChange={handleChange}
                className="mt-2 h-10  p-2 w-[20rem] ml-[17.5rem] border rounded-md"
              />
              <div className="relative inline-block">
                <img id="preview_img" className="h-14 ms-10 w-14 relative object-cover rounded-lg bg-gray-100" src="https://lh3.googleusercontent.com/a-/AFdZucpC_6WFBIfaAbPHBwGM9z8SxyM1oV4wB4Ngwp_UyQ=s96-c" alt="Current profile photo" />
                <label>

                  <input type="file" id="file_input" accept=".png" onChange={loadFile} className='hidden' />
                </label>
              </div>
            </div>
            <div className="mb-6  flex">
              <label className=" text-gray-700 mt-3 text-[16px]">Adhaar Number</label>
              <input
                type="text"
                name="adhaar"
                value={formData.adhaar}
                onChange={handleChange}
                className="mt-2 h-10  p-2 w-[20rem] ml-[12.7rem] border rounded-md"
              />
              <div className="relative inline-block">
                <img id="preview_img" className="h-14 ms-10 w-14 relative object-cover rounded-lg bg-gray-100" src="https://lh3.googleusercontent.com/a-/AFdZucpC_6WFBIfaAbPHBwGM9z8SxyM1oV4wB4Ngwp_UyQ=s96-c" alt="Current profile photo" />
                <label>

                  <input type="file" id="file_input" accept=".png" onChange={loadFile} className='hidden' />
                </label>
              </div>
            </div>
          </div>



          <div className="mb-6">
            <h3 className="text-gray-700 font-bold mb-2">Configuration</h3>


            <div className="mb-4 flex">
              <label className="block mt-3 text-gray-700">Business category</label>
              <select
                name="businessCategory"
                value={formData.businessCategory}
                onChange={handleChange}
                className="mt-2 p-2 ml-[11.5rem] w-[20rem] border rounded-md"
              >
                <option value="Hotel">Hotel</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Bakery">Bakery</option>

              </select>
            </div>

            <div className="mb-4 flex">
              <label className="block text-gray-700">If restaurant, then</label>
              <div className="flex items-center gap-[4rem]">
                <label className="mr-4 ml-[12.5rem] text-teal-700  ">
                  <input
                    type="radio"
                    name="isVeg"
                    value="veg"
                    checked={formData.isVeg === 'veg'}
                    onChange={handleChange}
                    className="mr-2 form-radio text-teal-600 focus:ring-teal-500"
                  /> Veg
                </label>
                <label className="mr-4">
                  <input
                    type="radio"
                    name="isVeg"
                    value="nonVeg"
                    checked={formData.isVeg === 'nonVeg'}
                    onChange={handleChange}
                    className="mr-2 form-radio text-teal-600 focus:ring-teal-500"
                  /> Non-Veg
                </label>
                <label className="mr-4">
                  <input
                    type="radio"
                    name="isVeg"
                    value="both"
                    checked={formData.isVeg === 'both'}
                    onChange={handleChange}
                    className="mr-2 form-radio text-teal-600 focus:ring-teal-500"
                  /> Both
                </label>
              </div>
            </div>

            <div className="mb-4 flex">
              <label className="block text-gray-700">Select Delivery Option</label>
              <div className="flex items-center gap-[2rem] ml-[10.4rem]">
                <label className="mr-4">
                  <input
                    type="radio"
                    name="deliveryOption"
                    value="onDemand"
                    checked={formData.deliveryOption === 'onDemand'}
                    onChange={handleChange}
                    className="mr-2 form-radio text-teal-600 focus:ring-teal-500"
                  /> On-demand
                </label>
                <label className="mr-4">
                  <input
                    type="radio"
                    name="deliveryOption"
                    value="scheduled"
                    checked={formData.deliveryOption === 'scheduled'}
                    onChange={handleChange}
                    className="mr-2 form-radio text-teal-600 focus:ring-teal-500"
                  /> Scheduled
                </label>
                <label className="mr-4">
                  <input
                    type="radio"
                    name="deliveryOption"
                    value="both"
                    checked={formData.deliveryOption === 'both'}
                    onChange={handleChange}
                    className="mr-2 form-radio text-teal-600 focus:ring-teal-500"
                  /> Both
                </label>
              </div>
            </div>

            <div className="mb-4 flex">

              <label className="block mt-3 text-gray-700">Select Delivery time</label>
              <input
                type="text"
                name="deliveryTime"
                value={formData.deliveryTime}
                onChange={handleChange}

                className="mt-2 ml-[11.5rem] p-2 w-[20rem] border rounded-md"
                placeholder="Time (in minutes)"
              />
            </div>
            <div className='w-[650px]'>
              <p className="text-gray-500 ml-[20.5rem] right-0 text-sm mt-2">
                Note: Enter here the default time taken for the Delivery of an order. If a merchant is handling their delivery by itself then he will enter his/her own delivery time.</p>
            </div>
          </div>

          <div className="mb-6 flex">
            <h3 className="text-black mb-2 flex">Serving Area</h3>
            <div className="mb-4 ">

              <div className='grid ml-[15rem] gap-3'>
                <label className="mr-4 text-gray-700 text-[14px]">
                  <input
                    type="radio"
                    name="servingArea"
                    value="noRestrictions"
                    checked={formData.servingArea === 'noRestrictions'}
                    onChange={handleChange}
                    className="mr-2 form-radio text-teal-600 focus:ring-teal-500"
                  /> No Serving restrictions (I serve everywhere)
                </label>
                <label className="mr-6 text-gray-700 w-[20rem] text-[14px] flex-col space-x-3">
                  <input
                    type="radio"
                    name="servingArea"
                    value="radius"
                    checked={formData.servingArea === 'radius'}
                    onChange={handleChange}
                    className="mr-2 form-radio text-teal-600 focus:ring-teal-500"
                  /> Mention a radius around the central location of my merchant. Your store will serve within a this radius around your central location.
                  Note: Serving radius 0 means that the Restaurant can serve anywhere.
                </label>
              </div>
              {formData.servingArea === 'radius' && (
                <input
                  type="text"
                  name="servingRadius"
                  value={formData.servingRadius}
                  onChange={handleChange}
                  className="mt-6 ml-[15rem] p-2 w-[20rem] border rounded-md"
                  placeholder="Serving Radius (in km)"
                />
              )}
            </div>
          </div>



          <div className="mb-6 flex">
            <div className='flex'>
              <h3 className="text-gray-700 mb-2 mt-3 ">Sponsorship Status</h3>
              <div className="mb-4 w-[20rem] p-5 justify-center ml-[12rem] shadow-lg">
                <label className="block text-gray-700">Current Chosen Plan</label>
                <p className="text-gray-500">{formData.chosenPlan}</p>
              </div>
            </div>
          </div>

          <div className="mb-6 flex">
            <h3 className="text-black mb-2 flex">Choose or Renew Plan</h3>
            <div className='grid ml-[11rem] gap-3'>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: 'monthly', label: 'Monthly', price: '₹250' },
                  { value: '3months', label: '3 months', price: '₹750' },
                  { value: '6months', label: '6 months', price: '₹1500' },
                  { value: 'yearly', label: '1 year', price: '₹3000' },
                ].map((plan, index) => (
                  <label key={index} className="flex items-center border p-3 gap-1 rounded-lg">
                    <input
                      type="radio"
                      name="plan"
                      value={plan.value}
                      checked={formData.plan === plan.value}
                      onChange={handleChange}
                      className="mr-2 justify-between"
                    /> {plan.label}({plan.price})
                  </label>
                ))}
              </div>

              <button type="button" className="bg-teal-700 text-white p-2 rounded-md w-[20rem] mt-4">Pay</button>
              <p className='w-[25rem] text-[14px] text-gray-700'>Note :Choose the date range for showing your shop on top of the sheet and reach your customers more easily.</p>
            </div>
          </div>






          <div className="mb-6 flex mt-10">
            <h3 className="text-gray-700 font-bold mb-2">Time wise availability</h3>
            <div className="mb-4">
              <div className="flex items-center justify-center ml-[11rem] gap-16">
                <label className="mr-4">
                  <input
                    type="radio"
                    name="timeAvailability"
                    value="full"
                    checked={formData.timeAvailability === 'full'}
                    onChange={handleChange}
                  /> Full time
                </label>
                <label className="mr-4">
                  <input
                    type="radio"
                    name="timeAvailability"
                    value="specific"
                    checked={formData.timeAvailability === 'specific'}
                    onChange={handleChange}
                  /> Specific time
                </label>
              </div>
            </div>
          </div>

          {formData.timeAvailability === 'specific' && (
            <div className="grid grid-cols-1 gap-4 text-black">
              <div className='flex justify-between w-3/6 text-[16px] font-semibold'>
                <ul>Week day</ul>
                <ul>Open all day</ul>
                <ul>Close all day</ul>
                <ul>Specific Time</ul>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {Object.keys(formData.weekdays).map((day, index) => (
                  <div key={index} className="flex items-center">
                    <label className="w-1/4 capitalize">{day}</label>
                    <div className="flex items-center gap-16 justify-start -ml-12">
                      <label className="mr-4">
                        <input
                          type="radio"
                          name={`${day}.open`}
                          value={true}
                          checked={formData.weekdays[day].open}
                          onChange={handleChangeRadio}
                          className="mr-2"
                        />
                      </label>
                      <label className="mr-4">
                        <input
                          type="radio"
                          name={`${day}.closed`}
                          value={true}
                          checked={formData.weekdays[day].closed}
                          onChange={handleChangeRadio}
                          className="mr-2"
                        />
                      </label>
                      <label className="mr-4">
                        <input
                          type="radio"
                          name={`${day}.specific`}
                          value={true}
                          checked={formData.weekdays[day].specific}
                          onChange={handleChangeRadio}
                          className="mr-2"
                        />
                      </label>
                      {formData.weekdays[day].specific &&
                        <div className='flex ml-2 justify-start'>
                          <input
                            type="text"
                            name={`${day}.startTime`}
                            value={formData.weekdays[day].startTime}
                            onChange={handleChangeRadio}
                            className="py-2 border rounded-md text-center"
                            placeholder="Start Time (HH:MM)"
                          />
                          <input
                            type="text"
                            name={`${day}.endTime`}
                            value={formData.weekdays[day].endTime}
                            onChange={handleChangeRadio}
                            className="py-2 border text-center rounded-md"
                            placeholder="End Time (HH:MM)"
                          />
                        </div>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}




          <div className="flex justify-end items-center gap-3 mt-8">
            <button type="button" className="bg-gray-300  px-6 p-1 rounded-md">Cancel</button>
            <button type="submit" className="bg-teal-700 text-white px-6 p-1 rounded-md">Save</button>
          </div>


        </form>
      </div>
    </section>
  )
}

export default MerchantDetails;
