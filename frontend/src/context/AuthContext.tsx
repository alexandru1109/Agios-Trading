import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext({ isAuthenticated: false, setAuthenticated: (auth: boolean) => {} });

export const AuthProvider: React.FC = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setAuthenticated(true);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
