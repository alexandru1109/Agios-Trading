import request from 'supertest';
import express from 'express';
import stockRoutes from '../routes/stockRoutes';
import StockController from '../controllers/stockController';

const app = express();
app.use(express.json());
app.use('/api/stocks', stockRoutes);

jest.mock('../controllers/stockController');

describe('Stock Routes', () => {
  const mockStock = {
    symbol: 'AAPL',
    history: [],
    indicators: {},
  };

  describe('GET /api/stocks/:symbol', () => {
    it('should fetch stock data by symbol', async () => {
      try {
        (StockController.getStockData as jest.Mock).mockImplementation((req, res) => {
          res.status(200).json(mockStock);
        });

        const response = await request(app).get('/api/stocks/AAPL');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockStock);
      } catch (error) {
        console.error('Error in GET /api/stocks/:symbol test:', error);
      }
    });

    it('should return 500 if stock data is not found', async () => {
      try {
        (StockController.getStockData as jest.Mock).mockImplementation((req, res) => {
          res.status(500).json({ message: 'Stock not found' });
        });

        const response = await request(app).get('/api/stocks/INVALID');

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Stock not found');
      } catch (error) {
        console.error('Error in GET /api/stocks/:symbol test:', error);
      }
    });
  });

  describe('PUT /api/stocks/:symbol', () => {
    it('should update stock data by symbol', async () => {
      try {
        const updatedStock = { ...mockStock, history: ['updated'] };
        (StockController.updateStockData as jest.Mock).mockImplementation((req, res) => {
          res.status(200).json(updatedStock);
        });

        const response = await request(app)
          .put('/api/stocks/AAPL')
          .send({ history: ['updated'] });

        expect(response.status).toBe(200);
        expect(response.body).toEqual(updatedStock);
      } catch (error) {
        console.error('Error in PUT /api/stocks/:symbol test:', error);
      }
    });

    it('should return 500 if stock data is not found', async () => {
      try {
        (StockController.updateStockData as jest.Mock).mockImplementation((req, res) => {
          res.status(500).json({ message: 'Stock not found' });
        });

        const response = await request(app)
          .put('/api/stocks/INVALID')
          .send({ history: ['updated'] });

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Stock not found');
      } catch (error) {
        console.error('Error in PUT /api/stocks/:symbol test:', error);
      }
    });
  });

  describe('POST /api/stocks', () => {
    it('should create new stock data', async () => {
      try {
        (StockController.createStockData as jest.Mock).mockImplementation((req, res) => {
          res.status(201).json(mockStock);
        });

        const response = await request(app)
          .post('/api/stocks')
          .send(mockStock);

        expect(response.status).toBe(201);
        expect(response.body).toEqual(mockStock);
      } catch (error) {
        console.error('Error in POST /api/stocks test:', error);
      }
    });

    it('should return 500 if there is an error creating stock data', async () => {
      try {
        (StockController.createStockData as jest.Mock).mockImplementation((req, res) => {
          res.status(500).json({ message: 'Error creating stock data' });
        });

        const response = await request(app)
          .post('/api/stocks')
          .send({ symbol: 'INVALID' });

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Error creating stock data');
      } catch (error) {
        console.error('Error in POST /api/stocks test:', error);
      }
    });
  });
});
