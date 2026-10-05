'use client';
/* eslint-disable @next/next/no-img-element */

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import HeroRobot from '@/components/HeroRobot';
import LeaderboardSection from '@/components/LeaderboardSection';
import {
  Brain,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Zap,
  BarChart3,
  Target,
  FileText,
  UploadCloud,
  Check,
  RotateCcw,
  TrendingUp,
  Lightbulb,
  FileCheck,
  Globe,
  Binary,
  Atom,
  Languages,
  BookMarked,
  Layers,
  ChevronDown,
  Trophy,
  Crown,
  Flame,
  Star,
} from 'lucide-react';
import Navbar from '@/components/ui/Navbar';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/context/AuthContext';
import { useSound } from '@/context/SoundContext';
import leaderboardService from '@/services/leaderboardService';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const { playSound } = useSound();

  // Automatic redirect: authenticated users bypass the landing page and go directly to /dashboard
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  // Section 3: Quick Quiz Generator State
  const [quickTopic, setQuickTopic] = useState('JavaScript');
  const [quickDifficulty, setQuickDifficulty] = useState('Medium');
  const [quickQuestions, setQuickQuestions] = useState('10');
  const [quickType, setQuickType] = useState('MCQ');

  const handleQuickGenerate = (e) => {
    e.preventDefault();
    playSound('click');
    const params = new URLSearchParams({
      topic: quickTopic || 'JavaScript',
      difficulty: quickDifficulty.toLowerCase(),
      count: quickQuestions,
      type: quickType.toLowerCase(),
    });
    router.push(`/dashboard?tab=generate&${params.toString()}`);
  };

  // Section 8 & 9: Interactive Quiz Preview State
  const [selectedPreviewOption, setSelectedPreviewOption] = useState('B');
  const [hasAnsweredPreview, setHasAnsweredPreview] = useState(true);

  const previewQuestion = {
    title: 'JavaScript Fundamentals',
    progress: '3/10',
    prompt: 'What does Array.map() return?',
    options: [
      { id: 'A', text: 'The original array', correct: false, feedback: 'map() does not modify the original array; it leaves it completely unchanged.' },
      { id: 'B', text: 'A new array', correct: true, feedback: 'Array.map() creates a new array by applying a function to every element of the original array.' },
      { id: 'C', text: 'An object', correct: false, feedback: 'While arrays are technically objects in JS, map() specifically returns a new array instance, not a generic object.' },
      { id: 'D', text: 'A string', correct: false, feedback: 'map() returns a new array. To get a string, you would use methods like join().' },
    ],
    tip: 'Use map() when you want to transform each element of an array.',
  };

  const handleSelectOption = (id) => {
    setSelectedPreviewOption(id);
    setHasAnsweredPreview(true);
    if (id === 'B') {
      playSound('correct');
    } else {
      playSound('incorrect');
    }
  };

  // Live Leaderboard Query with Graceful Seeded Fallback
  const { data: lbData } = useQuery({
    queryKey: ['homeLeaderboard'],
    queryFn: () => leaderboardService.getLeaderboard({ limit: 5 }),
    staleTime: 1000 * 30,
  });

  const defaultTopLearners = [
    {
      rank: 1,
      name: 'Sarah Chen',
      xp: 2850,
      streak: 21,
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    },
    {
      rank: 2,
      name: 'Alex Rivera',
      xp: 2420,
      streak: 15,
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    },
    {
      rank: 3,
      name: 'Priya Sharma',
      xp: 2190,
      streak: 18,
      role: 'teacher',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    },
    {
      rank: 4,
      name: 'Marcus Vance',
      xp: 1870,
      streak: 9,
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    },
    {
      rank: 5,
      name: 'Elena Rostova',
      xp: 1640,
      streak: 12,
      role: 'student',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    },
  ];

  const topLearners =
    lbData?.leaderboard && lbData.leaderboard.length > 0
      ? lbData.leaderboard.slice(0, 5)
      : defaultTopLearners;

  // Render minimal loading state while redirecting authenticated users
  if (!isLoading && isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4 bg-[#F8FAFC]">
        <div className="w-10 h-10 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-semibold text-[#0F172A]">Redirecting to your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-[#111827] selection:bg-[#2563EB]/25">
      <Navbar />

      <main className="flex-1 space-y-16 lg:space-y-20 pb-20">
        {/* ================================================================= */}
        {/* HERO SECTION ⭐ */}
        {/* ================================================================= */}
        <section className="relative overflow-hidden pt-10 sm:pt-16 pb-0 lg:pb-2 px-4 sm:px-6 lg:px-8">

          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] bg-gradient-to-tr from-[#2563EB]/10 via-[#38BDF8]/10 to-[#2563EB]/5 blur-[130px] -z-10 pointer-events-none rounded-full" />

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left Side: Headline, Supporting Text, CTAs */}
              <div className="lg:col-span-7 space-y-6 text-left">
                {/* Announcement pill */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/80 text-xs font-semibold text-[#2563EB] shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>AI-Powered Quiz Generator</span>
                </div>

                {/* Headline: Create Smarter Quizzes with AI */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0F172A] leading-[1.12]">
                  Create Smarter Quizzes{' '}
                  <span className="bg-gradient-to-r from-[#2563EB] via-[#38BDF8] to-[#2563EB] bg-clip-text text-transparent">
                    with AI
                  </span>
                </h1>

                {/* Supporting text */}
                <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-xl font-normal">
                  Transform your study materials into an engaging gamified experience. Generate personalized quizzes, study flashcards, and detailed analytics from any topic, raw notes, or PDF document. Choose your difficulty to test your knowledge instantly, challenge a friend head-to-head on the live leaderboard, or create a private multiplayer quiz room to learn together in real-time.
                </p>

                {/* Buttons: [ Generate Quiz → ] [ Explore Features ] */}
                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <Link href="/dashboard?tab=generate">
                    <Button
                      variant="primary"
                      size="lg"
                      className="gap-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-blue-500/25 text-base transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>Generate Quiz</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/#features">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="gap-2 bg-white hover:bg-[#F8FAFC] text-[#0F172A] border-[#E2E8F0] font-semibold px-6 py-3.5 rounded-xl text-base shadow-xs transition-all hover:border-[#2563EB]/40"
                    >
                      <span>Explore Features</span>
                    </Button>
                  </Link>
                </div>

                {/* Small text underneath */}
                <div className="flex items-center gap-2 text-xs sm:text-sm text-[#64748B] pt-1">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                  <span>No complicated setup. Just choose a topic and start learning.</span>
                </div>
              </div>

              {/* Right Side: Quizora Robot Showcase */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <HeroRobot />
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 5. FEATURES SECTION */}
        {/* ================================================================= */}
        <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 !mt-0 lg:!mt-0">
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Everything You Need to Learn Smarter
            </h2>
            <p className="text-sm sm:text-base text-[#64748B]">
              Purposefully crafted features that transform raw study notes into active recall and verified mastery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <Card className="p-6 bg-white border-[#E2E8F0] hover:border-[#2563EB]/40 hover:shadow-lg transition-all rounded-2xl space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center text-xl">
                🤖
              </div>
              <h3 className="text-lg font-bold text-[#0F172A]">AI Quiz Generation</h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Generate questions automatically from any topic.
              </p>
            </Card>

            {/* Card 2 */}
            <Card className="p-6 bg-white border-[#E2E8F0] hover:border-[#2563EB]/40 hover:shadow-lg transition-all rounded-2xl space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center text-xl">
                📄
              </div>
              <h3 className="text-lg font-bold text-[#0F172A]">PDF to Quiz</h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Upload your study material and turn it into a quiz.
              </p>
            </Card>

            {/* Card 3 */}
            <Card className="p-6 bg-white border-[#E2E8F0] hover:border-[#2563EB]/40 hover:shadow-lg transition-all rounded-2xl space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center text-xl">
                🎯
              </div>
              <h3 className="text-lg font-bold text-[#0F172A]">Custom Difficulty</h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Choose Easy, Medium, or Hard.
              </p>
            </Card>

            {/* Card 4 (Formerly 7) */}
            <Card className="p-6 bg-white border-[#E2E8F0] hover:border-[#2563EB]/40 hover:shadow-lg transition-all rounded-2xl space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center text-xl">
                🗂️
              </div>
              <h3 className="text-lg font-bold text-[#0F172A]">Flashcard Generation</h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Automatically generate study flashcards from your notes for active recall.
              </p>
            </Card>

            {/* Card 5 (Formerly 8) */}
            <Card className="p-6 bg-white border-[#E2E8F0] hover:border-[#2563EB]/40 hover:shadow-lg transition-all rounded-2xl space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center text-xl">
                ⚔️
              </div>
              <h3 className="text-lg font-bold text-[#0F172A]">Challenge a Friend</h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Share your quiz link and compete head-to-head on the live leaderboard.
              </p>
            </Card>

            {/* Card 6 (Formerly 9) */}
            <Card className="p-6 bg-white border-[#E2E8F0] hover:border-[#2563EB]/40 hover:shadow-lg transition-all rounded-2xl space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center text-xl">
                🎮
              </div>
              <h3 className="text-lg font-bold text-[#0F172A]">Create a Quiz Room</h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Host live multiplayer quiz sessions with friends in real-time.
              </p>
            </Card>

            {/* Card 7 (Formerly 4) */}
            <Card className="p-6 bg-white border-[#E2E8F0] hover:border-[#2563EB]/40 hover:shadow-lg transition-all rounded-2xl space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center text-xl">
                ⚡
              </div>
              <h3 className="text-lg font-bold text-[#0F172A]">Instant Generation</h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Generate a complete quiz within seconds.
              </p>
            </Card>

            {/* Card 8 (Formerly 5) */}
            <Card className="p-6 bg-white border-[#E2E8F0] hover:border-[#2563EB]/40 hover:shadow-lg transition-all rounded-2xl space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center text-xl">
                📊
              </div>
              <h3 className="text-lg font-bold text-[#0F172A]">Performance Analytics</h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Track scores, accuracy, and progress.
              </p>
            </Card>

            {/* Card 9 (Formerly 6) */}
            <Card className="p-6 bg-white border-[#E2E8F0] hover:border-[#2563EB]/40 hover:shadow-lg transition-all rounded-2xl space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center text-xl">
                🔄
              </div>
              <h3 className="text-lg font-bold text-[#0F172A]">Personalized Practice</h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Generate quizzes based on your weak areas.
              </p>
            </Card>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 6. HOW IT WORKS */}
        {/* ================================================================= */}
        <section id="how-it-works" className="max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-12 scroll-mt-24">
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
              How It Works
            </h2>
            <p className="text-sm text-[#64748B]">
              From concept to active mastery in 4 simple steps.
            </p>
          </div>

          {/* Connected Steps Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left relative">
            {/* Step 01 */}
            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-3 relative group hover:border-[#2563EB]/50 transition-all">
              <div className="font-mono text-2xl font-black text-[#2563EB]">01</div>
              <h3 className="text-base font-bold text-[#0F172A]">Choose Topic</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Enter a topic, upload notes, or provide a PDF.
              </p>
            </div>

            {/* Step 02 */}
            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-3 relative group hover:border-[#2563EB]/50 transition-all">
              <div className="font-mono text-2xl font-black text-[#2563EB]">02</div>
              <h3 className="text-base font-bold text-[#0F172A]">Customize Quiz</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Choose difficulty, number of questions and question type.
              </p>
            </div>

            {/* Step 03 */}
            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-3 relative group hover:border-[#2563EB]/50 transition-all">
              <div className="font-mono text-2xl font-black text-[#2563EB]">03</div>
              <h3 className="text-base font-bold text-[#0F172A]">AI Generates</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Quizora&apos;s AI generates your quiz.
              </p>
            </div>

            {/* Step 04 */}
            <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm space-y-3 relative group hover:border-[#2563EB]/50 transition-all">
              <div className="font-mono text-2xl font-black text-[#22C55E]">04</div>
              <h3 className="text-base font-bold text-[#0F172A]">Test &amp; Learn</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                Take the quiz, see explanations, and track your progress.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 7. "TURN ANYTHING INTO A QUIZ" PIPELINE */}
        {/* ================================================================= */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-10">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Your Notes. Your Topics. Your Quiz.
            </h2>
            <p className="text-sm text-[#64748B] max-w-xl mx-auto">
              Any study format converts seamlessly into structured assessments.
            </p>
          </div>

          {/* Visual Transformation Pipeline */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E2E8F0] shadow-lg space-y-8">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-bold text-[#0F172A]">
              <span className="px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-2">
                📄 PDF Document
              </span>
              <span className="text-slate-400 font-mono">→</span>
              <span className="px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-2">
                📝 Study Notes
              </span>
              <span className="text-slate-400 font-mono">→</span>
              <span className="px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-2">
                📚 Topic Name
              </span>
              <span className="text-slate-400 font-mono">→</span>
              <span className="px-4 py-2.5 rounded-xl bg-blue-50 border border-blue-200 text-[#2563EB] flex items-center gap-2">
                🤖 Quizora AI
              </span>
              <span className="text-slate-400 font-mono">→</span>
              <span className="px-5 py-2.5 rounded-xl bg-[#0F172A] text-white flex items-center gap-2 shadow-md">
                🎯 QUIZORA QUIZ
              </span>
            </div>


          </div>
        </section>

        {/* ================================================================= */}
        {/* 8. QUIZ PREVIEW & 9. AI EXPLANATION SECTION */}
        {/* ================================================================= */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Don&apos;t Just Get the Answer. Understand It.
            </h2>
            <p className="text-sm text-[#64748B] max-w-xl mx-auto">
              Experience the live question layout and in-depth AI rationales below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: 8. Quiz Preview Card */}
            <div className="lg:col-span-7">
              <Card className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-lg space-y-6">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
                  <span className="font-bold text-sm text-[#0F172A]">
                    {previewQuestion.title}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded">
                    {previewQuestion.progress}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#0F172A]">
                  {previewQuestion.prompt}
                </h3>

                <div className="space-y-3">
                  {previewQuestion.options.map((opt) => {
                    const isSelected = selectedPreviewOption === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleSelectOption(opt.id)}
                        className={`w-full p-3.5 rounded-xl border text-left text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'border-[#38BDF8] bg-sky-50/70 text-[#0F172A] shadow-xs'
                            : 'border-[#E2E8F0] bg-[#F8FAFC] text-[#111827] hover:border-[#38BDF8]/50 hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs font-mono font-bold ${
                              isSelected
                                ? 'border-[#38BDF8] bg-[#38BDF8] text-white'
                                : 'border-[#CBD5E1] bg-white text-[#64748B]'
                            }`}
                          >
                            {isSelected ? '●' : '○'}
                          </span>
                          <span>
                            {opt.id}. {opt.text}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

              </Card>
            </div>

            {/* Right: 9. AI Explanation Reveal */}
            <div className="lg:col-span-5">
              {(() => {
                const selectedOpt = previewQuestion.options.find(o => o.id === selectedPreviewOption) || previewQuestion.options[1];
                const isCorrect = selectedOpt.correct;
                return (
                  <Card className={`p-6 sm:p-7 rounded-3xl shadow-md space-y-4 transition-colors duration-300 ${
                    isCorrect ? 'bg-emerald-50/50 border border-emerald-200' : 'bg-rose-50/50 border border-rose-200'
                  }`}>
                    <div className="flex items-center gap-2">
                      <span className={`w-6 h-6 rounded-full text-white flex items-center justify-center text-xs font-bold shadow-sm ${
                        isCorrect ? 'bg-emerald-500' : 'bg-rose-500'
                      }`}>
                        {isCorrect ? '✓' : '✕'}
                      </span>
                      <span className={`font-extrabold text-base ${
                        isCorrect ? 'text-emerald-800' : 'text-rose-800'
                      }`}>
                        {isCorrect ? 'Correct!' : 'Incorrect'}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <span className={`text-xs font-bold uppercase tracking-wider block ${
                        isCorrect ? 'text-emerald-900' : 'text-rose-900'
                      }`}>
                        Why?
                      </span>
                      <p className={`text-xs sm:text-sm leading-relaxed ${
                        isCorrect ? 'text-emerald-950' : 'text-rose-950'
                      }`}>
                        {selectedOpt.feedback}
                      </p>
                    </div>

                    <div className={`p-3.5 rounded-xl bg-white space-y-1 shadow-2xs ${
                      isCorrect ? 'border border-emerald-200/80' : 'border border-rose-200/80'
                    }`}>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600">
                        <Lightbulb className="w-3.5 h-3.5" />
                        <span>Tip:</span>
                      </div>
                      <p className="text-xs text-[#0F172A] leading-relaxed">
                        {previewQuestion.tip}
                      </p>
                    </div>
                  </Card>
                );
              })()}
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 10. ANALYTICS PREVIEW */}
        {/* ================================================================= */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
              Your Learning Progress
            </h2>
            <p className="text-sm text-[#64748B]">
              Quizora isn&apos;t just an AI question generator — it tracks your exact mastery curve.
            </p>
          </div>

          <Card className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-lg space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-center">
                <span className="text-xs text-[#64748B] block">Overall Accuracy</span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono mt-1 block">
                  87%
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-center">
                <span className="text-xs text-[#64748B] block">Quizzes Completed</span>
                <span className="text-2xl sm:text-3xl font-black text-[#0F172A] font-mono mt-1 block">
                  24
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-center">
                <span className="text-xs text-[#64748B] block">Questions Answered</span>
                <span className="text-2xl sm:text-3xl font-black text-[#2563EB] font-mono mt-1 block">
                  238
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-center">
                <span className="text-xs text-[#64748B] block">Strongest Topic</span>
                <span className="text-sm font-extrabold text-[#0F172A] mt-2 block truncate">
                  JavaScript
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-center col-span-2 sm:col-span-1">
                <span className="text-xs text-[#64748B] block">Needs Practice</span>
                <span className="text-sm font-extrabold text-amber-600 mt-2 block truncate">
                  React
                </span>
              </div>
            </div>

            {/* Simple CSS/SVG Trend Chart */}
            <div className="space-y-3 pt-4 border-t border-[#E2E8F0]">
              <div className="flex items-center justify-between text-xs font-semibold text-[#0F172A]">
                <span>Retention &amp; Accuracy Curve (Last 6 Sessions)</span>
                <span className="text-emerald-600 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> +14% This Month
                </span>
              </div>
              <div className="h-28 w-full flex items-end justify-between gap-3 pt-4 pb-2 px-2 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0]">
                {[
                  { session: 'Mon', val: 65 },
                  { session: 'Tue', val: 72 },
                  { session: 'Wed', val: 70 },
                  { session: 'Thu', val: 84 },
                  { session: 'Fri', val: 82 },
                  { session: 'Sat', val: 87 },
                ].map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <div
                      style={{ height: `${item.val}%` }}
                      className="w-full max-w-[40px] rounded-lg bg-gradient-to-t from-[#2563EB] to-[#38BDF8] transition-all duration-500 hover:opacity-90"
                    />
                    <span className="text-[10px] font-mono text-[#64748B]">{item.session}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </section>

        {/* ================================================================= */}
        {/* GLOBAL LEADERBOARD SECTION ⭐ */}
        {/* ================================================================= */}
        <LeaderboardSection />

        {/* ================================================================= */}
        {/* 11. CATEGORIES */}
        {/* ================================================================= */}
        <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
          <div className="text-center space-y-2 mb-10">
            <h2 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
              Categories
            </h2>
            <p className="text-sm text-[#64748B]">
              Give users a quick way to start. Select a discipline below:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: 'Programming', icon: '💻', slug: 'programming' },
              { name: 'Web Development', icon: '🌐', slug: 'web-development' },
              { name: 'Artificial Intelligence', icon: '🤖', slug: 'artificial-intelligence' },
              { name: 'Data Science', icon: '📊', slug: 'data-science' },
              { name: 'Mathematics', icon: '🧮', slug: 'mathematics' },
              { name: 'Science', icon: '🔬', slug: 'science' },
              { name: 'General Knowledge', icon: '📚', slug: 'general-knowledge' },
              { name: 'English', icon: '🗣️', slug: 'english' },
            ].map((cat, idx) => (
              <Link
                key={idx}
                href="/login"
                className="p-5 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#2563EB] hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                    {cat.name}
                  </h3>
                  <span className="text-[11px] text-[#64748B] mt-1 flex items-center gap-1">
                    Start Quiz <ArrowRight className="w-3 h-3 text-[#2563EB]" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ================================================================= */}
        {/* 12. LEARNING CTA */}
        {/* ================================================================= */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="relative overflow-hidden p-8 sm:p-14 rounded-3xl bg-[#0F172A] border border-[#1E293B] shadow-2xl text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Ready to test your knowledge?
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              Turn what you know into a quiz and discover what you can improve.
            </p>

            <div className="pt-2 flex justify-center">
              <Link href="/dashboard?tab=generate">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-[#2563EB] hover:bg-[#1D4ED8] ring-2 ring-[#38BDF8]/50 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-blue-500/25 text-base transition-all hover:scale-105"
                >
                  <span>Create Your First Quiz</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
