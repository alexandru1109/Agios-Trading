import React from 'react';
import './Card.css';

interface CardProps {
    title: string;
    value: string;
    change: string;
    color: 'yellow' | 'red' | 'light-red' | 'orange' | 'blue';
}

const Card: React.FC<CardProps> = ({ title, value, change, color }) => {
    return (
        <div className={`card ${color}`}>
            <h4>{title}</h4>
            <div className="card-content">
                <p>{value}</p>
                <span>{change}</span>
            </div>
        </div>
    );
};

export default Card;
