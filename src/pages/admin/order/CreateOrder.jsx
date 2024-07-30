import { useContext, useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { ArrowBack } from "@mui/icons-material";
import { PlusOutlined } from "@ant-design/icons";
import GlobalSearch from "../../../components/GlobalSearch";
import NewCustomer from "../../../components/Order/NewCustomer";
import TakeAway from "../../../components/Order/TakeAway";
import HomeDelivery from "../../../components/Order/HomeDelivery";
import PickAndDrop from "../../../components/Order/PickAndDrop";
import CustomOrder from "../../../components/Order/CustomOrder";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const CreateOrder = () => {
  const [customerName, setCustomerName] = useState("");
  const [customerId, setCustomerId] = useState("");

  const [deliveryMode, setDeliveryMode] = useState("Take Away");
  const [deliveryOption, setDeliveryOption] = useState("On-demand");
  const [customerResults, setCustomerResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormVisible, setFormVisible] = useState(false);

  const { token, role } = useContext(UserContext);

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }
  }, [token]);

  const handleChangeDeliveryMode = (event) => {
    setDeliveryMode(event.target.value);
  };

  const handleChangeDeliveryOption = (e) => {
    setDeliveryOption(e.target.value);
    if (e.target.value === "Scheduled") {
      showModal();
    }
  };

  const [dateTime, setDateTime] = useState("");

  const handleChange = (e) => {
    setDateTime(e.target.value);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Customer ID:", customerId);
    console.log("Selected Customer Name:", customerName);
    console.log("Selected Option:", deliveryMode);
    console.log("Scheduled DateTime:", dateTime);
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
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setCustomerResults(response.data.data);
        }
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
    setCustomerId(customer._id);
    setCustomerName(customer.fullName);
    setCustomerResults([]);
  };

  // Set the maximum date to 30 days from now
  const currentDate = new Date().toISOString().slice(0, 16); // Format for input type datetime-local
  const maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 16);

  return (
    <>
      <Sidebar />
      <div className="w-full min-h-screen pl-[290px] bg-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <ArrowBack className="ml-7" />
            <span className="text-lg font-bold ml-3">Create Order</span>
          </div>
          <nav className="p-5">
            <GlobalSearch />
          </nav>
        </div>

        <div className="bg-white mx-11 mt-5 p-5 rounded">
          <form onSubmit={formSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex items-center relative">
                <label className="w-1/3 px-6" htmlFor="customer">
                  Select Customer
                </label>
                <div className="relative w-1/2">
                  <input
                    type="search"
                    id="customer"
                    name="customer"
                    placeholder="Search Customer"
                    className="h-10 px-5 text-sm border-2 w-full outline-none focus:outline-none"
                    value={customerName}
                    onChange={handleSearchCustomer}
                  />

                  {isLoading && <p>Loading...</p>}
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
                  <NewCustomer toggleNewCustomerForm={toggleNewCustomerForm} />
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
                    checked={deliveryOption === "On-demand"}
                    onChange={handleChangeDeliveryOption}
                  />
                  <label htmlFor="On-demand" className="mr-4">
                    On-demand
                  </label>
                  <input
                    type="radio"
                    name="deliveryOption"
                    value="Scheduled"
                    checked={deliveryOption === "Scheduled"}
                    onChange={handleChangeDeliveryOption}
                  />
                  <label htmlFor="Scheduled" className="mr-4">
                    Scheduled
                  </label>
                </div>
              </div>

              {deliveryOption === "Scheduled" && (
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
                  <input
                    type="radio"
                    name="deliveryMode"
                    value="Take Away"
                    onChange={handleChangeDeliveryMode}
                    checked={deliveryMode === "Take Away"}
                  />
                  <label htmlFor="Take Away" className="mr-4">
                    Take Away
                  </label>

                  <input
                    type="radio"
                    name="deliveryMode"
                    value="Home Delivery"
                    onChange={handleChangeDeliveryMode}
                    checked={deliveryMode === "Home Delivery"}
                  />
                  <label htmlFor="Home Delivery" className="mr-4">
                    Home Delivery
                  </label>

                  <input
                    type="radio"
                    name="deliveryMode"
                    value="Pick and Drop"
                    onChange={handleChangeDeliveryMode}
                    checked={deliveryMode === "Pick and Drop"}
                    className="mr-2"
                  />
                  <label htmlFor="Pick and Drop">Pick & Drop</label>

                  <input
                    type="radio"
                    name="deliveryMode"
                    value="Custom Order"
                    onChange={handleChangeDeliveryMode}
                    checked={deliveryMode === "Custom Order"}
                    className="mr-2"
                  />
                  <label htmlFor="Custom Order" className="mr-4">
                    Custom Order
                  </label>
                </div>
              </div>
            </div>

            {deliveryMode === "Take Away" && (
              <div className="mt-8">
                <TakeAway />
              </div>
            )}

            {deliveryMode === "Home Delivery" && (
              <div className="mt-8">
                <HomeDelivery />
              </div>
            )}
            {deliveryMode === "Pick and Drop" && (
              <div className="mt-8">
                <PickAndDrop />
              </div>
            )}
            {deliveryMode === "Custom Order" && (
              <div className="mt-8">
                <CustomOrder />
              </div>
            )}

            <div className="flex justify-center mt-16">
              <button
                type="submit"
                className="py-2 px-20 text-white rounded-lg bg-primary-green-0"
              >
                Create Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateOrder;
