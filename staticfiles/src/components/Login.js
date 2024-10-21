import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Change this to useNavigate

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(''); // Reset error message

        try {
            // Make a POST request to your login endpoint
            const response = await axios.post('/api/login/', {
                username,
                password,
            });

            // Assuming your backend sends a JWT or session cookie upon successful login
            if (response.status === 200) {
                // Optionally save token or session information here
                // Redirect to home or user dashboard after successful login
                navigate('/user_home'); // Change this to navigate
            }
        } catch (err) {
            // Handle error response from the server
            if (err.response) {
                setError(err.response.data.detail || 'Login failed. Please try again.');
            } else {
                setError('An unexpected error occurred. Please try again later.');
            }
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
