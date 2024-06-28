import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

const Verification = () => {
  const [otp, setOtp] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
  });

  const otp1Ref = useRef(null);
  const otp2Ref = useRef(null);
  const otp3Ref = useRef(null);
  const otp4Ref = useRef(null);

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setOtp({ ...otp, [name]: value });

    switch (name) {
      case "otp1":
        if (value) otp2Ref.current.focus();
        break;
      case "otp2":
        if (value) otp3Ref.current.focus();
        break;
      case "otp3":
        if (value) otp4Ref.current.focus();
        break;
      default:
        break;
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    const OTP = otp.otp1 + otp.otp2 + otp.otp3 + otp.otp4;
    console.log(OTP);
  };

  return (
    <section className="flex w-screen font-poppins h-screen ">
      <figure className="h-full w-full md:w-1/2">
        <img className="h-full w-full object-cover" src="LoginImage.svg" />
      </figure>
      <div className=" flex justify-center h-full w-1/2 items-center ">
        <div className="min-w-screen bg-white h-auto w-[400px] rounded-2xl border-2 border-teal-700 p-10">
          <div className="text-center mt-5 ">
            <img
              src="famto-black-logo.svg"
              alt="Logo"
              className="mx-auto flex h-20 w-20"
            />
            <h2 className="mt-8 text-[18px] font-medium text-black ">
              Verify Account
            </h2>
            <p className="text-zinc-500 mt-5 font-poppins">
              An OTP has been send to the number xxxxxxx{} Enter the OTP to
              verify your mobile number.
            </p>
          </div>
          <div className="max-w-md mx-auto  rounded">
            <form className="p-4 py-6">
              <div className="flex justify-center gap-4 mb-3 w-full">
                <input
                  className="w-12 h-12 text-center border-b-2 border-teal-700 focus:border-teal-900 focus:ring-teal-500"
                  type="text"
                  maxlength="1"
                  pattern="[0-9]"
                  inputmode="numeric"
                  autocomplete="one-time-code"
                  ref={otp1Ref}
                  name="otp1"
                  value={otp.otp1}
                  onChange={handleInputChange}
                />
                <input
                  className="w-12 h-12 text-center border-b-2 border-teal-700 focus:border-teal-900 focus:ring-teal-500"
                  type="text"
                  maxlength="1"
                  pattern="[0-9]"
                  inputmode="numeric"
                  autocomplete="one-time-code"
                  ref={otp2Ref}
                  name="otp2"
                  value={otp.otp2}
                  onChange={handleInputChange}
                />
                <input
                  className="w-12 h-12 text-center border-b-2 border-teal-700 focus:border-teal-900 focus:ring-teal-500"
                  type="text"
                  maxlength="1"
                  pattern="[0-9]"
                  inputmode="numeric"
                  autocomplete="one-time-code"
                  ref={otp3Ref}
                  name="otp3"
                  value={otp.otp3}
                  onChange={handleInputChange}
                />
                <input
                  className="w-12 h-12 text-center border-b-2 border-teal-700 focus:border-teal-900 focus:ring-teal-500"
                  type="text"
                  maxlength="1"
                  pattern="[0-9]"
                  inputmode="numeric"
                  autocomplete="one-time-code"
                  ref={otp4Ref}
                  name="otp4"
                  value={otp.otp4}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-zinc-500 text-[14px] mb-8">
                  If You didn't recieve the Code!
                  <Link className="text-teal-900" to={"/"}>
                    Resend
                  </Link>
                </p>
                <button
                  onClick={handleClick}
                  className="bg-teal-700 hover:bg-teal-900 rounded-2xl text-white font-bold p-3 mb-12 w-full focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Verify OTP
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Verification;
