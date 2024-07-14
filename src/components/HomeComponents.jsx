import React from "react";

const HomeComponents = () => {
  return (
    <>
      <div className="w-full">
        <div className="flex mx-5 py-5  justify-between items-center bg-white mt-5 rounded-lg">
          <div className="font-bold mx-10 text-[32px] w-[30%]">Orders</div>
          <div className="flex-grow flex gap-[35px] font-normal">
            <div className="border-l-8  px-10 border-teal-700">
              <p>Pending</p>
              <p className="text-[24px] font-bold text-teal-600">20</p>
            </div>
            <div className="border-l-8  px-10 border-teal-700">
              <p>Ongoing</p>
              <p className="text-[24px] font-bold text-teal-600">20</p>
            </div>
            <div className="border-l-8  px-10 border-teal-700">
              <p>Completed</p>
              <p className="text-[24px] font-bold text-teal-600">20</p>
            </div>
            <div className="border-l-8  px-5 border-teal-700">
              <p>Cancelled</p>
              <p className="text-[24px] font-bold text-teal-600">20</p>
            </div>
          </div>
        </div>

        <div className="flex mx-5 py-5  justify-between items-center bg-white mt-5 rounded-lg">
          <div className="font-bold mx-10 text-[32px] w-[30%]">Merchants</div>
          <div className="flex-grow flex gap-[50px] font-normal">
            <div className="border-l-8  px-10 border-teal-700">
              <p>Open</p>
              <p className="text-[24px] font-bold text-teal-600">20</p>
            </div>
            <div className="border-l-8  px-10 border-teal-700">
              <p>Closed</p>
              <p className="text-[24px] font-bold text-teal-600">20</p>
            </div>
            <div className="border-l-8  px-10 border-teal-700">
              <p>Active</p>
              <p className="text-[24px] font-bold text-teal-600">20</p>
            </div>
            <div className="border-l-8  px-10 border-teal-700">
              <p>Inactive</p>
              <p className="text-[24px] font-bold text-teal-600">20</p>
            </div>
          </div>
        </div>

        <div className="flex mx-5 py-5  justify-between items-center bg-white mt-5 rounded-lg">
          <div className="font-bold mx-10 text-[32px] w-[30%]">
            Delivery Agents
          </div>
          <div className=" flex-grow flex gap-[50px] font-normal">
            <div className="border-l-8  px-10 border-teal-700">
              <p>Free</p>
              <p className="text-[24px] font-bold text-teal-600">20</p>
            </div>
            <div className="border-l-8  px-10 border-teal-700">
              <p>Inactive</p>
              <p className="text-[24px] font-bold text-teal-600">20</p>
            </div>
            <div className="border-l-8  px-10 border-teal-700">
              <p>Busy</p>
              <p className="text-[24px] font-bold text-teal-600">20</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeComponents;
