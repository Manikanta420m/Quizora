'use client';

import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  Target,
  Clock,
  CheckCircle2,
  AlertCircle,
  Brain,
  Zap,
  BarChart2,
  Sparkles,
  BookOpen,
  Bookmark,
  Play,
  ArrowRight
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { useQuery } from '@tanstack/react-query';
import quizService from '@/services/quizService';
import { useRouter } from 'next/navigation';

export default function StudentProgress({ analyticsData }) {
  const router = useRouter();
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');

  const { data: quizzesResponse } = useQuery({
    queryKey: ['quizzes'],
    queryFn: () => quizService.getQuizzes({}),
  });
  
  const allQuizzes = quizzesResponse?.quizzes || [];
  const recentQuizzes = allQuizzes.slice(0, 3);
  // Mock saved quizzes by taking some from the list
  const savedQuizzes = allQuizzes.length > 2 ? allQuizzes.slice(1, 4) : allQuizzes;

  const summary = analyticsData?.summary || {
    totalAttempts: 24,
    averageScore: 87,
    totalQuestionsAnswered: 238,
    totalXpEarned: 1240,
    totalTimeSpentSeconds: 17280,
  };

  const topics = [
    { name: 'JavaScript', accuracy: 91, attempts: 12, status: 'Mastered' },
    { name: 'Algorithms (DSA)', accuracy: 52, attempts: 8, status: 'Needs Work' },
    { name: 'React Components', accuracy: 78, attempts: 9, status: 'Proficient' },
    { name: 'CSS & Layouts', accuracy: 94, attempts: 5, status: 'Mastered' },
  ];

  const dynamicTopics = useMemo(() => {
    if (allQuizzes.length === 0) return topics;

    const topicMap = {};
    allQuizzes.forEach(quiz => {
      const t = quiz.topic || 'General';
      if (!topicMap[t]) {
        topicMap[t] = { name: t, attempts: 0, _score: 0 };
      }
      topicMap[t].attempts += 1;
      // Deterministic mock accuracy for demo purposes based on topic name length
      topicMap[t]._score += 55 + ((t.length * 7) % 45); 
    });

    return Object.values(topicMap).map(t => {
      const accuracy = Math.min(100, Math.floor(t._score / t.attempts));
      let status = 'Mastered';
      if (accuracy < 65) status = 'Needs Work';
      else if (accuracy < 80) status = 'Proficient';
      return { name: t.name, accuracy, attempts: t.attempts, status };
    }).sort((a, b) => b.attempts - a.attempts);
  }, [allQuizzes]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white shadow-xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-[#38BDF8] border border-blue-400/30 text-xs font-semibold">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Learning Analytics &bull; Long-term Mastery</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          My Progress 📊
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
          Track your accuracy trends, time allocation, and topic mastery curve over time.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-white border-[#E2E8F0] p-5 rounded-3xl shadow-sm">
          <span className="text-xs text-[#64748B] block">Average Accuracy</span>
          <span className="text-3xl font-black font-mono text-[#2563EB] block mt-1">
            {summary.averageScore}%
          </span>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">Top 15% in cohort</span>
        </Card>

        <Card className="bg-white border-[#E2E8F0] p-5 rounded-3xl shadow-sm">
          <span className="text-xs text-[#64748B] block">Total Questions</span>
          <span className="text-3xl font-black font-mono text-[#0F172A] block mt-1">
            {summary.totalQuestionsAnswered}
          </span>
          <span className="text-[11px] text-[#64748B] mt-1 block">208 correct</span>
        </Card>

        <Card className="bg-white border-[#E2E8F0] p-5 rounded-3xl shadow-sm">
          <span className="text-xs text-[#64748B] block">Time Spent</span>
          <span className="text-3xl font-black font-mono text-[#0F172A] block mt-1">
            4.8h
          </span>
          <span className="text-[11px] text-[#64748B] mt-1 block">42s / question avg</span>
        </Card>

        <Card className="bg-white border-[#E2E8F0] p-5 rounded-3xl shadow-sm">
          <span className="text-xs text-[#64748B] block">Pass Rate</span>
          <span className="text-3xl font-black font-mono text-emerald-600 block mt-1">
            96%
          </span>
          <span className="text-[11px] text-[#64748B] mt-1 block">23 of 24 passed</span>
        </Card>
      </div>

      {/* Topics Mastery Table */}
      <Card className="bg-white border-[#E2E8F0] shadow-sm rounded-3xl overflow-hidden p-6 space-y-4">
        <h3 className="font-extrabold text-base text-[#0F172A]">Topic Accuracy Breakdown</h3>
        <div className="space-y-3">
          {dynamicTopics.map((t) => (
            <div key={t.name} className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-[#0F172A]">{t.name} ({t.attempts} quizzes)</span>
                <span className={`font-mono font-bold ${t.accuracy >= 80 ? 'text-emerald-600' : t.accuracy >= 65 ? 'text-amber-600' : 'text-rose-600'}`}>
                  {t.accuracy}% &bull; {t.status}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#E2E8F0] overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    t.accuracy >= 80 ? 'bg-emerald-500' : t.accuracy >= 65 ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${t.accuracy}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quizzes Overview (Recent & Saved) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Quizzes */}
        <Card className="bg-white border-[#E2E8F0] shadow-sm rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-extrabold text-base text-[#0F172A] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#2563EB]" />
              Recent Quizzes
            </h3>
            <Button variant="ghost" size="sm" className="text-xs text-[#2563EB]" onClick={() => router.push('/dashboard?tab=quizzes')}>View All</Button>
          </div>
          <div className="space-y-3">
            {recentQuizzes.length === 0 ? (
              <p className="text-sm text-slate-500">No recent quizzes found.</p>
            ) : (
              recentQuizzes.map(quiz => (
                <div key={`recent-${quiz._id || quiz.id}`} className="flex items-center justify-between p-3 rounded-xl border border-[#E2E8F0] hover:border-[#2563EB]/30 bg-[#F8FAFC] transition-colors">
                  <div className="min-w-0 flex-1 mr-4">
                    <h4 className="font-bold text-sm text-[#0F172A] truncate">{quiz.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="primary" className="text-[10px] py-0">{quiz.difficulty}</Badge>
                      <span className="text-[10px] text-slate-500 truncate">{quiz.topic}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="secondary" className="shrink-0 h-8 px-3 text-xs bg-white text-[#2563EB] hover:bg-blue-50" onClick={() => router.push(`/quizzes/${quiz._id || quiz.id}/play`)}>
                    Play <Play className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Saved Quizzes */}
        <Card className="bg-white border-[#E2E8F0] shadow-sm rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-extrabold text-base text-[#0F172A] flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-emerald-600" />
              Saved Quizzes
            </h3>
            <Button variant="ghost" size="sm" className="text-xs text-[#2563EB]" onClick={() => router.push('/dashboard?tab=quizzes')}>View All</Button>
          </div>
          <div className="space-y-3">
            {savedQuizzes.length === 0 ? (
              <p className="text-sm text-slate-500">No saved quizzes.</p>
            ) : (
              savedQuizzes.map(quiz => (
                <div key={`saved-${quiz._id || quiz.id}`} className="flex items-center justify-between p-3 rounded-xl border border-[#E2E8F0] hover:border-emerald-500/30 bg-[#F8FAFC] transition-colors">
                  <div className="min-w-0 flex-1 mr-4">
                    <h4 className="font-bold text-sm text-[#0F172A] truncate">{quiz.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{quiz.questions?.length || 0} Qs</span>
                      <span className="text-[10px] text-slate-500 truncate">{quiz.topic}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="secondary" className="shrink-0 h-8 px-3 text-xs bg-white text-emerald-600 hover:bg-emerald-50 border-emerald-200" onClick={() => router.push(`/quizzes/${quiz._id || quiz.id}/play`)}>
                    Play <Play className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </Card>

      </div>
    </div>
  );
}
