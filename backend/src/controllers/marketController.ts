import { Request, Response } from 'express';
import axios from 'axios';

const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const STOCK_API_URL = 'https://www.alphavantage.co/query';
const STOCK_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

const stockSymbols = ['MSFT', 'AAPL', 'GOOGL'];

export const getMarketSummary = async (req: Request, res: Response) => {
    if (!STOCK_API_KEY) {
        return res.status(500).json({ message: 'Stock API key is not set' });
    }

    try {
        const stockPromises = stockSymbols.map(symbol =>
            axios.get(`${STOCK_API_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${STOCK_API_KEY}`)
        );

        const stockResponses = await Promise.all(stockPromises);
        const stocks = stockResponses.map(response => response.data['Global Quote']);

        res.status(200).json({ stocks });
    } catch (error) {
        console.error('Error fetching market summary:', error);
        res.status(500).json({ message: 'Error fetching market summary', error });
    }
};

export const getMarketNews = async (req: Request, res: Response) => {
    if (!NEWS_API_KEY) {
        return res.status(500).json({ message: 'News API key is not set' });
    }

    try {
        const newsResponse = await axios.get(`${NEWS_API_URL}?category=business&language=en&apiKey=${NEWS_API_KEY}`);
        const news = newsResponse.data.articles;

        res.status(200).json({ news });
    } catch (error) {
        console.error('Error fetching market news:', error);
        res.status(500).json({ message: 'Error fetching market news', error });
    }
};
