"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const llamaService_1 = require("../services/llamaService");
jest.mock('axios');
describe('Llama Service Response', () => {
    const LLAMA_API_URL = process.env.LLAMA_API_URL || 'http://localhost:11434';
    it('should connect to the Ollama API and return chatbot response', async () => {
        const mockResponse = {
            status: 200,
            data: {
                text: 'Hello, this is a bot response'
            }
        };
        axios_1.default.post.mockResolvedValue(mockResponse);
        try {
            const response = await (0, llamaService_1.getChatbotResponse)('Hello bot');
            expect(response).toEqual(mockResponse.data.text);
            expect(axios_1.default.post).toHaveBeenCalledWith(`${LLAMA_API_URL}/api/generate`, {
                model: 'llama3',
                prompt: 'Hello bot',
                options: {
                    num_ctx: 4096
                }
            });
        }
        catch (error) {
            fail('Failed to connect to Ollama API');
        }
    });
    it('should throw an error if the request fails', async () => {
        const mockError = new Error('Service error');
        axios_1.default.post.mockRejectedValue(mockError);
        await expect((0, llamaService_1.getChatbotResponse)('Hello bot')).rejects.toThrow('Failed to fetch chatbot response');
    });
});
