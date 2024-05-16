import { Request, Response } from 'express';
import Transaction from '../models/transactionModel';

interface Portfolio {
  [symbol: string]: {
    quantity: number;
    avgPrice: number;
    totalInvested: number;
  };
}

export const getPortfolio = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(400).json({ message: 'User ID not found' });
  }

  try {
    const transactions = await Transaction.find({ userId });

    const portfolio: Portfolio = transactions.reduce<Portfolio>((acc, transaction) => {
      const { symbol, quantity, price, type } = transaction;

      if (!acc[symbol]) {
        acc[symbol] = { quantity: 0, avgPrice: 0, totalInvested: 0 };
      }

      if (type === 'buy') {
        acc[symbol].quantity += quantity;
        acc[symbol].totalInvested += quantity * price;
        acc[symbol].avgPrice = acc[symbol].totalInvested / acc[symbol].quantity;
      } else if (type === 'sell') {
        acc[symbol].quantity -= quantity;
        acc[symbol].totalInvested -= quantity * price;
        acc[symbol].avgPrice = acc[symbol].totalInvested / acc[symbol].quantity;
      }

      return acc;
    }, {});

    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching portfolio', error });
  }
};
