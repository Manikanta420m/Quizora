'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Trophy,
  Crown,
  Medal,
  Flame,
  Star,
  Zap,
  ArrowUp,
  Sparkles,
  Users,
  RefreshCw,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Database,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/ui/Navbar';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import leaderboardService from '@/services/leaderboardService';

export default function LeaderboardPage() {
  const { user, token, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const [tab, setTab] = useState('all-time'); // 'all-time' or 'weekly'

  // Query global leaderboard
  const {
    data: leaderboardData,
    isLoading: isLbLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: () => leaderboardService.getGlobalLeaderboard({ limit: 50, offset: 0 }),
    staleTime: 1000 * 15, // 15 seconds
  });

  // Query user rank details
  const { data: myRankData } = useQuery({
    queryKey: ['myRank', user?._id || user?.id],
    queryFn: () => leaderboardService.getMyRank(token),
    enabled: !!isAuthenticated && !!token,
    staleTime: 1000 * 15,
  });

  // Seed sample competitors mutation
  const seedMutation = useMutation({
    mutationFn: () => leaderboardService.seedLeaderboard(token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
      queryClient.invalidateQueries({ queryKey: ['myRank'] });
    },
  });

  const players = leaderboardData?.leaderboard || [];
  const topThree = players.slice(0, 3);
  const remainingPlayers = players.slice(3);
  const myRank = myRankData?.data;

  // Podium arrangement: [2nd, 1st, 3rd]
  const first = topThree[0];
  const second = topThree[1];
  const third = topThree[2];

  return (
    <div className="min-h-screen bg-transparent text-[#111827] flex flex-col selection:bg-[#2563EB]/20 pb-24">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10">
        {/* Top Header Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div
            className="absolute right-0 top-0 bottom-0 w-1/2 bg-cover bg-right opacity-40 pointer-events-none [mask-image:linear-gradient(to_left,black_20%,transparent_100%)]"
            style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
            aria-hidden="true"
          />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 border border-amber-200 text-amber-900">
                <Trophy className="w-3.5 h-3.5 text-[#F59E0B]" />
                Global Redis Leaderboard
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[#EFF6FF] border border-[#2563EB]/20 text-[#2563EB]">
                <Zap className="w-3 h-3 text-[#2563EB]" />
                Real-Time Sorted Sets
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A]">
              Global XP Hall of Fame
            </h1>
            <p className="text-sm sm:text-base text-[#64748B] mt-1 max-w-xl">
              Rankings update in real-time as users solve challenges, build streaks, and master engineering topics.
            </p>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2.5 relative z-10">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => refetch()}
              disabled={isRefetching}
              className="text-xs gap-1.5 border-[#E2E8F0] text-[#0F172A]"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefetching ? 'animate-spin text-[#2563EB]' : 'text-[#64748B]'}`} />
              Refresh
            </Button>

            {isAuthenticated && players.length < 5 && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => seedMutation.mutate()}
                isLoading={seedMutation.isPending}
                className="text-xs gap-1.5 shadow-sm"
              >
                <Database className="w-3.5 h-3.5" />
                Populate Top Contenders
              </Button>
            )}
          </div>
        </div>

        {/* Loading Skeleton */}
        {isLbLoading ? (
          <div className="space-y-6 animate-pulse">
            <div className="h-64 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm" />
            <div className="h-96 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm" />
          </div>
        ) : players.length === 0 ? (
          /* Empty State */
          <Card className="border-[#E2E8F0] bg-white p-12 text-center space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-[#F59E0B] flex items-center justify-center mx-auto">
              <Trophy className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#0F172A]">No Ranked Players Yet</h3>
            <p className="text-sm text-[#64748B] max-w-md mx-auto">
              Be the first to claim the top spot! Take a quiz or seed realistic competitors to jumpstart the global
              rankings.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link href="/quizzes">
                <Button variant="primary">Take a Quiz Now</Button>
              </Link>
              {isAuthenticated && (
                <Button
                  variant="secondary"
                  onClick={() => seedMutation.mutate()}
                  isLoading={seedMutation.isPending}
                >
                  Seed Contenders
                </Button>
              )}
            </div>
          </Card>
        ) : (
          <>
            {/* Top 3 Podium Section */}
            <div className="relative pt-6 pb-2">
              <div className="text-center mb-8">
                <span className="text-xs uppercase font-mono tracking-widest text-[#F59E0B] font-bold">
                  The Top Achievers
                </span>
                <h2 className="text-2xl font-black text-[#0F172A] mt-1">Podium of Champions</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto items-end">
                {/* 2nd Place: Silver (Left) */}
                {second && (
                  <div className="order-2 md:order-1 flex flex-col items-center">
                    <div className="relative mb-3 group">
                      <div className="w-20 h-20 rounded-2xl border-2 border-slate-300 bg-white p-1 shadow-md flex items-center justify-center overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={second.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${second.name}`}
                          alt={second.name}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>
                      <div className="absolute -top-3 -right-2 px-2 py-0.5 rounded-full bg-slate-200 text-slate-800 font-black text-xs shadow-sm flex items-center gap-1">
                        <Medal className="w-3 h-3" />
                        #2
                      </div>
                    </div>
                    <div className="w-full p-5 rounded-2xl bg-white border border-slate-200 text-center space-y-2 relative shadow-sm">
                      <h4 className="font-bold text-[#0F172A] text-base truncate">{second.name}</h4>
                      <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#64748B]">
                        <Flame className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
                        <span>{second.streak} days</span>
                      </div>
                      <div className="text-xl font-extrabold text-[#0F172A] font-mono">
                        {second.xp.toLocaleString()}{' '}
                        <span className="text-xs font-sans text-[#64748B] font-normal">XP</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-200" />
                    </div>
                  </div>
                )}

                {/* 1st Place: Gold Champion (Center, Elevated) */}
                {first && (
                  <div className="order-1 md:order-2 flex flex-col items-center -mt-6">
                    <div className="relative mb-3 group">
                      <Crown className="w-10 h-10 text-[#F59E0B] fill-[#F59E0B] mx-auto mb-1 animate-bounce" />
                      <div className="w-24 h-24 rounded-2xl border-2 border-amber-400 bg-amber-50 p-1 shadow-lg flex items-center justify-center overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={first.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${first.name}`}
                          alt={first.name}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>
                      <div className="absolute -top-1 -right-2 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-xs shadow-md flex items-center gap-1">
                        <Crown className="w-3 h-3 fill-current" />
                        #1 GOLD
                      </div>
                    </div>
                    <div className="w-full p-6 rounded-2xl bg-white border-2 border-amber-400 text-center space-y-2.5 shadow-md">
                      <h3 className="font-extrabold text-[#0F172A] text-lg truncate">{first.name}</h3>
                      <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900">
                        <Flame className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
                        <span>{first.streak} Day Streak</span>
                      </div>
                      <div className="text-2xl font-black text-[#F59E0B] font-mono">
                        {first.xp.toLocaleString()}{' '}
                        <span className="text-xs font-sans text-amber-700 font-normal">XP</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-amber-400" />
                    </div>
                  </div>
                )}

                {/* 3rd Place: Bronze (Right) */}
                {third && (
                  <div className="order-3 flex flex-col items-center">
                    <div className="relative mb-3 group">
                      <div className="w-20 h-20 rounded-2xl border-2 border-amber-700/40 bg-amber-50/50 p-1 shadow-md flex items-center justify-center overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={third.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${third.name}`}
                          alt={third.name}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>
                      <div className="absolute -top-3 -right-2 px-2 py-0.5 rounded-full bg-amber-700 text-white font-black text-xs shadow-sm flex items-center gap-1">
                        <Medal className="w-3 h-3" />
                        #3
                      </div>
                    </div>
                    <div className="w-full p-5 rounded-2xl bg-white border border-amber-200 text-center space-y-2 shadow-sm">
                      <h4 className="font-bold text-[#0F172A] text-base truncate">{third.name}</h4>
                      <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#64748B]">
                        <Flame className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
                        <span>{third.streak} days</span>
                      </div>
                      <div className="text-xl font-extrabold text-amber-800 font-mono">
                        {third.xp.toLocaleString()}{' '}
                        <span className="text-xs font-sans text-[#64748B] font-normal">XP</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-amber-600/30" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Rankings Table (Ranks 4-50) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
                <h3 className="font-bold text-[#0F172A] text-lg flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#2563EB]" />
                  Global Contenders
                </h3>
                <span className="text-xs text-[#64748B]">Showing top {players.length} players</span>
              </div>

              <Card className="border-[#E2E8F0] bg-white shadow-sm overflow-hidden">
                <div className="divide-y divide-[#E2E8F0]">
                  {players.map((player) => {
                    const isCurrentUser = user && (user._id === player.userId || user.id === player.userId);

                    return (
                      <div
                        key={player.userId || player.rank}
                        className={`p-4 flex items-center justify-between gap-4 transition-colors ${
                          isCurrentUser
                            ? 'bg-[#EFF6FF] border-l-4 border-[#2563EB]'
                            : 'hover:bg-[#F8FAFC]'
                        }`}
                      >
                        {/* Rank & User Info */}
                        <div className="flex items-center gap-3.5">
                          {/* Rank Pill */}
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-sm flex-shrink-0 ${
                              player.rank === 1
                                ? 'bg-amber-400 text-slate-950 font-black shadow-sm'
                                : player.rank === 2
                                ? 'bg-slate-200 text-slate-900 font-bold'
                                : player.rank === 3
                                ? 'bg-amber-700 text-white font-bold'
                                : 'bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0]'
                            }`}
                          >
                            {player.rank}
                          </div>

                          {/* Avatar */}
                          <div className="w-10 h-10 rounded-xl bg-[#F1F5F9] border border-[#E2E8F0] overflow-hidden flex-shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={player.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${player.name}`}
                              alt={player.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Name & Badges */}
                          <div className="overflow-hidden">
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-sm text-[#0F172A] truncate">{player.name}</p>
                              {isCurrentUser && (
                                <Badge variant="ai" className="text-[10px] py-0 px-1.5">
                                  You
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-[#64748B] capitalize">{player.role || 'Student'}</p>
                          </div>
                        </div>

                        {/* Streak & XP Counters */}
                        <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0">
                          <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#64748B] font-medium">
                            <Flame className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                            <span>{player.streak || 1}d streak</span>
                          </div>

                          <div className="text-right">
                            <div className="flex items-center justify-end gap-1 font-mono font-bold text-sm text-[#0F172A]">
                              <Star className="w-3.5 h-3.5 text-[#2563EB] fill-[#2563EB]" />
                              <span>{player.xp.toLocaleString()}</span>
                              <span className="text-[10px] font-sans text-[#64748B] font-normal">XP</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          </>
        )}
      </main>

      {/* Sticky Bottom Bar for Current Authenticated User */}
      {isAuthenticated && myRank && (
        <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 border-t border-[#E2E8F0] backdrop-blur-lg px-4 py-3 shadow-xl">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#2563EB] text-white font-black text-sm flex items-center justify-center font-mono shadow-sm">
                #{myRank.rank || '-'}
              </div>
              <div>
                <p className="text-xs font-medium text-[#64748B]">Your Current Standing</p>
                <p className="text-sm font-bold text-[#0F172A]">
                  Rank #{myRank.rank || 'Unranked'} • Top {myRank.percentile || 0}%
                  {myRank.nextRankXpNeeded > 0 && (
                    <span className="text-xs font-normal text-[#2563EB] ml-2">
                      (+{myRank.nextRankXpNeeded} XP to rank up)
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/quizzes">
                <Button variant="primary" size="sm" className="gap-1.5 shadow-sm text-xs">
                  <Zap className="w-3.5 h-3.5" />
                  Take a Quiz to Rank Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
