"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const llamaService_1 = require("../services/llamaService");
jest.mock('axios');
describe('Llama Service', () => {
    const LLAMA_API_URL = process.env.LLAMA_API_URL || 'http://192.168.0.178:11434';
    let consoleErrorSpy;
    beforeAll(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    });
    afterAll(() => {
        consoleErrorSpy.mockRestore();
    });
    it('should return chatbot response for a valid message', async () => {
        const mockResponse = { data: 'Hello, this is a bot response' };
        axios_1.default.post.mockResolvedValue(mockResponse);
        const response = await (0, llamaService_1.getChatbotResponse)('Hello bot');
        expect(response).toEqual(mockResponse.data);
        expect(axios_1.default.post).toHaveBeenCalledWith(`${LLAMA_API_URL}/chat`, {
            prompt: 'Hello bot',
            model: 'llama3:latest',
            max_tokens: 4096,
        });
    });
    it('should throw an error if the request fails', async () => {
        const mockError = new Error('Service error');
        axios_1.default.post.mockRejectedValue(mockError);
        await expect((0, llamaService_1.getChatbotResponse)('Hello bot')).rejects.toThrow('Failed to fetch chatbot response');
    });
});
