import redisClient from '../config/redis.js';
import logger from '../utils/logger.js';
import User from '../models/User.js';

const LEADERBOARD_KEY = 'leaderboard:global:xp';
const USER_META_PREFIX = 'leaderboard:user:';

// In-memory fallback store if Redis is unavailable
const devMemoryLeaderboard = new Map();

/**
 * Check if Redis is connected and responsive
 */
const isRedisAvailable = () => {
  return redisClient && (redisClient.status === 'ready' || redisClient.status === 'connect');
};


/**
 * Update user's score and metadata in the Redis Leaderboard
 */
export const updateUserScore = async (userId, xp, metadata = {}) => {
  if (!userId) return null;

  const score = Math.max(0, parseInt(xp, 10) || 0);
  const idStr = String(userId);

  const userData = {
    id: idStr,
    name: metadata.name || 'Anonymous Learner',
    avatar: metadata.avatar || '',
    streak: metadata.streak || 1,
    role: metadata.role || 'student',
    xp: score,
    updatedAt: new Date().toISOString(),
  };

  // 1. Try Redis Sorted Set
  if (isRedisAvailable()) {
    try {
      await redisClient.zadd(LEADERBOARD_KEY, score, idStr);
      await redisClient.set(`${USER_META_PREFIX}${idStr}`, JSON.stringify(userData), 'EX', 60 * 60 * 24 * 30); // 30 days cache
      return { rankUpdated: true, userId: idStr, xp: score };
    } catch (err) {
      logger.warn(`[REDIS LEADERBOARD ERROR] zadd failed: ${err.message}. Using in-memory fallback.`);
    }
  }

  // 2. In-memory Fallback
  devMemoryLeaderboard.set(idStr, userData);
  return { rankUpdated: true, userId: idStr, xp: score, fallback: true };
};

/**
 * Get global leaderboard with Top N players
 */
export const getGlobalLeaderboard = async (limit = 20, offset = 0) => {
  const safeLimit = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));
  const safeOffset = Math.max(0, parseInt(offset, 10) || 0);
  const stopIndex = safeOffset + safeLimit - 1;

  // 1. Try Redis
  if (isRedisAvailable()) {
    try {
      const totalPlayers = await redisClient.zcard(LEADERBOARD_KEY);

      if (totalPlayers > 0) {
        // ZREVRANGE returns members sorted from highest to lowest score
        const userIdsWithScores = await redisClient.zrevrange(
          LEADERBOARD_KEY,
          safeOffset,
          stopIndex,
          'WITHSCORES'
        );

        const leaderboard = [];
        const userIdsToFetch = [];

        for (let i = 0; i < userIdsWithScores.length; i += 2) {
          const uId = userIdsWithScores[i];
          const score = parseInt(userIdsWithScores[i + 1], 10);
          userIdsToFetch.push(uId);
          leaderboard.push({
            rank: safeOffset + Math.floor(i / 2) + 1,
            userId: uId,
            xp: score,
          });
        }

        // Fetch user metadata
        if (userIdsToFetch.length > 0) {
          const metaKeys = userIdsToFetch.map((id) => `${USER_META_PREFIX}${id}`);
          const metaResults = await redisClient.mget(metaKeys);

          leaderboard.forEach((entry, idx) => {
            const rawMeta = metaResults[idx];
            if (rawMeta) {
              try {
                const parsed = JSON.parse(rawMeta);
                entry.name = parsed.name || 'Anonymous';
                entry.avatar = parsed.avatar || '';
                entry.streak = parsed.streak || 1;
                entry.role = parsed.role || 'student';
              } catch (e) {
                entry.name = 'Learner';
              }
            } else {
              entry.name = `Player ${entry.userId.slice(-4)}`;
              entry.streak = 1;
            }
          });
        }

        return {
          total: totalPlayers,
          limit: safeLimit,
          offset: safeOffset,
          source: 'redis',
          leaderboard,
        };
      }
    } catch (err) {
      logger.warn(`[REDIS LEADERBOARD ERROR] zrevrange failed: ${err.message}. Using fallback.`);
    }
  }

  // 2. Fallback: In-memory store
  const sortedMemoryUsers = Array.from(devMemoryLeaderboard.values())
    .sort((a, b) => b.xp - a.xp)
    .slice(safeOffset, safeOffset + safeLimit)
    .map((u, idx) => ({
      rank: safeOffset + idx + 1,
      userId: u.id,
      name: u.name,
      avatar: u.avatar,
      streak: u.streak,
      role: u.role,
      xp: u.xp,
    }));

  return {
    total: devMemoryLeaderboard.size,
    limit: safeLimit,
    offset: safeOffset,
    source: 'in-memory',
    leaderboard: sortedMemoryUsers,
  };
};

/**
 * Get user's exact ranking and score details
 */
export const getUserRank = async (userId) => {
  if (!userId) return null;
  const idStr = String(userId);

  // 1. Try Redis
  if (isRedisAvailable()) {
    try {
      // ZREVRANK is 0-indexed (0 is rank 1)
      const rank0 = await redisClient.zrevrank(LEADERBOARD_KEY, idStr);
      const score = await redisClient.zscore(LEADERBOARD_KEY, idStr);
      const total = await redisClient.zcard(LEADERBOARD_KEY);

      if (rank0 !== null && score !== null) {
        const rank = rank0 + 1;
        const xp = parseInt(score, 10);

        // Find XP needed to overtake the previous rank
        let nextRankXpNeeded = 0;
        if (rank > 1) {
          const higherRankMembers = await redisClient.zrevrange(LEADERBOARD_KEY, rank0 - 1, rank0 - 1, 'WITHSCORES');
          if (higherRankMembers && higherRankMembers[1]) {
            const higherScore = parseInt(higherRankMembers[1], 10);
            nextRankXpNeeded = Math.max(1, higherScore - xp + 10);
          }
        }

        // Compute percentile
        const percentile = total > 1 ? Math.max(1, Math.round(((total - rank) / total) * 100)) : 100;

        return {
          rank,
          xp,
          totalPlayers: total,
          percentile,
          nextRankXpNeeded,
          source: 'redis',
        };
      }
    } catch (err) {
      logger.warn(`[REDIS LEADERBOARD ERROR] zrevrank failed: ${err.message}. Using fallback.`);
    }
  }

  // 2. Fallback: In-memory
  const sorted = Array.from(devMemoryLeaderboard.values()).sort((a, b) => b.xp - a.xp);
  const index = sorted.findIndex((u) => u.id === idStr);

  if (index !== -1) {
    const rank = index + 1;
    const userItem = sorted[index];
    const prevItem = index > 0 ? sorted[index - 1] : null;
    const nextRankXpNeeded = prevItem ? Math.max(1, prevItem.xp - userItem.xp + 10) : 0;
    const percentile = sorted.length > 1 ? Math.max(1, Math.round(((sorted.length - rank) / sorted.length) * 100)) : 100;

    return {
      rank,
      xp: userItem.xp,
      totalPlayers: sorted.length,
      percentile,
      nextRankXpNeeded,
      source: 'in-memory',
    };
  }

  return {
    rank: null,
    xp: 0,
    totalPlayers: devMemoryLeaderboard.size,
    percentile: 0,
    nextRankXpNeeded: 50,
    source: 'unranked',
  };
};

/**
 * Seed realistic starter competitors to populate the global leaderboard
 */
export const seedSampleLeaderboard = async () => {
  const sampleCompetitors = [
    { id: 'usr_sarah_chen', name: 'Sarah Chen', xp: 2850, streak: 21, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80', role: 'student' },
    { id: 'usr_alex_dev', name: 'Alex Rivera', xp: 2420, streak: 15, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80', role: 'student' },
    { id: 'usr_priya_sharma', name: 'Priya Sharma', xp: 2190, streak: 18, avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80', role: 'teacher' },
    { id: 'usr_marcus_vance', name: 'Marcus Vance', xp: 1870, streak: 9, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80', role: 'student' },
    { id: 'usr_elena_rostova', name: 'Elena Rostova', xp: 1640, streak: 12, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80', role: 'student' },
    { id: 'usr_david_kim', name: 'David Kim', xp: 1420, streak: 7, avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80', role: 'student' },
    { id: 'usr_zack_taylor', name: 'Zack Taylor', xp: 1180, streak: 5, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80', role: 'student' },
    { id: 'usr_aisha_khan', name: 'Aisha Khan', xp: 950, streak: 4, avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&auto=format&fit=crop&q=80', role: 'student' },
  ];

  let addedCount = 0;
  for (const comp of sampleCompetitors) {
    await updateUserScore(comp.id, comp.xp, comp);
    addedCount++;
  }

  logger.success(`Seeded ${addedCount} competitors into global leaderboard`);
  return { success: true, count: addedCount };
};

export default {
  updateUserScore,
  getGlobalLeaderboard,
  getUserRank,
  seedSampleLeaderboard,
};
