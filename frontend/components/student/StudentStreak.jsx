'use client';

import React, { useState } from 'react';
import {
  Flame,
  Calendar,
  Shield,
  Star,
  CheckCircle2,
  Clock,
  Sparkles,
  Award,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function StudentStreak({ streak = 7 }) {
  const [freezeTokens, setFreezeTokens] = useState(2);

  const days = [
    { name: 'Monday', date: 'Sep 15', completed: true },
    { name: 'Tuesday', date: 'Sep 16', completed: true },
    { name: 'Wednesday', date: 'Sep 17', completed: true },
    { name: 'Thursday', date: 'Sep 18', completed: true },
    { name: 'Friday', date: 'Sep 19', completed: true },
    { name: 'Saturday', date: 'Sep 20', completed: true },
    { name: 'Sunday', date: 'Sep 21 (Today)', completed: true },
  ];

  const milestones = [
    { days: 3, label: 'Early Riser', unlocked: true, xp: 50 },
    { days: 7, label: 'Habit Builder', unlocked: true, xp: 150 },
    { days: 14, label: 'Consistency King', unlocked: false, xp: 300 },
    { days: 30, label: 'Monthly Master', unlocked: false, xp: 1000 },
    { days: 100, label: 'Unstoppable Legend', unlocked: false, xp: 5000 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/20 via-orange-500/10 to-[#0F172A] border border-amber-300/30 text-[#0F172A] shadow-xl space-y-2 relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-900 border border-amber-400/40 text-xs font-semibold">
          <Flame className="w-4 h-4 text-[#F59E0B]" />
          <span>Daily Habit Tracker &bull; Current Streak Active</span>
        </div>
        <h1 className="text-3xl font-black tracking-tight flex items-center gap-2 text-[#0F172A]">
          🔥 {streak} Day Learning Streak!
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
          Complete at least 1 quiz every day to maintain your streak, earn multiplier XP, and unlock exclusive badges.
        </p>
      </div>

      {/* Days of Current Week */}
      <Card className="bg-white border-[#E2E8F0] shadow-sm p-6 rounded-3xl space-y-4">
        <h3 className="font-extrabold text-base text-[#0F172A]">This Week&apos;s Calendar</h3>
        <div className="grid grid-cols-1 sm:grid-cols-7 gap-3">
          {days.map((d) => (
            <div
              key={d.name}
              className={`p-3.5 rounded-2xl border text-center space-y-1 ${
                d.completed
                  ? 'bg-amber-50/70 border-amber-200 text-amber-900'
                  : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#94A3B8]'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs mx-auto">
                ✓
              </div>
              <span className="font-bold text-xs block">{d.name.slice(0, 3)}</span>
              <span className="text-[10px] text-slate-500 block">{d.date}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Streak Protection Tokens & Milestones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white border-[#E2E8F0] shadow-sm p-6 rounded-3xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-[#0F172A]">Streak Freeze Tokens</h4>
              <p className="text-xs text-[#64748B]">Protects your streak if you miss a day</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <span className="text-xs font-bold text-[#0F172A]">Available Tokens:</span>
            <span className="font-mono font-black text-base text-[#2563EB]">🛡️ {freezeTokens}</span>
          </div>
        </Card>

        <Card className="bg-white border-[#E2E8F0] shadow-sm p-6 rounded-3xl space-y-4">
          <h4 className="font-extrabold text-sm text-[#0F172A]">Streak Milestones</h4>
          <div className="space-y-2">
            {milestones.map((m) => (
              <div
                key={m.days}
                className={`p-2.5 rounded-2xl border flex items-center justify-between text-xs ${
                  m.unlocked
                    ? 'bg-amber-50/50 border-amber-200 text-amber-900 font-bold'
                    : 'bg-[#F8FAFC] border-[#E2E8F0] text-slate-500'
                }`}
              >
                <span>🔥 {m.days} Days &bull; {m.label}</span>
                <span className="font-mono font-bold text-[#2563EB]">+{m.xp} XP</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
