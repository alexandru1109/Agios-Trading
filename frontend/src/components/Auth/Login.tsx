// src/components/Auth/Login.tsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import './Login.css';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    if (!authContext) {
        return null; // Sau puteți afișa un mesaj de eroare
    }

    const { login } = authContext;

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        await login(username, password);
        navigate('/home');
    };

    return (
        <div className="login-container">
            <h1>Welcome to the website</h1>
            <form onSubmit={handleLogin} className="login-form">
                <label>
                    User Name
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <div className="login-options">
                    <label>
                        <input type="checkbox" /> Remember me
                    </label>
                    <a href="/forgot-password">Forgot Password?</a>
                </div>
                <button type="submit">Login</button>
                <p>
                    To create a new account, <a href="/register">Click here</a>
                </p>
            </form>
        </div>
    );
};

export default Login;
