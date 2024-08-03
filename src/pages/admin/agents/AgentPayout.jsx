import React, { useEffect, useState } from "react";
import SidebarDelivery from "../../../components/model/SidebarDelivery";
import GlobalSearch from "../../../components/GlobalSearch";
import { ArrowDownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { CheckCircleOutlined, FilterAltOutlined } from "@mui/icons-material";
import { Modal, Spin } from "antd";

const AgentPayout = () => {
  const [payout, setPayout] = useState([]);
  const [payment, setPayment] = useState("");
  const [agents, setAgents] = useState("");
  const [geofence, setGeofence] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModalApprove = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const payout = [
        {
          id: "A001",
          name: "Nandhu",
          phoneNumber: 8111861420,
          workedDate: "18/06/2025",
          orders: 5,
          cancelledOrders: 0,
          totalDistance: 7,
          loginHours: 9,
          cih: 10,
          totalEarnings: 700,
          status: "Approved",
        },
      ];

      setPayout(payout);
    };
    fetchData();
  }, []);

  return (
    <>
      <SidebarDelivery />
      <div className="w-full h-screen pl-[60px] bg-gray-100">
        <nav className="p-5">
          <GlobalSearch />
        </nav>
        <div className="flex items-center justify-between mx-8 mt-5">
          <h1 className="text-lg font-bold">Delivery Agents Payout</h1>
          <button className="bg-cyan-100 text-black rounded-md px-4 py-2 font-semibold flex items-center space-x-2">
            <ArrowDownOutlined /> <span>CSV</span>
          </button>
        </div>
        <div className="flex items-center bg-white p-5 mx-5 rounded-lg justify-between mt-[20px] px-[30px]">
          <div className="flex items-center gap-[20px]">
            <select
              className="bg-cyan-50 text-gray-900 text-sm rounded-lg focus:focus:outline-none outline-none block w-full p-2.5"
              name="payment"
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
            >
              <option defaultValue="" hidden>
                Payment Status
              </option>
              <option value="Cash">Cash</option>
              <option value="Credit">Credit</option>
            </select>
            <select
              className="bg-cyan-50 w-full text-gray-900 text-sm rounded-lg focus:focus:outline-none outline-none block p-2.5"
              name="agents"
              value={agents}
              onChange={(e) => setAgents(e.target.value)}
            >
              <option defaultValue={"Business category"} hidden>
                All agents
              </option>
              <option value="A001">A001</option>
              <option value="A002">A002</option>
              <option value="A003">A003</option>
            </select>
            <select
              className="bg-cyan-50  text-gray-900 text-sm rounded-lg focus:focus:outline-none outline-none block w-full p-2.5"
              name="geofence"
              value={geofence}
              onChange={(e) => setGeofence(e.target.value)}
            >
              <option defaultValue="" hidden>
                Geofence
              </option>
              <option value="Thiruvananthapuram">Thiruvananthapuram</option>
              <option value="Centralpark">Centralpark</option>
              <option value="Kazhakoottam">Kazhakoottam</option>
              <option value="Vetturod">Vetturod</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <input type="date" name="date" className="right-4" />
            </div>
            <div>
              <FilterAltOutlined className="text-gray-400" />
            </div>
            <div className="relative w-full">
              <div>
                <input
                  type="search"
                  className="bg-gray-100 relative p-2 px-4 w-64 rounded-2xl outline-none focus:outline-none cursor-pointer"
                  placeholder="Search agent name"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-auto mt-[20px] w-full">
          <table className=" w-full">
            <thead>
              <tr>
                {[
                  "Agent ID",
                  "Name",
                  "Phone",
                  "Worked Date",
                  "Orders",
                  "Cancelled orders",
                  "Total distance",
                  "Login Hours",
                  "CIH",
                  "Total Earnings",
                  "Status Approval",
                ].map((header, index) => (
                  <th
                    key={index}
                    className="bg-teal-800 text-center text-white py-[20px] px-5 border-r-2 border-[#eee]/50"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {payout.map((payout) => (
                <tr
                  key={payout.id}
                  className="align-middle border-b border-gray-300 text-center h-20"
                >
                  <td>
                    <Link
                      to={`/all-agents`}
                      className="underline underline-offset-4"
                    >
                      {payout.id}
                    </Link>
                  </td>
                  <td>{payout.name}</td>
                  <td>{payout.phoneNumber}</td>
                  <td>{payout.workedDate}</td>
                  <td>{payout.orders}</td>
                  <td>{payout.cancelledOrders}</td>
                  <td>{payout.totalDistance}</td>
                  <td>{payout.loginHours}</td>
                  <td>{payout.cih}</td>
                  <td>{payout.totalEarnings}</td>
                  <td>
                    <button onClick={() => showModalApprove()}>
                      <CheckCircleOutlined className="text-3xl cursor-pointer text-green-500" />
                      <Modal
                        onCancel={handleCancel}
                        footer={null}
                        open={isModalVisible}
                        centered
                      >
                        <p className="font-semibold text-[18px] mb-5">
                          Are you sure you want to Confirm?
                        </p>
                        <div className="flex justify-end">
                          <button className="bg-cyan-100 px-5 py-1 rounded-md font-semibold">
                            Cancel
                          </button>
                          <button className="bg-teal-800 px-5 py-1 rounded-md ml-3 text-white">
                            Confirm
                          </button>
                        </div>
                      </Modal>
                    </button>
                  </td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AgentPayout;
