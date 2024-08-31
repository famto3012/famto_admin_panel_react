import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../context/UserContext";

import { useToast } from "@chakra-ui/react";

import SaveAltIcon from "@mui/icons-material/SaveAlt";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const ShowBill = ({ data }) => {
  const [cartData, setCartData] = useState({});
  const [isOrderLoading, setIsOrderLoading] = useState(false);
  const [paymentMode, setPaymentMode] = useState("");

  const toast = useToast();
  const navigate = useNavigate();
  const { token } = useContext(UserContext);

  useEffect(() => {
    setCartData(data);
  }, [data]);

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
        status: "err",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const createOrder = async (e) => {
    e.preventDefault();
    try {
      if (!paymentMode) {
        toast({
          title: "Error",
          description: "Select a payment mode",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

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
        navigate("/all-orders");
        toast({
          title: "Success",
          description: response.data.message,
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
      setIsOrderLoading(false);
    }
  };

  return (
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
          onClick={downloadInvoiceBill}
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
                cartData?.billDetail?.discountedGrandTotal ||
                cartData?.billDetail?.originalGrandTotal
              }`}
        </button>
      </div>
    </>
  );
};

export default ShowBill;
