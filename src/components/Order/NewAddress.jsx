import { useState } from "react";
import MapModal from "./MapModal";
import { useMap } from "../../context/MapContext";
import { useToast } from "@chakra-ui/react";

const NewAddress = ({ onAddCustomerAddress, BASE_URL, token }) => {
  const { coordinates } = useMap();

  const [addressData, setAddressData] = useState({
    type: "",
    fullName: "",
    phoneNumber: "",
    flat: "",
    area: "",
    landmark: "",
    saveAddress: false,
  });
  const [showButton, setShowButton] = useState(true);

  const [selectedType, setSelectedType] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const toast = useToast();

  const handleChangeAddress = (e) => {
    setAddressData({ ...addressData, [e.target.name]: e.target.value });
  };

  const handleButtonClick = (type) => {
    setSelectedType(type);
    setAddressData({ ...addressData, type });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !addressData.type ||
      !addressData.fullName ||
      !addressData.phoneNumber ||
      !addressData.flat ||
      !addressData.area
    ) {
      toast({
        title: "Error",
        description: "Please fill up all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });

      return;
    }

    if (!coordinates.latitude || !coordinates.longitude) {
      toast({
        title: "Error",
        description: "Please select a location",
        status: "error",
        duration: 3000,
        isClosable: true,
      });

      return;
    }

    const updatedAddressData = {
      ...addressData,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    };

    onAddCustomerAddress(updatedAddressData);

    setShowButton(false);
  };

  return (
    <>
      <div className="flex">
        <label className="w-1/3"></label>
        <div className="mt-6 p-6 bg-gray-200 rounded-lg shadow-lg w-1/2">
          <div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-row space-x-2 justify-around">
                {["home", "work", "others"].map((button) => (
                  <button
                    key={button}
                    type="button"
                    onClick={() => handleButtonClick(button)}
                    className={`px-5 p-2 rounded capitalize flex-1 ${
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
                  className={` ${
                    coordinates?.latitude && coordinates?.longitude
                      ? `bg-teal-700 text-white`
                      : `bg-transparent text-teal-700`
                  } font-medium border border-teal-700 w-2/3 rounded-md mx-auto py-2`}
                >
                  {coordinates?.latitude && coordinates?.longitude
                    ? `Location selected`
                    : `Mark location`}
                </button>

                <MapModal
                  isVisible={modalVisible}
                  onClose={() => setModalVisible(false)}
                  BASE_URL={BASE_URL}
                  token={token}
                  modelId={1}
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

            {showButton && (
              <div className="flex justify-end mt-5 gap-3">
                <button
                  type="button"
                  className={"bg-teal-700 text-white px-4 py-2 rounded w-1/2"}
                  onClick={handleSubmit}
                >
                  Add Address
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewAddress;
