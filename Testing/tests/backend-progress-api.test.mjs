import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

import authRoutes from '../../back end/src/routes/auth.js';
import progressRoutes from '../../back end/src/routes/progress.js';

const require = createRequire(new URL('../../back end/package.json', import.meta.url));
const express = require('express');
const mongoose = require('mongoose');
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');

process.env.JWT_SECRET = 'codequest-progress-api-test-secret';

let mongoServer;
let app;

async function registerUser(name = 'Learner', email = 'learner@example.com') {
  const response = await request(app)
    .post('/api/auth/register')
    .send({
      name,
      email,
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
  app.use('/api/progress', progressRoutes);
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

test('GET /api/progress rejects requests without a token', async () => {
  const response = await request(app).get('/api/progress');

  assert.equal(response.status, 401);
  assert.deepEqual(response.body, { error: 'missing token' });
});

test('GET /api/progress returns user stats and course summaries for an authenticated user', async () => {
  const token = await registerUser();

  const response = await request(app)
    .get('/api/progress')
    .set('Authorization', `Bearer ${token}`);

  assert.equal(response.status, 200);
  assert.equal(response.body.stats.name, 'Learner');
  assert.equal(response.body.stats.totalPoints, 0);
  assert.ok(Array.isArray(response.body.courses));
  assert.ok(response.body.courses.some((course) => course.id === 'javascript'));
});

test('GET /api/progress/courses/:courseId returns course detail for a valid course', async () => {
  const token = await registerUser();

  const response = await request(app)
    .get('/api/progress/courses/javascript')
    .set('Authorization', `Bearer ${token}`);

  assert.equal(response.status, 200);
  assert.equal(response.body.course.id, 'javascript');
  assert.ok(Array.isArray(response.body.sections));
  assert.equal(response.body.sections[0].lessons[0].locked, false);
});

test('GET /api/progress/courses/:courseId rejects an unknown course', async () => {
  const token = await registerUser();

  const response = await request(app)
    .get('/api/progress/courses/unknown-course')
    .set('Authorization', `Bearer ${token}`);

  assert.equal(response.status, 404);
  assert.deepEqual(response.body, { error: 'course not found' });
});

test('POST /api/progress/lessons/:lessonId/complete awards XP for an unlocked lesson', async () => {
  const token = await registerUser();

  const response = await request(app)
    .post('/api/progress/lessons/js-track-1/complete')
    .set('Authorization', `Bearer ${token}`)
    .send({});

  assert.equal(response.status, 200);
  assert.equal(response.body.awardedPoints, 50);
  assert.equal(response.body.alreadyCompleted, false);
  assert.equal(response.body.stats.totalPoints, 50);
});

test('POST /api/progress/lessons/:lessonId/complete does not award duplicate XP', async () => {
  const token = await registerUser();

  await request(app)
    .post('/api/progress/lessons/js-track-1/complete')
    .set('Authorization', `Bearer ${token}`)
    .send({});

  const response = await request(app)
    .post('/api/progress/lessons/js-track-1/complete')
    .set('Authorization', `Bearer ${token}`)
    .send({});

  assert.equal(response.status, 200);
  assert.equal(response.body.awardedPoints, 0);
  assert.equal(response.body.alreadyCompleted, true);
  assert.equal(response.body.stats.totalPoints, 50);
});

test('POST /api/progress/lessons/:lessonId/complete rejects locked lessons', async () => {
  const token = await registerUser();

  const response = await request(app)
    .post('/api/progress/lessons/js-2/complete')
    .set('Authorization', `Bearer ${token}`)
    .send({});

  assert.equal(response.status, 423);
  assert.deepEqual(response.body, { error: 'lesson is locked' });
});

test('GET /api/progress/leaderboard returns ranked users by XP', async () => {
  const firstToken = await registerUser('First Learner', 'first@example.com');
  await registerUser('Second Learner', 'second@example.com');

  await request(app)
    .post('/api/progress/lessons/js-track-1/complete')
    .set('Authorization', `Bearer ${firstToken}`)
    .send({});

  const response = await request(app)
    .get('/api/progress/leaderboard')
    .set('Authorization', `Bearer ${firstToken}`);

  assert.equal(response.status, 200);
  assert.equal(response.body.entries[0].rank, 1);
  assert.equal(response.body.entries[0].name, 'First Learner');
  assert.equal(response.body.entries[0].xp, 50);
});

