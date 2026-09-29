'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Plus,
  Edit2,
  Trash2,
  Copy,
  FolderPlus,
  Tag,
  CheckCircle2,
  X,
  Filter,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function TeacherQuestionBank({ onAddQuestionsToQuiz }) {
  const [questions, setQuestions] = useState([
    {
      id: 'qb_1',
      prompt: 'Which data structure follows the First-In, First-Out (FIFO) principle?',
      options: ['Stack', 'Queue', 'Tree', 'Graph'],
      correctAnswer: 1,
      topic: 'Data Structures',
      difficulty: 'Easy',
      type: 'MCQ',
      tags: ['Algorithms', 'Fundamentals', 'Queue'],
      explanation: 'A Queue enforces FIFO order where items exit in the exact sequence they arrived.',
    },
    {
      id: 'qb_2',
      prompt: 'What is the return value of Array.prototype.map() in JavaScript?',
      options: ['The modified original array', 'A new array with callback transformed items', 'A single boolean', 'The length of the array'],
      correctAnswer: 1,
      topic: 'JavaScript',
      difficulty: 'Easy',
      type: 'MCQ',
      tags: ['ES6', 'Functional', 'Arrays'],
      explanation: 'Array.prototype.map creates a new array populated with results of calling the provided callback on every element.',
    },
    {
      id: 'qb_3',
      prompt: 'What hook should be used to memorize expensive calculations in React?',
      options: ['useCallback', 'useMemo', 'useRef', 'useEffect'],
      correctAnswer: 1,
      topic: 'React',
      difficulty: 'Medium',
      type: 'MCQ',
      tags: ['React', 'Performance', 'Hooks'],
      explanation: 'useMemo returns a memoized value, recalculating only when dependencies change.',
    },
    {
      id: 'qb_4',
      prompt: 'What index structure does MongoDB create by default on the primary _id field?',
      options: ['B-Tree', 'Hash Index', 'LSM Tree', 'Inverted Index'],
      correctAnswer: 0,
      topic: 'MongoDB',
      difficulty: 'Hard',
      type: 'MCQ',
      tags: ['Databases', 'NoSQL', 'Indexing'],
      explanation: 'MongoDB builds a unique B-Tree index on the _id field during collection initialization.',
    },
    {
      id: 'qb_5',
      prompt: 'True or False: Node.js executes JavaScript in a multi-threaded event loop.',
      options: ['True', 'False'],
      correctAnswer: 1,
      topic: 'Node.js',
      difficulty: 'Medium',
      type: 'True/False',
      tags: ['Backend', 'Event Loop', 'Architecture'],
      explanation: 'Node.js runtime runs on a single main thread, offloading I/O operations to libuv worker pool.',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  // Add Question Form State
  const [newPrompt, setNewPrompt] = useState('');
  const [newOptionA, setNewOptionA] = useState('');
  const [newOptionB, setNewOptionB] = useState('');
  const [newOptionC, setNewOptionC] = useState('');
  const [newOptionD, setNewOptionD] = useState('');
  const [newCorrectIdx, setNewCorrectIdx] = useState(0);
  const [newTopic, setNewTopic] = useState('JavaScript');
  const [newDiff, setNewDiff] = useState('Medium');
  const [newType, setNewType] = useState('MCQ');
  const [newTags, setNewTags] = useState('');
  const [newExplanation, setNewExplanation] = useState('');

  // Handle Create Question
  const handleCreateQuestion = (e) => {
    e.preventDefault();
    if (!newPrompt.trim() || !newOptionA.trim() || !newOptionB.trim()) return;

    const opts = [newOptionA.trim(), newOptionB.trim()];
    if (newOptionC.trim()) opts.push(newOptionC.trim());
    if (newOptionD.trim()) opts.push(newOptionD.trim());

    const created = {
      id: `qb_${Date.now()}`,
      prompt: newPrompt.trim(),
      options: opts,
      correctAnswer: Number(newCorrectIdx),
      topic: newTopic,
      difficulty: newDiff,
      type: newType,
      tags: newTags ? newTags.split(',').map((t) => t.trim()) : [newTopic],
      explanation: newExplanation.trim() || 'Verified pedagogical answer.',
    };

    setQuestions([created, ...questions]);
    setIsAddModalOpen(false);
    // Reset
    setNewPrompt('');
    setNewOptionA('');
    setNewOptionB('');
    setNewOptionC('');
    setNewOptionD('');
    setNewExplanation('');
  };

  // Duplicate Question
  const handleDuplicate = (q) => {
    const duplicated = {
      ...q,
      id: `qb_${Date.now()}`,
      prompt: `${q.prompt} (Copy)`,
    };
    setQuestions([duplicated, ...questions]);
  };

  // Delete Question
  const handleDelete = (id) => {
    if (!confirm('Delete this question from question bank?')) return;
    setQuestions(questions.filter((q) => q.id !== id));
    setSelectedQuestions(selectedQuestions.filter((qId) => qId !== id));
  };

  // Toggle selection
  const handleToggleSelect = (id) => {
    if (selectedQuestions.includes(id)) {
      setSelectedQuestions(selectedQuestions.filter((qId) => qId !== id));
    } else {
      setSelectedQuestions([...selectedQuestions, id]);
    }
  };

  // Filtered Questions
  const filtered = questions.filter((q) => {
    if (selectedTopic !== 'All' && q.topic !== selectedTopic) return false;
    if (selectedDifficulty !== 'All' && q.difficulty !== selectedDifficulty) return false;
    if (selectedType !== 'All' && q.type !== selectedType) return false;
    if (searchTerm) {
      const matchPrompt = q.prompt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchTopic = q.topic.toLowerCase().includes(searchTerm.toLowerCase());
      const matchTags = q.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchPrompt || matchTopic || matchTags;
    }
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
            Question Bank
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B]">
            A searchable, tagged library of modular questions to reuse across multiple exams.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          {selectedQuestions.length > 0 && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => alert(`Added ${selectedQuestions.length} questions to current active quiz draft!`)}
              className="gap-1.5 text-xs border-[#2563EB] text-[#2563EB] bg-blue-50"
            >
              <FolderPlus className="w-3.5 h-3.5" />
              <span>Add {selectedQuestions.length} to Quiz</span>
            </Button>
          )}

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            className="gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Question</span>
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <Card className="bg-white border-[#E2E8F0] shadow-sm p-4 rounded-3xl space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative sm:col-span-1">
            <Search className="w-3.5 h-3.5 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
            />
          </div>

          {/* Topic */}
          <div>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
            >
              <option value="All">All Topics</option>
              <option value="JavaScript">JavaScript</option>
              <option value="React">React</option>
              <option value="Data Structures">Data Structures</option>
              <option value="MongoDB">MongoDB</option>
              <option value="Node.js">Node.js</option>
            </select>
          </div>

          {/* Difficulty */}
          <div>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Type */}
          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
            >
              <option value="All">All Types</option>
              <option value="MCQ">MCQ</option>
              <option value="True/False">True / False</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Questions List */}
      <div className="space-y-3.5">
        {filtered.map((q) => {
          const isSelected = selectedQuestions.includes(q.id);
          return (
            <Card
              key={q.id}
              className={`p-5 rounded-3xl border transition-all ${
                isSelected
                  ? 'border-[#2563EB] bg-blue-50/30 shadow-sm'
                  : 'bg-white border-[#E2E8F0] hover:border-[#CBD5E1] shadow-2xs'
              }`}
            >
              <div className="flex items-start gap-3.5">
                {/* Selection Checkbox */}
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleToggleSelect(q.id)}
                  className="mt-1 w-4 h-4 rounded text-[#2563EB] focus:ring-[#2563EB] cursor-pointer"
                />

                <div className="space-y-3 flex-1">
                  {/* Tags & Metadata */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-[#2563EB] border border-blue-200">
                        {q.topic}
                      </span>
                      <Badge variant={q.difficulty === 'Hard' ? 'danger' : q.difficulty === 'Medium' ? 'warning' : 'success'} className="text-[10px]">
                        {q.difficulty}
                      </Badge>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-[#64748B] font-mono">
                        {q.type}
                      </span>
                      {q.tags.map((t, idx) => (
                        <span key={idx} className="text-[10px] text-[#64748B] flex items-center gap-0.5">
                          <Tag className="w-2.5 h-2.5" /> {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleDuplicate(q)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-[#2563EB] hover:bg-blue-50 transition-colors cursor-pointer"
                        title="Duplicate question"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(q.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Delete question"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Question Prompt */}
                  <h4 className="font-extrabold text-sm text-[#0F172A] leading-snug">
                    {q.prompt}
                  </h4>

                  {/* Options Chips */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
                    {q.options.map((opt, oIdx) => {
                      const isCorrect = oIdx === q.correctAnswer;
                      return (
                        <div
                          key={oIdx}
                          className={`p-2 rounded-xl border flex items-center gap-2 ${
                            isCorrect
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                              : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B]'
                          }`}
                        >
                          <span
                            className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-mono ${
                              isCorrect ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-[#0F172A]'
                            }`}
                          >
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span>{opt}</span>
                          {isCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 ml-auto" />}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  {q.explanation && (
                    <p className="text-[11px] text-[#64748B] bg-[#F8FAFC] p-2 rounded-xl border border-[#E2E8F0]">
                      <strong className="text-[#0F172A]">Explanation:</strong> {q.explanation}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Add Question Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-[#E2E8F0] shadow-2xl p-6 sm:p-8 space-y-5 animate-in zoom-in-95 duration-150 relative">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#2563EB]" />
                <h3 className="font-extrabold text-lg text-[#0F172A]">Add Question to Bank</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateQuestion} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Question Prompt *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="e.g. Which algorithm sorts in O(n log n) in all cases?"
                  value={newPrompt}
                  onChange={(e) => setNewPrompt(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB]/20 focus:outline-none"
                />
              </div>

              {/* Options */}
              <div className="space-y-2">
                <label className="block font-bold text-[#0F172A]">Options *</label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#64748B] w-6">A:</span>
                    <input
                      type="text"
                      required
                      placeholder="Option A"
                      value={newOptionA}
                      onChange={(e) => setNewOptionA(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB]/20 focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#64748B] w-6">B:</span>
                    <input
                      type="text"
                      required
                      placeholder="Option B"
                      value={newOptionB}
                      onChange={(e) => setNewOptionB(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB]/20 focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#64748B] w-6">C:</span>
                    <input
                      type="text"
                      placeholder="Option C (Optional)"
                      value={newOptionC}
                      onChange={(e) => setNewOptionC(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB]/20 focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#64748B] w-6">D:</span>
                    <input
                      type="text"
                      placeholder="Option D (Optional)"
                      value={newOptionD}
                      onChange={(e) => setNewOptionD(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB]/20 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Correct Answer Selector */}
              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Correct Answer</label>
                <select
                  value={newCorrectIdx}
                  onChange={(e) => setNewCorrectIdx(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB]/20 focus:outline-none"
                >
                  <option value={0}>Option A</option>
                  <option value={1}>Option B</option>
                  <option value={2}>Option C</option>
                  <option value={3}>Option D</option>
                </select>
              </div>

              {/* Metadata: Topic + Difficulty + Tags */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#0F172A] mb-1">Topic</label>
                  <input
                    type="text"
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB]/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#0F172A] mb-1">Difficulty</label>
                  <select
                    value={newDiff}
                    onChange={(e) => setNewDiff(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB]/20 focus:outline-none"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Tags (Comma Separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Sorting, MergeSort, Big-O"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB]/20 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Explanation</label>
                <textarea
                  rows={2}
                  placeholder="Pedagogical rationale..."
                  value={newExplanation}
                  onChange={(e) => setNewExplanation(e.target.value)}
                  className="w-full p-2 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB]/20 focus:outline-none"
                />
              </div>

              <div className="pt-3 flex gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="flex-1 text-xs bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
                >
                  Save Question
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
