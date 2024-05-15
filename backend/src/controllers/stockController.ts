import { Request, Response } from 'express';
import stockService from '../services/stockService';

class StockController {
  async getStockData(req: Request, res: Response) {
    try {
      const data = await stockService.getStockData(req.params.symbol);
      res.status(200).json(data);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async updateStockData(req: Request, res: Response) {
    try {
      const updatedData = await stockService.updateStockData(req.params.symbol, req.body);
      res.status(200).json(updatedData);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  async createStockData(req: Request, res: Response) {
    try {
      const newStock = await stockService.createStockData(req.body);
      res.status(201).json(newStock);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  private handleError(res: Response, error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
}

export default new StockController();
