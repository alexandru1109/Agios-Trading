import React from 'react';
import profileImage from '../../../public/profile.png';
import './Navbar.css';
import { FaTachometerAlt, FaBuilding, FaUsers, FaBox, FaDollarSign, FaCog, FaChevronDown } from 'react-icons/fa';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="profile-card">
                <img className="profile-image" src={profileImage} alt="Profile" />
                <div className="profile-info">
                    <div className="profile-name">Hana</div>
                    <div className="profile-title">CEO</div>
                    <FaChevronDown className="profile-arrow" />
                </div>
            </div>
            <div className="admins-menu">
                <div className="admins-menu-title">
                    <span>Admins menu</span>
                </div>
                <ul className="navbar-links">
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
                            <FaUsers className="icon" /> Clients
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <FaBox className="icon" /> Products
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <FaDollarSign className="icon" /> Balance
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <FaCog className="icon" /> Settings
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
