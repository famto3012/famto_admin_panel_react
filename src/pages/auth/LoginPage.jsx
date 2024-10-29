import { useContext, useEffect, useState } from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility"; // Import visibility icon
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

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
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const { token, setToken, setRole, setUserId, setUsername } =
    useContext(UserContext);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

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
        const { token, role, _id, fullName } = response.data;

        setToken(token);
        setRole(role);
        setUserId(_id);
        setUsername(fullName);
        navigate("/home");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        const { errors } = err.response.data;

        // If errors is an object
        setErrors({
          email: errors.email || "",
          password: errors.password || "",
          role: errors.role || "",
          general: errors.general || "",
        });
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
          src="https://firebasestorage.googleapis.com/v0/b/famto-aa73e.appspot.com/o/admin_panel_assets%2FLoginImage.svg?alt=media&token=c7452bf9-0b3a-4358-bef0-cd1bfa57e80f"
        />
        <div className="inset-0 bg-black opacity-50 absolute md:relative"></div>
      </figure>

      <div className="mim-w-screen flex justify-center h-full md:h-auto  lg:w-1/2 md:w-1/2 w-full  absolute lg:relative md:relative md:items-center    lg:items-center items-end ">
        <div className="min-w-screen bg-white w-full md:w-[450px]  lg:h-auto rounded-tl-[100px]  shadow-lg md:rounded-2xl lg:rounded-2xl md:border-2 md:border-teal-700 p-5 lg:p-14">
          <div className="text-center ">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/famto-aa73e.appspot.com/o/admin_panel_assets%2FGroup%20427320755.svg?alt=media&token=02f2a096-b50a-4618-b9fb-a333f0c2aac0"
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
                  className={`input ${errors.password ? "input-error" : ""}`} // Add padding to prevent overlap with icon
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"} // Toggle between text and password
                  placeholder="Password"
                  value={loginData.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 text-teal-700" // Position the button on the right
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}{" "}
                  {/* Toggle icons */}
                </button>
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
              <Link to="/auth/forgot-password">Forgot Password?</Link>
            </div>
            <button
              type="submit"
              className="w-full py-2 lg:px-4  bg-teal-700 text-white rounded-xl hover:bg-teal-800"
            >
              {isLoading ? "Loading..." : `Sign in`}
            </button>
          </form>
          <div className="mt-3 text-center">
            <p>
              {"Don't have an account?"}
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
