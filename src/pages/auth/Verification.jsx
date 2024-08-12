import React, { useState, useRef, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import famtoBlackLogo from "/famto-black-logo.svg";
import LoginImage from "/LoginImage.svg";
import { UserContext } from "../../context/UserContext";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase";
import { useToast } from "@chakra-ui/react";
import OtpInput from "otp-input-react";

const Verification = () => {
  const [otp, setOtp] = useState("");

  // const otp1Ref = useRef(null);
  // const otp2Ref = useRef(null);
  // const otp3Ref = useRef(null);
  // const otp4Ref = useRef(null);

  // const handleInputChange = async (e) => {
  //   const { name, value } = e.target;
  //   setOtp({ ...otp, [name]: value });

  //   switch (name) {
  //     case "otp1":
  //       if (value) otp2Ref.current.focus();
  //       break;
  //     case "otp2":
  //       if (value) otp3Ref.current.focus();
  //       break;
  //     case "otp3":
  //       if (value) otp4Ref.current.focus();
  //       break;
  //     default:
  //       break;
  //   }
  // };

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   const OTP = otp.otp1 + otp.otp2 + otp.otp3 + otp.otp4;
  //   console.log(OTP);
  // };

  const { signUp, verification, setVerification } = useContext(UserContext);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isVerifyButtonDisabled, setIsVerifyButtonDisabled] = useState(false);
  const [otpTime, setOtpTime] = useState(40);
  const toast = useToast();
  const navigate = useNavigate();

  const [recaptcha, setRecaptcha] = useState(null);
  useEffect(() => {
    let recaptchaVerifier;
    recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
      size: "invisible",
    });
    setRecaptcha(recaptchaVerifier);
  }, []);

  useEffect(() => {
    if (otpTime > 0) {
      const intervalId = setInterval(() => {
        setOtpTime(otpTime - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [otpTime]);

  const resendOTP = async () => {
    if (signUp.phoneNumber == null) {
      toast({
        title: "Something wrong try to again send otp",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (isButtonDisabled) {
      return;
    }

    try {
      setIsButtonDisabled(true);
      const confirmation = await signInWithPhoneNumber(
        auth,
        signUp.phoneNumber,
        recaptcha
      );
      toast({
        title: "Otp sended successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setVerification(confirmation);
      setOtpTime(40);
    } catch (error) {
      switch (error.code) {
        case "auth/too-many-requests":
          toast({
            title: "Too many requests. Please try again later.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          break;
        case "auth/invalid-phone-number":
          toast({
            title: "The phone number is invalid.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          break;
        default:
          toast({
            title: "Something went wrong. Please try again later.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          break;
      }
      console.log(error);
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const verificationOfOtp = (data) => {
    if (data === verification) {
      return true;
    } else {
      return false;
    }
  };

  const verifyOTP = async () => {
    if (isVerifyButtonDisabled) {
      return;
    }

    setIsVerifyButtonDisabled(true);
    try {
      const data = verificationOfOtp(otp);
      if (data) {
        toast({
          title: "Otp verified successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        // Navigate to dashboard page
        navigate("/auth/success");
      }else{
        toast({
          title: "Invalid Otp",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-verification-code":
          toast({
            title: "The verification code is invalid.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          break;
        case "auth/code-expired":
          toast({
            title: "The verification code is expired.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          break;
        default:
          toast({
            title: "Something went wrong. Please try again later.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          break;
      }
      console.log(error);
    } finally {
      setIsVerifyButtonDisabled(false);
    }
  };

  return (
    <section className="flex w-screen font-poppins h-screen ">
      <figure className="h-full w-full md:w-1/2">
        <img className="h-full w-full object-cover" src={LoginImage} />
      </figure>
      <div className=" flex justify-center h-full w-1/2 items-center ">
        <div className="min-w-screen bg-gray-100 h-auto w-[400px] rounded-2xl border-2 border-teal-700 p-10">
          <div className="text-center mt-5 ">
            <img
              src={famtoBlackLogo}
              alt="Logo"
              className="mx-auto flex h-20 w-20"
            />
            <h2 className="mt-8 text-[18px] font-medium text-black ">
              Verify Account
            </h2>
            <p className="text-zinc-500 mt-5 font-poppins">
              An OTP has been send to the number xxxxxxx{signUp.phoneNumber} Enter the OTP to
              verify your mobile number.
            </p>
          </div>
          <div className="max-w-md mx-auto  rounded">
            <form className="p-4 py-6">
              <div className="flex justify-center gap-4 mb-3 w-full">
                {/* <input
                  className="w-12 h-12 text-center border-b-2 border-teal-700 focus:border-teal-900 focus:ring-teal-500"
                  type="text"
                  maxLength="1"
                  pattern="[0-9]"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  ref={otp1Ref}
                  name="otp1"
                  value={otp.otp1}
                  onChange={handleInputChange}
                />
                <input
                  className="w-12 h-12 text-center border-b-2 border-teal-700 focus:border-teal-900 focus:ring-teal-500"
                  type="text"
                  maxLength="1"
                  pattern="[0-9]"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  ref={otp2Ref}
                  name="otp2"
                  value={otp.otp2}
                  onChange={handleInputChange}
                />
                <input
                  className="w-12 h-12 text-center border-b-2 border-teal-700 focus:border-teal-900 focus:ring-teal-500"
                  type="text"
                  maxLength="1"
                  pattern="[0-9]"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  ref={otp3Ref}
                  name="otp3"
                  value={otp.otp3}
                  onChange={handleInputChange}
                />
                <input
                  className="w-12 h-12 text-center border-b-2 border-teal-700 focus:border-teal-900 focus:ring-teal-500"
                  type="text"
                  maxLength="1"
                  pattern="[0-9]"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  ref={otp4Ref}
                  name="otp4"
                  value={otp.otp4}
                  onChange={handleInputChange}
                /> */}
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                />
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-zinc-500 text-[14px] mb-8">
                  If You didn't recieve the Code!
                  <button
                    className="text-teal-900"
                    onClick={() => resendOTP()}
                    disabled={otpTime > 0}
                  >
                    {isButtonDisabled ? "Sending..." : "Resend"}
                  </button>
                </p>
                <button
                  onClick={() => verifyOTP()}
                  className="bg-teal-700 hover:bg-teal-900 rounded-2xl text-white font-bold p-3 mb-12 w-full focus:outline-none focus:shadow-outline"
                  type="button"
                  disabled={isVerifyButtonDisabled}
                >
                  {isVerifyButtonDisabled ? "Checking..." : "Verify OTP"}
                </button>
                {otpTime > 0 && <div>{otpTime} seconds remaining</div>}
              </div>
            </form>
            <div id="recaptcha"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Verification;
