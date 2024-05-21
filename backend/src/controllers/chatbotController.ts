import { Request, Response } from 'express';
import { getChatbotResponse } from '../services/llamaService';

export const chatWithBot = async (req: Request, res: Response) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: 'Message is required' });
  }

  try {
    const responseText = await getChatbotResponse(message);
    return res.status(200).json({ response: responseText });
  } catch (error) {
    console.error('Error communicating with Ollama API:', error);
    res.status(500).json({ message: 'Failed to fetch chatbot response' });
  }
};
