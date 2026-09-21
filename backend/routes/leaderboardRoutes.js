import express from 'express';
import { getLeaderboard, getMyRank, seed } from '../controllers/leaderboardController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * Public Leaderboard Query
 */
router.get('/', getLeaderboard);

/**
 * Authenticated User Rank & Seeding
 */
router.get('/me', protect, getMyRank);
router.post('/seed', protect, seed);

export default router;
