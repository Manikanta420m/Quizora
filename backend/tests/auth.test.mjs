import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

const BASE_URL = process.env.TEST_API_URL || 'http://localhost:5001/api';

describe('Authentication & User Management Tests', () => {
  const testUser = {
    name: 'Unit Test User',
    email: `test_auth_${Date.now()}@example.com`,
    password: 'Password123!',
  };
  let authToken = null;

  test('POST /api/auth/register - Should register a new user successfully', async () => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser),
    });

    assert.equal(res.status, 201, 'Registration should return HTTP 201 Created');
    const data = await res.json();
    assert.equal(data.success, true, 'Response success should be true');
    assert.ok(data.token, 'Should return access token');
    assert.equal(data.user.email, testUser.email.toLowerCase());
    authToken = data.token;
  });

  test('POST /api/auth/register - Should reject duplicate email registration', async () => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser),
    });

    assert.ok([400, 409].includes(res.status), 'Duplicate registration should return HTTP 400 or 409');
    const data = await res.json();
    assert.equal(data.success, false);
  });

  test('POST /api/auth/login - Should authenticate user and return token', async () => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testUser.email,
        password: testUser.password,
      }),
    });

    assert.equal(res.status, 200, 'Login should return HTTP 200 OK');
    const data = await res.json();
    assert.equal(data.success, true);
    assert.ok(data.token, 'Login should provide access token');
  });

  test('POST /api/auth/login - Should reject invalid password', async () => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testUser.email,
        password: 'WrongPassword999!',
      }),
    });

    assert.equal(res.status, 401, 'Invalid password should return HTTP 401');
    const data = await res.json();
    assert.equal(data.success, false);
  });

  test('GET /api/auth/me - Should fetch current user profile with Bearer token', async () => {
    const res = await fetch(`${BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });

    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(data.user.email, testUser.email.toLowerCase());
    assert.ok(typeof data.user.xp === 'number', 'User profile should contain XP');
  });

  test('GET /api/auth/me - Should deny access without authorization header', async () => {
    const res = await fetch(`${BASE_URL}/auth/me`);
    assert.equal(res.status, 401, 'Protected route without token should return HTTP 401');
  });

  test('POST /api/auth/google - Should reject request without credential', async () => {
    const res = await fetch(`${BASE_URL}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });

    assert.equal(res.status, 400, 'Missing credential should return HTTP 400');
    const data = await res.json();
    assert.equal(data.success, false);
  });

  test('POST /api/auth/google - Should authenticate with Google credential and issue JWT token', async () => {
    const googleEmail = `google_learner_${Date.now()}@gmail.com`;
    const googleCred = `dev-google-token:${googleEmail}:Google Student:gid_${Date.now()}`;

    const res = await fetch(`${BASE_URL}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        credential: googleCred,
        role: 'student',
      }),
    });

    assert.equal(res.status, 200, 'Google Auth should return HTTP 200 OK');
    const data = await res.json();
    assert.equal(data.success, true);
    assert.ok(data.token, 'Should provide access token');
    assert.equal(data.user.email, googleEmail.toLowerCase());
    assert.equal(data.user.role, 'student');
    assert.ok(data.user.googleId, 'User should have googleId linked');

    // Test session verification with issued token
    const meRes = await fetch(`${BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${data.token}` },
    });
    assert.equal(meRes.status, 200);
    const meData = await meRes.json();
    assert.equal(meData.user.email, googleEmail.toLowerCase());
  });
});
