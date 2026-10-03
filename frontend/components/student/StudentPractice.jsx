'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Target,
  Sparkles,
  Zap,
  Brain,
  Flame,
  Clock,
  Layers,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  BookOpen,
  ChevronDown
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { useQuery } from '@tanstack/react-query';
import quizService from '@/services/quizService';
import { useAuth } from '@/context/AuthContext';

export default function StudentPractice({ onNavigateTab }) {
  const router = useRouter();
  const { token } = useAuth();
  const [selectedDrill, setSelectedDrill] = useState(null);
  const [speedDrillTime, setSpeedDrillTime] = useState(1);
  const [sourceQuizId, setSourceQuizId] = useState('');
  const [isGeneratingWeakPractice, setIsGeneratingWeakPractice] = useState(false);

  // Fetch real quizzes from the backend
  const { data: quizzesResponse, isLoading } = useQuery({
    queryKey: ['quizzes'],
    queryFn: () => quizService.getQuizzes({}),
  });

  const myQuizzes = quizzesResponse?.quizzes || [];

  const handleSimulateAction = (modeId) => {
    if (!sourceQuizId) return;
    setSelectedDrill(modeId);
    setTimeout(() => {
      setSelectedDrill(null);
      router.push(`/quizzes/${sourceQuizId}/play?mode=${modeId}`);
    }, 1200);
  };

  const handleWeakTopicDrill = async () => {
    if (!sourceQuizId) return;
    const selectedQuiz = myQuizzes.find(q => (q._id || q.id) === sourceQuizId);
    if (!selectedQuiz) return;

    setSelectedDrill('weak-topics');
    setIsGeneratingWeakPractice(true);

    try {
      const payload = {
        topic: selectedQuiz.topic + " (Remediation)",
        difficulty: 'hard',
        numberOfQuestions: 10,
      };
      
      const res = await quizService.generateQuiz(payload, token);

      const newQuizId = res.quiz?._id || res.quiz?.id || res._id || res.id;
      if (newQuizId) {
        router.push(`/quizzes/${newQuizId}/play?mode=weak-topics`);
      } else {
        throw new Error("No quiz ID returned");
      }
    } catch (err) {
      console.error('Generation failed, using original quiz:', err);
      router.push(`/quizzes/${sourceQuizId}/play?mode=weak-topics`);
    } finally {
      setSelectedDrill(null);
      setIsGeneratingWeakPractice(false);
    }
  };

  const practiceModes = [
    {
      id: 'weak-topics',
      title: '🎯 Weak Topic Remediation',
      desc: 'Let AI target your lowest scoring areas based on your recent analytics.',
      tag: 'Recommended',
      badgeColor: 'danger',
      actionText: 'Launch Adaptive Drill',
      action: handleWeakTopicDrill,
    },
    {
      id: 'mistakes-review',
      title: '🧠 Learn from Mistakes',
      desc: 'Revisit the questions you got wrong recently. AI provides hints and step-by-step explanations.',
      tag: 'High Impact',
      badgeColor: 'warning',
      actionText: 'Review Wrong Answers',
      action: () => handleSimulateAction('mistakes-review'),
    },
    {
      id: 'speed-drill',
      title: '⚡ Time Attack Drills',
      desc: 'Fast-paced multiple choice showdown. Test your recall under pressure.',
      tag: 'Bonus XP',
      badgeColor: 'primary',
      actionText: 'Start Speed Drill',
      action: () => {
        if (!sourceQuizId) return;
        router.push(`/quizzes/${sourceQuizId}/play?mode=speed&time=${speedDrillTime}`);
      },
      hasTimeSelector: true,
    },
    {
      id: 'flashcards',
      title: '🃏 Interactive Flashcards',
      desc: 'Rapidly flip through concept definitions, syntax flashcards, and algorithm steps.',
      tag: 'Study',
      badgeColor: 'success',
      actionText: 'Open Flashcards',
      action: () => {
        if (!sourceQuizId) return;
        const selectedQuiz = myQuizzes.find(q => (q._id || q.id) === sourceQuizId);
        if (selectedQuiz) {
          localStorage.setItem('pendingFlashcardTopic', selectedQuiz.topic);
          onNavigateTab('generate_flashcards');
        }
      },
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white shadow-xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-[#38BDF8] border border-blue-400/30 text-xs font-semibold">
          <Target className="w-3.5 h-3.5" />
          <span>Interactive Practice Studio &bull; Master Weak Spots</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Practice Hub 🎯
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
          Choose a targeted workout mode to reinforce difficult concepts, build automatic recall, and boost your quiz accuracy.
        </p>
      </div>

      {/* Source Quiz Selector */}
      <Card className="bg-white border-[#E2E8F0] shadow-sm p-6 rounded-3xl space-y-4">
        <label className="text-sm font-extrabold text-[#0F172A] flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#2563EB]" />
          Select Source Quiz (Recent or Saved)
        </label>
        <div className="relative">
          <select
            value={sourceQuizId}
            onChange={(e) => setSourceQuizId(e.target.value)}
            className="w-full pl-4 pr-12 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all text-sm appearance-none cursor-pointer font-medium text-[#0F172A]"
          >
            <option value="" disabled>Select a quiz to practice with...</option>
            {isLoading ? (
              <option value="" disabled>Loading your quizzes...</option>
            ) : myQuizzes.length > 0 ? (
              myQuizzes.map(quiz => (
                <option key={quiz._id || quiz.id} value={quiz._id || quiz.id}>
                  {quiz.title} ({quiz.topic})
                </option>
              ))
            ) : (
              <option value="" disabled>No quizzes found.</option>
            )}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
      </Card>

      {/* Practice Modes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {practiceModes.map((mode) => (
          <Card
            key={mode.id}
            className="bg-white border-[#E2E8F0] hover:border-[#2563EB]/40 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant={mode.badgeColor} className="text-[10px] font-bold">
                  {mode.tag}
                </Badge>
                <Sparkles className="w-4 h-4 text-[#2563EB]" />
              </div>
              <h3 className="text-lg font-black text-[#0F172A]">{mode.title}</h3>
              <p className="text-xs text-[#64748B] leading-relaxed">{mode.desc}</p>
            </div>

              {mode.hasTimeSelector && (
                <div className="flex bg-[#F8FAFC] border border-[#E2E8F0] p-1 rounded-xl">
                  {[1, 3, 5].map(min => (
                    <button
                      key={min}
                      onClick={() => setSpeedDrillTime(min)}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                        speedDrillTime === min 
                          ? 'bg-white text-[#2563EB] shadow-sm border border-[#E2E8F0]' 
                          : 'text-[#64748B] hover:text-[#0F172A]'
                      }`}
                    >
                      {min} Min
                    </button>
                  ))}
                </div>
              )}

            <Button
              variant="primary"
              size="sm"
              onClick={mode.action}
              disabled={selectedDrill === mode.id || !sourceQuizId}
              className={`w-full text-xs gap-1.5 cursor-pointer shadow-sm ${!sourceQuizId ? 'bg-slate-100 text-slate-400 hover:bg-slate-100' : 'bg-[#2563EB] hover:bg-[#1D4ED8]'}`}
            >
              {selectedDrill === mode.id ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <span>{!sourceQuizId ? 'Select Quiz First' : mode.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
