import express from 'express';
import { getAchievements, evaluateAchievements } from '../controllers/achievementController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * Phase 10: Gamification Achievements Endpoints
 * All endpoints require authentication
 */
router.get('/', protect, getAchievements);
router.post('/evaluate', protect, evaluateAchievements);

export default router;
