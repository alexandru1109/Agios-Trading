import { Request, Response } from 'express';
import axios from 'axios';

const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';
const NEWS_API_KEY = process.env.NEWS_API_KEY;
const FINNHUB_API_URL = 'https://finnhub.io/api/v1';
const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;

const stockSymbols = ['MSFT', 'AAPL', 'GOOGL'];
const stockSymbols10 = ['MSFT', 'AAPL', 'GOOGL', 'AMZN', 'TSLA', 'FB', 'NFLX', 'NVDA', 'BABA', 'DIS'];


export const getMarketSummary = async (req: Request, res: Response) => {
    if (!FINNHUB_API_KEY) {
        return res.status(500).json({ message: 'Stock API key is not set' });
    }

    try {
        const stockPromises = stockSymbols.map(symbol =>
            axios.get(`${FINNHUB_API_URL}/quote?symbol=${symbol}`, {
                headers: {
                    'X-Finnhub-Token': FINNHUB_API_KEY
                }
            })
        );

        const stockResponses = await Promise.all(stockPromises);

        const stocks = stockResponses.map((response, index) => {
            if (response.status !== 200) {
                console.error(`Error fetching data for symbol ${stockSymbols[index]}: Status ${response.status}`);
                return null;
            }

            const data = response.data;

            if (!data) {
                console.error(`Malformed response for symbol ${stockSymbols[index]}:`, response.data);
                return null;
            }

            return {
                symbol: stockSymbols[index],
                currentPrice: data.c,
                highPrice: data.h,
                lowPrice: data.l,
                openPrice: data.o,
                previousClosePrice: data.pc
            };
        }).filter(stock => stock !== null);

        res.status(200).json({ stocks });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.message);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            }
            res.status(500).json({ message: 'Error fetching market summary', error: error.message });
        } else {
            console.error('Unexpected error:', error);
            res.status(500).json({ message: 'Error fetching market summary', error: String(error) });
        }
    }
};

export const getMarketSummary10 = async (req: Request, res: Response) => {
    if (!FINNHUB_API_KEY) {
        return res.status(500).json({ message: 'Stock API key is not set' });
    }

    try {
        const stockPromises = stockSymbols10.map(symbol =>
            axios.get(`${FINNHUB_API_URL}/quote?symbol=${symbol}`, {
                headers: {
                    'X-Finnhub-Token': FINNHUB_API_KEY
                }
            })
        );

        const stockResponses = await Promise.all(stockPromises);

        const stocks = stockResponses.map((response, index) => {
            if (response.status !== 200) {
                console.error(`Error fetching data for symbol ${stockSymbols10[index]}: Status ${response.status}`);
                return null;
            }

            const data = response.data;

            if (!data) {
                console.error(`Malformed response for symbol ${stockSymbols10[index]}:`, response.data);
                return null;
            }

            return {
                symbol: stockSymbols10[index],
                currentPrice: data.c,
                highPrice: data.h,
                lowPrice: data.l,
                openPrice: data.o,
                previousClosePrice: data.pc
            };
        }).filter(stock => stock !== null);

        res.status(200).json({ stocks });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.message);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            }
            res.status(500).json({ message: 'Error fetching market summary', error: error.message });
        } else {
            console.error('Unexpected error:', error);
            res.status(500).json({ message: 'Error fetching market summary', error: String(error) });
        }
    }
};

export const getMarketNews = async (req: Request, res: Response) => {
    if (!NEWS_API_KEY) {
        return res.status(500).json({ message: 'News API key is not set' });
    }

    try {
        const newsResponse = await axios.get(`${NEWS_API_URL}?category=business&language=en&apiKey=${NEWS_API_KEY}`);
        const news = newsResponse.data.articles;

        res.status(200).json({ news });
    } catch (error) {
        console.error('Error fetching market news:', error);
        res.status(500).json({ message: 'Error fetching market news', error });
    }
};
