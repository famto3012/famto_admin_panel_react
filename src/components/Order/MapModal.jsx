// import { Modal } from "antd";
// import { mappls, mappls_plugin } from "mappls-web-maps";
// import { useEffect, useRef, useState } from "react";

// const mapplsClassObject = new mappls();
// const mapplsPluginObject = new mappls_plugin();

// const PlaceSearchPlugin = ({ map }) => {
//   const placeSearchRef = useRef(null);
//   const markerRef = useRef(null);

//   useEffect(() => {
//     if (map && placeSearchRef.current) {
//       mapplsClassObject.removeLayer({ map, layer: placeSearchRef.current });
//     }

//     const optional_config = {
//       location: [28.61, 77.23],
//       region: "IND",
//       height: 300,
//     };

//     const callback = (data) => {
//       console.log(data);
//       if (data) {
//         const dt = data[0];
//         if (!dt) return false;
//         const eloc = dt.eLoc;
//         const place = `${dt.placeName}`;
//         if (markerRef.current) markerRef.current.remove();
//         mapplsPluginObject.pinMarker(
//           {
//             map: map,
//             pin: eloc,
//             popupHtml: place,
//             popupOptions: {
//               openPopup: true,
//             },
//             zoom: 5,
//           },
//           (data) => {
//             markerRef.current = data;
//             markerRef.current.fitbounds();
//           }
//         );
//         markerRef.current.remove();
//       }
//     };

//     placeSearchRef.current = mapplsPluginObject.search(
//       document.getElementById("auto"),
//       optional_config,
//       callback
//     );

//     return () => {
//       if (map && placeSearchRef.current) {
//         mapplsClassObject.removeLayer({ map, layer: placeSearchRef.current });
//       }
//     };
//   }, [map]);

//   return null;
// };

// const MapModal = ({ isVisible, onClose, setCoordinates }) => {
//   const mapRef = useRef(null);
//   const markerRef = useRef(null);
//   const [isMapLoaded, setIsMapLoaded] = useState(false);

//   useEffect(() => {
//     console.log(isVisible);
//     let newMap = null;

//     const initializeMap = () => {
//       mapplsClassObject.initialize(
//         "e3b1b0ac-d4ef-44b3-a04e-a90f3c6e750c",
//         { map: true, plugins: ["search"] },
//         () => {
//           console.log("initializing map");

//           newMap = mapplsClassObject.Map({
//             id: "map",
//             properties: {
//               center: [8.5892862, 76.8773566],
//               draggable: true,
//               zoom: 12,
//               backgroundColor: "#fff",
//               heading: 100,
//               traffic: true,
//               geolocation: false,
//               disableDoubleClickZoom: true,
//               fullscreenControl: true,
//               scrollWheel: true,
//               scrollZoom: true,
//               rotateControl: true,
//               scaleControl: true,
//               zoomControl: true,
//               clickableIcons: true,
//               indoor: true,
//               indoor_position: "bottom-left",
//               tilt: 30,
//             },
//           });

//           console.log("initializing completed");

//           if (newMap && typeof newMap.on === "function") {
//             mapRef.current = newMap;

//             newMap.on("load", () => {
//               setIsMapLoaded(true);
//               console.log("Map loaded.");
//             });

//             newMap.on("click", (event) => {
//               const { lat, lng } = event.lngLat;

//               if (markerRef.current) {
//                 markerRef.current.remove();
//               }

//               const newMarker = mapplsClassObject.Marker({
//                 map: newMap,
//                 position: { lat, lng },
//                 draggable: false,
//               });

//               markerRef.current = newMarker;
//               setCoordinates({ latitude: lat, longitude: lng });
//               console.log(
//                 `Marker added at latitude: ${lat}, longitude: ${lng}`
//               );
//             });
//           }
//         }
//       );
//     };

//     if (isVisible) {
//       initializeMap();
//     }

//     return () => {
//       newMap = null;
//     };
//   }, [isVisible]);

//   return (
//     <Modal
//       open={isVisible}
//       onCancel={onClose}
//       title="Select Location"
//       footer={null}
//       width="50%"
//       centered
//     >
//       <div id="map" className="h-[500px] relative">
//         <input
//           type="text"
//           id="auto"
//           name="auto"
//           className="mt-2 ms-2 w-[300px] absolute top-0 left-0 text-[15px] p-[10px] outline-none focus:outline-none"
//           placeholder="Search places"
//           spellCheck="false"
//         />
//         {isMapLoaded && <PlaceSearchPlugin map={mapRef.current} />}
//       </div>
//     </Modal>
//   );
// };

// export default MapModal;

// ===============

import { Modal } from "antd";
import { mappls, mappls_plugin } from "mappls-web-maps";
import { useEffect, useRef, useState } from "react";

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

const MapModal = ({ isVisible, onClose, setCoordinates }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const initializeMap = () => {
        mapplsClassObject.initialize(
          "e3b1b0ac-d4ef-44b3-a04e-a90f3c6e750c",
          { map: true, plugins: ["search"] },
          () => {
            console.log("initializing map");

            const newMap = mapplsClassObject.Map({
              id: "map",
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

            console.log("initializing completed");

            if (newMap && typeof newMap.on === "function") {
              mapRef.current = newMap;

              newMap.on("load", () => {
                setIsMapLoaded(true);
                console.log("Map loaded.");
              });

              newMap.on("click", (event) => {
                const { lat, lng } = event.lngLat;

                if (markerRef.current) {
                  markerRef.current.remove();
                }

                const newMarker = mapplsClassObject.Marker({
                  map: newMap,
                  position: { lat, lng },
                  draggable: false,
                });

                markerRef.current = newMarker;
                setCoordinates({ latitude: lat, longitude: lng });
                console.log(
                  `Marker added at latitude: ${lat}, longitude: ${lng}`
                );
              });
            }
          }
        );
      };

      initializeMap();

      return () => {
        mapRef.current = null;
      };
    }
  }, [isVisible]);

  return (
    <Modal
      open={isVisible}
      onCancel={onClose}
      title="Select Location"
      footer={null}
      width="50%"
      centered
    >
      <div id="map" className="h-[500px] relative">
        <input
          type="text"
          id="auto"
          name="auto"
          className="mt-2 ms-2 w-[300px] absolute top-0 left-0 text-[15px] p-[10px] outline-none focus:outline-none"
          placeholder="Search places"
          spellCheck="false"
        />
        {isMapLoaded && <PlaceSearchPlugin map={mapRef.current} />}
      </div>
    </Modal>
  );
};

export default MapModal;
