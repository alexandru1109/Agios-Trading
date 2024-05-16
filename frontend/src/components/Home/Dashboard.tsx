import React, { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig'; // Ensure correct path
import './Dashboard.css';
import Card from './Card';
import Chart from './Chart';

interface Stock {
    '01. symbol': string;
    '05. price': string;
    '09. change': string;
    '10. change percent': string;
}

const Dashboard: React.FC = () => {
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMarketSummary = async () => {
            try {
                const response = await axios.get('/market/market-summary');
                setStocks(response.data.stocks);
                setIsLoading(false);
            } catch (error) {
                setError('Error fetching market summary');
                setIsLoading(false);
            }
        };

        fetchMarketSummary();
    }, []);

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
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    stocks.map((stock, index) => (
                        <Card
                            key={index}
                            title={stock['01. symbol']}
                            value={`$${stock['05. price']}`}
                            change={`${stock['09. change']} (${stock['10. change percent']})`}
                            color={parseFloat(stock['09. change']) > 0 ? 'green' : 'red'}
                        />
                    ))
                )}
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
