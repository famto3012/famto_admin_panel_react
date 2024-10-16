import { Modal } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MdCameraAlt } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import { useToast } from "@chakra-ui/react";
import Select from "react-select";
import {
  agentTagOptions,
  vehicleTypeOptions,
} from "../../../utils/DefaultData";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const EditAgentModal = ({ isVisible, onCancel, data }) => {
  const [agentData, setAgentData] = useState({});

  const [allGeofence, setAllGeofence] = useState([]);
  const [salary, setSalary] = useState([]);
  const [manager, setManager] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { token, role } = useContext(UserContext);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [geofenceResponse, managerResponse, salaryResponse] =
          await Promise.all([
            axios.get(`${BASE_URL}/admin/geofence/get-geofence`, {
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${BASE_URL}/admin/managers`, {
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${BASE_URL}/admin/agent-pricing/get-all-agent-pricing`, {
              withCredentials: true,
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);

        if (salaryResponse.status === 200) {
          setSalary(salaryResponse.data.data);
        }

        if (managerResponse.status === 200) {
          setManager(managerResponse.data.data);
        }

        if (geofenceResponse.status === 200) {
          setAllGeofence(geofenceResponse.data.geofences);
        }
      } catch (err) {
        console.error(`Error in fetching initial data: ${err}`);
      }
    };

    fetchData();
    setAgentData(data);
    console.log(data);
  }, [token, role, navigate]);

  const managerOptions = manager?.map((manager) => ({
    label: manager?.name,
    value: manager?._id,
  }));

  const salaryOptions = salary?.map((salary) => ({
    label: salary?.ruleName,
    value: salary?._id,
  }));

  const geofenceOptions = allGeofence?.map((geofence) => ({
    label: geofence?.name,
    value: geofence?._id,
  }));

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    setAgentData((prevData) => ({
      ...prevData,
      [name]: value,
      vehicleDetail: prevData.vehicleDetail.map((vehicle, i) =>
        i === index ? { ...vehicle, [name]: value } : vehicle
      ),
      governmentCertificateDetail: {
        ...prevData.governmentCertificateDetail,
        [name]: value,
      },
      bankDetail: {
        ...prevData.bankDetail,
        [name]: value,
      },
      workStructure: {
        ...prevData.workStructure,
        [name]: value,
      },
    }));
  };

  const handleSelectChange = (field) => (option) => {
    setAgentData((prevData) => ({
      ...prevData,
      workStructure: {
        ...prevData.workStructure,
        [field]: option.value,
      },
    }));
  };

  const [previewURL, setPreviewURL] = useState({
    agentPreviewURL: "",
    rcFrontPreviewURL: "",
    rcBackPreviewURL: "",
    drivingFrontPreviewURL: "",
    drivingBackPreviewURL: "",
    aadharFrontPreviewURL: "",
    aadharBackPreviewURL: "",
  });

  const [selectedFile, setSelectedFile] = useState({
    agentImage: null,
    rcFrontImage: null,
    rcBackImage: null,
    drivingLicenseFrontImage: null,
    drivingLicenseBackImage: null,
    aadharFrontImage: null,
    aadharBackImage: null,
  });

  const handleImageChange = (e, fileKey, previewKey) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      const imagePreview = URL.createObjectURL(file);

      setSelectedFile((prevState) => ({
        ...prevState,
        [fileKey]: file,
      }));

      setPreviewURL((prevState) => ({
        ...prevState,
        [previewKey]: imagePreview,
      }));
    }
  };

  const handleEditAgent = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      console.log(agentData);

      const formData = new FormData();

      function appendFormData(data, rootKey = "") {
        if (typeof data === "object" && !Array.isArray(data) && data !== null) {
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              appendFormData(data[key], rootKey ? `${rootKey}[${key}]` : key);
            }
          }
        } else if (Array.isArray(data)) {
          data.forEach((item, index) => {
            appendFormData(item, `${rootKey}[${index}]`);
          });
        } else {
          formData.append(rootKey, data);
        }
      }

      appendFormData(agentData);

      Object.keys(selectedFile).forEach((key) => {
        if (selectedFile[key]) {
          formData.append(key, selectedFile[key]);
        }
      });

      const addAgentResponse = await axios.put(
        `${BASE_URL}/admin/agents/edit-agent/${data._id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (addAgentResponse.status === 200) {
        // setAgentData(addAgentResponse.data.data);
        setPreviewURL({
          agentPreviewURL: "",
          rcFrontPreviewURL: "",
          rcBackPreviewURL: "",
          drivingFrontPreviewURL: "",
          drivingBackPreviewURL: "",
          aadharFrontPreviewURL: "",
          aadharBackPreviewURL: "",
        });
        setSelectedFile({
          agentImage: null,
          rcFrontImage: null,
          rcBackImage: null,
          drivingLicenseFrontImage: null,
          drivingLicenseBackImage: null,
          aadharFrontImage: null,
          aadharBackImage: null,
        });
        onCancel();
        toast({
          title: "Success",
          description: "Agent updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(`Error in fetch data : ${err}`);
      toast({
        title: "Error",
        description: "Error in updating agent",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Agent"
      open={isVisible}
      width="700px"
      centered
      onCancel={onCancel}
      footer={null}
    >
      <form onSubmit={handleEditAgent}>
        <div className="flex flex-col gap-4 mt-5 max-h-[30rem] overflow-auto">
          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="fullName">
              Full Name <span className="text-red-600">*</span>
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              value={agentData.fullName}
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
              value={agentData.phoneNumber}
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
              value={agentData.email}
              id="email"
              name="email"
              onChange={handleInputChange}
            />
          </div>

          <h1 className="font-semibold text-[18px]">Vehicle Details</h1>

          {agentData?.vehicleDetail?.map((vehicle, index) => (
            <div className="flex" key={index}>
              <div className="w-3/4">
                <div className="flex items-center">
                  <label
                    className="w-1/3 text-gray-500"
                    htmlFor={`licensePlate-${index}`}
                  >
                    License Plate <span className="text-red-600">*</span>
                  </label>
                  <input
                    className="border-2 border-gray-100 rounded p-2 w-[15rem] ml-14 focus:outline-none"
                    type="text"
                    value={vehicle?.licensePlate || ""}
                    id={`licensePlate-${index}`}
                    name="licensePlate"
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </div>

                <div className="flex mt-5 items-center">
                  <label
                    className="w-1/3 text-gray-500"
                    htmlFor={`model-${index}`}
                  >
                    Vehicle Model <span className="text-red-600">*</span>
                  </label>
                  <input
                    className="border-2 border-gray-100 rounded p-2 w-[15rem] ml-14 focus:outline-none"
                    type="text"
                    value={vehicle?.model || ""}
                    id={`model-${index}`}
                    name="model"
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </div>

                <div className="flex mt-5 gap-4">
                  <label
                    className="w-1/3 text-gray-500 "
                    htmlFor={`type-${index}`}
                  >
                    Vehicle Type <span className="text-red-600">*</span>
                  </label>

                  <Select
                    options={vehicleTypeOptions}
                    value={vehicleTypeOptions.find(
                      (option) => option.value === vehicle?.type
                    )}
                    onChange={(option) =>
                      setAgentData((prevData) => ({
                        ...prevData,
                        vehicleDetail: prevData.vehicleDetail.map((veh, i) =>
                          i === index ? { ...veh, type: option.value } : veh
                        ),
                      }))
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
                      handleImageChange(e, "rcFrontImage", "rcFrontPreviewURL")
                    }
                  />
                  <label htmlFor="rcFrontImage" className="cursor-pointer">
                    <figure className="h-16 w-16 rounded relative">
                      {previewURL.rcFrontPreviewURL ||
                      vehicle?.rcFrontImageURL ? (
                        <img
                          src={
                            previewURL.rcFrontPreviewURL ||
                            vehicle?.rcFrontImageURL
                          }
                          alt="profile"
                          className="w-full rounded absolute h-full object-cover"
                        />
                      ) : (
                        <MdCameraAlt
                          className="bg-teal-800 text-[40px] text-white p-4 h-16 w-16 rounded"
                          size={30}
                        />
                      )}
                    </figure>
                  </label>
                </div>

                <div className="flex items-center gap-[30px]">
                  <input
                    type="file"
                    name="rcBackImage"
                    id="rcBackImage"
                    className="hidden"
                    onChange={(e) =>
                      handleImageChange(e, "rcBackImage", "rcBackPreviewURL")
                    }
                  />
                  <label htmlFor="rcBackImage" className="cursor-pointer">
                    <figure className="h-16 w-16 rounded relative">
                      {previewURL.rcBackPreviewURL ||
                      vehicle?.rcBackImageURL ? (
                        <img
                          src={
                            previewURL.rcBackPreviewURL ||
                            vehicle?.rcBackImageURL
                          }
                          alt="profile"
                          className="w-full rounded absolute h-full object-cover"
                        />
                      ) : (
                        <MdCameraAlt
                          className="bg-teal-800 text-[40px] text-white p-4 h-16 w-16 rounded"
                          size={30}
                        />
                      )}
                    </figure>
                  </label>
                </div>
              </div>
            </div>
          ))}

          <h1 className="font-semibold text-[18px]">Bank Details</h1>

          <div className="flex items-center">
            <label className="w-1/3 text-gray-500" htmlFor="accountHolderName">
              Account Holder Name <span className="text-red-600">*</span>
            </label>
            <input
              className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
              type="text"
              value={agentData?.bankDetail?.accountHolderName}
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
              value={agentData?.bankDetail?.accountNumber}
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
              value={agentData?.bankDetail?.IFSCCode}
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
              value={agentData?.bankDetail?.UPIId}
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
                value={agentData?.governmentCertificateDetail?.aadharNumber}
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
                      "aadharFrontImage",
                      "aadharFrontPreviewURL"
                    )
                  }
                />

                <label htmlFor="aadharFrontImage" className="cursor-pointer">
                  <figure className="h-16 w-16 rounded relative">
                    {previewURL.aadharFrontPreviewURL ||
                    agentData?.governmentCertificateDetail
                      ?.aadharFrontImageURL ? (
                      <img
                        src={
                          previewURL.aadharFrontPreviewURL ||
                          agentData?.governmentCertificateDetail
                            ?.aadharFrontImageURL
                        }
                        alt="profile"
                        className="w-full rounded absolute h-full object-cover"
                      />
                    ) : (
                      <MdCameraAlt
                        className="bg-teal-800 text-[40px] text-white p-4 h-16 w-16 rounded"
                        size={30}
                      />
                    )}
                  </figure>
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
                      "aadharBackImage",
                      "aadharBackPreviewURL"
                    )
                  }
                />
                <label htmlFor="aadharBackImage" className="cursor-pointer">
                  <figure className="h-16 w-16 rounded relative">
                    {previewURL.aadharBackPreviewURL ||
                    agentData?.governmentCertificateDetail
                      ?.aadharBackImageURL ? (
                      <img
                        src={
                          previewURL.aadharBackPreviewURL ||
                          agentData?.governmentCertificateDetail
                            ?.aadharBackImageURL
                        }
                        alt="profile"
                        className="w-full rounded absolute h-full object-cover"
                      />
                    ) : (
                      <MdCameraAlt
                        className="bg-teal-800 text-[40px] text-white p-4 h-16 w-16 rounded"
                        size={30}
                      />
                    )}
                  </figure>
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
                value={
                  agentData?.governmentCertificateDetail?.drivingLicenseNumber
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
                    handleImageChange(
                      e,
                      "drivingLicenseFrontImage",
                      "drivingFrontPreviewURL"
                    )
                  }
                />

                <label
                  htmlFor="drivingLicenseFrontImage"
                  className="cursor-pointer"
                >
                  <figure className="h-16 w-16 rounded relative">
                    {previewURL.drivingFrontPreviewURL ||
                    agentData?.governmentCertificateDetail
                      ?.drivingLicenseFrontImageURL ? (
                      <img
                        src={
                          previewURL.drivingFrontPreviewURL ||
                          agentData?.governmentCertificateDetail
                            ?.drivingLicenseFrontImageURL
                        }
                        alt="profile"
                        className="w-full rounded absolute h-full object-cover"
                      />
                    ) : (
                      <MdCameraAlt
                        className="bg-teal-800 text-[40px] text-white p-4 h-16 w-16 rounded"
                        size={30}
                      />
                    )}
                  </figure>
                </label>
              </div>

              <div className="flex items-center gap-[30px]">
                <input
                  type="file"
                  name="drivingLicenseBackImage"
                  id="drivingLicenseBackImage"
                  className="hidden"
                  onChange={(e) =>
                    handleImageChange(
                      e,
                      "drivingLicenseBackImage",
                      "drivingBackPreviewURL"
                    )
                  }
                />

                <label
                  htmlFor="drivingLicenseBackImage"
                  className="cursor-pointer"
                >
                  <figure className="h-16 w-16 rounded relative">
                    {previewURL.drivingBackPreviewURL ||
                    agentData?.governmentCertificateDetail
                      ?.drivingLicenseBackImageURL ? (
                      <img
                        src={
                          previewURL.drivingBackPreviewURL ||
                          agentData?.governmentCertificateDetail
                            ?.drivingLicenseBackImageURL
                        }
                        alt="profile"
                        className="w-full rounded absolute h-full object-cover"
                      />
                    ) : (
                      <MdCameraAlt
                        className="bg-teal-800 text-[40px] text-white p-4 h-16 w-16 rounded"
                        size={30}
                      />
                    )}
                  </figure>
                </label>
              </div>
            </div>
          </div>

          <h1 className="font-semibold text-[18px]">Work Structure</h1>

          <div className="flex mt-5  gap-4">
            <label className="w-1/2 text-gray-500" htmlFor="managerId">
              Manager
            </label>

            <Select
              options={managerOptions}
              value={managerOptions.find(
                (option) =>
                  option.value === agentData?.workStructure?.managerId?._id
              )}
              onChange={handleSelectChange("managerId")}
              className="rounded focus:outline-none w-full"
              placeholder="Select manager"
              isSearchable={true}
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

            <Select
              options={salaryOptions}
              value={salaryOptions.find(
                (option) =>
                  option.value ===
                  agentData?.workStructure?.salaryStructureId?._id
              )}
              onChange={handleSelectChange("salaryStructureId")}
              className="rounded focus:outline-none w-full"
              placeholder="Select salary structure"
              isSearchable={true}
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
            <label className="w-1/2 text-gray-500" htmlFor="geofencename">
              Geofence <span className="text-red-600">*</span>
            </label>

            <Select
              options={geofenceOptions}
              value={geofenceOptions.find(
                (option) => option.value === agentData?.geofenceId?._id
              )}
              onChange={(option) =>
                setAgentData({
                  ...agentData,
                  geofenceId: { _id: option.value },
                })
              }
              className="rounded focus:outline-none w-full"
              placeholder="Select geofence"
              isSearchable={true}
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

          <div className="flex items-center mt-5">
            <label className="w-1/2 text-gray-500 me-4" htmlFor="tag">
              Tags <span className="text-red-600">*</span>
            </label>

            <Select
              options={agentTagOptions}
              value={agentTagOptions.find(
                (option) => option.value === agentData?.workStructure?.tag
              )}
              onChange={handleSelectChange("tag")}
              className="rounded focus:outline-none w-full"
              placeholder="Select tag"
              isSearchable={true}
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

          <h1 className="font-semibold text-[18px]">Add Profile</h1>

          <div className=" flex items-center gap-[30px]">
            {!previewURL.agentPreviewURL && agentData?.agentImageURL && (
              <figure className="ml-5 mt-5 h-16 w-16 rounded-md relative">
                <img
                  src={agentData?.agentImageURL}
                  alt={agentData.fullName}
                  className="w-full rounded h-full object-cover "
                />
              </figure>
            )}

            {previewURL.agentPreviewURL && (
              <figure className="ml-5 mt-5 h-16 w-16 rounded-md relative">
                <img
                  src={previewURL.agentPreviewURL}
                  alt={data.fullName}
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
                handleImageChange(e, "agentImage", "agentPreviewURL")
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
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className="bg-teal-700 text-white py-2 px-4 rounded-md focus:outline-none"
              type="submit"
            >
              {isLoading ? `Saving...` : `Save`}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditAgentModal;
