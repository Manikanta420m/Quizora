import express from 'express';
import {
  create,
  getAll,
  getById,
  deleteQuiz,
  seed,
  generate,
  generateFromDocument,
  submitAttempt,
  getAttempts,
} from '../controllers/quizController.js';
import { protect } from '../middleware/authMiddleware.js';
import { uploadDocument } from '../middleware/uploadMiddleware.js';

const router = express.Router();

/**
 * Public Quiz Browsing Endpoints
 */
router.get('/', getAll);
router.get('/:id', getById);

/**
 * Protected Quiz Management & Interactive Test-Taking Endpoints
 */
router.post('/', protect, create);
router.post('/generate', protect, generate);
router.post('/from-document', protect, uploadDocument.single('document'), generateFromDocument);
router.post('/seed', protect, seed);
router.post('/:id/submit', protect, submitAttempt);
router.get('/:id/attempts', protect, getAttempts);
router.delete('/:id', protect, deleteQuiz);

export default router;

