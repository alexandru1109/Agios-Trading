import { Router } from 'express';
import { register, login, verify } from '../auth/authController';

const router = Router();

router.post('/register', register);
router.get('/verify/:token', verify);
router.post('/login', login);

export default router;
