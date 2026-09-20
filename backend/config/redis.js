import Redis from 'ioredis';
import env from './env.js';
import logger from '../utils/logger.js';

let isConnected = false;

// Create Redis client instance
export const redisClient = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: 2,
  retryStrategy(times) {
    if (times > 3) {
      logger.warn('Redis reconnection stopped after 3 attempts. Caching/rate-limiting will fall back gracefully.');
      return null; // stop retrying
    }
    return Math.min(times * 1000, 3000);
  },
  lazyConnect: false,
});

redisClient.on('connect', () => {
  isConnected = true;
  logger.success(`Redis connected successfully to ${env.REDIS_URL}`);
});

redisClient.on('ready', () => {
  isConnected = true;
  logger.info('Redis client is ready to accept commands');
});

redisClient.on('error', (err) => {
  isConnected = false;
  logger.warn(`Redis connection notice: ${err.message}. (Ensure redis-server is running)`);
});

redisClient.on('close', () => {
  isConnected = false;
  logger.info('Redis connection closed');
});

/**
 * Helper to check current Redis health status
 */
export const getRedisStatus = async () => {
  if (!isConnected) {
    return { status: 'disconnected', details: 'Redis is not reachable' };
  }
  try {
    const pingResult = await redisClient.ping();
    return { status: 'healthy', ping: pingResult };
  } catch (error) {
    return { status: 'unhealthy', error: error.message };
  }
};

export default redisClient;
