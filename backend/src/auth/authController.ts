import { Request, Response } from 'express';
import { AuthService } from './authService';
import bcrypt from 'bcryptjs';
import User from '../models/userModel';

// Controller pentru înregistrare
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, strategy } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    const passHash = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      passHash,
      role,
      strategy
    });

    await user.save();

    res.send({ user, message: 'User registered successfully' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send('An unexpected error occurred');
    }
  }
};

export const login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const token = await AuthService.login(email, password);
      res.send({ token, message: 'User logged in successfully' });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      } else {
        res.status(500).send('An unexpected error occurred');
      }
    }
  };
  
