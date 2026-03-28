import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ['user', 'assistant'],
      required: true
    },
    text: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { _id: false }
);

const chatSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    threadKey: {
      type: String,
      required: true,
      default: 'global',
      trim: true
    },
    messages: {
      type: [chatMessageSchema],
      default: []
    }
  },
  { timestamps: true }
);

chatSessionSchema.index({ userId: 1, threadKey: 1 }, { unique: true });

export const ChatSession = mongoose.model('ChatSession', chatSessionSchema);
