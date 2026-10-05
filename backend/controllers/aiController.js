import aiService from '../services/aiService.js';
import { getQuizById } from '../services/quizService.js';
import logger from '../utils/logger.js';

/**
 * Controller: Generate subtle AI hint for in-quiz guidance
 * POST /api/ai/hint
 */
export const getHint = async (req, res, next) => {
  try {
    const { question, options, topic } = req.body;

    if (!question || typeof question !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Question prompt is required to generate a hint',
      });
    }

    const result = await aiService.generateHint({ question, options, topic });
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    logger.error(`Error generating hint: ${error.message}`);
    next(error);
  }
};

/**
 * Controller: Generate deep educational explanation and distractor breakdown
 * POST /api/ai/explain
 */
export const getExplanation = async (req, res, next) => {
  try {
    const { quizId, questionIndex, selectedOption } = req.body;

    if (!quizId || questionIndex === undefined) {
      return res.status(400).json({
        success: false,
        message: 'quizId and questionIndex are required to generate an explanation',
      });
    }

    const quiz = await getQuizById(quizId);
    if (!quiz || !quiz.questions || !quiz.questions[questionIndex]) {
      return res.status(404).json({
        success: false,
        message: 'Quiz or question not found',
      });
    }

    const qItem = quiz.questions[questionIndex];

    const result = await aiService.explainConcept({
      question: qItem.question,
      options: qItem.options,
      correctAnswer: qItem.correctAnswer,
      selectedOption: selectedOption !== undefined && selectedOption !== null ? Number(selectedOption) : null,
      topic: quiz.topic,
    });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    logger.error(`Error generating explanation: ${error.message}`);
    next(error);
  }
};

/**
 * Controller: Generate a similar practice question for misconceptions
 * POST /api/ai/similar-question
 */
export const getSimilarQuestion = async (req, res, next) => {
  try {
    const { question, topic, difficulty } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: 'Reference question is required',
      });
    }

    const result = await aiService.generateSimilarQuestion({
      question,
      topic,
      difficulty: difficulty || 'medium',
    });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    logger.error(`Error generating similar question: ${error.message}`);
    next(error);
  }
};

/**
 * Controller: Generate a targeted remedial quiz for weak topics
 * POST /api/ai/weak-practice
 */
export const generateWeakPractice = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const { weakTopics, difficulty, numberOfQuestions } = req.body;

    const quiz = await aiService.generateWeakTopicPractice(userId, {
      weakTopics: weakTopics || [],
      difficulty: difficulty || 'medium',
      numberOfQuestions: numberOfQuestions ? Number(numberOfQuestions) : 5,
    });

    return res.status(201).json({
      success: true,
      message: 'Weak-topic practice quiz created successfully',
      quiz,
    });
  } catch (error) {
    logger.error(`Error generating weak practice quiz: ${error.message}`);
    next(error);
  }
};

export default {
  getHint,
  getExplanation,
  getSimilarQuestion,
  generateWeakPractice,
};
