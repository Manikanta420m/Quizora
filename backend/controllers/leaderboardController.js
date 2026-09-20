import leaderboardService from '../services/leaderboardService.js';

/**
 * @route   GET /api/leaderboard
 * @desc    Fetch global leaderboard with rankings, XP, streaks, and user profiles
 * @access  Public
 */
export const getLeaderboard = async (req, res, next) => {
  try {
    const { limit = 20, offset = 0 } = req.query;
    const result = await leaderboardService.getGlobalLeaderboard(limit, offset);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/leaderboard/me
 * @desc    Fetch current authenticated user's exact global rank and XP gap to next rank
 * @access  Private
 */
export const getMyRank = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const rankData = await leaderboardService.getUserRank(userId);

    res.status(200).json({
      success: true,
      data: rankData,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/leaderboard/seed
 * @desc    Seed realistic starter contenders into the global leaderboard
 * @access  Private
 */
export const seed = async (req, res, next) => {
  try {
    const result = await leaderboardService.seedSampleLeaderboard();

    res.status(201).json({
      success: true,
      message: 'Global leaderboard seeded with active competitors successfully',
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getLeaderboard,
  getMyRank,
  seed,
};
