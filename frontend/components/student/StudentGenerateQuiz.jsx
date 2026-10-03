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
  ChevronUp,
  ChevronDown,
  Flame,
  Cpu,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
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

export default function StudentGenerateQuiz({ onCancel }) {
  const router = useRouter();
  const { token, user } = useAuth();

  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [timeLimit, setTimeLimit] = useState('');
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
        timeLimit: timeLimit ? Number(timeLimit) : Math.max(5, (Number(numberOfQuestions) || 5) * 2),
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
    <div className="w-full space-y-8 animate-in fade-in duration-300">


          {/* Header Banner */}
          <div className="relative p-6 sm:p-8 rounded-3xl border border-white/60 shadow-xl overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-6 group mb-4">
            {/* Animated Background Orbs */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] bg-blue-100/60 rounded-full mix-blend-multiply filter blur-[80px] animate-blob" />
            <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[150%] bg-purple-100/60 rounded-full mix-blend-multiply filter blur-[80px] animate-blob animation-delay-2000" />
            
            {/* Glassmorphism Surface */}
            <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl" />

            {/* Subtle ambient light graphic */}
            <div
              className="absolute right-0 top-0 bottom-0 w-1/2 bg-cover bg-right opacity-20 pointer-events-none mix-blend-overlay [mask-image:linear-gradient(to_left,black_20%,transparent_100%)] transition-transform duration-1000 group-hover:scale-105"
              style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
              aria-hidden="true"
            />
            
            {/* Left Content */}
            <div className="relative z-10 space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 text-blue-600 border border-white shadow-sm text-xs font-bold backdrop-blur-md">
                <Wand2 className="w-3.5 h-3.5" />
                Autonomous Question Engine
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
                AI Quiz <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Generation Studio</span>
              </h1>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Enter any engineering topic, concept, or library. The AI will formulate targeted multi-choice
                questions, challenging edge cases, and in-depth educational explanations.
              </p>
            </div>

            {/* Right: Massive Tech Galaxy Animation */}
            <div className="hidden lg:flex relative z-10 w-96 h-48 items-center justify-center mr-8">
              <style>{`
                @keyframes float-bot {
                  0%, 100% { transform: translateY(0px); filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.5)); }
                  50% { transform: translateY(-10px); filter: drop-shadow(0 0 40px rgba(99, 102, 241, 0.8)); }
                }
                @keyframes bubble-up {
                  0% { transform: translateY(20px) scale(0.5); opacity: 0; }
                  20% { opacity: 1; transform: translateY(0px) scale(1); }
                  80% { opacity: 1; transform: translateY(-40px) scale(1); }
                  100% { transform: translateY(-60px) scale(1.2); opacity: 0; }
                }
                .quiz-bubble {
                  position: absolute;
                  width: 44px; height: 44px;
                  background: white; border-radius: 12px;
                  display: flex; align-items: center; justify-content: center;
                  font-weight: 900; font-size: 20px;
                  box-shadow: 0 10px 25px rgba(37,99,235,0.15);
                  border: 2px solid rgba(239, 246, 255, 0.8);
                }
              `}</style>
              
              {/* Background ambient glow */}
              <div className="absolute w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />

              {/* Floating Quiz Bubbles */}
              <div className="quiz-bubble left-10 top-6" style={{ animation: 'bubble-up 3.5s ease-in-out infinite 0s', color: '#2563EB' }}>?</div>
              <div className="quiz-bubble right-12 top-4" style={{ animation: 'bubble-up 4s ease-in-out infinite 1s', color: '#10B981' }}>A</div>
              <div className="quiz-bubble left-16 bottom-6" style={{ animation: 'bubble-up 3.8s ease-in-out infinite 2s', color: '#8B5CF6' }}>B</div>
              <div className="quiz-bubble right-16 bottom-8" style={{ animation: 'bubble-up 3.2s ease-in-out infinite 1.5s', color: '#F59E0B' }}>C</div>
              <div className="quiz-bubble left-1/2 -ml-5 top-0" style={{ animation: 'bubble-up 4.2s ease-in-out infinite 0.5s', color: '#EC4899' }}>✓</div>

              {/* Central AI Cpu Engine */}
              <div className="absolute z-30 w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.6)]" style={{ animation: 'float-bot 4s ease-in-out infinite' }}>
                <Cpu className="w-12 h-12 text-white" />
              </div>
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
            <div className="relative border border-white/60 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all overflow-hidden group rounded-3xl p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="relative z-10 space-y-4">
                <div>
                  <h3 className="text-base font-extrabold flex items-center gap-2 text-slate-800 mb-1">
                    <Brain className="w-4 h-4 text-blue-600" />
                    1. Choose Your Learning Topic
                  </h3>
                  <p className="text-xs text-slate-600">
                    Type any programming language, framework, API pattern, or infrastructure subject.
                  </p>
                </div>
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
              </div>
            </div>

            {/* Step 2: Difficulty & Question Count */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Difficulty Selection */}
              <div className="relative border border-white/60 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all overflow-hidden group rounded-3xl p-6 flex flex-col justify-between">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="relative z-10 space-y-4">
                  <div>
                    <h3 className="text-base font-extrabold flex items-center gap-2 text-slate-800 mb-1">
                      <Zap className="w-4 h-4 text-orange-500" />
                      2. Target Difficulty
                    </h3>
                    <p className="text-xs text-slate-600">
                      Calibrates depth of distractors and conceptual traps.
                    </p>
                  </div>
                  <div className="space-y-2.5">
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
                  </div>
                </div>
              </div>

              {/* Number of Questions & Time Estimate */}
              <div className="relative border border-white/60 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all overflow-hidden group rounded-3xl p-6 flex flex-col justify-between">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="relative z-10 space-y-4">
                  <div>
                    <h3 className="text-base font-extrabold flex items-center gap-2 text-slate-800 mb-1">
                      <HelpCircle className="w-4 h-4 text-blue-600" />
                      3. Number of Questions
                    </h3>
                    <p className="text-xs text-slate-600">
                      Select the assessment size and practice duration.
                    </p>
                  </div>
                  <div className="space-y-5">
                  <div className="grid grid-cols-4 gap-3">
                    {QUESTION_COUNTS.map((count) => {
                      const isSelected = numberOfQuestions === count;
                      return (
                        <button
                          key={count}
                          type="button"
                          disabled={isGenerating}
                          onClick={() => setNumberOfQuestions(count)}
                          className={`py-3 rounded-xl border text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#2563EB] border-[#2563EB] text-white shadow-sm'
                              : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A] hover:border-[#2563EB]/40'
                          }`}
                        >
                          <div className="text-xl font-extrabold font-mono">{count}</div>
                          <div className="text-[11px] font-medium opacity-80 mt-0.5">Qs</div>
                        </button>
                      );
                    })}
                    
                    {/* Custom Input */}
                    <div className={`relative col-span-1 flex rounded-xl border transition-all overflow-hidden ${
                       !QUESTION_COUNTS.includes(numberOfQuestions) && numberOfQuestions > 0
                        ? 'bg-[#2563EB] border-[#2563EB] text-white shadow-sm'
                        : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A] hover:border-[#2563EB]/40'
                    }`}>
                      <input
                        type="number"
                        min="1"
                        max="50"
                        disabled={isGenerating}
                        placeholder="Custom"
                        value={numberOfQuestions}
                        onChange={(e) => setNumberOfQuestions(Number(e.target.value) || '')}
                        className="w-full h-full text-center py-3 bg-transparent text-xl font-extrabold font-mono focus:outline-none placeholder:text-sm placeholder:font-sans placeholder:font-medium placeholder:text-current placeholder:opacity-50 appearance-none"
                        style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
                      />
                      <div className="flex flex-col border-l border-current opacity-70 w-8 shrink-0">
                        <button type="button" onClick={() => setNumberOfQuestions(Math.min(50, (Number(numberOfQuestions) || 5) + 1))} className="flex-1 flex items-center justify-center hover:bg-black/10 transition-colors border-b border-current">
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button type="button" onClick={() => setNumberOfQuestions(Math.max(1, (Number(numberOfQuestions) || 5) - 1))} className="flex-1 flex items-center justify-center hover:bg-black/10 transition-colors">
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Estimated metrics & Time Limit */}
                  <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3 text-sm text-[#64748B]">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Clock className="w-4 h-4 text-[#F59E0B]" />
                        Time Limit (Minutes):
                      </span>
                      <div className="flex bg-white rounded-lg border border-[#E2E8F0] overflow-hidden focus-within:border-[#2563EB] transition-colors">
                        <input 
                          type="number"
                          min="1"
                          max="180"
                          disabled={isGenerating}
                          placeholder={`Auto (${Math.max(5, (Number(numberOfQuestions) || 5) * 2)}m)`}
                          value={timeLimit}
                          onChange={(e) => setTimeLimit(e.target.value)}
                          className="w-20 px-3 py-1.5 text-center font-mono font-bold text-[#0F172A] focus:outline-none text-sm appearance-none"
                          style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
                        />
                        <div className="flex flex-col border-l border-[#E2E8F0] w-7 shrink-0 bg-[#F8FAFC]">
                          <button type="button" onClick={() => setTimeLimit(Math.min(180, (Number(timeLimit) || Math.max(5, (Number(numberOfQuestions) || 5) * 2)) + 1))} className="flex-1 flex items-center justify-center hover:bg-[#E2E8F0] transition-colors border-b border-[#E2E8F0]">
                            <ChevronUp className="w-3 h-3 text-[#64748B]" />
                          </button>
                          <button type="button" onClick={() => setTimeLimit(Math.max(1, (Number(timeLimit) || Math.max(5, (Number(numberOfQuestions) || 5) * 2)) - 1))} className="flex-1 flex items-center justify-center hover:bg-[#E2E8F0] transition-colors">
                            <ChevronDown className="w-3 h-3 text-[#64748B]" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-[#E2E8F0]">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Flame className="w-4 h-4 text-[#2563EB]" />
                        Potential XP Reward:
                      </span>
                      <span className="font-mono font-bold text-[#2563EB]">
                        +{(Number(numberOfQuestions) || 5) * 10} XP
                      </span>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Optional Focus / Custom Instructions */}
            <div className="relative border border-white/60 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all overflow-hidden group rounded-3xl p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="relative z-10 space-y-3">
                <h3 className="text-sm font-extrabold flex items-center gap-2 text-slate-800">
                  <Cpu className="w-4 h-4 text-indigo-600" />
                  Custom Focus / Special Instructions (Optional)
                </h3>
                <textarea
                  rows={2}
                  disabled={isGenerating}
                  placeholder="e.g. Focus on memory leaks, async event timing, or tricky interview questions..."
                  value={customInstructions}
                  onChange={(e) => setCustomInstructions(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2E8F0] text-[#111827] placeholder:text-[#94A3B8] text-xs focus:outline-none focus:border-[#2563EB] transition-all resize-none"
                />
              </div>
            </div>

            {/* Generating Live Feedback Modal / State */}
            {isGenerating && (
              <div className="p-6 rounded-3xl border border-blue-200 bg-blue-50/50 backdrop-blur-sm space-y-4 shadow-sm animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border-2 border-blue-600 border-t-transparent animate-spin shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Generating AI Quiz...</h4>
                    <p className="text-xs text-blue-600 mt-0.5">
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
                        idx <= generationStep ? 'bg-blue-600' : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl shadow-lg group mt-6">
              <div className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Cost: <span className="text-slate-800 font-extrabold">1 Generation Credit</span>
              </div>
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Button type="button" onClick={onCancel} variant="secondary" size="md" disabled={isGenerating} className="shadow-sm">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isGenerating}
                  disabled={isGenerating || !topic.trim()}
                  className="w-full sm:w-auto shadow-lg shadow-blue-500/20 bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 cursor-pointer transition-all hover:-translate-y-0.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Quiz with AI</span>
                </Button>
              </div>
            </div>
          </form>
    </div>
  );
}
