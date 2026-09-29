/**
 * Frontend Client Services Integration & Contract Tests
 * Validates that frontend service modules correctly communicate with the Express API
 * Strictly 100% Pure JavaScript (ESM, node:test, node:assert)
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

import { healthService } from '../services/api.js';
import { authService } from '../services/authService.js';
import { quizService } from '../services/quizService.js';
import { aiService } from '../services/aiService.js';
import { leaderboardService } from '../services/leaderboardService.js';
import { achievementService } from '../services/achievementService.js';
import { analyticsService } from '../services/analyticsService.js';

describe('Frontend Client API Services Suite', () => {
  let userToken = '';
  let testQuizId = '';
  const testEmail = `frontend_test_${Date.now()}@example.com`;

  test('1. Health Service: backend connectivity & status check', async () => {
    const health = await healthService.getHealth();
    assert.ok(health, 'Health response should be defined');
    assert.equal(health.success, true, 'Health check should report success: true');
    assert.ok(health.services, 'Health response should contain services');
    assert.equal(health.services.server.status, 'healthy');
  });

  test('2. Auth Service: register, login, and getMe flows', async () => {
    // Register
    const regRes = await authService.register({
      name: 'Frontend Test Student',
      email: testEmail,
      password: 'StrongPassword123!',
      role: 'student',
    });
    assert.equal(regRes.success, true, 'Registration should succeed');
    assert.ok(regRes.token, 'Token should be returned');
    assert.equal(regRes.user.email, testEmail);

    // Login
    const loginRes = await authService.login({
      email: testEmail,
      password: 'StrongPassword123!',
    });
    assert.equal(loginRes.success, true, 'Login should succeed');
    assert.ok(loginRes.token, 'Login should return token');
    userToken = loginRes.token;

    // Get Me
    const meRes = await authService.getMe(userToken);
    assert.equal(meRes.success, true, 'getMe should succeed with valid token');
    assert.equal(meRes.user.email, testEmail);
  });

  test('2b. Auth Service: Google authentication flow', async () => {
    const googleEmail = `frontend_google_${Date.now()}@gmail.com`;
    const googleCred = `dev-google-token:${googleEmail}:Google Frontend Tester:gid_fe_${Date.now()}`;

    const res = await authService.googleAuth({
      credential: googleCred,
      role: 'student',
    });

    assert.equal(res.success, true, 'googleAuth should report success: true');
    assert.ok(res.token, 'googleAuth should return JWT token');
    assert.equal(res.user.email, googleEmail.toLowerCase());
    assert.equal(res.user.role, 'student');
    assert.ok(res.user.googleId, 'googleId should be populated');
  });

  test('3. Quiz Service: fetch, create, and get quiz by ID', async () => {
    // Fetch quizzes list
    const listRes = await quizService.getQuizzes({ limit: 5 });
    assert.equal(listRes.success, true, 'getQuizzes should succeed');
    assert.ok(Array.isArray(listRes.quizzes), 'quizzes should be an array');

    // Create a new quiz with valid enum and option indices
    const createRes = await quizService.createQuiz(
      {
        title: 'Frontend Client Service Test Quiz',
        description: 'Verifying client service contracts',
        topic: 'javascript',
        difficulty: 'easy',
        timeLimit: 120,
        questions: [
          {
            question: 'What is typeof null in JavaScript?',
            options: ['null', 'undefined', 'object', 'number'],
            correctAnswer: 2, // 'object'
            explanation: 'In JavaScript, typeof null returns "object" due to historical implementation.',
          },
          {
            question: 'Which method adds elements to the end of an array?',
            options: ['pop()', 'push()', 'shift()', 'unshift()'],
            correctAnswer: 1, // 'push()'
            explanation: 'push() adds one or more elements to the end of an array.',
          },
        ],
      },
      userToken
    );

    assert.equal(createRes.success, true, 'createQuiz should succeed');
    assert.ok(createRes.quiz, 'Created quiz should be returned');
    testQuizId = createRes.quiz._id || createRes.quiz.id;
    assert.ok(testQuizId, 'Quiz ID should exist');

    // Fetch Quiz by ID
    const singleRes = await quizService.getQuizById(testQuizId);
    assert.equal(singleRes.success, true, 'getQuizById should succeed');
    assert.equal(singleRes.quiz.title, 'Frontend Client Service Test Quiz');
  });

  test('4. Quiz Service: submit quiz and evaluate score', async () => {
    const submitPayload = {
      answers: [
        { questionIndex: 0, selectedOption: 2 },
        { questionIndex: 1, selectedOption: 1 },
      ],
      timeSpentSeconds: 25,
    };

    const submitRes = await quizService.submitQuiz(testQuizId, submitPayload, userToken);
    assert.equal(submitRes.success, true, 'submitQuiz should succeed');
    assert.equal(submitRes.score, 2, 'Score should be 2 for 2 correct answers');
    assert.equal(submitRes.percentage, 100, 'Percentage should be 100%');
    assert.ok(submitRes.xpEarned > 0, 'Should award earned XP');
  });

  test('5. AI Service: in-quiz hint generation', async () => {
    const hintRes = await aiService.getHint(
      {
        question: 'How do closures work in JavaScript?',
        options: ['They close the browser', 'They retain access to outer lexical scope', 'They delete memory'],
        topic: 'javascript',
      },
      userToken
    );

    assert.equal(hintRes.success, true, 'aiService.getHint should succeed');
    assert.ok(hintRes.data.hint, 'Should contain hint text');
    assert.ok(hintRes.data.provider || hintRes.data.hint, 'Should contain hint provider or valid clue');
  });

  test('6. AI Service: pedagogical explanation & distractor analysis', async () => {
    const explainRes = await aiService.getExplanation(
      {
        question: 'What is the purpose of Promise.all()?',
        options: ['Runs promises sequentially', 'Runs promises in parallel and resolves when all resolve'],
        correctAnswer: 1,
        selectedOption: 0,
        topic: 'javascript',
      },
      userToken
    );

    assert.equal(explainRes.success, true, 'aiService.getExplanation should succeed');
    assert.ok(explainRes.data.concept, 'Should return concept');
    assert.ok(explainRes.data.whyCorrect, 'Should return whyCorrect explanation');
    assert.ok(explainRes.data.distractorAnalysis, 'Should return distractor analysis');
  });

  test('7. AI Service: similar question & weak-topic practice generation', async () => {
    // Similar Question
    const simRes = await aiService.getSimilarQuestion(
      {
        question: 'What does Array.prototype.map return?',
        topic: 'javascript',
        difficulty: 'easy',
      },
      userToken
    );
    assert.equal(simRes.success, true, 'aiService.getSimilarQuestion should succeed');
    assert.ok(simRes.data.question, 'Should have question text');
    assert.equal(simRes.data.options.length, 4, 'Should have 4 options');

    // Weak Topic Remedial Practice
    const practiceRes = await aiService.generateWeakPractice(
      {
        weakTopics: ['async javascript', 'event loop'],
        difficulty: 'medium',
        numberOfQuestions: 3,
      },
      userToken
    );
    assert.equal(practiceRes.success, true, 'aiService.generateWeakPractice should succeed');
    assert.ok(practiceRes.quiz, 'Should return generated remedial quiz');
    assert.ok(Array.isArray(practiceRes.quiz.questions), 'Should contain questions array');
  });

  test('8. Leaderboard Service: fetch global leaderboard and my rank', async () => {
    // Global Leaderboard
    const lbRes = await leaderboardService.getLeaderboard({ limit: 10 });
    assert.equal(lbRes.success, true, 'getLeaderboard should succeed');
    assert.ok(Array.isArray(lbRes.leaderboard), 'leaderboard should be an array');

    // My Rank (user now has XP from submitting the quiz in test 4)
    const myRankRes = await leaderboardService.getMyRank(userToken);
    assert.equal(myRankRes.success, true, 'getMyRank should succeed');
    assert.ok(myRankRes.data.xp > 0, 'User should now have XP');
  });

  test('9. Achievement Service: fetch achievements registry and evaluate', async () => {
    // Fetch registry and user status
    const achRes = await achievementService.getAchievements(userToken);
    assert.equal(achRes.success, true, 'getAchievements should succeed');
    assert.ok(Array.isArray(achRes.data.badges), 'achievements should be an array');
    assert.ok(achRes.data.badges.length >= 10, 'Should have at least 10 registered badges');

    // Manual evaluation trigger
    const evalRes = await achievementService.evaluateAchievements({}, userToken);
    assert.equal(evalRes.success, true, 'evaluateAchievements should succeed');
    assert.ok(Array.isArray(evalRes.newlyUnlocked), 'Should return newlyUnlocked array');
  });

  test('10. Analytics Service: fetch user and teacher classroom analytics', async () => {
    // User stats
    const userStats = await analyticsService.getUserStats(userToken);
    assert.equal(userStats.success, true, 'getUserStats should succeed');
    assert.ok(userStats.data.summary, 'User stats should include summary');

    // Teacher stats
    const teacherStats = await analyticsService.getTeacherStats(userToken);
    assert.equal(teacherStats.success, true, 'getTeacherStats should succeed');
    assert.ok(teacherStats.data.overview, 'Teacher stats should include overview');
    assert.equal(teacherStats.data.overview.totalClasses, 4);
    assert.ok(Array.isArray(teacherStats.data.classes), 'Classes should be an array');
  });
});
