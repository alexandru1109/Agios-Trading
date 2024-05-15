import { Router } from 'express';
import { updateUserProfile } from '../controllers/userController';
import authMiddleware from '../auth/authMiddleware';

const router = Router();

// Define the route to update user profile
router.put('/profile', authMiddleware, updateUserProfile);

export default router;
