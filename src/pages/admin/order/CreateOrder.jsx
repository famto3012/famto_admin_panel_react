import { useContext, useEffect, useState } from "react";
import { ArrowBack, SearchOutlined } from "@mui/icons-material";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

import Sidebar from "../../../components/Sidebar";
import GlobalSearch from "../../../components/GlobalSearch";
import NewCustomer from "../../../components/Order/NewCustomer";
import TakeAway from "../../../components/Order/TakeAway";
import HomeDelivery from "../../../components/Order/HomeDelivery";
import PickAndDrop from "../../../components/Order/PickAndDrop";
import CustomOrder from "../../../components/Order/CustomOrder";
import { UserContext } from "../../../context/UserContext";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const CreateOrder = () => {
  const [topData, setTopData] = useState({
    customerId: null,
    customerAddress: [],
    deliveryOption: "On-demand",
    deliveryMode: "Take Away",
  });

  const [customerName, setCustomerName] = useState("");
  const [customerResults, setCustomerResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormVisible, setFormVisible] = useState(false);
  const [dateTime, setDateTime] = useState("");

  const { token } = useContext(UserContext);

  useEffect(() => {
    if (!token) navigate("/auth/login");
  }, [token]);

  const handleChangeDeliveryMode = (e) => {
    setTopData({ ...topData, [e.target.name]: e.target.value });
  };

  const handleChangeDeliveryOption = (e) => {
    setTopData({ ...topData, [e.target.name]: e.target.value });
    if (e.target.value === "Scheduled") showModal();
  };

  const handleChange = (e) => {
    setDateTime(e.target.value);
  };

  const toggleNewCustomerForm = () => {
    setFormVisible(!isFormVisible);
  };

  const handleSearchCustomer = async (e) => {
    const query = e.target.value;
    setCustomerName(query);

    if (query.length >= 3) {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/admin/customers/search?query=${query}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 200) setCustomerResults(response.data.data);
      } catch (err) {
        console.log(`Error in searching customer: ${err}`);
      } finally {
        setIsLoading(false);
      }
    } else {
      setCustomerResults([]);
    }
  };

  const selectCustomer = (customer) => {
    setTopData((prevState) => ({
      ...prevState,
      customerId: customer._id,
      customerAddress: customer.address,
    }));
    setCustomerName(customer.fullName);
    setCustomerResults([]);
  };

  const handleAddCustomer = (newCustomer) => {
    setFormVisible(true);
    setTopData({ ...topData, newCustomer });
  };

  const currentDate = new Date().toISOString().slice(0, 16);
  const maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 16);

  return (
    <>
      <Sidebar />
      <div className="w-full pl-[290px] bg-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <ArrowBack className="ml-7" />
            <span className="text-lg font-bold ml-3">Create Order</span>
          </div>
          <nav className="p-5">
            <GlobalSearch />
          </nav>
        </div>

        <div className="bg-white mx-11 mt-5 mb-[35px] p-5 rounded">
          <div className="flex flex-col gap-6">
            <div className="flex items-center relative">
              <label className="w-1/3 px-6" htmlFor="customer">
                Select Customer
              </label>
              <div className="relative w-1/2">
                <input
                  type="text"
                  id="customer"
                  name="customer"
                  placeholder="Search Customer"
                  className="h-10 ps-3 text-sm border-2 w-full outline-none focus:outline-none"
                  value={customerName}
                  onChange={handleSearchCustomer}
                />
                {isLoading ? (
                  <ClipLoader
                    size={15}
                    className="absolute top-[30%] right-[10px]"
                  />
                ) : (
                  <SearchOutlined className="text-xl text-gray-500 absolute top-[30%] right-[10px]" />
                )}
                {customerResults.length > 0 && (
                  <ul className="absolute bg-white border w-full mt-1">
                    {customerResults.map((result) => (
                      <li
                        key={result._id}
                        className="p-2 hover:bg-gray-200 cursor-pointer"
                        onClick={() => selectCustomer(result)}
                      >
                        {result.fullName} - {result.email}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div>
              <div className="flex">
                <label className="w-1/3"></label>
                <button
                  type="button"
                  className="w-1/2 bg-gray-200 font-semibold py-2 rounded flex justify-between items-center px-4 border border-gray-300"
                  onClick={toggleNewCustomerForm}
                >
                  <span>Add Customer</span>
                  <PlusOutlined />
                </button>
              </div>
              {isFormVisible && (
                <NewCustomer
                  toggleNewCustomerForm={toggleNewCustomerForm}
                  onAddCustomer={handleAddCustomer}
                />
              )}
            </div>

            <div className="flex items-center mt-1">
              <label className="w-1/3 px-6 text-gray-700">
                Select Delivery Option
              </label>
              <div className="flex items-center space-x-2 gap-2">
                <input
                  type="radio"
                  name="deliveryOption"
                  value="On-demand"
                  checked={topData?.deliveryOption === "On-demand"}
                  onChange={handleChangeDeliveryOption}
                />
                <label htmlFor="On-demand" className="mr-4">
                  On-demand
                </label>
                <input
                  type="radio"
                  name="deliveryOption"
                  value="Scheduled"
                  checked={topData?.deliveryOption === "Scheduled"}
                  onChange={handleChangeDeliveryOption}
                />
                <label htmlFor="Scheduled" className="mr-4">
                  Scheduled
                </label>
              </div>
            </div>

            {topData?.deliveryOption === "Scheduled" && (
              <div className="relative flex justify-center my-8 ml-24">
                <input
                  type="datetime-local"
                  id="datetime"
                  name="datetime"
                  className="h-10 text-sm px-3 border-2 w-1/2 ml-10 outline-none focus:outline-none"
                  value={dateTime}
                  min={currentDate}
                  max={maxDate}
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="flex items-center mt-2">
              <label className="w-1/3 px-6 text-gray-700">
                Select Delivery Mode
              </label>
              <div className="flex items-center space-x-2 w-2/3 gap-3">
                {[
                  "Take Away",
                  "Home Delivery",
                  "Pick and Drop",
                  "Custom Order",
                ].map((mode) => (
                  <div key={mode} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="deliveryMode"
                      value={mode}
                      onChange={handleChangeDeliveryMode}
                      checked={topData?.deliveryMode === mode}
                      className="cursor-pointer"
                    />
                    <label htmlFor={mode} className="ms-1.5 cursor-pointer">
                      {mode}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {topData?.deliveryMode === "Take Away" && (
              <TakeAway data={topData} />
            )}

            {topData?.deliveryMode === "Home Delivery" && (
              <HomeDelivery data={topData} />
            )}

            {topData?.deliveryMode === "Pick and Drop" && (
              <PickAndDrop data={topData} />
            )}

            {topData?.deliveryMode === "Custom Order" && (
              <CustomOrder data={topData} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateOrder;
