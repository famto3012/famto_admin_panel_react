import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";

import { UserContext } from "../../../context/UserContext";

import GlobalSearch from "../../../components/GlobalSearch";
import Sidebar from "../../../components/Sidebar";

import { ArrowLeftOutlined } from "@ant-design/icons";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const MerchantPayoutDetail = () => {
  const [allPayouts, setAllPayouts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { token, role } = useContext(UserContext);
  const navigate = useNavigate();
  const { merchantId, date } = useParams();

  useEffect(() => {
    if (role !== "Admin") navigate("/home");
    const getPayoutDetails = async () => {
      try {
        setIsLoading(true);

        const response = await axios.get(
          `${BASE_URL}/merchants/admin/payout-detail`,
          {
            params: {
              date,
              merchantId,
              timezoneOffset: 330,
            },
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setAllPayouts(response.data.data);
      } catch (err) {
        console.log(`Error in filtering payouts: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };
    getPayoutDetails();
  }, []);

  return (
    <>
      <Sidebar />

      <div className="pl-[300px] bg-gray-100 h-screen w-full">
        <div className="p-[30px]">
          <GlobalSearch />
        </div>

        <div className="flex items-center gap-2 px-[20px]">
          <ArrowLeftOutlined onClick={() => navigate("/merchant/payout")} />
          <h3 className="font-[600] text-[18px]">
            Merchant Payout of date{" "}
            <span className="text-gray-500">[{date}]</span>
          </h3>
        </div>

        <div className="overflow-x-auto mt-[20px]  w-full">
          <table className="text-center w-full">
            <thead>
              <tr className="bg-teal-600">
                {[
                  "Product Name",
                  "Variant Name",
                  "Cost Price",
                  "Price",
                  "No: of orders",
                  "Total Payable",
                ].map((header) => (
                  <td
                    key={header}
                    className="bg-teal-700 text-center text-white py-[20px] border-r-2 border-[#eee]/50"
                  >
                    {header}
                  </td>
                ))}
              </tr>
            </thead>

            <tbody>
              {isLoading && (
                <tr>
                  <td
                    colSpan={8}
                    className="h-[70px] bg-white text-center gap-4"
                  >
                    <span>Loading</span> <Spinner size="sm" />
                  </td>
                </tr>
              )}

              {!isLoading && allPayouts.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="h-[70px] bg-white text-center gap-4"
                  >
                    <span>No Data</span>
                  </td>
                </tr>
              )}

              {!isLoading &&
                allPayouts?.map((payout) => (
                  <tr
                    key={payout.payoutId}
                    className="h-[70px] even:bg-gray-200 align-middle"
                  >
                    <td className="py-2 px-4">{payout.productName}</td>
                    <td className="py-2 px-4">{payout.variantName || "-"}</td>
                    <td className="py-2 px-4">{payout.costPrice}</td>
                    <td className="py-2 px-4">{payout.price}</td>
                    <td className="py-2 px-4">{payout.quantity}</td>
                    <td className="py-2 px-4">{payout.totalCost}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MerchantPayoutDetail;
