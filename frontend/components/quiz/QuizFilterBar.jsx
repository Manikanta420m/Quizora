'use client';

import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import Input from '@/components/ui/Input';

const TOPIC_CHIPS = [
  { label: 'All Topics', value: 'all' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'React', value: 'react' },
  { label: 'Node.js', value: 'nodejs' },
  { label: 'CSS', value: 'css' },
  { label: 'Python', value: 'python' },
];

const DIFFICULTY_OPTIONS = [
  { label: 'All Difficulties', value: 'all' },
  { label: 'Easy', value: 'easy' },
  { label: 'Medium', value: 'medium' },
  { label: 'Hard', value: 'hard' },
];

export function QuizFilterBar({
  search,
  setSearch,
  topic,
  setTopic,
  difficulty,
  setDifficulty,
  totalCount,
}) {
  return (
    <div className="space-y-4 bg-white p-4 sm:p-5 rounded-2xl border border-[#E2E8F0] shadow-xs">
      {/* Search & Difficulty Dropdown Row */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search quizzes by title, description, or topic..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white border border-[#E2E8F0] text-[#111827] placeholder:text-[#94A3B8] text-sm focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 transition-all shadow-2xs"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0F172A] p-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Difficulty Dropdown */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="appearance-none px-4 py-2.5 pr-9 rounded-xl bg-white border border-[#E2E8F0] text-[#0F172A] text-sm focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15 cursor-pointer shadow-2xs font-medium"
            >
              {DIFFICULTY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-white text-[#0F172A]">
                  {opt.label}
                </option>
              ))}
            </select>
            <Filter className="w-3.5 h-3.5 text-[#94A3B8] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Topic Filter Chips Row */}
      <div className="flex items-center justify-between gap-2 pt-1 overflow-x-auto pb-1 no-scrollbar">
        <div className="flex items-center gap-1.5 flex-wrap">
          {TOPIC_CHIPS.map((chip) => {
            const isActive = topic === chip.value;
            return (
              <button
                key={chip.value}
                onClick={() => setTopic(chip.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#2563EB] text-white shadow-xs font-semibold'
                    : 'bg-[#F1F5F9] text-[#64748B] hover:text-[#0F172A] hover:bg-[#E2E8F0]'
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>

        {typeof totalCount === 'number' && (
          <span className="text-xs text-[#64748B] whitespace-nowrap pl-2 font-medium">
            {totalCount} {totalCount === 1 ? 'quiz' : 'quizzes'} found
          </span>
        )}
      </div>
    </div>
  );
}

export default QuizFilterBar;
