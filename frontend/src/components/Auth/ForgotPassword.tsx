import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../config/axiosConfig';
import './ForgotPassword.css';

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleForgotPassword = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await axios.post('/auth/forgot-password', { email });
            alert('Password reset link sent to your email');
            navigate('/login');
        } catch (error) {
            console.error('There was an error sending the reset link!', error);
        }
    };

    return (
        <div className="forgot-password-container">
            <div className="forgot-password-card">
                <h2>Forgot Password</h2>
                <form onSubmit={handleForgotPassword}>
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit">Send Reset Link</button>
                </form>
                <p>
                    Remembered your password? <a href="/login">Login here</a>
                </p>
            </div>
            <div className="contact-support">
                <p>For support, contact us:</p>
                <p>Email: support@example.com</p>
                <p>Phone: +1 234 567 890</p>
            </div>
        </div>
    );
};

export default ForgotPassword;
