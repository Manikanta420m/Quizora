import express from 'express';
import {
  getHint,
  getExplanation,
  getSimilarQuestion,
  generateWeakPractice,
} from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';
import { aiHintLimiter } from '../middleware/rateLimitMiddleware.js';

const router = express.Router();

/**
 * Phase 8: Advanced AI Routes
 * All endpoints are secured with protect middleware
 */
router.post('/hint', protect, aiHintLimiter, getHint);
router.post('/explain', protect, aiHintLimiter, getExplanation);
router.post('/similar-question', protect, aiHintLimiter, getSimilarQuestion);
router.post('/weak-practice', protect, aiHintLimiter, generateWeakPractice);

export default router;
