'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Send,
  User,
  Copy,
  Check,
  BookOpen,
  ArrowRight,
  Lightbulb,
  Zap,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function TeacherAIAssistant({ onLaunchGeneratorWithPrompt }) {
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'ai',
      text: 'Hello Professor! 👋 I am your Quizora AI Teaching Assistant. I can help you draft multi-week assessment schedules, generate rubric explanations, analyze student misconceptions, or formulate custom questions. What are we designing today?',
      timestamp: 'Just now',
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedMsgId, setCopiedMsgId] = useState('');
  const messageCounterRef = React.useRef(2);

  const promptSuggestions = [
    'Create a 20-question quiz on React Hooks for intermediate students.',
    'Explain common misconceptions students have with Dynamic Programming memoization.',
    'Draft a 3-week assessment schedule for Web Development covering Next.js and REST APIs.',
    'Write 3 tricky multiple-choice questions on JavaScript Event Loop with distractors.',
  ];

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputPrompt;
    if (!query.trim()) return;

    const userMessageId = `usr_${messageCounterRef.current++}`;
    const userMessage = {
      id: userMessageId,
      sender: 'user',
      text: query.trim(),
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputPrompt('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponseText = `Here is a tailored proposal based on your prompt:\n\n1. **Core Concept Focus**: Break down into foundational syntax, state lifecycles, and edge cases.\n2. **Suggested Assessment Distribution**:\n   - 40% Conceptual Definitions & Core Mechanics\n   - 40% Code Output & Execution Tracing\n   - 20% Performance Optimization & Distractor Analysis\n\n3. **Recommended Next Step**: You can import this directly into the AI Quiz Generator to synthesize full question items with pedagogical hints.`;

      if (query.toLowerCase().includes('dynamic programming')) {
        aiResponseText = `**Key Student Misconceptions in Dynamic Programming**:\n\n- **Overlapping Subproblems vs. Divide & Conquer**: Students often confuse DP with MergeSort because both divide tasks. Highlight that DP requires *repeated* identical calls that benefit from memoization.\n- **State Definition**: Learners struggle to articulate what \`dp[i][j]\` represents in plain English before writing loops.\n\n**Pedagogical Tip**: Always ask students to define the recurrence relation on paper before coding the array.`;
      } else if (query.toLowerCase().includes('react hooks')) {
        aiResponseText = `**React Hooks Assessment Blueprint (20 Questions)**:\n\n- **useState & State Batching** (4 Qs): Asynchronous updates, state updater functions \`prev => prev + 1\`.\n- **useEffect & Cleanup** (6 Qs): Dependency arrays, stale closures, unmount cleanups.\n- **useMemo & useCallback** (5 Qs): Referential equality, avoiding redundant re-renders.\n- **useRef & DOM References** (3 Qs): Mutable values across renders without re-rendering.\n- **Custom Hooks** (2 Qs): Composition and rules of hooks.\n\nReady to generate these questions in the Review Studio? Click below to load!`;
      }

      const aiMessageId = `ai_${messageCounterRef.current++}`;
      const aiMessage = {
        id: aiMessageId,
        sender: 'ai',
        text: aiResponseText,
        timestamp: 'Just now',
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleCopy = (id, text) => {
    navigator.clipboard?.writeText(text);
    setCopiedMsgId(id);
    setTimeout(() => setCopiedMsgId(''), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="ai" className="gap-1 px-3 py-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curriculum Intelligence</span>
          </Badge>
          <span className="text-xs text-[#64748B] font-mono">Real-Time Educator Co-Pilot</span>
        </div>
        <h2 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
          Quizora AI Teaching Assistant
        </h2>
        <p className="text-xs sm:text-sm text-[#64748B]">
          Consult your pedagogical assistant for exam strategy, distractor rationale, and personalized remediation.
        </p>
      </div>

      {/* Suggestion Chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-[#64748B] flex items-center gap-1">
          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
          <span>Quick Prompts:</span>
        </span>
        {promptSuggestions.map((sug, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSendMessage(sug)}
            className="px-3 py-1.5 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#2563EB] hover:text-[#2563EB] text-xs font-medium text-[#0F172A] transition-colors shadow-2xs cursor-pointer text-left"
          >
            {sug}
          </button>
        ))}
      </div>

      {/* Interactive Chat Console */}
      <Card className="bg-white border-[#E2E8F0] shadow-md rounded-3xl overflow-hidden flex flex-col h-[520px]">
        {/* Messages Stream */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[#F8FAFC]">
          {messages.map((m) => {
            const isAI = m.sender === 'ai';
            return (
              <div
                key={m.id}
                className={`flex gap-3 max-w-2xl ${isAI ? 'self-start' : 'self-end ml-auto flex-row-reverse'}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs shrink-0 ${
                    isAI
                      ? 'bg-[#0F172A] text-white shadow-xs'
                      : 'bg-[#2563EB] text-white shadow-xs'
                  }`}
                >
                  {isAI ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                <div
                  className={`p-4 rounded-2xl text-xs space-y-2 relative group ${
                    isAI
                      ? 'bg-white border border-[#E2E8F0] text-[#0F172A] shadow-2xs'
                      : 'bg-[#2563EB] text-white shadow-xs'
                  }`}
                >
                  <p className="whitespace-pre-line leading-relaxed">{m.text}</p>

                  <div className="flex items-center justify-between text-[10px] text-[#64748B] pt-1">
                    <span className={isAI ? 'text-[#64748B]' : 'text-blue-100'}>{m.timestamp}</span>

                    {isAI && (
                      <button
                        type="button"
                        onClick={() => handleCopy(m.id, m.text)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-[#2563EB] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        {copiedMsgId === m.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-3 self-start max-w-xl">
              <div className="w-8 h-8 rounded-xl bg-[#0F172A] text-white flex items-center justify-center text-xs shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#E2E8F0] flex items-center gap-2 text-xs text-[#64748B]">
                <div className="w-2 h-2 rounded-full bg-[#2563EB] animate-ping" />
                <span>Quizora AI is formulating response...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-[#E2E8F0]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-3"
          >
            <input
              type="text"
              placeholder="Ask Quizora AI (e.g. 'Create a 20-question quiz on React Hooks for intermediate students')..."
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              className="flex-1 px-4 py-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0F172A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
            />
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={!inputPrompt.trim() || isTyping}
              className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white gap-1.5 text-xs px-5 shadow-sm"
            >
              <span>Ask AI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
