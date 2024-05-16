import React from 'react';
import Dashboard from '../components/Home/Dashboard';
import Navbar from '../components/Home/Navbar';
import './Home.css';

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <Navbar />
            <Dashboard />
        </div>
    );
};

export default Home;
