import { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { ArrowBack } from "@mui/icons-material";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import GlobalSearch from "../../../components/GlobalSearch";
import NewCustomer from "../../../components/Order/NewCustomer";
import TakeAway from "../../../components/Order/TakeAway";
import HomeDelivery from "../../../components/Order/HomeDelivery";
import PickAndDrop from "../../../components/Order/PickAndDrop";
import CustomOrder from "../../../components/Order/CustomOrder";

const CreateOrder = () => {
  const [customer, setCustomer] = useState("");
  const [selectedOption, setSelectedOption] = useState("Take Away");
  const [selectOption, setSelectOption] = useState("On-demand");
  const [isFormVisible, setFormVisible] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleOptionChange1 = (event) => {
    setSelectOption(event.target.value);
    if (event.target.value === "Scheduled") {
      showModal();
    }
  };

  const [dateTime, setDateTime] = useState("");

  const handleChange = (event) => {
    setDateTime(event.target.value);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Customer:", customer);
    console.log("Selected Option:", selectedOption);
    console.log("Scheduled DateTime:", dateTime);
  };

  const toggleNewCustomerForm = () => {
    setFormVisible(!isFormVisible);
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
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="absolute right-0 top-0 mt-2 mr-2"
                  >
                    <SearchOutlined className="text-xl text-gray-500" />
                  </button>
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
                    checked={selectOption === "On-demand"}
                    onChange={handleOptionChange1}
                  />
                  <label htmlFor="On-demand" className="mr-4">
                    On-demand
                  </label>
                  <input
                    type="radio"
                    name="deliveryOption"
                    value="Scheduled"
                    checked={selectOption === "Scheduled"}
                    onChange={handleOptionChange1}
                  />
                  <label htmlFor="Scheduled" className="mr-4">
                    Scheduled
                  </label>
                </div>
              </div>

              {selectOption === "Scheduled" && (
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
                    onChange={handleOptionChange}
                    checked={selectedOption === "Take Away"}
                  />
                  <label htmlFor="Take Away" className="mr-4">
                    Take Away
                  </label>

                  <input
                    type="radio"
                    name="deliveryMode"
                    value="Home Delivery"
                    onChange={handleOptionChange}
                    checked={selectedOption === "Home Delivery"}
                  />
                  <label htmlFor="Home Delivery" className="mr-4">
                    Home Delivery
                  </label>

                  <input
                    type="radio"
                    name="deliveryMode"
                    value="Pick and Drop"
                    onChange={handleOptionChange}
                    checked={selectedOption === "Pick and Drop"}
                    className="mr-2"
                  />
                  <label htmlFor="Pick and Drop">Pick & Drop</label>

                  <input
                    type="radio"
                    name="deliveryMode"
                    value="Custom Order"
                    onChange={handleOptionChange}
                    checked={selectedOption === "Custom Order"}
                    className="mr-2"
                  />
                  <label htmlFor="Custom Order" className="mr-4">
                    Custom Order
                  </label>
                </div>
              </div>
            </div>

            {selectedOption === "Take Away" && (
              <div className="mt-8">
                <TakeAway />
              </div>
            )}

            {selectedOption === "Home Delivery" && (
              <div className="mt-8">
                <HomeDelivery />
              </div>
            )}
            {selectedOption === "Pick and Drop" && (
              <div className="mt-8">
                <PickAndDrop />
              </div>
            )}
            {selectedOption === "Custom Order" && (
              <div className="mt-8">
                <CustomOrder />
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateOrder;
