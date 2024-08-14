import { Modal, Button } from "antd";
import { mappls, mappls_plugin } from "mappls-web-maps";
import { useContext, useEffect, useRef, useState } from "react";
import { useMap } from "../../context/MapContext";
import { UserContext } from "../../context/UserContext";

const mapplsClassObject = new mappls();
const mapplsPluginObject = new mappls_plugin();
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

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
      console.log(data);
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
            zoom: 5,
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

const MapModalTwo = ({ isVisible, onClose, authToken }) => {
  const { mapTwo, setMapTwo, setMap, setCoordinatesTwo, setCoordinates } = useMap(); // Use the context
  const { token } = useContext(UserContext);
  const markerRefOne = useRef(null);
  const markerRefTwo = useRef(null);
  const mapContainerTwoRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapToken, setMapToken] = useState(null);

  // Assuming the map object stores the container reference under a property like `_container`
  function getContainer(mapTwo) {
    if (!mapTwo) {
      throw new Error("Map instance is not available.");
    }

    // Check if the map object has a method or property to get the container
    if (mapTwo._container) {
      console.log("Map container found");
      return mapTwo._container; // Assuming the container is stored in a property named `_container`
    } else if (typeof mapTwo.getContainer === "function") {
      return mapTwo.getContainer(); // If there's an existing getContainer method provided by the API
    } else {
      throw new Error("Unable to determine the container element.");
    }
  }

  const initializeMapTwo = () => {
    console.log(mapTwo)
    if (mapTwo) {
      console.log("Using existing map instance.");

      try {
        const currentContainer = getContainer(mapTwo);
        console.log("Current container", currentContainer);
        console.log("mapContainerRef.current", mapContainerTwoRef.current);
        console.log("mapContainerRef.current.id", mapContainerTwoRef.current.id);

        if (currentContainer !== mapContainerTwoRef.current) {
          console.log("Reattaching map to the new container.");
          var container = document.getElementById(mapContainerTwoRef.current.id);
          container.parentNode.replaceChild(currentContainer, container);
          console.log("Container removed.");
          // Reattach map to the correct container if it's not already attached
          //map.setContainer(currentContainer);
        }
      } catch (error) {
        console.error("Error getting map container:", error.message);
      }

      setIsMapLoaded(true);
    } else {
      console.log("here")
      // Initialize a new map instance if none exists
      mapplsClassObject.initialize(
        "6fcce361-c982-481f-943f-76c303e2bf34",
        { map: true, plugins: ["search"] },
        () => {
          console.log("Initializing new map instance.");

          const newMapTwo = mapplsClassObject.Map({
            id: mapContainerTwoRef.current.id, // Use the ref's id for initialization
            properties: {
              center: [8.5892862, 76.8773566],
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
          const newMap = mapplsClassObject.Map({
            id: "map", // Use the ref's id for initialization
            properties: {
              center: [8.5892862, 76.8773566],
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

          console.log("Map two initialized", newMapTwo);
          console.log("Map initialized", newMap);

          if (newMapTwo && typeof newMapTwo.on === "function") {
            setMapTwo(newMapTwo); // Save the map instance in context
            setMap(newMap)
            setIsMapLoaded(true);

            newMapTwo.on("click", (event) => {
              const { lat, lng } = event.lngLat;

              if (markerRefTwo.current) {
                markerRefTwo.current.remove();
              }

              const newMarker = mapplsClassObject.Marker({
                map: newMapTwo,
                position: { lat, lng },
                draggable: false,
              });

              markerRefTwo.current = newMarker;
              setCoordinatesTwo({ latitude: lat, longitude: lng });
              console.log(
                `Marker added on MapTwo at latitude: ${lat}, longitude: ${lng}`
              );
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
              });

              markerRefOne.current = newMarker;
              setCoordinates({ latitude: lat, longitude: lng });
              console.log(
                `Marker added on MapOne at latitude: ${lat}, longitude: ${lng}`
              );
            });
          }
        }
      );
    }
  };

  useEffect(() => {
    // console.log(token)
    // console.log(BASE_URL)
    if (isVisible) {
      const getAuthToken = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/token/get-auth-token`, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 200) {
            setMapToken(response.data.data);
            console.log(`AUTH TOKEN: ${response.data.data}`);
          }
        } catch (err) {
          console.log(`Error in getting auth token`);
        }
      };

      getAuthToken();
      initializeMapTwo(); // Initialize map when modal is visible
    }

    return () => {
      if (!isVisible && mapTwo) {
        setIsMapLoaded(false);
      }
    };
  }, [isVisible, authToken, mapTwo]);

  return (
    <Modal
      open={isVisible}
      onCancel={onClose}
      title="Select Location"
      footer={null}
      width="50%"
      centered
    >
      <div id="map1" className="h-[500px] relative" ref={mapContainerTwoRef}>
        <input
          type="text"
          id="auto1"
          name="auto"
          className="mt-2 ms-2 w-[300px] absolute top-0 left-0 text-[15px] p-[10px] outline-none focus:outline-none"
          placeholder="Search places"
          spellCheck="false"
        />
        {isMapLoaded && <PlaceSearchPlugin map={mapTwo} />}
      </div>
      {!isMapLoaded && (
        <>
        <Button onClick={initializeMapTwo} className="mt-2">
          Initialize Map
        </Button>
        <div id="map" className="h-[500px] relative"></div>
        </>
      )}
    </Modal>
  );
};

export default MapModalTwo;
