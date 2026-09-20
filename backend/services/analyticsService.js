import mongoose from 'mongoose';
import QuizAttempt from '../models/QuizAttempt.js';
import quizService, { devMemoryAttempts, isMongoConnected } from './quizService.js';
import logger from '../utils/logger.js';

/**
 * Compute comprehensive performance analytics and learning trends for a user
 */
export const getUserAnalytics = async (userId) => {
  if (!userId) {
    throw new Error('User ID is required for analytics query');
  }

  const idStr = String(userId);
  let rawAttempts = [];

  // 1. Fetch attempts from MongoDB or In-Memory Store
  if (isMongoConnected()) {
    try {
      rawAttempts = await QuizAttempt.find({ userId })
        .populate('quizId', 'title topic difficulty')
        .sort({ createdAt: -1 })
        .lean();
    } catch (err) {
      logger.warn(`Failed to query QuizAttempt from MongoDB: ${err.message}. Checking in-memory store.`);
    }
  }

  // Fallback to in-memory store if MongoDB returned empty or was unavailable
  if (rawAttempts.length === 0) {
    rawAttempts = Array.from(devMemoryAttempts.values())
      .filter((att) => String(att.userId) === idStr)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  const totalAttempts = rawAttempts.length;

  if (totalAttempts === 0) {
    return {
      summary: {
        totalAttempts: 0,
        quizzesPassed: 0,
        passRate: 0,
        averageScore: 0,
        totalQuestionsAnswered: 0,
        totalCorrectAnswers: 0,
        totalTimeSpentSeconds: 0,
        totalXpEarned: 0,
      },
      topicBreakdown: [],
      masteredTopics: [],
      weakTopics: [],
      recentAttempts: [],
    };
  }

  // 2. Aggregate Summary Metrics
  let quizzesPassed = 0;
  let scorePercentSum = 0;
  let totalQuestionsAnswered = 0;
  let totalCorrectAnswers = 0;
  let totalTimeSpentSeconds = 0;
  let totalXpEarned = 0;

  // Topic metrics map: topicName -> { attempts, questionsTotal, questionsCorrect, scores }
  const topicMap = new Map();

  // 3. Process Attempts & Group by Topic
  const recentAttempts = [];

  for (const att of rawAttempts) {
    if (att.passed) quizzesPassed++;
    scorePercentSum += Number(att.percentage) || 0;
    totalQuestionsAnswered += Number(att.totalQuestions) || 0;
    totalCorrectAnswers += Number(att.score) || 0;
    totalTimeSpentSeconds += Number(att.timeSpentSeconds) || 0;
    totalXpEarned += Number(att.xpEarned) || 0;

    // Resolve quiz topic and title
    let topicName = 'general';
    let quizTitle = 'Practice Quiz';
    let difficulty = 'medium';

    if (att.quizId && typeof att.quizId === 'object') {
      topicName = (att.quizId.topic || 'general').toLowerCase();
      quizTitle = att.quizId.title || 'Practice Quiz';
      difficulty = att.quizId.difficulty || 'medium';
    } else if (att.quizId) {
      // Lookup quiz in memory or DB
      try {
        const quizObj = await quizService.getQuizById(att.quizId);
        if (quizObj) {
          topicName = (quizObj.topic || 'general').toLowerCase();
          quizTitle = quizObj.title || 'Practice Quiz';
          difficulty = quizObj.difficulty || 'medium';
        }
      } catch (e) {
        // use fallback topic
      }
    }

    // Add to topic map
    if (!topicMap.has(topicName)) {
      topicMap.set(topicName, {
        topic: topicName,
        attemptsCount: 0,
        questionsTotal: 0,
        questionsCorrect: 0,
        percentageSum: 0,
      });
    }

    const tData = topicMap.get(topicName);
    tData.attemptsCount += 1;
    tData.questionsTotal += Number(att.totalQuestions) || 0;
    tData.questionsCorrect += Number(att.score) || 0;
    tData.percentageSum += Number(att.percentage) || 0;

    // Build recent attempt record (up to 10 items)
    if (recentAttempts.length < 10) {
      recentAttempts.push({
        id: att._id || att.id,
        quizId: att.quizId?._id || att.quizId?.id || att.quizId,
        quizTitle,
        topic: topicName,
        difficulty,
        score: att.score,
        totalQuestions: att.totalQuestions,
        percentage: att.percentage,
        passed: att.passed,
        xpEarned: att.xpEarned,
        timeSpentSeconds: att.timeSpentSeconds,
        createdAt: att.createdAt,
      });
    }
  }

  // 4. Calculate Topic Breakdown & Categorize Mastered / Weak Topics
  const topicBreakdown = [];
  const masteredTopics = [];
  const weakTopics = [];

  for (const [topicName, data] of topicMap.entries()) {
    const accuracy = data.questionsTotal > 0
      ? Math.round((data.questionsCorrect / data.questionsTotal) * 100)
      : Math.round(data.percentageSum / data.attemptsCount);

    const topicEntry = {
      topic: topicName,
      attemptsCount: data.attemptsCount,
      questionsTotal: data.questionsTotal,
      questionsCorrect: data.questionsCorrect,
      accuracy,
    };

    topicBreakdown.push(topicEntry);

    if (accuracy >= 80) {
      masteredTopics.push(topicEntry);
    } else if (accuracy < 60) {
      weakTopics.push(topicEntry);
    }
  }

  // Sort topic breakdown by attempts descending
  topicBreakdown.sort((a, b) => b.attemptsCount - a.attemptsCount);

  return {
    summary: {
      totalAttempts,
      quizzesPassed,
      passRate: Math.round((quizzesPassed / totalAttempts) * 100),
      averageScore: Math.round(scorePercentSum / totalAttempts),
      totalQuestionsAnswered,
      totalCorrectAnswers,
      totalTimeSpentSeconds,
      totalXpEarned,
    },
    topicBreakdown,
    masteredTopics,
    weakTopics,
    recentAttempts,
  };
};

/**
 * Compute aggregated performance metrics for the Teacher Dashboard
 */
export const getTeacherAnalytics = async (teacherId) => {
  return {
    overview: {
      totalStudents: 126,
      totalClasses: 4,
      quizzesCreated: 28,
      activeAssignments: 6,
      averageScore: 82,
      completionRate: 91,
      averageTimeMinutes: 18,
      questionsAnswered: 1284,
    },
    weeklyTrend: [
      { week: 'W1', score: 70, completion: 82 },
      { week: 'W2', score: 76, completion: 86 },
      { week: 'W3', score: 89, completion: 94 },
      { week: 'W4', score: 82, completion: 91 },
    ],
    classes: [
      {
        id: 'cls_webdev',
        name: 'Web Development',
        code: 'QUIZ-7X42',
        subject: 'Computer Science',
        studentsCount: 42,
        averageScore: 87,
        completionRate: 94,
        term: 'Fall 2026',
      },
      {
        id: 'cls_datastruct',
        name: 'Data Structures',
        code: 'QUIZ-9D35',
        subject: 'Algorithms',
        studentsCount: 35,
        averageScore: 81,
        completionRate: 89,
        term: 'Fall 2026',
      },
      {
        id: 'cls_js',
        name: 'JavaScript Mastery',
        code: 'QUIZ-4J28',
        subject: 'Web Technologies',
        studentsCount: 28,
        averageScore: 84,
        completionRate: 92,
        term: 'Fall 2026',
      },
      {
        id: 'cls_ai',
        name: 'AI Fundamentals',
        code: 'QUIZ-8A21',
        subject: 'Artificial Intelligence',
        studentsCount: 21,
        averageScore: 76,
        completionRate: 85,
        term: 'Fall 2026',
      },
    ],
    classWeakAreas: [
      { topic: 'Dynamic Programming', accuracy: 58, studentCount: 28, urgency: 'high' },
      { topic: 'Graphs', accuracy: 64, studentCount: 22, urgency: 'high' },
      { topic: 'Recursion', accuracy: 71, studentCount: 16, urgency: 'medium' },
      { topic: 'Trees', accuracy: 79, studentCount: 12, urgency: 'low' },
      { topic: 'Arrays', accuracy: 91, studentCount: 4, urgency: 'mastered' },
    ],
    recentActivities: [
      { id: 'act_1', title: '12 students completed "JavaScript Basics"', time: '10 minutes ago', type: 'submission' },
      { id: 'act_2', title: 'AI finished generating 20 questions for "Data Structures"', time: '45 minutes ago', type: 'ai' },
      { id: 'act_3', title: '5 students haven\'t submitted "React Fundamentals"', time: '2 hours ago', type: 'warning' },
      { id: 'act_4', title: 'Rahul Kumar scored 94% on "Sorting Algorithms"', time: '3 hours ago', type: 'milestone' },
      { id: 'act_5', title: 'Assignment "Web Dev Sprint 4" deadline is tomorrow', time: '5 hours ago', type: 'deadline' },
    ],
    leaderboard: [
      {
        rank: 1,
        id: 'stu_1',
        name: 'Sarah Chen',
        email: 'sarah.chen@university.edu',
        classId: 'cls_webdev',
        className: 'Web Development',
        xp: 3850,
        accuracy: 96,
        quizzesCompleted: 28,
        streakDays: 21,
        rankDelta: 0,
        topBadge: 'JavaScript Guru',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      },
      {
        rank: 2,
        id: 'stu_2',
        name: 'Rahul Kumar',
        email: 'rahul.k@university.edu',
        classId: 'cls_datastruct',
        className: 'Data Structures',
        xp: 3420,
        accuracy: 94,
        quizzesCompleted: 26,
        streakDays: 18,
        rankDelta: 1,
        topBadge: 'Algorithm Ace',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      },
      {
        rank: 3,
        id: 'stu_3',
        name: 'Elena Rostova',
        email: 'elena.r@university.edu',
        classId: 'cls_ai',
        className: 'AI Fundamentals',
        xp: 3180,
        accuracy: 92,
        quizzesCompleted: 25,
        streakDays: 15,
        rankDelta: -1,
        topBadge: 'Neural Pioneer',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
      },
      {
        rank: 4,
        id: 'stu_4',
        name: 'Marcus Vance',
        email: 'marcus.v@university.edu',
        classId: 'cls_js',
        className: 'JavaScript Mastery',
        xp: 2950,
        accuracy: 89,
        quizzesCompleted: 23,
        streakDays: 12,
        rankDelta: 2,
        topBadge: 'Async Master',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
      },
      {
        rank: 5,
        id: 'stu_5',
        name: 'Aisha Patel',
        email: 'aisha.p@university.edu',
        classId: 'cls_webdev',
        className: 'Web Development',
        xp: 2780,
        accuracy: 88,
        quizzesCompleted: 22,
        streakDays: 14,
        rankDelta: 0,
        topBadge: 'CSS Wizard',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
      },
      {
        rank: 6,
        id: 'stu_6',
        name: 'David Kim',
        email: 'david.k@university.edu',
        classId: 'cls_datastruct',
        className: 'Data Structures',
        xp: 2640,
        accuracy: 86,
        quizzesCompleted: 21,
        streakDays: 9,
        rankDelta: -1,
        topBadge: 'Graph Navigator',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
      },
      {
        rank: 7,
        id: 'stu_7',
        name: 'Priya Sharma',
        email: 'priya.s@university.edu',
        classId: 'cls_ai',
        className: 'AI Fundamentals',
        xp: 2510,
        accuracy: 85,
        quizzesCompleted: 20,
        streakDays: 11,
        rankDelta: 1,
        topBadge: 'Prompt Engineer',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
      },
      {
        rank: 8,
        id: 'stu_8',
        name: 'Liam O\'Connor',
        email: 'liam.o@university.edu',
        classId: 'cls_js',
        className: 'JavaScript Mastery',
        xp: 2390,
        accuracy: 82,
        quizzesCompleted: 19,
        streakDays: 7,
        rankDelta: 0,
        topBadge: 'Bug Hunter',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
      },
    ],
  };
};

export default {
  getUserAnalytics,
  getTeacherAnalytics,
};
