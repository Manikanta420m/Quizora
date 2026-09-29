'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  GraduationCap,
  BookOpen,
  ClipboardList,
  TrendingUp,
  Target,
  Sparkles,
  Plus,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Trophy,
  Zap,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function TeacherOverview({
  teacherData,
  onNavigateTab,
  onLaunchAIGenerator,
}) {
  const [activeWeek, setActiveWeek] = useState('W4');
  const overview = teacherData?.overview || {
    totalStudents: 126,
    totalClasses: 4,
    quizzesCreated: 28,
    activeAssignments: 6,
    averageScore: 82,
    completionRate: 91,
    averageTimeMinutes: 18,
    questionsAnswered: 1284,
  };

  const weeklyTrend = teacherData?.weeklyTrend || [
    { week: 'W1', score: 70, completion: 82 },
    { week: 'W2', score: 76, completion: 86 },
    { week: 'W3', score: 89, completion: 94 },
    { week: 'W4', score: 82, completion: 91 },
  ];

  const recentActivities = teacherData?.recentActivities || [];
  const classes = teacherData?.classes || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Welcome Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white shadow-xl relative overflow-hidden">
        {/* Subtle background ambient graphic */}
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-gradient-to-l from-[#2563EB]/20 to-transparent pointer-events-none" />
        
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-[#38BDF8] border border-blue-400/30 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Educator Workspace &bull; Fall Semester 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Good morning, Professor! 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Here is your daily classroom pulse. 126 students active across 4 classes with an 82% average mastery rate.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onNavigateTab('classes')}
            className="bg-white/10 hover:bg-white/20 text-white border-white/20 gap-1.5 text-xs backdrop-blur-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Class</span>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onNavigateTab('assignments')}
            className="bg-white/10 hover:bg-white/20 text-white border-white/20 gap-1.5 text-xs backdrop-blur-sm"
          >
            <ClipboardList className="w-3.5 h-3.5" />
            <span>Create Assignment</span>
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onLaunchAIGenerator ? onLaunchAIGenerator() : onNavigateTab('ai-generator')}
            className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white gap-2 text-xs shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>AI Quiz Generator</span>
          </Button>
        </div>
      </div>

      {/* 6 Key KPI Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
        {/* Total Students */}
        <Card className="bg-white border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow p-4 rounded-2xl">
          <div className="flex items-center justify-between text-xs text-[#64748B]">
            <span>Total Students</span>
            <Users className="w-4 h-4 text-[#2563EB]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#0F172A] font-mono mt-1.5">
            {overview.totalStudents}
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-1">
            <TrendingUp className="w-3 h-3" /> +8 this month
          </span>
        </Card>

        {/* Total Classes */}
        <Card className="bg-white border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow p-4 rounded-2xl">
          <div className="flex items-center justify-between text-xs text-[#64748B]">
            <span>Total Classes</span>
            <GraduationCap className="w-4 h-4 text-[#38BDF8]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#0F172A] font-mono mt-1.5">
            {overview.totalClasses}
          </div>
          <span className="text-[10px] text-[#64748B] mt-1 block">Active cohorts</span>
        </Card>

        {/* Quizzes Created */}
        <Card className="bg-white border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow p-4 rounded-2xl">
          <div className="flex items-center justify-between text-xs text-[#64748B]">
            <span>Quizzes Created</span>
            <BookOpen className="w-4 h-4 text-[#2563EB]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#0F172A] font-mono mt-1.5">
            {overview.quizzesCreated}
          </div>
          <span className="text-[10px] text-blue-600 font-medium mt-1 block">18 AI generated</span>
        </Card>

        {/* Active Assignments */}
        <Card className="bg-white border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow p-4 rounded-2xl">
          <div className="flex items-center justify-between text-xs text-[#64748B]">
            <span>Assignments</span>
            <ClipboardList className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#0F172A] font-mono mt-1.5">
            {overview.activeAssignments}
          </div>
          <span className="text-[10px] text-amber-600 font-medium mt-1 block">Due this week</span>
        </Card>

        {/* Average Score */}
        <Card className="bg-white border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow p-4 rounded-2xl">
          <div className="flex items-center justify-between text-xs text-[#64748B]">
            <span>Avg. Score</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono mt-1.5">
            {overview.averageScore}%
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-1">
            <TrendingUp className="w-3 h-3" /> +4% vs last term
          </span>
        </Card>

        {/* Completion Rate */}
        <Card className="bg-white border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow p-4 rounded-2xl col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-xs text-[#64748B]">
            <span>Completion Rate</span>
            <Target className="w-4 h-4 text-[#2563EB]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#2563EB] font-mono mt-1.5">
            {overview.completionRate}%
          </div>
          <span className="text-[10px] text-[#64748B] mt-1 block">Across cohorts</span>
        </Card>
      </div>

      {/* Main Two-Column Section: Student Performance Chart & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Student Performance Weekly Curve Chart */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white border-[#E2E8F0] shadow-sm p-6 rounded-3xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0]">
              <div>
                <h3 className="font-extrabold text-[#0F172A] text-base">
                  Classroom Performance &amp; Mastery Curve
                </h3>
                <p className="text-xs text-[#64748B]">
                  Weekly average quiz scores across all active sections.
                </p>
              </div>

              {/* Week Pill Selector */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] self-start sm:self-auto">
                {weeklyTrend.map((item) => (
                  <button
                    key={item.week}
                    type="button"
                    onClick={() => setActiveWeek(item.week)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      activeWeek === item.week
                        ? 'bg-[#2563EB] text-white shadow-xs'
                        : 'text-[#64748B] hover:text-[#0F172A]'
                    }`}
                  >
                    {item.week}
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Bar & Trend Chart */}
            <div className="space-y-4">
              <div className="h-44 w-full flex items-end justify-between gap-4 pt-6 pb-2 px-4 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] relative">
                {/* Horizontal reference guide lines */}
                <div className="absolute inset-x-4 top-8 border-b border-dashed border-[#CBD5E1]/60" />
                <div className="absolute inset-x-4 top-20 border-b border-dashed border-[#CBD5E1]/60" />

                {weeklyTrend.map((item) => {
                  const isSelected = activeWeek === item.week;
                  return (
                    <div
                      key={item.week}
                      onClick={() => setActiveWeek(item.week)}
                      className="flex-1 flex flex-col items-center gap-2 h-full justify-end cursor-pointer group"
                    >
                      <div className="text-[11px] font-mono font-bold text-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.score}%
                      </div>
                      <div
                        style={{ height: `${item.score}%` }}
                        className={`w-full max-w-[56px] rounded-xl transition-all duration-300 ${
                          isSelected
                            ? 'bg-gradient-to-t from-[#2563EB] to-[#38BDF8] shadow-md ring-2 ring-[#2563EB]/40'
                            : 'bg-[#94A3B8] hover:bg-[#64748B]'
                        }`}
                      />
                      <span
                        className={`text-xs font-bold font-mono transition-colors ${
                          isSelected ? 'text-[#2563EB]' : 'text-[#64748B]'
                        }`}
                      >
                        {item.week}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Chart Footer Statistics */}
              <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <span className="text-[#64748B] block text-[11px]">Selected Week</span>
                  <span className="font-bold text-[#0F172A] font-mono text-sm">{activeWeek}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <span className="text-[#64748B] block text-[11px]">Average Score</span>
                  <span className="font-bold text-emerald-600 font-mono text-sm">
                    {weeklyTrend.find((w) => w.week === activeWeek)?.score || 82}%
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <span className="text-[#64748B] block text-[11px]">Completion Rate</span>
                  <span className="font-bold text-[#2563EB] font-mono text-sm">
                    {weeklyTrend.find((w) => w.week === activeWeek)?.completion || 91}%
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Classes Snapshot */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-[#0F172A] text-sm flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#2563EB]" />
                <span>Your Active Classes</span>
              </h3>
              <button
                type="button"
                onClick={() => onNavigateTab('classes')}
                className="text-xs font-semibold text-[#2563EB] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View All Classes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {classes.slice(0, 4).map((cls) => (
                <Card
                  key={cls.id}
                  onClick={() => onNavigateTab('classes')}
                  className="bg-white border-[#E2E8F0] hover:border-[#2563EB]/40 p-4 rounded-2xl shadow-2xs hover:shadow-sm transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-blue-50 text-[#2563EB] border border-blue-200">
                      {cls.code}
                    </span>
                    <Badge variant={cls.averageScore >= 80 ? 'success' : 'warning'}>
                      {cls.averageScore}% Avg
                    </Badge>
                  </div>
                  <h4 className="font-extrabold text-sm text-[#0F172A]">{cls.name}</h4>
                  <div className="flex items-center justify-between text-xs text-[#64748B] mt-2 pt-2 border-t border-[#E2E8F0]">
                    <span>{cls.studentsCount} Students</span>
                    <span>{cls.completionRate}% Completion</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Top Performers Leaderboard Widget & Recent Activity */}
        <div className="space-y-6">
          {/* Top Performers Leaderboard Widget */}
          <Card className="bg-white border-[#E2E8F0] shadow-sm p-5 rounded-3xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
              <h3 className="font-bold text-[#0F172A] text-sm flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>Top Performers</span>
              </h3>
              <button
                type="button"
                onClick={() => onNavigateTab('leaderboard')}
                className="text-xs font-semibold text-[#2563EB] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Leaderboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {(teacherData?.leaderboard || [
                { rank: 1, name: 'Sarah Chen', className: 'Web Dev', xp: 3850, accuracy: 96, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80' },
                { rank: 2, name: 'Rahul Kumar', className: 'Data Struct', xp: 3420, accuracy: 94, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80' },
                { rank: 3, name: 'Elena Rostova', className: 'AI Fund', xp: 3180, accuracy: 92, avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80' },
              ]).slice(0, 3).map((stu, idx) => (
                <div
                  key={stu.name}
                  onClick={() => onNavigateTab('leaderboard')}
                  className="p-2.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#2563EB]/40 transition-all flex items-center justify-between gap-3 cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 ${
                        idx === 0
                          ? 'bg-amber-100 text-amber-900 font-mono border border-amber-300'
                          : idx === 1
                          ? 'bg-slate-200 text-slate-800 font-mono'
                          : 'bg-amber-800/20 text-amber-900 font-mono'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={stu.avatar}
                      alt={stu.name}
                      className="w-7 h-7 rounded-full object-cover border border-[#E2E8F0] shrink-0"
                    />
                    <div className="truncate">
                      <span className="font-bold text-xs text-[#0F172A] block truncate group-hover:text-[#2563EB] transition-colors">
                        {stu.name}
                      </span>
                      <span className="text-[10px] text-[#64748B] block truncate">{stu.className}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-extrabold text-xs font-mono text-[#2563EB] block">
                      {stu.xp} XP
                    </span>
                    <span className="text-[10px] font-mono text-emerald-600 font-bold block">
                      {stu.accuracy}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => onNavigateTab('leaderboard')}
              className="w-full text-xs gap-1 border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC]"
            >
              <Trophy className="w-3 h-3 text-[#F59E0B]" />
              <span>Open Class Leaderboard &rarr;</span>
            </Button>
          </Card>

          {/* Recent Activity Stream */}
          <Card className="bg-white border-[#E2E8F0] shadow-sm p-5 rounded-3xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
              <h3 className="font-bold text-[#0F172A] text-sm flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#2563EB]" />
                <span>Recent Activity</span>
              </h3>
              <span className="text-[11px] text-[#64748B]">Real-time feed</span>
            </div>

            <div className="space-y-3">
              {recentActivities.map((act) => {
                let icon = <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />;

                if (act.type === 'ai') {
                  icon = <Sparkles className="w-4 h-4 text-[#2563EB]" />;
                } else if (act.type === 'warning') {
                  icon = <AlertCircle className="w-4 h-4 text-[#EF4444]" />;
                } else if (act.type === 'milestone') {
                  icon = <Trophy className="w-4 h-4 text-amber-500" />;
                } else if (act.type === 'deadline') {
                  icon = <Clock className="w-4 h-4 text-amber-500" />;
                }

                return (
                  <div
                    key={act.id}
                    className="p-3 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#CBD5E1] transition-all flex items-start gap-3"
                  >
                    <div className="p-2 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs shrink-0 mt-0.5">
                      {icon}
                    </div>
                    <div className="space-y-1 min-w-0">
                      <p className="text-xs font-semibold text-[#0F172A] leading-snug">
                        {act.title}
                      </p>
                      <span className="text-[10px] text-[#64748B] block font-mono">
                        {act.time}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Quick AI Pedagogical Suggestion Card */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-200 p-5 rounded-3xl space-y-3.5 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1E40AF]">
              <Sparkles className="w-4 h-4 text-[#2563EB]" />
              <span>AI Curriculum Insight</span>
            </div>
            <p className="text-xs text-[#0F172A] leading-relaxed">
              Your Web Development class has achieved 94% on Arrays, but has a 58% average on Dynamic Programming.
            </p>
            <Button
              variant="primary"
              size="sm"
              onClick={() => onNavigateTab('analytics')}
              className="w-full gap-1.5 text-xs bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Review Class Weak Areas</span>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
