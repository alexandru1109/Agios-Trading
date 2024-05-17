"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBalance = exports.getBalance = void 0;
const balanceModel_1 = __importDefault(require("../models/balanceModel"));
const getBalance = async (req, res) => {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    console.log('User ID:', userId); // Add this log
    if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
    }
    try {
        const balance = await balanceModel_1.default.findOne({ userId });
        if (!balance) {
            return res.status(404).json({ message: 'Balance not found' });
        }
        res.status(200).json({ balance: balance.amount });
    }
    catch (error) {
        console.error('Error fetching balance:', error);
        res.status(500).json({ message: 'Error fetching balance', error });
    }
};
exports.getBalance = getBalance;
const updateBalance = async (req, res) => {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    console.log('User ID:', userId); // Add this log
    if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
    }
    const { amount } = req.body;
    try {
        const balance = await balanceModel_1.default.findOneAndUpdate({ userId }, { amount }, { new: true, upsert: true });
        res.status(200).json({ balance: balance.amount });
    }
    catch (error) {
        console.error('Error updating balance:', error);
        res.status(500).json({ message: 'Error updating balance', error });
    }
};
exports.updateBalance = updateBalance;
