import React, { createContext, useState, useEffect } from 'react';
import axios from '../config/axiosConfig';

const AuthContext = createContext({ isAuthenticated: false, setAuthenticated: (auth: boolean) => {} });

export const AuthProvider: React.FC<{ children }> = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setAuthenticated(true);
        }
    }, []);

    const login = async (username: string, password: string) => {
        try {
            const response = await axios.post('/auth/login', { username, password });
            const token = response.data.token;  // Assuming the token is in the response
            localStorage.setItem('authToken', token);
            setAuthenticated(true);
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
