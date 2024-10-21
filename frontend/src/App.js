// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DynamicLoader from './DynamicLoader'; // Import the DynamicLoader
import ErrorBoundary from './ErrorBoundary'; // Adjust the path as needed
import NotFound from './components/NotFound';
import { componentNames } from './utils/getComponentNames';

const App = () => {
    const routes = componentNames().map(name => {
        console.log('THIS IS COMPONENT: ', name);
        return {
            path: `/${name.toLowerCase()}/`, // Convert to lowercase for route path
            componentName: name,
        };
    });
    return (
        <Router>
            <ErrorBoundary>
                <Routes>
                    {routes.map(({ path, componentName }) => (
                        <Route 
                            key={path}
                            path={path} 
                            element={<DynamicLoader componentName={componentName} />} 
                        />
                    ))}
                    {/* Fallback for undefined routes */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </ErrorBoundary>
        </Router>
    );
};


export default App;
