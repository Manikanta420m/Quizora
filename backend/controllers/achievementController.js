import achievementService from '../services/achievementService.js';
import logger from '../utils/logger.js';

/**
 * Controller: Get all badges and user unlock progression
 * GET /api/achievements
 */
export const getAchievements = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const data = await achievementService.getUserAchievements(userId);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    logger.error(`Error fetching achievements: ${error.message}`);
    next(error);
  }
};

/**
 * Controller: Manually evaluate achievements for the current user
 * POST /api/achievements/evaluate
 */
export const evaluateAchievements = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const newlyUnlocked = await achievementService.evaluateUserAchievements(userId, req.body || {});

    return res.status(200).json({
      success: true,
      newlyUnlocked,
      count: newlyUnlocked.length,
    });
  } catch (error) {
    logger.error(`Error evaluating achievements: ${error.message}`);
    next(error);
  }
};

export default {
  getAchievements,
  evaluateAchievements,
};
