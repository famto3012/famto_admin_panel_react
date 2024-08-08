import { Modal } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { MdCameraAlt } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const EditAgentModal = ({ isVisible, handleCancel }) => {
  const { agentId } = useParams();
  const [agent, setAgent] = useState({});
  const { token, role } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [geofence, setGeofence] = useState([]);
  const [salary, setSalary] = useState([]);
  const [manager, setManager] = useState([]);
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
          geofenceResponse,
          managerResponse,
          salaryResponse,
        ] = await Promise.all([
          axios.get(`${BASE_URL}/admin/agents/${agentId}`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BASE_URL}/admin/geofence/get-geofence`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BASE_URL}/admin/agent-pricing/get-all-agent-pricing`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BASE_URL}/admin/managers`, {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        if (salaryResponse.status === 200) {
          setSalary(salaryResponse.data.data);
          console.log("salary", salary);
        }
        if (managerResponse.status === 200) {
          setManager(managerResponse.data.data);
          console.log("managers", manager);
        }
        if (geofenceResponse.status === 200) {
          setGeofence(geofenceResponse.data.geofences);
        }
        if (agentResponse.status === 200) {
          // const { data } = agentResponse.data;
          console.log("data in response is", agentResponse.data.data);
          setAddData(agentResponse.data.data);
        }
      } catch (err) {
        console.error(`Error in fetching data: ${err}`);
      } finally {
        setIsLoading(false);
        // console.log("data in state", agent);
      }
    };

    fetchData();
    console.log("agent", agent);
  }, [token, role, navigate, agentId]);

  console.log("agent", agent);
  // console.log("agent data in modal", agent);
  const [addData, setAddData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    managerId: "",
    geofenceId: "",
    salaryStructureId: "",
    tag: "",
    accountHolderName: "",
    accountNumber: "",
    IFSCCode: "",
    UPIId: "",
    aadharNumber: "",
    model: "",
    type: "",
    licensePlate: "",
    drivingLicenseNumber: "",
    rcFrontImage: null,
    rcBackImage: null,
    aadharFrontImage: null,
    aadharBackImage: null,
    drivingLicenseFrontImage: null,
    drivingLicenseBackImage: null,
    agentImageURL: null,
  });

  console.log("da", addData);

  const handleInputChange = (e) => {
    setAddData({ ...addData, [e.target.name]: e.target.value });
  };

  const [agentFile, setAgentFile] = useState(null);
  const [agentPreviewURL, setAgentPreviewURL] = useState(null);

  const [driFrontFile, setDriFrontFile] = useState(null);
  const [driFrontPreviewURL, setDriFrontPreviewURL] = useState(null);

  const [driBackFile, setDriBackFile] = useState(null);
  const [driBackPreviewURL, setDriBackPreviewURL] = useState(null);

  const [aadharFrontFile, setAadharFrontFile] = useState(null);
  const [aadharFrontPreviewURL, setAadharFrontPreviewURL] = useState(null);

  const [aadharBackFile, setAadharBackFile] = useState(null);
  const [aadharBackPreviewURL, setAadharBackPreviewURL] = useState(null);

  const [rcFrontFile, setRcFrontFile] = useState(null);
  const [rcFrontPreviewURL, setRcFrontPreviewURL] = useState(null);
  const [rcBackFile, setRcBackFile] = useState(null);
  const [rcBackPreviewURL, setRcBackPreviewURL] = useState(null);

  // Generalized function to handle image changes

  const handleImageChange = (e, setFile, setPreviewURL) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const signupAction = async (e) => {
    e.preventDefault();
    try {
      console.log("addData", addData);

      setIsLoading(true);
      const dataToSend = new FormData();
      Object.keys(addData).forEach((key) => {
        if (Array.isArray(addData[key])) {
          addData[key].forEach((item) => {
            dataToSend.append(key, item);
          });
        } else {
          dataToSend.append(key, addData[key]);
        }
      });

      if (agentFile) {
        dataToSend.append("agentImageURL", agentFile);
      }
      if (rcFrontFile) {
        dataToSend.append("rcFrontImage", rcFrontFile);
      }
      if (rcBackFile) {
        dataToSend.append("rcBackImage", rcBackFile);
      }
      if (aadharFrontFile) {
        dataToSend.append("aadharFrontImage", aadharFrontFile);
      }
      if (aadharBackFile) {
        dataToSend.append("aadharBackImage", aadharBackFile);
      }
      if (driFrontFile) {
        dataToSend.append("drivingLicenseFrontImage", driFrontFile);
      }
      if (driBackFile) {
        dataToSend.append("drivingLicenseBackImage", driBackFile);
      }

      const addAgentResponse = await axios.put(
        `${BASE_URL}/admin/agents/edit-agent/${agentId}`,
        dataToSend,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (addAgentResponse.status === 200) {
        setAddData(addAgentResponse.data.data);
        setAadharBackPreviewURL(null);
        setAadharFrontPreviewURL(null);
        setAgentFile(null);
        setAgentPreviewURL(null);
        setDriBackPreviewURL(null);
        setDriFrontPreviewURL(null);
        setRcBackPreviewURL(null);
        setRcFrontPreviewURL(null);
        console.log(addAgentResponse.data.message);
        handleCancel();
      }
    } catch (err) {
      console.error(`Error in fetch datas : ${addAgentResponse.data.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("testing token", token);
  console.log("testing url", BASE_URL);

  return (
    <Modal
      title="Edit Agent"
      open={isVisible}
      width="700px"
      centered
      onCancel={handleCancel}
      footer={null}
    >
      {" "}
      <form onSubmit={signupAction}>
        <div className="flex flex-col gap-4 mt-5 max-h-[30rem] overflow-auto">
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="fullName">
              Full Name
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              value={addData.fullName}
              id="fullName"
              name="fullName"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="tel"
              value={addData.phoneNumber}
              id="phoneNumber"
              name="phoneNumber"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="email">
              Email
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="email"
              value={addData.email}
              id="email"
              name="email"
              onChange={handleInputChange}
            />
          </div>
          <h1 className="font-semibold text-[18px]">Vehicle Details</h1>
          <div className="flex">
            <div className="w-3/4">
              <div className="flex items-center ">
                <label className="w-1/3 text-gray-500" htmlFor="licensePlate">
                  License Plate
                </label>
                <input
                  className="border-2 border-gray-100 rounded p-2 w-[15rem] ml-14 focus:outline-none"
                  type="text"
                  // value={addData.vehicleDetail[0].licensePlate}
                  id="licensePlate"
                  name="licensePlate"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex mt-5 items-center">
                <label className="w-1/3 text-gray-500" htmlFor="model">
                  Vehicle Model
                </label>
                <input
                  className="border-2 border-gray-100 rounded p-2 w-[15rem] ml-14 focus:outline-none"
                  type="text"
                  // value={addData?.vehicleDetail[0].model}
                  id="model"
                  name="model"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex mt-5 gap-4">
                <label className="w-1/2 text-gray-500 " htmlFor="type">
                  Vehicle Type
                </label>
                <select
                  className="border-2 border-gray-100 rounded p-2 w-[17rem] mr-5 "
                  name="type"
                  id="type"
                  // value={addData?.vehicleDetail[0].type}
                  onChange={handleInputChange}
                >
                  <option value="" hidden>
                    Vehicle Type
                  </option>
                  <option value="Bike">Bike</option>
                  <option value="Scooter">Scooter</option>
                </select>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex items-center gap-[30px]">
                <input
                  type="file"
                  name="rcFrontImage"
                  id="rcFrontImage"
                  className="hidden"
                  onChange={(e) =>
                    handleImageChange(e, setRcFrontFile, setRcFrontPreviewURL)
                  }
                />
                <label htmlFor="rcFrontImage" className="cursor-pointer">
                  {rcFrontPreviewURL ? (
                    <figure className=" h-16 w-16 rounded relative">
                      <img
                        src={rcFrontPreviewURL}
                        alt="profile"
                        className="w-full rounded absolute h-full object-cover"
                      />
                    </figure>
                  ) : (
                    <MdCameraAlt
                      className="bg-teal-800 text-[40px] text-white p-4 h-16 w-16 rounded"
                      size={30}
                    />
                  )}
                </label>
              </div>
              <div className="flex items-center gap-[30px]">
                <input
                  type="file"
                  name="rcBackImage"
                  id="rcBackImage"
                  className="hidden"
                  onChange={(e) =>
                    handleImageChange(e, setRcBackFile, setRcBackPreviewURL)
                  }
                />
                <label htmlFor="rcBackImage" className="cursor-pointer">
                  {rcBackPreviewURL ? (
                    <figure className=" h-16 w-16 rounded relative">
                      <img
                        src={rcBackPreviewURL}
                        alt="profile"
                        className="w-full rounded absolute h-full object-cover"
                      />
                    </figure>
                  ) : (
                    <MdCameraAlt
                      className="bg-teal-800 text-[40px] text-white p-4 h-16 w-16 rounded"
                      size={30}
                    />
                  )}
                </label>
              </div>
            </div>
          </div>
          <h1 className="font-semibold text-[18px]">Bank Details</h1>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="accountHolderName">
              Account Holder Name
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              value={addData?.bankDetail?.accountHolderName}
              id="accountHolderName"
              name="accountHolderName"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="accountNumber">
              Account Number
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="number"
              value={addData?.bankDetail?.accountNumber}
              id="accountNumber"
              name="accountNumber"
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="IFSCCode">
              IFSC Code
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              value={addData?.bankDetail?.IFSCCode}
              id="IFSCCode"
              name="IFSCCode"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="UPIId">
              UPI ID
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              value={addData?.bankDetail?.UPIId}
              id="UPIId"
              name="UPIId"
              onChange={handleInputChange}
            />
          </div>
          <h1 className="font-semibold text-[18px]">GOVERNMENT ID'S</h1>
          <div className="flex">
            <div className="flex items-center w-3/4">
              <label className="w-1/3 text-gray-500" htmlFor="aadharNumber">
                Aadhar Number
              </label>
              <input
                className="border-2 border-gray-100 rounded p-2 w-[15rem] ml-14 focus:outline-none"
                type="text"
                value={addData?.governmentCertificateDetail?.aadharNumber}
                id="aadharNumber"
                name="aadharNumber"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex gap-6">
              <div className="flex items-center gap-[30px]">
                <input
                  type="file"
                  name="aadharFrontImage"
                  id="aadharFrontImage"
                  className="hidden"
                  onChange={(e) =>
                    handleImageChange(
                      e,
                      setAadharFrontFile,
                      setAadharFrontPreviewURL
                    )
                  }
                />
                <label htmlFor="aadharFrontImage" className="cursor-pointer">
                  {addData?.governmentCertificateDetail?.aadharFrontImageURL ? (
                    <figure className=" h-16 w-16 rounded relative">
                      <img
                        src={
                          addData?.governmentCertificateDetail
                            ?.aadharFrontImageURL
                        }
                        alt="profile"
                        className="w-full rounded absolute h-full object-cover"
                      />
                    </figure>
                  ) : (
                    <MdCameraAlt
                      className="bg-teal-800 text-[40px] text-white p-4 h-16 w-16 rounded"
                      size={30}
                    />
                  )}
                </label>
              </div>
              <div className="flex items-center gap-[30px]">
                <input
                  type="file"
                  name="aadharBackImage"
                  id="aadharBackImage"
                  className="hidden"
                  onChange={(e) =>
                    handleImageChange(
                      e,
                      setAadharBackFile,
                      setAadharBackPreviewURL
                    )
                  }
                />
                <label htmlFor="aadharBackImage" className="cursor-pointer">
                  {addData?.governmentCertificateDetail?.aadharBackImageURL ? (
                    <figure className=" h-16 w-16 rounded relative">
                      <img
                        src={
                          addData?.governmentCertificateDetail
                            ?.aadharBackImageURL
                        }
                        alt="profile"
                        className="w-full rounded absolute h-full object-cover"
                      />
                    </figure>
                  ) : (
                    <MdCameraAlt
                      className="bg-teal-800 text-[40px] text-white p-4 h-16 w-16 rounded"
                      size={30}
                    />
                  )}
                </label>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="flex items-center w-3/4">
              <label
                className="w-1/3 text-gray-500"
                htmlFor="drivingLicenseNumber"
              >
                Driving License Number
              </label>
              <input
                className="border-2 border-gray-100 rounded p-2 w-[15rem] ml-14 focus:outline-none"
                type="text"
                value={
                  addData?.governmentCertificateDetail?.drivingLicenseNumber
                }
                id="drivingLicenseNumber"
                name="drivingLicenseNumber"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex gap-6">
              <div className="flex items-center gap-[30px]">
                <input
                  type="file"
                  name="drivingLicenseFrontImage"
                  id="drivingLicenseFrontImage"
                  className="hidden"
                  onChange={(e) =>
                    handleImageChange(e, setDriFrontFile, setDriFrontPreviewURL)
                  }
                />
                <label
                  htmlFor="drivingLicenseFrontImage"
                  className="cursor-pointer"
                >
                  {addData?.governmentCertificateDetail
                    ?.drivingLicenseFrontImageURL ? (
                    <figure className=" h-16 w-16 rounded relative">
                      <img
                        src={
                          addData?.governmentCertificateDetail
                            ?.drivingLicenseFrontImageURL
                        }
                        alt="profile"
                        className="w-full rounded absolute h-full object-cover"
                      />
                    </figure>
                  ) : (
                    <MdCameraAlt
                      className="bg-teal-800 text-[40px] text-white p-4 h-16 w-16 rounded"
                      size={30}
                    />
                  )}
                </label>
              </div>
              <div className="flex items-center gap-[30px]">
                <input
                  type="file"
                  name="drivingLicenseBackImage"
                  id="drivingLicenseBackImage"
                  className="hidden"
                  onChange={(e) =>
                    handleImageChange(e, setDriBackFile, setDriBackPreviewURL)
                  }
                />
                <label
                  htmlFor="drivingLicenseBackImage"
                  className="cursor-pointer"
                >
                  {addData?.governmentCertificateDetail
                    ?.drivingLicenseBackImageURL ? (
                    <figure className=" h-16 w-16 rounded relative">
                      <img
                        src={
                          addData?.governmentCertificateDetail
                            ?.drivingLicenseBackImageURL
                        }
                        alt="profile"
                        className="w-full rounded absolute h-full object-cover"
                      />
                    </figure>
                  ) : (
                    <MdCameraAlt
                      className="bg-teal-800 text-[40px] text-white p-4 h-16 w-16 rounded"
                      size={30}
                    />
                  )}
                </label>
              </div>
            </div>
          </div>
          <h1 className="font-semibold text-[18px]">Work Structure</h1>
          <div className="flex mt-5  gap-4">
            <label className="w-1/2 text-gray-500" htmlFor="managerId">
              Manager
            </label>
            <select
              name="managerId"
              id="managerId"
              // value={addData?.workStructure?.managerId?.name}
              onChange={handleInputChange}
              className="border-2 border-gray-100 rounded p-2 focus:outline-none w-full"
            >
              <option hidden value="">
                {addData?.workStructure?.managerId?.name}
              </option>
              {manager.map((managers) => (
                <option value={managers?._id} key={managers?._id}>
                  {managers?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex mt-5  gap-4">
            <label className="w-1/2 text-gray-500" htmlFor="salaryStructureId">
              Salary Structure
            </label>
            <select
              name="salaryStructureId"
              id="salaryStructureId"
              // value={addData?.workStructure?.salaryStructureId?.ruleName}
              onChange={handleInputChange}
              className="border-2 border-gray-100 rounded p-2 focus:outline-none w-full"
            >
              <option hidden value="">
                {addData?.workStructure?.salaryStructureId?.ruleName}
              </option>
              {salary.map((salary) => (
                <option value={salary._id} key={salary._id}>
                  {salary.ruleName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex mt-5  gap-4">
            <label className="w-1/2 text-gray-500" htmlFor="geofencename">
              Geofence
            </label>
            <select
              name="geofencename"
              id="geofencename"
              // value={addData?.geofenceId?.name}
              onChange={handleInputChange}
              className="border-2 border-gray-100 rounded p-2 focus:outline-none w-full"
            >
              <option hidden value="">
                {addData?.geofenceId?.name}
              </option>
              {geofence.map((geoFence) => (
                <option value={geoFence._id} key={geoFence._id}>
                  {geoFence.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center mt-5">
            <label className="w-1/3 text-gray-500" htmlFor="tag">
              Tags
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              value={addData?.workStructure?.tag}
              id="tag"
              name="tag"
              onChange={handleInputChange}
            />
          </div>
          <h1 className="font-semibold text-[18px]">Add Profile</h1>
          <div className=" flex items-center gap-[30px]">
          {addData?.agentImageURL && !agentPreviewURL && (
            <figure className="ml-5 mt-5 h-16 w-16 rounded-md relative">
              <img
                src={addData?.agentImageURL}
                alt="profile"
                className="w-full rounded h-full object-cover "
              />
            </figure>
          )}
            {agentPreviewURL && (
              <figure className="ml-5 mt-5 h-16 w-16 rounded-md relative">
                <img
                  src={agentPreviewURL}
                  alt="profile"
                  className="w-full rounded h-full object-cover "
                />
              </figure>
            )}
            <input
              type="file"
              name="agentImage"
              id="agentImage"
              className="hidden"
              onChange={(e) => handleImageChange(e, setAgentFile, setAgentPreviewURL)}
            />
            <label htmlFor="agentImage" className="cursor-pointer ">
              <MdCameraAlt
                className=" bg-teal-800  text-[40px] text-white p-4 h-16 w-16 mt-5 rounded"
                size={30}
              />
            </label>
          </div>

          <div className="flex gap-14 ml-8 text-gray-500">
            <p>1.PNG</p>
            <p>Photo</p>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button
              className="bg-cyan-50 py-2 px-4 rounded-md"
              type="button"
              // onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="bg-teal-700 text-white py-2 px-4 rounded-md focus:outline-none"
              type="submit"
              // onClick={handleOk}
            >
              Add Agent
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditAgentModal;
