import React from 'react';
import './Navbar.css';
import { FaTachometerAlt, FaBuilding, FaUsers, FaBox, FaDollarSign, FaCog, FaChevronDown } from 'react-icons/fa';

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="profile-card">
                <img className="profile-image" src="profile-image.jpg" alt="Profile" />
                <div className="profile-info">
                    <div className="profile-name">Hana</div>
                    <div className="profile-title">CEO</div>
                </div>
                <FaChevronDown className="profile-arrow" />
            </div>
            <div className="admins-menu">
                <div className="admins-menu-title">
                    <span>Admins menu</span>
                </div>
            </div>
            <div className="navbar-links">
                <ul>
                    <li className="active">
                        <a href="#">
                            <FaTachometerAlt className="icon" /> Dashboard
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <FaBuilding className="icon" /> Business Info
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <FaUsers className="icon" /> Users
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <FaBox className="icon" /> Products
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <FaDollarSign className="icon" /> Sales
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <FaCog className="icon" /> Settings
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
