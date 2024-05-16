import express from 'express';
import { chatWithBot } from '../controllers/chatbotController';

const router = express.Router();

router.post('/message', chatWithBot);

export default router;
