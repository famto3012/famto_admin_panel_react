import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase";
import { Button, useToast } from "@chakra-ui/react";
import OtpInput from "otp-input-react";

const Verification = () => {
  const [otp, setOtp] = useState("");
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

      setIsButtonDisabled(true);
      signInWithPhoneNumber(
        auth,
        signUp.phoneNumber,
        recaptcha
      ).then((confirmationResult) => {
        setVerification(confirmationResult);
        toast({
          title: "OTP send successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        // ...
      }).catch((error) => {
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
        setOtpTime(40);
        setIsButtonDisabled(false);
      });
  };

  // const verificationOfOtp = (data) => {
  //   if (data === verification) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  const verifyOTP = () => {
    if (isVerifyButtonDisabled) {
      return;
    }

    setIsVerifyButtonDisabled(true);
      verification.confirm(otp).then((result) => {
        // User signed in successfully.
        toast({
          title: "Otp verified successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        // Navigate to dashboard page
        navigate("/auth/success");
      }).catch((error) => {
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
        setIsVerifyButtonDisabled(false);
      });
  };

  return (
    <section className="flex w-screen font-poppins h-screen ">
      <figure className="h-full w-full md:w-1/2">
        <img
          className="h-full w-full object-cover"
          src="https://firebasestorage.googleapis.com/v0/b/famto-aa73e.appspot.com/o/admin_panel_assets%2FLoginImage.svg?alt=media&token=c7452bf9-0b3a-4358-bef0-cd1bfa57e80f"
        />
      </figure>
      <div className=" flex justify-center h-full w-1/2 items-center ">
        <div className="min-w-screen bg-gray-100 h-auto w-[400px] rounded-2xl border-2 border-teal-700 p-10">
          <div className="text-center mt-5 ">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/famtowebsite.appspot.com/o/images%2FNew%20logo%20(25).svg?alt=media&token=2a2625e5-884d-4241-8bef-ac2c767389ba"
              alt="Logo"
              className="mx-auto flex h-20 w-20"
            />
            <h2 className="mt-8 text-[18px] font-medium text-black ">
              Verify Account
            </h2>
            <p className="text-zinc-500 mt-5 font-poppins">
              An OTP has been send to the number xxxxxxxx{signUp?.phoneNumber?.slice(-4)}{" "}
              Enter the OTP to verify your mobile number.
            </p>
          </div>
          <div className="max-w-md mx-auto  rounded"> 
            <form className="p-4 py-6">
              <div className="flex justify-center gap-4 mb-3 w-full">
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
                  <Button
                    className="text-teal-900"
                    onClick={() => resendOTP()}
                    disabled={otpTime > 0}
                  >
                    {isButtonDisabled ? "Sending..." : "Resend"}
                  </Button>
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
