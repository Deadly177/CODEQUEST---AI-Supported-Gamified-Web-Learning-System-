import { UserProgress } from '../../database/UserProgress.js';
import {
  POINTS_PER_LEVEL,
  findLesson,
  getCourseById,
  getCourseCatalog,
  getLessonTracksByCourseId,
  getSectionsByCourseId,
  normalizeLessonId
} from '../data/courseCatalog.js';

function getTimeZoneFormatter(timeZone) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
}

function getDayKey(date, timeZone) {
  return getTimeZoneFormatter(timeZone).format(date);
}

function parseDayKey(dayKey) {
  const [year, month, day] = dayKey.split('-').map(Number);
  return { year, month, day };
}

function dayKeyToUtcMidnight(dayKey) {
  const { year, month, day } = parseDayKey(dayKey);
  return Date.UTC(year, month - 1, day);
}

function isSameLocalDay(left, right, timeZone) {
  return getDayKey(left, timeZone) === getDayKey(right, timeZone);
}

function isPreviousLocalDay(previous, current, timeZone) {
  const prior = dayKeyToUtcMidnight(getDayKey(previous, timeZone));
  const next = dayKeyToUtcMidnight(getDayKey(current, timeZone));
  return next - prior === 24 * 60 * 60 * 1000;
}

function getSafeTimeZone(timeZone) {
  if (!timeZone) {
    return 'UTC';
  }

  try {
    getTimeZoneFormatter(timeZone).format(new Date());
    return timeZone;
  } catch {
    return 'UTC';
  }
}

function getDisplayStreak(progress, timeZone) {
  if (!progress.lastActivityAt || progress.streak <= 0) {
    return 0;
  }

  const now = new Date();
  const lastActivityAt = new Date(progress.lastActivityAt);
  const safeTimeZone = getSafeTimeZone(timeZone);

  if (isSameLocalDay(lastActivityAt, now, safeTimeZone) || isPreviousLocalDay(lastActivityAt, now, safeTimeZone)) {
    return progress.streak;
  }

  return 0;
}

function computeBadges(progress) {
  const badges = [];
  const totalCompletedLessons = progress.courseProgress.reduce(
    (count, course) => count + course.completedLessonIds.length,
    0
  );

  if (totalCompletedLessons > 0) {
    badges.push('first-lesson');
  }
  if (progress.streak >= 7) {
    badges.push('week-streak');
  }
  if (totalCompletedLessons >= 10) {
    badges.push('quiz-master');
  }

  return badges;
}

export function buildStats(name, progress, timeZone = 'UTC') {
  const level = Math.floor(progress.totalPoints / POINTS_PER_LEVEL) + 1;
  const xp = progress.totalPoints % POINTS_PER_LEVEL;

  return {
    name,
    level,
    xp,
    xpToNextLevel: POINTS_PER_LEVEL,
    streak: getDisplayStreak(progress, timeZone),
    totalPoints: progress.totalPoints,
    badges: progress.badges
  };
}

export async function getOrCreateProgress(userId) {
  let progress = await UserProgress.findOne({ userId });
  if (!progress) {
    progress = await UserProgress.create({ userId });
  }
  return progress;
}

export function buildCourseSummaries(progress) {
  return getCourseCatalog().map((course) => {
    const entry = progress.courseProgress.find((item) => item.courseId === course.id);
    const completedLessonIds = new Set(entry?.completedLessonIds ?? []);
    const tracksByLessonId = getLessonTracksByCourseId(course.id);
    const completedLessons = getSectionsByCourseId(course.id).reduce((count, section) => {
      return count + section.lessons.filter((lesson) => {
        const track = tracksByLessonId[lesson.id];
        const trackedLessonComplete = Boolean(track?.lessons.length) && track.lessons.every((trackLesson) => completedLessonIds.has(trackLesson.id));
        return completedLessonIds.has(lesson.id) || trackedLessonComplete;
      }).length;
    }, 0);
    const progressPercent = course.totalLessons
      ? Math.min(100, Math.round((completedLessons / course.totalLessons) * 100))
      : 0;

    return {
      ...course,
      completedLessons,
      progress: progressPercent
    };
  });
}

function buildLessonTracks(courseId, completedLessonIds) {
  const tracksByLessonId = getLessonTracksByCourseId(courseId);

  return Object.fromEntries(
    Object.entries(tracksByLessonId).map(([parentLessonId, track]) => {
      let previousTrackCompleted = true;
      const lessons = track.lessons.map((lesson) => {
        const completed = completedLessonIds.has(lesson.id);
        const locked = !completed && !previousTrackCompleted;
        previousTrackCompleted = previousTrackCompleted && completed;

        return {
          id: lesson.id,
          number: lesson.number,
          title: lesson.title,
          type: lesson.type,
          completed,
          locked,
          xpReward: lesson.xpReward
        };
      });

      return [
        parentLessonId,
        {
          label: track.label,
          lessons
        }
      ];
    })
  );
}

export function buildCourseDetail(progress, courseId) {
  const course = getCourseById(courseId);
  if (!course) {
    return null;
  }

  const entry = progress.courseProgress.find((item) => item.courseId === courseId);
  const completedLessonIds = new Set(entry?.completedLessonIds ?? []);
  const sections = getSectionsByCourseId(courseId);
  const tracksByLessonId = getLessonTracksByCourseId(courseId);
  const isTrackedLessonComplete = (lessonId) => {
    const track = tracksByLessonId[lessonId];
    return Boolean(track?.lessons.length) && track.lessons.every((lesson) => completedLessonIds.has(lesson.id));
  };
  let previousLessonIdsCompleted = true;
  let completedCount = 0;

  const hydratedSections = sections.map((section) => {
    const lessons = section.lessons.map((lesson, index) => {
      const completed = completedLessonIds.has(lesson.id) || isTrackedLessonComplete(lesson.id);
      if (completed) {
        completedCount += 1;
      }

      const locked = !completed && !previousLessonIdsCompleted;
      previousLessonIdsCompleted = previousLessonIdsCompleted && completed;

      return {
        id: lesson.id,
        number: lesson.number,
        title: lesson.title,
        type: lesson.type,
        completed,
        locked: !completed && locked,
        xpReward: lesson.xpReward
      };
    });

    const sectionCompleted = lessons.filter((lesson) => lesson.completed).length;

    return {
      id: section.id,
      number: section.number,
      title: section.title,
      icon: section.icon,
      progress: `${sectionCompleted}/${lessons.length}`,
      lessons
    };
  });

  const certificateProgress = course.totalLessons
    ? Math.round((completedCount / course.totalLessons) * 100)
    : 0;

  return {
    course: {
      id: course.id,
      title: course.title,
      description: course.description,
      icon: course.icon,
      color: course.color,
      totalLessons: course.totalLessons
    },
    sections: hydratedSections,
    lessonTracks: buildLessonTracks(courseId, completedLessonIds),
    certificate: {
      progress: certificateProgress,
      total: course.totalLessons,
      completedLessons: completedCount
    }
  };
}

export async function completeLessonForUser(userId, lessonId, timeZone = 'UTC') {
  const normalizedLessonId = normalizeLessonId(lessonId);
  const lessonInfo = findLesson(normalizedLessonId);
  if (!lessonInfo) {
    return { error: 'lesson not found', status: 404 };
  }

  const progress = await getOrCreateProgress(userId);
  let courseEntry = progress.courseProgress.find((item) => item.courseId === lessonInfo.courseId);

  if (!courseEntry) {
    courseEntry = { courseId: lessonInfo.courseId, completedLessonIds: [] };
    progress.courseProgress.push(courseEntry);
  }

  const alreadyCompleted = courseEntry.completedLessonIds.includes(normalizedLessonId);
  const now = new Date();
  const safeTimeZone = getSafeTimeZone(timeZone);

  if (!alreadyCompleted) {
    courseEntry.completedLessonIds.push(normalizedLessonId);
    progress.totalPoints += lessonInfo.lesson.xpReward;

    if (!progress.lastActivityAt) {
      progress.streak = 1;
    } else {
      const lastActivityAt = new Date(progress.lastActivityAt);
      if (isSameLocalDay(lastActivityAt, now, safeTimeZone)) {
        progress.streak = Math.max(progress.streak, 1);
      } else if (isPreviousLocalDay(lastActivityAt, now, safeTimeZone)) {
        progress.streak += 1;
      } else {
        progress.streak = 1;
      }
    }

    progress.lastActivityAt = now;
    progress.badges = computeBadges(progress);
    progress.markModified('courseProgress');
    await progress.save();
  }

  return {
    status: 200,
    progress,
    lesson: lessonInfo.lesson,
    courseId: lessonInfo.courseId,
    awardedPoints: alreadyCompleted ? 0 : lessonInfo.lesson.xpReward,
    alreadyCompleted
  };
}
