// ./src/utils/AuthGuard.js

import React, { useEffect } from 'react';
import { useNavigate, useLocation, useHistory } from 'react-router-dom';
import { getToken, removeToken } from './mutators'; // Adjust the path as needed
import axios from 'axios';

const apiClient = axios.create({
    baseURL: `${window.location.origin}/api/`,
});

// Add a request interceptor
apiClient.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            console.log('Unauthorized! Logging out...');
            removeToken();
            window.location.href = '/login/'; // Redirect to login page
        }
        return Promise.reject(error);
    }
);

const AuthGuard = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = getToken();

    // Define auth pages that should be accessible without authentication
    const isAuthPage = ['/login/', '/register/'].includes(location.pathname.toLowerCase());

    // Check for authentication on every route change
    useEffect(() => {
        // If not authenticated and trying to access a protected route, redirect to login
        if (!token && !isAuthPage) {
            console.log("Redirecting to login due to missing token.");
            navigate('/login/'); // Redirect to login if not authenticated
        }

        // If authenticated and trying to access auth pages, redirect to home or dashboard
        if (token && isAuthPage) {
            navigate('/home/'); // Redirect to home (or any other page) if already logged in
        }
    }, [ token, isAuthPage, navigate, location.pathname ]);

    return <>{children}</>; // Render child components if the token is present
};

export { AuthGuard, apiClient }; // Export the AuthGuard and apiClient
