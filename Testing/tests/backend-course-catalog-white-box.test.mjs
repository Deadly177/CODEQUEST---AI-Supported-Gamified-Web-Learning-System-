import test from 'node:test';
import assert from 'node:assert/strict';

import {
  findLesson,
  getCourseById,
  getCourseCatalog,
  getLessonTracksByCourseId,
  getSectionsByCourseId,
  normalizeLessonId,
  POINTS_PER_LEVEL
} from '../../back end/src/data/courseCatalog.js';

test('course catalog exposes the expected points per level value', () => {
  assert.equal(POINTS_PER_LEVEL, 250);
});

test('getCourseCatalog returns available courses', () => {
  const courses = getCourseCatalog();

  assert.ok(Array.isArray(courses));
  assert.ok(courses.some((course) => course.id === 'html'));
  assert.ok(courses.some((course) => course.id === 'css'));
  assert.ok(courses.some((course) => course.id === 'javascript'));
});

test('getCourseById returns a known course and null for unknown courses', () => {
  assert.equal(getCourseById('javascript').title, 'JavaScript');
  assert.equal(getCourseById('unknown-course'), null);
});

test('getSectionsByCourseId returns lessons for known courses and empty array for unknown courses', () => {
  const javascriptSections = getSectionsByCourseId('javascript');

  assert.ok(javascriptSections.length > 0);
  assert.equal(javascriptSections[0].lessons[0].id, 'js-1');
  assert.deepEqual(getSectionsByCourseId('unknown-course'), []);
});

test('getLessonTracksByCourseId returns lesson tracks for courses that have tracks', () => {
  const tracks = getLessonTracksByCourseId('javascript');

  assert.ok(tracks['js-1']);
  assert.equal(tracks['js-1'].label, 'Variables Track');
  assert.equal(tracks['js-1'].lessons[0].id, 'js-track-1');
});

test('normalizeLessonId returns the original lesson ID when no alias exists', () => {
  assert.equal(normalizeLessonId('js-track-1'), 'js-track-1');
});

test('findLesson locates catalog lessons and track lessons', () => {
  const catalogLesson = findLesson('js-1');
  const trackLesson = findLesson('js-track-1');

  assert.equal(catalogLesson.courseId, 'javascript');
  assert.equal(catalogLesson.sectionId, 'js-basics');
  assert.equal(catalogLesson.lesson.title, 'Creating Variables');

  assert.equal(trackLesson.courseId, 'javascript');
  assert.equal(trackLesson.parentLessonId, 'js-1');
  assert.equal(trackLesson.lesson.title, 'What Variables Do');
});

test('findLesson returns null for unknown lesson IDs', () => {
  assert.equal(findLesson('unknown-lesson'), null);
});

