'use client';

import React, { useState } from 'react';
import {
  Bot,
  Sparkles,
  Send,
  X,
  Brain,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import Button from '@/components/ui/Button';

export default function StudentAIAssistant({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hi there! I'm Quizora AI 🤖, your personal study companion. What would you like help with today?",
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messageCounterRef = React.useRef(2);

  const prompts = [
    'Explain binary search algorithm simply.',
    'Give me a harder React quiz on hooks.',
    'Why did I get question 3 wrong on closures?',
    'What should I study today based on my weak spots?',
  ];

  const handleSend = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsgId = messageCounterRef.current++;
    const userMsg = { id: userMsgId, sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = "Here's what you need to know about that concept: In computer science, mastering the core logic and memory model is key.";
      if (query.toLowerCase().includes('binary search')) {
        reply = "Binary Search operates on a sorted array by repeatedly dividing the search interval in half. At each step, compare the target with the middle element. Time complexity is O(log n), which is exponentially faster than O(n) linear search!";
      } else if (query.toLowerCase().includes('react')) {
        reply = "I recommend checking out our 'React Hooks Deep Dive' quiz! It tests closure staleness in useEffect, custom hook dependency arrays, and useMemo vs useCallback optimization trade-offs.";
      } else if (query.toLowerCase().includes('weak')) {
        reply = "Looking at your analytics, your weakest topic is Algorithms (DSA) at 52% accuracy, particularly Graphs and Dynamic Programming. Spending 15 minutes on our DSA remedial drill will yield the highest XP boost today!";
      }

      const aiMsgId = messageCounterRef.current++;
      setMessages((prev) => [
        ...prev,
        { id: aiMsgId, sender: 'ai', text: reply },
      ]);
      setIsTyping(false);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-2xl max-w-lg w-full p-6 space-y-4 animate-in zoom-in-95 duration-150 flex flex-col h-[520px]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-[#0F172A]">Ask Quizora AI 🤖</h3>
              <p className="text-[11px] text-[#64748B]">Personalized pedagogical tutor</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#64748B] hover:bg-[#F8FAFC] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Prompts */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
            Suggested Prompts:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {prompts.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => handleSend(p)}
                className="text-[11px] px-2.5 py-1 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#2563EB]/40 hover:text-[#2563EB] text-[#0F172A] transition-colors cursor-pointer truncate max-w-[220px]"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto space-y-3 p-2 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0]">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#2563EB] text-white rounded-br-none'
                    : 'bg-white border border-[#E2E8F0] text-[#0F172A] rounded-bl-none shadow-2xs'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="p-3 rounded-2xl bg-white border border-[#E2E8F0] text-xs text-[#64748B] animate-pulse">
                Quizora AI is thinking...
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 pt-2"
        >
          <input
            type="text"
            placeholder="Ask a question about algorithms, code, or your quizzes..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 px-3.5 py-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0F172A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
          />
          <Button
            type="submit"
            variant="primary"
            size="sm"
            className="bg-[#2563EB] text-white p-2.5 cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
