import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../config/axiosConfig';
import './Profile.css';

const Profile: React.FC = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: '',
        role: '',
        strategy: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user data
        axios.get('/api/user/profile')
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {
                console.error('Error fetching user data', error);
            });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Update user data
        axios.put('/api/user/profile', userData)
            .then(response => {
                alert('Profile updated successfully');
            })
            .catch(error => {
                console.error('Error updating profile', error);
            });
    };

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h2>Profile</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={userData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={userData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={userData.phone}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="role"
                        placeholder="Role"
                        value={userData.role}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="strategy"
                        placeholder="Strategy"
                        value={userData.strategy}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Update Profile</button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
