import { UserProgress } from '../../database/UserProgress.js';
import {
  POINTS_PER_LEVEL,
  findLesson,
  getCourseById,
  getCourseCatalog,
  getSectionsByCourseId
} from '../data/courseCatalog.js';

function isSameUtcDay(left, right) {
  return left.getUTCFullYear() === right.getUTCFullYear()
    && left.getUTCMonth() === right.getUTCMonth()
    && left.getUTCDate() === right.getUTCDate();
}

function isPreviousUtcDay(previous, current) {
  const prior = Date.UTC(previous.getUTCFullYear(), previous.getUTCMonth(), previous.getUTCDate());
  const next = Date.UTC(current.getUTCFullYear(), current.getUTCMonth(), current.getUTCDate());
  return next - prior === 24 * 60 * 60 * 1000;
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

export function buildStats(name, progress) {
  const level = Math.floor(progress.totalPoints / POINTS_PER_LEVEL) + 1;
  const xp = progress.totalPoints % POINTS_PER_LEVEL;

  return {
    name,
    level,
    xp,
    xpToNextLevel: POINTS_PER_LEVEL,
    streak: progress.streak,
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
    const completedLessons = entry?.completedLessonIds.length ?? 0;
    const progressPercent = course.totalLessons
      ? Math.round((completedLessons / course.totalLessons) * 100)
      : 0;

    return {
      ...course,
      completedLessons,
      progress: progressPercent
    };
  });
}

export function buildCourseDetail(progress, courseId) {
  const course = getCourseById(courseId);
  if (!course) {
    return null;
  }

  const entry = progress.courseProgress.find((item) => item.courseId === courseId);
  const completedLessonIds = new Set(entry?.completedLessonIds ?? []);
  const sections = getSectionsByCourseId(courseId);
  let previousLessonIdsCompleted = true;
  let completedCount = 0;

  const hydratedSections = sections.map((section) => {
    const lessons = section.lessons.map((lesson, index) => {
      const completed = completedLessonIds.has(lesson.id);
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
    certificate: {
      progress: certificateProgress,
      total: course.totalLessons,
      completedLessons: completedCount
    }
  };
}

export async function completeLessonForUser(userId, lessonId) {
  const lessonInfo = findLesson(lessonId);
  if (!lessonInfo) {
    return { error: 'lesson not found', status: 404 };
  }

  const progress = await getOrCreateProgress(userId);
  let courseEntry = progress.courseProgress.find((item) => item.courseId === lessonInfo.courseId);

  if (!courseEntry) {
    courseEntry = { courseId: lessonInfo.courseId, completedLessonIds: [] };
    progress.courseProgress.push(courseEntry);
  }

  const alreadyCompleted = courseEntry.completedLessonIds.includes(lessonId);
  const now = new Date();

  if (!alreadyCompleted) {
    courseEntry.completedLessonIds.push(lessonId);
    progress.totalPoints += lessonInfo.lesson.xpReward;

    if (!progress.lastActivityAt) {
      progress.streak = 1;
    } else {
      const lastActivityAt = new Date(progress.lastActivityAt);
      if (isSameUtcDay(lastActivityAt, now)) {
        progress.streak = Math.max(progress.streak, 1);
      } else if (isPreviousUtcDay(lastActivityAt, now)) {
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
