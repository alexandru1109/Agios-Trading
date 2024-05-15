import { Request, Response } from 'express';
import { getChatbotResponse } from '../services/llamaService';

export const chatWithBot = async (req: Request, res: Response) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: 'Message is required' });
  }

  try {
    const botResponse = await getChatbotResponse(message);
    res.status(200).json({ response: botResponse });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error chatting with bot', error: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error' });
    }
  }
};
