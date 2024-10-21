// ./partial/Header.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { removeToken, getToken, getUser } from '../../utils/mutators'; // Import the removeToken function

const headerStyle = {
    backgroundColor: '#282c34',
    color: 'white',
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

const h1Style = {
    margin: 0,
    fontSize: '1.8em',
    fontWeight: 'bold',
};

const navStyle = {
    marginLeft: '20px',
};

const ulStyle = {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
};

const liStyle = {
    marginLeft: '20px',
};

const linkStyle = {
    color: '#61dafb',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'color 0.3s',
};

const linkHoverStyle = {
    color: '#21a1f1',
    textDecoration: 'underline',
};

const Header = ({ links }) => {
    const [user, setUser] = useState(null);

    // Fetch the user data on component mount
    useEffect(() => {
        const currentUser = getUser(); // Retrieve the user from localStorage
        if (currentUser) {
            setUser(currentUser); // Set the user data in the state
        }
    }, []);

    // If user data is not yet available, show loading or placeholder
    if (!user) {
        return (
            <header>
                <div>Loading user info...</div>
            </header>
        );
    }

    const navigate = useNavigate(); // Initialize useNavigate hook

    const location = useLocation()

    console.log('HEADER LOCATION: ', location);

    const handleCheck = () => {
        // Your logic here
        console.log("Check button clicked!");
        // You can also call the getToken function here, for example:
        const token = getToken();
        console.log('Retrieved Token:', token);
    };

    // Function to handle logout
    const handleLogout = () => {
        removeToken(); // Remove the token
        navigate('/login/'); // Redirect to login page
    };
    return (
        <header className='header_user'>
            <div>
                <h2>Welcome, {user.username}!</h2>
                <p>{user.email}</p>
            </div>
            <nav className='navigation_user'>
                <ul>
                    {links.map((link, index) => (
                        <li key={index}>
                            {link.text === "Logout" ? (
                                <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#61dafb', cursor: 'pointer' }}>
                                    {link.text}
                                </button>
                            ) : link.text === "Check" ? (
                                <button onClick={handleCheck} style={{ background: 'none', border: 'none', color: '#61dafb', cursor: 'pointer' }}>
                                    {link.text}
                                </button>
                            ) : (
                                <Link to={link.url}>{link.text}</Link>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
