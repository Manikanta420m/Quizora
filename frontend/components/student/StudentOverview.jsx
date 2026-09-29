'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Flame,
  Star,
  Target,
  Trophy,
  Zap,
  BookOpen,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  UploadCloud,
  Share2,
  Copy,
  Check,
  Brain,
  ChevronRight,
  Play,
  RotateCcw,
  Bookmark,
  Award,
  Users,
  Compass,
  FileText,
  MessageSquare,
  HelpCircle,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function StudentOverview({
  user,
  analyticsData,
  myRankData,
  achievementsData,
  onNavigateTab,
  onGenerateWeakPractice,
  isGeneratingWeakPractice,
  onOpenAIAssistant,
}) {
  const router = useRouter();
  const [copiedChallenge, setCopiedChallenge] = useState(false);
  const [activeCurvePeriod, setActiveCurvePeriod] = useState('W4');

  // Daily Goals checklist state
  const [dailyGoals, setDailyGoals] = useState([
    { id: 1, text: 'Complete 1 quiz', completed: true },
    { id: 2, text: 'Answer 20 questions', completed: true },
    { id: 3, text: 'Practice one weak topic', completed: false },
  ]);

  const toggleGoal = (id) => {
    setDailyGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, completed: !g.completed } : g))
    );
  };

  const completedGoalsCount = dailyGoals.filter((g) => g.completed).length;
  const goalsProgressPercent = Math.round((completedGoalsCount / dailyGoals.length) * 100);

  // Student metrics
  const summary = analyticsData?.summary || {
    totalAttempts: 24,
    averageScore: 87,
    totalQuestionsAnswered: 238,
    totalXpEarned: 1240,
    totalTimeSpentSeconds: 17280, // ~4.8 hours
  };

  const streakDays = user?.streak || 7;
  const bestStreak = 14;

  // Streak days of week
  const weekDays = [
    { label: 'M', done: true },
    { label: 'T', done: true },
    { label: 'W', done: true },
    { label: 'T', done: true },
    { label: 'F', done: true },
    { label: 'S', done: true },
    { label: 'S', done: true },
  ];

  // Weak topics list
  const weakTopics = [
    { topic: 'JavaScript', accuracy: 91, color: 'text-emerald-600', bg: 'bg-emerald-500', status: 'Mastered 🟢' },
    { topic: 'React', accuracy: 73, color: 'text-amber-600', bg: 'bg-amber-500', status: 'Moderate 🟡' },
    { topic: 'Node.js', accuracy: 64, color: 'text-orange-600', bg: 'bg-orange-500', status: 'Needs Practice 🟠' },
    { topic: 'DSA', accuracy: 52, color: 'text-rose-600', bg: 'bg-rose-500', status: 'Critical 🔴' },
  ];

  // AI Recommended Quizzes
  const recommendations = [
    {
      id: 'rec_1',
      title: 'React Hooks',
      topic: 'React',
      difficulty: 'Medium',
      questionsCount: 10,
      reason: 'Targets your recent errors',
      badgeColor: 'warning',
    },
    {
      id: 'rec_2',
      title: 'Graphs in DSA',
      topic: 'DSA',
      difficulty: 'Hard',
      questionsCount: 15,
      reason: 'Weakest topic (52% accuracy)',
      badgeColor: 'danger',
    },
    {
      id: 'rec_3',
      title: 'Node.js Streams',
      topic: 'Node.js',
      difficulty: 'Medium',
      questionsCount: 8,
      reason: 'Reinforces backend async',
      badgeColor: 'warning',
    },
  ];

  // Weekly Leaderboard snippet
  const weeklyLeaderboard = [
    { rank: 1, medal: '🥇', name: 'Ananya', xp: 1240, score: 94, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' },
    { rank: 2, medal: '🥈', name: 'Rahul', xp: 1180, score: 91, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
    { rank: 3, medal: '🥉', name: 'Priya', xp: 1105, score: 89, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80' },
    { rank: 4, medal: '4', name: user?.name || 'Mani', xp: 1050, score: 87, isMe: true, avatar: user?.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80' },
  ];

  // Saved Quizzes
  const savedQuizzes = [
    { id: 'sq_1', title: 'JavaScript Advanced', topic: 'JavaScript', questions: 12, difficulty: 'Hard' },
    { id: 'sq_2', title: 'React Hooks Deep Dive', topic: 'React', questions: 10, difficulty: 'Medium' },
    { id: 'sq_3', title: 'MongoDB Queries & Aggregation', topic: 'Databases', questions: 10, difficulty: 'Medium' },
    { id: 'sq_4', title: 'Graph Algorithms & BFS/DFS', topic: 'DSA', questions: 15, difficulty: 'Hard' },
  ];

  // Recent Activity
  const recentActivities = [
    { id: 'act_1', icon: CheckCircle2, iconColor: 'text-emerald-500', title: 'Completed JavaScript Quiz', subtitle: 'Score: 92% · 10 min ago' },
    { id: 'act_2', icon: Flame, iconColor: 'text-amber-500', title: 'Maintained 7-day streak', subtitle: 'Yesterday' },
    { id: 'act_3', icon: Trophy, iconColor: 'text-yellow-500', title: 'Earned "Perfect Score" badge', subtitle: '2 days ago' },
    { id: 'act_4', icon: BookOpen, iconColor: 'text-[#2563EB]', title: 'Started React Hooks Practice', subtitle: '3 days ago' },
  ];

  // Core Achievements preview
  const achievements = [
    { name: 'First Quiz', icon: '🏆', unlocked: true },
    { name: '7 Day Streak', icon: '🔥', unlocked: true },
    { name: 'Perfect Score', icon: '🎯', unlocked: true },
    { name: '25 Quizzes', icon: '📚', unlocked: false },
    { name: 'Speed Learner', icon: '⚡', unlocked: true },
    { name: 'Topic Master', icon: '🧠', unlocked: false },
  ];

  const handleCopyChallenge = () => {
    navigator.clipboard.writeText('https://quizora.app/challenge/QZ-82FA');
    setCopiedChallenge(true);
    setTimeout(() => setCopiedChallenge(false), 2000);
  };

  const displayName = user?.name ? user.name.split(' ')[0] : 'Mani';

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* ================================================================= */}
      {/* 1. PERSONALIZED WELCOME BANNER & QUICK ACTIONS */}
      {/* ================================================================= */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white shadow-xl relative overflow-hidden">
        {/* Ambient subtle glow */}
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-gradient-to-l from-[#2563EB]/25 to-transparent pointer-events-none" />

        <div className="space-y-3 relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-[#38BDF8] border border-blue-400/30 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Student Workspace &bull; Daily Target Active</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Good morning, {displayName}! 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Ready to test your knowledge today? Master weak topics, keep your 7-day streak alive, and climb the leaderboard!
          </p>

          {/* Daily Objective Actionable Callout */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-white/10 border border-white/20 text-xs font-medium backdrop-blur-sm">
            <Target className="w-4 h-4 text-[#38BDF8]" />
            <span>
              🎯 <strong className="text-white">Today&apos;s goal:</strong> Complete 2 quizzes (1/2 finished)
            </span>
          </div>
        </div>

        {/* 15. Quick Action Buttons */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 relative z-10">
          <Button
            variant="primary"
            size="sm"
            onClick={() => router.push('/quizzes/generate')}
            className="w-full sm:w-auto text-xs gap-1.5 shadow-md bg-gradient-to-r from-[#2563EB] to-[#38BDF8] hover:brightness-110 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>✨ Generate Quiz</span>
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => router.push('/quizzes/upload')}
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white/20 gap-1.5 text-xs backdrop-blur-sm cursor-pointer"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>📄 Upload PDF</span>
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => onNavigateTab('practice')}
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white/20 gap-1.5 text-xs backdrop-blur-sm cursor-pointer"
          >
            <Target className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>🎯 Practice</span>
          </Button>
        </div>
      </div>

      {/* ================================================================= */}
      {/* 2. QUICK STATS (4 PRIMARY CARDS + 4 SUPPORTING METRICS) */}
      {/* ================================================================= */}
      <div className="space-y-3">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Accuracy */}
          <Card className="bg-white border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow p-5 rounded-3xl">
            <div className="flex items-center justify-between text-xs text-[#64748B]">
              <span className="font-medium">Accuracy</span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
                <Target className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-[#0F172A] font-mono mt-2">
              {summary.averageScore}%
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold mt-1 block flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +4% this week
            </span>
          </Card>

          {/* Card 2: Quizzes Completed */}
          <Card className="bg-white border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow p-5 rounded-3xl">
            <div className="flex items-center justify-between text-xs text-[#64748B]">
              <span className="font-medium">Quizzes Completed</span>
              <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-[#0F172A] font-mono mt-2">
              {summary.totalAttempts}
            </div>
            <span className="text-[11px] text-[#64748B] mt-1 block">Across 6 tech topics</span>
          </Card>

          {/* Card 3: Questions Solved */}
          <Card className="bg-white border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow p-5 rounded-3xl">
            <div className="flex items-center justify-between text-xs text-[#64748B]">
              <span className="font-medium">Questions Solved</span>
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#7C3AED] flex items-center justify-center">
                <Brain className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-[#0F172A] font-mono mt-2">
              {summary.totalQuestionsAnswered}
            </div>
            <span className="text-[11px] text-[#64748B] mt-1 block">208 answered correctly</span>
          </Card>

          {/* Card 4: Streak */}
          <Card className="bg-gradient-to-br from-amber-500/10 via-white to-white border-amber-200 shadow-sm hover:shadow-md transition-shadow p-5 rounded-3xl">
            <div className="flex items-center justify-between text-xs text-amber-900 font-bold">
              <span>Day Streak</span>
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <Flame className="w-4 h-4 text-[#F59E0B]" />
              </div>
            </div>
            <div className="text-3xl font-black text-amber-600 font-mono mt-2 flex items-center gap-1.5">
              <span>🔥 {streakDays}</span>
              <span className="text-xs font-normal text-slate-500">Days</span>
            </div>
            <span className="text-[11px] text-amber-800 font-medium mt-1 block">
              Best streak: {bestStreak} days
            </span>
          </Card>
        </div>

        {/* Supporting Secondary Micro-Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
          <div className="p-3 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs">
            <span className="text-[11px] text-[#64748B] block">Total XP</span>
            <span className="font-mono font-bold text-sm text-[#2563EB]">{summary.totalXpEarned.toLocaleString()} XP</span>
          </div>
          <div className="p-3 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs">
            <span className="text-[11px] text-[#64748B] block">Study Time</span>
            <span className="font-mono font-bold text-sm text-[#0F172A]">4.8 Hours</span>
          </div>
          <div className="p-3 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs">
            <span className="text-[11px] text-[#64748B] block">Perfect Quizzes (100%)</span>
            <span className="font-mono font-bold text-sm text-emerald-600">6 Quizzes</span>
          </div>
          <div className="p-3 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs">
            <span className="text-[11px] text-[#64748B] block">Topics Mastered</span>
            <span className="font-mono font-bold text-sm text-[#0F172A]">3 Topics</span>
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* 5. CONTINUE LEARNING (FIRST MAJOR ACTION SECTION) */}
      {/* ================================================================= */}
      <Card className="bg-gradient-to-r from-blue-50/70 via-white to-sky-50/50 border-blue-200 p-6 sm:p-7 rounded-3xl shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] uppercase tracking-wider">
              <Play className="w-3.5 h-3.5 fill-[#2563EB]" />
              <span>Continue Learning</span>
            </div>
            <h2 className="text-xl font-extrabold text-[#0F172A] tracking-tight">
              JavaScript Fundamentals
            </h2>
            <p className="text-xs text-[#64748B]">
              In progress &bull; Scope, Closures, and Async Execution
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-2xl font-black text-[#2563EB] font-mono">72%</span>
              <span className="text-[11px] text-[#64748B] block font-mono">18 / 25 questions</span>
            </div>
            <Button
              variant="primary"
              size="md"
              onClick={() => router.push('/quizzes/generate')}
              className="gap-2 text-xs shadow-md bg-[#2563EB] hover:bg-[#1D4ED8] cursor-pointer"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5">
          <div className="w-full h-3 rounded-full bg-[#E2E8F0] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#2563EB] to-[#38BDF8] transition-all duration-500 shadow-xs"
              style={{ width: '72%' }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-[#64748B] font-mono">
            <span>7 questions remaining</span>
            <span>Target: 80% passing grade</span>
          </div>
        </div>
      </Card>

      {/* ================================================================= */}
      {/* 6. AI RECOMMENDED QUIZZES */}
      {/* ================================================================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-[#0F172A] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#2563EB]" />
              <span>Recommended for You</span>
            </h2>
            <p className="text-xs text-[#64748B]">
              AI synthesized quizzes based on your recent performance and weak topics
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('quizzes')}
            className="text-xs font-semibold text-[#2563EB] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map((rec) => (
            <Card
              key={rec.id}
              className="bg-white border-[#E2E8F0] hover:border-[#2563EB]/40 p-5 rounded-3xl shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant={rec.badgeColor} className="text-[10px] font-bold">
                    {rec.difficulty}
                  </Badge>
                  <span className="text-[11px] font-mono text-[#64748B]">
                    {rec.questionsCount} Questions
                  </span>
                </div>
                <h3 className="font-extrabold text-sm text-[#0F172A]">{rec.title}</h3>
                <p className="text-[11px] text-[#64748B] flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#2563EB]" />
                  <span>{rec.reason}</span>
                </p>
              </div>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => router.push('/quizzes/generate')}
                className="w-full text-xs gap-1.5 border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#2563EB] font-bold cursor-pointer"
              >
                <span>Start Quiz</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* ================================================================= */}
      {/* 3. STREAK SYSTEM & 4. DAILY GOALS (TWO-COLUMN HIGHLIGHT) */}
      {/* ================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Module 3: Streak System */}
        <Card className="bg-white border-[#E2E8F0] shadow-sm p-6 rounded-3xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block">
                Your Learning Streak
              </span>
              <h3 className="text-xl font-black text-[#0F172A] flex items-center gap-2">
                <Flame className="w-6 h-6 text-[#F59E0B]" />
                <span>{streakDays} Day Streak</span>
              </h3>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
              🔥 Best: {bestStreak} Days
            </span>
          </div>

          {/* Days of Week Circle Checkmarks */}
          <div className="space-y-2">
            <span className="text-xs text-[#64748B] font-medium block">This Week&apos;s Activity:</span>
            <div className="grid grid-cols-7 gap-2 text-center">
              {weekDays.map((d, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-amber-50 border border-amber-300 text-amber-700 flex items-center justify-center font-bold text-xs shadow-2xs">
                    ✓
                  </div>
                  <span className="text-[11px] font-bold text-[#64748B]">{d.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
            <span className="font-medium">Complete one quiz today to keep your streak alive!</span>
            <span className="font-bold text-amber-700">12h left</span>
          </div>

          {/* Streak Milestones */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block">
              Streak Milestones
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: '3 Days', achieved: true },
                { label: '7 Days', achieved: true },
                { label: '14 Days', achieved: false },
                { label: '30 Days', achieved: false },
                { label: '100 Days', achieved: false },
              ].map((m) => (
                <span
                  key={m.label}
                  className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${
                    m.achieved
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-[#F8FAFC] text-[#94A3B8] border-[#E2E8F0]'
                  }`}
                >
                  🔥 {m.label}
                </span>
              ))}
            </div>
          </div>
        </Card>

        {/* Module 4: Daily Goals Tracker */}
        <Card className="bg-white border-[#E2E8F0] shadow-sm p-6 rounded-3xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block">
                Daily Habit Tracker
              </span>
              <h3 className="text-xl font-black text-[#0F172A] flex items-center gap-2">
                <Target className="w-5 h-5 text-[#2563EB]" />
                <span>Today&apos;s Goals</span>
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-[#2563EB] bg-blue-50 px-2.5 py-1 rounded-xl border border-blue-200">
              {completedGoalsCount} of {dailyGoals.length} Completed
            </span>
          </div>

          {/* Checklist */}
          <div className="space-y-2.5">
            {dailyGoals.map((g) => (
              <div
                key={g.id}
                onClick={() => toggleGoal(g.id)}
                className={`p-3 rounded-2xl border transition-all flex items-center gap-3 cursor-pointer ${
                  g.completed
                    ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900'
                    : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A] hover:border-[#CBD5E1]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-lg border flex items-center justify-center text-xs font-bold transition-colors ${
                    g.completed
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'border-[#CBD5E1] bg-white'
                  }`}
                >
                  {g.completed && '✓'}
                </div>
                <span className={`text-xs font-semibold ${g.completed ? 'line-through text-slate-500' : ''}`}>
                  {g.text}
                </span>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="space-y-1.5 pt-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-[#64748B]">Goal Progress</span>
              <span className="text-[#2563EB] font-mono">{goalsProgressPercent}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-[#E2E8F0] overflow-hidden">
              <div
                className="h-full rounded-full bg-[#2563EB] transition-all duration-300"
                style={{ width: `${goalsProgressPercent}%` }}
              />
            </div>
            <span className="text-[11px] text-[#64748B] block mt-1">
              Complete your final goal to claim +100 bonus XP today!
            </span>
          </div>
        </Card>
      </div>

      {/* ================================================================= */}
      {/* 7. WEAK TOPICS & ADAPTIVE REMEDIATION */}
      {/* ================================================================= */}
      <Card className="bg-white border-[#E2E8F0] shadow-sm p-6 sm:p-7 rounded-3xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 uppercase tracking-wider">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Targeted Remediation</span>
            </div>
            <h2 className="text-xl font-extrabold text-[#0F172A] tracking-tight">
              Your Topic Mastery Breakdown
            </h2>
            <p className="text-xs text-[#64748B]">
              Quizora pinpoints your exact weakness so you don&apos;t waste time repeating what you already know.
            </p>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => onGenerateWeakPractice?.(['dsa', 'node.js'])}
            disabled={isGeneratingWeakPractice}
            className="text-xs gap-1.5 bg-rose-600 hover:bg-rose-700 text-white self-start sm:self-auto cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isGeneratingWeakPractice ? 'Synthesizing...' : '⚡ Generate Practice Quiz →'}</span>
          </Button>
        </div>

        {/* Topic Bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {weakTopics.map((t) => (
            <div
              key={t.topic}
              className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2 hover:border-[#CBD5E1] transition-all"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-[#0F172A]">{t.topic}</span>
                <span className={`font-mono font-bold ${t.color}`}>{t.accuracy}% &bull; {t.status}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#E2E8F0] overflow-hidden">
                <div
                  className={`h-full rounded-full ${t.bg}`}
                  style={{ width: `${t.accuracy}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-rose-900">
          <div>
            <strong>Recommendation:</strong> You should practice <strong>DSA (Graphs &amp; Recursion)</strong> next to boost your overall accuracy.
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onGenerateWeakPractice?.(['dsa'])}
            className="text-xs border-rose-300 text-rose-700 hover:bg-rose-100 shrink-0 cursor-pointer"
          >
            Start DSA Drill &rarr;
          </Button>
        </div>
      </Card>

      {/* ================================================================= */}
      {/* 8. PROGRESS ANALYTICS & 9. WEEKLY LEADERBOARD (TWO-COLUMN) */}
      {/* ================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Module 8: Progress Analytics */}
        <Card className="lg:col-span-2 bg-white border-[#E2E8F0] shadow-sm p-6 rounded-3xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0]">
            <div>
              <h3 className="font-extrabold text-[#0F172A] text-base flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#2563EB]" />
                <span>Your Progress &amp; Accuracy Trend</span>
              </h3>
              <p className="text-xs text-[#64748B]">Weekly accuracy progression across Fall 2026</p>
            </div>

            {/* Week selector pills */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs self-start sm:self-auto">
              {['W1', 'W2', 'W3', 'W4'].map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => setActiveCurvePeriod(w)}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                    activeCurvePeriod === w
                      ? 'bg-[#2563EB] text-white shadow-2xs'
                      : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          {/* Curve Graphic (ASCII / SVG line curve representation) */}
          <div className="h-44 w-full flex items-end justify-between gap-4 pt-6 pb-2 px-6 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] relative">
            <div className="absolute inset-x-4 top-8 border-b border-dashed border-[#CBD5E1]/60" />
            <div className="absolute inset-x-4 top-20 border-b border-dashed border-[#CBD5E1]/60" />

            {[
              { period: 'W1', score: 70 },
              { period: 'W2', score: 78 },
              { period: 'W3', score: 92 },
              { period: 'W4', score: 87 },
            ].map((p) => {
              const isSelected = activeCurvePeriod === p.period;
              return (
                <div key={p.period} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-[11px] font-mono font-bold text-[#2563EB]">
                    {p.score}%
                  </span>
                  <div
                    style={{ height: `${p.score}%` }}
                    className={`w-full max-w-[52px] rounded-xl transition-all duration-300 ${
                      isSelected
                        ? 'bg-gradient-to-t from-[#2563EB] to-[#38BDF8] shadow-md ring-2 ring-[#2563EB]/30'
                        : 'bg-[#94A3B8] hover:bg-[#64748B]'
                    }`}
                  />
                  <span className={`text-xs font-bold font-mono ${isSelected ? 'text-[#2563EB]' : 'text-[#64748B]'}`}>
                    {p.period}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Micro metrics */}
          <div className="grid grid-cols-3 gap-3 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <span className="text-[#64748B] block text-[11px]">Avg Time/Question</span>
              <span className="font-bold text-[#0F172A] font-mono text-sm">42 Seconds</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <span className="text-[#64748B] block text-[11px]">Quiz Completion</span>
              <span className="font-bold text-emerald-600 font-mono text-sm">96% Completed</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
              <span className="text-[#64748B] block text-[11px]">Average Score</span>
              <span className="font-bold text-[#2563EB] font-mono text-sm">87%</span>
            </div>
          </div>
        </Card>

        {/* Module 9: Weekly Leaderboard */}
        <Card className="bg-white border-[#E2E8F0] shadow-sm p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
            <div>
              <h3 className="font-extrabold text-[#0F172A] text-base flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>Weekly Leaderboard</span>
              </h3>
              <p className="text-[11px] text-[#64748B]">Updated real-time from Redis</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('leaderboard')}
              className="text-xs font-semibold text-[#2563EB] hover:underline"
            >
              View All &rarr;
            </button>
          </div>

          {/* Standings table */}
          <div className="space-y-2">
            {weeklyLeaderboard.map((item) => (
              <div
                key={item.rank}
                className={`p-2.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  item.isMe
                    ? 'bg-blue-50/70 border-[#2563EB] ring-1 ring-[#2563EB]/30'
                    : 'bg-[#F8FAFC] border-[#E2E8F0]'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="font-mono font-bold text-xs w-5 text-center">
                    {item.medal}
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-7 h-7 rounded-full object-cover border border-[#E2E8F0]"
                  />
                  <span className="font-bold text-xs text-[#0F172A] truncate">
                    {item.name} {item.isMe && <span className="text-[#2563EB]">(You)</span>}
                  </span>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-extrabold text-xs font-mono text-[#2563EB] block">
                    {item.xp} XP
                  </span>
                  <span className="text-[10px] font-mono text-emerald-600 block">
                    {item.score}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => onNavigateTab('leaderboard')}
            className="w-full text-xs gap-1 border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0F172A] cursor-pointer"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>View Full Leaderboard &rarr;</span>
          </Button>
        </Card>
      </div>

      {/* ================================================================= */}
      {/* 10. XP & LEVELS GAMIFICATION & 11. ACHIEVEMENTS (TWO-COLUMN) */}
      {/* ================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Module 10: XP & Levels */}
        <Card className="bg-white border-[#E2E8F0] shadow-sm p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block">
                Rank Progression
              </span>
              <h3 className="text-lg font-black text-[#0F172A] flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
                <span>Level 12 &bull; Quiz Explorer</span>
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-[#2563EB] bg-blue-50 px-2.5 py-1 rounded-xl border border-blue-200">
              {summary.totalXpEarned} / 1,500 XP
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="w-full h-3 rounded-full bg-[#E2E8F0] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#2563EB] to-[#38BDF8]"
                style={{ width: `${(1240 / 1500) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-[#64748B]">
              <span>260 XP until Level 13 (Code Champion)</span>
              <span>82%</span>
            </div>
          </div>

          <div className="pt-2 border-t border-[#E2E8F0] text-xs text-[#64748B] space-y-1">
            <span className="font-bold text-[#0F172A] block text-[11px] uppercase tracking-wider">
              Earn XP By:
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <span>&bull; Completing quizzes (+50 XP)</span>
              <span>&bull; Perfect scores (+100 XP)</span>
              <span>&bull; Maintaining streaks (+25 XP)</span>
              <span>&bull; Weak-topic mastery (+75 XP)</span>
            </div>
          </div>
        </Card>

        {/* Module 11: Achievements Showcase */}
        <Card className="bg-white border-[#E2E8F0] shadow-sm p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block">
                Hall of Badges
              </span>
              <h3 className="text-lg font-black text-[#0F172A] flex items-center gap-2">
                <Award className="w-5 h-5 text-[#2563EB]" />
                <span>Achievements (4/6 Unlocked)</span>
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab('achievements')}
              className="text-xs font-semibold text-[#2563EB] hover:underline"
            >
              All Badges &rarr;
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            {achievements.map((ach) => (
              <div
                key={ach.name}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  ach.unlocked
                    ? 'bg-amber-50/50 border-amber-200 text-amber-900 shadow-2xs'
                    : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#94A3B8] opacity-60'
                }`}
              >
                <div className="text-2xl mb-1">{ach.icon}</div>
                <span className="font-bold text-[11px] block truncate">{ach.name}</span>
                <span className="text-[9px] uppercase font-mono mt-0.5 block">
                  {ach.unlocked ? 'Unlocked ✓' : 'Locked 🔒'}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ================================================================= */}
      {/* 17. PDF → QUIZ & 18. CHALLENGE FRIENDS (TWO-COLUMN) */}
      {/* ================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Module 17: Turn Notes into a Quiz */}
        <Card className="bg-gradient-to-br from-indigo-50/70 via-white to-blue-50/60 border border-indigo-200 p-6 rounded-3xl space-y-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-[#0F172A] text-base">
                📄 Turn your notes into a quiz
              </h3>
              <p className="text-xs text-[#64748B]">
                Upload your lecture PDF or class notes and let Quizora AI generate questions for you.
              </p>
            </div>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => router.push('/quizzes/upload')}
            className="w-full text-xs gap-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white cursor-pointer"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload PDF &rarr;</span>
          </Button>
        </Card>

        {/* Module 18: Challenge Friends */}
        <Card className="bg-gradient-to-br from-purple-50/70 via-white to-pink-50/60 border border-purple-200 p-6 rounded-3xl space-y-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-[#0F172A] text-base">
                🎮 Challenge a Friend
              </h3>
              <p className="text-xs text-[#64748B]">
                Create a quiz &rarr; Share code &rarr; Compete for highest score on the leaderboard.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1 p-2.5 rounded-xl bg-white border border-[#E2E8F0] font-mono font-bold text-center text-xs text-[#0F172A]">
              QZ-82FA
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopyChallenge}
              className="text-xs gap-1 border-[#E2E8F0] text-[#2563EB] cursor-pointer"
            >
              {copiedChallenge ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedChallenge ? 'Copied!' : 'Copy Link'}</span>
            </Button>
          </div>
        </Card>
      </div>

      {/* ================================================================= */}
      {/* 13. SAVED QUIZZES & 14. RECENT ACTIVITY (TWO-COLUMN) */}
      {/* ================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Module 13: Saved Quizzes */}
        <Card className="bg-white border-[#E2E8F0] shadow-sm p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
            <h3 className="font-extrabold text-[#0F172A] text-base flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>❤️ Saved Quizzes</span>
            </h3>
            <button
              type="button"
              onClick={() => onNavigateTab('quizzes')}
              className="text-xs font-semibold text-[#2563EB] hover:underline"
            >
              Manage &rarr;
            </button>
          </div>

          <div className="space-y-2.5">
            {savedQuizzes.map((sq) => (
              <div
                key={sq.id}
                className="p-3 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#CBD5E1] transition-all flex items-center justify-between gap-3"
              >
                <div>
                  <h4 className="font-bold text-xs text-[#0F172A]">{sq.title}</h4>
                  <span className="text-[10px] text-[#64748B]">{sq.topic} &bull; {sq.questions} Qs &bull; {sq.difficulty}</span>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => router.push('/quizzes/generate')}
                  className="text-xs text-[#2563EB] border-[#E2E8F0] hover:bg-white cursor-pointer"
                >
                  Start Quiz
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Module 14: Recent Activity */}
        <Card className="bg-white border-[#E2E8F0] shadow-sm p-6 rounded-3xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
            <h3 className="font-extrabold text-[#0F172A] text-base flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#2563EB]" />
              <span>Recent Activity</span>
            </h3>
            <span className="text-[11px] text-[#64748B]">Real-time history</span>
          </div>

          <div className="space-y-3">
            {recentActivities.map((act) => {
              const Icon = act.icon;
              return (
                <div
                  key={act.id}
                  className="p-3 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-3"
                >
                  <div className="p-2 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs shrink-0">
                    <Icon className={`w-4 h-4 ${act.iconColor}`} />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-[#0F172A] block">{act.title}</span>
                    <span className="text-[11px] text-[#64748B] block">{act.subtitle}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* ================================================================= */}
      {/* 16. AI STUDY ASSISTANT FLOATING / DOCKED PROMPT PROMO */}
      {/* ================================================================= */}
      <Card className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-7 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-[#38BDF8] border border-blue-400/30 text-xs font-semibold">
            <Brain className="w-3.5 h-3.5" />
            <span>AI Study Companion</span>
          </div>
          <h2 className="text-xl font-black tracking-tight">
            Need help understanding a concept? Ask Quizora AI 🤖
          </h2>
          <p className="text-xs text-slate-300">
            Get instant distractor breakdowns, code walkthroughs, step-by-step logic hints, or custom quiz recommendations tailored to your goals.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={onOpenAIAssistant}
          className="gap-2 text-xs bg-gradient-to-r from-[#2563EB] to-[#38BDF8] hover:brightness-110 text-white shadow-lg cursor-pointer shrink-0"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Ask Quizora AI</span>
        </Button>
      </Card>
    </div>
  );
}
