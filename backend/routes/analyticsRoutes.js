import express from 'express';
import { getUserStats, getTeacherStats } from '../controllers/analyticsController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

/**
 * Protected Performance Analytics
 */
router.get('/user', protect, getUserStats);
router.get('/teacher', protect, authorizeRoles('teacher', 'admin'), getTeacherStats);

export default router;
