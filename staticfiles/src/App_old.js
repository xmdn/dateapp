import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import UserList from './components/UserList';
import Login from './components/Login'; // Your login component
import NotFound from './components/NotFound'; // A NotFound component

const App = () => {
    return (
      <Router>
            <Routes>
                <Route path="/user_home/" element={<UserList />} />
                <Route path="/user_home/login" element={<Login />} />
                {/* Add other routes here */}
                
                {/* Redirect to login if the route is not found */}
                <Route path="/user_home/*" element={<Navigate to="/user_home/login" replace />} />

                {/* Optionally handle 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default App;
