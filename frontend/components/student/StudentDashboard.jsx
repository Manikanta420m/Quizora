'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Sparkles,
  BookOpen,
  Target,
  TrendingUp,
  Flame,
  Trophy,
  Award,
  Settings,
  Bell,
  Search,
  LogOut,
  Menu,
  X,
  ChevronDown,
  GraduationCap,
  Bot,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import ThemeSwitch from '@/components/ui/ThemeSwitch';
import StudentOverview from './StudentOverview';
import StudentQuizzes from './StudentQuizzes';
import StudentPractice from './StudentPractice';
import StudentProgress from './StudentProgress';
import StudentStreak from './StudentStreak';
import StudentLeaderboard from './StudentLeaderboard';
import StudentAchievements from './StudentAchievements';
import StudentSettings from './StudentSettings';
import StudentAIAssistant from './StudentAIAssistant';

export default function StudentDashboard({
  user,
  analyticsData,
  myRankData,
  achievementsData,
  onSwitchToTeacherView,
  onGenerateWeakPractice,
  isGeneratingWeakPractice,
}) {
  const router = useRouter();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  // Notifications (Module 19)
  const notifications = [
    { id: 1, title: '🎯 Your daily goal is incomplete.', time: '1h ago', unread: true },
    { id: 2, title: '🔥 Your 7-day streak is at risk (less than 12h left).', time: '2h ago', unread: true },
    { id: 3, title: '🏆 You moved to #4 on the weekly leaderboard!', time: '4h ago', unread: true },
    { id: 4, title: '🤖 Your recommended DSA quiz is ready.', time: '1d ago', unread: false },
    { id: 5, title: '📚 New quiz "Web Dev Sprint 4" assigned by your teacher.', time: '2d ago', unread: false },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  // Clean 9-Item Student Sidebar
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'generate', label: 'Generate Quiz', icon: Sparkles, badge: 'AI', isRoute: '/quizzes/generate' },
    { id: 'quizzes', label: 'My Quizzes', icon: BookOpen },
    { id: 'practice', label: 'Practice', icon: Target, badge: 'Drill' },
    { id: 'progress', label: 'My Progress', icon: TrendingUp },
    { id: 'streak', label: 'Streak', icon: Flame },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy, badge: 'Live' },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleSidebarClick = (item) => {
    if (item.isRoute) {
      router.push(item.isRoute);
    } else {
      setActiveTab(item.id);
    }
    setIsMobileSidebarOpen(false);
  };

  const displayName = user?.name || 'Mani';
  const streakDays = user?.streak || 7;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#111827]">
      {/* ================================================================= */}
      {/* STUDENT TOPBAR */}
      {/* ================================================================= */}
      <header className="sticky top-0 z-40 w-full border-b border-[#E2E8F0] bg-white/95 backdrop-blur-md shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left: Hamburger & Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="lg:hidden p-2 rounded-xl text-[#64748B] hover:bg-[#F8FAFC] cursor-pointer"
            >
              {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link href="/dashboard" className="flex items-center gap-2.5 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/quizora-icon.png"
                alt="Quizora"
                className="w-8 h-8 rounded-xl object-contain shadow-xs group-hover:scale-105 transition-transform"
              />
              <span className="font-black text-xl text-[#0F172A] tracking-tight">Quizora</span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200 text-[10px] font-bold uppercase tracking-wider">
                🎓 Student
              </span>
            </Link>
          </div>

          {/* Center: Search input */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search topics, quizzes, or concepts..."
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0F172A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
            />
          </div>

          {/* Right Controls: Streak pill, Notifications, Switcher, Theme, Profile */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Streak Pill */}
            <button
              type="button"
              onClick={() => setActiveTab('streak')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold font-mono transition-colors shadow-2xs cursor-pointer"
              title="View Learning Streak"
            >
              <Flame className="w-4 h-4 text-[#F59E0B]" />
              <span>{streakDays}</span>
            </button>

            {/* Persona Switcher: Student View | Teacher View */}
            {onSwitchToTeacherView && (
              <div className="hidden sm:flex items-center rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-1 text-xs shadow-2xs">
                <span className="px-2.5 py-1 rounded-lg bg-[#2563EB] text-white font-bold shadow-2xs flex items-center gap-1">
                  <span>🎓 Student</span>
                </span>
                <button
                  type="button"
                  onClick={onSwitchToTeacherView}
                  className="px-2.5 py-1 rounded-lg text-[#64748B] hover:text-[#0F172A] font-medium transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>👨‍🏫 Teacher</span>
                </button>
              </div>
            )}

            {/* Notifications Dropdown (Module 19) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 rounded-xl border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-colors relative cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#EF4444] text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
                    <span className="font-extrabold text-xs text-[#0F172A]">Notifications</span>
                    <span className="text-[10px] text-[#2563EB] font-semibold cursor-pointer">Mark all as read</span>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-2.5 rounded-xl border text-xs leading-snug transition-colors ${
                          n.unread ? 'bg-blue-50/50 border-blue-100 text-[#0F172A]' : 'bg-[#F8FAFC] border-transparent text-[#64748B]'
                        }`}
                      >
                        <p className="font-semibold">{n.title}</p>
                        <span className="text-[10px] text-slate-400 block mt-1 font-mono">{n.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle (Module 20) */}
            <ThemeSwitch />

            {/* User Profile */}
            <div className="flex items-center gap-2 pl-2 border-l border-[#E2E8F0]">
              {user?.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.avatar}
                  alt={displayName}
                  className="w-8 h-8 rounded-xl object-cover border border-[#E2E8F0]"
                />
              ) : (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#38BDF8] text-white flex items-center justify-center text-xs font-black shadow-2xs">
                  {displayName.charAt(0)}
                </div>
              )}
              <span className="hidden lg:block text-xs font-bold text-[#0F172A] truncate max-w-[90px]">
                {displayName}
              </span>
              <button
                type="button"
                onClick={logout}
                className="p-1.5 rounded-lg text-[#64748B] hover:text-[#EF4444] hover:bg-rose-50 transition-colors cursor-pointer"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ================================================================= */}
      {/* MAIN LAYOUT: SIDEBAR + CONTENT */}
      {/* ================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-60 shrink-0 space-y-6">
          <nav className="space-y-1.5 bg-white border border-[#E2E8F0] p-3 rounded-3xl shadow-sm">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSidebarClick(item)}
                  className={`w-full px-3.5 py-2.5 rounded-2xl flex items-center justify-between text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#2563EB] text-white shadow-xs font-bold'
                      : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-blue-50 text-[#2563EB] border border-blue-200'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick AI Study Assistant Sidebar Widget */}
          <div className="p-4 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1E40AF]">
              <Bot className="w-4 h-4 text-[#2563EB]" />
              <span>Ask Quizora AI 🤖</span>
            </div>
            <p className="text-[11px] text-[#0F172A] leading-relaxed">
              Stuck on a tricky question or concept? Chat with your AI tutor.
            </p>
            <button
              type="button"
              onClick={() => setIsAIAssistantOpen(true)}
              className="w-full py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
            >
              Open AI Tutor
            </button>
          </div>
        </aside>

        {/* Mobile Drawer */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden bg-black/50 backdrop-blur-xs flex">
            <div className="w-72 bg-white h-full p-5 shadow-2xl flex flex-col justify-between animate-in slide-in-from-left duration-200">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                  <div className="flex items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/quizora-icon.png" alt="Quizora" className="w-6 h-6 rounded-lg" />
                    <span className="font-extrabold text-sm text-[#0F172A]">Quizora Student</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="p-1 rounded-lg text-[#64748B]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {sidebarItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSidebarClick(item)}
                        className={`w-full px-3 py-2 rounded-xl flex items-center gap-3 text-xs font-semibold ${
                          isActive ? 'bg-[#2563EB] text-white font-bold' : 'text-[#64748B] hover:bg-[#F8FAFC]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {onSwitchToTeacherView && (
                <div className="pt-3 border-t border-[#E2E8F0]">
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileSidebarOpen(false);
                      onSwitchToTeacherView();
                    }}
                    className="w-full py-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-bold text-[#2563EB]"
                  >
                    Switch to Teacher View &rarr;
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          {activeTab === 'dashboard' && (
            <StudentOverview
              user={user}
              analyticsData={analyticsData}
              myRankData={myRankData}
              achievementsData={achievementsData}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onGenerateWeakPractice={onGenerateWeakPractice}
              isGeneratingWeakPractice={isGeneratingWeakPractice}
              onOpenAIAssistant={() => setIsAIAssistantOpen(true)}
            />
          )}

          {activeTab === 'quizzes' && (
            <StudentQuizzes />
          )}

          {activeTab === 'practice' && (
            <StudentPractice
              onGenerateWeakPractice={onGenerateWeakPractice}
              isGeneratingWeakPractice={isGeneratingWeakPractice}
            />
          )}

          {activeTab === 'progress' && (
            <StudentProgress analyticsData={analyticsData} />
          )}

          {activeTab === 'streak' && (
            <StudentStreak streak={streakDays} />
          )}

          {activeTab === 'leaderboard' && (
            <StudentLeaderboard user={user} />
          )}

          {activeTab === 'achievements' && (
            <StudentAchievements />
          )}

          {activeTab === 'settings' && (
            <StudentSettings user={user} />
          )}
        </main>
      </div>

      {/* Floating "Ask Quizora AI 🤖" Button */}
      <button
        type="button"
        onClick={() => setIsAIAssistantOpen(true)}
        className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-gradient-to-r from-[#2563EB] via-[#1D4ED8] to-[#38BDF8] text-white shadow-2xl hover:scale-105 transition-transform flex items-center gap-2 text-xs font-bold border border-white/20 cursor-pointer"
      >
        <Bot className="w-4 h-4 animate-bounce" />
        <span>Ask Quizora AI</span>
      </button>

      {/* Interactive AI Assistant Modal */}
      <StudentAIAssistant
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
      />
    </div>
  );
}
