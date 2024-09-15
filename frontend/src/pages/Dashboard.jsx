
// Dashboard.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export const Dashboard = () => {
    const navigate = useNavigate(); // useNavigate hook
    const [token, setToken] = useState(null); // State to hold the token
    const [balance, setBalance] = useState(null); // State to hold the balance
    const [loading, setLoading] = useState(true); // State for loading
    const [firstName, setFirstName] = useState(''); // State to hold the first name
    const [lastName, setLastName] = useState('');
    const [userId, setUserId] = useState(''); // Store the user ID
   // Calculate full name
   const fullName = `${firstName} ${lastName}`.trim();

    const fetchBalance = async (token) => {
        // console.log('Fetching balance with token:', token); // Debugging token use
        try {
            const response = await axios.get('http://localhost:3000/api/v1/account/balance', {
                headers: {
                    'Authorization': `Bearer ${token}`, // Include the token in Authorization header
                },
            });

            setBalance(response.data.balance); // Set the balance received from the API
        } catch (error) {
            console.error('Error fetching balance:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserDetails = async (token) => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/user/details', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setFirstName(response.data.firstName); // Update the first name state
            setLastName(response.data.lastName);
            // setUserId(response.data._id); // Set the user ID state
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    useEffect(() => {
        // Check if token is stored locally
        const storedToken = localStorage.getItem('token');

        if (!storedToken) {
            // Redirect to login if token is not stored
            navigate('/signin');
        } else {
            // Set the token and fetch balance
            setToken(storedToken);
            fetchBalance(storedToken);
            fetchUserDetails(storedToken); // Fetch user details to get the first name
        }
    }, [navigate]);

    if (loading) {
        return <div>Loading...</div>; // Show loading state while fetching
    }

    return (
        <div>
            <Appbar fullName={fullName} />
            <div className="m-8">
                {/* Show the balance dynamically once fetched */}
                <Balance value={balance !== null ? balance.toLocaleString() : "0"} />
                <Users />
            </div>
        </div>
    );
};
