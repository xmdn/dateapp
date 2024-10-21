// src/DynamicLoader.js
import React, { Suspense, lazy } from 'react';
import NotFound from './NotFound';

// Function to render a component by name
const DynamicLoader = ({ componentName, isAdmin, ...appState }) => {

    // Create a context for dynamic imports based on isAdmin
    const componentContext = isAdmin
        ? require.context('./admin/components/', false, /\.js?$/) // Admin components
        : require.context('./user/components/', false, /\.js?$/); // User components


    // Function to dynamically load components
    const loadComponent = (name) => {
        // Convert the component name to the required path
        const componentPath = `./${name}.js`;

        // Log the component path being checked
        console.log(`Checking for component at: ${componentPath}`);

        // Log the all components paths
        console.log('Available components:', componentContext.keys());
        
        // Check if the component exists in the context
        if (componentContext.keys().includes(componentPath)) {
            console.log('CATCHED!! ', componentPath);
            return lazy(() => {
                const component = componentContext(componentPath);
                return Promise.resolve(component); // Ensure it returns a promise
            });
        }

        // Log a warning if the component is not found
        console.warn(`Component not found: ${name}, falling back to NotFound`);

        // Fallback to NotFound if the component is not found
        return NotFound; // Directly return the NotFound component
    };


    const ComponentToRender = loadComponent(componentName);
    console.log('RENDERING OF: ', ComponentToRender, ' WITH NAME: ', componentName);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ComponentToRender { ...appState } />
        </Suspense>
    );
};

export default DynamicLoader;
