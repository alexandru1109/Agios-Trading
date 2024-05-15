"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionHistory = exports.addTransaction = void 0;
const transactionModel_1 = __importDefault(require("../models/transactionModel"));
const addTransaction = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'User not authenticated' });
    }
    const userId = req.user.id;
    const { stockSymbol, transactionType, amount } = req.body;
    try {
        const transaction = new transactionModel_1.default({
            userId,
            stockSymbol,
            transactionType,
            amount
        });
        await transaction.save();
        res.status(201).json({
            message: 'Transaction added successfully',
            transaction
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error adding transaction', error });
    }
};
exports.addTransaction = addTransaction;
const getTransactionHistory = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'User not authenticated' });
    }
    const userId = req.user.id;
    try {
        const transactions = await transactionModel_1.default.find({ userId });
        res.status(200).json(transactions);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching transaction history', error });
    }
};
exports.getTransactionHistory = getTransactionHistory;
