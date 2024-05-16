"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatWithBot = void 0;
const axios_1 = __importDefault(require("axios"));
const LLAMA_API_URL = process.env.LLAMA_API_URL || '';
const chatWithBot = async (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ message: 'Message is required' });
    }
    try {
        const response = await axios_1.default.post(`${LLAMA_API_URL}/api/generate`, {
            model: 'llama3',
            prompt: message,
            options: {
                num_ctx: 4096
            }
        });
        // const responseData: ChatbotResponseData[] = response.data;
        // const responseText = responseData.length > 0 ? responseData[0].text : 'No response from bot';
        // return res.status(200).json({ response: responseText });
    }
    catch (error) {
        console.error('Error communicating with Ollama API:', error);
        res.status(500).json({ message: 'Failed to fetch chatbot response' });
    }
};
exports.chatWithBot = chatWithBot;
