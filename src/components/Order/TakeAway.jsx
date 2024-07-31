import { SearchOutlined } from "@ant-design/icons";
import ClipLoader from "react-spinners/ClipLoader";
import { useContext, useEffect, useState } from "react";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { useToast } from "@chakra-ui/react";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const TakeAway = ({ data }) => {
  const [takeAwayData, setTakeAwayData] = useState({
    ...data,
    merchantId: null,
    items: [],
    instructionToMerchant: "",
  });

  const [cartData, setCartData] = useState({});

  const [merchantName, setMerchantName] = useState("");
  const [productName, setProductName] = useState("");
  const [merchantResults, setMerchantResults] = useState([]);
  const [productResults, setProductResults] = useState([]);

  const [isMerchantLoading, setIsMerchantLoading] = useState(false);
  const [isProductLoading, setIsProductLoading] = useState(false);
  const [isInvoiceLoading, setIsInvoiceLoading] = useState(false);
  const [isOrderLoading, setIsOrderLoading] = useState(false);

  const [paymentMode, setPaymentMode] = useState("");

  const { token } = useContext(UserContext);
  const toast = useToast();

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }
  }, [token]);

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

    if (query.length >= 3 && takeAwayData.merchantId) {
      setIsProductLoading(true);

      try {
        const response = await axios.get(
          `${BASE_URL}/customers/search-products/${takeAwayData.merchantId}?query=${query}`,
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
    const existingProduct = takeAwayData.items.find(
      (item) => item.productId === product._id
    );

    if (existingProduct) {
      // If the product already exists, increase its quantity
      setTakeAwayData({
        ...takeAwayData,
        items: takeAwayData.items.map((item) =>
          item.productId === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      // If the product does not exist, add it to the items array
      setTakeAwayData({
        ...takeAwayData,
        items: [
          ...takeAwayData.items,
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
    setTakeAwayData({ ...takeAwayData, merchantId: merchant._id });
    setMerchantName(merchant.merchantName);
    setMerchantResults([]);
  };

  const decreaseQuantity = (productId, e) => {
    e.preventDefault();
    setTakeAwayData({
      ...takeAwayData,
      items: takeAwayData.items
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
    setTakeAwayData({
      ...takeAwayData,
      items: takeAwayData.items.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    });
  };

  const handleVariantChange = (productId, variantTypeId, variantIndex) => {
    setTakeAwayData({
      ...takeAwayData,
      items: takeAwayData.items.map((item) =>
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

  const createInvoice = async (e) => {
    e.preventDefault();

    // Format the items to include the selected variantId
    const formattedItems = takeAwayData.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
      variantId: item.variants.length > 0 ? item.variants[0].variantId : null,
    }));

    const invoiceData = {
      customerId: data.customerId,
      newCustomer: data.newCustomer,
      deliveryOption: data.deliveryOption,
      deliveryMode: data.deliveryMode,
      items: formattedItems,
      instructionToMerchant: takeAwayData.instructionToMerchant,
      merchantId: takeAwayData.merchantId,
    };

    try {
      setIsInvoiceLoading(true);

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
        console.log(data);
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

  return (
    <div className="bg-white mt-5 rounded">
      <form onSubmit={createInvoice}>
        <div className="flex flex-col gap-6">
          <div className="flex items-center relative">
            <label className="w-1/3 px-6" htmlFor="merchant">
              Select Merchant
            </label>
            <div className="relative w-1/2">
              <input
                type="text"
                name="merchantName"
                placeholder="Search merchant"
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
                id="product"
                placeholder="Product"
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

          <div className="flex items-center">
            <label className="w-1/3 px-6">Selected Products</label>
            <div className="relative w-[50%] flex gap-4 overflow-x-scroll">
              {takeAwayData.items.map((item, itemIndex) => (
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

          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="instructionToMerchant">
              Instruction to Merchant
            </label>
            <textarea
              name="instructionToMerchant"
              id="instructionToMerchant"
              placeholder="Instruction to Merchant"
              className="h-20 text-sm ps-3 pt-2 border-2 w-1/2 outline-none focus:outline-none resize-y overflow-y-auto"
              value={takeAwayData.instructionToMerchant}
              onChange={(e) =>
                setTakeAwayData({
                  ...takeAwayData,
                  instructionToMerchant: e.target.value,
                })
              }
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

      {cartData?.items && (
        <>
          <div className="flex my-5">
            <h1 className="px-6 w-1/3 font-semibold">Payment mode</h1>
            <div className=" w-1/2">
              <select
                name="paymentMode"
                value={paymentMode}
                className="w-full py-2 ps-3 outline-none focus:outline-none border-2"
                onChange={(e) => setPaymentMode(e.target.value)}
              >
                <option defaultValue="Select payment mode" hidden>
                  Select payment mode
                </option>
                <option value="Online-payment">Online payment</option>
                <option value="Cash-on-delivery">Cash on delivery</option>
              </select>
            </div>
          </div>

          <div className="flex mt-5">
            <h1 className="px-6 w-1/3 font-semibold">Bill Summary</h1>
            <div className="overflow-auto w-1/2">
              <table className="border-2 border-teal-700 w-full text-left ">
                <thead>
                  <tr>
                    {["Item", " Quantity", "Amount"].map((header, index) => (
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
                  {cartData?.items?.map((data) => (
                    <tr key={data.index} className="text-left align-middle">
                      <td className="p-4">{data.itemName}</td>
                      <td className="p-4">{data.quantity}</td>
                      <td className="p-4">{data.price}</td>
                    </tr>
                  ))}
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
              type="submit"
              onClick={createOrder}
            >
              {isOrderLoading
                ? "Creating order..."
                : `Create Order ₹${cartData?.billDetail?.itemTotal || ""}`}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TakeAway;
