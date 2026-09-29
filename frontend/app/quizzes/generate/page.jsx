'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Sparkles,
  ArrowLeft,
  Wand2,
  Brain,
  Zap,
  CheckCircle2,
  Clock,
  HelpCircle,
  AlertCircle,
  Layers,
  ChevronRight,
  Flame,
  Cpu,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Navbar from '@/components/ui/Navbar';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import quizService from '@/services/quizService';

// Recommended topic suggestion chips
const SUGGESTION_CHIPS = [
  'React Server Components',
  'Docker & Containers',
  'TypeScript Generics',
  'System Design & Caching',
  'PostgreSQL Indexing',
  'Next.js App Router',
  'Node.js Event Loop',
  'CSS Grid & Flexbox',
  'Python Asyncio & Concurrency',
  'Web Security & OWASP Top 10',
];

// Difficulty definitions
const DIFFICULTIES = [
  {
    id: 'easy',
    label: 'Easy',
    color: 'emerald',
    badge: 'success',
    desc: 'Core fundamentals, syntax, and basic terminology',
    bgActive: 'bg-emerald-50 border-emerald-400 text-emerald-950 font-medium',
  },
  {
    id: 'medium',
    label: 'Medium',
    color: 'amber',
    badge: 'warning',
    desc: 'Practical implementation scenarios and architectural patterns',
    bgActive: 'bg-amber-50 border-amber-400 text-amber-950 font-medium',
  },
  {
    id: 'hard',
    label: 'Hard',
    color: 'rose',
    badge: 'danger',
    desc: 'Deep internals, edge cases, memory leaks, and performance traps',
    bgActive: 'bg-rose-50 border-rose-400 text-rose-950 font-medium',
  },
];

const QUESTION_COUNTS = [3, 5, 10];

export default function GenerateQuizPage() {
  const router = useRouter();
  const { token, user } = useAuth();

  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [customInstructions, setCustomInstructions] = useState('');

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  // Generation step animation sequence
  useEffect(() => {
    if (!isGenerating) return;

    const interval = setInterval(() => {
      setGenerationStep((prev) => {
        if (prev < 3) return prev + 1;
        return prev;
      });
    }, 700);

    return () => clearInterval(interval);
  }, [isGenerating]);

  const generationSteps = [
    'Analyzing topic knowledge graph and syllabus scope...',
    'Formulating technical scenarios and subtle distractors...',
    'Synthesizing pedagogical explanations and reference links...',
    'Validating structured questions and saving to library...',
  ];

  const handleGenerate = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!topic.trim()) {
      setErrorMessage('Please enter or select a topic for quiz generation.');
      return;
    }

    setGenerationStep(0);
    setIsGenerating(true);

    try {
      const payload = {
        topic: topic.trim(),
        difficulty,
        numberOfQuestions: Number(numberOfQuestions) || 5,
        customInstructions: customInstructions.trim(),
      };

      const res = await quizService.generateQuiz(payload, token);
      const generatedQuiz = res?.quiz;

      if (generatedQuiz?._id || generatedQuiz?.id) {
        // Short pause to show completion step
        setTimeout(() => {
          router.push(`/quizzes/${generatedQuiz._id || generatedQuiz.id}`);
        }, 600);
      } else {
        router.push('/quizzes');
      }
    } catch (err) {
      setErrorMessage(err.message || 'AI generation failed. Please try again.');
      setIsGenerating(false);
      setGenerationStep(0);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-transparent text-[#111827] selection:bg-[#2563EB]/20">
        <Navbar />

        <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center justify-between">
            <Link
              href="/quizzes"
              className="inline-flex items-center gap-2 text-xs font-medium text-[#64748B] hover:text-[#0F172A] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Quiz Catalog
            </Link>
            <Badge variant="ai" className="font-mono text-xs gap-1">
              <Sparkles className="w-3 h-3 text-[#2563EB]" />
              AI Studio
            </Badge>
          </div>

          {/* Header Banner */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm relative overflow-hidden">
            {/* Subtle ambient light graphic */}
            <div
              className="absolute right-0 top-0 bottom-0 w-1/2 bg-cover bg-right opacity-35 pointer-events-none [mask-image:linear-gradient(to_left,black_20%,transparent_100%)]"
              style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
              aria-hidden="true"
            />
            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#EFF6FF] text-[#2563EB] border border-[#2563EB]/20 text-xs font-mono font-semibold">
                <Wand2 className="w-3.5 h-3.5" />
                Autonomous Question Engine
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                AI Quiz Generation Studio
              </h1>
              <p className="text-sm sm:text-base text-[#64748B] max-w-2xl leading-relaxed">
                Enter any engineering topic, concept, or library. The AI will formulate targeted multi-choice
                questions, challenging edge cases, and in-depth educational explanations.
              </p>
            </div>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-3 text-sm text-rose-800">
              <AlertCircle className="w-5 h-5 text-[#EF4444] shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form / Interactive Studio */}
          <form onSubmit={handleGenerate} className="space-y-6">
            {/* Step 1: Topic Selection */}
            <Card className="border-[#E2E8F0] bg-white shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2 text-[#0F172A]">
                  <Brain className="w-4 h-4 text-[#2563EB]" />
                  1. Choose Your Learning Topic
                </CardTitle>
                <CardDescription className="text-[#64748B]">
                  Type any programming language, framework, API pattern, or infrastructure subject.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <input
                    type="text"
                    required
                    disabled={isGenerating}
                    placeholder="e.g. Next.js App Router, Docker Multi-Stage Builds, Rust Memory Safety..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#E2E8F0] text-[#111827] placeholder:text-[#94A3B8] text-sm focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/30 transition-all"
                  />
                </div>

                {/* Suggestion Chips */}
                <div className="space-y-2">
                  <span className="text-xs text-[#64748B] font-medium">Quick Suggestions:</span>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTION_CHIPS.map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        disabled={isGenerating}
                        onClick={() => setTopic(chip)}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                          topic === chip
                            ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-xs font-semibold'
                            : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] hover:bg-white'
                        }`}
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Difficulty & Question Count */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Difficulty Selection */}
              <Card className="border-[#E2E8F0] bg-white shadow-sm flex flex-col justify-between">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2 text-[#0F172A]">
                    <Zap className="w-4 h-4 text-[#F59E0B]" />
                    2. Target Difficulty
                  </CardTitle>
                  <CardDescription className="text-[#64748B]">
                    Calibrates depth of distractors and conceptual traps.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2.5">
                  {DIFFICULTIES.map((diff) => {
                    const isSelected = difficulty === diff.id;
                    return (
                      <div
                        key={diff.id}
                        onClick={() => !isGenerating && setDifficulty(diff.id)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                          isSelected
                            ? diff.bgActive
                            : 'bg-[#F8FAFC] border-[#E2E8F0] hover:border-[#2563EB]/40 text-[#64748B]'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full mt-0.5 border flex items-center justify-center shrink-0 ${
                            isSelected ? 'border-current bg-current/20' : 'border-[#CBD5E1]'
                          }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                        </div>
                        <div className="space-y-0.5 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold capitalize text-[#0F172A]">{diff.label}</span>
                            <Badge variant={diff.badge} className="text-[10px] py-0">
                              {diff.id}
                            </Badge>
                          </div>
                          <p className="text-xs text-[#64748B] leading-snug">{diff.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Number of Questions & Time Estimate */}
              <Card className="border-[#E2E8F0] bg-white shadow-sm flex flex-col justify-between">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2 text-[#0F172A]">
                    <HelpCircle className="w-4 h-4 text-[#2563EB]" />
                    3. Number of Questions
                  </CardTitle>
                  <CardDescription className="text-[#64748B]">
                    Select the assessment size and practice duration.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="grid grid-cols-3 gap-3">
                    {QUESTION_COUNTS.map((count) => {
                      const isSelected = numberOfQuestions === count;
                      return (
                        <button
                          key={count}
                          type="button"
                          disabled={isGenerating}
                          onClick={() => setNumberOfQuestions(count)}
                          className={`py-4 rounded-xl border text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#2563EB] border-[#2563EB] text-white shadow-sm'
                              : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A] hover:border-[#2563EB]/40'
                          }`}
                        >
                          <div className="text-2xl font-extrabold font-mono">{count}</div>
                          <div className="text-[11px] font-medium opacity-80 mt-0.5">Questions</div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Estimated metrics */}
                  <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2 text-xs text-[#64748B]">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
                        Estimated Time Limit:
                      </span>
                      <span className="font-mono font-bold text-[#0F172A]">
                        {Math.max(5, numberOfQuestions * 2)} Minutes
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 text-[#2563EB]" />
                        Potential XP Reward:
                      </span>
                      <span className="font-mono font-bold text-[#2563EB]">
                        +{numberOfQuestions * 10} XP
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Step 3: Optional Focus / Custom Instructions */}
            <Card className="border-[#E2E8F0] bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center gap-2 text-[#0F172A]">
                  <Cpu className="w-4 h-4 text-[#2563EB]" />
                  Custom Focus / Special Instructions (Optional)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  rows={2}
                  disabled={isGenerating}
                  placeholder="e.g. Focus on memory leaks, async event timing, or tricky interview questions..."
                  value={customInstructions}
                  onChange={(e) => setCustomInstructions(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2E8F0] text-[#111827] placeholder:text-[#94A3B8] text-xs focus:outline-none focus:border-[#2563EB] transition-all resize-none"
                />
              </CardContent>
            </Card>

            {/* Generating Live Feedback Modal / State */}
            {isGenerating && (
              <Card className="border-[#2563EB]/30 bg-[#EFF6FF] p-6 space-y-4 shadow-sm animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border-2 border-[#2563EB] border-t-transparent animate-spin shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-[#0F172A]">Generating AI Quiz...</h4>
                    <p className="text-xs text-[#2563EB] mt-0.5">
                      {generationSteps[generationStep] || 'Finalizing quiz questions...'}
                    </p>
                  </div>
                </div>

                {/* Progress Step Bar */}
                <div className="grid grid-cols-4 gap-2 pt-1">
                  {generationSteps.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx <= generationStep ? 'bg-[#2563EB]' : 'bg-[#E2E8F0]'
                      }`}
                    />
                  ))}
                </div>
              </Card>
            )}

            {/* Submission Action Bar */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E2E8F0]">
              <Link href="/quizzes">
                <Button variant="secondary" size="md" disabled={isGenerating}>
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isGenerating}
                disabled={isGenerating}
                className="shadow-sm gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate Quiz with AI</span>
              </Button>
            </div>
          </form>
        </main>
      </div>
    </ProtectedRoute>
  );
}
