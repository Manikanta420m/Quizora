import { test, describe, before } from 'node:test';
import assert from 'node:assert/strict';

const BASE_URL = process.env.TEST_API_URL || 'http://localhost:5001/api';

describe('Quiz CRUD & Evaluation Tests', () => {
  let authToken = null;
  let testQuizId = null;

  before(async () => {
    // Register isolated user for quiz test suite
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Quiz Tester',
        email: `quiz_test_${Date.now()}@example.com`,
        password: 'Password123!',
      }),
    });
    const data = await res.json();
    authToken = data.token;
  });

  test('POST /api/quizzes - Should create a quiz with questions and options', async () => {
    const quizPayload = {
      title: 'Node.js Architecture Mastery',
      description: 'Testing event loop and streams',
      topic: 'nodejs',
      difficulty: 'medium',
      timeLimit: 15,
      questions: [
        {
          question: 'Which C library manages the event loop and thread pool in Node.js?',
          options: ['V8', 'Libuv', 'OpenSSL', 'Zlib'],
          correctAnswer: 1,
          explanation: 'Libuv provides the event loop, thread pool, and asynchronous I/O primitives.',
        },
        {
          question: 'What is the default thread pool size in Node.js Libuv?',
          options: ['1', '2', '4', '8'],
          correctAnswer: 2,
          explanation: 'The default UV_THREADPOOL_SIZE is 4.',
        },
      ],
    };

    const res = await fetch(`${BASE_URL}/quizzes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(quizPayload),
    });

    assert.equal(res.status, 201);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.ok(data.quiz._id || data.quiz.id);
    testQuizId = data.quiz._id || data.quiz.id;
  });

  test('GET /api/quizzes - Should list quizzes and support topic filtering', async () => {
    const res = await fetch(`${BASE_URL}/quizzes?topic=nodejs`);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.ok(Array.isArray(data.quizzes));
    assert.ok(data.quizzes.length >= 1, 'Should find at least 1 nodejs quiz');
  });

  test('GET /api/quizzes/:id - Should fetch quiz details with question options', async () => {
    const res = await fetch(`${BASE_URL}/quizzes/${testQuizId}`);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(data.quiz.topic, 'nodejs');
    assert.equal(data.quiz.questions.length, 2);
  });

  test('POST /api/quizzes/:id/submit - Should grade quiz and award XP correctly', async () => {
    const submission = {
      answers: [
        { questionIndex: 0, selectedOption: 1, timeSpentSeconds: 20 }, // correct
        { questionIndex: 1, selectedOption: 0, timeSpentSeconds: 15 }, // incorrect
      ],
      timeSpentSeconds: 35,
    };

    const res = await fetch(`${BASE_URL}/quizzes/${testQuizId}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(submission),
    });

    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(data.score, 1, 'Score should be 1 correct out of 2');
    assert.equal(data.totalQuestions, 2);
    assert.equal(data.percentage, 50, 'Percentage should be 50%');
    assert.equal(data.xpEarned, 10, '1 correct answer awards 10 XP');
    assert.ok(Array.isArray(data.questionResults));
  });
});
