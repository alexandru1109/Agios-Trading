import React from 'react';
import './Dashboard.css';
import Card from './Card';
import Chart from './Chart';

const Dashboard: React.FC = () => {
    const cardsData = [
        { id: 1, title: 'Invoice Sent', value: '120', change: '+50%', color: 'yellow' as const },
        { id: 2, title: 'Invoice Received', value: '56', change: '-13%', color: 'red' as const },
        { id: 3, title: 'Invoice Paid', value: '16', change: '-23%', color: 'orange' as const },
    ];

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h2>Today, 12 Feb 2024</h2>
                <div className="header-icons">
                    <i className="icon-search"></i>
                    <i className="icon-bell"></i>
                    <i className="icon-settings"></i>
                </div>
            </div>
            <div className="cards">
                {cardsData.map((card) => (
                    <Card key={card.id} title={card.title} value={card.value} change={card.change} color={card.color} />
                ))}
            </div>
            <div className="chart-container">
                <Chart />
                <div className="chart-buttons">
                    <button>Weekly</button>
                    <button className="active">Monthly</button>
                    <button>Quarterly</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
