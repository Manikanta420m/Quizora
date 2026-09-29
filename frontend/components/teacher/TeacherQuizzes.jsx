'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Plus,
  Sparkles,
  Search,
  CheckCircle2,
  Clock,
  MoreVertical,
  Edit2,
  Trash2,
  Copy,
  Eye,
  Send,
  Share2,
  Check,
  AlertCircle,
  X,
  Play,
  HelpCircle,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function TeacherQuizzes({
  initialQuizzes,
  onNavigateTab,
  onOpenAssignModal,
}) {
  const [quizzes, setQuizzes] = useState(
    initialQuizzes || [
      {
        id: 'qz_js_basics',
        title: 'JavaScript Basics',
        topic: 'javascript',
        difficulty: 'medium',
        questionsCount: 20,
        timeLimit: 15,
        attempts: 126,
        avgScore: 84,
        status: 'published',
        createdAt: '2026-09-15',
        questions: [
          {
            id: 'q1',
            prompt: 'Which method removes the last element from an array in JavaScript?',
            options: ['pop()', 'push()', 'shift()', 'slice()'],
            correctAnswer: 0,
            explanation: 'pop() removes and returns the last element of an array.',
          },
          {
            id: 'q2',
            prompt: 'What is the return type of typeof NaN in JavaScript?',
            options: ['number', 'NaN', 'undefined', 'object'],
            correctAnswer: 0,
            explanation: 'In JavaScript, NaN is considered a numeric value according to IEEE 754 standards.',
          },
        ],
      },
      {
        id: 'qz_ds_trees',
        title: 'Binary Trees & Traversals',
        topic: 'data-structures',
        difficulty: 'hard',
        questionsCount: 15,
        timeLimit: 25,
        attempts: 84,
        avgScore: 78,
        status: 'published',
        createdAt: '2026-09-17',
        questions: [
          {
            id: 'q1',
            prompt: 'In a Binary Search Tree (BST), which traversal produces values in sorted order?',
            options: ['In-order', 'Pre-order', 'Post-order', 'Level-order'],
            correctAnswer: 0,
            explanation: 'In-order traversal visits left subtree, root, then right subtree, yielding sorted keys in a BST.',
          },
        ],
      },
      {
        id: 'qz_react_hooks',
        title: 'Advanced React Hooks & Context',
        topic: 'react',
        difficulty: 'medium',
        questionsCount: 18,
        timeLimit: 20,
        attempts: 92,
        avgScore: 86,
        status: 'published',
        createdAt: '2026-09-18',
        questions: [
          {
            id: 'q1',
            prompt: 'When does the cleanup function in useEffect run?',
            options: ['Before unmount and before re-running effect', 'Only on unmount', 'Immediately after render', 'Never'],
            correctAnswer: 0,
            explanation: 'Cleanup runs before the component unmounts and before re-executing the effect with new dependencies.',
          },
        ],
      },
      {
        id: 'qz_ai_prompting',
        title: 'Generative AI & Prompt Engineering',
        topic: 'ai',
        difficulty: 'easy',
        questionsCount: 10,
        timeLimit: 12,
        attempts: 0,
        avgScore: 0,
        status: 'draft',
        createdAt: '2026-09-19',
        questions: [
          {
            id: 'q1',
            prompt: 'What technique provides step-by-step reasoning examples to an LLM?',
            options: ['Few-Shot Chain of Thought', 'Zero-Shot Temperature', 'Gradient Descent', 'Backpropagation'],
            correctAnswer: 0,
            explanation: 'Chain-of-thought prompting directs LLMs to break down complex reasoning sequentially.',
          },
        ],
      },
    ]
  );

  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'published' | 'draft'
  const [searchTerm, setSearchTerm] = useState('');
  const [previewQuiz, setPreviewQuiz] = useState(null);
  const [activeMenuQuizId, setActiveMenuQuizId] = useState(null);
  const [copiedQuizId, setCopiedQuizId] = useState('');

  // Duplicate Quiz
  const handleDuplicate = (quiz) => {
    const duplicated = {
      ...quiz,
      id: `qz_${Date.now()}`,
      title: `${quiz.title} (Copy)`,
      status: 'draft',
      attempts: 0,
      avgScore: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setQuizzes([duplicated, ...quizzes]);
    setActiveMenuQuizId(null);
  };

  // Delete Quiz
  const handleDelete = (quizId) => {
    if (!confirm('Are you sure you want to delete this quiz?')) return;
    setQuizzes(quizzes.filter((q) => q.id !== quizId));
    setActiveMenuQuizId(null);
  };

  // Toggle Publish
  const handleTogglePublish = (quizId) => {
    setQuizzes(
      quizzes.map((q) => {
        if (q.id === quizId) {
          const next = q.status === 'published' ? 'draft' : 'published';
          return { ...q, status: next };
        }
        return q;
      })
    );
    setActiveMenuQuizId(null);
  };

  // Share Quiz
  const handleShare = (quizId) => {
    const url = `https://quizora.ai/quizzes/${quizId}`;
    navigator.clipboard?.writeText(url);
    setCopiedQuizId(quizId);
    setTimeout(() => setCopiedQuizId(''), 2000);
  };

  // Filtered Quizzes
  const filteredQuizzes = quizzes.filter((q) => {
    if (filterStatus !== 'all' && q.status !== filterStatus) return false;
    if (searchTerm) {
      const matchTitle = q.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchTopic = q.topic.toLowerCase().includes(searchTerm.toLowerCase());
      return matchTitle || matchTopic;
    }
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header & Main Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
            Quiz Management
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Author, review, duplicate, assign, and publish assessments across your curriculum.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <Link href="/quizzes/create">
            <Button
              variant="secondary"
              size="sm"
              className="gap-1.5 border-[#E2E8F0] text-[#0F172A] text-xs hover:bg-[#F8FAFC]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Manually</span>
            </Button>
          </Link>

          <Button
            variant="primary"
            size="sm"
            onClick={() => onNavigateTab('ai-generator')}
            className="gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>Generate with AI</span>
          </Button>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E2E8F0]">
        {/* Status Filters */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] self-start">
          <button
            type="button"
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filterStatus === 'all'
                ? 'bg-[#2563EB] text-white shadow-xs'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            All ({quizzes.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('published')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filterStatus === 'published'
                ? 'bg-[#2563EB] text-white shadow-xs'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            Published ({quizzes.filter((q) => q.status === 'published').length})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('draft')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filterStatus === 'draft'
                ? 'bg-[#2563EB] text-white shadow-xs'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            Drafts ({quizzes.filter((q) => q.status === 'draft').length})
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search quizzes by topic or title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0F172A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
          />
        </div>
      </div>

      {/* Quizzes List */}
      <div className="space-y-3.5">
        {filteredQuizzes.length > 0 ? (
          filteredQuizzes.map((quiz) => (
            <Card
              key={quiz.id}
              className="bg-white border-[#E2E8F0] hover:border-[#2563EB]/40 p-5 rounded-3xl shadow-2xs hover:shadow-sm transition-all relative"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Quiz Info */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-md bg-blue-50 text-[#2563EB] border border-blue-200">
                      {quiz.topic}
                    </span>
                    <Badge variant={quiz.difficulty === 'hard' ? 'danger' : quiz.difficulty === 'medium' ? 'warning' : 'success'} className="capitalize text-[10px]">
                      {quiz.difficulty}
                    </Badge>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        quiz.status === 'published'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      {quiz.status === 'published' ? '● Published' : '○ Draft'}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-[#0F172A] hover:text-[#2563EB] transition-colors">
                      {quiz.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-[#64748B] mt-1">
                      <span>{quiz.questionsCount} Questions</span>
                      <span>&bull;</span>
                      <span>{quiz.timeLimit} Minutes</span>
                      <span>&bull;</span>
                      <span>{quiz.attempts} Student Attempts</span>
                      {quiz.avgScore > 0 && (
                        <>
                          <span>&bull;</span>
                          <span className="font-semibold text-emerald-600">{quiz.avgScore}% Average Score</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 relative">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setPreviewQuiz(quiz)}
                    className="gap-1.5 text-xs border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC]"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>Preview</span>
                  </Button>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onOpenAssignModal ? onOpenAssignModal(quiz) : onNavigateTab('assignments')}
                    className="gap-1.5 text-xs bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Assign</span>
                  </Button>

                  {/* Actions Dropdown Toggle */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setActiveMenuQuizId(activeMenuQuizId === quiz.id ? null : quiz.id)}
                      className="p-2 rounded-xl border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#64748B] transition-colors cursor-pointer"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>

                    {/* Menu Popup */}
                    {activeMenuQuizId === quiz.id && (
                      <div className="absolute right-0 top-full mt-1.5 w-48 rounded-2xl bg-white border border-[#E2E8F0] shadow-xl p-1.5 z-30 animate-in fade-in zoom-in-95 duration-100 text-xs">
                        <button
                          type="button"
                          onClick={() => handleTogglePublish(quiz.id)}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#F8FAFC] flex items-center gap-2 text-[#0F172A] cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{quiz.status === 'published' ? 'Unpublish to Draft' : 'Publish Quiz'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDuplicate(quiz)}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#F8FAFC] flex items-center gap-2 text-[#0F172A] cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5 text-[#2563EB]" />
                          <span>Duplicate Quiz</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleShare(quiz.id)}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#F8FAFC] flex items-center gap-2 text-[#0F172A] cursor-pointer"
                        >
                          <Share2 className="w-3.5 h-3.5 text-amber-500" />
                          <span>{copiedQuizId === quiz.id ? 'Copied URL!' : 'Share Link'}</span>
                        </button>

                        <div className="my-1 border-t border-[#E2E8F0]" />

                        <button
                          type="button"
                          onClick={() => handleDelete(quiz.id)}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-rose-50 flex items-center gap-2 text-[#EF4444] cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete Quiz</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="bg-white border-[#E2E8F0] border-dashed p-10 text-center space-y-3 rounded-3xl">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
            <h4 className="font-extrabold text-sm text-[#0F172A]">No quizzes found</h4>
            <p className="text-xs text-[#64748B] max-w-sm mx-auto">
              Create a custom quiz manually or use the Quizora AI Generator to formulation 20 questions in seconds.
            </p>
            <div className="pt-2 flex justify-center gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => onNavigateTab('ai-generator')}
                className="gap-1.5 text-xs bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generate with AI</span>
              </Button>
            </div>
          </Card>
        )}
      </div>

      {/* Quiz Preview Modal */}
      {previewQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-white border border-[#E2E8F0] shadow-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-150 relative">
            <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-blue-50 text-[#2563EB] border border-blue-200">
                  {previewQuiz.topic}
                </span>
                <h3 className="font-extrabold text-lg text-[#0F172A]">{previewQuiz.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewQuiz(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Questions list preview */}
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                Sample Questions Preview ({previewQuiz.questions?.length || 0} Questions)
              </span>

              {(previewQuiz.questions || []).map((q, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#0F172A] text-white font-mono font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-xs text-[#0F172A]">{q.prompt}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {q.options.map((opt, oIdx) => {
                      const isCorrect = oIdx === q.correctAnswer;
                      return (
                        <div
                          key={oIdx}
                          className={`p-2.5 rounded-xl border text-xs font-medium flex items-center gap-2 ${
                            isCorrect
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                              : 'bg-white border-[#E2E8F0] text-[#0F172A]'
                          }`}
                        >
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                              isCorrect ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-[#64748B]'
                            }`}
                          >
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                      );
                    })}
                  </div>

                  {q.explanation && (
                    <div className="pt-2 text-[11px] text-emerald-800 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                      <strong>Pedagogical Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#E2E8F0] flex justify-end gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setPreviewQuiz(null)}
                className="text-xs"
              >
                Close Preview
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setPreviewQuiz(null);
                  if (onOpenAssignModal) onOpenAssignModal(previewQuiz);
                  else onNavigateTab('assignments');
                }}
                className="text-xs bg-[#2563EB] hover:bg-[#1D4ED8] text-white gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Assign to Cohort</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
