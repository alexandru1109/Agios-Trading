import { Request, Response } from 'express';
import axios from 'axios';

const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const STOCK_API_URL = 'https://www.alphavantage.co/query';
const STOCK_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

export const getMarketSummary = async (req: Request, res: Response) => {
    try {
        const newsResponse = await axios.get(`${NEWS_API_URL}?category=business&apiKey=${NEWS_API_KEY}`);
        const news = newsResponse.data.articles;

        const stockResponse = await axios.get(`${STOCK_API_URL}?function=GLOBAL_QUOTE&symbol=MSFT&apikey=${STOCK_API_KEY}`);
        const stock = stockResponse.data['Global Quote'];

        res.status(200).json({ news, stock });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching market summary', error });
    }
};
