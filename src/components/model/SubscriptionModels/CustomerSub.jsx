import { SearchOutlined } from '@ant-design/icons'
import { FilterAltOutlined } from '@mui/icons-material'
import React from 'react'
import { FaCalendar } from 'react-icons/fa6'

const CustomerSub = () => {
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
        />
        <button type="submit" className="absolute right-0 mt-2 mr-4 ">
          <SearchOutlined className="text-xl text-gray-500" />
        </button>
      </div>
      </div>
    
  )
}

export default CustomerSub
