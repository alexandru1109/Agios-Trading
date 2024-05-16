"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomWidgets = void 0;
const axios_1 = __importDefault(require("axios"));
const STOCK_API_URL = 'https://finnhub.io/api/v1';
const STOCK_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const getCustomWidgets = async (req, res) => {
    const { symbols } = req.body;
    try {
        const stockDataPromises = symbols.map((symbol) => axios_1.default.get(`${STOCK_API_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${STOCK_API_KEY}`));
        const stockDataResponses = await Promise.all(stockDataPromises);
        const stockData = stockDataResponses.map(response => response.data['Global Quote']);
        res.status(200).json(stockData);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching custom widgets', error });
    }
};
exports.getCustomWidgets = getCustomWidgets;
