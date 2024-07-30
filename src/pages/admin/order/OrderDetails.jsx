import { useContext, useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import GlobalSearch from "../../../components/GlobalSearch";
import { ArrowLeftOutlined, DownloadOutlined } from "@ant-design/icons";
import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Box,
} from "@chakra-ui/react";
import map from "/map.svg";
import avatar from "/avatar.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const OrderDetails = () => {
  const [orderDetail, setOrderDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { orderId } = useParams();

  const { token, role } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }

    const getOrderDetail = async () => {
      try {
        setIsLoading(true);
        const endpoint =
          role === "Admin"
            ? `${BASE_URL}/orders/admin/${orderId}`
            : `${BASE_URL}/orders/${orderId}`;

        const response = await axios.get(endpoint, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setOrderDetail(response.data.data);
          console.log(response.data.data);
        }
      } catch (err) {
        console.log(`Error in getting order detail: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    getOrderDetail();
  }, [token, orderId]);

  const steps = [
    { title: "Created", description: "by Admin ID #123" },
    { title: "Assigned", description: "by Admin ID #123" },
    { title: "Accepted", description: "by Agent Name" },
    { title: "Started", description: "by Agent Name" },
    { title: "Reached pickup location", description: "by Agent Name" },
    { title: "Note Added", description: "by Agent Name" },
    { title: "Signature Added", description: "by Agent Name" },
    { title: "Image Added", description: "by Agent Name" },
    { title: "Completed", description: "by Agent Name" },
  ];

  const { activeStep } = useSteps({
    index: 2,
    count: steps.length,
  });

  return (
    <>
      <Sidebar />
      <div className="pl-[300px] bg-gray-100 min-w-fit">
        <nav className="p-5">
          <GlobalSearch />
        </nav>
        <div className="flex justify-between mx-5">
          <div>
            <p className="flex gap-[20px] mb-0">
              <ArrowLeftOutlined onClick={() => navigate("/all-orders")} />
              <p className="font-[600] mb-0">
                Order information #{orderDetail._id}
              </p>
            </p>
          </div>
          <div>
            <button className="bg-blue-100 px-4 p-2 rounded-md">
              <DownloadOutlined /> Bill
            </button>
          </div>
        </div>
        <div className="flex bg-white mx-5 rounded-lg mt-5 gap-16 p-5">
          <div className="w-1/3">
            <div className="flex justify-between">
              <label>Order Status</label>
              <p>{orderDetail.orderStatus}</p>
            </div>
            <div className="flex justify-between">
              <label>Payment Status</label>
              <p>{orderDetail.paymentStatus}</p>
            </div>
            <div className="flex justify-between">
              <label>Payment Mode</label>
              <p>{orderDetail.paymentMode}</p>
            </div>
            <div className="flex justify-between">
              <label>Delivery Mode</label>
              <p>{orderDetail.deliveryMode}</p>
            </div>
          </div>
          <div className="w-1/3">
            <div className="flex justify-between">
              <label>Delivery option</label>
              <p>{orderDetail.deliveryOption}</p>
            </div>
            <div className="flex justify-between">
              <label>Vehicle Type</label>
              <p>{orderDetail.vehicleType ? orderDetail.vehicleType : "N/A"}</p>
            </div>
            <div className="flex justify-between">
              <label>order Time</label>
              <p>{orderDetail.orderTime}</p>
            </div>
            <div className="flex justify-between">
              <label>Delivery Time</label>
              <p>{orderDetail.deliveryTime}</p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h1 className="text-[18px] font-semibold ml-5 mb-5">
            Customer Details
          </h1>
          <table className="w-full">
            <thead>
              <tr>
                {[
                  "Id",
                  "Name",
                  "Email",
                  "Phone",
                  "Address",
                  "Ratings to Delivery Agent",
                  "Rating by Delivery Agent",
                ].map((header) => (
                  <th
                    key={header}
                    className="bg-teal-800 text-white h-[70px] text-center"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="text-center bg-white h-20">
                <td className="underline underline-offset-2">
                  <Link
                    to={`/customer-detail/${orderDetail?.customerDetail?._id}`}
                  >
                    #{orderDetail?.customerDetail?._id}
                  </Link>
                </td>
                <td>{orderDetail?.customerDetail?.name}</td>
                <td>{orderDetail?.customerDetail?.email}</td>
                <td>{orderDetail?.customerDetail?.phone}</td>

                <td>
                  <div className="flex flex-col">
                    <small>
                      {orderDetail?.customerDetail?.address?.fullName}
                    </small>
                    <small>
                      {orderDetail?.customerDetail?.address?.phoneNumber}
                    </small>
                    <small>{orderDetail?.customerDetail?.address?.flat}</small>
                    <small>{orderDetail?.customerDetail?.address?.area}</small>
                    <small>
                      {orderDetail?.customerDetail?.address?.landmark}
                    </small>
                  </div>
                </td>

                <td>
                  <div className="flex flex-col">
                    <small>
                      {
                        orderDetail?.customerDetail?.ratingsToDeliveryAgent
                          ?.rating
                      }
                    </small>
                    <small>
                      {
                        orderDetail?.customerDetail?.ratingsToDeliveryAgent
                          ?.review
                      }
                    </small>
                  </div>
                </td>

                <td>
                  <div className="flex flex-col">
                    <small>
                      {
                        orderDetail?.customerDetail?.ratingsByDeliveryAgent
                          ?.rating
                      }
                    </small>
                    <small>
                      {
                        orderDetail?.customerDetail?.ratingsByDeliveryAgent
                          ?.review
                      }
                    </small>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-10">
          <h1 className="text-[18px] font-semibold ml-5 mb-5">
            Merchant Details
          </h1>
          <table className="w-full">
            <thead>
              <tr>
                {[
                  "Id",
                  "Name",
                  "Instructions by Customer",
                  "Merchant Earnings",
                  "Famto Earnings",
                ].map((header) => (
                  <th
                    key={header}
                    className="bg-teal-800 text-white h-[70px] text-center"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="text-center bg-white h-20">
                <td className="underline underline-offset-2">
                  <Link
                    to={`merchant-detail/${orderDetail?.merchantDetail?._id}`}
                  >
                    #{orderDetail?.merchantDetail?._id}
                  </Link>
                </td>
                <td>{orderDetail?.merchantDetail?.name}</td>
                <td>{orderDetail?.merchantDetail?.instructionsByCustomer}</td>
                <td>{orderDetail?.merchantDetail?.merchantEarnings}</td>
                <td>{orderDetail?.merchantDetail?.famtoEarnings}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-10">
          <h1 className="text-[18px] font-semibold ml-5 mb-5">
            Delivery Agent Details
          </h1>
          <table className="w-full">
            <thead>
              <tr>
                {[
                  "Id",
                  "Name",
                  "Team Name",
                  "Instruction by Customer",
                  "Time taken",
                  "Distance travelled",
                  "Delayed by",
                ].map((header) => (
                  <th
                    key={header}
                    className="bg-teal-800 text-white h-[70px] text-center"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="text-center bg-white h-20">
                <td className="underline underline-offset-2">
                  <Link
                    to={`/agent-detail/${orderDetail?.deliveryAgentDetail?._id}`}
                  >
                    #{orderDetail?.deliveryAgentDetail?._id}
                  </Link>
                </td>
                <td>{orderDetail?.deliveryAgentDetail?.name}</td>
                <td>{orderDetail?.deliveryAgentDetail?.team}</td>
                <td>
                  {orderDetail?.deliveryAgentDetail?.instructionsByCustomer}
                </td>
                <td>{orderDetail?.deliveryAgentDetail?.timeTaken}</td>
                <td>{orderDetail?.deliveryAgentDetail?.distanceTravelled}</td>
                <td>{orderDetail?.deliveryAgentDetail?.delayedBy}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h1 className="text-[18px] font-semibold m-5">Order Details</h1>

        {/* Pick and Drop */}
        {orderDetail.deliveryMode === "Pick and Drop" && (
          <div>
            <table className="w-[60%] mx-auto border-2 border-gray-600">
              <thead>
                <tr>
                  {["Items Type", "Dimensions", "Weight Range"].map(
                    (header) => (
                      <th
                        key={header}
                        className="bg-teal-800 text-white h-[70px] text-center p-5 "
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {orderDetail.items.map((item) => (
                  <tr className="text-center bg-white h-20" key={item.itemName}>
                    <td>{item.itemName}</td>
                    <td>
                      {item.length}x{item.width}x{item.height}
                    </td>
                    <td>{item.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Custom Order */}
        {orderDetail.deliveryMode === "Custom Order" && (
          <div>
            <table className="w-full border-2 border-gray-600">
              <thead>
                <tr>
                  {["Items", "Quantity", "Unit", "Image"].map((header) => (
                    <th
                      key={header}
                      className="bg-teal-800 text-white h-[70px] text-center p-5 "
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orderDetail.items.map((item) => (
                  <tr className="text-center bg-white h-20" key={item.itemName}>
                    <td>{item.itemName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.numOfUnits}</td>
                    <td>{item.itemImageURL}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Home Delivery */}
        {(orderDetail.deliveryMode === "Take Away" ||
          orderDetail.deliveryMode === "Home Delivery") && (
          <div>
            <table className="w-[60%] mx-auto border-2 border-gray-600">
              <thead>
                <tr>
                  {["Items", "Quantity", "Amount"].map((header) => (
                    <th
                      key={header}
                      className="bg-teal-800 text-white h-[70px] text-center p-5"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orderDetail.items.map((item) => (
                  <tr className="text-center bg-white h-20" key={item.itemName}>
                    <td>{item.itemName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div>
          <h1 className="text-[18px] font-semibold m-5">Bill Summary</h1>
          <div className="border-2 border-gray-600">
            <div className="flex justify-between mx-5 m-3">
              <label>Price</label>
              <p>
                {orderDetail.billDetail ? orderDetail.billDetail.itemTotal : ""}
              </p>
            </div>
            <div className="flex justify-between mx-5 m-3">
              <label>Delivery Charges</label>
              <p>
                {orderDetail.billDetail
                  ? orderDetail.billDetail.deliveryCharge
                  : ""}
              </p>
            </div>
            <div className="flex justify-between mx-5 m-3">
              <label>Added Tip</label>
              <p>
                {orderDetail.billDetail ? orderDetail.billDetail.addedTip : ""}
              </p>
            </div>
            <div className="flex justify-between mx-5 m-3">
              <label>Discount</label>
              <p>{orderDetail?.billDetail?.discountedAmount || 0}</p>
            </div>
            <div className="flex justify-between mx-5 m-3">
              <label>Sub Total</label>
              <p>{orderDetail?.billDetail?.subTotal}</p>
            </div>
            <div className="flex justify-between mx-5 m-3">
              <label>GST (inclusive of all taxes)</label>
              <p>{orderDetail?.billDetail?.taxAmount}</p>
            </div>
          </div>
          <div className="bg-teal-800 flex justify-between p-5 text-white text-[16px] font-semibold">
            <label>Net Payable Amount</label>
            <p>{orderDetail?.billDetail?.grandTotal}</p>
          </div>
        </div>
        <h1 className="text-[18px] font-semibold m-5">Order Activity log</h1>
        <div className="bg-white mx-5 p-5 rounded-lg flex justify-between gap-20 items-center">
          <div className="bg-gray-200 p-3 rounded-full">
            <img src={avatar} />
          </div>
          <div className="flex justify-around w-1/4">
            <label className="text-gray-600">Agent Name</label>
            <p>{orderDetail?.deliveryAgentDetail?.name}</p>
          </div>
          <div className="flex justify-around w-1/4">
            <label className="text-gray-600">Total Distance</label>
            <p>{orderDetail?.deliveryAgentDetail?.distanceTravelled}</p>
          </div>
          <div className="flex justify-around w-1/4 ">
            <label className="text-gray-600">Total Time</label>
            <p>{orderDetail?.deliveryAgentDetail?.timeTaken}</p>
          </div>
        </div>
        <div className="flex m-5 mx-10 ">
          <div className="w-1/2 ">
            <Stepper
              index={activeStep}
              orientation="vertical"
              height="800px"
              colorScheme="teal"
              m="20px"
              gap="0"
            >
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepIndicator>
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>

                  <Box flexShrink="0">
                    <StepTitle>{step.title}</StepTitle>
                    <StepDescription>{step.description}</StepDescription>
                  </Box>

                  <StepSeparator />
                </Step>
              ))}
            </Stepper>
          </div>
          <div className="w-1/2">
            <img src={map} alt="map" />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
