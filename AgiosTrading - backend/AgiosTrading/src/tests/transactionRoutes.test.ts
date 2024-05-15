import request from 'supertest';
import express from 'express';
import transactionRoutes from '../routes/transactionRoutes';
import * as transactionController from '../controllers/transactionController';
import authMiddleware from '../auth/authMiddleware';

const app = express();
app.use(express.json());
app.use('/api/transactions', transactionRoutes);

jest.mock('../controllers/transactionController');
jest.mock('../auth/authMiddleware', () => jest.fn((req, res, next) => {
  req.user = { _id: '1' }; // Mock user ID
  next();
}));

describe('Transaction Routes', () => {
  const mockTransaction = {
    _id: '1',
    userId: '1',
    type: 'buy',
    quantity: 10,
    price: 150,
    date: new Date(),
    symbol: 'AAPL',
    strategy: 'strategy1',
  };

  describe('POST /api/transactions', () => {
    it('should add a new transaction', async () => {
      (transactionController.addTransaction as jest.Mock).mockImplementation((req, res) => {
        res.status(201).json(mockTransaction);
      });
  
      const response = await request(app)
        .post('/api/transactions')
        .send(mockTransaction);
  
      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        ...mockTransaction,
        date: mockTransaction.date.toISOString()
      });
    });
  
    it('should return 400 if there is an error', async () => {
      (transactionController.addTransaction as jest.Mock).mockImplementation((req, res) => {
        res.status(400).json({ message: 'Error adding transaction' });
      });
  
      const response = await request(app)
        .post('/api/transactions')
        .send({});
  
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Error adding transaction');
    });
  });
  
  describe('GET /api/transactions', () => {
    it('should fetch transaction history', async () => {
      (transactionController.getTransactionHistory as jest.Mock).mockImplementation((req, res) => {
        res.status(200).json([mockTransaction]);
      });
  
      const response = await request(app).get('/api/transactions');
  
      expect(response.status).toBe(200);
      expect(response.body).toEqual([{
        ...mockTransaction,
        date: mockTransaction.date.toISOString()
      }]);
    });
  
    it('should return 400 if there is an error', async () => {
      (transactionController.getTransactionHistory as jest.Mock).mockImplementation((req, res) => {
        res.status(400).json({ message: 'Error fetching transactions' });
      });
  
      const response = await request(app).get('/api/transactions');
  
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Error fetching transactions');
    });
  });  
});
