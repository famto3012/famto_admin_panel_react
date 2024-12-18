import { useContext, useEffect, useState } from "react";
import { ArrowBack, SearchOutlined } from "@mui/icons-material";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

import GlobalSearch from "../../../components/GlobalSearch";
import NewCustomer from "../../../components/Order/NewCustomer";
import TakeAway from "../../../components/Order/TakeAway";
import HomeDelivery from "../../../components/Order/HomeDelivery";
import PickAndDrop from "../../../components/Order/PickAndDrop";
import CustomOrder from "../../../components/Order/CustomOrder";
import { UserContext } from "../../../context/UserContext";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const CreateOrder = () => {
  const [topData, setTopData] = useState({
    customerId: null,
    customerAddress: [],
    deliveryOption: "On-demand",
    deliveryMode: "Take Away",
    ifScheduled: {},
  });

  const [customerName, setCustomerName] = useState("");
  const [customerResults, setCustomerResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormVisible, setFormVisible] = useState(false);

  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  const [time, setTime] = useState(new Date());

  const { token, role } = useContext(UserContext);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/auth/login");
  }, [token]);

  const deliveryModes = [
    "Take Away",
    "Home Delivery",
    role !== "Merchant" && "Pick and Drop",
    role !== "Merchant" && "Custom Order",
  ].filter(Boolean);

  const handleChangeDeliveryMode = (e) => {
    setTopData({ ...topData, [e.target.name]: e.target.value });
  };

  const handleChangeDeliveryOption = (e) => {
    setTopData({ ...topData, [e.target.name]: e.target.value });
  };

  const toggleNewCustomerForm = () => {
    setFormVisible(!isFormVisible);
    setCustomerName("");
    setTopData({ ...topData, customerAddress: [] });
  };

  const handleSearchCustomer = async (e) => {
    const query = e.target.value;
    setCustomerName(query);

    if (query.length >= 3) {
      setIsLoading(true);
      try {
        const endPoint =
          role === "Admin"
            ? `${BASE_URL}/admin/customers/search-for-order?query=${query}`
            : `${BASE_URL}/admin/customers/search-customer-of-merchant-for-order?query=${query}`;

        const response = await axios.get(endPoint, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) setCustomerResults(response.data.data);
      } catch (err) {
        toast({
          title: "Error",
          description: "An error occoured while searching the customer",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      setCustomerResults([]);
    }
  };

  const isToday =
    startDate && startDate.toDateString() === new Date().toDateString();

  // Calculate the minimum selectable time as 1.5 hours from now
  const minimumSelectableTime = new Date();
  minimumSelectableTime.setMinutes(minimumSelectableTime.getMinutes() + 90);

  const handleDateChange = (update) => {
    setDateRange(update);
    const [newStartDate] = update;

    if (
      newStartDate &&
      newStartDate.toDateString() === new Date().toDateString()
    ) {
      setTime(minimumSelectableTime);
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

  useEffect(() => {
    // Format the start and end dates
    const formattedStartDate = startDate
      ? startDate.toLocaleDateString("en-CA")
      : null;
    const formattedEndDate = endDate
      ? endDate.toLocaleDateString("en-CA")
      : null;
    // Format the time
    const formattedTime = time
      ? time.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : null;

    setTopData((prevState) => ({
      ...prevState,
      ifScheduled: {
        ...prevState.ifScheduled,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        time: formattedTime,
      },
    }));
  }, [startDate, endDate, time]);

  return (
    <>
      <div className="w-full pl-[290px] bg-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <ArrowBack
              className="ml-7 cursor-pointer"
              onClick={() => navigate("/all-orders")}
            />
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
                        {result.fullName} - {result.phoneNumber}
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
              <div className="flex items-center">
                <label className="w-1/3 px-6 text-gray-700 invisible">
                  Select Delivery Date and time
                </label>

                <div className="flex gap-5 justify-start z-50">
                  <DatePicker
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={handleDateChange}
                    dateFormat="yyyy/MM/dd"
                    withPortal
                    className="border-2 p-2 rounded-lg cursor-pointer mt-2 outline-none focus:outline-none"
                    placeholderText="Select Date range"
                    minDate={new Date()}
                  />

                  <DatePicker
                    selected={time}
                    onChange={(time) => setTime(time)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    dateFormat="h:mm aa"
                    showTimeCaption={false}
                    className="border-2 p-2 rounded-lg cursor-pointer mt-2 outline-none focus:outline-none"
                    placeholderText="Select Time"
                    minTime={
                      isToday
                        ? minimumSelectableTime
                        : new Date(new Date().setHours(0, 0, 0, 0))
                    } // Apply minimum time if today
                    maxTime={new Date(new Date().setHours(23, 59, 59, 999))}
                  />
                </div>
              </div>
            )}

            <div className="flex items-center mt-2">
              <label className="w-1/3 px-6 text-gray-700">
                Select Delivery Mode
              </label>
              <div className="flex items-center space-x-2 w-2/3 gap-3">
                {deliveryModes.map((mode) => (
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

            {role === "Admin" && (
              <>
                {topData?.deliveryMode === "Pick and Drop" && (
                  <PickAndDrop data={topData} />
                )}

                {topData?.deliveryMode === "Custom Order" && (
                  <CustomOrder data={topData} />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateOrder;
