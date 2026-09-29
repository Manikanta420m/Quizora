'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ArrowLeft,
  Clock,
  HelpCircle,
  Sparkles,
  Award,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  Play,
  Share2,
  User,
  Calendar,
  AlertCircle,
  BookOpen,
  Printer,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/ui/Navbar';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import quizService from '@/services/quizService';
import FlashcardViewer from '@/components/quiz/FlashcardViewer';
import ExportModal from '@/components/quiz/ExportModal';

const difficultyBadgeVariant = {
  easy: 'success',
  medium: 'warning',
  hard: 'danger',
};

export default function QuizDetailPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = params?.id;
  const { user, token } = useAuth();
  const queryClient = useQueryClient();

  const [toastMessage, setToastMessage] = useState(null);
  const [isFlashcardsOpen, setIsFlashcardsOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Fetch Quiz Details
  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['quiz', quizId],
    queryFn: () => quizService.getQuizById(quizId),
    enabled: !!quizId,
  });

  const quiz = response?.quiz;
  const authorId = quiz?.userId?._id || quiz?.userId?.id || quiz?.userId;
  const currentUserId = user?._id || user?.id;
  const canDelete = currentUserId && (currentUserId === authorId || user?.role === 'admin');

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: () => quizService.deleteQuiz(quizId, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
      router.push('/quizzes');
    },
    onError: (err) => {
      setToastMessage({ text: err.message || 'Failed to delete quiz', type: 'error' });
    },
  });

  const handleDelete = () => {
    if (confirm('Are you sure you want to permanently delete this quiz?')) {
      deleteMutation.mutate();
    }
  };

  const handleStartQuiz = () => {
    router.push(`/quizzes/${quizId}/play`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-transparent text-[#111827]">
        <Navbar />
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-20 flex flex-col items-center justify-center space-y-4">
          <div className="w-10 h-10 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-[#64748B]">Loading quiz details and questions...</p>
        </main>
      </div>
    );
  }

  if (isError || !quiz) {
    return (
      <div className="min-h-screen flex flex-col bg-transparent text-[#111827]">
        <Navbar />
        <main className="flex-1 max-w-xl w-full mx-auto px-4 py-16 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto text-[#EF4444]">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-[#0F172A]">Quiz Not Found</h2>
          <p className="text-sm text-[#64748B]">
            {error?.message || "The quiz you are looking for doesn't exist or has been removed."}
          </p>
          <Link href="/quizzes">
            <Button variant="secondary" size="md">
              <ArrowLeft className="w-4 h-4" />
              Back to Catalog
            </Button>
          </Link>
        </main>
      </div>
    );
  }

  const questionCount = quiz.questions?.length || 0;
  const potentialXp = questionCount * 10;
  const authorName = quiz.userId?.name || 'Community Contributor';

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-[#111827] selection:bg-[#2563EB]/20">
      <Navbar />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl border bg-rose-50 border-rose-300 text-rose-800 text-sm font-medium">
            <AlertCircle className="w-4 h-4 text-[#EF4444]" />
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Back Link & Actions */}
        <div className="flex items-center justify-between">
          <Link
            href="/quizzes"
            className="inline-flex items-center gap-2 text-xs font-medium text-[#64748B] hover:text-[#0F172A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Quiz Catalog
          </Link>

          {canDelete && (
            <Button
              variant="danger"
              size="sm"
              onClick={handleDelete}
              isLoading={deleteMutation.isPending}
              className="text-xs gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete Quiz
            </Button>
          )}
        </div>

        {/* Quiz Overview Hero Card */}
        <Card className="border-[#E2E8F0] bg-white shadow-sm p-6 sm:p-8 space-y-6 relative overflow-hidden">
          <div
            className="absolute right-0 top-0 bottom-0 w-1/2 bg-cover bg-right opacity-30 pointer-events-none [mask-image:linear-gradient(to_left,black_20%,transparent_100%)]"
            style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
            aria-hidden="true"
          />
          <div className="flex flex-wrap items-center gap-2.5 relative z-10">
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-md bg-[#EFF6FF] text-[#2563EB] border border-[#2563EB]/20">
              {quiz.topic}
            </span>
            <Badge variant={difficultyBadgeVariant[quiz.difficulty] || 'default'} className="capitalize">
              {quiz.difficulty}
            </Badge>
            {quiz.sourceType === 'ai' && (
              <Badge variant="ai" className="gap-1">
                <Sparkles className="w-3 h-3 text-[#2563EB]" />
                AI Generated
              </Badge>
            )}
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              {quiz.title}
            </h1>
            <p className="text-base text-[#64748B] max-w-2xl leading-relaxed">
              {quiz.description ||
                'Sharpen your understanding with this curated assessment. Test questions evaluate fundamental understanding and common pitfalls.'}
            </p>
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#EFF6FF] flex items-center justify-center text-[#2563EB] shrink-0">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#0F172A] font-mono">{questionCount}</div>
                <div className="text-[11px] text-[#64748B]">Total Questions</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center text-[#F59E0B] shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#0F172A] font-mono">{quiz.timeLimit || 10} min</div>
                <div className="text-[11px] text-[#64748B]">Time Limit</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center text-[#22C55E] shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#0F172A] font-mono">+{potentialXp} XP</div>
                <div className="text-[11px] text-[#64748B]">Max Reward</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#EFF6FF] flex items-center justify-center text-[#2563EB] shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div className="truncate">
                <div className="text-sm font-bold text-[#0F172A] truncate">{authorName}</div>
                <div className="text-[11px] text-[#64748B]">Quiz Author</div>
              </div>
            </div>
          </div>

          {/* Main Action Bar */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={handleStartQuiz}
              className="shadow-sm gap-2"
            >
              <Play className="w-4 h-4 fill-white" />
              Start Quiz Challenge
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setIsFlashcardsOpen(true)}
              className="gap-2"
            >
              <BookOpen className="w-4 h-4 text-[#2563EB]" />
              Flashcards Study
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setIsExportOpen(true)}
              className="gap-2"
            >
              <Printer className="w-4 h-4 text-[#64748B]" />
              Export & Print
            </Button>
            <Link href="/quizzes">
              <Button variant="ghost" size="lg" className="text-[#64748B] hover:text-[#0F172A]">
                Explore More
              </Button>
            </Link>
          </div>
        </Card>

        {/* Question Outline & Syllabus */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
            <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#2563EB]" />
              Question Outline ({questionCount})
            </h2>
            <span className="text-xs text-[#64748B]">Correct answers hidden before quiz</span>
          </div>

          <div className="space-y-3">
            {quiz.questions?.map((q, idx) => (
              <Card key={idx} className="border-[#E2E8F0] bg-white p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-md bg-[#EFF6FF] border border-[#2563EB]/20 flex items-center justify-center text-xs font-bold text-[#2563EB] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="space-y-2 flex-1">
                    <h3 className="text-sm font-semibold text-[#0F172A] leading-snug">
                      {q.question}
                    </h3>
                    <div className="flex flex-wrap gap-2 text-xs text-[#64748B]">
                      <span className="px-2 py-0.5 rounded bg-[#F8FAFC] border border-[#E2E8F0]">
                        {q.options?.length || 4} Multiple Choices
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#EFF6FF] border border-[#2563EB]/20 text-[#2563EB]">
                        Includes In-depth Explanation
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Assessment Guidelines & XP Rules */}
        <Card className="border-[#E2E8F0] bg-white shadow-sm p-6 space-y-3">
          <h3 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
            Rules & Scoring Guidelines
          </h3>
          <ul className="text-xs text-[#64748B] space-y-1.5 list-disc pl-5">
            <li>Each correct answer awards <strong>+10 XP</strong> toward your profile level.</li>
            <li>Finishing this quiz will maintain your daily learning streak.</li>
            <li>Take your time: questions test practical code comprehension and edge cases.</li>
          </ul>
        </Card>
      </main>

      {/* Interactive 3D Flashcard Study Studio */}
      <FlashcardViewer
        quiz={quiz}
        isOpen={isFlashcardsOpen}
        onClose={() => setIsFlashcardsOpen(false)}
      />

      {/* Export & Print Exam Modal */}
      <ExportModal
        quiz={quiz}
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />
    </div>
  );
}
