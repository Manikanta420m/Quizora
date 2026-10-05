import express from 'express';
import {
  create,
  getAll,
  getById,
  deleteQuiz,
  seed,
  generate,
  generateFromDocument,
  generateFlashcards,
  submitAttempt,
  getAttempts,
  getQuizLeaderboard,
} from '../controllers/quizController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import { uploadDocument } from '../middleware/uploadMiddleware.js';

const router = express.Router();

/**
 * Public Quiz Browsing Endpoints
 */
router.get('/', getAll);
router.get('/:id', getById);
router.get('/:id/leaderboard', getQuizLeaderboard);

/**
 * Protected Quiz Management & Interactive Test-Taking Endpoints
 */
router.post('/', protect, create);
router.post('/generate', protect, generate);
router.post('/generate-flashcards', protect, generateFlashcards);
router.post('/from-document', protect, uploadDocument.single('document'), generateFromDocument);
router.post('/seed', protect, authorizeRoles('admin'), seed);
router.post('/:id/submit', protect, submitAttempt);
router.get('/:id/attempts', protect, getAttempts);
router.delete('/:id', protect, authorizeRoles('admin', 'teacher'), deleteQuiz);

export default router;

