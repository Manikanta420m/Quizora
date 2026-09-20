import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from '../models/User.js';
import env from '../config/env.js';
import logger from '../utils/logger.js';
import { updateUserScore } from './leaderboardService.js';


// In-memory user store fallback for development if MongoDB daemon isn't reachable yet
const devMemoryUsers = new Map();

/**
 * Check if real MongoDB is actively connected
 */
const isMongoConnected = () => mongoose.connection.readyState === 1;

/**
 * Generate Access and Refresh JWT Tokens
 */
export const generateTokens = (user) => {
  const payload = {
    id: user._id?.toString() || user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: '1h',
  });

  const refreshToken = jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: '7d',
  });

  return { accessToken, refreshToken };
};

/**
 * Register a new user
 */
export const registerUser = async ({ name, email, password, role = 'student' }) => {
  const normalizedEmail = email.toLowerCase().trim();

  // 1. If MongoDB is connected, use real Mongoose operations
  if (isMongoConnected()) {
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      const error = new Error('A user with this email already exists');
      error.statusCode = 409;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
      role,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=6366f1`,
      xp: 0,
      streak: 0,
    });

    const tokens = generateTokens(user);
    return { user: user.toSafeObject(), ...tokens };
  }

  // 2. Dev In-Memory Fallback
  logger.warn(`[DEV IN-MEMORY STORE] Saving user "${normalizedEmail}" in local memory cache`);
  if (devMemoryUsers.has(normalizedEmail)) {
    const error = new Error('A user with this email already exists');
    error.statusCode = 409;
    throw error;
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  const id = new mongoose.Types.ObjectId().toString();

  const user = {
    _id: id,
    id,
    name: name.trim(),
    email: normalizedEmail,
    passwordHash,
    role,
    avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=6366f1`,
    xp: 0,
    streak: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  devMemoryUsers.set(normalizedEmail, user);

  const safeUser = { ...user };
  delete safeUser.passwordHash;

  const tokens = generateTokens(user);
  return { user: safeUser, ...tokens };
};

/**
 * Authenticate existing user credentials
 */
export const loginUser = async ({ email, password }) => {
  const normalizedEmail = email.toLowerCase().trim();

  // 1. If MongoDB is connected
  if (isMongoConnected()) {
    const user = await User.findOne({ email: normalizedEmail }).select('+passwordHash');
    if (!user) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    const tokens = generateTokens(user);
    return { user: user.toSafeObject(), ...tokens };
  }

  // 2. Dev In-Memory Fallback
  logger.warn(`[DEV IN-MEMORY STORE] Checking user "${normalizedEmail}" from local memory cache`);
  const user = devMemoryUsers.get(normalizedEmail);
  if (!user) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  const safeUser = { ...user };
  delete safeUser.passwordHash;

  const tokens = generateTokens(user);
  return { user: safeUser, ...tokens };
};

/**
 * Find user by ID
 */
export const getUserById = async (userId) => {
  if (isMongoConnected()) {
    const user = await User.findById(userId);
    return user ? user.toSafeObject() : null;
  }

  // In-memory search
  for (const user of devMemoryUsers.values()) {
    if (user._id === userId || user.id === userId) {
      const safe = { ...user };
      delete safe.passwordHash;
      return safe;
    }
  }
  return null;
};

/**
 * Award XP and advance streak for an authenticated user
 */
export const awardUserGamification = async (userId, xpToAdd) => {
  if (isMongoConnected()) {
    const user = await User.findById(userId);
    if (!user) return null;
    user.xp = (user.xp || 0) + (xpToAdd || 0);
    user.streak = (user.streak || 0) + 1;
    await user.save();

    // Sync to Redis Leaderboard
    updateUserScore(user._id || user.id, user.xp, {
      name: user.name,
      avatar: user.avatar,
      streak: user.streak,
      role: user.role,
    }).catch(() => {});

    return user.toSafeObject();
  }

  // In-memory update
  for (const [email, user] of devMemoryUsers.entries()) {
    if (user._id === userId || user.id === userId) {
      user.xp = (user.xp || 0) + (xpToAdd || 0);
      user.streak = (user.streak || 0) + 1;
      devMemoryUsers.set(email, user);

      // Sync to Leaderboard
      updateUserScore(user._id || user.id, user.xp, {
        name: user.name,
        avatar: user.avatar,
        streak: user.streak,
        role: user.role,
      }).catch(() => {});

      const safe = { ...user };
      delete safe.passwordHash;
      return safe;
    }
  }
  return null;
};


/**
 * Verify Refresh Token and issue new Access Token
 */
export const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    const error = new Error('Refresh token is required');
    error.statusCode = 400;
    throw error;
  }

  try {
    const decoded = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET);
    const user = await getUserById(decoded.id);

    if (!user) {
      const error = new Error('User no longer exists');
      error.statusCode = 401;
      throw error;
    }

    const payload = {
      id: user._id || user.id,
      email: user.email,
      role: user.role,
    };

    const newAccessToken = jwt.sign(payload, env.JWT_ACCESS_SECRET, {
      expiresIn: '1h',
    });

    return { accessToken: newAccessToken, user };
  } catch (err) {
    const error = new Error('Invalid or expired refresh token');
    error.statusCode = 401;
    throw error;
  }
};

/**
 * Verify Google ID Token against Google Tokeninfo API or dev token
 */
export const verifyGoogleToken = async (credential) => {
  if (!credential || typeof credential !== 'string') {
    const error = new Error('Google credential string is required');
    error.statusCode = 400;
    throw error;
  }

  // 1. Dev / Test Mode simulated Google credential (e.g. for testing without external GCP setup)
  if (credential.startsWith('dev-google-token:') || credential.startsWith('test-google-token:')) {
    const parts = credential.split(':');
    const email = parts[1] || 'google.student@example.com';
    const name = parts[2] || 'Google Learner';
    const googleId = parts[3] || `google_${Math.abs(email.split('').reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0), 0))}`;
    return {
      googleId,
      email: email.toLowerCase().trim(),
      name,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=4285F4`,
      emailVerified: true,
    };
  }

  // 2. Official Google OAuth2 Tokeninfo Endpoint verification
  try {
    const res = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`);
    if (!res.ok) {
      const errBody = await res.text();
      const error = new Error(`Google token validation failed: ${errBody || res.statusText}`);
      error.statusCode = 401;
      throw error;
    }

    const payload = await res.json();
    if (!payload.sub || !payload.email) {
      const error = new Error('Incomplete Google identity profile returned');
      error.statusCode = 401;
      throw error;
    }

    if (env.GOOGLE_CLIENT_ID && payload.aud !== env.GOOGLE_CLIENT_ID) {
      const error = new Error('Google credential client ID audience mismatch');
      error.statusCode = 401;
      throw error;
    }

    return {
      googleId: payload.sub,
      email: payload.email.toLowerCase().trim(),
      name: payload.name || payload.email.split('@')[0],
      avatar: payload.picture || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(payload.name || payload.email)}&backgroundColor=4285F4`,
      emailVerified: payload.email_verified === 'true' || payload.email_verified === true,
    };
  } catch (err) {
    if (err.statusCode) throw err;
    const error = new Error(`Google token verification error: ${err.message}`);
    error.statusCode = 401;
    throw error;
  }
};

/**
 * Sign In / Sign Up with Google
 */
export const googleAuth = async ({ credential, role = 'student' }) => {
  const profile = await verifyGoogleToken(credential);

  // 1. Real MongoDB Database Flow
  if (isMongoConnected()) {
    let user = await User.findOne({
      $or: [{ googleId: profile.googleId }, { email: profile.email }],
    });

    if (user) {
      // User exists: update Google ID or avatar if missing
      let modified = false;
      if (!user.googleId) {
        user.googleId = profile.googleId;
        user.authProvider = user.authProvider || 'google';
        modified = true;
      }
      if (!user.avatar && profile.avatar) {
        user.avatar = profile.avatar;
        modified = true;
      }
      if (modified) {
        await user.save();
      }
    } else {
      // Create new user account from Google profile
      user = await User.create({
        name: profile.name,
        email: profile.email,
        googleId: profile.googleId,
        authProvider: 'google',
        role: role || 'student',
        avatar: profile.avatar,
        xp: 0,
        streak: 0,
      });

      // Initialize leaderboard entry
      updateUserScore(user._id || user.id, 0, {
        name: user.name,
        avatar: user.avatar,
        streak: 0,
        role: user.role,
      }).catch(() => {});
    }

    const tokens = generateTokens(user);
    return { user: user.toSafeObject(), ...tokens };
  }

  // 2. Dev In-Memory Store Flow
  logger.warn(`[DEV IN-MEMORY STORE] Processing Google Auth for "${profile.email}"`);
  let memoryUser = null;
  for (const u of devMemoryUsers.values()) {
    if (u.googleId === profile.googleId || u.email === profile.email) {
      memoryUser = u;
      break;
    }
  }

  if (memoryUser) {
    if (!memoryUser.googleId) {
      memoryUser.googleId = profile.googleId;
      memoryUser.authProvider = memoryUser.authProvider || 'google';
    }
    if (!memoryUser.avatar && profile.avatar) {
      memoryUser.avatar = profile.avatar;
    }
    devMemoryUsers.set(memoryUser.email, memoryUser);
  } else {
    const id = new mongoose.Types.ObjectId().toString();
    memoryUser = {
      _id: id,
      id,
      name: profile.name,
      email: profile.email,
      googleId: profile.googleId,
      authProvider: 'google',
      role: role || 'student',
      avatar: profile.avatar,
      xp: 0,
      streak: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    devMemoryUsers.set(profile.email, memoryUser);

    updateUserScore(id, 0, {
      name: memoryUser.name,
      avatar: memoryUser.avatar,
      streak: 0,
      role: memoryUser.role,
    }).catch(() => {});
  }

  const safeUser = { ...memoryUser };
  delete safeUser.passwordHash;

  const tokens = generateTokens(memoryUser);
  return { user: safeUser, ...tokens };
};

export default {
  registerUser,
  loginUser,
  googleAuth,
  verifyGoogleToken,
  getUserById,
  awardUserGamification,
  refreshAccessToken,
  generateTokens,
};
