import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();


export function UserContextProvider({children}) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

// useEffect gets the data onsubmit of the login form

    useEffect(() => {
        axios.get('http://localhost:3001/dashboard', { withCredentials: true })
        .then(({ data }) => {
            console.log('User data:', data);
            setUser(data);
        })
        .catch((err) => {
            console.error('Fetch error:', err);
        })
    }, []); // Empty dependency array to run only once

    // Logout

    const logout = async () => {
        try {
            await axios.post('http://localhost:3001/logout', {}, { withCredentials: true});
            setUser(null);
            navigate('/login');
        } catch (err) {
            console.error('Logout error:', err);
        }
    };


    // Login
    const login = async (email, password) => {
        try {
            const { data } = await axios.post('http://localhost:3001/login', { email, password }, { withCredentials: true });
            if (data === "Success") {
                const userData = await axios.get('http://localhost:3001/dashboard', { withCredentials: true });
                setUser(userData.data);
                navigate('/dashboard');
            } else {
                setUser(null);
                console.error('Login error:', data);
            }
        } catch (err) {
            console.error('Login error:', err);
        }

    };
    const dataEntry = async(title, url, password) => {
        try {
            await axios.post('http://localhost:3001/entries', { title, url, password }, { withCredentials: true });
            setUser(prev => ({...prev, entries: [...prev.entries, {title, url, password}]}))
            console.log('Data entry successful')
        } catch (err) {
            console.error('Data entry error:', err);
        }
    }

    return (
        <UserContext.Provider value={{ user, setUser, login, logout, dataEntry}}>
            { children }
        </UserContext.Provider>
    );  
}