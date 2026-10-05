import express from 'express';
import { register, login, googleLogin, logout, refresh, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authLimiter } from '../middleware/rateLimitMiddleware.js';

const router = express.Router();

/**
 * Public Authentication Endpoints
 */
router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.post('/google', authLimiter, googleLogin);
router.post('/logout', logout);
router.post('/refresh', refresh);

/**
 * Protected User Profile Endpoint
 */
router.get('/me', protect, getMe);

export default router;
