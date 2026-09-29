'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Wand2,
  CheckCircle2,
  Edit2,
  Trash2,
  RotateCcw,
  Plus,
  BookOpen,
  ArrowRight,
  HelpCircle,
  Lightbulb,
  Check,
  AlertCircle,
  FileText,
  UploadCloud,
  Layers,
  Save,
  Send,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import aiService from '@/services/aiService';

export default function TeacherAIGenerator({ onQuizPublished }) {
  // Step State: 'configure' | 'review' | 'published'
  const [step, setStep] = useState('configure');
  const [isGenerating, setIsGenerating] = useState(false);

  // Form State
  const [topic, setTopic] = useState('Data Structures');
  const [sourceType, setSourceType] = useState('topic'); // 'topic' | 'pdf' | 'notes'
  const [notesContent, setNotesContent] = useState('');
  const [pdfFileName, setPdfFileName] = useState('');
  const [questionCount, setQuestionCount] = useState(10);
  const [difficulty, setDifficulty] = useState('medium');
  const [questionTypes, setQuestionTypes] = useState({
    mcq: true,
    trueFalse: true,
    shortAnswer: false,
    coding: false,
  });

  // Review Questions State
  const [reviewedQuestions, setReviewedQuestions] = useState([]);
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [publishedQuizTitle, setPublishedQuizTitle] = useState('');

  // Generate Questions Action
  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsGenerating(true);

    try {
      // Create initial simulated questions crafted from topic
      setTimeout(() => {
        const generated = [
          {
            id: 'q_1',
            prompt: `Which data structure follows the First-In, First-Out (FIFO) principle in ${topic}?`,
            options: ['Stack', 'Queue', 'Tree', 'Graph'],
            correctAnswer: 1, // Queue
            difficulty: 'easy',
            topic: topic,
            explanation: 'A Queue enforces FIFO order where the first inserted element is the first one removed.',
            hint: 'Think of a line of people waiting for tickets.',
            type: 'mcq',
          },
          {
            id: 'q_2',
            prompt: `What is the worst-case time complexity of searching in an unbalanced Binary Search Tree?`,
            options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
            correctAnswer: 2, // O(n)
            difficulty: 'medium',
            topic: topic,
            explanation: 'When an unbalanced BST degenerates into a linked list, traversal requires inspecting each node: O(n).',
            hint: 'Consider what happens when keys are inserted in strictly ascending order.',
            type: 'mcq',
          },
          {
            id: 'q_3',
            prompt: `True or False: In a Max-Heap, the root node always contains the minimum key in the collection.`,
            options: ['True', 'False'],
            correctAnswer: 1, // False
            difficulty: 'easy',
            topic: topic,
            explanation: 'In a Max-Heap, the root always stores the maximum element according to the heap property.',
            hint: 'Recall the difference between Max-Heap and Min-Heap properties.',
            type: 'trueFalse',
          },
          {
            id: 'q_4',
            prompt: `Which algorithmic paradigm stores solutions to subproblems to avoid redundant calculations?`,
            options: ['Dynamic Programming', 'Greedy Method', 'Divide and Conquer', 'Brute Force'],
            correctAnswer: 0, // Dynamic Programming
            difficulty: 'medium',
            topic: topic,
            explanation: 'Dynamic Programming optimizes overlapping subproblems through memoization or tabulation.',
            hint: 'Think of Fibonacci numbers and caching previous values.',
            type: 'mcq',
          },
          {
            id: 'q_5',
            prompt: `What graph traversal algorithm uses a FIFO Queue to visit neighbors level-by-level?`,
            options: ['Depth-First Search (DFS)', 'Breadth-First Search (BFS)', 'Dijkstra Algorithm', 'Topological Sort'],
            correctAnswer: 1, // BFS
            difficulty: 'medium',
            topic: topic,
            explanation: 'Breadth-First Search explores vertices layer-by-layer utilizing a FIFO Queue.',
            hint: 'It radiates outward like ripples on water.',
            type: 'mcq',
          },
        ];

        setReviewedQuestions(generated);
        setIsGenerating(false);
        setStep('review');
      }, 1200);
    } catch (err) {
      alert(err.message || 'Failed to formulate questions with AI');
      setIsGenerating(false);
    }
  };

  // Toggle question type
  const handleToggleType = (key) => {
    setQuestionTypes((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Update question prompt
  const handleUpdatePrompt = (id, newPrompt) => {
    setReviewedQuestions(
      reviewedQuestions.map((q) => (q.id === id ? { ...q, prompt: newPrompt } : q))
    );
  };

  // Update question option
  const handleUpdateOption = (qId, optionIndex, newText) => {
    setReviewedQuestions(
      reviewedQuestions.map((q) => {
        if (q.id === qId) {
          const updatedOptions = [...q.options];
          updatedOptions[optionIndex] = newText;
          return { ...q, options: updatedOptions };
        }
        return q;
      })
    );
  };

  // Set correct answer
  const handleSetCorrectAnswer = (qId, optionIndex) => {
    setReviewedQuestions(
      reviewedQuestions.map((q) => (q.id === qId ? { ...q, correctAnswer: optionIndex } : q))
    );
  };

  // Update explanation
  const handleUpdateExplanation = (qId, newExp) => {
    setReviewedQuestions(
      reviewedQuestions.map((q) => (q.id === qId ? { ...q, explanation: newExp } : q))
    );
  };

  // Regenerate single question
  const handleRegenerateQuestion = (qId) => {
    setReviewedQuestions(
      reviewedQuestions.map((q) => {
        if (q.id === qId) {
          return {
            ...q,
            prompt: `(Regenerated) What is the average-case lookup time complexity in a balanced Red-Black Tree?`,
            options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
            correctAnswer: 1,
            difficulty: 'hard',
            explanation: 'A Red-Black Tree maintains logarithmic height guarantee ensuring O(log n) searches.',
            hint: 'A self-balancing binary search tree.',
          };
        }
        return q;
      })
    );
  };

  // Delete question
  const handleDeleteQuestion = (qId) => {
    setReviewedQuestions(reviewedQuestions.filter((q) => q.id !== qId));
  };

  // Add custom question
  const handleAddQuestion = () => {
    const newQ = {
      id: `q_${Date.now()}`,
      prompt: 'New Question Title: Describe the concept here...',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 0,
      difficulty: 'medium',
      topic: topic,
      explanation: 'Explanation of why this answer is correct.',
      hint: 'Helpful clue for learners.',
      type: 'mcq',
    };
    setReviewedQuestions([...reviewedQuestions, newQ]);
    setEditingQuestionId(newQ.id);
  };

  // Approve and Publish
  const handleApproveAndPublish = () => {
    const quizTitle = `${topic} Assessment`;
    setPublishedQuizTitle(quizTitle);
    setStep('published');

    if (onQuizPublished) {
      onQuizPublished({
        title: quizTitle,
        topic: topic.toLowerCase().replace(/\s+/g, '-'),
        difficulty,
        questionsCount: reviewedQuestions.length,
        questions: reviewedQuestions,
        status: 'published',
      });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="ai" className="gap-1 px-3 py-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Curriculum Engine</span>
          </Badge>
          <span className="text-xs text-[#64748B] font-mono">Review &bull; Approve &bull; Publish</span>
        </div>
        <h2 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
          AI Quiz Generator &amp; Review Studio
        </h2>
        <p className="text-xs sm:text-sm text-[#64748B]">
          Generate multi-format quizzes from topics, PDFs, or lecture notes. Give educators complete editorial review before publishing.
        </p>
      </div>

      {/* Progress Stepper */}
      <div className="flex items-center justify-between max-w-xl mx-auto p-2 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs text-xs font-semibold">
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl ${step === 'configure' ? 'bg-[#2563EB] text-white' : 'text-[#64748B]'}`}>
          <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center font-mono text-[10px]">1</span>
          <span>Configure AI</span>
        </div>
        <div className="w-8 h-px bg-[#E2E8F0]" />
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl ${step === 'review' ? 'bg-[#2563EB] text-white' : 'text-[#64748B]'}`}>
          <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center font-mono text-[10px]">2</span>
          <span>Review Questions ({reviewedQuestions.length})</span>
        </div>
        <div className="w-8 h-px bg-[#E2E8F0]" />
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl ${step === 'published' ? 'bg-emerald-600 text-white' : 'text-[#64748B]'}`}>
          <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center font-mono text-[10px]">3</span>
          <span>Published</span>
        </div>
      </div>

      {/* STEP 1: CONFIGURE FORM */}
      {step === 'configure' && (
        <Card className="max-w-3xl mx-auto bg-white border-[#E2E8F0] shadow-md p-6 sm:p-8 rounded-3xl space-y-6">
          <form onSubmit={handleGenerate} className="space-y-6 text-xs">
            {/* Topic Input */}
            <div className="space-y-1.5">
              <label className="block font-bold text-[#0F172A] text-sm">
                Topic or Subject *
              </label>
              <input
                type="text"
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Data Structures, React Hooks, PostgreSQL Indexing"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-sm text-[#0F172A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
              />
            </div>

            {/* Source Selector: Topic vs PDF vs Notes */}
            <div className="space-y-2">
              <label className="block font-bold text-[#0F172A]">Source Material</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setSourceType('topic')}
                  className={`p-3 rounded-2xl border text-left space-y-1 transition-all cursor-pointer ${
                    sourceType === 'topic'
                      ? 'bg-blue-50 border-[#2563EB] text-[#0F172A] ring-1 ring-[#2563EB]/30'
                      : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:border-[#CBD5E1]'
                  }`}
                >
                  <div className="font-bold text-xs flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>Topic Name</span>
                  </div>
                  <p className="text-[10px] text-[#64748B]">AI drafts questions from general domain knowledge</p>
                </button>

                <button
                  type="button"
                  onClick={() => setSourceType('notes')}
                  className={`p-3 rounded-2xl border text-left space-y-1 transition-all cursor-pointer ${
                    sourceType === 'notes'
                      ? 'bg-blue-50 border-[#2563EB] text-[#0F172A] ring-1 ring-[#2563EB]/30'
                      : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:border-[#CBD5E1]'
                  }`}
                >
                  <div className="font-bold text-xs flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>Lecture Notes</span>
                  </div>
                  <p className="text-[10px] text-[#64748B]">Paste transcript, outline, or markdown text</p>
                </button>

                <button
                  type="button"
                  onClick={() => setSourceType('pdf')}
                  className={`p-3 rounded-2xl border text-left space-y-1 transition-all cursor-pointer ${
                    sourceType === 'pdf'
                      ? 'bg-blue-50 border-[#2563EB] text-[#0F172A] ring-1 ring-[#2563EB]/30'
                      : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:border-[#CBD5E1]'
                  }`}
                >
                  <div className="font-bold text-xs flex items-center gap-1.5">
                    <UploadCloud className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>PDF Document</span>
                  </div>
                  <p className="text-[10px] text-[#64748B]">Analyze uploaded syllabus or textbook chapter</p>
                </button>
              </div>

              {/* Source Input Area */}
              {sourceType === 'notes' && (
                <div className="pt-2">
                  <textarea
                    rows={4}
                    placeholder="Paste lecture notes or textbook summary here..."
                    value={notesContent}
                    onChange={(e) => setNotesContent(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 text-xs"
                  />
                </div>
              )}

              {sourceType === 'pdf' && (
                <div className="pt-2 p-4 rounded-2xl border-2 border-dashed border-[#CBD5E1] text-center space-y-2 bg-[#F8FAFC]">
                  <UploadCloud className="w-8 h-8 text-[#2563EB] mx-auto" />
                  <p className="font-bold text-[#0F172A] text-xs">Drop PDF here or click to browse</p>
                  <span className="text-[10px] text-[#64748B] block">Supports textbooks, slides, and exam papers (up to 15MB)</span>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setPdfFileName(e.target.files?.[0]?.name || '')}
                    className="text-xs text-[#64748B] mx-auto block file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-[#2563EB]"
                  />
                  {pdfFileName && <div className="text-xs text-emerald-600 font-bold">Selected: {pdfFileName}</div>}
                </div>
              )}
            </div>

            {/* Questions Count & Difficulty */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block font-bold text-[#0F172A]">Number of Questions</label>
                <div className="flex items-center gap-2">
                  {[5, 10, 15, 20].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setQuestionCount(num)}
                      className={`flex-1 py-2 rounded-xl border font-bold font-mono transition-all cursor-pointer ${
                        questionCount === num
                          ? 'bg-[#0F172A] text-white border-[#0F172A]'
                          : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:border-[#CBD5E1]'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block font-bold text-[#0F172A]">Difficulty Level</label>
                <div className="flex items-center gap-2">
                  {['easy', 'medium', 'hard'].map((diff) => (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => setDifficulty(diff)}
                      className={`flex-1 py-2 rounded-xl border font-bold capitalize transition-all cursor-pointer ${
                        difficulty === diff
                          ? 'bg-[#2563EB] text-white border-[#2563EB]'
                          : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:border-[#CBD5E1]'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Question Types Multi-Select */}
            <div className="space-y-2">
              <label className="block font-bold text-[#0F172A]">Question Types</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { key: 'mcq', label: 'Multiple Choice' },
                  { key: 'trueFalse', label: 'True / False' },
                  { key: 'shortAnswer', label: 'Short Answer' },
                  { key: 'coding', label: 'Code Snippet' },
                ].map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => handleToggleType(t.key)}
                    className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all cursor-pointer ${
                      questionTypes[t.key]
                        ? 'bg-blue-50 border-[#2563EB] text-[#2563EB] font-bold'
                        : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B]'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-md border flex items-center justify-center text-[10px] ${
                        questionTypes[t.key]
                          ? 'bg-[#2563EB] border-[#2563EB] text-white'
                          : 'border-[#CBD5E1] bg-white'
                      }`}
                    >
                      {questionTypes[t.key] && '✓'}
                    </div>
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-[#E2E8F0]">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isGenerating}
                className="w-full gap-2 text-sm bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-md"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>AI is synthesizing {questionCount} questions...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#38BDF8]" />
                    <span>Generate Quiz &amp; Enter Review Studio &rarr;</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* STEP 2: ✏️ QUESTION REVIEW STUDIO (Teacher Control Gate) */}
      {step === 'review' && (
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Studio Banner */}
          <div className="p-5 rounded-3xl bg-blue-50/80 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-xs font-bold">
                  ✓
                </span>
                <h3 className="font-extrabold text-[#0F172A] text-base">
                  AI Generated {reviewedQuestions.length} Questions for &ldquo;{topic}&rdquo;
                </h3>
              </div>
              <p className="text-xs text-[#64748B]">
                Review each prompt, alter answers, add explanations, or regenerate questions before making it available to students.
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleAddQuestion}
                className="text-xs gap-1.5 bg-white border-[#E2E8F0]"
              >
                <Plus className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Add Question</span>
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleApproveAndPublish}
                className="text-xs gap-1.5 bg-[#22C55E] hover:bg-emerald-600 text-white shadow-sm"
              >
                <Check className="w-4 h-4" />
                <span>Approve &amp; Publish</span>
              </Button>
            </div>
          </div>

          {/* List of Editable Questions */}
          <div className="space-y-4">
            {reviewedQuestions.map((q, idx) => (
              <Card
                key={q.id}
                className="bg-white border-[#E2E8F0] shadow-sm p-6 rounded-3xl space-y-4 hover:border-[#2563EB]/40 transition-all"
              >
                {/* Question Header & Controls */}
                <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-xl bg-[#0F172A] text-white font-mono font-bold text-xs flex items-center justify-center">
                      #{idx + 1}
                    </span>
                    <Badge variant="secondary" className="capitalize text-[10px]">
                      {q.difficulty}
                    </Badge>
                    <Badge variant="ai" className="text-[10px]">
                      {q.type}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleRegenerateQuestion(q.id)}
                      className="px-2.5 py-1 rounded-lg bg-[#F8FAFC] hover:bg-blue-50 text-[#2563EB] border border-[#E2E8F0] text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                      title="Generate new wording for this question"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Regenerate</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteQuestion(q.id)}
                      className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Delete this question"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Question Prompt Editor */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                    Question Prompt
                  </label>
                  <textarea
                    rows={2}
                    value={q.prompt}
                    onChange={(e) => handleUpdatePrompt(q.id, e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 bg-[#F8FAFC]"
                  />
                </div>

                {/* Options List with Radio button to set Correct Answer */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] flex items-center justify-between">
                    <span>Options (Click checkmark or radio to select correct answer)</span>
                    <span className="text-emerald-700 font-normal">
                      Correct Answer: Option {String.fromCharCode(65 + q.correctAnswer)}
                    </span>
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt, oIdx) => {
                      const isCorrect = oIdx === q.correctAnswer;
                      return (
                        <div
                          key={oIdx}
                          className={`p-2.5 rounded-xl border flex items-center gap-2.5 transition-all ${
                            isCorrect
                              ? 'bg-emerald-50/70 border-emerald-300 shadow-2xs'
                              : 'bg-white border-[#E2E8F0]'
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => handleSetCorrectAnswer(q.id, oIdx)}
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-transform cursor-pointer shrink-0 ${
                              isCorrect
                                ? 'bg-emerald-500 text-white scale-105'
                                : 'bg-slate-100 text-[#64748B] hover:bg-slate-200'
                            }`}
                            title="Click to mark as correct answer"
                          >
                            {isCorrect ? '✓' : String.fromCharCode(65 + oIdx)}
                          </button>
                          <input
                            type="text"
                            value={opt}
                            onChange={(e) => handleUpdateOption(q.id, oIdx, e.target.value)}
                            className={`w-full bg-transparent text-xs font-medium focus:outline-none ${
                              isCorrect ? 'text-emerald-950 font-bold' : 'text-[#0F172A]'
                            }`}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Pedagogical Explanation & Hint */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Pedagogical Explanation</span>
                    </label>
                    <textarea
                      rows={2}
                      value={q.explanation}
                      onChange={(e) => handleUpdateExplanation(q.id, e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/30 text-xs text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-amber-800 flex items-center gap-1">
                      <Lightbulb className="w-3 h-3 text-amber-600" />
                      <span>Pedagogical Hint (Optional)</span>
                    </label>
                    <textarea
                      rows={2}
                      value={q.hint || ''}
                      onChange={(e) => {
                        setReviewedQuestions(
                          reviewedQuestions.map((item) =>
                            item.id === q.id ? { ...item, hint: e.target.value } : item
                          )
                        );
                      }}
                      className="w-full p-2.5 rounded-xl border border-amber-200 bg-amber-50/30 text-xs text-amber-950 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Bottom Review Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm">
            <Button
              variant="secondary"
              size="md"
              onClick={() => setStep('configure')}
              className="text-xs"
            >
              &larr; Back to Configuration
            </Button>

            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                size="md"
                onClick={handleAddQuestion}
                className="gap-1.5 text-xs border-[#E2E8F0] text-[#0F172A]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Another Question</span>
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleApproveAndPublish}
                className="gap-2 text-xs bg-[#22C55E] hover:bg-emerald-600 text-white shadow-md"
              >
                <Check className="w-4 h-4" />
                <span>Approve &amp; Publish Quiz</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: PUBLISHED CONFIRMATION */}
      {step === 'published' && (
        <Card className="max-w-md mx-auto bg-white border-emerald-200 shadow-xl p-8 text-center space-y-5 rounded-3xl animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-3xl bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <h3 className="font-extrabold text-xl text-[#0F172A]">
              Quiz Published Successfully! 🎉
            </h3>
            <p className="text-xs text-[#64748B]">
              &ldquo;{publishedQuizTitle}&rdquo; with {reviewedQuestions.length} reviewed questions is now active and ready for your cohorts.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-left text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-[#64748B]">Topic:</span>
              <span className="font-bold text-[#0F172A]">{topic}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Difficulty:</span>
              <span className="font-bold capitalize text-[#0F172A]">{difficulty}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Total Approved:</span>
              <span className="font-bold font-mono text-emerald-600">{reviewedQuestions.length} Questions</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <Button
              variant="primary"
              size="md"
              onClick={() => setStep('configure')}
              className="w-full text-xs bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
            >
              <span>Create Another Quiz with AI</span>
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
