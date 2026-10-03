'use client';

import React, { useState, useEffect } from 'react';
import {
  Layers,
  Search,
  BookOpen,
  Clock,
  Sparkles,
  Play,
  Eye,
  MoreVertical,
  ArrowLeft,
  Zap,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function StudentFlashcards() {
  const [searchQuery, setSearchQuery] = useState('');
  const [flashcardDecks, setFlashcardDecks] = useState([]);

  // Study state
  const [activeDeck, setActiveDeck] = useState(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Mocking saved flashcards for now since there isn't a dedicated endpoint for fetching them yet.
  useEffect(() => {
    const mockDecks = [
      {
        id: 'fc-1',
        title: 'Advanced Data Structures',
        cardCount: 3,
        createdAt: '2026-10-01T10:00:00Z',
        lastStudied: '2 hours ago',
        masteryPercent: 75,
        flashcards: [
          { front: "What is a Trie?", back: "A tree-like data structure used for efficient retrieval of a key in a large dataset of strings." },
          { front: "What is the time complexity of searching a binary search tree (average case)?", back: "O(log n)" },
          { front: "What defines a B-Tree?", back: "A self-balancing tree data structure that maintains sorted data and allows searches, sequential access, insertions, and deletions in logarithmic time." }
        ]
      },
      {
        id: 'fc-2',
        title: 'React Hooks Lifecycle',
        cardCount: 2,
        createdAt: '2026-09-28T14:30:00Z',
        lastStudied: '1 day ago',
        masteryPercent: 90,
        flashcards: [
          { front: "What does useEffect do?", back: "It lets you synchronize a component with an external system or perform side effects." },
          { front: "When does useLayoutEffect run?", back: "It fires synchronously after all DOM mutations, before the browser has a chance to paint." }
        ]
      },
      {
        id: 'fc-3',
        title: 'Machine Learning Basics',
        cardCount: 3,
        createdAt: '2026-09-25T09:15:00Z',
        lastStudied: '3 days ago',
        masteryPercent: 40,
        flashcards: [
          { front: "What is overfitting?", back: "When a model learns the detail and noise in the training data to the extent that it negatively impacts the performance of the model on new data." },
          { front: "What is a perceptron?", back: "The simplest artificial neural network architecture, representing a single neuron." },
          { front: "What is gradient descent?", back: "An optimization algorithm used to minimize some function by iteratively moving in the direction of steepest descent." }
        ]
      },
    ];

    let savedDecks = [];
    try {
      const savedStr = localStorage.getItem('quizora_saved_flashcards');
      if (savedStr) {
        savedDecks = JSON.parse(savedStr);
      }
    } catch (e) {
      console.error('Failed to parse saved flashcards');
    }

    setFlashcardDecks([...savedDecks, ...mockDecks]);
  }, []);

  const filteredDecks = flashcardDecks.filter(deck =>
    deck.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startStudySession = (deck) => {
    setActiveDeck(deck);
    setActiveCardIndex(0);
    setIsFlipped(false);
  };

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setActiveCardIndex((prev) => Math.min(prev + 1, activeDeck.flashcards.length - 1));
    }, 150);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setActiveCardIndex((prev) => Math.max(prev - 1, 0));
    }, 150);
  };

  if (activeDeck) {
    const currentCard = activeDeck.flashcards[activeCardIndex];
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
           <Button onClick={() => setActiveDeck(null)} variant="ghost" className="text-[#64748B] hover:text-[#0F172A] -ml-2 cursor-pointer">
             <ArrowLeft className="w-4 h-4 mr-2" />
             Back to Decks
           </Button>
           <Badge variant="ai" className="px-3 py-1 text-xs shadow-sm bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border-blue-200">
             <Sparkles className="w-3.5 h-3.5 mr-1.5 text-blue-500" />
             AI Generated
           </Badge>
        </div>

        <div className="text-center space-y-2">
           <h2 className="text-2xl font-bold text-[#0F172A]">{activeDeck.title}</h2>
           <p className="text-[#64748B]">Card {activeCardIndex + 1} of {activeDeck.flashcards.length}</p>
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
           <Button onClick={prevCard} disabled={activeCardIndex === 0} variant="secondary" size="lg" className="w-32 shadow-sm cursor-pointer">
              Previous
           </Button>
           <Button onClick={nextCard} disabled={activeCardIndex === activeDeck.flashcards.length - 1} variant="primary" size="lg" className="w-32 shadow-md cursor-pointer">
              Next
           </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] flex items-center gap-3">
            <Layers className="w-8 h-8 text-[#2563EB]" />
            My Flashcards
          </h2>
          <p className="text-sm text-[#64748B] mt-1">
            Review and master your generated flashcard decks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Search flashcards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] transition-all shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Grid of Flashcard Decks */}
      {filteredDecks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDecks.map((deck) => (
            <Card
              key={deck.id}
              className="bg-white border-[#E2E8F0] hover:border-[#CBD5E1] shadow-sm hover:shadow-md transition-all group overflow-hidden flex flex-col h-full rounded-3xl"
            >
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                    <Layers className="w-5 h-5" />
                  </div>
                  <button className="p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 rounded-lg transition-colors cursor-pointer">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="font-bold text-[#0F172A] text-lg leading-tight mb-2 line-clamp-2">
                  {deck.title}
                </h3>

                <div className="flex items-center gap-4 text-xs text-[#64748B] mb-5">
                  <span className="flex items-center gap-1.5 font-medium">
                    <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                    {deck.cardCount} Cards
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {deck.lastStudied}
                  </span>
                </div>

                <div className="mt-auto space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-[#64748B]">Mastery</span>
                    <span className="text-[#2563EB]">{deck.masteryPercent}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#F1F5F9] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#2563EB] to-[#38BDF8]"
                      style={{ width: `${deck.masteryPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-[#E2E8F0] bg-[#F8FAFC] flex gap-2">
                <Button onClick={() => startStudySession(deck)} className="flex-1 gap-2 text-xs py-2 h-auto cursor-pointer">
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Study Now
                </Button>
                <Button onClick={() => startStudySession(deck)} variant="secondary" className="px-3 h-auto cursor-pointer text-slate-500 hover:text-slate-700">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 px-4">
          <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Layers className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[#0F172A] mb-2">No flashcards found</h3>
          <p className="text-[#64748B] max-w-sm mx-auto mb-6">
            You haven't generated any flashcard decks yet, or your search didn't match any titles.
          </p>
          <Button className="gap-2 cursor-pointer">
            <Sparkles className="w-4 h-4" />
            Generate Flashcards
          </Button>
        </div>
      )}
    </div>
  );
}
