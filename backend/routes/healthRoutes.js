import express from 'express';
import { getDBStatus } from '../config/db.js';
import { getRedisStatus } from '../config/redis.js';
import env from '../config/env.js';

const router = express.Router();

/**
 * @route   GET /api/health
 * @desc    Get system health status including MongoDB & Redis
 * @access  Public
 */
router.get('/health', async (req, res, next) => {
  try {
    const dbStatus = getDBStatus();
    const redisStatus = await getRedisStatus();

    const isSystemHealthy = dbStatus.isConnected || redisStatus.status === 'healthy';

    res.status(200).json({
      success: true,
      message: 'AI Quiz Generator Backend is operational',
      environment: env.NODE_ENV,
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
      services: {
        server: {
          status: 'healthy',
          nodeVersion: process.version,
          port: env.PORT,
        },
        database: {
          type: 'MongoDB',
          ...dbStatus,
        },
        cache: {
          type: 'Redis',
          ...redisStatus,
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
