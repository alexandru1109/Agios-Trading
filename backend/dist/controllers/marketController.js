"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMarketSummary = void 0;
const axios_1 = __importDefault(require("axios"));
const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const STOCK_API_URL = 'https://www.alphavantage.co/query';
const STOCK_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const getMarketSummary = async (req, res) => {
    try {
        const newsResponse = await axios_1.default.get(`${NEWS_API_URL}?category=business&apiKey=${NEWS_API_KEY}`);
        const news = newsResponse.data.articles;
        const stockResponse = await axios_1.default.get(`${STOCK_API_URL}?function=GLOBAL_QUOTE&symbol=MSFT&apikey=${STOCK_API_KEY}`);
        const stock = stockResponse.data['Global Quote'];
        res.status(200).json({ news, stock });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching market summary', error });
    }
};
exports.getMarketSummary = getMarketSummary;
