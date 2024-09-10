import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { mappls, mappls_plugin } from "mappls-web-maps";

import Sidebar from "../../../components/Sidebar";
import GlobalSearch from "../../../components/GlobalSearch";
import { UserContext } from "../../../context/UserContext";

import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import { useToast } from "@chakra-ui/react";

const mapplsClassObject = new mappls();
const mapplsPluginObject = new mappls_plugin();

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const PlaceSearchPlugin = ({ map }) => {
  const placeSearchRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    console.log("MAP", map);

    if (map && placeSearchRef.current) {
      mapplsClassObject.removeLayer({ map, layer: placeSearchRef.current });
    }

    const optional_config = {
      location: [28.61, 77.23],
      region: "IND",
      height: 300,
    };

    const callback = (data) => {
      if (data && data.length > 0) {
        const dt = data[0];
        if (!dt) return false;

        const eloc = dt.eLoc;
        const place = `${dt.placeName}`;

        console.log("Search Data:", dt);

        if (markerRef.current) markerRef.current.remove();

        mapplsPluginObject.pinMarker(
          {
            map: map,
            pin: eloc,
            popupHtml: place,
            popupOptions: {
              openPopup: true,
            },
            zoom: 10,
          },
          (marker) => {
            markerRef.current = marker;
            markerRef.current.fitbounds();
          }
        );
        markerRef.current.remove();
      } else {
        console.warn("No search results found", data);
      }
    };

    placeSearchRef.current = mapplsPluginObject.search(
      document.getElementById("auto"),
      optional_config,
      callback
    );

    return () => {
      if (map && placeSearchRef.current) {
        mapplsClassObject.removeLayer({ map, layer: placeSearchRef.current });
      }
    };
  }, [map]);

  return null;
};

const AddGeofence = () => {
  const [newGeofence, setNewGeofence] = useState({
    name: "",
    description: "",
    color: "",
    coordinates: [],
  });
  const [geofences, setGeofences] = useState({});
  const [color, setColor] = useState("#4931a0");
  const [mapObject, setMapObject] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [authToken, setAuthToken] = useState("");

  const mapContainerRef = useRef(null);
  const toast = useToast();

  let drawData, geoJSON, polyArray;

  const { token } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getInitialData = async () => {
      const [authTokenResponse, allGeofenceResponse] = await Promise.all([
        axios.get(`${BASE_URL}/token/get-auth-token`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axios.get(`${BASE_URL}/admin/geofence/get-geofence`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (authTokenResponse.status === 200) {
        setAuthToken(authTokenResponse.data.data);
      }

      if (allGeofenceResponse.status === 200) {
        setGeofences(allGeofenceResponse.data.geofences);
      }
    };

    getInitialData();

    if (authToken) {
      const script = document.createElement("script");
      script.src = `https://apis.mappls.com/advancedmaps/api/${authToken}/map_sdk?layer=vector&v=3.0&polydraw&callback=initMap`;
      script.async = true;
      script.onload = () => console.log("Mappls script loaded successfully.");
      script.onerror = () => console.error("Error loading Mappls script.");
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
          map.on("load", () => {
            setMapObject(map);
            setIsMapLoaded(true);

            window.mappls.polygonDraw(
              {
                map: map,
                data: geoJSON,
              },
              function (data) {
                drawData = data;

                drawData.control(true);
                polyArray = drawData.data?.geometry.coordinates[0];

                const formattedCoordinates =
                  drawData?.data?.geometry?.coordinates[0].map(([lng, lat]) => [
                    lat,
                    lng,
                  ]);

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
    }
  }, [authToken]);

  const GeoJsonComponent = ({ map }) => {
    const geoJsonRef = useRef(null);
    const geoJSON = {
      type: "FeatureCollection",
      features: geofences.map((geofence) => ({
        type: "Feature",
        properties: {
          class_id: geofence.id,
          name: geofence.name,
          stroke: geofence.color,
          "stroke-opacity": 0.4,
          "stroke-width": 3,
          fill: geofence.color,
          "fill-opacity": 0.4,
        },
        geometry: {
          type: "Polygon",
          coordinates: [
            geofence.coordinates.map((coord) => [coord[0], coord[1]]),
          ],
        },
      })),
    };

    useEffect(() => {
      if (geoJsonRef.current) {
        window.mappls.removeLayer({ map: map, layer: geoJsonRef.current });
      }
      geoJsonRef.current = window.mappls.addGeoJson({
        map: map,
        data: geoJSON,
        overlap: false,
        fitbounds: true,
        preserveViewport: false,
      });
    }, [map]); // Ensure this only runs when `map` or `geoJSON` change
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
    setNewGeofence({ ...newGeofence, color: event.target.value });
    setGeofences({ ...geofences, color: event.target.value });
  };

  const handleInputChange = (e) => {
    setGeofences({ ...geofences, [e.target.name]: e.target.value });
    setNewGeofence({ ...newGeofence, [e.target.name]: e.target.value });
  };

  const handleAddGeofence = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/admin/geofence/add-geofence`,
        newGeofence,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201) {
        navigate("/geofence");
        toast({
          title: "Success",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
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
        <h1 className="font-bold text-lg mx-10">Add Geofence</h1>
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
                onClick={() => navigate("/geofence")}
                className="w-1/2 bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleAddGeofence}
                className="w-1/2 bg-teal-600 text-white px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Add
              </button>
            </div>
          </div>
          <div className="mt-8 p-6 bg-white rounded-lg shadow-sm w-2/3 me-10">
            <div
              ref={mapContainerRef}
              id="map"
              className="map-container w-full h-[600px]"
            >
              <input
                type="text"
                id="auto"
                name="auto"
                className="mt-2 ms-2 w-[300px] absolute top-0 left-0 text-[15px] p-[10px] outline-none focus:outline-none"
                placeholder="Search places"
                spellCheck="false"
              />
              {isMapLoaded && <PlaceSearchPlugin map={mapObject} />}
            </div>
            {isMapLoaded && geofences.length >= 0 && (
              <GeoJsonComponent map={mapObject} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddGeofence;
