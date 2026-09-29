'use client';

import React, { useState } from 'react';
import {
  Settings,
  Bell,
  Target,
  Moon,
  Sun,
  Shield,
  CheckCircle2,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function StudentSettings({ user }) {
  const [dailyTarget, setDailyTarget] = useState('2');
  const [reminders, setReminders] = useState({
    streakAtRisk: true,
    dailyGoal: true,
    newRecommendation: true,
    leaderboardOvertake: false,
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleToggle = (key) => {
    setReminders((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white shadow-xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-[#38BDF8] border border-blue-400/30 text-xs font-semibold">
          <Settings className="w-3.5 h-3.5" />
          <span>Learner Preferences &bull; Configuration</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Settings ⚙️
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
          Configure daily learning goals, notification alerts, and habit reminders.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Daily Target Setting */}
        <Card className="bg-white border-[#E2E8F0] shadow-sm p-6 rounded-3xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-[#0F172A]">Daily Quiz Objective</h3>
              <p className="text-xs text-[#64748B]">Set how many quizzes you want to complete each day</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { val: '1', label: '1 Quiz / Day', desc: 'Casual (10m)' },
              { val: '2', label: '2 Quizzes / Day', desc: 'Recommended (20m)' },
              { val: '3', label: '3+ Quizzes / Day', desc: 'Intensive (35m)' },
            ].map((opt) => (
              <button
                key={opt.val}
                type="button"
                onClick={() => setDailyTarget(opt.val)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  dailyTarget === opt.val
                    ? 'bg-blue-50 border-[#2563EB] ring-1 ring-[#2563EB]/20 text-[#0F172A]'
                    : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B]'
                }`}
              >
                <span className="font-bold text-xs block text-[#0F172A]">{opt.label}</span>
                <span className="text-[11px] text-[#64748B] block mt-0.5">{opt.desc}</span>
              </button>
            ))}
          </div>
        </Card>

        {/* Notification Reminders */}
        <Card className="bg-white border-[#E2E8F0] shadow-sm p-6 rounded-3xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-[#0F172A]">Notifications &amp; Habit Alerts</h3>
              <p className="text-xs text-[#64748B]">Stay notified when streaks are at risk or goals are due</p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { key: 'streakAtRisk', title: '🔥 Streak At-Risk Alert', desc: 'Notify me when less than 4 hours remain to maintain my streak' },
              { key: 'dailyGoal', title: '🎯 Daily Objective Reminder', desc: 'Gentle reminder if daily goal is incomplete by evening' },
              { key: 'newRecommendation', title: '🤖 New AI Recommendations', desc: 'Alert when a targeted quiz is ready for your weak topics' },
              { key: 'leaderboardOvertake', title: '🏆 Leaderboard Movement', desc: 'Notify me when someone in my class passes my rank' },
            ].map((item) => (
              <div
                key={item.key}
                onClick={() => handleToggle(item.key)}
                className="p-3 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between gap-4 cursor-pointer hover:border-[#CBD5E1] transition-all"
              >
                <div>
                  <span className="font-bold text-xs text-[#0F172A] block">{item.title}</span>
                  <span className="text-[11px] text-[#64748B]">{item.desc}</span>
                </div>
                <div
                  className={`w-10 h-6 rounded-full transition-colors p-1 flex items-center ${
                    reminders[item.key] ? 'bg-[#2563EB] justify-end' : 'bg-slate-300 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex items-center justify-between pt-2">
          {savedSuccess && (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Preferences saved successfully!
            </span>
          )}
          <div className="ml-auto">
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs px-6 cursor-pointer"
            >
              Save Preferences
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
