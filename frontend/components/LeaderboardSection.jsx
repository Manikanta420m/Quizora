'use client';

import React from 'react';
import { Trophy, Crown, Medal, Flame, Star, Zap } from 'lucide-react';

export default function LeaderboardSection() {
  // Static preview data to match the image exactly
  const first = { name: 'Manikanta', xp: 2850, streak: 21, avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Manikanta' };
  const second = { name: 'Kalyani', xp: 2420, streak: 15, avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Kalyani' };
  const third = { name: 'Teja', xp: 2190, streak: 18, avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Teja' };
  
  const competitors = [
    { id: 4, name: 'Sirisha', xp: 1870, streak: 9, role: 'Student', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Sirisha' },
    { id: 5, name: 'Dominator', xp: 1640, streak: 12, role: 'Student', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Dominator' }
  ];

  return (
    <section id="leaderboard" className="relative pt-12 pb-8 overflow-hidden bg-transparent">
      {/* Background glow effects - keeping them subtle so the global pattern shows through */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 to-transparent -z-20 pointer-events-none" />
      
      {/* Large white bokeh circles */}
      <div className="absolute top-10 -left-10 w-96 h-96 bg-white/40 blur-[80px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-40 right-20 w-[500px] h-[500px] bg-white/40 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-20 left-1/4 w-[400px] h-[400px] bg-white/30 blur-[90px] rounded-full pointer-events-none -z-10" />
      
      {/* Subtle blue accent glows */}
      <div className="absolute top-20 -left-40 w-[600px] h-[600px] bg-sky-300/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-40 -right-40 w-[600px] h-[600px] bg-blue-400/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4 relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-50/80 border border-amber-200/60 text-xs font-bold text-amber-700 shadow-sm backdrop-blur-sm">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            Real-Time Competition
          </div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#0F172A]">
            Global Leaderboard
          </h2>
          
          <p className="text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            Compete with fellow learners, maintain daily learning streaks, and climb the real-time ranks.
          </p>
        </div>

        <div className="space-y-12">
          {/* Podium Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end max-w-4xl mx-auto px-2">
            
            {/* 2nd Place */}
            <div className="order-2 md:order-1 relative bg-white rounded-[2rem] p-6 pt-10 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col items-center hover:-translate-y-2 transition-transform duration-300">
              <div className="absolute -top-4 bg-slate-100 border border-slate-200 text-slate-600 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm">
                <Medal className="w-3.5 h-3.5" /> #2 Silver
              </div>
              <img src={second.avatar} alt={second.name} className="w-24 h-24 rounded-2xl object-cover shadow-sm mb-4 bg-slate-100" />
              <h3 className="text-lg font-bold text-[#0F172A] mb-3">{second.name}</h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-sm font-bold text-blue-600">
                  <Star className="w-4 h-4 fill-blue-600" /> {second.xp} XP
                </div>
                <div className="w-1 h-1 rounded-full bg-slate-300" />
                <div className="flex items-center gap-1 text-sm font-bold text-amber-600">
                  <Flame className="w-4 h-4 fill-amber-500 text-amber-500" /> {second.streak}d
                </div>
              </div>
            </div>

            {/* 1st Place */}
            <div className="order-1 md:order-2 relative bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-8 pt-12 shadow-[0_20px_50px_-15px_rgba(245,158,11,0.25)] border-[3px] border-amber-300 flex flex-col items-center transform md:-translate-y-6 z-20">
              <div className="absolute -top-5 bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 px-6 py-2 rounded-full text-sm font-black flex items-center gap-1.5 shadow-lg shadow-amber-500/30 border border-amber-300">
                <Crown className="w-4 h-4 fill-amber-950" /> #1 Champion
              </div>
              <div className="relative mb-5">
                <div className="absolute -inset-2 bg-gradient-to-tr from-amber-200 to-amber-400 rounded-3xl blur-md opacity-60" />
                <img src={first.avatar} alt={first.name} className="w-32 h-32 rounded-[1.5rem] object-cover shadow-xl relative z-10 border-[3px] border-white bg-slate-100" />
                <div className="absolute -bottom-3 -right-3 w-8 h-8 rounded-full bg-amber-400 border-[3px] border-white flex items-center justify-center z-20 shadow-md">
                  <Trophy className="w-3.5 h-3.5 text-amber-900" />
                </div>
              </div>
              <h3 className="text-2xl font-black text-[#0F172A] mb-4">{first.name}</h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-sm font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100">
                  <Star className="w-4 h-4 fill-blue-600" /> {first.xp} XP
                </div>
                <div className="flex items-center gap-1.5 text-sm font-black text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
                  <Flame className="w-4 h-4 fill-amber-500 text-amber-500" /> {first.streak} Day Streak
                </div>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="order-3 relative bg-white rounded-[2rem] p-6 pt-10 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col items-center hover:-translate-y-2 transition-transform duration-300">
              <div className="absolute -top-4 bg-amber-100/50 border border-amber-200 text-amber-800 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm">
                <Medal className="w-3.5 h-3.5 text-amber-600" /> #3 Bronze
              </div>
              <img src={third.avatar} alt={third.name} className="w-24 h-24 rounded-2xl object-cover shadow-sm mb-4 bg-slate-100" />
              <h3 className="text-lg font-bold text-[#0F172A] mb-3">{third.name}</h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-sm font-bold text-blue-600">
                  <Star className="w-4 h-4 fill-blue-600" /> {third.xp} XP
                </div>
                <div className="w-1 h-1 rounded-full bg-slate-300" />
                <div className="flex items-center gap-1 text-sm font-bold text-amber-600">
                  <Flame className="w-4 h-4 fill-amber-500 text-amber-500" /> {third.streak}d
                </div>
              </div>
            </div>
          </div>

          {/* List Section */}
          <div className="bg-white rounded-[2rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="text-[11px] font-black tracking-widest uppercase text-slate-500">Top Competitors</h3>
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-500">
                <Zap className="w-3.5 h-3.5" /> Live Ranks
              </div>
            </div>
            
            <div className="divide-y divide-slate-100/80">
              {competitors.map((player) => (
                <div key={player.id} className="flex items-center p-4 sm:px-6 hover:bg-slate-50/50 transition-colors">
                  <div className="w-10 text-center font-mono text-sm font-bold text-slate-400 bg-slate-100 rounded-md py-1 mr-4">
                    #{player.id}
                  </div>
                  <img src={player.avatar} alt={player.name} className="w-10 h-10 rounded-full object-cover bg-slate-200 mr-4 shadow-sm" />
                  <div className="flex-1">
                    <div className="font-bold text-[#0F172A] text-sm">{player.name}</div>
                    <div className="text-[11px] text-slate-500 font-medium">{player.role}</div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-amber-600 w-16">
                      <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {player.streak}d
                    </div>
                    <div className="font-mono font-black text-blue-600 text-sm text-right w-24">
                      {player.xp} XP
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
