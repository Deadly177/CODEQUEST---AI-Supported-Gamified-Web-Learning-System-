import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const studyAssistant = fs.readFileSync(path.resolve('frontend/src/app/components/StudyAssistant.tsx'), 'utf8');
const dashboardAssistant = fs.readFileSync(path.resolve('frontend/src/app/components/DashboardAssistant.tsx'), 'utf8');

for (const [name, source] of [
  ['StudyAssistant', studyAssistant],
  ['DashboardAssistant', dashboardAssistant]
]) {
  test(`${name} loads chat history from the backend with authentication`, () => {
    assert.match(source, /\/api\/chat\/history\?threadKey=\$\{encodeURIComponent\(threadKey\)\}/);
    assert.match(source, /Authorization: `Bearer \$\{authToken\}`/);
    assert.match(source, /method: 'GET'/);
  });

  test(`${name} clears chat history with DELETE`, () => {
    assert.match(source, /method: 'DELETE'/);
    assert.match(source, /setHistoryMessages\(\[\]\)/);
    assert.match(source, /resetChatView\(\)/);
  });

  test(`${name} sends chat messages to the backend with context and thread key`, () => {
    assert.match(source, /fetch\(`\$\{apiBaseUrl\}\/api\/chat`/);
    assert.match(source, /method: 'POST'/);
    assert.match(source, /'Content-Type': 'application\/json'/);
    assert.match(source, /message: trimmed/);
    assert.match(source, /context/);
    assert.match(source, /threadKey/);
  });

  test(`${name} prevents empty or duplicate loading sends`, () => {
    assert.match(source, /const trimmed = \(prefilledMessage \?\? input\)\.trim\(\)/);
    assert.match(source, /if \(!trimmed \|\| isLoading\)/);
  });

  test(`${name} normalizes assistant markdown-like text`, () => {
    assert.match(source, /function normalizeAssistantText/);
    assert.match(source, /replace\(\/\\\*\\\*\(\.\*\?\)\\\*\\\*\/g, '\$1'\)/);
    assert.match(source, /replace\(\/\^#\{1,6\}\\s\*\/gm, ''\)/);
  });
}

