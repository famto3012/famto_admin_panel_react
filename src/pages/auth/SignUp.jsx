import React, { useState } from "react";
import { Link } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined } from "@ant-design/icons";

const Signup = () => {
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
  });

  const [showpassword, setShowPassword] = useState(true);
  const showPasswordVisibility = () => {
    setShowPassword(!showpassword);
  };
  const [showconfirmpassword, setShowConfirmPassword] = useState(false);
  const showConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showconfirmpassword);
  };

  const handleInputChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const signupAction = async (e) => {
    e.preventDefault();
    console.log(signUpData);
  };

  return (
    <section className=" flex justify-center w-full h-screen font-poppins">
      <div className="relative h-full w-full md:w-1/2">
        <img className="h-full w-full object-cover" src="LoginImage.svg" />
        <div className="absolute inset-0 bg-black opacity-40 md:relative"></div>
      </div>
      <img
        className=" mt-[100px] absolute md:hidden"
        src="famto-white-logo.svg"
      />
      <div className="absolute h-full w-full md:w-1/2 flex items-end md:justify-center md:items-center md:relative">
        <div className="min-w-sm md:border-2  border-teal-700 p-2 md:p-10 md:rounded-xl rounded-tl-[100px] bg-white w-full md:max-w-md">
          <img
            className="hidden md:flex mx-auto mb-4"
            src="famto-black-logo.svg"
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
                  name="name"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <input
                  className="input1"
                  type="email"
                  placeholder="Email"
                  value={signUpData.email}
                  id="email"
                  name="email"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <input
                  className="input1"
                  type="tel"
                  placeholder="Phone Number"
                  value={signUpData.phone}
                  id="phone"
                  name="phone"
                  onChange={handleInputChange}
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
                  value={signUpData.confirmpassword}
                  id="confirmpassword"
                  name="confirmpassword"
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
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="flex justify-center m-5 text-gray-500">
            <p>
              Already have an Account ?
              <Link to="/" className="text-teal-700 ">
                {" "}
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
