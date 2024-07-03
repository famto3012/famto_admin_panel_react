import React, { useEffect, useState } from "react";
import {
  SearchOutlined,
  BellOutlined,
  PlusOutlined,
  ArrowDownOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { Link } from "react-router-dom";
import { Modal, Switch } from "antd";
import Sidebar from "../../../components/Sidebar";

const Merchant = () => {
  const [merchant, setMerchant] = useState([]);

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
    const fetchMerchant = async () => {
      const dummyData = [
        {
          id: "01",
          name: "Merchant One",
          phone: "1234567890",
          rating: 4.5,
          subscriptionStatus: "Active",
          serviceable: "Yes",
          geofence: "geofence",
          status: "Approved",
          registrationApproval: "Pending",
        },
        {
          id: "02",
          name: "Merchant Two",
          phone: "0987654321",
          rating: 3.8,
          subscriptionStatus: "Inactive",
          serviceable: "No",
          geofence: "geofence",
          status: "Pending",
          registrationApproval: "Approved",
        },
      ];
      setMerchant(dummyData);
    };

    fetchMerchant();
  }, []);

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

  return (
    <>
      <Sidebar />
      <main className="pl-[300px]">
        <div className="flex items-center gap-[20px] justify-end py-[20px] pe-[30px]">
          <BellOutlined className="text-2xl text-gray-500" />
          <div className="relative">
            <input
              type="search"
              name="search"
              placeholder="Search"
              className="bg-gray-100 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
            />
            <button type="submit" className="absolute right-0 top-0 mt-2 mr-4">
              <SearchOutlined className="text-xl text-gray-600" />
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center px-[30px]">
          <h1 className="text-[18px] font-semibold">Merchants</h1>
          <div className="flex space-x-2 justify-end ">
            <button className="bg-cyan-100 text-black rounded-md px-4 py-2 font-semibold flex items-center space-x-2">
              <ArrowDownOutlined /> <span>CSV</span>
            </button>
            <div>
              <button
                className="bg-teal-700 text-white rounded-md px-4 py-2 font-semibold  flex items-center space-x-1 "
                onClick={showModal}
              >
                <PlusOutlined /> <span>Add Merchant</span>
              </button>
              <Modal
                title="Add Merchant"
                open={isModalVisible}
                onOk={handleOk}
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
                      <label className="w-1/3 text-gray-500" htmlFor="email">
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
                      <label className="w-1/3 text-gray-500" htmlFor="phone">
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
                      <label className="w-1/3 text-gray-500" htmlFor="password">
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
                        className="bg-teal-700 text-white py-2 px-4 rounded-md"
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

        <div className="flex items-center justify-between mt-[20px] px-[30px]">
          <div className="flex items-center gap-[20px]">
            <select
              id="serviceable"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option selected hidden>
                Serviceable
              </option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>

            <select
              id="eofence"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option selected hidden>
                Geofence
              </option>
              <option value="US">United States</option>
            </select>

            <select
              id="businessCategory"
              className="bg-gray-50 border border-gray-300 w-fit text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            >
              <option selected hidden>
                Business category
              </option>
              <option value="US">United States</option>
            </select>
          </div>

          <div className="flex items-center gap-[30px]">
            <div>
              <FilterAltOutlinedIcon className="mt-2 text-gray-400   " />
            </div>
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                class="bg-gray-50 border border-gray-300 outline-none focus:outline-none text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5  "
                placeholder="Search branch name..."
                required
              />
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
                    className="bg-teal-700 text-center text-white py-[20px] border-r-2 border-[#eee]/50"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {merchant.map((merchant) => (
                <tr
                  key={merchant.id}
                  className="align-middle border-b border-gray-300"
                >
                  <td className="p-4">
                    <Link to={`/merchant-detail/:merchantId${merchant.id}`}>
                      {merchant.id}
                    </Link>
                  </td>
                  <td className="p-4">{merchant.name}</td>
                  <td className="p-4">{merchant.phone}</td>
                  <td className="p-4">{merchant.rating}</td>
                  <td className="p-4">{merchant.subscriptionStatus}</td>
                  <td className="p-4">{merchant.serviceable}</td>
                  <td className="p-4">{merchant.geofence}</td>
                  <td className="p-4">
                    <Switch
                      checked={merchant.status}
                      onChange={() => handleToggle(merchant.id)}
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2 justify-center">
                      <CheckCircleOutlined
                        className="text-2xl cursor-pointer text-green-500"
                        onClick={() => handleApprove(merchant.id)}
                      />
                      <CloseCircleOutlined
                        className="text-2xl cursor-pointer text-red-500"
                        onClick={() => handleReject(merchant.id)}
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
  );
};

export default Merchant;
