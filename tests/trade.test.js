const { addTrade } = require('../index');

jest.mock('../index', () => ({
  addTrade: jest.fn(),
}));

describe('Trades API', () => {
  it('should add a new trade', async () => {
    const newTrade = {
      stockId: 1,
      quantity: 40,
      tradeType: 'buy',
      tradeDate: '2024-12-19',
    };

    const mockTrade = { tradeId: 1, ...newTrade };
    addTrade.mockReturnValue(mockTrade);

    const addedTrade = addTrade(newTrade);

    expect(addedTrade).toEqual(mockTrade);
    expect(addTrade).toHaveBeenCalledWith(newTrade);
  });

  it('should return error for invalid trade data', async () => {
    const newTrade = { stockId: 1 };

    addTrade.mockImplementation(() => {
      throw new Error('Invalid trade data');
    });

    try {
      addTrade(newTrade);
    } catch (error) {
      expect(error.message).toBe('Invalid trade data');
    }
  });
});
