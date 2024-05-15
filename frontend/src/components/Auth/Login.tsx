import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import LoginCard from './LoginCard';
import './Login.css';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const auth = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        auth?.login(username, password);
    };

    return (
        <div className="login-container">
            <LoginCard>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Username:
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </label>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <button type="submit">Login</button>
                </form>
            </LoginCard>
        </div>
    );
};

export default Login;
