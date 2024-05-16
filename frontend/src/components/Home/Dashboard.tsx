import React from 'react';
import './Dashboard.css';
import Card from './Card';
import Chart from './Chart';


const Dashboard = () => {
    const cardsData = [
        { id: 1, title: "Invoice Sent", value: "120", change: "+50%" },
        { id: 2, title: "Invoice Received", value: "56", change: "-13%" },
        { id: 3, title: "Invoice Paid", value: "16", change: "-23%" }
    ];

    return (
        <div className="dashboard">
            <div className="cards">
                {cardsData.map(card => <Card key={card.id} data={card} />)}
            </div>
            <Chart />
        </div>
    );
}

export default Dashboard;
