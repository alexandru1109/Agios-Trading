import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaTachometerAlt, FaBuilding, FaBox, FaDollarSign, FaCog } from 'react-icons/fa';
import ProfileCard from './ProfileCard';
import AuthContext from '../../context/AuthContext';

const Navbar: React.FC = () => {
    const authContext = useContext(AuthContext);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    return (
        <nav className="navbar">
            {isAuthenticated && (
                <div className="navbar-profile-card">
                    <ProfileCard />
                </div>
            )}
            <div className="admins-menu">
                <div className="admins-menu-title">Menu:</div>
                <ul className="navbar-links">
                    <li className="active">
                        <Link to="/home" className="button">
                            <FaTachometerAlt className="icon" /> Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/news" className="button">
                            <FaBuilding className="icon" /> Business Info
                        </Link>
                    </li>
                    <li>
                        <Link to="/stocks" className="button">
                            <FaBox className="icon" /> Products
                        </Link>
                    </li>
                    <li>
                        <Link to="/transactions" className="button">
                            <FaDollarSign className="icon" /> Transactions
                        </Link>
                    </li>
                </ul>
            </div>
            <Link to="/settings" className="settings-button">
                <FaCog className="icon" /> Settings
            </Link>
        </nav>
    );
};

export default Navbar;
