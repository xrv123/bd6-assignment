const { getAllStocks, getStockByTicker } = require('../index');

jest.mock('../index', () => ({
  getAllStocks: jest.fn(),
  getStockByTicker: jest.fn(),
}));

describe('Stocks API', () => {
  it('should fetch all stocks', async () => {
    const mockStocks = [
      { stockId: 1, ticker: 'AAPL', companyName: 'Apple Inc.', price: 4150 },
      {
        stockId: 2,
        ticker: 'GOOGL',
        companyName: 'Alphabet Inc.',
        price: 2034,
      },
    ];

    getAllStocks.mockReturnValue(mockStocks);

    const allStocks = getAllStocks();
    expect(getAllStocks).toHaveBeenCalled();
    expect(allStocks).toEqual(mockStocks);
    expect(allStocks).toHaveLength(2);
  });

  it('should fetch a stock by ticker', async () => {
    const mockStock = {
      stockId: 1,
      ticker: 'AAPL',
      companyName: 'Apple Inc.',
      price: 150,
    };

    getStockByTicker.mockReturnValue(mockStock);

    const stock = getStockByTicker('AAPL');
    expect(getStockByTicker).toHaveBeenCalledWith('AAPL');
    expect(stock).toEqual(mockStock);
  });

  it('should return null for invalid ticker', async () => {
    getStockByTicker.mockReturnValue(null);

    const stock = getStockByTicker('INVALID');
    expect(getStockByTicker).toHaveBeenCalledWith('INVALID');
    expect(stock).toBeNull();
  });
});
