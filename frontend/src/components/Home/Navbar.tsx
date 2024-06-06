import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaTachometerAlt, FaBuilding, FaBox, FaChevronDown, FaDollarSign, FaCog } from 'react-icons/fa';
import axios from '../../config/axiosConfig';
import AuthContext from '../../context/AuthContext';

interface UserProfile {
    name: string;
    role: string;
}

const Navbar: React.FC = () => {
    const [profile, setProfile] = useState<UserProfile>({ name: '', role: '' });
    const [balance, setBalance] = useState<number | null>(null);
    const [profileError, setProfileError] = useState<string | null>(null);
    const [balanceError, setBalanceError] = useState<string | null>(null);
    const authContext = useContext(AuthContext);

    useEffect(() => {
        const fetchProfile = async () => {
            console.log('Fetching profile...'); // Log function call
            try {
                const token = localStorage.getItem('authToken');
                console.log('Auth Token:', token); // Log the token
                if (token) {
                    const response = await axios.get('/users/profile', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    console.log('Profile Response:', response.data); // Log the response
                    setProfile(response.data);
                } else {
                    console.log('No token found');
                    setProfileError('User not authenticated');
                }
            } catch (error) {
                console.error('Error fetching profile data:', error); // Log the error
                setProfileError('Error fetching profile data');
            }
        };

        const fetchBalance = async () => {
            console.log('Fetching balance...'); // Log function call
            try {
                const token = localStorage.getItem('authToken');
                console.log('Auth Token:', token); // Log the token
                if (token) {
                    const response = await axios.get('/balance/get', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    console.log('Balance Response:', response.data); // Log the response
                    setBalance(response.data.balance);
                } else {
                    console.log('No token found');
                    setBalanceError('User not authenticated');
                }
            } catch (error) {
                console.error('Error fetching balance:', error); // Log the error
                setBalanceError('Error fetching balance');
            }
        };

        if (authContext?.isAuthenticated) {
            console.log('User is authenticated'); // Log authentication status
            fetchProfile();
            fetchBalance();
        } else {
            console.log('User is not authenticated');
        }
    }, [authContext]);

    return (
        <nav className="navbar">
            <div>
                <Link to="/profile" className="profile-card">
                    <div className="profile-info">
                        {profileError ? (
                            <p>{profileError}</p>
                        ) : (
                            <>
                                <div className="profile-name">{profile.name}</div>
                                <div className="profile-title">{profile.role}</div>
                                <div className="profile-balance">
                                    Balance: {balanceError ? (
                                        <span>{balanceError}</span>
                                    ) : (
                                        `$${balance?.toFixed(2)}`
                                    )}
                                </div>
                            </>
                        )}
                        <FaChevronDown className="profile-arrow" />
                    </div>
                </Link>
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
            </div>
            <Link to="/settings" className="settings-button">
                <FaCog className="icon" /> Settings
            </Link>
        </nav>
    );
};

export default Navbar;
