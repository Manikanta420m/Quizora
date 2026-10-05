import mongoose from 'mongoose';
import Quiz from '../models/Quiz.js';
import QuizAttempt from '../models/QuizAttempt.js';
import { awardUserGamification } from './authService.js';
import logger from '../utils/logger.js';

// In-memory quiz fallback store for local development if MongoDB is disconnected
export const devMemoryQuizzes = new Map();
export const devMemoryAttempts = new Map();

export const isMongoConnected = () => mongoose.connection.readyState === 1;

const MOCK_SAVED_QUIZZES = {
  'sq_1': {
    _id: 'sq_1',
    id: 'sq_1',
    title: 'JavaScript Advanced',
    topic: 'javascript',
    difficulty: 'hard',
    timeLimit: 15,
    questions: [
      {
        question: 'What is the temporal dead zone in JavaScript?',
        options: ['The time between variable hoisting and initialization', 'A memory leak caused by closures', 'An unreachable block of code', 'The latency of an async fetch request'],
        correctAnswer: 0,
        explanation: 'The Temporal Dead Zone (TDZ) is the period between entering scope and being declared where let and const variables cannot be accessed.'
      },
      {
        question: 'Which of the following is true about JavaScript Maps vs Objects?',
        options: ['Maps have a default prototype chain, Objects do not', 'Object keys can be functions, Map keys cannot', 'Map keys can be any type, Object keys must be strings or Symbols', 'Objects maintain insertion order, Maps do not'],
        correctAnswer: 2,
        explanation: 'Maps allow any data type (including objects and functions) as keys, whereas Object keys must be Strings or Symbols.'
      },
      {
        question: 'How do you correctly clone a deeply nested object in modern JavaScript?',
        options: ['JSON.parse(JSON.stringify(obj))', 'Object.assign({}, obj)', '{...obj}', 'structuredClone(obj)'],
        correctAnswer: 3,
        explanation: 'structuredClone() is the modern, built-in way to deep clone objects in JavaScript, supporting more types than JSON parsing.'
      }
    ]
  },
  'sq_2': {
    _id: 'sq_2',
    id: 'sq_2',
    title: 'React Hooks Deep Dive',
    topic: 'react',
    difficulty: 'medium',
    timeLimit: 10,
    questions: [
      {
        question: 'When exactly does useLayoutEffect fire?',
        options: ['Asynchronously after the browser paints', 'Synchronously after all DOM mutations, before the browser paints', 'Immediately before the component unmounts', 'Before the component renders for the first time'],
        correctAnswer: 1,
        explanation: 'useLayoutEffect fires synchronously after DOM mutations but before the browser has a chance to paint the screen.'
      },
      {
        question: 'What happens if you omit the dependency array in useEffect?',
        options: ['It runs only on mount', 'It runs after every single render', 'It throws an error', 'It never runs'],
        correctAnswer: 1,
        explanation: 'Without a dependency array, useEffect runs after every render, potentially causing infinite loops if it updates state.'
      },
      {
        question: 'What is the primary purpose of useMemo?',
        options: ['To memoize a callback function', 'To trigger side effects', 'To cache the result of an expensive calculation', 'To avoid prop drilling'],
        correctAnswer: 2,
        explanation: 'useMemo caches the result of a calculation between renders. For memoizing functions, you use useCallback.'
      }
    ]
  },
  'sq_3': {
    _id: 'sq_3',
    id: 'sq_3',
    title: 'MongoDB Queries & Aggregation',
    topic: 'databases',
    difficulty: 'medium',
    timeLimit: 12,
    questions: [
      {
        question: 'Which aggregation pipeline stage is used to filter documents?',
        options: ['$group', '$project', '$match', '$filter'],
        correctAnswer: 2,
        explanation: '$match is used to filter documents in the aggregation pipeline, similar to a standard find() query.'
      },
      {
        question: 'How do you perform a left outer join in MongoDB?',
        options: ['$join', '$lookup', '$merge', '$populate'],
        correctAnswer: 1,
        explanation: 'The $lookup stage performs a left outer join to an unsharded collection in the same database.'
      },
      {
        question: 'Which stage modifies the structure of documents passing through the pipeline?',
        options: ['$project', '$group', '$unwind', '$sort'],
        correctAnswer: 0,
        explanation: '$project can pass along, add, remove, or compute new fields for the documents.'
      }
    ]
  },
  'sq_4': {
    _id: 'sq_4',
    id: 'sq_4',
    title: 'Graph Algorithms & BFS/DFS',
    topic: 'dsa',
    difficulty: 'hard',
    timeLimit: 20,
    questions: [
      {
        question: 'Which data structure is naturally used to implement Breadth-First Search (BFS)?',
        options: ['Stack', 'Queue', 'Priority Queue', 'Linked List'],
        correctAnswer: 1,
        explanation: 'BFS explores level by level and requires a Queue (FIFO) to keep track of nodes to visit next.'
      },
      {
        question: 'What is the time complexity of Depth-First Search (DFS) on a graph represented as an adjacency list?',
        options: ['O(V)', 'O(E)', 'O(V + E)', 'O(V * E)'],
        correctAnswer: 2,
        explanation: 'DFS visits every vertex (V) and explores every edge (E), resulting in O(V + E) time complexity.'
      },
      {
        question: 'Which algorithm is best suited for finding the shortest path in an unweighted graph?',
        options: ['Depth-First Search', "Dijkstra's Algorithm", 'Breadth-First Search', 'A* Search'],
        correctAnswer: 2,
        explanation: 'In an unweighted graph, BFS guarantees the shortest path because it explores neighbors uniformly.'
      }
    ]
  }
};

/**
 * Create a new quiz
 */
export const createQuiz = async (userId, data) => {
  const quizPayload = {
    ...data,
    userId,
    topic: data.topic.toLowerCase().trim(),
  };

  if (isMongoConnected()) {
    const quiz = await Quiz.create(quizPayload);
    return quiz;
  }

  // Dev In-Memory Fallback
  const id = new mongoose.Types.ObjectId().toString();
  const memoryQuiz = {
    _id: id,
    id,
    ...quizPayload,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  devMemoryQuizzes.set(id, memoryQuiz);
  logger.warn(`[DEV IN-MEMORY STORE] Created quiz "${memoryQuiz.title}" (ID: ${id}) in local memory`);
  return memoryQuiz;
};

/**
 * Query quizzes with search, filtering, and pagination
 */
export const getQuizzes = async ({ search, topic, difficulty, page = 1, limit = 12 }) => {
  if (isMongoConnected()) {
    const query = {};

    if (topic && topic !== 'all') {
      query.topic = topic.toLowerCase().trim();
    }

    if (difficulty && difficulty !== 'all') {
      query.difficulty = difficulty;
    }

    if (search && search.trim()) {
      query.$or = [
        { title: { $regex: search.trim(), $options: 'i' } },
        { description: { $regex: search.trim(), $options: 'i' } },
        { topic: { $regex: search.trim(), $options: 'i' } },
      ];
    }

    const totalCount = await Quiz.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit) || 1;
    const skip = (page - 1) * limit;

    const quizzes = await Quiz.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'name avatar role');

    let mockArr = Object.values(MOCK_SAVED_QUIZZES);
    
    if (topic && topic !== 'all') {
      mockArr = mockArr.filter((q) => q.topic === topic.toLowerCase().trim());
    }
    if (difficulty && difficulty !== 'all') {
      mockArr = mockArr.filter((q) => q.difficulty === difficulty);
    }
    if (search && search.trim()) {
      const s = search.toLowerCase().trim();
      mockArr = mockArr.filter(
        (q) => q.title.toLowerCase().includes(s) || q.topic.toLowerCase().includes(s)
      );
    }

    const finalQuizzes = page === 1 ? [...mockArr, ...quizzes] : quizzes;

    return {
      quizzes: finalQuizzes,
      pagination: {
        page,
        limit,
        totalPages,
        totalCount: totalCount + mockArr.length,
      },
    };
  }

  // Dev In-Memory Fallback Filter & Pagination
  let filtered = Array.from(devMemoryQuizzes.values());

  if (topic && topic !== 'all') {
    filtered = filtered.filter((q) => q.topic.toLowerCase() === topic.toLowerCase());
  }

  if (difficulty && difficulty !== 'all') {
    filtered = filtered.filter((q) => q.difficulty === difficulty);
  }

  if (search && search.trim()) {
    const s = search.toLowerCase().trim();
    filtered = filtered.filter(
      (q) =>
        q.title.toLowerCase().includes(s) ||
        (q.description && q.description.toLowerCase().includes(s)) ||
        q.topic.toLowerCase().includes(s)
    );
  }

  const totalCount = filtered.length;
  const totalPages = Math.ceil(totalCount / limit) || 1;
  const skip = (page - 1) * limit;
  const paginated = filtered.slice(skip, skip + limit);

  return {
    quizzes: paginated,
    pagination: {
      page,
      limit,
      totalPages,
      totalCount,
    },
  };
};

/**
 * Get a single quiz by ID
 */
export const getQuizById = async (quizId) => {
  if (quizId.startsWith('sq_') && MOCK_SAVED_QUIZZES[quizId]) {
    return MOCK_SAVED_QUIZZES[quizId];
  }

  if (isMongoConnected()) {
    const quiz = await Quiz.findById(quizId).populate('userId', 'name avatar role');
    return quiz;
  }

  // Dev In-Memory Fallback
  return devMemoryQuizzes.get(quizId) || null;
};

/**
 * Delete a quiz (Owner or Admin only)
 */
export const deleteQuiz = async (quizId, userId, userRole) => {
  if (isMongoConnected()) {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      const error = new Error('Quiz not found');
      error.statusCode = 404;
      throw error;
    }

    // Ownership check
    if (quiz.userId.toString() !== userId.toString() && userRole !== 'admin') {
      const error = new Error('You do not have permission to delete this quiz');
      error.statusCode = 403;
      throw error;
    }

    await quiz.deleteOne();
    return { success: true, message: 'Quiz deleted successfully' };
  }

  // Dev In-Memory Fallback
  const quiz = devMemoryQuizzes.get(quizId);
  if (!quiz) {
    const error = new Error('Quiz not found');
    error.statusCode = 404;
    throw error;
  }

  if (quiz.userId?.toString() !== userId.toString() && userRole !== 'admin') {
    const error = new Error('You do not have permission to delete this quiz');
    error.statusCode = 403;
    throw error;
  }

  devMemoryQuizzes.delete(quizId);
  return { success: true, message: 'Quiz deleted successfully' };
};

/**
 * Seed high quality starter quizzes for testing
 */
export const seedStarterQuizzes = async (authorUserId) => {
  const defaultQuizzes = [
    {
      title: 'JavaScript Promises & Async/Await',
      description: 'Test your understanding of asynchronous JavaScript, event loops, and microtask queues.',
      topic: 'javascript',
      difficulty: 'medium',
      questionType: 'multiple_choice',
      timeLimit: 10,
      sourceType: 'manual',
      questions: [
        {
          question: 'What does Promise.all() do when supplied with an array of promises?',
          options: [
            'Executes promises sequentially one after the other',
            'Waits for all promises to resolve, or rejects immediately if any promise rejects',
            'Resolves as soon as the first promise resolves and cancels the rest',
            'Converts asynchronous promises into synchronous blocking callbacks',
          ],
          correctAnswer: 1,
          explanation: 'Promise.all() resolves when all promises fulfill, and rejects as soon as any promise rejects.',
        },
        {
          question: 'In which queue do resolved Promise callbacks (e.g. .then) run in the JavaScript Event Loop?',
          options: [
            'Macrotask queue (Task queue)',
            'Microtask queue',
            'Render queue',
            'Call stack directly without queuing',
          ],
          correctAnswer: 1,
          explanation: 'Promise reactions and queueMicrotask run in the Microtask queue, executing before the next macrotask.',
        },
        {
          question: 'What is the return value of an async function in modern JavaScript?',
          options: [
            'Always undefined',
            'The raw evaluated return value synchronously',
            'Always a Promise that resolves with the returned value',
            'A generator object',
          ],
          correctAnswer: 2,
          explanation: 'Async functions always wrap their return value in a Promise automatically.',
        },
      ],
    },
    {
      title: 'React Fundamentals & Hooks',
      description: 'Core React concepts including useState, useEffect, dependencies, and component lifecycles.',
      topic: 'react',
      difficulty: 'easy',
      questionType: 'multiple_choice',
      timeLimit: 8,
      sourceType: 'manual',
      questions: [
        {
          question: 'Why should you never call React Hooks inside conditional statements or loops?',
          options: [
            'Hooks will throw a syntax error during compilation',
            'React relies on call order across renders to preserve hook state',
            'Loops run asynchronously and miss state updates',
            'Hooks consume double the memory inside loops',
          ],
          correctAnswer: 1,
          explanation: 'React tracks hooks via an internal linked list and requires the order of hook execution to stay identical on every render.',
        },
        {
          question: 'What happens if you omit the dependency array in useEffect(callback)?',
          options: [
            'The effect runs only once on mount',
            'The effect never runs',
            'The effect runs after every single render',
            'The effect throws an unhandled exception',
          ],
          correctAnswer: 2,
          explanation: 'Omitting the dependency array causes useEffect to execute after every initial render and subsequent update.',
        },
      ],
    },
    {
      title: 'Node.js Architecture & Performance',
      description: 'Deep dive into Node.js libuv threads, streams, non-blocking I/O, and clustering.',
      topic: 'node.js',
      difficulty: 'hard',
      questionType: 'multiple_choice',
      timeLimit: 12,
      sourceType: 'manual',
      questions: [
        {
          question: 'How many worker threads does libuv use by default in Node.js for blocking I/O (UV_THREADPOOL_SIZE)?',
          options: ['1 thread', '2 threads', '4 threads', '8 threads'],
          correctAnswer: 2,
          explanation: 'By default, libuv creates a threadpool of 4 threads to handle operations like fs, crypto, and dns.',
        },
        {
          question: 'Which method should you use to handle large files in Node.js without overwhelming RAM?',
          options: [
            'fs.readFileSync()',
            'Streams (fs.createReadStream)',
            'JSON.parse(fs.readFile())',
            'Buffer.allocUnsafe()',
          ],
          correctAnswer: 1,
          explanation: 'Streams process data piece by piece (chunks) in memory, preventing RAM saturation for large files.',
        },
      ],
    },
  ];

  const results = [];
  for (const q of defaultQuizzes) {
    const created = await createQuiz(authorUserId, q);
    results.push(created);
  }

  logger.success(`Seeded ${results.length} starter quizzes successfully`);
  return results;
};

/**
 * Submit and evaluate a quiz attempt
 */
export const submitQuizAttempt = async (quizId, userId, { answers = [], timeSpentSeconds = 0 }) => {
  const quiz = await getQuizById(quizId);
  if (!quiz) {
    const error = new Error('Quiz not found');
    error.statusCode = 404;
    throw error;
  }

  const totalQuestions = quiz.questions?.length || 0;
  if (totalQuestions === 0) {
    const error = new Error('This quiz has no questions to evaluate');
    error.statusCode = 400;
    throw error;
  }

  // Map submitted answers by questionIndex for O(1) lookup
  const submissionMap = new Map();
  answers.forEach((ans) => {
    submissionMap.set(ans.questionIndex, ans);
  });

  let score = 0;
  const processedAnswers = [];
  const questionResults = [];

  quiz.questions.forEach((q, idx) => {
    const submitted = submissionMap.get(idx);
    const selectedOption = submitted !== undefined && submitted !== null ? submitted.selectedOption : -1;
    const isCorrect = selectedOption === q.correctAnswer;

    if (isCorrect) score += 1;

    processedAnswers.push({
      questionIndex: idx,
      selectedOption,
      isCorrect,
      timeSpentSeconds: submitted?.timeSpentSeconds || 0,
    });

    questionResults.push({
      questionIndex: idx,
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      selectedOption,
      isCorrect,
      explanation: q.explanation,
    });
  });

  const percentage = Math.round((score / totalQuestions) * 100);
  const passed = percentage >= 60;
  
  // XP Calculation - Prevent Abuse by checking previous attempts
  let xpEarned = 0;
  let previousAttemptsCount = 0;

  if (isMongoConnected()) {
    previousAttemptsCount = await QuizAttempt.countDocuments({ userId, quizId, passed: true });
  } else {
    // Check in-memory fallback
    const attempts = Array.from(devMemoryAttempts.values());
    previousAttemptsCount = attempts.filter(
      (a) => a.userId === userId && a.quizId === quizId && a.passed
    ).length;
  }

  // Only award XP if this is the first time they passed this specific quiz
  if (previousAttemptsCount === 0) {
    // +10 XP per correct answer, +20 bonus XP for perfect 100%
    xpEarned = score * 10 + (percentage === 100 && totalQuestions > 0 ? 20 : 0);
  }

  // Award XP and streak update to the user
  const updatedUser = await awardUserGamification(userId, xpEarned);

  // Create attempt record
  const attemptPayload = {
    userId,
    quizId,
    score,
    totalQuestions,
    percentage,
    passed,
    xpEarned,
    timeSpentSeconds: Math.max(0, timeSpentSeconds),
    answers: processedAnswers,
  };

  let savedAttempt;
  if (isMongoConnected()) {
    savedAttempt = await QuizAttempt.create(attemptPayload);
  } else {
    const id = new mongoose.Types.ObjectId().toString();
    savedAttempt = {
      _id: id,
      id,
      ...attemptPayload,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    devMemoryAttempts.set(id, savedAttempt);
    logger.warn(`[DEV IN-MEMORY STORE] Saved quiz attempt for user "${userId}" (Score: ${score}/${totalQuestions})`);
  }

  return {
    success: true,
    attempt: savedAttempt,
    score,
    totalQuestions,
    percentage,
    passed,
    xpEarned,
    timeSpentSeconds,
    questionResults,
    userStats: updatedUser
      ? { xp: updatedUser.xp, streak: updatedUser.streak }
      : null,
  };
};

/**
 * Get past attempts for a user
 */
export const getUserAttempts = async (userId, quizId) => {
  if (isMongoConnected()) {
    const query = { userId };
    if (quizId) query.quizId = quizId;
    return await QuizAttempt.find(query).sort({ createdAt: -1 }).limit(20);
  }

  // Dev memory fallback
  let attempts = Array.from(devMemoryAttempts.values()).filter(
    (a) => a.userId?.toString() === userId.toString()
  );
  if (quizId) {
    attempts = attempts.filter((a) => a.quizId?.toString() === quizId.toString());
  }
  return attempts.reverse();
};

/**
 * Get leaderboard for a specific quiz
 */
export const getQuizLeaderboard = async (quizId, limit = 10) => {
  if (isMongoConnected()) {
    // We want the highest score for each user on this quiz.
    // MongoDB aggregation or just find all, group in memory for simplicity/speed for now
    const attempts = await QuizAttempt.find({ quizId }).populate('userId', 'name avatar');
    
    const userBest = new Map();
    attempts.forEach(a => {
      const uId = a.userId?._id?.toString() || a.userId?.id;
      if (!uId) return;
      if (!userBest.has(uId) || userBest.get(uId).score < a.score) {
        userBest.set(uId, {
          userId: uId,
          name: a.userId?.name || 'Anonymous',
          avatar: a.userId?.avatar || '',
          score: a.score,
          percentage: a.percentage,
          timeSpentSeconds: a.timeSpentSeconds,
        });
      }
    });

    return Array.from(userBest.values())
      .sort((a, b) => b.score - a.score || a.timeSpentSeconds - b.timeSpentSeconds)
      .slice(0, limit)
      .map((entry, index) => ({ rank: index + 1, ...entry }));
  }

  // Dev memory fallback
  const attempts = Array.from(devMemoryAttempts.values()).filter(
    (a) => a.quizId?.toString() === quizId.toString()
  );

  const userBest = new Map();
  attempts.forEach(a => {
    const uId = a.userId?.toString();
    if (!uId) return;
    if (!userBest.has(uId) || userBest.get(uId).score < a.score) {
      userBest.set(uId, {
        userId: uId,
        name: 'Learner',
        avatar: '',
        score: a.score,
        percentage: a.percentage,
        timeSpentSeconds: a.timeSpentSeconds,
      });
    }
  });

  return Array.from(userBest.values())
    .sort((a, b) => b.score - a.score || a.timeSpentSeconds - b.timeSpentSeconds)
    .slice(0, limit)
    .map((entry, index) => ({ rank: index + 1, ...entry }));
};

export default {
  createQuiz,
  getQuizzes,
  getQuizById,
  deleteQuiz,
  seedStarterQuizzes,
  submitQuizAttempt,
  getUserAttempts,
  getQuizLeaderboard,
};

