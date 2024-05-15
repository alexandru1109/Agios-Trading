import request from 'supertest';
import express from 'express';
import chatbotRoutes from '../routes/chatbotRoutes';
import * as llamaService from '../services/llamaService';

const app = express();
app.use(express.json());
app.use('/api/chatbot', chatbotRoutes);

jest.mock('../services/llamaService');

describe('Chatbot Controller', () => {
  describe('POST /api/chatbot/chat', () => {
    it('should return chatbot response for valid message', async () => {
      const mockResponse = { response: 'Hello, this is a bot response' };
      (llamaService.getChatbotResponse as jest.Mock).mockResolvedValue(mockResponse);

      const response = await request(app)
        .post('/api/chatbot/chat')
        .send({ message: 'Hello bot' });

      expect(response.status).toBe(200);
      expect(response.body.response).toEqual(mockResponse);
    });

    it('should return 400 if message is missing', async () => {
      const response = await request(app)
        .post('/api/chatbot/chat')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Message is required');
    });

    it('should return 500 if there is an error from the service', async () => {
      (llamaService.getChatbotResponse as jest.Mock).mockRejectedValue(new Error('Service error'));

      const response = await request(app)
        .post('/api/chatbot/chat')
        .send({ message: 'Hello bot' });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Error chatting with bot');
    });
  });
});
