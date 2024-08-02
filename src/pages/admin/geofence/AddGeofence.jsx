import { useContext, useEffect, useRef, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import GlobalSearch from "../../../components/GlobalSearch";
import { mappls } from "mappls-web-maps";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";
import { useLocation } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const AddGeofence = ({heading}) => {
  const { token } = useContext(UserContext);
  const [geofences, setGeofences] = useState([]);
  const [color, setColor] = useState("#4931a0");
  const mapContainerRef = useRef(null);
  const [mapObject, setMapObject] = useState(null); // default color 

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const id = query.get('id')

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

  useEffect(() => {
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
        if (mapContainerRef.current) {
          console.log("Initializing map...");
          const map = await mapplsClassObject.Map({
            id: "map",
            properties: mapProps,
          });

          if (map && typeof map.on === "function") {
            console.log("Map initialized successfully.");
            map.on("load", () => {
              console.log("Map loaded.");
              setMapObject(map);
            });
          } else {
            console.error(
              "mapObject.on is not a function or mapObject is not defined"
            );
          }
        } else {
          console.error("Map container not found");
        }
      }
    );
  }, []);

  useEffect(() => {
    if(heading === "Edit Geofence"){
      getSingleGeofence()
    }
   
  }, [])

  const getSingleGeofence = async()=>{
    try {
      console.log(token);
      const response = await axios.get(
        `${BASE_URL}/admin/geofence/get-geofence/${id}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setGeofences(response.data.geofence);
      }
    } catch (err) {
      console.log("Error in fetching geofences: ", err);
    }
  }


  return (
    <>
      <Sidebar />
      <div className="w-full min-h-screen pl-[300px] bg-gray-100 flex flex-col">
        <nav className="p-5">
          <GlobalSearch />
        </nav>
        <h1 className="font-bold text-lg mx-10">{heading}</h1>
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
                    value={geofences.name}
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
                    value={geofences.description}
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
          <div className="w-3/4 mt-[25px] bg-white h-[560px]">
            <div
              id="map"
              ref={mapContainerRef}
              style={{ width: "99%", height: "550px", display: "inline-block" }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddGeofence;
