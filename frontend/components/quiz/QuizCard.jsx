'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, HelpCircle, User, Trash2, ArrowRight, Sparkles, BookOpen, FileText } from 'lucide-react';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

// Color mappings for different difficulty levels
const difficultyBadgeVariant = {
  easy: 'success',
  medium: 'warning',
  hard: 'danger',
};

// Topic display style mappings for light SaaS theme
const topicColors = {
  javascript: 'text-amber-700 bg-amber-50 border-amber-200',
  react: 'text-[#0284C7] bg-sky-50 border-sky-200',
  nodejs: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  css: 'text-[#2563EB] bg-blue-50 border-blue-200',
  python: 'text-[#2563EB] bg-blue-50 border-blue-200',
  general: 'text-slate-700 bg-slate-100 border-slate-200',
};

export function QuizCard({ quiz, currentUserId, currentUserRole, onDelete, isDeleting = false }) {
  const quizId = quiz._id || quiz.id;
  const questionCount = quiz.questions?.length || 0;
  const authorId = quiz.userId?._id || quiz.userId?.id || quiz.userId;
  const authorName = quiz.userId?.name || 'Community';
  
  const canDelete = currentUserId && (currentUserId === authorId || currentUserRole === 'admin');

  const topicClass = topicColors[quiz.topic?.toLowerCase()] || topicColors.general;

  return (
    <Card className="group flex flex-col justify-between hover:border-[#2563EB]/40 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
      <div>
        {/* Header with Topic & Difficulty Badges */}
        <CardHeader className="pb-3 border-b-0 flex flex-row items-center justify-between gap-2">
          <span
            className={`text-[11px] font-mono font-semibold uppercase px-2.5 py-1 rounded-md border tracking-wider ${topicClass}`}
          >
            {quiz.topic || 'General'}
          </span>
          <Badge variant={difficultyBadgeVariant[quiz.difficulty] || 'default'} className="capitalize">
            {quiz.difficulty || 'medium'}
          </Badge>
        </CardHeader>

        {/* Content: Title, Description, Metadata */}
        <CardContent className="pt-0 pb-4 space-y-3">
          <Link href={`/quizzes/${quizId}`}>
            <CardTitle className="text-lg font-bold group-hover:text-[#2563EB] text-[#0F172A] transition-colors line-clamp-1 cursor-pointer">
              {quiz.title}
            </CardTitle>
          </Link>

          <CardDescription className="line-clamp-2 text-xs text-[#64748B] min-h-[2.5rem]">
            {quiz.description || 'Test and strengthen your skills with this focused practice quiz.'}
          </CardDescription>

          {/* Details Row: Questions, Time Limit, Source */}
          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-[#64748B] border-t border-[#E2E8F0]">
            <div className="flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>{questionCount} {questionCount === 1 ? 'Question' : 'Questions'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#64748B]" />
              <span>{quiz.timeLimit || 10} mins</span>
            </div>
            {quiz.sourceType === 'ai' && (
              <div className="flex items-center gap-1 text-[11px] text-[#0284C7] font-medium ml-auto">
                <Sparkles className="w-3 h-3 text-[#38BDF8]" />
                <span>AI Generated</span>
              </div>
            )}
            {quiz.sourceType === 'pdf' && (
              <div className="flex items-center gap-1 text-[11px] text-[#2563EB] font-medium ml-auto">
                <FileText className="w-3 h-3" />
                <span>PDF / Notes</span>
              </div>
            )}
          </div>
        </CardContent>

      </div>

      {/* Footer: Author & Action Buttons */}
      <CardFooter className="pt-3 border-t border-[#E2E8F0] bg-[#F8FAFC]/50 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-[#64748B]">
          <div className="w-6 h-6 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-center text-[#0F172A] font-bold text-[10px]">
            {authorName.charAt(0).toUpperCase()}
          </div>
          <span className="truncate max-w-[100px] sm:max-w-[120px]">{authorName}</span>
        </div>

        <div className="flex items-center gap-2">
          {canDelete && onDelete && (
            <button
              onClick={() => onDelete(quizId)}
              disabled={isDeleting}
              title="Delete Quiz"
              className="p-2 rounded-lg text-[#64748B] hover:text-[#EF4444] hover:bg-rose-50 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}

          <Link href={`/quizzes/${quizId}`}>
            <Button variant="primary" size="sm">
              <span>View Quiz</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}

export default QuizCard;
