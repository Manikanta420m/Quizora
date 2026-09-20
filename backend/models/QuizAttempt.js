import mongoose from 'mongoose';

/**
 * Quiz Attempt Question Answer Schema
 */
const answerItemSchema = new mongoose.Schema(
  {
    questionIndex: {
      type: Number,
      required: true,
    },
    selectedOption: {
      type: Number,
      required: true,
    },
    isCorrect: {
      type: Boolean,
      required: true,
    },
    timeSpentSeconds: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

/**
 * Quiz Attempt Mongoose Schema
 * Records user attempts, scores, XP granted, and answer history.
 */
const quizAttemptSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: [true, 'Quiz ID is required'],
      index: true,
    },
    score: {
      type: Number,
      required: true,
      min: 0,
    },
    totalQuestions: {
      type: Number,
      required: true,
      min: 1,
    },
    percentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    passed: {
      type: Boolean,
      default: false,
    },
    xpEarned: {
      type: Number,
      default: 0,
      min: 0,
    },
    timeSpentSeconds: {
      type: Number,
      default: 0,
      min: 0,
    },
    answers: {
      type: [answerItemSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for querying user performance on specific quizzes
quizAttemptSchema.index({ userId: 1, quizId: 1, createdAt: -1 });

export const QuizAttempt = mongoose.models.QuizAttempt || mongoose.model('QuizAttempt', quizAttemptSchema);
export default QuizAttempt;
