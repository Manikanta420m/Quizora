import { redisClient } from '../config/redis.js';

// In-memory fallback if Redis is disabled or offline
const memoryStore = new Map();

export const rateLimit = (options) => {
  const { windowMs, max, keyPrefix = 'rl' } = options;
  const windowSeconds = Math.ceil(windowMs / 1000);

  return async (req, res, next) => {
    try {
      // Identity is tied to the logged-in user, or IP address if public
      const userId = req.user?._id || req.user?.id || req.ip;
      const key = `${keyPrefix}:${userId}`;

      // Redis Store
      if (redisClient && (redisClient.status === 'ready' || redisClient.status === 'connect')) {
        const current = await redisClient.incr(key);
        if (current === 1) {
          await redisClient.expire(key, windowSeconds);
        }
        if (current > max) {
          return res.status(429).json({
            success: false,
            message: `Too many requests. Please try again later.`,
          });
        }
        return next();
      }

      // Memory Store Fallback
      const now = Date.now();
      const record = memoryStore.get(key) || { count: 0, resetAt: now + windowMs };
      
      if (now > record.resetAt) {
        record.count = 1;
        record.resetAt = now + windowMs;
      } else {
        record.count++;
      }
      
      memoryStore.set(key, record);

      if (record.count > max) {
        return res.status(429).json({
          success: false,
          message: `Too many requests. Please try again later.`,
        });
      }
      
      next();
    } catch (error) {
      // Fail open so we don't break the application if Redis crashes mid-request
      next();
    }
  };
};

export const aiGenerateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10,
  keyPrefix: 'rl:ai:generate'
});

export const aiHintLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 30,
  keyPrefix: 'rl:ai:hint'
});

export const documentLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  keyPrefix: 'rl:ai:document'
});
