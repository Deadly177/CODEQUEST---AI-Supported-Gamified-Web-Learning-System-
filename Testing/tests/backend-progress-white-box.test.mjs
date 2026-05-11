import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildCourseDetail,
  buildCourseSummaries,
  buildStats,
  getDisplayStreak
} from '../../back end/src/lib/progress.js';

function createProgress(overrides = {}) {
  return {
    totalPoints: 0,
    streak: 0,
    lastActivityAt: null,
    badges: [],
    courseProgress: [],
    ...overrides
  };
}

test('buildStats calculates level, current XP, total points, and badges', () => {
  const progress = createProgress({
    totalPoints: 375,
    streak: 2,
    lastActivityAt: new Date(),
    badges: ['first-lesson']
  });

  const stats = buildStats('Learner One', progress, 'UTC');

  assert.equal(stats.name, 'Learner One');
  assert.equal(stats.level, 2);
  assert.equal(stats.xp, 125);
  assert.equal(stats.xpToNextLevel, 250);
  assert.equal(stats.totalPoints, 375);
  assert.deepEqual(stats.badges, ['first-lesson']);
});

test('getDisplayStreak returns zero when the last activity is too old', () => {
  const fourDaysAgo = new Date(Date.now() - 4 * 24 * 60 * 60 * 1000);
  const progress = createProgress({
    streak: 5,
    lastActivityAt: fourDaysAgo
  });

  assert.equal(getDisplayStreak(progress, 'UTC'), 0);
});

test('buildCourseSummaries calculates completed lessons and percentage progress', () => {
  const progress = createProgress({
    courseProgress: [
      {
        courseId: 'css',
        completedLessonIds: ['css-track-1', 'css-track-2', 'css-track-3', 'css-track-4']
      }
    ]
  });

  const cssSummary = buildCourseSummaries(progress).find((course) => course.id === 'css');

  assert.ok(cssSummary);
  assert.equal(cssSummary.completedLessons, 1);
  assert.equal(cssSummary.progress, 13);
});

test('buildCourseDetail marks only the first course lesson as unlocked for new progress', () => {
  const detail = buildCourseDetail(createProgress(), 'javascript');
  const firstSectionLessons = detail.sections[0].lessons;

  assert.equal(firstSectionLessons[0].id, 'js-1');
  assert.equal(firstSectionLessons[0].locked, false);
  assert.equal(firstSectionLessons[1].id, 'js-2');
  assert.equal(firstSectionLessons[1].locked, true);
});

test('buildCourseDetail treats a completed lesson track as parent lesson completion', () => {
  const progress = createProgress({
    courseProgress: [
      {
        courseId: 'javascript',
        completedLessonIds: ['js-track-1', 'js-track-2', 'js-track-3', 'js-track-4']
      }
    ]
  });

  const detail = buildCourseDetail(progress, 'javascript');
  const firstSectionLessons = detail.sections[0].lessons;

  assert.equal(firstSectionLessons[0].completed, true);
  assert.equal(firstSectionLessons[1].locked, false);
  assert.equal(detail.certificate.completedLessons, 1);
});

test('buildCourseDetail returns null for an unknown course', () => {
  assert.equal(buildCourseDetail(createProgress(), 'unknown-course'), null);
});

