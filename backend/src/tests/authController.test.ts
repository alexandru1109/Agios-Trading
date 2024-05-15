import request from 'supertest';
import express from 'express';
import { register } from '../auth/authController';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';

jest.mock('../models/userModel');
jest.mock('bcryptjs');

const app = express();
app.use(express.json());
app.post('/api/auth/register', register);

describe('Auth Controller - Register', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register a user successfully', async () => {
    const mockUser = {
      name: 'John Doe',
      email: 'john@example.com',
      passHash: 'hashedpassword',
      role: 'user',
      strategy: 'strategy1'
    };

    (User.findOne as jest.Mock).mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');
    (User.prototype.save as jest.Mock).mockResolvedValue(mockUser);

    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password',
        role: 'user',
        strategy: 'strategy1'
      });

    expect(response.status).toBe(200);
    expect(response.body.user).toEqual(mockUser);
    expect(response.body.message).toBe('User registered successfully');
  });

  it('should return 400 if user already exists', async () => {
    (User.findOne as jest.Mock).mockResolvedValue({ email: 'john@example.com' });

    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password',
        role: 'user',
        strategy: 'strategy1'
      });

    expect(response.status).toBe(400);
    expect(response.text).toBe('User already exists');
  });

  it('should return 500 if there is an error', async () => {
    (User.findOne as jest.Mock).mockRejectedValue(new Error('Database error'));

    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password',
        role: 'user',
        strategy: 'strategy1'
      });

    expect(response.status).toBe(500);
    expect(response.text).toBe('Database error');
  });
});
