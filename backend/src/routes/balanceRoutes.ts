import { Router } from 'express';
import { getBalance, updateBalance } from '../controllers/balanceController';
import authMiddleware from '../auth/authMiddleware';

const router = Router();

router.get('/get', authMiddleware, getBalance);
router.put('/update', authMiddleware, updateBalance);

export default router;
