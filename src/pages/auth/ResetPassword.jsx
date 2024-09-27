import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const ResetPassword = () => {
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Now you can get the query parameters
  const resetToken = queryParams.get("resetToken");
  const role = queryParams.get("role");
  const toast = useToast();

  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitAction = () => {
    const { password, confirmPassword } = passwords;

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Password doesn't match",
        status: "error",
        duration: 3000,
        isClosable: "true",
      });
      return;
    }

    try {
      const response = axios.post(
        `${BASE_URL}/auth/reset-password`,
        { password },
        {
          params: { resetToken, role },
        }
      );

      if (response.status === 200) {
        navigate("/auth/login");
        toast({
          title: "Success",
          description: "Password Changed Succesfully.",
          duration: 3000,
          isClosable: true,
          status: "success",
        });
      } else {
        toast({
          title: "Error",
          description: "Error in reset password",
          status: "error",
          isClosable: true,
          duration: 3000,
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An error occoured while resetting the password",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
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
              Reset Password
            </h2>
            <p className="text-zinc-500 mt-5 font-poppins">
              Enter your new password
            </p>
          </div>
          <div className="max-w-md mx-auto  rounded">
            <form className="p-4 py-6">
              <div className="grid gap-6 mb-8">
                <input
                  type="password"
                  name="password"
                  value={passwords.password}
                  onChange={handleInputChange}
                  placeholder="Enter new Password"
                  className="border border-gray-300 bg-slate-200 outline-none focus:outline-none rounded-xl p-3"
                />
                <input
                  type="password"
                  value={passwords.confirmPassword}
                  name="confirmPassword"
                  onChange={handleInputChange}
                  placeholder="Confirm new Password"
                  className="border border-gray-300 bg-slate-200 outline-none focus:outline-none rounded-xl p-3"
                />
              </div>
              <div className="flex flex-col items-center justify-center">
                <button
                  className="bg-teal-700 hover:bg-teal-900 rounded-2xl text-white font-bold p-3 mb-12 w-full focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={submitAction}
                >
                  Reset Password
                </button>
              </div>
            </form>
            <div id="recaptcha"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
