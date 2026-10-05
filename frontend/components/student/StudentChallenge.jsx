'use client';

import React, { useState } from 'react';
import { 
  Swords, 
  Sword,
  Copy, 
  Check, 
  Sparkles,
  Users,
  Loader2,
  Share2,
  UserPlus
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function StudentChallenge() {
  const [topic, setTopic] = useState('');
  const [roomType, setRoomType] = useState('1v1'); // '1v1' or 'group'
  const [isCreating, setIsCreating] = useState(false);
  const [roomCreated, setRoomCreated] = useState(false);
  const [inviteLink, setInviteLink] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  
  const handleCreateRoom = (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    
    setIsCreating(true);
    // Simulate API call to create room
    setTimeout(() => {
      const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      setInviteLink(`${window.location.origin}/challenge/${roomCode}`);
      setRoomCreated(true);
      setIsCreating(false);
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <style>{`
          @keyframes clash-left {
            0%, 100% { transform: translateX(-8px) rotate(-15deg); }
            40% { transform: translateX(2px) rotate(15deg); }
            50% { transform: translateX(2px) rotate(15deg); filter: drop-shadow(2px 0 4px rgba(37,99,235,0.4)); }
          }
          @keyframes clash-right {
            0%, 100% { transform: scaleX(-1) translateX(-8px) rotate(-15deg); }
            40% { transform: scaleX(-1) translateX(2px) rotate(15deg); }
            50% { transform: scaleX(-1) translateX(2px) rotate(15deg); filter: drop-shadow(2px 0 4px rgba(225,29,72,0.4)); }
          }
          @keyframes impact-spark {
            0%, 40%, 100% { opacity: 0; transform: scale(0); }
            45% { opacity: 1; transform: scale(1.5); }
            55% { opacity: 0; transform: scale(2); }
          }
        `}</style>
        <div className="relative w-20 h-20 bg-[#EFF6FF] rounded-2xl flex items-center justify-center mx-auto shadow-sm border border-[#2563EB]/20 overflow-hidden">
          {/* Blue Sword (Player 1) */}
          <div className="absolute w-8 h-8 flex items-center justify-center" style={{ animation: 'clash-left 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}>
            <Sword className="w-6 h-6 text-[#2563EB]" />
          </div>
          {/* Red Sword (Player 2) */}
          <div className="absolute w-8 h-8 flex items-center justify-center" style={{ animation: 'clash-right 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}>
            <Sword className="w-6 h-6 text-rose-500" />
          </div>
          {/* Clash Impact Spark */}
          <div className="absolute z-10 w-3 h-3 rounded-full bg-yellow-400 blur-[1px]" style={{ animation: 'impact-spark 1.2s ease-out infinite' }} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">AI Multiplayer Challenge</h1>
          <p className="text-[#64748B] mt-2 max-w-lg mx-auto">
            Create an instant battle room. Select 1v1 or Group mode, enter any topic, share the link, and the AI will generate a unique quiz for everyone when they join!
          </p>
        </div>
      </div>

      {/* Main Card */}
      {!roomCreated ? (
        <Card className="border-[#E2E8F0] shadow-sm bg-white overflow-hidden">
          <CardContent className="p-8">
            <form onSubmit={handleCreateRoom} className="space-y-6">
              <div className="space-y-4">
                <label className="text-sm font-semibold text-[#0F172A]">Choose Game Mode</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setRoomType('1v1')}
                    className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${
                      roomType === '1v1' 
                        ? 'border-[#2563EB] bg-[#EFF6FF] text-[#2563EB]' 
                        : 'border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B] hover:border-[#CBD5E1]'
                    }`}
                  >
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-current/20 flex items-center justify-center"><UserPlus className="w-4 h-4" /></div>
                      <div className="w-8 h-8 rounded-full bg-current/20 flex items-center justify-center"><UserPlus className="w-4 h-4" /></div>
                    </div>
                    <span className="font-semibold text-sm">1v1 Battle</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRoomType('group')}
                    className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${
                      roomType === 'group' 
                        ? 'border-[#2563EB] bg-[#EFF6FF] text-[#2563EB]' 
                        : 'border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B] hover:border-[#CBD5E1]'
                    }`}
                  >
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-current/20 flex items-center justify-center"><Users className="w-4 h-4" /></div>
                      <div className="w-8 h-8 rounded-full bg-current/20 flex items-center justify-center"><Users className="w-4 h-4" /></div>
                      <div className="w-8 h-8 rounded-full bg-current/20 flex items-center justify-center"><Users className="w-4 h-4" /></div>
                    </div>
                    <span className="font-semibold text-sm">Group Lobby</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#0F172A]">What topic do you want to battle on?</label>
                <div className="relative">
                  <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400" />
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. React Hooks, Quantum Physics, World War II..."
                    className="w-full pl-12 pr-4 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-base"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 text-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-sm border-0 transition-colors"
                disabled={!topic.trim() || isCreating}
              >
                {isCreating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Generating Challenge Room...
                  </>
                ) : (
                  <>
                    Create AI Challenge Room
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-[#E2E8F0] shadow-sm bg-white overflow-hidden relative">
          {/* Decorative background circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-sky-500/5 rounded-full blur-3xl" />
          
          <CardContent className="p-10 text-center relative z-10 space-y-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-4 border border-emerald-200">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                Room Created Successfully
              </div>
              <h2 className="text-2xl font-bold text-[#0F172A]">
                {roomType === '1v1' ? 'Waiting for Opponent...' : 'Waiting for Players...'}
              </h2>
              <p className="text-slate-500">
                Send this link to {roomType === '1v1' ? 'a friend' : 'your friends'}. The AI will instantly generate your <strong className="text-[#2563EB]">"{topic}"</strong> quiz as soon as they join.
              </p>
            </div>

            <div className="max-w-md mx-auto p-2 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] shadow-sm flex items-center">
              <div className="px-4 py-3 bg-white rounded-lg flex-1 overflow-hidden border border-[#E2E8F0] mr-2">
                <p className="font-mono text-sm text-[#64748B] truncate text-left">{inviteLink}</p>
              </div>
              <Button 
                onClick={handleCopy}
                className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white h-[46px] px-6 shrink-0 transition-colors"
              >
                {copiedLink ? (
                  <><Check className="w-4 h-4 mr-2" /> Copied</>
                ) : (
                  <><Copy className="w-4 h-4 mr-2" /> Copy Link</>
                )}
              </Button>
            </div>

            <div className="pt-6 border-t border-[#E2E8F0] flex justify-center gap-8 md:gap-12 text-slate-400">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center font-bold border-2 border-white shadow-sm">
                  You
                </div>
                <span className="text-sm font-medium text-slate-600">Ready</span>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center animate-pulse">
                  <UserPlus className="w-5 h-5 text-slate-300" />
                </div>
                <span className="text-sm font-medium">Waiting...</span>
              </div>

              {roomType === 'group' && (
                <>
                  <div className="flex flex-col items-center gap-2 hidden sm:flex">
                    <div className="w-12 h-12 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center animate-pulse" style={{ animationDelay: '150ms' }}>
                      <UserPlus className="w-5 h-5 text-slate-300" />
                    </div>
                    <span className="text-sm font-medium">Waiting...</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 hidden sm:flex">
                    <div className="w-12 h-12 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center animate-pulse" style={{ animationDelay: '300ms' }}>
                      <UserPlus className="w-5 h-5 text-slate-300" />
                    </div>
                    <span className="text-sm font-medium">Waiting...</span>
                  </div>
                </>
              )}
            </div>

          </CardContent>
        </Card>
      )}
    </div>
  );
}
