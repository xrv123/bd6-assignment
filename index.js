const express = require('express');
const cors = require('cors');
const { stocks, trades } = require('./stockData');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Stock Endpoints

app.get('/stocks', (req, res) => {
  const allStocks = getAllStocks();
  res.status(200).json({ stocks: allStocks });
});

app.get('/stocks/:ticker', (req, res) => {
  const ticker = req.params.ticker;
  const stock = getStockByTicker(ticker);
  if (!stock) {
    return res.status(404).json({ error: 'stock not found' });
  }
  res.status(200).json({ stock });
});

// Trades Endpoints

app.post('/trades/new', (req, res) => {
  const { stockId, quantity, tradeType, tradeDate } = req.body;

  if (!stockId || !quantity || !tradeType || !tradeDate) {
    return res.status(400).json({ error: 'Invalid trade data' });
  }

  const trade = addTrade({ stockId, quantity, tradeType, tradeDate });
  res.status(201).json({ trade });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// --- Helper Functions --

const getAllStocks = () => {
  return stocks;
};

const getStockByTicker = (ticker) => {
  return stocks.find((stock) => stock.ticker === ticker) || null;
};

const addTrade = (newTrade) => {
  const tradeId = trades.length + 1;
  const trade = { tradeId, ...newTrade };
  trades.push(trade);
  return trade;
};

module.exports = {
  getAllStocks,
  getStockByTicker,
  addTrade,
};
