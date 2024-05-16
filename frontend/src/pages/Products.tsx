import React, { useEffect, useState } from 'react';
import axios from '../config/axiosConfig';
import './Products.css';

interface Stock {
  symbol: string;
  currentPrice: number;
  highPrice: number;
  lowPrice: number;
  openPrice: number;
  previousClosePrice: number;
}

const StockList10: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get('/market/market-summary10');
        if (response.data && Array.isArray(response.data.stocks)) {
          setStocks(response.data.stocks);
        } else {
          setError('Invalid response format');
        }
      } catch (error) {
        setError('Error fetching stocks');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStocks();
  }, []);

  const handleBuy = async (symbol: string, price: number) => {
    const quantity = 1; 
    const transaction = {
      type: 'buy',
      quantity,
      price,
      date: new Date(),
      symbol,
      strategy: 'default', 
    };

    try {
      const response = await axios.post('/transactions/add', transaction);
      alert(`Bought ${quantity} unit(s) of ${symbol} at $${price}`);
    } catch (error) {
      console.error('Error buying stock:', error);
      alert('Error buying stock');
    }
  };

  const handleSell = async (symbol: string, price: number) => {
    const quantity = 1; 
    const transaction = {
      type: 'sell',
      quantity,
      price,
      date: new Date(),
      symbol,
      strategy: 'default', 
    };

    try {
      const response = await axios.post('/transactions/add', transaction);
      alert(`Sold ${quantity} unit(s) of ${symbol} at $${price}`);
    } catch (error) {
      console.error('Error selling stock:', error);
      alert('Error selling stock');
    }
  };

  return (
    <div className="stock-list-container">
      <h1>Stock Market</h1>
      {isLoading ? (
        <p>Loading stocks...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="stock-list">
          {stocks.map(stock => (
            <div key={stock.symbol} className="stock-item">
              <h2>{stock.symbol}</h2>
              <p>Current Price: ${stock.currentPrice}</p>
              <p>High Price: ${stock.highPrice}</p>
              <p>Low Price: ${stock.lowPrice}</p>
              <p>Open Price: ${stock.openPrice}</p>
              <p>Previous Close Price: ${stock.previousClosePrice}</p>
              <div className="stock-buttons">
                <button onClick={() => handleBuy(stock.symbol, stock.currentPrice)}>Buy</button>
                <button onClick={() => handleSell(stock.symbol, stock.currentPrice)}>Sell</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StockList10;
