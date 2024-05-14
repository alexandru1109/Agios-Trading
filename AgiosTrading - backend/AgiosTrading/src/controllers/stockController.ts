import { Request, Response } from 'express';
import { getStockData } from '../services/stockService';

export const fetchStockData = async (req: Request, res: Response) => {
    const { symbol } = req.params;
    try {
        const data = await getStockData(symbol);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch stock data' });
    }
};
