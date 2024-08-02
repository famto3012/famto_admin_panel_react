import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { BellOutlined, SearchOutlined } from "@ant-design/icons";
import { Switch } from "antd";
import GlobalSearch from "../../../components/GlobalSearch";
import { UserContext } from "../../../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const UpdateManager = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { managerId } = useParams();
  const [geofence, setGeofence] = useState([]);
  const { token, role } = useContext(UserContext);
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const navigate = useNavigate();
  const toast = useToast();
  const [managerData, setManagerData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    domain: "",
    merchants: "",
    geofenceId: "",
    viewCustomers: null,
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    domain: "",
    merchants: "",
    geofenceId: "",
    viewCustomers: null,
  });
  useEffect(() => {
    console.log(managerId);
    if (!token) {
      navigate("/auth/login");
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [addResponse, geofenceResponse] = await Promise.all([
          axios.get(`${BASE_URL}/admin/managers/${managerId}`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BASE_URL}/admin/geofence/get-geofence`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (geofenceResponse.status === 200) {
          setGeofence(geofenceResponse.data.geofences);
        }
        if (addResponse.status === 200) {
          // const { data } = agentResponse.data;
          console.log("data in response is", addResponse.data.data);
          setManagerData(addResponse.data.data);
          console.log(addResponse.data.message);
        }
      } catch (err) {
        console.error(`Error in fetching data: ${err}`);
      } finally {
        setIsLoading(false);
        // console.log("data in state", agent);
      }
    };

    fetchData();
    // console.log("data in state", managerData);
  }, [token, role, navigate, managerId, BASE_URL]);

  const inputChange = (e) => {
    setManagerData({ ...managerData, [e.target.name]: e.target.value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("managerData", managerData);
      const editResponse = await axios.put(
        `${BASE_URL}/admin/managers/edit-manager/${managerId}`,
        managerData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (editResponse.status === 200) {
        console.log("edit data", editResponse.data.message);
        toast({
          title: "Manager Updated",
          description: "Manager updated successfully.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });

        navigate("/all-managers");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        const { errors } = err.response.data;

        // If errors is an object
        setErrors({
          name: errors.name || "",
          email: errors.email || "",
          phoneNumber: errors.phoneNumber || "",
          password: errors.password || "",
          domain: errors.domain || "",
          merchants: errors.merchants || "",
          geofenceId: errors.geofenceId || "",
          viewCustomers: errors.viewCustomers || "",
        });

        console.log(errors);
      }
    }
    console.log(managerData);
  };
  const onChange = (name, checked) => {
    setManagerData({ ...managerData, [name]: checked });
  };

  return (
    <>
      <Sidebar />

      <div className="w-full h-screen pl-[300px] bg-gray-100">
        <nav className="p-5">
          <GlobalSearch />
        </nav>
        <div>
          <h1 className="text-xl font-semibold mt-7 mx-11">Update Manager</h1>
        </div>

        <div className="bg-white p-10 rounded-lg mx-11 mt-7">
          <form onSubmit={formSubmit}>
            <div className="flex flex-col gap-4">
              <div className="flex items-center">
                <label className="w-1/3 text-gray-500" htmlFor="name">
                  Name
                </label>
                <div className="flex flex-col w-2/3">
                  <input
                    className="border-2 border-gray-300 rounded p-2 w-[45%] outline-none focus:outline-none"
                    type="text"
                    placeholder="Name"
                    value={managerData.name}
                    id="name"
                    name="name"
                    onChange={inputChange}
                  />
                  {errors.name && (
                    <small className="text-red-500 text-start">
                      {errors.name}
                    </small>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <label className="w-1/3 text-gray-500" htmlFor="email">
                  Email
                </label>
                <div className="flex flex-col w-2/3">
                  <input
                    className="border-2 border-gray-300 rounded p-2 w-[45%] outline-none focus:outline-none"
                    type="email"
                    placeholder="Email"
                    value={managerData.email}
                    id="email"
                    name="email"
                    onChange={inputChange}
                  />
                  {errors.email && (
                    <small className="text-red-500 text-start">
                      {errors.email}
                    </small>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <label className="w-1/3 text-gray-500" htmlFor="phoneNumber">
                  Phone
                </label>
                <div className="flex flex-col w-2/3">
                  <input
                    className="border-2 border-gray-300 rounded p-2 w-[45%] outline-none focus:outline-none"
                    type="tel"
                    placeholder="PhoneNumber"
                    value={managerData.phoneNumber}
                    id="phoneNumber"
                    name="phoneNumber"
                    onChange={inputChange}
                  />
                  {errors.phoneNumber && (
                    <small className="text-red-500 text-start">
                      {errors.phoneNumber}
                    </small>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <label className="w-1/3 text-gray-500" htmlFor="password">
                  Password
                </label>
                <div className="flex flex-col w-2/3">
                  <input
                    className="border-2 border-gray-300 rounded p-2 w-[45%] outline-none focus:outline-none"
                    type="password"
                    placeholder="Password"
                    value={managerData.password}
                    id="password"
                    name="password"
                    onChange={inputChange}
                  />
                  {errors.password && (
                    <small className="text-red-500 text-start">
                      {errors.password}
                    </small>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <label className="w-1/3 text-gray-500" htmlFor="domain">
                  Assign Role
                </label>
                <div className="flex flex-col w-2/3">
                  <select
                    name="domain"
                    value={managerData.domain}
                    className="border-2 border-gray-300 rounded p-2 w-[45%] outline-none focus:outline-none"
                    onChange={inputChange}
                  >
                    <option hidden value="">
                      {managerData.domain}
                    </option>
                    <option value="Order">Order</option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                  {errors.domain && (
                    <small className="text-red-500 text-start">
                      {errors.domain}
                    </small>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <label className="w-1/3 text-gray-500" htmlFor="merchants">
                  Assign Merchant
                </label>
                <div className="flex flex-col w-2/3">
                  <select
                    name="merchants"
                    value={managerData.merchants}
                    className="border-2 border-gray-300 rounded p-2 w-[45%] outline-none focus:outline-none"
                    onChange={inputChange}
                  >
                    <option hidden value="">
                      {managerData.merchants}
                    </option>
                    <option value="Merchant1">Merchant1</option>
                    <option value="Merchant2">Merchant2</option>
                  </select>
                  {errors.merchants && (
                    <small className="text-red-500 text-start">
                      {errors.merchants}
                    </small>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <label className="w-1/3 text-gray-500" htmlFor="geofenceId">
                  Geofence
                </label>
                <div className="flex flex-col w-2/3">
                  <select
                    name="geofenceId"
                    value={managerData.geofenceId._id}
                    className="border-2 border-gray-300 rounded p-2 w-[45%] outline-none focus:outline-none"
                    onChange={inputChange}
                  >
                    {geofence.map((geofence) => (
                      <option key={geofence._id} value={geofence._id}>
                        {geofence.name}
                      </option>
                    ))}
                  </select>
                  {/* {errors.geofenceId && (
                 <small className="text-red-500 text-start">
                  {errors.geofenceId}
                </small>
              )} */}
                </div>
              </div>

              <div className="flex items-center mt-2">
                <label className="w-1/3 text-gray-500" htmlFor="viewCustomers">
                  View All Customers
                </label>
                <div>
                  <Switch
                    onChange={(checked) => onChange("viewCustomers", checked)}
                    name="viewCustomers"
                    checked={managerData.viewCustomers}
                    className="flex flex-col"
                  />
                  {errors.viewCustomers && (
                    <small className="text-red-500 text-start">
                      {errors.viewCustomers}
                    </small>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  className="bg-cyan-50 py-2 px-8 rounded-md"
                  type="button"
                  onClick={() => navigate("/all-managers")}
                >
                  Cancel
                </button>
                <button
                  className="bg-teal-700 text-white py-2 px-10 rounded-md"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateManager;
