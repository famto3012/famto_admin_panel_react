import { SearchOutlined } from '@ant-design/icons'
import { FilterAltOutlined } from '@mui/icons-material'
import axios from 'axios'
import React, { useRef, useState } from 'react'
import { FaCalendar } from 'react-icons/fa6'

const CustomerSub = (
  setCustomerlog,
  token,
  BASE_URL
) => {
  const [searchFilter,setSearchFilter] = useState()
  // const dateInputRef = useRef(null);
  // const openDatePicker = () => {
  //   console.log("clicked");
  //   if (dateInputRef.current) {
  //     dateInputRef.current.showPicker(); // Open the date picker using showPicker()
  //   }
  // };
  const onSearchChange = (e) => {
    const searchService = e.target.value;
    setSearchFilter(searchService);
    if (searchService !== "") {
      handleSearchChangeFilter(searchService);
    } else {
      setCustomerlog([]);
    }
  };

  const handleSearchChangeFilter = async (searchService) => {
    try {
      console.log(token);
      const searchResponse = await axios.get(
        `${BASE_URL}/admin/subscription-payment/customer-subscription-log-search`,
        {
          params: { name: searchService },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (searchResponse.status === 200) {
        setCustomerlog(searchResponse.data);
      }
    } catch (err) {
      console.log(`Error in fetching data`, err);
    }
  };

  return (
  
    <div className="flex gap-7">
    <div className="flex items-center">
        <input
          type="date"
          name="date"
          // ref={dateInputRef} // Attach the ref to the input
          // value={dateFilter}
          // onChange={onDateChange}
          className="hidden top-80" // Keep the input hidden
          style={{ right: "40px", top: "200px" }}
        />
        <button
          // onClick={openDatePicker}
          className="flex items-center justify-center"
        >
          <FaCalendar className="text-gray-400 text-xl" />
        </button>
      </div>
      <div className="flex items-center">
        <FilterAltOutlined className="text-gray-400 " />
      </div>
      <div className="relative flex justify-end">
        <input
          type="search"
          name="search"
          placeholder="Search customer name"
          className="bg-white h-10 p-3 rounded-full w-60 text-sm focus:outline-none "
          value={searchFilter}
          onChange={onSearchChange}

        />
        <button type="submit" className="absolute right-0 mt-2 mr-4 ">
          <SearchOutlined className="text-xl text-gray-500" />
        </button>
      </div>
      </div>
    
  )
}

export default CustomerSub
