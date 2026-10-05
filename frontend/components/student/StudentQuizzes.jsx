'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import quizService from '@/services/quizService';
import {
  BookOpen,
  Search,
  CheckCircle2,
  Clock,
  RotateCcw,
  Eye,
  Star,
  Bookmark,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Share2,
  Trophy,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function StudentQuizzes({ onNavigateTab }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [filterTab, setFilterTab] = useState('all'); // 'all' or 'saved'
  const [savedQuizzes, setSavedQuizzes] = useState(new Set()); // Mock saved state

  // Fetch real quizzes from the backend
  const { data: quizzesResponse, isLoading } = useQuery({
    queryKey: ['quizzes', searchQuery],
    queryFn: () => quizService.getQuizzes({ search: searchQuery }),
  });

  const quizzes = quizzesResponse?.quizzes || [];

  const handleShare = (quizId) => {
    const url = `${window.location.origin}/quizzes/${quizId}/play`;
    navigator.clipboard.writeText(url);
    setCopiedId(quizId);
    setTimeout(() => setCopiedId(null), 2000);
  };
  const handleToggleSave = (quizId) => {
    setSavedQuizzes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(quizId)) {
        newSet.delete(quizId);
      } else {
        newSet.add(quizId);
      }
      return newSet;
    });
  };

  const filteredQuizzes = quizzes.filter(quiz => {
    if (filterTab === 'saved') {
      return savedQuizzes.has(quiz._id || quiz.id);
    }
    return true;
  });
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
          onClick={() => onNavigateTab ? onNavigateTab('generate') : router.push('/dashboard')}
          className="gap-1.5 text-xs bg-gradient-to-r from-[#2563EB] to-[#38BDF8] shadow-md cursor-pointer self-start sm:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>New AI Quiz</span>
        </Button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex bg-[#F8FAFC] p-1 rounded-xl border border-[#E2E8F0]">
          <button
            type="button"
            onClick={() => setFilterTab('all')}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
              filterTab === 'all' ? 'bg-white text-[#2563EB] shadow-sm' : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            All Quizzes
          </button>
          <button
            type="button"
            onClick={() => setFilterTab('saved')}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
              filterTab === 'saved' ? 'bg-white text-[#2563EB] shadow-sm' : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            <Bookmark className="w-4 h-4 inline-block mr-1.5" />
            Saved ({savedQuizzes.size})
          </button>
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
        {isLoading ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-[#E2E8F0] space-y-3">
            <h3 className="font-bold text-sm text-[#0F172A]">Loading Quizzes...</h3>
          </div>
        ) : filteredQuizzes.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-[#E2E8F0] space-y-3">
            <BookOpen className="w-10 h-10 text-[#94A3B8] mx-auto" />
            <h3 className="font-bold text-sm text-[#0F172A]">No quizzes found</h3>
            <p className="text-xs text-[#64748B]">Try searching for another topic.</p>
          </div>
        ) : (
          filteredQuizzes.map((quiz) => {
            const isSaved = savedQuizzes.has(quiz._id || quiz.id);
            return (
            <Card
              key={quiz._id || quiz.id}
              className="bg-white border-[#E2E8F0] hover:border-[#2563EB]/40 p-5 rounded-2xl shadow-2xs hover:shadow-sm transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Badge variant={quiz.difficulty === 'easy' ? 'success' : quiz.difficulty === 'medium' ? 'warning' : 'danger'}>
                    {quiz.difficulty}
                  </Badge>
                  <span className="text-[11px] font-mono text-[#64748B]">{quiz.topic}</span>
                  <span className="text-[11px] text-[#64748B]">&bull;</span>
                  <span className="text-[11px] text-[#64748B]">{quiz.questions?.length || 0} Questions</span>
                  <span className="text-[11px] text-[#64748B]">&bull;</span>
                  <span className="text-[11px] text-[#64748B]">{new Date(quiz.createdAt).toLocaleDateString()}</span>
                </div>

                <h3 className="font-extrabold text-sm sm:text-base text-[#0F172A] truncate">
                  {quiz.title}
                </h3>
              </div>

              {/* Status & Actions */}
              <div className="flex items-center gap-4 shrink-0">
                <div className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleToggleSave(quiz._id || quiz.id)}
                    className={`text-xs w-9 h-9 p-0 border-[#E2E8F0] hover:bg-[#F8FAFC] cursor-pointer ${isSaved ? 'text-indigo-600 bg-indigo-50 border-indigo-200 hover:bg-indigo-100' : 'text-[#64748B]'}`}
                    title={isSaved ? "Remove from Saved" : "Save Quiz"}
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                  </Button>

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleShare(quiz._id || quiz.id)}
                    className="text-xs gap-1 border-[#E2E8F0] hover:bg-[#F8FAFC] cursor-pointer"
                  >
                    {copiedId === (quiz._id || quiz.id) ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5 text-[#2563EB]" />
                        <span>Share</span>
                      </>
                    )}
                  </Button>
                  
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => router.push(`/quizzes/${quiz._id || quiz.id}/leaderboard`)}
                    className="text-xs gap-1 border-[#E2E8F0] hover:bg-[#F8FAFC] cursor-pointer text-amber-600 border-amber-200 bg-amber-50"
                  >
                    <Trophy className="w-3.5 h-3.5 text-amber-600" />
                    <span>Leaderboard</span>
                  </Button>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => router.push(`/quizzes/${quiz._id || quiz.id}/play`)}
                    className="text-xs gap-1 bg-[#2563EB] hover:bg-[#1D4ED8] cursor-pointer"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                    <span>Play</span>
                  </Button>
                </div>
              </div>
            </Card>
          )})
        )}
      </div>
    </div>
  );
}
