import authService from '../services/authService.js';
import { registerSchema, loginSchema, googleAuthSchema } from '../validators/authValidators.js';
import env from '../config/env.js';

/**
 * Cookie configuration helper
 */
const getCookieOptions = () => ({
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: '/',
});

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user account
 * @access  Public
 */
export const register = async (req, res, next) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    const { user, accessToken, refreshToken } = await authService.registerUser(validatedData);

    // Set secure HTTP-only refresh token cookie
    res.cookie('refresh_token', refreshToken, getCookieOptions());

    res.status(201).json({
      success: true,
      message: 'Account registered successfully',
      user,
      token: accessToken,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user and retrieve tokens
 * @access  Public
 */
export const login = async (req, res, next) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const { user, accessToken, refreshToken } = await authService.loginUser(validatedData);

    // Set secure HTTP-only refresh token cookie
    res.cookie('refresh_token', refreshToken, getCookieOptions());

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      user,
      token: accessToken,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/auth/google
 * @desc    Authenticate or register via Google Identity Services
 * @access  Public
 */
export const googleLogin = async (req, res, next) => {
  try {
    const validatedData = googleAuthSchema.parse(req.body);
    const { user, accessToken, refreshToken } = await authService.googleAuth(validatedData);

    // Set secure HTTP-only refresh token cookie
    res.cookie('refresh_token', refreshToken, getCookieOptions());

    res.status(200).json({
      success: true,
      message: 'Google authentication successful',
      user,
      token: accessToken,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/auth/logout
 * @desc    Clear refresh token cookie and invalidate session
 * @access  Public
 */
export const logout = async (req, res) => {
  res.clearCookie('refresh_token', { path: '/' });
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};

/**
 * @route   POST /api/auth/refresh
 * @desc    Obtain a new access token using a valid refresh token
 * @access  Public
 */
export const refresh = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refresh_token || req.body?.refreshToken;
    const { accessToken, user } = await authService.refreshAccessToken(refreshToken);

    res.status(200).json({
      success: true,
      token: accessToken,
      user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/auth/me
 * @desc    Get currently authenticated user's profile
 * @access  Private (Requires JWT token)
 */
export const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export default {
  register,
  login,
  googleLogin,
  logout,
  refresh,
  getMe,
};
