'use client';

import React from 'react';
import {
  Award,
  Trophy,
  Flame,
  Star,
  Zap,
  Target,
  Clock,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function StudentAchievements({ achievementsData, user }) {
  const userStreak = typeof user?.streak === 'number' ? user.streak : 0;
  const userXp = typeof user?.xp === 'number' ? user.xp : 0;

  // Use API badges if available, otherwise compute accurate unlock state
  const apiBadges = achievementsData?.badges;
  const badges = apiBadges && apiBadges.length > 0 
    ? apiBadges.map((b) => ({
        id: b.id,
        name: b.title,
        desc: b.description,
        icon: b.icon === 'Flame' ? '🔥' : b.icon === 'Zap' ? '⚡' : b.icon === 'Award' ? '🏆' : b.icon === 'Timer' ? '⏱️' : '🎖️',
        unlocked: !!b.isUnlocked,
        progress: b.progressLabel || (b.isUnlocked ? 'Unlocked' : `${b.progress || 0}%`),
        date: b.unlockedAt ? new Date(b.unlockedAt).toLocaleDateString() : undefined,
      }))
    : [
        { id: 'b1', name: 'First Quiz', desc: 'Completed your very first technical assessment', icon: '🏆', unlocked: userXp > 0, progress: userXp > 0 ? 'Unlocked' : '0 / 1' },
        { id: 'b2', name: '3 Day Streak', desc: 'Maintained continuous daily practice for 3 days', icon: '🔥', unlocked: userStreak >= 3, progress: `${Math.min(userStreak, 3)} / 3` },
        { id: 'b3', name: '7 Day Streak', desc: 'Maintained continuous daily practice for a full week', icon: '⚡', unlocked: userStreak >= 7, progress: `${Math.min(userStreak, 7)} / 7` },
        { id: 'b4', name: 'Perfect Score', desc: 'Scored 100% accuracy on any standard quiz', icon: '🎯', unlocked: false, progress: 'Pending' },
        { id: 'b5', name: 'Speed Learner', desc: 'Completed a 10-question quiz in under 3 minutes', icon: '⚡', unlocked: false, progress: 'Pending' },
        { id: 'b6', name: '25 Quizzes', desc: 'Reached a total milestone of 25 completed quizzes', icon: '📚', unlocked: false, progress: '0 / 25' },
        { id: 'b7', name: 'Topic Master', desc: 'Attained 90%+ mastery across 3 distinct programming topics', icon: '🧠', unlocked: false, progress: '0 / 3' },
        { id: 'b8', name: '30 Day Streak', desc: 'Unbroken daily study habit for a month', icon: '👑', unlocked: userStreak >= 30, progress: `${Math.min(userStreak, 30)} / 30` },
      ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white shadow-xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-[#38BDF8] border border-blue-400/30 text-xs font-semibold">
          <Award className="w-3.5 h-3.5" />
          <span>Gamification Rewards &bull; Hall of Badges</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Achievements &amp; Badges 🏅
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
          Unlock badges as you achieve learning milestones, keep streaks, and master complex algorithms.
        </p>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {badges.map((b) => (
          <Card
            key={b.id}
            className={`p-5 rounded-3xl border transition-all text-center space-y-3 ${
              b.unlocked
                ? 'bg-white border-[#E2E8F0] shadow-sm hover:shadow-md'
                : 'bg-[#F8FAFC] border-[#E2E8F0] opacity-60'
            }`}
          >
            <div className="text-4xl">{b.icon}</div>
            <div>
              <h3 className="font-extrabold text-sm text-[#0F172A]">{b.name}</h3>
              <p className="text-[11px] text-[#64748B] mt-1 leading-snug">{b.desc}</p>
            </div>

            <div className="pt-2 border-t border-[#E2E8F0]">
              {b.unlocked ? (
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Unlocked {b.date} ✓
                </span>
              ) : (
                <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                  🔒 {b.progress}
                </span>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
