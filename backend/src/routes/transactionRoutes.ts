import { Router } from 'express';
import { addTransaction, getTransactionHistory } from '../controllers/transactionController';
import authMiddleware from '../auth/authMiddleware';

const router = Router();

router.post('/', authMiddleware, addTransaction);
router.get('/', authMiddleware, getTransactionHistory);

export default router;
