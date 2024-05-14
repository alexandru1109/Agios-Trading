import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Middleware pentru protejarea rutelor
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || '';
    if (!token) {
      return res.status(401).send('Access denied. No token provided.');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(400).send('Invalid token.');
  }
};
