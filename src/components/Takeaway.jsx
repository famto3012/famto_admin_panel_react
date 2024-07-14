import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

const Takeaway = () => {
  const [formData, setFormData] = useState({
    merchant: "",
    product: "",
    selectedProducts: 1,
    merchantinstructions: "",
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  const [order, setOrder] = useState([]);
  useEffect(() => {
    const fetchOrder = async () => {
      const dummyData = [
        {
          item: "Chicken Mandi",
          quantity: "2",
          amount: "₹257",
        },
        {
          item: "Chicken Mandi",
          quantity: "2",
          amount: "₹257",
        },

        // Add more customers as needed
      ];

      setOrder(dummyData);
    };

    fetchOrder();
  }, []);
  const handleChangeProducts = (e) => {
    setFormData({ ...formData, selectedProducts: e.target.value });
    console.log("before", formData.selectedProducts);
    setValue(e.target.value);
  };
  const addition = (e) => {
    e.preventDefault();
    setFormData((prevOrder) => ({
      ...prevOrder,
      selectedProducts: Number(prevOrder.selectedProducts) + 1,
    }));
    setValue((prevValue) => prevValue + 1);
  };

  const substraction = (e) => {
    e.preventDefault();
    setFormData((prevOrder) => ({
      ...prevOrder,
      selectedProducts: Number(prevOrder.selectedProducts) - 1,
    }));
    setValue((prevValue) => prevValue + 1);
  };

  return (
    <div className="bg-white  mt-5 rounded">
      <form onSubmit={formSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex items-center relative">
            <label className="w-1/3 px-6" htmlFor="merchant">
              Select Merchant
            </label>
            <div className="relative w-1/2">
              <input
                type="search"
                name="merchant"
                id="merchant"
                placeholder="Merchant"
                className="h-10 px-5 pr-10 text-sm border-2 w-full outline-none focus:outline-none"
                value={formData.merchant}
                onChange={handleInputChange}
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-2 mr-2"
              >
                <SearchOutlined className="text-xl text-gray-500" />
              </button>
            </div>
          </div>
          <div className="flex items-center relative">
            <label className="w-1/3 px-6" htmlFor="product">
              Select Product
            </label>
            <div className="relative w-1/2">
              <input
                type="search"
                name="product"
                id="product"
                placeholder="Product"
                className="h-10 px-5  text-sm border-2 w-full  outline-none focus:outline-none"
                value={formData.product}
                onChange={handleInputChange}
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-2 mr-2"
              >
                <SearchOutlined className="text-xl text-gray-500 " />
              </button>
            </div>
          </div>
          <div className="flex items-center">
            <label className="w-1/3 px-6">Selcted Products</label>
            <div className="flex gap-7 w-[20rem] bg-gray-200 p-4 rounded-lg border-2 border-gray-300">
              <div>
                <p>Chicken mandi quater</p>
                <p>275/-</p>
              </div>
              <div className="flex items-center justify-between w-1/3">
                <button
                  id="decrement"
                  className="px-2 py-1 text-lg font-bold bg-gray-200 rounded-md hover:bg-gray-300"
                  onClick={substraction}
                >
                  -
                </button>
                <input
                  type="number"
                  name="selectedProducts"
                  value={formData.selectedProducts}
                  onChange={handleChangeProducts}
                  className="w-1/3 text-center"
                ></input>
                <button
                  className="px-2 py-1 text-lg font-bold bg-gray-200 rounded-md hover:bg-gray-300"
                  onClick={addition}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-1/3 px-6" htmlFor="merchantinstructions">
              Instructions to Merchants
            </label>
            <input
              className="h-10 px-5  text-sm border-2 w-1/2  outline-none focus:outline-none"
              type="text"
              placeholder="Merchant Instructions"
              id="merchantinstructions"
              name="merchantinstructions"
              value={formData.merchantinstructions}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex mt-5">
            <h1 className="px-6 w-1/3 font-semibold">Bill Summary</h1>
            <div className="overflow-auo w-1/2">
              <table className="border-2 border-teal-700 w-full text-left ">
                <thead>
                  <tr>
                    {["Item", " Quantity", "Amount"].map((header, index) => (
                      <th
                        key={index}
                        className="bg-teal-700  text-white p-4 border-[#eee]/50"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {order.map((order) => (
                    <tr key={order.id} className="text-left align-middle">
                      <td className="p-4">{order.item}</td>
                      <td className="p-4">{order.quantity}</td>
                      <td className="p-4">{order.amount}</td>
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
              onClick={formSubmit}
            >
              Create Order ₹534
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Takeaway;
