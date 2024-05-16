import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../config/axiosConfig';
import './Login.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post('/auth/login', { email, password });
            const { token, userId } = response.data;
            localStorage.setItem('authToken', token);
            localStorage.setItem('userId', userId);
            navigate('/home');
        } catch (error) {
            console.error('There was an error logging in!', error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
                <p>
                    <a href="/forgot-password">Forgot Password?</a>
                </p>
                <p>
                    Not a member? <a href="/register">Sign up now</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
