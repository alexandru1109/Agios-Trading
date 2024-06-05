import { Request, Response } from 'express';
import axios from 'axios';
import moment from 'moment';

interface StockData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
}

const FINNHUB_API_URL = 'https://finnhub.io/api/v1';
const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;

export const getStockGraphData = async (req: Request, res: Response) => {
  const symbol = req.query.symbol as string;
  const mode = req.query.mode as string;

  if (!symbol) {
    return res.status(400).json({ message: 'Symbol is required' });
  }

  if (!['week', 'month', 'year'].includes(mode)) {
    return res.status(400).json({ message: 'Invalid mode. Allowed values are: week, month, year' });
  }

  if (!FINNHUB_API_KEY) {
    return res.status(500).json({ message: 'Stock API key is not set' });
  }

  console.log('Using Finnhub API Key:', FINNHUB_API_KEY);

  try {
    const now = moment();
    let startDate: moment.Moment = now;

    switch (mode) {
      case 'week':
        startDate = now.clone().subtract(1, 'week');
        break;
      case 'month':
        startDate = now.clone().subtract(1, 'month');
        break;
      case 'year':
        startDate = now.clone().subtract(1, 'year');
        break;
    }

    const response = await axios.get(`${FINNHUB_API_URL}/stock/candle`, {
      params: {
        symbol,
        resolution: mode === 'week' ? '60' : 'D',
        from: startDate.unix(),
        to: now.unix(),
        token: FINNHUB_API_KEY,
      },
    });

    const data = response.data;

    if (data.s !== 'ok') {
      return res.status(400).json({ message: 'Error fetching stock data' });
    }

    const labels = data.t.map((timestamp: number) => moment.unix(timestamp).format('YYYY-MM-DD'));
    const prices = data.c;

    const graphData: StockData = {
      labels,
      datasets: [
        {
          label: `${symbol} Stock Price`,
          data: prices,
        },
      ],
    };

    res.status(200).json(graphData);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    if (axios.isAxiosError(error)) {
      res.status(500).json({ message: 'Error fetching stock data', error: error.message });
    } else {
      res.status(500).json({ message: 'Error fetching stock data', error: (error as Error).message });
    }
  }
};
