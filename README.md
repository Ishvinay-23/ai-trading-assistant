# 📈 AI Trading Assistant

A full-stack AI-powered stock prediction web application that analyzes stock market trends and provides **BUY / SELL / NO TRADE** signals with confidence scores.

🔗 **Live Demo:** (https://ai-trading-assistant-alpha.vercel.app)
🔗 **Backend API:** (https://ai-trading-assistant-b6ky.onrender.com)

---

## 🚀 Features

✅ Predict stock action using Machine Learning  
✅ Real-time stock data using Yahoo Finance (`yfinance`)  
✅ BUY / SELL / NO TRADE decision system  
✅ Confidence score for each prediction  
✅ Modern responsive frontend UI  
✅ FastAPI backend API  
✅ Deployed on Vercel + Render  

---

## 🧠 How It Works

User enters a stock symbol:

```text
RELIANCE.NS
TCS.NS
INFY.NS

The system:

Fetches latest stock data
Creates technical indicators:
Moving Averages
Volatility
Momentum
Trend
Sends features to trained ML model
Predicts action:
BUY
SELL
NO TRADE
🛠️ Tech Stack
Frontend
React.js
CSS3
Fetch API
Backend
FastAPI
Python
Machine Learning
Scikit-learn
Random Forest Classifier
Pandas
NumPy
Data Source
yfinance
Deployment
Vercel (Frontend)
Render (Backend)
📂 Project Structure
ai-trading-assistant/
│── backend/
│   ├── main.py
│   ├── model.pkl
│   ├── requirements.txt
│
│── frontend-react/
│   ├── src/
│   ├── public/
│   ├── package.json
│
│── README.md
⚙️ Installation (Local Setup)
Clone Repository
git clone https://github.com/YOUR_USERNAME/ai-trading-assistant.git
cd ai-trading-assistant
Backend Setup
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
Frontend Setup
cd frontend-react
npm install
npm start
📡 API Endpoint
POST /predict
Request:
{
  "stock": "RELIANCE.NS"
}
Response:
{
  "stock": "RELIANCE.NS",
  "prediction": 0,
  "confidence": 0.41,
  "decision": "BUY"
}
📈 Machine Learning Model

Used RandomForestClassifier trained on historical stock data with features:

MA_10
MA_20
MA_50
Return
Volatility
Momentum
Trend
🔮 Future Improvements
Candlestick chart integration
News sentiment analysis
Telegram alerts
Portfolio dashboard
Real-time streaming data
User login system
Advanced AI models (LSTM / XGBoost)
👨‍💻 Author

Ishvinay Dewangan
Aspiring AI Developer 🚀

GitHub: https://github.com/Ishvinay-23
