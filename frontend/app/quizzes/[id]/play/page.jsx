'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Clock,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Flame,
  Award,
  BookOpen,
  LayoutGrid,
  Check,
  HelpCircle,
  Send,
  LogOut,
  ChevronRight,
  ChevronLeft,
  Lightbulb,
  BrainCircuit,
  RefreshCw,
  X,
  Loader2,
  Trophy,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Navbar from '@/components/ui/Navbar';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import quizService from '@/services/quizService';
import aiService from '@/services/aiService';
import { useSound } from '@/context/SoundContext';

export default function QuizPlayerPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = params?.id;
  const { user, token } = useAuth();
  const { playSound } = useSound();
  const queryClient = useQueryClient();

  // Test Runner States
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [questionIdx]: selectedOptionIndex }
  const [timeSpent, setTimeSpent] = useState(0); // in seconds
  const [remainingTime, setRemainingTime] = useState(null); // in seconds
  const [showNavGrid, setShowNavGrid] = useState(false);
  const [results, setResults] = useState(null);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  // Phase 8: Advanced AI States
  const [hints, setHints] = useState({});
  const [loadingHint, setLoadingHint] = useState(false);
  const [openHints, setOpenHints] = useState({});

  const [aiExplanations, setAiExplanations] = useState({});
  const [loadingAiExplain, setLoadingAiExplain] = useState({});
  const [openAiExplain, setOpenAiExplain] = useState({});

  const [similarQuestions, setSimilarQuestions] = useState({});
  const [loadingSimilar, setLoadingSimilar] = useState({});
  const [activeSimilarModal, setActiveSimilarModal] = useState(null);
  const [similarAnswers, setSimilarAnswers] = useState({});
  const [similarChecked, setSimilarChecked] = useState({});

  // Fetch Quiz Data
  const { data: response, isLoading, isError, error } = useQuery({
    queryKey: ['quiz', quizId],
    queryFn: () => quizService.getQuizById(quizId),
    enabled: !!quizId,
  });

  const quiz = response?.quiz;
  const questions = useMemo(() => quiz?.questions || [], [quiz?.questions]);
  const totalQuestions = questions.length;

  // Initialize countdown timer during render when quiz data loads
  const [initializedQuizId, setInitializedQuizId] = useState(null);
  if (quiz && quiz._id !== initializedQuizId) {
    setInitializedQuizId(quiz._id);
    setRemainingTime((quiz.timeLimit || 10) * 60);
  }

  // Submission Mutation
  const submitMutation = useMutation({
    mutationFn: async (submissionData) => {
      return await quizService.submitQuiz(quizId, submissionData, token);
    },
    onSuccess: (data) => {
      setResults(data);
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardQuizzes'] });

      // Audio celebration based on results & newly unlocked badges
      if (data?.newAchievements && data.newAchievements.length > 0) {
        playSound('badge');
      } else if (data?.percentage >= 80) {
        playSound('streak');
      } else if (data?.percentage >= 60) {
        playSound('correct');
      } else {
        playSound('incorrect');
      }
    },
    onError: (err) => {
      alert(err.message || 'Failed to evaluate quiz submission');
    },
  });

  // Format MM:SS
  const formatTime = (secs) => {
    if (secs === null || secs === undefined) return '00:00';
    const m = Math.floor(Math.max(0, secs) / 60);
    const s = Math.max(0, secs) % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Submit Handler
  const handleFinalSubmitRef = useRef(null);

  const handleFinalSubmit = useCallback(() => {
    setShowSubmitConfirm(false);
    if (submitMutation.isPending || results) return;

    const formattedAnswers = Object.entries(userAnswers).map(([qIdx, optIdx]) => ({
      questionIndex: Number(qIdx),
      selectedOption: Number(optIdx),
      timeSpentSeconds: 0,
    }));

    submitMutation.mutate({
      answers: formattedAnswers,
      timeSpentSeconds: timeSpent,
    });
  }, [submitMutation, results, userAnswers, timeSpent]);

  useEffect(() => {
    handleFinalSubmitRef.current = handleFinalSubmit;
  });

  // Live Timer Countdown Hook
  useEffect(() => {
    if (results || remainingTime === null) return;

    const timer = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinalSubmitRef.current?.(); // Auto-submit when time expires
          return 0;
        }
        if (prev <= 10) {
          playSound('timer');
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [results, remainingTime, playSound]);

  // Option selection
  const handleSelectOption = useCallback((optIndex) => {
    if (results || submitMutation.isPending) return;
    playSound('click');
    setUserAnswers((prev) => ({
      ...prev,
      [currentIdx]: optIndex,
    }));
  }, [results, submitMutation.isPending, playSound, currentIdx]);

  const isHintOpen = !!openHints[currentIdx] && !!hints[currentIdx];

  // Phase 8: Interactive AI Hint Request
  const handleRequestHint = async () => {
    if (hints[currentIdx]) {
      setOpenHints((prev) => ({ ...prev, [currentIdx]: !prev[currentIdx] }));
      return;
    }

    if (!questions[currentIdx]) return;
    setLoadingHint(true);
    try {
      const res = await aiService.getHint(
        {
          question: questions[currentIdx].question,
          options: questions[currentIdx].options,
          topic: quiz?.topic,
        },
        token
      );
      if (res?.data?.hint) {
        setHints((prev) => ({ ...prev, [currentIdx]: res.data.hint }));
        setOpenHints((prev) => ({ ...prev, [currentIdx]: true }));
      }
    } catch (err) {
      alert(err.message || 'Failed to generate hint');
    } finally {
      setLoadingHint(false);
    }
  };

  // Phase 8: Deep AI Explanation Request
  const handleRequestExplanation = async (idx, item) => {
    if (openAiExplain[idx]) {
      setOpenAiExplain((prev) => ({ ...prev, [idx]: false }));
      return;
    }

    if (aiExplanations[idx]) {
      setOpenAiExplain((prev) => ({ ...prev, [idx]: true }));
      return;
    }

    setLoadingAiExplain((prev) => ({ ...prev, [idx]: true }));
    try {
      const res = await aiService.getExplanation(
        {
          question: item.question,
          options: item.options,
          correctAnswer: item.correctAnswer,
          selectedOption: item.selectedOption,
          topic: quiz?.topic,
        },
        token
      );
      if (res?.data) {
        setAiExplanations((prev) => ({ ...prev, [idx]: res.data }));
        setOpenAiExplain((prev) => ({ ...prev, [idx]: true }));
      }
    } catch (err) {
      alert(err.message || 'Failed to load AI explanation');
    } finally {
      setLoadingAiExplain((prev) => ({ ...prev, [idx]: false }));
    }
  };

  // Phase 8: Practice Similar Question Request
  const handleRequestSimilar = async (idx, item) => {
    if (similarQuestions[idx]) {
      setActiveSimilarModal(idx);
      return;
    }

    setLoadingSimilar((prev) => ({ ...prev, [idx]: true }));
    try {
      const res = await aiService.getSimilarQuestion(
        {
          question: item.question,
          topic: quiz?.topic,
          difficulty: quiz?.difficulty || 'medium',
        },
        token
      );
      if (res?.data) {
        setSimilarQuestions((prev) => ({ ...prev, [idx]: res.data }));
        setActiveSimilarModal(idx);
      }
    } catch (err) {
      alert(err.message || 'Failed to generate similar question');
    } finally {
      setLoadingSimilar((prev) => ({ ...prev, [idx]: false }));
    }
  };

  // Check user answer for the similar question
  const handleCheckSimilar = (idx) => {
    setSimilarChecked((prev) => ({ ...prev, [idx]: true }));
  };

  // Keyboard navigation & option selection shortcuts
  useEffect(() => {
    if (results || showExitConfirm || showSubmitConfirm) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' && currentIdx < totalQuestions - 1) {
        setCurrentIdx((prev) => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentIdx > 0) {
        setCurrentIdx((prev) => prev - 1);
      } else if (['1', '2', '3', '4'].includes(e.key)) {
        const opt = parseInt(e.key, 10) - 1;
        if (questions[currentIdx]?.options?.[opt]) {
          handleSelectOption(opt);
        }
      } else if (['a', 'b', 'c', 'd'].includes(e.key.toLowerCase())) {
        const map = { a: 0, b: 1, c: 2, d: 3 };
        const opt = map[e.key.toLowerCase()];
        if (questions[currentIdx]?.options?.[opt]) {
          handleSelectOption(opt);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIdx, totalQuestions, questions, results, showExitConfirm, showSubmitConfirm, handleSelectOption]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-transparent text-[#111827]">
        <Navbar />
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-20 flex flex-col items-center justify-center space-y-4">
          <div className="w-10 h-10 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-[#64748B]">Loading quiz environment...</p>
        </main>
      </div>
    );
  }

  if (isError || !quiz) {
    return (
      <div className="min-h-screen flex flex-col bg-transparent text-[#111827]">
        <Navbar />
        <main className="flex-1 max-w-lg w-full mx-auto px-4 py-20 text-center space-y-4">
          <AlertTriangle className="w-10 h-10 text-[#EF4444] mx-auto" />
          <h2 className="text-xl font-bold text-[#0F172A]">Quiz Unavailable</h2>
          <p className="text-xs text-[#64748B]">{error?.message || 'Could not load quiz questions.'}</p>
          <Link href="/quizzes">
            <Button variant="secondary" size="md">Back to Catalog</Button>
          </Link>
        </main>
      </div>
    );
  }

  const currentQ = questions[currentIdx];
  const answeredCount = Object.keys(userAnswers).length;
  const progressPercent = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;
  const isTimeCritical = remainingTime !== null && remainingTime <= 120; // less than 2 mins
  const isTimeUrgent = remainingTime !== null && remainingTime <= 30; // less than 30s

  // -------------------------------------------------------------
  // VIEW: Results & Review Screen (Displayed upon submission)
  // -------------------------------------------------------------
  if (results) {
    const isPassed = results.passed;
    const score = results.score;
    const total = results.totalQuestions;
    const percent = results.percentage;
    const xpEarned = results.xpEarned;
    const questionBreakdown = results.questionResults || [];

    return (
      <div className="min-h-screen flex flex-col bg-transparent text-[#111827] selection:bg-[#2563EB]/15">
        <Navbar />

        <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 space-y-8">
          {/* Score Celebration Card */}
          <Card className="border-[#E2E8F0] bg-white shadow-md p-6 sm:p-8 text-center space-y-6 relative overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_90%)]"
              style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
              aria-hidden="true"
            />
            <div className="relative z-10 space-y-2">
              <Badge variant={isPassed ? 'success' : 'warning'} className="text-xs uppercase tracking-wider py-1 px-3">
                {isPassed ? 'Mastery Milestone Achieved' : 'Practice Completed'}
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                {isPassed ? 'Congratulations! Quiz Passed' : 'Good Effort! Keep Practicing'}
              </h1>
              <p className="text-sm text-[#64748B] max-w-md mx-auto">
                {quiz.title} • {quiz.topic}
              </p>
            </div>

            {/* Score Radial Metric */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-2">
              <div className="w-32 h-32 rounded-full border-4 border-[#2563EB]/20 bg-[#F8FAFC] flex flex-col items-center justify-center shadow-xs">
                <span className="text-4xl font-extrabold font-mono text-[#0F172A]">{percent}%</span>
                <span className="text-[11px] text-[#64748B] font-medium">Score</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-left w-full max-w-xs">
                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <div className="text-[11px] text-[#64748B]">Correct Answers</div>
                  <div className="text-lg font-bold font-mono text-emerald-600">
                    {score} / {total}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <div className="text-[11px] text-[#64748B]">XP Awarded</div>
                  <div className="text-lg font-bold font-mono text-[#2563EB] flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-[#38BDF8]" />
                    +{xpEarned} XP
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <div className="text-[11px] text-[#64748B]">Time Taken</div>
                  <div className="text-lg font-bold font-mono text-amber-700">
                    {formatTime(timeSpent)}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <div className="text-[11px] text-[#64748B]">Daily Streak</div>
                  <div className="text-lg font-bold font-mono text-amber-700 flex items-center gap-1">
                    <Flame className="w-4 h-4 text-[#F59E0B]" />
                    Active
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 10: Newly Unlocked Badges Celebration Banner */}
            {results.newAchievements && results.newAchievements.length > 0 && (
              <div className="p-4 rounded-2xl bg-amber-50/90 border-2 border-amber-300 shadow-sm text-left space-y-3 animate-in zoom-in-95 duration-300">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-600 animate-bounce" />
                  <h3 className="text-sm font-extrabold text-amber-800 tracking-wide uppercase">
                    🎉 Achievement{results.newAchievements.length > 1 ? 's' : ''} Unlocked!
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {results.newAchievements.map((ach, aIdx) => (
                    <div
                      key={aIdx}
                      className="p-3 rounded-xl bg-white border border-amber-200 flex items-center gap-3 shadow-2xs"
                    >
                      <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 font-bold shrink-0">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#0F172A]">{ach.title}</span>
                          <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded bg-amber-50 text-amber-700 border border-amber-200">
                            {ach.tier}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#64748B] leading-tight mt-0.5">{ach.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Button
                variant="secondary"
                size="md"
                onClick={() => {
                  setResults(null);
                  setUserAnswers({});
                  setCurrentIdx(0);
                  setTimeSpent(0);
                  setRemainingTime((quiz.timeLimit || 10) * 60);
                }}
                className="gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Retake Quiz
              </Button>
              <Link href="/dashboard">
                <Button variant="primary" size="md">
                  View Profile & Streak
                </Button>
              </Link>
              <Link href="/quizzes">
                <Button variant="outline" size="md">
                  Explore More Quizzes
                </Button>
              </Link>
            </div>
          </Card>

          {/* Question-by-Question Detailed Review */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
              <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#2563EB]" />
                Question-by-Question Review ({questionBreakdown.length})
              </h2>
              <span className="text-xs text-[#64748B]">Detailed answers & explanations</span>
            </div>

            <div className="space-y-4">
              {questionBreakdown.map((item, idx) => {
                const wasCorrect = item.isCorrect;
                const wasAnswered = item.selectedOption >= 0;

                return (
                  <Card
                    key={idx}
                    className={`border transition-all p-5 space-y-4 ${
                      wasCorrect
                        ? 'border-emerald-200 bg-white'
                        : 'border-rose-200 bg-white'
                    }`}
                  >
                    {/* Question Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-center text-xs font-bold text-[#0F172A] shrink-0">
                          {idx + 1}
                        </span>
                        <Badge variant={wasCorrect ? 'success' : 'danger'} className="text-[10px]">
                          {wasCorrect ? 'Correct (+10 XP)' : wasAnswered ? 'Incorrect (0 XP)' : 'Unanswered (0 XP)'}
                        </Badge>
                      </div>

                      {wasCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                    </div>

                    {/* Question Prompt */}
                    <p className="text-sm font-semibold text-[#0F172A] leading-relaxed">
                      {item.question}
                    </p>

                    {/* Options List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {item.options.map((optText, optIdx) => {
                        const isChosen = item.selectedOption === optIdx;
                        const isRightAnswer = item.correctAnswer === optIdx;
                        const letter = String.fromCharCode(65 + optIdx);

                        let cardStyle = 'bg-white border-[#E2E8F0] text-[#64748B]';
                        if (isRightAnswer) {
                          cardStyle = 'bg-emerald-50 border-[#22C55E] text-emerald-900 font-semibold';
                        } else if (isChosen && !isRightAnswer) {
                          cardStyle = 'bg-rose-50 border-[#EF4444] text-rose-900 line-through';
                        }

                        return (
                          <div
                            key={optIdx}
                            className={`p-3 rounded-xl border text-xs flex items-center gap-2.5 ${cardStyle}`}
                          >
                            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center font-bold text-[10px] shrink-0">
                              {letter}
                            </span>
                            <span className="flex-1">{optText}</span>
                            {isRightAnswer && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation Box */}
                    <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-100 text-xs text-[#111827] space-y-1">
                      <div className="font-semibold text-[#2563EB] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
                        Explanation:
                      </div>
                      <p className="leading-relaxed text-[#0F172A]">{item.explanation}</p>
                    </div>

                    {/* Phase 8: Advanced AI Actions */}
                    <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#E2E8F0]">
                      <button
                        type="button"
                        onClick={() => handleRequestExplanation(idx, item)}
                        disabled={loadingAiExplain[idx]}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all cursor-pointer ${
                          openAiExplain[idx]
                            ? 'bg-blue-50 text-[#2563EB] border-blue-300 shadow-xs'
                            : 'bg-white hover:bg-[#F8FAFC] text-[#2563EB] border-[#E2E8F0] hover:border-[#2563EB]'
                        }`}
                      >
                        {loadingAiExplain[idx] ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-[#2563EB]" />
                        ) : (
                          <BrainCircuit className="w-3.5 h-3.5 text-[#38BDF8]" />
                        )}
                        <span>{loadingAiExplain[idx] ? 'Analyzing...' : openAiExplain[idx] ? 'Hide AI Deep Dive' : '🤖 AI Deep Dive'}</span>
                      </button>

                      {!wasCorrect && (
                        <button
                          type="button"
                          onClick={() => handleRequestSimilar(idx, item)}
                          disabled={loadingSimilar[idx]}
                          className="px-3 py-1.5 rounded-xl text-xs font-medium border bg-white hover:bg-[#F8FAFC] text-amber-700 border-[#E2E8F0] hover:border-amber-400 flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          {loadingSimilar[idx] ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-600" />
                          ) : (
                            <RefreshCw className="w-3.5 h-3.5 text-amber-600" />
                          )}
                          <span>{loadingSimilar[idx] ? 'Crafting Question...' : '🔁 Practice Similar Question'}</span>
                        </button>
                      )}
                    </div>

                    {/* Phase 8: AI Deep Dive Expanded Breakdown */}
                    {openAiExplain[idx] && aiExplanations[idx] && (
                      <div className="p-4 rounded-xl bg-[#F8FAFC] border border-blue-200 text-xs space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
                          <span className="font-bold text-[#0F172A] flex items-center gap-1.5">
                            <BrainCircuit className="w-4 h-4 text-[#2563EB]" />
                            Deep Pedagogical Breakdown
                          </span>
                          <span className="text-[10px] font-mono text-[#2563EB] px-2 py-0.5 rounded bg-blue-50 border border-blue-200">
                            {aiExplanations[idx].concept || 'Core Concept'}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-950 leading-relaxed">
                            <strong className="text-emerald-700 block mb-0.5">Why this option is correct:</strong>
                            {aiExplanations[idx].whyCorrect}
                          </div>

                          <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-950 leading-relaxed">
                            <strong className="text-amber-800 block mb-0.5">Distractor & Trap Analysis:</strong>
                            {aiExplanations[idx].distractorAnalysis}
                          </div>

                          {aiExplanations[idx].mnemonic && (
                            <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-[#0F172A] leading-relaxed flex items-start gap-2">
                              <Lightbulb className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-[#2563EB] block mb-0.5">Rule of Thumb / Memory Hook:</strong>
                                {aiExplanations[idx].mnemonic}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Phase 8: Inline Similar Question Practice Challenge */}
                    {activeSimilarModal === idx && similarQuestions[idx] && (
                      <div className="p-4 rounded-xl bg-white border border-amber-300 text-xs space-y-3 animate-in fade-in slide-in-from-top-2 duration-200 shadow-sm">
                        <div className="flex items-center justify-between pb-2 border-b border-amber-100">
                          <span className="font-bold text-amber-800 flex items-center gap-1.5">
                            <RefreshCw className="w-4 h-4 text-amber-600" />
                            Retention Practice Challenge
                          </span>
                          <button
                            type="button"
                            onClick={() => setActiveSimilarModal(null)}
                            className="text-[#64748B] hover:text-[#0F172A] cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="font-semibold text-[#0F172A] leading-relaxed">
                          {similarQuestions[idx].question}
                        </p>

                        <div className="space-y-2 pt-1">
                          {similarQuestions[idx].options.map((optText, sOptIdx) => {
                            const isChosen = similarAnswers[idx] === sOptIdx;
                            const isSubmitted = similarChecked[idx];
                            const isCorrectOpt = similarQuestions[idx].correctAnswer === sOptIdx;
                            const letter = String.fromCharCode(65 + sOptIdx);

                            let btnStyle = 'bg-white border-[#E2E8F0] text-[#111827] hover:border-[#CBD5E1]';
                            if (isSubmitted) {
                              if (isCorrectOpt) btnStyle = 'bg-emerald-50 border-[#22C55E] text-emerald-900 font-semibold';
                              else if (isChosen && !isCorrectOpt) btnStyle = 'bg-rose-50 border-[#EF4444] text-rose-900 line-through';
                            } else if (isChosen) {
                              btnStyle = 'bg-blue-50 border-[#2563EB] text-[#0F172A]';
                            }

                            return (
                              <button
                                key={sOptIdx}
                                type="button"
                                disabled={isSubmitted}
                                onClick={() => setSimilarAnswers((prev) => ({ ...prev, [idx]: sOptIdx }))}
                                className={`w-full p-2.5 rounded-lg border text-left flex items-center gap-2.5 transition-all cursor-pointer ${btnStyle}`}
                              >
                                <span className="w-5 h-5 rounded-md border border-current flex items-center justify-center font-bold text-[10px] shrink-0">
                                  {letter}
                                </span>
                                <span className="flex-1">{optText}</span>
                                {isSubmitted && isCorrectOpt && <Check className="w-4 h-4 text-emerald-600" />}
                              </button>
                            );
                          })}
                        </div>

                        {/* Submit or Result Feedback */}
                        {!similarChecked[idx] ? (
                          <div className="flex justify-end pt-2">
                            <Button
                              variant="primary"
                              size="sm"
                              disabled={similarAnswers[idx] === undefined}
                              onClick={() => handleCheckSimilar(idx)}
                              className="text-xs"
                            >
                              Check Answer
                            </Button>
                          </div>
                        ) : (
                          <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs space-y-1.5 pt-2">
                            <div className="flex items-center gap-1.5 font-bold">
                              {similarAnswers[idx] === similarQuestions[idx].correctAnswer ? (
                                <span className="text-emerald-600 flex items-center gap-1">
                                  <CheckCircle2 className="w-4 h-4" /> Correct! Concept mastered (+10 XP)
                                </span>
                              ) : (
                                <span className="text-rose-600 flex items-center gap-1">
                                  <XCircle className="w-4 h-4" /> Not quite. Review the explanation below:
                                </span>
                              )}
                            </div>
                            <p className="text-[#64748B] leading-relaxed">
                              {similarQuestions[idx].explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW: Active Test Runner Interface
  // -------------------------------------------------------------
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-transparent text-[#111827] selection:bg-[#2563EB]/15">
        {/* Top Minimal Test HUD */}
        <header className="sticky top-0 z-40 border-b border-[#E2E8F0] bg-white/95 backdrop-blur-md shadow-2xs">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
            {/* Left: Exit & Quiz Info */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowExitConfirm(true)}
                className="p-2 rounded-xl text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                title="Exit Test"
              >
                <LogOut className="w-4 h-4" />
              </button>
              <div className="hidden sm:block">
                <div className="text-xs font-bold text-[#0F172A] truncate max-w-[200px] md:max-w-xs">
                  {quiz.title}
                </div>
                <div className="text-[11px] text-[#64748B] capitalize">{quiz.topic} • {quiz.difficulty}</div>
              </div>
            </div>

            {/* Center: Question Counter & Navigator Trigger */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowNavGrid(!showNavGrid)}
                className="px-3 py-1.5 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#2563EB] text-xs font-medium text-[#0F172A] flex items-center gap-2 cursor-pointer transition-all shadow-2xs"
              >
                <LayoutGrid className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>
                  Question <strong className="text-[#2563EB]">{currentIdx + 1}</strong> of {totalQuestions}
                </span>
              </button>
            </div>

            {/* Right: Live Countdown Timer & Submit Button */}
            <div className="flex items-center gap-3">
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all ${
                  isTimeUrgent
                    ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse'
                    : isTimeCritical
                    ? 'bg-amber-50 border-amber-300 text-amber-800'
                    : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#2563EB]'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTime(remainingTime)}</span>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowSubmitConfirm(true)}
                isLoading={submitMutation.isPending}
                className="text-xs shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit</span>
              </Button>
            </div>
          </div>

          {/* Linear Progress Bar (Track: #E2E8F0, Progress: #2563EB) */}
          <div className="w-full h-1.5 bg-[#E2E8F0]">
            <div
              className="h-full bg-[#2563EB] transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </header>

        {/* Exit Confirmation Modal */}
        {showExitConfirm && (
          <div className="fixed inset-0 z-50 bg-[#0F172A]/40 backdrop-blur-sm flex items-center justify-center p-4">
            <Card className="max-w-sm w-full border-[#E2E8F0] bg-white p-6 space-y-4 shadow-xl">
              <h3 className="text-base font-bold text-[#0F172A]">Leave Quiz in Progress?</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                If you exit now, your current answers will not be recorded and you will forfeit any XP rewards for this attempt.
              </p>
              <div className="flex items-center justify-end gap-2 pt-2">
                <Button variant="secondary" size="sm" onClick={() => setShowExitConfirm(false)}>
                  Continue Quiz
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => router.push(`/quizzes/${quizId}`)}
                >
                  Exit Quiz
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Submit Confirmation Modal */}
        {showSubmitConfirm && (
          <div className="fixed inset-0 z-50 bg-[#0F172A]/40 backdrop-blur-sm flex items-center justify-center p-4">
            <Card className="max-w-md w-full border-[#E2E8F0] bg-white p-6 space-y-4 shadow-xl">
              <h3 className="text-base font-bold text-[#0F172A]">Submit Quiz for Scoring?</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">
                You have answered <strong className="text-[#2563EB]">{answeredCount}</strong> of{' '}
                <strong className="text-[#0F172A]">{totalQuestions}</strong> questions.
                {answeredCount < totalQuestions && (
                  <span className="block text-amber-700 font-medium mt-1">
                    Warning: You still have {totalQuestions - answeredCount} unanswered questions!
                  </span>
                )}
              </p>
              <div className="flex items-center justify-end gap-2 pt-2">
                <Button variant="secondary" size="sm" onClick={() => setShowSubmitConfirm(false)}>
                  Review Answers
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleFinalSubmit}
                  isLoading={submitMutation.isPending}
                >
                  Confirm & Grade
                </Button>
              </div>
            </Card>
          </div>
        )}

        <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 space-y-6">
          {/* Question Navigator Drawer / Grid (Collapsible) */}
          {showNavGrid && (
            <Card className="border-[#E2E8F0] bg-white p-5 space-y-3 shadow-md">
              <div className="flex items-center justify-between text-xs text-[#64748B]">
                <span className="font-semibold text-[#0F172A]">Question Quick Jump</span>
                <div className="flex items-center gap-3 text-[11px]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />
                    Answered ({answeredCount})
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
                    Unanswered ({totalQuestions - answeredCount})
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {questions.map((_, idx) => {
                  const isAnswered = userAnswers[idx] !== undefined;
                  const isCurrent = currentIdx === idx;

                  let style = 'bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0] hover:text-[#0F172A] hover:bg-[#F1F5F9]';
                  if (isCurrent) {
                    style = 'bg-[#2563EB] text-white ring-2 ring-blue-300 font-bold border-[#2563EB] shadow-2xs';
                  } else if (isAnswered) {
                    style = 'bg-blue-50 text-[#2563EB] border-blue-200 font-semibold';
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setCurrentIdx(idx);
                        setShowNavGrid(false);
                      }}
                      className={`w-9 h-9 rounded-xl border text-xs font-mono transition-all cursor-pointer ${style}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </Card>
          )}

          {/* Active Question Card */}
          <Card className="border-[#E2E8F0] bg-white shadow-xs p-6 sm:p-8 space-y-6 rounded-2xl">
            {/* Question Header & Prompt */}
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-mono font-bold text-[#2563EB] uppercase tracking-wider">
                  Question {currentIdx + 1} of {totalQuestions}
                </span>

                {/* AI Hint Trigger Button */}
                <button
                  type="button"
                  onClick={handleRequestHint}
                  disabled={loadingHint}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all cursor-pointer ${
                    isHintOpen
                      ? 'bg-amber-50 text-amber-800 border-amber-300 shadow-2xs'
                      : 'bg-white hover:bg-[#F8FAFC] text-amber-700 hover:text-amber-800 border-[#E2E8F0] hover:border-amber-300'
                  }`}
                >
                  {loadingHint ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-600" />
                  ) : (
                    <Lightbulb className="w-3.5 h-3.5 fill-amber-400/30 text-amber-600" />
                  )}
                  <span>{loadingHint ? 'Generating Hint...' : isHintOpen ? 'Hide Hint' : 'Need a Hint?'}</span>
                </button>
              </div>

              {/* Collapsible AI Hint Callout */}
              {isHintOpen && hints[currentIdx] && (
                <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 shadow-2xs animate-in fade-in slide-in-from-top-2 duration-200 space-y-1.5 relative">
                  <div className="flex items-center justify-between font-semibold text-amber-800">
                    <span className="flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4 text-amber-600 fill-amber-400/20" />
                      AI Conceptual Clue:
                    </span>
                    <button
                      type="button"
                      onClick={() => setOpenHints((prev) => ({ ...prev, [currentIdx]: false }))}
                      className="text-amber-700 hover:text-amber-900 cursor-pointer p-0.5 rounded hover:bg-amber-100"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="leading-relaxed text-amber-950 pl-5.5">
                    {hints[currentIdx]}
                  </p>
                </div>
              )}

              <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] leading-relaxed">
                {currentQ?.question}
              </h2>
            </div>

            {/* 4 Multi-Choice Option Cards */}
            <div className="grid grid-cols-1 gap-3 pt-2">
              {currentQ?.options?.map((optionText, optIdx) => {
                const isSelected = userAnswers[currentIdx] === optIdx;
                const optionLetter = String.fromCharCode(65 + optIdx);

                return (
                  <div
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 select-none ${
                      isSelected
                        ? 'bg-[#EFF6FF] border-[#2563EB] shadow-xs ring-1 ring-[#2563EB]/30 text-[#0F172A]'
                        : 'bg-white border-[#E2E8F0] hover:border-[#CBD5E1] text-[#111827] hover:bg-[#F8FAFC]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-7 h-7 rounded-lg border text-xs font-mono font-bold flex items-center justify-center shrink-0 transition-all ${
                          isSelected
                            ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-2xs'
                            : 'bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0]'
                        }`}
                      >
                        {optionLetter}
                      </div>
                      <span className="text-sm leading-relaxed font-medium">{optionText}</span>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                        isSelected
                          ? 'border-[#2563EB] bg-[#2563EB] text-white'
                          : 'border-[#CBD5E1] bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Bottom Runner Controls */}
          <div className="flex items-center justify-between pt-2">
            <Button
              variant="secondary"
              size="md"
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
              className="gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </Button>

            <div className="flex items-center gap-2">
              {currentIdx < totalQuestions - 1 ? (
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setCurrentIdx((prev) => Math.min(totalQuestions - 1, prev + 1))}
                  className="gap-1.5"
                >
                  <span>Next Question</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setShowSubmitConfirm(true)}
                  isLoading={submitMutation.isPending}
                  className="gap-1.5 shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Quiz</span>
                </Button>
              )}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
