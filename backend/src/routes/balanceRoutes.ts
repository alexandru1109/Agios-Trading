import { Router } from 'express';
import { getBalance, updateBalance } from '../controllers/balanceController';
import authMiddleware from '../auth/authMiddleware';

const router = Router();

router.get('/get', authMiddleware, (req, res) => {
    console.log('GET /api/balance/get route hit');
    getBalance(req, res);
});

router.put('/update', authMiddleware, (req, res) => {
    console.log('PUT /api/balance/update route hit');
    updateBalance(req, res);
});

export default router;
