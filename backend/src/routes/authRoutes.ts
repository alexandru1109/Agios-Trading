import express from 'express';
import { register, login } from '../auth/authController';

const router = express.Router();

// Ruta pentru înregistrarea utilizatorilor
router.post('/register', register);

// Ruta pentru autentificarea utilizatorilor
router.post('/login', login);

export default router;
