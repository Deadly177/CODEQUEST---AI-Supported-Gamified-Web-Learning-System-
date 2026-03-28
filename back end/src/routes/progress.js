import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import {
  buildCourseDetail,
  buildCourseSummaries,
  buildStats,
  completeLessonForUser,
  getOrCreateProgress
} from '../lib/progress.js';
import { User } from '../../database/User.js';
import { UserProgress } from '../../database/UserProgress.js';

const router = express.Router();

router.use(requireAuth);

router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.user.id).lean();
    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }

    const progress = await getOrCreateProgress(req.user.id);

    return res.json({
      stats: buildStats(user.name, progress),
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
    const result = await completeLessonForUser(req.user.id, req.params.lessonId);
    if (result.error) {
      return res.status(result.status).json({ error: result.error });
    }

    const user = await User.findById(req.user.id).lean();

    return res.json({
      awardedPoints: result.awardedPoints,
      alreadyCompleted: result.alreadyCompleted,
      stats: buildStats(user?.name ?? req.user.name ?? 'Learner', result.progress),
      courses: buildCourseSummaries(result.progress),
      courseDetail: buildCourseDetail(result.progress, result.courseId)
    });
  } catch (error) {
    return res.status(500).json({ error: 'failed to complete lesson' });
  }
});

router.get('/leaderboard', async (_req, res) => {
  try {
    const progressEntries = await UserProgress.find()
      .sort({ totalPoints: -1, updatedAt: 1 })
      .limit(10)
      .populate('userId', 'name')
      .lean();

    const entries = progressEntries.map((entry, index) => ({
      rank: index + 1,
      name: entry.userId?.name ?? 'Unknown User',
      xp: entry.totalPoints,
      level: Math.floor(entry.totalPoints / 250) + 1,
      avatar: '🧑'
    }));

    return res.json({ entries });
  } catch (error) {
    return res.status(500).json({ error: 'failed to load leaderboard' });
  }
});

export default router;
