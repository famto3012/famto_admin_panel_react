import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const CommissionComponent = () => {
  const [isLoading,setIsLoading]=useState(false);
  const { token, role } = useContext(UserContext);
  const navigate = useNavigate();
  const toast = useToast()
  const [isForm, setIsForm] = useState({

    commissionType:"Fixed",
    merchantId: "",
    commissionValue: "",
  });
  
  const fetchData = (commissionType) => {
    console.log(`Fetching data for commission type: ${commissionType}`);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIsForm({ ...isForm, [name]: value });
    if (name === "commissionType") {
      fetchData(value);
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        setIsLoading(true);
        const addResponse = await axios.post(
          `${BASE_URL}/admin/commission/add-commission`,isForm,
          {
            withCredentials:true,
            headers:{Authorization:`Bearer ${token}`}
          }
        )
        if(addResponse.status===200){
          console.log(isForm);
          toast({
            title:"Created",
            description:"Commission Created Successfully",
            status:"success",
            duration:900,
            isClosable:true,
          })
        }
    }catch(err){
     console.log(`Error in fetching data:${err}`)
     toast({
      title:"Error",
      description:"There was an error occured",
      status:"error",
      duration:900,
      isClosable:true,
    })
    }finally{
     setIsLoading(false);
    }
    };

  return (
    <div className="flex m-20 h-screen min-w-fit">
      <form className=" rounded w-fit pl-[300px] mx-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-8 ">
          <div className="flex items-center">
            <label className=" w-1/3 text-gray-600">Commission setup</label>
            <input
              type="radio"
              id="Fixed"
              name="commissionType"
              value="Fixed"
              checked={isForm.commissionType === "Fixed"}
              onChange={handleInputChange}
              className="mr-2 ml-6"
            />
            <label htmlFor="Fixed" className="w-[200px] text-gray-600">
              Set fixed amount (in₹)
            </label>
            <input
              type="radio"
              id="Percentage"
              name="commissionType"
              value="Percentage"
              checked={isForm.commissionType === "Percentage"}
              onChange={handleInputChange}
              className="mr-2"
            />
            <label htmlFor="Percentage" className="w-[200px] text-gray-600">
              Set a percentage (%)
            </label>
          </div>

          <div className="flex items-center">
            <label htmlFor="merchantId" className="w-1/3 text-gray-600">
              Merchant ID
            </label>
            <input
              type="text"
              id="merchantId"
              name="merchantId"
              value={isForm.merchantId}
              onChange={handleInputChange}
              className="border-2 border-gray-300 rounded p-2 w-2/3 outline-none focus:outline-none"
              placeholder="Lorem Ipsum"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="commissionValue" className="w-1/3 text-gray-600">
              Commission Value
            </label>
            <input
              type="text"
              id="commissionValue"
              name="commissionValue"
              value={isForm.commissionValue}
              onChange={handleInputChange}
              className="w-2/3 p-2 border border-gray-300 rounded outline-none focus:outline-none"
              placeholder="Lorem Ipsum"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="w-2/3  bg-teal-700 text-white py-2 rounded outline-none focus:outline-none"
            >
              Apply Commission
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommissionComponent;
