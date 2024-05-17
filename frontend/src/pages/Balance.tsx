import React, { useEffect, useState } from 'react';
import axios from '../config/axiosConfig';
import './Balance.css';

const Balance: React.FC = () => {
    const [balance, setBalance] = useState<number | null>(null);
    const [newBalance, setNewBalance] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.get('/api/balance/get', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                setBalance(response.data.balance);
            } catch (error) {
                setError('Error fetching balance');
            } finally {
                setIsLoading(false);
            }
        };

        fetchBalance();
    }, []);

    const handleUpdateBalance = async () => {
        try {
            await axios.put('/api/balance/update', { amount: newBalance }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            setBalance(newBalance);
            alert('Balance updated successfully');
        } catch (error) {
            setError('Error updating balance');
        }
    };

    return (
        <div className="balance-container">
            {isLoading ? (
                <p>Loading balance...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <h2>Your Balance</h2>
                    <p>${balance?.toFixed(2)}</p>
                    <div className="update-balance">
                        <input
                            type="number"
                            value={newBalance}
                            onChange={(e) => setNewBalance(parseFloat(e.target.value))}
                            placeholder="Enter new balance"
                        />
                        <button onClick={handleUpdateBalance}>Update Balance</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Balance;
