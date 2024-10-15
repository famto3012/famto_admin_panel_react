import { useToast } from "@chakra-ui/react";
import { Modal } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { MdCameraAlt } from "react-icons/md";
import Select from "react-select";
import { vehicleTypeOptions } from "../../../utils/DefaultData";

const AddAgentModal = ({
  isVisible,
  handleCancel,
  token,
  geofence,
  salary,
  manager,
  onAddAgent,
  BASE_URL,
}) => {
  const [addData, setAddData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    managerId: null,
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
  });

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

  const [confirmLoading, setConfirmLoading] = useState(false);

  const toast = useToast();

  const managerOptions = manager;

  const handleInputChange = (e) => {
    setAddData({ ...addData, [e.target.name]: e.target.value });
  };

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
      setConfirmLoading(true);
      console.log("addData", addData);

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
        dataToSend.append("agentImage", agentFile);
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

      const addAgentResponse = await axios.post(
        `${BASE_URL}/admin/agents/add-agents`,
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
        setAadharBackPreviewURL(null);
        setAadharFrontPreviewURL(null);
        setAgentFile(null);
        setAgentPreviewURL(null);
        setDriBackPreviewURL(null);
        setDriFrontPreviewURL(null);
        setRcBackPreviewURL(null);
        setRcFrontPreviewURL(null);

        const newAgent = addAgentResponse.data.data;
        onAddAgent(newAgent);
        handleCancel();
        toast({
          title: "Success",
          description: "Agent Created Successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(`Error in fetch datas : ${err.message}`);
      toast({
        title: "Error",
        description: "There was an error occured",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <Modal
      title="Add Agent"
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
              Full Name <span className="text-red-600">*</span>
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
              Phone Number <span className="text-red-600">*</span>
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
              Email <span className="text-red-600">*</span>
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
                  License Plate <span className="text-red-600">*</span>
                </label>
                <input
                  className="border-2 border-gray-100 rounded p-2 w-[15rem] ml-14 focus:outline-none"
                  type="text"
                  value={addData.licensePlate}
                  id="licensePlate"
                  name="licensePlate"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex mt-5 items-center">
                <label className="w-1/3 text-gray-500" htmlFor="model">
                  Vehicle Model <span className="text-red-600">*</span>
                </label>
                <input
                  className="border-2 border-gray-100 rounded p-2 w-[15rem] ml-14 focus:outline-none"
                  type="text"
                  value={addData.model}
                  id="model"
                  name="model"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex mt-5 gap-4">
                <label className="w-1/3 text-gray-500 " htmlFor="type">
                  Vehicle Type <span className="text-red-600">*</span>
                </label>

                <Select
                  options={vehicleTypeOptions}
                  value={vehicleTypeOptions.find(
                    (option) => option.value === addData.type
                  )}
                  onChange={(option) =>
                    setAddData({ ...addData, type: option.value })
                  }
                  className="rounded w-[15rem] ml-10 focus:outline-none"
                  placeholder="Vehicle type"
                  isSearchable={false}
                  isMulti={false}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      paddingRight: "",
                    }),
                    dropdownIndicator: (provided) => ({
                      ...provided,
                      padding: "10px",
                    }),
                  }}
                />
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
              Account Holder Name <span className="text-red-600">*</span>
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              value={addData.accountHolderName}
              id="accountHolderName"
              name="accountHolderName"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="accountNumber">
              Account Number <span className="text-red-600">*</span>
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="number"
              value={addData.accountNumber}
              id="accountNumber"
              name="accountNumber"
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="IFSCCode">
              IFSC Code <span className="text-red-600">*</span>
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              value={addData.IFSCCode}
              id="IFSCCode"
              name="IFSCCode"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="UPIId">
              UPI ID <span className="text-red-600">*</span>
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              value={addData.UPIId}
              id="UPIId"
              name="UPIId"
              onChange={handleInputChange}
            />
          </div>
          <h1 className="font-semibold text-[18px]">GOVERNMENT ID'S</h1>
          <div className="flex">
            <div className="flex items-center w-3/4">
              <label className="w-1/3 text-gray-500" htmlFor="aadharNumber">
                Aadhar Number <span className="text-red-600">*</span>
              </label>
              <input
                className="border-2 border-gray-100 rounded p-2 w-[15rem] ml-14 focus:outline-none"
                type="text"
                value={addData.aadharNumber}
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
                  {aadharFrontPreviewURL ? (
                    <figure className=" h-16 w-16 rounded relative">
                      <img
                        src={aadharFrontPreviewURL}
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
                  {aadharBackPreviewURL ? (
                    <figure className=" h-16 w-16 rounded relative">
                      <img
                        src={aadharBackPreviewURL}
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
                Driving License Number <span className="text-red-600">*</span>
              </label>
              <input
                className="border-2 border-gray-100 rounded p-2 w-[15rem] ml-14 focus:outline-none"
                type="text"
                value={addData.drivingLicenseNumber}
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
                  {driFrontPreviewURL ? (
                    <figure className=" h-16 w-16 rounded relative">
                      <img
                        src={driFrontPreviewURL}
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
                  {driBackPreviewURL ? (
                    <figure className=" h-16 w-16 rounded relative">
                      <img
                        src={driBackPreviewURL}
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
              value={addData.managerId}
              onChange={handleInputChange}
              className="border-2 border-gray-100 rounded p-2 focus:outline-none w-full"
            >
              <option hidden defaultValue="Select manager">
                Select manager
              </option>
              {manager.map((managers) => (
                <option value={managers._id} key={managers._id}>
                  {managers.name}
                </option>
              ))}
            </select>

            <Select
              options={vehicleTypeOptions}
              value={vehicleTypeOptions.find(
                (option) => option.value === addData.type
              )}
              onChange={(option) =>
                setAddData({ ...addData, type: option.value })
              }
              className="rounded w-[15rem] ml-10 focus:outline-none"
              placeholder="Vehicle type"
              isSearchable={false}
              isMulti={false}
              styles={{
                control: (provided) => ({
                  ...provided,
                  paddingRight: "",
                }),
                dropdownIndicator: (provided) => ({
                  ...provided,
                  padding: "10px",
                }),
              }}
            />
          </div>
          <div className="flex mt-5  gap-4">
            <label className="w-1/2 text-gray-500" htmlFor="salaryStructureId">
              Salary Structure <span className="text-red-600">*</span>
            </label>
            <select
              name="salaryStructureId"
              id="salaryStructureId"
              value={addData.salaryStructureId}
              onChange={handleInputChange}
              className="border-2 border-gray-100 rounded p-2 focus:outline-none w-full"
            >
              <option hidden defaultValue="Select salary structure">
                Select salary structure
              </option>
              {salary.map((salary) => (
                <option value={salary._id} key={salary._id}>
                  {salary.ruleName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex mt-5  gap-4">
            <label className="w-1/2 text-gray-500" htmlFor="geofenceId">
              Geofence <span className="text-red-600">*</span>
            </label>
            <select
              name="geofenceId"
              id="geofenceId"
              value={addData.geofenceId}
              onChange={handleInputChange}
              className="border-2 border-gray-100 rounded p-2 focus:outline-none w-full"
            >
              <option hidden defaultValue="Select geofence">
                Select geofence
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
              Tags <span className="text-red-600">*</span>
            </label>

            <select
              name="tag"
              id="tag"
              value={addData.tag}
              onChange={handleInputChange}
              className="border-2 border-gray-100 rounded p-2 focus:outline-none w-full"
            >
              <option hidden defaultValue="Select tag">
                Select tag
              </option>
              <option value="Normal">Normal</option>
              <option value="Fish & Meat">Fish & Meat</option>
            </select>
          </div>
          <h1 className="font-semibold text-[18px]">Add Profile</h1>
          <div className=" flex items-center gap-[30px]">
            {!agentPreviewURL && (
              <div className="bg-cyan-100 ml-5 mt-5 h-16 w-16 rounded-md" />
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
              onChange={(e) =>
                handleImageChange(e, setAgentFile, setAgentPreviewURL)
              }
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
            <p>Photo</p> <span className="text-red-600">*</span>
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
              className="bg-teal-700 text-white py-2 px-4 rounded-md focus:outline-none"
              type="submit"
            >
              {confirmLoading ? "Adding..." : "Add"}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddAgentModal;
