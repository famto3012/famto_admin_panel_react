import React, { useContext, useEffect, useState } from "react";
import { CheckCircleOutlined } from "@ant-design/icons";
import { UserContext } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const Success = () => {
  const navigate = useNavigate();
  const {signUp } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleSubmit();
  }, []);


  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${BASE_URL}/auth/sign-in`, signUp);

      if (response.status === 201) {
        console.log(response.data);
        console.log("Finished setting");
        navigate("/auth/sign-in");
      }
    } catch (err) {
      console.log("Error in login: ", err);
      if (err.response && err.response.data && err.response.data.errors) {
        const { errors } = err.response.data
        console.log(errors);
      }
    } finally {
      setIsLoading(false);
    }
  };

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

          <Link
            className="bg-teal-700 p-2 rounded-xl text-white mt-7 mb-16 w-full"
            type="submit"
            to={"/auth/sign-in"}
          >
           {isLoading ? "Loading..." : "Sign in"}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Success;
