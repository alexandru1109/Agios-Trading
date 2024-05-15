"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChatbotResponse = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const LLAMA_API_URL = process.env.LLAMA_API_URL || 'http://192.168.0.178:11434';
const getChatbotResponse = async (message) => {
    try {
        const response = await axios_1.default.post(`${LLAMA_API_URL}/v1/engines/llama3/completions`, {
            prompt: message,
            max_tokens: 4096,
        });
        return response.data.choices[0].text;
    }
    catch (error) {
        console.error('Error fetching chatbot response:', error);
        throw new Error('Failed to fetch chatbot response');
    }
};
exports.getChatbotResponse = getChatbotResponse;
