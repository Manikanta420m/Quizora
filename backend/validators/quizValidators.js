import { z } from 'zod';

/**
 * Question Validator Schema
 */
export const questionItemSchema = z
  .object({
    question: z
      .string({ required_error: 'Question prompt is required' })
      .trim()
      .min(3, 'Question must be at least 3 characters long'),
    options: z
      .array(z.string().trim().min(1, 'Option cannot be empty'), {
        required_error: 'Options array is required',
      })
      .min(2, 'Each question must have at least 2 options')
      .max(6, 'Each question cannot have more than 6 options'),
    correctAnswer: z
      .number({ required_error: 'Correct answer index is required' })
      .int('Correct answer index must be an integer')
      .min(0, 'Correct answer index cannot be negative'),
    explanation: z
      .string({ required_error: 'Educational explanation is required' })
      .trim()
      .min(3, 'Explanation must be at least 3 characters long'),
  })
  .refine((data) => data.correctAnswer < data.options.length, {
    message: 'correctAnswer index must point to a valid option in the options array',
    path: ['correctAnswer'],
  });

/**
 * Quiz Creation Schema
 */
export const createQuizSchema = z.object({
  title: z
    .string({ required_error: 'Quiz title is required' })
    .trim()
    .min(3, 'Title must be at least 3 characters long')
    .max(120, 'Title cannot exceed 120 characters'),
  description: z.string().trim().max(500, 'Description cannot exceed 500 characters').optional().default(''),
  topic: z
    .string({ required_error: 'Topic is required' })
    .trim()
    .min(2, 'Topic must be at least 2 characters long')
    .max(50, 'Topic cannot exceed 50 characters'),
  difficulty: z.enum(['easy', 'medium', 'hard']).default('medium'),
  questionType: z.enum(['multiple_choice', 'true_false', 'fill_in_the_blank']).default('multiple_choice'),
  timeLimit: z.number().int().min(1).max(180).default(10),
  questions: z
    .array(questionItemSchema, { required_error: 'Questions array is required' })
    .min(1, 'Quiz must contain at least 1 question'),
  sourceType: z.enum(['manual', 'ai', 'pdf']).default('manual'),
  sourceMetadata: z.record(z.any()).optional().default({}),
});

/**
 * Quiz Query / Filter Schema
 */
export const quizQuerySchema = z.object({
  search: z.string().optional(),
  topic: z.string().optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
  page: z
    .string()
    .optional()
    .transform((val) => (val ? Math.max(1, parseInt(val, 10)) : 1)),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? Math.min(50, Math.max(1, parseInt(val, 10))) : 12)),
});

/**
 * AI Quiz Generation Request Schema
 */
export const generateQuizSchema = z.object({
  topic: z
    .string({ required_error: 'Topic is required for AI generation' })
    .trim()
    .min(2, 'Topic must be at least 2 characters long')
    .max(100, 'Topic cannot exceed 100 characters'),
  difficulty: z.enum(['easy', 'medium', 'hard']).default('medium'),
  numberOfQuestions: z.number().int().min(1).max(20).default(5),
  customInstructions: z.string().trim().max(1000).optional().default(''),
});

/**
 * Document Quiz Generation Request Schema (supports multipart form string inputs)
 */
export const generateDocumentQuizSchema = z.object({
  topic: z.string().trim().max(100).optional().default('Document Notes'),
  difficulty: z.enum(['easy', 'medium', 'hard']).default('medium'),
  numberOfQuestions: z.preprocess(
    (val) => (typeof val === 'string' ? parseInt(val, 10) : val || 5),
    z.number().int().min(1).max(20).default(5)
  ),
  customInstructions: z.string().trim().max(1000).optional().default(''),
});

/**
 * Quiz Attempt Submission Schema
 */
export const submitQuizSchema = z.object({
  answers: z
    .array(
      z.object({
        questionIndex: z.number().int().min(0),
        selectedOption: z.number().int().min(0).max(5),
        timeSpentSeconds: z.number().min(0).optional().default(0),
      })
    )
    .default([]),
  timeSpentSeconds: z.number().min(0).optional().default(0),
});

export default {
  questionItemSchema,
  createQuizSchema,
  quizQuerySchema,
  generateQuizSchema,
  generateDocumentQuizSchema,
  submitQuizSchema,
};

