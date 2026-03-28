import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { connectDatabase } from '../database/connection.js';
import { User } from '../database/User.js';

dotenv.config();

const adminName = 'admin';
const adminEmail = 'admin';
const adminPassword = process.env.ADMIN_PASSWORD || '1234';

try {
  await connectDatabase(process.env.MONGODB_URI);

  const existing = await User.findOne({ name: adminName });
  if (existing) {
    console.log('Admin user already exists.');
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash(adminPassword, 10);
  await User.create({
    name: adminName,
    email: adminEmail,
    passwordHash
  });

  console.log('Admin user created.');
  process.exit(0);
} catch (error) {
  console.error('Failed to seed admin user', error);
  process.exit(1);
}
