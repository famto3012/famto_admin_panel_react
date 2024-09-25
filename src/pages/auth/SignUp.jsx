import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined } from "@ant-design/icons";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase";
import { useToast } from "@chakra-ui/react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { UserContext } from "../../context/UserContext";

const Signup = () => {
  const [signUpData, setSignUpData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [showpassword, setShowPassword] = useState(true);
  const [showconfirmpassword, setShowConfirmPassword] = useState(false);
  const [recaptcha, setRecaptcha] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(true);
  const { setSignUp, setVerification } = useContext(UserContext);
  const toast = useToast();
  const navigate = useNavigate();

  const showConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showconfirmpassword);
  };
  const showPasswordVisibility = () => {
    setShowPassword(!showpassword);
  };

  const handleInputChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handlePhoneInputChange = (e) => {
    setSignUpData({ ...signUpData, phoneNumber: `+${e}` });
  };

  const signupAction = async (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    let recaptchaVerifier;
    recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
      size: "invisible",
      callback: (response) => {
        // reCAPTCHA solved, allow user to send OTP
      },
    });
    setRecaptcha(recaptchaVerifier);
  }, []);

  const sendOTP = async () => {
    if (signUpData.phoneNumber == "") {
      toast({
        title: "Please enter a number",
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
      console.log(auth)
      const confirmation = await signInWithPhoneNumber(
        auth,
        signUpData.phoneNumber,
        recaptcha
      );

      setSignUp(signUpData);
      setVerification(confirmation);
      toast({
        title: "OTP send successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setShowCaptcha(false);
      navigate("/auth/verify");
    } catch (error) {
      switch (error.code) {
        case "auth/too-many-requests":
          toast({
            title: "Too many requests",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          break;
        case "auth/invalid-phone-number":
          toast({
            title: "Phone number is invalid",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          break;
        default:
          toast({
            title: "Something went wrong, Please try again later",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
          break;
      }
    } finally {
      setIsButtonDisabled(false);
    }
  };

  return (
    <section className=" flex justify-center w-full h-screen font-poppins">
      <div className="relative h-full w-full md:w-1/2">
        <img
          className="h-full w-full object-cover"
          src="https://firebasestorage.googleapis.com/v0/b/famto-aa73e.appspot.com/o/admin_panel_assets%2FLoginImage.svg?alt=media&token=c7452bf9-0b3a-4358-bef0-cd1bfa57e80f"
        />
        <div className="absolute inset-0 bg-black opacity-40 md:relative"></div>
      </div>
      <div className="absolute h-full w-full md:w-1/2 flex items-end md:justify-center md:items-center md:relative">
        <div className="min-w-sm md:border-2  border-teal-700 p-2 md:p-10 md:rounded-xl rounded-tl-[100px] bg-white w-full md:max-w-md">
          <img
            className="hidden md:flex mx-auto mb-4"
            src="https://firebasestorage.googleapis.com/v0/b/famto-aa73e.appspot.com/o/admin_panel_assets%2Ffamto-black-logo.svg?alt=media&token=75721109-473f-4428-8a39-3a1181454297"
          />
          <h1 className="text-teal-700 md:text-[20px] mb-6 text-center md:text-black ">
            Sign Up
          </h1>

          <form onSubmit={signupAction}>
            <div className="flex flex-col gap-1 px-[20px]">
              <div>
                <input
                  className="input1"
                  type="name"
                  placeholder="Full Name of owner"
                  value={signUpData.name}
                  id="name"
                  name="fullName"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <input
                  className="input1 mb-2"
                  type="email"
                  placeholder="Email"
                  value={signUpData.email}
                  id="email"
                  name="email"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                {/* <input
                  className="input1"
                  type="tel"
                  placeholder="Phone Number"
                  value={signUpData.phoneNumber}
                  id="phone"
                  name="phoneNumber"
                  onChange={handleInputChange}
                /> */}
                <PhoneInput
                  country={"in"}
                  value={signUpData.phoneNumber}
                  onChange={handlePhoneInputChange}
                  placeholder="+91 xxxxx-xxxxx"
                  className="mobile"
                  name="phoneNumber"
                />
              </div>

              <div className="relative inset-y-0 right-0 flex items-center justify-end">
                <input
                  className="input1"
                  type={showpassword ? "text" : "password"}
                  placeholder="Password"
                  value={signUpData.password}
                  id="password"
                  name="password"
                  onChange={handleInputChange}
                />
                <button className="absolute" onClick={showPasswordVisibility}>
                  {showpassword ? (
                    <EyeOutlined className="icon" />
                  ) : (
                    <EyeInvisibleOutlined className="icon" />
                  )}
                </button>
              </div>

              <div className="relative inset-y-0 right-0 flex items-center justify-end">
                <input
                  className="input1"
                  type={showconfirmpassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={signUpData.confirmPassword}
                  id="confirmpassword"
                  name="confirmPassword"
                  onChange={handleInputChange}
                />
                <button
                  className="absolute"
                  onClick={showConfirmPasswordVisibility}
                >
                  {showconfirmpassword ? (
                    <EyeOutlined className="icon" />
                  ) : (
                    <EyeInvisibleOutlined className="icon" />
                  )}
                </button>
              </div>

              <button
                className="bg-teal-700 p-2 rounded-xl text-white mt-5 w-full"
                type="submit"
                onClick={() => sendOTP()}
              >
                {isButtonDisabled ? "Sending OTP..." : "Sign Up"}
              </button>
            </div>
          </form>
          <div className="flex justify-center m-5 text-gray-500">
            <p>
              Already have an Account ?
              <Link to="/auth/login" className="text-teal-700 ">
                {" "}
                Sign in
              </Link>
            </p>
          </div>
          {showCaptcha && <div id="recaptcha"></div>}
        </div>
      </div>
    </section>
  );
};

export default Signup;
