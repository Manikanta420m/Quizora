import express from 'express';
import {
  getHint,
  getExplanation,
  getSimilarQuestion,
  generateWeakPractice,
} from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * Phase 8: Advanced AI Routes
 * All endpoints are secured with protect middleware
 */
router.post('/hint', protect, getHint);
router.post('/explain', protect, getExplanation);
router.post('/similar-question', protect, getSimilarQuestion);
router.post('/weak-practice', protect, generateWeakPractice);

export default router;
