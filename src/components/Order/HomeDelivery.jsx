import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import NewAddress from "./NewAddress";
import { UserContext } from "../../context/UserContext";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import ShowBill from "./ShowBill";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const HomeDelivery = ({ data }) => {
  const [homeDeliveryData, setHomeDeliveryData] = useState({
    customerId: data.customerId,
    deliveryMode: data.deliveryMode,
    deliveryOption: data.deliveryOption,
    newCustomer: data.newCustomer,
    merchantId: "",
    customerAddressType: "",
    customerAddressOtherAddressId: "",
    items: [],
    instructionToMerchant: "",
    instructionToDeliveryAgent: "",
  });

  const [cartData, setCartData] = useState({});

  const [merchantName, setMerchantName] = useState("");
  const [productName, setProductName] = useState("");
  const [merchantResults, setMerchantResults] = useState([]);
  const [allCustomerAddress, setAllCustomerAddress] = useState();
  const [productResults, setProductResults] = useState([]);

  const [isMerchantLoading, setIsMerchantLoading] = useState(false);
  const [isProductLoading, setIsProductLoading] = useState(false);
  const [isInvoiceLoading, setIsInvoiceLoading] = useState(false);
  const [isOrderLoading, setIsOrderLoading] = useState(false);

  const [paymentMode, setPaymentMode] = useState("");

  const { token } = useContext(UserContext);
  const toast = useToast();

  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedOtherAddressId, setSelectedOtherAddressId] = useState("");
  const [isFormVisible, setFormVisible] = useState(false);

  useEffect(() => {
    setAllCustomerAddress(data.customerAddress);
  }, [data]);

  const handleInputChange = (e) => {
    setHomeDeliveryData({
      ...homeDeliveryData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleNewAddressForm = () => {
    setFormVisible(!isFormVisible);
  };

  const handleAddCustomerAddress = (newCustomerAddress) => {
    setFormVisible(true);
    setHomeDeliveryData({ ...homeDeliveryData, newCustomerAddress });
  };

  const handleSearchMerchant = async (e) => {
    const query = e.target.value;
    setMerchantName(query);

    if (query.length >= 3) {
      setIsMerchantLoading(true);

      try {
        const response = await axios.get(
          `${BASE_URL}/merchants/admin/search?query=${query}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setMerchantResults(response.data.data);
        }
      } catch (err) {
        console.log(`Error in searching merchant: ${err}`);
      } finally {
        setIsMerchantLoading(false);
      }
    } else {
      setMerchantResults([]);
    }
  };

  const handleSearchProduct = async (e) => {
    const query = e.target.value;
    setProductName(query);

    if (query.length >= 3 && homeDeliveryData.merchantId) {
      setIsProductLoading(true);

      try {
        const response = await axios.get(
          `${BASE_URL}/customers/search-products/${homeDeliveryData.merchantId}?query=${query}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setProductResults(response.data.data);
        }
      } catch (err) {
        console.log(`Error in searching products of merchant: ${err}`);
      } finally {
        setIsProductLoading(false);
      }
    } else {
      setProductResults([]);
    }
  };

  const selectProduct = (product) => {
    const existingProduct = homeDeliveryData.items.find(
      (item) => item.productId === product._id
    );

    if (existingProduct) {
      // If the product already exists, increase its quantity
      setHomeDeliveryData({
        ...homeDeliveryData,
        items: homeDeliveryData.items.map((item) =>
          item.productId === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      // If the product does not exist, add it to the items array
      setHomeDeliveryData({
        ...homeDeliveryData,
        items: [
          ...homeDeliveryData.items,
          {
            productName: product.productName,
            productId: product._id,
            price: product.price,
            quantity: 1,
            variants: product.variants.map((variant) => ({
              variantName: variant.variantName,
              variantTypes: variant.variantTypes.map((type) => ({
                typeName: type.typeName,
                price: type.price,
                _id: type._id,
              })),
              variantId: variant.variantTypes[0]._id,
            })),
          },
        ],
      });
    }

    setProductName("");
    setProductResults([]);
  };

  const selectMerchant = (merchant) => {
    setHomeDeliveryData({ ...homeDeliveryData, merchantId: merchant._id });
    setMerchantName(merchant.merchantName);
    setMerchantResults([]);
    setAllCustomerAddress(data?.customerAddress);
    console.log(data.newCustomer);
  };

  const handleSelectAddressType = (type) => {
    // Check if the type is already selected
    const newSelectedAddress = selectedAddress === type ? "" : type;

    setSelectedAddress(newSelectedAddress);
    setHomeDeliveryData({
      ...homeDeliveryData,
      customerAddressType: newSelectedAddress,
    });
  };

  const handleSelectOtherAddress = (id) => {
    setSelectedOtherAddressId(id);
    setHomeDeliveryData({
      ...homeDeliveryData,
      customerAddressOtherAddressId: id,
    });
  };

  const decreaseQuantity = (productId, e) => {
    e.preventDefault();
    setHomeDeliveryData({
      ...homeDeliveryData,
      items: homeDeliveryData.items
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0),
    });
  };

  const increaseQuantity = (productId, e) => {
    e.preventDefault();
    setHomeDeliveryData({
      ...homeDeliveryData,
      items: homeDeliveryData.items.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    });
  };

  const handleVariantChange = (productId, variantTypeId, variantIndex) => {
    setHomeDeliveryData({
      ...homeDeliveryData,
      items: homeDeliveryData.items.map((item) =>
        item.productId === productId
          ? {
              ...item,
              variants: item.variants.map((variant, index) =>
                index === variantIndex
                  ? { ...variant, variantId: variantTypeId }
                  : variant
              ),
            }
          : item
      ),
    });
  };

  const createInvoice = async (e) => {
    e.preventDefault();
    try {
      setIsInvoiceLoading(true);

      // Format the items to include the selected variantId
      const formattedItems = homeDeliveryData?.items?.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        variantId: item.variants.length > 0 ? item.variants[0].variantId : null,
      }));

      const invoiceData = {
        ...homeDeliveryData,
        ifScheduled: {
          startDate: data?.ifScheduled?.startDate,
          endDate: data?.ifScheduled?.endDate,
          time: data?.ifScheduled?.time,
        },
        customerId: data.customerId,
        newCustomer: data.newCustomer,
        items: formattedItems,
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
        const { data } = response.data;
        console.log(data.billDetail);
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
      console.log(`Error in creating Take away invoice: ${err}`);
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

  const createOrderHandler = async (e) => {
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

  return (
    <div className="bg-white  mt-5 rounded">
      <form onSubmit={createInvoice}>
        <div className="flex flex-col gap-6">
          <div className="flex items-center relative">
            <label className="w-1/3 px-6" htmlFor="merchantId">
              Select Merchant
            </label>
            <div className="relative w-1/2">
              <input
                type="text"
                name="merchantName"
                placeholder="Search merchant..."
                className="h-10 ps-3 text-sm border-2 w-full outline-none focus:outline-none"
                value={merchantName}
                onChange={handleSearchMerchant}
              />

              {isMerchantLoading && (
                <ClipLoader
                  size={15}
                  className="absolute top-[30%] right-[10px]"
                />
              )}

              {!isMerchantLoading && (
                <SearchOutlined className="text-xl text-gray-500 absolute top-[30%] right-[10px]" />
              )}

              {merchantResults.length > 0 && (
                <ul className="absolute bg-white border w-full mt-1 z-50">
                  {merchantResults.map((result) => (
                    <li
                      key={result._id}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => selectMerchant(result)}
                    >
                      {result.merchantName} - {result.geofence} (
                      {result.status ? "Open" : "Closed"})
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="flex items-center relative">
            <label className="w-1/3 px-6" htmlFor="product">
              Select Product
            </label>
            <div className="relative w-1/2 z-30">
              <input
                type="text"
                name="product"
                placeholder="Search product..."
                className="h-10 ps-3 text-sm border-2 w-full outline-none focus:outline-none"
                value={productName}
                onChange={handleSearchProduct}
              />

              {isProductLoading && (
                <ClipLoader
                  size={15}
                  className="absolute top-[20%] right-[10px]"
                />
              )}

              {!isProductLoading && (
                <SearchOutlined className="text-xl text-gray-500 absolute top-[30%] right-[10px]" />
              )}

              {productResults.length > 0 && (
                <ul className="absolute bg-white border w-full mt-1 z-50">
                  {productResults.map((result) => (
                    <li
                      key={result._id}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => selectProduct(result)}
                    >
                      {result.productName}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {homeDeliveryData.items.length > 0 && (
            <div className="flex items-center">
              <label className="w-1/3 px-6">Selected Products</label>
              <div className="relative w-[50%] flex gap-4 overflow-x-scroll">
                {homeDeliveryData.items.map((item, itemIndex) => (
                  <div
                    key={item.productId}
                    className="flex items-center gap-3 py-2 bg-gray-100 p-3 border-2 border-gray-300 rounded-md"
                  >
                    <div>
                      <div>
                        <p className="text-gray-600 mb-2 w-[100px] truncate">
                          {item.productName}
                        </p>
                        <p className="text-gray-600">
                          {item?.variants?.length === 0 && `${item.price}`}
                        </p>
                      </div>

                      <div>
                        {item.variants.map((variant, variantIndex) => (
                          <select
                            className="outline-none focus:outline-none bg-white p-2"
                            key={variant.variantId}
                            value={variant.variantId}
                            onChange={(e) =>
                              handleVariantChange(
                                item.productId,
                                e.target.value,
                                variantIndex
                              )
                            }
                          >
                            {variant.variantTypes.map((type) => (
                              <option key={type._id} value={type._id}>
                                {type.typeName} - ₹ {type.price}
                              </option>
                            ))}
                          </select>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center border-2 border-gray-300 px-2">
                      <button
                        className="text-red-400 text-xl"
                        onClick={(e) => decreaseQuantity(item.productId, e)}
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        className="text-green-400 text-xl"
                        onClick={(e) => increaseQuantity(item.productId, e)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="instructionToMerchant">
              Instruction to Merchant
            </label>
            <textarea
              name="instructionToMerchant"
              id="instructionToMerchant"
              placeholder="Instruction to Merchant"
              className="h-20 text-sm ps-3 pt-2 border-2 w-1/2 outline-none focus:outline-none resize-y overflow-y-auto"
              value={homeDeliveryData.instructionToMerchant}
              onChange={(e) =>
                setHomeDeliveryData({
                  ...homeDeliveryData,
                  instructionToMerchant: e.target.value,
                })
              }
            />
          </div>

          {allCustomerAddress?.length > 0 && (
            <div className="flex items-start ">
              <label className="w-1/3 px-6" htmlFor="address">
                Select Delivery Address
              </label>

              {/* {allCustomerAddress?.length > 0 && ( */}
              <div className="">
                {allCustomerAddress?.map((address, index) => (
                  <input
                    key={index}
                    type="button"
                    className={`py-2 px-4 me-2 rounded border capitalize ${
                      selectedAddress === address.type
                        ? "bg-gray-300"
                        : "bg-white"
                    }`}
                    value={address.type}
                    onClick={() => handleSelectAddressType(address.type)}
                  />
                ))}

                {selectedAddress === "other" && (
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
                            checked={selectedOtherAddressId === otherAddr.id}
                            onChange={() =>
                              handleSelectOtherAddress(otherAddr.id)
                            }
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
              {/* )} */}
            </div>
          )}

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
                onClick={toggleNewAddressForm}
              >
                <span>Add Address</span>
                <PlusOutlined />
              </button>
            </div>
            {isFormVisible && (
              <NewAddress
                onAddCustomerAddress={handleAddCustomerAddress}
                token={token}
                BASE_URL={BASE_URL}
              />
            )}
          </div>

          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="instructionToDeliveryAgent">
              Instructions to Delivery Agent
            </label>
            <input
              className="h-10 px-5 text-sm border-2 w-1/2  outline-none focus:outline-none"
              type="text"
              placeholder="Instruction to agent"
              name="instructionToDeliveryAgent"
              value={homeDeliveryData.instructionToDeliveryAgent}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="addedTip">
              Tips
            </label>
            <input
              className="h-10 px-5  text-sm border-2 w-1/2  outline-none focus:outline-none"
              type="text"
              placeholder="Add Tip"
              name="addedTip"
              pattern="^\d*\.?\d*$"
              title="Please enter a valid number"
              value={homeDeliveryData.addedTip}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="discount">
              Flat Discount
            </label>

            <input
              type="text"
              name="flatDiscount"
              placeholder="Flat discount"
              className="h-10 ps-3 text-sm border-2 w-1/2  outline-none focus:outline-none"
              value={homeDeliveryData.flatDiscount}
              onChange={handleInputChange}
            />
          </div>

          <button
            type="submit"
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

export default HomeDelivery;
