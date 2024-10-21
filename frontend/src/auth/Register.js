import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Register.css'; // Import the CSS file for styles

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         try {
    //             const response = await axios.get(`${window.location.origin}/register/`);
    //             setUsers(response.data);
    //         } catch (err) {
    //             setError('Failed to fetch users.');
    //         }
    //     };
    //     fetchUsers();
    // }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');

        try {
            await axios.post(`${window.location.origin}/register/`, { username, email, password });
            setSuccess('Registration successful!');
            setUsername('');
            setEmail('');
            setPassword('');
        } catch (err) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2>Register</h2>
                {error && <div className="error">{error}</div>}
                {success && <div className="success">{success}</div>}
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
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    <button type="submit">Register</button>
                </form>
            </div>
            {/* <h2>User List</h2>
            <ul className="user-list">
                {users.map((user) => (
                    <li key={user.username}>
                        {user.username} - {user.email}
                    </li>
                ))}
            </ul> */}
        </div>
    );
};

export default Register;
