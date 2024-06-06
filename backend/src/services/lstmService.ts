import axios from "axios";
import { StockData } from "../utils/StockData";

export const fetchStockData = async (symbol: string): Promise<StockData[]> => {
  const URL = "https://www.alphavantage.co/query";
  const parameters = {
    function: "TIME_SERIES_DAILY",
    symbol: symbol,
    outputsize: "full",
    datatype: "json",
    apikey: process.env.ALPHA_VANTAGE_API_KEY || "KE1LFMJTUCSB616G",
  };

  const response = await axios.get(URL, { params: parameters });
  const data = response.data["Time Series (Daily)"];

  const df: StockData[] = Object.keys(data).map((date) => ({
    date: new Date(date),
    open: parseFloat(data[date]["1. open"]),
    high: parseFloat(data[date]["2. high"]),
    low: parseFloat(data[date]["3. low"]),
    close: parseFloat(data[date]["4. close"]),
    volume: parseFloat(data[date]["5. volume"]),
  }));

  return df.sort((a, b) => a.date.getTime() - b.date.getTime());
};
