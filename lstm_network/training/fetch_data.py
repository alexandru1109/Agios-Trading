import requests
import pandas as pd

def fetch_stock_data(symbol, api_key):
    URL = "https://www.alphavantage.co/query"
    parameters = {
        "function": "TIME_SERIES_DAILY",
        "symbol": symbol,
        "outputsize": "full",
        "datatype": "json",
        "apikey": api_key
    }

    response = requests.get(URL, params=parameters)
    data = response.json()

    df = pd.DataFrame(data['Time Series (Daily)']).T
    df = df.rename(columns={
        '1. open': 'Open',
        '2. high': 'High',
        '3. low': 'Low',
        '4. close': 'Close',
        '5. volume': 'Volume'
    }).astype(float)
    df.index = pd.to_datetime(df.index)
    return df
