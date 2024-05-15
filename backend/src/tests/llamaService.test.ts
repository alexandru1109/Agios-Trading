import axios from 'axios';
import { getChatbotResponse } from '../services/llamaService';

jest.mock('axios');

describe('Llama Service', () => {
  const LLAMA_API_URL = process.env.LLAMA_API_URL || '';
  let consoleErrorSpy: jest.SpyInstance;

  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it('should return chatbot response for a valid message', async () => {
    const mockResponse = {
      data: {
        text: 'Hello, this is a bot response'
      }
    };
    (axios.post as jest.Mock).mockResolvedValue(mockResponse);

    const response = await getChatbotResponse('Hello bot');

    expect(response).toEqual(mockResponse.data.text);
    expect(axios.post).toHaveBeenCalledWith(`${LLAMA_API_URL}/api/generate`, {
      model: 'llama3',
      prompt: 'Hello bot',
      options: {
        num_ctx: 4096
      }
    });
  });

  it('should throw an error if the request fails', async () => {
    const mockError = new Error('Service error');
    (axios.post as jest.Mock).mockRejectedValue(mockError);

    await expect(getChatbotResponse('Hello bot')).rejects.toThrow('Failed to fetch chatbot response');
  });

  it('should connect to the Ollama API', async () => {
    try {
      const response = await axios.post(`${LLAMA_API_URL}/api/generate`, {
        model: 'llama3',
        prompt: 'Hello',
        options: {
          num_ctx: 4096
        }
      });
      expect(response.status).toBe(200);
    } catch (error) {
      throw new Error('Failed to connect to Ollama API');
    }
  });
});
