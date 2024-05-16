import React from 'react';
import Navbar from './Navbar';
import Card from './Card';
import Chart from './Chart';
import './Dashboard.css';

const Dashboard: React.FC = () => {
    return (
        <div className="dashboard">
            <Navbar />
            <div className="dashboard-content">
                <div className="cards">
                    <Card title="Invoice sent" value="120" change="+50%" color="yellow" />
                    <Card title="Invoice received" value="56" change="-13%" color="red" />
                    <Card title="Invoice paid" value="16" change="-23%" color="light-red" />
                </div>
                <div className="gross-volume">
                    <h3>Gross Volume</h3>
                    <Chart />
                </div>
                <div className="today-report">
                    <Card title="Customer Rate" value="10%" change="-10%" color="orange" />
                    <Card title="User Activity" value="75%" change="+20%" color="blue" />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
