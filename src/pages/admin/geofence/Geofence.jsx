import React from 'react'
import Sidebar from '../../../components/Sidebar'
import { BellOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";


const Geofence = () => {
  const data = [
    {
        time: "Lorem Ipsum",
        head: "lorem ipsum",
    },
    


]
 
  return (
    <>
    <Sidebar />
    <div className="w-full min-h-screen pl-[300px] bg-gray-100 flex flex-col">
        <div className="flex justify-end p-4 gap-7">
          <BellOutlined className="text-2xl text-gray-500" />
          <div className="relative">
            <input
              type="search"
              name="search"
              placeholder="Search"
              className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none mr-5"
            />
            <button type="submit" className="absolute right-0 top-0 mt-2 mr-9">
              <SearchOutlined className="text-xl text-gray-600" />
            </button>
          </div>
        </div>
        <div className='flex items-center justify-between mx-10'>
         <h1 className='font-bold text-lg'>Geofence</h1>
         <Link to="/add-geofence"
              className="bg-teal-700 text-white rounded-md flex items-center px-9 py-2 "
            >
              <PlusOutlined className="mr-2" /> Add Geofence
            </Link>
        </div>
        <p className=' text-gray-500  mx-10 mt-5'>A geofence is a virtual perimeter for a real-world geographic area. Different geofences can be assigned to a single city.</p>
        <div className='flex justify-between mt-10 gap-5 mx-10'>

           <div className='w-1/3'>
           {data.map((data) => (
                                <Card className='bg-zinc-100 mt-5 flex hover:bg-teal-800 hover:text-white'>
                                    <div className='flex justify-evenly mx-5'>
                                    <div className=' flex items-center'>
                                        <p className='bg-cyan-200 rounded-full p-4 text-white '></p>
                                    </div>
                                    <div>
                                    <CardBody> 
                                        <Typography variant="h5" color="blue-gray" className="">
                                            {data.time}
                                        </Typography>
                                        <Typography>
                                            {data.head}
                                        </Typography>
                                    </CardBody>
                                    </div>
                                    <div className="flex items-center">
                                      <MoreHorizOutlinedIcon />
                                    </div>
                        
                                    </div>
                                </Card>
                            ))}
           </div>
           <div className='flex  mb-24'>
            <img src='geoFence.svg'/>
            </div>





        </div>





        </div>
      
    </>
  )
}

export default Geofence
