import React from "react";
import { CheckCircleOutlined } from "@ant-design/icons";
const Success = () => {
  return (
    <section className=" flex justify-center w-full h-screen font-poppins">
      <div className="w-1/2">
        <img className="h-full w-full object-cover" src="LoginImage.svg" />
      </div>

      <div className="w-1/2 flex justify-center items-center">
        <div className="border-2 border-teal-700 p-10 rounded-xl bg-white w-[400px]">
          <img className="flex mx-auto m-8" src="famto-black-logo.svg" />
          <div className="flex justify-center item-center">
            <CheckCircleOutlined className="text-[60px] text-teal-700" />
          </div>

          <h1 className="text-[20px] mt-8 text-center font-poppins font-semibold">
            SUCCESS !!
          </h1>
          <h1 className="text-zinc-500 text-center mt-5">
            Your account has been created successfully.
          </h1>

          <button
            className="bg-teal-700 p-2 rounded-xl text-white mt-7 mb-16 w-full"
            type="submit"
          >
            Sign in
          </button>
        </div>
      </div>
    </section>
  );
};

export default Success;
