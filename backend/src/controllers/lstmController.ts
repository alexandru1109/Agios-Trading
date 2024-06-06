import { Request, Response } from "express";
import { fetchStockData } from "../services/lstmService";
import { predictStockPrice } from "../models/lstmModel";
import path from "path";
import fs from "fs";

export const predictStock = async (req: Request, res: Response) => {
  const symbol = req.body.symbol;
  try {
    const { prediction, historicalData } = await predictStockPrice(symbol);

    const firstClosingPrice = historicalData[0];

    const plotPath = path.join(__dirname, "../../static/plot.png");
    fs.writeFileSync(plotPath, "");

    return res.json({ prediction: firstClosingPrice, firstClosingPrice });
  } catch (error) {
    const errorMessage = (error as Error).message;
    return res.status(500).json({ error: errorMessage });
  }
};
