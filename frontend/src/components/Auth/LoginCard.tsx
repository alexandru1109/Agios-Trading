import React from 'react';
import './LoginCard.css';

interface LoginCardProps {
    children: React.ReactNode;
}

const LoginCard: React.FC<LoginCardProps> = ({ children }) => {
    return (
        <div className="login-card">
            {children}
        </div>
    );
};

export default LoginCard;
