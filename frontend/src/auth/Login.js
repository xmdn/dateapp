import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Change this to useNavigate
import { setToken, setUser } from '../utils/mutators';
import { useAppContext } from '../AppContext'; // Import your context
import { navigateWithState } from '../utils/navigator'; // Import the function
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Use useNavigate instead of useHistory
    const { updateState } = useAppContext(); // Get the update function from context

    const getCsrfToken = () => {
        const name = 'csrftoken'; // Replace with your actual CSRF cookie name
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(''); // Reset error message

        try {
            const csrfToken = getCsrfToken(); // Get the CSRF token

            // Make a POST request to your login endpoint
            const response = await axios.post(`${window.location.origin}/login/`, {
                username,
                password,
            }, {
                headers: {
                    'X-CSRFToken': csrfToken, // Include CSRF token in headers
                },
            });
            console.log('HERE RESPONSE: ', response)

            // Assuming your backend sends a JWT or session cookie upon successful login
            if (response.status === 200) {
                // Assuming the response contains access token, refresh token, and user info
                const { token, user } = response.data;
                // console.log('HERE RESPONSE: ', response, ' HERE IS RESPONSE.DATA: ', response.data, ' AND ALSO RESPONSE.DATA.TOKEN: ', response.data.token);
                
                setToken(token); // Store the token using the setToken function

                // Store the user info (username and email) in localStorage
                setUser({
                    email: user.email,
                    username: user.username,
                });

                const users = response.data.users;
                navigateWithState(navigate, updateState, users, '/home/'); // Redirect to /home/
                // Redirect to home or user dashboard after successful login
                // navigate('/home/'); // Change this to navigate
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
        <div className="login-container">
            <div className="login-card">
                <h2>Login</h2>
                {error && <div className="error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
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
        </div>
    );
};

export default Login;
