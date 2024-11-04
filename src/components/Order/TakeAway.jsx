import { SearchOutlined } from "@ant-design/icons";
import ClipLoader from "react-spinners/ClipLoader";
import { useContext, useEffect, useState } from "react";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { paymentOptions } from "../../utils/DefaultData";
import { useDraggable } from "../../hooks/useDraggable";
import ShowBill from "./ShowBill";

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
  const [selectedCategory, setSelectedCategory] = useState("");
  const [merchantResults, setMerchantResults] = useState([]);
  const [businessCategories, setbusinessCategories] = useState([]);
  const [productResults, setProductResults] = useState([]);

  const [isMerchantLoading, setIsMerchantLoading] = useState(false);
  const [isProductLoading, setIsProductLoading] = useState(false);
  const [isInvoiceLoading, setIsInvoiceLoading] = useState(false);
  const [isOrderLoading, setIsOrderLoading] = useState(false);

  const [paymentMode, setPaymentMode] = useState("");

  const { token, role, userId } = useContext(UserContext);
  const {
    isDragging,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
  } = useDraggable();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }

    if (role === "Merchant") {
      setTakeAwayData({ ...takeAwayData, merchantId: userId });
      getAvailableBusinessCategory();
    }
  }, [token, role]);

  const getAvailableBusinessCategory = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/orders/available-business-categories`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setbusinessCategories(response.data.data);
      }
    } catch (err) {
      console.log(`Error in getting business categories: ${err}`);
    }
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

    if (query.length >= 3 && takeAwayData.merchantId) {
      setIsProductLoading(true);

      try {
        const response = await axios.get(
          `${BASE_URL}/customers/search-products/${takeAwayData.merchantId}/${selectedCategory}?query=${query}`,
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
    console.log(product);

    const existingProduct = takeAwayData.items.find(
      (item) => item.productId === product.id
    );

    if (existingProduct) {
      // If the product already exists, increase its quantity
      setTakeAwayData({
        ...takeAwayData,
        items: takeAwayData.items.map((item) =>
          item.productId === product.id
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
            productId: product.id,
            price: product.price,
            quantity: 1,
            variants: product.variants.map((variant) => ({
              variantName: variant.variantName,
              variantTypes: variant.variantTypes.map((type) => ({
                typeName: type.typeName,
                price: type.price,
                id: type.id,
              })),
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
    setbusinessCategories(merchant.businessCategory);
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

  const handleVariantChange = (productId, variantId) => {
    console.log(productId);
    console.log(variantId);
    setTakeAwayData({
      ...takeAwayData,
      items: takeAwayData.items.map((item) =>
        item.productId === productId
          ? {
              ...item,
              selectedVariantId: variantId,
            }
          : item
      ),
    });
  };

  const createOrder = async (e) => {
    e.preventDefault();
    try {
      setIsOrderLoading(true);

      const endPoint =
        role === "Admin"
          ? `${BASE_URL}/orders/admin/create-order`
          : `${BASE_URL}/orders/create-order`;

      const response = await axios.post(
        endPoint,
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
          duration: 3000,
          isClosable: true,
        });
        navigate("/all-orders");
      }
    } catch (err) {
      console.log(`Error in creating order: ${err}`);
      toast({
        title: "Error",
        description: "Error in creating invoice",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsOrderLoading(false);
    }
  };

  const createInvoice = async (e) => {
    e.preventDefault();
    try {
      setIsInvoiceLoading(true);

      // Format the items to include the selected variantId and its price
      const formattedItems = takeAwayData.items.map((item) => {
        // Find the selected variant type for the item
        const selectedVariant = item.variants
          .flatMap((variant) => variant.variantTypes)
          .find((type) => type.id === item.selectedVariantId);

        // Determine the price based on whether a variant is selected or not
        const price = selectedVariant ? selectedVariant.price : item.price;

        return {
          productId: item.productId,
          quantity: item.quantity,
          price: price,
          variantId: item.selectedVariantId || null, // Use selectedVariantId if available
        };
      });

      const invoiceData = {
        selectedBusinessCategory: selectedCategory,
        customerId: data.customerId,
        newCustomer: data.newCustomer,
        deliveryOption: data.deliveryOption,
        deliveryMode: data.deliveryMode,
        ifScheduled: {
          startDate: data?.ifScheduled?.startDate,
          endDate: data?.ifScheduled?.endDate,
          time: data?.ifScheduled?.time,
        },
        items: formattedItems,
        instructionToMerchant: takeAwayData.instructionToMerchant,
        merchantId: takeAwayData.merchantId,
      };

      console.log(invoiceData);

      const endPoint =
        role === "Admin"
          ? `${BASE_URL}/orders/admin/create-order-invoice`
          : `${BASE_URL}/orders/create-order-invoice`;

      const response = await axios.post(endPoint, invoiceData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const { data } = response.data;
        setCartData(data);
        toast({
          title: "Success",
          description: "Invoice created successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      if (err.response) {
        toast({
          title: "Error",
          description:
            err?.response?.data?.message || `Error in creating invoice`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } finally {
      setIsInvoiceLoading(false);
    }
  };

  const downloadInvoiceBill = async (e) => {
    try {
      e.preventDefault();

      const data = {
        cartId: cartData.cartId,
        deliveryMode: cartData.deliveryMode,
      };

      const response = await axios.post(
        `${BASE_URL}/orders/download-invoice-bill`,
        data,
        {
          responseType: "blob",
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${cartData.deliveryMode}_invoice.pdf`);
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    } catch (err) {
      toast({
        title: "Error",
        description: `Error downloading invoice`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="bg-white mt-5 rounded">
      <form onSubmit={createInvoice}>
        <div className="flex flex-col gap-6">
          {role === "Admin" && (
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
                        {result.isServiceableToday})
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          <div className="flex items-center relative">
            <label className="w-1/3 px-6 invisible"></label>
            <div className="w-1/2 flex items-center gap-5 overflow-x-auto">
              {businessCategories?.map((category) => (
                <button
                  key={category._id}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedCategory(category._id);
                  }}
                  className={`${
                    selectedCategory === category._id
                      ? `bg-gray-300`
                      : `bg-gray-100`
                  }  border border-gray-300  p-2 rounded-sm`}
                >
                  {category.title}
                </button>
              ))}
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
                <ul className="absolute bg-white border w-full mt-1 z-50 max-h-[20rem] overflow-auto">
                  {productResults.map((result) => (
                    <li
                      key={result.id}
                      className="p-2 py-3 hover:bg-gray-200 cursor-pointer"
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
            <div
              className={`relative w-[50%] flex gap-4 overflow-x-auto ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
              }`}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              {takeAwayData.items.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center gap-3 py-2 bg-gray-100 p-3 border-2 border-gray-300 rounded-md"
                >
                  <div>
                    <p className="text-gray-600 mb-2 w-[100px] truncate">
                      {item.productName}
                    </p>
                    <p className="text-gray-600">
                      {item.variants.length === 0 ? `₹${item.price}` : ""}
                    </p>

                    {item?.variants?.length > 0 && (
                      <div>
                        <select
                          className="outline-none focus:outline-none bg-white p-2"
                          value={item.selectedVariantId || ""}
                          onChange={(e) =>
                            handleVariantChange(item.productId, e.target.value)
                          }
                        >
                          {item.variants.flatMap((variant) =>
                            variant.variantTypes.map((type) => (
                              <option key={type.id} value={type.id}>
                                {variant.variantName} - {type.typeName} - ₹
                                {type.price}
                              </option>
                            ))
                          )}
                        </select>
                      </div>
                    )}
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

          {role === "Admin" && (
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
          )}

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
              <Select
                options={paymentOptions}
                value={paymentOptions.find(
                  (option) => option.value === paymentMode
                )}
                onChange={(option) => setPaymentMode(option.value)}
                className="w-ful outline-none focus:outline-none"
                placeholder="Select payment mode"
                isSearchable={true}
                isMulti={false}
                menuPlacement="auto"
              />
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
              onClick={downloadInvoiceBill}
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
