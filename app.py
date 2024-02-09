import yfinance as yf
from fastapi import FastAPI, WebSocket


app = FastAPI()

@app.websocket("/ws")
async def websocket_endpoint(websocket:WebSocket):
    print("Accepting Connection")
    await websocket.accept()
    print("Accepted")
    while True:
        try:
            data = await websocket.receive_text()
            ticker = data.strip() 
            stock_data = get_stock_data(ticker)
            await websocket.send_json(stock_data)
            print(stock_data)
        except:
            pass
            break    

def get_stock_data(ticker: str):
    try:
        data = yf.Ticker(ticker).history(period='1y')
        current_price = "{:.2f}".format(data.iloc[-1].Close)  
        open_price = "{:.2f}".format(data.iloc[-1].Open) 
        return {
            'ticker': ticker,
            'currentPrice': current_price,
            'openPrice': open_price
        }
    except Exception as e:
        return {
            'error': str(e)
        }
