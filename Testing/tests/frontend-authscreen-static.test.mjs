import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const componentPath = path.resolve('frontend/src/app/components/AuthScreen.tsx');
const source = fs.readFileSync(componentPath, 'utf8');

test('AuthScreen uses the backend API base URL with localhost fallback', () => {
  assert.match(source, /import\.meta\.env\.VITE_API_URL \?\? 'http:\/\/localhost:5001'/);
});

test('AuthScreen login submits identifier and password to the login endpoint', () => {
  assert.match(source, /fetch\(`\$\{apiBaseUrl\}\/api\/auth\/login`/);
  assert.match(source, /method: 'POST'/);
  assert.match(source, /identifier: loginIdentifier/);
  assert.match(source, /password: loginPassword/);
});

test('AuthScreen registration submits name, email, and password to the register endpoint', () => {
  assert.match(source, /fetch\(`\$\{apiBaseUrl\}\/api\/auth\/register`/);
  assert.match(source, /name: signupName/);
  assert.match(source, /email: signupEmail/);
  assert.match(source, /password: signupPassword/);
});

test('AuthScreen passes token, remember flag, and user data to onSuccess after authentication', () => {
  assert.match(source, /onSuccess\(payload\.token, rememberMe, payload\.user\)/);
  assert.match(source, /onSuccess\(payload\.token, true, payload\.user\)/);
});

test('AuthScreen displays API error messages for failed login or registration', () => {
  assert.match(source, /throw new Error\(payload\.error \|\| 'Login failed'\)/);
  assert.match(source, /throw new Error\(payload\.error \|\| 'Registration failed'\)/);
  assert.match(source, /setErrorMessage\(error instanceof Error \? error\.message : 'Login failed'\)/);
  assert.match(source, /setErrorMessage\(error instanceof Error \? error\.message : 'Registration failed'\)/);
});

test('AuthScreen supports password visibility toggles for login and registration', () => {
  assert.match(source, /showLoginPassword \? 'text' : 'password'/);
  assert.match(source, /showSignupPassword \? 'text' : 'password'/);
  assert.match(source, /aria-label=\{showLoginPassword \? 'Hide password' : 'Show password'\}/);
  assert.match(source, /aria-label=\{showSignupPassword \? 'Hide password' : 'Show password'\}/);
});

test('AuthScreen includes required form fields and submit buttons', () => {
  assert.match(source, /required/);
  assert.match(source, /Logging in\.\.\./);
  assert.match(source, /Registering\.\.\./);
  assert.match(source, /Remember me/);
});

