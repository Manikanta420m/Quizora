'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  PanelLeftClose,
  PanelLeft,
  Layers,
  Users,
  MonitorSpeaker,
  FileText,
  Swords
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
import StudentGenerateQuiz from './StudentGenerateQuiz';
import StudentGeneratePdfQuiz from './StudentGeneratePdfQuiz';
import StudentGenerateFlashcards from './StudentGenerateFlashcards';
import StudentFlashcards from './StudentFlashcards';
import StudentChallenge from './StudentChallenge';
import StudentManualChallenge from './StudentManualChallenge';

export default function StudentDashboard({
  user,
  analyticsData,
  myRankData,
  achievementsData,
  onGenerateWeakPractice,
  isGeneratingWeakPractice,
}) {
  const router = useRouter();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  const notificationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Notifications (Module 19)
  const [notifications, setNotifications] = useState([
    { id: 1, title: '🎯 Your daily goal is incomplete.', time: '1h ago', unread: true },
    { id: 2, title: '🔥 Your 7-day streak is at risk (less than 12h left).', time: '2h ago', unread: true },
    { id: 3, title: '🏆 You moved to #4 on the weekly leaderboard!', time: '4h ago', unread: true },
    { id: 4, title: '🤖 Your recommended DSA quiz is ready.', time: '1d ago', unread: false },
    { id: 5, title: '📚 New quiz "Web Dev Sprint 4" assigned by your teacher.', time: '2d ago', unread: false },
  ]);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  // Clean Student Sidebar Groups
  const sidebarGroups = [
    {
      title: 'LEARN',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'generate', label: 'Generate AI Quiz', icon: Sparkles, badge: 'AI' },
        { id: 'generate_pdf', label: 'Generate from PDF', icon: FileText, badge: 'DOC' },
        { id: 'generate_flashcards', label: 'Generate Flashcards', icon: Layers },
        { id: 'practice', label: 'Practice', icon: Target, badge: 'DRILL' },
      ]
    },
    {
      title: 'LIBRARY',
      items: [
        { id: 'quizzes', label: 'My Quizzes', icon: BookOpen },
        { id: 'flashcards', label: 'My Flashcards', icon: Layers },
      ]
    },
    {
      title: 'PLAY',
      items: [
        { id: 'challenge', label: 'AI Quiz Challenge', icon: Swords },
        { id: 'room', label: 'Manual Quiz Challenge', icon: MonitorSpeaker },
        { id: 'leaderboard', label: 'Leaderboard', icon: Trophy, badge: 'LIVE' },
      ]
    },
    {
      title: 'PROGRESS',
      items: [
        { id: 'progress', label: 'My Progress', icon: TrendingUp },
        { id: 'streak', label: 'Streak', icon: Flame },
        { id: 'achievements', label: 'Achievements', icon: Award },
      ]
    }
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
    <div className="h-screen w-full flex bg-[#F8FAFC] text-[#111827] overflow-hidden">
      {/* ================================================================= */}
      {/* DESKTOP SIDEBAR (App Shell Layout matching screenshot) */}
      {/* ================================================================= */}
      {isDesktopSidebarOpen && (
        <aside className="hidden lg:flex w-[280px] shrink-0 flex-col bg-[#EFF6FF]/95 backdrop-blur-xl text-slate-700 border-r border-[#DBEAFE] shadow-2xl transition-all z-50 relative overflow-hidden">
          {/* Subtle animated background in sidebar */}
          <div className="absolute top-[-10%] left-[-20%] w-[140%] h-[120%] bg-blue-50/40 rounded-full mix-blend-multiply filter blur-[80px] animate-blob pointer-events-none" />
          
          <div className="relative z-10 h-20 flex items-center justify-between px-6 border-b border-slate-200/50 shrink-0">
            <Link href="/dashboard" className="flex items-center gap-3 group">
              <img src="/images/quizora-icon.png" alt="Quizora" className="w-8 h-8 rounded-xl shadow-sm group-hover:scale-105 transition-transform" />
              <span className="font-extrabold text-xl text-slate-800 tracking-tight">Quizora</span>
            </Link>
            <button
              onClick={() => setIsDesktopSidebarOpen(false)}
              className="text-slate-400 hover:text-blue-600 p-2 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer"
              title="Close Sidebar"
            >
              <PanelLeftClose className="w-5 h-5" />
            </button>
          </div>
          
          <div className="relative z-10 flex-1 overflow-y-auto py-6 custom-scrollbar flex flex-col">
            {sidebarGroups.map((group, gIdx) => (
              <div key={group.title} className="mb-8">
                <div className="px-6 mb-3 flex items-center justify-between text-xs font-black uppercase tracking-widest text-slate-400">
                  {group.title}
                  <ChevronDown className="w-4 h-4 opacity-40" />
                </div>
                <nav className="space-y-1 px-4">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSidebarClick(item)}
                        className={`w-full px-4 py-3 flex items-center justify-between text-sm transition-all rounded-2xl group cursor-pointer ${
                          isActive 
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 font-bold scale-[1.02]' 
                            : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 hover:scale-[1.02] font-medium'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-500'} transition-colors`} />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-lg uppercase tracking-widest ${
                            isActive ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-600'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    )
                  })}
                </nav>
              </div>
            ))}

            <div className="px-5 mt-auto mb-6 space-y-4">
              <div className="relative p-5 rounded-3xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-white/60 shadow-lg overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="flex items-center gap-2 text-sm font-extrabold text-blue-700 mb-2 relative z-10">
                  <Bot className="w-5 h-5 text-indigo-600" /> Ask AI Tutor
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-4 relative z-10">Stuck on a concept? Chat with your AI tutor.</p>
                <button 
                  type="button"
                  onClick={() => setIsAIAssistantOpen(true)} 
                  className="relative z-10 w-full py-2.5 bg-white text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-100 shadow-sm text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  Open Tutor
                </button>
              </div>
            </div>
            
            <div className="px-4 pt-4 pb-4 border-t border-slate-200/50 relative z-10">
              <nav className="space-y-1">
                 <button 
                   type="button" 
                   onClick={() => handleSidebarClick({id: 'settings'})} 
                   className={`w-full px-4 py-3 flex items-center gap-3 text-sm transition-all rounded-2xl group cursor-pointer ${
                     activeTab === 'settings' 
                       ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 font-bold scale-[1.02]' 
                       : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 hover:scale-[1.02] font-medium'
                   }`}
                 >
                   <Settings className={`w-5 h-5 ${activeTab === 'settings' ? 'text-white' : 'text-slate-400 group-hover:text-blue-500'} transition-colors`} />
                   <span>Settings</span>
                 </button>
                 <button type="button" className="w-full px-4 py-3 flex items-center gap-3 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 hover:scale-[1.02] transition-all rounded-2xl group cursor-pointer">
                   <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                   <span>Support</span>
                 </button>
              </nav>
            </div>
          </div>
        </aside>
      )}

      {/* ================================================================= */}
      {/* MAIN CONTENT AREA */}
      {/* ================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-[#F8FAFC]">
        {/* TOPBAR */}
        <header className="h-20 shrink-0 border-b border-[#DBEAFE] bg-[#EFF6FF]/95 backdrop-blur-2xl shadow-sm z-40 w-full flex items-center">
          <div className="w-full h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
            {/* Left: Hamburger & Brand Logo (when sidebar closed) */}
            <div className="flex items-center gap-3 perspective-[600px]">
              <style>{`
                @keyframes dynamic-float-3d {
                  0%, 100% { 
                    transform: rotateY(-35deg) rotateX(15deg) translateY(0) scale(1); 
                    filter: drop-shadow(-8px 8px 12px rgba(37, 99, 235, 0.3)); 
                  }
                  50% { 
                    transform: rotateY(35deg) rotateX(-5deg) translateY(-8px) scale(1.15); 
                    filter: drop-shadow(8px 16px 20px rgba(56, 189, 248, 0.8)); 
                  }
                }
                @keyframes text-glow {
                  0%, 100% { opacity: 0.8; filter: drop-shadow(0 0 2px rgba(37, 99, 235, 0.3)); }
                  50% { opacity: 1; filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.7)); }
                }
                @keyframes shine-slide {
                  0% { background-position: 200% center; }
                  100% { background-position: -200% center; }
                }
              `}</style>
              {/* Mobile Sidebar Toggle */}
              <button
                type="button"
                onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                className="lg:hidden p-2 rounded-xl text-[#64748B] hover:bg-[#F8FAFC] cursor-pointer"
              >
                {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              {/* Desktop Sidebar Toggle */}
              {!isDesktopSidebarOpen && (
                <button
                  type="button"
                  onClick={() => setIsDesktopSidebarOpen(true)}
                  className="hidden lg:block p-2 rounded-xl text-[#64748B] hover:bg-[#F8FAFC] cursor-pointer"
                  title="Open Sidebar"
                >
                  <PanelLeft className="w-5 h-5" />
                </button>
              )}

              {!isDesktopSidebarOpen && (
                <Link href="/dashboard" className="hidden lg:flex items-center gap-2.5 group ml-10">
                  <img
                    src="/images/quizora-icon.png"
                    alt="Quizora"
                    className="w-8 h-8 rounded-xl object-contain"
                    style={{ 
                      animation: 'dynamic-float-3d 4s ease-in-out infinite', 
                      transformStyle: 'preserve-3d' 
                    }}
                  />
                  <span className="font-black text-xl text-[#0F172A] tracking-tight">Quizora</span>
                  
                  <div className="flex flex-col select-none border-l-2 border-slate-200/50 pl-3 ml-1">
                    <span 
                      className="font-black text-xs tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-sky-400 to-blue-600 bg-[length:200%_auto]"
                      style={{ animation: 'shine-slide 4s linear infinite' }}
                    >
                      AI / Personalized
                    </span>
                    <span 
                      className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mt-[1px]"
                      style={{ animation: 'text-glow 3s ease-in-out infinite' }}
                    >
                      Learning
                    </span>
                  </div>
                </Link>
              )}

              {/* Dynamic Decorative Logo & Text (visible when sidebar is open) */}
              {isDesktopSidebarOpen && (
                <div className="hidden lg:flex items-center pl-2 gap-3">
                  <img
                    src="/images/quizora-icon.png"
                    alt="Quizora Dynamic Logo"
                    className="h-9 w-9 object-contain rounded-xl"
                    style={{ 
                      animation: 'dynamic-float-3d 4s ease-in-out infinite', 
                      transformStyle: 'preserve-3d' 
                    }}
                  />
                  <div className="flex flex-col select-none border-l-2 border-slate-200/50 pl-3">
                    <span 
                      className="font-black text-xs tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-sky-400 to-blue-600 bg-[length:200%_auto]"
                      style={{ animation: 'shine-slide 4s linear infinite' }}
                    >
                      AI / Personalized
                    </span>
                    <span 
                      className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mt-[1px]"
                      style={{ animation: 'text-glow 3s ease-in-out infinite' }}
                    >
                      Learning
                    </span>
                  </div>
                </div>
              )}
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

            {/* Notifications Dropdown (Module 19) */}
            <div className="relative" ref={notificationRef}>
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
                    <span 
                      onClick={markAllAsRead}
                      className="text-[10px] text-[#2563EB] font-semibold cursor-pointer hover:underline"
                    >
                      Mark all as read
                    </span>
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
      {/* MAIN LAYOUT: CONTENT */}
      {/* ================================================================= */}
      <main className="flex-1 overflow-y-auto w-full bg-[#F8FAFC] p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto w-full min-h-[calc(100vh-100px)]">
        {/* Mobile Drawer */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden bg-slate-900/40 backdrop-blur-sm flex">
            <div className="w-72 bg-[#EFF6FF] h-full p-5 shadow-2xl flex flex-col justify-between animate-in slide-in-from-left duration-200 overflow-y-auto">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <img src="/images/quizora-icon.png" alt="Quizora" className="w-8 h-8 rounded-xl shadow-sm" />
                    <span className="font-extrabold text-lg text-slate-800">Quizora</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-6">
                  {sidebarGroups.map((group) => (
                    <div key={group.title}>
                      <div className="px-2 mb-2 text-xs font-black uppercase tracking-widest text-slate-400">
                        {group.title}
                      </div>
                      <div className="space-y-1">
                        {group.items.map((item) => {
                          const Icon = item.icon;
                          const isActive = activeTab === item.id;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => handleSidebarClick(item)}
                              className={`w-full px-4 py-3 rounded-2xl flex items-center justify-between text-sm transition-all group ${
                                isActive ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 font-bold scale-[1.02]' : 'text-slate-600 hover:bg-blue-50 hover:text-blue-600 font-medium'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-500'} transition-colors`} />
                                <span>{item.label}</span>
                              </div>
                              {item.badge && (
                                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-lg uppercase tracking-widest ${
                                  isActive ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-600'
                                }`}>
                                  {item.badge}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 w-full">
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

          {activeTab === 'generate' && (
            <StudentGenerateQuiz onCancel={() => setActiveTab('dashboard')} />
          )}

          {activeTab === 'generate_pdf' && (
            <StudentGeneratePdfQuiz onCancel={() => setActiveTab('dashboard')} />
          )}

          {activeTab === 'generate_flashcards' && (
            <StudentGenerateFlashcards onCancel={() => setActiveTab('dashboard')} />
          )}

          {activeTab === 'quizzes' && (
            <StudentQuizzes />
          )}

          {activeTab === 'flashcards' && (
            <StudentFlashcards />
          )}

          {activeTab === 'practice' && (
            <StudentPractice
              onNavigateTab={setActiveTab}
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

          {activeTab === 'challenge' && (
            <StudentChallenge />
          )}

          {activeTab === 'room' && (
            <StudentManualChallenge />
          )}
        </div>
        </div>
      </main>
      </div>

      {/* Interactive AI Assistant Modal */}
      <StudentAIAssistant
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
      />
    </div>
  );
}
