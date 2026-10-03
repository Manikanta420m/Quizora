'use client';

import React, { useState } from 'react';
import { 
  MonitorSpeaker,
  Copy, 
  Check, 
  Users,
  Loader2,
  BookOpen,
  UserPlus,
  PenTool,
  ChevronDown
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useQuery } from '@tanstack/react-query';
import quizService from '@/services/quizService';

export default function StudentManualChallenge() {
  const [sourceType, setSourceType] = useState('existing'); // 'existing' or 'new'
  const [selectedQuiz, setSelectedQuiz] = useState('');
  const [newQuizTitle, setNewQuizTitle] = useState('');
  const [newQuizData, setNewQuizData] = useState('');
  const [roomType, setRoomType] = useState('1v1'); // '1v1' or 'group'
  const [isCreating, setIsCreating] = useState(false);
  const [roomCreated, setRoomCreated] = useState(false);
  const [inviteLink, setInviteLink] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  
  // Fetch real quizzes from the backend
  const { data: quizzesResponse, isLoading } = useQuery({
    queryKey: ['quizzes'],
    queryFn: () => quizService.getQuizzes({}),
  });

  const myQuizzes = quizzesResponse?.quizzes || [];

  const handleCreateRoom = (e) => {
    e.preventDefault();
    if (sourceType === 'existing' && !selectedQuiz) return;
    if (sourceType === 'new' && (!newQuizTitle || !newQuizData)) return;
    
    setIsCreating(true);
    // Simulate API call to create room
    setTimeout(() => {
      const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      setInviteLink(`https://quizora.app/room/${roomCode}`);
      setRoomCreated(true);
      setIsCreating(false);
    }, 1000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const selectedQuizTitle = sourceType === 'existing' 
    ? myQuizzes.find(q => (q._id || q.id) === selectedQuiz)?.title 
    : newQuizTitle;

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-[#EFF6FF] rounded-2xl flex items-center justify-center mx-auto shadow-sm border border-[#2563EB]/20">
          <MonitorSpeaker className="w-8 h-8 text-[#2563EB]" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">Manual Quiz Room</h1>
          <p className="text-[#64748B] mt-2 max-w-lg mx-auto">
            Host a live room using one of your previously created quizzes. Select a quiz, invite your friends, and start the game!
          </p>
        </div>
      </div>

      {/* Main Card */}
      {!roomCreated ? (
        <Card className="border-[#E2E8F0] shadow-sm bg-white overflow-hidden">
          <CardContent className="p-8">
            <form onSubmit={handleCreateRoom} className="space-y-6">
              <div className="space-y-4">
                <label className="text-sm font-semibold text-[#0F172A]">Choose Room Mode</label>
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
                    <span className="font-semibold text-sm">1v1 Match</span>
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
                    <span className="font-semibold text-sm">Group Room</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-semibold text-[#0F172A]">Quiz Source</label>
                <div className="flex bg-[#F8FAFC] p-1 rounded-xl border border-[#E2E8F0]">
                  <button
                    type="button"
                    onClick={() => setSourceType('existing')}
                    className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                      sourceType === 'existing' ? 'bg-white text-[#2563EB] shadow-sm' : 'text-[#64748B] hover:text-[#0F172A]'
                    }`}
                  >
                    <BookOpen className="w-4 h-4 inline-block mr-2" />
                    Host Existing Quiz
                  </button>
                  <button
                    type="button"
                    onClick={() => setSourceType('new')}
                    className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                      sourceType === 'new' ? 'bg-white text-[#2563EB] shadow-sm' : 'text-[#64748B] hover:text-[#0F172A]'
                    }`}
                  >
                    <PenTool className="w-4 h-4 inline-block mr-2" />
                    Build New Quiz
                  </button>
                </div>
              </div>

              {sourceType === 'existing' ? (
                <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2">
                  <label className="text-sm font-semibold text-[#0F172A]">Select your Quiz</label>
                  <div className="relative">
                    <select
                      value={selectedQuiz}
                      onChange={(e) => setSelectedQuiz(e.target.value)}
                      className="w-full pl-4 pr-12 py-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all text-base appearance-none cursor-pointer"
                      required={sourceType === 'existing'}
                    >
                      <option value="" disabled>Select a quiz from your library...</option>
                      {isLoading ? (
                        <option value="" disabled>Loading your quizzes...</option>
                      ) : myQuizzes.length > 0 ? (
                        myQuizzes.map(quiz => (
                          <option key={quiz._id || quiz.id} value={quiz._id || quiz.id}>
                            {quiz.title}
                          </option>
                        ))
                      ) : (
                        <option value="" disabled>No quizzes found. Build a new one!</option>
                      )}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              ) : (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#0F172A]">New Quiz Title</label>
                    <input
                      type="text"
                      value={newQuizTitle}
                      onChange={(e) => setNewQuizTitle(e.target.value)}
                      placeholder="e.g. Weekly Math Test..."
                      className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all text-sm"
                      required={sourceType === 'new'}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#0F172A]">Quiz Questions & Answers</label>
                    <textarea
                      value={newQuizData}
                      onChange={(e) => setNewQuizData(e.target.value)}
                      placeholder="Type your questions manually here (e.g. Q: What is 2+2? A: 4)"
                      className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all text-sm min-h-[120px]"
                      required={sourceType === 'new'}
                    />
                  </div>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full h-14 text-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-sm border-0 transition-colors"
                disabled={isCreating || (sourceType === 'existing' && !selectedQuiz) || (sourceType === 'new' && (!newQuizTitle || !newQuizData))}
              >
                {isCreating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Creating Room...
                  </>
                ) : (
                  <>
                    Create Room
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
                Send this link to {roomType === '1v1' ? 'a friend' : 'your friends'}. You are hosting <strong className="text-[#2563EB]">"{selectedQuizTitle}"</strong>.
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
                  Host
                </div>
                <span className="text-sm font-medium text-slate-600">You</span>
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

            <Button className="mt-8 bg-emerald-600 hover:bg-emerald-700 text-white w-full max-w-sm" size="lg">
              Start Quiz Now
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
