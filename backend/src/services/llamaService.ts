import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const LLAMA_API_URL = process.env.LLAMA_API_URL || '';

interface ChatbotResponseData {
  text: string;
}

interface ChatbotResponse {
  text: string | PromiseLike<string>;
  data: ChatbotResponseData;
}

export const getChatbotResponse = async (message: string): Promise<string> => {
  if (!LLAMA_API_URL) {
    console.error('LLAMA_API_URL is not set');
    throw new Error('LLAMA_API_URL is not set');
  }

  console.log('Sending request to Ollama API:', LLAMA_API_URL);

  try {
    const response = await axios.post<ChatbotResponse>(`${LLAMA_API_URL}/api/generate`, {
      model: 'llama3',
      prompt: message,
      options: {
        num_ctx: 4096
      }
    });
    console.log('Request payload:', {
      model: 'llama3',
      prompt: message,
      options: {
        num_ctx: 4096
      }
    });
    console.log('Response from Ollama API:', response.data);
    return response.data.text;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message, error.response?.data);
    } else {
      console.error('Unexpected error:', error);
    }
    throw new Error('Failed to fetch chatbot response');
  }
};
