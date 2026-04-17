from fastapi import FastAPI
import pickle
import numpy as np
from fastapi.middleware.cors import CORSMiddleware
import yfinance as yf
import pandas as pd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔥 Load model
with open("model.pkl", "rb") as f:
    model = pickle.load(f)


@app.get("/")
def home():
    return {"message": "AI Trading API Running 🚀"}


# 🔥 FEATURE FUNCTION
def get_features(stock):
    df = yf.download(stock, period="3mo")

    if isinstance(df.columns, pd.MultiIndex):
        df.columns = df.columns.get_level_values(0)

    df['MA_10'] = df['Close'].rolling(10).mean()
    df['MA_20'] = df['Close'].rolling(20).mean()
    df['MA_50'] = df['Close'].rolling(50).mean()

    df['Return'] = df['Close'].pct_change()
    df['Volatility'] = df['Close'].rolling(10).std()
    df['Momentum'] = df['Close'] - df['Close'].shift(10)
    df['Trend'] = df['MA_10'] - df['MA_50']

    df = df.dropna()

    if df.empty:
        return None

    latest = df.iloc[-1]

    return {
        "features": [
            latest['MA_10'],
            latest['MA_20'],
            latest['MA_50'],
            latest['Return'],
            latest['Volatility'],
            latest['Momentum'],
            latest['Trend']
        ],
        "prices": df['Close'].tail(30).tolist()
    }


# 🔥 PREDICT API
@app.post("/predict")
def predict(data: dict):

    stock = data.get("stock")

    if not stock:
        return {"error": "Stock symbol required"}

    data_features = get_features(stock)

    if data_features is None:
        return {"error": "Invalid stock or insufficient data"}

    features = np.array(data_features["features"]).reshape(1, -1)
    prices = data_features["prices"]

    prediction = model.predict(features)[0]
    prob = model.predict_proba(features)[0][1]

    if prob > 0.40:
        decision = "BUY"
    elif prob < 0.30:
        decision = "SELL"
    else:
        decision = "NO TRADE"

    return {
        "stock": stock,
        "prediction": int(prediction),
        "confidence": float(prob),
        "decision": decision,
        "prices": prices
    }