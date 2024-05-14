import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/dbConnection';
import { fetchStockData } from './alphaVantage';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.get('/stock/:symbol', async (req, res) => {
    const stockData = await fetchStockData(req.params.symbol);
    if (stockData) {
        res.json(stockData);
    } else {
        res.status(500).send('Failed to retrieve data');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
