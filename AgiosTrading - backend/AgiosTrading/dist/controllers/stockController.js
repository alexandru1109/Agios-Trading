"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchStockData = void 0;
const stockService_1 = require("../services/stockService");
const fetchStockData = async (req, res) => {
    const { symbol } = req.params;
    try {
        const data = await (0, stockService_1.getStockData)(symbol);
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch stock data' });
    }
};
exports.fetchStockData = fetchStockData;
