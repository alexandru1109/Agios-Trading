import { Router } from 'express';
import StockController from '../controllers/stockController';

const router = Router();

router.get('/:symbol', (req, res) => StockController.getStockData(req, res));
router.put('/:symbol', (req, res) => StockController.updateStockData(req, res));
router.post('/', (req, res) => StockController.createStockData(req, res));

export default router;
