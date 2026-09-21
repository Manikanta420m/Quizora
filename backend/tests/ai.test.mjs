import { test, describe, before } from 'node:test';
import assert from 'node:assert/strict';

const BASE_URL = process.env.TEST_API_URL || 'http://localhost:5001/api';

describe('Advanced AI Features Tests', () => {
  let authToken = null;

  before(async () => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'AI Feature Tester',
        email: `ai_test_${Date.now()}@example.com`,
        password: 'Password123!',
      }),
    });
    const data = await res.json();
    authToken = data.token;
  });

  test('POST /api/ai/hint - Generates in-quiz conceptual clue without spoiling the answer', async () => {
    const res = await fetch(`${BASE_URL}/ai/hint`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        question: 'What triggers a React component to re-render in the Virtual DOM?',
        options: [
          'Directly mutating this.state or a ref',
          'State changes via useState/useReducer, prop updates, or context consumption',
          'Calling console.log',
          'Changing CSS classes on the outer HTML document element',
        ],
        topic: 'react',
      }),
    });

    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.ok(data.data?.hint, 'Should return a non-empty hint string');
    assert.doesNotMatch(data.data.hint, /option\s+[1-4a-d]/i, 'Hint should not disclose option numbers');
  });

  test('POST /api/ai/explain - Returns structured pedagogical breakdown', async () => {
    const res = await fetch(`${BASE_URL}/ai/explain`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        question: 'In the JavaScript Event Loop, which queue takes precedence after synchronous execution?',
        options: [
          'Macrotask Queue',
          'Microtask Queue',
          'Render Animation Frame Queue',
          'I/O Polling Phase',
        ],
        correctAnswer: 1,
        selectedOption: 0,
        topic: 'javascript',
      }),
    });

    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.ok(data.data?.concept, 'Should contain core concept summary');
    assert.ok(data.data?.whyCorrect, 'Should explain why correct choice is optimal');
    assert.ok(data.data?.distractorAnalysis, 'Should analyze distractors and traps');
  });

  test('POST /api/ai/similar-question - Produces aligned 4-option practice question', async () => {
    const res = await fetch(`${BASE_URL}/ai/similar-question`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        question: 'What is the purpose of WeakMap compared to standard Map in JavaScript?',
        topic: 'javascript',
        difficulty: 'medium',
      }),
    });

    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.ok(data.data?.question, 'Should return question text');
    assert.equal(data.data?.options?.length, 4, 'Should provide exactly 4 options');
    assert.ok(typeof data.data?.correctAnswer === 'number', 'Should provide 0-indexed correct answer');
  });

  test('POST /api/ai/weak-practice - Creates tailored quiz targeting specified weak topics', async () => {
    const res = await fetch(`${BASE_URL}/ai/weak-practice`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        weakTopics: ['react', 'css'],
        difficulty: 'medium',
        numberOfQuestions: 3,
      }),
    });

    assert.equal(res.status, 201);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.ok(data.quiz?.title);
    assert.ok(data.quiz?.questions?.length >= 1);
  });
});
