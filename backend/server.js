import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import env from './config/env.js';
import logger from './utils/logger.js';
import connectDB from './config/db.js';
import { redisClient } from './config/redis.js';
import cookieParser from 'cookie-parser';
import healthRoutes from './routes/healthRoutes.js';
import authRoutes from './routes/authRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import leaderboardRoutes from './routes/leaderboardRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import achievementRoutes from './routes/achievementRoutes.js';
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

// 1. Security Middleware
app.use(helmet());
app.use(
  cors({
    origin: [env.CLIENT_URL, 'http://localhost:3000'],
    credentials: true,
  })
);

// 2. Request Parsing Middleware
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 3. Simple Request Logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(`${req.method} ${req.originalUrl} [${res.statusCode}] - ${duration}ms`);
  });
  next();
});

// 4. API Routes
app.use('/api', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/achievements', achievementRoutes);


// Root informational endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'AI Quiz Generator API',
    version: '1.0.0',
    status: 'running',
    healthCheck: '/api/health',
  });
});

// 5. Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

// 6. Start Server and Database Connection
const startServer = async () => {
  // Connect to MongoDB
  await connectDB();

  // Listen on configured port
  const server = app.listen(env.PORT, () => {
    logger.success(`🚀 Server running in [${env.NODE_ENV}] mode on http://localhost:${env.PORT}`);
    logger.info(`Health check available at http://localhost:${env.PORT}/api/health`);
  });

  // Graceful shutdown handling
  const shutdown = async (signal) => {
    logger.info(`Received ${signal}. Gracefully shutting down...`);
    server.close(async () => {
      logger.info('HTTP server closed.');
      try {
        await redisClient.quit();
        logger.info('Redis connection closed.');
      } catch (err) {
        logger.error(`Error closing Redis: ${err.message}`);
      }
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
};

startServer();

export default app;
