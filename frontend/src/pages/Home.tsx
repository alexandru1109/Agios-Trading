import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Dashboard from '../components/Main/Dashboard';
import Navbar from '../components/Main/Navbar';
import Chart from '../components/Main/Chart';

const Home: React.FC = () => {
    const auth = useAuth();

    if (!auth?.isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <Navbar />
            <Dashboard />
            <Chart />
        </div>
    );
};

export default Home;
