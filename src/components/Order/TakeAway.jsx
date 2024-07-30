import { SearchOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const TakeAway = () => {
  const [formData, setFormData] = useState({
    merchantId: null,
    items: [],
    instructionToMerchant: "",
  });

  const [merchantName, setMerchantName] = useState("");
  const [productName, setProductName] = useState("");
  const [merchantResults, setMerchantResults] = useState([]);
  const [productResults, setProductResults] = useState([]);

  const [isMerchantLoading, setIsMerchantLoading] = useState(false);
  const [isProductLoading, setIsProductLoading] = useState(false);

  const { token, role } = useContext(UserContext);

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

    if (query.length >= 3 && formData.merchantId) {
      setIsProductLoading(true);

      try {
        const response = await axios.get(
          `${BASE_URL}/customers/search-products/${formData.merchantId}?query=${query}`,
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
    const existingProduct = formData.items.find(
      (item) => item.productId === product._id
    );

    if (existingProduct) {
      // If the product already exists, increase its quantity
      setFormData({
        ...formData,
        items: formData.items.map((item) =>
          item.productId === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      // If the product does not exist, add it to the items array
      setFormData({
        ...formData,
        items: [
          ...formData.items,
          {
            productName: product.productName,
            productId: product._id,
            price: product.price,
            quantity: 1,
            variantId: product.variantId,
          },
        ],
      });
    }

    setProductName("");
    setProductResults([]);
  };

  const selectMerchant = (merchant) => {
    setFormData({ ...formData, merchantId: merchant._id });
    setMerchantName(merchant.merchantName);
    setMerchantResults([]);
  };

  const decreaseQuantity = (productId, e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      items: formData.items.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) } // Prevent quantity from going below 1
          : item
      ),
    });
  };

  const increaseQuantity = (productId, e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      items: formData.items.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 } // Increase quantity
          : item
      ),
    });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const createInvoice = async (e) => {
    e.preventDefault();
    try {
      // Implement invoice creation logic here
    } catch (err) {
      console.log(`Error in creating Take away invoice: ${err}`);
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
                type="search"
                name="merchantName"
                placeholder="Search merchant"
                className="h-10 px-5 text-sm border-2 w-full outline-none focus:outline-none"
                value={merchantName}
                onChange={handleSearchMerchant}
              />
              {isMerchantLoading && <p>Loading...</p>}
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
                type="search"
                name="product"
                id="product"
                placeholder="Product"
                className="h-10 px-5 text-sm border-2 w-full outline-none focus:outline-none"
                value={productName}
                onChange={handleSearchProduct}
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-2 mr-2"
              >
                <SearchOutlined className="text-xl text-gray-500 " />
              </button>
              {isProductLoading && <p>Loading...</p>}
              {productResults.length > 0 && (
                <ul className="absolute bg-white border w-full mt-1 z-50">
                  {productResults.map((result) => (
                    <li
                      key={result._id}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => selectProduct(result)}
                    >
                      {result.productName} - {result.variantName}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <label className="w-1/3 px-6">Selected Products</label>
            <div className="flex gap-5 overflow-x-auto">
              {formData.items.length > 0 &&
                formData.items.map((item, index) => (
                  <div
                    className="flex gap-7 w-[20rem] bg-gray-200 p-4 rounded-lg border-2 border-gray-300"
                    key={item.productId}
                  >
                    <div>
                      <p>{item.productName}</p>
                      <p>{item.price}</p>
                    </div>
                    <div className="flex items-center justify-between w-1/3">
                      <button
                        className="px-2 py-1 text-lg font-bold bg-gray-200 rounded-md hover:bg-gray-300"
                        onClick={() => decreaseQuantity(item.productId)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        name="quantity"
                        className="w-1/3 text-center outline-none focus:outline-none"
                        value={item.quantity}
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value, 10) || 1;
                          setFormData({
                            ...formData,
                            items: formData.items.map((i) =>
                              i.productId === item.productId
                                ? { ...i, quantity: newQuantity }
                                : i
                            ),
                          });
                        }}
                      />
                      <button
                        onClick={() => increaseQuantity(item.productId)}
                        className="px-2 py-1 text-lg font-bold bg-gray-200 rounded-md hover:bg-gray-300"
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
              Instructions to Merchants
            </label>
            <input
              className="h-10 px-5 text-sm border-2 w-1/2 outline-none focus:outline-none"
              type="text"
              placeholder="Merchant Instructions"
              id="instructionToMerchant"
              name="instructionToMerchant"
              value={formData.instructionToMerchant}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>

          <div className="ms-auto me-[6rem] xl:me-[12rem] my-[30px] bg-teal-700 text-white py-2 px-4 rounded-md capitalize">
            Create invoice
          </div>
        </div>
      </form>

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
              {/* {order.map((order) => (
                <tr key={order.id} className="text-left align-middle">
                  <td className="p-4">{order.item1}</td>
                  <td className="p-4">{order.quantity1}</td>
                  <td className="p-4">{order.amount1}</td>
                </tr>
              ))} */}
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
          onClick={formSubmit}
        >
          Create Order ₹534
        </button>
      </div>
    </div>
  );
};

export default TakeAway;
