import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

const BASE_URL = process.env.TEST_API_URL || 'http://localhost:5001/api';

describe('Full-Flow E2E Learner Lifecycle Test', () => {
  let token = null;
  let userId = null;
  let createdQuizId = null;

  test('Step 1: System Health Verification', async () => {
    const res = await fetch(`${BASE_URL}/health`);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(data.services.server.status, 'healthy');
  });

  test('Step 2: Learner Account Registration', async () => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'E2E Mastery Learner',
        email: `e2e_${Date.now()}@example.com`,
        password: 'Password123!',
      }),
    });
    assert.equal(res.status, 201);
    const data = await res.json();
    assert.ok(data.token);
    token = data.token;
    userId = data.user._id || data.user.id;
  });

  test('Step 3: Quiz Authoring & Creation', async () => {
    const res = await fetch(`${BASE_URL}/quizzes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: 'Full-Stack JavaScript E2E Assessment',
        description: 'Testing the entire application stack',
        topic: 'javascript',
        difficulty: 'medium',
        timeLimit: 10,
        questions: [
          {
            question: 'What is the primary difference between let and const in modern JavaScript?',
            options: [
              'let allows re-assignment while const binds an immutable identifier reference',
              'const is hoisted to the global scope while let is block-scoped',
              'let cannot be used inside loops',
              'const values are encrypted in memory',
            ],
            correctAnswer: 0,
            explanation: 'const creates an immutable binding; the variable identifier cannot be reassigned.',
          },
        ],
      }),
    });
    assert.equal(res.status, 201);
    const data = await res.json();
    assert.ok(data.quiz._id || data.quiz.id);
    createdQuizId = data.quiz._id || data.quiz.id;
  });

  test('Step 4: Request In-Quiz AI Hint', async () => {
    const res = await fetch(`${BASE_URL}/ai/hint`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        question: 'What is the primary difference between let and const in modern JavaScript?',
        options: ['let allows re-assignment', 'const is hoisted to global', 'let cannot loop', 'const is encrypted'],
        topic: 'javascript',
      }),
    });
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.ok(data.data?.hint);
  });

  test('Step 5: Submit Quiz Attempt & Evaluate Gamification', async () => {
    const res = await fetch(`${BASE_URL}/quizzes/${createdQuizId}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        answers: [{ questionIndex: 0, selectedOption: 0, timeSpentSeconds: 25 }],
        timeSpentSeconds: 25,
      }),
    });
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.percentage, 100, 'Score should be 100%');
    assert.equal(data.passed, true);
    assert.ok(data.xpEarned >= 10);
    assert.ok(Array.isArray(data.newAchievements), 'Should evaluate achievements');
    const titles = data.newAchievements.map((b) => b.title);
    assert.ok(titles.includes('First Step'), 'Should unlock First Step badge');
    assert.ok(titles.includes('Perfectionist'), 'Should unlock Perfectionist badge');
  });

  test('Step 6: AI Deep Dive & Distractor Breakdown', async () => {
    const res = await fetch(`${BASE_URL}/ai/explain`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        question: 'What is the primary difference between let and const in modern JavaScript?',
        options: ['let allows re-assignment', 'const is hoisted to global', 'let cannot loop', 'const is encrypted'],
        correctAnswer: 0,
        selectedOption: 0,
        topic: 'javascript',
      }),
    });
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.ok(data.data?.whyCorrect);
    assert.ok(data.data?.distractorAnalysis);
  });

  test('Step 7: Verify Redis Leaderboard Standing', async () => {
    const res = await fetch(`${BASE_URL}/leaderboard/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.ok(data.data?.rank >= 1, 'User should be ranked in the global leaderboard');
  });

  test('Step 8: Verify User Performance Analytics', async () => {
    const res = await fetch(`${BASE_URL}/analytics/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.data?.summary?.totalAttempts, 1);
    assert.equal(data.data?.summary?.averageScore, 100);
  });

  test('Step 9: Launch Remedial Weak Practice Quiz', async () => {
    const res = await fetch(`${BASE_URL}/ai/weak-practice`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        weakTopics: ['css', 'python'],
        difficulty: 'medium',
        numberOfQuestions: 3,
      }),
    });
    assert.equal(res.status, 201);
    const data = await res.json();
    assert.ok(data.quiz?.title);
  });

  test('Step 10: Verify Hall of Badges Completion', async () => {
    const res = await fetch(`${BASE_URL}/achievements`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.ok(data.data?.unlockedCount >= 3, 'User should have at least 3 unlocked badges');
    assert.ok(data.data?.completionPercentage >= 30);
  });
});
