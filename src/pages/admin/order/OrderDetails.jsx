import React from "react";
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

const OrderDetails = () => {
  const dummyData = [
    {
      id: "1",
      name: "Bank",
      email: "123gamil",
      accountType: "Savings",
      description: "The bank account",
      dateTime: "18/06/2003",
      status: "active",
    },
    {
      id: "2",
      name: "Bakery",
      email: "457gmail",
      accountType: "Current",
      description: "Account",
      dateTime: "18/05/2003",
      status: "active",
    },
  ];

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
            {" "}
            <p>
              <ArrowLeftOutlined /> Order information #123
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
              <p>Completed</p>
            </div>
            <div className="flex justify-between">
              <label>Payment Status</label>
              <p>Paid</p>
            </div>
            <div className="flex justify-between">
              <label>Payment Mode</label>
              <p>cash</p>
            </div>
            <div className="flex justify-between">
              <label>Delivery Method</label>
              <p>Pick and drop</p>
            </div>
          </div>
          <div className="w-1/3">
            <div className="flex justify-between">
              <label>Delivery option</label>
              <p>on-Demand</p>
            </div>
            <div className="flex justify-between">
              <label>Vehicle Type</label>
              <p>Type of vehicle</p>
            </div>
            <div className="flex justify-between">
              <label>order Time</label>
              <p>march 2024</p>
            </div>
            <div className="flex justify-between">
              <label>Delivery Time</label>
              <p>march 2024</p>
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
                  "Adress",
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
              {dummyData.map((dummyData) => (
                <tr className="text-center bg-white h-20" key={dummyData.id}>
                  <td>{dummyData.id}</td>
                  <td>{dummyData.name}</td>
                  <td>{dummyData.email}</td>
                  <td>{dummyData.accountType}</td>
                  <td>{dummyData.description}</td>
                  <td>{dummyData.dateTime}</td>
                  <td>{dummyData.status}</td>
                </tr>
              ))}
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
              {dummyData.map((dummyData) => (
                <tr className="text-center bg-white h-20" key={dummyData.id}>
                  <td>{dummyData.id}</td>
                  <td>{dummyData.name}</td>
                  <td>{dummyData.accountType}</td>
                  <td>{dummyData.description}</td>
                  <td>{dummyData.dateTime}</td>
                  <td></td>
                </tr>
              ))}
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
              {dummyData.map((dummyData) => (
                <tr className="text-center bg-white h-20" key={dummyData.id}>
                  <td>{dummyData.id}</td>
                  <td>{dummyData.name}</td>
                  <td>{dummyData.email}</td>
                  <td>{dummyData.accountType}</td>
                  <td>{dummyData.description}</td>
                  <td>{dummyData.dateTime}</td>
                  <td>{dummyData.status}</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h1 className="text-[18px] font-semibold m-5">Order Details</h1>
        <div className="flex justify-around gap-2">
          <div>
            <table className="w-full border-2 border-gray-600">
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
                {dummyData.map((dummyData) => (
                  <tr className="text-center bg-white h-20" key={dummyData.id}>
                    <td>{dummyData.name}</td>
                    <td>{dummyData.accountType}</td>
                    <td>{dummyData.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
                {dummyData.map((dummyData) => (
                  <tr className="text-center bg-white h-20" key={dummyData.id}>
                    <td>{dummyData.name}</td>
                    <td>{dummyData.accountType}</td>
                    <td>{dummyData.description}</td>
                    <td>{dummyData.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <table className="w-full border-2 border-gray-600">
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
                {dummyData.map((dummyData) => (
                  <tr className="text-center bg-white h-20" key={dummyData.id}>
                    <td>{dummyData.name}</td>
                    <td>{dummyData.accountType}</td>
                    <td>{dummyData.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h1 className="text-[18px] font-semibold m-5">Bill Summary</h1>
          <div className="border-2 border-gray-600">
            <div className="flex justify-between mx-5 m-3">
              <label>Price</label>
              <p>514</p>
            </div>
            <div className="flex justify-between mx-5 m-3">
              <label>Delivery Charges</label>
              <p>514</p>
            </div>
            <div className="flex justify-between mx-5 m-3">
              <label>Added Tip</label>
              <p>514</p>
            </div>
            <div className="flex justify-between mx-5 m-3">
              <label>Discount</label>
              <p>514</p>
            </div>
            <div className="flex justify-between mx-5 m-3">
              <label>Sub Total</label>
              <p>514</p>
            </div>
            <div className="flex justify-between mx-5 m-3">
              <label>GST (inclusive of all taxes)</label>
              <p>514</p>
            </div>
          </div>
          <div className="bg-teal-800 flex justify-between p-5 text-white text-[16px] font-semibold">
            <label>Net Payable Amount</label>
            <p>514</p>
          </div>
        </div>
        <h1 className="text-[18px] font-semibold m-5">Order Activity log</h1>
        <div className="bg-white mx-5 p-5 rounded-lg flex justify-between gap-20 items-center">
          <div className="bg-gray-200 p-3 rounded-full">
            <img src="avatar.svg" />
          </div>
          <div className="flex justify-around w-1/4">
            <label className="text-gray-600">Agent Name</label>
            <p>Famto</p>
          </div>
          <div className="flex justify-around w-1/4">
            <label className="text-gray-600">Total Distance</label>
            <p>10 km</p>
          </div>
          <div className="flex justify-around w-1/4 ">
            <label className="text-gray-600">Total Time</label>
            <p>60 min</p>
          </div>
        </div>
        <div className="flex m-5 gap-10 mx-10 w-full">
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
          <div>
            <img src="map.svg" alt="map" />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
