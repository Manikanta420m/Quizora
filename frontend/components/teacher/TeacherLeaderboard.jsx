'use client';

import React, { useState, useMemo } from 'react';
import {
  Trophy,
  Crown,
  Medal,
  Flame,
  Star,
  Zap,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Minus,
  Sparkles,
  Search,
  Filter,
  Download,
  Gift,
  Send,
  CheckCircle2,
  Users,
  GraduationCap,
  Award,
  ExternalLink,
  ChevronRight,
  X,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function TeacherLeaderboard({ teacherData, onNavigateToAnalytics }) {
  const initialLeaderboard = teacherData?.leaderboard || [
    {
      rank: 1,
      id: 'stu_1',
      name: 'Sarah Chen',
      email: 'sarah.chen@university.edu',
      classId: 'cls_webdev',
      className: 'Web Development',
      xp: 3850,
      accuracy: 96,
      quizzesCompleted: 28,
      streakDays: 21,
      rankDelta: 0,
      topBadge: 'JavaScript Guru',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    },
    {
      rank: 2,
      id: 'stu_2',
      name: 'Rahul Kumar',
      email: 'rahul.k@university.edu',
      classId: 'cls_datastruct',
      className: 'Data Structures',
      xp: 3420,
      accuracy: 94,
      quizzesCompleted: 26,
      streakDays: 18,
      rankDelta: 1,
      topBadge: 'Algorithm Ace',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    },
    {
      rank: 3,
      id: 'stu_3',
      name: 'Elena Rostova',
      email: 'elena.r@university.edu',
      classId: 'cls_ai',
      className: 'AI Fundamentals',
      xp: 3180,
      accuracy: 92,
      quizzesCompleted: 25,
      streakDays: 15,
      rankDelta: -1,
      topBadge: 'Neural Pioneer',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    },
    {
      rank: 4,
      id: 'stu_4',
      name: 'Marcus Vance',
      email: 'marcus.v@university.edu',
      classId: 'cls_js',
      className: 'JavaScript Mastery',
      xp: 2950,
      accuracy: 89,
      quizzesCompleted: 23,
      streakDays: 12,
      rankDelta: 2,
      topBadge: 'Async Master',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    },
    {
      rank: 5,
      id: 'stu_5',
      name: 'Aisha Patel',
      email: 'aisha.p@university.edu',
      classId: 'cls_webdev',
      className: 'Web Development',
      xp: 2780,
      accuracy: 88,
      quizzesCompleted: 22,
      streakDays: 14,
      rankDelta: 0,
      topBadge: 'CSS Wizard',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    },
    {
      rank: 6,
      id: 'stu_6',
      name: 'David Kim',
      email: 'david.k@university.edu',
      classId: 'cls_datastruct',
      className: 'Data Structures',
      xp: 2640,
      accuracy: 86,
      quizzesCompleted: 21,
      streakDays: 9,
      rankDelta: -1,
      topBadge: 'Graph Navigator',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
    },
    {
      rank: 7,
      id: 'stu_7',
      name: 'Priya Sharma',
      email: 'priya.s@university.edu',
      classId: 'cls_ai',
      className: 'AI Fundamentals',
      xp: 2510,
      accuracy: 85,
      quizzesCompleted: 20,
      streakDays: 11,
      rankDelta: 1,
      topBadge: 'Prompt Engineer',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    },
    {
      rank: 8,
      id: 'stu_8',
      name: 'Liam O\'Connor',
      email: 'liam.o@university.edu',
      classId: 'cls_js',
      className: 'JavaScript Mastery',
      xp: 2390,
      accuracy: 82,
      quizzesCompleted: 19,
      streakDays: 7,
      rankDelta: 0,
      topBadge: 'Bug Hunter',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
    },
  ];

  const [students, setStudents] = useState(initialLeaderboard);
  const [selectedClass, setSelectedClass] = useState('all');
  const [timeframe, setTimeframe] = useState('all-time'); // 'weekly', 'monthly', 'all-time'
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals state
  const [bonusModalStudent, setBonusModalStudent] = useState(null);
  const [bonusAmount, setBonusAmount] = useState(100);
  const [bonusReason, setBonusReason] = useState('Outstanding Quiz Performance');
  
  const [kudosModalStudent, setKudosModalStudent] = useState(null);
  const [kudosMessage, setKudosMessage] = useState('Great work on staying consistent with your quizzes this week!');

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Class cohorts summary
  const cohorts = [
    { id: 'cls_webdev', name: 'Web Development', totalXp: 48200, avgAccuracy: 87, students: 42, leader: 'Sarah Chen' },
    { id: 'cls_datastruct', name: 'Data Structures', totalXp: 41800, avgAccuracy: 81, students: 35, leader: 'Rahul Kumar' },
    { id: 'cls_js', name: 'JavaScript Mastery', totalXp: 36400, avgAccuracy: 84, students: 28, leader: 'Marcus Vance' },
    { id: 'cls_ai', name: 'AI Fundamentals', totalXp: 31200, avgAccuracy: 76, students: 21, leader: 'Elena Rostova' },
  ];

  // Filtering students
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchClass = selectedClass === 'all' || student.classId === selectedClass;
      const matchSearch =
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.className.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.topBadge.toLowerCase().includes(searchQuery.toLowerCase());
      return matchClass && matchSearch;
    });
  }, [students, selectedClass, searchQuery]);

  // Top 3 Podium
  const first = filteredStudents[0];
  const second = filteredStudents[1];
  const third = filteredStudents[2];
  const remainingStudents = filteredStudents.slice(3);

  // Award Bonus XP handler
  const handleAwardBonusXp = (e) => {
    e.preventDefault();
    if (!bonusModalStudent) return;

    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === bonusModalStudent.id) {
          return {
            ...s,
            xp: s.xp + parseInt(bonusAmount, 10),
          };
        }
        return s;
      })
    );

    showToast(`🎉 Awarded +${bonusAmount} XP to ${bonusModalStudent.name} for "${bonusReason}"!`);
    setBonusModalStudent(null);
  };

  // Send Kudos handler
  const handleSendKudos = (e) => {
    e.preventDefault();
    if (!kudosModalStudent) return;

    showToast(`💌 Commendation note dispatched to ${kudosModalStudent.name}!`);
    setKudosModalStudent(null);
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['Rank', 'Name', 'Email', 'Class', 'XP', 'Accuracy (%)', 'Quizzes Completed', 'Streak (Days)', 'Top Badge'];
    const rows = filteredStudents.map((s, idx) => [
      idx + 1,
      `"${s.name}"`,
      `"${s.email}"`,
      `"${s.className}"`,
      s.xp,
      s.accuracy,
      s.quizzesCompleted,
      s.streakDays,
      `"${s.topBadge}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Quizora_Teacher_Leaderboard_${selectedClass}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('📊 Classroom leaderboard exported as CSV!');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[#0F172A] text-white border border-[#38BDF8]/40 shadow-2xl flex items-center gap-3 text-xs font-semibold animate-in slide-in-from-bottom-5">
          <Sparkles className="w-4 h-4 text-[#38BDF8]" />
          <span>{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage('')}
            className="ml-2 text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-[#F59E0B] border border-amber-400/30 text-xs font-semibold">
            <Trophy className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Teacher Leaderboard &bull; Class XP &amp; Mastery Standings</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Classroom Hall of Fame 🏆
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Track student effort, celebrate milestones, and foster healthy academic competition. Real-time scores synced with Redis gamification engine.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleExportCSV}
            className="bg-white/10 hover:bg-white/20 text-white border-white/20 gap-1.5 text-xs backdrop-blur-sm cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              if (filteredStudents.length > 0) {
                setBonusModalStudent(filteredStudents[0]);
              }
            }}
            className="gap-1.5 text-xs shadow-md bg-gradient-to-r from-[#2563EB] to-[#38BDF8] hover:brightness-110 cursor-pointer"
          >
            <Gift className="w-3.5 h-3.5" />
            <span>Award Bonus XP</span>
          </Button>
        </div>
      </div>

      {/* Cohort vs Cohort Showdown Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-[#2563EB]" />
            <h2 className="text-sm font-extrabold text-[#0F172A] uppercase tracking-wider">
              Cohort vs Cohort Standings
            </h2>
          </div>
          <span className="text-xs text-[#64748B]">Ranked by total earned XP</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cohorts.map((c, idx) => (
            <Card
              key={c.id}
              onClick={() => setSelectedClass(selectedClass === c.id ? 'all' : c.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                selectedClass === c.id
                  ? 'bg-blue-50/50 border-[#2563EB] ring-2 ring-[#2563EB]/20 shadow-md'
                  : 'bg-white border-[#E2E8F0] hover:border-[#CBD5E1] hover:shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#F1F5F9] text-[#0F172A] border border-[#E2E8F0]">
                  #{idx + 1} Cohort
                </span>
                {idx === 0 && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    <Trophy className="w-3 h-3 text-[#F59E0B]" />
                    Leader
                  </span>
                )}
              </div>
              <h3 className="text-sm font-black text-[#0F172A] truncate">{c.name}</h3>
              <p className="text-[11px] text-[#64748B] mt-0.5">{c.students} active students</p>

              <div className="mt-3 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-[#64748B] block">Total Points</span>
                  <span className="font-extrabold text-[#2563EB] font-mono">{c.totalXp.toLocaleString()} XP</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#64748B] block">Avg Mastery</span>
                  <span className="font-extrabold text-emerald-600 font-mono">{c.avgAccuracy}%</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Class Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedClass('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedClass === 'all'
                ? 'bg-[#2563EB] text-white shadow-xs'
                : 'bg-[#F8FAFC] text-[#64748B] hover:text-[#0F172A] border border-[#E2E8F0]'
            }`}
          >
            All Classes ({students.length})
          </button>
          {cohorts.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedClass(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedClass === c.id
                  ? 'bg-[#2563EB] text-white shadow-xs'
                  : 'bg-[#F8FAFC] text-[#64748B] hover:text-[#0F172A] border border-[#E2E8F0]'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Search & Timeframe Controls */}
        <div className="flex items-center gap-3">
          {/* Timeframe Selector */}
          <div className="flex items-center rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-1 text-xs">
            <button
              type="button"
              onClick={() => setTimeframe('weekly')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                timeframe === 'weekly' ? 'bg-white text-[#0F172A] shadow-xs' : 'text-[#64748B]'
              }`}
            >
              Week
            </button>
            <button
              type="button"
              onClick={() => setTimeframe('monthly')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                timeframe === 'monthly' ? 'bg-white text-[#0F172A] shadow-xs' : 'text-[#64748B]'
              }`}
            >
              Month
            </button>
            <button
              type="button"
              onClick={() => setTimeframe('all-time')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                timeframe === 'all-time' ? 'bg-white text-[#0F172A] shadow-xs' : 'text-[#64748B]'
              }`}
            >
              All Time
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-60">
            <Search className="w-3.5 h-3.5 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search student or badge..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0F172A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      {filteredStudents.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-4">
          {/* 2nd Place: Silver */}
          {second && (
            <Card className="order-2 md:order-1 bg-white border-slate-200 shadow-md p-6 rounded-3xl text-center space-y-4 relative overflow-hidden hover:shadow-lg transition-shadow">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-slate-300 via-slate-400 to-slate-300" />
              <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-slate-100 border border-slate-300 text-slate-700 text-xs font-bold font-mono">
                <Medal className="w-3.5 h-3.5 text-slate-500" />
                #2 Silver Medal
              </div>

              <div className="relative w-20 h-20 mx-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={second.avatar}
                  alt={second.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-slate-200 shadow-md mx-auto"
                />
                <span className="absolute -bottom-2 -right-1 w-7 h-7 rounded-full bg-slate-700 text-white font-black text-xs flex items-center justify-center shadow-md">
                  2
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-[#0F172A] text-lg">{second.name}</h3>
                <p className="text-xs text-[#64748B]">{second.className}</p>
                <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2563EB] text-[11px] font-semibold border border-blue-200">
                  {second.topBadge}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#E2E8F0] text-center">
                <div>
                  <span className="text-[10px] text-[#64748B] block">Score</span>
                  <span className="font-mono font-bold text-sm text-[#0F172A]">{second.xp}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#64748B] block">Accuracy</span>
                  <span className="font-mono font-bold text-sm text-emerald-600">{second.accuracy}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#64748B] block">Streak</span>
                  <span className="font-mono font-bold text-sm text-amber-600 flex items-center justify-center gap-0.5">
                    <Flame className="w-3 h-3 text-[#F59E0B]" /> {second.streakDays}d
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 pt-1">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setBonusModalStudent(second)}
                  className="w-full text-xs gap-1 border-[#E2E8F0]"
                >
                  <Gift className="w-3 h-3 text-[#2563EB]" />
                  <span>Bonus XP</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setKudosModalStudent(second)}
                  className="text-xs p-2 text-[#64748B] hover:text-[#0F172A]"
                  title="Send Kudos"
                >
                  <Send className="w-3.5 h-3.5" />
                </Button>
              </div>
            </Card>
          )}

          {/* 1st Place: Gold Champion */}
          {first && (
            <Card className="order-1 md:order-2 bg-gradient-to-b from-amber-50/70 via-white to-white border-amber-200 shadow-xl p-7 rounded-3xl text-center space-y-4 relative overflow-hidden -translate-y-2 ring-2 ring-amber-400/30">
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300" />
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-black font-mono shadow-xs">
                <Crown className="w-4 h-4 text-amber-600" />
                #1 Class Champion
              </div>

              <div className="relative w-24 h-24 mx-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={first.avatar}
                  alt={first.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-amber-400 shadow-xl mx-auto ring-4 ring-amber-200/50"
                />
                <span className="absolute -bottom-2 -right-1 w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-black text-sm flex items-center justify-center shadow-lg border-2 border-white">
                  1
                </span>
              </div>

              <div>
                <h3 className="font-black text-[#0F172A] text-xl tracking-tight">{first.name}</h3>
                <p className="text-xs font-medium text-[#64748B]">{first.className}</p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
                  <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                  {first.topBadge}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 py-3 border-y border-amber-100 text-center bg-amber-50/40 rounded-2xl">
                <div>
                  <span className="text-[10px] text-[#64748B] block">Total XP</span>
                  <span className="font-mono font-black text-base text-[#2563EB]">{first.xp}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#64748B] block">Accuracy</span>
                  <span className="font-mono font-black text-base text-emerald-600">{first.accuracy}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#64748B] block">Streak</span>
                  <span className="font-mono font-black text-base text-amber-600 flex items-center justify-center gap-0.5">
                    <Flame className="w-3.5 h-3.5 text-[#F59E0B]" /> {first.streakDays}d
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 pt-1">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setBonusModalStudent(first)}
                  className="w-full text-xs gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:brightness-105 border-0 text-white shadow-md cursor-pointer"
                >
                  <Gift className="w-3.5 h-3.5" />
                  <span>Award Bonus XP</span>
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setKudosModalStudent(first)}
                  className="text-xs p-2.5 border-[#E2E8F0] hover:bg-amber-50"
                  title="Send Kudos"
                >
                  <Send className="w-3.5 h-3.5 text-amber-700" />
                </Button>
              </div>
            </Card>
          )}

          {/* 3rd Place: Bronze */}
          {third && (
            <Card className="order-3 bg-white border-amber-200/60 shadow-md p-6 rounded-3xl text-center space-y-4 relative overflow-hidden hover:shadow-lg transition-shadow">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-600" />
              <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold font-mono">
                <Medal className="w-3.5 h-3.5 text-amber-700" />
                #3 Bronze Medal
              </div>

              <div className="relative w-20 h-20 mx-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={third.avatar}
                  alt={third.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-amber-600/30 shadow-md mx-auto"
                />
                <span className="absolute -bottom-2 -right-1 w-7 h-7 rounded-full bg-amber-800 text-white font-black text-xs flex items-center justify-center shadow-md">
                  3
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-[#0F172A] text-lg">{third.name}</h3>
                <p className="text-xs text-[#64748B]">{third.className}</p>
                <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2563EB] text-[11px] font-semibold border border-blue-200">
                  {third.topBadge}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#E2E8F0] text-center">
                <div>
                  <span className="text-[10px] text-[#64748B] block">Score</span>
                  <span className="font-mono font-bold text-sm text-[#0F172A]">{third.xp}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#64748B] block">Accuracy</span>
                  <span className="font-mono font-bold text-sm text-emerald-600">{third.accuracy}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#64748B] block">Streak</span>
                  <span className="font-mono font-bold text-sm text-amber-600 flex items-center justify-center gap-0.5">
                    <Flame className="w-3 h-3 text-[#F59E0B]" /> {third.streakDays}d
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 pt-1">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setBonusModalStudent(third)}
                  className="w-full text-xs gap-1 border-[#E2E8F0]"
                >
                  <Gift className="w-3 h-3 text-[#2563EB]" />
                  <span>Bonus XP</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setKudosModalStudent(third)}
                  className="text-xs p-2 text-[#64748B] hover:text-[#0F172A]"
                  title="Send Kudos"
                >
                  <Send className="w-3.5 h-3.5" />
                </Button>
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Full Leaderboard Table */}
      <Card className="bg-white border-[#E2E8F0] shadow-sm rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-extrabold text-[#0F172A] text-base flex items-center gap-2">
              <Users className="w-4 h-4 text-[#2563EB]" />
              <span>Complete Student Rankings ({filteredStudents.length})</span>
            </h3>
            <p className="text-xs text-[#64748B]">
              Comprehensive effort metrics, quiz completion rate, and active badges.
            </p>
          </div>

          <span className="text-xs font-mono font-bold text-[#2563EB] bg-blue-50 px-3 py-1 rounded-xl border border-blue-200 self-start sm:self-auto">
            Live Sorted Sets
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] uppercase tracking-wider font-bold">
                <th className="py-3.5 px-4 text-center w-16">Rank</th>
                <th className="py-3.5 px-4">Student</th>
                <th className="py-3.5 px-4">Class</th>
                <th className="py-3.5 px-4 text-right">XP Points</th>
                <th className="py-3.5 px-4 text-center">Accuracy</th>
                <th className="py-3.5 px-4 text-center">Quizzes</th>
                <th className="py-3.5 px-4 text-center">Streak</th>
                <th className="py-3.5 px-4">Top Badge</th>
                <th className="py-3.5 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filteredStudents.map((s, idx) => {
                const rankNum = idx + 1;
                return (
                  <tr
                    key={s.id}
                    className="hover:bg-[#F8FAFC]/80 transition-colors group"
                  >
                    {/* Rank with delta indicator */}
                    <td className="py-3.5 px-4 text-center font-mono">
                      <div className="flex items-center justify-center gap-1">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                            rankNum === 1
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : rankNum === 2
                              ? 'bg-slate-200 text-slate-800'
                              : rankNum === 3
                              ? 'bg-amber-800/20 text-amber-900'
                              : 'text-[#64748B]'
                          }`}
                        >
                          {rankNum}
                        </span>
                        {s.rankDelta > 0 && (
                          <span className="text-[10px] text-emerald-600 flex items-center" title={`Up ${s.rankDelta} spots`}>
                            <ArrowUp className="w-3 h-3" />
                          </span>
                        )}
                        {s.rankDelta < 0 && (
                          <span className="text-[10px] text-rose-500 flex items-center" title={`Down ${Math.abs(s.rankDelta)} spots`}>
                            <ArrowDown className="w-3 h-3" />
                          </span>
                        )}
                        {s.rankDelta === 0 && (
                          <span className="text-[10px] text-[#94A3B8]">
                            <Minus className="w-2.5 h-2.5" />
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Student Info */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={s.avatar}
                          alt={s.name}
                          className="w-8 h-8 rounded-full object-cover border border-[#E2E8F0]"
                        />
                        <div>
                          <span className="font-bold text-[#0F172A] block group-hover:text-[#2563EB] transition-colors">
                            {s.name}
                          </span>
                          <span className="text-[11px] text-[#64748B]">{s.email}</span>
                        </div>
                      </div>
                    </td>

                    {/* Class */}
                    <td className="py-3.5 px-4">
                      <Badge variant="default" className="text-[10px] font-medium">
                        {s.className}
                      </Badge>
                    </td>

                    {/* XP Points */}
                    <td className="py-3.5 px-4 text-right font-mono font-extrabold text-[#0F172A]">
                      <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-[#2563EB] border border-blue-200/60 inline-block">
                        {s.xp.toLocaleString()} XP
                      </span>
                    </td>

                    {/* Accuracy */}
                    <td className="py-3.5 px-4 text-center font-mono">
                      <span
                        className={`font-bold ${
                          s.accuracy >= 90
                            ? 'text-emerald-600'
                            : s.accuracy >= 80
                            ? 'text-sky-600'
                            : 'text-amber-600'
                        }`}
                      >
                        {s.accuracy}%
                      </span>
                    </td>

                    {/* Quizzes Completed */}
                    <td className="py-3.5 px-4 text-center font-mono text-[#64748B]">
                      {s.quizzesCompleted}
                    </td>

                    {/* Streak */}
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center gap-1 font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 text-[11px]">
                        <Flame className="w-3 h-3 text-[#F59E0B]" />
                        {s.streakDays}d
                      </span>
                    </td>

                    {/* Top Badge */}
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F1F5F9] text-[#0F172A] text-[11px] font-medium border border-[#E2E8F0]">
                        <Award className="w-3 h-3 text-[#2563EB]" />
                        {s.topBadge}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={() => setBonusModalStudent(s)}
                          className="p-1.5 rounded-lg text-[#2563EB] hover:bg-blue-50 transition-colors cursor-pointer"
                          title="Award Bonus XP"
                        >
                          <Gift className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setKudosModalStudent(s)}
                          className="p-1.5 rounded-lg text-amber-600 hover:bg-amber-50 transition-colors cursor-pointer"
                          title="Send Commendation"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                        {onNavigateToAnalytics && (
                          <button
                            type="button"
                            onClick={() => onNavigateToAnalytics(s)}
                            className="p-1.5 rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
                            title="View Student Drilldown"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ================================================================= */}
      {/* MODAL: AWARD BONUS XP */}
      {/* ================================================================= */}
      {bonusModalStudent && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-2xl max-w-md w-full p-6 space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
                  <Gift className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-[#0F172A] text-sm">Award Bonus XP</h3>
                  <p className="text-[11px] text-[#64748B]">Recognize exceptional learner effort</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setBonusModalStudent(null)}
                className="p-1.5 rounded-lg text-[#64748B] hover:bg-[#F8FAFC]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={bonusModalStudent.avatar}
                alt={bonusModalStudent.name}
                className="w-10 h-10 rounded-full object-cover border border-[#E2E8F0]"
              />
              <div>
                <span className="font-bold text-xs text-[#0F172A] block">{bonusModalStudent.name}</span>
                <span className="text-[11px] text-[#64748B]">{bonusModalStudent.className} &bull; Current: {bonusModalStudent.xp} XP</span>
              </div>
            </div>

            <form onSubmit={handleAwardBonusXp} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#0F172A] mb-1.5">XP Amount</label>
                <div className="grid grid-cols-3 gap-2">
                  {[50, 100, 250].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setBonusAmount(amt)}
                      className={`py-2 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                        bonusAmount === amt
                          ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-xs'
                          : 'bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0] hover:text-[#0F172A]'
                      }`}
                    >
                      +{amt} XP
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Reason / Commendation</label>
                <select
                  value={bonusReason}
                  onChange={(e) => setBonusReason(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0F172A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                >
                  <option value="Outstanding Quiz Performance">Outstanding Quiz Performance</option>
                  <option value="Helping Classmates in Discussion">Helping Classmates in Discussion</option>
                  <option value="Perfect Streak Milestone">Perfect Streak Milestone</option>
                  <option value="Remedial Practice Mastery">Remedial Practice Mastery</option>
                  <option value="Top Class Participation">Top Class Participation</option>
                </select>
              </div>

              <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setBonusModalStudent(null)}
                  className="text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="text-xs gap-1.5 bg-gradient-to-r from-[#2563EB] to-[#38BDF8]"
                >
                  <Gift className="w-3.5 h-3.5" />
                  <span>Grant +{bonusAmount} XP</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* MODAL: SEND KUDOS */}
      {/* ================================================================= */}
      {kudosModalStudent && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-2xl max-w-md w-full p-6 space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Send className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-[#0F172A] text-sm">Send Commendation Note</h3>
                  <p className="text-[11px] text-[#64748B]">Personal message delivered to student notification center</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setKudosModalStudent(null)}
                className="p-1.5 rounded-lg text-[#64748B] hover:bg-[#F8FAFC]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={kudosModalStudent.avatar}
                alt={kudosModalStudent.name}
                className="w-10 h-10 rounded-full object-cover border border-[#E2E8F0]"
              />
              <div>
                <span className="font-bold text-xs text-[#0F172A] block">{kudosModalStudent.name}</span>
                <span className="text-[11px] text-[#64748B]">{kudosModalStudent.email}</span>
              </div>
            </div>

            <form onSubmit={handleSendKudos} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#0F172A] mb-1.5">Note Message</label>
                <textarea
                  rows={3}
                  value={kudosMessage}
                  onChange={(e) => setKudosMessage(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0F172A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 resize-none"
                  placeholder="Write an encouraging note..."
                />
              </div>

              <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setKudosModalStudent(null)}
                  className="text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="text-xs gap-1.5 bg-gradient-to-r from-[#2563EB] to-[#38BDF8]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Note</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
