import quizService from '../services/quizService.js';
import aiService from '../services/aiService.js';
import achievementService from '../services/achievementService.js';
import { extractTextFromDocument } from '../services/documentService.js';
import {
  createQuizSchema,
  quizQuerySchema,
  generateQuizSchema,
  generateDocumentQuizSchema,
  submitQuizSchema,
} from '../validators/quizValidators.js';


/**
 * @route   POST /api/quizzes
 * @desc    Create a new quiz
 * @access  Private (Requires authentication)
 */
export const create = async (req, res, next) => {
  try {
    const validatedData = createQuizSchema.parse(req.body);
    const userId = req.user._id || req.user.id;
    const quiz = await quizService.createQuiz(userId, validatedData);

    // Evaluate achievement for creating quizzes
    achievementService.evaluateUserAchievements(userId, { quizCreated: true }).catch(() => {});

    res.status(201).json({
      success: true,
      message: 'Quiz created successfully',
      quiz,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/quizzes
 * @desc    Get all quizzes with optional search, topic, difficulty filters & pagination
 * @access  Public
 */
export const getAll = async (req, res, next) => {
  try {
    const validatedQuery = quizQuerySchema.parse(req.query);
    const result = await quizService.getQuizzes(validatedQuery);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/quizzes/:id
 * @desc    Get a single quiz by ID
 * @access  Public
 */
export const getById = async (req, res, next) => {
  try {
    const quiz = await quizService.getQuizById(req.params.id);
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found',
      });
    }

    res.status(200).json({
      success: true,
      quiz,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/quizzes/:id
 * @desc    Delete a quiz (Author or Admin only)
 * @access  Private
 */
export const deleteQuiz = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const userRole = req.user.role;
    const result = await quizService.deleteQuiz(req.params.id, userId, userRole);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/quizzes/seed
 * @desc    Seed starter quizzes for rapid development and testing
 * @access  Private
 */
export const seed = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const quizzes = await quizService.seedStarterQuizzes(userId);

    res.status(201).json({
      success: true,
      message: `Successfully seeded ${quizzes.length} starter quizzes`,
      count: quizzes.length,
      quizzes,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/quizzes/generate
 * @desc    Generate a new quiz using AI
 * @access  Private (Requires authentication)
 */
export const generate = async (req, res, next) => {
  try {
    const validatedData = generateQuizSchema.parse(req.body);
    const userId = req.user._id || req.user.id;
    const quiz = await aiService.generateAndSaveQuiz(userId, validatedData);

    res.status(201).json({
      success: true,
      message: 'Quiz generated successfully with AI',
      quiz,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/quizzes/from-document
 * @desc    Upload document (PDF/TXT/MD), parse text, and generate assessment quiz
 * @access  Private
 */
export const generateFromDocument = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No document file uploaded. Please select a PDF (.pdf), Text (.txt), or Markdown (.md) file.',
      });
    }

    const validatedParams = generateDocumentQuizSchema.parse(req.body);
    const docData = await extractTextFromDocument(req.file);

    const userId = req.user._id || req.user.id;
    const quiz = await aiService.generateQuizFromDocument(userId, docData, validatedParams);

    res.status(201).json({
      success: true,
      message: `Successfully generated quiz from document "${docData.filename}"`,
      documentStats: {
        filename: docData.filename,
        wordCount: docData.wordCount,
        pageCount: docData.pageCount,
        fileSize: docData.fileSize,
      },
      quiz,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/quizzes/:id/submit
 * @desc    Submit a quiz attempt, evaluate answers, and award XP
 * @access  Private
 */
export const submitAttempt = async (req, res, next) => {
  try {
    const validatedData = submitQuizSchema.parse(req.body);
    const userId = req.user._id || req.user.id;
    const result = await quizService.submitQuizAttempt(req.params.id, userId, validatedData);

    // Evaluate newly unlocked achievements
    let newAchievements = [];
    try {
      newAchievements = await achievementService.evaluateUserAchievements(userId, {
        attempt: result,
        quizId: req.params.id,
      });
    } catch (achErr) {
      // Non-blocking error
    }

    res.status(200).json({
      ...result,
      newAchievements,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/quizzes/:id/attempts
 * @desc    Get user's past attempts for a quiz
 * @access  Private
 */
export const getAttempts = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const attempts = await quizService.getUserAttempts(userId, req.params.id);

    res.status(200).json({
      success: true,
      count: attempts.length,
      attempts,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  create,
  getAll,
  getById,
  deleteQuiz,
  seed,
  generate,
  generateFromDocument,
  submitAttempt,
  getAttempts,
};


