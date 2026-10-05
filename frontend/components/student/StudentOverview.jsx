'use client';

import React, { useState, useEffect } from 'react';
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
  Swords,
  RotateCcw,
  Bookmark,
  Award,
  Users,
  Compass,
  FileText,
  MessageSquare,
  HelpCircle,
  Plus,
  Trash2,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { useQuery } from '@tanstack/react-query';
import quizService from '@/services/quizService';
import { useAuth } from '@/context/AuthContext';

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
  const { token } = useAuth();
  const [copiedChallenge, setCopiedChallenge] = useState(false);
  const [activeCurvePeriod, setActiveCurvePeriod] = useState('W4');
  
  const [showQuickStartModal, setShowQuickStartModal] = useState(false);
  const [qsQuestions, setQsQuestions] = useState(10);
  const [qsTimeLimit, setQsTimeLimit] = useState(10);
  const [isQuickStarting, setIsQuickStarting] = useState(false);

  // Fetch recent quizzes
  const { data: quizzesResponse } = useQuery({
    queryKey: ['quizzes'],
    queryFn: () => quizService.getQuizzes({ limit: 5 }),
  });
  const recentQuiz = quizzesResponse?.quizzes?.[0];

  const handleQuickStart = async () => {
    if (!recentQuiz) return;
    setIsQuickStarting(true);
    try {
      const res = await quizService.generateQuiz({
        topic: recentQuiz.topic + " (Practice)",
        difficulty: 'medium',
        numberOfQuestions: Number(qsQuestions),
        timeLimit: Number(qsTimeLimit),
      }, token);
      
      const newQuizId = res?.quiz?._id || res?.quiz?.id || res?._id || res?.id;
      if (newQuizId) {
        router.push(`/quizzes/${newQuizId}/play?mode=quick&time=${qsTimeLimit}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsQuickStarting(false);
      setShowQuickStartModal(false);
    }
  };

  // Daily Goals checklist state
  const [dailyGoals, setDailyGoals] = useState([
    { id: 1, text: 'Complete 1 quiz', completed: false },
    { id: 2, text: 'Answer 20 questions', completed: false },
    { id: 3, text: 'Practice one weak topic', completed: false },
  ]);

  // Load from local storage and reset at midnight
  useEffect(() => {
    const savedGoals = localStorage.getItem('quizora_daily_goals');
    const savedDate = localStorage.getItem('quizora_daily_goals_date');
    const today = new Date().toDateString();

    if (savedDate === today && savedGoals) {
      setDailyGoals(JSON.parse(savedGoals));
    } else {
      localStorage.setItem('quizora_daily_goals_date', today);
      localStorage.setItem('quizora_daily_goals', JSON.stringify(dailyGoals));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleGoal = (id) => {
    setDailyGoals((prev) => {
      const updated = prev.map((g) => (g.id === id ? { ...g, completed: !g.completed } : g));
      localStorage.setItem('quizora_daily_goals', JSON.stringify(updated));
      return updated;
    });
  };

  const [newGoalText, setNewGoalText] = useState('');

  const addGoal = (e) => {
    e.preventDefault();
    if (!newGoalText.trim()) return;
    setDailyGoals((prev) => {
      const updated = [...prev, { id: Date.now(), text: newGoalText.trim(), completed: false }];
      localStorage.setItem('quizora_daily_goals', JSON.stringify(updated));
      return updated;
    });
    setNewGoalText('');
  };

  const removeGoal = (e, id) => {
    e.stopPropagation();
    setDailyGoals((prev) => {
      const updated = prev.filter((g) => g.id !== id);
      localStorage.setItem('quizora_daily_goals', JSON.stringify(updated));
      return updated;
    });
  };

  const completedGoalsCount = dailyGoals.filter((g) => g.completed).length;
  const goalsProgressPercent = dailyGoals.length > 0 ? Math.round((completedGoalsCount / dailyGoals.length) * 100) : 0;

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
      <div className="relative p-6 sm:p-8 rounded-3xl border border-white/60 shadow-xl overflow-hidden group">
        {/* Animated Background Orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] bg-blue-100/60 rounded-full mix-blend-multiply filter blur-[80px] animate-blob" />
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[150%] bg-indigo-100/60 rounded-full mix-blend-multiply filter blur-[80px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-50%] left-[20%] w-[50%] h-[150%] bg-sky-100/60 rounded-full mix-blend-multiply filter blur-[80px] animate-blob animation-delay-4000" />
        
        {/* Glassmorphism Surface */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl" />

        {/* Ambient subtle graphic */}
        <div
          className="absolute right-0 top-0 bottom-0 w-1/2 bg-cover bg-right opacity-20 pointer-events-none mix-blend-overlay [mask-image:linear-gradient(to_left,black_20%,transparent_100%)] transition-transform duration-1000 group-hover:scale-105"
          style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
          aria-hidden="true"
        />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 text-blue-600 border border-white shadow-sm text-xs font-bold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Student Workspace &bull; Daily Target Active</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-800">
              Good morning, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{displayName}</span>! 👋
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-medium">
              Ready to test your knowledge today? Master weak topics, keep your 7-day streak alive, and climb the leaderboard!
            </p>

            {/* Daily Objective Actionable Callout */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/70 border border-white shadow-sm text-sm font-semibold backdrop-blur-md transition-all hover:bg-white hover:shadow-md">
              <Target className="w-4 h-4 text-blue-600" />
              <span className="text-slate-700">
                🎯 <strong className="text-blue-600">Today&apos;s goal:</strong>{' '}
                {completedGoalsCount === dailyGoals.length && dailyGoals.length > 0
                  ? 'All goals completed! 🎉'
                  : `Complete daily habits (${completedGoalsCount}/${dailyGoals.length} finished)`}
              </span>
            </div>
          </div>

          {/* 15. Quick Action Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            <Button
              size="lg"
              onClick={() => onNavigateTab('generate')}
              className="w-full sm:w-auto text-sm gap-2 shadow-lg shadow-blue-500/20 bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 cursor-pointer text-white transition-all hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate Quiz</span>
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => onNavigateTab('generate_pdf')}
              className="w-full sm:w-auto bg-white/80 hover:bg-white text-slate-700 border-white gap-2 text-sm cursor-pointer shadow-sm backdrop-blur-md transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <UploadCloud className="w-4 h-4 text-slate-500" />
              <span>Upload PDF</span>
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => onNavigateTab('practice')}
              className="w-full sm:w-auto bg-white/80 hover:bg-white text-slate-700 border-white gap-2 text-sm cursor-pointer shadow-sm backdrop-blur-md transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <Target className="w-4 h-4 text-blue-500" />
              <span>Practice</span>
            </Button>
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* 2. MASTER DASHBOARD HEADER (PERFORMANCE + STREAK + LEADERBOARD) */}
      {/* ================================================================= */}
      <div className="relative rounded-3xl border border-white/60 shadow-xl overflow-hidden mb-8 group">
        {/* Animated Background Orbs for Dashboard Cards */}
        <div className="absolute top-[10%] left-[20%] w-[40%] h-[80%] bg-purple-100/60 rounded-full mix-blend-multiply filter blur-[80px] animate-blob" />
        <div className="absolute top-[10%] right-[20%] w-[40%] h-[80%] bg-teal-100/60 rounded-full mix-blend-multiply filter blur-[80px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-20%] left-[40%] w-[30%] h-[50%] bg-rose-100/60 rounded-full mix-blend-multiply filter blur-[80px] animate-blob animation-delay-4000" />
        
        {/* Glassmorphism Surface */}
        <div className="absolute inset-0 bg-white/50 backdrop-blur-3xl" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/50">
          
          {/* Column 1: Performance Overview */}
          <div className="p-7 sm:p-8 space-y-7 bg-white/30 backdrop-blur-sm">
             <div className="flex items-center justify-between pb-3 border-b border-white/50">
                <h3 className="font-extrabold text-[#0F172A] text-[15px] flex items-center gap-2 uppercase tracking-wider">
                   <TrendingUp className="w-4 h-4 text-[#2563EB]" />
                   Performance
                </h3>
             </div>
             
             {/* Main Stats (Compact) */}
             <div className="space-y-5">
               {/* Accuracy */}
               <div className="flex items-center justify-between p-2 hover:bg-white rounded-2xl transition-colors -mx-2">
                 <div className="flex items-center gap-3 text-xs font-bold text-[#64748B]">
                   <div className="w-8 h-8 rounded-xl bg-blue-100/50 text-[#2563EB] flex items-center justify-center shadow-2xs">
                     <Target className="w-4 h-4" />
                   </div>
                   Accuracy
                 </div>
                 <div className="text-right">
                   <div className="text-2xl font-black text-[#0F172A] font-mono">{summary.averageScore}%</div>
                   <span className="text-[11px] text-emerald-600 font-bold flex items-center justify-end gap-1">
                     <TrendingUp className="w-3 h-3" /> +4%
                   </span>
                 </div>
               </div>

               {/* Quizzes */}
               <div className="flex items-center justify-between p-2 hover:bg-white rounded-2xl transition-colors -mx-2">
                 <div className="flex items-center gap-3 text-xs font-bold text-[#64748B]">
                   <div className="w-8 h-8 rounded-xl bg-sky-100/50 text-[#0284C7] flex items-center justify-center shadow-2xs">
                     <BookOpen className="w-4 h-4" />
                   </div>
                   Completed
                 </div>
                 <div className="text-right">
                   <div className="text-2xl font-black text-[#0F172A] font-mono">{summary.totalAttempts}</div>
                   <span className="text-[11px] text-[#64748B] font-medium">quizzes</span>
                 </div>
               </div>

               {/* Solved */}
               <div className="flex items-center justify-between p-2 hover:bg-white rounded-2xl transition-colors -mx-2">
                 <div className="flex items-center gap-3 text-xs font-bold text-[#64748B]">
                   <div className="w-8 h-8 rounded-xl bg-purple-100/50 text-[#7C3AED] flex items-center justify-center shadow-2xs">
                     <Brain className="w-4 h-4" />
                   </div>
                   Solved
                 </div>
                 <div className="text-right">
                   <div className="text-2xl font-black text-[#0F172A] font-mono">{summary.totalQuestionsAnswered}</div>
                   <span className="text-[11px] text-[#64748B] font-medium">questions</span>
                 </div>
               </div>
             </div>

             {/* Minor Stats (Super Compact Grid) */}
             <div className="pt-6 border-t border-[#E2E8F0]/80 grid grid-cols-2 gap-4 text-center">
               <div className="bg-white border border-[#E2E8F0] rounded-2xl p-3 shadow-2xs hover:shadow-sm transition-shadow">
                 <span className="block text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-1">Total XP</span>
                 <span className="font-mono text-base font-black text-[#2563EB]">{summary.totalXpEarned.toLocaleString()}</span>
               </div>
               <div className="bg-white border border-[#E2E8F0] rounded-2xl p-3 shadow-2xs hover:shadow-sm transition-shadow">
                 <span className="block text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-1">Study Time</span>
                 <span className="font-mono text-base font-black text-[#0F172A]">4.8h</span>
               </div>
             </div>
          </div>
          
<div className="p-7 sm:p-8 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0]/80">
                      <div>
                        <span className="text-xs font-extrabold uppercase tracking-widest text-[#64748B] block mb-1">
                          Your Learning Streak
                        </span>
                        <h3 className="text-2xl font-black text-[#0F172A] flex items-center gap-2">
                          <Flame className="w-6 h-6 text-[#F59E0B]" />
                          <span>{streakDays} Day Streak</span>
                        </h3>
                      </div>
                      <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 shadow-2xs self-start sm:self-auto">
                        🔥 Best: {bestStreak} Days
                      </span>
                    </div>
          
                    {/* Days of Week Circle Checkmarks */}
                    <div className="space-y-3">
                      <span className="text-xs text-[#64748B] font-bold block">This Week&apos;s Activity:</span>
                      <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center">
                        {weekDays.map((d, i) => (
                          <div key={i} className="flex flex-col items-center gap-2">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 mx-auto rounded-full bg-gradient-to-b from-amber-50 to-amber-100/50 border-2 border-amber-300 text-amber-600 flex items-center justify-center font-bold text-sm shadow-sm transition-transform hover:scale-110">
                              ✓
                            </div>
                            <span className="text-xs font-bold text-[#64748B] uppercase">{d.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
          
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/60 text-xs flex items-center justify-between shadow-2xs">
                      <span className="font-semibold text-amber-900">Complete one quiz today to keep your streak alive!</span>
                      <span className="font-black text-amber-700 bg-white px-2.5 py-1 rounded-lg border border-amber-200 shadow-2xs whitespace-nowrap shrink-0">12h left</span>
                    </div>
          
                    {/* Streak Milestones */}
                    <div className="space-y-2 pt-2">
                      <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider block">
                        Milestones
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { label: '3 Days', achieved: true },
                          { label: '7 Days', achieved: true },
                          { label: '14 Days', achieved: false },
                          { label: '30 Days', achieved: false },
                          { label: '100 Days', achieved: false },
                        ].map((m) => (
                          <span
                            key={m.label}
                            className={`px-3 py-1 rounded-xl text-xs font-mono font-bold border transition-all ${
                              m.achieved
                                ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-2xs'
                                : 'bg-[#F8FAFC] text-[#94A3B8] border-[#E2E8F0]'
                            }`}
                          >
                            🔥 {m.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

<div className="p-7 sm:p-8 space-y-5 bg-[#FAFAFA]/50">
                    <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]/80">
                      <div>
                        <h3 className="font-extrabold text-[#0F172A] text-[15px] flex items-center gap-2 uppercase tracking-wider">
                          <Trophy className="w-4 h-4 text-amber-500" />
                          <span>Leaderboard</span>
                        </h3>
                        <p className="text-[11px] text-[#64748B] font-medium mt-0.5">Updated real-time from Redis</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onNavigateTab('leaderboard')}
                        className="text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] hover:underline transition-colors"
                      >
                        View All &rarr;
                      </button>
                    </div>
          
                    {/* Standings table */}
                    <div className="space-y-3">
                      {weeklyLeaderboard.map((item) => (
                        <div
                          key={item.rank}
                          className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                            item.isMe
                              ? 'bg-blue-50 border-[#2563EB] ring-2 ring-[#2563EB]/20 shadow-sm'
                              : 'bg-white border-[#E2E8F0] hover:border-[#CBD5E1] shadow-2xs'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="font-mono font-black text-sm w-6 text-center text-[#64748B]">
                              {item.medal}
                            </span>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={item.avatar}
                              alt={item.name}
                              className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
                            />
                            <span className="font-extrabold text-sm text-[#0F172A] truncate">
                              {item.name} {item.isMe && <span className="text-[#2563EB] ml-1">(You)</span>}
                            </span>
                          </div>
          
                          <div className="text-right shrink-0">
                            <span className="font-black text-sm font-mono text-[#2563EB] block">
                              {item.xp} XP
                            </span>
                            <span className="text-[10px] font-bold font-mono text-emerald-600 block mt-0.5 bg-emerald-50 inline-block px-1.5 rounded">
                              {item.score}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
          
                    <div className="pt-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => onNavigateTab('leaderboard')}
                        className="w-full text-xs font-bold gap-1.5 border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-[#0F172A] shadow-2xs cursor-pointer py-2.5 rounded-xl"
                      >
                        <Trophy className="w-3.5 h-3.5 text-amber-500" />
                        <span>View Full Leaderboard &rarr;</span>
                      </Button>
                    </div>
                  </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* 5. CONTINUE LEARNING (FIRST MAJOR ACTION SECTION) */}
      {/* ================================================================= */}
      <div className="relative p-6 sm:p-7 rounded-3xl border border-white/60 shadow-xl overflow-hidden group space-y-4 mb-8">
        {/* Animated Background Orbs */}
        <div className="absolute top-[-50%] right-[-10%] w-[40%] h-[200%] bg-blue-200/50 rounded-full mix-blend-multiply filter blur-[60px] animate-blob animation-delay-2000" />
        <div className="absolute top-[-50%] left-[-10%] w-[40%] h-[200%] bg-indigo-100/50 rounded-full mix-blend-multiply filter blur-[60px] animate-blob" />
        
        {/* Glassmorphism Surface */}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-3xl" />
        
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider bg-white/50 px-2 py-0.5 rounded-md border border-white">
              <Play className="w-3.5 h-3.5 fill-blue-600" />
              <span>Continue Learning</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">
              {recentQuiz ? recentQuiz.topic : 'JavaScript Fundamentals'}
            </h2>
            <p className="text-xs text-slate-600 font-medium">
              {recentQuiz ? `Based on your recent activity: ${recentQuiz.title}` : 'In progress • Scope, Closures, and Async Execution'}
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/40 p-3 rounded-2xl border border-white shadow-sm backdrop-blur-md">
            <div className="text-right pr-2 border-r border-slate-200/60">
              <span className="text-2xl font-black text-blue-600 font-mono">
                {recentQuiz && recentQuiz.scores?.length > 0 ? `${Math.max(...recentQuiz.scores)}%` : '--'}
              </span>
              <span className="text-[11px] text-slate-500 block font-bold uppercase tracking-wider">Best Score</span>
            </div>
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                if (recentQuiz) {
                  setShowQuickStartModal(true);
                } else {
                  onNavigateTab('generate');
                }
              }}
              className="gap-2 text-xs shadow-lg shadow-blue-500/20 bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 cursor-pointer transition-all hover:-translate-y-0.5"
            >
              <span>{recentQuiz ? 'Practice Again' : 'Generate Quiz'}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

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
                onClick={() => onGenerateWeakPractice([rec.title])}
                disabled={isGeneratingWeakPractice}
                className="w-full text-xs gap-1.5 border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#2563EB] font-bold cursor-pointer"
              >
                <span>{isGeneratingWeakPractice ? 'Generating...' : 'Start Quiz'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Card>
          ))}
        </div>
      </div>

            


            {/* ================================================================= */}
      {/* 4. DAILY GOALS & 8. PROGRESS ANALYTICS (TWO-COLUMN) */}
      {/* ================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Module 8: Progress Analytics */}
        <div className="lg:col-span-2 relative p-6 rounded-3xl border border-white/60 shadow-xl overflow-hidden space-y-5 h-full group flex flex-col">
          {/* Animated Background Orbs */}
          <div className="absolute top-[20%] left-[-10%] w-[50%] h-[80%] bg-blue-100/50 rounded-full mix-blend-multiply filter blur-[50px] animate-blob" />
          <div className="absolute top-[-10%] right-[10%] w-[40%] h-[70%] bg-purple-100/50 rounded-full mix-blend-multiply filter blur-[50px] animate-blob animation-delay-4000" />
          
          {/* Glassmorphism Surface */}
          <div className="absolute inset-0 bg-white/60 backdrop-blur-3xl" />
          
          <div className="relative z-10 flex-1 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/60">
              <div>
                <h3 className="font-extrabold text-slate-800 text-base flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span>Your Progress &amp; Accuracy Trend</span>
                </h3>
                <p className="text-xs text-slate-600">Weekly accuracy progression across Fall 2026</p>
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
            </div>
          </div>

        <div className="lg:col-span-1 h-full">
          {/* Module 4: Daily Goals Tracker */}
                  <div className="relative p-6 rounded-3xl border border-white/60 shadow-xl overflow-hidden space-y-5 h-full group flex flex-col">
                    {/* Animated Background Orbs */}
                    <div className="absolute top-[40%] right-[-10%] w-[60%] h-[50%] bg-amber-100/50 rounded-full mix-blend-multiply filter blur-[50px] animate-blob animation-delay-2000" />
                    
                    {/* Glassmorphism Surface */}
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-3xl" />
                    
                    <div className="relative z-10 flex-1 space-y-5">
                      <div className="flex items-center justify-between pb-3 border-b border-white/60">
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                            Daily Habit Tracker
                          </span>
                          <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                            <Target className="w-5 h-5 text-blue-600" />
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
                          className={`group p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                            g.completed
                              ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900'
                              : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A] hover:border-[#CBD5E1]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
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
                          <button
                            type="button"
                            onClick={(e) => removeGoal(e, g.id)}
                            className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Add Goal Form */}
                    <form onSubmit={addGoal} className="mt-2 flex items-center gap-2">
                      <input
                        type="text"
                        value={newGoalText}
                        onChange={(e) => setNewGoalText(e.target.value)}
                        placeholder="Add new goal..."
                        className="flex-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3 py-2.5 text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] placeholder:text-slate-400"
                      />
                      <button
                        type="submit"
                        disabled={!newGoalText.trim()}
                        className="p-2.5 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 hover:bg-blue-100 hover:border-blue-200 disabled:opacity-50 transition-colors cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </form>
          
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
                    </div>
                  </div>
        </div>

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
                  onClick={() => router.push(`/quizzes/${sq.id || sq._id}/play`)}
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
      {/* Quick Start Modal */}
      {showQuickStartModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-[#0F172A] mb-2">Practice {recentQuiz?.topic}</h3>
            <p className="text-sm text-[#64748B] mb-6">Customize your next session.</p>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-[#0F172A] block mb-1">Number of Questions</label>
                <select
                  value={qsQuestions}
                  onChange={(e) => setQsQuestions(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                >
                  <option value={5}>5 Questions</option>
                  <option value={10}>10 Questions</option>
                  <option value={20}>20 Questions</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-[#0F172A] block mb-1">Time Limit (Minutes)</label>
                <select
                  value={qsTimeLimit}
                  onChange={(e) => setQsTimeLimit(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                >
                  <option value={3}>3 Minutes</option>
                  <option value={5}>5 Minutes</option>
                  <option value={10}>10 Minutes</option>
                  <option value={20}>20 Minutes</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => setShowQuickStartModal(false)}
                disabled={isQuickStarting}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                className="flex-1 bg-[#2563EB] hover:bg-[#1D4ED8]"
                onClick={handleQuickStart}
                disabled={isQuickStarting}
              >
                {isQuickStarting ? 'Building...' : 'Start Practice'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
