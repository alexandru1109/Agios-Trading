import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaTachometerAlt, FaBuilding, FaUsers, FaBox, FaDollarSign, FaCog, FaChevronDown } from 'react-icons/fa';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="profile-card">
                <Link to="/profile">
                    <div className="profile-info">
                        <div className="profile-name">Hana</div>
                        <div className="profile-title">CEO</div>
                        <FaChevronDown className="profile-arrow" />
                    </div>
                </Link>
            </div>
            <div className="admins-menu">
                <div className="admins-menu-title">
                    <span>Admins menu</span>
                </div>
                <ul className="navbar-links">
                    <li className="active">
                        <Link to="/home">
                            <FaTachometerAlt className="icon" /> Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="#">
                            <FaBuilding className="icon" /> Business Info
                        </Link>
                    </li>
                    <li>
                        <Link to="#">
                            <FaUsers className="icon" /> Clients
                        </Link>
                    </li>
                    <li>
                        <Link to="#">
                            <FaBox className="icon" /> Products
                        </Link>
                    </li>
                    <li>
                        <Link to="#">
                            <FaDollarSign className="icon" /> Balance
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="settings-menu">
                <div className="settings-menu-title">
                    <span>Others</span>
                </div>
                <ul className="navbar-links">
                    <li>
                        <Link to="#">
                            <FaCog className="icon" /> Settings
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
