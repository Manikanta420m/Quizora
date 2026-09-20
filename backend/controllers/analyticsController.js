import analyticsService from '../services/analyticsService.js';

/**
 * @route   GET /api/analytics/user
 * @desc    Get detailed performance analytics, topic mastery, and weak areas for the current user
 * @access  Private
 */
export const getUserStats = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const stats = await analyticsService.getUserAnalytics(userId);

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/analytics/teacher
 * @desc    Get aggregated classroom, quiz, and student performance metrics for the Teacher Dashboard
 * @access  Private (Teacher / Admin)
 */
export const getTeacherStats = async (req, res, next) => {
  try {
    const teacherId = req.user._id || req.user.id;
    const stats = await analyticsService.getTeacherAnalytics(teacherId);

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getUserStats,
  getTeacherStats,
};
