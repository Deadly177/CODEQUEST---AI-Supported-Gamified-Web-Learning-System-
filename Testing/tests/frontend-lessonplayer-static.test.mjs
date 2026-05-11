import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const source = fs.readFileSync(path.resolve('frontend/src/app/components/LessonPlayer.tsx'), 'utf8');

test('LessonPlayer receives an onComplete callback with earned lesson XP', () => {
  assert.match(source, /onComplete: \(xpEarned: number\) => void \| Promise<void>/);
  assert.match(source, /await onComplete\(lesson\.xpReward\)/);
});

test('LessonPlayer persists and restores lesson state with localStorage', () => {
  assert.match(source, /const lessonStorageKey = useMemo/);
  assert.match(source, /window\.localStorage\.getItem\(lessonStorageKey\)/);
  assert.match(source, /window\.localStorage\.setItem\(lessonStorageKey, JSON\.stringify\(payload\)\)/);
  assert.match(source, /window\.localStorage\.removeItem\(lessonStorageKey\)/);
});

test('LessonPlayer tracks completed gated lesson steps', () => {
  assert.match(source, /const \[completedSteps, setCompletedSteps\]/);
  assert.match(source, /completedSteps\[currentStep\]/);
  assert.match(source, /Object\.keys\(completedSteps\)\.length/);
});

test('LessonPlayer supports quiz validation and feedback', () => {
  assert.match(source, /step\.type === 'quiz'/);
  assert.match(source, /selectedAnswer === step\.correctAnswer/);
  assert.match(source, /setShowFeedback/);
});

test('LessonPlayer renders lesson previews in iframes with srcDoc', () => {
  assert.match(source, /<iframe/);
  assert.match(source, /srcDoc=\{current\.previewHtml\}/);
  assert.match(source, /srcDoc=\{interactivePreviewDocument\}/);
  assert.match(source, /srcDoc=\{\(current\.solvedPreviewHtml \?\? currentCode\)/);
});

test('LessonPlayer computes earned XP from completed gated steps', () => {
  assert.match(source, /const xpPerGate/);
  assert.match(source, /const earnedXp = Object\.keys\(completedSteps\)\.length \* xpPerGate/);
});

