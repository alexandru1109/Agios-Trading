"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const chatbotRoutes_1 = __importDefault(require("../routes/chatbotRoutes"));
const llamaService = __importStar(require("../services/llamaService"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/chatbot', chatbotRoutes_1.default);
jest.mock('../services/llamaService');
describe('Chatbot Controller', () => {
    describe('POST /api/chatbot/chat', () => {
        it('should return chatbot response for valid message', async () => {
            const mockResponse = { response: 'Hello, this is a bot response' };
            llamaService.getChatbotResponse.mockResolvedValue(mockResponse);
            const response = await (0, supertest_1.default)(app)
                .post('/api/chatbot/chat')
                .send({ message: 'Hello bot' });
            expect(response.status).toBe(200);
            expect(response.body.response).toEqual(mockResponse);
        });
        it('should return 400 if message is missing', async () => {
            const response = await (0, supertest_1.default)(app)
                .post('/api/chatbot/chat')
                .send({});
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Message is required');
        });
        it('should return 500 if there is an error from the service', async () => {
            llamaService.getChatbotResponse.mockRejectedValue(new Error('Service error'));
            const response = await (0, supertest_1.default)(app)
                .post('/api/chatbot/chat')
                .send({ message: 'Hello bot' });
            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Error chatting with bot');
        });
    });
});
