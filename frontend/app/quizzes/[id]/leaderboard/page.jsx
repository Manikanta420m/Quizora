'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Trophy, ArrowLeft, Loader2, AlertTriangle, Medal, Clock } from 'lucide-react';
import Navbar from '@/components/ui/Navbar';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import quizService from '@/services/quizService';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function QuizLeaderboardPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = params?.id;
  const { user } = useAuth();

  // Fetch Quiz Data
  const { data: quizResponse, isLoading: quizLoading } = useQuery({
    queryKey: ['quiz', quizId],
    queryFn: () => quizService.getQuizById(quizId),
    enabled: !!quizId,
  });
  const quiz = quizResponse?.quiz;

  // Fetch Leaderboard Data
  const { data: leaderboardResponse, isLoading: leaderboardLoading } = useQuery({
    queryKey: ['quizLeaderboard', quizId],
    queryFn: () => quizService.getQuizLeaderboard(quizId),
    enabled: !!quizId,
    refetchInterval: 15000, // Refresh every 15s
  });
  const leaderboard = leaderboardResponse?.leaderboard || [];

  const formatTime = (secs) => {
    if (secs === null || secs === undefined) return '--:--';
    const m = Math.floor(Math.max(0, secs) / 60);
    const s = Math.max(0, secs) % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#111827]">
        <Navbar />

        <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 space-y-6">
          {/* Header Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => router.back()}
              className="px-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-xl font-bold text-[#0F172A]">Quiz Leaderboard</h1>
          </div>

          {(quizLoading || leaderboardLoading) ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <Loader2 className="w-8 h-8 text-[#2563EB] animate-spin" />
              <p className="text-sm text-[#64748B]">Loading rankings...</p>
            </div>
          ) : !quiz ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center">
              <AlertTriangle className="w-10 h-10 text-[#EF4444]" />
              <h2 className="text-lg font-bold">Quiz Not Found</h2>
              <Button variant="primary" onClick={() => router.push('/quizzes')}>Back to Catalog</Button>
            </div>
          ) : (
            <>
              {/* Quiz Info Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10 space-y-1">
                  <h2 className="text-2xl font-extrabold tracking-tight">{quiz.title}</h2>
                  <p className="text-sm text-slate-300">
                    {quiz.topic} • {quiz.difficulty} • {quiz.questions?.length || 0} Questions
                  </p>
                </div>
                <Trophy className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5 rotate-12" />
              </div>

              {/* Leaderboard List */}
              <Card className="bg-white border-[#E2E8F0] shadow-sm rounded-2xl overflow-hidden">
                {leaderboard.length === 0 ? (
                  <div className="p-12 text-center space-y-3">
                    <Trophy className="w-12 h-12 text-[#E2E8F0] mx-auto" />
                    <p className="font-bold text-[#0F172A]">No attempts yet!</p>
                    <p className="text-xs text-[#64748B]">Be the first to conquer this quiz.</p>
                    <Button variant="primary" size="sm" onClick={() => router.push(`/quizzes/${quizId}/play`)} className="mt-2">
                      Take Quiz Now
                    </Button>
                  </div>
                ) : (
                  <div className="divide-y divide-[#E2E8F0]">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 p-4 text-xs font-bold text-[#64748B] bg-[#F8FAFC]">
                      <div className="col-span-2 sm:col-span-1 text-center">Rank</div>
                      <div className="col-span-6 sm:col-span-5">Player</div>
                      <div className="col-span-2 text-center">Score</div>
                      <div className="hidden sm:block col-span-2 text-center">Accuracy</div>
                      <div className="col-span-2 text-right pr-2">Time</div>
                    </div>

                    {/* Table Body */}
                    {leaderboard.map((entry) => {
                      const isCurrentUser = user && entry.userId === (user._id || user.id);
                      let rankBadge = null;
                      if (entry.rank === 1) rankBadge = <Medal className="w-5 h-5 text-amber-400" />;
                      else if (entry.rank === 2) rankBadge = <Medal className="w-5 h-5 text-slate-400" />;
                      else if (entry.rank === 3) rankBadge = <Medal className="w-5 h-5 text-amber-700" />;
                      else rankBadge = <span className="font-bold text-[#64748B]">{entry.rank}</span>;

                      return (
                        <div
                          key={entry.userId}
                          className={`grid grid-cols-12 gap-4 p-4 items-center text-sm transition-colors ${
                            isCurrentUser ? 'bg-blue-50/50' : 'hover:bg-[#F8FAFC]'
                          }`}
                        >
                          {/* Rank */}
                          <div className="col-span-2 sm:col-span-1 flex justify-center items-center">
                            {rankBadge}
                          </div>

                          {/* Player Info */}
                          <div className="col-span-6 sm:col-span-5 flex items-center gap-3">
                            {entry.avatar ? (
                              <img src={entry.avatar} alt="Avatar" className="w-8 h-8 rounded-full border border-[#E2E8F0] shrink-0" />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2563EB] to-[#38BDF8] flex items-center justify-center text-white text-xs font-bold shrink-0">
                                {entry.name ? entry.name.charAt(0).toUpperCase() : '?'}
                              </div>
                            )}
                            <div className="truncate">
                              <span className={`font-bold block truncate ${isCurrentUser ? 'text-[#2563EB]' : 'text-[#0F172A]'}`}>
                                {entry.name} {isCurrentUser && '(You)'}
                              </span>
                            </div>
                          </div>

                          {/* Score */}
                          <div className="col-span-2 text-center font-black font-mono text-[#0F172A]">
                            {entry.score}
                          </div>

                          {/* Accuracy (Hidden on tiny mobile) */}
                          <div className="hidden sm:flex col-span-2 justify-center items-center">
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {entry.percentage}%
                            </span>
                          </div>

                          {/* Time */}
                          <div className="col-span-2 text-right pr-2 font-mono text-xs text-[#64748B] flex justify-end items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatTime(entry.timeSpentSeconds)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </Card>
            </>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
