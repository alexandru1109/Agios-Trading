"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatWithBot = void 0;
const llamaService_1 = require("../services/llamaService");
const chatWithBot = async (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ message: 'Message is required' });
    }
    try {
        const responseText = await (0, llamaService_1.getChatbotResponse)(message);
        return res.status(200).json({ response: responseText });
    }
    catch (error) {
        console.error('Error communicating with Ollama API:', error);
        res.status(500).json({ message: 'Failed to fetch chatbot response' });
    }
};
exports.chatWithBot = chatWithBot;
