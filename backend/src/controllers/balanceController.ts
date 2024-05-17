import { Request, Response } from 'express';
import Balance from '../models/balanceModel';

export const getBalance = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  console.log('User ID:', userId); // Add this log
  if (!userId) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const balance = await Balance.findOne({ userId });
    if (!balance) {
      return res.status(404).json({ message: 'Balance not found' });
    }

    res.status(200).json({ balance: balance.amount });
  } catch (error) {
    console.error('Error fetching balance:', error);
    res.status(500).json({ message: 'Error fetching balance', error });
  }
};

export const updateBalance = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  console.log('User ID:', userId); // Add this log
  if (!userId) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  const { amount } = req.body;

  try {
    const balance = await Balance.findOneAndUpdate(
      { userId },
      { amount },
      { new: true, upsert: true }
    );

    res.status(200).json({ balance: balance.amount });
  } catch (error) {
    console.error('Error updating balance:', error);
    res.status(500).json({ message: 'Error updating balance', error });
  }
};
