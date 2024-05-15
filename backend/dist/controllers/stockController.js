"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stockService_1 = __importDefault(require("../services/stockService"));
class StockController {
    async getStockData(req, res) {
        try {
            const data = await stockService_1.default.getStockData(req.params.symbol);
            res.status(200).json(data);
        }
        catch (error) {
            this.handleError(res, error);
        }
    }
    async updateStockData(req, res) {
        try {
            const updatedData = await stockService_1.default.updateStockData(req.params.symbol, req.body);
            res.status(200).json(updatedData);
        }
        catch (error) {
            this.handleError(res, error);
        }
    }
    async createStockData(req, res) {
        try {
            const newStock = await stockService_1.default.createStockData(req.body);
            res.status(201).json(newStock);
        }
        catch (error) {
            this.handleError(res, error);
        }
    }
    handleError(res, error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}
exports.default = new StockController();
