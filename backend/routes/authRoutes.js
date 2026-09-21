import express from 'express';
import { register, login, googleLogin, logout, refresh, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * Public Authentication Endpoints
 */
router.post('/register', register);
router.post('/login', login);
router.post('/google', googleLogin);
router.post('/logout', logout);
router.post('/refresh', refresh);

/**
 * Protected User Profile Endpoint
 */
router.get('/me', protect, getMe);

export default router;
