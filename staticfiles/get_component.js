// get_component.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import NotFound from './NotFound'; // Ensure these paths are correct
import AnotherComponent from './AnotherComponent'; // Ensure these paths are correct

export const renderComponent = (componentName, mountNode) => {
    let Component;

    switch (componentName) {
        case 'AnotherComponent':
            Component = AnotherComponent;
            break;
        default:
            Component = NotFound;
    }

    // Render the component into the specified mount node
    ReactDOM.createRoot(mountNode).render(<Component />);
};

// Ensure your components are defined somewhere
const NotFound = () => <div>Component not found!</div>; // Dummy component for NotFound
