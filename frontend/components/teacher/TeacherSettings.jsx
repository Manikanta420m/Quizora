'use client';

import React, { useState } from 'react';
import {
  Settings,
  Megaphone,
  Bell,
  Sliders,
  CheckCircle2,
  Send,
  Trophy,
  Shield,
  Save,
  Check,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function TeacherSettings() {
  const [announcements, setAnnouncements] = useState([
    {
      id: 'ann_1',
      title: 'Mid-Term Assessment Coverage',
      content: "Tomorrow's quiz will cover React Hooks, custom hooks, and Context API. Please review the lecture notes.",
      targetClass: 'Web Development',
      date: 'Today, 9:00 AM',
    },
    {
      id: 'ann_2',
      title: 'Practice Problem Set Available',
      content: 'A new remedial practice set on Binary Search Trees is now active in your student dashboard.',
      targetClass: 'Data Structures',
      date: 'Yesterday',
    },
  ]);

  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annTargetClass, setAnnTargetClass] = useState('Web Development');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Settings State
  const [settings, setSettings] = useState({
    shuffleQuestions: true,
    shuffleAnswers: true,
    showExplanations: true,
    allowRetakes: true,
    showCorrectAnswers: true,
    enableLeaderboard: true,
    maxAttempts: 2,
    defaultTimeLimit: 30,
    notifyOnCompletion: true,
    notifyOnAIGeneration: true,
    notifyOnDeadlines: true,
  });

  const handlePostAnnouncement = (e) => {
    e.preventDefault();
    if (!annTitle.trim() || !annContent.trim()) return;

    const newPost = {
      id: `ann_${Date.now()}`,
      title: annTitle.trim(),
      content: annContent.trim(),
      targetClass: annTargetClass,
      date: 'Just now',
    };

    setAnnouncements([newPost, ...announcements]);
    setAnnTitle('');
    setAnnContent('');
  };

  const handleSaveSettings = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
          Teacher Settings &amp; Announcements
        </h2>
        <p className="text-xs sm:text-sm text-[#64748B]">
          Broadcast cohort notices, adjust default quiz policies, and configure notification rules.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Announcements Board */}
        <div className="space-y-6">
          <Card className="bg-white border-[#E2E8F0] shadow-sm p-6 rounded-3xl space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E2E8F0]">
              <Megaphone className="w-5 h-5 text-[#2563EB]" />
              <h3 className="font-extrabold text-base text-[#0F172A]">Post Class Announcement</h3>
            </div>

            <form onSubmit={handlePostAnnouncement} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Target Class</label>
                <select
                  value={annTargetClass}
                  onChange={(e) => setAnnTargetClass(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:outline-none"
                >
                  <option value="All Classes">All Classes Broadcast</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Data Structures">Data Structures</option>
                  <option value="JavaScript Mastery">JavaScript Mastery</option>
                  <option value="AI Fundamentals">AI Fundamentals</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Headline *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tomorrow's quiz will cover React Hooks"
                  value={annTitle}
                  onChange={(e) => setAnnTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Message Content *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Details for students..."
                  value={annContent}
                  onChange={(e) => setAnnContent(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] focus:bg-white focus:outline-none"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="sm"
                className="w-full gap-2 text-xs bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publish Announcement</span>
              </Button>
            </form>
          </Card>

          {/* Active Announcements List */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-[#0F172A]">Active Broadcasts</h4>
            {announcements.map((ann) => (
              <Card key={ann.id} className="bg-white border-[#E2E8F0] p-4 rounded-2xl shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#0F172A]">{ann.title}</span>
                  <span className="text-[10px] text-[#64748B]">{ann.date}</span>
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">{ann.content}</p>
                <div className="pt-1 flex items-center gap-2">
                  <Badge variant="secondary" className="text-[10px] font-mono">
                    {ann.targetClass}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right: Default Assessment & Policy Settings */}
        <div className="space-y-6">
          <Card className="bg-white border-[#E2E8F0] shadow-sm p-6 rounded-3xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-[#2563EB]" />
                <h3 className="font-extrabold text-base text-[#0F172A]">Default Assessment Policies</h3>
              </div>

              {savedSuccess && (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 animate-in fade-in">
                  <Check className="w-3.5 h-3.5" /> Saved!
                </span>
              )}
            </div>

            <div className="space-y-4 text-xs">
              {/* Toggles */}
              <div className="space-y-3">
                {[
                  { key: 'shuffleQuestions', label: 'Shuffle question order', desc: 'Prevents cheating by randomizing item sequences' },
                  { key: 'shuffleAnswers', label: 'Shuffle answer options', desc: 'Randomizes A, B, C, D positions' },
                  { key: 'showExplanations', label: 'Show pedagogical explanations', desc: 'Displays rationale after quiz submission' },
                  { key: 'allowRetakes', label: 'Allow student retakes', desc: 'Enables remedial attempts on practice quizzes' },
                  { key: 'showCorrectAnswers', label: 'Show correct answers on completion', desc: 'Reveals full answer key upon finish' },
                  { key: 'enableLeaderboard', label: 'Enable Class Leaderboard', desc: 'Shows competitive rankings to students in cohort' },
                ].map((item) => (
                  <div key={item.key} className="flex items-start justify-between gap-4 p-3 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                    <div>
                      <span className="font-bold text-[#0F172A] block">{item.label}</span>
                      <span className="text-[11px] text-[#64748B]">{item.desc}</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings[item.key]}
                      onChange={(e) => setSettings({ ...settings, [item.key]: e.target.checked })}
                      className="mt-1 w-4 h-4 rounded text-[#2563EB] focus:ring-[#2563EB] cursor-pointer"
                    />
                  </div>
                ))}
              </div>

              {/* Numeric Rules */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block font-bold text-[#0F172A] mb-1">Max Retakes Allowed</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={settings.maxAttempts}
                    onChange={(e) => setSettings({ ...settings, maxAttempts: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#0F172A] mb-1">Default Time (Mins)</label>
                  <input
                    type="number"
                    min={5}
                    max={180}
                    value={settings.defaultTimeLimit}
                    onChange={(e) => setSettings({ ...settings, defaultTimeLimit: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC]"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-2">
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={handleSaveSettings}
                  className="w-full gap-2 text-xs bg-[#0F172A] hover:bg-slate-800 text-white"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Policy Preferences</span>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
