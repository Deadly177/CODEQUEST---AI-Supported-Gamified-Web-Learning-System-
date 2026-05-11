import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const source = fs.readFileSync(path.resolve('frontend/src/app/App.tsx'), 'utf8');

test('App reads authentication tokens from persistent and session storage', () => {
  assert.match(source, /window\.localStorage\.getItem\('auth_token'\)/);
  assert.match(source, /window\.sessionStorage\.getItem\('auth_token'\)/);
});

test('App stores and removes authentication tokens for remember-me and logout flows', () => {
  assert.match(source, /window\.localStorage\.setItem\('auth_token', token\)/);
  assert.match(source, /window\.sessionStorage\.setItem\('auth_token', token\)/);
  assert.match(source, /window\.localStorage\.removeItem\('auth_token'\)/);
  assert.match(source, /window\.sessionStorage\.removeItem\('auth_token'\)/);
});

test('App API helper sends JSON requests with bearer authentication', () => {
  assert.match(source, /async function apiFetch<T>/);
  assert.match(source, /Authorization: `Bearer \$\{token\}`/);
  assert.match(source, /'Content-Type': 'application\/json'/);
  assert.match(source, /throw new Error\(payload\.error \|\| 'Request failed'\)/);
});

test('App loads authenticated profile, progress, and leaderboard data', () => {
  assert.match(source, /\/api\/users\/me/);
  assert.match(source, /\/api\/progress'/);
  assert.match(source, /\/api\/progress\/leaderboard/);
});

test('App completes lessons through the progress API', () => {
  assert.match(source, /\/api\/progress\/lessons\/\$\{progressLessonId\}\/complete/);
  assert.match(source, /method: 'POST'/);
  assert.match(source, /setUserStats\(payload\.stats\)/);
  assert.match(source, /setCourses\(payload\.courses\)/);
});

test('App supports core navigation views including build workspace and assistant', () => {
  assert.match(source, /type View = 'home' \| 'learn' \| 'lessons'/);
  assert.match(source, /currentView === 'build'/);
  assert.match(source, /<BuildWorkspace onBack=\{\(\) => setCurrentView\('home'\)\} \/>/);
  assert.match(source, /currentView === 'assistant'/);
});

test('App remembers the recently opened course', () => {
  assert.match(source, /window\.localStorage\.setItem\('codequest_recent_course', courseId\)/);
});

