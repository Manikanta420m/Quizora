'use client';

import React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import {
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { healthService } from '@/services/api';
import ThemeSwitch from './ThemeSwitch';

export default function Footer() {
  // Query backend health every 30 seconds for live status indicator
  const { data: health, isError } = useQuery({
    queryKey: ['footerHealth'],
    queryFn: healthService.getHealth,
    refetchInterval: 30000,
    retry: 1,
  });

  const isOnline = !isError && health?.success;

  return (
    <footer className="w-full border-t border-[#E2E8F0] bg-white text-[#64748B] text-xs">
      {/* Live System Status Bar */}
      <div className="border-b border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[11px]">
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isOnline ? 'bg-emerald-400' : 'bg-rose-400'
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  isOnline ? 'bg-emerald-500' : 'bg-rose-500'
                }`}
              />
            </span>
            <span className="font-semibold text-[#0F172A]">
              {isOnline ? 'All Systems Operational' : 'Backend Connecting...'}
            </span>
            <span className="text-slate-300 hidden sm:inline">&bull;</span>
            <span className="text-[#64748B] hidden sm:inline">
              REST API {health?.services?.server?.nodeVersion || 'v20+'}
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span className="text-emerald-600 font-medium">100% JavaScript</span>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Tagline */}
          <div className="space-y-3 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/quizora-icon.png"
                alt="Quizora Logo"
                className="w-8 h-8 rounded-lg object-contain shadow-xs group-hover:scale-105 transition-transform border border-[#E2E8F0] bg-white p-0.5"
              />
              <span className="font-extrabold text-lg text-[#0F172A] tracking-tight">
                Quizora
              </span>
            </Link>
            <p className="text-[#0F172A] font-medium text-sm">
              Turn Knowledge into Quizzes.
            </p>
            <p className="text-[#64748B] text-xs leading-relaxed">
              Personalized AI assessments from any topic, notes, or PDF.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold text-[#0F172A] hover:text-[#2563EB] transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold text-[#0F172A] hover:text-[#2563EB] transition-colors"
              >
                <svg className="w-4 h-4 fill-current text-[#2563EB]" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Col 2: Product */}
          <div className="space-y-3">
            <h4 className="text-[#0F172A] font-bold text-sm">Product</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/#features" className="hover:text-[#2563EB] transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/quizzes/generate" className="hover:text-[#2563EB] transition-colors flex items-center gap-1">
                  <span>Quiz Generator</span>
                  <Sparkles className="w-3 h-3 text-[#38BDF8]" />
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-[#2563EB] transition-colors">
                  Analytics
                </Link>
              </li>
              <li>
                <Link href="/quizzes" className="hover:text-[#2563EB] transition-colors">
                  Quiz Library
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div className="space-y-3">
            <h4 className="text-[#0F172A] font-bold text-sm">Resources</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/#how-it-works" className="hover:text-[#2563EB] transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-[#2563EB] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/quizzes/upload" className="hover:text-[#2563EB] transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="hover:text-[#2563EB] transition-colors">
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Company */}
          <div className="space-y-3">
            <h4 className="text-[#0F172A] font-bold text-sm">Company</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/#features" className="hover:text-[#2563EB] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <a href="mailto:support@quizora.ai" className="hover:text-[#2563EB] transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <Link href="/quizzes" className="hover:text-[#2563EB] transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Legal with Theme Switch */}
        <div className="mt-10 pt-6 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4 text-[#64748B]">
          <p>
            &copy; {new Date().getFullYear()} Quizora. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <ThemeSwitch size="sm" showLabel labelPosition="left" />
            <span className="text-slate-300 hidden sm:inline">&bull;</span>
            <span className="text-[#0F172A] font-medium">Pure JavaScript v1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
