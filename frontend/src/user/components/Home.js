import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../AppContext';
import { apiClient } from '../../utils/AuthGuard';

const Home = ( props ) => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const { appState } = useAppContext(); // Get the global state

    useEffect(() => {
        console.log('Home component props:', props);
        // Check if users data is available in the <script> tag
        const usersDataElement = document.getElementById("users_data");
        console.log('HOME CHECK: ', usersDataElement, 'PROPS: ', appState);

        let initialUsers = [];

        // Fallback: fetch users from the API if not available
        const fetchUsers = async () => {
            try {
                // const accessToken = getToken(); // Use the getToken function to retrieve the token

                // // If the accessToken is not available, handle accordingly
                // if (!accessToken) {
                //     throw new Error('No access token found. Please log in.');
                // }
                const response = await apiClient.get('/users/');
                // const response = await axios.get(`${window.location.origin}/api/users/`, {
                //     headers: {
                //       Authorization: `Bearer ${accessToken}`,  // accessToken is retrieved from storage
                //     }
                //   });
                setUsers(response.data);
            } catch (err) {
                setError(`Error fetching users: ${err.message}`);
                console.error(err);
            }
        };

        if (appState && Object.keys(appState).length > 0) {
            // If appState has user data, use it to set users
            const usersData = appState.users || []; // Assuming users data might be stored in appState
            setUsers(usersData);

        } else if (usersDataElement && usersDataElement.textContent.trim()) {
            // Convert the string to a proper JSON array format
            const usersDataString = usersDataElement.textContent.trim();
            // console.log('script here: ', usersDataElement);

            // console.log('Raw Users Data String:', usersDataString, "Type:", typeof usersDataString);

            // const usersDataTrimmed = usersDataString.replace(/'/g, '"');
            try {
                const usersData = JSON.parse(usersDataString);
                console.log('HERE DATA: ', usersData);
                // console.log("Users data:", usersData, "Type:", typeof usersData);
                setUsers(usersData);
            } catch (error) {
                console.error("Error parsing users data from script tag:", error);
            }
        } else {
            fetchUsers();
        }
        // Update the users state with initial users if any
        setUsers(initialUsers);

        // Always fetch users as a fallback
        // fetchUsers();

    }, [appState]);

    if (error) {
        return <div>{error}</div>; // Display the error if one occurs
    }

    return (
        <div>
            <h2>User List</h2>
            <pre>{JSON.stringify(appState, null, 2)}</pre>
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
