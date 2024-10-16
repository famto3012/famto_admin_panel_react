import { useContext, useEffect, useState } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { PlusOutlined } from "@ant-design/icons";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { AddOutlined } from "@mui/icons-material";
import { RiDeleteBinLine } from "react-icons/ri";
import NewAddress from "./NewAddress";
import MapModal from "./MapModal";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { UserContext } from "../../context/UserContext";
import {
  deleteFileFromFirebase,
  uploadFileToFirebase,
} from "../../utils/fileOperation";
import ShowBill from "./ShowBill";
import MapModalTwo from "./MapModalTwo";
import NewAddressTwo from "./NewAddressTwo";
import { useMap } from "../../context/MapContext";
import Select from "react-select";
import { unitOptions } from "../../utils/DefaultData";
import { useDraggable } from "../../hooks/useDraggable";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const CustomOrder = ({ data }) => {
  const [customOrderData, setCustomOrderData] = useState({
    latitude: null,
    longitude: null,
    items: [],
    instructionInDelivery: "",
    deliveryAddressType: "",
    deliveryAddressOtherAddressId: "",
    addedTip: "",
    newDeliveryAddress: {},
  });

  const { coordinates } = useMap();
  const { token } = useContext(UserContext);
  const toast = useToast();
  const {
    isDragging,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
  } = useDraggable();

  useEffect(() => {
    setAllCustomerAddress(data.customerAddress);
  }, [data]);

  const [allCustomerAddress, setAllCustomerAddress] = useState([]);

  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedOtherAddressId, setSelectedOtherAddressId] = useState("");
  const [isFormVisible, setFormVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [cartData, setCartData] = useState({});

  const [isInvoiceLoading, setIsInvoiceLoading] = useState(false);

  const handleAddItem = () => {
    const newItem = { itemName: "", quantity: "", numOfUnits: "", unit: "" };
    setCustomOrderData({
      ...customOrderData,
      items: [...customOrderData.items, newItem],
    });
  };

  const handleRemoveItem = async (index) => {
    const updatedItems = [...customOrderData.items];
    const itemToRemove = updatedItems[index];

    // Check if the item has an image URL to delete
    if (itemToRemove && itemToRemove.itemImageURL) {
      try {
        await deleteFileFromFirebase(itemToRemove.itemImageURL);
      } catch (error) {
        toast({
          title: "Error",
          description: "Error in deleting item image",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }

    // Remove the item from the array
    updatedItems.splice(index, 1);

    // Update the state with the new items array
    setCustomOrderData({ ...customOrderData, items: updatedItems });
  };

  const handleItemChange = (index, option) => {
    const updatedItems = [...customOrderData.items];
    updatedItems[index] = { ...updatedItems[index], unit: option.value };
    setCustomOrderData({ ...customOrderData, items: updatedItems });
  };

  const handleImageChange = async (index, e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const itemImageURL = await uploadFileToFirebase(
          file,
          "Custom-order-item-Image"
        );

        const updatedItems = [...customOrderData.items];
        updatedItems[index] = {
          ...updatedItems[index],
          itemImageURL,
        };
        setCustomOrderData({ ...customOrderData, items: updatedItems });
      } catch (error) {
        toast({
          title: "Error",
          description: "Error in uploading image",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomOrderData({ ...customOrderData, [name]: value });
  };

  const handleSelectAddressType = (type) => {
    // Check if the type is already selected
    const newSelectedAddress = selectedAddress === type ? "" : type;

    setSelectedAddress(newSelectedAddress);
    setCustomOrderData({
      ...customOrderData,
      deliveryAddressType: newSelectedAddress,
    });
  };

  const handleSelectOtherAddress = (id) => {
    setSelectedOtherAddressId(id);
    setCustomOrderData({
      ...customOrderData,
      deliveryAddressOtherAddressId: id,
    });
  };

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  const setCoordinates = ({ latitude, longitude }) => {
    setCustomOrderData({ ...customOrderData, latitude, longitude });
  };

  const handleAddNewDeliveryAddress = (address) => {
    setCustomOrderData((prevState) => ({
      ...prevState,
      newDeliveryAddress: {
        ...address,
      },
    }));
  };

  const handleCloseMap = (e) => {
    e.preventDefault();

    if (coordinates) {
      setCustomOrderData({
        ...customOrderData,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      });
    }

    setModalVisible(false);
  };

  const createInvoice = async (e) => {
    e.preventDefault();
    try {
      setIsInvoiceLoading(true);

      const invoiceData = {
        ...customOrderData,
        ifScheduled: {
          startDate: data?.ifScheduled?.startDate,
          endDate: data?.ifScheduled?.endDate,
          time: data?.ifScheduled?.time,
        },
        customPickupLocation: [
          customOrderData.latitude,
          customOrderData.longitude,
        ],
        customerId: data.customerId,
        deliveryMode: data.deliveryMode,
        deliveryOption: data.deliveryOption,
        newCustomer: data.newCustomer,
      };

      const response = await axios.post(
        `${BASE_URL}/orders/admin/create-order-invoice`,
        invoiceData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setCartData(response.data.data);
        toast({
          title: "Success",
          description: "Invoice created successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Error in creating invoice",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsInvoiceLoading(false);
    }
  };

  return (
    <div className="bg-white mt-5 rounded">
      <form onSubmit={createInvoice}>
        <div className="flex flex-col gap-6">
          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="location">
              Search for a location
            </label>

            <div className="w-1/3">
              <button
                type="button"
                onClick={() => setModalVisible(true)}
                className={` ${
                  coordinates?.latitude && coordinates?.longitude
                    ? `bg-teal-700 text-white`
                    : `bg-transparent text-teal-700`
                } font-medium border border-teal-700 w-4/5 rounded-md mx-auto py-2`}
              >
                {coordinates?.latitude && coordinates?.longitude ? (
                  `Location selected`
                ) : (
                  <>
                    Mark location
                    <LocationOnOutlinedIcon className="text-[18px] ms-2" />
                  </>
                )}
              </button>

              <MapModal
                isVisible={modalVisible}
                onClose={handleCloseMap}
                setCoordinates={setCoordinates}
                BASE_URL={BASE_URL}
                token={token}
              />
            </div>
          </div>

          <div className="flex items-start mt-[30px]">
            <h1 className="w-1/3 px-6 invisible">Add Items</h1>
            <div className="w-2/3">
              <button
                className="bg-gray-300 rounded-md flex items-center justify-center font-semibold p-3 w-[40%] "
                type="button"
                onClick={() => handleAddItem()}
              >
                <PlusOutlined className="mr-3" /> Add Item
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center w-full max-h-[500px] overflow-auto ">
            {/* <span className="w-1/3"></span> */}
            {customOrderData.items.map((item, index) => (
              <div
                key={index}
                className="w-2/3 ms-auto bg-gray-200 p-5 rounded-lg mb-4 flex flex-col gap-4"
              >
                <div className="flex items-center">
                  <label className="w-1/3">Item Name</label>
                  <input
                    type="text"
                    name="itemName"
                    value={item.itemName}
                    onChange={(e) => handleItemChange(index, e)}
                    className="flex-grow p-3 outline-none rounded-md focus:outline-none border border-gray-300"
                  />
                </div>

                <div className="flex items-center ">
                  <label className="w-1/3">Quantity</label>
                  <input
                    name="quantity"
                    type="text"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, e)}
                    className="flex-grow p-2.5 me-3 rounded-md outline-none focus:outline-none border border-gray-300"
                  />

                  <Select
                    className="w-[100px] outline-none focus:outline-none z-10"
                    value={unitOptions.find(
                      (option) => option.value === item.unit
                    )}
                    onChange={(option) => handleItemChange(index, option)}
                    options={unitOptions}
                    placeholder="Unit"
                    isClearable={false}
                    isSearchable={false}
                    menuPortalTarget={document.body}
                    styles={{
                      control: (base) => ({
                        ...base,
                        padding: "5px",
                        borderColor: "#d1d5db",
                        borderRadius: "0.375rem",
                        boxShadow: "none",
                        "&:hover": {
                          borderColor: "#a1a1aa",
                        },
                      }),
                      valueContainer: (base) => ({
                        ...base,
                        padding: "0 8px",
                      }),
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    }}
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-1/3">Number of units</label>
                  <input
                    name="numOfUnits"
                    type="text"
                    value={item.numOfUnits}
                    onChange={(e) => handleItemChange(index, e)}
                    className="flex-grow p-2.5 rounded-md outline-none focus:outline-none border border-gray-300"
                  />
                </div>

                {item.itemImageURL && (
                  <div className="flex items-center gap-4">
                    <figure className="h-20 w-20 bg-gray-400 rounded overflow-hidden">
                      <img
                        src={item.itemImageURL}
                        alt="Item image"
                        className="w-full h-full object-cover"
                      />
                    </figure>
                  </div>
                )}

                <div className="flex justify-between mt-3 gap-3">
                  <input
                    type="file"
                    name="adImage"
                    id={`adImage-${index}`}
                    className="hidden"
                    onChange={(e) => handleImageChange(index, e)}
                  />
                  <label
                    htmlFor={`adImage-${index}`}
                    className="bg-gray-300 w-1/2 rounded-md p-2 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <AddOutlined />
                    Upload Photo
                  </label>

                  <button
                    type="button"
                    className="bg-red-100 w-1/2 rounded-md p-2 flex items-center justify-center gap-2"
                    onClick={() => handleRemoveItem(index)}
                  >
                    <RiDeleteBinLine className="text-red-500 text-[18px]" />
                    Delete Item
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="agentinstructions">
              Instructions to Delivery Agent
            </label>
            <input
              className="h-10 ps-3 text-sm border-2 w-1/2 outline-none focus:outline-none"
              type="text"
              placeholder="Instruction to agent"
              id="instructionInDelivery"
              name="instructionInDelivery"
              value={customOrderData.instructionInDelivery}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center ">
            <label className="w-1/3 px-6" htmlFor="address">
              Select Delivery Address
            </label>

            {allCustomerAddress?.length === 0 && <p>No address found</p>}

            {allCustomerAddress?.length > 0 && (
              <div className="">
                {allCustomerAddress?.map((address, index) => (
                  <input
                    key={index}
                    type="button"
                    className={`py-2 px-4 me-2 rounded border capitalize cursor-pointer ${
                      selectedAddress === address.type
                        ? "bg-gray-300"
                        : "bg-white"
                    }`}
                    value={address.type}
                    onClick={() => handleSelectAddressType(address.type)}
                  />
                ))}

                {selectedAddress === "other" && (
                  <div
                    className={`flex items-center gap-[20px] mt-[14px] py-2 max-w-[550px] overflow-x-auto ${
                      isDragging ? "cursor-grabbing" : "cursor-grab"
                    }`}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                  >
                    {data?.customerAddress
                      .find((addr) => addr.type === "other")
                      ?.otherAddress?.map((otherAddr) => (
                        <div
                          key={otherAddr.id}
                          className="flex items-center gap-2 bg-gray-100 p-3 border-2 border-gray-300 rounded-md"
                        >
                          <input
                            type="radio"
                            name="otherAddress"
                            value={otherAddr.id}
                            checked={selectedOtherAddressId === otherAddr.id}
                            onChange={() =>
                              handleSelectOtherAddress(otherAddr.id)
                            }
                          />
                          <span className="flex flex-col w-[150px] gap-1 ms-2">
                            <span>{otherAddr.flat}</span>
                            <span>{otherAddr.area}</span>
                            <span>{otherAddr.landmark}</span>
                          </span>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {selectedAddress === "home" && (
            <div className="px-6 py-2 border-2 rounded-md ms-[33%] bg-gray-100 w-fit">
              {data?.customerAddress.find((addr) => addr.type === "home")
                ?.homeAddress && (
                <div className="flex flex-col gap-1">
                  <span>
                    {
                      data.customerAddress.find((addr) => addr.type === "home")
                        .homeAddress.flat
                    }
                  </span>
                  <span>
                    {
                      data.customerAddress.find((addr) => addr.type === "home")
                        .homeAddress.area
                    }
                  </span>
                  <span>
                    {
                      data.customerAddress.find((addr) => addr.type === "home")
                        .homeAddress.landmark
                    }
                  </span>
                </div>
              )}
            </div>
          )}

          {selectedAddress === "work" && (
            <div className="px-6 py-2 border-2 rounded-md ms-[33%] bg-gray-100 w-fit">
              {data?.customerAddress.find((addr) => addr.type === "work")
                ?.workAddress && (
                <div className="flex flex-col gap-1">
                  <span>
                    {
                      data.customerAddress.find((addr) => addr.type === "work")
                        .workAddress.flat
                    }
                  </span>
                  <span>
                    {
                      data.customerAddress.find((addr) => addr.type === "work")
                        .workAddress.area
                    }
                  </span>
                  <span>
                    {
                      data.customerAddress.find((addr) => addr.type === "work")
                        .workAddress.landmark
                    }
                  </span>
                </div>
              )}
            </div>
          )}

          <div>
            <div className=" flex">
              <label className="w-1/3"></label>
              <button
                type="button"
                className="w-1/2 bg-gray-200 font-semibold py-2 rounded flex justify-between items-center px-4 border border-gray-300"
                onClick={toggleFormVisibility}
              >
                <span>Add Address</span>
                <PlusOutlined />
              </button>
            </div>

            {isFormVisible && (
              <NewAddressTwo
                onAddCustomerAddress={handleAddNewDeliveryAddress}
                BASE_URL={BASE_URL}
                token={token}
              />
            )}
          </div>

          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="tips">
              Tips
            </label>
            <input
              className="h-10 ps-3 text-sm border-2 w-1/2 outline-none focus:outline-none"
              type="text"
              placeholder="Add Tip"
              name="addedTip"
              value={customOrderData.addedTip}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            onClick={createInvoice}
            className="ms-auto me-[6rem] xl:me-[12rem] my-[30px] bg-teal-700 text-white py-2 px-4 rounded-md capitalize"
          >
            {isInvoiceLoading ? `Creating invoice...` : `Create invoice`}
          </button>
        </div>
      </form>

      {cartData?.items && <ShowBill data={cartData} />}
    </div>
  );
};

export default CustomOrder;
