'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Sparkles,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowLeft,
  BookOpen,
  Check,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Navbar from '@/components/ui/Navbar';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import quizService from '@/services/quizService';

const INITIAL_QUESTION = () => ({
  question: '',
  options: ['', '', '', ''],
  correctAnswer: 0,
  explanation: '',
});

export default function CreateQuizPage() {
  const router = useRouter();
  const { user, token } = useAuth();

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [topic, setTopic] = useState('javascript');
  const [difficulty, setDifficulty] = useState('medium');
  const [timeLimit, setTimeLimit] = useState(10);
  const [questions, setQuestions] = useState([
    {
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: '',
    },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Add new blank question
  const handleAddQuestion = () => {
    setQuestions([...questions, INITIAL_QUESTION()]);
  };

  // Remove question by index
  const handleRemoveQuestion = (index) => {
    if (questions.length <= 1) {
      alert('A quiz must have at least one question.');
      return;
    }
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
  };

  // Update question prompt
  const handleQuestionTextChange = (index, value) => {
    const updated = [...questions];
    updated[index].question = value;
    setQuestions(updated);
  };

  // Update an option string
  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  // Set the correct answer index
  const handleSetCorrectAnswer = (qIndex, optIndex) => {
    const updated = [...questions];
    updated[qIndex].correctAnswer = optIndex;
    setQuestions(updated);
  };

  // Update explanation
  const handleExplanationChange = (qIndex, value) => {
    const updated = [...questions];
    updated[qIndex].explanation = value;
    setQuestions(updated);
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Basic Validations
    if (!title.trim()) {
      setErrorMsg('Please enter a quiz title.');
      return;
    }
    if (!topic.trim()) {
      setErrorMsg('Please specify a topic.');
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.question.trim()) {
        setErrorMsg(`Question #${i + 1} prompt cannot be empty.`);
        return;
      }
      for (let j = 0; j < q.options.length; j++) {
        if (!q.options[j].trim()) {
          setErrorMsg(`Question #${i + 1}, Option ${String.fromCharCode(65 + j)} cannot be empty.`);
          return;
        }
      }
      if (!q.explanation.trim()) {
        setErrorMsg(`Question #${i + 1} must include an educational explanation.`);
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const payload = {
        title: title.trim(),
        description: description.trim(),
        topic: topic.trim().toLowerCase(),
        difficulty,
        timeLimit: Number(timeLimit) || 10,
        questionType: 'multiple_choice',
        sourceType: 'manual',
        questions: questions.map((q) => ({
          question: q.question.trim(),
          options: q.options.map((opt) => opt.trim()),
          correctAnswer: Number(q.correctAnswer),
          explanation: q.explanation.trim(),
        })),
      };

      const res = await quizService.createQuiz(payload, token);
      if (res?.quiz?._id || res?.quiz?.id) {
        router.push(`/quizzes/${res.quiz._id || res.quiz.id}`);
      } else {
        router.push('/quizzes');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Failed to create quiz. Please check all fields.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-transparent text-[#111827] selection:bg-[#2563EB]/20">
        <Navbar />

        <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center justify-between">
            <Link
              href="/quizzes"
              className="inline-flex items-center gap-2 text-xs font-medium text-[#64748B] hover:text-[#0F172A] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Quiz Catalog
            </Link>
            <Badge variant="outline" className="font-mono text-xs">
              Dynamic Builder
            </Badge>
          </div>

          {/* Form Header Banner */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm relative overflow-hidden">
            <div
              className="absolute right-0 top-0 bottom-0 w-1/2 bg-cover bg-right opacity-35 pointer-events-none [mask-image:linear-gradient(to_left,black_20%,transparent_100%)]"
              style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
              aria-hidden="true"
            />
            <div className="relative z-10 space-y-1">
              <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
                Create New Practice Quiz
              </h1>
              <p className="text-sm text-[#64748B]">
                Author technical multiple-choice assessments with customized feedback and pedagogical explanations.
              </p>
            </div>
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-3 text-sm text-rose-800">
              <AlertCircle className="w-5 h-5 text-[#EF4444] shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Quiz Details */}
            <Card className="border-[#E2E8F0] bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2 text-[#0F172A]">
                  <BookOpen className="w-4 h-4 text-[#2563EB]" />
                  Step 1: Quiz Overview & Rules
                </CardTitle>
                <CardDescription className="text-[#64748B]">
                  Define the core metadata, target topic, and difficulty level.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Title */}
                <div>
                  <label className="block text-xs font-medium text-[#0F172A] mb-1.5">
                    Quiz Title <span className="text-[#EF4444]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Master Modern CSS Grid & Flexbox"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2E8F0] text-[#111827] placeholder:text-[#94A3B8] text-sm focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/30 transition-all"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-medium text-[#0F172A] mb-1.5">
                    Description / Learning Objectives
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Short summary of what students will practice in this quiz..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-white border border-[#E2E8F0] text-[#111827] placeholder:text-[#94A3B8] text-sm focus:outline-none focus:border-[#2563EB] transition-all resize-none"
                  />
                </div>

                {/* Topic, Difficulty & Time Limit Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Topic */}
                  <div>
                    <label className="block text-xs font-medium text-[#0F172A] mb-1.5">
                      Topic <span className="text-[#EF4444]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. css, react, javascript"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#E2E8F0] text-[#111827] text-sm focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  {/* Difficulty */}
                  <div>
                    <label className="block text-xs font-medium text-[#0F172A] mb-1.5">
                      Difficulty Level
                    </label>
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#E2E8F0] text-[#111827] text-sm focus:outline-none focus:border-[#2563EB]"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>

                  {/* Time Limit */}
                  <div>
                    <label className="block text-xs font-medium text-[#0F172A] mb-1.5">
                      Time Limit (Minutes)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={180}
                      value={timeLimit}
                      onChange={(e) => setTimeLimit(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#E2E8F0] text-[#111827] text-sm focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Dynamic Question Builder */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-[#2563EB]" />
                    Step 2: Questions ({questions.length})
                  </h2>
                  <p className="text-xs text-[#64748B]">
                    Provide 4 choices for each question and mark the radio button for the correct answer.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleAddQuestion}
                  className="gap-1.5 border-[#E2E8F0]"
                >
                  <Plus className="w-4 h-4 text-[#2563EB]" />
                  Add Question
                </Button>
              </div>

              {/* Questions Stack */}
              <div className="space-y-6">
                {questions.map((q, qIndex) => (
                  <Card key={qIndex} className="border-[#E2E8F0] bg-white shadow-sm relative">
                    <CardHeader className="pb-3 flex flex-row items-center justify-between border-b border-[#E2E8F0]">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-[#EFF6FF] border border-[#2563EB]/20 flex items-center justify-center text-xs font-bold text-[#2563EB]">
                          {qIndex + 1}
                        </span>
                        <span className="text-sm font-semibold text-[#0F172A]">
                          Question {qIndex + 1}
                        </span>
                      </div>

                      {questions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveQuestion(qIndex)}
                          className="p-1.5 rounded-lg text-[#64748B] hover:text-[#EF4444] hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Remove Question"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </CardHeader>

                    <CardContent className="p-6 space-y-4">
                      {/* Question Text */}
                      <div>
                        <label className="block text-xs font-medium text-[#0F172A] mb-1.5">
                          Question Prompt <span className="text-[#EF4444]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Which CSS unit is relative to the root element's font size?"
                          value={q.question}
                          onChange={(e) => handleQuestionTextChange(qIndex, e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2E8F0] text-[#111827] placeholder:text-[#94A3B8] text-sm focus:outline-none focus:border-[#2563EB] transition-all"
                        />
                      </div>

                      {/* 4 Options Grid */}
                      <div className="space-y-2.5 pt-2">
                        <label className="block text-xs font-medium text-[#0F172A]">
                          Options (Select the radio of the correct answer):
                        </label>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {q.options.map((opt, optIndex) => {
                            const isCorrect = q.correctAnswer === optIndex;
                            const optionLetter = String.fromCharCode(65 + optIndex);

                            return (
                              <div
                                key={optIndex}
                                className={`flex items-center gap-2.5 p-2 rounded-xl border transition-all ${
                                  isCorrect
                                    ? 'bg-emerald-50 border-emerald-300'
                                    : 'bg-[#F8FAFC] border-[#E2E8F0] hover:border-[#2563EB]/40'
                                }`}
                              >
                                <button
                                  type="button"
                                  onClick={() => handleSetCorrectAnswer(qIndex, optIndex)}
                                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 cursor-pointer transition-all ${
                                    isCorrect
                                      ? 'bg-[#22C55E] text-white shadow-xs'
                                      : 'bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0] hover:bg-slate-200'
                                  }`}
                                  title="Mark as correct answer"
                                >
                                  {isCorrect ? (
                                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                                  ) : (
                                    <span className="text-[10px] font-bold">{optionLetter}</span>
                                  )}
                                </button>

                                <input
                                  type="text"
                                  required
                                  placeholder={`Option ${optionLetter}`}
                                  value={opt}
                                  onChange={(e) =>
                                    handleOptionChange(qIndex, optIndex, e.target.value)
                                  }
                                  className="flex-1 bg-transparent text-sm text-[#111827] placeholder:text-[#94A3B8] focus:outline-none"
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Explanation */}
                      <div className="pt-2">
                        <label className="block text-xs font-medium text-[#0F172A] mb-1.5">
                          Educational Explanation <span className="text-[#EF4444]">*</span>
                        </label>
                        <textarea
                          rows={2}
                          required
                          placeholder="Explain why the marked answer is correct and clarify common misconceptions..."
                          value={q.explanation}
                          onChange={(e) => handleExplanationChange(qIndex, e.target.value)}
                          className="w-full px-4 py-2 rounded-xl bg-white border border-[#E2E8F0] text-[#111827] placeholder:text-[#94A3B8] text-xs focus:outline-none focus:border-[#2563EB] transition-all resize-none"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Add Another Question Button */}
              <div className="pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={handleAddQuestion}
                  className="w-full border-dashed border-[#CBD5E1] text-[#0F172A] hover:border-[#2563EB] hover:bg-[#EFF6FF]"
                >
                  <Plus className="w-4 h-4 text-[#2563EB]" />
                  Add Another Question
                </Button>
              </div>
            </div>

            {/* Submission Row */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#E2E8F0]">
              <Link href="/quizzes">
                <Button variant="secondary" size="md" disabled={isSubmitting}>
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                <Sparkles className="w-4 h-4" />
                Publish Quiz
              </Button>
            </div>
          </form>
        </main>
      </div>
    </ProtectedRoute>
  );
}
