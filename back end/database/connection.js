import mongoose from 'mongoose';

export async function connectDatabase(uri) {
  if (!uri) {
    throw new Error('Missing MONGODB_URI');
  }

  await mongoose.connect(uri, {
    autoIndex: true
  });
}
