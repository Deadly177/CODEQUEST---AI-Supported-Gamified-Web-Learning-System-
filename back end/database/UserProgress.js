import mongoose from 'mongoose';

const courseProgressSchema = new mongoose.Schema(
  {
    courseId: { type: String, required: true, trim: true },
    completedLessonIds: { type: [String], default: [] }
  },
  { _id: false }
);

const userProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true
    },
    totalPoints: { type: Number, default: 0, min: 0 },
    streak: { type: Number, default: 0, min: 0 },
    lastActivityAt: { type: Date, default: null },
    badges: { type: [String], default: [] },
    courseProgress: { type: [courseProgressSchema], default: [] }
  },
  { timestamps: true }
);

export const UserProgress = mongoose.model('UserProgress', userProgressSchema);
