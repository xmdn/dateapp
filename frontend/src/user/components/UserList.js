import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Check if users data is available in the <script> tag
        const usersDataElement = document.getElementById("users_data");
        if (usersDataElement) {
            // Convert the string to a proper JSON array format
            const usersDataString = usersDataElement.textContent.trim();
            // console.log('script here: ', usersDataElement);

            // console.log('Raw Users Data String:', usersDataString, "Type:", typeof usersDataString);

            const usersDataTrimmed = usersDataString.replace(/'/g, '"');
            try {
                const usersData = JSON.parse(usersDataTrimmed);
                console.log('HERE DATA: ', usersData);
                // console.log("Users data:", usersData, "Type:", typeof usersData);
                setUsers(usersData);
            } catch (error) {
                console.error("Error parsing users data from script tag:", error);
            }
        } else {
            // Fallback: fetch users from the API if not available
            const fetchUsers = async () => {
                try {
                    const response = await axios.get('/api/users/');
                    setUsers(response.data);
                } catch (error) {
                    console.error("Error fetching users:", error);
                }
            };
            fetchUsers();
        }
    }, []);


    return (
        <div>
            <h2>User List</h2>
            <ul>
                {Array.isArray(users) && users.map((user) => (
                    <li key={user.username}>
                        {user.username} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
