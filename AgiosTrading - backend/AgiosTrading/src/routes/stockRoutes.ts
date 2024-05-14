import { Router } from 'express';
import { fetchStockData } from '../controllers/stockController';

const router = Router();

router.get('/:symbol', fetchStockData);

export default router;
