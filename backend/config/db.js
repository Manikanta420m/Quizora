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
  logger.warn(`MongoDB notice: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
  logger.warn('MongoDB disconnected');
});

/**
 * Connect to MongoDB with Mongoose
 */
export const connectDB = async () => {
  try {
    logger.info(`Connecting to MongoDB...`);
    await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 3000,
    });
  } catch (error) {
    logger.warn(
      `MongoDB is currently unavailable: ${error.message}. ` +
      `Server will stay operational. Tip: Supply a local MongoDB or MongoDB Atlas URI in backend/.env.`
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
