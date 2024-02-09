import React, { useEffect, useState } from "react";

const StockData = () => {
  const [ws, setWs] = useState(null);
  const [ticker, setTicker] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [countdown, setCountdown] = useState(10);
  const [flashColor, setFlashColor] = useState(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/ws");
    setWs(socket);

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (!ws) return;

    const intervalId = setInterval(() => {
      if (countdown === 0) {
        setCountdown(15);
        if (ticker && ticker.trim() !== "") {
          ws.send(ticker);
          setFlashColor("gray-flash");
          setTimeout(() => setFlashColor(null), 1000);
        }
      } else {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }
    }, 1000);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.error) {
        setErrorMessage(data.error);
      } else {
        const existingIndex = searchHistory.findIndex(
          (item) => item.ticker === ticker
        );
        if (existingIndex !== -1) {
          setSearchHistory((prevSearchHistory) => {
            const updatedHistory = [...prevSearchHistory];
            updatedHistory[existingIndex] = { ticker: ticker, data: data };
            return updatedHistory;
          });
        } else {
          setSearchHistory((prevSearchHistory) => [
            ...prevSearchHistory,
            { ticker: ticker, data: data },
          ]);
        }
        setErrorMessage("");
        setFlashColor(
          data.currentPrice > data.openPrice
            ? "gray-flash"
            : data.currentPrice < data.openPrice
            ? "red-flash"
            : "green-flash"
        );
        setTimeout(() => setFlashColor(null), 1000);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      clearInterval(intervalId);
      ws.onmessage = null;
      ws.onclose = null;
    };
  }, [ws, ticker, countdown, searchHistory]);

  const handleTickerChange = (event) => {
    setTicker(event.target.value);
  };

  const handleSubmit = () => {
    if (ws && ticker && ticker.trim() !== "") {
      ws.send(ticker);
    }
  };

  const handleRemove = (index) => {
    const updatedHistory = [...searchHistory];
    updatedHistory.splice(index, 1);
    setSearchHistory(updatedHistory);
  };

  return (
    <div>
      <div
        className="input-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          value={ticker}
          onChange={handleTickerChange}
          placeholder="Enter ticker symbol..."
          style={{ marginRight: "10px" }}
        />
        <button
          onClick={handleSubmit}
          style={{
            backgroundColor: "gray",
            color: "white",
            border: "none",
            marginLeft: "10px",
            padding: "13px 16px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Add Data
        </button>
      </div>

      <div className={`countdown-box `}>
        <p style={{ fontSize: "14px", fontFamily: "Arial", color: "#fff" }}>
          Next update in: {countdown} seconds
        </p>
      </div>
      <div className="container">
        {errorMessage && (
          <div className={`data-box error-box ${flashColor}`}>
            <p className="warning red text">WARNING! </p>
            <p className="text">{`${ticker}`}</p>
            <p>{errorMessage}</p>
            <button
              className="remove-button"
              onClick={() => setErrorMessage("")}
            >
              Remove
            </button>
          </div>
        )}

        {searchHistory.map((item, index) => (
          <div key={index} className={`data-box  ${flashColor}`}>
            <p className="dark-green text">{item.ticker} </p>
            <p className="green text">Curr: ${item.data.currentPrice}</p>
            <p className="dark-red text">Open: ${item.data.openPrice} </p>
            <button
              className="remove-button"
              onClick={() => handleRemove(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockData;
