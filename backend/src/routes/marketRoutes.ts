import { Router } from 'express';
import { getMarketSummary } from '../controllers/marketController';

const router = Router();

router.get('/market-summary', getMarketSummary);

export default router;
