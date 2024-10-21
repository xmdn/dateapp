// ./partial/Header.js
import React from 'react';
import { Link } from 'react-router-dom';


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
    return (
        <header className='header'>
            <nav className='navigation'>
                <ul>
                    {links.map((link, index) => (
                        <li key={index}>
                            <Link to={link.url}>{link.text}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
