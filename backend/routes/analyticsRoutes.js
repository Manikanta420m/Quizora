import express from 'express';
import { getUserStats, getTeacherStats } from '../controllers/analyticsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * Protected Performance Analytics
 */
router.get('/user', protect, getUserStats);
router.get('/teacher', protect, getTeacherStats);

export default router;
