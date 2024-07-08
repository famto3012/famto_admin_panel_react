import React from 'react'
import Sidebar from '../../components/Sidebar'
import GlobalSearch from '../../components/GlobalSearch'
import { SearchOutlined } from '@ant-design/icons'

const Products = () => {
  return (
  <>
  <Sidebar/>
  <div className='pl-[300px] bg-gray-100'>
     <nav className='p-5'><GlobalSearch/></nav>
     <div className='flex justify-between bg-white p-5 mx-5 rounded-md'>
        <select
        name='name'
        value="merchant"
        className='bg-blue-50 p-2 rounded'
        >
            <option value="option 1">Merchant Name</option>
        </select>
        <div>
        <input
        type='search'
        name='search'
        className='bg-gray-100 relative p-2 rounded-2xl'
        placeholder='Search records'
        />
        <SearchOutlined className='absolute -ml-7 mt-3'/>
        </div>
     </div>
     </div>
   </>
  )
}

export default Products
