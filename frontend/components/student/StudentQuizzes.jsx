'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  RotateCcw,
  Eye,
  Star,
  Bookmark,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function StudentQuizzes({ initialQuizzes = [] }) {
  const router = useRouter();
  const [filterTab, setFilterTab] = useState('all'); // 'all' | 'completed' | 'in-progress' | 'saved'
  const [searchQuery, setSearchQuery] = useState('');

  // Comprehensive Student Quizzes Data
  const defaultQuizzes = [
    {
      id: 'qz_1',
      title: 'JavaScript Basics & ES6',
      topic: 'JavaScript',
      difficulty: 'Easy',
      totalQuestions: 15,
      score: 92,
      passed: true,
      status: 'completed',
      date: 'Sep 18, 2026',
      saved: true,
      timeSpent: '12m',
    },
    {
      id: 'qz_2',
      title: 'React Fundamentals & Component Lifecycle',
      topic: 'React',
      difficulty: 'Medium',
      totalQuestions: 12,
      score: 78,
      passed: true,
      status: 'completed',
      date: 'Sep 17, 2026',
      saved: true,
      timeSpent: '14m',
    },
    {
      id: 'qz_3',
      title: 'DSA: Arrays & String Manipulation',
      topic: 'DSA',
      difficulty: 'Medium',
      totalQuestions: 10,
      score: 88,
      passed: true,
      status: 'completed',
      date: 'Sep 15, 2026',
      saved: false,
      timeSpent: '16m',
    },
    {
      id: 'qz_4',
      title: 'Node.js & Express REST APIs',
      topic: 'Node.js',
      difficulty: 'Medium',
      totalQuestions: 15,
      score: 71,
      passed: true,
      status: 'completed',
      date: 'Sep 14, 2026',
      saved: false,
      timeSpent: '18m',
    },
    {
      id: 'qz_5',
      title: 'JavaScript Fundamentals: Closures & Scope',
      topic: 'JavaScript',
      difficulty: 'Hard',
      totalQuestions: 25,
      score: 72,
      passed: null,
      status: 'in-progress',
      date: 'In Progress',
      saved: true,
      timeSpent: '8m',
    },
    {
      id: 'qz_6',
      title: 'MongoDB Schema Design & Indexing',
      topic: 'Databases',
      difficulty: 'Hard',
      totalQuestions: 10,
      score: null,
      passed: null,
      status: 'saved',
      date: 'Saved for later',
      saved: true,
      timeSpent: '—',
    },
  ];

  const quizzes = defaultQuizzes;

  const filteredQuizzes = useMemo(() => {
    return quizzes.filter((q) => {
      const matchFilter =
        filterTab === 'all' ||
        (filterTab === 'saved' && q.saved) ||
        q.status === filterTab;

      const matchSearch =
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.difficulty.toLowerCase().includes(searchQuery.toLowerCase());

      return matchFilter && matchSearch;
    });
  }, [quizzes, filterTab, searchQuery]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-[#38BDF8] border border-blue-400/30 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Quiz Catalog &bull; Study Archive</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            My Quizzes 📚
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Review past scores, retake assessments for higher XP, and manage your saved quizzes.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => router.push('/quizzes/generate')}
          className="gap-1.5 text-xs bg-gradient-to-r from-[#2563EB] to-[#38BDF8] shadow-md cursor-pointer self-start sm:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>New AI Quiz</span>
        </Button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: 'All Quizzes' },
            { id: 'completed', label: 'Completed' },
            { id: 'in-progress', label: 'In Progress' },
            { id: 'saved', label: 'Saved ❤️' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                filterTab === tab.id
                  ? 'bg-[#2563EB] text-white shadow-xs'
                  : 'bg-[#F8FAFC] text-[#64748B] hover:text-[#0F172A] border border-[#E2E8F0]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search quizzes by title or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0F172A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
          />
        </div>
      </div>

      {/* Quizzes List Grid */}
      <div className="space-y-3">
        {filteredQuizzes.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-[#E2E8F0] space-y-3">
            <BookOpen className="w-10 h-10 text-[#94A3B8] mx-auto" />
            <h3 className="font-bold text-sm text-[#0F172A]">No quizzes match your filters</h3>
            <p className="text-xs text-[#64748B]">Try searching for another topic or clear your filter.</p>
          </div>
        ) : (
          filteredQuizzes.map((quiz) => (
            <Card
              key={quiz.id}
              className="bg-white border-[#E2E8F0] hover:border-[#2563EB]/40 p-5 rounded-2xl shadow-2xs hover:shadow-sm transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Badge variant={quiz.difficulty === 'Easy' ? 'success' : quiz.difficulty === 'Medium' ? 'warning' : 'danger'}>
                    {quiz.difficulty}
                  </Badge>
                  <span className="text-[11px] font-mono text-[#64748B]">{quiz.topic}</span>
                  <span className="text-[11px] text-[#64748B]">&bull;</span>
                  <span className="text-[11px] text-[#64748B]">{quiz.totalQuestions} Questions</span>
                  <span className="text-[11px] text-[#64748B]">&bull;</span>
                  <span className="text-[11px] text-[#64748B]">{quiz.date}</span>
                </div>

                <h3 className="font-extrabold text-sm sm:text-base text-[#0F172A] truncate">
                  {quiz.title}
                </h3>
              </div>

              {/* Status & Actions */}
              <div className="flex items-center gap-4 shrink-0">
                {quiz.score !== null ? (
                  <div className="text-right">
                    <span className="text-xl font-black text-[#2563EB] font-mono block">
                      {quiz.score}%
                    </span>
                    <span className="text-[10px] text-emerald-600 font-bold">
                      {quiz.score >= 80 ? 'Mastered ✓' : 'Passed'}
                    </span>
                  </div>
                ) : (
                  <div className="text-right">
                    <span className="text-xs font-bold text-amber-600 block">Not Started</span>
                    <span className="text-[10px] text-[#64748B]">Ready to take</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => router.push('/quizzes/generate')}
                    className="text-xs gap-1 border-[#E2E8F0] hover:bg-[#F8FAFC] cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>Retake</span>
                  </Button>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => router.push('/quizzes/generate')}
                    className="text-xs gap-1 bg-[#2563EB] hover:bg-[#1D4ED8] cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Review</span>
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
