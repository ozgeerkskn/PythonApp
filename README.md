# Stock Data App
This project is a web application through which users can monitor stock data in real time. Once users enter a stock symbol, they can see current data for that symbol.

## Features
* Users can add stock symbols and view live data for these symbols via the web interface.
* Users can remove the ticker symbols they have added at any time.
* Current data is retrieved from the server in real time via a WebSocket connection and instantly updated in the user interface.
* In case of error, users are shown an appropriate error message and data flow continues.
  
## Used technologies
* Frontend: React.js
* Backend: Python FastAPI
* Data Source: Yahoo Finance API
* WebSocket Library: WebSocket (frontend), FastAPI (backend)
* 
## Installation and Usage
Clone the repository: git clone https://github.com/username/project-name.git
Go to the frontend folders and install the required dependencies: npm install (frontend) 
Run uvicorn main:app --reload to start the backend server.
Run the npm start command to start the frontend application.
Start using the application by going to http://localhost:3000 in your browser.
