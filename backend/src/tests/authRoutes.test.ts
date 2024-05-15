import request from 'supertest';
import express from 'express';
import authRoutes from '../routes/authRoutes';
import * as authController from '../auth/authController';

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

jest.mock('../auth/authController');

describe('Auth Routes', () => {
  describe('POST /api/auth/register', () => {
    it('should register a user', async () => {
      (authController.register as jest.Mock).mockImplementation((req, res) => {
        res.status(201).json({ message: 'User registered' });
      });

      const response = await request(app)
        .post('/api/auth/register')
        .send({ name: 'John Doe', email: 'john@example.com', password: 'password' });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('User registered');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login a user', async () => {
      (authController.login as jest.Mock).mockImplementation((req, res) => {
        res.status(200).json({ token: 'fake-jwt-token' });
      });

      const response = await request(app)
        .post('/api/auth/login')
        .send({ email: 'john@example.com', password: 'password' });

      expect(response.status).toBe(200);
      expect(response.body.token).toBe('fake-jwt-token');
    });
  });
});
