import mongoose from 'mongoose';
import env from './env.js';
import logger from '../utils/logger.js';

const connectionStates = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting',
};

/**
 * Connect to MongoDB with Mongoose
 */
// Setup connection event listeners once
mongoose.connection.on('connected', () => {
  logger.success(`MongoDB connected to: ${mongoose.connection.host}/${mongoose.connection.name}`);
});

mongoose.connection.on('error', (err) => {
  if (env.NODE_ENV === 'production') {
    logger.error(`MongoDB error during runtime: ${err.message}. Exiting production server to prevent data loss.`);
    process.exit(1);
  }
  logger.warn(`MongoDB notice: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
  if (env.NODE_ENV === 'production') {
    logger.error('MongoDB disconnected unexpectedly. Exiting production server to prevent data loss.');
    process.exit(1);
  }
  logger.warn('MongoDB disconnected');
});

/**
 * Connect to MongoDB with Mongoose
 */
export const connectDB = async () => {
  try {
    logger.info(`Connecting to MongoDB at: ${env.MONGODB_URI}...`);
    await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
  } catch (error) {
    if (env.NODE_ENV === 'production') {
      logger.error(`MongoDB connection failed: ${error.message}. Exiting production server to prevent data loss.`);
      process.exit(1);
    }
    logger.warn(
      `MongoDB is currently unavailable: ${error.message}. ` +
      `Server will stay operational using in-memory fallback since NODE_ENV is not production.`
    );
  }
};

/**
 * Helper to inspect database status for health checks
 */
export const getDBStatus = () => {
  const stateCode = mongoose.connection.readyState;
  const stateName = connectionStates[stateCode] || 'unknown';
  return {
    state: stateName,
    isConnected: stateCode === 1,
    host: mongoose.connection.host || null,
    name: mongoose.connection.name || null,
  };
};

export default connectDB;
