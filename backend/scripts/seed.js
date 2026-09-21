/**
 * Database & Platform Seeding Script
 * Seeds demo accounts, starter quizzes, and leaderboard competitors
 * Strictly 100% Pure JavaScript (ESM)
 */

import { connectDB, getDBStatus } from '../config/db.js';
import { redisClient, getRedisStatus } from '../config/redis.js';
import { registerUser } from '../services/authService.js';
import { seedStarterQuizzes } from '../services/quizService.js';
import { seedSampleLeaderboard } from '../services/leaderboardService.js';
import logger from '../utils/logger.js';

const runSeed = async () => {
  logger.info('Starting AI Quiz Generator platform seeding...');

  // Connect to DB and Cache
  await connectDB();
  const redisHealth = await getRedisStatus();

  const dbStatus = getDBStatus();
  logger.info(`Database connected: ${dbStatus.isConnected ? 'MongoDB' : 'In-Memory Fallback'}`);
  logger.info(`Cache status: ${redisHealth.status === 'healthy' ? 'Redis (Connected)' : 'In-Memory Fallback'}`);

  // 1. Seed Demo Accounts
  let teacherUser = null;
  let learnerUser = null;

  try {
    teacherUser = await registerUser({
      name: 'Professor Ada Lovelace',
      email: 'teacher@example.com',
      password: 'Password123!',
      role: 'teacher',
    });
    logger.success('Seeded teacher account: teacher@example.com');
  } catch (err) {
    logger.warn(`Teacher account may already exist: ${err.message}`);
  }

  try {
    learnerUser = await registerUser({
      name: 'Alan Turing',
      email: 'student@example.com',
      password: 'Password123!',
      role: 'student',
    });
    logger.success('Seeded student account: student@example.com');
  } catch (err) {
    logger.warn(`Student account may already exist: ${err.message}`);
  }

  // 2. Seed Starter Quizzes
  const authorId = teacherUser?.id || teacherUser?._id || 'seed_teacher_id';
  try {
    const quizzes = await seedStarterQuizzes(authorId);
    logger.success(`Seeded ${quizzes.length} starter quizzes across JavaScript, React, and Node.js`);
  } catch (err) {
    logger.warn(`Failed to seed quizzes: ${err.message}`);
  }

  // 3. Seed Global Leaderboard
  try {
    await seedSampleLeaderboard();
    logger.success('Seeded 8 active contenders into the global leaderboard');
  } catch (err) {
    logger.warn(`Failed to seed leaderboard: ${err.message}`);
  }

  console.log('\n======================================================');
  console.log('🎉 AI Quiz Generator Seed Completed Successfully!');
  console.log('======================================================');
  console.log('Demo Credentials for Immediate Login:');
  console.log('  👨‍🏫 Teacher: teacher@example.com / Password123!');
  console.log('  👨‍🎓 Student: student@example.com / Password123!');
  console.log('Web Application: http://localhost:3000');
  console.log('Backend REST API: http://localhost:5001/api');
  console.log('======================================================\n');

  process.exit(0);
};

runSeed().catch((err) => {
  logger.error(`Seed failed: ${err.message}`);
  process.exit(1);
});
