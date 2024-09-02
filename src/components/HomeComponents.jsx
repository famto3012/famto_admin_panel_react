import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const HomeComponents = ({ realTimeDataCount }) => {
  const {  role } =
    useContext(UserContext);
  return (
    <>
      <div className="w-full">
        <div className="flex mx-5 py-5  justify-between items-center bg-white mt-5 rounded-lg">
          <div className="font-bold mx-10 text-[32px] w-[30%]">Orders</div>

          <div className="flex-grow flex gap-[10px] font-normal">
            <div className="border-l-8 px-5 border-teal-700 w-[22%]">
              <p>Pending</p>
              <p className="text-[24px] font-bold text-teal-600">
                {realTimeDataCount?.orderCount?.pending}
              </p>
            </div>

            <div className="border-l-8  px-5 border-teal-700 w-[22%]">
              <p>Ongoing</p>
              <p className="text-[24px] font-bold text-teal-600">
                {realTimeDataCount?.orderCount?.ongoing}
              </p>
            </div>

            <div className="border-l-8  px-5 border-teal-700 w-[22%]">
              <p>Completed</p>
              <p className="text-[24px] font-bold text-teal-600">
                {realTimeDataCount?.orderCount?.completed}
              </p>
            </div>

            <div className="border-l-8  px-5 border-teal-700 w-[22%]">
              <p>Cancelled</p>
              <p className="text-[24px] font-bold text-teal-600">
                {realTimeDataCount?.orderCount?.cancelled}
              </p>
            </div>
          </div>
        </div>
      {role === "Admin" && (
        <>
        <div className="flex mx-5 py-5  justify-between items-center bg-white mt-5 rounded-lg">
          <div className="font-bold mx-10 text-[32px] w-[30%]">Merchants</div>

          <div className="flex-grow flex gap-[10px] font-normal">
            <div className="border-l-8  px-5 border-teal-700 w-[22%]">
              <p>Open</p>
              <p className="text-[24px] font-bold text-teal-600">
                {realTimeDataCount?.merchantCount?.open}
              </p>
            </div>
            <div className="border-l-8  px-5 border-teal-700 w-[22%]">
              <p>Closed</p>
              <p className="text-[24px] font-bold text-teal-600">
                {realTimeDataCount?.merchantCount?.closed}
              </p>
            </div>
            <div className="border-l-8  px-5 border-teal-700 w-[22%]">
              <p>Active</p>
              <p className="text-[24px] font-bold text-teal-600">
                {realTimeDataCount?.merchantCount?.active}
              </p>
            </div>
            <div className="border-l-8  px-5 border-teal-700 w-[22%]">
              <p>Inactive</p>
              <p className="text-[24px] font-bold text-teal-600">
                {realTimeDataCount?.merchantCount?.notActive}
              </p>
            </div>
          </div>
        </div>

        <div className="flex mx-5 py-5  justify-between items-center bg-white mt-5 rounded-lg">
          <div className="font-bold mx-10 text-[32px] w-[30%]">
            Delivery Agents
          </div>

          <div className=" flex-grow flex gap-[10px] font-normal">
            <div className="border-l-8  px-5 border-teal-700 w-[22%]">
              <p>Free</p>
              <p className="text-[24px] font-bold text-teal-600">
                {realTimeDataCount?.agentCount?.free}
              </p>
            </div>
            <div className="border-l-8  px-5 border-teal-700 w-[22%]">
              <p>Inactive</p>
              <p className="text-[24px] font-bold text-teal-600">
                {realTimeDataCount?.agentCount?.inActive}
              </p>
            </div>
            <div className="border-l-8  px-5 border-teal-700 w-[22%]">
              <p>Busy</p>
              <p className="text-[24px] font-bold text-teal-600">
                {realTimeDataCount?.agentCount?.busy}
              </p>
            </div>
          </div>
        </div>
        </>
      )}
      </div>
    </>
  );
};

export default HomeComponents;
