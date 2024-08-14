import { useContext, useEffect, useState } from "react";
import { CheckCircleOutlined } from "@ant-design/icons";
import { UserContext } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const Success = () => {
  const navigate = useNavigate();
  const { signUp } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${BASE_URL}/merchants/register`,
        signUp
      );

      if (response.status === 201) {
        console.log(response.data);
        console.log("Finished setting");
        toast({
          title: "Account registered successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/auth/login");
      }
    } catch (err) {
      console.log("Error in login: ", err);
      if (err.response && err.response.data && err.response.data.errors) {
        const { errors } = err.response.data;
        console.log(errors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className=" flex justify-center w-full h-screen font-poppins">
      <div className="w-1/2">
        <img
          className="h-full w-full object-cover"
          src="https://firebasestorage.googleapis.com/v0/b/famto-aa73e.appspot.com/o/admin_panel_assets%2FLoginImage.svg?alt=media&token=c7452bf9-0b3a-4358-bef0-cd1bfa57e80f"
        />
      </div>

      <div className="w-1/2 flex justify-center items-center">
        <div className="border-2 border-teal-700 p-10 rounded-xl bg-white w-[400px]">
          <img
            className="flex mx-auto m-8"
            src="https://firebasestorage.googleapis.com/v0/b/famto-aa73e.appspot.com/o/admin_panel_assets%2Ffamto-black-logo.svg?alt=media&token=75721109-473f-4428-8a39-3a1181454297"
          />
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
            className="bg-teal-700 p-2 rounded-xl text-white mt-7 mb-16 w-full text-center block"
            type="submit"
            to={"/auth/login"}
          >
            {isLoading ? "Loading..." : "Sign in"}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Success;
