import React, { useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function App() {
  const [stock, setStock] = useState("");
  const [result, setResult] = useState(null);

  const predict = async () => {
    const response = await fetch("https://ai-trading-assistant-b6ky.onrender.com/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ stock })
    });

    const data = await response.json();
    console.log(data);
    setResult(data);
  };

  return (
  <div style={{
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    minHeight: "100vh",
    color: "white",
    textAlign: "center",
    paddingTop: "50px"
  }}>

    <h1 style={{ fontSize: "32px" }}>📈 AI Trading Assistant</h1>

    <div style={{
      background: "#1e293b",
      padding: "30px",
      borderRadius: "15px",
      width: "350px",
      margin: "auto",
      boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
    }}>

      <input
        placeholder="Enter Stock (e.g. RELIANCE.NS)"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        style={{
          width: "90%",
          padding: "10px",
          borderRadius: "8px",
          border: "none",
          marginBottom: "15px"
        }}
      />

      <br />

      <button
        onClick={predict}
        style={{
          padding: "10px 20px",
          borderRadius: "10px",
          border: "none",
          background: "#22c55e",
          color: "white",
          fontSize: "16px",
          cursor: "pointer"
        }}
      >
        Predict
      </button>

    </div>

    {/* RESULT */}
    {result && (
      <div style={{
        marginTop: "30px",
        background: "#1e293b",
        padding: "20px",
        borderRadius: "12px",
        width: "350px",
        marginLeft: "auto",
        marginRight: "auto"
      }}>

        <h3>{result.stock}</h3>

        <h2 style={{
          color:
            result.decision === "BUY"
              ? "#22c55e"
              : result.decision === "SELL"
              ? "#ef4444"
              : "#eab308"
        }}>
          {result.decision}
        </h2>

        <p>Confidence: {result.confidence?.toFixed(2)}</p>
      </div>
    )}

    {/* CHART */}
    {result?.prices && (
      <div style={{
        width: "600px",
        margin: "30px auto",
        background: "#1e293b",
        padding: "20px",
        borderRadius: "12px"
      }}>
        <Line
          data={{
            labels: result.prices.map((_, i) => i),
            datasets: [
              {
                label: "Stock Price",
                data: result.prices,
                borderColor: "#22c55e",
                fill: false,
              }
            ]
          }}
        />
      </div>
    )}

  </div>
);
}
export default App;