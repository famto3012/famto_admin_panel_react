import React from "react";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import LocationOnOutlined from "@mui/icons-material/LocationOnOutlined";

const Addresscomponent = () => {
  const [addressData, setAddressData] = useState({
    locationaddress: "",
    fullName: "",
    phone: "",
    houseno: "",
    type: "",
    locality: "",
    landmark: "",
    adressBook: "false",
  });

  const [isFormVisible, setFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  const handleChangeAddress = (e) => {
    setAddressData({ ...addressData, [e.target.name]: e.target.value });
  };

  const [selected, setSelected] = useState("Home");

  const handleButtonClick = (value) => {
    setSelected(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(addressData, selected);
  };

  return (
    <>
      <div className="flex">
        <label className="w-1/3"></label>
        <div className="mt-6 p-6 bg-gray-200 rounded-lg shadow-lg w-1/2">
          <form on onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-center relative">
                <div className="relative w-full">
                  <input
                    type="text"
                    name="locationaddress"
                    id="locationaddress"
                    placeholder="Search Location in a map"
                    className="rounded-md px-3 py-2 text-sm border-2 w-full outline-none focus:outline-none"
                    value={addressData.locationaddress}
                    onChange={handleChangeAddress}
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-0 mt-2 mr-2"
                  >
                    <LocationOnOutlined />
                  </button>
                </div>
              </div>
              <div className="flex space-x-2 justify-around mx-2">
                {["Home", "Office", "Others"].map((button) => (
                  <button
                    key={button}
                    type="button"
                    onClick={() => handleButtonClick(button)}
                    className={`px-5 p-2 rounded ${
                      selected === button
                        ? "bg-teal-700 text-white"
                        : "bg-transparent border border-teal-700 text-teal-700 outline-none focus:outline-none"
                    }`}
                  >
                    {button}
                  </button>
                ))}
              </div>

              <div className="flex item-center">
                <label className="  w-1/3 text-md font-semibold mt-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="fullName"
                  className=" w-2/3 px-3 py-2 bg-white rounded focus:outline-none outline-none"
                  value={addressData.fullName}
                  onChange={handleChangeAddress}
                />
              </div>
              <div className="flex items-center">
                <label className="w-1/3 text-md font-medium">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  className="w-2/3 px-3 py-2 bg-white rounded focus:outline-none outline-none"
                  value={addressData.phone}
                  onChange={handleChangeAddress}
                />
              </div>
              <div className="flex items-center">
                <label className="w-1/3 text-md font-medium ">
                  Flat / House no / Floor *
                </label>
                <input
                  type="text"
                  name="houseno"
                  placeholder="Flat/House no/Floor"
                  className=" w-2/3 px-3 py-2  bg-white   rounded focus:outline-none outline-none"
                  value={addressData.houseno}
                  onChange={handleChangeAddress}
                />
              </div>
              <div className="flex items-center">
                <label className="w-1/3 text-md font-medium">
                  Area / Locality *
                </label>
                <input
                  type="text"
                  name="locality"
                  placeholder="Area/Locality"
                  className=" w-2/3 px-3 py-2 bg-white  rounded focus:outline-none outline-none"
                  value={addressData.locality}
                  onChange={handleChangeAddress}
                />
              </div>
              <div className="flex items-center">
                <label className="w-1/3 text-md font-medium ">
                  Nearby Landmark
                </label>
                <input
                  type="text"
                  name="landmark"
                  placeholder="Landmark"
                  className=" w-2/3 px-3 py-2 bg-white  rounded focus:outline-none outline-none"
                  value={addressData.landmark}
                  onChange={handleChangeAddress}
                />
              </div>
            </div>
            <div className="flex justify-between mt-5 gap-3">
              <button
                type="button"
                className="bg-cyan-100 px-4 py-2 w-1/2"
                onClick={toggleFormVisibility}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-teal-700 text-white px-4 py-2 rounded w-1/2 "
                onClick={handleSubmit}
              >
                Add Address
              </button>
            </div>
            <div className="mt-6 flex">
              <input
                type="checkbox"
                name="adressBook"
                value="true"
                checked={addressData.adressBook === "true"}
                className="mr-2"
                onChange={handleChangeAddress}
              />
              Save this address to adress book
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Addresscomponent;
