import { useContext, useEffect, useRef, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import GlobalSearch from "../../../components/GlobalSearch";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";
import { useLocation } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const EditGeofence = () => {
  const { token } = useContext(UserContext);
  const [geofences, setGeofences] = useState({});
  const [newGeofence, setNewGeofence] = useState({
    name: "",
    description: "",
    color: "",
    coordinates: [],
  });
  const [color, setColor] = useState("#4931a0");
  const mapContainerRef = useRef(null);
  const [mapObject, setMapObject] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const toast = useToast();
  let map, drawData, geoJSON, polyArray;

  const [authToken, setAuthToken] = useState("");

  const getAuthToken = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/token/get-auth-token`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setAuthToken(response.data.data);
      }
    } catch (err) {
      console.log(`Error in getting auth token`);
    }
  };

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const id = query.get("id");

  const handleColorChange = (event) => {
    setColor(event.target.value);
    setNewGeofence({ ...newGeofence, color: event.target.value });
    setGeofences({ ...geofences, color: event.target.value });
  };

  const handleInputChange = (e) => {
    setGeofences({ ...geofences, [e.target.name]: e.target.value });
    setNewGeofence({ ...newGeofence, [e.target.name]: e.target.value });
  };

  const signupAction = (e) => {
    e.preventDefault();
    const location = { geofences, color };
    console.log("Confirmed Location", location);
  };

  useEffect(() => {
    getAuthToken();
    console.log("Token", authToken);
    const script = document.createElement("script");
    script.src = `https://apis.mappls.com/advancedmaps/api/${authToken}/map_sdk?layer=vector&v=3.0&polydraw&callback=initMap`;
    script.async = true;
    document.body.appendChild(script);

    window.initMap = () => {
      const map = new window.mappls.Map("map", {
        center: [8.528818999999999, 76.94310683333333],
        zoomControl: true,
        geolocation: false,
        fullscreenControl: false,
        zoom: 12,
      });

      if (map && typeof map.on === "function") {
        console.log("Map initialized successfully.");

        map.on("load", () => {
          console.log("Map loaded.");
          setMapObject(map);
          setIsMapLoaded(true);

          window.mappls.polygonDraw(
            {
              map: map,
              data: geoJSON,
            },
            function (data) {
              drawData = data;
              console.log("Mappls Polygon Draw Data:", window.mappls);
              drawData.control(true);
              polyArray = drawData.data?.geometry.coordinates[0];
              console.log("Draw Data:", data);

              const formattedCoordinates =
                drawData?.data?.geometry?.coordinates[0].map(([lng, lat]) => [
                  lat,
                  lng,
                ]);
              console.log("Formatted Coordinates:", formattedCoordinates);

              setNewGeofence((prevState) => ({
                ...prevState,
                coordinates: formattedCoordinates,
              }));
            }
          );
        });
      } else {
        console.error("Map container not found");
      }
    };
  }, [authToken]);

  useEffect(() => {
    getSingleGeofence();
  }, []);

  const getSingleGeofence = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/admin/geofence/get-geofence/${id}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setColor(response.data.geofence.color);
        setGeofences(response.data.geofence);
      }
    } catch (err) {
      console.log("Error in fetching geofences: ", err);
    }
  };

  const GeoJsonComponent = ({ map, geofences, color }) => {
    const geoJsonRef = useRef(null);

    useEffect(() => {
      if (
        !map ||
        !geofences.coordinates ||
        !Array.isArray(geofences.coordinates)
      )
        return;

      // Convert the coordinates to Mappls format
      const pts = geofences.coordinates
        .map((coord) => {
          if (!Array.isArray(coord) || coord.length !== 2) {
            console.error("Invalid coordinate format:", coord);
            return null;
          }
          const [lat, lng] = coord;
          return { lat, lng };
        })
        .filter((coord) => coord !== null);
      console.log("path", pts);

      // Create the polygon
      const poly = window.mappls.Polygon({
        map: map,
        paths: pts,
        fillColor: color,
        fillOpacity: 0.3,
        fitbounds: true,
      });

      // Enable editing of the polygon
      poly.setEditable(true);

      // Function to update coordinates
      const updateCoordinates = () => {
        const newCoordinates = poly
          .getPath()[0]
          .map((point) => [point.lat, point.lng]);
        // console.log("poly", poly.getPath()[0].map((point) => [point.lat, point.lng]))
        console.log("newCoordinates", newCoordinates);

        setGeofences((prevState) => ({
          ...prevState,
          coordinates: newCoordinates,
        }));
      };

      // Add event listeners to capture changes
      poly.addListener("dblclick", updateCoordinates);
    }, [map, geofences, color]);

    return null;
  };

  const editGeofence = async () => {
    try {
      console.log("geofence", geofences);
      const editGeofenceResponse = await axios.put(
        `${BASE_URL}/admin/geofence/edit-geofence/${id}`,
        geofences,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (editGeofenceResponse.status === 200) {
        toast({
          title: "Success",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log("Error in updating geofence: ", err);
      toast({
        title: "Error",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Sidebar />
      <div className="w-full min-h-screen pl-[300px] bg-gray-100 flex flex-col">
        <nav className="p-5">
          <GlobalSearch />
        </nav>
        <h1 className="font-bold text-lg mx-10">Edit Geofence</h1>
        <div className="flex justify-between gap-3">
          <div className="mt-8 p-6 bg-white  rounded-lg shadow-sm w-1/3 ms-10">
            <form>
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
                    Name
                  </label>
                  <div className="relative mt-2">
                    <input
                      type="text"
                      name="name"
                      id="regionName"
                      value={geofences.name || ""}
                      onChange={handleInputChange}
                      className="py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 sm:text-sm w-full"
                    />
                  </div>
                </div>
                <div>
                  <label
                    className="w-1/3 text-md font-medium"
                    htmlFor="regionDescription"
                  >
                    Description
                  </label>
                  <div className="relative mt-2">
                    <textarea
                      name="description"
                      id="regionDescription"
                      value={geofences.description || ""}
                      onChange={handleInputChange}
                      className="py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 sm:text-sm w-full"
                    />
                  </div>
                </div>
              </div>
            </form>
            <div className="flex flex-row gap-2 mt-6">
              <button
                onClick={signupAction}
                className="w-1/2 bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={
                  editGeofence
                }
                className="w-1/2 bg-teal-600 text-white px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                 Update
              </button>
            </div>
          </div>
          <div className="mt-8 p-6 bg-white rounded-lg shadow-sm w-2/3 me-10">
            <div
              ref={mapContainerRef}
              id="map"
              className="map-container w-full h-[600px]"
            ></div>
            {isMapLoaded &&
              geofences.coordinates &&
              Array.isArray(geofences.coordinates) && (
                <GeoJsonComponent
                  map={mapObject}
                  geofences={geofences}
                  color={color}
                />
              )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditGeofence;