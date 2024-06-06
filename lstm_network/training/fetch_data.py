import requests
import pandas as pd

def fetch_stock_data(symbol, api_key):
    URL = f"https://finnhub.io/api/v1/stock/candle"
    parameters = {
        "symbol": symbol,
        "resolution": "D",  # Daily data
        "from": 1583098860,  # Unix timestamp for data start
        "to": 1625098860,    # Unix timestamp for data end
        "token": api_key
    }

    response = requests.get(URL, params=parameters)
    data = response.json()

    if 's' in data and data['s'] == 'ok':
        df = pd.DataFrame({
            'Open': data['o'],
            'High': data['h'],
            'Low': data['l'],
            'Close': data['c'],
            'Volume': data['v']
        })
        df['Date'] = pd.to_datetime(data['t'], unit='s')
        df.set_index('Date', inplace=True)
        return df
    else:
        raise ValueError("Error fetching data from Finnhub API")

# Example usage:
# api_key = 'cp36501r01qvi2qqdio0cp36501r01qvi2qqdiog'
# symbol = 'AAPL'
# df = fetch_stock_data(symbol, api_key)
# print(df.head())
