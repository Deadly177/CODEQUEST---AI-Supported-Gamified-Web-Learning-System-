import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

import authRoutes from '../../back end/src/routes/auth.js';
import chatRoutes from '../../back end/src/routes/chat.js';
import { requireAuth } from '../../back end/src/middleware/auth.js';

const require = createRequire(new URL('../../back end/package.json', import.meta.url));
const express = require('express');
const mongoose = require('mongoose');
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');

process.env.JWT_SECRET = 'codequest-chat-api-test-secret';
delete process.env.OPENROUTER_API_KEY;
delete process.env.AI_API_KEY;

let mongoServer;
let app;

async function registerUser() {
  const response = await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Learner',
      email: 'learner@example.com',
      password: 'pass1234'
    });

  assert.equal(response.status, 201);
  return response.body.token;
}

test.before(async () => {
  mongoServer = await MongoMemoryServer.create({
    instance: {
      ip: '127.0.0.1'
    }
  });
  await mongoose.connect(mongoServer.getUri(), { autoIndex: true });

  app = express();
  app.use(express.json());
  app.use('/api/auth', authRoutes);
  app.use('/api/chat', requireAuth, chatRoutes);
});

test.after(async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
});

test.afterEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

test('GET /api/chat/history rejects requests without a token', async () => {
  const response = await request(app).get('/api/chat/history');

  assert.equal(response.status, 401);
  assert.deepEqual(response.body, { error: 'missing token' });
});

test('GET /api/chat/history creates and returns empty history for an authenticated user', async () => {
  const token = await registerUser();

  const response = await request(app)
    .get('/api/chat/history?threadKey=dashboard')
    .set('Authorization', `Bearer ${token}`);

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, { messages: [] });
});

test('DELETE /api/chat/history clears an authenticated user chat thread', async () => {
  const token = await registerUser();

  const response = await request(app)
    .delete('/api/chat/history?threadKey=dashboard')
    .set('Authorization', `Bearer ${token}`);

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, { message: 'chat history cleared' });
});

test('POST /api/chat rejects an empty message', async () => {
  const token = await registerUser();

  const response = await request(app)
    .post('/api/chat')
    .set('Authorization', `Bearer ${token}`)
    .send({
      message: '   ',
      threadKey: 'dashboard'
    });

  assert.equal(response.status, 400);
  assert.deepEqual(response.body, { error: 'message is required' });
});

test('POST /api/chat returns a configuration error when no AI API key is configured', async () => {
  const token = await registerUser();

  const response = await request(app)
    .post('/api/chat')
    .set('Authorization', `Bearer ${token}`)
    .send({
      message: 'Explain HTML headings.',
      threadKey: 'dashboard'
    });

  assert.equal(response.status, 500);
  assert.deepEqual(response.body, {
    error: 'Missing OPENROUTER_API_KEY on the backend server'
  });
});

