import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import {
  buildCourseDetail,
  buildCourseSummaries,
  buildStats,
  completeLessonForUser,
  getDisplayStreak,
  getOrCreateProgress
} from '../lib/progress.js';
import { User } from '../../database/User.js';
import { UserProgress } from '../../database/UserProgress.js';

const router = express.Router();

router.use(requireAuth);

function getRequestTimeZone(req) {
  const header = req.headers['x-user-timezone'];
  return typeof header === 'string' && header.trim() ? header.trim() : 'UTC';
}

router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.user.id).lean();
    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }

    const progress = await getOrCreateProgress(req.user.id);

    return res.json({
      stats: buildStats(user.name, progress, getRequestTimeZone(req)),
      courses: buildCourseSummaries(progress)
    });
  } catch (error) {
    return res.status(500).json({ error: 'failed to load progress' });
  }
});

router.get('/courses/:courseId', async (req, res) => {
  try {
    const progress = await getOrCreateProgress(req.user.id);
    const detail = buildCourseDetail(progress, req.params.courseId);

    if (!detail) {
      return res.status(404).json({ error: 'course not found' });
    }

    return res.json(detail);
  } catch (error) {
    return res.status(500).json({ error: 'failed to load course progress' });
  }
});

router.post('/lessons/:lessonId/complete', async (req, res) => {
  try {
    const timeZone = getRequestTimeZone(req);
    const result = await completeLessonForUser(req.user.id, req.params.lessonId, timeZone);
    if (result.error) {
      return res.status(result.status).json({ error: result.error });
    }

    const user = await User.findById(req.user.id).lean();

    return res.json({
      awardedPoints: result.awardedPoints,
      alreadyCompleted: result.alreadyCompleted,
      stats: buildStats(user?.name ?? req.user.name ?? 'Learner', result.progress, timeZone),
      courses: buildCourseSummaries(result.progress),
      courseDetail: buildCourseDetail(result.progress, result.courseId)
    });
  } catch (error) {
    return res.status(500).json({ error: 'failed to complete lesson' });
  }
});

router.get('/leaderboard', async (req, res) => {
  try {
    const users = await User.find().select('name createdAt').lean();
    const progressEntries = await UserProgress.find({
      userId: { $in: users.map((user) => user._id) }
    }).lean();
    const progressByUserId = new Map(progressEntries.map((entry) => [String(entry.userId), entry]));
    const timeZone = getRequestTimeZone(req);

    const entries = users
      .map((user) => {
        const progress = progressByUserId.get(String(user._id));
        const totalPoints = progress?.totalPoints ?? 0;

        return {
          name: user.name,
          xp: totalPoints,
          level: Math.floor(totalPoints / 250) + 1,
          streak: progress ? getDisplayStreak(progress, timeZone) : 0,
          avatar: user.name?.charAt(0).toUpperCase() || '🧑',
          updatedAt: progress?.updatedAt ?? user.createdAt
        };
      })
      .sort((left, right) => {
        if (right.xp !== left.xp) {
          return right.xp - left.xp;
        }
        return new Date(left.updatedAt).getTime() - new Date(right.updatedAt).getTime();
      })
      .map((entry, index) => ({
        rank: index + 1,
        name: entry.name,
        xp: entry.xp,
        level: entry.level,
        streak: entry.streak,
        avatar: entry.avatar
      }));

    return res.json({ entries });
  } catch (error) {
    return res.status(500).json({ error: 'failed to load leaderboard' });
  }
});

export default router;
