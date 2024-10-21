// src/utils/navigation.js
import { useNavigate } from 'react-router-dom';

export const navigateWithState = (navigate, updateState, stateData, url) => {
    console.log('THIS IS TESTING OF NAVIGATE WITH STATE FUNCTIONAL ', stateData, url);
    updateState(stateData); // Update the global state with the passed data
    navigate(url);
};