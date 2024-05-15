// src/context/AuthContext.tsx
import React, { createContext, useState, ReactNode, useContext } from 'react';
import axios from '../axiosConfig';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = async (username: string, password: string) => {
        try {
            const response = await axios.post('/auth/login', { username, password });
            if (response.status === 200) {
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const logout = () => setIsAuthenticated(false);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
export default AuthContext;
