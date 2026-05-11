import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

import authRoutes from '../../back end/src/routes/auth.js';
import userRoutes from '../../back end/src/routes/users.js';

const require = createRequire(new URL('../../back end/package.json', import.meta.url));
const express = require('express');
const mongoose = require('mongoose');
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');

process.env.JWT_SECRET = 'codequest-user-profile-api-test-secret';

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
  app.use('/api/users', userRoutes);
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

test('GET /api/users/me rejects requests without a token', async () => {
  const response = await request(app).get('/api/users/me');

  assert.equal(response.status, 401);
  assert.deepEqual(response.body, { error: 'missing token' });
});

test('GET /api/users/me returns profile and stats for an authenticated user', async () => {
  const token = await registerUser();

  const response = await request(app)
    .get('/api/users/me')
    .set('Authorization', `Bearer ${token}`);

  assert.equal(response.status, 200);
  assert.equal(response.body.user.name, 'Learner');
  assert.equal(response.body.user.email, 'learner@example.com');
  assert.equal(response.body.stats.totalPoints, 0);
});

test('PATCH /api/users/me updates the authenticated user name', async () => {
  const token = await registerUser();

  const response = await request(app)
    .patch('/api/users/me')
    .set('Authorization', `Bearer ${token}`)
    .send({ name: 'Updated Learner' });

  assert.equal(response.status, 200);
  assert.equal(response.body.user.name, 'Updated Learner');
  assert.equal(response.body.stats.name, 'Updated Learner');
});

test('PATCH /api/users/me rejects an empty name', async () => {
  const token = await registerUser();

  const response = await request(app)
    .patch('/api/users/me')
    .set('Authorization', `Bearer ${token}`)
    .send({ name: '   ' });

  assert.equal(response.status, 400);
  assert.deepEqual(response.body, { error: 'name is required' });
});

test('PATCH /api/users/me/password rejects an incorrect current password', async () => {
  const token = await registerUser();

  const response = await request(app)
    .patch('/api/users/me/password')
    .set('Authorization', `Bearer ${token}`)
    .send({
      currentPassword: 'wrong-password',
      newPassword: 'newpass123'
    });

  assert.equal(response.status, 401);
  assert.deepEqual(response.body, { error: 'current password is incorrect' });
});

test('PATCH /api/users/me/password rejects a short new password', async () => {
  const token = await registerUser();

  const response = await request(app)
    .patch('/api/users/me/password')
    .set('Authorization', `Bearer ${token}`)
    .send({
      currentPassword: 'pass1234',
      newPassword: '123'
    });

  assert.equal(response.status, 400);
  assert.deepEqual(response.body, { error: 'new password must be at least 4 characters' });
});

test('PATCH /api/users/me/password updates password and allows login with the new password', async () => {
  const token = await registerUser();

  const updateResponse = await request(app)
    .patch('/api/users/me/password')
    .set('Authorization', `Bearer ${token}`)
    .send({
      currentPassword: 'pass1234',
      newPassword: 'newpass123'
    });

  assert.equal(updateResponse.status, 200);
  assert.deepEqual(updateResponse.body, { message: 'password updated successfully' });

  const loginResponse = await request(app)
    .post('/api/auth/login')
    .send({
      identifier: 'learner@example.com',
      password: 'newpass123'
    });

  assert.equal(loginResponse.status, 200);
  assert.equal(loginResponse.body.user.email, 'learner@example.com');
  assert.equal(typeof loginResponse.body.token, 'string');
});

