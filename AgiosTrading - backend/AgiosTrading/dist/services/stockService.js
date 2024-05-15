"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stockModel_1 = __importDefault(require("../models/stockModel"));
const alphaVantageService_1 = __importDefault(require("../alphaVantageService"));
class StockService {
    async getStockData(symbol) {
        let stock = await stockModel_1.default.findOne({ symbol });
        if (!stock) {
            const apiData = await alphaVantageService_1.default.getStockData(symbol);
            const indicators = await alphaVantageService_1.default.getStockIndicators(symbol);
            const newStockData = {
                symbol: symbol,
                history: apiData['Time Series (Daily)'],
                indicators: indicators,
            };
            stock = new stockModel_1.default(newStockData);
            await stock.save();
        }
        return stock;
    }
    async updateStockData(symbol, data) {
        const stock = await stockModel_1.default.findOneAndUpdate({ symbol }, data, { new: true });
        if (!stock) {
            throw new Error('Stock not found');
        }
        return stock;
    }
    async createStockData(data) {
        const stock = new stockModel_1.default(data);
        await stock.save();
        return stock;
    }
}
exports.default = new StockService();
