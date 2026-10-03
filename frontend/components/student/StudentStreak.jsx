'use client';

import React, { useState } from 'react';
import {
  Flame,
  Calendar,
  Shield,
  Star,
  CheckCircle2,
  Clock,
  Sparkles,
  Award,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function StudentStreak({ streak = 7 }) {
  const [freezeTokens, setFreezeTokens] = useState(2);
  const [selectedYear, setSelectedYear] = useState('2026');

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const days = [
    { name: 'Monday', date: 'Sep 15', completed: true },
    { name: 'Tuesday', date: 'Sep 16', completed: true },
    { name: 'Wednesday', date: 'Sep 17', completed: true },
    { name: 'Thursday', date: 'Sep 18', completed: true },
    { name: 'Friday', date: 'Sep 19', completed: true },
    { name: 'Saturday', date: 'Sep 20', completed: true },
    { name: 'Sunday', date: 'Sep 21 (Today)', completed: true },
  ];

  const milestones = [
    { days: 3, label: 'Early Riser', unlocked: true, xp: 50 },
    { days: 7, label: 'Habit Builder', unlocked: true, xp: 150 },
    { days: 14, label: 'Consistency King', unlocked: false, xp: 300 },
    { days: 30, label: 'Monthly Master', unlocked: false, xp: 1000 },
    { days: 100, label: 'Unstoppable Legend', unlocked: false, xp: 5000 },
  ];

  // Generate mock heatmap data for a full 52-week year
  const heatmapData = React.useMemo(() => {
    const data = [];
    for (let w = 0; w < 52; w++) { // 52 columns (weeks)
      const week = [];
      for (let d = 0; d < 7; d++) { // 7 rows (days)
        let level = 0;
        const rand = Math.random();
        if (rand > 0.9) level = 4;
        else if (rand > 0.75) level = 3;
        else if (rand > 0.6) level = 2;
        else if (rand > 0.4) level = 1;
        
        if (selectedYear === '2026') {
          // Guarantee current streak shows activity at the end of the year
          if (w >= 50 && d < streak) level = Math.max(level, 2);
        } else {
          // Mock lower activity for past years
          if (Math.random() > 0.4) level = 0;
        }
        
        week.push(level);
      }
      data.push(week);
    }
    return data;
  }, [streak, selectedYear]);

  const getHeatmapColor = (level) => {
    switch(level) {
      case 1: return 'bg-amber-200';
      case 2: return 'bg-amber-300';
      case 3: return 'bg-amber-500';
      case 4: return 'bg-amber-600';
      default: return 'bg-slate-100';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/20 via-orange-500/10 to-[#0F172A] border border-amber-300/30 text-[#0F172A] shadow-xl space-y-2 relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-900 border border-amber-400/40 text-xs font-semibold">
          <Flame className="w-4 h-4 text-[#F59E0B]" />
          <span>Daily Habit Tracker &bull; Current Streak Active</span>
        </div>
        <h1 className="text-3xl font-black tracking-tight flex items-center gap-2 text-[#0F172A]">
          🔥 {streak} Day Learning Streak!
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
          Complete at least 1 quiz every day to maintain your streak, earn multiplier XP, and unlock exclusive badges.
        </p>
      </div>

      {/* Days of Current Week */}
      <Card className="bg-white border-[#E2E8F0] shadow-sm p-6 rounded-3xl space-y-4">
        <h3 className="font-extrabold text-base text-[#0F172A]">This Week&apos;s Calendar</h3>
        <div className="grid grid-cols-1 sm:grid-cols-7 gap-3">
          {days.map((d) => (
            <div
              key={d.name}
              className={`p-3.5 rounded-2xl border text-center space-y-1 ${
                d.completed
                  ? 'bg-amber-50/70 border-amber-200 text-amber-900'
                  : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#94A3B8]'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs mx-auto">
                ✓
              </div>
              <span className="font-bold text-xs block">{d.name.slice(0, 3)}</span>
              <span className="text-[10px] text-slate-500 block">{d.date}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Activity Heatmap */}
      <Card className="bg-white border-[#E2E8F0] shadow-sm p-6 rounded-3xl space-y-4 overflow-x-auto">
        <div className="flex items-center justify-between min-w-max">
          <h3 className="font-extrabold text-base text-[#0F172A] flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#2563EB]" />
            Learning Activity Heatmap
          </h3>
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-3 py-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs font-bold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 cursor-pointer"
          >
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
        </div>
        
        <div className="min-w-max space-y-2 pt-2">
          {/* Months Row */}
          <div className="flex text-[10px] font-bold text-slate-400 pl-[30px]">
            {months.map((month) => (
              <div key={month} className="flex-1 min-w-[34px]">{month}</div>
            ))}
          </div>

          <div className="flex gap-3">
            {/* Days Column */}
            <div className="flex flex-col gap-[7px] text-[9px] font-bold text-slate-400 pt-1 justify-between pb-1">
              <span>Mon</span>
              <span className="opacity-0">Tue</span>
              <span>Wed</span>
              <span className="opacity-0">Thu</span>
              <span>Fri</span>
              <span className="opacity-0">Sat</span>
              <span>Sun</span>
            </div>
            
            {/* Grid */}
            <div className="flex gap-1.5">
              {heatmapData.map((week, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  {week.map((level, j) => (
                    <div 
                      key={j} 
                      className={`w-3.5 h-3.5 rounded-[3px] transition-colors ${getHeatmapColor(level)}`} 
                      title={`Activity level: ${level}`} 
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 text-[10px] text-slate-500 font-bold pt-4 min-w-max">
          <span>Less</span>
          <div className="flex gap-1.5">
            <div className="w-3.5 h-3.5 rounded-[3px] bg-slate-100" />
            <div className="w-3.5 h-3.5 rounded-[3px] bg-amber-200" />
            <div className="w-3.5 h-3.5 rounded-[3px] bg-amber-300" />
            <div className="w-3.5 h-3.5 rounded-[3px] bg-amber-500" />
            <div className="w-3.5 h-3.5 rounded-[3px] bg-amber-600" />
          </div>
          <span>More</span>
        </div>
      </Card>

      {/* Streak Protection Tokens & Milestones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white border-[#E2E8F0] shadow-sm p-6 rounded-3xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-[#0F172A]">Streak Freeze Tokens</h4>
              <p className="text-xs text-[#64748B]">Protects your streak if you miss a day</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <span className="text-xs font-bold text-[#0F172A]">Available Tokens:</span>
            <span className="font-mono font-black text-base text-[#2563EB]">🛡️ {freezeTokens}</span>
          </div>
        </Card>

        <Card className="bg-white border-[#E2E8F0] shadow-sm p-6 rounded-3xl space-y-4">
          <h4 className="font-extrabold text-sm text-[#0F172A]">Streak Milestones</h4>
          <div className="space-y-2">
            {milestones.map((m) => (
              <div
                key={m.days}
                className={`p-2.5 rounded-2xl border flex items-center justify-between text-xs ${
                  m.unlocked
                    ? 'bg-amber-50/50 border-amber-200 text-amber-900 font-bold'
                    : 'bg-[#F8FAFC] border-[#E2E8F0] text-slate-500'
                }`}
              >
                <span>🔥 {m.days} Days &bull; {m.label}</span>
                <span className="font-mono font-bold text-[#2563EB]">+{m.xp} XP</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
