import express from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../../database/User.js';
import { requireAuth } from '../middleware/auth.js';
import { buildStats, getOrCreateProgress } from '../lib/progress.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'name, email, and password are required' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash });
    return res.status(201).json({ id: user._id, name: user.name, email: user.email });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: 'email already exists' });
    }
    return res.status(500).json({ error: 'failed to create user' });
  }
});

router.get('/me', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).lean();
    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }

    const progress = await getOrCreateProgress(req.user.id);

    return res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      },
      stats: buildStats(user.name, progress)
    });
  } catch (error) {
    return res.status(500).json({ error: 'failed to load profile' });
  }
});

router.patch('/me', requireAuth, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !String(name).trim()) {
      return res.status(400).json({ error: 'name is required' });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name: String(name).trim() },
      { new: true, runValidators: true }
    ).lean();

    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }

    const progress = await getOrCreateProgress(req.user.id);

    return res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt
      },
      stats: buildStats(user.name, progress)
    });
  } catch (error) {
    return res.status(500).json({ error: 'failed to update profile' });
  }
});

router.patch('/me/password', requireAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'currentPassword and newPassword are required' });
    }

    if (String(newPassword).length < 4) {
      return res.status(400).json({ error: 'new password must be at least 4 characters' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }

    const isValid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ error: 'current password is incorrect' });
    }

    user.passwordHash = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.json({ message: 'password updated successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'failed to update password' });
  }
});

export default router;
