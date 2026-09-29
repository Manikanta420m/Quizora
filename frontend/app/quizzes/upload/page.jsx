'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  BookOpen,
  Plus,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Database,
  CheckCircle2,
  AlertCircle,
  UploadCloud,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

import Navbar from '@/components/ui/Navbar';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import QuizCard from '@/components/quiz/QuizCard';
import QuizFilterBar from '@/components/quiz/QuizFilterBar';
import quizService from '@/services/quizService';

export default function QuizzesPage() {
  const { user, token, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  // Search and filter state
  const [search, setSearch] = useState('');
  const [topic, setTopic] = useState('all');
  const [difficulty, setDifficulty] = useState('all');
  const [page, setPage] = useState(1);
  const [toastMessage, setToastMessage] = useState(null);

  // TanStack Query for fetching quizzes
  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ['quizzes', { search, topic, difficulty, page }],
    queryFn: () => quizService.getQuizzes({ search, topic, difficulty, page, limit: 9 }),
    staleTime: 5000,
  });

  const quizzes = data?.quizzes || [];
  const pagination = data?.pagination || { page: 1, totalPages: 1, totalCount: 0 };

  // Delete Quiz Mutation
  const deleteMutation = useMutation({
    mutationFn: (quizId) => quizService.deleteQuiz(quizId, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
      showToast('Quiz deleted successfully', 'success');
    },
    onError: (err) => {
      showToast(err.message || 'Failed to delete quiz', 'error');
    },
  });

  // Seed Quizzes Mutation
  const seedMutation = useMutation({
    mutationFn: () => quizService.seedQuizzes(token),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
      showToast(res.message || 'Starter quizzes loaded successfully!', 'success');
    },
    onError: (err) => {
      showToast(err.message || 'Please log in to load starter quizzes', 'error');
    },
  });

  const showToast = (text, type = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleDeleteQuiz = (quizId) => {
    if (confirm('Are you sure you want to delete this quiz?')) {
      deleteMutation.mutate(quizId);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-[#111827] selection:bg-[#2563EB]/20">
      <Navbar />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div
            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border shadow-xl text-sm font-medium ${
              toastMessage.type === 'success'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-rose-50 border-rose-300 text-rose-800'
            }`}
          >
            {toastMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
            ) : (
              <AlertCircle className="w-4 h-4 text-[#EF4444]" />
            )}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Page Header Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div
            className="absolute right-0 top-0 bottom-0 w-1/2 bg-cover bg-right opacity-35 pointer-events-none [mask-image:linear-gradient(to_left,black_20%,transparent_100%)]"
            style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
            aria-hidden="true"
          />
          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="ai" className="font-mono text-[11px] uppercase tracking-wider gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                Quizora AI Library
              </Badge>
              <Badge variant="outline" className="text-[11px] font-mono">
                Pure JavaScript
              </Badge>
            </div>
            <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
              Quiz Library & Catalog
            </h1>
            <p className="text-sm text-[#64748B] max-w-xl">
              Browse interactive quizzes, challenge your concepts, or build your own custom question sets.
            </p>
          </div>

          {/* Header Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 relative z-10">
            {isAuthenticated && (
              <Button
                variant="secondary"
                size="md"
                onClick={() => seedMutation.mutate()}
                isLoading={seedMutation.isPending}
                className="text-xs"
              >
                <Database className="w-4 h-4 text-[#2563EB]" />
                Load Starter Quizzes
              </Button>
            )}

            <Link href="/quizzes/upload">
              <Button
                variant="secondary"
                size="md"
                className="gap-1.5 border-[#E2E8F0] text-[#0F172A] hover:bg-[#F1F5F9] shadow-sm"
              >
                <UploadCloud className="w-4 h-4 text-[#2563EB]" />
                Upload Notes / PDF
              </Button>
            </Link>

            <Link href="/quizzes/generate">
              <Button variant="primary" size="md" className="gap-1.5 shadow-sm">
                <Sparkles className="w-4 h-4" />
                Generate with AI
              </Button>
            </Link>

            <Link href="/quizzes/create">
              <Button variant="secondary" size="md">
                <Plus className="w-4 h-4" />
                Manual Builder
              </Button>
            </Link>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <QuizFilterBar
          search={search}
          setSearch={(val) => {
            setSearch(val);
            setPage(1);
          }}
          topic={topic}
          setTopic={(val) => {
            setTopic(val);
            setPage(1);
          }}
          difficulty={difficulty}
          setDifficulty={(val) => {
            setDifficulty(val);
            setPage(1);
          }}
          totalCount={pagination.totalCount}
        />

        {/* Quizzes Grid / States */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div
                key={idx}
                className="h-64 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm animate-pulse p-6 space-y-4"
              >
                <div className="h-5 w-24 bg-[#E2E8F0] rounded-md" />
                <div className="h-6 w-3/4 bg-[#E2E8F0] rounded-md" />
                <div className="h-16 w-full bg-[#F1F5F9] rounded-md" />
                <div className="h-8 w-full bg-[#E2E8F0]/70 rounded-md mt-6" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="p-8 rounded-2xl bg-rose-50 border border-rose-200 text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-[#EF4444] mx-auto" />
            <h3 className="text-base font-semibold text-[#0F172A]">Error Loading Quizzes</h3>
            <p className="text-xs text-[#EF4444] max-w-md mx-auto">{error?.message}</p>
          </div>
        ) : quizzes.length === 0 ? (
          <div className="p-12 rounded-2xl bg-white border border-[#E2E8F0] border-dashed text-center space-y-4 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-[#EFF6FF] border border-[#2563EB]/20 flex items-center justify-center mx-auto text-[#2563EB]">
              <BookOpen className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#0F172A]">No quizzes found</h3>
              <p className="text-xs text-[#64748B] max-w-sm mx-auto">
                {search || topic !== 'all' || difficulty !== 'all'
                  ? 'No quizzes match your current search filters. Try clearing some filters.'
                  : 'Get started by creating your first custom quiz or loading default starter quizzes.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {isAuthenticated ? (
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => seedMutation.mutate()}
                  isLoading={seedMutation.isPending}
                >
                  <Sparkles className="w-4 h-4" />
                  Load Starter Quizzes
                </Button>
              ) : (
                <Link href="/login">
                  <Button variant="primary" size="md">
                    Sign in to Load Quizzes
                  </Button>
                </Link>
              )}
              <Link href="/quizzes/generate">
                <Button variant="primary" size="md" className="gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Generate with AI
                </Button>
              </Link>
              <Link href="/quizzes/create">
                <Button variant="secondary" size="md">
                  <Plus className="w-4 h-4" />
                  Create Manually
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <QuizCard
                key={quiz._id || quiz.id}
                quiz={quiz}
                currentUserId={user?._id || user?.id}
                currentUserRole={user?.role}
                onDelete={handleDeleteQuiz}
                isDeleting={deleteMutation.isPending}
              />
            ))}
          </div>
        )}

        {/* Pagination Bar */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between pt-6 border-t border-[#E2E8F0] text-sm">
            <p className="text-xs text-[#64748B]">
              Page <span className="font-semibold text-[#0F172A]">{pagination.page}</span> of{' '}
              <span className="font-semibold text-[#0F172A]">{pagination.totalPages}</span>
            </p>

            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                disabled={page >= pagination.totalPages}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
