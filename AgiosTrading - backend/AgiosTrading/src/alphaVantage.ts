import axios from 'axios';

const apiKey: string = process.env.ALPHA_VANTAGE_API_KEY || '';
const baseUrl: string = 'https://www.alphavantage.co/query';

interface StockData {
    [key: string]: any;
}

// Function to fetch stock data
export async function fetchStockData(symbol: string): Promise<StockData | null> {
    try {
        const params = {
            function: 'TIME_SERIES_DAILY',
            symbol: symbol,
            apikey: apiKey
        };
        const response = await axios.get<StockData>(baseUrl, { params });
        return response.data;
    } catch (error: any) {
        console.error('Error fetching stock data:', error.message);
        return null;
    }
}
