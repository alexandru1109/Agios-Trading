import { Request, Response } from 'express';
import axios from 'axios';

const LLAMA_API_URL = process.env.LLAMA_API_URL || '';

interface ChatbotResponseData {
  text: string;
}

interface ChatbotResponse {
  data: ChatbotResponseData[];
}

export const chatWithBot = async (req: Request, res: Response) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: 'Message is required' });
  }

  try {
    const response = await axios.post<ChatbotResponse>(`${LLAMA_API_URL}/api/generate`, {
      model: 'llama3',
      prompt: message,
      options: {
        num_ctx: 4096
      }
    });

    // const responseData: ChatbotResponseData[] = response.data;
    // const responseText = responseData.length > 0 ? responseData[0].text : 'No response from bot';

    // return res.status(200).json({ response: responseText });
  } catch (error) {
    console.error('Error communicating with Ollama API:', error);
    res.status(500).json({ message: 'Failed to fetch chatbot response' });
  }
};
