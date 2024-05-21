"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChatbotResponse = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const LLAMA_API_URL = process.env.LLAMA_API_URL || '';
const getChatbotResponse = async (message) => {
    var _a;
    if (!LLAMA_API_URL) {
        console.error('LLAMA_API_URL is not set');
        throw new Error('LLAMA_API_URL is not set');
    }
    console.log('Sending request to Ollama API:', LLAMA_API_URL);
    try {
        const response = await axios_1.default.post(`${LLAMA_API_URL}/api/chat`, {
            model: 'llama3',
            messages: [
                {
                    role: 'user',
                    content: message
                }
            ]
        }, {
            responseType: 'stream'
        });
        let responseText = '';
        response.data.on('data', (chunk) => {
            const lines = chunk.toString('utf8').split('\n').filter(line => line.trim() !== '');
            for (const line of lines) {
                try {
                    const parsedLine = JSON.parse(line);
                    if (parsedLine.message && parsedLine.message.role === 'assistant') {
                        responseText += `${parsedLine.message.content} `;
                    }
                }
                catch (error) {
                    console.error('Failed to parse line as JSON:', line);
                }
            }
        });
        await new Promise((resolve, reject) => {
            response.data.on('end', () => resolve());
            response.data.on('error', (err) => reject(err));
        });
        return responseText.trim();
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            console.error('Axios error:', error.message, (_a = error.response) === null || _a === void 0 ? void 0 : _a.data);
        }
        else {
            console.error('Unexpected error:', error);
        }
        throw new Error('Failed to fetch chatbot response');
    }
};
exports.getChatbotResponse = getChatbotResponse;
