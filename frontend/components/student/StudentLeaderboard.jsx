'use client';

import React, { useState } from 'react';
import {
  Trophy,
  Crown,
  Medal,
  Flame,
  Star,
  Users,
  Globe,
  Calendar,
  Sparkles,
  ArrowUp,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useQuery } from '@tanstack/react-query';
import leaderboardService from '@/services/leaderboardService';

export default function StudentLeaderboard({ user }) {
  const [boardType, setBoardType] = useState('weekly'); // 'weekly' | 'monthly' | 'class' | 'global'

  const fallbackRankings = [
    { rank: 1, medal: '🥇', name: 'Kalyani', class: 'Student', xp: 1240, score: '🔥 7 day streak', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80' },
    { rank: 2, medal: '🥈', name: 'Teja', class: 'Student', xp: 1180, score: '🔥 5 day streak', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80' },
    { rank: 3, medal: '🥉', name: 'Vasundhara', class: 'Student', xp: 1105, score: '🔥 3 day streak', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80' },
    { rank: 4, medal: '4', name: user?.name || 'ManiKanta', class: 'Student', xp: 1050, score: '🔥 2 day streak', isMe: true, avatar: user?.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80' },
  ];

  const { data, isLoading } = useQuery({
    queryKey: ['globalLeaderboard', boardType],
    queryFn: () => leaderboardService.getLeaderboard({ limit: 50 }),
    staleTime: 1000 * 30, // 30 seconds
  });

  const apiRankings = data?.leaderboard || [];

  const displayRankings = apiRankings.length > 0 
    ? apiRankings.map((r, i) => ({
        rank: r.rank || (i + 1),
        medal: r.rank === 1 ? '🥇' : r.rank === 2 ? '🥈' : r.rank === 3 ? '🥉' : String(r.rank || (i + 1)),
        name: r.name,
        class: r.role === 'student' ? 'Student' : (r.role || 'Student'),
        xp: r.xp,
        score: r.streak > 0 ? `🔥 ${r.streak} day streak` : '0 day streak',
        avatar: r.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(r.name)}&backgroundColor=6366f1`,
        isMe: r.userId === user?._id || r.userId === user?.id
      }))
    : (isLoading ? fallbackRankings : []);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white shadow-xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-[#F59E0B] border border-amber-400/30 text-xs font-semibold">
          <Trophy className="w-3.5 h-3.5" />
          <span>Competitive Standings &bull; Real-Time XP</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Student Leaderboard 🏆
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
          Compete with classmates, maintain streaks, and climb the ranks by answering quiz questions accurately.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm w-fit">
        {[
          { id: 'weekly', label: '📅 Weekly' },
          { id: 'monthly', label: '📅 Monthly' },
          { id: 'class', label: '🏫 Class' },
          { id: 'global', label: '🌎 Global' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setBoardType(tab.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              boardType === tab.id
                ? 'bg-[#2563EB] text-white shadow-xs'
                : 'text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Rankings List */}
      <Card className="bg-white border-[#E2E8F0] shadow-sm rounded-3xl overflow-hidden p-6 space-y-3">
        <div className="space-y-2">
          {displayRankings.length === 0 && !isLoading && (
            <div className="text-center p-8 text-slate-500 font-medium">
              No competitors on the leaderboard yet. Take a quiz to claim #1!
            </div>
          )}
          {displayRankings.map((item) => (
            <div
              key={item.rank}
              className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                item.isMe
                  ? 'bg-blue-50/70 border-[#2563EB] ring-2 ring-[#2563EB]/20 shadow-xs'
                  : 'bg-[#F8FAFC] border-[#E2E8F0]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-sm w-6 text-center">
                  {item.medal}
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#E2E8F0]"
                />
                <div>
                  <span className="font-bold text-xs sm:text-sm text-[#0F172A] block">
                    {item.name} {item.isMe && <span className="text-[#2563EB] font-mono">(You)</span>}
                  </span>
                  <span className="text-[11px] text-[#64748B]">{item.class} &bull; {item.score}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="font-mono font-black text-sm text-[#2563EB] block">
                  {item.xp.toLocaleString()} XP
                </span>
                <span className="text-[10px] text-emerald-600 font-bold block">
                  Rank #{item.rank}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
