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
import { MdCameraAlt } from "react-icons/md";


const DeliveryAgent = () => {
    const [agent, setAgent] = useState([]);

    const [addData, setAddData] = useState({
        fullName: "",
        phoneNumber: "",
        email: "",
        adress: "",
        username: "",
        Password: "",
        managerId: "",
        salaryStructureId: "",
        geofenceId: "",
        tag: "",
        aadharNumber: "",
        drivingLicenseNumber: "",
        model: "",
        type: "",
        licensePlate: "",
        accountHolderName: "",
        accountNumber: "",
        IFSCCode: "",
        UPIId: "",
        rcFrontImage: "",
        rcBackImage: "",
        aadharFrontImage: "",
        aadharBackImage: "",
        drivingLicenseFrontImage: "",
        drivingLicenseBackImage: "",
        agentImage: "",
    });


    const handleToggle = (id) => {
        setAgent((prevAgent) =>
            prevAgent.map((agent) =>
                agent.id === id
                    ? { ...agent, status: !agent.status }
                    : agent
            )
        );
    };

    const handleApprove = (id) => {
        setAgent((prevAgent) =>
            prevAgent.map((agent) =>
                agent.id === id
                    ? { ...agent, registrationApproval: "approved" }
                    : agent
            )
        );
    };

    const handleReject = (id) => {
        setAgent((prevAgent) =>
            prevAgent.map((agent) =>
                agent.id === id
                    ? { ...agent, registrationApproval: "rejected" }
                    : agent
            )
        );
    };

    useEffect(() => {
        const fetchAgent = async () => {
            const dummyData = [
                {
                    id: "01",
                    name: "Merchant One",
                    email: "123@gmail.com",
                    phone: "1234567890",
                    Manager: "adam",
                    geofence: "geofence",
                    status: "Approved",
                    registrationApproval: "Pending",
                },

            ];
            setAgent(dummyData);
        };

        fetchAgent();
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


    const handleInputChange = (e) => {
        setAddData({ ...addData, [e.target.name]: e.target.value });
    };
    const signupAction = (e) => {
        e.preventDefault();

        console.log(addData);
    };

    const [businessFile, setBusinessFile] = useState(null);
    const [businessPreviewURL, setBusinessPreviewURL] = useState(null);

    const handleBusinessImageChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setBusinessFile(file);
        setBusinessPreviewURL(URL.createObjectURL(file));
    };

    const [agentFile, setAgentFile] = useState(null);
    const [agentPreviewURL, setAgentPreviewURL] = useState(null);

    const handleAgentImageChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setAgentFile(file);
        setAgentPreviewURL(URL.createObjectURL(file));
    };

    return (
        <>
            <Sidebar />
            <main className="pl-[300px] bg-gray-100 h-screen">
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
                    <h1 className="text-[18px] font-semibold">Delivery Agent</h1>
                    <div className="flex space-x-2 justify-end ">
                        <button className="bg-cyan-100 text-black rounded-md px-4 py-2 font-semibold flex items-center space-x-2">
                            <ArrowDownOutlined /> <span>CSV</span>
                        </button>
                        <div>
                            <button
                                className="bg-teal-700 text-white rounded-md px-4 py-2 font-semibold  flex items-center space-x-1 "
                                onClick={showModal}
                            >
                                <PlusOutlined /> <span>Add Agent</span>
                            </button>
                            <Modal
                                title="Add Delivery Agent"
                                width="700px"
                                open={isModalVisible}
                                onOk={handleOk}
                                centered
                                onCancel={handleCancel}
                                footer={null}
                            >
                                <form onSubmit={signupAction}>
                                    <div className="flex flex-col gap-4 mt-5 max-h-[30rem] overflow-auto">
                                        <div className="flex items-center">
                                            <label className="w-1/3 text-gray-500" htmlFor="fullName">
                                                Full Name of owner
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
                                            <label className="w-1/3 text-gray-500" htmlFor="phone">
                                                Phone Number
                                            </label>
                                            <input
                                                className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                                                type="tel"
                                                value={addData.phone}
                                                id="phone"
                                                name="phone"
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
                                        <div className="flex items-center">
                                            <label className="w-1/3 text-gray-500" htmlFor="adress">
                                                Home Adress
                                            </label>
                                            <input
                                                className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                                                type="text"
                                                value={addData.adress}
                                                id="adress"
                                                name="adress"
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="flex items-center">
                                            <label
                                                className="w-1/3 text-gray-500"
                                                htmlFor="username"
                                            >
                                                Username
                                            </label>
                                            <input
                                                className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                                                type="text"
                                                value={addData.username}
                                                id="username"
                                                name="username"
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="flex items-center">
                                            <label className="w-1/3 text-gray-500" htmlFor="Password">
                                                Password
                                            </label>
                                            <input
                                                className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                                                type="password"
                                                value={addData.Password}
                                                id="Password"
                                                name="Password"
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
                                                        value={addData.licensePlate}
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
                                                        value={addData.model}
                                                        id="model"
                                                        name="model"
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="flex mt-5 gap-4">
                                                    <label className="w-1/2 text-gray-500 " htmlFor="type">Vehicle Type</label>
                                                    <select
                                                        className="border-2 border-gray-100 rounded p-2 w-[17rem] mr-5 "
                                                        name="type"
                                                        id="type"
                                                        value={addData.type}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="1" hidden selected>Vehicle Type</option>
                                                        <option value="2">Two wheeler</option>
                                                        <option value="3">Three Wheeler</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className=" flex items-center gap-[30px]">
                                                {!businessPreviewURL && (
                                                    <div className="bg-gray-400 ml-5 mt-5 h-16 w-16 rounded-md" />
                                                )}
                                                {businessPreviewURL && (
                                                    <figure className="ml-5 mt-5 h-16 w-16 rounded-md relative">
                                                        <img
                                                            src={businessPreviewURL}
                                                            alt="profile"
                                                            className="w-full rounded h-full object-cover "
                                                        />
                                                    </figure>
                                                )}
                                                <input
                                                    type="file"
                                                    name="Image"
                                                    id="Image"
                                                    className="hidden"
                                                    onChange={handleBusinessImageChange}
                                                />
                                                <label htmlFor="Image" className="cursor-pointer ">
                                                    <MdCameraAlt
                                                        className=" bg-teal-800  text-[40px] text-white p-6 h-16 w-16 mt-5 rounded"
                                                        size={30}
                                                    />
                                                </label>
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
                                                value={addData.accountHolderName}
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
                                                value={addData.accountNumber}
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
                                                value={addData.IFSCCode}
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
                                                    Aadhar Number
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
                                            <div className=" flex items-center gap-[30px]">
                                                {!businessPreviewURL && (
                                                    <div className="bg-gray-400 ml-5 mt-5 h-16 w-16 rounded-md" />
                                                )}
                                                {businessPreviewURL && (
                                                    <figure className="ml-5 mt-5 h-16 w-16 rounded-md relative">
                                                        <img
                                                            src={businessPreviewURL}
                                                            alt="profile"
                                                            className="w-full rounded h-full object-cover "
                                                        />
                                                    </figure>
                                                )}
                                                <input
                                                    type="file"
                                                    name="Image"
                                                    id="Image"
                                                    className="hidden"
                                                    onChange={handleBusinessImageChange}
                                                />
                                                <label htmlFor="buniessImage" className="cursor-pointer ">
                                                    <MdCameraAlt
                                                        className=" bg-teal-800  text-[40px] text-white p-6 h-16 w-16 mt-5 rounded"
                                                        size={30}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                        <div className="flex">
                                            <div className="flex items-center w-3/4">
                                                <label className="w-1/3 text-gray-500" htmlFor="drivingLicenseNumber">
                                                    Driving License Number
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
                                            <div className=" flex items-center gap-[30px]">
                                                {!businessPreviewURL && (
                                                    <div className="bg-gray-400 ml-5 mt-5 h-16 w-16 rounded-md" />
                                                )}
                                                {businessPreviewURL && (
                                                    <figure className="ml-5 mt-5 h-16 w-16 rounded-md relative">
                                                        <img
                                                            src={businessPreviewURL}
                                                            alt="profile"
                                                            className="w-full rounded h-full object-cover "
                                                        />
                                                    </figure>
                                                )}
                                                <input
                                                    type="file"
                                                    name="BusinessImage"
                                                    id="BusinessImage"
                                                    className="hidden"
                                                    onChange={handleBusinessImageChange}
                                                />
                                                <label htmlFor="BusinessImage" className="cursor-pointer ">
                                                    <MdCameraAlt
                                                        className=" bg-teal-800  text-[40px] text-white p-6 h-16 w-16 mt-5 rounded"
                                                        size={30}
                                                    />
                                                </label>

                                            </div>
                                        </div>
                                        <h1 className="font-semibold text-[18px]">Work Structure</h1>
                                        <div className="flex mt-5  gap-4">
                                            <label className="w-1/2 text-gray-500" htmlFor="managerId">Manager</label>
                                            <select
                                                name="managerId"
                                                id="managerId"
                                                value={addData.managerId}
                                                onChange={handleInputChange}
                                                className="border-2 border-gray-100 rounded p-2 focus:outline-none w-full"
                                            >
                                                <option value="select" hidden selected>
                                                    Select Manager
                                                </option>
                                                <option value="Option 1">Option 1</option>
                                            </select>
                                        </div>
                                        <div className="flex mt-5  gap-4">
                                            <label className="w-1/2 text-gray-500" htmlFor="salaryStructureId">Salary Structure</label>
                                            <select
                                                name="salaryStructureId"
                                                id="salaryStructureId"
                                                value={addData.salaryStructureId}
                                                onChange={handleInputChange}
                                                className="border-2 border-gray-100 rounded p-2 focus:outline-none w-full"
                                            >
                                                <option value="select" hidden selected>
                                                    select salary Structure
                                                </option>
                                                <option value="Option 1">Option 1</option>
                                            </select>
                                        </div>
                                        <div className="flex mt-5  gap-4">
                                            <label className="w-1/2 text-gray-500" htmlFor="geofenceId">Geofence</label>
                                            <select
                                                name="geofenceId"
                                                id="geofenceId"
                                                value={addData.geofenceId}
                                                onChange={handleInputChange}
                                                className="border-2 border-gray-100 rounded p-2 focus:outline-none w-full"
                                            >
                                                <option value="select" hidden selected>
                                                    Geofence
                                                </option>
                                                <option value="Option 1">Option 1</option>
                                            </select>
                                        </div>
                                        <div className="flex items-center mt-5">
                                            <label className="w-1/3 text-gray-500" htmlFor="tag">
                                                Tags
                                            </label>
                                            <input
                                                className="border-2 border-gray-100 rounded p-2 w-2/3 focus:outline-none"
                                                type="text"
                                                value={addData.tag}
                                                id="tag"
                                                name="tag"
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <h1 className="font-semibold text-[18px]">Add Profile</h1>
                                        <div className=" flex items-center gap-[30px]">
                                            {!agentPreviewURL && (
                                                <div className="bg-gray-400 ml-5 mt-5 h-16 w-16 rounded-md" />
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
                                                onChange={handleAgentImageChange}
                                            />
                                            <label htmlFor="agentImage" className="cursor-pointer ">
                                                <MdCameraAlt
                                                    className=" bg-teal-800  text-[40px] text-white p-6 h-16 w-16 mt-5 rounded"
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
                                                onClick={handleCancel}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className="bg-teal-700 text-white py-2 px-4 rounded-md focus:outline-none"
                                                type="submit"
                                                onClick={handleOk}
                                            >
                                                Add Agent
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </Modal>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-[20px] px-[30px] bg-white mx-5 p-5 rounded-lg">
                    <div className="flex items-center gap-[20px] bg-white mx-5 rounded-lg">
                        <select
                            id="status"
                            className="bg-blue-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        >
                            <option selected hidden>
                                Status
                            </option>
                            <option value="open">Open</option>
                            <option value="closed">Closed</option>
                        </select>

                        <select
                            id="vehicleType"
                            className="bg-blue-50 w-32 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        >
                            <option selected hidden>
                                Vehicle Type
                            </option>
                            <option value="Scooter">Scooter</option>
                            <option value="Bike">Bike</option>
                        </select>

                        <select
                            id="geofence"
                            className="bg-blue-50 border border-gray-300 w-fit text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        >
                            <option selected hidden>
                                Geofence
                            </option>
                            <option value="US">United States</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-[30px]">
                        <div>
                            <FilterAltOutlinedIcon className="mt-2 text-gray-400   " />
                        </div>
                        <input
                            type="search"
                            name="search"
                            placeholder="search Agent id"
                            className="bg-gray-100 h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
                        />
                        <button type="submit" className="absolute right-16 mt-2">
                            <SearchOutlined className="text-xl text-gray-600" />
                        </button>
                    </div>
                </div>

                <div className="overflow-auto mt-[20px] w-full">
                    <table className="text-start w-screen overflow-x-auto">
                        <thead>
                            <tr className="">
                                {[
                                    "Agent ID",
                                    "Full Name",
                                    "Email",
                                    "Phone",
                                    "Manager",
                                    "Geofence",
                                    "Online Status",
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
                            {agent.map((agent) => (
                                <tr
                                    key={agent.id}
                                    className="align-middle border-b border-gray-300 text-center"
                                >
                                    <td className="p-4 text-center">
                                        <Link to={`/agent-details/${agent.id}`}>
                                            {agent.id}
                                        </Link>
                                    </td>
                                    <td className="p-4">{agent.name}</td>
                                    <td className="p-4">{agent.email}</td>
                                    <td className="p-4">{agent.phone}</td>
                                    <td className="p-4">{agent.Manager}</td>
                                    <td className="p-4">{agent.geofence}</td>
                                    <td className="p-4">
                                        <Switch
                                            checked={agent.status}
                                            onChange={() => handleToggle(agent.id)}
                                        />
                                    </td>
                                    <td className="p-4">
                                        <div className="flex space-x-10 justify-center">
                                            <CheckCircleOutlined
                                                className="text-3xl cursor-pointer text-green-500"
                                                onClick={() => handleApprove(agent.id)}
                                            />
                                            <CloseCircleOutlined
                                                className="text-3xl  cursor-pointer text-red-500"
                                                onClick={() => handleReject(agent.id)}
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

export default DeliveryAgent;
