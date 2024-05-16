import React, { useEffect, useState } from 'react';
import axios from '../config/axiosConfig';
import { Link } from 'react-router-dom';
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

  const handleBuy = (symbol: string) => {
    alert(`Buy functionality for ${symbol} is not implemented yet`);
  };

  const handleSell = (symbol: string) => {
    alert(`Sell functionality for ${symbol} is not implemented yet`);
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
                <button onClick={() => handleBuy(stock.symbol)}>Buy</button>
                <button onClick={() => handleSell(stock.symbol)}>Sell</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StockList10;
