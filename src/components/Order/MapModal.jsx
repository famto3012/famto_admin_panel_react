import { Modal } from "antd";
import { mappls } from "mappls-web-maps";
import { useEffect, useRef, useState } from "react";

const MapModal = ({ isVisible, onClose, setCoordinates }) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    if (isVisible && mapContainerRef.current && !mapInstanceRef.current) {
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
          const map = await mapplsClassObject.Map({
            id: mapContainerRef.current.id,
            properties: mapProps,
          });

          if (map && typeof map.on === "function") {
            mapInstanceRef.current = map;

            map.on("load", () => {
              console.log("Map loaded.");
            });

            map.on("click", (event) => {
              const { lat, lng } = event.latlng;

              if (marker) {
                marker.setLatLng([lat, lng]);
              } else {
                const newMarker = map.marker([lat, lng]).addTo(map);
                setMarker(newMarker);
              }

              setCoordinates({ latitude: lat, longitude: lng });
            });
          }
        }
      );
    }

    return () => {
      if (!isVisible && mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isVisible]);

  return (
    <Modal
      open={isVisible}
      onCancel={onClose}
      title="Select Location"
      footer={null}
      width="50%"
    >
      <div
        id="map"
        ref={mapContainerRef}
        style={{ height: "400px", width: "100%" }}
      ></div>
    </Modal>
  );
};

export default MapModal;
