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
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function StudentPractice({ onGenerateWeakPractice, isGeneratingWeakPractice }) {
  const router = useRouter();
  const [selectedDrill, setSelectedDrill] = useState(null);

  const practiceModes = [
    {
      id: 'weak-topics',
      title: '🎯 Weak Topic Remediation',
      desc: 'Let AI target your lowest scoring areas: DSA (52%) and Node.js (64%).',
      tag: 'Recommended',
      badgeColor: 'danger',
      actionText: 'Launch Adaptive Drill',
      action: () => onGenerateWeakPractice?.(['dsa', 'node.js']),
    },
    {
      id: 'flashcards',
      title: '🃏 Interactive 3D Flashcards',
      desc: 'Rapidly flip through concept definitions, syntax flashcards, and algorithm steps.',
      tag: 'Popular',
      badgeColor: 'ai',
      actionText: 'Open Flashcards',
      action: () => router.push('/quizzes'),
    },
    {
      id: 'speed-drill',
      title: '⚡ 60-Second Speed Drill',
      desc: 'Fast-paced multiple choice showdown with a countdown timer to test recall.',
      tag: 'Bonus XP',
      badgeColor: 'warning',
      actionText: 'Start Speed Drill',
      action: () => router.push('/quizzes/generate'),
    },
    {
      id: 'custom-topic',
      title: '🧠 Custom Topic Synthesis',
      desc: 'Pick any programming subject, library, or CS topic for instant AI quiz formulation.',
      tag: 'Flexible',
      badgeColor: 'info',
      actionText: 'Create Custom Quiz',
      action: () => router.push('/quizzes/generate'),
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

            <Button
              variant="primary"
              size="sm"
              onClick={mode.action}
              disabled={isGeneratingWeakPractice && mode.id === 'weak-topics'}
              className="w-full text-xs gap-1.5 bg-[#2563EB] hover:bg-[#1D4ED8] cursor-pointer"
            >
              <span>{isGeneratingWeakPractice && mode.id === 'weak-topics' ? 'Synthesizing Drill...' : mode.actionText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
