'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  ClipboardList,
  Target,
  Bot,
  Settings,
  Bell,
  Search,
  LogOut,
  Sparkles,
  Users,
  Menu,
  X,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Clock,
  ExternalLink,
  Trophy,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import ThemeSwitch from '@/components/ui/ThemeSwitch';
import TeacherOverview from './TeacherOverview';
import TeacherClasses from './TeacherClasses';
import TeacherQuizzes from './TeacherQuizzes';
import TeacherAIGenerator from './TeacherAIGenerator';
import TeacherQuestionBank from './TeacherQuestionBank';
import TeacherAssignments from './TeacherAssignments';
import TeacherAnalytics from './TeacherAnalytics';
import TeacherLeaderboard from './TeacherLeaderboard';
import TeacherAIAssistant from './TeacherAIAssistant';
import TeacherSettings from './TeacherSettings';

export default function TeacherDashboard({
  teacherData,
  onSwitchToStudentView,
}) {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  // Notifications State
  const notifications = [
    { id: 1, title: '12 students completed "JavaScript Basics"', time: '10m ago', unread: true },
    { id: 2, title: 'AI finished generating 20 questions for "Data Structures"', time: '45m ago', unread: true },
    { id: 3, title: '5 students haven\'t submitted "React Fundamentals"', time: '2h ago', unread: false },
    { id: 4, title: 'Assignment deadline for "Web Dev Sprint" is tomorrow', time: '5h ago', unread: false },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'classes', label: 'Classes', icon: GraduationCap },
    { id: 'quizzes', label: 'Quizzes', icon: BookOpen },
    { id: 'ai-generator', label: 'AI Tools', icon: Sparkles, badge: 'Studio' },
    { id: 'question-bank', label: 'Question Bank', icon: Target },
    { id: 'assignments', label: 'Assignments', icon: ClipboardList },
    { id: 'analytics', label: 'Analytics', icon: Users },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy, badge: 'Live' },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Bot },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#111827]">
      {/* ================================================================= */}
      {/* TEACHER TOPBAR */}
      {/* ================================================================= */}
      <header className="sticky top-0 z-40 w-full border-b border-[#E2E8F0] bg-white/95 backdrop-blur-md shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left: Mobile hamburger & Brand Logo */}
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
                👨‍🏫 Teacher
              </span>
            </Link>
          </div>

          {/* Center: Global Search */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search classes, quizzes, questions, or students..."
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0F172A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
            />
          </div>

          {/* Right Controls: Notifications, View Switcher, Theme, Profile */}
          <div className="flex items-center gap-3">
            {/* View Switcher: Teacher View | Student View */}
            {onSwitchToStudentView && (
              <div className="hidden sm:flex items-center rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-1 text-xs shadow-2xs">
                <span className="px-2.5 py-1 rounded-lg bg-[#2563EB] text-white font-bold shadow-2xs flex items-center gap-1">
                  <span>👨‍🏫 Teacher</span>
                </span>
                <button
                  type="button"
                  onClick={onSwitchToStudentView}
                  className="px-2.5 py-1 rounded-lg text-[#64748B] hover:text-[#0F172A] font-medium transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>🎓 Student</span>
                </button>
              </div>
            )}

            {/* Notifications Bell */}
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

              {/* Notifications Dropdown */}
              {isNotificationsOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
                    <span className="text-xs font-bold text-[#0F172A]">Notifications</span>
                    <span className="text-[10px] text-[#2563EB] font-semibold">{unreadCount} New</span>
                  </div>

                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-2.5 rounded-xl border text-xs space-y-1 ${
                          n.unread ? 'bg-blue-50/50 border-blue-200' : 'bg-[#F8FAFC] border-[#E2E8F0]'
                        }`}
                      >
                        <p className="font-semibold text-[#0F172A] leading-snug">{n.title}</p>
                        <span className="text-[10px] text-[#64748B] block font-mono">{n.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <ThemeSwitch size="sm" />

            {/* Profile & Logout */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-[#E2E8F0]">
              <div className="w-8 h-8 rounded-xl bg-[#2563EB] text-white font-bold flex items-center justify-center text-xs shadow-xs">
                {user?.name?.charAt(0) || 'P'}
              </div>
              <div className="hidden xl:block text-left text-xs">
                <span className="font-bold text-[#0F172A] block leading-tight">{user?.name || 'Professor'}</span>
                <span className="text-[10px] text-[#64748B] block">Faculty Member</span>
              </div>
              <button
                type="button"
                onClick={logout}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ================================================================= */}
      {/* MAIN CONTAINER: SIDEBAR + CONTENT */}
      {/* ================================================================= */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-6">
        {/* Left Desktop Navigation Sidebar (8 Items) */}
        <aside className="hidden lg:block w-64 shrink-0 space-y-6">
          <nav className="p-3 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full px-3.5 py-2.5 rounded-2xl flex items-center justify-between text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#2563EB] text-white shadow-sm shadow-blue-500/20 font-bold'
                      : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#2563EB]'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded-full uppercase ${
                        isActive ? 'bg-white/20 text-white' : 'bg-blue-50 text-[#2563EB] border border-blue-200'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Class Helper Card */}
          <div className="p-4 rounded-3xl bg-gradient-to-br from-[#0F172A] to-slate-900 text-white space-y-3 shadow-md">
            <div className="flex items-center gap-2 text-xs font-bold text-[#38BDF8]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Invite Students</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug">
              Students join with class code <strong>QUIZ-7X42</strong> or through your shareable invite link.
            </p>
            <button
              type="button"
              onClick={() => setActiveTab('classes')}
              className="w-full py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Manage Classes &rarr;
            </button>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {isMobileSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex">
            <div className="w-72 bg-white h-full p-5 space-y-4 shadow-2xl flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                  <span className="font-extrabold text-base text-[#0F172A]">Teacher Menu</span>
                  <button
                    type="button"
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="p-1.5 rounded-xl hover:bg-[#F8FAFC]"
                  >
                    <X className="w-4 h-4 text-[#64748B]" />
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
                        onClick={() => {
                          setActiveTab(item.id);
                          setIsMobileSidebarOpen(false);
                        }}
                        className={`w-full px-3 py-2 rounded-xl flex items-center gap-3 text-xs font-semibold transition-all ${
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

              {onSwitchToStudentView && (
                <div className="pt-3 border-t border-[#E2E8F0]">
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileSidebarOpen(false);
                      onSwitchToStudentView();
                    }}
                    className="w-full py-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-bold text-[#2563EB]"
                  >
                    Switch to Student View &rarr;
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          {activeTab === 'overview' && (
            <TeacherOverview
              teacherData={teacherData}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onLaunchAIGenerator={() => setActiveTab('ai-generator')}
            />
          )}

          {activeTab === 'classes' && (
            <TeacherClasses initialClasses={teacherData?.classes} />
          )}

          {activeTab === 'quizzes' && (
            <TeacherQuizzes
              onNavigateTab={(tab) => setActiveTab(tab)}
              onOpenAssignModal={() => setActiveTab('assignments')}
            />
          )}

          {activeTab === 'ai-generator' && (
            <TeacherAIGenerator
              onQuizPublished={() => setActiveTab('quizzes')}
            />
          )}

          {activeTab === 'question-bank' && (
            <TeacherQuestionBank />
          )}

          {activeTab === 'assignments' && (
            <TeacherAssignments />
          )}

          {activeTab === 'analytics' && (
            <TeacherAnalytics
              teacherData={teacherData}
              onGeneratePracticeQuiz={(topic) => setActiveTab('ai-generator')}
            />
          )}

          {activeTab === 'leaderboard' && (
            <TeacherLeaderboard
              teacherData={teacherData}
              onNavigateToAnalytics={(student) => setActiveTab('analytics')}
            />
          )}

          {activeTab === 'ai-assistant' && (
            <TeacherAIAssistant
              onLaunchGeneratorWithPrompt={() => setActiveTab('ai-generator')}
            />
          )}

          {activeTab === 'settings' && (
            <TeacherSettings />
          )}
        </main>
      </div>
    </div>
  );
}
