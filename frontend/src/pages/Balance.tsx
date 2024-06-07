import React, { useState, useEffect } from 'react';
import axios from '../config/axiosConfig';
import Navbar from '../components/Home/Navbar';
import './Balance.css';

const Balance: React.FC = () => {
    const [balance, setBalance] = useState<number | null>(null);
    const [stocks, setStocks] = useState<any[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchBalance = async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (token) {
                const response = await axios.get('/balance/get', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.data && typeof response.data.balance === 'number') {
                    setBalance(response.data.balance);
                } else {
                    console.error('Invalid balance format:', response.data);
                    setBalance(0); // Default value on error
                }
            }
        } catch (error) {
            console.error('Error fetching balance:', error);
            setBalance(0); // Default value on error
        }
    };

    const fetchStocks = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const userId = localStorage.getItem('userId');

            console.log('Token:', token); // Debugging line
            console.log('User ID:', userId); // Debugging line
            console.log('Local Storage:', localStorage); // Debugging line

            if (token && userId) {
                const response = await axios.get(`/stock/get/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('Stocks response:', response.data); // Debugging line
                if (response.data && Array.isArray(response.data)) {
                    setStocks(response.data);
                } else {
                    console.error('Invalid stock format:', response.data);
                    setStocks([]);
                }
            } else {
                console.error('Token or User ID is missing');
            }
        } catch (error) {
            console.error('Error fetching stocks:', error);
            setStocks(null); // Default value on error
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBalance();
        fetchStocks();
    }, []);

    return (
        <div className="balance-container">
            <Navbar />
            <div className="balance-content">
                <div className="balance-header">
                    <h2>Balance</h2>
                    <p>{balance !== null ? `$${balance}` : 'Loading...'}</p>
                </div>
                <div className="stocks-header">
                    <h2>Stocks</h2>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : stocks !== null && stocks.length > 0 ? (
                        <ul className="stock-list">
                            {stocks.map(stock => (
                                <li key={stock.symbol} className="stock-item">
                                    <span className="stock-symbol">{stock.symbol}</span>
                                    <span className="stock-quantity">{stock.quantity}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Nu are stocuri</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Balance;
