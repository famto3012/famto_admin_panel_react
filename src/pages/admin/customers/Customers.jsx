import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import {
  ArrowDownOutlined,
  BellOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { FilterAltOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import StarRating from "../../../components/model/StarRating";
import GlobalSearch from "../../../components/GlobalSearch";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
import { filter } from "@chakra-ui/react";
const BASE_URL= import.meta.env.VITE_APP_BASE_URL;

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading,setIsLoading] = useState(false)
  const {token,role}=useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(!token || role !== "Admin"){
      navigate("/auth/login");
      return;
    }
    const fetchCustomers = async () => {
      try{
        setIsLoading(true);
        const [customersResponse] =
        await Promise.all([
          axios.get(`${BASE_URL}/admin/customers/get-all` , {
            withCredentials:true,
            headers:{Authorization : `Bearer ${token}`},
          }),
         ])
        if(customersResponse.status===200)
        {
          setCustomers(customersResponse.data.data)
        }
      }
      catch(err){
        console.error(`Error in fetchingdata:${err}`);
      }finally{
        setIsLoading(false);
      }
     
    }; fetchCustomers();
  }, [token,role,navigate]);


  
   
  return (
    <>
      <Sidebar />

      <div className="w-full h-screen pl-[290px] bg-gray-100">
      <nav className="p-5">
          <GlobalSearch />
        </nav>
        <div className="flex items-center justify-between mx-8 mt-5">
          <h1 className="text-lg font-bold">Customers</h1>
          <button className="bg-cyan-100 text-black rounded-md px-4 py-2 font-semibold flex items-center space-x-2">
            <ArrowDownOutlined /> <span>CSV</span>
          </button>
        </div>
        <div className="mx-8 rounded-lg mt-5 flex p-6 bg-white justify-between">
          <select
            name="type"
            // value={geofence}
            className="bg-blue-50 px-4 outline-none rounded-lg focus:outline-none "
            // onChange={selectChange}
          >
            <option hidden value="">
              Geofence
            </option>
            <option value="customer" className="bg-white">
              Searched Customers
            </option>
          
          </select>
          <div>
            <FilterAltOutlined className="text-gray-400 " />
            <input
              type="search"
              name="search"
              placeholder="Search customer ID"
              className="bg-gray-100 h-10 px-5 pr-2 rounded-full ml-4 w-72 text-sm focus:outline-none"
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
                <tr
                  key={customer._id}
                  className="align-middle border-b border-gray-300 text-center"
                >
                  <td className="p-4">
                    <Link
                      to={`/customer-detail/${customer._id}`}
                      className="underline underline-offset-4"
                    >
                      {customer._id}
                    </Link>
                  </td>
                  <td>{customer.fullName}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phoneNumber}</td>
                  <td>{customer.lastPlatformUsed}</td>
                  <td>{customer.registrationDate}</td>
                  <td>
                    <StarRating rating={customer.averageRating} />
                  </td>{" "}
                  {/* Display Rating as stars */}
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
