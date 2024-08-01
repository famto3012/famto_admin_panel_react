import { PlusOutlined } from "@ant-design/icons";
import { AddOutlined } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import NewAddress from "./NewAddress";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { UserContext } from "../../context/UserContext";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const PickAndDrop = ({ data }) => {
  const [pickAndDropData, setPickAndDropData] = useState({
    items: [],
    pickUpAddressType: "",
    pickUpAddressOtherAddressId: "",
    deliveryAddressType: "",
    deliveryAddressOtherAddressId: "",
    newPickupAddress: {},
    newDeliveryAddress: {},
    vehicleType: "",
    instructionInPickup: "",
    instructionInDelivery: "",
    addedTip: 0,
  });

  const [allCustomerAddress, setAllCustomerAddress] = useState([]);
  useEffect(() => {
    setAllCustomerAddress(data.customerAddress);
  }, [data]);

  const [cartData, setCartData] = useState({});

  const [isInvoiceLoading, setIsInvoiceLoading] = useState(false);
  const [isOrderLoading, setIsOrderLoading] = useState(false);

  const [paymentMode, setPaymentMode] = useState("");

  const { token } = useContext(UserContext);
  const toast = useToast();

  const [selectedVehicle, setSelectedVehicle] = useState("");

  const [selectedPickUpAddress, setSelectedPickUpAddress] = useState("");
  const [selectedPickOtherAddressId, setSelectedPickOtherAddressId] =
    useState("");

  const [selectedDeliveryAddress, setSelectedDeliveryAddress] = useState("");
  const [selectedDeliveryOtherAddressId, setSelectedDeliveryOtherAddressId] =
    useState("");

  const [isNewPickupAddressVisible, setIsNewPickupAddressVisible] =
    useState(false);
  const [isNewDeliveryAddressVisible, setIsNewDeliveryAddressVisible] =
    useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }
  }, [token]);

  const itemTypes = [
    "Documents & Parcels",
    "Food & Groceries",
    "Clothing & Laundry",
    "Medical Supplies",
    "Personal Items",
    "Gifts & Flowers",
    "Electronics",
    "Household Items",
    "Books & Stationery",
    "Online Orders",
    "Pet Supplies",
    "Automotive Parts",
    "Others",
  ];

  const handleInputChange = (e) => {
    setPickAndDropData({
      ...pickAndDropData,
      [e.target.name]: e.target.value,
    });
  };

  const handleItemChange = (section, index, e) => {
    const { name, value } = e.target;
    setPickAndDropData((prevData) => {
      const items = [...prevData.items];
      items[index] = { ...items[index], [name]: value };
      return {
        ...prevData,
        items,
      };
    });
  };

  const handleAddItem = (section) => {
    setPickAndDropData((prevData) => ({
      ...prevData,
      items: [
        ...prevData.items,
        { type: "", length: "", width: "", height: "", weight: "" },
      ],
    }));
  };

  const handleRemoveItem = (section, index) => {
    setPickAndDropData((prevData) => {
      const items = [...prevData.items];
      items.splice(index, 1);
      return {
        ...prevData[section],
        items,
      };
    });
  };

  const toggleNewPickupAddress = () => {
    setIsNewPickupAddressVisible(!isNewPickupAddressVisible);
  };

  const toggleNewDeliveryAddress = () => {
    setIsNewDeliveryAddressVisible(!isNewDeliveryAddressVisible);
  };

  const handleAddCustomerAddress = () => {};

  const createInvoice = async (e) => {
    e.preventDefault();

    try {
      setIsInvoiceLoading(true);
      const invoiceData = {
        customerId: data.customerId,
        newCustomer: data.newCustomer,
        deliveryOption: data.deliveryOption,
        deliveryMode: data.deliveryMode,
        ...pickAndDropData,
      };

      console.log(invoiceData);

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
        const { data } = response.data;
        setCartData(data);
        toast({
          title: "Invoice",
          description: "Invoice created successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(`Error in creating invoice: ${err}`);
      toast({
        title: "Error",
        description: "Error in creating invoice",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsInvoiceLoading(false);
    }
  };

  const createOrder = async (e) => {
    e.preventDefault();
    try {
      setIsOrderLoading(true);

      const response = await axios.post(
        `${BASE_URL}/orders/admin/create-order`,
        {
          paymentMode,
          cartId: cartData.cartId,
          deliveryMode: cartData.deliveryMode,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        toast({
          title: "Success",
          description: response.data.message,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(`Error in creating order: ${err}`);
      toast({
        title: "Error",
        description: "Error in creating invoice",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setIsOrderLoading(false);
    }
  };

  const handleSelectPickUpAddress = (type) => {
    setSelectedPickUpAddress(type);
    setPickAndDropData({ ...pickAndDropData, pickUpAddressType: type });
  };
  const handleSelectDeliveryAddress = (type) => {
    setSelectedDeliveryAddress(type);
    setPickAndDropData({ ...pickAndDropData, deliveryAddressType: type });
  };
  const handleSelectVehicle = (type) => {
    setSelectedVehicle(type);
    setPickAndDropData({ ...pickAndDropData, vehicleType: type });
  };

  return (
    <div>
      <h1 className="bg-teal-800 text-white px-6 py-4 text-xl font-semibold">
        Pick Up
      </h1>
      {/* onSubmit={createInvoice} */}
      <form>
        <div className="flex flex-col gap-6">
          <div className="flex items-center mt-[30px]">
            <label className="w-1/3 px-6" htmlFor="address">
              Select Pickup Address
            </label>

            {allCustomerAddress?.length === 0 && <p>No address found</p>}

            {allCustomerAddress?.length > 0 && (
              <div className="">
                {allCustomerAddress?.map((address, index) => (
                  <input
                    key={index}
                    type="button"
                    className={`py-2 px-4 me-2 rounded border capitalize ${
                      selectedPickUpAddress === address.type
                        ? "bg-gray-300"
                        : "bg-white"
                    }`}
                    value={address.type}
                    onClick={() => handleSelectPickUpAddress(address.type)}
                  />
                ))}

                {selectedPickUpAddress === "other" && (
                  <div className="flex items-center gap-3 mt-[14px] py-2 max-w-[350px] overflow-x-auto">
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
                            checked={
                              selectedPickOtherAddressId === otherAddr.id
                            }
                            onChange={() => {
                              setSelectedPickOtherAddressId(otherAddr.id);
                              setPickAndDropData({
                                ...pickAndDropData,
                                selectedPickOtherAddressId: otherAddr.id,
                              });
                            }}
                          />
                          <span className="flex flex-col gap-1 ms-2 ">
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
          {selectedPickUpAddress === "home" && (
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

          {selectedPickUpAddress === "work" && (
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
            <div className="flex">
              <label className="w-1/3"></label>
              <button
                type="button"
                className="w-1/2 bg-gray-200 font-semibold py-2 rounded flex justify-between items-center px-4 border border-gray-300"
                onClick={toggleNewPickupAddress}
              >
                <span>Add Address</span>
                <PlusOutlined />
              </button>
            </div>
            {isNewPickupAddressVisible && (
              <NewAddress onAddCustomerAddress={handleAddCustomerAddress} />
            )}
          </div>

          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="orderTime">
              Order Time
            </label>
            <input
              type="text"
              name="orderTime"
              placeholder="In scheduled order, it will be filled automatically as scheduled"
              className="h-10 ps-3 text-sm border-2 w-1/2 rounded-md outline-none focus:outline-none"
              value={pickAndDropData.orderTime}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="pickData.instructions">
              Pick Instructions (if any)
            </label>
            <input
              type="text"
              name="instructionInPickup"
              placeholder="Instructions"
              className="h-10 ps-3 text-sm border-2 w-1/2 rounded-md outline-none focus:outline-none"
              value={pickAndDropData.instructionInPickup}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 px-6">Task Specifications</label>
            <button
              type="button"
              className="bg-zinc-200 w-1/2 rounded-md p-2"
              onClick={() => handleAddItem("pickData")}
            >
              <AddOutlined /> Add Item
            </button>
          </div>

          <div>
            {pickAndDropData?.items?.map((item, index) => (
              <div
                key={index}
                className="bg-gray-100 mx-6 p-10 rounded-lg mb-4"
              >
                <div className="flex">
                  <label className="w-1/3">Item type</label>
                  <select
                    name="itemName"
                    value={item.itemName}
                    onChange={(e) => handleItemChange("pickData", index, e)}
                    className="w-1/2 p-3 outline-none focus:outline-none"
                  >
                    <option defaultValue={"Select item type"} hidden>
                      Select item type
                    </option>
                    {itemTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex mt-5">
                  <label className="w-1/3">Dimensions (in cm)</label>
                  <div className="w-1/2 gap-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        name="length"
                        value={item.length}
                        onChange={(e) => handleItemChange("pickData", index, e)}
                        className="outline-none focus:outline-none border border-gray-200 p-3 rounded w-1/3"
                        placeholder="Length"
                      />
                      <input
                        type="text"
                        name="width"
                        value={item.width}
                        onChange={(e) => handleItemChange("pickData", index, e)}
                        className="outline-none focus:outline-none border border-gray-200 p-3 rounded w-1/3"
                        placeholder="Width"
                      />
                      <input
                        type="text"
                        name="height"
                        value={item.height}
                        onChange={(e) => handleItemChange("pickData", index, e)}
                        className="outline-none focus:outline-none border border-gray-200 p-3 rounded w-1/3"
                        placeholder="Height"
                      />
                    </div>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="weight"
                        value={item.weight}
                        onChange={(e) => handleItemChange("pickData", index, e)}
                        className="outline-none focus:outline-none border border-gray-200 p-3 rounded w-full"
                        placeholder="Weight (in kg)"
                      />
                    </div>
                  </div>
                </div>
                <div className="mx-3 flex justify-between mt-3 gap-3">
                  <button
                    type="button"
                    className="bg-zinc-200 w-1/2 rounded-md p-2 flex items-center justify-center gap-2"
                    onClick={() => handleAddItem("pickData")}
                  >
                    <AddOutlined /> Add Item
                  </button>
                  <button
                    type="button"
                    className="bg-red-100 w-1/2 rounded-md p-2 flex items-center justify-center gap-2"
                    onClick={() => handleRemoveItem("pickData", index)}
                  >
                    <RiDeleteBinLine /> Remove Item
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h1 className="bg-teal-800 text-white px-6 py-4 text-xl font-semibold mt-[40px]">
          Drop Off
        </h1>

        <div className="flex flex-col gap-6">
          <div className="flex items-center mt-[30px]">
            <label className="w-1/3 px-6" htmlFor="address">
              Select Drop Address
            </label>
            {allCustomerAddress?.length === 0 && <p>No address found</p>}

            {allCustomerAddress?.length > 0 && (
              <div className="">
                {allCustomerAddress?.map((address, index) => (
                  <input
                    key={index}
                    type="button"
                    className={`py-2 px-4 me-2 rounded border capitalize ${
                      selectedDeliveryAddress === address.type
                        ? "bg-gray-300"
                        : "bg-white"
                    }`}
                    value={address.type}
                    onClick={() => handleSelectDeliveryAddress(address.type)}
                  />
                ))}

                {selectedDeliveryAddress === "other" && (
                  <div className="flex items-center gap-3 mt-[14px] py-2 max-w-[350px] overflow-x-auto">
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
                            checked={
                              selectedDeliveryOtherAddressId === otherAddr.id
                            }
                            onChange={() => {
                              setSelectedDeliveryOtherAddressId(otherAddr.id);
                              setPickAndDropData({
                                ...pickAndDropData,
                                deliveryAddressOtherAddressId: otherAddr.id,
                              });
                            }}
                          />
                          <span className="flex flex-col gap-1 ms-2 ">
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

          {selectedDeliveryAddress === "home" && (
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

          {selectedDeliveryAddress === "work" && (
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
            <div className="flex">
              <label className="w-1/3"></label>
              <button
                type="button"
                className="w-1/2 bg-gray-200 font-semibold py-2 rounded flex justify-between items-center px-4 border border-gray-300"
                onClick={toggleNewDeliveryAddress}
              >
                <span>Add Address</span>
                <PlusOutlined />
              </button>
            </div>
            {isNewDeliveryAddressVisible && (
              <NewAddress onAddCustomerAddress={handleAddCustomerAddress} />
            )}
          </div>

          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="orderTime">
              Order Time
            </label>
            <input
              type="text"
              name="dropData.orderTime"
              placeholder="In scheduled order, it will be filled automatically as scheduled"
              className="h-10 ps-3 text-sm border-2 w-1/2 rounded-md outline-none focus:outline-none"
              value={pickAndDropData.orderTime}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="dropData.instructions">
              Drop Instructions (if any)
            </label>
            <input
              type="text"
              name="instructionInDelivery"
              placeholder="Instructions"
              className="h-10 ps-3 text-sm border-2 w-1/2 rounded-md outline-none focus:outline-none"
              value={pickAndDropData.instructionInDelivery}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="dropData.addedTip">
              Add Tip
            </label>
            <input
              type="text"
              name="addedTip"
              placeholder="Tip for the delivery"
              className="h-10 ps-3 text-sm border-2 w-1/2 rounded-md outline-none focus:outline-none"
              value={pickAndDropData.addedTip}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="dropData.addedTip">
              Vehicle type
            </label>
            {["Bike", "Scooter"].map((vehicle) => (
              <button
                key={vehicle}
                type="button"
                className={`py-2 px-4 rounded border me-2 ${
                  selectedVehicle === vehicle ? "bg-gray-300" : "bg-white"
                }`}
                onClick={() => handleSelectVehicle(vehicle)}
              >
                {vehicle}
              </button>
            ))}
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
      {cartData?.items && (
        <>
          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="paymentType">
              Payment Type
            </label>
            <select
              name="paymentMode"
              value={paymentMode}
              className="w-1/2 py-2 ps-3 outline-none focus:outline-none border-2"
              onChange={(e) => setPaymentMode(e.target.value)}
            >
              <option defaultValue="Select payment mode" hidden>
                Select payment mode
              </option>
              <option value="Online-payment">Online payment</option>
              <option value="Cash-on-delivery">Cash on delivery</option>
            </select>
          </div>

          <div className="flex mt-5">
            <h1 className="px-6 w-1/3 font-semibold">Bill Summary</h1>
            <div className="overflow-auto w-1/2">
              <table className="border-2 border-teal-700 w-full text-left ">
                <thead>
                  <tr>
                    {["Item", "Amount"].map((header, index) => (
                      <th
                        key={index}
                        className="bg-teal-700 text-white p-4 border-[#eee]/50"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cartData?.items && (
                    <>
                      <tr key={data.index} className="text-left align-middle">
                        <td className="p-4">ItemTotal</td>
                        <td className="p-4">{cartData.billDetail.itemTotal}</td>
                      </tr>
                      <tr key={data.index} className="text-left align-middle">
                        <td className="p-4">Delivery charges</td>
                        <td className="p-4">
                          {cartData?.billDetail?.discountedDeliveryCharge ||
                            cartData?.billDetail?.originalDeliveryCharge ||
                            0}
                        </td>
                      </tr>
                      <tr key={data.index} className="text-left align-middle">
                        <td className="p-4">Added tip</td>
                        <td className="p-4">
                          {cartData?.billDetail?.addedTip || 0}
                        </td>
                      </tr>
                      <tr key={data.index} className="text-left align-middle">
                        <td className="p-4">Discount</td>
                        <td className="p-4">
                          {cartData?.billDetail?.discountedAmount || 0}
                        </td>
                      </tr>
                      <tr key={data.index} className="text-left align-middle">
                        <td className="p-4">Surge charge</td>
                        <td className="p-4">
                          {cartData?.billDetail?.surgePrice || 0}
                        </td>
                      </tr>
                      <tr key={data.index} className="text-left align-middle">
                        <td className="p-4">GST (Inclusive of all Taxes)</td>
                        <td className="p-4">
                          {cartData?.billDetail?.taxAmount || 0}
                        </td>
                      </tr>
                      <tr className="bg-teal-700 text-white font-semibold text-[18px]">
                        <td className="p-4">Net Payable Amount</td>
                        <td className="p-4">
                          ₹{" "}
                          {cartData?.billDetail?.discountedGrandTotal ||
                            cartData?.billDetail?.originalGrandTotal ||
                            0}
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-16 mx-10">
            <button
              className="bg-cyan-50 py-2 px-4 rounded-md text-lg"
              type="button"
            >
              <SaveAltIcon /> Bill
            </button>
            <button
              className="bg-teal-700 text-white py-2 px-4 rounded-md"
              onClick={createOrder}
            >
              {isOrderLoading
                ? `Creating Order....`
                : `Create Order of ₹${
                    cartData.billDetail.discountedGrandTotal ||
                    cartData.billDetail.originalGrandTotal
                  }`}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PickAndDrop;
