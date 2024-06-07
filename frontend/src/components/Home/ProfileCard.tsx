import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import axios from '../../config/axiosConfig';
import AuthContext from '../../context/AuthContext';
import './ProfileCard.css';

interface UserProfile {
    name: string;
    role: string;
}

const ProfileCard: React.FC = () => {
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
                const token = localStorage.getItem('authToken');
                console.log('Token:', token);
                if (token) {
                    const response = await axios.get('/users/profile', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    console.log('Profile response:', response.data);
                    setProfile(response.data);
                } else {
                    setProfileError('User not authenticated');
                }
            } catch (error) {
                setProfileError('Error fetching profile data');
                console.error('Error fetching profile:', error);
            } finally {
                setIsLoadingProfile(false);
            }
        };

        const fetchBalance = async () => {
            try {
                const token = localStorage.getItem('authToken');
                console.log('Token:', token);
                if (token) {
                    const response = await axios.get('/api/balance', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    console.log('Balance response:', response.data);
                    setBalance(response.data.balance);
                } else {
                    setBalanceError('User not authenticated');
                }
            } catch (error) {
                setBalanceError('Error fetching balance');
                console.error('Error fetching balance:', error);
            } finally {
                setIsLoadingBalance(false);
            }
        };

        if (authContext?.isAuthenticated) {
            console.log('User is authenticated:', authContext.isAuthenticated);
            fetchProfile();
            fetchBalance();
        } else {
            console.log('User is not authenticated');
            setIsLoadingProfile(false);
            setIsLoadingBalance(false);
        }
    }, [authContext]);

    return (
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
    );
};

export default ProfileCard;
