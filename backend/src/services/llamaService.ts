import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const LLAMA_API_URL = process.env.LLAMA_API_URL || 'http://192.168.0.178:11434';

interface ChatbotResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    text: string;
    index: number;
    logprobs: any;
    finish_reason: string;
  }>;
}

export const getChatbotResponse = async (message: string): Promise<string> => {
  try {
    const response = await axios.post<ChatbotResponse>(`${LLAMA_API_URL}/v1/engines/llama3/completions`, {
      prompt: message,
      max_tokens: 4096,
    });
    return response.data.choices[0].text;
  } catch (error) {
    console.error('Error fetching chatbot response:', error);
    throw new Error('Failed to fetch chatbot response');
  }
};
