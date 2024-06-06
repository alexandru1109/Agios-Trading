import React, { useEffect, useState } from 'react';
import axios from '../config/axiosConfig';
import Navbar from '../components/Home/Navbar';
import './Transactions.css';

interface Transaction {
    id: string;
    amount: number;
    date: string;
    status: string;
}

const Transactions: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchTransactions = async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (token) {
                const response = await axios.post('/transactions/get', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.data && Array.isArray(response.data.transactions)) {
                    setTransactions(response.data.transactions);
                } else {
                    setError('Invalid response format');
                }
            } else {
                setError('No token found');
            }
        } catch (error) {
            setError('Error fetching transactions');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchBalance = async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (token) {
                const response = await axios.get('/balance/get', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('Current balance:', response.data);
            }
        } catch (error) {
            console.error('Error fetching balance', error);
        }
    };

    useEffect(() => {
        fetchTransactions();
        fetchBalance();
    }, []);

    return (
        <div className="transaction-list-container">
            <Navbar />
            <div className="transaction-list-content">
                <h1>Transactions</h1>
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <div className="transaction-list">
                        {transactions.map(transaction => (
                            <div key={transaction.id} className="transaction-item">
                                <div className="transaction-header">
                                    <div className="logo-placeholder" />
                                    <h2>Transaction ID: {transaction.id}</h2>
                                </div>
                                <div className="transaction-details">
                                    <div>
                                        <span className="transaction-label">Amount:</span>
                                        <span className="transaction-value">${transaction.amount}</span>
                                    </div>
                                    <div>
                                        <span className="transaction-label">Date:</span>
                                        <span className="transaction-value">{transaction.date}</span>
                                    </div>
                                    <div>
                                        <span className="transaction-label">Status:</span>
                                        <span className="transaction-value">{transaction.status}</span>
                                    </div>
                                </div>
                                <div className="transaction-buttons">
                                    <button className="approve-button">Approve</button>
                                    <button className="reject-button">Reject</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Transactions;
