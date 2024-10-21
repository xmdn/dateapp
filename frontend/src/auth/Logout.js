// src/auth/Logout.js
import { removeToken } from '../utils/mutators'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        removeToken(); // Clear the token
        navigate('/login/'); // Redirect to login page
    };

    useEffect(() => {
        handleLogout(); // Automatically call logout on component mount
    }, []);

    return null; // Or a loading spinner
};

export default Logout;
