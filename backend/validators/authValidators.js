import { z } from 'zod';

/**
 * Validation schema for User Registration
 */
export const registerSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .trim()
    .min(2, 'Name must be at least 2 characters long')
    .max(50, 'Name must be at most 50 characters long'),
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .email('Please provide a valid email address')
    .toLowerCase(),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, 'Password must be at least 6 characters long')
    .max(100, 'Password is too long'),
  role: z
    .enum(['student', 'teacher', 'admin'], {
      errorMap: () => ({ message: 'Role must be student, teacher, or admin' }),
    })
    .default('student')
    .optional(),
});

/**
 * Validation schema for User Login
 */
export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .email('Please provide a valid email address')
    .toLowerCase(),
  password: z
    .string({ required_error: 'Password is required' })
    .min(1, 'Password is required'),
});

/**
 * Validation schema for Google Authentication
 */
export const googleAuthSchema = z.object({
  credential: z
    .string({ required_error: 'Google credential token is required' })
    .min(1, 'Google credential token cannot be empty'),
  role: z
    .enum(['student', 'teacher', 'admin'], {
      errorMap: () => ({ message: 'Role must be student, teacher, or admin' }),
    })
    .default('student')
    .optional(),
});

export default {
  registerSchema,
  loginSchema,
  googleAuthSchema,
};
