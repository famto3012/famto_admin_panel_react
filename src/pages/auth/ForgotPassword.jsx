import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const ForgotPassword = () => {

  const [signUpData, setSignUpData] = useState({
    email: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { token } = useContext(UserContext);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsButtonDisabled(true);
      const response = await axios.post(
        `${BASE_URL}/auth/forgot-password`,
        signUpData
      );

      if (response.status === 200) {
        toast({
          title: "Success",
          description: "A reset password link has been sent to your email.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log("Error in forgot password request: ", err);

      if (err.response) {
        
        toast({
          title: "Error",
          description:
            err.response.data.message || "An error occurred. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else if (err.request) {
        
        toast({
          title: "Error",
          description:
            "No response from the server. Please check your network connection.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
      
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const handleInputChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
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
        <div className="min-w-screen bg-gray-100 h-auto w-[400px] rounded-2xl border-2 border-teal-700 p-10 space-y-4 py-20">
          <div className="text-center mt-5 ">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/famto-aa73e.appspot.com/o/admin_panel_assets%2Ffamto-black-logo.svg?alt=media&token=75721109-473f-4428-8a39-3a1181454297"
              alt="Logo"
              className="mx-auto flex h-20 w-20"
            />
            <h2 className="mt-8 text-[18px] font-medium text-black ">
              Reset Password
            </h2>
            <p className="text-[#7F7F7F] mt-5 font-poppins text-[14px]">
              Enter your registered email for getting the reset password link
            </p>
          </div>
          <div className="max-w-md mx-auto rounded">
            <form className="p-4" onSubmit={handleSubmit}>
              <div>
                <input
                  className="border-b-2 border-gray-300 p-2 px-4 w-full min-w-full focus:outline-none text-[16px] rounded-md bg-[#D9D9D9] placeholder:text-[#818181]"
                  type="email"
                  placeholder="Email"
                  value={signUpData.email}
                  id="email"
                  name="email"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col items-center justify-center">
                <button
                  className="bg-teal-700 p-2 rounded-xl text-white mt-5 w-full"
                  type="submit"
                >
                  {isButtonDisabled ? "Sending..." : "Send Link"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
