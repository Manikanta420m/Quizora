import mongoose from 'mongoose';

/**
 * Achievement / Badge Mongoose Schema
 * Tracks earned badges, unlock timestamps, and related metadata.
 */
const achievementSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      index: true,
    },
    badgeId: {
      type: String,
      required: [true, 'Badge ID is required'],
      index: true,
    },
    tier: {
      type: String,
      enum: ['bronze', 'silver', 'gold', 'platinum'],
      default: 'bronze',
    },
    unlockedAt: {
      type: Date,
      default: Date.now,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to guarantee a user only unlocks a specific badge once
achievementSchema.index({ userId: 1, badgeId: 1 }, { unique: true });

export const Achievement =
  mongoose.models.Achievement || mongoose.model('Achievement', achievementSchema);

export default Achievement;
