// src/AppContext.js
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [appState, setAppState] = useState({}); // State to hold your data

    const updateState = (data) => {
        setAppState((prev) => ({ ...prev, ...data })); // Merge with existing state
    };

    return (
        <AppContext.Provider value={{ appState, updateState }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
