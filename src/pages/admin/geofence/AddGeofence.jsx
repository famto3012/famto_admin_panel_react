import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { BellOutlined, SearchOutlined } from "@ant-design/icons";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";

const AddGeofence = () => {
  const [geofence, setIsGeofence] = useState({
    regionName: "",
    regionDescription: "",
  });
  const [color, setColor] = useState("#4931a0"); // default color

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleInputChange = (e) => {
    setIsGeofence({ ...geofence, [e.target.name]: e.target.value });
  };

  const signupAction = (e) => {
    e.preventDefault();
    const location = { geofence, color };
    console.log("Confirmed Location", location);
  };
  return (
    <>
      <Sidebar />
      <div className="w-full min-h-screen pl-[300px] bg-gray-100 flex flex-col">
        <div className="flex justify-end p-4 gap-7">
          <BellOutlined className="text-2xl text-gray-500" />
          <div className="relative">
            <input
              type="search"
              name="search"
              placeholder="Search"
              className="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none mr-5"
            />
            <button type="submit" className="absolute right-0 top-0 mt-2 mr-9">
              <SearchOutlined className="text-xl text-gray-600" />
            </button>
          </div>
        </div>
        <h1 className="font-bold text-lg mx-10">Geofence</h1>
        <div className="flex justify-between gap-3">
          <div className="mt-8 p-6 bg-white  rounded-lg shadow-sm w-1/3 ms-10">
            <form onSubmit={signupAction}>
              <div className="flex flex-col gap-3 ">
                <div>
                  <label
                    className="w-1/3 text-md font-medium"
                    htmlFor="regionName"
                  >
                    Colour
                  </label>
                  <div className="relative rounded-full">
                    <input
                      type="color"
                      className="appearance-none w-full h-12 rounded outline-none focus:outline-none mt-2"
                      style={{ WebkitAppearance: "none" }}
                      value={color}
                      onChange={handleColorChange}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <ColorLensOutlinedIcon className=" text-white text-[25px]" />
                    </div>
                  </div>
                </div>
                <div>
                  <label
                    className="w-1/3 text-md font-medium"
                    htmlFor="regionName"
                  >
                    Region name
                  </label>
                  <input
                    type="text"
                    name="regionName"
                    placeholder="Region Name"
                    className=" w-full p-2 bg-white mt-3 rounded focus:outline-none outline-none border border-gray-300"
                    value={geofence.regionName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    className="w-1/3 text-md font-medium"
                    htmlFor="regionDescription"
                  >
                    Region description
                  </label>
                  <input
                    type="text"
                    name="regionDescription"
                    placeholder="Region Description"
                    className=" w-full p-2 bg-white mt-3 rounded focus:outline-none outline-none border border-gray-300"
                    value={geofence.regionDescription}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    className="bg-cyan-50 px-7 py-1 rounded-md"
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-teal-700 text-white px-8 py-1 rounded-md"
                    type="submit"
                    onClick={signupAction}
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="flex mx-10 mb-24">
            <img src="addGeofence.svg" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddGeofence;
