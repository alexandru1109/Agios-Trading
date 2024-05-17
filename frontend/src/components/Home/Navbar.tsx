import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaTachometerAlt, FaBuilding, FaBox, FaChevronDown } from 'react-icons/fa';
import axios from '../..//config/axiosConfig';

interface UserProfile {
    name: string;
    role: string;
}

const Navbar: React.FC = () => {
    const [profile, setProfile] = useState<UserProfile>({ name: '', role: '' });
    const [balance, setBalance] = useState<number | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('authToken');
                if (token) {
                    const response = await axios.get('/users/profile', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setProfile(response.data);
                }
            } catch (error) {
                console.error('Error fetching profile data', error);
            }
        };

        const fetchBalance = async () => {
            try {
                const token = localStorage.getItem('authToken');
                if (token) {
                    const response = await axios.get('/balance/get', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setBalance(response.data.balance);
                }
            } catch (error) {
                console.error('Error fetching balance', error);
            }
        };


        fetchProfile();
        fetchBalance();
    }, []);

    return (
        <nav className="navbar">
            <div className="profile-card">
                <Link to="/profile">
                    <div className="profile-info">
                        <div className="profile-name">{profile.name}</div>
                        <div className="profile-title">{profile.role}</div>
                        <div className="profile-balance">Balance: ${balance?.toFixed(2)}</div>
                        <FaChevronDown className="profile-arrow" />
                    </div>
                </Link>
            </div>
            <div className="admins-menu">
                <ul className="navbar-links">
                    <li className="active">
                        <Link to="/home">
                            <FaTachometerAlt className="icon" /> Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/news">
                            <FaBuilding className="icon" /> Business News
                        </Link>
                    </li>
                    <li>
                        <Link to="/stocks">
                            <FaBox className="icon" /> Products
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
