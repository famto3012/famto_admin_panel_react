// src/components/AddGeofenceModal.js
import React, { useRef, useState, useEffect } from "react";
import { Modal } from "antd";
import { mappls } from "mappls-web-maps";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";

const AddGeofenceModal = ({ isModalVisible, handleOk, handleCancel, setMapAddObject }) => {
    
  const mapAddContainerRef = useRef(null);
  const [color, setColor] = useState("#4931a0"); // default color
  const [geofences, setGeofences] = useState({});

  useEffect(() => {
    console.log("Modal visibility changed: ", isModalVisible);
    console.log("mapAddContainerRef current:", mapAddContainerRef.current);
  
    if (isModalVisible && mapAddContainerRef.current) {
      const mapProps = {
        center: [8.528818999999999, 76.94310683333333],
        traffic: true,
        zoom: 12,
        geolocation: true,
        clickableIcons: true,
      };
  
      const mapplsClassObject = new mappls();
  
      mapplsClassObject.initialize(
        "9a632cda78b871b3a6eb69bddc470fef",
        async () => {
            console.log("Initializing map...");
          try {
            const map = await mapplsClassObject.Map({
              id: "modalMap",
              properties: mapProps,
            });
  
            if (map && typeof map.on === "function") {
                console.log("Map initialized successfully.");
              map.on("load", () => {
                setMapAddObject(map);
                console.log("Map loaded.");
              });
            } else {
              console.error("mapObject.on is not a function or mapObject is not defined");
            }
          } catch (error) {
            console.error("Error initializing map:", error);
          }
        }
      );
    } else {
      console.error("Map container not found or modal not visible");
    }
  }, [isModalVisible]);

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleInputChange = (e) => {
    setGeofences({ ...geofences, [e.target.name]: e.target.value });
  };

  const signupAction = (e) => {
    e.preventDefault();
    const location = { geofences, color };
    console.log("Confirmed Location", location);
  };

  return (
    <Modal
      onOk={handleOk}
      onCancel={handleCancel}
      open={isModalVisible}
      width="1000px"
      height="500px"
      centered
      footer={null}
      title="Add Geofence"
    >
      <div className="flex justify-center">
        <form onSubmit={signupAction} className="w-[30%] h-[500px] me-5">
          <div className="flex flex-col gap-3 ">
            <div>
              <label className="w-1/3 text-md font-medium" htmlFor="regionName">
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
              <label className="w-1/3 text-md font-medium" htmlFor="regionName">
                Region name
              </label>
              <input
                type="text"
                name="regionName"
                placeholder="Region Name"
                className=" w-full p-2 bg-white mt-3 rounded focus:outline-none outline-none border border-gray-300"
                value={geofences.name || ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="w-1/3 text-md font-medium" htmlFor="regionDescription">
                Region description
              </label>
              <input
                type="text"
                name="regionDescription"
                placeholder="Region Description"
                className=" w-full p-2 bg-white mt-3 rounded focus:outline-none outline-none border border-gray-300"
                value={geofences.description || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="bg-cyan-50 px-7 py-1 rounded-md"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="bg-teal-700 text-white px-8 py-1 rounded-md"
                type="submit"
              >
                Save
              </button>
            </div>
          </div>
        </form>
        <div
          id="modalMap"
          ref={mapAddContainerRef}
          style={{ width: "70%", height: "480px", display: "inline-block" }}
        ></div>
      </div>
    </Modal>
  );
};

export default AddGeofenceModal;
