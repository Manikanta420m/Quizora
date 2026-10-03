'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  ArrowLeft,
  Brain,
  Zap,
  CheckCircle2,
  Clock,
  Layers,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Cpu,
  GalleryVerticalEnd,
  StickyNote,
  Wand2,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import quizService from '@/services/quizService';

const SUGGESTION_CHIPS = [
  'Advanced Data Structures',
  'System Design Concepts',
  'React Hooks lifecycle',
  'JavaScript Closures',
  'Machine Learning Basics',
];

const FLASHCARD_COUNTS = [5, 10, 20, 50];

export default function StudentGenerateFlashcards({ onCancel }) {
  const router = useRouter();
  const { user } = useAuth();
  
  const [topic, setTopic] = useState('');
  const [numberOfCards, setNumberOfCards] = useState(10);
  const [customInstructions, setCustomInstructions] = useState('');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  
  const [generationStep, setGenerationStep] = useState(0);
  const generationSteps = [
    'Analyzing topic breadth...',
    'Extracting key terms & concepts...',
    'Writing concise definitions...',
    'Finalizing flashcard deck...'
  ];

  const [generatedDeck, setGeneratedDeck] = useState(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveDeck = () => {
    if (!generatedDeck || isSaved) return;
    
    // Save to localStorage
    const savedDecksStr = localStorage.getItem('quizora_saved_flashcards');
    let savedDecks = [];
    try {
      if (savedDecksStr) savedDecks = JSON.parse(savedDecksStr);
    } catch (e) {}

    const newDeck = {
      id: `fc-${Date.now()}`,
      title: generatedDeck.topic,
      cardCount: generatedDeck.flashcards.length,
      createdAt: new Date().toISOString(),
      lastStudied: 'Just now',
      masteryPercent: 0,
      flashcards: generatedDeck.flashcards
    };

    savedDecks.unshift(newDeck);
    localStorage.setItem('quizora_saved_flashcards', JSON.stringify(savedDecks));
    setIsSaved(true);
  };

  useEffect(() => {
    const pendingTopic = localStorage.getItem('pendingFlashcardTopic');
    if (pendingTopic) {
      setTopic(pendingTopic);
      localStorage.removeItem('pendingFlashcardTopic');
      // Delay slightly to allow state to settle, then trigger generate
      setTimeout(() => {
        const fakeEvent = { preventDefault: () => {} };
        handleGenerate(fakeEvent, pendingTopic);
      }, 500);
    }
  }, []);

  useEffect(() => {
    if (isGenerating) {
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep += 1;
        if (currentStep < generationSteps.length) {
          setGenerationStep(currentStep);
        } else {
          clearInterval(interval);
        }
      }, 1200);
      return () => clearInterval(interval);
    } else {
      setGenerationStep(0);
    }
  }, [isGenerating]);

  const handleGenerate = async (e, overrideTopic = null) => {
    e?.preventDefault();
    const activeTopic = overrideTopic || topic;
    if (!activeTopic.trim()) {
      setError('Please enter a topic to generate flashcards.');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedDeck(null);
    setIsSaved(false);

    try {
      const token = localStorage.getItem('auth_token');
      
      const response = await quizService.generateFlashcards({
        topic: activeTopic.trim(),
        numberOfCards: numberOfCards || 10,
        customInstructions: customInstructions.trim(),
      }, token);
      
      if (response && response.data && response.data.flashcards) {
         setGeneratedDeck(response.data);
         setActiveCardIndex(0);
         setIsFlipped(false);
      } else {
         throw new Error('Invalid flashcard data received');
      }
    } catch (err) {
      console.error('Error generating flashcards:', err);
      setError(err.message || 'Failed to generate flashcards. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setActiveCardIndex((prev) => Math.min(prev + 1, generatedDeck.flashcards.length - 1));
    }, 150);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setActiveCardIndex((prev) => Math.max(prev - 1, 0));
    }, 150);
  };

  if (generatedDeck) {
    const currentCard = generatedDeck.flashcards[activeCardIndex];
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
           <Button onClick={() => setGeneratedDeck(null)} variant="ghost" className="text-[#64748B] hover:text-[#0F172A] -ml-2 cursor-pointer">
             <ArrowLeft className="w-4 h-4 mr-2" />
             Generate New Deck
           </Button>
           <div className="flex items-center gap-3">
             <Button 
               onClick={handleSaveDeck} 
               disabled={isSaved} 
               variant={isSaved ? 'outline' : 'primary'} 
               size="sm"
               className="cursor-pointer gap-2 shadow-sm"
             >
               {isSaved ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Layers className="w-4 h-4" />}
               {isSaved ? 'Saved' : 'Save Deck'}
             </Button>
             <Badge variant="ai" className="px-3 py-1 text-xs shadow-sm bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border-blue-200">
               <Sparkles className="w-3.5 h-3.5 mr-1.5 text-blue-500" />
               AI Generated
             </Badge>
           </div>
        </div>

        <div className="text-center space-y-2">
           <h2 className="text-2xl font-bold text-[#0F172A]">{generatedDeck.topic} Flashcards</h2>
           <p className="text-[#64748B]">Card {activeCardIndex + 1} of {generatedDeck.flashcards.length}</p>
        </div>

        <div className="relative w-full max-w-2xl mx-auto h-80 perspective-[1000px]">
           <div 
             className="relative w-full h-full transition-transform duration-500 preserve-3d cursor-pointer"
             style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
             onClick={() => setIsFlipped(!isFlipped)}
           >
              <div className="absolute inset-0 backface-hidden bg-white border-2 border-slate-200 rounded-3xl shadow-xl flex flex-col items-center justify-center p-8 text-center hover:border-blue-400 transition-colors">
                 <span className="absolute top-4 left-6 text-sm font-bold text-slate-400">TERM</span>
                 <h3 className="text-3xl font-bold text-slate-800">{currentCard.front}</h3>
                 <p className="absolute bottom-6 text-sm text-slate-400 flex items-center gap-2">
                    <Zap className="w-4 h-4" /> Click to flip
                 </p>
              </div>

              <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl shadow-xl flex flex-col items-center justify-center p-10 text-center" style={{ transform: 'rotateY(180deg)' }}>
                 <span className="absolute top-4 left-6 text-sm font-bold text-blue-200">DEFINITION</span>
                 <p className="text-2xl font-medium text-white leading-relaxed">{currentCard.back}</p>
                 <p className="absolute bottom-6 text-sm text-blue-200 flex items-center gap-2">
                    <Zap className="w-4 h-4" /> Click to flip back
                 </p>
              </div>
           </div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-8">
           <Button onClick={prevCard} disabled={activeCardIndex === 0} variant="secondary" size="lg" className="w-32 shadow-sm">
              Previous
           </Button>
           <Button onClick={nextCard} disabled={activeCardIndex === generatedDeck.flashcards.length - 1} variant="primary" size="lg" className="w-32 shadow-md">
              Next
           </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
          {/* Header Banner */}
          <div className="relative p-6 sm:p-8 rounded-3xl border border-white/60 shadow-xl overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-6 group mb-4">
            {/* Animated Background Orbs */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] bg-blue-100/60 rounded-full mix-blend-multiply filter blur-[80px] animate-blob" />
            <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[150%] bg-purple-100/60 rounded-full mix-blend-multiply filter blur-[80px] animate-blob animation-delay-2000" />
            
            {/* Glassmorphism Surface */}
            <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl" />

            {/* Subtle ambient light graphic */}
            <div
              className="absolute right-0 top-0 bottom-0 w-1/2 bg-cover bg-right opacity-20 pointer-events-none mix-blend-overlay [mask-image:linear-gradient(to_left,black_20%,transparent_100%)] transition-transform duration-1000 group-hover:scale-105"
              style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
              aria-hidden="true"
            />
            
            {/* Left Content */}
            <div className="relative z-10 space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 text-blue-600 border border-white shadow-sm text-xs font-bold backdrop-blur-md">
                <Wand2 className="w-3.5 h-3.5" />
                Autonomous Flashcard Engine
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
                AI Flashcards <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Studio</span>
              </h1>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                Enter any engineering topic, concept, or library. The AI will formulate targeted,
                high-retention 3D flashcards with complex definitions and deep explanations.
              </p>
            </div>
            <div className="hidden lg:flex relative z-10 w-96 h-48 items-center justify-center mr-8 perspective-[1200px]">
              <style>{`
                @keyframes float-flip {
                  0% { transform: rotateY(0deg) translateY(0px) rotateX(10deg); }
                  25% { transform: rotateY(90deg) translateY(-10px) rotateX(5deg); }
                  50% { transform: rotateY(180deg) translateY(0px) rotateX(10deg); }
                  75% { transform: rotateY(270deg) translateY(10px) rotateX(5deg); }
                  100% { transform: rotateY(360deg) translateY(0px) rotateX(10deg); }
                }
                @keyframes glow-pulse {
                  0%, 100% { filter: drop-shadow(0 0 20px rgba(79, 70, 229, 0.4)); }
                  50% { filter: drop-shadow(0 0 40px rgba(99, 102, 241, 0.8)); }
                }
                @keyframes orbit-small {
                  0% { transform: rotate(0deg) translateX(80px) rotate(0deg); }
                  100% { transform: rotate(360deg) translateX(80px) rotate(-360deg); }
                }
              `}</style>
              
              {/* Background ambient glow */}
              <div className="absolute w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl" />

              {/* Orbiting elements */}
              <div className="absolute w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_15px_rgba(96,165,250,1)]" style={{ animation: 'orbit-small 8s linear infinite' }} />
              <div className="absolute w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_15px_rgba(192,132,252,1)]" style={{ animation: 'orbit-small 12s linear infinite reverse' }} />

              {/* 3D Spinning Flashcard */}
              <div className="relative w-32 h-44 preserve-3d" style={{ animation: 'float-flip 10s linear infinite, glow-pulse 4s ease-in-out infinite' }}>
                {/* Front of card */}
                <div className="absolute inset-0 backface-hidden bg-white border-2 border-indigo-100 rounded-2xl shadow-xl flex flex-col items-center justify-center p-4">
                  <Brain className="w-10 h-10 text-indigo-500 mb-3" />
                  <div className="w-16 h-2 bg-indigo-100 rounded-full mb-2" />
                  <div className="w-12 h-2 bg-indigo-100 rounded-full" />
                </div>
                {/* Back of card */}
                <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-xl flex flex-col items-center justify-center p-4" style={{ transform: 'rotateY(180deg)' }}>
                  <Zap className="w-10 h-10 text-white mb-3" />
                  <div className="w-20 h-2 bg-white/30 rounded-full mb-2" />
                  <div className="w-16 h-2 bg-white/30 rounded-full mb-2" />
                  <div className="w-12 h-2 bg-white/30 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <div className="text-sm text-red-800 font-medium">{error}</div>
            </div>
          )}

          <form onSubmit={handleGenerate} className="space-y-6">
            <div className="relative border border-white/60 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all overflow-visible group rounded-3xl p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-3xl" />
              <div className="relative z-10 space-y-5">
                <div>
                  <h3 className="text-base font-extrabold flex items-center gap-2 text-slate-800 mb-1">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm">1</div>
                    What do you want to memorize?
                  </h3>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Brain className="h-5 w-5 text-[#94A3B8] group-focus-within:text-[#2563EB] transition-colors" />
                  </div>
                  <input
                    type="text"
                    required
                    disabled={isGenerating}
                    className="block w-full pl-11 pr-4 py-3.5 border-2 border-[#E2E8F0] rounded-xl text-[#0F172A] placeholder-[#94A3B8] focus:ring-0 focus:border-[#2563EB] sm:text-sm font-medium transition-colors shadow-sm bg-[#F8FAFC] focus:bg-white"
                    placeholder="e.g. JavaScript Closures, AWS Services, or Spanish Vocabulary..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                     {topic.length > 2 && <CheckCircle2 className="w-5 h-5 text-emerald-500 animate-in zoom-in" />}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2.5 block">
                    Or select a suggested topic
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTION_CHIPS.map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        disabled={isGenerating}
                        onClick={() => setTopic(chip)}
                        className="px-3.5 py-1.5 rounded-lg border border-[#E2E8F0] bg-white text-xs font-medium text-[#475569] hover:bg-[#F8FAFC] hover:border-[#CBD5E1] hover:text-[#0F172A] transition-colors shadow-sm disabled:opacity-50"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative border border-white/60 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all overflow-hidden group rounded-3xl p-6 flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="relative z-10 space-y-5">
                  <div>
                    <h3 className="text-base font-extrabold flex items-center gap-2 text-slate-800 mb-1">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm">2</div>
                      Deck Size
                    </h3>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {FLASHCARD_COUNTS.map((num) => (
                      <button
                        key={num}
                        type="button"
                        disabled={isGenerating}
                        onClick={() => setNumberOfCards(num)}
                        className={`col-span-1 py-3 rounded-xl border font-bold transition-all shadow-sm flex flex-col items-center justify-center gap-1 ${
                          numberOfCards === num
                            ? 'bg-[#2563EB] border-[#2563EB] text-white ring-2 ring-[#2563EB] ring-offset-2'
                            : 'bg-white border-[#E2E8F0] text-[#475569] hover:border-[#2563EB]/40 hover:bg-[#F8FAFC]'
                        }`}
                      >
                        <span className="text-xl">{num}</span>
                        <span className={`text-[10px] font-medium uppercase tracking-wider ${numberOfCards === num ? 'text-white/80' : 'text-[#94A3B8]'}`}>Cards</span>
                      </button>
                    ))}
                    
                    <div className={`relative col-span-1 flex rounded-xl border transition-all overflow-hidden ${
                       !FLASHCARD_COUNTS.includes(numberOfCards) && numberOfCards > 0
                        ? 'bg-[#2563EB] border-[#2563EB] text-white shadow-sm'
                        : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A] hover:border-[#2563EB]/40'
                    }`}>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        disabled={isGenerating}
                        placeholder="Cst"
                        value={numberOfCards}
                        onChange={(e) => setNumberOfCards(Number(e.target.value) || '')}
                        className="w-full h-full text-center py-3 bg-transparent text-xl font-extrabold font-mono focus:outline-none placeholder:text-sm placeholder:font-sans placeholder:font-medium placeholder:text-current placeholder:opacity-50 appearance-none"
                        style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative border border-white/60 bg-white/70 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all overflow-hidden group rounded-3xl p-6 flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="relative z-10 space-y-5">
                  <div>
                    <h3 className="text-base font-extrabold flex items-center gap-2 text-slate-800 mb-1">
                      <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-sm">3</div>
                      Custom Focus (Optional)
                    </h3>
                  </div>
                  <textarea
                    rows={4}
                    disabled={isGenerating}
                    placeholder="e.g. Keep definitions under 1 sentence, focus on code examples..."
                    value={customInstructions}
                    onChange={(e) => setCustomInstructions(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#E2E8F0] text-[#111827] placeholder:text-[#94A3B8] text-sm focus:outline-none focus:border-[#2563EB] transition-all resize-none shadow-sm"
                  />
                  </div>
              </div>
            </div>

            {isGenerating && (
              <div className="p-6 rounded-3xl border border-blue-200 bg-blue-50/50 backdrop-blur-sm space-y-4 shadow-sm animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border-2 border-blue-600 border-t-transparent animate-spin shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">Generating Flashcards...</h4>
                    <p className="text-xs text-blue-600 mt-0.5">
                      {generationSteps[generationStep] || 'Finalizing flashcard deck...'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2 pt-1">
                  {generationSteps.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx <= generationStep ? 'bg-blue-600' : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl shadow-lg group mt-6">
              <div className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Cost: <span className="text-slate-800 font-extrabold">1 Generation Credit</span>
              </div>
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Button type="button" onClick={onCancel} variant="secondary" size="md" disabled={isGenerating} className="shadow-sm">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isGenerating}
                  disabled={isGenerating || !topic.trim()}
                  className="w-full sm:w-auto shadow-lg shadow-blue-500/20 bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 cursor-pointer transition-all hover:-translate-y-0.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Flashcards</span>
                </Button>
              </div>
            </div>
          </form>
    </div>
  );
}
