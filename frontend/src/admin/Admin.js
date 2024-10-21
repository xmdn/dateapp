// src/Admin.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './admin.css'; // Make sure to include your CSS
import SharedApp from '../SharedApp'; // Import your shared routing logic
import reportWebVitals from '../reportWebVitals';
import ErrorBoundary from '../ErrorBoundary'; // Optional: Add ErrorBoundary if needed


// Define the Admin component directly in this file
const Admin = () => {
    return (
        <div>
            <div>
                <SharedApp isAdmin={true} />
            </div>
        </div>
    );
};

// Main entry point for the React application
const container = document.getElementById('root');
const root = createRoot(container);
console.log('INIT!');

root.render(
    <ErrorBoundary>
        <Router>
            <Admin />
        </Router>
    </ErrorBoundary>
);

// Performance measuring function (optional)
reportWebVitals();