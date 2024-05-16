import React from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="profile">
                <img src="/profile.png" alt="Profile" />
                <div>
                    <h3>Hana</h3>
                    <p>CEO</p>
                </div>
            </div>
            <ul className="menu">
                <li>Dashboard</li>
                <li>Business Info</li>
                <li>Clients</li>
                <li>Products</li>
                <li>Balance</li>
            </ul>
        </nav>
    );
};

export default Navbar;
