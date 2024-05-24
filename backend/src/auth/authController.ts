import { Request, Response } from 'express';
import AuthService from '../auth/authService';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, strategy } = req.body;
    console.log('Request body:', req.body);
    const user = await AuthService.register(name, email, password, role, strategy);
    res.send({ user, message: 'User registered successfully. Please check your email for the verification link.' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message === 'User already exists') {
        res.status(400).send(error.message); 
      } else {
        res.status(500).send(error.message);
      }
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
      res.status(400).send(error.message); 
    } else {
      res.status(500).send('An unexpected error occurred');
    }
  }
};

export const verify = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    await AuthService.verifyUser(token);
    res.send({ message: 'Email verification successful' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send(error.message); 
    } else {
      res.status(500).send('An unexpected error occurred');
    }
  }
};
