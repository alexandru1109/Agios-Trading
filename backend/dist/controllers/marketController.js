"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMarketNews = exports.getMarketSummary = void 0;
const axios_1 = __importDefault(require("axios"));
const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const STOCK_API_URL = 'https://www.alphavantage.co/query';
const STOCK_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const stockSymbols = ['MSFT', 'AAPL', 'GOOGL'];
const getMarketSummary = async (req, res) => {
    if (!STOCK_API_KEY) {
        return res.status(500).json({ message: 'Stock API key is not set' });
    }
    try {
        const stockPromises = stockSymbols.map(symbol => axios_1.default.get(`${STOCK_API_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${STOCK_API_KEY}`));
        const stockResponses = await Promise.all(stockPromises);
        const stocks = stockResponses.map(response => response.data['Global Quote']);
        res.status(200).json({ stocks });
    }
    catch (error) {
        console.error('Error fetching market summary:', error);
        res.status(500).json({ message: 'Error fetching market summary', error });
    }
};
exports.getMarketSummary = getMarketSummary;
const getMarketNews = async (req, res) => {
    if (!NEWS_API_KEY) {
        return res.status(500).json({ message: 'News API key is not set' });
    }
    try {
        const newsResponse = await axios_1.default.get(`${NEWS_API_URL}?category=business&language=en&apiKey=${NEWS_API_KEY}`);
        const news = newsResponse.data.articles;
        res.status(200).json({ news });
    }
    catch (error) {
        console.error('Error fetching market news:', error);
        res.status(500).json({ message: 'Error fetching market news', error });
    }
};
exports.getMarketNews = getMarketNews;
