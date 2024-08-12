import { useState } from "react";
import MapModalTwo from "./MapModalTwo";

const NewAddressTwo = ({ onAddCustomerAddress, BASE_URL, token }) => {
  const [addressData, setAddressData] = useState({
    type: "",
    latitude: null,
    longitude: null,
    fullName: "",
    phoneNumber: "",
    flat: "",
    area: "",
    landmark: "",
    saveAddress: false,
  });
  const [selectedType, setSelectedType] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleChangeAddress = (e) => {
    setAddressData({ ...addressData, [e.target.name]: e.target.value });
  };

  const setCoordinates = ({ latitude, longitude }) => {
    setAddressData({ ...addressData, latitude, longitude });
  };

  const handleButtonClick = (type) => {
    setSelectedType(type);
    setAddressData({ ...addressData, type });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(addressData);
    onAddCustomerAddress(addressData);
    setAddressData({
      type: "",
      latitude: null,
      longitude: null,
      fullName: "",
      phoneNumber: "",
      flat: "",
      area: "",
      landmark: "",
      saveAddress: false,
    });
    setSelectedType("");
  };

  const showButton =
    !addressData.type ||
    !addressData.latitude ||
    !addressData.longitude ||
    !addressData.fullName ||
    !addressData.phoneNumber ||
    !addressData.flat ||
    !addressData.area;

  return (
    <>
      <div className="flex">
        <label className="w-1/3"></label>
        <div className="mt-6 p-6 bg-gray-200 rounded-lg shadow-lg w-1/2">
          <div>
            <div className="flex flex-col gap-3">
              <div className="flex space-x-2 justify-around mx-2">
                {["home", "work", "others"].map((button) => (
                  <button
                    key={button}
                    type="button"
                    onClick={() => handleButtonClick(button)}
                    className={`px-5 p-2 rounded capitalize ${
                      selectedType === button
                        ? "bg-teal-700 text-white"
                        : "bg-transparent border border-teal-700 text-teal-700 outline-none focus:outline-none"
                    }`}
                  >
                    {button}
                  </button>
                ))}
              </div>

              <div className="flex item-center">
                <label className="w-1/3 text-md font-semibold mt-2">
                  Full Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  className="w-2/3 px-3 py-2 bg-white rounded focus:outline-none outline-none"
                  value={addressData.fullName}
                  onChange={handleChangeAddress}
                />
              </div>

              <div className="flex items-center">
                <label className="w-1/3 text-md font-medium">
                  Phone Number<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  className="w-2/3 px-3 py-2 bg-white rounded focus:outline-none outline-none"
                  value={addressData.phoneNumber}
                  onChange={handleChangeAddress}
                />
              </div>

              <div className="flex items-center">
                <label className="w-1/3 text-md font-medium ">
                  Flat/House no/Floor<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="flat"
                  placeholder="Flat/House no/Floor"
                  className="w-2/3 px-3 py-2 bg-white rounded focus:outline-none outline-none"
                  value={addressData.flat}
                  onChange={handleChangeAddress}
                />
              </div>

              <div className="flex items-center">
                <label className="w-1/3 text-md font-medium">
                  Area/Locality<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="area"
                  placeholder="Area/Locality"
                  className="w-2/3 px-3 py-2 bg-white rounded focus:outline-none outline-none"
                  value={addressData.area}
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
                  className="w-2/3 px-3 py-2 bg-white rounded focus:outline-none outline-none"
                  value={addressData.landmark}
                  onChange={handleChangeAddress}
                />
              </div>

              <div className="flex items-center">
                <label className="w-1/3 text-md font-medium ">Location</label>
                <button
                  type="button"
                  onClick={() => setModalVisible(true)}
                  className="font-medium bg-teal-700 text-white w-2/3 rounded-md mx-auto py-2"
                >
                  {`Mark location`}
                </button>

                <MapModalTwo
                  isVisible={modalVisible}
                  onClose={() => setModalVisible(false)}
                  setCoordinates={setCoordinates}
                  BASE_URL={BASE_URL}
                  token={token}
                />
              </div>

              <div className="flex">
                <input
                  type="checkbox"
                  name="addressBook"
                  value="true"
                  checked={addressData.saveAddress}
                  className="mr-2"
                  onChange={(e) =>
                    setAddressData({
                      ...addressData,
                      saveAddress: e.target.checked,
                    })
                  }
                />
                Save this address to address book
              </div>
            </div>

            <div className="flex justify-end mt-5 gap-3">
              <button
                type="button"
                // disabled={showButton}
                // className={`${
                //   showButton
                //     ? "bg-teal-700/50 text-white"
                //     : "bg-teal-700 text-white"
                // }  px-4 py-2 rounded w-1/2`}
                className={"bg-teal-700 text-white px-4 py-2 rounded w-1/2"}
                onClick={handleSubmit}
              >
                Add Address
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewAddressTwo;
