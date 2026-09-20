import mongoose from 'mongoose';

/**
 * Single Question Subdocument Schema
 */
const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, 'Question prompt is required'],
      trim: true,
    },
    options: {
      type: [String],
      required: [true, 'Question must have options'],
      validate: [
        (val) => Array.isArray(val) && val.length >= 2,
        'Question must have at least 2 options',
      ],
    },
    correctAnswer: {
      type: Number,
      required: [true, 'Correct answer index is required'],
      min: [0, 'Correct answer index must be 0 or higher'],
    },
    explanation: {
      type: String,
      required: [true, 'Educational explanation is required'],
      trim: true,
    },
  },
  { _id: true }
);

/**
 * Quiz Mongoose Schema
 */
const quizSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Quiz author (userId) is required'],
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Quiz title is required'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters'],
    },
    description: {
      type: String,
      trim: true,
      default: '',
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    topic: {
      type: String,
      required: [true, 'Topic is required'],
      trim: true,
      lowercase: true,
      index: true,
    },
    difficulty: {
      type: String,
      enum: {
        values: ['easy', 'medium', 'hard'],
        message: '{VALUE} is not a valid difficulty level',
      },
      default: 'medium',
      index: true,
    },
    questionType: {
      type: String,
      enum: {
        values: ['multiple_choice', 'true_false', 'fill_in_the_blank'],
        message: '{VALUE} is not a valid question type',
      },
      default: 'multiple_choice',
    },
    timeLimit: {
      type: Number,
      default: 10,
      min: [1, 'Time limit must be at least 1 minute'],
      max: [180, 'Time limit cannot exceed 180 minutes'],
    },
    questions: {
      type: [questionSchema],
      required: [true, 'At least one question is required'],
      validate: [
        (val) => Array.isArray(val) && val.length > 0,
        'A quiz must contain at least 1 question',
      ],
    },
    sourceType: {
      type: String,
      enum: ['manual', 'ai', 'pdf'],
      default: 'manual',
    },
    sourceMetadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

// Compound indexes for high-performance query filtering and sorting
quizSchema.index({ topic: 1, difficulty: 1 });
quizSchema.index({ userId: 1, createdAt: -1 });

export const Quiz = mongoose.models.Quiz || mongoose.model('Quiz', quizSchema);
export default Quiz;
