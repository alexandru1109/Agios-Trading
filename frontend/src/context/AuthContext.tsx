import React, { createContext, useState } from 'react';
import axios from '../config/axiosConfig';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = async (username: string, password: string) => {
        try {
            const response = await axios.post('/auth/login', { username, password });
            const token = response.data.token; // Assuming the token is in the response
            localStorage.setItem('authToken', token);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
