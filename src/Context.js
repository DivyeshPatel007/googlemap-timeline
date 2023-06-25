import React, { createContext, useState } from 'react';

export const MapContext = createContext();

export const MapProvider = ({ children }) => {
    const [userdata, setUserdata] = useState(['']);


    const updatedData = (data) => {
        setUserdata(data);
    };
    return (
        <MapContext.Provider value={{ userdata, updatedData }}>
            {children}
        </MapContext.Provider>
    );
};