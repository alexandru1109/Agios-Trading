import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Transaction from '../models/transactionModel';

export const addTransaction = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  const userId = (req.user as jwt.JwtPayload & { id: string }).id;
  const { type, quantity, price, date, symbol, strategy } = req.body;

  try {
    const transaction = new Transaction({
      userId,
      type,
      quantity,
      price,
      date,
      symbol,
      strategy,
    });

    await transaction.save();

    res.status(201).json({
      message: 'Transaction added successfully',
      transaction,
    });
  } catch (error) {
    console.error('Error adding transaction:', error);
    res.status(500).json({ message: 'Error adding transaction', error });
  }
};

export const getTransactionHistory = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  const userId = (req.user as jwt.JwtPayload & { id: string }).id;

  try {
    const transactions = await Transaction.find({ userId });

    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching transaction history:', error);
    res.status(500).json({ message: 'Error fetching transaction history', error });
  }
};
