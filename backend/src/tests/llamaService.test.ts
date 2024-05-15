import axios from 'axios';
import { getChatbotResponse } from '../services/llamaService';

jest.mock('axios');

describe('Llama Service', () => {
  const LLAMA_API_URL = process.env.LLAMA_API_URL || 'http://192.168.0.178:11434';
  let consoleErrorSpy: jest.SpyInstance;

  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it('should return chatbot response for a valid message', async () => {
    const mockResponse = { data: 'Hello, this is a bot response' };
    (axios.post as jest.Mock).mockResolvedValue(mockResponse);

    const response = await getChatbotResponse('Hello bot');

    expect(response).toEqual(mockResponse.data);
    expect(axios.post).toHaveBeenCalledWith(`${LLAMA_API_URL}/chat`, {
      prompt: 'Hello bot',
      model: 'llama3:latest',
      max_tokens: 4096,
    });
  });

  it('should throw an error if the request fails', async () => {
    const mockError = new Error('Service error');
    (axios.post as jest.Mock).mockRejectedValue(mockError);

    await expect(getChatbotResponse('Hello bot')).rejects.toThrow('Failed to fetch chatbot response');
  });
});
