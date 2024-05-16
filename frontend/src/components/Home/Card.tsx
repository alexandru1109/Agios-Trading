import React from 'react';
import './Card.css';

interface CardProps {
    title: string;
    value: string;
    change: string;
    color: 'yellow' | 'red' | 'orange';
}

const Card: React.FC<CardProps> = ({ title, value, change, color }) => {
    return (
        <div className={`card ${color}`}>
            <h3>{title}</h3>
            <div className="card-info">
                <span className="card-value">{value}</span>
                <span className="card-change">{change}</span>
            </div>
        </div>
    );
};

export default Card;
