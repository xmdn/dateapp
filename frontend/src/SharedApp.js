// src/SharedApp.js
import React, { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import DynamicLoader from './DynamicLoader'; // Import the DynamicLoader
import ErrorBoundary from './ErrorBoundary'; // Adjust the path as needed
import NotFound from './NotFound';
import { componentNames } from './utils/getComponentNames';
import Login from './auth/Login';
import Register from './auth/Register';
import { useAppContext } from './AppContext';
import { AuthGuard } from './utils/AuthGuard'; // Import the AuthGuard


// Define initial state
const initialState = {
};

// Helper function to check if the current path is login or register
const isAuthPage = (path) => {
    return ['/login/', '/register/'].includes(path.toLowerCase());
};

const SharedApp = (props) => {
    const { isAdmin } = props; // Destructure isAdmin from props
    const [headerLinks, setHeaderLinks] = useState([]);
    const [footerLinks, setFooterLinks] = useState([]);
    const [appState, setAppState] = useState(initialState);


    // Dynamically import Header and Footer based on isAdmin prop
    const Header = lazy(() => isAdmin
        ? import('./admin/partial/Header')
        : import('./user/partial/Header')
    );
    
    const Footer = lazy(() => isAdmin
        ? import('./admin/partial/Footer')
        : import('./user/partial/Footer')
    );

    console.log('Loading Header:',Header);


    useEffect(() => {
        // Get header links from the script tag
        const headerLinksElement = document.getElementById("header_links");
        if (headerLinksElement) {
            const links = JSON.parse(headerLinksElement.textContent);
            setHeaderLinks(links);
        }

        // Get footer links from the script tag
        const footerLinksElement = document.getElementById("footer_links");
        if (footerLinksElement) {
            const links = JSON.parse(footerLinksElement.textContent);
            setFooterLinks(links);
        }

        // Handle users_data script tag
        const usersDataElement = document.getElementById("users_data");
        let usersData = [];

        // Check if usersDataElement exists and has content
        if (usersDataElement && usersDataElement.textContent.trim()) {
            const usersDataString = usersDataElement.textContent.trim();
            try {
                // Attempt to parse JSON
                usersData = JSON.parse(usersDataString);
            } catch (error) {
                console.error("Error parsing users data from script tag:", error);
                usersData = []; // Reset to empty if there's a parsing error
            }
        } else {
            // If there's no valid usersDataElement, fallback to the default empty array
            usersData = [];
        }
        
    }, []);

    const routes = componentNames(isAdmin).map(name => {
        console.log('THIS IS COMPONENT: ', name);
        return {
            path: `/${name.toLowerCase()}/`, // Convert to lowercase for route path
            componentName: name,
        };
    });

    // const CurrentPath = () => {
    //     const location = useLocation();
    //     return location.pathname.toLowerCase();
    // };

    // // Get the current location to conditionally render Header and Footer
    // const { pathname } = useLocation();
    // const currentPath = pathname.toLowerCase();

    return (
            <div className="main_admin">
                <Suspense fallback={<div>Loading Header...</div>}>
                    <Header links={headerLinks} /> {/* Dynamically loaded Header */}
                </Suspense>
                <ErrorBoundary>
                    <AuthGuard>
                        <Routes>
                            {routes.map(({ path, componentName }) => (
                                <Route 
                                    key={path}
                                    path={path} 
                                    element={<DynamicLoader componentName={componentName} isAdmin={isAdmin} appState={appState} 
                                    {...props} />} 
                                />
                            ))}
                            <Route path="/login/" element={<Login {...props} />} />
                            <Route path="/register/" element={<Register {...props} />} />
                            {/* Fallback for undefined routes */}
                            <Route path="*" element={<NotFound {...props} />} />
                        </Routes>
                    </AuthGuard>
                </ErrorBoundary>
                <Suspense fallback={<div>Loading Footer...</div>}>
                    <Footer links={footerLinks} /> {/* Dynamically loaded Footer */}
                </Suspense>
            </div>
    );
};

export default SharedApp;
