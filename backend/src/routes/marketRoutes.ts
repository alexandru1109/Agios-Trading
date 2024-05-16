import { Router } from 'express';
import { getMarketSummary, getMarketNews } from '../controllers/marketController';

const router = Router();

router.get('/market-summary', getMarketSummary);
router.get('/market-news', getMarketNews);

export default router;
