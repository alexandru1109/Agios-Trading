"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const chatbotController_1 = require("../controllers/chatbotController");
const llamaService_1 = require("../services/llamaService");
// Creează o aplicație Express pentru testare
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post('/api/chat', chatbotController_1.chatWithBot);
// Mock-uiește funcția getChatbotResponse
jest.mock('../services/llamaService');
describe('Chatbot Controller', () => {
    it('should return 200 and bot response when message is provided', async () => {
        // Setează răspunsul mock pentru getChatbotResponse
        const mockResponse = 'Hello, this is a bot response';
        llamaService_1.getChatbotResponse.mockResolvedValue(mockResponse);
        // Trimite o cerere POST către endpoint-ul de chat
        const response = await (0, supertest_1.default)(app)
            .post('/api/chat')
            .send({ message: 'Hello bot' });
        // Verifică răspunsul
        expect(response.status).toBe(200);
        expect(response.body.response).toBe(mockResponse);
    });
    it('should return 400 when message is not provided', async () => {
        // Trimite o cerere POST fără mesaj
        const response = await (0, supertest_1.default)(app)
            .post('/api/chat')
            .send({});
        // Verifică răspunsul
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Message is required');
    });
    it('should return 500 when there is an error with the chatbot service', async () => {
        // Setează răspunsul mock pentru getChatbotResponse să arunce o eroare
        llamaService_1.getChatbotResponse.mockRejectedValue(new Error('Service error'));
        // Trimite o cerere POST cu un mesaj
        const response = await (0, supertest_1.default)(app)
            .post('/api/chat')
            .send({ message: 'Hello bot' });
        // Verifică răspunsul
        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Error chatting with bot');
    });
});
