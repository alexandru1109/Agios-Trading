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
    const [isLoadingProfile, setIsLoadingProfile] = useState(true);
    const [isLoadingBalance, setIsLoadingBalance] = useState(true);
    const [profileError, setProfileError] = useState<string | null>(null);
    const [balanceError, setBalanceError] = useState<string | null>(null);
    const authContext = useContext(AuthContext);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('/users/profile');
                setProfile(response.data);
                setIsLoadingProfile(false);
            } catch (error) {
                setProfileError('Error fetching profile data');
                setIsLoadingProfile(false);
            }
        };

        const fetchBalance = async () => {
            try {
                const response = await axios.get('/balance/get');
                setBalance(response.data.balance);
                setIsLoadingBalance(false);
            } catch (error) {
                setBalanceError('Error fetching balance');
                setIsLoadingBalance(false);
            }
        };

        if (authContext?.isAuthenticated) {
            fetchProfile();
            fetchBalance();
        }
    }, [authContext]);

    return (
        <nav className="navbar">
            <div>
                <Link to="/profile" className="profile-card">
                    <div className="profile-info">
                        {isLoadingProfile ? (
                            <p>Loading profile...</p>
                        ) : profileError ? (
                            <p>{profileError}</p>
                        ) : (
                            <>
                                <div className="profile-name">{profile.name}</div>
                                <div className="profile-title">{profile.role}</div>
                                <div className="profile-balance">
                                    Balance: {isLoadingBalance ? (
                                        <span>Loading...</span>
                                    ) : balanceError ? (
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
                            <Link to="/balance" className="button">
                                <FaDollarSign className="icon" /> Balance
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
