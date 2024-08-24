import { useContext, useEffect, useState } from "react";
import { Switch } from "antd";
import { Spinner, useToast } from "@chakra-ui/react";
import axios from "axios";
import { formatDate } from "../../utils/formatter";
import { UserContext } from "../../context/UserContext";

const SponsorshipDetail = ({
  data,
  merchantId,
  name,
  email,
  phoneNumber,
  BASE_URL,
  token,
}) => {
  const [sponsorshipData, setSponsorshipData] = useState({});
  const [haveSponsorship, setHaveSponsorship] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  const toast = useToast();
  const { role, userId } = useContext(UserContext);

  useEffect(() => {
    setSponsorshipData(data);
    setHaveSponsorship(data?.sponsorshipStatus);
    setSelectedPlan(data?.sponsorshipDetail || null);
  }, [data]);

  const handlePlanChange = (e) => {
    setSelectedPlan(e.target.value);
  };

  const handleToggleChange = () => {
    setHaveSponsorship(!haveSponsorship);
  };

  const handlePaymentController = async (e) => {
    try {
      setIsPaymentLoading(true);
      if (!selectedPlan) {
        toast({
          title: "Error",
          description: "Please select a plan",
          duration: 3000,
          status: "error",
          isClosable: true,
        });
        return;
      }

      const endPoint =
        role === "Admin"
          ? `${BASE_URL}/merchants/admin/sponsorship-payment/${merchantId}`
          : `${BASE_URL}/merchants/sponsorship-payment/${userId}`;

      const response = await axios.post(
        endPoint,
        {
          currentPlan: selectedPlan,
          sponsorshipStatus: true,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const { orderId, amount, currentPlan } = response.data;
        openRazorpayCheckout(orderId, amount, currentPlan);
      }
    } catch (err) {
      console.error("Error initiating payment:", err);
    } finally {
      setIsPaymentLoading(false);
    }
  };

  const openRazorpayCheckout = (orderId, amount, currentPlan) => {
    const options = {
      key: import.meta.env.VITE_APP_RAZORPAY_KEY,
      amount: amount * 100,
      currency: "INR",
      name: "Famto",
      description: "Sponsorship Payment",
      order_id: orderId,
      handler: async function (response) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response;
        try {
          const endPoint =
            role === "Admin"
              ? `${BASE_URL}/merchants/admin/verify-payment/${merchantId}`
              : `${BASE_URL}/merchants/verify-payment/${userId}`;

          const verifyResponse = await axios.post(
            endPoint,
            {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
              currentPlan,
            },
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (verifyResponse.status === 200) {
            toast({
              title: "Success",
              description: "Payment verified successfully",
              duration: 3000,
              status: "success",
              isClosable: true,
            });
          }
        } catch (err) {
          console.error("Error verifying payment:", err);
          toast({
            title: "Error",
            description: "Error in verifying payment",
            duration: 3000,
            status: "error",
            isClosable: true,
          });
          setIsPaymentLoading(false);
        }
      },
      prefill: {
        name: name,
        email: email,
        contact: phoneNumber,
      },
      theme: {
        color: "#00CED1",
      },
      // confirm_close: true,
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <div className="mb-6 flex">
        <div className="flex justify-between rounded">
          <h3 className="text-gray-700 mb-2 mt-3 ">Sponsorship Status</h3>

          <div
            className={`${
              sponsorshipData?.currentPlan ? `visible` : ` invisible`
            } mb-4 max-w-[30rem] p-5 justify-center text-center mx-[12rem] shadow-lg `}
          >
            <label className="block text-teal-700 font-[600] mb-[10px] text-[16px]">
              Current Chosen Plan
            </label>
            <div className="flex items-center gap-3 text-teal-700 text-[16px] font-[600]">
              <p className="">{sponsorshipData?.currentPlan} plan</p> |
              <p>
                {formatDate(sponsorshipData?.startDate)} -{" "}
                {formatDate(sponsorshipData?.endDate)}
              </p>
            </div>
          </div>

          <Switch value={haveSponsorship} onChange={handleToggleChange} />
        </div>
      </div>

      {haveSponsorship && (
        <div className="mb-6 flex">
          <h3 className="text-black mb-2 flex">Choose or Renew Plan</h3>
          <div className="grid ml-[11rem] gap-3">
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "250", label: "Monthly", price: "250" },
                { value: "750", label: "3 Month", price: "750" },
                { value: "1500", label: "6 Month", price: "1500" },
                { value: "3000", label: "1 Year", price: "3000" },
              ].map((plan, index) => (
                <label
                  key={index}
                  className="flex items-center border p-3 gap-1 rounded-lg cursor-pointer"
                >
                  <input
                    type="radio"
                    name="sponsorshipAmount"
                    value={plan.label}
                    checked={selectedPlan === plan.label}
                    onChange={handlePlanChange}
                    className="mr-2 cursor-pointer"
                  />
                  {plan.label}({`₹ ${plan.price}`})
                </label>
              ))}
            </div>

            <button
              type="button"
              className="bg-teal-700 text-white p-2 rounded-md w-[20rem] mt-4"
              onClick={handlePaymentController}
            >
              {isPaymentLoading ? <Spinner size="sm" /> : `Pay`}
            </button>
            <p className="w-[25rem] text-[14px] text-gray-700">
              Note: Choose the date range for showing your shop on top of the
              sheet and reach your customers more easily.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SponsorshipDetail;
