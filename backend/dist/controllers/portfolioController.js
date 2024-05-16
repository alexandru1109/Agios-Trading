"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPortfolioGraphData = void 0;
const transactionModel_1 = __importDefault(require("../models/transactionModel"));
const getPortfolioGraphData = async (req, res) => {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        return res.status(400).json({ message: 'User ID not found' });
    }
    try {
        const transactions = await transactionModel_1.default.find({ userId });
        const portfolio = transactions.reduce((acc, transaction) => {
            const { symbol, quantity, price, type } = transaction;
            if (!acc[symbol]) {
                acc[symbol] = { symbol, quantity: 0, avgPrice: 0, totalInvested: 0 };
            }
            if (type === 'buy') {
                acc[symbol].quantity += quantity;
                acc[symbol].totalInvested += quantity * price;
                acc[symbol].avgPrice = acc[symbol].totalInvested / acc[symbol].quantity;
            }
            else if (type === 'sell') {
                acc[symbol].quantity -= quantity;
                acc[symbol].totalInvested -= quantity * price;
                acc[symbol].avgPrice = acc[symbol].totalInvested / acc[symbol].quantity;
            }
            return acc;
        }, {});
        const graphData = {
            labels: Object.keys(portfolio),
            datasets: [
                {
                    label: 'Total Invested',
                    data: Object.values(portfolio).map(p => p.totalInvested),
                },
                {
                    label: 'Average Price',
                    data: Object.values(portfolio).map(p => p.avgPrice),
                },
            ],
        };
        res.status(200).json(graphData);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching portfolio graph data', error });
    }
};
exports.getPortfolioGraphData = getPortfolioGraphData;
