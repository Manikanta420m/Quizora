'use client';

import React, { useState } from 'react';
import {
  GraduationCap,
  Users,
  Plus,
  Copy,
  Check,
  Share2,
  QrCode,
  Search,
  MoreVertical,
  Trash2,
  Edit2,
  UserPlus,
  UserMinus,
  Mail,
  Award,
  BookOpen,
  X,
  Sparkles,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function TeacherClasses({ initialClasses }) {
  const [classes, setClasses] = useState(
    initialClasses || [
      {
        id: 'cls_webdev',
        name: 'Web Development',
        code: 'QUIZ-7X42',
        subject: 'Computer Science',
        studentsCount: 42,
        averageScore: 87,
        completionRate: 94,
        term: 'Fall 2026',
        description: 'Modern full-stack web engineering, React, Node.js, and cloud architectures.',
        roster: [
          { id: 'std_1', name: 'Rahul Kumar', email: 'rahul.kumar@univ.edu', score: 86, quizzesTaken: 18, accuracy: 89 },
          { id: 'std_2', name: 'Priya Sharma', email: 'priya.sharma@univ.edu', score: 92, quizzesTaken: 22, accuracy: 94 },
          { id: 'std_3', name: 'Alex Rivera', email: 'alex.rivera@univ.edu', score: 88, quizzesTaken: 20, accuracy: 91 },
          { id: 'std_4', name: 'Ananya Patel', email: 'ananya.patel@univ.edu', score: 94, quizzesTaken: 24, accuracy: 96 },
          { id: 'std_5', name: 'Marcus Vance', email: 'marcus.vance@univ.edu', score: 78, quizzesTaken: 15, accuracy: 81 },
        ],
      },
      {
        id: 'cls_datastruct',
        name: 'Data Structures',
        code: 'QUIZ-9D35',
        subject: 'Algorithms',
        studentsCount: 35,
        averageScore: 81,
        completionRate: 89,
        term: 'Fall 2026',
        description: 'Trees, graphs, dynamic programming, sorting complexity, and recursion patterns.',
        roster: [
          { id: 'std_1', name: 'Rahul Kumar', email: 'rahul.kumar@univ.edu', score: 84, quizzesTaken: 16, accuracy: 87 },
          { id: 'std_6', name: 'Elena Rostova', email: 'elena.rostova@univ.edu', score: 85, quizzesTaken: 17, accuracy: 88 },
          { id: 'std_3', name: 'Alex Rivera', email: 'alex.rivera@univ.edu', score: 79, quizzesTaken: 14, accuracy: 82 },
        ],
      },
      {
        id: 'cls_js',
        name: 'JavaScript Mastery',
        code: 'QUIZ-4J28',
        subject: 'Web Technologies',
        studentsCount: 28,
        averageScore: 84,
        completionRate: 92,
        term: 'Fall 2026',
        description: 'Deep dive into closures, prototypes, event loop, async/await, and ESNext features.',
        roster: [
          { id: 'std_2', name: 'Priya Sharma', email: 'priya.sharma@univ.edu', score: 96, quizzesTaken: 19, accuracy: 97 },
          { id: 'std_4', name: 'Ananya Patel', email: 'ananya.patel@univ.edu', score: 91, quizzesTaken: 18, accuracy: 93 },
        ],
      },
      {
        id: 'cls_ai',
        name: 'AI Fundamentals',
        code: 'QUIZ-8A21',
        subject: 'Artificial Intelligence',
        studentsCount: 21,
        averageScore: 76,
        completionRate: 85,
        term: 'Fall 2026',
        description: 'Neural networks, prompt engineering, generative models, and LLM orchestration.',
        roster: [
          { id: 'std_1', name: 'Rahul Kumar', email: 'rahul.kumar@univ.edu', score: 79, quizzesTaken: 12, accuracy: 81 },
          { id: 'std_5', name: 'Marcus Vance', email: 'marcus.vance@univ.edu', score: 74, quizzesTaken: 11, accuracy: 76 },
        ],
      },
    ]
  );

  const [selectedClass, setSelectedClass] = useState(classes[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedCode, setCopiedCode] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [qrClass, setQrClass] = useState(null);

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [newClassSubject, setNewClassSubject] = useState('');
  const [newClassTerm, setNewClassTerm] = useState('Fall 2026');
  const [newClassDesc, setNewClassDesc] = useState('');

  // Add Student State
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentEmail, setNewStudentEmail] = useState('');

  // Copy helper
  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const handleCopyLink = (code) => {
    const link = `https://quizora.ai/join/${code}`;
    navigator.clipboard?.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleOpenQR = (cls) => {
    setQrClass(cls);
    setIsQRModalOpen(true);
  };

  // Create Class
  const handleCreateClass = (e) => {
    e.preventDefault();
    if (!newClassName.trim()) return;

    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const newCode = `QUIZ-${randomSuffix}`;

    const newClassObj = {
      id: `cls_${Date.now()}`,
      name: newClassName.trim(),
      code: newCode,
      subject: newClassSubject.trim() || 'General Studies',
      studentsCount: 0,
      averageScore: 0,
      completionRate: 0,
      term: newClassTerm,
      description: newClassDesc.trim() || 'Interactive learning cohort on Quizora.',
      roster: [],
    };

    setClasses([newClassObj, ...classes]);
    setSelectedClass(newClassObj);
    setIsCreateModalOpen(false);
    setNewClassName('');
    setNewClassSubject('');
    setNewClassDesc('');
  };

  // Add Student
  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newStudentName.trim() || !newStudentEmail.trim()) return;

    const newStudent = {
      id: `std_${Date.now()}`,
      name: newStudentName.trim(),
      email: newStudentEmail.trim(),
      score: 0,
      quizzesTaken: 0,
      accuracy: 0,
    };

    const updated = classes.map((c) => {
      if (c.id === selectedClass.id) {
        return {
          ...c,
          studentsCount: c.studentsCount + 1,
          roster: [newStudent, ...c.roster],
        };
      }
      return c;
    });

    setClasses(updated);
    setSelectedClass({
      ...selectedClass,
      studentsCount: selectedClass.studentsCount + 1,
      roster: [newStudent, ...selectedClass.roster],
    });

    setIsAddStudentModalOpen(false);
    setNewStudentName('');
    setNewStudentEmail('');
  };

  // Remove Student
  const handleRemoveStudent = (studentId) => {
    if (!confirm('Remove this student from the class?')) return;

    const updated = classes.map((c) => {
      if (c.id === selectedClass.id) {
        return {
          ...c,
          studentsCount: Math.max(0, c.studentsCount - 1),
          roster: c.roster.filter((s) => s.id !== studentId),
        };
      }
      return c;
    });

    setClasses(updated);
    setSelectedClass({
      ...selectedClass,
      studentsCount: Math.max(0, selectedClass.studentsCount - 1),
      roster: selectedClass.roster.filter((s) => s.id !== studentId),
    });
  };

  // Filtered Roster
  const filteredRoster = (selectedClass?.roster || []).filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">
            Class Management
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Create cohorts, manage student rosters, and distribute join invite codes.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => setIsCreateModalOpen(true)}
          className="gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Class</span>
        </Button>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {classes.map((cls) => {
          const isSelected = selectedClass?.id === cls.id;
          return (
            <Card
              key={cls.id}
              onClick={() => setSelectedClass(cls)}
              className={`p-5 rounded-3xl border transition-all cursor-pointer relative overflow-hidden ${
                isSelected
                  ? 'border-[#2563EB] bg-blue-50/40 shadow-md ring-2 ring-[#2563EB]/30'
                  : 'border-[#E2E8F0] bg-white hover:border-[#CBD5E1] shadow-2xs hover:shadow-sm'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-[#2563EB] border border-blue-200">
                    {cls.code}
                  </span>
                  <Badge variant={cls.averageScore >= 80 ? 'success' : 'warning'}>
                    {cls.averageScore > 0 ? `${cls.averageScore}% Avg` : 'New'}
                  </Badge>
                </div>

                <div>
                  <h3 className="font-extrabold text-base text-[#0F172A] leading-tight">
                    {cls.name}
                  </h3>
                  <span className="text-xs text-[#64748B] block mt-0.5">{cls.subject}</span>
                </div>

                <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>{cls.studentsCount} Students</span>
                  </span>
                  <span>{cls.completionRate}% Rate</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Selected Class Details & Student Roster */}
      {selectedClass && (
        <Card className="bg-white border-[#E2E8F0] shadow-sm rounded-3xl p-6 sm:p-8 space-y-6">
          {/* Class Banner & Invite Actions */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#E2E8F0]">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight">
                  {selectedClass.name}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B]">
                  {selectedClass.term}
                </span>
              </div>
              <p className="text-xs text-[#64748B] max-w-2xl">
                {selectedClass.description}
              </p>
            </div>

            {/* Invite Controls: Code + Link + QR */}
            <div className="flex flex-wrap items-center gap-2.5 bg-[#F8FAFC] border border-[#E2E8F0] p-2.5 rounded-2xl">
              {/* Class Code */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs">
                <span className="text-[11px] text-[#64748B]">Class Code:</span>
                <span className="font-mono font-black text-[#0F172A] text-sm">
                  {selectedClass.code}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyCode(selectedClass.code)}
                  className="text-[#2563EB] hover:text-[#1D4ED8] p-1 rounded-md hover:bg-blue-50 transition-colors cursor-pointer"
                  title="Copy Class Code"
                >
                  {copiedCode === selectedClass.code ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Share Invite Link */}
              <button
                type="button"
                onClick={() => handleCopyLink(selectedClass.code)}
                className="px-3 py-1.5 rounded-xl bg-white border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] hover:text-[#2563EB] hover:border-[#2563EB]/40 transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>Invite Link</span>
                  </>
                )}
              </button>

              {/* QR Code Modal Trigger */}
              <button
                type="button"
                onClick={() => handleOpenQR(selectedClass)}
                className="px-3 py-1.5 rounded-xl bg-white border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] hover:text-[#2563EB] hover:border-[#2563EB]/40 transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>QR Code</span>
              </button>
            </div>
          </div>

          {/* Roster Controls: Search & Add Student */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search students in class..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0F172A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
              />
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsAddStudentModalOpen(true)}
              className="gap-1.5 text-xs border-[#E2E8F0] text-[#0F172A] hover:bg-[#F8FAFC] self-start sm:self-auto"
            >
              <UserPlus className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>Enroll Student</span>
            </Button>
          </div>

          {/* Student Roster Table */}
          <div className="overflow-x-auto rounded-2xl border border-[#E2E8F0]">
            <table className="w-full text-left text-xs text-[#0F172A]">
              <thead className="bg-[#F8FAFC] text-[#64748B] uppercase font-mono text-[10px] tracking-wider border-b border-[#E2E8F0]">
                <tr>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4 text-center">Quizzes Completed</th>
                  <th className="py-3 px-4 text-center">Avg. Score</th>
                  <th className="py-3 px-4 text-center">Accuracy</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] bg-white font-medium">
                {filteredRoster.length > 0 ? (
                  filteredRoster.map((student) => (
                    <tr key={student.id} className="hover:bg-[#F8FAFC]/70 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#2563EB] font-bold flex items-center justify-center text-xs">
                            {student.name.charAt(0)}
                          </div>
                          <span className="font-bold text-[#0F172A]">{student.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-[#64748B] font-mono text-[11px]">
                        {student.email}
                      </td>
                      <td className="py-3 px-4 text-center font-mono font-bold">
                        {student.quizzesTaken}
                      </td>
                      <td className="py-3 px-4 text-center font-mono font-bold">
                        <span className={student.score >= 80 ? 'text-emerald-600' : 'text-amber-600'}>
                          {student.score}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center font-mono font-bold">
                        {student.accuracy}%
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleRemoveStudent(student.id)}
                          className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Remove student from class"
                        >
                          <UserMinus className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-[#64748B]">
                      No students enrolled matching &ldquo;{searchTerm}&rdquo;. Click &ldquo;Enroll Student&rdquo; or share the Class Code.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* QR Code Preview Modal */}
      {isQRModalOpen && qrClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-sm rounded-3xl bg-white border border-[#E2E8F0] shadow-2xl p-6 text-center space-y-5 animate-in zoom-in-95 duration-150 relative">
            <button
              type="button"
              onClick={() => setIsQRModalOpen(false)}
              className="absolute right-4 top-4 p-1.5 rounded-full text-slate-400 hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200">
                {qrClass.code}
              </span>
              <h3 className="font-extrabold text-lg text-[#0F172A]">{qrClass.name}</h3>
              <p className="text-xs text-[#64748B]">Scan on mobile or tablet to join instantly</p>
            </div>

            {/* Simulated Clean SVG QR Code */}
            <div className="p-4 rounded-2xl bg-white border-2 border-[#E2E8F0] inline-block shadow-inner">
              <svg className="w-48 h-48 mx-auto" viewBox="0 0 100 100" fill="currentColor">
                {/* SVG QR Pattern Mockup */}
                <rect x="10" y="10" width="25" height="25" fill="#0F172A" rx="4" />
                <rect x="15" y="15" width="15" height="15" fill="white" rx="2" />
                <rect x="18" y="18" width="9" height="9" fill="#0F172A" />

                <rect x="65" y="10" width="25" height="25" fill="#0F172A" rx="4" />
                <rect x="70" y="15" width="15" height="15" fill="white" rx="2" />
                <rect x="73" y="18" width="9" height="9" fill="#0F172A" />

                <rect x="10" y="65" width="25" height="25" fill="#0F172A" rx="4" />
                <rect x="15" y="70" width="15" height="15" fill="white" rx="2" />
                <rect x="18" y="73" width="9" height="9" fill="#0F172A" />

                <rect x="42" y="12" width="6" height="6" fill="#2563EB" />
                <rect x="52" y="18" width="6" height="6" fill="#0F172A" />
                <rect x="42" y="32" width="6" height="6" fill="#0F172A" />
                <rect x="52" y="32" width="6" height="6" fill="#2563EB" />
                <rect x="22" y="48" width="6" height="6" fill="#0F172A" />
                <rect x="35" y="48" width="6" height="6" fill="#0F172A" />
                <rect x="48" y="48" width="6" height="6" fill="#2563EB" />
                <rect x="62" y="48" width="6" height="6" fill="#0F172A" />
                <rect x="75" y="48" width="6" height="6" fill="#0F172A" />
                <rect x="42" y="65" width="6" height="6" fill="#0F172A" />
                <rect x="55" y="65" width="6" height="6" fill="#2563EB" />
                <rect x="70" y="70" width="6" height="6" fill="#0F172A" />
                <rect x="80" y="80" width="6" height="6" fill="#2563EB" />
              </svg>
            </div>

            <div className="pt-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleCopyLink(qrClass.code)}
                className="w-full text-xs gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Copy Shareable URL</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Create Class Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-3xl bg-white border border-[#E2E8F0] shadow-2xl p-6 sm:p-7 space-y-5 animate-in zoom-in-95 duration-150 relative">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#2563EB]" />
                <h3 className="font-extrabold text-lg text-[#0F172A]">Create New Class</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateClass} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Class Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cloud Native Engineering"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB]/20 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Subject / Discipline</label>
                <input
                  type="text"
                  placeholder="e.g. Distributed Systems"
                  value={newClassSubject}
                  onChange={(e) => setNewClassSubject(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB]/20 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Academic Term</label>
                <input
                  type="text"
                  placeholder="Fall 2026"
                  value={newClassTerm}
                  onChange={(e) => setNewClassTerm(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB]/20 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Course Description</label>
                <textarea
                  rows={3}
                  placeholder="Summary of course goals and quiz expectations..."
                  value={newClassDesc}
                  onChange={(e) => setNewClassDesc(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB]/20 focus:outline-none"
                />
              </div>

              <div className="pt-3 flex gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsCreateModalOpen(false)}
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
                  Create Class
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Enroll Student Modal */}
      {isAddStudentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-sm rounded-3xl bg-white border border-[#E2E8F0] shadow-2xl p-6 space-y-5 animate-in zoom-in-95 duration-150 relative">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-[#2563EB]" />
                <h3 className="font-extrabold text-base text-[#0F172A]">Enroll Student</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddStudentModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddStudent} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Student Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Lin"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB]/20 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Institutional Email *</label>
                <input
                  type="email"
                  required
                  placeholder="maya.lin@univ.edu"
                  value={newStudentEmail}
                  onChange={(e) => setNewStudentEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB]/20 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsAddStudentModalOpen(false)}
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
                  Add Student
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
