// src/App.js
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Lazy load your components
const NotFound = lazy(() => import('./components/NotFound'));
const AnotherComponent = lazy(() => {
    console.log('Loading AnotherComponent...');
    return import('./components/AnotherComponent');
});

const App = () => {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/user_home/" element={<AnotherComponent />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </Router>
    );
};

export default App;
