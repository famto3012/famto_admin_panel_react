import React, { useContext, useEffect, useState } from "react";
import {
  SearchOutlined,
  BellOutlined,
  PlusOutlined,
  ArrowDownOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Switch } from "antd";
import Sidebar from "../../../components/Sidebar";
import GlobalSearch from "../../../components/GlobalSearch";
import { UserContext } from "../../../context/UserContext";
import GIFLoader from "../../../components/GIFLoader";
import axios from "axios";
import { CSVLink } from "react-csv";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const Merchant = () => {
  const [merchant, setMerchant] = useState([]);
  const [geofence, setGeofence] = useState([]);
  const [business, setBusiness] = useState([]);
  const [service, setService] = useState("");
  const [geofenceFilter, setGeofenceFilter] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [businessFilter, setBusinessFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { token, role } = useContext(UserContext);
  const navigate = useNavigate();

  const handleToggle = (id) => {
    setMerchant((prevMerchant) =>
      prevMerchant.map((merchant) =>
        merchant.id === id
          ? { ...merchant, status: !merchant.status }
          : merchant
      )
    );
  };

  const handleApprove = (id) => {
    setMerchant((prevMerchants) =>
      prevMerchants.map((merchant) =>
        merchant.id === id
          ? { ...merchant, registrationApproval: "approved" }
          : merchant
      )
    );
  };

  const handleReject = (id) => {
    setMerchant((prevMerchants) =>
      prevMerchants.map((merchant) =>
        merchant.id === id
          ? { ...merchant, registrationApproval: "rejected" }
          : merchant
      )
    );
  };

  useEffect(() => {
    if (!token || role !== "Admin") {
      navigate("/auth/login");
      return;
    }

    const fetchMerchant = async () => {
      try {
        setIsLoading(true);

        const [merchantResponse, geofenceResponse, businessCategoryResponse] =
          await Promise.all([
            axios.get(`${BASE_URL}/merchants/admin/all-merchants`, {
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${BASE_URL}/admin/geofence/get-geofence`, {
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(
              `${BASE_URL}/admin/business-categories/get-all-business-category`,
              {
                withCredentials: true,
                headers: { Authorization: `Bearer ${token}` },
              }
            ),
          ]);
        if (merchantResponse.status === 200) 
          {
          setMerchant(merchantResponse.data.data);
        }
        if (geofenceResponse.status === 200) {
          setGeofence(geofenceResponse.data.geofences);
        }
        if (businessCategoryResponse.status === 200) {
          setBusiness(businessCategoryResponse.data.data);
        }
      } catch (err) {
        console.error(`Error in fetching data: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMerchant();
  }, [token, role, navigate]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [addData, setAddData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
  });

  const handleInputChange = (e) => {
    setAddData({ ...addData, [e.target.name]: e.target.value });
  };
  const signupAction = (e) => {
    e.preventDefault();

    console.log(addData);
  };

  const onServiceChange = (e) => {
    const selectedService = e.target.value;
    setService(selectedService);
    if (selectedService !== "") {
      handleServiceFilter(selectedService);
    } else {
      setMerchant([]);
    }
  };

  const handleServiceFilter = async (selectedService) => {
    try {
      console.log(token);
      const serviceResponse = await axios.get(
        `${BASE_URL}/merchants/admin/filter`,
        {
          params: { serviceable: selectedService },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (serviceResponse.status === 200) {
        setMerchant(serviceResponse.data.data);
      }
    } catch (err) {
      console.log(`Error in fetching merchant`, err);
    }
  };

  const onGeofenceChange = (e) => {
    const selectedService = e.target.value;
    setGeofenceFilter(selectedService);
    if (selectedService !== "") {
      handleGeofenceFilter(selectedService);
    } else {
      setMerchant([]);
    }
  };

  const handleGeofenceFilter = async (selectedService) => {
    try {
      console.log(token);
      const serviceResponse = await axios.get(
        `${BASE_URL}/merchants/admin/filter`,
        {
          params: { geofence: selectedService },
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (serviceResponse.status === 200) {
        setMerchant(serviceResponse.data.data);
      }
    } catch (err) {
      console.log(`Error in fetching merchant`, err);
    }
  };

  const onBusinessCategoryChange = (e) => {
    const businessService = e.target.value;
    setBusinessFilter(businessService);
    if (businessService !== "") {
      handleBusinessCategoryService(businessService);
    } else {
      setMerchant([]);
    }
  };

  const handleBusinessCategoryService = async (businessService) => {
    try {
      console.log(token);
      const businessResponse = await axios.get(
        `${BASE_URL}/merchants/admin/filter`,
        {
          params: { businessCategory: businessService },
          withcredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (businessResponse.status === 200) {
        setMerchant(businessResponse.data.data);
      }
     } catch (err) {
        console.log(`Error in fetching merchant`, err);
      }
    };

    const onSearchChange = (e) => {
      const searchService = e.target.value;
      setSearchFilter(searchService);
      if(searchService !== "") {
        handleSearchChangeFilter(searchService);
      }else {
        setMerchant([]);
      }
    };

    const handleSearchChangeFilter = async(searchService) => {
      try{
          console.log(token);
          const searchResponse = await axios.get(
            `${BASE_URL}/merchants/admin/search`,
            {
              params: {query : searchService},
              withCredentials: true,
              headers: {Authorization: `Bearer ${token}`}
            }
          );
          if(searchResponse.status === 200) {
            setMerchant(searchResponse.data.data);
          }
      }catch (err) {
        console.log(`Error in fetching merchant`, err);
      }
    };

    const csvData = [
      { label: 'Merchant ID', key: '_id' },
      { label: 'Merchant Name', key: 'merchantName' },
      { label: 'Phone Number', key: 'phoneNumber' },
      { label: 'Average Rating', key: 'averageRating' },
      { label: 'Approved', key: 'isApproved' },
      { label: 'Serviceable Today', key: 'isServiceableToday' },
      { label: 'Geofence', key: 'geofence' },
    ]

    return (
      <div>
        {isLoading ? (
          <GIFLoader />
        ) : (
          <>
            <Sidebar />
            <main className="pl-[300px] bg-gray-100 h-screen">
              <nav className="p-5">
                <GlobalSearch />
              </nav>

              <div className="flex justify-between items-center px-[30px]">
                <h1 className="text-[18px] font-semibold">Merchants</h1>
                <div className="flex space-x-2 justify-end ">
                  <button className="bg-cyan-100 text-black rounded-md px-4 py-2 font-semibold flex items-center space-x-2">
                    <CSVLink data={merchant} headers={csvData} filename={"merchantData.csv"}>
                    <ArrowDownOutlined /> <span>CSV</span>
                    </CSVLink>
                  </button>
                  <div>
                    <button
                      className="bg-teal-800 text-white rounded-md px-4 py-2 font-semibold  flex items-center space-x-1 "
                      onClick={showModal}
                    >
                      <PlusOutlined /> <span>Add Merchant</span>
                    </button>
                    <Modal
                      title="Add Merchant"
                      open={isModalVisible}
                      onOk={handleOk}
                      centered
                      width="600px"
                      onCancel={handleCancel}
                      footer={null}
                    >
                      <form onSubmit={signupAction}>
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center">
                            <label className="w-1/3 text-gray-500" htmlFor="name">
                              Full Name of owner
                            </label>
                            <input
                              className="border-2 border-gray-300 rounded p-2 w-2/3"
                              type="text"
                              value={addData.name}
                              id="name"
                              name="name"
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="flex items-center">
                            <label
                              className="w-1/3 text-gray-500"
                              htmlFor="email"
                            >
                              Email
                            </label>
                            <input
                              className="border-2 border-gray-300 rounded p-2 w-2/3"
                              type="email"
                              value={addData.email}
                              id="email"
                              name="email"
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="flex items-center">
                            <label
                              className="w-1/3 text-gray-500"
                              htmlFor="phone"
                            >
                              Phone Number
                            </label>
                            <input
                              className="border-2 border-gray-300 rounded p-2 w-2/3"
                              type="tel"
                              value={addData.phone}
                              id="phone"
                              name="phone"
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="flex items-center">
                            <label
                              className="w-1/3 text-gray-500"
                              htmlFor="password"
                            >
                              Password
                            </label>
                            <input
                              className="border-2 border-gray-300 rounded p-2 w-2/3"
                              type="password"
                              value={addData.password}
                              id="password"
                              name="password"
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="flex items-center">
                            <label
                              className="w-1/3 text-gray-500"
                              htmlFor="confirmpassword"
                            >
                              Confirm Password
                            </label>
                            <input
                              className="border-2 border-gray-300 rounded p-2 w-2/3"
                              type="password"
                              value={addData.confirmpassword}
                              id="confirmpassword"
                              name="confirmpassword"
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="flex justify-end gap-4 mt-6">
                            <button
                              className="bg-cyan-50 py-2 px-4 rounded-md"
                              type="button"
                              onClick={handleCancel}
                            >
                              Cancel
                            </button>
                            <button
                              className="bg-teal-800 text-white py-2 px-4 rounded-md"
                              type="submit"
                              onClick={handleOk}
                            >
                              Add Merchant
                            </button>
                          </div>
                        </div>
                      </form>
                    </Modal>
                  </div>
                </div>
              </div>

              <div className="flex items-center bg-white p-5 mx-5 rounded-lg justify-between mt-[20px] px-[30px]">
                <div className="flex items-center gap-[20px]">
                  <select
                    id="serviceable"
                    value={service}
                    onChange={onServiceChange}
                    className="bg-blue-50 text-gray-900 text-sm rounded-lg focus:focus:outline-none outline-none block w-full p-2.5"
                  >
                    <option selected hidden>
                      Serviceable
                    </option>
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                  </select>

                  <select
                    id="geofence"
                    value={geofenceFilter}
                    onChange={onGeofenceChange}
                    className="bg-blue-50  text-gray-900 text-sm rounded-lg focus:focus:outline-none outline-none block w-full p-2.5"
                  >
                    {geofence.map((geoFence) => (
                      <option value={geoFence._id} key={geoFence._id}>
                        {geoFence.name}
                      </option>
                    ))}
                  </select>

                  <select
                    value={businessFilter}
                    onChange={onBusinessCategoryChange}
                    className="bg-blue-50  w-full text-gray-900 text-sm rounded-lg focus:focus:outline-none outline-none block p-2.5"
                  >
                    {business.map((businessCategory) => (
                      <option key={businessCategory._id} value={businessCategory._id}>
                        {businessCategory.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-[30px]">
                  <div>
                    <FilterAltOutlinedIcon className="mt-2 text-gray-400   " />
                  </div>
                  <div className="relative w-full">
                    <div>
                      <input
                        type="search"
                        name="search"
                        value={searchFilter}
                        onChange={onSearchChange}
                        className="bg-gray-100 relative p-2 w-64 rounded-2xl outline-none focus:outline-none"
                        placeholder="Search merchant name"
                      />
                      <SearchOutlined className="absolute -ml-7 mt-3" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-auto mt-[20px] w-full">
                <table className="text-start w-full">
                  <thead>
                    <tr className="">
                      {[
                        "Merchant ID",
                        "Merchant Name",
                        "Phone",
                        "Rating",
                        "Subscription Status",
                        "Serviceable",
                        "Geofence",
                        "Status",
                        "Registration Approval",
                      ].map((header) => (
                        <th
                          key={header}
                          className="bg-teal-800 text-center text-white py-[20px] border-r-2 border-[#eee]/50"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {merchant.map((data) => (
                      <tr
                        key={data._id}
                        className="align-middle border-b border-gray-300"
                      >
                        <td className="p-4 underline underline-offset-4">
                          <Link to={`/merchant-detail/:merchantId${data._id}`}>
                            {data._id}
                          </Link>
                        </td>
                        <td className="p-4">{data.merchantName}</td>
                        <td className="p-4">{data.phoneNumber}</td>
                        <td className="p-4">{data.averageRating}</td>
                        <td className="p-4">{data.isApproved}</td>
                        <td className="p-4">{data.isServiceableToday}</td>
                        <td className="p-4">{data.geofence}</td>

                        <td className="p-4">
                          <Switch
                            checked={
                              data.isServiceableToday === "open" ? true : false
                            }
                            onChange={() => handleToggle(data._id)}
                          />
                        </td>
                        <td className="p-4">
                          <div className="flex space-x-2 justify-center">
                            <CheckCircleOutlined
                              className="text-2xl cursor-pointer text-green-500"
                              onClick={() => handleApprove(data._id)}
                            />
                            <CloseCircleOutlined
                              className="text-2xl cursor-pointer text-red-500"
                              onClick={() => handleReject(data._id)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </main>
          </>
        )}
      </div>
    );
  };

  export default Merchant;
