import { test, describe, before } from 'node:test';
import assert from 'node:assert/strict';

const BASE_URL = process.env.TEST_API_URL || 'http://localhost:5001/api';

describe('Gamification, Leaderboard & Badges Tests', () => {
  let authToken = null;
  let testUserId = null;

  before(async () => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Gamification Champ',
        email: `gamify_test_${Date.now()}@example.com`,
        password: 'Password123!',
      }),
    });
    const data = await res.json();
    authToken = data.token;
    testUserId = data.user._id || data.user.id;
  });

  test('GET /api/leaderboard - Should return global leaderboard standings', async () => {
    const res = await fetch(`${BASE_URL}/leaderboard`);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.ok(Array.isArray(data.leaderboard || data.data?.leaderboard));
  });

  test('GET /api/leaderboard/me - Should return authenticated user rank standing', async () => {
    const res = await fetch(`${BASE_URL}/leaderboard/me`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.ok(data.data !== undefined);
    assert.ok(typeof data.data?.xp === 'number');
  });

  test('GET /api/achievements - Should list 10 core badges with lock status', async () => {
    const res = await fetch(`${BASE_URL}/achievements`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(data.data?.totalBadges, 10, 'Registry must define exactly 10 badges');
    assert.ok(Array.isArray(data.data?.badges));
  });

  test('POST /api/achievements/evaluate - Should evaluate badges dynamically', async () => {
    const res = await fetch(`${BASE_URL}/achievements/evaluate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ quizCreated: true }),
    });

    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.ok(Array.isArray(data.newlyUnlocked));
    const unlockedIds = data.newlyUnlocked.map((b) => b.id);
    assert.ok(unlockedIds.includes('MASTER_ARCHITECT'), 'Should unlock Master Architect badge on quiz creation');
  });
});
