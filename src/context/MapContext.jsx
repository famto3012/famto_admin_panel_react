import React, { createContext, useContext, useState } from "react";

const MapContext = createContext();

export const useMap = () => {
  return useContext(MapContext);
};

export const MapProvider = ({ children }) => {
  const [map, setMap] = useState(null);
  const [mapTwo, setMapTwo] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [coordinatesTwo, setCoordinatesTwo] = useState(null);

  return (
    <MapContext.Provider
      value={{
        map,
        setMap,
        mapTwo,
        setMapTwo,
        coordinates,
        setCoordinates,
        coordinatesTwo,
        setCoordinatesTwo,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
