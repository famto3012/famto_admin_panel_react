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

const MapModal = ({ isVisible, onClose, BASE_URL, token, location }) => {
  const { map, setMap, setMapTwo, setCoordinatesTwo, setCoordinates } =
    useMap(); // Use the context
  const markerRefOne = useRef(null);
  const markerRefTwo = useRef(null);
  const mapContainerRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [authToken, setAuthToken] = useState(null);

  // Assuming the map object stores the container reference under a property like `_container`
  function getContainer(map) {
    if (!map) {
      throw new Error("Map instance is not available.");
    }

    // Check if the map object has a method or property to get the container
    if (map._container) {
      return map._container; // Assuming the container is stored in a property named `_container`
    } else if (typeof map.getContainer === "function") {
      return map.getContainer(); // If there's an existing getContainer method provided by the API
    } else {
      throw new Error("Unable to determine the container element.");
    }
  }

  const initializeMap = () => {
    if (map) {
      try {
        const currentContainer = getContainer(map);

        if (currentContainer !== mapContainerRef.current) {
          var container = document.getElementById(mapContainerRef.current.id);
          container.parentNode.replaceChild(currentContainer, container);

          // Reattach map to the correct container if it's not already attached
          //map.setContainer(currentContainer);
        }
      } catch (error) {
        console.error("Error getting map container:", error.message);
      }

      setIsMapLoaded(true);

      // Place initial marker if location prop is provided
      // let newMarker;

      // if (location) {
      //   console.log("true");
      //   const { lat, lng } = location;
      //   console.log(lat, lng);
      //   newMarker = mapplsClassObject.Marker({
      //     map: newMap,
      //     position: { lat, lng },
      //     draggable: false,
      //   });
      // }
    } else {
      // Initialize a new map instance if none exists
      mapplsClassObject.initialize(
        // authToken,
        "6f8ee816-8dc8-42bc-8690-58c85c12deec",
        { map: true, plugins: ["search"] },
        () => {
          const newMap = mapplsClassObject.Map({
            id: mapContainerRef.current.id, // Use the ref's id for initialization
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
          const newMapTwo = mapplsClassObject.Map({
            id: "map1", // Use the ref's id for initialization
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

          if (newMap && typeof newMap.on === "function") {
            setMapTwo(newMapTwo);
            setMap(newMap); // Save the map instance in context
            setIsMapLoaded(true);
            if (location) {
              const { lat, lng } = location;

              newMarker = mapplsClassObject.Marker({
                map: newMap,
                position: { lat, lng },
                draggable: false,
              });
            }

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
            });
          }
        }
      );
    }
  };

  useEffect(() => {
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
            setAuthToken(response.data.data);
          }
        } catch (err) {
          console.log(`Error in getting auth token`);
        }
      };

      getAuthToken();
      initializeMap(); // Initialize map when modal is visible
    }

    return () => {
      if (!isVisible && map) {
        setIsMapLoaded(false);
      }
    };
  }, [isVisible, map]);

  return (
    <Modal
      open={isVisible}
      onCancel={onClose}
      title="Select Location (Mark your location in the map)"
      footer={null}
      width="50%"
      centered
    >
      <div id="map" className="h-[500px] relative" ref={mapContainerRef}>
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
        <>
          <Button onClick={initializeMap} className="mt-2">
            Initialize Map
          </Button>
          <div id="map1" className="h-[500px] relative"></div>
        </>
      )}
    </Modal>
  );
};

export default MapModal;
