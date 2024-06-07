import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Balance.css';

const Balance = () => {
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get('/api/balance/get', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setBalance(response.data.balance);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch balance');
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);

  const handleAddBalance = async (amount: number) => {
    try {
      await axios.post('/api/balance/add', { amount }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setBalance(prevBalance => prevBalance + amount);
    } catch (err) {
      setError('Failed to add balance');
    }
  };

  const handleSubtractBalance = async (amount: number) => {
    try {
      await axios.post('/api/balance/subtract', { amount }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setBalance(prevBalance => prevBalance - amount);
    } catch (err) {
      setError('Failed to subtract balance');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="balance-container">
      <div className="balance-content">
        <h1>Balance: ${balance}</h1>
        <div className="balance-buttons">
          <button onClick={() => handleAddBalance(100)} className="add-button">Add $100</button>
          <button onClick={() => handleSubtractBalance(100)} className="subtract-button">Subtract $100</button>
        </div>
      </div>
    </div>
  );
};

export default Balance;
