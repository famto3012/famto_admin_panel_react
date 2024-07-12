import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import { ArrowDownOutlined, BellOutlined, SearchOutlined } from '@ant-design/icons';
import { FilterAltOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import StarRating from '../../../components/model/StarRating';


const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const dummyData = [
        {
          id: "01",
          name: "Nandhu",
          email: "nandhu1806@gmail.com",
          phone: "9876543210",
          lastPlatform: "platform",
          registrationDate: "18/06/2024",
          rating: 4, // Example rating (dummy data)
        },
        // Add more customers as needed
      ];

      setCustomers(dummyData);
    };

    fetchCustomers();
  }, []);

  return (
    <>
      <Sidebar />

      <div className="w-full h-screen pl-[290px] bg-gray-100">
        <div className="flex justify-end p-4 gap-7">
          <BellOutlined className="text-2xl text-gray-500" />
          <div className="relative">
            <input
              type="search"
              name="search"
              placeholder="Search"
              className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none mr-6"
            />
            <button type="submit" className="absolute right-0 top-0 mt-2 mr-9">
              <SearchOutlined className="text-xl text-gray-500" />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between mx-11 mt-5">
          <h1 className="text-lg font-bold">Customers</h1>
          <button className="bg-cyan-100 text-black rounded-md px-4 py-2 font-semibold flex items-center space-x-2">
            <ArrowDownOutlined /> <span>CSV</span>
          </button>
        </div>
        <div className="mx-11 rounded-lg mt-5 flex p-4 justify-between">
          <select
            name="type"
            defaultValue=""
            className="bg-cyan-100 px-4 outline-none rounded-lg focus:outline-none "
          >
            <option hidden value="">
              Geofence
            </option>
            <option value="customer" className="bg-white">
              option1
            </option>
            <option value="agent" className="bg-white">
              option2
            </option>
            <option value="merchant" className="bg-white">
              option3
            </option>
          </select>
          <div>
            <FilterAltOutlined className="text-gray-400 " />
            <input
              type="search"
              name="search"
              placeholder="Search alert notification name"
              className="bg-white h-10 px-5 pr-2 rounded-full ml-8 w-72 text-sm focus:outline-none"
            />
            <button type="submit" className="absolute right-20 mt-2">
              <SearchOutlined className="text-xl text-gray-500" />
            </button>
          </div>
        </div>
        <div className="overflow-auto mt-[20px] w-full">
          <table className="text-start w-full">
            <thead>
              <tr>
                {[
                  "ID",
                  "Name",
                  "Email",
                  "Phone",
                  "Last Platform Used",
                  "Registration Date",
                  "Rating",
                ].map((header, index) => (
                  <th
                    key={index}
                    className="bg-teal-700 text-center text-white py-[20px] border-r-2 border-[#eee]/50"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="align-middle border-b border-gray-300 text-center">
                  <td className="p-4">
                    <Link to={`/customer-detail/${customer.id}`} className='underline underline-offset-4'>{customer.id}</Link>
                  </td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.lastPlatform}</td>
                  <td>{customer.registrationDate}</td>
                  <td>
                    <StarRating rating={customer.rating} />
                  </td> {/* Display Rating as stars */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Customers;
