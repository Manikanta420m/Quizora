'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  Target,
  Clock,
  CheckCircle2,
  AlertCircle,
  Brain,
  Zap,
  BarChart2,
  Sparkles,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function StudentProgress({ analyticsData }) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');

  const summary = analyticsData?.summary || {
    totalAttempts: 24,
    averageScore: 87,
    totalQuestionsAnswered: 238,
    totalXpEarned: 1240,
    totalTimeSpentSeconds: 17280,
  };

  const topics = [
    { name: 'JavaScript', accuracy: 91, attempts: 12, status: 'Mastered' },
    { name: 'Algorithms (DSA)', accuracy: 52, attempts: 8, status: 'Needs Work' },
    { name: 'React Components', accuracy: 78, attempts: 9, status: 'Proficient' },
    { name: 'Node.js Async', accuracy: 64, attempts: 6, status: 'Needs Work' },
    { name: 'CSS & Layouts', accuracy: 94, attempts: 5, status: 'Mastered' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white shadow-xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-[#38BDF8] border border-blue-400/30 text-xs font-semibold">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Learning Analytics &bull; Long-term Mastery</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          My Progress 📊
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
          Track your accuracy trends, time allocation, and topic mastery curve over time.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-white border-[#E2E8F0] p-5 rounded-3xl shadow-sm">
          <span className="text-xs text-[#64748B] block">Average Accuracy</span>
          <span className="text-3xl font-black font-mono text-[#2563EB] block mt-1">
            {summary.averageScore}%
          </span>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">Top 15% in cohort</span>
        </Card>

        <Card className="bg-white border-[#E2E8F0] p-5 rounded-3xl shadow-sm">
          <span className="text-xs text-[#64748B] block">Total Questions</span>
          <span className="text-3xl font-black font-mono text-[#0F172A] block mt-1">
            {summary.totalQuestionsAnswered}
          </span>
          <span className="text-[11px] text-[#64748B] mt-1 block">208 correct</span>
        </Card>

        <Card className="bg-white border-[#E2E8F0] p-5 rounded-3xl shadow-sm">
          <span className="text-xs text-[#64748B] block">Time Spent</span>
          <span className="text-3xl font-black font-mono text-[#0F172A] block mt-1">
            4.8h
          </span>
          <span className="text-[11px] text-[#64748B] mt-1 block">42s / question avg</span>
        </Card>

        <Card className="bg-white border-[#E2E8F0] p-5 rounded-3xl shadow-sm">
          <span className="text-xs text-[#64748B] block">Pass Rate</span>
          <span className="text-3xl font-black font-mono text-emerald-600 block mt-1">
            96%
          </span>
          <span className="text-[11px] text-[#64748B] mt-1 block">23 of 24 passed</span>
        </Card>
      </div>

      {/* Topics Mastery Table */}
      <Card className="bg-white border-[#E2E8F0] shadow-sm rounded-3xl overflow-hidden p-6 space-y-4">
        <h3 className="font-extrabold text-base text-[#0F172A]">Topic Accuracy Breakdown</h3>
        <div className="space-y-3">
          {topics.map((t) => (
            <div key={t.name} className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-[#0F172A]">{t.name} ({t.attempts} quizzes)</span>
                <span className={`font-mono font-bold ${t.accuracy >= 80 ? 'text-emerald-600' : t.accuracy >= 65 ? 'text-amber-600' : 'text-rose-600'}`}>
                  {t.accuracy}% &bull; {t.status}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#E2E8F0] overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    t.accuracy >= 80 ? 'bg-emerald-500' : t.accuracy >= 65 ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${t.accuracy}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
