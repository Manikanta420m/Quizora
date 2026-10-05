import express from 'express';
import { getLeaderboard, getMyRank, seed } from '../controllers/leaderboardController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

/**
 * Public Leaderboard Query
 */
router.get('/', getLeaderboard);

/**
 * Authenticated User Rank & Seeding
 */
router.get('/me', protect, getMyRank);
router.post('/seed', protect, authorizeRoles('admin'), seed);

export default router;
