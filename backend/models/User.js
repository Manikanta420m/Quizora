import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * User Mongoose Schema
 * Follows educational platform data model with XP, Streaks, and Roles.
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address',
      ],
      index: true,
    },
    passwordHash: {
      type: String,
      required: function () {
        return !this.googleId && this.authProvider !== 'google';
      },
      select: false, // Do not include in queries by default
    },
    googleId: {
      type: String,
      default: null,
      sparse: true,
      index: true,
    },
    authProvider: {
      type: String,
      enum: ['local', 'google'],
      default: 'local',
    },

    avatar: {
      type: String,
      default: '',
    },
    xp: {
      type: Number,
      default: 0,
      min: [0, 'XP cannot be negative'],
    },
    streak: {
      type: Number,
      default: 0,
      min: [0, 'Streak cannot be negative'],
    },
    role: {
      type: String,
      enum: ['student', 'teacher', 'admin'],
      default: 'student',
    },
    refreshTokens: {
      type: [String],
      default: [],
      select: false,
    },
    lastActive: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

/**
 * Instance method to verify passwords using bcryptjs
 */
userSchema.methods.matchPassword = async function (enteredPassword) {
  if (!this.passwordHash) return false;
  return await bcrypt.compare(enteredPassword, this.passwordHash);
};

/**
 * Instance method to strip sensitive password data before returning to clients
 */
userSchema.methods.toSafeObject = function () {
  const obj = this.toObject();
  delete obj.passwordHash;
  delete obj.__v;
  return obj;
};

// Set default avatar based on name initials before saving
userSchema.pre('save', function () {
  if (!this.avatar) {
    const encodedName = encodeURIComponent(this.name);
    this.avatar = `https://api.dicebear.com/7.x/initials/svg?seed=${encodedName}&backgroundColor=6366f1`;
 }
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
