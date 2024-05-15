// src/components/Main/PrivateRoute.tsx
import React, { useContext } from 'react';
import { Route, Navigate, RouteProps } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

interface PrivateRouteProps {
    component: React.ComponentType<any>;
    path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        return null; // Sau puteți afișa un mesaj de eroare sau o redirecționare către o pagină de eroare
    }

    const { isAuthenticated } = authContext;

    return (
        <Route
            {...rest}
            element={
                isAuthenticated ? <Component /> : <Navigate to="/login" />
            }
        />
    );
};

export default PrivateRoute;
