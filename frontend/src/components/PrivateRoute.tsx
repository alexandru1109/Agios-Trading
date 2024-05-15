import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
    const auth = useContext(AuthContext);

    return auth?.isAuthenticated ? <>{element}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
