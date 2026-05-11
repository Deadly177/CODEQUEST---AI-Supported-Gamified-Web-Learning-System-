import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

import { requireAuth } from '../../back end/src/middleware/auth.js';

const require = createRequire(new URL('../../back end/package.json', import.meta.url));
const jwt = require('jsonwebtoken');

process.env.JWT_SECRET = 'codequest-test-secret';

function createResponse() {
  return {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    }
  };
}

test('requireAuth rejects requests with no authorization header', () => {
  const req = { headers: {} };
  const res = createResponse();
  let nextCalled = false;

  requireAuth(req, res, () => {
    nextCalled = true;
  });

  assert.equal(res.statusCode, 401);
  assert.deepEqual(res.body, { error: 'missing token' });
  assert.equal(nextCalled, false);
});

test('requireAuth rejects requests with an invalid token', () => {
  const req = { headers: { authorization: 'Bearer invalid-token' } };
  const res = createResponse();
  let nextCalled = false;

  requireAuth(req, res, () => {
    nextCalled = true;
  });

  assert.equal(res.statusCode, 401);
  assert.deepEqual(res.body, { error: 'invalid or expired token' });
  assert.equal(nextCalled, false);
});

test('requireAuth accepts a valid token and attaches the authenticated user to the request', () => {
  const token = jwt.sign(
    { sub: 'user-123', email: 'learner@example.com', name: 'Learner' },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  const req = { headers: { authorization: `Bearer ${token}` } };
  const res = createResponse();
  let nextCalled = false;

  requireAuth(req, res, () => {
    nextCalled = true;
  });

  assert.equal(res.statusCode, 200);
  assert.equal(res.body, null);
  assert.deepEqual(req.user, {
    id: 'user-123',
    email: 'learner@example.com',
    name: 'Learner'
  });
  assert.equal(nextCalled, true);
});
