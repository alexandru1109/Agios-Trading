import React, { useEffect, useState } from 'react';
import axios from '../config/axiosConfig';
import Navbar from '../components/Home/Navbar'; // Importă Navbar
import './Profile.css';

interface UserProfile {
    name: string;
    email: string;
    passHash: string;
    role: string;
    strategy: string;
}

const Profile: React.FC = () => {
    const [profile, setProfile] = useState<UserProfile>({
        name: '',
        email: '',
        passHash: '',
        role: '',
        strategy: '',
    });

    const [password, setPassword] = useState('');
    const [isEditing, setIsEditing] = useState(false);

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

        fetchProfile();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (token) {
                await axios.put('/users/update', { ...profile, password }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setIsEditing(false);
                alert('Profile updated successfully');
            }
        } catch (error) {
            console.error('Error updating profile', error);
        }
    };

    return (
        <div className="profile-container">
            <Navbar />
            <div className="profile-content">
                <div className="profile-card">
                    <div className="profile-header">
                        <img src="/path/to/profile-pic.png" alt="Profile" />
                        <h2>{profile.name}</h2>
                    </div>
                    <div className="profile-content">
                        <form>
                            <div className="profile-field">
                                <label>Name:</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={profile.name}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <p>{profile.name}</p>
                                )}
                            </div>
                            <div className="profile-field">
                                <label>Email:</label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={profile.email}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <p>{profile.email}</p>
                                )}
                            </div>
                            <div className="profile-field">
                                <label>Role:</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="role"
                                        value={profile.role}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <p>{profile.role}</p>
                                )}
                            </div>
                            <div className="profile-field">
                                <label>Strategy:</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="strategy"
                                        value={profile.strategy}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <p>{profile.strategy}</p>
                                )}
                            </div>
                            <div className="profile-field">
                                <label>Password:</label>
                                {isEditing ? (
                                    <input
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                ) : (
                                    <p>********</p>
                                )}
                            </div>
                        </form>
                        <button onClick={isEditing ? handleSave : () => setIsEditing(true)}>
                            {isEditing ? 'Save' : 'Edit Profile'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
