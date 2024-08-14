import React, { useContext, useEffect } from "react";
import Sidebar from "../../../components/Sidebar";
import GlobalSearch from "../../../components/GlobalSearch";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import BlockIcon from "@mui/icons-material/Block";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import EditAgentModal from "../../../components/model/AgentModels/EditAgentModal";
import GIFLoader from "../../../components/GIFLoader";
import ImageModal from "../../../components/model/AgentModels/ImageModal";
import BlockAgentModal from "../../../components/model/AgentModels/BlockAgentModal";
import AgentRatingModal from "../../../components/model/AgentModels/AgentRatingModal";
import { Switch } from "antd";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const AgentDetails = () => {
  const [agent, setAgent] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [imageModalUrl, setImageModalUrl] = useState("");

  const { agentId } = useParams();
  const navigate = useNavigate();
  const { token, role } = useContext(UserContext);

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/admin/agents/${agentId}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          setAgent(response.data.data);
        }
      } catch (err) {
        console.error(`Error in fetching data: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, role, navigate, agentId]);

  const toggleEditModal = () => setShowEditModal(true);
  const toggleRatingModal = () => setShowRatingModal(true);
  const toggleBlockModal = () => setShowBlockModal(true);

  const handleCancel = () => {
    setShowEditModal(false);
    setShowRatingModal(false);
    setShowBlockModal(false);
  };

  // Function to show image in modal
  const handleImageClick = (imageUrl) => {
    setImageModalUrl(imageUrl);
    setIsImageModalVisible(true);
  };

  const handleCloseImageModal = () => {
    setIsImageModalVisible(false);
    setImageModalUrl("");
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
                  onClick={toggleBlockModal}
                >
                  <BlockIcon className="w-2 h-2 text-red-600" /> Block
                </button>
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
                  <figure
                    className="h-20 w-20"
                    onClick={() => handleImageClick(agent.agentImageURL)}
                  >
                    <img
                      className="w-full h-full object-contain"
                      src={agent.agentImageURL}
                    />
                  </figure>
                </div>

                <div>
                  <button
                    className="bg-gray-100 p-2 focus:outline-none rounded-lg flex items-center"
                    onClick={toggleEditModal}
                  >
                    <MdOutlineEdit className="mr-4 text-[18px]" />
                    Edit
                  </button>
                  <EditAgentModal
                    isVisible={showEditModal}
                    onCancel={handleCancel}
                    data={agent}
                  />
                </div>
              </div>

              <div className="mb-[20px] w-[600px] flex items-center justify-between mt-9 gap-[30px]">
                <label className="text-gray-700 ml-10 font-semibold text-[18px]">
                  Ratings
                </label>
                <button
                  type="button"
                  onClick={toggleRatingModal}
                  className="bg-teal-700 text-white p-2 rounded-md w-[20rem]"
                >
                  Show ratings and reviews
                </button>
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
                        <figure
                          className="h-24 w-24"
                          onClick={() =>
                            handleImageClick(vehicleDetails.rcFrontImageURL)
                          }
                        >
                          <img
                            className="w-full h-full object-contain"
                            src={vehicleDetails.rcFrontImageURL}
                          />
                        </figure>
                      </td>
                      <td className="p-3">
                        <figure
                          className="h-24 w-24"
                          onClick={() =>
                            handleImageClick(vehicleDetails.rcBackImageURL)
                          }
                        >
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
                      "Aadhar Front Side",
                      "Aadhar Back Side",
                      "Driving License Number",
                      "License Front Side",
                      "License Back Side",
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
                      <figure
                        className="h-24 w-24"
                        onClick={() =>
                          handleImageClick(
                            agent?.governmentCertificateDetail
                              ?.aadharFrontImageURL
                          )
                        }
                      >
                        <img
                          className="w-full h-full object-contain"
                          src={
                            agent?.governmentCertificateDetail
                              ?.aadharFrontImageURL
                          }
                        />
                      </figure>
                    </td>
                    <td className="p-3">
                      <figure
                        className="h-24 w-24"
                        onClick={() =>
                          handleImageClick(
                            agent?.governmentCertificateDetail
                              ?.aadharBackImageURL
                          )
                        }
                      >
                        <img
                          className="w-full h-full object-contain"
                          src={
                            agent?.governmentCertificateDetail
                              ?.aadharBackImageURL
                          }
                        />
                      </figure>
                    </td>
                    <td className="p-3">
                      {agent?.governmentCertificateDetail?.drivingLicenseNumber}
                    </td>
                    <td className="p-3">
                      <figure
                        className="h-24 w-24"
                        onClick={() =>
                          handleImageClick(
                            agent?.governmentCertificateDetail
                              ?.drivingLicenseFrontImageURL
                          )
                        }
                      >
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
                      <figure
                        className="h-24 w-24"
                        onClick={() =>
                          handleImageClick(
                            agent?.governmentCertificateDetail
                              ?.drivingLicenseBackImageURL
                          )
                        }
                      >
                        <img
                          className="w-full h-full object-contain"
                          src={
                            agent?.governmentCertificateDetail
                              ?.drivingLicenseBackImageURL
                          }
                        />
                      </figure>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h1 className="font-semibold text-[18px] ml-5 mt-10">
              Bank Details
            </h1>
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
                    <td className="p-3">
                      {agent?.bankDetail?.accountHolderName}
                    </td>
                    <td className="p-3">{agent?.bankDetail?.accountNumber}</td>
                    <td className="p-3">{agent?.bankDetail?.IFSCCode}</td>
                    <td className="p-3">{agent?.bankDetail?.UPIId}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h1 className="font-semibold text-[18px] ml-5 mt-10">
              Work Structure
            </h1>
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
                    <td className="p-3">
                      {agent?.workStructure?.managerId?.name}
                    </td>
                    <td className="p-3">{agent?.geofenceId?.name}</td>
                    <td className="p-3">
                      {agent?.workStructure?.salaryStructureId?.ruleName}
                    </td>
                    <td className="p-3">{agent?.workStructure?.tag}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/*  */}
            <AgentRatingModal
              isVisible={showRatingModal}
              onCancel={handleCancel}
              BASE_URL={BASE_URL}
              token={token}
              agentId={agentId}
            />

            {/* Block Modal */}
            <BlockAgentModal
              isVisible={showBlockModal}
              onCancel={handleCancel}
              BASE_URL={BASE_URL}
              token={token}
            />

            {/* Image Modal */}
            <ImageModal
              isVisible={isImageModalVisible}
              handleClose={handleCloseImageModal}
              imageUrl={imageModalUrl}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AgentDetails;
