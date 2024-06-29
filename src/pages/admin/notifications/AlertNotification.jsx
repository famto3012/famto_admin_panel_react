import React, { useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import { BellOutlined, DeleteColumnOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { MdCameraAlt } from 'react-icons/md';

const AlertNotification = () => {
  const [userType, setUserType] = useState('');
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setURL] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [notificationFile, setNotificationFile] = useState(null);
  const [notificationPreviewURL, setNotificationPreviewURL] = useState(null);

  const mockSuggestions = {
    Customer: ['cust-001', 'cust-002', 'cust-003'],
    Agent: ['agent-001', 'agent-002', 'agent-003'],
    Merchant: ['merchant-001', 'merchant-002', 'merchant-003'],
  };

  const handleTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleIdChange = (e) => {
    setId(e.target.value);
    setSuggestions(mockSuggestions[userType] || []);
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    const payload = { userType, id, title, description, imageURL };
    console.log("Confirmed Payload", payload);
  };

  const handleCancel = () => {
    setUserType('customer');
    setId('');
    setTitle('');
    setDescription('');
    setURL('');
    setSuggestions([]);
  };

  const handleNotificationImageChange = (e) => {
    const file = e.target.files[0];
    setNotificationFile(file);
    setNotificationPreviewURL(URL.createObjectURL(file));
  };

  return (
    <>
      <Sidebar />
      <div className="w-full h-screen pl-[300px] bg-gray-100">
        <div className="flex justify-end p-4 gap-10">
          <BellOutlined className="text-2xl text-gray-500" />
          <div className="relative">
            <input
              type="search"
              name="search"
              placeholder="Search"
              className="bg-white h-10 px-10 pr-10 rounded-full text-sm focus:outline-none mr-3"
            />
            <button type="submit" className="absolute right-0 top-0 mt-2 mr-4">
              <SearchOutlined className="text-xl text-gray-600" />
            </button>
          </div>
        </div>
        <div className="flex flex-col mx-[30px] mt-[20px] gap-2">
          <h1 className="font-bold">Alert Notification</h1>
          <h1>This feature is give alert, remind an individual customer or agent or merchant</h1>
        </div>
        <div className="bg-white p-12 rounded-lg mt-[40px] mx-5">
          <form onSubmit={handleConfirm}>
            <div className="flex flex-col gap-6 ">
              <div className="flex items-center">
                <label className="block text-gray-700">Type of user</label>
                <div className="flex space-x-24 ml-[128px]">
                  {['Customer', 'Agent', 'Merchant'].map((type) => (
                    <label key={type} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="userType"
                        value={type}
                        checked={userType === type}
                        onChange={handleTypeChange}
                        className="form-radio"
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center">
                <label htmlFor="id" className="text-gray-500">ID</label>
                <input
                  type="text"
                  id="id"
                  name="id"
                  value={id}
                  onChange={handleIdChange}
                  className="border-2 border-gray-300 rounded p-2 w-[45%] ml-[200px]"
                  list='suggestions'
                />
                <datalist id="suggestions">
                  {suggestions.map((suggestion, index) => (
                    <option key={index} value={suggestion} />
                  ))}
                </datalist>
              </div>

              <div className="flex items-center">
                <label htmlFor="title" className="text-gray-500">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={handleInputChange(setTitle)}
                  className="border-2 border-gray-300 rounded p-2 w-[45%] ml-[185px]"
                />
              </div>

              <div className="flex items-center">
                <label htmlFor="description" className="w-[215px] text-gray-500">Description (This note will be shown in Notification)</label>
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={handleInputChange(setDescription)}
                  className="border-2 border-gray-300 rounded p-2 w-[45%]"
                />
              </div>

              <div className="flex items-center">
                <label className="text-gray-500">Image (342px x 160px)</label>
                <div className="flex items-center gap-[30px]">
                  {!notificationPreviewURL && (
                    <div className="bg-gray-400 ml-[55px] mt-0.5 h-20 w-20 rounded-md" />
                  )}
                  {notificationPreviewURL && (
                    <figure className="mt-0.5 h-20 w-20 rounded-md relative">
                      <img
                        src={notificationPreviewURL}
                        alt="profile"
                        className="w-full rounded h-full object-cover"
                      />
                    </figure>
                  )}
                  <input
                    type="file"
                    name="notificationImage"
                    id="notificationImage"
                    className="hidden"
                    onChange={handleNotificationImageChange}
                  />
                  <label htmlFor="notificationImage" className="cursor-pointer">
                    <MdCameraAlt
                      className="bg-teal-800 text-[40px] text-white p-6 h-20 w-20 mt-0.5 rounded-md"
                      size={30}
                    />
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  className="bg-cyan-50 py-2 px-8 rounded-md"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className="bg-teal-700 text-white py-2 px-10 rounded-md"
                  type="submit"
                >
                  Confirm
                </button>
              </div>
            </div>
          </form>
        </div>
        <div>
          <p className="font-bold mx-[30px]">Alert Notification log</p>
          <div className="bg-white mx-9 rounded-lg mt-5 flex p-8 justify-between">
            <select
              name="type"
              // value={type}
              // onChange={handleInputChange}
              defaultValue=""
            >
              <option hidden value="">Type of user</option>
              <option value="customer">Customer</option>
              <option value="agent">Agent</option>
              <option value="merchant">Merchant</option>
            </select>
            <div>
              <FilterAltOutlinedIcon className="text-gray-500" />
              <input
                type="search"
                name="search"
                placeholder="Search alert notification name"
                className="bg-gray-100 h-10 px-5 pr-10 rounded-full ml-5 w-72 text-sm focus:outline-none"
              />
              <button type="submit" className="absolute right-16 mt-2">
                <SearchOutlined className="text-xl text-gray-600" />
              </button>
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr>
                {["Title", "ID", "Description", "Image", "Action"].map((header) => (
                  <th
                    key={header}
                    className="bg-teal-800 text-white h-[70px] text-center w-screen"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="text-center bg-white h-20">
                <td>{title}</td>
                <td>{id}</td>
                <td>{description}</td>
                <td></td>
                <td>
                  <button>
                    <DeleteOutlined className="text-red-500" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AlertNotification;
