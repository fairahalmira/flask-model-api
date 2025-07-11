import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [features, setFeatures] = useState(["", "", "", ""]);
  const [prediction, setPrediction] = useState("");
  const [status, setStatus] = useState("Checking API connection...");

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL)
      .then(() => setStatus("✅ API Connected"))
      .catch(() => setStatus("❌ API not reachable"));
  }, []);

  const handleChange = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const handleSubmit = async () => {
    const response = await fetch(import.meta.env.VITE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ features }),
    });
    const data = await response.json();
    setPrediction(data.prediction || "No prediction returned");
  };

  return (
    <div className="app-container">
      <h1>🤖 ML Predictor</h1>
      <p className="subtitle">Advanced Machine Learning Prediction System</p>
      <p className="api-status">🔌 {status}</p>

      <div className="input-group">
        {features.map((value, i) => (
          <div key={i} className="input-field">
            <label>Feature {i + 1}</label>
            <input
              type="number"
              value={value}
              onChange={(e) => handleChange(i, e.target.value)}
              placeholder="Enter value"
            />
          </div>
        ))}
      </div>

      <button onClick={handleSubmit}>🚀 GENERATE PREDICTION</button>

      {prediction && (
        <div className="result">
          <strong>Prediction:</strong> {prediction}
        </div>
      )}
    </div>
  );
}

export default App;
