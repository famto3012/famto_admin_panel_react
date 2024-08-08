import React, { useContext, useEffect } from "react";
import Sidebar from "../../../components/Sidebar";
import GlobalSearch from "../../../components/GlobalSearch";
import { ArrowLeftOutlined, EditOutlined } from "@ant-design/icons";
import { Modal, Switch } from "antd";
import { useState } from "react";
import { MdCameraAlt, MdOutlineEdit } from "react-icons/md";
import BlockIcon from "@mui/icons-material/Block";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import EditAgentModal from "../../../components/model/AgentModels/EditAgentModal";
import GIFLoader from "../../../components/GIFLoader";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const AgentDetails = () => {

  const { agentId } = useParams();
  const [reason, setReason] = useState("");
  const [averageRating, setRatings] = useState("");
  const [agent, setAgent] = useState({});
  const { token, role } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [isModalVisibleRatings, setIsModalVisibleRatings] = useState(false);
  const navigate = useNavigate();

  
  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [
          agentResponse,
        ] = await Promise.all([
          axios.get(`${BASE_URL}/admin/agents/${agentId}`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        if (agentResponse.status === 200) {
          // const { data } = agentResponse.data;
          console.log("data in response is", agentResponse.data.data);
          setAgent(agentResponse.data.data);
        }
      } catch (err) {
        console.error(`Error in fetching data: ${err}`);
      } finally {
        setIsLoading(false);
        // console.log("data in state", agent);
      }
    };

    fetchData();
    console.log("data in state", agent);
  }, [token, role, navigate, agentId]);

  
  const showEditModal = () => {
    setEditModalVisible(true);
  };

  const handleCancelEdit = () => {
    setEditModalVisible(false);
  };

  
  const showModalRatings = async () => {
    setIsModalVisibleRatings(true);
    try {
      // setIsConfirmLoading(true);
      const ratingResponse = await axios.get(
        `${BASE_URL}/admin/agents/${agentId}/get-ratings-by-customer`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (ratingResponse.status === 200) {
        setRatings(ratingResponse.data.data);
      } else {
        console.error(`Unexpected status code`, ratingResponse.data.message);
      }
    } catch (err) {
      console.log(`Error in fetching data`, err);
    } finally {
      // setIsConfirmLoading(false);
      console.log(`Error in fetching data`);
    }
  };

  const handleCancelRatings = () => {
    setIsModalVisibleRatings(false);
  };

  const [isModalVisibleBlock, setIsModalVisibleBlock] = useState(false);

  const ShowModalBlock = () => {
    setIsModalVisibleBlock(true);
  };

  const handleCancelBlock = () => {
    setIsModalVisibleBlock(false);
  };


  const submitBlock = (event) => {
    event.preventDefault();
    console.log(reason);
  };

  return (
    <div>
    {isLoading ? (
      <GIFLoader />
    ) : (

    <>
      <Sidebar />
      <div className="pl-[300px] bg-gray-100">
        <nav className="p-5">
          <GlobalSearch />
        </nav>
        <div className="flex justify-between my-[15px] m-5">
          <Link to="/all-agents" className="font-[600] text-[18px]">
            <ArrowLeftOutlined className="mr-4" />
            Agent ID
          </Link>
          <div className="flex items-center">
            <button
              className="bg-yellow-100 py-2 px-5 p-1 mr-5 rounded-xl flex items-center gap-3"
              onClick={ShowModalBlock}
            >
              <BlockIcon className="w-2 h-2 text-red-600" /> Block
            </button>
            <Modal
              title="Reason for Blocking"
              centered
              width="500px"
              open={isModalVisibleBlock}
              onCancel={handleCancelBlock}
              footer={null}
            >
              <div className="flex mt-5 gap-4">
                <label className="w-1/3 mt-2" htmlFor="reason">
                  reason
                </label>
                <input
                  className="border-2 border-gray-100 rounded p-2 w-full  focus:outline-none"
                  type="text"
                  value={reason}
                  id="reason"
                  name="reason"
                  onChange={(event) => setReason(event.target.value)}
                />
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  className="bg-cyan-50 py-2 px-4 rounded-md"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  className="bg-teal-700 text-white py-2 px-4 rounded-md focus:outline-none"
                  type="submit"
                  onClick={submitBlock}
                >
                  Confirm
                </button>
              </div>
            </Modal>
            Status
            <Switch className="text-teal-700 ml-2" />
          </div>
        </div>
        <div className="bg-white rounded-lg mx-5 mt-5 p-5">
          <div className="flex gap-10 justify-between">
            <div className="w-1/2 ">
              <div className="flex items-center">
                <label className="w-1/3">FullName</label>
                <p className="w-2/3">{agent.fullName}</p>
              </div>
              <div className="flex items-center mt-5">
                <label className="w-1/3">Email</label>
                <p className="w-2/3">{agent.email}</p>
              </div>
            </div>
            <div className=" w-1/2">
              <div className="flex items-center gap-2 ">
                <label className="w-2/3">Phone Number</label>
                <p className="">{agent.phoneNumber}</p>
              </div>
              <div className="flex items-center gap-3 mt-5">
                <label className="w-2/3">Registration Status</label>
                <p className="">{agent.status}</p>
              </div>
            </div>
            <div>
              <figure className="h-20 w-20">
                <img
                  className="w-full h-full object-contain"
                  src={agent.agentImageURL}
                />
              </figure>
            </div>

            <div>
              <button
                className="bg-gray-100 p-2 focus:outline-none rounded-lg flex items-center"
                onClick={showEditModal}
              >
                <MdOutlineEdit className="mr-4 text-[18px]" />
                Edit
              </button>
              <EditAgentModal
                isVisible={editModalVisible}
                handleCancel={handleCancelEdit}
              />
            </div>
          </div>
          <div className="mb-[20px] w-[600px] flex items-center justify-between mt-9 gap-[30px]">
            <label className="text-gray-700 ml-10 font-semibold text-[18px]">
              Ratings
            </label>
            <button
              type="button"
              onClick={showModalRatings}
              className="bg-teal-700 text-white p-2 rounded-md w-[20rem]"
            >
              Show ratings and reviews
            </button>
           

            <Modal
              title="Ratings"
              centered
              width="600px"
              open={isModalVisibleRatings}
              onCancel={handleCancelRatings}
              className="w-[600px]"
              footer={null}
              // confirmLoading={isConfirmLoading}
            >
              <div className="overflow-auto max-h-[30rem]">
                <table className="min-w-full border-collapse block md:table text-center rounded-lg mt-4">
                  <thead className="block md:table-header-group sticky top-0">
                    <tr className="border border-gray-300 md:border-none md:table-row">
                      <th className="p-2 px-5 border-r-2 bg-teal-700 font-normal text-white">
                        ID
                      </th>
                      <th className="p-2 px-8 border-r-2 bg-teal-700 font-normal text-white">
                        Name
                      </th>
                      <th className="px-6 border-r-2 bg-teal-700 font-normal text-white text-left">
                        Ratings and Review
                      </th>
                    </tr>
                  </thead>
                  <tbody className="block md:table-row-group">
                    {averageRating.length === 0 ? (
                      <tr>
                        <td colSpan={3}>
                          <p className="mb-0 text-center">No data Available</p>
                        </td>
                      </tr>
                    ) : (
                      averageRating.map((rating) => (
                        <tr
                          key={rating.id}
                          className="bg-gray-100 border border-gray-300 md:border-none md:table-row mb-2 md:mb-0"
                        >
                          <td className="p-2 text-center md:table-cell">
                            {rating.customerId.id}
                          </td>
                          <td className="p-2 text-center md:table-cell">
                            {rating.customerId.fullName}
                          </td>
                          <td className="px-6 py-4 text-left md:table-cell">
                            <div className="flex items-center text-center">
                              {Array.from({ length: rating.rating }).map(
                                (_, i) => (
                                  <svg
                                    key={i}
                                    className="w-5 h-5 text-yellow-500 text-center"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M9.049.467a1.003 1.003 0 011.902 0l1.454 4.553h4.769a1 1 0 01.593 1.807l-3.855 2.8 1.453 4.553a1 1 0 01-1.54 1.117L10 13.137l-3.855 2.8a1 1 0 01-1.54-1.117l1.453-4.553-3.855-2.8a1 1 0 01.593-1.807h4.77L9.05.467z"></path>
                                  </svg>
                                )
                              )}
                            </div>
                            <p className="mt-2">{rating.review}</p>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </Modal>
          </div>
        </div>
        <h1 className="font-semibold text-[18px] ml-5 mt-10">
          Vehicle Details
        </h1>
        <div>
          <table className="w-full mt-5">
            <thead>
              <tr>
                {[
                  "License Plate",
                  "Vehicle Model",
                  "Type of Vehicle",
                  "RC front",
                  "Rc back",
                ].map((header) => (
                  <th
                    key={header}
                    className="bg-teal-800 text-white h-[70px] text-center"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {agent?.vehicleDetail?.map((vehicleDetails) => (
                <tr
                  key={vehicleDetails._id}
                  className="align-middle border-b-2 border-gray-300 text-center"
                >
                  <td className="p-3">{vehicleDetails.licensePlate}</td>
                  <td className="p-3">{vehicleDetails.model}</td>
                  <td className="p-3">{vehicleDetails.type}</td>
                  <td className="p-3 flex items-center justify-center">
                    <figure className="h-24 w-24">
                      <img
                        className="w-full h-full object-contain"
                        src={vehicleDetails.rcFrontImageURL}
                      />
                    </figure>
                  </td>
                  <td className="p-3">
                    <figure className="h-24 w-24">
                      <img
                        className="w-full h-full object-contain "
                        src={vehicleDetails.rcBackImageURL}
                      />
                    </figure>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h1 className="font-semibold text-[18px] ml-5 mt-10">
          Goverment Certificates
        </h1>
        <div>
          <table className="w-full mt-5">
            <thead>
              <tr>
                {[
                  "Aadhar Number",
                  "front side",
                  "back side",
                  "Driving License Number",
                  "front side",
                  "back side",
                ].map((header) => (
                  <th
                    key={header}
                    className="bg-teal-800 text-white h-[70px] text-center"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="align-middle border-b-2 border-gray-300 text-center">
                <td className="p-3">
                  {agent?.governmentCertificateDetail?.aadharNumber}
                </td>
                <td className="p-3">
                  <figure className="h-24 w-24">
                    <img
                      className="w-full h-full object-contain"
                      src={
                        agent?.governmentCertificateDetail?.aadharFrontImageURL
                      }
                    />
                  </figure>
                </td>
                <td className="p-3">
                  <figure className="h-24 w-24">
                    <img
                      className="w-full h-full object-contain"
                      src={
                        agent?.governmentCertificateDetail?.aadharFrontImageURL
                      }
                    />
                  </figure>
                </td>
                <td className="p-3">
                  {agent?.governmentCertificateDetail?.drivingLicenseNumber}
                </td>
                <td className="p-3">
                  <figure className="h-24 w-24">
                    <img
                      className="w-full h-full object-contain"
                      src={
                        agent?.governmentCertificateDetail
                          ?.drivingLicenseFrontImageURL
                      }
                    />
                  </figure>
                </td>
                <td className="p-3">
                  <figure className="h-24 w-24">
                    <img
                      className="w-full h-full object-contain"
                      src={
                        agent?.governmentCertificateDetail
                          ?.drivingLicenseFrontImageURL
                      }
                    />
                  </figure>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h1 className="font-semibold text-[18px] ml-5 mt-10">Bank Details</h1>
        <div>
          <table className="w-full mt-5">
            <thead>
              <tr>
                {[
                  "Account Holder Name",
                  "Account Number",
                  "IFSC code",
                  "UPI ID",
                ].map((header) => (
                  <th
                    key={header}
                    className="bg-teal-800 text-white h-[70px] text-center"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="align-middle border-b-2 border-gray-300 text-center">
                <td className="p-3">{agent?.bankDetail?.accountHolderName}</td>
                <td className="p-3">{agent?.bankDetail?.accountNumber}</td>
                <td className="p-3">{agent?.bankDetail?.IFSCCode}</td>
                <td className="p-3">{agent?.bankDetail?.UPIId}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h1 className="font-semibold text-[18px] ml-5 mt-10">Work Structure</h1>
        <div className="mb-24">
          <table className="w-full mt-5">
            <thead>
              <tr>
                {["Manager", "Geofence", "Salary Structure", "Tags"].map(
                  (header) => (
                    <th
                      key={header}
                      className="bg-teal-800 text-white h-[70px] text-center"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              <tr className="align-middle border-b-2 border-gray-300 text-center">
                <td className="p-3">{agent?.workStructure?.managerId?.name}</td>
                <td className="p-3">{agent?.geofenceId?.name}</td>
                <td className="p-3">
                  {agent?.workStructure?.salaryStructureId?.ruleName}
                </td>
                <td className="p-3">{agent?.workStructure?.tag}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
    )}
    </div>
  );
};

export default AgentDetails;
