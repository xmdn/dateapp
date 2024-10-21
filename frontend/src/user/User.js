// src/User.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './user.css'; // Make sure to include your CSS
import SharedApp from '../SharedApp'; // Import your shared routing logic
import reportWebVitals from '../reportWebVitals';
import ErrorBoundary from '../ErrorBoundary'; // Optional: Add ErrorBoundary if needed
import { AppProvider } from '../AppContext';

// Define the User component directly in this file
const User = () => {
    return (
        <AppProvider>
            <div>
                <SharedApp isAdmin={false} />
            </div>
        </AppProvider>
    );
};

// Main entry point for the React application
const container = document.getElementById('root');
const root = createRoot(container); // Create a root for the app
root.render(
    <ErrorBoundary> {/* Optional: Wrap your application with ErrorBoundary */}
        <BrowserRouter>
            <User />
        </BrowserRouter>
        
    </ErrorBoundary>
);

// Performance measuring function (optional)
reportWebVitals();