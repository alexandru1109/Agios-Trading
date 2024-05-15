"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class AlphaVantageService {
    constructor() {
        this.apiKey = process.env.ALPHA_VANTAGE_API_KEY || '';
    }
    async getStockData(symbol) {
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${this.apiKey}`;
        const response = await axios_1.default.get(url);
        return response.data;
    }
    async getStockIndicators(symbol) {
        const url = `https://www.alphavantage.co/query?function=TECHNICAL_INDICATOR&symbol=${symbol}&apikey=${this.apiKey}`;
        const response = await axios_1.default.get(url);
        return response.data;
    }
}
exports.default = new AlphaVantageService();
