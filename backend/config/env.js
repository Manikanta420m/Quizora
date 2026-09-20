import dotenv from 'dotenv';
import { z } from 'zod';
import logger from '../utils/logger.js';

// Load environment variables from .env file
dotenv.config();

// Define the environment schema with Zod
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('5001').transform((val) => parseInt(val, 10)),
  MONGODB_URI: z
    .string()
    .default('mongodb://127.0.0.1:27017/ai_quiz_generator'),
  REDIS_URL: z.string().default('redis://127.0.0.1:6379'),
  CLIENT_URL: z.string().default('http://localhost:3000'),
  JWT_ACCESS_SECRET: z.string().default('super-secret-access-token-key-change-in-prod'),
  JWT_REFRESH_SECRET: z.string().default('super-secret-refresh-token-key-change-in-prod'),
  AI_API_KEY: z.string().optional(),
  GOOGLE_CLIENT_ID: z.string().optional().default(''),
});

// Validate process.env
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  logger.error('Invalid environment variables detected:');
  parsed.error.issues.forEach((issue) => {
    logger.error(`  - ${issue.path.join('.')}: ${issue.message}`);
  });
  logger.warn('Please check your backend/.env file.');
  process.exit(1);
}

export const env = parsed.data;
export default env;
