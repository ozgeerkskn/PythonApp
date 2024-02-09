import React from "react";
import StockData from "./components/StockData";

function App() {
  return (
    <div className="App">
      <header
        className="App-header"
        style={{ textAlign: "center", marginBottom: "20px" }}
      >
        <h1
          style={{ fontSize: "24px", fontFamily: "Arial", fontWeight: "bold" }}
        >
          Stock Data App
        </h1>
        <p style={{ fontSize: "16px", fontFamily: "Arial", color: "#666" }}>
          Enter the symbol of the stock you are looking for. (AAPL, BTC, AMZN,
          MSFT, OKE, SOL, CMS, ...)
        </p>
      </header>

      <main>
        <StockData />
      </main>
    </div>
  );
}

export default App;
