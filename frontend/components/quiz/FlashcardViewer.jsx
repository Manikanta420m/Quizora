'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  X,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  BookOpen,
  Award,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { useSound } from '@/context/SoundContext';

export default function FlashcardViewer({ quiz, isOpen, onClose }) {
  const { playSound } = useSound();
  const [cards, setCards] = useState(() =>
    (quiz?.questions || []).map((q, idx) => ({
      ...q,
      cardId: `card_${idx}`,
      originalIndex: idx,
    }))
  );
  const [prevQuiz, setPrevQuiz] = useState(quiz);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState(new Set());

  // Adjust state if quiz changes (official React pattern without cascading effect)
  if (quiz !== prevQuiz) {
    setPrevQuiz(quiz);
    setCards(
      (quiz?.questions || []).map((q, idx) => ({
        ...q,
        cardId: `card_${idx}`,
        originalIndex: idx,
      }))
    );
    setCurrentIndex(0);
    setIsFlipped(false);
    setMasteredIds(new Set());
  }

  // Flip card handler
  const handleFlip = useCallback(() => {
    playSound('flip');
    setIsFlipped((prev) => !prev);
  }, [playSound]);

  // Next card handler
  const handleNext = useCallback(() => {
    playSound('click');
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  }, [cards.length, playSound]);

  // Previous card handler
  const handlePrev = useCallback(() => {
    playSound('click');
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  }, [cards.length, playSound]);

  // Shuffle deck
  const handleShuffle = useCallback(() => {
    playSound('click');
    setIsFlipped(false);
    setCards((prev) => {
      const shuffled = [...prev];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
    setCurrentIndex(0);
  }, [playSound]);

  // Reset deck
  const handleReset = useCallback(() => {
    playSound('click');
    if (quiz?.questions) {
      setIsFlipped(false);
      setCards(
        quiz.questions.map((q, idx) => ({
          ...q,
          cardId: `card_${idx}`,
          originalIndex: idx,
        }))
      );
      setCurrentIndex(0);
      setMasteredIds(new Set());
    }
  }, [quiz, playSound]);

  // Mark card as Mastered
  const handleMarkMastered = () => {
    if (!currentCard) return;
    playSound('correct');
    setMasteredIds((prev) => {
      const next = new Set(prev);
      next.add(currentCard.cardId);
      return next;
    });
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  // Mark card as Still Learning
  const handleMarkStillLearning = () => {
    if (!currentCard) return;
    playSound('click');
    setMasteredIds((prev) => {
      const next = new Set(prev);
      next.delete(currentCard.cardId);
      return next;
    });
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleFlip();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.code === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleFlip, handleNext, handlePrev, onClose]);

  if (!isOpen || !cards.length) return null;

  const currentCard = cards[currentIndex];
  const isCurrentMastered = currentCard && masteredIds.has(currentCard.cardId);
  const masteredCount = masteredIds.size;
  const masteryPercentage = Math.round((masteredCount / cards.length) * 100);

  const correctIndex = Number(currentCard?.correctAnswer || 0);
  const correctOptionText = currentCard?.options?.[correctIndex] || 'Option ' + (correctIndex + 1);
  const correctLetter = String.fromCharCode(65 + correctIndex);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0F172A]/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-3xl flex flex-col max-h-[92vh] space-y-4">
        {/* Header Bar */}
        <div className="flex items-center justify-between bg-white border border-[#E2E8F0] rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center border border-blue-100">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-[#0F172A] text-base truncate max-w-[240px] sm:max-w-md">
                  {quiz.title}
                </h3>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-50 text-[#2563EB] border border-blue-200 uppercase">
                  {quiz.topic}
                </span>
              </div>
              <p className="text-xs text-[#64748B]">
                Card {currentIndex + 1} of {cards.length} &bull; Flashcard Study Mode
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShuffle}
              title="Shuffle Cards"
              className="text-[#64748B] hover:text-[#0F172A] p-2"
            >
              <Shuffle className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              title="Reset Mastery & Progress"
              className="text-[#64748B] hover:text-[#0F172A] p-2"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              title="Close Flashcards"
              className="text-[#64748B] hover:text-[#EF4444] p-2"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mastery Progress Bar */}
        <div className="px-2">
          <div className="flex items-center justify-between text-xs text-[#64748B] mb-1.5 font-medium">
            <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
              <Award className="w-3.5 h-3.5" />
              Mastered: {masteredCount} of {cards.length} Cards
            </span>
            <span>{masteryPercentage}% Complete</span>
          </div>
          <div className="h-2 w-full bg-[#E2E8F0] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#2563EB] transition-all duration-300"
              style={{ width: `${masteryPercentage}%` }}
            />
          </div>
        </div>

        {/* 3D Flip Card Container */}
        <div
          onClick={handleFlip}
          className="perspective-1000 w-full h-[360px] sm:h-[400px] cursor-pointer select-none group"
        >
          <div
            className={`transform-style-3d relative w-full h-full duration-500 transition-transform ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* FRONT FACE */}
            <div className="backface-hidden absolute inset-0 rounded-3xl bg-white border border-[#E2E8F0] p-6 sm:p-8 flex flex-col justify-between shadow-xl group-hover:border-[#2563EB]/40 transition-colors">
              <div className="flex items-center justify-between">
                <Badge variant="indigo" className="text-xs font-mono">
                  Question #{currentIndex + 1}
                </Badge>
                {isCurrentMastered ? (
                  <Badge variant="success" className="gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Mastered
                  </Badge>
                ) : (
                  <Badge variant="default">
                    Reviewing
                  </Badge>
                )}
              </div>

              <div className="my-auto py-4">
                <h4 className="text-xl sm:text-2xl font-bold text-[#0F172A] leading-relaxed tracking-tight">
                  {currentCard.question}
                </h4>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0] text-xs text-[#64748B]">
                <span className="flex items-center gap-1.5 text-[#2563EB] font-medium">
                  <RotateCw className="w-3.5 h-3.5 animate-pulse" />
                  Click or press [Space] to reveal answer
                </span>
                <span className="hidden sm:inline">Use &larr; / &rarr; arrow keys</span>
              </div>
            </div>

            {/* BACK FACE */}
            <div className="backface-hidden rotate-y-180 absolute inset-0 rounded-3xl bg-[#F8FAFC] border border-[#2563EB]/40 p-6 sm:p-8 flex flex-col justify-between shadow-xl">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Correct Answer: ({correctLetter})
                </span>
                <Badge variant="indigo" className="text-xs font-mono">
                  Card #{currentIndex + 1}
                </Badge>
              </div>

              <div className="my-auto space-y-4 py-2 overflow-y-auto max-h-[220px] pr-2">
                <div className="text-lg sm:text-xl font-bold text-[#0F172A] bg-white p-3.5 rounded-xl border border-emerald-200 shadow-2xs">
                  {correctOptionText}
                </div>

                {currentCard.explanation && (
                  <div className="text-sm text-[#111827] leading-relaxed bg-white p-3.5 rounded-xl border border-[#E2E8F0] shadow-2xs">
                    <div className="font-semibold text-[#2563EB] text-xs uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#38BDF8]" /> Concept Breakdown
                    </div>
                    {currentCard.explanation}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0] text-xs text-[#64748B]">
                <span className="flex items-center gap-1.5 text-[#2563EB]">
                  <RotateCw className="w-3.5 h-3.5" /> Click or press [Space] to flip back
                </span>
                <span className="text-emerald-600 font-medium">Ready to self-grade below</span>
              </div>
            </div>
          </div>
        </div>

        {/* Study Navigation & Self-Assessment Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
          {/* Previous / Next Controls */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
            <Button
              variant="secondary"
              size="md"
              onClick={handlePrev}
              className="gap-1 px-3 text-xs"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </Button>
            <span className="text-xs text-[#64748B] font-mono px-2 font-medium">
              {currentIndex + 1} / {cards.length}
            </span>
            <Button
              variant="secondary"
              size="md"
              onClick={handleNext}
              className="gap-1 px-3 text-xs"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Self-Assessment Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Button
              variant="secondary"
              size="md"
              onClick={handleMarkStillLearning}
              className="gap-1.5 text-xs text-amber-700 hover:text-amber-800 border-amber-200 hover:bg-amber-50"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Still Learning</span>
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleMarkMastered}
              className="gap-1.5 text-xs shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>Mark Mastered</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
