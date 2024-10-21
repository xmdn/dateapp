// ./utils/mutators.js

const TOKEN_KEY = 'authToken'; // Key used to store token in localStorage
const USER_OBJ = 'authUser'; // Key used to store user object in localStorage

// Store the token in localStorage
export const setToken = (token) => {
    console.log('SETTINGS AUTH TOKEN: ', token);
    localStorage.setItem(TOKEN_KEY, token);
};

// Store the user object in localStorage
export const setUser = (user) => {
    console.log('SETTING AUTH USER: ', user);
    localStorage.setItem(USER_OBJ, JSON.stringify(user)); // Save the user object as a JSON string
};

// Retrieve the token from localStorage
export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

// Retrieve the user object from localStorage
export const getUser = () => {
    const user = localStorage.getItem(USER_OBJ);
    return user ? JSON.parse(user) : null; // Parse the JSON string into an object
};

// Remove the token from localStorage (for logout)
export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};

// Remove the user object from localStorage (for logout)
export const removeUser = () => {
    localStorage.removeItem(USER_OBJ);
};

// Clear all authentication data (token + user) from localStorage
export const clearAuth = () => {
    removeToken();
    removeUser();
    console.log('Auth token and user data cleared.');
};