import express from 'express';
import * as authController from '../auth/authController';

const router = express.Router();

// Ruta pentru înregistrarea utilizatorilor
router.post('/register', authController.register);

// Ruta pentru autentificarea utilizatorilor
router.post('/login', authController.login);

export default router;
