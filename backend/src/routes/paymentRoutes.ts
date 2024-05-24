import { Router } from 'express';
import { createPaymentIntent } from '../controllers/paymentController';

const router = Router();

router.post('/create-payment-intent', createPaymentIntent);

export default router;
