import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const LLAMA_API_URL = process.env.LLAMA_API_URL || '';

export const getChatbotResponse = async (message: string) => {
  try {
    const response = await axios.post(`${LLAMA_API_URL}/chat`, {
      prompt: message,
      model: 'llama3:latest',
      max_tokens: 4096,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching chatbot response:', error);
    throw new Error('Failed to fetch chatbot response');
  }
};
