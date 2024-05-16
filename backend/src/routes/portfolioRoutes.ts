import { Router } from 'express';
import { getPortfolio } from '../controllers/portfolioController';
import authMiddleware from '../auth/authMiddleware';

const router = Router();

router.get('/portfolio', authMiddleware, getPortfolio);

export default router;
