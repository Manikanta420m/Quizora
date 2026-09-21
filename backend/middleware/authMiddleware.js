import jwt from 'jsonwebtoken';
import env from '../config/env.js';
import { getUserById } from '../services/authService.js';

/**
 * Authentication Middleware
 * Validates JWT access token from Authorization header or HTTP-only cookies.
 * Attaches the authenticated user object to `req.user`.
 */
export const protect = async (req, res, next) => {
  let token = null;

  // 1. Check Authorization header: 'Bearer <token>'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }
  // 2. Fallback to access_token cookie
  else if (req.cookies && req.cookies.access_token) {
    token = req.cookies.access_token;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No authentication token provided.',
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET);

    // Fetch user details
    const user = await getUserById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'The user belonging to this token no longer exists.',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired authentication token. Please log in again.',
    });
  }
};

export default protect;
