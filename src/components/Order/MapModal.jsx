import { Modal, Button } from "antd";
import { mappls, mappls_plugin } from "mappls-web-maps";
import { useEffect, useRef, useState } from "react";
import { useMap } from "../../context/MapContext";
import axios from "axios";

const mapplsClassObject = new mappls();
const mapplsPluginObject = new mappls_plugin();

const PlaceSearchPlugin = ({ map }) => {
  const placeSearchRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (map && placeSearchRef.current) {
      mapplsClassObject.removeLayer({ map, layer: placeSearchRef.current });
    }

    const optional_config = {
      location: [28.61, 77.23],
      region: "IND",
      height: 300,
    };

    const callback = (data) => {
      if (data) {
        const dt = data[0];
        if (!dt) return false;
        const eloc = dt.eLoc;
        const place = `${dt.placeName}`;
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
          (data) => {
            markerRef.current = data;
            markerRef.current.fitbounds();
          }
        );
        markerRef.current.remove();
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

const MapModal = ({
  isVisible,
  onClose,
  BASE_URL,
  token,
  location,
  modalId,
}) => {
  const { map, setMap, setCoordinates, setCoordinatesTwo, coordinates } =
    useMap(); // Use the context
  const markerRefOne = useRef(null);
  const mapContainerRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [authToken, setAuthToken] = useState(null);

  // Function to clean up map resources
  const cleanupMap = () => {
    if (markerRefOne.current) {
      markerRefOne.current.remove();
      markerRefOne.current = null;
    }
    if (map) {
      map.removeLayer(); // This method removes the map and clears its associated resources
      setMap(null); // Reset the map state in your context
    }
  };

  const initializeMap = () => {
    // Cleanup existing map before initializing a new one
    cleanupMap();

    mapplsClassObject.initialize(
      authToken,
      { map: true, plugins: ["search"] },
      () => {
        const newMap = mapplsClassObject.Map({
          id: `map-container-${modalId}`, // Ensure each modal has a unique id
          properties: {
            center:
              location?.length === 2
                ? [location[0], location[1]]
                : [8.5892862, 76.8773566],
            draggable: true,
            zoom: 12,
            backgroundColor: "#fff",
            heading: 100,
            traffic: true,
            geolocation: false,
            disableDoubleClickZoom: true,
            fullscreenControl: true,
            scrollWheel: true,
            scrollZoom: true,
            rotateControl: true,
            scaleControl: true,
            zoomControl: true,
            clickableIcons: true,
            indoor: true,
            indoor_position: "bottom-left",
            tilt: 30,
          },
        });

        if (newMap && typeof newMap.on === "function") {
          setMap(newMap); // Save the map instance in context
          setIsMapLoaded(true);

          newMap.on("load", () => {
            if (location) {
              mapplsClassObject.Marker({
                map: newMap,
                position: { lat: location[0], lng: location[1] },
                draggable: false,
              });
            }
          });

          newMap.on("click", (event) => {
            const { lat, lng } = event.lngLat;

            if (markerRefOne.current) {
              markerRefOne.current.remove();
            }

            const newMarker = mapplsClassObject.Marker({
              map: newMap,
              position: { lat, lng },
              draggable: false,
              icon: "https://firebasestorage.googleapis.com/v0/b/famto-aa73e.appspot.com/o/admin_panel_assets%2Flocation.png?alt=media&token=a3af3a58-a2c9-4eb1-8566-b06df5f14edb",
              width: 35,
              height: 35,
            });

            markerRefOne.current = newMarker;
            if (!coordinates) {
              setCoordinates({ latitude: lat, longitude: lng });
            } else {
              setCoordinatesTwo({ latitude: lat, longitude: lng });
            }
          });
        }
      }
    );
  };

  useEffect(() => {
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

    getAuthToken();
    if (isVisible) initializeMap();

    return () => {
      cleanupMap(); // Clean up the map when the modal is closed
      setIsMapLoaded(false);
    };
  }, [isVisible]);

  return (
    <Modal
      open={isVisible}
      onCancel={onClose}
      title="Select Location (Mark your location in the map)"
      footer={null}
      width="50%"
      centered
    >
      <div
        id={`map-container-${modalId}`}
        className="h-[500px] relative"
        ref={mapContainerRef}
      >
        <input
          type="text"
          id="auto"
          name="auto"
          className="mt-2 ms-2 w-[300px] absolute top-0 left-0 text-[15px] p-[10px] outline-none focus:outline-none"
          placeholder="Search places"
          spellCheck="false"
        />
        {isMapLoaded && <PlaceSearchPlugin map={map} />}
      </div>
      {!isMapLoaded && (
        <Button
          onClick={initializeMap}
          className="mt-2 bg-teal-600 text-[15px] font-bold text-white"
        >
          Initialize Map
        </Button>
      )}
    </Modal>
  );
};

export default MapModal;
