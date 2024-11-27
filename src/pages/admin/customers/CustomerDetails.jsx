import { useContext, useEffect, useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import BlockIcon from "@mui/icons-material/Block";
import { PlusOutlined } from "@ant-design/icons";
import { MdOutlineEdit } from "react-icons/md";
import GlobalSearch from "../../../components/GlobalSearch";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import BlockCustomerModal from "../../../components/model/Customer/BlockCustomerModal";
import CustomerRatingModal from "../../../components/model/Customer/CustomerRatingModal";
import AddMoneyModal from "../../../components/model/Customer/AddMoneyModal";
import DeductMoneyModal from "../../../components/model/Customer/DeductMoneyModal";
import { useToast } from "@chakra-ui/react";
import AddressModal from "../../../components/model/Customer/AddressModal";
import { useDraggable } from "../../../hooks/useDraggable";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const CustomerDetails = () => {
  const [customer, setCustomer] = useState({});

  const { token, role } = useContext(UserContext);
  const { customerId } = useParams();
  const navigate = useNavigate();

  const toast = useToast();
  const {
    isDragging,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
  } = useDraggable();

  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showDeductModeyModal, setShowDeducMoneyModal] = useState(false);
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);

  const [showSaveButton, setShowSaveButton] = useState(false);

  const [addressToEdit, setAddressToEdit] = useState({
    fullName: "",
    phoneNumber: "",
    flat: "",
    area: "",
    landmark: "",
    coordinates: [],
  });
  const [selectedAddress, setSelectedAddress] = useState({
    type: "",
    addressId: "",
  });

  const [editMode, setEditMode] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!token || role !== "Admin") {
      navigate("/auth/login");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/admin/customers/${customerId}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          setCustomer(response.data.data);
        }
      } catch (err) {
        console.error(`Error in fetching data: ${err}`);
      }
    };

    fetchData();
  }, [token, customerId, navigate, customer.walletTransactionDetail]);

  const handleEditClick = () => {
    setEditMode(!editMode);
    setShowSaveButton(!showSaveButton);
  };

  const handleCancelEditClick = () => {
    setEditMode(!editMode);
    setShowSaveButton(!showSaveButton);
  };

  const toggleBlockModal = () => setShowBlockModal(true);
  const toggleDeductMoney = () => setShowDeducMoneyModal(true);
  const toggleAddMoney = () => setShowAddMoneyModal(true);
  const toggleRatingModal = () => setShowRatingModal(true);

  const handleCancelModal = () => {
    setAddressToEdit({});
    setShowBlockModal(false);
    setShowDeducMoneyModal(false);
    setShowAddMoneyModal(false);
    setShowRatingModal(false);
    setShowAddressModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({
      ...customer,
      [name]: value,
    });
  };

  const handleUpdateAddress = (type, addressId) => {
    setSelectedAddress({
      type,
      addressId,
    });

    if (type === "home") {
      setAddressToEdit(customer.homeAddress);
    } else if (type === "work") {
      setAddressToEdit(customer.workAddress);
    } else if (type === "other") {
      const addressFound = customer.otherAddress.find(
        (address) => address.id === addressId
      );
      setAddressToEdit(addressFound);
    }

    setShowAddressModal(true);
  };

  const handleChangeAddress = (updatedAddress) => {
    if (updatedAddress.type === "home") {
      setCustomer((prevData) => ({
        ...prevData,
        homeAddress: {
          ...updatedAddress,
        },
      }));
    } else if (updatedAddress.type === "work") {
      setCustomer((prevData) => ({
        ...prevData,
        workAddress: {
          ...updatedAddress,
        },
      }));
    } else if (updatedAddress.type === "other") {
      setCustomer((prevData) => ({
        ...prevData,
        otherAddress: prevData.otherAddress.map((address) =>
          address.id === selectedAddress.addressId
            ? { ...address, ...updatedAddress }
            : address
        ),
      }));
    }
  };

  const handleAddMoney = (data) => {
    setCustomer((prevData) => ({
      ...prevData,
      walletTransactionDetail: [
        data,
        ...(prevData.walletTransactionDetail || []),
      ],
    }));
  };

  const handleDeductMoney = (data) => {
    setCustomer((prevData) => ({
      ...prevData,
      walletTransactionDetail: [
        data,
        ...(prevData.walletTransactionDetail || []),
      ],
    }));
  };

  const handleMarkBlocked = () => {
    setCustomer({ ...customer, isBlocked: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const response = await axios.put(
        `${BASE_URL}/admin/customers/edit-customer/${customerId}`,
        customer,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setEditMode(false);
        setShowSaveButton(false);
        toast({
          title: "Success",
          description: `Customer updated successfully`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: `Error in updating customer`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className=" pl-[290px] bg-gray-100">
        <nav className="p-5">
          <GlobalSearch />
        </nav>

        <div className="flex items-center justify-between mx-11 mt-5">
          <h1 className="text-lg font-bold">
            Customer ID <span className="text-red-600">#{customer._id}</span>
          </h1>
          {!customer.isBlocked && (
            <button
              className="bg-yellow-100 text-black rounded-md  px-3 py-1 font-semibold flex items-center"
              onClick={toggleBlockModal}
            >
              <BlockIcon className=" text-red-600 mr-2" /> Block
            </button>
          )}
        </div>

        <div className="bg-white mx-7 py-4 mt-5 ">
          <div className="grid grid-cols-2 xl:grid-cols-6 mt-10">
            <div className="col-span-4 rounded-lg mx-6 ">
              <form>
                <div className="flex gap-6">
                  <div className="p-3 flex flex-col w-full gap-3">
                    <div className="flex items-center ">
                      <label htmlFor="fullName" className="w-1/3 text-sm">
                        Full name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={customer.fullName}
                        onChange={handleChange}
                        className={`${
                          editMode && `border-2`
                        } h-8 px-2 rounded-sm text-sm focus:outline-none w-2/3`}
                        disabled={!editMode}
                      />
                    </div>

                    <div className="flex items-center">
                      <label htmlFor="email" className="w-1/3 text-sm">
                        Email <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={customer.email}
                        onChange={handleChange}
                        className={`${
                          editMode && `border-2`
                        } h-8 px-2 rounded-sm text-sm focus:outline-none w-2/3`}
                        disabled={!editMode}
                      />
                    </div>

                    <div className="flex items-center">
                      <label htmlFor="phone" className="w-1/3 text-sm">
                        Phone <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="phoneNumber"
                        value={customer.phoneNumber}
                        onChange={handleChange}
                        className={`${
                          editMode && `border-2`
                        } h-8 px-2 rounded-sm text-sm focus:outline-none w-2/3`}
                        disabled={!editMode}
                      />
                    </div>
                  </div>

                  <div className="p-3 flex flex-col w-full gap-3">
                    <div className="flex items-center">
                      <label
                        htmlFor="registrationDate"
                        className="w-2/5 text-sm"
                      >
                        Registration Date
                      </label>
                      <input
                        name="registrationDate"
                        value={customer.registrationDate}
                        onChange={handleChange}
                        className="h-8 px-2 rounded-sm text-sm focus:outline-none w-3/5 "
                        disabled={!editMode}
                      />
                    </div>

                    <div className="flex items-center">
                      <label
                        htmlFor="lastPlatformUsed"
                        className="w-2/5 text-sm"
                      >
                        Platform Used
                      </label>
                      <input
                        type="text"
                        name="lastPlatformUsed"
                        value={customer.lastPlatformUsed}
                        onChange={handleChange}
                        className="h-8 px-2 rounded-sm text-sm focus:outline-none w-3/5  "
                        disabled={!editMode}
                      />
                    </div>

                    <div className="flex items-center">
                      <label htmlFor="referalcode" className="w-2/5 text-sm">
                        Referal Code
                      </label>
                      <input
                        type="text"
                        name="referalcode"
                        value={customer.referalcode}
                        onChange={handleChange}
                        className="h-8 px-2 rounded-sm text-sm focus:outline-none w-3/5"
                        disabled={!editMode}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <figure className="h-16 w-16 ms-[10rem] xl:ms-0 mt-[30px] xl:mt-0">
              {customer?.customerDetail?.customerImageURL && (
                <img
                  src={customer?.customerDetail?.customerImageURL}
                  alt={customer?.name}
                  className="w-full h-full object-cover"
                />
              )}

              {!customer?.customerDetail?.customerImageURL && (
                <div className="bg-gray-400 h-16 w-16 "></div>
              )}
            </figure>

            <div className="mt-[30px] xl:mt-0">
              <button
                type="button"
                onClick={handleEditClick}
                disabled={editMode}
                className="bg-teal-100 flex items-center p-2 rounded-lg mr-3 cursor-pointer"
              >
                <MdOutlineEdit className=" rounded-lg " />
                <span className="ml-3">Edit Customer</span>
              </button>
            </div>
          </div>

          <div className="w-[600px] flex items-center justify-between gap-[30px] mt-10">
            <label className="text-gray-700 mx-11 font-bold">Ratings</label>

            <button
              type="button"
              onClick={toggleRatingModal}
              className="bg-teal-700 text-white p-2 rounded-md w-[20rem]"
            >
              Show ratings and reviews
            </button>
          </div>

          <div className="mt-10">
            <h4 className="text-gray-700 mx-11 font-bold">Address</h4>

            <div
              className={`flex gap-[30px] ms-11 my-5 max-w-[800px] overflow-x-auto overflow-element ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
              }`}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              <div className="min-w-[180px] px-2 group relative">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold bg-gray-200 py-1 px-2 rounded-md">
                    Home
                  </h2>
                  <MdOutlineEdit
                    onClick={(e) => handleUpdateAddress("home", "")}
                    className=" absolute top-0 right-0 hidden group-hover:block cursor-pointer bg-gray-200 p-2 rounded-full"
                    size={40}
                  />
                </div>

                <span className="flex justify-start mt-3">
                  {customer?.homeAddress?.fullName}
                </span>
                <span className="flex justify-start">
                  {customer?.homeAddress?.phoneNumber}
                </span>
                <span className="flex justify-start">
                  {customer?.homeAddress?.flat}
                </span>
                <span className="flex justify-start">
                  {customer?.homeAddress?.area}
                </span>
                <span className="flex justify-start">
                  {customer?.homeAddress?.landmark}
                </span>
              </div>

              <div className=" min-w-[180px] px-2 group relative">
                <div className="flex justify-between">
                  <h2 className="font-semibold bg-gray-200 py-1 px-2 rounded-md">
                    Work
                  </h2>
                  <MdOutlineEdit
                    onClick={(e) => handleUpdateAddress("work", "")}
                    className=" absolute top-0 right-0 hidden group-hover:block cursor-pointer bg-gray-200 p-2 rounded-full"
                    size={40}
                  />
                </div>

                <span className="flex justify-start mt-3">
                  {customer?.workAddress?.fullName}
                </span>
                <span className="flex justify-start">
                  {customer?.workAddress?.phoneNumber}
                </span>
                <span className="flex justify-start">
                  {customer?.workAddress?.flat}
                </span>
                <span className="flex justify-start">
                  {customer?.workAddress?.area}
                </span>
                <span className="flex justify-start">
                  {customer?.workAddress?.landmark}
                </span>
              </div>

              <div className="flex gap-[30px]">
                {customer?.otherAddress?.map((address, index) => (
                  <div
                    key={index}
                    className="min-w-[200px] px-2 group relative"
                  >
                    <div className="flex justify-between">
                      <h2 className="font-semibold bg-gray-200 py-1 px-2 rounded-md">
                        Other {index + 1}
                      </h2>
                      <MdOutlineEdit
                        onClick={(e) =>
                          handleUpdateAddress("other", address.id)
                        }
                        className=" absolute top-0 right-0 hidden group-hover:block cursor-pointer bg-gray-200 p-2 rounded-full"
                        size={40}
                      />
                    </div>

                    <span className="flex justify-start mt-3">
                      {address?.fullName}
                    </span>
                    <span className="flex justify-start">
                      {address?.phoneNumber}
                    </span>
                    <span className="flex justify-start">{address?.flat}</span>
                    <span className="flex justify-start">{address?.area}</span>
                    <span className="flex justify-start">
                      {address?.landmark}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {showSaveButton && (
          <div className="flex justify-end gap-4 mt-5 mx-7">
            <button
              className="bg-cyan-100 py-2 px-4 rounded-md"
              type="button"
              onClick={handleCancelEditClick}
            >
              Cancel
            </button>
            <button
              className="bg-teal-800 text-white py-2 px-4 rounded-md"
              type="submit"
              onClick={handleSubmit}
            >
              {isLoading ? `Saving...` : `Save`}
            </button>
          </div>
        )}

        <div className="flex items-center justify-between ms-11 me-7 mt-10">
          <h1 className="text-md font-semibold">Wallet</h1>
          <div className="flex gap-[30px] justify-end ">
            <button
              className="bg-red-100 text-black rounded-md px-4 py-2 font-semibold flex items-center space-x-2"
              onClick={toggleDeductMoney}
            >
              <RemoveIcon className="text-red-600" />{" "}
              <span>Money to Wallet</span>
            </button>

            <div>
              <button
                className="bg-teal-800 text-white rounded-md px-4 py-2 font-semibold  flex items-center space-x-2 "
                onClick={toggleAddMoney}
              >
                <PlusOutlined /> <span>Money to Wallet</span>
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-auto mt-[20px] w-full max-h-[30rem]">
          <table className="text-start w-full ">
            <thead className=" sticky top-0 left-0">
              <tr>
                {[
                  "Closing Balance",
                  "Transaction Amount",
                  "Transaction ID",
                  "Order ID",
                  "Date and Time",
                ].map((header, index) => (
                  <th
                    key={index}
                    className="bg-teal-800 text-center text-white py-[20px] border-r-2 border-[#eee]/50"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customer?.walletDetails?.length === 0 && (
                <tr>
                  <td colSpan={5}>
                    <p className="mb-0 text-center py-[20px]">No data</p>
                  </td>
                </tr>
              )}

              {customer?.walletDetails?.map((walletDetails) => (
                <tr
                  key={walletDetails.id}
                  className="align-middle text-center even:bg-gray-300 last: border-2"
                >
                  <td className="p-3">{walletDetails.closingBalance}</td>
                  <td className="p-3">{walletDetails.transactionAmount}</td>
                  <td className="p-3">{walletDetails.transactionId}</td>
                  <td className="p-3">{walletDetails.orderId}</td>
                  <td className="p-3">{walletDetails.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/*  */}

        <div>
          <h1 className="text-md font-semibold mx-11 mt-[40px]">
            Order Details
          </h1>
          <div className="overflow-auto mt-[20px] ml-2 w-full max-h-[30rem]">
            <table className="text-start w-full">
              <thead className="sticky top-0 left-0">
                <tr>
                  {[
                    "Order ID",
                    "Order Status",
                    "Merchant Name",
                    "Delivery Mode",
                    "Order Time",
                    "Delivery Time",
                    "Payment Method",
                    "Delivery Option",
                    "Amount",
                    "Payment Status",
                  ].map((header, index) => (
                    <th
                      key={index}
                      className="bg-teal-800 text-center text-white py-[20px]  border-r-2 border-[#eee]/50"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {customer?.orderDetails?.length === 0 && (
                  <tr className=" even: bg-gray-200">
                    <td colSpan={10}>
                      <p className="mb-0 text-center py-[20px]">No data</p>
                    </td>
                  </tr>
                )}

                {customer?.orderDetails?.map((orderDetails) => (
                  <tr
                    key={orderDetails.orderId}
                    className="align-middle even:bg-gray-300 text-center h-[70px]"
                  >
                    <td className="p-3">{orderDetails.orderId}</td>
                    <td className="p-3">{orderDetails.orderStatus}</td>
                    <td className="p-3">{orderDetails.merchantName}</td>
                    <td className="p-3">{orderDetails.deliveryMode}</td>
                    <td className="p-3">{orderDetails.orderTime}</td>
                    <td className="p-3">{orderDetails.deliveryTime}</td>
                    <td className="p-3">{orderDetails.paymentMethod}</td>
                    <td className="p-3">{orderDetails.deliveryOption}</td>
                    <td className="p-3">{orderDetails.amount}</td>
                    <td className="p-3">{orderDetails.paymentStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Block Modal */}
      <BlockCustomerModal
        isVisible={showBlockModal}
        onCancel={handleCancelModal}
        BASE_URL={BASE_URL}
        token={token}
        customerId={customerId}
        onBlock={handleMarkBlocked}
      />

      {/* Customer Rating Modal */}
      <CustomerRatingModal
        isVisible={showRatingModal}
        onCancel={handleCancelModal}
        BASE_URL={BASE_URL}
        token={token}
        customerId={customerId}
      />

      {/* Add Money to wallet modal */}
      <AddMoneyModal
        isVisible={showAddMoneyModal}
        onCancel={handleCancelModal}
        BASE_URL={BASE_URL}
        token={token}
        customerId={customerId}
        onAddMoney={handleAddMoney}
      />

      {/* Deduct money from wallet modal */}
      <DeductMoneyModal
        isVisible={showDeductModeyModal}
        onCancel={handleCancelModal}
        BASE_URL={BASE_URL}
        token={token}
        customerId={customerId}
        onDeductMoney={handleDeductMoney}
      />

      {/* Address Modal */}
      <AddressModal
        isOpen={showAddressModal}
        onClose={handleCancelModal}
        data={addressToEdit}
        type={selectedAddress.type}
        onUpdateAddress={handleChangeAddress}
      />
    </>
  );
};

export default CustomerDetails;
