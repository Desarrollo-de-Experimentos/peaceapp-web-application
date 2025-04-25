import React, { createContext, useContext, useState } from 'react';

const MapLocationContext = createContext();

export const MapLocationProvider = ({ children }) => {
    const [mapLocation, setMapLocation] = useState(null);
    return (
        <MapLocationContext.Provider value={{ mapLocation, setMapLocation }}>
            {children}
        </MapLocationContext.Provider>
    );
};

export const useMapLocation = () => useContext(MapLocationContext);
