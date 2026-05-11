import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

import authRoutes from '../../back end/src/routes/auth.js';

const require = createRequire(new URL('../../back end/package.json', import.meta.url));
const express = require('express');
const mongoose = require('mongoose');
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');

process.env.JWT_SECRET = 'codequest-api-test-secret';

let mongoServer;
let app;

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

test('POST /api/auth/register creates a user and returns a token', async () => {
  const response = await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Learner',
      email: 'learner@example.com',
      password: 'pass1234'
    });

  assert.equal(response.status, 201);
  assert.equal(response.body.user.name, 'Learner');
  assert.equal(response.body.user.email, 'learner@example.com');
  assert.equal(typeof response.body.token, 'string');
  assert.ok(response.body.token.length > 20);
});

test('POST /api/auth/register rejects missing required fields', async () => {
  const response = await request(app)
    .post('/api/auth/register')
    .send({
      email: 'learner@example.com'
    });

  assert.equal(response.status, 400);
  assert.deepEqual(response.body, {
    error: 'name, email, and password are required'
  });
});

test('POST /api/auth/register rejects duplicate email addresses', async () => {
  await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Learner',
      email: 'learner@example.com',
      password: 'pass1234'
    });

  const response = await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Second Learner',
      email: 'learner@example.com',
      password: 'pass1234'
    });

  assert.equal(response.status, 409);
  assert.deepEqual(response.body, {
    error: 'email already exists'
  });
});

test('POST /api/auth/login accepts valid credentials', async () => {
  await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Learner',
      email: 'learner@example.com',
      password: 'pass1234'
    });

  const response = await request(app)
    .post('/api/auth/login')
    .send({
      identifier: 'learner@example.com',
      password: 'pass1234'
    });

  assert.equal(response.status, 200);
  assert.equal(response.body.user.email, 'learner@example.com');
  assert.equal(typeof response.body.token, 'string');
});

test('POST /api/auth/login rejects invalid credentials', async () => {
  await request(app)
    .post('/api/auth/register')
    .send({
      name: 'Learner',
      email: 'learner@example.com',
      password: 'pass1234'
    });

  const response = await request(app)
    .post('/api/auth/login')
    .send({
      identifier: 'learner@example.com',
      password: 'wrong-password'
    });

  assert.equal(response.status, 401);
  assert.deepEqual(response.body, {
    error: 'invalid credentials'
  });
});

test('POST /api/auth/login rejects missing required fields', async () => {
  const response = await request(app)
    .post('/api/auth/login')
    .send({
      identifier: 'learner@example.com'
    });

  assert.equal(response.status, 400);
  assert.deepEqual(response.body, {
    error: 'identifier and password are required'
  });
});
