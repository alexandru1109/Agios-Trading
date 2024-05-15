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
        const botResponse = await (0, llamaService_1.getChatbotResponse)(message);
        res.status(200).json({ response: botResponse });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error chatting with bot', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Unknown error' });
        }
    }
};
exports.chatWithBot = chatWithBot;
