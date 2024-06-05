import { Router } from 'express';
import { getStockGraphData } from '../controllers/stockController';

const router = Router();

router.get('/stock-graph', getStockGraphData);

export default router;
