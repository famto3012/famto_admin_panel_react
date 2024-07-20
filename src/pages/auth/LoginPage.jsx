import { useContext, useEffect, useState } from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import LoginImage from "/LoginImage.svg";
import famtoWhiteLogo from "/famto-white-logo.svg";
import famtoBlackLogo from "/famto-black-logo.svg";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import Loader from "../../components/Loader";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    role: "",
    general: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { token, setToken, setRole, setUserId } = useContext(UserContext);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await axios.post(`${BASE_URL}/auth/sign-in`, loginData);

      if (response.status === 200) {
        const { token, role, _id } = response.data;
        console.log(response.data)
        setToken(token);
        setRole(role);
        setUserId(_id);
        console.log("Finished setting");
        navigate("/home");
      }
    } catch (err) {
      console.log("Error in login: ", err);
      if (err.response && err.response.data && err.response.data.errors) {
        const { errors } = err.response.data;

        // If errors is an object
        setErrors({
          email: errors.email || "",
          password: errors.password || "",
          role: errors.role || "",
          general: errors.general || "",
        });

        console.log(errors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex w-screen font-poppins h-screen justify-center ">
      <figure className="h-full  w-full lg:w-1/2 md:w-1/2 lg:opacity-100  relative ">
        <img
          className="w-full min-w-full h-full object-cover fill-black"
          src={LoginImage}
        />
        <div className="inset-0 bg-black opacity-50 absolute md:relative"></div>
      </figure>

      <img
        className="flex justify-center mt-32 absolute md:hidden "
        src={famtoWhiteLogo}
        alt="White logo"
      />

      <div className="mim-w-screen flex justify-center h-full md:h-auto  lg:w-1/2 md:w-1/2 w-full  absolute lg:relative md:relative md:items-center    lg:items-center items-end ">
        <div className="min-w-screen bg-white w-full md:w-[450px]  lg:h-auto rounded-tl-[100px]  shadow-lg md:rounded-2xl lg:rounded-2xl md:border-2 md:border-teal-700 p-5 lg:p-14">
          <div className="text-center ">
            <img
              src={famtoBlackLogo}
              alt="Logo"
              className="mx-auto hidden lg:flex h-20 w-20"
            />
            <h2 className="mt-3 text-2xl font-poppins text-teal-700 md:text-black ">
              Login
            </h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 ">
              <label htmlFor="role" className="block font-medium text-gray-700">
                Login as
              </label>
              <select
                id="role"
                name="role"
                className={`mt-1 text-gray-500 p-2 w-full border rounded appearance-none outline-none focus:outline-none ${
                  errors.role && `input-error`
                }`}
                value={loginData.role}
                onChange={handleInputChange}
              >
                <option defaultValue={"Select role"} hidden>
                  Select role
                </option>
                <option value={"Admin"}>Admin</option>
                <option value={"Merchant"}>Merchant</option>
                <option value={"Manager"}>Manager</option>
              </select>
              {errors.role && (
                <small className="text-red-500 text-start">{errors.role}</small>
              )}
            </div>

            <div className="mb-3 ">
              <div className="mb-2 relative inset-y-0 left-0 flex items-center">
                <div className="absolute text-teal-700 ">
                  <PersonOutlineOutlinedIcon />
                </div>
                <input
                  className={`input ${errors.email && `input-error`}`}
                  id="username"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={loginData.email}
                  onChange={handleInputChange}
                />
              </div>
              {errors.email && (
                <small className="text-red-500 text-center">
                  {errors.email}
                </small>
              )}
            </div>

            <div className="mb-3">
              <div className="mb-2 relative inset-y-0 left-0 flex items-center">
                <div className="absolute text-teal-700">
                  <LockOutlinedIcon />
                </div>
                <input
                  className={`input ${errors.email && `input-error`}`}
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={handleInputChange}
                />
              </div>
              {errors.password && (
                <small className="text-red-500 text-start">
                  {errors.password}
                </small>
              )}
              {errors.general && (
                <small className="text-red-500 text-start">
                  {errors.general}
                </small>
              )}
            </div>

            <div className="flex items-center justify-end mb-4 text-teal-700">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
            <button
              type="submit"
              className="w-full py-2 lg:px-4  bg-teal-700 text-white rounded-xl hover:bg-teal-800"
            >
              {isLoading ? "" : `Sign in`}
            </button>
          </form>
          <div className="mt-3 text-center">
            <p>
              Don't have an account?
              <Link className="text-teal-700" to="/auth/sign-up">
                {" "}
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
