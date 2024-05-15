import React from 'react';
import './Card.css';

interface CardProps {
    title: string;
    value: string;
    change: string;
}

const Card = ({ data }: { data: CardProps }) => {
    return (
        <div className={`card ${data.change.startsWith('-') ? 'negative' : 'positive'}`}>
            <h1>{data.title}</h1>
            <p>{data.value}</p>
            <span>{data.change}</span>
        </div>
    );
}

export default Card;
