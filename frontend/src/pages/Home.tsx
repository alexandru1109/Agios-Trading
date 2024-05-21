import React, { useEffect, useState } from 'react';
import axios from '../config/axiosConfig';
import './Home.css';
import Card from '../components/Home/Card';
import Chart from '../components/Home/Chart';
import Navbar from '../components/Home/Navbar'; // Import Navbar
import { useNavigate } from 'react-router-dom';

interface Stock {
    symbol: string;
    currentPrice: number;
    highPrice: number;
    lowPrice: number;
    openPrice: number;
    previousClosePrice: number;
}

const Home: React.FC = () => {
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMarketSummary = async () => {
            try {
                const response = await axios.get('market/market-summary');
                setStocks(response.data.stocks);
                setIsLoading(false);
            } catch (error) {
                setError('Error fetching market summary');
                setIsLoading(false);
            }
        };

        fetchMarketSummary();
    }, []);

    const handleChatbotClick = () => {
        navigate('/chatbot');
    };

    return (
        <div className="home-container">
            <Navbar />
            <div className="home-content">
                <div className="home-header">
                    <h2>Today, 17 May 2024</h2>
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
                                title={stock.symbol}
                                value={`$${stock.currentPrice.toFixed(2)}`}
                                change={`$${(stock.currentPrice - stock.previousClosePrice).toFixed(2)} (${((stock.currentPrice - stock.previousClosePrice) / stock.previousClosePrice * 100).toFixed(2)}%)`}
                                color={stock.currentPrice > stock.previousClosePrice ? 'green' : 'red'}
                            />
                        ))
                    )}
                </div>
                <div className="chart-container">
                    <Chart />
                </div>
                <button className="chatbot-icon" onClick={handleChatbotClick}>
                    💬
                </button>
            </div>
        </div>
    );
};

export default Home;
