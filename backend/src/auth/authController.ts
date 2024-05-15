import { Request, Response } from 'express';
import { AuthService } from './authService';

// Controller pentru înregistrare
export const register = async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req.body;
      const user = await AuthService.register(username, email, password);
      res.send({ user, message: 'User registered successfully' });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      } else {
        res.status(500).send('An unexpected error occurred');
      }
    }
  };
  

// Controller pentru autentificare
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
  
