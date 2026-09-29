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

export default function StudentLeaderboard({ user }) {
  const [boardType, setBoardType] = useState('weekly'); // 'weekly' | 'monthly' | 'class' | 'global'

  const rankings = [
    { rank: 1, medal: '🥇', name: 'Ananya Sharma', class: 'CS101', xp: 1240, score: 94, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80' },
    { rank: 2, medal: '🥈', name: 'Rahul Kumar', class: 'CS101', xp: 1180, score: 91, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80' },
    { rank: 3, medal: '🥉', name: 'Priya Patel', class: 'CS101', xp: 1105, score: 89, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80' },
    { rank: 4, medal: '4', name: user?.name || 'Mani', class: 'CS101', xp: 1050, score: 87, isMe: true, avatar: user?.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80' },
    { rank: 5, medal: '5', name: 'David Kim', class: 'CS101', xp: 980, score: 85, avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80' },
    { rank: 6, medal: '6', name: 'Elena Rostova', class: 'CS101', xp: 920, score: 84, avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80' },
  ];

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
          {rankings.map((item) => (
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
                  <span className="text-[11px] text-[#64748B]">{item.class} &bull; {item.score}% Accuracy</span>
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
